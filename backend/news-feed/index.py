import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re

# Узкие ключевые слова — для приоритетных новостей
SUMO_KEYWORDS = [
    "сумо", "сумоист", "сумоисты", "sumo", "ёкодзуна",
    "одзэки", "сэкивакэ", "комусуби", "маэгасира",
    "дохё", "маваси", "басё",
]

# Широкие — единоборства (без политически нагруженных слов)
WRESTLING_KEYWORDS = [
    "единоборств", "борцов", "борец",
    "дзюдо", "дзюдоист", "самбо", "самбист",
    "греко-римск", "вольная борьба", "wrestling",
    "татами", "пояс", "схватк",
    "чемпионат мира по борьбе", "чемпионат россии по борьбе",
    "первенство по борьбе", "первенство мира по дзюдо",
]

RSS_SOURCES = [
    # Прямые RSS — без фильтра
    {"url": "https://www.sports.ru/rss/summing/", "name": "Sports.ru"},
    {"url": "https://www.sports.ru/rss/judo/", "name": "Sports.ru"},
    # Крупные спортивные ленты
    {"url": "https://ria.ru/export/rss2/sport/index.xml", "name": "РИА Спорт"},
    {"url": "https://lenta.ru/rss/sport/", "name": "Lenta.ru"},
    {"url": "https://tass.ru/rss/v2.xml", "name": "ТАСС"},
    {"url": "https://www.mk.ru/sport/rss/", "name": "МК Спорт"},
    {"url": "https://rsport.ria.ru/export/rss2/index.xml", "name": "РИА Спорт"},
    {"url": "https://sovsport.ru/rss", "name": "Советский спорт"},
    {"url": "https://sport24.ru/rss.xml", "name": "Sport24"},
    {"url": "https://sportbox.ru/rss", "name": "Sportbox"},
    {"url": "https://www.gazeta.ru/export/rss/sport.xml", "name": "Газета.ру Спорт"},
    {"url": "https://www.kommersant.ru/RSS/section-sport.xml", "name": "Коммерсантъ"},
    {"url": "https://rg.ru/xml/index.xml", "name": "Российская газета"},
]


def fetch_url(url: str, timeout: int = 6) -> str | None:
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; SumoSPB-bot/2.0; +https://sumospb.ru)",
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


def has_keyword(text: str, keywords: list[str]) -> bool:
    lower = text.lower()
    return any(kw.lower() in lower for kw in keywords)


def parse_rss(xml_text: str, source_name: str) -> list[dict]:
    """Парсим все новости источника, классифицируем по релевантности."""
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

            if not title or not link:
                continue

            desc_clean = re.sub(r"<[^>]+>", " ", desc).strip()
            desc_clean = re.sub(r"\s+", " ", desc_clean)
            desc_clean = desc_clean[:300] + "…" if len(desc_clean) > 300 else desc_clean

            haystack = f"{title} {desc_clean} {category}"

            # Определяем приоритет
            if has_keyword(haystack, SUMO_KEYWORDS):
                priority = 1  # Сумо — самый высокий
            elif has_keyword(haystack, WRESTLING_KEYWORDS):
                priority = 2  # Борьба, дзюдо, самбо
            else:
                priority = 3  # Просто спорт (запасной вариант)

            image = extract_image(item, desc)

            items.append({
                "title": title,
                "link": link,
                "description": desc_clean,
                "pub_date": pub_date,
                "image": image,
                "source": source_name,
                "category": category,
                "priority": priority,
            })
    except Exception:
        pass
    return items


def parse_date(pub_date_str: str) -> datetime:
    for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S %Z", "%Y-%m-%dT%H:%M:%S%z"]:
        try:
            return datetime.strptime(pub_date_str[:31].strip(), fmt)
        except Exception:
            continue
    return datetime(2000, 1, 1, tzinfo=timezone.utc)


def handler(event: dict, context) -> dict:
    """Агрегирует RSS-новости. Приоритет: сумо → единоборства → спорт. Возвращает до 30 новостей."""

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

    for source in RSS_SOURCES:
        xml_text = fetch_url(source["url"])
        if not xml_text:
            continue
        parsed = parse_rss(xml_text, source["name"])
        all_items.extend(parsed)

    # Дедуплицируем
    seen: set[str] = set()
    unique = []
    for item in all_items:
        key = item["link"]
        if key and key not in seen:
            seen.add(key)
            unique.append(item)

    # Группируем по приоритету
    p1 = [x for x in unique if x["priority"] == 1]  # сумо
    p2 = [x for x in unique if x["priority"] == 2]  # борьба/дзюдо
    p3 = [x for x in unique if x["priority"] == 3]  # обычный спорт

    # Сортируем каждую группу по дате
    for group in (p1, p2, p3):
        group.sort(key=lambda x: parse_date(x["pub_date"]), reverse=True)

    # Собираем итог:
    # - все новости про сумо
    # - дополняем единоборствами до 15
    # - если совсем мало — добавляем спорт до 25
    result = list(p1)

    if len(result) < 15:
        result.extend(p2[: 15 - len(result)])
    if len(result) < 25:
        result.extend(p3[: 25 - len(result)])

    result = result[:30]

    # Удаляем priority перед отдачей
    for item in result:
        item.pop("priority", None)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=300",
        },
        "body": json.dumps({"items": result, "count": len(result)}, ensure_ascii=False),
    }