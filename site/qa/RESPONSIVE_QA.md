# Responsive QA Notes

Status date: 2026-07-04

This folder contains artifact-backed responsive QA for the full mockup.

## Full Site Pass

Captured with local headless Google Chrome against the file-based mockup.

Pages checked:

- Home
- Weekly Brief
- Signals hub
- AI
- Operational resilience
- Third-party and vendor risk
- Market structure
- Financial crime
- Cyber
- Technology failure
- Data
- Reg Horizon
- Archive
- About

Viewports checked:

- 320px
- 390px
- 768px
- 1440px

Artifacts:

- Screenshots are in `qa/responsive/`.
- Machine report is `qa/responsive/responsive-report.json`.
- Capture/check script is `qa/responsive-check.mjs`.

Result:

- 14 pages checked.
- 56 screenshots captured.
- 0 horizontal overflow findings after fixing the homepage coverage ticker.

Fix applied:

- Homepage coverage ticker now wraps below desktop width instead of behaving as a horizontal strip on mobile/tablet.

Remaining production note:

- This is mockup QA, not staging QA. Repeat the same pass on the staged production routes after redirects, analytics, and final deployment paths are configured.
