# Site Structure And Topic Plan

Status date: 2026-07-04

This document turns the mockup into a migration structure. It should be read alongside `MIGRATION_PLAN.md`, `MIGRATION_READINESS_SCORECARD.md`, `SOURCE_OPERATING_MODEL.md`, and `signals/SIGNAL_REFRESH_STRATEGY.md`.

## Recommended Domain Structure

Working decision as of 2026-07-04: keep `stgeorgesstrategy.com/` as the public front door, and make the six navigation tabs the primary structure beneath it.

Proposed final tabs:

| Tab | Route | Role |
| --- | --- | --- |
| Home | `/` | Editorial front door, current issue preview, concept, and route into the weekly brief. |
| Weekly Brief | `/brief/` | Current week's consolidated so-what, Top 5, executive readout, horizon prompts, and challenge questions. |
| Signals | `/signals/` | Eight-stream signal library and current topic coverage. |
| Reg Horizon | `/regulatory-horizon/` | Forward regulatory scan: deadlines, material signals, owner/action/evidence prompts, source coverage, feed/calendar/archive. |
| Archive | `/archive/` | Weekly brief archive, topic archive, and Reg Horizon archive. |
| About | `/about/` | Concept, operating model, author section, contact, disclaimer, and source discipline. |

This structure makes the live domain match the reader tabs. It avoids making `/thevirtualofficer/` a deep product folder when the new experience is really the main intelligence surface.

## Alternative Structures

### Option A: Root Tabs

Routes:

- `/`
- `/brief/`
- `/signals/`
- `/regulatory-horizon/`
- `/archive/`
- `/about/`

Pros:

- Cleanest reader experience.
- Canonicals match the visible navigation.
- Short URLs for newsletters and social sharing.
- The site feels like one coherent publication.

Cons:

- Requires deciding what happens to the existing corporate home.
- Requires careful redirects from old Intelligence and Virtual Officer paths.

Status: selected as the current working structure for the mockup and staging plan.

### Option B: Intelligence Hub

Routes:

- `/intelligence/`
- `/intelligence/brief/`
- `/intelligence/signals/`
- `/intelligence/regulatory-horizon/`
- `/intelligence/archive/`
- `/intelligence/about/`

Pros:

- Preserves the root domain as a corporate landing page.
- Keeps the new work clearly under the Intelligence brand.
- Safer if the root needs to remain a broader St Georges Strategy page.

Cons:

- Longer URLs.
- More friction between the tab labels and actual paths.
- The new experience may feel like a subsection rather than the main product.

Recommendation: use only if the root domain must stay as a separate corporate home.

### Option C: Virtual Officer Folder

Routes:

- `/thevirtualofficer/`
- `/thevirtualofficer/brief/`
- `/thevirtualofficer/signals/`
- `/thevirtualofficer/regulatory-horizon/`
- `/thevirtualofficer/archive/`
- `/thevirtualofficer/about/`

Pros:

- Preserves the existing Virtual Officer identity.
- Least disruptive if existing links already point there.

Cons:

- Deep URLs for a publication-style site.
- It makes Home ambiguous: is the root home, or the Virtual Officer home?
- Canonicals and nav feel less natural than the visible tabs.

Recommendation: not preferred for the final public structure, but acceptable for staging.

## Route Decision

Current working decision:

- Root-level tabs are the target staging structure.
- `/intelligence/` remains a possible redirect/source mapping question.
- `/thevirtualofficer/` should not be the final URL parent unless the brand strategy changes.

The mockup metadata now follows the root-level route assumption. Before production cutover, confirm canonical URLs, Open Graph URLs, JSON-LD `@id`, sitemap entries, feed links, calendar links, archive links, analytics continuity, and redirect rules against the staging deployment.

## Topic Structure

The Signals library has eight active streams.

| Topic | Route | Role In Weekly Brief | Primary Inputs |
| --- | --- | --- | --- |
| AI | `/signals/ai/` | Agentic capability, model/provider change, AI governance, control evidence, infrastructure exposure. | `ai-signals.json`, model/provider pages, AI governance sources, credible adoption/market reporting. |
| Operational resilience | `/signals/resilience/` | Important business services, customer-visible failure, fallback evidence, recovery, incident learning. | Official resilience expectations, outage/incident sources, payment/cloud/telecom/cyber evidence. |
| Third-party and vendor risk | `/signals/third-party/` | Critical dependencies, model providers, processors, cloud, fourth parties, contract and exit evidence. | Outsourcing expectations, AI/provider signals, resilience incidents, processor/cloud/network evidence. |
| Market structure | `/signals/market-structure/` | Capital, liquidity, crypto, AI infrastructure, private credit, settlement, market plumbing. | Horizon material signals, central-bank/supervisor sources, BIS/FSB, credible market reporting. |
| Financial crime | `/signals/financial-crime/` | Fraud, scams, sanctions, AML, crypto misuse, customer harm, escalation evidence. | FCA, PSR, OFSI, FATF, FinCEN/OFAC where approved, payment-fraud and scam sources. |
| Cyber | `/signals/cyber/` | Vulnerability response, identity, ransomware, cyber resilience, threat-led testing, board accountability. | NCSC, FCA/PRA, CBEST, CISA/KEV, ENISA, credible cyber incident reporting. |
| Technology failure | `/signals/technology-failure/` | Platform outages, change failure, cloud incidents, data integrity, recovery evidence. | Operational resilience sources, DORA/ICT expectations, outage and technology incident reporting. |
| Data | `/signals/data/` | Risk data, regulatory reporting, lineage, records, privacy, AI inputs, evidence integrity. | BCBS 239, FCA/BoE reporting, ICO guidance, data governance and privacy sources. |

Each topic page should publish:

- A current weekly Top 5.
- Ten additional source-backed rows, or an explicit note that fewer rows cleared the threshold.
- Source labels and source type.
- Editorial judgement.
- So-what view.
- Audience / who should care.
- Evidence prompts.
- Topic archive route.
- Related weekly brief link.

## Weekly Publish Contract

Recommended rendering model: build-time generated HTML, with JSON files preserved as evidence contracts and optional client-side enhancement only where useful.

Operating cadence: Wednesday is the combined Reg Horizon scan and site update day. The scan should run before the brief/topic generation, so the weekly issue can absorb fresh horizon items before publication.

Each weekly run should produce or update:

| Output | Route / File | Source |
| --- | --- | --- |
| Home preview | `/index.html` | Current weekly brief summary and selected topic/horizon highlights. |
| Current weekly brief | `/brief/index.html` | Editorial selection across Signals and Reg Horizon. |
| Dated weekly archive | `/archive/<YYYY-MM-DD>/index.html` or `/archive/brief/<YYYY-MM-DD>/index.html` | Frozen weekly brief. |
| Signals hub | `/signals/index.html` | Current topic Top 5s, signal stack, topic routes, archive links. |
| Eight topic pages | `/signals/<topic>/index.html` | Topic Top 5, 5 more, sources, evidence prompts. |
| Topic archives | `/signals/<topic>/archive/<YYYY-MM-DD>/index.html` | Frozen topic edition. |
| Reg Horizon page | `/regulatory-horizon/index.html` | `reg-scan/docs/latest.json`. |
| Reg Horizon data | `/regulatory-horizon/latest.json` | Current machine-readable horizon edition. |
| Reg Horizon archive | `/regulatory-horizon/archive/<YYYY-MM-DD>.html` | Frozen horizon edition from `reg-scan`. |
| Feed/calendar | `/regulatory-horizon/feed.xml`, `/regulatory-horizon/horizon.ics` | `reg-scan` outputs. |
| Archive index | `/archive/index.html` | Weekly, topic, and horizon archive routes. |

Reg Horizon contract note:

- `signals[]` is capped at 10 material rows.
- The public page treats `signals[0:5]` as the Top 5 and `signals[5:10]` as the 5 more rows.
- `signals[].sourceStatus` is an additive source-context field.
- `warnings[]` can inform source-coverage caveats. Source-health/fetch failures remain admin evidence unless a plain reader-facing caveat is needed.
- The current FCA-heavy fixture output is not a migration blocker by itself; the blocker is completing and syncing a first live run from a network environment that can reach regulator domains.

## Redirect Planning

Use permanent `301` redirects only after staging sign-off.

Likely redirects if root tabs are chosen:

| Old / provisional route | Final route | Notes |
| --- | --- | --- |
| `/thevirtualofficer/` | `/` or `/about/` | Decide whether it becomes concept/about or front door. |
| `/thevirtualofficer/brief/` | `/brief/` | Preserve newsletter links. |
| `/thevirtualofficer/signals/` | `/signals/` | Preserve topic hub links. |
| `/thevirtualofficer/signals/ai/` | `/signals/ai/` | Preserve AI Signals links. |
| `/thevirtualofficer/regulatory-horizon/` | `/regulatory-horizon/` | Preserve horizon links. |
| `/intelligence/` | `/brief/` or `/` | Decide whether old Intelligence maps to current issue or front door. |
| old AI Signals route | `/signals/ai/` | Prefer direct topic landing. |

Before redirects:

- Crawl old newsletter links.
- Confirm old archive paths resolve.
- Confirm analytics continuity.
- Confirm canonical and `og:url` rewrite.
- Confirm RSS/calendar paths.

## Pre-Migration Work Still Needed

1. Resolve final domain structure.
2. Rewrite production metadata after the route decision.
3. Complete responsive QA for Home, Weekly Brief, all eight topics, Reg Horizon, Archive, and About.
4. Prove publisher can generate all weekly routes and commit/push them.
5. Complete at least one live Reg Horizon run with source-diversity checks.
6. Add topic archive generation.
7. Add redirect test plan and analytics continuity check.
8. Run one staging release using final routes before touching production navigation.
