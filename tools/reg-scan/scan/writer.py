"""Output writers: latest.json, feed.xml, index.html.

ICS output is handled by deadlines.write_ics (already in the repo).
"""
import json
import re
from datetime import datetime
from html import unescape
from pathlib import Path


RISK_AREA_LABELS = {
    "balance-sheet": "balance sheet",
    "customer-outcomes": "customer outcomes",
    "boardroom-and-accountability": "boardroom accountability",
    "crime-and-sanctions": "crime and sanctions",
    "digital-resilience": "digital resilience",
    "ai-and-models": "AI and model governance",
    "digital-money": "digital money",
    "market-plumbing": "market plumbing",
}


def _xml_escape(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _why_text(item):
    sig_type = item.get("signal_type", "other")
    areas = item.get("risk_areas", [])
    deadline = item.get("deadline")
    area_str = ", ".join(areas) if areas else "general"
    if deadline:
        rev = f" Deadline: {deadline}."
    else:
        rev = " No explicit implementation or response deadline was extracted from the official feed."
    return f"A {sig_type} from {item.get('source_name', item['source_id'])} touching {area_str}.{rev}"


def _bottom_line(material, signals):
    if not material:
        return "No material signals this edition."
    top = material[0]
    themes = set()
    for s in material:
        for a in s.get("risk_areas", []):
            themes.add(a)
    consultations = [s for s in signals if s.get("signal_type") == "consultation"]
    cons_note = (
        f" {len(consultations)} open consultation(s) to influence - prioritise responses."
        if consultations else ""
    )
    return (
        f'The clearest trigger this edition is "{top["title"]}" '
        f'from {top.get("source_name", top.get("source_id", ""))} '
        f'({top.get("signal_type", "other")}). '
        f"Material signals span {len(themes)} of 8 watch themes.{cons_note}"
    )


def _editorial_fields(item, source):
    """Create concise operating prompts from the classified source record."""
    sig_type = item.get("signal_type", "other")
    areas = [RISK_AREA_LABELS.get(area, area) for area in item.get("risk_areas", [])]
    area_text = ", ".join(areas) if areas else "the applicable business and control areas"
    jurisdictions = source.get("jurisdictions", [])
    jurisdiction_text = ", ".join(jurisdictions) if jurisdictions else "the source's market"
    source_name = source.get("name", item.get("source_id", "the authority"))
    date = (item.get("published_at") or "")[:10]
    summary = unescape((item.get("summary") or "").strip())
    summary = re.sub(r"<[^>]+>", " ", summary)
    summary = re.sub(r"\s+", " ", summary).strip()
    type_labels = {
        "final-rule": "final rule",
        "guidance": "guidance note",
        "enforcement": "enforcement action",
    }
    type_label = type_labels.get(sig_type, sig_type.replace("-", " "))
    change = summary or f"{source_name} published a {type_label} on {date}."

    prompts = {
        "consultation": (
            "Decide whether to respond and route the position through the relevant governance forum.",
            "Approved response, impact assessment, or documented decision not to respond.",
        ),
        "final-rule": (
            "Confirm applicability and commission a gap assessment before the implementation date.",
            "Applicability assessment, gap analysis, and implementation plan with dated milestones.",
        ),
        "guidance": (
            "Test the supervisory expectation against current policy, controls, and evidence.",
            "Control mapping, accountable owner, and evidence of supervisory-readiness review.",
        ),
        "enforcement": (
            "Run a read-across against comparable exposure and confirm control ownership.",
            "Read-across memo, control findings, and remediation log where needed.",
        ),
        "statement": (
            "Assess whether the policy direction changes planning assumptions or governance priorities.",
            "Governance note recording the decision, owner, and next review date.",
        ),
    }
    action, evidence = prompts.get(
        sig_type,
        (
            "Confirm applicability and route an owner for review before treating the item as material.",
            "Applicability note, named owner, and dated committee or working-group brief.",
        ),
    )
    deadline = item.get("deadline")
    if deadline:
        action = f"{action} Work to the extracted date of {deadline}."

    return {
        "change": change,
        "affected": f"{area_text.capitalize()} teams and control owners in {jurisdiction_text}.",
        "implication": f"The item may change expectations for {area_text}; confirm applicability before relying on existing evidence.",
        "owner": f"Accountable owner for {area_text} applicability and governance review.",
        "action": action,
        "evidence": evidence,
    }


def fmt_signal(item, source):
    return {
        "authorityId": item["source_id"],
        "title": item["title"],
        "url": item["url"],
        "source": source.get("name", item["source_id"]),
        "sourceStatus": source.get("status", "approved"),
        "jurisdictions": source.get("jurisdictions", []),
        "date": (item.get("published_at") or "")[:10],
        "type": item.get("signal_type", "other"),
        "riskAreas": item.get("risk_areas", []),
        "why": _why_text(item),
        "editorial": _editorial_fields(item, source),
        "score": item.get("score", 0),
        "deadline": item.get("deadline"),
        "deadlineEvidence": item.get("deadline_evidence"),
        "changeStatus": item.get("change_status", "new"),
        "changeEvidence": item.get("change_evidence", {}),
        "confidence": item.get("confidence", {"score": 0, "band": "unknown", "components": {}}),
        "businessImpact": item.get("business_impact", {"score": 0, "band": "unknown", "drivers": {}}),
        "also": item.get("also", []),
    }


def fmt_horizon(h):
    """Convert a raw deadlines.horizon() entry to the edition JSON format."""
    return {
        "date": h["deadline"],
        "stage": h.get("deadline_stage", "other"),
        "band": h["band"],
        "daysLeft": h["days_left"],
        "title": h["title"],
        "source": h.get("source_name", h.get("source_id", "")),
        "url": h["url"],
        "prompts": h.get("prompts", {}),
    }


def build_edition(
    signals,
    horizon_entries,
    sources_by_id,
    edition,
    generated_at,
    warnings,
    window_days=7,
):
    """Assemble the full edition dict suitable for latest.json."""
    material = [s for s in signals if s.get("score", 0) >= 0.85]
    themes = set()
    for s in material:
        for a in s.get("risk_areas", []):
            themes.add(a)

    active_sources = len({s["source_id"] for s in signals})
    active_jurisdictions = sorted({
        jurisdiction
        for signal in signals
        for jurisdiction in sources_by_id.get(signal["source_id"], {}).get("jurisdictions", [])
    })
    total_primary = sum(1 for s in sources_by_id.values() if s.get("tier") == "primary")

    return {
        "edition": edition,
        "generatedAt": generated_at.strftime("%Y-%m-%d %H:%M UTC"),
        "windowDays": window_days,
        "status": "published" if material else "withheld",
        "kpis": {
            "material": len(material),
            "themes": len(themes),
            "sources": active_sources,
            "jurisdictions": len(active_jurisdictions),
            "coverage": f"{active_sources} of {total_primary}",
        },
        "bottomLine": _bottom_line(material, signals),
        "horizon": [fmt_horizon(h) for h in horizon_entries],
        "signals": [fmt_signal(s, sources_by_id.get(s["source_id"], {})) for s in signals],
        "warnings": warnings,
        "reviewQueue": [],
        "heldLowConfidence": 0,
        "runMetrics": {},
    }


def write_json(data, path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def write_feed_xml(signals, sources_by_id, path, generated_at):
    """Write a simple RSS 2.0 feed of the top signals."""
    items_xml = []
    for s in signals[:25]:
        src = sources_by_id.get(s["source_id"], {})
        pub = (s.get("published_at") or "")[:10] or generated_at.date().isoformat()
        items_xml.append(
            "    <item>\n"
            f"      <title>{_xml_escape(s['title'])}</title>\n"
            f"      <link>{_xml_escape(s['url'])}</link>\n"
            f"      <pubDate>{pub}</pubDate>\n"
            f"      <source>{_xml_escape(src.get('name', s['source_id']))}</source>\n"
            f"      <category>{_xml_escape(s.get('signal_type', 'other'))}</category>\n"
            "    </item>"
        )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0">\n'
        "  <channel>\n"
        f"    <title>St Georges Strategy - Regulatory Horizon {generated_at.date()}</title>\n"
        "    <link>https://stgeorgesstrategy.com/regulatory-horizon</link>\n"
        f"    <lastBuildDate>{generated_at.strftime('%Y-%m-%d %H:%M UTC')}</lastBuildDate>\n"
        + "\n".join(items_xml)
        + "\n  </channel>\n</rss>\n"
    )
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(xml, encoding="utf-8")


def write_html(data, path):
    """Write a minimal HTML index for the edition."""
    edition = data.get("edition", "")
    rows = ""
    for s in data.get("signals", []):
        rows += (
            f'<tr><td>{s.get("date", "")}</td>'
            f'<td><a href="{_xml_escape(s["url"])}">{_xml_escape(s["title"])}</a></td>'
            f'<td>{_xml_escape(s["source"])}</td>'
            f'<td>{s.get("type", "")}</td>'
            f'<td>{s.get("score", "")}</td></tr>\n'
        )
    horizon_rows = ""
    for h in data.get("horizon", []):
        horizon_rows += (
            f'<tr><td>{h.get("date", "")}</td>'
            f'<td>{h.get("band", "")}</td>'
            f'<td><a href="{_xml_escape(h["url"])}">{_xml_escape(h["title"])}</a></td>'
            f'<td>{h.get("source", "")}</td></tr>\n'
        )
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Regulatory Horizon - {edition}</title>
  <style>
    body {{ font-family: sans-serif; max-width: 960px; margin: 2em auto; color: #111 }}
    h1 {{ font-size: 1.4em }} h2 {{ font-size: 1.1em; margin-top: 2em }}
    table {{ border-collapse: collapse; width: 100% }}
    th, td {{ border: 1px solid #ccc; padding: 6px 10px; text-align: left }}
    th {{ background: #f4f4f4 }}
    p.bottom-line {{ background: #f9f9f9; border-left: 4px solid #ccc; padding: .75em 1em }}
  </style>
</head>
<body>
<h1>Regulatory Horizon - {edition}</h1>
<p>Generated: {data.get("generatedAt", "")}</p>
<p class="bottom-line">{_xml_escape(data.get("bottomLine", ""))}</p>
<h2>Signals</h2>
<table>
  <tr><th>Date</th><th>Title</th><th>Source</th><th>Type</th><th>Score</th></tr>
  {rows}
</table>
<h2>Horizon</h2>
<table>
  <tr><th>Date</th><th>Band</th><th>Title</th><th>Source</th></tr>
  {horizon_rows}
</table>
</body>
</html>"""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
