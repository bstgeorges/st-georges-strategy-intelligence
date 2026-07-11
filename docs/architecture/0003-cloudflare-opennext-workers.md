# ADR 0003 — Deploy Next.js through Cloudflare Workers and OpenNext

Status: proposed; becomes accepted only after a local OpenNext build/preview and authorised preview smoke test pass  
Date: 11 July 2026

## Context

PR #19 removed the prior Cloudflare Pages bundle and a set of route-specific Workers without adding a deployment adapter for the replacement Next.js application. The old workflow generated site-dist, deployed it to Pages, deployed several standalone Workers, and let automation commit dated archive output. The current branch instead builds a Next.js 16.2.10 server artifact.

Restoring the old Pages/worker split would reintroduce two publication architectures and bypass the typed editorial/route contracts.

Current first-party platform guidance:

- [Cloudflare Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) directs full-stack Next.js applications to Cloudflare Workers through the OpenNext adapter.
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare) states that all Next.js 16 minor/patch versions and App Router, route handlers, dynamic routes, and static generation are supported.
- [OpenNext setup](https://opennext.js.org/cloudflare/get-started) requires nodejs_compat, a compatible date, the generated worker entrypoint, and generated static assets.
- [OpenNext CLI](https://opennext.js.org/cloudflare/cli) recommends its build/preview/deploy commands instead of undocumented direct Wrangler flows.

## Proposal

Use one Cloudflare Worker produced by the current stable @opennextjs/cloudflare adapter. Keep Next pages on the Node.js runtime and preserve static generation where practical.

The production contract should contain:

- @opennextjs/cloudflare and Wrangler as development/build dependencies, pinned through the lockfile;
- open-next.config.ts with the smallest default configuration;
- wrangler.jsonc pointing to the generated worker/assets, nodejs_compat, and a current compatibility date;
- local scripts for Cloudflare build and preview;
- deployment through the OpenNext CLI only after build/preview pass;
- generated .open-next output ignored;
- no R2/DO/queue/cache service until a measured need exists;
- no Cloudflare Images binding until image optimisation cost/benefit is approved;
- no automatic production deployment from an untrusted pull request;
- preview first, production promotion only with explicit authority.

## CI shape

Pull requests run install, formatting, lint, typecheck, content/parity validation, unit tests, Next production build, OpenNext build, and Playwright against local preview where the CI environment supports workerd.

An authorised deployment workflow:

1. checks out the approved branch;
2. uses the documented Node version and npm ci;
3. runs the full verification gate;
4. builds the OpenNext Worker;
5. uploads/deploys through the adapter using scoped Cloudflare secrets;
6. returns a preview URL;
7. smoke-tests canonical routes, feeds, assets, console/network, and headers;
8. promotes production only through a separately authorised action.

The workflow must not commit editorial archives during deployment. Weekly publishing creates/validates content in a reviewable branch or approved content workflow before deployment.

## Rejected alternatives

- Static export to Pages: rejected because explicit App Router metadata/route handlers and future server capabilities should not be constrained without evidence.
- Restore the old site-dist plus route Workers: rejected because it creates two sources of route truth and bypasses Next/typed content.
- Vercel-only deployment: rejected because the repository and prior operational model are Cloudflare-targeted.
- Multi-worker OpenNext: rejected as premature complexity; the official adapter describes it as advanced and incompatible with the normal deployment path.

## Acceptance gate

This ADR becomes accepted when:

- the exact adapter and Wrangler versions are installed and recorded;
- Next build and OpenNext build pass from a clean install;
- local workerd preview serves every canonical route and support feed;
- worker compressed size stays within the target Cloudflare account limit;
- no Node/workerd incompatibility, console error, or failed same-origin request remains;
- deployment secrets and account/project names are documented without values;
- rollback is documented;
- an authorised preview, if credentials exist, passes smoke tests.

Until then, deployment is honestly classified as pending rather than production-ready.
