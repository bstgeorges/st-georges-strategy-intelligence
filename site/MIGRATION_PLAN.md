# Full-Site Mockup Migration Plan

This mockup is exploratory. It should not replace the existing site in one step.

## Principle

Keep the current production site live while the new structure is proven in parallel.

## Migration Gates

Do not touch production navigation, redirects, or route structure until Gate A, Gate B, Gate C, and Gate D are complete.

### Gate A: Content Parity Rubric

The mockup is content-complete only when every item in both rubrics below is marked `Yes`. Do not use "feels rich enough" as the trigger for migration.

Weekly brief rubric:

| Item | Pass condition | Yes/No |
| --- | --- | --- |
| Executive readout | Has a clear weekly so-what, lead judgement, and practical implication for financial-services leaders. | No |
| Top 5 consolidated signals | Shows five ranked signals with links to the relevant topic or horizon page. | No |
| Source-backed items | Each material claim has a source link, source name, and date or edition context where available. | No |
| Full implications | Includes what changed, why it matters, affected functions, and follow-up action for the main items. | No |
| Regulator watch | Preserves the regulator/supervisory direction layer from the current site. | No |
| Control failure lessons | Includes real incidents or official signals translated into internal control tests. | No |
| Executive challenge questions | Includes portable questions suitable for a committee, 1:1, or control review. | No |
| Regulatory horizon | Includes current horizon dates, owner/action/evidence prompts, and links to primary sources or `latest.json`. | No |
| Thought-leadership radar | Includes article angles with why-now, audience, and source trail. | No |
| Archive path | Shows where the weekly edition will be preserved and how topic pages link back to it. | No |
| SEO and social metadata | Includes canonical URL, meta description, Open Graph tags, Twitter card tags, and JSON-LD Article schema with final production URL choices confirmed. | No |
| Author byline and disclaimer | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. | No |
| Mobile readability | Checked on mobile viewport with no overlapping text, clipped buttons, or broken grids. | No |
| Current-site parity | Contains at least the same useful intelligence modules as the current production intelligence page. | No |

Topic page rubric, applied separately to AI, operational resilience, third-party risk, market structure, financial crime, cyber, technology failure, data, and any future signal stream:

| Item | Pass condition | Yes/No |
| --- | --- | --- |
| Weekly top 5 | Shows the five items most likely to appear in the weekly brief. | No |
| Curated memory | Shows three to seven unranked still-material signals, or explicitly explains why fewer cleared the threshold. | No |
| Source-backed rows | Each ranked item has a working source URL, source label, and date or edition context where available. | No |
| Why it made the brief | Explains the editorial judgement behind the topic. | No |
| So-what view | States the control, customer, supervisory, market, or operating implication. | No |
| Who should care | Names the likely internal audiences or accountable functions. | No |
| Evidence needed | Specifies evidence a reader should ask for inside a firm. | No |
| Control checklist | Includes practical prompts that can be handed to a control owner. | No |
| Source trail | Preserves source links and separates official sources from secondary monitoring items. | No |
| Related weekly brief | Links back to the relevant weekly issue. | No |
| Topic archive path | Shows how dated editions of that topic will be preserved. | No |
| SEO and social metadata | Includes canonical URL, meta description, Open Graph tags, Twitter card tags, and JSON-LD Article schema with final production URL choices confirmed. | No |
| Author byline and disclaimer | Footer includes author context and the sector-wide illustrative / not investment, legal, compliance, or regulatory advice disclaimer. | No |
| Mobile readability | Checked on mobile viewport with no overlapping text, clipped labels, or unusable ranked rows. | No |

### Gate B: Publisher And Data Pipeline Readiness

Resolve the GitHub write-access problem before cutover. This can run in parallel with mockup work, but it must be complete before stage 3 begins if the production site will consume `latest.json`, `content.json`, or generated archive files.

Pass conditions:

- PAT or Docker credential issue is fixed.
- Publisher can commit and push generated data or content files.
- A dry run proves that `latest.json`, `signals.json`, or the equivalent live input files can be updated without manual copy/paste. Status: local mockup dry run now generates `data/signals.json`; production live-data refresh still needs proof.
- The recurring run is aligned to the Wednesday weekly site update window: Reg Horizon scan first, editorial review second, generated public pages third.
- Weekly refresh reaches every new public route: `/`, `/brief/`, `/signals/`, `/signals/ai/`, `/signals/resilience/`, `/signals/third-party/`, `/signals/market-structure/`, `/signals/financial-crime/`, `/signals/cyber/`, `/signals/technology-failure/`, `/signals/data/`, `/regulatory-horizon/`, `/archive/`, and `/about/` where applicable. Status: `npm run site:build` proves this locally from the site source.
- The rendering pattern is decided once for Signals and Reg Horizon. Current decision: build-time generated HTML from JSON, with JSON retained as the source contract and optional client-side enhancement.
- Failure mode is documented so go-live does not depend on one local machine state.

### Gate C: Regulatory Scan Operational Readiness

This is an admin/migration gate, not public site content. Do not expose pipeline health, source status, scraper backlog, or counters on the reader-facing pages.

Pass conditions:

- `reg-scan` has completed at least one live run outside the constrained sandbox. Status: completed locally on 2026-07-04.
- `docs/latest.json`, `docs/feed.xml`, `docs/horizon.ics`, and `docs/archive/<YYYY-MM-DD>.html` are produced from the live run. Status: completed for edition 2026-07-04.
- The scanner is now integrated into this workspace at `tools/reg-scan/`.
- The site sync path is proven: `tools/reg-scan/docs/` -> `dashboard/regulatory-horizon/` plus mockup Reg Horizon data/feed/calendar/archive artifacts. Status: `npm run horizon:sync` completed locally from the integrated scanner.
- Source ladder is reviewed: approved sources can create material signals; pilot sources remain policy-watch only; candidate sources do not enter the briefing.
- `latest.json` uses the 2026-07-04 additive contract: `signals[]` is capped at 10 material rows, `signals[].sourceStatus` is present where known, and `warnings[]` records source concentration, low diversity, source health, and quiet-theme caveats.
- Pending scraper backlog is recorded separately from the public page.
- Pipeline counters reconcile after any gate or source change.
- The public page continues to avoid KPI tiles and pipeline-evidence sections.
- Remaining production requirement: prove the same live run and commit/push flow in the repo-level recurring Wednesday GitHub Actions workflow.

### Gate D: Site Identity And URL Decision

Do not treat route mapping as a purely technical redirect table. The live site currently separates the root home page, Intelligence, and The Virtual Officer. The mockup folds the experience into a single front door. That needs an explicit decision before canonical URLs, redirects, analytics, and navigation can be final.

Working decision as of 2026-07-04: use root-level tabs for the mockup and staging plan. This means the target structure is `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/archive/`, and `/about/`. Treat this as the current migration assumption, but do not enable production redirects until staging QA and analytics checks pass.

Pass conditions:

- Decide whether the root domain remains the St Georges Strategy corporate home, or whether The Virtual Officer becomes the root experience.
- Confirm root-level tabs as the final production path, or explicitly reverse the working decision before staging.
- Confirm final canonical URLs for every route before publishing SEO metadata.
- Update every URL-bearing metadata field together after the route decision: canonical link, `og:url`, JSON-LD `mainEntityOfPage.@id`, sitemap entries, feed links, calendar links, and any newsletter links.
- Confirm analytics continuity across old and new paths before redirects.
- Confirm whether old Intelligence and AI Signals URLs remain separate, redirect, or become archive paths.

Current mockup caveat:

- The mockup now uses root-level URLs in canonical tags, `og:url`, and JSON-LD `@id` fields: `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/archive/`, and `/about/`.
- If Gate D is later reversed to `/intelligence/`, `/thevirtualofficer/`, or another parent path, all 14 pages need a metadata URL rewrite, not only navigation changes.

## Proposed Stages

1. Preserve the current baseline.

   Already done with the pre-redesign backup under `backups/site-baseline-before-redesign-20260704-1235/` and the iCloud copy.

2. Complete the pass/fail rubric before more visual iteration.

   Stop using subjective "content-complete" language. Stage 2 is complete only when Gate A is 100% `Yes` for the weekly brief and each active topic page.

   In parallel, complete Gate B and Gate C so the publisher can write the source data the new site will consume and the regulatory scan is operationally ready.

3. Build the new structure beside the existing site.

   Begin this stage only after Gate A, Gate B, Gate C, and Gate D are complete.

   Do not delete or overwrite current pages. Create parallel draft routes or folders first:

   - `/brief/`
   - `/signals/`
   - `/signals/ai/`
   - `/regulatory-horizon/`
   - `/archive/`
   - `/about/`

4. Map old pages to new roles.

   - Existing intelligence homepage -> future weekly brief or home modules
   - Existing AI Signals -> future Signals topic source
   - Existing regulatory horizon -> future Horizon stream
   - Existing archive pages -> combined archive index
   - Existing Virtual Officer page -> new home/about concept material

5. Preview in staging.

   Use a non-public or preview deployment first. Check:

   - Desktop layout
   - Mobile layout
   - Internal links
   - Existing URLs
   - Metadata
   - Search/social previews
   - Accessibility states
   - No premature contact CTA
   - Redirect type is planned as `301` for permanent SEO weight transfer, not `302`
   - Existing newsletter issue links into old archive or topic paths still resolve in staging
   - Traffic analytics carry over so readership can be compared before and after launch

6. Switch navigation first, not content.

   Once the new pages feel right, update only navigation labels and links in preview. Keep old pages reachable.

7. Redirect only after approval.

   Add redirects only after the staging checklist passes and you are comfortable with the new structure. Use permanent `301` redirects for approved route moves. Suggested redirects:

   - `/ai-signals/` -> `/signals/`
   - `/intelligence/` -> `/brief/` or new home, depending on final decision
   - old archive paths -> combined archive paths where needed

   Before enabling redirects, test:

   - Existing newsletter links into old archive paths
   - Existing AI Signals links
   - Existing intelligence archive links
   - Search/social preview URLs
   - Analytics continuity across old and new paths

8. Keep rollback simple.

   If the new structure feels wrong, restore from the backup archive or revert the specific files touched during the migration.

## Recommendation

Do not migrate yet, and do not iterate on the mockup indefinitely. The next step is to score the weekly brief and topic pages against Gate A, fix any `No` items, and resolve Gate B in parallel. Navigation and redirects should wait until both gates pass.

## Current Mockup Status

Closer, but still not migration-ready.

The weekly brief is now the strongest page. All eight signal streams now have topic pages with weekly Top 5 shortlists and a curated set of still-material signals. The next work should be:

- Maintain the live Gate A score in `MIGRATION_READINESS_SCORECARD.md`.
- Convert every remaining `No` or `Needs review` into a concrete content or QA task.
- Resolve the GitHub/PAT/Docker publisher write-access issue in parallel.
- Complete the remaining Gate C production requirement: recurring Wednesday live run and commit/push through the intended automation environment.
- Horizon now has a mockup renderer that can consume the regulatory scan `latest.json`; production rendering pattern is decided as build-time generated HTML with JSON retained as the source contract.
- Decide how financial crime, cyber, technology failure, and data refresh from source data rather than remaining static mockup pages.
- Check the information density against the current intelligence homepage before any production route changes.

## Regulatory Horizon Integration Notes

Use `/docs/latest.json` from `reg-scan` as the source contract.

Do not build the site against pipeline internals. The page should render:

- `edition`
- `generatedAt`
- `bottomLine`
- `horizon[]` with owner/action/evidence prompts
- explicit `top5` rows ranked by weekly editorial weight, plus an unranked `stillMaterial` set reviewed on a 90-day default and 180-day exception window
- `signals[].sourceStatus` when present, as an additive source-context field
- `warnings[]` where reader-safe coverage caveats need to be shown or admin-only health warnings need to be tracked
- `archives[]`

Do not reintroduce the removed KPI strip or pipeline-evidence section. The KPI values can remain in JSON for debugging and future private use.

Claude update, 2026-07-04:

- The approved RSS source list was already correctly configured; the earlier FCA concentration came from fixture/demo output, not from gate bias. A local live run on 2026-07-04 produced broader source coverage.
- `material_cap` is now 10, so the site can treat `signals[0:5]` as the leadership shortlist and `signals[5:10]` as supporting material.
- `sourceStatus` and `warnings[]` are additive fields. Existing consumers that ignore them still see the old contract.
- `warnings[]` includes source-concentration, low-source-diversity, source-health, and quiet-theme warnings. Public pages may show reader-safe coverage caveats, but source-health/fetch failure detail remains admin/migration evidence.

## Regulatory Scan Surface Map

Use these surfaces deliberately:

- Public Horizon page: `bottomLine`, `horizon[]`, `signals[]`, `archives[]`, owner/action/evidence prompts, primary-source URLs, RSS link, calendar link.
- Public Horizon page may show plain source-coverage caveats from `warnings[]` where they help the reader interpret a fixture or unusually concentrated edition.
- Public Signals page: groups Horizon `signals[]` by `riskAreas` and routes readers into topic pages.
- Archive: stores dated weekly editions and topic pages.
- Admin/migration only: source ladder detail, pending scrapers, live-run health, source-health warnings, pipeline counters, publisher failures, source onboarding notes.

## Signals Top 5 / Additional 10 Production Strategy

Use `signals/SIGNAL_REFRESH_STRATEGY.md` as the operating guide for producing topic lists after migration.

Before stage 3, confirm:

- The build-time generated HTML rendering pattern is implemented in the publisher.
- Whether a shared `signals.json` file is introduced for all topic streams. Status: local dry run now generates `data/signals.json`; production still needs live weekly input generation.
- Whether the weekly top 5 requires explicit editorial approval after scoring.
- How many historical topic editions should exist at launch.

Recommended direction: use build-time generation for the final public HTML, with JSON files preserved as the source contracts and optional client-side enhancement only for freshness or filtering. That gives search engines, social crawlers, and newsletter readers complete pages without relying on JavaScript, while still allowing `latest.json` and future `signals.json` to drive the weekly workflow.

## Weekly Publisher Coverage

The current publisher regenerates one public page. The new architecture needs a multi-route weekly publish step before migration.

Use `WEEKLY_PUBLISHER_CONTRACT.md` as the required output contract. Use `npm run site:verify` for the source site and `npm run site:build` for a generated staging-style build.

Minimum weekly outputs:

- Home/front door current issue preview.
- Weekly brief page and dated archive copy.
- Signals hub with visible topic Top 5 lists.
- Eight Signals topic pages with a weekly Top 5 plus three to seven still-material signals.
- Reg Horizon page from `latest.json`.
- Archive index updates for weekly issues, topic editions, and Reg Horizon editions.
- Feed/calendar artifacts where used by the reader journey.

The local dry run now proves the route, archive, sitemap, redirect, header, and `signals.json` output shape. Do not call the migration production-ready until the publisher can generate the same outputs from live inputs and commit them through the fixed GitHub credential path.

Run cadence:

- Wednesday is the weekly evidence and publication day.
- Reg Horizon should run first, so `latest.json`, feed, calendar, and archive outputs are available before the brief and topic pages are generated.
- Editorial review then confirms the consolidated Top 5, exclusions, caveats, and any cross-topic judgement.
- The site publisher runs last and updates the root-level routes and archives together.

## Site Identity Decision

The current live navigation treats Home, Intelligence, and The Virtual Officer as separate concepts. The mockup currently acts as if The Virtual Officer is the front door.

Use `SITE_STRUCTURE_AND_TOPIC_PLAN.md` for the current recommended structure and route options. The working recommendation is to make the visible tabs match the public routes:

- Home -> `/`
- Weekly Brief -> `/brief/`
- Signals -> `/signals/`
- Reg Horizon -> `/regulatory-horizon/`
- Archive -> `/archive/`
- About -> `/about/`

This is now the working decision for the mockup and staging plan. It becomes final for production only when Gate D is explicitly approved after staging QA, redirect planning, and analytics checks.

Use `STAGING_REDIRECT_ANALYTICS_PLAN.md` for the route, redirect, analytics, and production-staging QA checklist.

Before redirects or final canonicals:

- Choose whether the corporate home remains distinct from The Virtual Officer.
- Choose whether Intelligence becomes the weekly brief, redirects into the brief, or remains a separate archive/landing surface.
- Choose whether AI Signals redirects to `/signals/ai/`, `/signals/`, or remains a legacy archive.
- Confirm analytics, canonical URLs, and social preview URLs after that decision.

## Source Operating Model

Use `SOURCE_OPERATING_MODEL.md` as the source governance guide for the new architecture.

Before stage 3, confirm:

- Source registry audit passes.
- Each signal stream has enough primary and specialist coverage.
- Press-only items are labelled as monitoring or market colour.
- Official claims use official sources.
- Candidate source intake gates remain separate from publication.
- Source diversity and freshness checks are part of weekly preflight.
