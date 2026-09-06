# Regulatory Horizon: relaunch decision record — 6 September 2026

## Status

The public Regulatory Horizon remains **withheld**. The private register has met its numerical and evidence-quality gate, but no editor and product owner have authorised a public relaunch. Recording approval is a product decision; it must never be inferred from scanner output or this record.

## Evidence reviewed

- A governed 90-day private scan completed on 6 September 2026: 48 of 53 official sources were healthy.
- The private register has 10 confirmed open dates from 7 authorities. No authority accounts for more than 30% of those dates.
- The seven core authorities have been healthy across the most recent three shadow runs.
- Strict private-register validation reports 100/100 with no errors or warnings.
- The known exceptions are governed and due for recheck on 13 September: IOSCO, BCBS and Consob blocked; Banco Central do Brasil degraded; South African Reserve Bank failed.

## Extraction correction

The Hong Kong Monetary Authority consultation record was previously assigned its 28 August opening date as a deadline. The extractor now requires a governing date cue before the selected date (with a narrow exception for CJK postfix forms), so it reads the explicit **Consultation Close Date: 28 Sep 2026**. The erroneous 28 August record is retained as a rejected audit entry and the 28 September record is in private review.

## Decision required

Before any public route is restored, complete `dashboard/regulatory-deadline-register/relaunch-approval.json` with both named approvers, today’s scanner edition (`2026-09-06`) and a reasoned decision:

```json
{
  "approved": true,
  "sourceEdition": "2026-09-06",
  "editor": "<named editor>",
  "productOwner": "<named product owner>",
  "reason": "<why this evidence is sufficient for a public horizon>"
}
```

This approval is necessary but not sufficient to publish. A separate, reviewed product change must restore the public route, build the site, verify it and complete the canonical release workflow.
