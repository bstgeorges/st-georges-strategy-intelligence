# Release preparation — Sunday 27 September 2026

## Starting position

- Release branch: `codex/release-prep-2026-09-27`, created from current `origin/main` (Edition 14, 20 September).
- This branch contains the reviewed private Regulatory Horizon reliability, preview and shared-site design work from 26 September. It deliberately excludes unrelated files from the original workspace.
- No fresh Signals, health, AI Signals or editorial selection data has been created for 27 September. Do not publish this branch as an edition until the Sunday steps below are complete.

## Editorial sequence

1. Start from the `Weekly editorial prep` GitHub Actions artifact generated at 07:30 UTC. Treat it as candidate material, never publication authority.
2. Review the prior Brief, Signals and AI Signals archives. Record every retained item as a status change or continuing priority; drop simple repetition.
3. Review the Signals promotion pack by materiality first, then source health, duplication, source-owner concentration and geographic balance. A concentration warning is a decision prompt, not a quota.
4. Select five supported cross-site signals. Each display title must state the decision, control, exposure or dependency revealed by the evidence; preserve literal provider wording only in `evidence.sourceTitle`.
5. Draft the Brief, three Committee Questions, the homepage judgement and LinkedIn copy as one package. Use the same three beats throughout: **What happened → Why it matters → What to do**.
6. Compare the judgement against the preceding three editions. Record `editorialAngle` and `distinctFromPrevious`; the action must name one concrete next move, not a generic control checklist.
7. Refresh the 15-card AI Signals JSON from the scheduled output and use direct sources. Do not hand-edit cards in the page HTML.

## Required release gates

Run these after the editorial decision, with `2026-09-27` as the edition date:

```sh
npm run signals:validate
npm run signals:health:verify
npm run ai-signals:validate -- --date 2026-09-27
npm run release:readiness -- --as-of 2026-09-27
npm run release:order -- --as-of 2026-09-27
npm run site:build
npm run site:verify
npm run verify:generated-links
```

Before merging, inspect the homepage at **1366 × 768**: both CTAs must remain fully visible above the metric strip, with no overlap. Then confirm the Brief standfirst/reading-time spacing, Committee edition-date contrast, archive count, header/footer alignment and the exact LinkedIn copy against the approved judgement.

## Delivery sequence

1. Commit the approved edition as one package.
2. Rebase or merge it onto the then-current `main`; do not force-push around a newer weekly release.
3. Push to `main` and rely on the guarded **Site release (Cloudflare)** workflow.
4. Treat the green workflow's exact-SHA, cache-purge and plain-crawler checks as publication proof. A local `site-dist` preview, a commit or a push is not proof.

## Current blockers intentionally left for Sunday

- `site/data/current-edition.json`, Signals and promotion data still describe 20 September, not 27 September.
- Signals health must be regenerated after Top 5 selection; the current report is too old for Sunday’s readiness gate.
- AI Signals must be regenerated with a 27 September `generatedAt` date.
- The final release branch must be reconciled with any commits merged to `main` after this preparation branch was created.
