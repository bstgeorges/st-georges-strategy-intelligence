# Private regulatory deadline register

This directory is the private operating layer for Regulatory Horizon. The public page is curated and released separately; this cumulative register, scanner output, review queue and dashboard are deliberately not published by the site build.

`register.json` is cumulative: a deadline remains visible until 30 days after its date. A revised deadline at the same source URL supersedes the earlier record, which stays visible as history but cannot count as an open deadline. `review.json` contains every unapproved candidate. High extraction confidence makes an item ready for review; it does not turn scanner output into an editorially confirmed deadline. `health.json` separates a quiet authority from a failed or blocked one. `qa.json` records the release gate; the current evidence, freshness, source health and coverage must all pass before publication.

`verified-deadlines.json` is a small, source-verified carry-forward layer for current deadlines that pre-date the weekly scanner window. Every record must link to a primary authority, record the date of the direct source check and preserve the deadline wording. These records are still private and unapproved: they can increase the reviewable operating universe, but cannot increase the confirmed count or satisfy the public relaunch gate. Re-check a carry-forward record at least every 14 days; the QA report raises a warning when it becomes stale.

`discovery.json` is the source-estate report. It distinguishes the global authority catalogue from the active primary-source intake and the last completed scanner run. Its purpose is to make coverage gaps visible; catalogue entries, scanner output and source health never confirm a deadline.

The active-intake policy carries a 90-day discovery lookback. This is deliberately distinct from the seven-day editorial signal window: a deadline-discovery run must state the window it actually used, and the dashboard labels the policy rather than implying a run was completed at that depth.

Run `npm run deadline-register:build` after a successful scanner run, then `npm run deadline-register:validate`. Scanner candidates need explicit deadline or effective-date wording from fetched primary-document text; a page date, title or nearby topic word is never enough. Decisions in `approvals.json` are `confirmed`, `rejected` or `not-applicable`, with a declared scope: `source-date-only` confirms the cited fact but does not imply firm applicability; `applicability` records that business judgement. Every unavailable source is governed in `source-exceptions.json` rather than disappearing from the process.

`npm run deadline-dashboard:build` refreshes `discovery.json` then creates the local `index.html` operating dashboard from the register, review, health, quality gate and source estate. It has the cumulative deadline table, urgency outlook, review queue, relaunch gates, source health and a filtered CSV export. It is deliberately generated only inside this private directory and is not copied by the public site build.

`relaunch-approval.json` is retained as historical audit data. Public publication does not require per-edition pre-approval; the current private register must pass validation and the quality gate, and publication still requires the canonical site release workflow and SHA verification.

The register is private. Do not add it to `site/`, `site-dist/`, sitemap generation, or public release metadata. The site build publishes a reader-facing Horizon page, feed, calendar and archive from the validated register when the freshness and quality gates pass.
