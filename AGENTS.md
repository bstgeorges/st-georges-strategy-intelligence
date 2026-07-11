# Site release rules for Codex

The repository is the source of truth. Never claim that a site change is published merely because it was committed or pushed.

For every public-site change:

1. Edit source files under `site/`, `dashboard/`, `scripts/`, or `workers/`; never hand-edit `site-dist/` as the source.
2. Run `npm run site:build`, `npm run site:verify`, and the relevant data validation locally.
3. Use the `dev` branch or the `Site release (Cloudflare)` workflow's `dev` target when a remote preview is required.
4. Merge or push to `main` for production. The canonical workflow deploys Pages and Workers, attempts cache purge, and verifies the exact Git SHA at both the Pages origin and `stgeorgesstrategy.com`.
5. Treat a green `Site release (Cloudflare)` run as the publication proof. A failed run means the release is not complete; inspect its first failing step rather than manually refreshing URLs.

Do not run production Wrangler commands from the Codex mounted workspace. GitHub Actions is the canonical deployment surface. See `docs/release-automation.md`.
