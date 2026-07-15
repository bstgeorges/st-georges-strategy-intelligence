"""Fetch RSS/Atom feeds and convert entries to canonical item dicts.

Each item dict has:
  source_id, title, url, summary, published_at (ISO-8601 str or None),
  signal_type, risk_areas, source_name
"""
import logging
import re
from datetime import datetime, timezone

import feedparser
import requests

from .classify import classify_type, classify_risk_areas

log = logging.getLogger(__name__)

_TIMEOUT = 20  # seconds
_MAX_SUMMARY = 800  # chars

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


def _strip_html(html: str) -> str:
    return _STRIP_TAGS.sub(" ", html or "").strip()


def _parse_date(entry):
    """Extract a UTC ISO-8601 timestamp from a feedparser entry."""
    for field in ("published_parsed", "updated_parsed"):
        val = getattr(entry, field, None)
        if val:
            try:
                return datetime(*val[:6], tzinfo=timezone.utc).isoformat()
            except Exception:
                continue
    return None


def fetch_source(source, feed_urls):
    """
    Fetch all feed_urls for a source and return (items, last_error).
    last_error is None when at least one feed succeeded.
    """
    all_items = []
    last_error = None

    for url in feed_urls:
        try:
            resp = requests.get(url, headers=_HEADERS, timeout=_TIMEOUT)
            resp.raise_for_status()
            parsed = feedparser.parse(resp.content)

            if parsed.bozo and not parsed.entries:
                last_error = f"feed parse error at {url}: {parsed.bozo_exception}"
                log.debug("bozo feed %s: %s", url, parsed.bozo_exception)
                continue

            for entry in parsed.entries:
                title = getattr(entry, "title", "") or ""
                summary_raw = getattr(entry, "summary", "") or ""
                summary = _strip_html(summary_raw)[:_MAX_SUMMARY]
                link = getattr(entry, "link", "") or ""
                if not link:
                    continue
                text = f"{title} {summary}"
                all_items.append(
                    {
                        "source_id": source["id"],
                        "source_name": source.get("name", source["id"]),
                        "title": title,
                        "url": link,
                        "summary": summary,
                        "published_at": _parse_date(entry),
                        "signal_type": classify_type(text),
                        "risk_areas": classify_risk_areas(text),
                    }
                )

        except requests.RequestException as exc:
            last_error = f"HTTP error fetching {url}: {exc}"
            log.warning("fetch error %s: %s", url, exc)
        except Exception as exc:
            last_error = f"unexpected error fetching {url}: {exc}"
            log.warning("unexpected error %s: %s", url, exc, exc_info=True)

    return all_items, (last_error if not all_items else None)
