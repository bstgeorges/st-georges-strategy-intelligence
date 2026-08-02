# Project Virtual Officer

Starter framework and mock-up for designing a Virtual Operational Risk Officer for a large financial institution.

## What is included

- `docs/virtual-officer-framework.md` - end-to-end framework, delivery steps, governance, and roadmap.
- `docs/side-by-side-agent-model.md` - operating model for a virtual officer working beside the user.
- `docs/persona-operational-risk-officer.md` - draft persona and operating principles.
- `docs/task-catalogue.md` - initial task inventory for an Operational Risk officer.
- `docs/scheduled-intelligence-cadence.md` - consolidated financial services intelligence schedule.
- `docs/weekly-refresh-workflow.md` - Sunday refresh workflow for Intelligence and AI Signals, ready for Monday LinkedIn distribution.
- `docs/weekly-refresh-packet-template.md` - weekly source packet and draft template.
- `docs/source-expansion-plan.md` - source coverage model and signal-quality tests.
- `docs/source-intake-gates.md` - candidate source scoring and promotion process.
- `docs/analytics-setup.md` - security-header and Cloudflare analytics wiring notes.
- `docs/remote-hosting.md` - static hosting and live-update notes for the dashboard.
- `docs/responsive-qa.md` - viewport coverage and responsive layout checks.
- `docs/github-publish-checklist.md` - safe GitHub repo and Cloudflare Pages setup checklist.
- `docs/landing-page-format.md` - approved `stgeorgesstrategy.com` landing-page look and restore notes.
- `docs/forecasting-metrics-approach.md` - approach for forecasting KRIs and operational risk metrics.
- `docs/operational-risk-forecasting-approach.md` - broader approach for operational risk outlooks.
- `docs/scenario-forecasting-approach.md` - approach for base, downside, and upside risk scenarios.
- `docs/forecast-challenge-approach.md` - review method for challenging forecast defensibility.
- `docs/prompt-templates.md` - reusable MVP prompt and output templates.
- `docs/knowledge-base-design.md` - proposed knowledge base structure, metadata, and controls.
- `docs/source-inventory-template.md` - working template for source approval, metadata, and ingestion readiness.
- `docs/pilot-readiness-checklist.md` - practical readiness gate for a controlled user pilot.
- `docs/mockup-spec.md` - product behavior and screen notes for the prototype.
- `mockup/index.html` - clickable side-by-side agent mock-up.
- `mockup/styles.css` - visual design for the mock-up.
- `mockup/app.js` - simple task and knowledge-base interactions.
- `dashboard/index.html` - shareable read-only financial services dashboard/newsletter.
- `dashboard/data/latest.json` - sanitized public content seed for future published updates.
- `dashboard/data/ai-signals.json` - scheduled AI Signals feed rendered by `dashboard/ai-signals/index.html`.
- `snapshots/landing-page-editorial-masthead-2026-06-28.js` - saved landing-page style snapshot.
- `netlify.toml` - static hosting configuration for Netlify-style deployments.
- `package.json` - local preview and static deployment commands.

## Dashboard Preview And Deployment

Local preview:

```bash
npm run preview
```

Default production deploy path:

```text
GitHub Actions
```

Use push to `main` or manual `workflow_dispatch` as the normal deployment route. Use a normal local Mac terminal only as a fallback emergency surface. Do not treat the mounted Codex workspace as a supported `wrangler` or Node deploy environment.

Live weekly brief URL:

```text
https://stgeorgesstrategy.com/brief/
```

Live St Georges Strategy site:

```text
https://stgeorgesstrategy.com/
```

The public site now uses root-level routes served from a generated Cloudflare Pages build, with legacy Worker routes redirecting older `/intelligence/`, `/ai-signals/`, and `/thevirtualofficer/` URLs into the new structure.

About / method page:

```text
https://stgeorgesstrategy.com/about/
```

The `/about/` page carries the evergreen method and author framing. The `/brief/` page is the live weekly proof page.

Signals hub:

```text
https://stgeorgesstrategy.com/signals/
```

AI signals topic page:

```text
https://stgeorgesstrategy.com/signals/ai/
```

Legacy `/ai-signals/` and `/intelligence/` routes are retained as redirects so older links still resolve.

Cloudflare Pages fallback:

```text
https://st-georges-strategy-intelligence.pages.dev/
```

Custom subdomain status:

```text
intelligence.stgeorgesstrategy.com
```

Live. DNS resolves through Cloudflare and HTTPS returns the dashboard. The custom subdomain is served by a Cloudflare Worker route that proxies the known-good Pages deployment.

Cloudflare DNS record used:

```text
Type: CNAME
Name: intelligence
Target: st-georges-strategy-intelligence.pages.dev
Proxy: Proxied
```

Operational commands:

```bash
npm run archive:current -- --date YYYY-MM-DD
npm run ai-signals:validate -- --date YYYY-MM-DD
npm run signals:validate
npm run signals:candidates:refresh
npm run signals:candidates:validate
npm run sources:intake
npm run sources:promote
npm run sources:audit
npm run refresh:preflight -- --date YYYY-MM-DD
npm run verify:public-links
```

Emergency-only local deploy commands:

```bash
npm run deploy:cloudflare
npm run deploy:cloudflare:preview
npm run deploy:cloudflare:route
npm run deploy:cloudflare:subdomain-route
npm run deploy:cloudflare:ai-signals-route
npm run deploy:cloudflare:landing-route
npm run deploy:cloudflare:thevirtualofficer-route
npm run deploy:netlify
```

Before sharing or redeploying public pages, all source links and rendered HTML must be checked with `npm run verify:public-links`. Replace or remove any URL that returns `404`, `410`, `5xx`, DNS, or connection errors; keep `401`/`403` links only when they are known paywalled/restricted pages rather than missing pages. The check also fails if a public page serves raw `{{ ... }}` template bindings or an `x-dc` template shell.

## How to use this in VS Code with GitHub Copilot

1. Open this folder in VS Code.
2. Start with `docs/virtual-officer-framework.md` and refine the assumptions for your institution.
3. Use Copilot to expand the task catalogue one risk domain at a time.
4. Open `mockup/index.html` in a browser to explore the side-by-side agent prototype.
5. Replace placeholder policies and tasks with your actual internal taxonomy, control library, and reporting standards.

## Important note

This is a design and prototyping kit. A production virtual officer in a regulated financial institution needs model risk review, data access controls, audit logging, security approval, legal review, and clear human accountability.
