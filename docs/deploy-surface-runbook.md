# Deploy Surface Runbook

This repo now has a canonical deploy path. The permanent fix for the Codex mounted-workspace `wrangler` failure is not to keep retrying from the sandbox; it is to make deploys happen from environments that use a normal filesystem.

## Canonical Deploy Surfaces

Use one of these:

1. GitHub Actions on push to `main`
2. GitHub Actions via manual `workflow_dispatch`
3. A normal local terminal on Ben's Mac, from the project root

Priority order:

1. GitHub Actions on push to `main`
2. GitHub Actions manual dispatch
3. Local terminal only if the first two are unavailable or time-critical

Do not treat the mounted Codex sandbox as a supported deploy surface for `wrangler`, `npm run deploy:cloudflare`, or other Node-based deploy commands. In this environment, Node `fs.readFileSync` can fail on the synced workspace mount before authentication or deploy logic even starts.

## Default Operating Model

The intended default is:

1. Edit and validate in the repo
2. Push to `main`
3. Let GitHub Actions deploy Pages and Workers

That gives us:

- a normal Linux runner filesystem
- durable logs
- one consistent deployment surface
- no dependence on a specific local terminal session

## Workflows

### Cloudflare Pages publish

File:

- [.github/workflows/cloudflare-pages-publish.yml](/Users/benstgai/Documents/Project%20Virtual%20Officer/.github/workflows/cloudflare-pages-publish.yml)

Trigger:

- push to `main` when public site, build, validation, or publish files change
- manual dispatch from GitHub Actions

What it does:

1. `npm ci`
2. `npm run site:build`
3. `npm run verify:generated-links`
4. `wrangler pages deploy site-dist --project-name st-georges-strategy-intelligence --branch production`

### Cloudflare Workers deploy

File:

- [.github/workflows/cloudflare-workers-deploy.yml](/Users/benstgai/Documents/Project%20Virtual%20Officer/.github/workflows/cloudflare-workers-deploy.yml)

Trigger:

- push to `main` when `workers/**` changes
- manual dispatch from GitHub Actions

What it does:

1. `npm ci`
2. redeploys the route Workers in sequence

## Secrets Required In GitHub

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If Actions fails, check secrets first before debugging route code.

## Local Fallback

If a same-day emergency deploy is needed outside GitHub Actions, run from Ben's Mac terminal:

```bash
npm run site:build
npm run site:verify
npm run deploy:cloudflare
```

Then, if Worker code changed:

```bash
npm run deploy:cloudflare:landing-route
npm run deploy:cloudflare:not-found-route
npm run deploy:cloudflare:seo-route
npm run deploy:cloudflare:www-route
npm run deploy:cloudflare:route
npm run deploy:cloudflare:subdomain-route
npm run deploy:cloudflare:ai-signals-route
npm run deploy:cloudflare:thevirtualofficer-route
```

## What This Fixes Permanently

- Codex can still edit and validate the site
- deploys no longer depend on `wrangler` working inside the mounted Codex sandbox
- the supported deploy path is documented and repeatable
- build/validation changes now trigger the Pages workflow automatically
