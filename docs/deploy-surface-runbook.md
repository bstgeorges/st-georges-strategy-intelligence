# Deploy Surface Runbook

This repo has one canonical deploy transaction: `Site release (Cloudflare)`. It builds, deploys Pages and Workers, handles cache invalidation, and verifies that the exact Git release is present. See [Release automation](release-automation.md).

## Canonical Deploy Surfaces

Use one of these:

1. GitHub Actions on push to `main`
2. GitHub Actions via manual `workflow_dispatch` (`production` or `dev`)
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
3. Let `Site release (Cloudflare)` deploy Pages and Workers and verify the exact release

That gives us:

- a normal Linux runner filesystem
- durable logs
- one consistent deployment surface
- no dependence on a specific local terminal session

## Workflows

### Cloudflare Pages publish

File:

- [.github/workflows/cloudflare-pages-publish.yml](/Users/benstgai/Documents/StGeorgesStrategy/.github/workflows/cloudflare-pages-publish.yml)

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

- [.github/workflows/cloudflare-workers-deploy.yml](/Users/benstgai/Documents/StGeorgesStrategy/.github/workflows/cloudflare-workers-deploy.yml)

Trigger:

- push to `main` when `workers/**` changes
- manual dispatch from GitHub Actions

What it does:

1. `npm ci`
2. deploys the single assets-backed public-site Worker
3. reassigns the existing apex, `www`, and legacy-host routes to that Worker after it is available

## Secrets Required In GitHub

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If Actions fails, check secrets first before debugging route code.

## Local Fallback

If a same-day emergency deploy is needed outside GitHub Actions, run from Ben's Mac terminal:

```bash
npm run site:build
npm run site:verify
npm run deploy:cloudflare:edge
npm run cloudflare:site:routes
```

## What This Fixes Permanently

- Codex can still edit and validate the site
- deploys no longer depend on `wrangler` working inside the mounted Codex sandbox
- the supported deploy path is documented and repeatable
- build/validation changes now trigger the Pages workflow automatically
