# Project Virtual Officer Scheduled Intelligence Cadence

Last consolidated: 1 Jul 2026

## Operating Principle

Project Virtual Officer scheduled intelligence is now framed for financial services leaders across the sector, not for a single employer. Private delivery can still use Telegram, but public dashboard and newsletter content should be sanitized, source-backed, and read-only.

## Active Schedule

| Product | Cadence | Purpose | Public framing |
| --- | --- | --- | --- |
| Daily Financial Services Executive Pulse | Mon-Fri 07:15 | Morning orientation across markets, central banks, geopolitics, regulation, and AI | Financial services leadership implications |
| Financial Services Regulator Speech Watch | Tue and Fri 07:45 | Supervisory speeches, statements, policy remarks, and consultation signals | Sector-wide regulatory signal scan |
| Financial Services Regulatory Horizon Calendar | Thu 07:30 | Upcoming consultations, deadlines, policy papers, and enforcement dates | Forward calendar for planning |
| Financial Services Control Lessons Digest | Wed 07:35 | Operational resilience, cyber, third-party, AI, conduct, and financial crime lessons | Practical control-owner questions |
| Financial Services Content Engine | Mon 18:00 | Ideas for posts, articles, internal notes, client conversations, and speaking points | Useful thought leadership, not employer-specific positioning |
| Financial Services Thought Leadership Radar | Sat 09:00 | Timely angles and source hooks for the week ahead | Public-facing perspectives for a professional network |
| Weekly Public Refresh | After the Wednesday scan PR is reviewed and merged | Refresh the Intelligence and AI Signals editions, archive the previous live pages, and run QA | Public website refresh using source-backed editorial judgement |

## Delivery Rules

- Keep private Telegram delivery credentials in a local `.env` file outside the published dashboard.
- Do not reference legacy or unrelated env paths in new prompts, docs, dashboards, or relay scripts.
- Keep public outputs free of private employer framing, personal chat identifiers, secrets, and workspace-local paths.
- For public newsletter/dashboard updates, write sanitized content to `dashboard/data/latest.json` or a deployment equivalent.
- For AI Signals updates, the scheduled task writes `dashboard/data/ai-signals.json`; the public page renders that JSON through `dashboard/ai-signals/app.js`.
- Use one canonical public source link per signal wherever a source hook is included.
- Every scheduled task prompt should use `web_fetch` on primary official pages first and use search only to fill defined gaps. Compute dates from the runtime execution date, not a hard-coded year.
- Prefer primary sources for regulatory, supervisory, legal, capital, enforcement, sanctions, and official deadline claims. Use trade press or general media only when no primary source is available, and avoid tabloid or aggregator sources as the lead citation for public risk-and-compliance pages.
- Cite the primary document, notice, press release, consultation, enforcement action, sanctions release, or official tracker, not an aggregator.
- Read the archive copy of the previous public edition before drafting for the website or newsletter, and drop anything already covered unless its status changed.
- Flag any statistic older than 90 days from the publication date.
- For incident cards, require two independent sources before publication; start with regulator, authority, company, infrastructure, vendor, or official incident statements before using FT, Reuters, Bloomberg, ORX, or specialist press as corroboration.
- Public source links must resolve before publication. Run `npm run verify:public-links` after updating the live pages and replace or remove any URL returning `404`, `410`, `5xx`, DNS, or connection errors. Paywalled `401`/`403` links may remain only when the publication and article URL are known to exist.

## Consolidation Notes

- The two thought-leadership automations are intentionally distinct:
  - `Financial Services Content Engine` creates richer reusable content ideas.
  - `Financial Services Thought Leadership Radar` creates a shorter weekly opportunity scan.
- The regulatory products are complementary:
  - `Regulator Speech Watch` watches new supervisory signals.
  - `Regulatory Horizon Calendar` looks forward to deadlines and upcoming milestones using FCA news, the Regulatory Initiatives Grid, BoE/PRA, ECB/SSM press, SSM newsletter, supervisory priorities, EBA, ESMA, EIOPA, BIS/BCBS, IOSCO, FSB, FATF/OFSI, EU AI Act, and NIST AI RMF anchors before generic search.
- `Control Lessons Digest` starts from enforcement and incident primary sources, including FCA enforcement notices, FinCEN, OFAC, AMF sanctions, ECB sanctions, ESA DORA publications, and official incident statements. ORX, FT, Reuters, Bloomberg, Regulation Tomorrow, Sidley, and A&O Shearman are corroboration or interpretation sources, not lead citations for obligations.
- `AI Signals` starts from Anthropic, OpenAI, Google DeepMind, Meta AI, Mistral, and xAI for model releases; TechCrunch, The Verge, and Ars Technica AI sections for industry news; Epoch AI, LMArena/Arena, and Stanford HAI AI Index for capability data; EU AI Act tracker and NIST AI RMF for governance overlap; and Import AI/The Batch as weekly curated sweeps that must be traced back to primary sources.
- The dashboard should remain read-only for external viewers. Editing, publishing, and credential handling should stay in the private workspace or hosting pipeline.
- The Wednesday public refresh workflow lives in `docs/weekly-refresh-workflow.md`; use `docs/weekly-refresh-packet-template.md` for the source packet and `npm run refresh:preflight -- --date YYYY-MM-DD` before deployment.
