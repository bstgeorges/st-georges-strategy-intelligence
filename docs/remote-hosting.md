# Remote Hosting Notes

The public site is a generated static read-only build in `site-dist/`. It can be hosted by any static provider without exposing Telegram credentials or Codex automation files.

Live St Georges Strategy landing page: `https://stgeorgesstrategy.com/`

Weekly brief page: `https://stgeorgesstrategy.com/brief/`

Signals hub: `https://stgeorgesstrategy.com/signals/`

AI signal brief route: `https://stgeorgesstrategy.com/signals/ai/`

Regulatory horizon route: `https://stgeorgesstrategy.com/regulatory-horizon/`

Archive route: `https://stgeorgesstrategy.com/archive/`

About / method route: `https://stgeorgesstrategy.com/about/`

Cloudflare Pages fallback: `https://st-georges-strategy-intelligence.pages.dev/`

Important: `site/` is the curated source tree and `site-dist/` is the only publishable static bundle. The older `dashboard/` tree remains in the repo for legacy material and data feeds, but it is no longer the canonical public-site output.

## Recommended Default

Use Cloudflare Pages or Netlify with:

- Publish directory: `site-dist`
- Build command: none
- Public access: read-only
- Private credentials: keep outside the published directory

The generated build includes `_headers`, `_redirects`, `sitemap.xml`, and archive copies so a static host can serve the migrated route structure directly.

Default production deployment path:

- GitHub Actions on push to `main`
- GitHub Actions manual dispatch when needed

Important deploy-surface note:

- Codex can safely edit and validate this repo inside the mounted workspace.
- Production deploys should run from GitHub Actions or a normal local terminal, not from the mounted Codex sandbox.
- See [Deploy Surface Runbook](/Users/benstgai/Documents/Project%20Virtual%20Officer/docs/deploy-surface-runbook.md).

Emergency local fallback command from the project root:

```bash
npm run deploy:cloudflare
```

Cloudflare Pages preview command from the project root:

```bash
npm run deploy:cloudflare:preview
```

Cloudflare public-site Worker from the project root:

```bash
npm run deploy:cloudflare:edge
npm run cloudflare:site:routes
```

Netlify command from the project root:

```bash
npm run deploy:netlify
```

Both commands may prompt for provider login the first time they run.

## Custom Domain Setup

Keep `stgeorgesstrategy.com` as the primary St Georges Strategy front door. The weekly brief, signals hub, archive, and about/method page now sit at root-level routes.

Suggested navigation model:

- `stgeorgesstrategy.com/`: editorial home page.
- `stgeorgesstrategy.com/brief/`: live weekly brief.
- `stgeorgesstrategy.com/signals/`: signals hub.
- `stgeorgesstrategy.com/signals/ai/`: AI topic page.
- `stgeorgesstrategy.com/regulatory-horizon/`: horizon stream.
- `stgeorgesstrategy.com/archive/`: archive index.
- `stgeorgesstrategy.com/about/`: evergreen method and author page.
- Legacy `/intelligence/`, `/ai-signals/`, and `/thevirtualofficer/` URLs redirect permanently into the new structure.

Recommended pattern:

- Leave `stgeorgesstrategy.com` pointed at the current zone; apex workers proxy the generated Cloudflare Pages build for the migrated routes.
- `intelligence.stgeorgesstrategy.com`: keep only as a legacy redirect surface unless you intentionally keep it public.
- Optional `www.stgeorgesstrategy.com`: create a redirect to `stgeorgesstrategy.com` or point it to the existing landing page.
- Enable HTTPS/TLS in the hosting provider after DNS validates.

The dashboard includes `dashboard/CNAME` with `intelligence.stgeorgesstrategy.com` for GitHub Pages-compatible deployments. Netlify and Cloudflare Pages generally configure the domain in their dashboard instead, but keeping the file is harmless for static hosting.

Current DNS observation on 28 Jun 2026:

- `stgeorgesstrategy.com` resolves through Cloudflare and returns the existing landing page.
- `intelligence.stgeorgesstrategy.com` resolves through Cloudflare and returns the dashboard over HTTPS.
- `www.stgeorgesstrategy.com` does not currently resolve.

The dashboard is now attached to a separate Cloudflare Pages project and exposed through the custom subdomain.

## Deployment Status

Cloudflare Pages project created:

```text
st-georges-strategy-intelligence
```

Verified live custom URL:

```text
https://intelligence.stgeorgesstrategy.com/
```

Verified Pages fallback:

```text
https://st-georges-strategy-intelligence.pages.dev/
```

Verified clean route:

```text
https://stgeorgesstrategy.com/intelligence/
```

Verified endpoints:

- `https://stgeorgesstrategy.com/` returns the St Georges Strategy landing page through a root-only Cloudflare Worker route.
- `https://stgeorgesstrategy.com/thevirtualofficer/` returns the evergreen Virtual Officer capability page through a Cloudflare Worker route.
- `https://stgeorgesstrategy.com/thevirtualofficer` redirects to `https://stgeorgesstrategy.com/thevirtualofficer/`.
- `/` returns the dashboard HTML.
- `/assets/financial-services-intelligence-hero.png` returns the hero image.
- `/data/latest.json` returns valid JSON.
- `https://stgeorgesstrategy.com/intelligence/` returns the dashboard through a Cloudflare Worker route.
- `https://stgeorgesstrategy.com/intelligence` redirects to `https://stgeorgesstrategy.com/intelligence/`.
- `https://stgeorgesstrategy.com/intelligence/styles.css`, `/app.js`, and `/assets/financial-services-intelligence-hero.png` return successfully through the route.
- `https://intelligence.stgeorgesstrategy.com/` returns the dashboard through a Cloudflare Worker route.

Current custom-domain status:

- `intelligence.stgeorgesstrategy.com` has been attached to the Cloudflare Pages project.
- DNS resolves through Cloudflare.
- HTTPS returns HTTP 200 with the dashboard.
- Cloudflare Pages custom-domain verification data reports `active`.
- The public routes are served by one assets-backed Worker from the same `site-dist/` release bundle; the Pages deployment remains the release-preview origin.
- Deploy public content through `Site release (Cloudflare)`, which publishes the bundle, deploys the assets Worker, and updates the controlled route set.
- After deploying public content, run `npm run verify:public-links`. Do not share the pages if the check reports a missing or errored source URL, raw `{{ ... }}` template bindings, or an `x-dc` template shell.

DNS record:

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `intelligence` | `st-georges-strategy-intelligence.pages.dev` | Proxied |

Monitoring:

- The temporary readiness heartbeat was retired after the subdomain began serving the dashboard.

## Cloudflare Worker Routes

Worker routes provide the dashboard at both public intelligence URLs:

- `https://stgeorgesstrategy.com/intelligence/`
- `https://intelligence.stgeorgesstrategy.com/`

A separate Worker route provides the AI signal brief at:

- `https://stgeorgesstrategy.com/ai-signals/`

A separate root-only Worker route provides the landing page:

- `https://stgeorgesstrategy.com/`

A separate capability-page Worker route provides the Virtual Officer method page at:

- `https://stgeorgesstrategy.com/thevirtualofficer/`

Public-site Worker script:

```text
workers/site.mjs
workers/site-routes.mjs
```

Redeploy the public edge:

```bash
npm run deploy:cloudflare:edge
npm run cloudflare:site:routes
```

The Worker serves the generated static assets directly, preserves `GET` and `HEAD` access, applies the public security and cache headers, and owns canonical and legacy redirects.

## GitHub-Backed Publishing

GitHub is recommended for the durable setup. The direct Cloudflare Pages upload proves the site bundle works, but a GitHub-connected Pages project gives version history and automatic redeploys whenever the public site changes.

Recommended repository model:

- Keep the existing `stgeorgesstrategy.com` landing page repo unchanged.
- Create or use a separate repo for the dashboard, for example `st-georges-strategy-intelligence`.
- Publish only non-secret static files: `site/`, `scripts/`, `workers/`, `netlify.toml`, `package.json`, and relevant docs.
- Do not commit Telegram credentials, local `.env` files, automation memory files, or private source data.

Recommended Cloudflare Pages settings for a GitHub-connected repo:

- Project name: `st-georges-strategy-intelligence`
- Production branch: `main`
- Build command: none
- Build output directory: `site-dist`
- Custom domain: `intelligence.stgeorgesstrategy.com`

Codex GitHub access note:

- The GitHub connector did not find an installed repository matching St Georges Strategy or Virtual Officer on 27 Jun 2026.
- To let Codex push the dashboard, install or authorize the GitHub connector for the target repo, or provide the repo URL/name after it exists.

## Live Update Model

For a live public dashboard, the scheduled automations should publish sanitized output to `dashboard/data/latest.json` or the hosting provider's equivalent content endpoint. Do not publish Telegram tokens, chat IDs, local env paths, or private workspace files.

Suggested public update contract:

1. Automation gathers source-backed signals.
2. Automation writes a sanitized public JSON payload.
3. Hosting pipeline deploys only `dashboard/`.
4. Viewers receive read-only access to the latest published page.

## Current Local Preview

From the project root:

```bash
python3 -m http.server 4187 --directory dashboard
```

Then open:

```text
http://127.0.0.1:4187/
```

Temporary remote preview created during setup:

```text
https://common-chairs-read.loca.lt
```

That URL is useful for quick review only. It depends on the local server and tunnel process staying open, and should not be used as the permanent network link.
