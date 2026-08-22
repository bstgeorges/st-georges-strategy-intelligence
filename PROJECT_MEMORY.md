# St Georges Strategy — Project Memory

Last consolidated: 2026-08-16

This file is the current working memory for future Codex sessions. It supplements the older `CODEX_HANDOVER.md`, which was last updated on 2026-07-21. The repository remains the source of truth; this file records the decisions, workflows, failure lessons, and current state that are easy to lose between sessions.

## What this project is

St Georges Strategy is a public, source-backed intelligence site for financial-services leaders. The weekly public edition is refreshed on Sunday for Monday LinkedIn distribution. It contains:

- Home / current judgement
- Weekly Brief
- Signals hub and eight topic streams
- AI Signals
- Committee Questions
- private regulatory deadline register (Regulatory Horizon remains withdrawn)
- dated weekly and topic archives

Public editorial principles are in `site/EDITORIAL_STYLE_GUIDE.md`, `site/WEEKLY_PUBLISHER_CONTRACT.md`, and `docs/weekly-refresh-workflow.md`.

## Current production state

The current edition is Sunday 16 August 2026, **Edition 9**: *Automation is spreading faster than intervention plans*. Production was verified by the green `Site release (Cloudflare)` workflow run `31939390454`, for commit `04ce598326487de5474c820728343b655f4d4511` (`Release Edition 9`). The workflow completed the full release transaction: data and link gates, build and bundle verification, Pages and Workers deployment, cache purge, exact Pages and production SHA verification, redirects and archive persistence.

The current homepage Top 5 is intentionally distinct:

1. Shaping the NVD for the Future: We Need Your Feedback on AI-Enabled Vulnerability Management — AI and cyber control
2. Outsourcing and competition in the banking sector: the rise of Cloud Service Providers — Third-party dependency
3. ACRO reprimanded following cyber security failings — Data and closure
4. CISA Adds One Known Exploited Vulnerability to Catalog — Continuing priority / cyber
5. Japan FSA publishes analytical report on IT resilience in the financial sector — Continuing priority / resilience

Edition 9 intentionally promotes only three new, primary-source signals and labels the two retained items as continuing priorities. This protects editorial quality when a five-item weekly format would otherwise force weak novelty. `scripts/verify_weekly_release_order.mjs` fails if the weekly Top 5 contains duplicate titles.

### August 2026 editorial and experience reset

The site is intentionally organised as a small set of distinct editorial products, rather than four versions of the same weekly list:

- **Home** is the current-edition front door: it introduces the judgement and routes readers to the Brief, Committee Questions and Archive. It must not reproduce the full weekly Top 5 or the Brief's evidence blocks.
- **Weekly Brief** remains the complete cross-theme editorial edition.
- **Committee Questions** has a featured current question generated from `site/data/current-edition.json` (`committeeQuestion`), followed by its evergreen question library. Do not hand-edit the generated feature in `site-dist/`.
- **Reg Horizon** is withdrawn from the public product. The private cumulative deadline register is an evidence and review tool, not a public watchlist; do not restore a public page until the documented relaunch criteria and explicit product decision are met.

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
- `dashboard/regulatory-deadline-register/` — private deadline register, evidence, QA and relaunch state
- `dashboard/data/signals-promotion-shortlist.json` — human-approved candidate URLs and rationales
- `dashboard/data/signals-candidates.generated.json` — latest candidate scrape; candidates are not publication

## Sunday operating sequence

Always maintain this order:

1. Refresh and validate the private regulatory deadline register; never make it a public release input while Horizon is withdrawn.
2. Review and approve Signals candidates.
3. Promote approved Signals into `site/data/signals.json` and complete their editorial significance.
4. Refresh the 15-card AI Signals edition.
5. Update `current-edition.json`, the Weekly Brief, Committee Questions and downstream copy as one package.
6. Build and run all relevant validation.
7. Commit and push the approved release.
8. Publish only through the guarded Cloudflare workflow.
9. Confirm the workflow is green and exact deployed SHA verification passes.

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

## Session memory — 2026-08-09: entry-surface differentiation

- The public site now assigns distinct jobs to its core pages: Home is a decision-led entry surface with the signature full Weekly Judgement; Weekly Brief is the complete weekly analysis; Signals is the source-backed pattern library; Committee Questions is the challenge-tool library; Archive is the dated discovery surface.
- Keep the full 80–120-word, three-part **This Week’s Judgement** on Home. It is a signature, shareable editorial feature used for LinkedIn. Home's general decision-led H1 should remain distinct from the edition-specific Brief headline, and the page should not duplicate the Brief's Top 5 detail.
- Present the Home judgement as a concise, reader-led three-beat: **What happened**, **Why it matters**, and **What to do**, under a plain-English operating-test title. Avoid a roll-call of source organisations and abstract AI/process language; the Weekly Brief carries detailed evidence and source names.
- Archive now starts with three clear paths: current Brief, past weekly briefs and topic trails. Keep it light and navigational; do not turn it into a second Brief or reintroduce withdrawn Reg Horizon material.

## Session memory — 2026-08-14: private engine hardening

- Signals candidates now require a real source date before they can enter the reviewable pipeline. Every new candidate records whether the date came from a feed, URL inference, sitemap last-modified value or a reviewed Horizon record; undated candidates cannot be promoted. A public Signals row with unresolved editorial placeholder copy fails validation.
- While Horizon is withheld, its seven Signals bridge sources must report `skipped` with reason `horizon-withheld`; they are not allowed to look like healthy zero-yield inputs. Candidate-output validation now checks timestamps, date provenance and source outcome states.
- The private deadline register now validates approval records, preserves superseded dates as non-counting history, counts only confirmed future deadlines for relaunch, and requires a current-edition, named and dated editor/product-owner sign-off in `relaunch-approval.json`. This approval file is intentionally unapproved by default and never restores the public route on its own.

## Session memory — 2026-08-14: regulatory source estate

- Commit `4c0045c` (`Reconnect regulatory source discovery`) makes the source estate explicit in the private deadline dashboard. It is pushed to `main`; it is not evidence of a public-site release and Reg Horizon remains withdrawn.
- The global regulatory source universe contains **134 catalogued authorities** in **138 jurisdictions**. It is a governed discovery perimeter, not a claim that all those authorities are being scanned or that they can create deadline records. The former 135th record was the IOSCO directory header, not an authority, and is now filtered at build time.
- The active private deadline intake is **53 configured primary official sources** across **24 jurisdictions**. Its source-selection policy is `dashboard/data/regulatory-deadline-intake-policy.json`; the scanner loads this policy directly. Do not reintroduce a separate hard-coded source list.
- `dashboard/regulatory-deadline-register/discovery.json` and the dashboard’s **Source estate** panel distinguish catalogue, active intake, and last completed scanner run. The 2 August saved run covered 34 sources, so it truthfully calls out the 19 configured sources not yet represented in that run.
- The active policy specifies a **90-day deadline-discovery lookback**, deliberately separate from the seven-day editorial signal window. Always label it as a policy unless a run confirms it actually used that lookback.
- `TestSourcePerimeter.test_deadline_intake_policy_matches_the_scanner_and_every_active_source_has_transport` prevents policy/scanner drift: it verifies all 53 declared sources have a configured feed, listing-page adapter, or sitemap transport.
- Review-only 90-day batches demonstrated material source yield without changing any dashboard or public data. Do not aggregate per-batch editorial shortlist totals as a whole-universe judgement because each batch has its own materiality cap. Slow or blocked authorities (notably Consob) must remain visible as health exceptions; they must not be silently treated as quiet.
- The next engineering objective is a full, scheduled 90-day active-intake run that can complete outside the local interactive time limit, followed by primary-source review of genuine deadline candidates. Do not inflate the register from catalogue rows, scanner candidates or press context.

## Session memory — 2026-08-14: Signals direct-source estate

- Signals is now deliberately independent of withdrawn Reg Horizon. The seven `reg_horizon_json` bridge sources were removed; the Signals review queue must only be built from direct, primary official feeds, not from the Horizon shortlist.
- The active Signals intake has **50 direct primary feeds**. Its registry validator (`npm run signals:sources:validate`) enforces that floor, disallows bridge fetch types, confirms every route maps to a primary source-registry record, and protects coverage floors for market structure, third party, technology failure, financial crime and data. The companion test is `npm run signals:sources:test`.
- New direct routes include HM Treasury, Bank of England news and publications, SEC, CFTC market and enforcement releases, HKMA circulars, consultations, press releases and guidelines, ECB Banking Supervision, SEBI, AMF, CNMV, the Central Bank of Ireland, NIST, Mistral, arXiv and first-party infrastructure status feeds. The unavailable MAS sitemap was replaced with SEBI only after the official SEBI RSS feed returned valid XML; do not retain unavailable sources merely to inflate a count.
- `site/data/published-source-map.json` now recognises specific SEC, CFTC, SEBI and HKMA BRDR article hosts as permitted primary citations. A feed item cannot become a candidate unless it has a specific, approved publisher-facing URL.
- Candidate-output source status distinguishes `ok`, `quiet` (no parseable entries, with reason), `failed` and `skipped`. A quiet source must never be silently reported as a normal zero-yield source. A source that fetched records but supplied no relevant candidate is healthy and remains `ok`.
- The live 14 August validation produced **87 dated, source-linked candidates across all eight Signals themes** from **50 working feeds** (zero failures, skips or quiet sources). This is a private review queue, not authority to alter the public Signals edition; editorial selection and the normal release train remain required.

## Session memory — 2026-08-14: 200+ governed evidence-source estate

- The source-estate target is now met without treating a catalogue as an active scan. `dashboard/data/source-estate.generated.json` contains **213 unique, canonicalised source routes**, of which **194 are primary**, across **138 jurisdictions**. Every route has a source tier, operating role and provenance.
- The estate separates three different truths: 134 catalogued regulatory authorities, 102 governed source-registry records (83 primary), and 50 active direct Signals feeds owned by 42 sources. Do not collapse these counts into a claim that 213 sources are scanned every week.
- Eight new official high-value publication routes were assessed; six were retained after availability and quality checks: FCA publications, FCA publication policy, EIOPA consultations, SEC proposed rules, SEC final rules, and CFTC rulemaking records. SEC restricts generic crawlers (HTTP 403) but the official rule pages remain valid governed discovery routes; they are not counted as successful feed ingestion.
- `npm run sources:estate:build`, `npm run sources:estate:validate` and `npm run sources:estate:test` build, verify and protect the master estate. The validator requires at least 200 unique routes, 130 regulator authorities, 70 primary source records and the 50-feed Signals baseline.
- The next expansion should be transport assessment: promote governed routes to active feeds only when an official RSS, Atom, sitemap or page adapter is demonstrably reliable. Maintain editorial review as a separate stage; more sources must not create more published rows by default.

## Session memory — 2026-08-14: active transport promotion

- A live transport assessment promoted 15 additional direct primary feeds, taking Signals from 35 to **50 active feeds**. Each was tested for a successful response, parseable item/entry records and dated publication data before promotion; the unparseable CNMV regulatory transport and unavailable Azure/Fastly status transports were not promoted.
- The expanded cohort covers HKMA press releases and guidelines, AMF news/regulation/enforcement, CNMV news, Central Bank of Ireland news and markets, NIST, Mistral, arXiv, and GitHub, Atlassian, Oracle Cloud Infrastructure and DigitalOcean status. These are discovery inputs, not automatic publication sources.
- First-party status feeds materially strengthened two deliberately sparse areas. The live candidate queue increased from 3 to **9 third-party** candidates and from 5 to **11 technology-failure** candidates. All 50 source outcomes were `ok`; no source was failed, skipped or silently quiet.
- `perSourceOwnerTopicCap` is set to 5. It caps candidates by primary source owner, rather than by individual feed, so multiple AMF feeds or high-volume arXiv/GitHub records cannot manufacture false diversity or crowd out other sources. The cap is tested in `scripts/refresh_signals_candidates.test.mjs`.

## Session memory — 2026-08-15: Committee Questions weekly operating model

- The Committee Questions page is now deliberately split into two layers: **three current, copy-ready questions** at the top and the evergreen decision-domain library below. The current section changes with every edition; the library should change only when its underlying question is outdated, weak or duplicative.
- `site/data/current-edition.json` now carries `committeeQuestions`, exactly three structured records with `domain`, `question`, `why`, `evidence` and relevant route links. The legacy singular `committeeQuestion` remains the first current question for the compact homepage and newsletter treatment.
- The three weekly questions should normally cover: (1) authority to intervene, (2) shared dependency and fallback, and (3) evidence and closure. This is a useful pattern, not a substitute for editorial judgement; change the control plane when the week’s evidence demands it.
- The public card format is fixed and intentionally simple: question, **Why it matters now**, and **Ask for**. Questions must request concrete evidence—maps, permissions, tests, decision logs, exceptions or closure records—not reassurance or framework descriptions.
- `scripts/publish_site_bundle.mjs`, `scripts/verify_site_bundle.mjs` and `scripts/verify_weekly_release_readiness.mjs` now require all three current questions. The build keeps the Committee page, home and newsletter aligned without hand-editing `site-dist/`.
- The repeatable process is documented in `docs/committee-weekly-cadence.md`. Use it after the Signals shortlist and Weekly Judgement are approved, then run the normal edition build and release checks.

## Session memory — 2026-08-16: Edition 9 production and learning

- **Edition 9 is live and production-verified.** Commit `04ce598326487de5474c820728343b655f4d4511` was released through green workflow run `31939390454`; do not describe it as merely pushed or committed. The dated Brief and all eight topic archive snapshots for 16 August were persisted.
- The approved shortlist was based on the dated 14 August candidate run, giving editorial review time before Sunday. The later Sunday candidate refresh did not replace the approved selection. Keep this separation: candidate generation prepares an edition; approval locks its public evidence.
- The edition selected three new primary sources—NIST on AI-enabled vulnerability management, Bank of England/PRA research on cloud-service-provider concentration, and the ICO ACRO reprimand—and retained CISA exploitation and Japan FSA resilience as explicitly labelled continuing priorities. Do not force five nominally new signals when the evidence is weaker.
- The full Weekly Judgement now follows the reader-friendly three-beat format: **What happened**, **Why it matters**, **What to do**. It should remain plain English, decision-led and shareable on LinkedIn; detailed source exposition belongs in the Brief.
- The three current Committee Questions are now part of the mandatory edition package. They must remain aligned to the weekly judgement and ask for concrete evidence: intervention authority, shared dependency/fallback, and evidence/closure.
- Signals now operates from 50 active direct primary feeds (up from 35) and the 14 August validation produced 87 dated, source-linked candidates across all eight themes with no failed, skipped or quiet feed. The wider 213-route governed estate is discovery infrastructure, not a claim that 213 sources are scanned each week.
- Reg Horizon remains private. Its improvement work must not become a reason to reintroduce a public page before the documented relaunch gate and an explicit product decision are complete.
- For future Sunday releases, prepare the LinkedIn newsletter cover, draft and distribution copy as part of the Saturday release pack, not as post-release work.

## Session memory — 2026-08-16: private Horizon recovery run

- The private deadline-discovery workflow now uses the governed **90-day** lookback by default and has a 45-minute execution window. It accepts a manual 30–180-day lookback only; a shorter scan cannot be evidence for relaunch.
- A completed 16 August 90-day private scan covered all **53** configured sources: 47 were healthy and all seven core authorities were healthy. The transparent exceptions are UK NCA (404), IOSCO and Consob (blocked), Banco Central do Brasil (degraded parser), and OFAC and SARB (timeouts). FinCEN’s lighter official enforcement index succeeded after the transport change; Consob remains explicitly blocked despite an English-listing fallback.
- The scan produced a private register of **12 ready-for-review records**, including eight future dates across DFSA, HM Treasury, ADGM, Bank of England/PRA, EIOPA and HKMA. Each has primary-source URL, extracted deadline evidence and a named operating-owner route. They are **not approved**: `approvals.json` remains empty until an editor records a named, dated decision.
- The private relaunch score rose to 50 because the source record is now current and all core sources are healthy. Relaunch remains ineligible: there are no confirmed deadlines, no confirmed contributing authorities, no three-run core-health record, and no editor/product-owner sign-off.
- The scanner now fails closed before altering SQLite or generated artifacts if fewer than half the configured sources are healthy. This protects the last reviewed private register from a network-wide DNS or transport outage. Historic invalid health snapshots must not be used as a trend.
- Do not treat three scans run on the same day as evidence of stability. The next two scheduled shadow runs must complete successfully before assessing the three-run criterion. The public Horizon route remains withdrawn throughout.

## Session memory — 2026-08-16: Signals editorial controls

- Commit `58ebb9b` (`Strengthen Signals editorial review controls`) adds a compact pre-selection review layer to the **private** Signals workflow. It changes neither the public Signals page nor the authority required to publish an edition.
- `dashboard/data/signals-promotion-review.generated.json` now starts with candidates grouped by decision type: rule change, enforcement, active threat, outage, research, and context/operating development. Cross-theme records are collapsed by source URL in this view so one event cannot look like several independent signals; the original theme lists remain available for routing.
- The review pack reports source-owner concentration, UK/EMEA versus US versus global/other balance, and new-versus-continuing evidence before editorial selection. These are decision prompts, not numerical quotas: never manufacture diversity to satisfy a metric.
- `dashboard/data/signals-source-health-history.json` retains the last 12 live candidate runs. A standard feed that is `quiet` or `failed` in two consecutive runs is marked `investigate`; a single issue is `watch`. Do not count offline or skipped runs as evidence of a broken feed.
- arXiv is explicitly a **supplementary research** input (`healthMonitoring: false`). It can support research discovery but must not be used to assert primary-source coverage or trigger a primary-feed health alert when quiet. FINMA had one failed run at this baseline and is on watch; investigate or repair its transport only if the next live run also has an issue.
- Maintain the quality-first source strategy: 50 tested direct primary feeds are more valuable than an inflated total. The next Signals improvements should prioritise source reliability, materiality and duplication control, especially in thin resilience coverage, before any expansion of the active feed count.

## Session memory — 2026-08-16: rendered design-drift pass

- Claude’s source audit was checked against the actual production rendering at desktop and mobile widths. The drift was real: undefined `--ink-soft`, off-token colours, fragmented mono tracking, 10.5px mobile buttons, heavy/card shadows, paper gradients, and looping hero motion were present.
- Fixed in source: token declarations and colour alignment, tracking tokens, 11px furniture floor, flat paper surfaces, shadow ceiling, shared `outline` button vocabulary, no negative Playfair tracking, and no looping hero animations.
- The existing hero artwork and dot field were retained as a documented static hero device rather than removed.
- Live rendered verification after deployment: 1280px and 375px; no horizontal overflow at 375px; mobile buttons render at 11px/44px; hero animations report none.
- Production proof: green `Site release (Cloudflare)` run `31965773360`, exact deployed commit `73b5d14`.

## Session memory — 2026-08-22: compact-laptop release requirement

- A rendered 1366 × 768 homepage check identified a real collision: the hero’s CTA row overlapped the publication-metric strip. The source fix in `site/styles.css` reduces compact-laptop hero type and reserves space below the CTA row at 1001–1400px.
- This change is intentionally queued for the next Sunday release. `docs/weekly-release-contract.md` and `docs/weekly-refresh-workflow.md` now make 1366 × 768 homepage verification a release gate: no CTA/metric overlap before release, and the same check again on production after release.
- Do not describe the fix as live until the green `Site release (Cloudflare)` workflow verifies the exact production SHA.

## Session memory — 2026-08-22: Signals resilience and source-quality upgrade

- The Signals discovery perimeter now has **81 active direct primary feeds** (up from 50), with **35 resilience routes** (up from 18). The new routes are governed primary sources: first-party AI, communications, data-platform and observability status feeds; official cyber advisories; first-party security research; Bank of England speeches; and NVIDIA newsroom releases. They are discovery inputs, never automatic published Signals.
- Every added route was checked live on 22 August for a parseable feed and a specific, allow-listed publisher URL. The diagnostic run found all **31 additions healthy**. The only non-OK routes across the 81-feed run were pre-existing Microsoft AI (HTTP 403) and supplementary arXiv (quiet); neither was hidden or counted as healthy yield.
- The feed validator now requires at least 80 direct primary feeds and at least 30 resilience routes. It also fails any `service-status` intake without headline-level materiality hints and title deduplication. This makes future feed-count expansion unable to weaken the operating standard.
- Status feeds accept only an explicit materially disruptive headline (for example outage, service disruption, unavailable, major incident or global) and deduplicate repeat incident labels. Partial notices such as “some users may be unavailable” are excluded. If that leaves a thin resilience queue, retain the coverage warning and do not force a weak item into the weekly Signals edition.
- The 22 August diagnostic queue is **not an editorial shortlist** and must not replace the approved 16 August source selection. Sunday’s scheduled candidate refresh, editorial review and normal release gates remain mandatory before any public change.

## Session memory — 2026-08-22: Reg Horizon trust recovery

- Reg Horizon remains **publicly withheld**. The private scanner now writes `visibility: private` and `status: private-review`; `npm run horizon:sync` explicitly refuses to copy a private scanner edition to the public route. The public Horizon data remains `withheld` with zero signals and zero deadlines.
- Deadline extraction is now fail-closed: a scanner deadline must come from fetched primary-document detail text and carry an explicit trigger, date and short source quote. A page publication date, title, generic topic word or loose cue proximity cannot create a deadline. Legacy scanner rows without this evidence are removed from the active private operating queue on rebuild.
- `approvals.json` decisions are now `confirmed`, `rejected` or `not-applicable`, with a declared scope. `source-date-only` verifies the cited fact without implying business applicability. Two 22 August source-date confirmations are recorded: DFSA CP 174 (24 August) and HM Treasury’s payment-systems fee consultation (31 August). Do not treat either as an applicability decision.
- The first distinct-day 90-day shadow run completed on 22 August across all 53 configured sources. The private register now has eight retained records: two confirmed source dates and six reviewable items. QA is 66/100 and correctly remains ineligible for relaunch: only two confirmed dates from two authorities and no human relaunch approval.
- Exception governance is explicit in `dashboard/regulatory-deadline-register/source-exceptions.json`. The NCA feed repair and OFAC timeout adjustment were proven healthy on 22 August; IOSCO, Consob and Mexico CNBV remain blocked, Banco Central do Brasil remains degraded, and SARB remains failed. Do not hide, bypass or infer around these statuses.
- Two more private-only shadow runs are scheduled for 08:30 BST / 07:30 UTC on 23 and 24 August. They must run the 90-day scan, rebuild/validate the private register and update only evidence-backed exception status. They must not sync, publish or push public Horizon content.
