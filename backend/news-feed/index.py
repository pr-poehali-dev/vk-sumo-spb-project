import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re

# Регулярки — ищем «сумо» как отдельное слово, а не «Сумы», «сумочка»
SUMO_REGEXES = [
    re.compile(r"\bсумо\b", re.IGNORECASE),
    re.compile(r"сумоист", re.IGNORECASE),
    re.compile(r"\bsumo\b", re.IGNORECASE),
    re.compile(r"ёкодзуна", re.IGNORECASE),
    re.compile(r"\bодзэки\b", re.IGNORECASE),
    re.compile(r"сэкивакэ", re.IGNORECASE),
    re.compile(r"комусуби", re.IGNORECASE),
    re.compile(r"маэгасира", re.IGNORECASE),
    re.compile(r"\bдохё\b", re.IGNORECASE),
    re.compile(r"маваси", re.IGNORECASE),
    re.compile(r"\bбасё\b", re.IGNORECASE),
    re.compile(r"федерация сумо", re.IGNORECASE),
    re.compile(r"чемпионат[а-я ]*сумо", re.IGNORECASE),
    re.compile(r"первенств[а-я ]*сумо", re.IGNORECASE),
    re.compile(r"кубок[а-я ]*сумо", re.IGNORECASE),
    re.compile(r"турнир[а-я ]*сумо", re.IGNORECASE),
]

# Стоп-паттерны — отсекаем мусор
NEGATIVE_REGEXES = [
    re.compile(r"\bсум[ыа]\b", re.IGNORECASE),  # город Сумы
    re.compile(r"сумск", re.IGNORECASE),  # Сумская область
    re.compile(r"сумочк", re.IGNORECASE),
    re.compile(r"\bсумк[аиоу]?\b", re.IGNORECASE),
    re.compile(r"потребсум", re.IGNORECASE),
]

RSS_SOURCES = [
    # Прямые RSS Sports.ru — теги сумо
    {"url": "https://www.sports.ru/rss/summing/", "name": "Sports.ru"},
    {"url": "https://www.sports.ru/tags/13388.xml", "name": "Sports.ru"},
    # Спортивные новости — фильтруем по «сумо»
    {"url": "https://ria.ru/export/rss2/sport/index.xml", "name": "РИА Спорт"},
    {"url": "https://lenta.ru/rss/sport/", "name": "Lenta.ru"},
    {"url": "https://tass.ru/rss/v2.xml", "name": "ТАСС"},
    {"url": "https://www.mk.ru/sport/rss/", "name": "МК Спорт"},
    {"url": "https://rsport.ria.ru/export/rss2/index.xml", "name": "РИА Спорт"},
    {"url": "https://sport24.ru/rss.xml", "name": "Sport24"},
    {"url": "https://sportbox.ru/rss", "name": "Sportbox"},
    {"url": "https://www.gazeta.ru/export/rss/sport.xml", "name": "Газета.ру"},
    {"url": "https://www.kommersant.ru/RSS/section-sport.xml", "name": "Коммерсантъ"},
]

# Поисковые RSS — Яндекс.Новости и Google News по запросу «сумо»
SEARCH_FEEDS = [
    {
        "url": "https://news.google.com/rss/search?q=%D1%81%D1%83%D0%BC%D0%BE+%D1%81%D0%BF%D0%BE%D1%80%D1%82+when:365d&hl=ru&gl=RU&ceid=RU:ru",
        "name": "Google News",
    },
    {
        "url": "https://news.google.com/rss/search?q=%D1%87%D0%B5%D0%BC%D0%BF%D0%B8%D0%BE%D0%BD%D0%B0%D1%82+%D0%BF%D0%BE+%D1%81%D1%83%D0%BC%D0%BE+when:365d&hl=ru&gl=RU&ceid=RU:ru",
        "name": "Google News",
    },
    {
        "url": "https://news.google.com/rss/search?q=%D1%84%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F+%D1%81%D1%83%D0%BC%D0%BE+when:365d&hl=ru&gl=RU&ceid=RU:ru",
        "name": "Google News",
    },
]


def fetch_url(url: str, timeout: int = 6) -> str | None:
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; SumoSPB-bot/2.0)",
                "Accept": "application/rss+xml, application/xml, text/xml, */*",
                "Accept-Language": "ru-RU,ru;q=0.9",
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
            for enc in ("utf-8", "cp1251", "latin-1"):
                try:
                    return raw.decode(enc)
                except Exception:
                    continue
    except Exception:
        pass
    return None


def extract_image(item: ET.Element, desc: str) -> str:
    ns = {"media": "http://search.yahoo.com/mrss/"}
    enc = item.find("enclosure")
    if enc is not None and enc.get("url"):
        url = enc.get("url", "")
        if url.startswith("http"):
            return url
    for tag in ["media:content", "media:thumbnail"]:
        el = item.find(tag, ns)
        if el is not None and el.get("url"):
            return el.get("url", "")
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', desc, re.IGNORECASE)
    if m:
        url = m.group(1)
        if url.startswith("http"):
            return url
    return ""


def has_negative(text: str) -> bool:
    """Проверка на стоп-слова — Сумы, сумочка и т.д."""
    return any(rx.search(text) for rx in NEGATIVE_REGEXES)


def is_sumo_news(text: str) -> bool:
    """Новость про сумо: есть совпадение с SUMO-регуляркой и нет стоп-слов."""
    if has_negative(text):
        return False
    return any(rx.search(text) for rx in SUMO_REGEXES)


def parse_rss(xml_text: str, source_name: str, force_include: bool = False) -> list[dict]:
    """Парсим RSS. Если force_include=True (Sports.ru/sumo и Google News по сумо) — берём все."""
    items = []
    try:
        xml_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', xml_text)
        root = ET.fromstring(xml_text)
        channel = root.find("channel") or root

        for item in channel.findall("item"):
            title = (item.findtext("title") or "").strip()
            link = (item.findtext("link") or "").strip()
            desc = (item.findtext("description") or "").strip()
            pub_date = (item.findtext("pubDate") or "").strip()
            category = (item.findtext("category") or "").strip()
            source_el = item.find("source")
            real_source = source_name
            if source_el is not None and source_el.text:
                real_source = source_el.text.strip()[:30]

            if not title or not link:
                continue

            desc_clean = re.sub(r"<[^>]+>", " ", desc).strip()
            desc_clean = re.sub(r"\s+", " ", desc_clean)
            desc_clean = desc_clean[:280] + "…" if len(desc_clean) > 280 else desc_clean

            haystack = f"{title} {desc_clean} {category}"

            # ВСЕГДА проверяем строго: нужно совпадение с сумо + нет стоп-слов
            # Это убирает «Сумы», «сумочка», «потребсумо» из любого источника
            if not is_sumo_news(haystack):
                continue

            image = extract_image(item, desc)

            items.append({
                "title": title,
                "link": link,
                "description": desc_clean,
                "pub_date": pub_date,
                "image": image,
                "source": real_source,
                "category": category,
            })
    except Exception:
        pass
    return items


def parse_date(pub_date_str: str) -> datetime:
    formats = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
        "%a, %d %b %Y %H:%M:%S GMT",
    ]
    for fmt in formats:
        try:
            return datetime.strptime(pub_date_str[:31].strip(), fmt)
        except Exception:
            continue
    return datetime(2000, 1, 1, tzinfo=timezone.utc)


def handler(event: dict, context) -> dict:
    """Только новости о сумо. Тянет за последний год из 13 источников + Google News."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    all_items: list[dict] = []

    # Прямые сумо-источники — берём все
    for source in RSS_SOURCES[:2]:
        xml_text = fetch_url(source["url"])
        if xml_text:
            all_items.extend(parse_rss(xml_text, source["name"], force_include=True))

    # Общие спорт-источники — фильтруем по «сумо»
    for source in RSS_SOURCES[2:]:
        xml_text = fetch_url(source["url"])
        if xml_text:
            all_items.extend(parse_rss(xml_text, source["name"], force_include=False))

    # Google News — поисковые ленты
    for source in SEARCH_FEEDS:
        xml_text = fetch_url(source["url"], timeout=8)
        if xml_text:
            all_items.extend(parse_rss(xml_text, source["name"], force_include=True))

    # Дедупликация по ссылке
    seen: set[str] = set()
    unique = []
    for item in all_items:
        key = item["link"]
        if key and key not in seen:
            seen.add(key)
            unique.append(item)

    # Сортировка: свежие — первыми
    unique.sort(key=lambda x: parse_date(x["pub_date"]), reverse=True)

    result = unique[:30]

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=300",
        },
        "body": json.dumps({"items": result, "count": len(result)}, ensure_ascii=False),
    }