# Signals Phase Two Pipeline

Phase two adds a feed-backed candidate layer for the three highest-risk manual topics:

- AI
- Market Structure
- Third-Party

The goal is not to auto-publish. The goal is to generate a cleaner, source-backed review queue so manual topic curation no longer starts from a blank page.

## What Exists Now

### Published gate

Published rows are still protected by the shared published-source contract:

- [scripts/lib/published_source_contract.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/lib/published_source_contract.mjs)
- [scripts/validate_signals_data.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/validate_signals_data.mjs)
- [scripts/validate_ai_signals_data.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/validate_ai_signals_data.mjs)

Nothing becomes a published signal card unless it has a specific, registered citation host and passes the existing build gates.

That gate is now two-layered:

1. shape and host discipline
2. live URL liveness checks in GitHub Actions before deploy

Commands:

```bash
npm run signals:validate:live
npm run ai-signals:validate:live
```

### Candidate ingestion

The new candidate layer uses:

- [dashboard/data/signals-feed-registry.json](/Users/benstgai/Documents/Project%20Virtual%20Officer/dashboard/data/signals-feed-registry.json)
- [scripts/refresh_signals_candidates.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/refresh_signals_candidates.mjs)
- [scripts/validate_signals_candidates_output.mjs](/Users/benstgai/Documents/Project%20Virtual%20Officer/scripts/validate_signals_candidates_output.mjs)
- [dashboard/data/signals-candidates.generated.json](/Users/benstgai/Documents/Project%20Virtual%20Officer/dashboard/data/signals-candidates.generated.json)
- [dashboard/data/signals-candidate-state.json](/Users/benstgai/Documents/Project%20Virtual%20Officer/dashboard/data/signals-candidate-state.json)

## Source Types

Phase two supports three ingestion types:

1. `rss`
2. `sitemap`
3. `reg_horizon_json`

This is deliberate:

- AI needs real external feeds or sitemaps.
- Market Structure and Third-Party can start with live Reg Horizon harvesting plus a smaller set of direct regulator/standards feeds.

## Commands

Live refresh:

```bash
npm run signals:candidates:refresh
```

Offline refresh from the local Reg Horizon bridge only:

```bash
npm run signals:candidates:refresh:offline
```

Validate generated output:

```bash
npm run signals:candidates:validate
```

## Automation

GitHub Actions workflow:

- [.github/workflows/signals-candidates-weekly.yml](/Users/benstgai/Documents/Project%20Virtual%20Officer/.github/workflows/signals-candidates-weekly.yml)

It runs:

1. after the Reg Horizon weekly scan completes successfully, or
2. on push to `main` when the candidate-ingestion machinery changes, or
3. on manual dispatch

This keeps GitHub Actions as the default execution surface for candidate refreshes as well, rather than relying on a local terminal.

The workflow refreshes candidates, validates the output, and commits the generated candidate files back to `main`.

## What This Replaces

Before phase two:

- AI, Market Structure, and Third-Party depended on manual page authoring and ad hoc source selection.

After phase two:

- those topics have a standing weekly candidate queue backed by feeds or the live Reg Horizon JSON
- repeated URLs are deduped through state
- generic landing pages are rejected before the candidate file is written

## What Still Stays Human

Phase two does not auto-write published copy.

It still expects a human editorial pass to:

- choose the final Top 5
- decide which additional rows deserve publication
- write the control implication cleanly
- reject weak or over-broad candidates

## Next Phase

Phase three should add:

1. better AI source coverage beyond the first feed set
2. stronger ranking rules for candidate prioritisation
3. promotion tooling from candidate queue into `site/data/signals.json` and `dashboard/data/ai-signals.json`
4. concentration and freshness warnings at the candidate layer, not just the published layer
