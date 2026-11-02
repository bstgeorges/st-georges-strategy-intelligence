# Editorial style guide

This guide keeps The Virtual Officer recognisable across weekly releases. It is deliberately short: the publication should feel consistent without turning every edition into a template exercise.

## Recurring section names

Use these names when the section performs the matching job.

| Section name | Use when |
| --- | --- |
| The Judgement | The page states the central editorial view or operating conclusion. |
| Signals That Matter | The page presents a ranked or curated set of public-source developments. |
| Committee Question | The page gives a copy-ready governance challenge. Use singular when highlighting one question; use Committee Questions for the product/page name. |
| What to Ask For | The page turns the judgement into concrete evidence or management-information requests. |
| Watch Next | The page identifies deadlines, emerging themes, or next events requiring owner attention. |
| Evidence Base | The page explains the sources, archive, method, or distinction between evidence and interpretation. |

## Voice rules

- Lead with the judgement, then explain the evidence.
- Use precise dates and named organisations.
- Distinguish what a source proves from what the publication infers.
- Avoid generic urgency. Say what decision, control, owner, or evidence is affected.
- Prefer one strong committee question over several broad questions.
- Make evidence requests concrete enough for an accountable owner to answer.
- Remove draft notes, migration language, and internal process scaffolding from public pages.
- Use secondary reporting only when it is labelled and the first-party source is unavailable or insufficient.

## Weekly Judgement distinctness

- Keep **What happened / Why it matters / What to do** as the reader structure, but give each edition a genuinely different operating decision.
- Before approval, compare the proposed Judgement and LinkedIn copy with the previous three published editions. Record the new `editorialAngle` and `distinctFromPrevious` fields in `site/data/current-edition.json`.
- Reject a draft that merely restates the previous action grammar or reuses the default assurance bundle of owner, map, dependency, test, intervention, exception and closure. That may be useful evidence elsewhere, but it is not a Weekly Judgement.
- Lead with a concrete observed behaviour or changed boundary, not a roll-call of sources. The Brief and Signals pages carry the detailed source trail.
- Make **What to do** one specific next move. When the evidence points to a proof gap, ask for the relevant test result or unresolved difference — not another generic control pack.
- Write **Why it matters** as a short causal argument: identify the mechanism that can turn the signal into an operating, customer, financial or control consequence; state what the source establishes; then name the decision-relevant uncertainty. Do not stop at a caveat such as “not proof of failure” or add an unconnected risk possibility.
- Write **What to do** as one bounded test or decision. Name the operating owner, the change or trigger to examine, the observable measure or evidence, and the decision the result should inform. Prefer elapsed time, a threshold, a pass/fail condition or a recorded disposition over “review,” “map,” or “show evidence” by themselves.
- Use the reasoning standard of a Deep Dive at brief length: evidence, mechanism, consequence, test. Separate source fact from editorial inference, and keep each sentence doing one of those jobs.
- Give the reader enough context to follow the whole chain without filling gaps: identify the relevant figure, population and response base; say what the source establishes and what it leaves unknown; explain the concrete mechanism connecting the finding to an operating consequence; then specify the evidence and decision that would resolve the uncertainty. If an inference is ours, make that clear in the wording.
- Treat the 2 Nov 2026 revision of Edition 20 as a quality benchmark for this level of detail: its survey categories and denominator limits lead to a specific question about production-agent coverage, followed by an agent-level test. Carry forward that depth and source context, not that edition's subject or wording.
- Before release, read **Why it matters** beside **What to do**. The action must test the mechanism described in the judgement, and the result must answer its stated uncertainty.
- When a source reports aggregate percentages, preserve each response base and do not imply that separate percentages describe the same firms unless the source cross-tabulates them. Make the action close that specific gap by mapping the source categories to the firm's own population with counts and denominators, then testing one material case.
- The combined judgement may run up to 180 words when the source limitation and firm-level test need space. Use the extra room for a tighter link between the cited observation, the inference, and the management decision; do not repeat the source summary.

## Date and archive discipline

- Do not change genuine historical publication dates to reflect later layout or scanability improvements.
- If an archived edition is corrected, use a visible correction note rather than silently replacing history.
- Current homepage, Weekly Brief, Signals metadata, Committee Questions, and archive hubs should use the canonical current-edition record.

## Source language

Every signal source should be described with:

- source headline or announcement title;
- organisation or publisher;
- exact publication date;
- source type;
- direct URL;
- one sentence explaining why the source matters.

Avoid vague labels such as “recent reporting,” “this month,” or “according to regulators” where a direct source exists.
