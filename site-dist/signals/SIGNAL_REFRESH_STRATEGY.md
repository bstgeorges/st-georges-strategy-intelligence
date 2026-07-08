# Signals Refresh Strategy

Status date: 2026-07-04

This document defines how the weekly Top 5 shortlist and additional topic evidence rows should be produced after migration. The goal is to avoid hand-curating a page from scratch while preserving editorial judgement while keeping every published citation specific, checkable, and machine-validated.

## Output Per Topic

Each active topic page should publish:

- Weekly Top 5: the five items most likely to affect the weekly brief or a leadership conversation.
- Additional 5: the broader ranked source trail for readers who need depth, without repeating the Top 5.
- Source trail: URL, source label, source type, date or edition context.
- Editorial judgement: why the topic made the brief.
- Evidence prompts: what a control owner should be able to show.
- Archive trail: dated topic page and linked weekly brief.

## Published Source Contract

Signals and AI Signals now share one published-source contract:

- The source-universe watch list is not the same thing as a publishable citation.
- Every published row must carry a specific `https://` citation URL.
- Bare homepages, `/news`, `/blog`, `/press`, `/newsroom`, and category listings fail validation.
- Every citation host must be registered in [published-source-map.json](/Users/benstgai/Documents/Project%20Virtual%20Officer/site/data/published-source-map.json).
- A single exact citation URL may not support more than two rows inside the same topic page.

The build now enforces this through:

- [validate_signals_data.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/validate_signals_data.mjs)
- [validate_ai_signals_data.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/validate_ai_signals_data.mjs)
- [published_source_contract.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/lib/published_source_contract.mjs)

That means the old failure mode, where a plausible headline could be paired with a generic source-domain page, should now fail before publish instead of slipping into production.

## Topic Streams

### AI

Primary input:

- `dashboard/data/ai-signals.json`

Source universe:

- Model/provider release feeds and news pages.
- Product and enterprise AI feature announcements.
- AI governance and model-risk sources.
- Credible reporting where the signal is market, resilience, or adoption related.

Ranking emphasis:

- Agentic capability entering ordinary workflows.
- Model/provider access, control, or concentration changes.
- Kill-switch, permissioning, audit, and model-risk implications.
- Financial stability, market-structure, or regulated-firm adoption relevance.

Current refresh path:

1. Validate `ai-signals.json`.
2. Score all source-backed cards.
3. Select the weekly Top 5 by control impact, supervisory relevance, and market consequence.
4. Publish the next five rows as additional evidence.
5. Carry forward only when capability, governance status, or market consequence changes.

### Operational Resilience

Primary inputs:

- Weekly intelligence brief control-failure sources.
- Official resilience expectations.
- Incident reporting and credible outage coverage.

Source universe:

- FCA, Bank of England/PRA, EBA, ESMA, ENISA, CISA/KEV where relevant.
- Payment processor, cloud, CDN, telecom, cyber, scam, complaints, and outage coverage.

Ranking emphasis:

- Customer-visible failure paths.
- Important business services.
- Third-party or fourth-party dependencies.
- Incident response, fallback, recovery, communication, and evidence gaps.

Current refresh path:

1. Pull relevant incidents and official updates from the weekly refresh packet.
2. Convert each item into the internal resilience test it implies.
3. Rank by customer harm, operational dependency, regulatory salience, and repeatability.
4. Keep official expectations as standing baseline rows where weekly incident volume is low.

### Third-Party Risk

Primary inputs:

- Operational resilience incidents.
- Outsourcing and third-party risk regulatory sources.
- AI provider, model platform, processor, cloud, data, and network dependency signals.

Source universe:

- PRA outsourcing expectations, EBA outsourcing guidelines, FSB third-party risk work.
- AI provider/product announcements.
- Payment, cloud, CDN, telecom, and processor incidents.
- Credible secondary reporting when the source is an observed incident.

Ranking emphasis:

- Criticality to important business services.
- Concentration across business lines.
- Audit, information, incident, subcontracting, and exit rights.
- Evidence freshness and practical recoverability.

Current refresh path:

1. Reuse resilience and AI inputs where the real issue is dependency rather than direct control.
2. Add official outsourcing references where they frame the control standard.
3. Rank by firm accountability, customer impact, concentration, exit practicality, and evidence gap.
4. Link back to the weekly brief when the item is one of the week's top 5.

### Market Structure

Primary inputs:

- Weekly intelligence brief market/capital items.
- Regulatory horizon `signals[]` where `riskAreas` includes `market-plumbing`, `digital-money`, or `balance-sheet`.
- Central-bank, supervisor, market-structure, and financial-stability sources.

Source universe:

- FCA, ESMA, EBA, ECB, Bank of England/PRA, BIS, FSB.
- Official policy dates and consultations.
- Credible market reporting where the signal is exposure, valuation, capital, liquidity, or concentration.

Ranking emphasis:

- Capital, liquidity, valuation, and funding impact.
- Client, product, custody, trading, settlement, or market-integrity implications.
- AI infrastructure exposure and concentration.
- Crypto/digital-money operating-model change.

Current refresh path:

1. Start with Horizon material signals and weekly market sources.
2. Add financial-stability and market-structure watch items.
3. Rank by exposure size, timing, cross-book relevance, and supervisory pressure.
4. Link Horizon deadlines directly where the item is date-driven.

### Financial Crime

Primary inputs:

- FCA financial-crime, cryptoasset AML, and consumer scam material.
- PSR APP fraud work.
- OFSI sanctions material.
- FATF publications and risk-based guidance.

Ranking emphasis:

- Fraud and scam controls that change customer harm or reimbursement exposure.
- AML, sanctions, and cryptoasset controls that change onboarding, monitoring, escalation, or reporting evidence.
- Cross-channel financial-crime themes linked to payments, crypto, cyber, or vulnerable customers.

Current refresh path:

1. Pull official financial-crime, sanctions, scam, and payment-fraud sources.
2. Convert each item into an owner, control, evidence, or reporting prompt.
3. Rank by customer harm, regulatory salience, control change, and cross-stream relevance.
4. Build a full topic page before migration.

### Cyber

Primary inputs:

- NCSC, FCA, Bank of England/PRA, CBEST, and UK cyber resilience policy sources.
- Credible vulnerability, ransomware, identity, and incident reporting where relevant.

Ranking emphasis:

- Threat-led testing, identity control, vulnerability response, ransomware recovery, and board accountability.
- Cyber items that change operational resilience, customer-impact, or third-party evidence expectations.

Current refresh path:

1. Pull official cyber guidance and financial-sector cyber-resilience sources.
2. Add credible monitoring signals only when they create a practical control prompt.
3. Rank by exploitability, business-service impact, regulatory salience, and recovery evidence.
4. Build a full topic page before migration.

### Technology Failure

Primary inputs:

- FCA/PRA operational resilience material.
- DORA and ICT incident expectations.
- Cloud, outage, data-integrity, change-failure, and third-party technology sources.

Ranking emphasis:

- Customer-visible failure paths, change failure, data recovery, cloud resilience, and manual workaround evidence.
- Evidence that an important business service can stay within tolerance when technology fails.

Current refresh path:

1. Pull official operational resilience, outsourcing, DORA, and cloud assurance sources.
2. Add credible outage or incident reporting where it reveals a repeatable control lesson.
3. Rank by customer impact, dependency criticality, recovery evidence, and repeatability.
4. Build a full topic page before migration.

### Data

Primary inputs:

- BCBS 239 and risk data aggregation references.
- FCA and Bank of England regulatory reporting and data collection sources.
- ICO data protection, accountability, and AI guidance.
- Internal evidence needs from risk, compliance, finance, operations, and technology reporting.

Ranking emphasis:

- Data lineage, ownership, quality, reconciliations, retention, access, and evidence integrity.
- Data issues that affect regulatory reporting, AI inputs, customer outcomes, risk aggregation, or audit trail.
- Whether the signal changes what a firm must prove about source systems, transformations, controls, and sign-off.

Current refresh path:

1. Pull official risk-data, reporting, privacy, and AI-data governance sources.
2. Convert each item into lineage, ownership, validation, retention, access, or evidence prompts.
3. Rank by regulatory salience, decision impact, control weakness, and cross-stream relevance.
4. Build a full topic page before migration.

## Scoring Model

Use a simple weighted score to produce a first draft. Editorial judgement can override, but overrides should be visible in the weekly refresh notes.

| Factor | Weight | Question |
| --- | ---: | --- |
| Control impact | 30 | Does it change what a firm must own, evidence, test, or explain? |
| Supervisory relevance | 25 | Is there official policy, enforcement, deadline, speech, or thematic pressure? |
| Customer or market harm | 20 | Could this affect customer outcomes, market integrity, liquidity, capital, or resilience? |
| Timing | 15 | Does it need action this week, this month, or before a known deadline? |
| Recurrence/pattern | 10 | Does it reinforce a pattern already visible across editions? |

Tie-breakers:

- Prefer primary sources over secondary reporting.
- Prefer items with clear owner/action/evidence prompts.
- Prefer items that connect more than one topic stream.
- Do not use private or employer-derived taxonomy, source lists, or tooling.

## Control Failure Lessons

Control failure lessons are a weekly output format, not a standing topic stream.

- Use the module when there are three to five credible incidents, outages, enforcement actions, penalties, post-mortems, or remediation failures.
- If there are fewer than three strong items, fold them into the relevant topic stream instead.
- If there is one major incident, treat it as a featured control lesson in the weekly brief.
- Do not publish a fixed Control Failure stream unless a dedicated incident/enforcement source pipeline exists.

## Weekly Production Workflow

1. Run source refreshes:
   - `ai-signals.json`
   - regulatory horizon `latest.json`
   - weekly intelligence/control-failure source packet
2. Normalize candidate items into a shared row shape.
3. Assign one or more topic streams.
4. Score and sort candidates per topic.
5. Draft each topic shortlist and additional evidence rows.
6. Select each topic Top 5.
7. Select the cross-topic weekly Top 5.
8. Add editorial judgement and evidence prompts.
9. Archive the weekly brief and each topic page.
10. Run local link, JSON, and responsive checks.

## Candidate Row Shape

```json
{
  "title": "Short signal title",
  "url": "https://primary-or-credible-source",
  "sourceLabel": "FCA",
  "sourceType": "official|credible-monitoring|internal-editorial",
  "date": "2026-07-02",
  "topicStreams": ["market-structure", "regulatory-horizon"],
  "riskAreas": ["digital-money", "market-plumbing"],
  "signalType": "consultation|final-rule|incident|model-release|feature-launch|market-watch|other",
  "whyItMatters": "One sentence.",
  "controlPrompt": "Question for an accountable owner.",
  "score": 0,
  "includedInWeeklyTop5": false
}
```

## Automation Roadmap

Phase 1: static mockup

- Keep topic pages manually rendered from real source-backed rows.
- Maintain this strategy and scorecard.

Phase 2: data-backed staging

- Create a single `signals.json` file with the candidate row shape.
- Render topic pages from that file.
- Pull regulatory items from Horizon `latest.json`.
- Pull AI items from `ai-signals.json`.

Phase 3: production refresh

- Generate topic Top 5 and additional evidence rows during the weekly refresh.
- Archive topic JSON and HTML by edition for all eight streams: AI, resilience, third-party, market structure, financial crime, cyber, technology failure, and data.
- Preserve a dated copy for every topic at `/signals/<topic>/archive/<YYYY-MM-DD>/` and link the current page back to prior editions.
- Update `/archive/` so each weekly issue links to the eight frozen topic editions and the Reg Horizon edition from the same run.
- Keep manual editorial override file for judgement, exclusions, and corrections.

## Open Decisions Before Migration

- Whether the topic pages should be generated at build time or enhanced client-side.
- Whether `signals.json` should live beside `latest.json` or be built into each topic folder.
- Whether top 5 selections should be purely scored or require explicit editorial approval.
- How many historical topic editions are needed before launch.
