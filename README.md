# St Georges Strategy — The Virtual Officer

A public executive-intelligence publication for regulated financial-services leaders. The site turns public signals and regulatory movement into a repeatable operating chain:

`Signal → Judgement → Board Question → Evidence Ask → Owner/Deadline → Archive`

The application is built with Next.js 16, React 19 and strict TypeScript. All public reading is unauthenticated. It targets Cloudflare Workers through OpenNext and preserves the original live/frozen captures as immutable editorial evidence.

## Requirements

- Node.js 22 or later (`.node-version` is included)
- npm
- Chromium for browser verification (`npx playwright install chromium`)

## Run locally

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. For a production-like Next runtime:

```bash
npm run build
npm start -- --hostname 127.0.0.1 --port 3001
```

## Architecture

- `src/app/page.tsx` and `src/components/site/home-page.tsx` — bespoke executive-overview Home.
- `src/app/[...slug]/page.tsx` — static route boundary for the remaining editorial archetypes.
- `src/content/editorial/` — the authored Home/public registry, typed route records, provenance, relationships, and validation.
- `src/content/generated/editorial-documents.ts` — deterministic snapshot-parity fixtures; never edit by hand or import into production routes.
- `src/content/reference/` — frozen 42-route capture-time corpus.
- `src/content/live-reference/` — separately preserved 33-route continuation corpus.
- `src/components/site/editorial-document-page.tsx` — explicit dispatcher for seven semantic Server Component archetypes. It never renders captured HTML strings or fixture ASTs.
- `src/components/site/{editorial-motion,archetype-motion}.tsx` — bounded, one-shot Web Animations enhancement.
- `public/styles.css` — preserved reference design layer.
- `src/app/globals.css` — current token, Home, archetype, accessibility, motion and print layer.

The selected registry contains 51 successful public routes: 33 current live selections plus 18 frozen-only historical editions. The live Committee Questions page is selected as 200 while its earlier 404 remains evidence. Conflicting rendered/JSON/RSS/ICS publication channels remain separate until an explicit reconciliation approves convergence.

## Commands

| Command                       | Purpose                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run format`              | Check repository formatting                                                                    |
| `npm run lint`                | Run ESLint                                                                                     |
| `npm run typecheck`           | Run strict TypeScript checks                                                                   |
| `npm run validate:content`    | Validate the frozen reference corpus and machine feeds                                         |
| `npm run validate:editorial`  | Validate typed artifacts, series, relationships and parity atoms                               |
| `npm run generate:documents`  | Regenerate safe semantic documents from reviewed corpora                                       |
| `npm test`                    | Run schema, relationship, parity, sanitizer and Home tests                                     |
| `npm run test:e2e`            | Run desktop/mobile navigation, Axe, reduced-motion, overflow and console checks                |
| `npm run build`               | Create the Next.js production build                                                            |
| `npm run verify`              | Run the complete non-browser quality gate                                                      |
| `npm run verify:home`         | Verify Home against a running server at `SGS_BASE_URL`                                         |
| `npm run verify:archetypes`   | Verify 51 routes and eight archetypes at `BASE_URL`                                            |
| `npm run verify:release`      | Verify internal links, metadata, sitemap, headers, redirects, keyboard and print at `BASE_URL` |
| `npm run verify:public-links` | Add a status report for authoritative external links                                           |
| `npm run profile:motion`      | Profile full/reduced motion under 4× CPU throttling                                            |
| `npm run cf:build`            | Build the OpenNext Worker                                                                      |
| `npm run cf:dry-run`          | Measure/validate the Worker bundle without uploading                                           |
| `npm run cf:preview`          | Run the already-built Worker locally in Workerd                                                |
| `npm run verify:workerd`      | Launch Workerd and run the browser/release/motion matrix                                       |
| `npm run cf:upload`           | Build and upload the isolated preview Worker; requires authorization and scoped secrets        |

## Editorial updates

Do not edit the generated semantic document file or duplicate page components. The reviewed update path is:

1. preserve the new public edition as a new immutable artifact/capture;
2. review provenance, dates, route/series identity and any conflicting publication channels;
3. update authored editorial relationships/current pointers where required;
4. run `npm run generate:documents`;
5. inspect the generated diff and run `npm run verify` plus browser checks;
6. preserve previous editions and advance current aliases explicitly—never by “maximum date” inference.

See [docs/content-update.md](docs/content-update.md) for exact steps and [docs/architecture/0002-typed-editorial-domain-and-provenance.md](docs/architecture/0002-typed-editorial-domain-and-provenance.md) for the provenance model.

## Cloudflare

The checked-in `wrangler.jsonc` names an isolated preview Worker and contains no production routes or custom domains. Local proof:

```bash
npm run cf:build
npm run cf:dry-run
npm run verify:workerd
```

Remote preview upload requires scoped `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets and explicit authorization:

```bash
npm run cf:upload
```

This does not authorize production promotion, DNS changes, route attachment, deletion of the still-live legacy Workers/Pages project, or PR merge. See [docs/deployment-cloudflare.md](docs/deployment-cloudflare.md).

## Evidence and project state

- Research: [docs/research/business-experience-and-motion.md](docs/research/business-experience-and-motion.md)
- Route truth: [docs/route-inventory.md](docs/route-inventory.md)
- Motion contract: [docs/motion-language.md](docs/motion-language.md)
- Current verification/deployment state: [docs/project_state/current.md](docs/project_state/current.md)

The public disclaimer is preserved throughout: illustrative content based on sector-wide public sources; not investment, legal, compliance, or regulatory advice.
