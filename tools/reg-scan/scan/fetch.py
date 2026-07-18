"""Fetch RSS/Atom feeds and convert entries to canonical item dicts.

Each item dict has:
  source_id, title, url, summary, published_at (ISO-8601 str or None),
  signal_type, risk_areas, source_name
"""
import logging
import re
import time
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from urllib.parse import urljoin

import feedparser
import requests
from bs4 import BeautifulSoup

from .classify import classify_type, classify_risk_areas
from .utils import canonicalize_url, infer_date_from_url

log = logging.getLogger(__name__)

_TIMEOUT = 20  # seconds
_MAX_SUMMARY = 800  # chars
_RETRIES = 3

_HEADERS = {
    "User-Agent": (
        "St-Georges-Strategy reg-scan/1.0 "
        "(regulatory intelligence; contact@stgeorgesstrategy.com)"
    ),
    "Accept": (
        "application/rss+xml, application/atom+xml, "
        "application/xml, text/xml, */*"
    ),
}

_STRIP_TAGS = re.compile(r"<[^>]+>")
_BLOCKED_PAGE_PATTERNS = [
    re.compile(r"challenge validation", re.I),
    re.compile(r"captcha page", re.I),
    re.compile(r"please solve this captcha", re.I),
    re.compile(r"perimeterx|radware|perfdrive|shieldsquare", re.I),
]
_LOCAL_MONTHS = {
    "enero": "January",
    "febrero": "February",
    "marzo": "March",
    "abril": "April",
    "mayo": "May",
    "junio": "June",
    "julio": "July",
    "agosto": "August",
    "septiembre": "September",
    "setiembre": "September",
    "octubre": "October",
    "noviembre": "November",
    "diciembre": "December",
    "gennaio": "January",
    "febbraio": "February",
    "marzo": "March",
    "aprile": "April",
    "maggio": "May",
    "giugno": "June",
    "luglio": "July",
    "agosto": "August",
    "settembre": "September",
    "ottobre": "October",
    "novembre": "November",
    "dicembre": "December",
}


def _strip_html(html: str) -> str:
    return _STRIP_TAGS.sub(" ", html or "").strip()


def _is_blocked_response(response):
    """Identify official pages that returned an anti-bot/challenge shell."""
    text = response.text[:8000] if getattr(response, "text", None) else ""
    return any(pattern.search(text) for pattern in _BLOCKED_PAGE_PATTERNS)


def _parse_date(entry):
    """Extract a UTC ISO-8601 timestamp from a feedparser entry."""
    for field in ("published_parsed", "updated_parsed"):
        val = getattr(entry, field, None)
        if val:
            try:
                return datetime(*val[:6], tzinfo=timezone.utc).isoformat()
            except Exception:
                continue
    for field in ("published", "updated"):
        raw = getattr(entry, field, None)
        if raw:
            try:
                return parsedate_to_datetime(raw.replace(",", "")).astimezone(timezone.utc).isoformat()
            except (TypeError, ValueError):
                try:
                    return datetime.strptime(raw.replace(",", ""), "%d %b %Y %z").astimezone(timezone.utc).isoformat()
                except ValueError:
                    continue
    return None


def _parse_page_date(node):
    """Parse a page date node into a UTC ISO timestamp, failing closed."""
    if node is None:
        return None
    raw = node.get("datetime") or node.get_text(" ", strip=True)
    if not raw:
        return None
    normalized = re.sub(r"^(published|updated|date)\s*:?\s*", "", raw, flags=re.I).strip()
    normalized = re.sub(r"\bde\s+", "", normalized, flags=re.I)
    normalized = normalized.replace("Sept ", "Sep ")
    for local, english in _LOCAL_MONTHS.items():
        normalized = re.sub(rf"\b{local}\b", english, normalized, flags=re.I)
    embedded_numeric = re.search(r"\b(\d{1,2}[./]\d{1,2}[./]\d{4})\b", normalized)
    if embedded_numeric:
        normalized = embedded_numeric.group(1)
    else:
        month_words = "|".join(sorted(_LOCAL_MONTHS.keys(), key=len, reverse=True))
        embedded_local = re.search(rf"\b(\d{{1,2}}\s+(?:de\s+)?(?:{month_words})(?:\s+de)?\s+\d{{4}})\b", raw, flags=re.I)
        if embedded_local:
            normalized = re.sub(r"\bde\s+", "", embedded_local.group(1), flags=re.I)
            for local, english in _LOCAL_MONTHS.items():
                normalized = re.sub(rf"\b{local}\b", english, normalized, flags=re.I)
    for fmt in ("%Y-%m-%d", "%d %B %Y", "%d %b %Y", "%d %b %Y, %I:%M %p", "%B %d, %Y", "%b %d, %Y", "%d/%m/%Y", "%m/%d/%Y", "%d.%m.%Y"):
        try:
            return datetime.strptime(normalized[:32], fmt).replace(tzinfo=timezone.utc).isoformat()
        except ValueError:
            pass
    try:
        parsed = datetime.fromisoformat(normalized.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc).isoformat()
    except ValueError:
        return None


def passes_source_filter(source_id, title, summary="", filters=None):
    """Apply optional source-level inclusion/exclusion rules."""
    rules = (filters or {}).get(source_id, {})
    text = f"{title} {summary}"
    if any(re.search(pattern, text, re.I) for pattern in rules.get("exclude", [])):
        return False
    includes = rules.get("include", [])
    return not includes or any(re.search(pattern, text, re.I) for pattern in includes)


def _canonical_item(source, title, link, summary="", published_at=None):
    text = f"{title} {summary}"
    return {
        "source_id": source["id"],
        "source_name": source.get("name", source["id"]),
        "title": title.strip(),
        "url": canonicalize_url(link),
        "summary": summary.strip()[:_MAX_SUMMARY],
        "published_at": published_at or infer_date_from_url(link),
        "signal_type": classify_type(title),
        "risk_areas": classify_risk_areas(text),
    }


def _get(url):
    last_error = None
    for attempt in range(_RETRIES):
        try:
            response = requests.get(url, headers=_HEADERS, timeout=_TIMEOUT)
            response.raise_for_status()
            return response
        except requests.RequestException as exc:
            last_error = exc
            if attempt + 1 < _RETRIES:
                time.sleep(0.5 * (2 ** attempt))
    raise last_error


def fetch_source(source, feed_urls, source_filters=None):
    """
    Fetch all feed_urls for a source and return (items, last_error).
    last_error is None when at least one feed succeeded.
    """
    all_items = []
    last_error = None

    for url in feed_urls:
        try:
            resp = _get(url)
            parsed = feedparser.parse(resp.content)

            if parsed.bozo and not parsed.entries:
                last_error = f"feed parse error at {url}: {parsed.bozo_exception}"
                log.debug("bozo feed %s: %s", url, parsed.bozo_exception)
                continue

            for entry in parsed.entries:
                title = getattr(entry, "title", "") or ""
                title = _strip_html(title)
                summary_raw = getattr(entry, "summary", "") or ""
                summary = _strip_html(summary_raw)[:_MAX_SUMMARY]
                link = getattr(entry, "link", "") or ""
                if not link:
                    continue
                if passes_source_filter(source["id"], title, summary, source_filters):
                    all_items.append(_canonical_item(source, title, link, summary, _parse_date(entry)))

        except requests.RequestException as exc:
            last_error = f"HTTP error fetching {url}: {exc}"
            log.warning("fetch error %s: %s", url, exc)
        except Exception as exc:
            last_error = f"unexpected error fetching {url}: {exc}"
            log.warning("unexpected error %s: %s", url, exc, exc_info=True)

    return all_items, (last_error if not all_items else None)


def fetch_page_source(source, page_configs, source_filters=None):
    """Fetch structured entries from an official, dated publication listing."""
    all_items = []
    last_error = None
    matched_rows = 0
    for config in page_configs:
        url = config["url"]
        try:
            response = _get(url)
            if _is_blocked_response(response):
                last_error = f"blocked by anti-bot challenge at {url}"
                log.warning("blocked official page %s", url)
                continue
            soup = BeautifulSoup(response.content, "lxml")
            rows = []
            for selector in config["item_selectors"]:
                rows = soup.select(selector)
                if rows:
                    break
            matched_rows += len(rows)
            for row in rows:
                link_node = row if config.get("link_self") and row.get("href") else next(
                    (row.select_one(s) for s in config["link_selectors"] if row.select_one(s)), None
                )
                date_node = next((row.select_one(s) for s in config["date_selectors"] if row.select_one(s)), None)
                if link_node is None or date_node is None:
                    continue
                title_node = row.select_one(config.get("title_selector", "")) if config.get("title_selector") else link_node
                title = title_node.get_text(" ", strip=True)
                link = urljoin(url, link_node.get("href", ""))
                published_at = _parse_page_date(date_node)
                if not title or not link or not published_at:
                    continue
                summary_node = row.select_one(config.get("summary_selector", "p"))
                summary = summary_node.get_text(" ", strip=True) if summary_node else ""
                if config.get("context_selector"):
                    context_node = row.select_one(config["context_selector"])
                    if context_node:
                        summary = f"{summary} {context_node.get_text(' ', strip=True)}".strip()
                if passes_source_filter(source["id"], title, summary, source_filters):
                    all_items.append(_canonical_item(source, title, link, summary, published_at))
        except requests.RequestException as exc:
            last_error = f"HTTP error fetching {url}: {exc}"
            log.warning("page fetch error %s: %s", url, exc)
        except Exception as exc:
            last_error = f"unexpected error fetching {url}: {exc}"
            log.warning("unexpected page error %s: %s", url, exc, exc_info=True)
    if not all_items and matched_rows == 0 and last_error is None:
        last_error = "official page returned no recognisable publication rows"
    return all_items, (last_error if not all_items else None)
