import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re

SUMO_KEYWORDS = [
    "сумо", "сумоист", "сумоисты", "sumo", "единоборств",
    "борьба", "дзюдо", "самбо", "федерация сумо",
    "чемпионат по сумо", "первенство по сумо",
]

RSS_SOURCES = [
    # Прямые RSS о сумо
    {
        "url": "https://www.sports.ru/rss/summing/",
        "name": "Sports.ru",
        "filter": False,
    },
    {
        "url": "https://www.sports.ru/tags/13388.xml",
        "name": "Sports.ru — Сумо",
        "filter": False,
    },
    # Крупные спортивные ленты — фильтруем по ключевым словам
    {
        "url": "https://ria.ru/export/rss2/sport/index.xml",
        "name": "РИА Спорт",
        "filter": True,
    },
    {
        "url": "https://lenta.ru/rss/sport/",
        "name": "Lenta.ru",
        "filter": True,
    },
    {
        "url": "https://tass.ru/rss/v2.xml",
        "name": "ТАСС",
        "filter": True,
    },
    {
        "url": "https://www.mk.ru/sport/rss/",
        "name": "МК Спорт",
        "filter": True,
    },
    {
        "url": "https://rsport.ria.ru/export/rss2/index.xml",
        "name": "РИА Спорт",
        "filter": True,
    },
    {
        "url": "https://sovsport.ru/rss",
        "name": "Советский спорт",
        "filter": True,
    },
    {
        "url": "https://sport24.ru/rss.xml",
        "name": "Sport24",
        "filter": True,
    },
    {
        "url": "https://sportbox.ru/rss",
        "name": "Sportbox",
        "filter": True,
    },
]


def fetch_url(url: str, timeout: int = 7) -> str | None:
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
    # enclosure
    enc = item.find("enclosure")
    if enc is not None and enc.get("url"):
        return enc.get("url", "")
    # media:content
    for tag in ["media:content", "media:thumbnail"]:
        el = item.find(tag, ns)
        if el is not None and el.get("url"):
            return el.get("url", "")
    # из description
    m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', desc, re.IGNORECASE)
    if m:
        url = m.group(1)
        if url.startswith("http"):
            return url
    return ""


def parse_rss(xml_text: str, source_name: str, filter_kw: bool) -> list[dict]:
    items = []
    try:
        # Убираем невалидные символы
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

            # Фильтр по ключевым словам
            if filter_kw:
                haystack = (title + " " + desc_clean + " " + category).lower()
                if not any(kw.lower() in haystack for kw in SUMO_KEYWORDS):
                    continue

            image = extract_image(item, desc)

            items.append({
                "title": title,
                "link": link,
                "description": desc_clean,
                "pub_date": pub_date,
                "image": image,
                "source": source_name,
                "category": category,
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
    """Агрегирует RSS-новости о сумо из 10 источников, возвращает до 40 новостей."""

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
        parsed = parse_rss(xml_text, source["name"], filter_kw=source.get("filter", True))
        all_items.extend(parsed)

    # Дедупликация по ссылке
    seen: set[str] = set()
    unique = []
    for item in all_items:
        key = item["link"]
        if key and key not in seen:
            seen.add(key)
            unique.append(item)

    # Сортировка по дате убывания
    unique.sort(key=lambda x: parse_date(x["pub_date"]), reverse=True)

    result = unique[:40]

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=600",
        },
        "body": json.dumps({"items": result, "count": len(result)}, ensure_ascii=False),
    }
