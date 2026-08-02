# Source Expansion Plan

This plan expands the source base for the Sunday Intelligence and AI Signals refresh, ready for Monday distribution.

## Goal

The refresh should consistently detect the right signals across regulation, prudential policy, financial stability, markets, operational resilience, cyber, financial crime, AI models, AI features, and AI infrastructure.

The source registry lives at `dashboard/data/source-registry.json`.

The phase-two candidate ingestion registry lives at `dashboard/data/signals-feed-registry.json`.

Candidate sources must go through `docs/source-intake-gates.md` before they are added to the registry.

Research tasks should fetch the registry's primary official pages before using search. Search is for named gaps, cross-checks, and discovery of missing official documents, not the starting point for regulator, enforcement, sanctions, prudential, legal, or deadline claims.

## Source Tiers

- `primary`: official regulators, central banks, standard-setters, government bodies, company newsrooms, and research repositories.
- `specialist`: recognised sector publications that add implementation detail or market context.
- `press`: general media used for early market colour or company reporting.

Regulatory, legal, prudential, enforcement, deadline, and official policy claims should normally use `primary` sources. Press and specialist sources can shape editorial context, but they should not be the only support for a firm obligation unless no primary source exists yet.

## Weekly Source Sweep

Use the registry to cover these lanes every Sunday:

| Lane | Minimum coverage | Examples |
| --- | --- | --- |
| UK regulation and prudential | FCA, FCA enforcement notices, Regulatory Initiatives Grid, BoE/PRA, OFSI, NCSC | Conduct, crypto, resilience, sanctions, cyber |
| EU/global regulation | ECB/SSM press, SSM newsletter, supervisory priorities, EBA, ESMA, EIOPA, BIS, FSB, BCBS, IOSCO | Prudential, markets, insurance, pensions, nonbank finance, crypto, payments |
| Financial crime and sanctions | OFSI, FATF, FinCEN, OFAC, AMF sanctions, ECB sanctions | Sanctions, AML, CTF, screening, enforcement, control failures |
| US read-across | SEC, CFTC, FinCEN, OFAC, CISA | Markets, disclosures, derivatives, cyber, financial crime |
| AI model and feature signals | OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral, xAI, Microsoft AI | Model releases, agents, enterprise controls, safety |
| AI capability and industry signals | Epoch AI, LMArena/Arena, Stanford HAI AI Index, TechCrunch AI, The Verge AI, Ars Technica AI | Capability data, annual anchor stats, leaderboards, product launches, startups, market movement |
| AI regulation and infrastructure | EU AI Act, AI Act tracker, NIST AI RMF, NVIDIA, BIS, FT, Reuters | AI obligations, implementation dates, governance controls, chips, data centres, energy, capex, financing |
| Specialist implementation and interpretation | ORX, Regulation Tomorrow, Sidley, A&O Shearman, Risk.net, Finextra, The Register | Op-risk incidents, deadline interpretation, risk practice, payments, cloud, outages, operational details |
| Curated weekly AI sweep | Import AI, The Batch | Catch signals missed by daily search, then trace them back to primary sources |

## Phase Two Candidate Layer

The current automation target is not direct publication. It is a weekly candidate queue for:

- `ai`
- `market-structure`
- `third-party`

Commands:

```bash
npm run signals:candidates:refresh
npm run signals:candidates:validate
```

Reference:

- [Signals Phase Two Pipeline](/Users/benstgai/Documents/Project%20Virtual%20Officer/docs/signals-phase-two-pipeline.md)

## Signal Quality Tests

An item is worth inclusion when at least one of these is true:

- It changes a rule, deadline, supervisory expectation, or enforcement posture.
- It creates a board or senior-manager question.
- It exposes a control failure pattern firms can test internally.
- It affects capital, liquidity, market risk, conduct, financial crime, resilience, cyber, or model risk.
- It changes AI adoption, model capability, agent autonomy, vendor concentration, infrastructure dependency, or safety expectations.
- It is early but strategically important, and the page clearly labels it as a monitoring signal.

## Exclusion Tests

Do not include an item when:

- The source is weak and cannot be corroborated.
- The claim is too precise for the available evidence.
- The story is interesting but has no clear financial-services implication.
- The item is mainly promotional and lacks a control, risk, strategy, or market read-through.
- The source URL fails link QA and no replacement is available.

## Weekly Editorial Pattern

1. Sweep primary sources first.
2. Read the previous archive edition and drop already-covered items unless the status changed.
3. Add specialist and press colour only after the official-source scan.
4. Require two independent sources before a control-failure incident earns a public card.
5. Flag statistics older than 90 days from the publication date.
6. Cluster items into themes before writing the page.
7. Pick one lead signal for Intelligence.
8. Keep AI Signals balanced: 5 model releases, 5 feature launches, 5 industry news.
9. Soften speculative language before publication.
10. Run `npm run sources:intake` if candidate sources are being considered.
11. Promote only approved candidates with `npm run sources:promote`.
12. Run `npm run sources:audit`.
13. Run `npm run refresh:preflight -- --date YYYY-MM-DD`.

## Expansion Backlog

- Add RSS/feed URLs where available.
- Add per-source fetch URLs and fallback search queries for the Sunday packet.
- Add source freshness checks for links cited in the live HTML.
- Add a source diversity check so each refresh does not over-rely on one publication.
- Add a watchlist for newsletters and podcasts only after they can be cited cleanly.
