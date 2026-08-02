# Weekly Publisher Contract

Status date: 2026-07-04

This defines what the production publisher must generate before the mockup can migrate.

## Rendering Decision

Decision: use build-time generated HTML as the production rendering pattern.

JSON remains the source contract, but public pages should be complete without JavaScript. Client-side scripts may enhance freshness or fallback rendering, but crawlers, newsletter readers, and no-JS visitors should receive the full editorial page.

Why this pattern:

- Better SEO and social previews.
- Reliable archives.
- No dependency on client-side rendering for public content.
- Easier rollback: generated HTML can be restored from a previous edition.
- `latest.json`, `signals.json`, RSS, and calendar files remain available for machine use.

## Weekly Inputs

The publisher should read:

- Reg Horizon `tools/reg-scan/docs/latest.json`, `tools/reg-scan/docs/feed.xml`, `tools/reg-scan/docs/horizon.ics`, and `tools/reg-scan/docs/archive/<YYYY-MM-DD>.html`.
- AI Signals data.
- A shared topic-candidate data file, likely `signals.json`, produced from approved sources plus editorial overrides.
- Editorial override file for the weekly Top 5, exclusions, ranking changes, and source caveats.

## Weekly Cadence

Target cadence: run the Reg Horizon scan on Sunday in the same working window as the weekly site update, so the approved edition is ready for Monday LinkedIn distribution.

Recommended sequence:

1. Run `reg-scan` and open a review PR containing `docs/latest.json`, `docs/feed.xml`, `docs/horizon.ics`, and the dated Horizon archive.
2. Review warnings, source concentration, quiet themes, and any failed source-health items as admin evidence, then merge only the approved scan PR.
3. Let the merge-triggered candidate refresh and editorial prep consume the merged `main` state; prep must fail if the reviewed Horizon edition is more than eight days old or withheld.
4. Generate the Weekly Brief, Signals hub, eight topic pages, Reg Horizon page, and archive routes.
5. Run pre-publish checks and responsive QA.
6. Run the ordered-release gate: Signals and Reg Horizon must be current and approved, the current edition's lead signals must match the Signals dataset, and the judgement must not repeat the prior archived edition.
7. Commit and publish only after the generated site passes the migration verifier and canonical release workflow.

The scan should not publish directly to the public site without the editorial/site generation step. The Sunday run is the evidence refresh; the site publisher is the release step.

## Weekly Outputs

Each run must produce or update:

| Output | Final route | Requirement |
| --- | --- | --- |
| Home | `/index.html` | Current issue preview, concept, weekly routes, and no stale issue copy. |
| Weekly Brief | `/brief/index.html` | Current consolidated Top 5, executive readout, horizon prompts, source trails. |
| Weekly archive | `/archive/brief/<YYYY-MM-DD>/index.html` | Frozen copy of the weekly brief. |
| Signals hub | `/signals/index.html` | Eight streams, current signal stack, topic Top 5 previews, archive links. |
| AI topic | `/signals/ai/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Resilience topic | `/signals/resilience/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Third-party topic | `/signals/third-party/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Market structure topic | `/signals/market-structure/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Financial crime topic | `/signals/financial-crime/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Cyber topic | `/signals/cyber/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Technology failure topic | `/signals/technology-failure/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Data topic | `/signals/data/index.html` | Weekly Top 5 plus 3–7 still-material signals, source labels, evidence prompts. |
| Topic archives | `/signals/<topic>/archive/<YYYY-MM-DD>/index.html` | Frozen topic edition for every active stream. |
| Reg Horizon | `/regulatory-horizon/index.html` | Build-time HTML from `latest.json`; Top 5 plus additional rows. |
| Reg Horizon JSON | `/regulatory-horizon/latest.json` | Machine-readable current edition. |
| Reg Horizon archive | `/regulatory-horizon/archive/<YYYY-MM-DD>.html` | Frozen horizon edition. |
| Feed/calendar | `/regulatory-horizon/feed.xml`, `/regulatory-horizon/horizon.ics` | Copied from reg-scan outputs. |
| Archive index | `/archive/index.html` | Links weekly, topic, and horizon archives. |
| Sitemap | `/sitemap.xml` | Root-level route map plus archives. |

## Pre-Publish Checks

The publisher must fail before deploy if:

- Any required route is missing.
- Any canonical URL, `og:url`, or JSON-LD `@id` points to the old `/thevirtualofficer/` parent.
- A topic page has fewer than 5 Top 5 rows without an explicit caveat.
- A topic page has fewer than 3 or more than 7 still-material rows.
- Reg Horizon `signals[]` has more than 10 rows.
- Reg Horizon lacks `sourceStatus` or `warnings[]` after the new contract is live.
- Author footer or disclaimer is missing.
- Local internal links fail.
- Responsive QA fails at 320px, 390px, 768px, or 1440px.

## Failure Mode

If a weekly data input fails:

- Do not publish a partially refreshed site silently.
- Keep the previous public edition live.
- Write an admin-only failure note.
- Allow a manual editorial override only when the source caveat is visible in the archive record.

## Current Status

The mockup has the route shape and responsive QA evidence. `npm run site:verify` proves the site contract locally.

Local publisher dry-run status:

- `npm run site:build` generates a staging-style build at `site-dist/`.
- The dry run writes the 14 current routes, dated weekly brief archive, eight dated topic archives, Reg Horizon JSON/feed/calendar/archive files, `data/signals.json`, `sitemap.xml`, `_headers`, `_redirects`, and `publish-report.json`.
- The publisher reads `site/data/signals.json` and renders each weekly Top 5 plus 3–7 unranked, still-material rows from that shared topic data contract.
- The dry run normalises archive links to root-relative paths, which is required before staging.
- If `CF_WEB_ANALYTICS_TOKEN` is set, the publisher injects the Cloudflare Web Analytics beacon into generated HTML.

Reg Horizon live-run status:

- A live `reg-scan` run completed locally on 2026-07-04.
- `reg-scan` now lives inside this workspace at `tools/reg-scan/`.
- `npm run horizon:sync` copies the scanner outputs into `dashboard/regulatory-horizon/` and the mockup Reg Horizon data/feed/calendar/archive artifacts.
- The synced live output should cap public material output at 10 signals, with 3 horizon dates and the additive `sourceStatus` / `warnings[]` contract.

Still not proven:

- The production publisher can generate all root-level pages from live data inputs rather than the site source.
- The production publisher can commit and push those generated outputs.
- The repo-level Sunday GitHub Actions workflow has been added at `.github/workflows/reg-scan-weekly.yml`; it still needs to run once successfully in GitHub and push the resulting scan/site artifacts.
- The staging preview still needs a deploy with the real `CF_WEB_ANALYTICS_TOKEN` before analytics continuity passes.
