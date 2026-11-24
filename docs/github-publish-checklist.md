# GitHub Publish Checklist

Use this when connecting the St Georges Strategy site bundle to GitHub and Cloudflare so publication no longer depends on manual dashboard uploads.

Pair this with the deploy runbook:

- [Deploy Surface Runbook](/Users/benstgai/Documents/StGeorgesStrategy/docs/deploy-surface-runbook.md)

## Recommended Repo Model

Use the current repository as the source of truth.

- Curated source pages live in `site/`
- The generated public bundle is built into `site-dist/`
- Cloudflare Pages should receive the generated bundle from GitHub Actions
- The assets-backed Cloudflare Worker should be deployed from GitHub Actions with every production public-site release

## Files Safe To Publish

- `site/`
- `docs/`
- `scripts/`
- `workers/`
- `.github/workflows/`
- `README.md`
- `package.json`
- `package-lock.json`
- `.gitignore`

## Files And Data Not To Publish

- Local `.env` files
- Codex automation memory files
- Private source extracts
- Local dependency or deployment caches

## Cloudflare Pages Settings

- Project name: `st-georges-strategy-intelligence`
- Deployment model: direct deploy from GitHub Actions
- Build command in Cloudflare dashboard: none
- Build output directory in Cloudflare dashboard: not used by direct deploy
- Public routes: served at `stgeorgesstrategy.com` by the assets-backed Worker; Pages remains the release-preview origin

## GitHub Actions Workflows

- `.github/workflows/cloudflare-pages-publish.yml`
  - builds `site-dist`
  - verifies generated links
  - deploys to Cloudflare Pages production
  - should be treated as the default production deployment path

- `.github/workflows/cloudflare-workers-deploy.yml`
  - is manual-only emergency recovery for the public-site Worker and its controlled routes

## GitHub Actions Secrets

Add these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Recommended token scopes:

- `Account > Cloudflare Pages > Edit`
- `Account > Workers Scripts > Edit`
- `Account > Workers Scripts > Read`
- `Zone > Workers Routes > Edit`
- `Zone > Zone > Read`
- `Zone > Cache Purge > Purge`

## DNS And Routing Notes

- Pages project URL: `https://st-georges-strategy-intelligence.pages.dev/`
- Apex site routes are served by Worker routes on `stgeorgesstrategy.com`
- The Worker serves the generated `site-dist/` asset bundle directly; it does not proxy the Pages URL

## Editorial Safety Guardrails

The build now enforces publisher-locked sections for:

- home editorial block
- weekly brief editorial block
- signals hub editorial block

If a future script change tries to overwrite those sections from raw feed content, the build fails.

## Codex Cloud Note

Do not run production Wrangler commands from the mounted Codex workspace. The supported production path is the canonical GitHub Actions workflow:

1. Push or merge the intended release to `main`, or
2. Manually dispatch `Site release (Cloudflare)` with the production target.

A green workflow run that verifies the exact SHA at both the Pages origin and `stgeorgesstrategy.com` is the publication proof.