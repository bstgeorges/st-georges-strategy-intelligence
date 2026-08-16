# Regulatory Horizon: private rebuild and relaunch gate

Regulatory Horizon is withdrawn from the public site. The internal deadline register is the only operating surface until this gate is met and a separate product decision restores a public route.

## Operating loop

1. The weekly scanner fetches the active official sources over the governed 90-day discovery lookback and records source health. Manual runs may use 30–180 days; a shorter run is not valid evidence for relaunch.
2. The private register carries open deadlines forward for 30 days after their date.
3. Every candidate enters `review.json`. A high-confidence extraction is **ready for review**, never automatically editorially confirmed.
4. An editor records an approve or reject decision in `approvals.json` using the register item ID.
5. The QA report records correctness, coverage, concentration, freshness and shadow-run history.

## Hard relaunch gate

The public route remains off unless all of the following are true:

- no register correctness blockers;
- scanner edition is no more than eight days old;
- at least four core authorities have been healthy for each of the most recent three shadow runs;
- at least ten editorially confirmed open deadlines from four or more authorities;
- no authority supplies more than 60% of confirmed deadlines;
- the editor and product owner explicitly approve the return of a public page in `dashboard/regulatory-deadline-register/relaunch-approval.json`. Both approvals must be named, dated, reasoned, and tied to the current scanner edition.

The source-health core is FCA, Bank of England/PRA, HM Treasury, EBA, ESMA, ECB Banking Supervision and OFSI. A zero-yield source can be healthy; a failed, blocked, degraded or unconfigured source cannot.

## What the scheduled scan does

The weekly workflow now tests the scanner, runs the scan, builds the private register and QA report, then opens an editorial-review PR. It does not update the public site. A merge of that PR keeps the public redirect in place.
