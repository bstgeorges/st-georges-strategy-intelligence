"""Deadline extraction and .ics calendar generation.

Extracts consultation-close / in-force dates from item text with deterministic
regexes (UK/EU date styles). No NLP — a date only counts if it sits near a
deadline cue ("closes", "by", "until", "enters into force", "deadline",
"responses", "comments", "feedback", "applies from", "takes effect").
"""
import re
from datetime import date, datetime

MONTHS = {m.lower(): i + 1 for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"])}
_MONTH_RX = "|".join(MONTHS)

CUES = re.compile(
    r"(closes?|closing|by|until|before|deadline|respond|responses?|comments?|"
    r"feedback|enters? into force|entry into force|takes? effect|applies from|"
    r"applicable from|effective|due|submit)", re.I)

DATE_RX = re.compile(
    rf"\b(\d{{1,2}})(?:st|nd|rd|th)?\s+({_MONTH_RX})(?:\s+(\d{{4}}))?\b", re.I)

WINDOW = 90  # chars of context around a date that must contain a cue


def _resolve_year(day, month, year, published):
    if year:
        return int(year)
    base = published.year
    candidate = date(base, month, min(day, 28))
    if candidate < published.date():
        base += 1
    return base


def extract_deadline(text, published_at):
    """Return ISO date string for the first cued future date in text, else None."""
    if not text or not published_at:
        return None
    published = datetime.fromisoformat(published_at.replace("Z", "+00:00"))
    best = None
    for m in DATE_RX.finditer(text):
        ctx = text[max(0, m.start() - WINDOW): m.end() + WINDOW]
        if not CUES.search(ctx):
            continue
        day, month = int(m.group(1)), MONTHS[m.group(2).lower()]
        year = _resolve_year(day, month, m.group(3), published)
        try:
            d = date(year, month, day)
        except ValueError:
            continue
        if d < published.date():
            continue
        if best is None or d < best:
            best = d
    return best.isoformat() if best else None


def annotate(records):
    """Attach rec['deadline'] (ISO date or None) to each record in place."""
    for rec in records:
        text = f"{rec.get('title', '')}. {rec.get('summary', '')}"
        rec["deadline"] = extract_deadline(text, rec.get("published_at"))
    return records


BANDS = ("0-30", "31-60", "61-90", "90+")

PROMPTS = {
    "consultation": {
        "owner": "Who decides whether we respond — and who drafts?",
        "action": "Log the closing date; decide respond / monitor at least two weeks before it.",
        "evidence": "Response draft, or a documented decision not to respond."},
    "final-rule": {
        "owner": "Who is accountable for implementation?",
        "action": "Commission a gap analysis against current state before the in-force date.",
        "evidence": "Gap analysis and implementation plan with dated milestones."},
    "deadline": {
        "owner": "Who files or attests?",
        "action": "Confirm the submission sits in the compliance calendar with a named preparer.",
        "evidence": "Filed submission, or the documented waiver rationale."},
    "enforcement": {
        "owner": "Who checks our exposure to the same failure?",
        "action": "Run a read-across review against our own controls.",
        "evidence": "Read-across memo with findings and any remediation actions."},
    "other": {
        "owner": "Who owns the applicability read and committee brief?",
        "action": "Decide applicability, owner, and forum before the item becomes a late calendar surprise.",
        "evidence": "Applicability note, named owner, and dated committee or working-group brief."},
}


def band(days_left):
    if days_left <= 30:
        return "0-30"
    if days_left <= 60:
        return "31-60"
    if days_left <= 90:
        return "61-90"
    return "90+"


def prompts_for(rec):
    return PROMPTS.get(rec.get("signal_type", "other"), PROMPTS["other"])


def eligible_horizon_records(records, sources_by_id, allowed_statuses=("approved",)):
    """Only allow horizon candidates from explicitly allowed source statuses."""
    allowed = set(allowed_statuses)
    return [
        rec for rec in records
        if sources_by_id.get(rec.get("source_id"), {}).get("status") in allowed
    ]


def horizon(records, today, limit=12):
    """Future-dated deadline entries, soonest first, with days_left, 30/60/90
    band, and owner/action/evidence prompts attached."""
    out, seen = [], set()
    for rec in records:
        if rec.get("deadline") and rec["deadline"] >= today.date().isoformat():
            key = (rec["deadline"], rec["url"])
            if key in seen:
                continue
            seen.add(key)
            rec["days_left"] = (date.fromisoformat(rec["deadline"]) - today.date()).days
            rec["band"] = band(rec["days_left"])
            rec["prompts"] = prompts_for(rec)
            out.append(rec)
    out.sort(key=lambda r: r["deadline"])
    return out[:limit]


def by_band(entries):
    """Group horizon entries into ordered (band, entries) pairs, skipping empties."""
    grouped = {b: [] for b in BANDS}
    for rec in entries:
        grouped[rec["band"]].append(rec)
    return [(b, grouped[b]) for b in BANDS if grouped[b]]


def _ics_escape(s):
    return s.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def write_ics(entries, path, generated_at):
    """Write all-day VEVENTs for each deadline entry."""
    from . import db
    stamp = generated_at.strftime("%Y%m%dT%H%M%SZ")
    lines = [
        "BEGIN:VCALENDAR", "VERSION:2.0",
        "PRODID:-//reg-scan//regulatory-horizon//EN",
        "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
        "X-WR-CALNAME:Regulatory horizon deadlines",
    ]
    for rec in entries:
        d = rec["deadline"].replace("-", "")
        lines += [
            "BEGIN:VEVENT",
            f"UID:{db.url_hash(rec['url'])[:16]}@reg-scan",
            f"DTSTAMP:{stamp}",
            f"DTSTART;VALUE=DATE:{d}",
            f"SUMMARY:{_ics_escape('[' + rec['source_name'] + '] ' + rec['title'])}",
            f"DESCRIPTION:{_ics_escape(rec['url'])}",
            f"URL:{rec['url']}",
            "TRANSP:TRANSPARENT",
            "END:VEVENT",
        ]
    lines.append("END:VCALENDAR")
    path.write_text("\r\n".join(lines) + "\r\n", encoding="utf-8")
    return path
