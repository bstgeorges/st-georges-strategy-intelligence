"""Entry point for `python -m scan`.

Run from the tools/reg-scan/ directory:

    python -m scan               # live scan, writes docs/
    python -m scan --dry-run     # fetch + score, print JSON, no file writes
    python -m scan --window 14   # extend lookback to 14 days (default: 7)
"""
import argparse
import json
import logging
import re
from difflib import SequenceMatcher
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
    return {s["id"]: s for s in sources if s["id"] in _feeds.REGULATORY_SOURCE_IDS}


def _deduplicate(items):
    seen = set()
    out = []
    for item in items:
        url = item.get("url", "")
        if url and url not in seen:
            seen.add(url)
            out.append(item)
    return out


def _reconcile_sources(items):
    """Cluster likely cross-source duplicates while preserving source trails."""
    clusters = []
    for item in items:
        title = re.sub(r"[^a-z0-9 ]", " ", (item.get("title") or "").lower())
        title = re.sub(r"\b(consultation|consultations|guidance|statement|final rule)\b", " ", title)
        title = re.sub(r"\s+", " ", title).strip()
        match = next((cluster for cluster in clusters if SequenceMatcher(None, title, cluster["key"]).ratio() >= 0.86), None)
        if not match:
            clusters.append({"key": title, "item": item, "also": []})
        else:
            match["also"].append({"source": item.get("source_name", item.get("source_id")), "url": item.get("url")})
            if item.get("score", 0) > match["item"].get("score", 0):
                previous = match["item"]
                match["item"] = item
                match["also"].append({"source": previous.get("source_name", previous.get("source_id")), "url": previous.get("url")})
    out = []
    for cluster in clusters:
        item = cluster["item"]
        item["also"] = cluster["also"]
        out.append(item)
    return out


def _is_recent(published_at, cutoff, generated_at):
    """Fail closed on missing, invalid, stale or materially future dates."""
    if not published_at:
        return False
    try:
        published = datetime.fromisoformat(published_at.replace("Z", "+00:00"))
        if published.tzinfo is None:
            published = published.replace(tzinfo=timezone.utc)
    except ValueError:
        return False
    return cutoff <= published <= generated_at + timedelta(days=1)


def _semantic_change(old, item):
    """Classify meaningful publication changes using deterministic evidence."""
    old_title = old.get("title") or ""
    new_title = item.get("title") or ""
    old_summary = old.get("summary") or ""
    new_summary = item.get("summary") or ""
    old_deadline, new_deadline = old.get("deadline"), item.get("deadline")
    if old_deadline and new_deadline and new_deadline > old_deadline:
        return "extended"
    combined = f"{new_title} {new_summary}".lower()
    if re.search(r"\b(withdrawn|withdrawal|cancelled|canceled|superseded|replaced|revoked)\b", combined):
        return "withdrawn" if re.search(r"\bwithdraw", combined) else "superseded"
    similarity = SequenceMatcher(None, f"{old_title} {old_summary}", f"{new_title} {new_summary}").ratio()
    if similarity < 0.72 or old_title != new_title:
        return "changed"
    return "unchanged"


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
    source_health = []

    for source_id, source in sources_by_id.items():
        feed_urls = _feeds.FEED_MAP.get(source_id)
        page_configs = _feeds.PAGE_MAP.get(source_id)
        sitemap_configs = _feeds.SITEMAP_MAP.get(source_id)
        if not feed_urls and not page_configs and not sitemap_configs:
            no_feed_sources.append(source_id)
            source_health.append({"sourceId": source_id, "status": "not-configured", "items": 0})
            continue

        if feed_urls:
            items, error = _fetch.fetch_source(source, feed_urls, _feeds.SOURCE_FILTERS)
        elif page_configs:
            items, error = _fetch.fetch_page_source(source, page_configs, _feeds.SOURCE_FILTERS)
        else:
            items, error = _fetch.fetch_sitemap_source(source, sitemap_configs, _feeds.SOURCE_FILTERS)
        if error and not items:
            error_sources.append(source_id)
            if "blocked by anti-bot challenge" in error or "403 Client Error: Forbidden" in error:
                status = "blocked"
            elif "no recognisable publication rows" in error or "no matching publication URLs" in error:
                status = "degraded"
            else:
                status = "failed"
            source_health.append({"sourceId": source_id, "status": status, "items": 0, "error": error})
            log.warning("no items from %s: %s", source_id, error)
            continue

        # Filter to window
        recent = []
        for item in items:
            if _is_recent(item.get("published_at"), cutoff, generated_at):
                recent.append(item)

        _fetch.enrich_deadline_text(recent, max_items=8)
        _dl.annotate(recent)
        for item in recent:
            item["score"] = _score.score(item, source)
            item["confidence"] = _score.confidence(item, source)
        source_health.append({"sourceId": source_id, "status": "ok", "items": len(recent)})
        all_items.extend(recent)

    if not args.dry_run and conn is not None:
        prior = _db.previous_items(conn, [item["url"] for item in all_items])
        for item in all_items:
            old = prior.get(item["url"])
            if not old:
                item["change_status"] = "new"
            else:
                item["change_status"] = _semantic_change(old, item)
                if item["change_status"] != "unchanged":
                    item["change_evidence"] = {
                        "previousTitle": old.get("title"),
                        "currentTitle": item.get("title"),
                        "previousDeadline": old.get("deadline"),
                        "currentDeadline": item.get("deadline"),
                    }
        current_urls = {item["url"] for item in all_items}
        for old in _db.open_deadlines(conn, generated_at.date().isoformat()):
            if old["url"] in current_urls or old["source_id"] not in sources_by_id:
                continue
            all_items.append({
                **old,
                "source_name": sources_by_id[old["source_id"]].get("name", old["source_id"]),
                "risk_areas": json.loads(old.get("risk_areas") or "[]"),
                "change_status": "carried-forward",
            })
        _db.upsert_items(conn, all_items)
    else:
        for item in all_items:
            item["change_status"] = "new"

    signals = _reconcile_sources(_deduplicate(all_items))
    signals.sort(key=lambda x: x.get("score", 0), reverse=True)
    signals = [item for item in signals if _score.is_material(item)][:_score.MAX_SIGNALS]
    review_queue = [item for item in signals if item.get("confidence", {}).get("band") == "medium"]
    held_low_confidence = [item for item in signals if item.get("confidence", {}).get("band") == "low"]
    signals = [item for item in signals if item.get("confidence", {}).get("band") == "high"]

    warnings = []
    if review_queue:
        warnings.append({"type": "confidence-review", "severity": "medium", "message": f"{len(review_queue)} material signal(s) require confidence review before publication.", "count": len(review_queue)})
    if held_low_confidence:
        warnings.append({"type": "confidence-held", "severity": "high", "message": f"{len(held_low_confidence)} low-confidence signal(s) held from publication.", "count": len(held_low_confidence)})
    missing_sources = sorted(set(no_feed_sources + error_sources))
    if missing_sources:
        failed_share = len(error_sources) / max(1, len(sources_by_id))
        warnings.append({
            "type": "source-health",
            "severity": "high" if failed_share >= 0.5 else "medium" if failed_share >= 0.25 else "low",
            "message": (
                f"{len(missing_sources)} source(s) did not return usable items "
                f"(no feed configured or fetch error): "
                + ", ".join(missing_sources)
            ),
            "sourceIds": missing_sources,
        })

    primary_source_ids = {
        source_id for source_id, source in sources_by_id.items()
        if source.get("tier") == "primary"
    }
    active_source_ids = {item.get("source_id") for item in signals if item.get("source_id")}
    active_primary_count = len(active_source_ids & primary_source_ids)
    if primary_source_ids and active_primary_count / len(primary_source_ids) < 0.5:
        warnings.append({
            "type": "source-coverage",
            "severity": "high" if not signals else "medium",
            "message": (
                f"Only {active_primary_count} of {len(primary_source_ids)} primary authorities "
                "contributed material rows in this edition. Treat quiet themes as unconfirmed, "
                "not inactive."
            ),
            "activeSources": sorted(active_source_ids & primary_source_ids),
        })

    source_counts = {}
    for item in signals:
        source_id = item.get("source_id")
        if source_id:
            source_counts[source_id] = source_counts.get(source_id, 0) + 1
    if signals and source_counts:
        dominant_source_id, dominant_count = max(source_counts.items(), key=lambda pair: pair[1])
        dominant_share = dominant_count / len(signals)
        if dominant_share >= 0.5:
            warnings.append({
                "type": "source-concentration",
                "severity": "medium",
                "message": (
                    f"{sources_by_id[dominant_source_id].get('name', dominant_source_id)} supplies "
                    f"{dominant_count} of {len(signals)} material signals. Treat the edition as "
                    "directional rather than a complete cross-market view."
                ),
                "sourceId": dominant_source_id,
                "share": round(dominant_share, 3),
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
    data["sourceHealth"] = source_health
    data["reviewQueue"] = review_queue
    data["heldLowConfidence"] = len(held_low_confidence)

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
