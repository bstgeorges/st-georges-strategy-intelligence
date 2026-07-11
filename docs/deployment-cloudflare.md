# Cloudflare Worker deployment and rollback

## Current state

The application builds for Cloudflare Workers with `@opennextjs/cloudflare@1.20.1` and `wrangler@4.110.0` on Node 22. `wrangler.jsonc` defines only `st-georges-strategy-business-experience-preview`, Workers.dev preview URLs, static assets and a self-reference binding. It attaches no custom domain or zone route.

The publication is fully prerendered. `open-next.config.ts` therefore uses OpenNext's read-only static-assets incremental cache with cache interception enabled. SSG hits can return directly from that cache, while misses continue to NextServer. The first empty-cache prototype correctly exposed a 404 defect for prerendered catch-all routes; the static-assets cache fixed it and all 51 routes now pass local Workerd checks.

The historical `/regulatory-horizon/archive/2026-07-02.html` compatibility URL still redirects to readable archived content, but the archived document is inert: no scripts, event handlers or remote font execution remain. A dedicated `_headers` rule applies `script-src 'none'`, `X-Robots-Tag: noindex, nofollow, noarchive` and a one-day cache policy to both the `.html` alias and its no-extension redirect target.

## Local/CI proof

```bash
npm ci
npx playwright install chromium
npm run verify
npm run test:e2e
npm run cf:build
npm run cf:dry-run
npm run verify:workerd
```

The verified compressed Worker is approximately 1.29 MiB, below Cloudflare's 3 MiB free-tier limit. Recheck on every release.

## Required secrets

- `CLOUDFLARE_API_TOKEN` — preview scope should permit Workers Scripts edit only.
- `CLOUDFLARE_ACCOUNT_ID` — account identifier; never commit the value from a local environment.

The manual `cloudflare-preview` GitHub environment should require approval. Fork pull requests run build/dry-run only and never receive secrets. The workflow never uses `pull_request_target`.

## Preview upload

After explicit authorization:

```bash
npm run cf:upload
```

Wrangler exposes a machine-readable JSON-lines event through `WRANGLER_OUTPUT_FILE_PATH`. The manual workflow reads the `version-upload` event, records its version ID and `preview_url` in the job summary/output, and smoke-tests that exact URL. It fails if Wrangler does not return a preview URL; it does not parse human-readable CLI output or promote traffic.

For an equivalent authorised local upload, set `WRANGLER_OUTPUT_FILE_PATH` before `npm run cf:upload`, read the last `version-upload` event, and smoke-test the returned URL with:

```bash
SGS_BASE_URL=https://PREVIEW_URL npm run verify:home
BASE_URL=https://PREVIEW_URL npm run verify:archetypes
BASE_URL=https://PREVIEW_URL npm run verify:release
```

An upload is not a production promotion.

## Production migration boundary

PR #19 removed repository deployment code but did not remove remote resources. The legacy Pages origin and route-specific Workers still respond for the apex, `www`, `intelligence`, AI Signals, The Virtual Officer, SEO files and fallback behavior. Inventory those resources in Cloudflare before any domain action.

Production requires a separately approved change that:

1. uploads a production-named Worker version without traffic;
2. smoke-tests that exact version;
3. preserves redirects for `/intelligence*`, `/ai-signals*`, `/thevirtualofficer*`, the `intelligence` subdomain and `www`;
4. attaches a custom domain/route in a controlled cutover;
5. verifies headers, feeds, sitemap, unknown routes and logs;
6. removes or disables old routes only after the new origin is proven;
7. retains the previous Worker version for immediate rollback.

Do not copy the preview Worker name into production or let an automated pull-request job edit zone routes.

## Rollback

Promote the previously verified Worker version, then smoke-test the canonical routes and support feeds. Content/storage state is independent of Worker version; if persistent R2/D1/DO state is introduced later, document its rollback separately before adoption.

## Platform sources

- [Cloudflare Next.js on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [OpenNext Cloudflare setup](https://opennext.js.org/cloudflare/get-started)
- [OpenNext CLI](https://opennext.js.org/cloudflare/cli)
- [OpenNext caching](https://opennext.js.org/cloudflare/caching)
- [Cloudflare versions and deployments](https://developers.cloudflare.com/workers/versions-and-deployments/)
- [Cloudflare preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)
