import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import re
import os

SUMO_KEYWORDS = ["сумо", "сумоист", "sumo", "борьба", "единоборств", "дзюдо", "Суперсерия сумо"]

RSS_SOURCES = [
    {
        "url": "https://www.sports.ru/rss/summing/",
        "name": "Sports.ru",
        "fallback": True,
    },
    {
        "url": "https://ria.ru/export/rss2/sport/index.xml",
        "name": "РИА Спорт",
        "fallback": False,
    },
    {
        "url": "https://lenta.ru/rss/sport/",
        "name": "Lenta.ru",
        "fallback": False,
    },
    {
        "url": "https://tass.ru/rss/v2.xml",
        "name": "ТАСС",
        "fallback": False,
    },
]

def fetch_url(url: str, timeout: int = 8) -> str | None:
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; SumoSPB/1.0)",
                "Accept": "application/rss+xml, application/xml, text/xml, */*",
            }
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read()
            try:
                return raw.decode("utf-8")
            except Exception:
                return raw.decode("cp1251", errors="replace")
    except Exception:
        return None


def parse_rss(xml_text: str, source_name: str, filter_keywords: bool = True) -> list[dict]:
    items = []
    try:
        root = ET.fromstring(xml_text)
        ns = {"media": "http://search.yahoo.com/mrss/"}
        channel = root.find("channel")
        if channel is None:
            channel = root

        for item in channel.findall("item"):
            title = (item.findtext("title") or "").strip()
            link = (item.findtext("link") or "").strip()
            desc = (item.findtext("description") or "").strip()
            pub_date_str = (item.findtext("pubDate") or "").strip()
            category = (item.findtext("category") or "").strip()

            # Clean HTML from description
            desc_clean = re.sub(r"<[^>]+>", "", desc).strip()
            desc_clean = desc_clean[:280] + "…" if len(desc_clean) > 280 else desc_clean

            # Image: try enclosure, then media:content, then media:thumbnail
            image = ""
            enclosure = item.find("enclosure")
            if enclosure is not None:
                image = enclosure.get("url", "")
            if not image:
                mc = item.find("media:content", ns)
                if mc is not None:
                    image = mc.get("url", "")
            if not image:
                mt = item.find("media:thumbnail", ns)
                if mt is not None:
                    image = mt.get("url", "")
            if not image:
                # Try to extract from description
                m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', desc)
                if m:
                    image = m.group(1)

            # Filter
            text_to_check = (title + " " + desc_clean + " " + category).lower()
            if filter_keywords and not any(kw.lower() in text_to_check for kw in SUMO_KEYWORDS):
                continue

            items.append({
                "title": title,
                "link": link,
                "description": desc_clean,
                "pub_date": pub_date_str,
                "image": image,
                "source": source_name,
                "category": category,
            })
    except Exception:
        pass

    return items


def parse_date(pub_date_str: str) -> datetime:
    """Parse RSS date string to datetime for sorting."""
    formats = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S %Z",
        "%Y-%m-%dT%H:%M:%S%z",
    ]
    for fmt in formats:
        try:
            return datetime.strptime(pub_date_str[:31], fmt)
        except Exception:
            continue
    return datetime(2000, 1, 1, tzinfo=timezone.utc)


def handler(event: dict, context) -> dict:
    """Агрегирует RSS-новости о сумо из нескольких источников и возвращает JSON."""

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
        items = parse_rss(xml_text, source["name"], filter_keywords=not source.get("fallback", False))
        all_items.extend(items)

    # Deduplicate by link
    seen = set()
    unique = []
    for item in all_items:
        key = item["link"]
        if key not in seen:
            seen.add(key)
            unique.append(item)

    # Sort by date descending
    unique.sort(key=lambda x: parse_date(x["pub_date"]), reverse=True)

    # Limit to 20 items
    result = unique[:20]

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=600",
        },
        "body": json.dumps({"items": result, "count": len(result)}, ensure_ascii=False),
    }
