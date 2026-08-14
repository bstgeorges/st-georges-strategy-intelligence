# Private regulatory deadline register

This directory is the internal operating layer for Regulatory Horizon while the public page is withdrawn. It is deliberately not published by the site build.

`register.json` is cumulative: a deadline remains visible until 30 days after its date. A revised deadline at the same source URL supersedes the earlier record, which stays visible as history but cannot count as an open deadline. `review.json` contains every unapproved candidate. High extraction confidence makes an item ready for review; it does not turn scanner output into an editorially confirmed deadline. `health.json` separates a quiet authority from a failed or blocked one. `qa.json` records the relaunch gate; a high readiness score alone never makes the public page eligible.

`verified-deadlines.json` is a small, source-verified carry-forward layer for current deadlines that pre-date the weekly scanner window. Every record must link to a primary authority, record the date of the direct source check and preserve the deadline wording. These records are still private and unapproved: they can increase the reviewable operating universe, but cannot increase the confirmed count or satisfy the public relaunch gate. Re-check a carry-forward record at least every 14 days; the QA report raises a warning when it becomes stale.

Run `npm run deadline-register:build` after a successful scanner run, then `npm run deadline-register:validate`. Decisions in `approvals.json` can promote or reject an individual item without changing the scanner's raw evidence.

`npm run deadline-dashboard:build` creates the local `index.html` operating dashboard from the register, review, health and QA files. It has the cumulative deadline table, urgency outlook, review queue, relaunch gates, source health and a filtered CSV export. It is deliberately generated only inside this private directory and is not copied by the public site build.

`relaunch-approval.json` is deliberately blank by default. A relaunch needs a current scanner edition plus named, dated editor and product-owner approvals with a short rationale. Recording that approval never republishes the page; the public redirect stays in place until a separate product change is approved.

The register is private. Do not add it to `site/`, `site-dist/`, sitemap generation, or public release metadata without clearing the relaunch gates.
