# Reference route inventory

Reference target: `2026-07-10T14:16:05Z`. Initial crawl ran from `14:17:31Z` to `14:18Z`.

## Continuation re-audit — 11 July 2026

The public sitemap was re-read at `2026-07-11T13:03:30Z` before the business-experience migration. It now contains 33 URLs and every one returned 200 during the same pass.

This is a different live edition from the frozen 42-route reference below:

- `/committee-questions/` is now a canonical 200 page dated 9 July 2026;
- the brief archive contains one dated route, `/archive/brief/2026-07-06/`;
- each of the eight topic archives contains one dated route, `/signals/{topic}/archive/2026-07-06/`;
- the frozen `/archive/brief/2026-07-{08,09}/` and matching topic routes are not in the current sitemap;
- the six core routes, eight topic routes, nine archive indexes, and supporting public feeds remain reachable.

The initial frozen reference is retained as regression evidence. The continuation will not silently combine its dated archive pages with the newly observed live edition. New current content is recorded with its own capture provenance before typed migration.

| Continuation archetype             | Routes                                                                                               | Count | Re-audit state |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- | ----: | -------------- |
| Core including Committee Questions | `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/committee-questions/`, `/archive/`, `/about/` |     7 | 200            |
| Signal topics                      | `/signals/{eight-topic-slugs}/`                                                                      |     8 | 200            |
| Brief archive                      | `/archive/brief/`, `/archive/brief/2026-07-06/`                                                      |     2 | 200            |
| Topic archive indexes              | `/signals/{eight-topic-slugs}/archive/`                                                              |     8 | 200            |
| Topic dated archives               | `/signals/{eight-topic-slugs}/archive/2026-07-06/`                                                   |     8 | 200            |

Continuation sitemap total: **33 routes**.

## Canonical public surface

The initial sitemap contained 42 URLs. Forty-one returned 200 and `/committee-questions/` returned the shared 404 page at `14:17:58Z` even though the route was present in the sitemap and navigation.

| Archetype             | Routes                                                                                                 | Count | Initial state  |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ----: | -------------- |
| Core                  | `/`, `/brief/`, `/signals/`, `/regulatory-horizon/`, `/archive/`, `/about/`                            |     6 | 200            |
| Signal topics         | `/signals/{ai,resilience,third-party,market-structure,financial-crime,cyber,technology-failure,data}/` |     8 | 200            |
| Committee Questions   | `/committee-questions/`                                                                                |     1 | 404 at capture |
| Brief archive         | `/archive/brief/`, `/archive/brief/2026-07-09/`, `/archive/brief/2026-07-08/`                          |     3 | 200            |
| Topic archive indexes | `/signals/{eight-topic-slugs}/archive/`                                                                |     8 | 200            |
| Topic dated archives  | `/signals/{eight-topic-slugs}/archive/{2026-07-09,2026-07-08}/`                                        |    16 | 200            |

Topic slugs are `ai`, `resilience`, `third-party`, `market-structure`, `financial-crime`, `cyber`, `technology-failure`, and `data`.

All nine `2026-07-09` archived pages were byte-identical to their current pages. The nine `2026-07-08` pages are distinct historical editions. Dated archives canonicalize to their current equivalents.

## Same-origin supporting routes

- `/regulatory-horizon/archive/2026-07-02.html` — standalone historical page, `noindex`.
- `/data/ai-signals.json` — 15 AI records.
- `/regulatory-horizon/latest.json` — hydrated horizon data.
- `/regulatory-horizon/feed.xml` and `/regulatory-horizon/feed.xsl` — RSS and browser stylesheet.
- `/regulatory-horizon/horizon.ics` — three calendar events.
- `/regulatory-horizon/index.html` — duplicate alias of the canonical horizon page.
- `/ai-signals/archive/` — 301 compatibility redirect to `/archive/`.
- `/robots.txt` and `/sitemap.xml`.

The reference also redirects `www` to the apex host, `/index.html` to `/`, and most top-level routes without trailing slashes to slash variants. Nested topic/archive no-slash URLs currently return duplicate 200 responses.

## Snapshot change boundary

`/committee-questions/` changed during reconnaissance: it was a 3,208-byte 404 at `14:17:58Z`, then returned a 10,584-byte 200 page at `14:20:47Z` without a sitemap checksum change. Stage A intentionally preserves the initial 404. The later editorial body is not mixed into this run.

## Coverage evidence

- Initial sitemap SHA-256: `759e4c3d7651f4dedc58b7a76af7690c0348d138eb120168e444099b17962082`.
- Every sitemap URL was linked by initial same-origin HTML.
- Initial HTML included 48 unique same-origin link destinations, 101 unique external HTTP(S) destinations across 184 label/URL pairs, and two `mailto:` pairs.
- External destinations were inventoried but not crawled.
