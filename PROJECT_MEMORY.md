# St Georges Strategy — Project Memory

Last consolidated: 2026-08-07

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

The current edition is Sunday 2 August 2026. The latest production release was verified by the green `Site release (Cloudflare)` workflow run `31189497602`, for commit `7f85bf8` (`Make generated link checks resilient`). It includes the 7 August release-control and reader-experience improvements in commit `6453291` (`Strengthen weekly intelligence release controls`).

The current homepage Top 5 is intentionally distinct:

1. Project Pilot: Can AI models fly drones? — AI
2. When cyber attacks happen: helping organisations recover — Cyber
3. Consultation Paper No. 2 of 2026 – Transfer Schemes — Market structure
4. EBA, EIOPA and ESMA call for enhanced governance and consistent supervision to mitigate ICT risks from frontier AI models in the EU financial sector — Third-party
5. Japan FSA publishes analytical report on IT resilience in the financial sector — Resilience

The duplicate fourth/fifth item was corrected in the current edition, Resilience topic data, Brief, and dated archives. `scripts/verify_weekly_release_order.mjs` now fails if the weekly Top 5 contains duplicate titles.

### August 2026 editorial and experience reset

The site is intentionally organised as a small set of distinct editorial products, rather than four versions of the same weekly list:

- **Home** is the current-edition front door: it introduces the judgement and routes readers to the Brief, Committee Questions, and Reg Horizon. It must not reproduce the full weekly Top 5 or the Brief's evidence blocks.
- **Weekly Brief** remains the complete cross-theme editorial edition.
- **Committee Questions** has a featured current question generated from `site/data/current-edition.json` (`committeeQuestion`), followed by its evergreen question library. Do not hand-edit the generated feature in `site-dist/`.
- **Reg Horizon** is a selective, reviewed decision watchlist. Its core reader-facing structure is the bottom line, concise decision dashboard, populated Act / Prepare / Monitor lanes, deadlines, evidence trail, and archive. Do not restore empty analyst workflow, duplicate material-signal lists, empty watch-theme tiles, or repeated operating readouts to the public page.

`scripts/publish_site_bundle.mjs` now makes Home, Committee Questions, and Reg Horizon draw on the canonical current edition and verifies the public bundle for stale or duplicate cross-page copy. `scripts/verify_site_bundle.mjs` is the reader-facing regression guard for this design.

### Public source and coverage disclosures

The detailed News and Research Radar source register—publisher names, access methods, and whether a source is manual/licensed/automated—is internal operating material in `dashboard/data/news-research-radar.json`. It must not be rendered as a public vendor inventory. The public Signals page instead carries a concise **How we use evidence** standard:

- primary sources anchor material claims;
- press and specialist reporting provide context and corroboration, not a substitute for authority;
- research is linked and reviewed at paper or abstract level.

Each published signal remains source-linked. Keep commercial/licensing detail and the full source register internal unless a specific governance or legal need requires disclosure.

Reg Horizon must state its scope honestly without making transient scanner mechanics the reader-facing story. The current public wording is: **“Scope note: This is a selective, reviewed watchlist—not a whole-market survey. Quiet themes are not treated as inactive; the dated source record remains available for governance review.”** Do not lead the page with raw coverage counts or individual fetch failures (for example, “Consob remains blocked”). Those details remain in the dated Horizon data and archive for governance and troubleshooting. The build verifier explicitly protects this distinction.

### 7 August release-control and simplification improvements

The five-part improvement programme is complete and production-verified:

- **Reg Horizon reliability:** `horizon-coverage.v1` is now derived from source participation and the reviewed shortlist. It separates configured authorities, successful fetches, candidate/material yield, reviewed/published authorities, published jurisdictions, and unavailable-source states. Do not hand-maintain these counts. `scripts/sync_reg_horizon.mjs`, `scripts/validate_reg_horizon_data.mjs`, and the scanner write/validate the same contract.
- **Weekly release train:** `docs/weekly-release-contract.md` defines the one reviewed package: `current-edition.json`, Signals, Brief, Committee Questions, and a reviewed published Horizon. Sunday candidate generation and editorial preparation are scheduled separately; the editorial prep artefact now includes all canonical current-edition inputs. Preparation is never publication.
- **Evidence and links:** `npm run signals:health:verify` blocks a Top 5 row whose source is neither machine-verifiable nor backed by a recent, dated manual verification with a reason. `npm run verify:generated-links` is a hard release gate. It retries transport failures and permits only two explicitly documented, reviewed official endpoints to be treated as temporarily restricted after repeated transport failures; HTTP failures and all other broken links still fail release.
- **Reader experience:** The live Weekly Brief suppresses redundant coverage routing, repeated committee questions, and thought-leadership-radar blocks. The Signals hub suppresses repeated source-process and Horizon-feed blocks, retaining the concise public evidence standard. These changes happen in the publisher after archive capture so dated brief snapshots remain immutable.
- **Build structure:** `scripts/publish_site_bundle.mjs` delegates current-edition Home/Committee markup and public editorial simplification to `scripts/lib/site-build/`. Keep future page-specific presentation logic in focused modules rather than expanding the publisher monolith.

The weekly release order now accepts a coherent reviewed package for up to eight days, rather than blocking all mid-week reliability/presentation fixes because the publication date is not today. This does not permit a stale edition: `release:order` and `release:readiness` still require aligned Signals, Horizon, judgement, committee question, approval state, and bounded freshness.

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
npm run release:readiness -- --as-of YYYY-MM-DD
npm run signals:health:verify
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

## Session memory — 2026-08-07

- The user requested significant, production-ready progress across Reg Horizon reliability, the weekly release train, evidence/link gates, reader-facing simplification, and build modularisation; all five areas were completed.
- The first release attempt, workflow `31189042927`, stopped safely before deployment because the newly mandatory generated-link gate found two intermittent official-source transport failures. The checker was improved with retry and two exact, documented official-endpoint exceptions that do not mask HTTP failures. The corrected release passed workflow `31189497602`, including exact Pages/production SHA verification, redirects, and archive persistence.
- A concurrent candidate-refresh commit (`1549d65`) arrived while the fix was being pushed. The release fix was rebased onto it and revalidated; the newer candidate scrape remains explicitly unapproved for the next editorial edition and did not replace the locked 2 August public edition.
- Commits `6453291` and `7f85bf8` are on `main`; the protected production deployment is commit `7f85bf8`.

## Session memory — 2026-08-09: Reg Horizon withdrawal and private rebuild

- The public Regulatory Horizon page is deliberately withdrawn because the weekly snapshot did not meet the site’s editorial or coverage standard. Navigation, homepage references, sitemap entries and legacy routes now direct readers to Archive. Do not restore a public route merely because new scanner output exists.
- The source scanner remains useful as an internal evidence collector. Its output is now transformed into `dashboard/regulatory-deadline-register/`, a **private** cumulative operating register. It keeps an open deadline until 30 days after its date, separates high-confidence `ready-for-review` items from editorially `confirmed` items, and retains an explicit review queue, source-health report, owner guidance and QA history.
- Editorial decisions live in `dashboard/regulatory-deadline-register/approvals.json`. A high extraction-confidence score is evidence quality, not editorial approval. Never auto-confirm an item for public use without a recorded decision.
- `npm run deadline-register:build` creates the register from `tools/reg-scan/docs/latest.json`; `npm run deadline-register:validate` produces `qa.json` and updates the shadow-run history. The weekly scanner workflow runs both and stages them in its editorial-review PR. That PR cannot republish Reg Horizon.
- The hard relaunch criteria are documented in `docs/regulatory-deadline-register-relaunch.md`: no correctness blockers; scanner no more than eight days old; four core authorities healthy for three consecutive shadow runs; ten editorially confirmed open deadlines across four authorities; no authority contributing over 60%; and an explicit editor/product decision. The current baseline fails intentionally and must be reported honestly.
- Core authorities are FCA, Bank of England/PRA, HM Treasury, EBA, ESMA, ECB Banking Supervision and OFSI. HM Treasury was added as a primary official Atom source (`uk-hm-treasury`) and its feed returned HTTP 200 on direct verification. A source returning zero recent items may be healthy; blocked, failed, degraded and unconfigured sources may not be silently treated as quiet.
- Deadline extraction now preserves `deadlineEvidence` including cue proximity and surrounding source context. This supports human review and avoids opaque scraped dates. The next fresh scanner run will populate the new evidence field; old 2 August data cannot retroactively contain it.
