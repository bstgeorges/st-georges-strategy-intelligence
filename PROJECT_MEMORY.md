# St Georges Strategy — Project Memory

Last consolidated: 2026-08-03

This file is the current working memory for future Codex sessions. It supplements the older `CODEX_HANDOVER.md`, which was last updated on 2026-07-21. The repository remains the source of truth; this file records the decisions, workflows, failure lessons, and current state that are easy to lose between sessions.

## What this project is

St Georges Strategy is a public, source-backed intelligence site for financial-services leaders. The weekly public edition is refreshed on Sunday for Monday LinkedIn distribution. It contains:

- Home / current judgement
- Weekly Brief
- Signals hub and eight topic streams
- AI Signals
- Committee Questions
- Regulatory Horizon
- Dated weekly, topic, and horizon archives

Public editorial principles are in `site/EDITORIAL_STYLE_GUIDE.md`, `site/WEEKLY_PUBLISHER_CONTRACT.md`, and `docs/weekly-refresh-workflow.md`.

## Current production state

The current edition is Sunday 2 August 2026. The latest production release was verified by the green `Site release (Cloudflare)` workflow run `30756659733`, for commit `a524e04`.

The current homepage Top 5 is intentionally distinct:

1. Project Pilot: Can AI models fly drones? — AI
2. When cyber attacks happen: helping organisations recover — Cyber
3. Consultation Paper No. 2 of 2026 – Transfer Schemes — Market structure
4. EBA, EIOPA and ESMA call for enhanced governance and consistent supervision to mitigate ICT risks from frontier AI models in the EU financial sector — Third-party
5. Japan FSA publishes analytical report on IT resilience in the financial sector — Resilience

The duplicate fourth/fifth item was corrected in the current edition, Resilience topic data, Brief, and dated archives. `scripts/verify_weekly_release_order.mjs` now fails if the weekly Top 5 contains duplicate titles.

## Source of truth and build model

Edit source files only under the repository source areas:

- `site/` — public page source and editorial data
- `dashboard/` — supporting data, archives, and legacy/current intelligence inputs
- `scripts/` — build, validation, promotion, and release gates
- `workers/` — Cloudflare route workers
- `tools/reg-scan/` — regulatory scanner and source adapters

Do not hand-edit `site-dist/`; it is generated output. The build uses JSON data contracts and generates complete HTML so the public site works without JavaScript.

Important data files:

- `site/data/current-edition.json` — publication date, judgement, top signals, and homepage/brief canonical metadata
- `site/data/signals.json` — eight topic streams, current Top 5, still-material rows, source evidence, and date verification
- `dashboard/data/ai-signals.json` — current 15-card AI Signals edition
- `dashboard/regulatory-horizon/latest.json` — reviewed Reg Horizon publication
- `dashboard/data/signals-promotion-shortlist.json` — human-approved candidate URLs and rationales
- `dashboard/data/signals-candidates.generated.json` — latest candidate scrape; candidates are not publication

## Sunday operating sequence

Always maintain this order:

1. Refresh and validate Regulatory Horizon source evidence.
2. Review and approve Signals candidates.
3. Promote approved Signals into `site/data/signals.json`.
4. Update AI Signals data.
5. Update `current-edition.json`, Weekly Brief, Committee Questions, homepage copy, and downstream pages.
6. Archive the prior/current dated pages as appropriate.
7. Build and run all relevant validation.
8. Commit and push the approved release.
9. Publish only through the guarded Cloudflare workflow.
10. Confirm the workflow is green and exact deployed SHA verification passes.

The release gate is deliberately strict: a date-only update is not a weekly refresh. Signals, Reg Horizon, judgement, Brief, Committee Questions, homepage, and archives must describe the same edition.

Useful commands:

```bash
npm run reg-scan:test
npm run horizon:refresh
npm run signals:candidates:refresh
npm run signals:shortlist:prepare
npm run signals:promote:dry-run
npm run signals:promote -- --date YYYY-MM-DD
npm run ai-signals:validate -- --date YYYY-MM-DD
npm run signals:validate
npm run reg-horizon:validate
npm run release:order -- --as-of YYYY-MM-DD
SGS_ARCHIVE_CORRECTION=1 npm run site:build
npm run site:verify
npm run verify:generated-links
```

## Publication rules

`Site release (Cloudflare)` is the only routine production release transaction. Push to `main` or manually dispatch the workflow with the `production` target. Do not claim publication from a commit or push alone.

The successful workflow validates data, source dates, links, archive consistency, generated HTML, Pages deployment, route Workers, cache state, legacy redirects, and the exact deployed Git SHA. Production URLs:

- https://stgeorgesstrategy.com/
- https://stgeorgesstrategy.com/brief/
- https://stgeorgesstrategy.com/signals/
- https://stgeorgesstrategy.com/signals/ai/
- https://stgeorgesstrategy.com/regulatory-horizon/

Do not run production Wrangler commands from the mounted Codex workspace. GitHub Actions is the canonical deployment surface. See `AGENTS.md`, `docs/release-automation.md`, and `docs/deploy-surface-runbook.md`.

## Important failure lessons

### Date-only release failure

The earlier bad update changed publication dates while retaining the 22 July shortlist and judgement. The site therefore looked current by date but stale in substance. The ordered-release gate and archive comparison now guard against this.

### Invalid zero-result Reg Horizon scan

On 2 August, local regulator DNS failures produced a zero-item scan. That output was not used. When a scan returns zero or materially degraded evidence, retain the last reviewed publication and record the failure rather than publishing an empty edition.

### Source-health metadata

Some valid official or publisher pages are restricted, JavaScript-heavy, PDF-based, or intermittently unavailable to CI crawlers. Current published evidence records `sourceDateVerification` in `site/data/signals.json` when a human has checked the official source. Do not remove this metadata to make the gate pass; verify the source and document why the crawler cannot extract the date.

### Concurrent candidate refresh

A newer candidate scrape can arrive after the editor approves a Sunday shortlist. The approved shortlist now includes `publicationDate`, and the release-order check treats a same-day reviewed shortlist as locked for that publication. New candidates are for the next edition; they must not silently replace the reviewed current edition.

### Archive correction

If a dated archive is intentionally corrected locally, use `SGS_ARCHIVE_CORRECTION=1 npm run site:build`, inspect the archive diff, and commit the corrected archive. The workflow push trigger is path-filtered and may not run for archive-only changes; manually dispatch `Site release (Cloudflare)` with `production` when needed.

### Local browser copy

The in-app browser may be open on `file:///.../site-dist/index.html`. That is a local generated copy, not proof of production state. Rebuild it for local review, and use the Cloudflare workflow plus public verification for production truth.

## Data-quality expectations

- Prefer primary regulator, government, standards-body, company, infrastructure, or official incident sources.
- Keep every public claim source-linked with organisation, exact publication date, source type, direct URL, and significance.
- Read the previous archive before drafting; do not repeat a prior judgement or signal without a material change.
- Do not fabricate freshness when a source is weak, stale, inaccessible, or unverified.
- For incidents, seek two independent sources where practical and lead with the accountable official source.
- Keep private employer names, chat identifiers, credentials, local secrets, and client-sensitive material out of public pages.
- Treat concentration warnings as editorial review prompts, not reasons to fabricate diversity.

## Existing project memory and archived-session coverage

The workspace contained no exported Codex chat transcripts or separate session archive that could be read directly. The durable project record was reconstructed from the existing `CODEX_HANDOVER.md`, the documentation under `docs/` and `site/`, generated data contracts, workflow files, and recent Git history. Future session-specific decisions should be added here or to a dated handover note, with the commit SHA and validation results.

Keep unrelated local-only files untouched unless explicitly requested. At the time of this consolidation, examples of existing untracked material included generated source-health reports, Beehiiv helper files, older weekly refresh packets, `mockup/`, and `CODEX_HANDOVER.md` itself. They were preserved and not folded into this memory file.

## Startup checklist for the next session

```bash
git status --short --branch
git log --oneline --decorate -12
npm ci
```

Then read, in order:

1. `AGENTS.md`
2. `PROJECT_MEMORY.md`
3. `CODEX_HANDOVER.md`
4. `docs/release-automation.md`
5. The task-specific workflow documentation

Before making a public change, inspect the current edition, Signals, Reg Horizon, archive, and candidate state. Preserve user changes, validate locally, and use the guarded release workflow for publication proof.

## Session memory — 2026-08-03

- The user explicitly asked that the work be committed to project memory for future sessions.
- `PROJECT_MEMORY.md` is the durable memory file and should be updated when a session creates an important decision, correction, workflow change, or release result.
- The repository is clean relative to `origin/main` for tracked work. Existing unrelated untracked handover, generated audit, Beehiiv, packet, and mockup files were intentionally preserved.
- The last public site release remains the verified 2 August 2026 edition. Memory-only changes do not require a site release unless public source or generated site files are changed.
