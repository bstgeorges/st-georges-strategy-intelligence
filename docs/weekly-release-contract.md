# Weekly release contract

The public edition is one reviewed package, not five independent page updates. Before merging a weekly refresh, update and review these together:

1. `site/data/current-edition.json` — edition date, judgement, five distinct Top 5 signals, and a complete committee question.
2. `site/data/signals.json` — validated source-backed Top 5 by topic, with a current promotion summary.
3. `site/brief/index.html` and `site/committee-questions/index.html` — reader-facing judgement and committee prompt that match the edition record.
4. `dashboard/regulatory-horizon/latest.json` — a reviewed, published horizon edition with derived coverage and source-health disclosure.

The preparatory workflows create candidates and an editorial pack; neither publishes a new edition. A reviewer must make the editorial choices, confirm source evidence, and run:

```sh
npm run release:readiness -- --as-of YYYY-MM-DD
npm run release:order -- --as-of YYYY-MM-DD
npm run site:build
npm run site:verify
```

The production release workflow repeats these controls and treats link auditing as a release gate. The current reviewed package may be deployed for up to eight days, so a contained reliability or presentation fix can ship during the week without relabelling it as a new edition.
