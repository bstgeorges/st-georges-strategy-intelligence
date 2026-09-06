"""Deadline extraction and .ics calendar generation.

Extracts consultation-close / in-force dates from primary-document text with
deterministic regexes (UK/EU date styles). No NLP — a date only counts when an
explicit deadline or effective-date trigger occurs in the same bounded clause.
"""
import re
from datetime import date, datetime

MONTHS = {m.lower(): i + 1 for i, m in enumerate(
    ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"])}
MONTHS.update({m[:3].lower(): value for m, value in list(MONTHS.items())})
_MONTH_RX = "|".join(MONTHS)

# These are deliberately relationship phrases, not topic words.  In particular
# a bare "by", "effective", "comments" or page date cannot create a deadline.
# The date must appear in the same clause as one of these explicit triggers.
EXPLICIT_TRIGGERS = re.compile(
    r"\b(?:deadline|closing date)\b|"
    r"\b(?:consultation|comment period|call for evidence)\s+(?:will\s+)?clos(?:e|es|ing)\b|"
    r"\b(?:responses?|comments?|feedback|submissions?)\s+(?:must\s+be\s+)?(?:received|submitted|provided)\s+(?:by|before|no later than)\b|"
    r"\b(?:responses?|comments?|feedback|submissions?)\s+(?:are|is)?\s*(?:due|close)\s+(?:by|on|before)\b|"
    r"\b(?:due|deadline)\s+(?:by|on|before)\b|"
    r"\b(?:effective|applicable)\s+(?:from|on)\b|"
    r"\b(?:enters?|entry)\s+into\s+force(?:\s+(?:from|on))?\b|"
    r"\btakes?\s+effect\s+(?:from|on)\b|"
    r"\b(?:date\s+limite|échéance|fecha\s+l[ií]mite|plazo|frist)\b|"
    r"(?:réponses?|commentaires?)\s+(?:jusqu(?:'|’|\s+au)|doivent\s+[êe]tre\s+re[çc]us)\b|"
    r"(?:至|締切|截止|截止日期)|(?:まで)(?:\s|$)",
    re.I,
)

# Accept the dominant official-publication forms globally: UK/EU text dates,
# US month-first dates, ISO dates, dotted/slashed numeric dates, and Japanese
# era-independent dates (YYYY年M月D日).  Candidate validation happens below.
DATE_RX = re.compile(
    rf"(?:\b(\d{{1,2}})(?:st|nd|rd|th)?\s+({_MONTH_RX})(?:\s+(\d{{4}}))?\b|"
    rf"\b({_MONTH_RX})\s+(\d{{1,2}})(?:st|nd|rd|th)?(?:,?\s+(\d{{4}}))?\b|"
    r"\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b|"
    r"\b(\d{1,2})[./](\d{1,2})[./](\d{4})\b|"
    r"(?<!\d)(\d{4})年(\d{1,2})月(\d{1,2})日)"
    , re.I)

CLAUSE_WINDOW = 160


def _clause(text, start, end):
    """Return a short clause around a date, stopping at sentence boundaries."""
    left = max(text.rfind(mark, max(0, start - CLAUSE_WINDOW), start) for mark in ".!?;\n")
    right_positions = [text.find(mark, end, min(len(text), end + CLAUSE_WINDOW)) for mark in ".!?;\n"]
    right = min((pos for pos in right_positions if pos != -1), default=min(len(text), end + CLAUSE_WINDOW))
    return text[left + 1:right].strip(), left + 1


def _resolve_year(day, month, year, published):
    if year:
        return int(year)
    base = published.year
    candidate = date(base, month, min(day, 28))
    if candidate < published.date():
        base += 1
    return base


def extract_deadline_evidence(text, published_at):
    """Return explicit trigger evidence for the earliest future deadline.

    The function never treats a publication date as a deadline.  It records
    the trigger and source quote so an editor can reproduce the finding.
    """
    if not text or not published_at:
        return None
    published = datetime.fromisoformat(published_at.replace("Z", "+00:00"))
    best = None
    for m in DATE_RX.finditer(text):
        clause, clause_start = _clause(text, m.start(), m.end())
        triggers = list(EXPLICIT_TRIGGERS.finditer(clause))
        if not triggers:
            continue
        if m.group(1):
            day, month, year = int(m.group(1)), MONTHS[m.group(2).lower()], m.group(3)
        elif m.group(4):
            month, day, year = MONTHS[m.group(4).lower()], int(m.group(5)), m.group(6)
        elif m.group(7):
            year, month, day = int(m.group(7)), int(m.group(8)), int(m.group(9))
        elif m.group(10):
            day, month, year = int(m.group(10)), int(m.group(11)), m.group(12)
        else:
            year, month, day = int(m.group(13)), int(m.group(14)), int(m.group(15))
        year = _resolve_year(day, month, year, published)
        try:
            d = date(year, month, day)
        except ValueError:
            continue
        # A source page's publication date (including a same-day date) is never
        # a deadline.  This conservative rule prevents a common false positive.
        if d <= published.date():
            continue
        date_start = m.start() - clause_start
        # A deadline cue must govern a date that follows it.  This prevents a
        # structured page such as "Consultation Open Date: 28 Aug ...
        # Consultation Close Date: 28 Sep" from assigning the opening date to
        # the later close-date label merely because both occur in one scraped
        # clause. Conservative omission is safer than inventing a deadline.
        preceding = [cue for cue in triggers if cue.end() <= date_start]
        if preceding:
            trigger = min(preceding, key=lambda cue: date_start - cue.end())
            trigger_distance = date_start - trigger.end()
        else:
            # Japanese, Chinese and Korean deadline grammar can place an
            # unambiguous postfix cue directly after the date (for example,
            # "2026年9月30日まで"). Keep that narrow exception rather than
            # permitting arbitrary later "deadline" text to govern a date.
            date_end = m.end() - clause_start
            postfix = [
                cue for cue in triggers
                if re.fullmatch(r"(?:至|締切|截止|截止日期|まで)", cue.group(0))
                and 0 <= cue.start() - date_end <= 24
            ]
            if not postfix:
                continue
            trigger = min(postfix, key=lambda cue: cue.start() - date_end)
            trigger_distance = trigger.start() - date_end
        # A trigger somewhere in a long clause is still not evidence that it
        # governs this date. Keep the relationship close and inspectable.
        if trigger_distance > 100:
            continue
        candidate = {
            "date": d.isoformat(),
            "trigger": trigger.group(0),
            "triggerDistance": trigger_distance,
            "quote": clause[:360],
            "source": "primary-document-detail",
        }
        if best is None or candidate["date"] < best["date"] or (candidate["date"] == best["date"] and trigger_distance < best["triggerDistance"]):
            best = candidate
    return best


def extract_deadline(text, published_at):
    """Return ISO date string for the first cued future date, else None."""
    evidence = extract_deadline_evidence(text, published_at)
    return evidence["date"] if evidence else None


def annotate(records):
    """Attach rec['deadline'] (ISO date or None) to each record in place."""
    for rec in records:
        # Listings and titles are discovery material; only successfully fetched
        # primary-document text is allowed to create a scanner deadline.
        text = rec.get("detail_text", "")
        evidence = extract_deadline_evidence(text, rec.get("published_at"))
        rec["deadline"] = evidence["date"] if evidence else None
        rec["deadline_evidence"] = evidence
        rec["deadline_stage"] = deadline_stage(text)
    return records


def deadline_stage(text):
    """Classify the meaning of a dated milestone from nearby regulatory cues."""
    value = (text or "").lower()
    if re.search(r"consultation|comments? due|responses?|feedback|commentaires?|réponses?", value):
        return "consultation-close"
    if re.search(r"enters? into force|entry into force|effective from|takes? effect|applicable from", value):
        return "effective/in-force"
    if re.search(r"implementation|implementing|transition(?:al)?|transitional", value):
        return "implementation/transition"
    if re.search(r"reporting|report due|return due|submit", value):
        return "reporting/submission"
    if re.search(r"review|reassessment|re-examin", value):
        return "review"
    return "other"


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
