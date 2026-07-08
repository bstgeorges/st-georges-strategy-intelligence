# Staging Redirect And Analytics Plan

Status date: 2026-07-04

This plan covers the route migration from the current live structure to root-level tabs.

## Working Final Routes

- `/`
- `/brief/`
- `/signals/`
- `/signals/ai/`
- `/signals/resilience/`
- `/signals/third-party/`
- `/signals/market-structure/`
- `/signals/financial-crime/`
- `/signals/cyber/`
- `/signals/technology-failure/`
- `/signals/data/`
- `/regulatory-horizon/`
- `/archive/`
- `/about/`

## Redirect Rules To Test In Staging

Use permanent `301` redirects only after approval.

| Existing / legacy route | Proposed destination | Test |
| --- | --- | --- |
| `/intelligence/` | `/brief/` or `/` | Decide whether old Intelligence maps to current issue or front door. |
| `/intelligence/archive/` | `/archive/` | Preserve archive discovery. |
| `/intelligence/regulatory-horizon/` | `/regulatory-horizon/` | Preserve horizon links. |
| `/ai-signals/` | `/signals/ai/` | Prefer direct topic page. |
| `/ai-signals/archive/` | `/archive/` or `/signals/ai/archive/` | Decide after topic archive route exists. |
| `/thevirtualofficer/` | `/about/` or `/` | Decide whether it becomes concept/about or front door. |
| `/thevirtualofficer/brief/` | `/brief/` | Preserve mockup/newsletter links. |
| `/thevirtualofficer/signals/` | `/signals/` | Preserve hub links. |
| `/thevirtualofficer/signals/ai/` | `/signals/ai/` | Preserve AI topic links. |
| `/thevirtualofficer/regulatory-horizon/` | `/regulatory-horizon/` | Preserve horizon links. |

## Staging Checks

Run before production redirects:

- Generate the staging-style local build with `npm run site:build`.
- Use `site-dist/` as the static folder for the first preview deployment.
- Current preview URL: `https://migration-preview.st-georges-strategy-intelligence.pages.dev`.
- Every final route returns 200.
- Every legacy route returns the planned 301.
- Redirect chains are one hop where possible.
- Canonical URL on the destination uses the final root-level route.
- `og:url` and JSON-LD `@id` use the same final route.
- Old newsletter links into archive pages still resolve.
- Reg Horizon feed and calendar URLs resolve.
- Search/social previews use the new final URLs.

## Analytics Continuity

Before cutover:

- Confirm the production analytics property is loaded on all final routes.
- For static preview deployments, set `CF_WEB_ANALYTICS_TOKEN` before running `npm run deploy:cloudflare:migration-preview`; the publisher injects the beacon at build time.
- Confirm page path reporting uses root-level paths.
- Capture baseline page views for `/`, `/intelligence/`, `/ai-signals/`, `/thevirtualofficer/`, and archives.
- After staging redirect tests, confirm redirected visits land on the expected final route.
- After production cutover, compare readership against the baseline for at least two weekly issues.

## Production QA

Repeat the mockup responsive pass on staging final URLs:

- 320px
- 390px
- 768px
- 1440px

Do not treat the mockup screenshots as production proof. The staging route, analytics, redirect, and asset path context can still expose issues.

## Verification Command

Before staging, generate the local build:

```bash
npm run site:build
```

Once staging exists from `site-dist/`, run:

```bash
npm run staging:migration:verify -- --base <staging-url> --require-analytics --check-redirects
```

Then run responsive QA against the same staging routes:

```bash
npm run verify:responsive -- \
  <staging-url>/ \
  <staging-url>/brief/ \
  <staging-url>/signals/ \
  <staging-url>/signals/ai/ \
  <staging-url>/signals/resilience/ \
  <staging-url>/signals/third-party/ \
  <staging-url>/signals/market-structure/ \
  <staging-url>/signals/financial-crime/ \
  <staging-url>/signals/cyber/ \
  <staging-url>/signals/technology-failure/ \
  <staging-url>/signals/data/ \
  <staging-url>/regulatory-horizon/ \
  <staging-url>/archive/ \
  <staging-url>/about/
```
