# Weekly release contract

The public edition is one reviewed package, not five independent page updates. Before merging a weekly refresh, update and review these together:

1. `site/data/current-edition.json` — edition date, judgement, five distinct Top 5 signals, and three complete current Committee Questions (with the first retained as the compact feature).
2. `site/data/signals.json` — validated source-backed Top 5 by topic, with a current promotion summary.
3. `site/brief/index.html` and `site/committee-questions/index.html` — reader-facing judgement and committee prompt that match the edition record.
4. While Regulatory Horizon is withdrawn, `dashboard/regulatory-deadline-register/` — the private cumulative deadline register, source-health record, QA report and relaunch approval state. This is not a public release input and cannot restore the route. Once the relaunch gate passes and a product decision is recorded, replace this item with a reviewed, published Horizon edition.

The preparatory workflows create candidates and an editorial pack; neither publishes a new edition. A reviewer must make the editorial choices, confirm source evidence, and run:

```sh
npm run release:readiness -- --as-of YYYY-MM-DD
npm run release:order -- --as-of YYYY-MM-DD
npm run site:build
npm run site:verify
```

The production release workflow repeats these controls and treats link auditing as a release gate. The current reviewed package may be deployed for up to eight days, so a contained reliability or presentation fix can ship during the week without relabelling it as a new edition.
