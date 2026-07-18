"""Small dependency-free normalization helpers used across reg-scan."""
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
import re
from datetime import datetime, timezone


def canonicalize_url(raw_url):
    """Remove fragments and tracking parameters without losing document IDs."""
    parts = urlsplit(raw_url)
    query = urlencode([
        (key, value) for key, value in parse_qsl(parts.query, keep_blank_values=True)
        if not key.lower().startswith("utm_") and key.lower() not in {"fbclid", "gclid"}
    ])
    path = parts.path.rstrip("/") or "/"
    return urlunsplit((parts.scheme, parts.netloc.lower(), path, query, ""))


def infer_date_from_url(raw_url):
    """Recover official publication dates encoded as /YYYYMMDD/ in URLs."""
    match = re.search(r"(?:^|/)(20\d{2})(\d{2})(\d{2})(?:/|\.|-|$)", raw_url or "")
    if not match:
        return None
    try:
        parsed = datetime(int(match[1]), int(match[2]), int(match[3]), tzinfo=timezone.utc)
    except ValueError:
        return None
    return parsed.isoformat()
