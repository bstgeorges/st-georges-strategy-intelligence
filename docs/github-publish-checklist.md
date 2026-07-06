# GitHub Publish Checklist

Use this when connecting the St Georges Strategy site bundle to GitHub and Cloudflare so publication no longer depends on manual dashboard uploads.

Pair this with the deploy runbook:

- [Deploy Surface Runbook](/Users/benstgai/Documents/Project%20Virtual%20Officer/docs/deploy-surface-runbook.md)

## Recommended Repo Model

Use the current repository as the source of truth.

- Curated source pages live in `site/`
- The generated public bundle is built into `site-dist/`
- Cloudflare Pages should receive the generated bundle from GitHub Actions
- Cloudflare Workers should be deployed from GitHub Actions when route code changes

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

- Telegram bot tokens or chat IDs
- Local `.env` files
- Codex automation memory files
- Private source extracts
- Temporary Telegram message output
- Local dependency or deployment caches

## Cloudflare Pages Settings

- Project name: `st-georges-strategy-intelligence`
- Deployment model: direct deploy from GitHub Actions
- Build command in Cloudflare dashboard: none
- Build output directory in Cloudflare dashboard: not used by direct deploy
- Public routes: served at `stgeorgesstrategy.com` through Worker routes that proxy the Pages production deployment

## GitHub Actions Workflows

- `.github/workflows/cloudflare-pages-publish.yml`
  - builds `site-dist`
  - verifies generated links
  - deploys to Cloudflare Pages production
  - should be treated as the default production deployment path

- `.github/workflows/cloudflare-workers-deploy.yml`
  - redeploys Worker routes when files under `workers/` change

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

## DNS And Routing Notes

- Pages project URL: `https://st-georges-strategy-intelligence.pages.dev/`
- Apex site routes are served by Worker routes on `stgeorgesstrategy.com`
- Worker origins should point at `https://st-georges-strategy-intelligence.pages.dev`

## Editorial Safety Guardrails

The build now enforces publisher-locked sections for:

- home editorial block
- weekly brief editorial block
- signals hub editorial block

If a future script change tries to overwrite those sections from raw feed content, the build fails.

## Codex Sandbox Note

Do not rely on `wrangler` from the mounted Codex workspace as a production deploy surface. The supported permanent path is:

1. push to `main`, or
2. manually dispatch the GitHub Actions workflow, or
3. use a normal local terminal on Ben's Mac

This avoids the mounted-workspace `Node fs.readFileSync` failure mode seen inside the sandbox bridge.
