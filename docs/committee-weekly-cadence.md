# Committee Questions weekly cadence

The Committee page has two jobs. The top of the page is a live weekly tool; the library beneath it is an evergreen source of challenge. Do not mix the two.

## Every weekly edition

After the Signals shortlist and Weekly Judgement are approved, draft exactly three current questions in `site/data/current-edition.json` under `committeeQuestions`.

The three questions should cover distinct control planes where the evidence supports them:

1. **Authority** — who can decide, stop, approve or escalate?
2. **Dependency** — what important service, supplier, data or model dependency needs to be understood or tested?
3. **Evidence and closure** — can the firm show the action, exception, remediation and closure record?

Each question must include:

- `domain` — a short, reader-friendly control label;
- `question` — one copy-ready committee question in plain English;
- `why` — why the evidence this week makes the question timely;
- `evidence` — the actual record, map, test result or decision trail to request;
- `links` — relevant Brief and Signals routes.

The legacy singular `committeeQuestion` remains the first current question. It powers the compact homepage and newsletter treatment, while the Committee page renders all three current questions.

## Editorial standard

- Use one question per card. Do not combine several management challenges into a long list.
- Ask for evidence that an accountable owner can bring back: a map, permission export, test result, decision log, exception record or closure record.
- Keep source-specific detail in the Signals and Brief. The Committee page should turn that evidence into a usable internal challenge.
- Avoid “why ask now” language in the evergreen library. If a card relies on this week’s events, move it into the three current questions instead.
- Do not update the library merely to make it look new. Refresh it only when a question has become genuinely dated, weak or duplicative.

## Release check

The site build and weekly-readiness gate now require exactly three complete `committeeQuestions` records. Before release, confirm that the first current question still agrees with the homepage, newsletter and chosen Weekly Judgement.

For the complete weekly release, run the normal Signals, source-health, site build and release checks documented in `PROJECT_MEMORY.md` and `docs/weekly-refresh-workflow.md`.
