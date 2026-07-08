# Migration Readiness Scorecard

Status date: 2026-07-04

This scorecard applies Gate A from `MIGRATION_PLAN.md`. A page is migration-ready only when every item is `Yes`.

## Cross-Page Parity Gates

| Item | Status | Evidence / next action |
| --- | --- | --- |
| SEO and social metadata | Root-level metadata set | All mockup pages now include meta description, canonical URL, Open Graph tags, Twitter card tags, and JSON-LD Article schema. Canonicals, `og:url`, and JSON-LD `@id` now use root-level working routes. Rerun metadata checks after staging URL approval. |
| Author byline and disclaimer | Yes | All mockup footers now include the Ben St Georges author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Site identity / root-domain decision | Working decision | Option 1 is selected for the mockup and staging plan: root-level tabs at `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/archive/`, and `/about/`. Production cutover still requires redirect, analytics, and staging QA approval. |
| Rendering pattern | Yes | Decision recorded in `WEEKLY_PUBLISHER_CONTRACT.md`: production should use build-time generated HTML, with JSON retained as source contract and optional enhancement. |
| Weekly refresh coverage | Partial | Required outputs and the Wednesday scan/publish cadence are specified in `WEEKLY_PUBLISHER_CONTRACT.md`. `npm run site:build` now proves a generated build with routes, archives, `signals.json`, feed/calendar files, sitemap, headers, redirects, and a publish report. Signals rows now render from `site/data/signals.json`. Production still needs live-data generation plus commit/push. |

## Weekly Brief

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Executive readout | Yes | Masthead, so-what panel, and operating readout are present. |
| Top 5 consolidated signals | Yes | Five ranked signals link to topic or horizon pages. |
| Source-backed items | Yes | Operating readout, regulator watch, control lessons, horizon dates, and thought-leadership cards now include source trails. |
| Full implications | Yes | Executive pulse includes implications across AI, financial crime, cyber/technology, data, markets, and supervisory readiness. |
| Regulator watch | Yes | Three regulator/supervisory cards are present with source links. |
| Control failure lessons | Yes | Four incident/control cards include what happened, control lesson, challenge question, and sources. |
| Executive challenge questions | Yes | Three portable challenge questions are present. |
| Regulatory horizon | Yes | Horizon dates link to source pages and to `latest.json`. |
| Thought-leadership radar | Yes | Cards include angle, why-now, audience, and source trail. |
| Archive path | Yes | Footer and archive logic link to the archive page. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |
| Current-site parity | Yes | Compared against the current dashboard modules: executive readout, lead/watchlist, briefing pack, regulator watch, control lessons, challenge questions, horizon, and thought-leadership radar are represented. |

## AI Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 AI list is present. |
| Expanded evidence rows | Yes | The AI page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or edition context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-data card preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Archive rule/source data card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Operational Resilience Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 resilience list is present. |
| Expanded evidence rows | Yes | The resilience page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail and official-baseline cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Third-Party Risk Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 third-party list is present. |
| Expanded evidence rows | Yes | The third-party page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail and official-baseline cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Market Structure Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 market-structure list is present. |
| Expanded evidence rows | Yes | The market-structure page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus horizon/current-edition cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Financial Crime Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 financial-crime list is present. |
| Expanded evidence rows | Yes | The financial-crime page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Cyber Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 cyber list is present. |
| Expanded evidence rows | Yes | The cyber page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Technology Failure Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 technology-failure list is present. |
| Expanded evidence rows | Yes | The technology-failure page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Data Topic Page

| Item | Status | Evidence / next action |
| --- | --- | --- |
| Weekly top 5 | Yes | Top 5 data list is present. |
| Expanded evidence rows | Yes | The data page shows a Top 5 shortlist plus five additional source-backed rows. |
| Source-backed rows | Yes | Each ranked row has URL, source label, and date or official-source context. |
| Why it made the brief | Yes | Editorial judgement section is present. |
| So-what view | Yes | So-what card is present. |
| Who should care | Yes | Audience card is present. |
| Evidence needed | Yes | Evidence card and checklist are present. |
| Control checklist | Yes | Five evidence prompts are present. |
| Source trail | Yes | Ranked rows plus source-trail cards preserve the trail. |
| Related weekly brief | Yes | Links back to week of 1 Jul 2026 brief. |
| Topic archive path | Yes | Topic archive card is present. |
| SEO and social metadata | Root-level metadata set | Present in source using root-level working routes; rerun after staging URL approval. |
| Author byline and disclaimer | Yes | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. |
| Mobile readability | Yes | Artifact-backed responsive QA captured this topic page at 320px, 390px, 768px, and 1440px with no horizontal overflow findings. See `qa/responsive/responsive-report.json`. |

## Remaining Gate A Work

The editorial content is ready for the weekly brief and the eight topic-page mockups, but migration readiness is no longer green. Claude's review exposed hard parity items that are now tracked explicitly: SEO/social metadata, author/disclaimer parity, site identity, rendering pattern, publisher coverage, refresh automation, and responsive QA. Before stage 3, confirm Gate D and rerun the metadata checks against the final production URLs.

## Signals And Horizon Hub Review

| Page | Status | Evidence |
| --- | --- | --- |
| Signals hub | Yes | Expanded with eight streams: AI, resilience, third-party, market structure, financial crime, cyber, technology failure, and data. Each stream has a hub Top 5 and a topic-page route. |
| Eight topic pages | Partial | All eight topic pages now exist with Top 5 and supporting evidence rows. `npm run site:build` creates dated topic archive copies and `data/signals.json`; production still needs the same pattern backed by the live weekly topic pipeline. |
| Reg Horizon | Yes for live-run gate | Live reg-scan run completed on 2026-07-04 and synced into `dashboard/regulatory-horizon/`: 15 material signals, 3 horizon dates, 6 approved sources in material signals, 9 sources in KPI coverage, and additive `sourceStatus` / `warnings[]` contract present. Pending scraper warnings remain an admin backlog, not a public-page blocker. |
| Topic Top 5/5-more strategy | Yes | `signals/SIGNAL_REFRESH_STRATEGY.md` defines inputs, source universe, ranking criteria, workflow, candidate row shape, and automation roadmap. |
| Source operating model | Yes | `SOURCE_OPERATING_MODEL.md` maps registry lanes, topic streams, approval rules, weekly QA, coverage watchlist, and automation path. |

## Gate B Work

Publisher/data pipeline readiness is partially specified and locally dry-run, but not yet proven in production:

- Confirm PAT or Docker credential fix.
- Prove publisher can commit and push generated data/content files.
- Local dry run now passes: `npm run site:build` writes the generated build to `site-dist/`.
- Still required: dry-run an update from live `latest.json`, `signals.json`, or equivalent live input files.
- Still required: prove weekly refresh writes all required new routes in the production publisher: home, brief, Signals hub, eight topic streams, Reg Horizon, and archive surfaces.
- Use the decided rendering pattern: build-time generated HTML, with JSON retained as the source contract and optional client-side enhancement.
- Align the recurring run with the Wednesday weekly site update window: scan first, editorial review second, generated site publish third.
- Run `npm run site:verify` before staging handoff.
- Run `npm run site:build` before staging handoff and review `site-dist/publish-report.json`.
- Document the failure mode and recovery path.

## Gate C Work

Regulatory scan operational readiness:

- Live `reg-scan` run completed locally on 2026-07-04 using a temporary venv and wrote `docs/latest.json`, `docs/feed.xml`, `docs/horizon.ics`, `docs/index.html`, and `docs/archive/2026-07-04.html`.
- `reg-scan` has been migrated into this workspace at `tools/reg-scan/`.
- Root scripts now run the scanner from one place: `npm run reg-scan:test`, `npm run reg-scan:dry-run`, `npm run reg-scan:run`, `npm run horizon:sync`, and `npm run horizon:refresh`.
- `npm run horizon:sync` copies scanner outputs into `dashboard/regulatory-horizon/` and the mockup Reg Horizon data/feed/calendar/archive artifacts without replacing the designed mockup page.
- Live `latest.json` uses the additive 2026-07-04 contract: material rows capped at 10, `signals[].sourceStatus`, and `warnings[]`.
- Reg-scan unit tests passed through the root project script: 21/21.
- Confirm public pages show reader-safe coverage caveats only; source-health/fetch failure detail stays in admin or migration evidence.
- Still required before production: run `.github/workflows/reg-scan-weekly.yml` once in GitHub Actions and ensure generated outputs can be committed/pushed before the site publish step.

## Gate D Work

Site identity has a working decision, but production cutover is not complete:

- Root-level tabs are the current working structure: `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/archive/`, and `/about/`.
- Confirm whether the old root corporate material is fully covered by Home/About before production cutover.
- Decide how old `/intelligence/`, `/thevirtualofficer/`, and AI Signals URLs redirect into the root-level structure.
- Staging preview exists at `https://migration-preview.st-georges-strategy-intelligence.pages.dev`.
- Staging route, metadata, redirect, header, and responsive QA passed on 2026-07-05. See `qa/STAGING_QA_2026-07-05.md`.
- Analytics continuity is still open: staging requires redeploy with `CF_WEB_ANALYTICS_TOKEN` before the `--require-analytics` verifier passes.
- Confirm final canonical URLs, `og:url`, JSON-LD `@id`, redirects, analytics continuity, and archive treatment for old Intelligence and AI Signals URLs in staging.
- Use `STAGING_REDIRECT_ANALYTICS_PLAN.md` as the redirect and analytics checklist.
- Use `npm run staging:migration:verify -- --base <staging-url> --require-analytics --check-redirects` once staging routes exist.
- Review approved/pilot/candidate source ladder before cutover.
- Track scraper backlog and pipeline counters outside the public page.
