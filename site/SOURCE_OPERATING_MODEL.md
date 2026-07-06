# Source Operating Model

Status date: 2026-07-04

This document connects the existing source registry to the new site architecture: Weekly Brief, Signals, Regulatory Horizon, Archive, and About.

The current registry lives at `dashboard/data/source-registry.json`.

Current registry snapshot:

- 54 total sources
- 35 primary sources
- 15 specialist sources
- 4 press sources
- Candidate queue currently empty

## Source Principles

- Official sources anchor regulatory, legal, prudential, enforcement, sanctions, deadline, and policy claims.
- Specialist and press sources can support context, incidents, market colour, and early weak signals, but should not be the only support for a firm obligation.
- Every public card should make the source type clear through its label, wording, or context.
- If a source is weak, paywalled beyond practical verification, unstable, promotional, or not refreshable, it should not enter the public source universe.
- Candidate sources must pass the intake gates before promotion.
- Source usage should remain distinct from any employer tooling, taxonomy, or private source set.

## Source Lanes

| Lane | Role | Primary source examples | Feeds |
| --- | --- | --- | --- |
| UK regulation and prudential | UK policy, conduct, prudential, enforcement, horizon dates | FCA, FCA enforcement notices, Regulatory Initiatives Grid, BoE/PRA, OFSI, NCSC | Weekly Brief, Horizon, Resilience, Third-party, Market Structure |
| EU and global regulation | Cross-border policy, prudential, markets, payments, crypto, operational risk | ECB/SSM, EBA, ESMA, EIOPA, BIS, FSB, BCBS, IOSCO | Horizon, Market Structure, Third-party, Weekly Brief |
| Financial crime and sanctions | AML, sanctions, fraud, enforcement, screening | OFSI, FATF, FinCEN, OFAC, AMF sanctions | Weekly Brief, Resilience, Third-party |
| US read-across | Market, derivatives, crypto, cyber, financial crime signals with global relevance | SEC, CFTC, FinCEN, OFAC, CISA | Market Structure, Cyber, Financial Crime, Third-party |
| AI model and feature sources | Model releases, agents, enterprise controls, AI infrastructure and product change | OpenAI, Anthropic, Google DeepMind, Meta AI, Mistral, xAI, Microsoft AI | AI, Third-party, Market Structure |
| AI capability and industry sources | Capability movement, adoption, research, market structure, workforce | Epoch AI, LMArena, Stanford HAI, TechCrunch AI, The Verge AI, Ars Technica AI | AI, Weekly Brief |
| AI governance and infrastructure | AI obligations, safety, chips, data centres, energy, financing | EU AI Act, NIST AI RMF, NVIDIA, BIS, FT, Reuters | AI, Market Structure, Third-party, Data |
| Specialist implementation | Operational detail, payments, cloud, outages, risk practice, implementation guidance | ORX, Regulation Tomorrow, Sidley, A&O Shearman, Risk.net, Finextra, The Register | Resilience, Third-party, Weekly Brief |
| Curated weekly sweep | Catch missed AI and technology signals, then trace back to source | Import AI, The Batch | AI, Weekly Brief |

## Topic Source Mapping

### Weekly Brief

Input mix:

- One lead signal from any stream.
- Supporting items from Horizon, AI, Resilience, Third-party, and Market Structure.
- Control failure lessons from incidents and official expectations.
- Thought-leadership radar from credible source trails.

Minimum standard:

- Every lead or supporting item has a source link.
- Official-source claims use primary sources.
- Incident cards should have either a credible source plus official baseline, or two independent credible sources.

### Regulatory Horizon

Input mix:

- Regulatory scan `latest.json`.
- Official regulator/central-bank/standard-setter pages.
- `feed.xml`, `horizon.ics`, and archive outputs as supporting files.

Minimum standard:

- `signals[].url` is a primary document.
- `horizon[]` dates are source-linked and deadline-cued.
- No public KPI tiles or pipeline evidence.

### AI

Input mix:

- `dashboard/data/ai-signals.json`.
- Official model/provider pages.
- AI governance sources.
- Credible market or industry reporting where the risk is adoption, infrastructure, or financial-services read-across.

Minimum standard:

- Keep the 5/5/5 balance where useful: model releases, feature launches, industry news.
- Do not over-weight vendor marketing unless it changes capability, control, access, governance, or concentration.

### Operational Resilience

Input mix:

- Official operational resilience expectations.
- Payment, cloud, telecom, cyber, scam, complaints, and customer-impact incidents.
- Specialist implementation sources.

Minimum standard:

- Translate each incident into a specific internal test.
- Prefer customer-visible failure paths over generic outage reporting.

### Third-party Risk

Input mix:

- Outsourcing and third-party risk expectations.
- AI provider, processor, cloud, data, model, and network dependency signals.
- Resilience incidents that reveal dependency gaps.

Minimum standard:

- Connect source item to internal accountability, contract rights, assurance evidence, or exit practicality.

### Market Structure

Input mix:

- Horizon signals tagged `market-plumbing`, `digital-money`, or `balance-sheet`.
- Central-bank, supervisor, market-structure, BIS/FSB, and financial-stability sources.
- Credible reporting on AI capex, private credit, market concentration, or infrastructure financing.

Minimum standard:

- Translate market colour into exposure, liquidity, capital, client, custody, trading, settlement, or risk appetite questions.

## Source Approval Rules

### Primary

Can support:

- Rule, deadline, obligation, enforcement, consultation, official policy, supervisory expectation.

Cannot do alone:

- Explain market interpretation unless the source itself includes that interpretation.

### Specialist

Can support:

- Implementation detail, legal interpretation, risk practice, operational context, payments, cloud, outages.

Cannot do alone:

- Create a public claim that a rule or obligation has changed without primary source support.

### Press

Can support:

- Early market colour, company reporting, observed incidents, adoption signals, weak-signal monitoring.

Cannot do alone:

- Firm obligations, definitive regulatory interpretation, legal conclusions, or precise control requirements.

## Weekly Source QA

Before publication:

- Run Reg Horizon first in the Wednesday weekly update window, then use its approved outputs as inputs to the brief, topic pages, and archive.
- Primary-source claims have primary links.
- Press-only items are labelled as monitoring or market colour.
- No source URL is dead.
- No source is used outside its authority.
- Previous archive has been checked for duplicate coverage.
- Items older than 90 days are either removed or labelled as background.
- No single publication dominates the week without reason.
- Top 5 items have clear owner/action/evidence prompts or topic-page evidence prompts.

## Source Coverage Watchlist

The current registry is strong enough for the mockup. Claude confirmed on 2026-07-04 that the priority Reg Horizon sources are already configured as approved RSS sources where applicable: BoE/PRA, HM Treasury, EBA, ESMA, ECB/SSM, FSB, OFSI, NCSC, FINMA, CSSF, and BoE speeches. The FCA-heavy `latest.json` in the mockup is fixture output, not evidence of source-universe bias.

These gaps still matter before migration:

- Add per-source fetch URL or RSS URL where available.
- Add source freshness checks to the weekly preflight.
- Use the new `warnings[]` output to track source concentration and low approved-source diversity.
- Use the new quiet-theme warnings to distinguish genuinely quiet themes from themes affected by source health.
- Add a lightweight source-to-topic matrix generated from `useFor` tags.
- Decide which specialist implementation sources are allowed to support public cards without a second source.
- Complete the first live run from a network environment that can reach regulator domains, or from GitHub Actions.

## Automation Path

Phase 1: current mockup

- Manual topic pages with source-backed rows.
- Strategy docs define source rules.
- Registry audit confirms structure and coverage.

Phase 2: staging

- Build `signals.json` from approved registry sources, Horizon `latest.json`, and AI Signals data.
- Add source-type labels to rendered topic rows.
- Consume Reg Horizon `signals[].sourceStatus` and `warnings[]` as additive fields.
- Run `npm run sources:audit` and local link checks before deploy.

Phase 3: production

- Weekly refresh produces:
  - `latest.json` for Horizon
  - `ai-signals.json`
  - topic candidates / `signals.json`
  - archived weekly brief
  - archived topic pages
- Editorial override file records inclusions, exclusions, ranking changes, and source caveats.
- Wednesday cadence is the default operating rhythm: scan, review, generate, verify, then publish in one controlled weekly window.
