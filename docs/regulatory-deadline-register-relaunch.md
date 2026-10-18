# Regulatory Horizon: private evidence and public release gate

Regulatory Horizon is published through the canonical site release when its current private evidence passes the QA gate. A separate per-edition editor or product-owner pre-approval is not required. The scanner never publishes directly: only the canonical `Site release (Cloudflare)` workflow can publish and verify the page, feed, calendar, data and dated archive.

Scanner output is a candidate, not a confirmation: a date becomes eligible for QA only when its `confirmed` source-date decision and quoted primary evidence are recorded in `dashboard/regulatory-deadline-register/approvals.json`; reviewing or merging the scan PR accepts the private dataset, not the public release, which still requires a separate reviewed site change and passing canonical release gates.

## Operating loop

1. The weekly scanner fetches the active official sources over the governed 90-day discovery lookback and records source health. Manual runs may use 30–180 days; a shorter run is not valid evidence for relaunch. If a governed manual rerun needs a specific edition date, use `npm run reg-scan:run -- --window 90 --as-of YYYY-MM-DD`; do not let an incorrect host clock silently reuse an older edition.
2. The private register carries open deadlines forward for 30 days after their date.
3. Every candidate enters `review.json`. A high-confidence extraction is **ready for review**, never automatically editorially confirmed.
4. A decision record in `approvals.json` is `confirmed`, `rejected` or `not-applicable`. It names the reviewer, date, decision scope and evidence. `source-date-only` confirms the primary-source fact only; it must not be represented as an applicability determination.
5. The QA report records correctness, coverage, concentration, freshness and shadow-run history.

## Public release gate

The public edition is eligible for a canonical release only when all of the following are true:

- no register correctness blockers;
- scanner edition is no more than eight days old;
- at least four core authorities have been healthy for each of the most recent three **distinct-day** shadow runs; repeated retries on one day count once;
- at least eight editorially confirmed, **maintained** milestones from four or more authorities. A maintained milestone is a confirmed future deadline or a confirmed date within the register's 30-day carry-forward window;
- at least four of those maintained milestones are genuinely upcoming deadlines. Six is the coverage target, not a publication blocker for a selective horizon;
- no authority supplies more than 60% of maintained confirmed milestones;

The public page remains source-linked, shows forthcoming confirmed dates only, labels target dates, and identifies the edition date. The per-edition `relaunch-approval.json` record is retained as historical audit data and is not a release dependency.

The source-health core is FCA, Bank of England/PRA, HM Treasury, EBA, ESMA, ECB Banking Supervision and OFSI. A zero-yield source can be healthy; a failed, blocked, degraded or unconfigured source cannot.

This is deliberately a stability-and-reader-value gate, not a requirement to keep a volatile count of ten future dates open at once. Closed dates are evidence that the register is maintained; they must never be presented to readers as upcoming actions. Four future dates across the maintained register are enough for a useful, explicitly selective reader view.

## What the scheduled scan does

The weekly workflow tests the scanner, runs the scan, builds the private register and QA report, then opens an editorial-review PR. It does not update the public site directly. A later canonical site release publishes a current edition only when the private register and QA report pass the public release gate.
