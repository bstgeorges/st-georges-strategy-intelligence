"""Entry point for `python -m scan`.

Run from the tools/reg-scan/ directory:

    python -m scan               # live scan, writes docs/
    python -m scan --dry-run     # fetch + score, print JSON, no file writes
    python -m scan --window 14   # extend lookback to 14 days (default: 7)
"""
import argparse
import json
import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

from . import db as _db
from . import deadlines as _dl
from . import feeds as _feeds
from . import fetch as _fetch
from . import score as _score
from . import writer as _writer

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-5s %(name)s %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("scan")

# Paths resolved via __file__ so they work regardless of CWD
_PKG_ROOT = Path(__file__).parent.parent          # tools/reg-scan/
_REPO_ROOT = _PKG_ROOT.parent.parent              # repo root
_DOCS_DIR = _PKG_ROOT / "docs"
_SOURCE_REGISTRY = _REPO_ROOT / "dashboard" / "data" / "source-registry.json"


def _load_registry():
    with open(_SOURCE_REGISTRY, encoding="utf-8") as f:
        data = json.load(f)
    sources = data.get("sources", [])
    for s in sources:
        s.setdefault("status", "approved")
    return {s["id"]: s for s in sources}


def _deduplicate(items):
    seen = set()
    out = []
    for item in items:
        url = item.get("url", "")
        if url and url not in seen:
            seen.add(url)
            out.append(item)
    return out


def main():
    parser = argparse.ArgumentParser(description="Regulatory horizon signal scanner")
    parser.add_argument("--dry-run", action="store_true",
                        help="Fetch, score, and print JSON - but do not write any files")
    parser.add_argument("--window", type=int, default=7,
                        help="Lookback window in days (default: 7)")
    args = parser.parse_args()

    sources_by_id = _load_registry()
    generated_at = datetime.now(timezone.utc)
    edition = generated_at.date().isoformat()
    cutoff = generated_at - timedelta(days=args.window)

    conn = None if args.dry_run else _db.connect()
    all_items = []
    no_feed_sources = []
    error_sources = []

    for source_id, source in sources_by_id.items():
        feed_urls = _feeds.FEED_MAP.get(source_id)
        if not feed_urls:
            no_feed_sources.append(source_id)
            continue

        items, error = _fetch.fetch_source(source, feed_urls)
        if error and not items:
            error_sources.append(source_id)
            log.warning("no items from %s: %s", source_id, error)
            continue

        # Filter to window
        recent = []
        for item in items:
            pub = item.get("published_at")
            if pub:
                try:
                    pub_dt = datetime.fromisoformat(pub)
                    if pub_dt.tzinfo is None:
                        pub_dt = pub_dt.replace(tzinfo=timezone.utc)
                    if pub_dt < cutoff:
                        continue
                except ValueError:
                    pass
            recent.append(item)

        for item in recent:
            item["score"] = _score.score(item, source)

        _dl.annotate(recent)
        all_items.extend(recent)

    if not args.dry_run and conn is not None:
        _db.upsert_items(conn, all_items)

    signals = _deduplicate(all_items)
    signals.sort(key=lambda x: x.get("score", 0), reverse=True)
    signals = signals[: _score.MAX_SIGNALS]

    warnings = []
    missing_sources = sorted(set(no_feed_sources + error_sources))
    if missing_sources:
        warnings.append({
            "type": "source-health",
            "severity": "low",
            "message": (
                f"{len(missing_sources)} source(s) did not return usable items "
                f"(no feed configured or fetch error): "
                + ", ".join(missing_sources)
            ),
            "sourceIds": missing_sources,
        })

    horizon_raw = _dl.horizon(
        [s for s in signals if s.get("deadline")],
        generated_at,
        limit=12,
    )

    data = _writer.build_edition(
        signals=signals,
        horizon_entries=horizon_raw,
        sources_by_id=sources_by_id,
        edition=edition,
        generated_at=generated_at,
        warnings=warnings,
        window_days=args.window,
    )

    log.info(
        "edition=%s  signals=%d  material=%d  horizon=%d  sources-with-feed=%d",
        edition,
        len(signals),
        data["kpis"]["material"],
        len(horizon_raw),
        len(sources_by_id) - len(no_feed_sources),
    )

    if args.dry_run:
        print(json.dumps(data, indent=2, ensure_ascii=False))
        log.info("dry-run: no files written")
        return

    _DOCS_DIR.mkdir(parents=True, exist_ok=True)
    _writer.write_json(data, _DOCS_DIR / "latest.json")
    _writer.write_feed_xml(signals, sources_by_id, _DOCS_DIR / "feed.xml", generated_at)
    _writer.write_html(data, _DOCS_DIR / "index.html")

    if horizon_raw:
        _dl.write_ics(horizon_raw, _DOCS_DIR / "horizon.ics", generated_at)
    else:
        _dl.write_ics([], _DOCS_DIR / "horizon.ics", generated_at)

    archive_dir = _DOCS_DIR / "archive"
    archive_dir.mkdir(parents=True, exist_ok=True)
    _writer.write_json(data, archive_dir / f"{edition}.json")

    if conn is not None:
        _db.log_run(conn, edition, len(signals), len(sources_by_id) - len(no_feed_sources))
    log.info("outputs written to %s", _DOCS_DIR)


if __name__ == "__main__":
    main()
