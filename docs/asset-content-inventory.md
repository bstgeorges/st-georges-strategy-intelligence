# Reference asset and content inventory

## Content archetypes

- Home: editorial hero, audience/use-case bands, current Top 5, eight signal streams, horizon summary, method cards.
- Weekly Brief: one long-form current edition plus two dated editions.
- Signals library: eight topic streams and hydrated Horizon themes.
- Signal topic: five-item leadership shortlist, ranks 06–10, three editorial judgement cards, five evidence prompts, sources, and archive links.
- Reg Horizon: hydrated KPI summary, deadlines, ranked signals, themes, evidence, RSS/calendar links.
- Archive: central hub, one brief index, and eight topic indexes.
- About: concept, method, author, contact, and intact disclaimer.
- 404: shared branded error with Home and Weekly Brief links.

Recurring editorial content is stored independently from the renderer as validated page snapshots. Machine-readable AI and horizon records remain separate public data sources.

## Visual assets

The initial pages referenced no successful same-origin photography or icon assets. The wordmark is styled text.

- `/styles.css`: 22,458 bytes, SHA-256 `5e3374875a124784774d181c4d79f18083fac2a2cbc61a0fb53678a30ae1c36b`.
- `/dashboard/assets/financial-services-intelligence-hero.webp`: 404 at capture; used by the home image and all OG image tags.
- `/assets/favicon.svg`: 404 at capture; referenced only by the shared 404 page.

The broken hero is a material part of the initial snapshot: Stage A renders the deep navy gradient and preserves the failed image URL rather than inventing imagery. Stage B may add code-native abstract depth without changing editorial claims.

## Fonts

The reference Google Fonts request loads:

- Hanken Grotesk 400/500/600/700.
- JetBrains Mono 400/500/600.
- Playfair Display normal 400/600/700 and italic 400.

## Dynamic assets

Current copies were fetched at `2026-07-10T14:29:41–42Z`; their byte counts match the earlier observations, although initial bodies were not saved and therefore cannot be proven byte-identical.

| Asset | Bytes | SHA-256 |
| --- | ---: | --- |
| `signals/signals-horizon.js` | 2,402 | `08df8c894a72c6033b20f1e71e9e1983dc7bb83fdc4f353f8faec3f47b063a57` |
| `regulatory-horizon/horizon-render.js` | 9,283 | `dbf4fefab91c042269516cb99d050d15b66e5cf18841d10a27606c7361c75fe1` |
| `data/ai-signals.json` | 11,224 | `dba24549d76f233549c096e66cee2c11dbd7c4d1e8ff7b9aa23db57cffe377b8` |
| `regulatory-horizon/latest.json` | 10,410 | `e989b716bab26276a473221b9c285ce607049a0a396538b37a6336a1abfcf1d6` |
| `regulatory-horizon/feed.xml` | 7,632 | `2f1f0347f063a106f8ac9d494b9407488b33ac85e68e85d4c1bc69017fa4d5d4` |
| `regulatory-horizon/horizon.ics` | 1,893 | `855a432b2e26fa89df3965bc3337bb9146ac60266d790ae5fc10d7fcba3f305d` |
| `regulatory-horizon/feed.xsl` | 2,261 | `262bb1bb6a2b3eb75370fcf370919a7cac85eee777fe240d9c70aef9aac1150a` |

## Known source inconsistencies

- Horizon static fallback says edition `2026-07-02`, six material signals, three active themes, and a 14 August deadline.
- Hydrated JSON says edition `2026-07-08`, delivers ten signal objects and three deadlines, while its KPIs claim 15 signals, five of eight themes, and nine sources.
- The live 768px Horizon layout creates multi-thousand-pixel timeline gaps. It is documented as a source defect and will not be carried into the accessible enhanced state.

