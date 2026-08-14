# Private regulatory deadline register

This directory is the internal operating layer for Regulatory Horizon while the public page is withdrawn. It is deliberately not published by the site build.

`register.json` is cumulative: a deadline remains visible until 30 days after its date. A revised deadline at the same source URL supersedes the earlier record, which stays visible as history but cannot count as an open deadline. `review.json` contains every unapproved candidate. High extraction confidence makes an item ready for review; it does not turn scanner output into an editorially confirmed deadline. `health.json` separates a quiet authority from a failed or blocked one. `qa.json` records the relaunch gate; a high readiness score alone never makes the public page eligible.

Run `npm run deadline-register:build` after a successful scanner run, then `npm run deadline-register:validate`. Decisions in `approvals.json` can promote or reject an individual item without changing the scanner's raw evidence.

`relaunch-approval.json` is deliberately blank by default. A relaunch needs a current scanner edition plus named, dated editor and product-owner approvals with a short rationale. Recording that approval never republishes the page; the public redirect stays in place until a separate product change is approved.

The register is private. Do not add it to `site/`, `site-dist/`, sitemap generation, or public release metadata without clearing the relaunch gates.
