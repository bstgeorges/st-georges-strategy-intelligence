# Release automation

## Outcome

`Site release (Cloudflare)` is the single release transaction for the site. It replaces the previous split where Pages and Workers could report different outcomes and neither proved that production contained the commit.

Production releases now:

1. validate canonical Signals data and audit third-party link health without letting a transient external-site outage block an unrelated release;
2. audit legacy AI Signals data without allowing that legacy feed to block unrelated site changes;
3. build and verify `site-dist/` with the Git SHA embedded in every HTML page;
4. deploy the Pages production branch with the same commit SHA recorded in Cloudflare;
5. deploy one assets-backed public-site Worker from the same checkout, then assign every existing public route to it;
6. purge the public hostnames from Cloudflare cache when the API token permits it;
7. retry until every canonical route exposes the expected release marker and critical CSS, JavaScript, Signals JSON, and sitemap hashes match;
8. verify the legacy redirects independently, without crawling third-party editorial links.

The workflow is green only after step 7 and step 8 pass. This removes the need to refresh pages or compare visible copy manually.

## Production and dev

- Push/merge to `main`: production release to `stgeorgesstrategy.com` and the Pages production origin.
- Push to `dev`: preview release to `https://dev.st-georges-strategy-intelligence.pages.dev`.
- Manual dispatch: choose `production` or `dev`.

The Pages project's configured production branch remains `production`; `main` is the GitHub source branch. The workflow makes that translation explicitly.

## GitHub secrets

Required:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Recommended:

- `CLOUDFLARE_ZONE_ID` (the cache script can discover it when omitted)

The Cloudflare token needs Pages Write, Workers Scripts Edit, Workers Routes Edit, Zone Read, and Cache Purge for the full transaction. The assets Worker is deployed under the existing `st-georges-strategy-not-found-route` script name with `--keep-vars`, preserving its configured Web Analytics token. Cache purge is deliberately best-effort because exact release verification follows every deployment; a stale response therefore cannot produce a green release.

## Local checks

```bash
SITE_RELEASE_ID=local-test npm run site:build
npm run site:verify
```

Live verification can be run from a normal networked terminal after a deploy:

```bash
npm run verify:deployed-release
npm run verify:legacy-routes
```

## Failure handling

- Validation failure before deploy: nothing was released.
- Pages deployment, Worker deployment, or route reassignment failure: the workflow fails and identifies the failed step. Existing route bindings are changed only after the new Worker version is available.
- Cache purge failure: exact-release verification still determines whether the release is usable.
- Exact-release failure: the workflow retries for up to one minute, then fails with each stale route or mismatched asset hash.
- Archive snapshot push failure: the release remains valid and the workflow records the snapshot step separately; it does not invalidate already-verified production bytes.

The old `Cloudflare Workers emergency deploy` workflow is manual-only. It exists for route recovery, not routine publishing.

The routine site release does not run from candidate generation. The release workflow only publishes a `main` or `dev` change after `npm run release:order` confirms that the approved Signals edition, reviewed Reg Horizon edition, current judgement, and downstream pages are aligned. The approved edition remains valid for an eight-day release window: this allows an urgent reliability or presentation fix to deploy during the week without pretending it is a new weekly edition. A candidate refresh or Reg Horizon scan PR is preparation, not publication.

The emergency local `npm run deploy:cloudflare` path has a checkout guard. It refuses to deploy unless the local branch is a clean `main` exactly aligned with `origin/main`, preventing a stale feature branch or leftover build directory from being uploaded.
