# Weekly Refresh Workflow

Use this workflow for the Wednesday refresh of the live Intelligence and AI Signals pages.

## Wednesday Operating Cadence

Target day: Wednesday

Recommended editorial window:

- 08:30-09:15: collect public sources and fill the refresh packet.
- 09:15-10:15: draft the Intelligence and AI Signals updates.
- 10:15-10:45: archive current live pages, apply the refresh, and run QA.
- 10:45-11:00: merge the approved refresh to `main` and verify the routed public URLs after the automatic Cloudflare publish completes.

The live pages should not auto-publish without a human editorial pass. The weekly automation should prepare the packet and remind the editor; publication should happen by merging approved changes to `main`, not by manual dashboard upload.

## Refresh Packet

Start from `docs/weekly-refresh-packet-template.md`.

Minimum source standard:

- Prefer primary official sources for regulators, central banks, legislation, consultations, deadlines, enforcement, prudential policy, and legal obligations.
- For each research task, use `web_fetch` on regulator, central-bank, standard-setter, government, or official tracker pages first. Use general search only after the primary-source sweep leaves a specific gap.
- Compute dates at runtime from the refresh date and current date. Do not hard-code the calendar year inside prompts, source queries, or draft copy except when citing a source's published date.
- Cite the primary document, notice, consultation, enforcement release, or official tracker. Do not cite aggregators as the lead support for regulatory, horizon, enforcement, prudential, legal, or official-deadline claims.
- Read the archive copy of the previous edition before drafting and drop any item already covered unless its status, date, rule text, enforcement posture, or implementation consequence changed.
- Flag any statistic, survey result, consultation count, enforcement total, incident count, or market figure whose source is older than 90 days from the publication date.
- Use press or trade sources only for market structure, company strategy, funding, product launches, or where no primary source is available.
- Keep every public claim source-linked.
- Remove or rewrite any item whose source is weak, stale, unavailable, or too speculative.
- Keep private employer names, chat identifiers, credentials, local paths, and client-sensitive content out of the public pages.

Primary-source anchors for Regulatory Horizon and Board Newsletter:

| Lane | Start with |
| --- | --- |
| UK conduct and regulatory pipeline | FCA news, Regulatory Initiatives Grid, and FCA enforcement notices |
| UK prudential and financial stability | Bank of England news filtered for Prudential Regulation Authority and prudential-regulation items |
| EU banking and markets | ECB Banking Supervision press, SSM newsletter, supervisory priorities, EBA publications, EBA consultations, ESMA press/news, and ESMA consultations |
| EU insurance and pensions | EIOPA news and publications |
| Global standards | BIS press, Basel Committee publications, IOSCO news, and FSB press |
| Financial crime and sanctions | FATF publications, OFSI updates, FinCEN enforcement actions, OFAC recent actions, AMF sanctions, and ECB sanctions |
| AI regulation | European Commission EU AI Act pages, Artificial Intelligence Act tracker, and NIST AI RMF updates |
| Interpretation and corroboration | FT regulation and banking, Reuters regulatory news, ORX, Regulation Tomorrow, Sidley, and A&O Shearman |

Primary-source anchors for Control Failure Digest:

- Enforcement cards should start with FCA enforcement notices, FinCEN enforcement actions, OFAC recent actions, AMF sanctions releases, ECB sanctions, and other regulator notices before using press.
- Incident cards should start with regulator, authority, company, exchange, infrastructure, vendor, or official incident statements. Use FT, Reuters, Bloomberg, ORX, or specialist press only for corroboration or implementation detail.
- Require two independent sources before an incident earns a public card. At least one source should be primary or directly accountable for the incident whenever available.
- DORA major-incident coverage should start with ESA joint publications and the relevant EBA, ESMA, or EIOPA release before using commentary.

AI Signals pipeline:

- The scheduled AI Signals task writes `dashboard/data/ai-signals.json`; the page at `dashboard/ai-signals/index.html` renders that JSON through `dashboard/ai-signals/app.js`.
- Do not rebuild AI Signals by manually editing 15 static cards in the HTML. Update the JSON, run validation, then let the renderer populate the page.
- Apply the same archive dedupe rule: read the previous dated AI Signals archive and drop anything already covered unless model capability, product availability, governance status, benchmark position, or industry consequence changed.
- Anchor model-release research on Anthropic, OpenAI, Google DeepMind, Meta AI, Mistral, and xAI first; use TechCrunch, The Verge, and Ars Technica for industry news; use Epoch AI, LMArena/Arena, and Stanford HAI AI Index for capability and benchmark data; use the EU AI Act tracker and NIST AI RMF updates for governance overlap with the Virtual Officer brief; use Import AI and The Batch as curated weekly catch-all sweeps that must be traced back to primary documents before publication.

## Build Sequence

1. Fill the weekly refresh packet.
2. If new sources are being considered, add them to `dashboard/data/source-candidates.json` and run the intake gate:

```bash
npm run sources:intake
```

Approved candidates can be promoted with:

```bash
npm run sources:promote
```

3. Check the source registry:

```bash
npm run sources:audit
```

4. Archive the current live pages:

```bash
npm run archive:current -- --date YYYY-MM-DD
```

Use the publication date for `YYYY-MM-DD`.

5. Update the live pages:

- `dashboard/index.html`
- `dashboard/data/ai-signals.json`

Validate AI Signals after the scheduled task writes the JSON:

```bash
npm run ai-signals:validate -- --date YYYY-MM-DD
```

6. Run local preflight:

```bash
npm run refresh:preflight -- --date YYYY-MM-DD
```

7. Run responsive QA against local files or public URLs:

```bash
npm run verify:responsive -- file:///Users/benstgai/Documents/Project%20Virtual%20Officer/dashboard/index.html file:///Users/benstgai/Documents/Project%20Virtual%20Officer/dashboard/ai-signals/index.html
```

8. Commit the approved refresh and push or merge it to `main`.

9. The GitHub Actions workflow publishes `site-dist` to Cloudflare Pages automatically.

10. Run public link QA after deployment:

```bash
npm run verify:public-links -- https://stgeorgesstrategy.com/intelligence/ https://stgeorgesstrategy.com/ai-signals/
```

11. Confirm the routed public pages contain the new edition date and no horizontal overflow:

```bash
npm run verify:responsive -- https://stgeorgesstrategy.com/intelligence/ https://stgeorgesstrategy.com/ai-signals/
```

## Editorial Checklist

Before publishing, confirm:

- Intelligence edition line uses `Live edition · D Mon YYYY · Vol. N`.
- AI Signals edition line uses `Live edition / Updated D Mon YYYY`.
- Archive entries exist for the previous live editions.
- The top nav order remains Home, Virtual Officer, Intelligence, AI Signals, Archive.
- AI Signals has 15 cards: 5 model releases, 5 feature launches, 5 industry news.
- Intelligence has a coherent lead signal and executive pulse.
- Paywalled sources are acceptable only where the URL is known to exist.
- No article relies on unsupported precise claims.
- No old live-edition dates remain in the live pages unless they are intentional source dates.
- Mobile, small-mobile, tablet, and desktop responsive QA pass.
