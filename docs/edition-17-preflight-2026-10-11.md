# Edition 17 preflight — 11 October 2026

Status: preparation notes only. This is not an approved edition or publication list. Use the Sunday candidate refresh and editorial review as the current inputs; recheck every date against its primary source before promotion.

## Signals workflow

- Candidate refresh is scheduled for Sunday at 05:00 UTC; review its generated promotion file rather than reusing the 4 October shortlist.
- Weekly editorial prep is scheduled for 07:30 UTC.
- Keep the edition's judgement, Committee Questions, Brief and homepage aligned on the approved date and lead signal.
- Edition 16 was published on 4 October. Sunday 11 October would be Edition 17 if the editor approves a new edition.

## Regulatory Horizon candidates to reconcile

Official sources checked on 8 October:

| Candidate | Date/status | Editorial note | Primary source |
| --- | --- | --- | --- |
| MAS proposed amendments to the Payment Services Act for stablecoin regulation | Consultation closes 16 October 2026 at 23:59 Singapore time | Review for payment firms, stablecoin issuers and partner banks; assess whether this clears the Horizon materiality bar. | [MAS consultation P015-2026](https://www.mas.gov.sg/publications/consultations/2026/consultation-on-proposed-amendments-to-the-payment-services-act-for-stablecoin-regulation) |
| FCA CP26/29 captive insurance | Consultation closes 14 October 2026 | Consider for insurers, reinsurers, intermediaries, captive managers and advisers; assess audience fit. | [FCA CP26/29](https://www.fca.org.uk/publications/consultation-papers/cp26-29-tailored-regime-captive-insurance) |
| FCA CP26/30 equity market transparency | Consultation closes 16 October 2026 | Potentially material to trading venues, investment firms, SIs, UK branches and APAs. | [FCA CP26/30](https://www.fca.org.uk/publications/consultation-papers/cp26-30-consulation-paper-supporting-equity-market-transparency-considering-market-structure-developments) |
| Federal Reserve proposal to modernize Regulation O | Extended comment period closes 4 November 2026 | Bank insider lending governance; primary release confirms extension from the original 5 October date. | [Federal Reserve release, 2 October 2026](https://www.federalreserve.gov/newsevents/pressreleases/bcreg20261002a.htm) |
| EBA DGSD3 consultation package, including guidelines for investment of available financial means | Four consultations close 23 October 2026 | Potentially relevant to deposit guarantee schemes and EU banks; avoid duplicating the four related papers as separate headline items without a materiality reason. | [EBA consultation notice](https://www.eba.europa.eu/publications-and-media/press-releases/eba-consults-rules-further-improve-depositor-protection-under-revised-deposit-guarantee-schemes) |
| FCA CP26/28 UK AIFM consultation | Response deadline for the CP and prudential discussion chapter is 22 October 2026; other discussion chapters closed 18 September | Keep the chapter-specific date explicit. | [FCA CP26/28](https://www.fca.org.uk/publications/consultation-papers/cp26-28-uk-aifm-regime) |
| PRA Part VIII guidance for friendly-society amalgamations and transfers | Consultation closes 22 October 2026 | Confirm audience relevance before inclusion. | [PRA consultation notice](https://www.bankofengland.co.uk/news/2026/july/pra-consults-on-updated-guidance-for-friendly-society-amalgamations-and-transfers) |
| EIOPA revised Solvency II package | Applies from 30 January 2027 | Implementation milestone; recheck whether guidance or legal instruments have changed. | [EIOPA announcement](https://www.eiopa.europa.eu/eiopa-completes-solvency-ii-review-mandate-final-guidelines-and-draft-technical-standards-revised-2026-07-15_en) |
| HKMA/SFC OTC derivatives clearing amendments | Targeted for 1 March 2027; not a confirmed commencement date | Label as targeted/tentative unless a final instrument confirms commencement. | [HKMA release](https://www.hkma.gov.hk/eng/news-and-media/press-releases/2026/06/20260605-6) |

Two items in the 4 October register have now passed: HM Treasury payment-services consultation (6 October) and HKMA Taxonomy Phase 2B consultation (7 October). Confirm their official closed status and exclude them from future/upcoming counts.

## Scanner blocker to resolve

The 4 October `Reg Horizon weekly scan` (GitHub Actions run `37199414037`) completed the live scan but failed the private-register validation: FCA enforcement returned HTTP 403 without a governed exception, while South African Reserve Bank was `ok` against an exception expecting `failed`. `source-exceptions.json` now records FCA as blocked and removes the stale SARB exception. The checked-in `health.json` is from the prior successful scan and is not the failed run's output. The next scheduled scan is Sunday at 06:00 UTC; review its actual source health and keep the gate strict.

## Sunday release gates

- Run the scheduled Signals candidate refresh and review/approve its exact `candidateGeneratedAt`.
- Review the latest weekly editorial prep artifact and complete the primary-source/date checks above.
- Keep the private Horizon scan PR separate from the public Signals edition PR.
- Run the established preflight and health checks on the approved Signals edition. Do not publish until the `Site release (Cloudflare)` workflow passes and verifies the deployed SHA at both origins.

## Cross-brief reconciliation (retrospective)

The Weekly AI Risk brief and Daily Intelligence Briefing were supplied after Edition 17 was released, so they were not used as inputs to its editorial selection. Edition 17 does overlap with their agent-boundary theme: its lead is Anthropic's 9 October report on unintended model actions, and its judgement asks where permissions end and how actions are stopped. This is thematic overlap, not evidence that either brief informed the issue.

The retrospective review found several candidates that should have been checked before finalising the issue:

- Daily brief: the proposed UK independent investigator for serious AI incidents and near misses; the California inquiry into OpenAI agent cyber incidents; support for mandatory incident reporting in Australia; Microsoft's Execution Containers; and the reported AI-assisted attacks on Korean banks.
- Weekly AI Risk brief: Google's enterprise-agent identity, delegation and gateway controls; the UK AI Security Institute's Transect observability work; the GHOST long-horizon constraint study; Anthropic's Cyber Mission and verification program; and the RBI's supervisory framing of technology, cybersecurity and AI.

These briefs also reinforce a useful editorial synthesis beyond Edition 17's permission-boundary framing: test whether firms can reconstruct an agent's full causal path, including delegated identity, tools, external enforcement, monitoring, human intervention and containment. The issue already had a primary-source anchor in Anthropic's 9 October report, but did not carry that broader cross-brief synthesis into its judgement or questions.

Their appearance in the supplied briefs is not enough to publish them. Verify each candidate against a primary or directly accountable source, check its status and uncertainty, and apply the usual materiality and archive-deduplication rules. The Korean-bank account is explicitly reported and under investigation; preserve that uncertainty. Record promotion or exclusion in the next refresh packet.

The repeatable review is now required in `docs/weekly-refresh-workflow.md` and captured in `docs/weekly-refresh-packet-template.md`.
