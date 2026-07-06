# Staging QA / 2026-07-05

Preview URL:

- `https://migration-preview.st-georges-strategy-intelligence.pages.dev`

Deployment:

- Command: `npm run deploy:cloudflare:migration-preview`
- Cloudflare Pages alias: `https://migration-preview.st-georges-strategy-intelligence.pages.dev`
- Build source: `site-dist/`

## Passed

- `npm run staging:migration:verify -- --base https://migration-preview.st-georges-strategy-intelligence.pages.dev --check-redirects`
- Final routes checked: 14
- Redirects checked: 9
- Metadata checks passed for canonical URL, `og:url`, JSON-LD `@id`, and disclaimer presence.
- Security headers are present on the preview response, including CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, Referrer Policy, and Permissions Policy.
- Responsive QA passed on all 14 final routes at 390px, 320px, 768px, and 1440px using `npm run verify:responsive`.

## Open

- Analytics continuity is not yet passed. The preview currently has no Cloudflare Web Analytics beacon.
- `npm run staging:migration:verify -- --base https://migration-preview.st-georges-strategy-intelligence.pages.dev --require-analytics --check-redirects` correctly fails on all 14 routes for missing analytics.

## Analytics Fix

The migration publisher now supports token-based analytics injection:

```bash
CF_WEB_ANALYTICS_TOKEN=<real-token> npm run deploy:cloudflare:migration-preview
```

After redeploying with the real token, rerun:

```bash
npm run staging:migration:verify -- --base https://migration-preview.st-georges-strategy-intelligence.pages.dev --require-analytics --check-redirects
```
