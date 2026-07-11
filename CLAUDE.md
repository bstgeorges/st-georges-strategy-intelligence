# Site release rules for Claude

The repository is the source of truth. Never tell the user that a site change is live merely because a commit or push succeeded.

For every public-site change:

1. Change the source under `site/`, `dashboard/`, `scripts/`, or `workers/`; do not use `site-dist/` as source.
2. Run `npm run site:build`, `npm run site:verify`, and relevant data validation before publishing.
3. Use the `dev` branch or manually dispatch `Site release (Cloudflare)` with target `dev` for a remote preview.
4. Merge or push to `main` for production. One workflow deploys Pages and route Workers, attempts cache invalidation, and verifies the exact Git SHA on the Pages origin and public domain.
5. A green `Site release (Cloudflare)` run is the only publication proof. If it fails, inspect the first failing step. Do not ask the user to refresh browsers or manually compare pages.

Do not deploy from Claude's mounted/sandboxed workspace. GitHub Actions is the canonical deployment surface. See `docs/release-automation.md`.
