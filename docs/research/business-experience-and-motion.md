# Business experience and motion research

Status: lead-reviewed research gate passed on 11 July 2026. The selected direction is the Executive Decision Spine with an in-flow editorial-handoff signature; the evidence lens remains prototype-first for Signals.

Research capture: 11 July 2026, Europe/London. The St Georges Strategy live-site evidence was captured from the public site during this run. Repository evidence is from `upstream/Jonats@21c0b1a76d125e02e9c3ed38b9c00bae3fc8185a`.

## Decision to be made

The product should stop behaving like a long, evenly weighted page archive and become an executive decision journey. Its organising model is:

`Signal → Judgement → Board Question → Evidence Ask → Owner/Deadline → Archived Decision Trail`

Motion is useful only when it makes that conversion, its priority, or its chronology easier to understand. It is not a separate layer of decoration.

## Audience and business goals

The primary readers are Chief Risk, Operating, and Compliance Officers; operational-risk, cyber-resilience, AI-governance, technology-risk, third-party-risk, data-governance, and committee-preparation leaders.

The redesign must let a qualified reader:

1. identify the current judgement, why it matters, one board question, one evidence request, and the nearest relevant deadline within 30 seconds;
2. scan the eight intelligence streams and select the relevant dossier within two minutes;
3. move from a claim to its source and archived edition without losing context;
4. carry exact questions, evidence asks, owners, and dates into governance work;
5. understand why the publication is trustworthy without encountering invented proof or sales pressure.

The business proposition is the conversion from public information into executive action, not the volume of the news feed.

## Current-site friction map

| Friction                                                   | Evidence                                                                                                                                        | Business/user cost                                                          | Decision                                                                                                                          |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| The weekly decision is buried                              | On the captured Home page the first content band starts at 1,155px on desktop and 1,599px on mobile; the judgement follows the audience band    | A reader cannot understand the week's consequence in the first glance       | Put the week, judgement, board question, evidence ask, nearest deadline, and full-brief action in the executive-glance layer      |
| Mastheads monopolise the first viewport                    | Brief, Signals, and Horizon begin their actionable content below roughly 900px                                                                  | Strong identity delays utility                                              | Preserve editorial scale while letting the action summary enter the first viewport                                                |
| Long pages present most blocks at similar weight           | Captured Home is 7,945px and Brief 10,776px at desktop; on mobile Brief reaches 18,339px                                                        | Dense evidence becomes a scanning problem                                   | Support executive glance, committee preparation, and deep evidence as explicit reading depths                                     |
| The topic taxonomy is repeated                             | Signals presents the eight streams three times; Home presents them again                                                                        | Repetition makes the library feel larger without making it more legible     | Use one canonical stream map, one compact selector, and a separate chronological archive view                                     |
| Topic dossiers are dead ends                               | Seven of eight captured topic pages have no contextual internal links beyond global navigation                                                  | Readers cannot follow evidence to deadlines, editions, or related questions | Add deterministic links with visible reasons such as “same edition”, “explicit read-across”, or “previous edition”                |
| The archive stores pages but does not show evolution       | Nine cards repeat identical counts while the 8–9 July topic records contain meaningful additions/removals                                       | The stated value of archived judgement is hidden                            | Compare stable entity IDs and show added, removed, unchanged, and revised records without generating new editorial interpretation |
| The current motion is generic and sometimes harms audits   | A global observer applies opacity/translate reveals to unrelated blocks; baseline Axe scans catch translucent text and 14 of 22 E2E checks fail | Motion obscures content and carries no information                          | Replace selector-driven reveals with semantic, opt-in motion variants and keep content visible by default                         |
| The hero grid is ambient                                   | The 18-second loop does not correspond to sources, topics, decisions, or time                                                                   | Continuous work adds visual cost without meaning                            | Remove it; animate only explicit, source-backed relationships                                                                     |
| Mobile navigation wraps rather than discloses              | Captured mobile navigation occupies about 114px and wraps links                                                                                 | Orientation is weak and header cost is high                                 | Use an accessible menu plus contextual subnavigation and visible current location                                                 |
| Capture-time and current live Committee Questions conflict | The repository locks a 404, while the live route inspected on 11 July 2026 is a 200 page updated 9 July                                         | Silently choosing either edition would falsify provenance                   | Preserve the old 404 snapshot as evidence; migrate the newly observed live page as a separately dated, source-backed record       |
| Rendered pages and machine feeds disagree                  | Horizon page is dated 2 July with six signals; `latest.json` is dated 8 July with fifteen. AI page and feed overlap only partly                 | A merged model could publish unsupported relationships                      | Keep these as distinct captured editions until an explicit source-of-truth reconciliation is recorded                             |

### Evidence retained

Local browser evidence from the live public site:

- `output/research/live/home-1440x900.png`
- `output/research/live/home-390x844.png`
- `output/research/live/committee-questions-1440x900.png`
- `output/research/live/regulatory-horizon-1440x900.png`

These outputs are working evidence and are intentionally ignored by Git. Permanent implementation decisions are recorded in this document and in the route/content inventories.

## Direct website research

The full browser/runtime evidence is recorded in `docs/research/live-reference-matrix.md`. Awwwards was used only for discovery and provenance; every observation below comes from the actual production website. Fifteen confirmed Sites of the Day and two especially relevant nominees were inspected at desktop and mobile, with a deeper route or state for each.

| Actual live site                                                                         | Awwwards discovery URL                                                            | Page/state and observed mechanism                                              | Relevance/risk                                                                     | Decision                                          |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Vectr](https://www.vectrfl.com/)                                                        | [discovery](https://www.awwwards.com/sites/vectr)                                 | Home and Industries; 1,500ms hero, 300ms links, one pale operational canvas    | Strong system metaphor; slow/no reduced-motion fallback                            | **Adapt** hierarchy; static-first system map      |
| [21 Hrs on the Moon](https://www.21hrs.space/)                                           | [discovery](https://www.awwwards.com/sites/21-hrs-on-the-moon)                    | Hero, wheel transition, spatial overview; ~400ms state changes                 | Chronology becomes place, but 16 canvases and weak semantics                       | **Reject** as reading/navigation model            |
| [MONOLOG](https://bymonolog.com/)                                                        | [discovery](https://www.awwwards.com/sites/monolog)                               | Home and Work; 200–650ms controls, on-demand project media                     | Calm deep index transfers; cursor/sound/video volume does not                      | **Adapt** indexed library state                   |
| [Hildén & Kaira](https://www.hildenkaira.fi/)                                            | [discovery](https://www.awwwards.com/sites/hilden-kaira)                          | Home and Uusi Juttu case; 200–525ms transitions, time-windowed proof           | Result-to-method evidence is useful; 22–35 videos are not                          | **Adapt** evidence stack                          |
| [Radian](https://www.rideradian.com/)                                                    | [discovery](https://www.awwwards.com/sites/radian)                                | Home and technical specs; 150–600ms navigation, anchored categories            | Strong aspiration-to-verification handoff                                          | **Adopt** specification index                     |
| [Units](https://units.gr/en/homepage/)                                                   | [discovery](https://www.awwwards.com/sites/units)                                 | Home and Parkside; 700–1,000ms links, place-to-evidence sequence               | Useful chapter path; routine UI too slow and semantics weak                        | **Adapt** sequence; shorten controls              |
| [NRG Build Your Data Center](https://business.nrg.com/campaigns/build-your-data-center/) | [discovery](https://www.awwwards.com/sites/nrg-build-your-data-center)            | Enter gate and five-phase process; 200–300ms UI                                | Excellent process decomposition; gate hides content                                | **Adopt** phases; **reject** entry gate           |
| [Podium](https://podium.global/)                                                         | [discovery](https://www.awwwards.com/sites/podium)                                | Project index and Deviate; 520–1,050ms poster/media transitions                | Preview can explain evidence; touch/bandwidth costs                                | **Prototype-first** for a small poster-first grid |
| [Wolverine Worldwide](https://wolverineworldwide.com/)                                   | [discovery](https://www.awwwards.com/sites/wolverine-worldwide)                   | Home and Brands; 600ms fade, 800ms rise/scale, reduced-motion CSS              | Strong purpose → proof → portfolio sequence                                        | **Adopt** hierarchy; shorten reveals              |
| [Sui](https://www.sui.io/)                                                               | [discovery](https://www.awwwards.com/sites/sui)                                   | Home and Intro; 100–300ms links, architecture/benefit taxonomy                 | Good ontology; 15–33 canvases is indefensible for reading                          | **Adapt** taxonomy in HTML/SVG                    |
| [EverSwap](https://everswap.com/)                                                        | [discovery](https://www.awwwards.com/sites/everswap)                              | Landing and URL-less Flows state; 250ms fixed-page changes                     | One system diagram helps; state/navigation model does not                          | **Reject** navigation; retain diagram principle   |
| [Fauna Robotics](https://faunarobotics.com/)                                             | [discovery](https://www.awwwards.com/sites/fauna-robotics)                        | Home and Product; 200–350ms UI, capability demos                               | Claim → demonstration → technical detail transfers; 19–27 videos do not            | **Adapt** one opt-in demo per concept             |
| [Tresmares Capital](https://www.tresmarescapital.com/en/)                                | [discovery](https://www.awwwards.com/sites/tresmares-capital)                     | Home and Private Equity; 400–800ms restrained image/type movement              | Institutional restraint transfers; sparse facts/weak headings do not               | **Adapt** tone and routing                        |
| [Serve Robotics](https://www.serverobotics.com/)                                         | [discovery](https://www.awwwards.com/sites/serve-robotics)                        | Home and Data; 300ms line reveals, use-case/safeguard sequence                 | Strong input → decision → guardrail explanation; duplicate headings harm semantics | **Adopt** sequence; rebuild semantics             |
| [Depo Luxe](https://depoluxe.xyz/)                                                       | [discovery](https://www.awwwards.com/sites/depo-luxe)                             | Home and Archive; 200–300ms controls, fixed numbered catalogue                 | Numbered archive transfers; 82 videos/fixed mobile viewport do not                 | **Adapt** catalogue; reject media stack           |
| [AI in Design Report 2026](https://stateofaidesign.com/)                                 | [nominee discovery](https://www.awwwards.com/sites/ai-in-design-report-2026)      | Home and Tools chapter; explicit chapters, read time, methodology and findings | Excellent long-report architecture; loud art/no reduced-motion CSS                 | **Adopt** structure; adapt art direction          |
| [Boulder County Climate Guide](https://climateguide.bouldercounty.gov/)                  | [nominee discovery](https://www.awwwards.com/sites/boulder-county-climate-action) | Home and Heat Pumps; topic → opportunity → source → action/PDF                 | Strong public evidence pattern with reduced-motion CSS; some transitions too long  | **Adopt** evidence-page pattern                   |

Ten references were analysed in depth because their mechanisms transfer most directly:

1. **AI in Design Report:** finite chapter architecture, reading-time cue, methodology beside the first claim, and finding-led headings.
2. **Boulder County Climate Guide:** single-subject evidence pages that connect benefit, opportunity, source, implication, and printable action.
3. **Vectr:** one claim and one restrained system metaphor, useful only with accessible list parity and a static fallback.
4. **NRG:** named phases with inputs/checks/outputs, useful after removing the entry gate and scroll dependence.
5. **Wolverine Worldwide:** purpose → portfolio → report → market/news proof, using one reveal grammar rather than repeated tricks.
6. **Sui:** primitives mapped to benefits, rebuilt as semantic HTML/SVG rather than a canvas field.
7. **Hildén & Kaira:** outcome, period, evidence, and method kept together; number changes must retain textual context.
8. **Radian:** a visible section index turns aspiration into verifiable specifications without losing context.
9. **Tresmares Capital:** visual restraint and high-value routing fit the sector, but must not create factual emptiness.
10. **Serve Robotics Data:** input → transformation → decision → limitation/guardrail becomes the template for intelligence capabilities.

The full first-party institutional/product evidence is recorded in `docs/research/enterprise-reference-matrix.md`. It covers 15 organisations and 23 actual public pages/design-system references rather than screenshots or roundup commentary. The implementation-level synthesis is:

| Actual first-party reference                                                                               | State inspected                                                     | Adopt/adapt/reject for St Georges Strategy                                                                                  |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Apple Enterprise](https://www.apple.com/uk/business/enterprise/)                                          | opening promise, chapter links, long-form sections, service close   | **Adopt** one-idea chapters; **adapt** its spacious pacing to denser evidence; **reject** cinematic product staging         |
| [Stripe Enterprise](https://stripe.com/enterprise)                                                         | hero, in-page navigation, solution modules, proof, resources        | **Adopt** claim-to-proof adjacency and long-page navigation; **reject** repeated sales CTAs and unsupported metrics         |
| [IBM Carbon data-table guidance](https://carbondesignsystem.com/components/data-table/usage/)              | default/sortable/expandable usage and accessibility states          | **Adopt** state completeness, labels, keyboard operation, and compact evidence density; **adapt** the visual language       |
| [Material accessible design](https://m3.material.io/foundations/accessible-design/overview)                | system-level accessibility and motion foundations                   | **Adopt** semantic state transitions and focus/reduced-motion parity; **reject** recognisable Material styling              |
| [Bloomberg Commodities](https://www.bloomberg.com/markets/commodities)                                     | grouped tables, market navigation, freshness metadata, news modules | **Adopt** alignment, units, dates, and restrained separators; **reject** ticker urgency or implied real-time data           |
| [Financial Times](https://www.ft.com/)                                                                     | lead story, desks, metadata, skip link, most-read/labels            | **Adopt** kicker–headline–summary–metadata hierarchy; **adapt** to fewer, larger decision briefs                            |
| [McKinsey](https://www.mckinsey.com/)                                                                      | lead campaign, featured insights, services and close                | **Adopt** insight-led authority; **reject** generic transformation language and sprawling taxonomies                        |
| [BCG Publications](https://www.bcg.com/publications)                                                       | featured topics, recent feed, formats, collections                  | **Adopt** visible type/date metadata and curated collections; **reject** AI discovery as the primary path                   |
| [Deloitte Insights](https://www.deloitte.com/us/en/insights.html?site=global-en)                           | featured/latest/topic/sector rails and read-time labels             | **Adopt** commitment/format metadata; **reject** duplicative rails without clear editorial rules                            |
| [Accenture Insights](https://www.accenture.com/gb-en/insights)                                             | global wayfinding, country state, insight landing                   | **Adopt** clear distinctions between insight, service, sector, and firm; **reject** a mega-menu for this smaller corpus     |
| [BlackRock UK insights](https://www.blackrock.com/uk/professionals/solutions/investor-insights-and-trends) | audience context, dated thesis, sources, risk/legal close           | **Adopt** nearby dates/caveats and audience labels; **reject** unnecessary modal or legal gating                            |
| [J.P. Morgan Insights](https://www.jpmorgan.com/insights)                                                  | topic selector, feature, cards, client stories                      | **Adopt** stable category/date/format metadata and URL-addressable filters; **reject** vague link labels                    |
| [Goldman Sachs Insights](https://www.goldmansachs.com/insights/)                                           | latest feed, series, topics and formats                             | **Adopt** a small number of reliable recurring editorial products; **reject** series proliferation before cadence is proven |
| [Palantir Platforms](https://www.palantir.com/platforms/)                                                  | mission, operating model, deeper architecture/security path         | **Adopt** proposition → model → evidence → technical appendix; **reject** enigmatic names and grandiose voice               |
| [Linear Enterprise](https://linear.app/enterprise)                                                         | product proof, enterprise evidence, integration and trust paths     | **Adopt** showing real work and a separately inspectable trust model; **reject** faux UI and looping demos                  |

The lead reviewed both matrices. Their adopted mechanisms are represented in the design hypotheses and prototype comparison below; their rejected mechanisms are explicit in the anti-patterns and library decision.

## Authoritative UX and motion guidance

### Progressive disclosure and executive scanning

[NN/g Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/) recommends showing the few most important options first and exposing specialised detail on request. It also warns that the initial/secondary split and the information scent of the path between them must be correct. For this publication, the top level is not a teaser that withholds evidence: it is the complete decision summary, with the evidence trail and archive one explicit step deeper.

[NN/g's usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) require timely status, the reader's language, recognition over recall, consistency, and aesthetic focus. These principles change the implementation in five concrete ways:

- active topic, filter, archive position, and motion preference remain visible;
- familiar governance terms—question, evidence, owner, deadline—replace abstract interaction labels;
- provenance reasons are shown with links instead of asking readers to remember why items relate;
- repeated content uses stable interaction and visual contracts;
- decorative units must not compete with judgement or source evidence.

### Productive motion

[IBM Carbon Motion](https://carbondesignsystem.com/elements/motion/overview/) distinguishes productive everyday feedback from expressive moments and provides a useful restrained timing vocabulary. The project adapts Carbon's non-bouncy productive character and its 70/110/150/240/400/700ms scale, while reserving the 400–700ms range for rare orientation or convergence sequences. The exact Carbon visual language is not copied.

[Material 3 Motion](https://m3.material.io/styles/motion/overview/how-it-works) now describes standard and expressive spring systems. St Georges Strategy should adopt spatial continuity and size-aware pacing, but reject expressive bounce and overshoot: a governance publication benefits from the standard, functional character. Effects such as opacity should settle without overshoot.

[Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion) treats movement as purposeful and optional, asks that feedback be brief and precise, warns against repeated motion, and preserves a stable frame of reference. That maps to cancellable/no-wait interactions, a stable document layout, no forced intro, and a static equivalent for every signature sequence.

### Accessibility, platform control, and performance

[WCAG 2.2 Understanding Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) requires interaction-triggered motion to be disableable unless it is essential. The implementation will therefore provide both `prefers-reduced-motion` support and a persistent user-facing motion control if the signature experience remains materially animated.

[web.dev's animation performance guide](https://web.dev/articles/animations-guide) favours `transform` and `opacity`, recommends checking rendering cost in browser tooling, and cautions that `will-change` should be used sparingly. [web.dev's reduced-motion guidance](https://web.dev/articles/prefers-reduced-motion) supports designing an alternative rather than merely shortening a potentially harmful animation. Reduced mode will render complete, stable states with relationship labels and sequence numbers.

The [W3C Web Animations specification](https://www.w3.org/TR/web-animations-1/) supplies a controllable timing/effect model and APIs to inspect, pause, cancel, seek, and test animations. This supports CSS/Web Animations API as the first implementation choice for the signature handoff. It also gives the test suite a way to finish or seek animations rather than waiting on wall-clock delays.

## Transferable principles

1. **Decision before breadth.** State the current consequence before exposing the whole library.
2. **One visual movement, one semantic claim.** A line, handoff, highlight, or transition must correspond to an explicit relationship or state.
3. **Progressive disclosure preserves, not hides.** Summary, preparation, and evidence remain server-rendered, navigable, and linkable.
4. **Continuity beats spectacle.** Keep source, topic, judgement, question, and evidence visible as the active stage changes.
5. **Productive by default, expressive by exception.** Most feedback completes in 70–240ms; only orientation and convergence may use 400–700ms choreography.
6. **Stable documents establish trust.** No scroll hijacking, horizontal traps, layout-shifting entrances, or delayed navigation.
7. **Data geometry must be truthful.** Do not draw a relationship unless the content model records its provenance.
8. **Motion and focus are peers.** Hover, focus, tap, scroll, and reduced-motion paths reach the same state and expose the same explanation.
9. **Chronology should be legible.** Archive and deadline motion encode earlier/later/current, not generic parallax.
10. **Stop work when it stops communicating.** No continuous offscreen animation; pause when hidden and avoid idle loops.
11. **Editorial density needs rhythm.** Alternate expansive judgement moments with compact evidence tables/lists instead of making every item a card.
12. **Trust sits beside the claim.** Source class, date, provenance, and archive context appear at the point of judgement rather than only in the footer.

## Anti-patterns rejected

- copying an Awwwards winner's branding, media, layout, or choreography;
- pinned scroll stories that make the user wait for the next fact;
- cursor followers, smooth-scroll substitution, scroll locking, and horizontal narrative traps;
- ambient grids, particles, or connection lines that imply relationships absent from the content;
- a homepage-first network map that delays the current judgement;
- blanket fade-and-rise selectors or hiding content until JavaScript runs;
- springy/bouncy motion, neon/glass styling, fake dashboards, and invented charts;
- motion-only state, hover-only disclosure, and tiny mobile graphs;
- performance claims inferred from desktop alone;
- silently combining inconsistent page/feed editions.

## Proposed narrative architecture

### Homepage: Executive Decision Spine

1. **Orientation:** week, product promise, and a direct route to the current brief.
2. **Executive glance:** exact judgement, why it matters, board question, evidence ask, nearest deadline.
3. **Signature translation:** public sources become eight streams, a pattern, judgement, question, and evidence request.
4. **Current Top 5:** ranked evidence with topic/source/date and one-line implication.
5. **Eight-stream map:** one canonical relationship surface with role entry points.
6. **Reg Horizon:** next meaningful dates, ownership prompts, and expected evidence.
7. **Role routes:** deterministic starting points grounded in each topic's approved “Who cares” content.
8. **How it is used:** committee prep, horizon scanning, control challenge, evidence planning.
9. **Trust:** source hierarchy, archive discipline, methodology, author, disclaimer.
10. **Next action:** Brief, Signals, Horizon, Archive, About/contact.

The recurring vertical spine and labels make these one journey rather than ten independent sections.

### Reading depths

| Depth                 | Required content                                                                       | Interaction                                   |
| --------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- |
| Executive glance      | judgement, why it matters, question, evidence ask, deadline, next action               | directly visible and linkable                 |
| Committee preparation | ranked signals, affected roles/functions, source classification, owners, related dates | semantic disclosure and contextual navigation |
| Evidence review       | full explanation, source trail, supporting signals, history, related topics            | dedicated routes and archive URLs             |

### Page archetypes

- Home: executive overview and signature translation.
- Weekly Brief: edition masthead, executive-summary rail, reading progress, Top 5, failure patterns, questions, and sources.
- Signals index: canonical stream map plus accessible filter/search over real typed content.
- Topic dossier: judgement, audience, ranked signals, evidence asks, sources, related deadlines, and edition history.
- Reg Horizon: date/owner/evidence timeline with semantic upcoming/current/past states.
- Committee Questions: portable question library using the separately captured live content, linked back to originating records.
- Archive: date/topic exploration plus deterministic changes between editions.
- About: methodology, source hierarchy, author authority, disclaimer, and contact.
- 404: useful recovery into current Brief, Signals, Horizon, and Archive.

## Proposed interaction and motion grammar

| Family           | Meaning                                         | Trigger                             | Full-motion treatment                                                 | Reduced/static treatment                      |
| ---------------- | ----------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------- | --------------------------------------------- |
| Orientation      | establishes reading order                       | first entry                         | short eyebrow/headline/support stagger; stable end state              | all content visible immediately               |
| Signal emergence | connects provenance to implication              | section entry or explicit selection | source/date/topic appears, then the implication receives emphasis     | bordered, numbered source-to-implication pair |
| Convergence      | multiple explicit signals support one judgement | signature section progress          | restrained path/line resolves into the judgement                      | labelled “supports” links in static sequence  |
| Translation      | consequence becomes governance action           | scroll into or focus stage          | adjacent handoff between judgement, question, evidence, owner/date    | ordered list with relationship verbs          |
| Priority         | communicates Top 5 order                        | first entry                         | 60–90ms stagger without blocking access                               | immediate ranked list                         |
| Relationship     | shows exact topic/content links                 | hover, focus, or tap                | state-driven highlight and path emphasis                              | same labels and selected state, no travel     |
| Time             | earlier/current/upcoming                        | timeline entry or filter            | progressive line and current marker                                   | semantic ordered timeline                     |
| Continuity       | preserves route/page context                    | navigation                          | shared shell state and subtle content fade/translate if platform-safe | immediate navigation                          |
| Feedback         | confirms controls and links                     | hover/focus/tap/change              | 70–150ms underline, border, icon, or background response              | colour/border/focus change without travel     |
| Reading progress | location in long editorial page                 | scroll                              | compositor-safe progress scale                                        | optional static section navigation only       |
| Archive depth    | current versus history                          | edition change                      | directional, brief transition with dates fixed                        | immediate content swap with live status text  |

### Signature homepage prototype

`Public Sources → Eight Signal Streams → This Week's Pattern → Executive Judgement → Board Question → Evidence Ask`

The recommended form is an in-flow editorial handoff:

- every stage exists in semantic DOM order and is readable before enhancement;
- an SVG/CSS path draws only between provenance-backed stages;
- completed stages compress visually but remain available;
- scroll, focus, and tap reach the same stable stage;
- the section never pins, locks, or delays navigation;
- the reduced version is a complete numbered sequence;
- owner/deadline and archive continue immediately after the core six stages.

The rejected alternative is an “Intelligence Observatory” network as the Home opener. It is more suitable as a state-driven Signals exploration surface because it adds choice before orientation, is harder to explain on mobile, and risks unsupported geometry.

### Prototype comparison

Both narrative and motion directions use the captured week-of-6-July content, including the exact AI/cyber judgement, “Can we stop an agent quickly…” board question, inventory/permissions/kill-switch/fallback evidence ask, five ranked signals, eight streams, and 14 August owner deadline.

| Direction                             | 30-second clarity                                                        | Credibility                                                 | Accessibility/mobile                                       | Performance                                               | Decision                                  |
| ------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| Homepage A — Executive Decision Spine | High: conclusion and action precede breadth                              | High: claim/source/action stay adjacent                     | Strong: natural document order and simple list fallback    | Strong: no graph needed for orientation                   | **Select** for Home                       |
| Homepage B — Intelligence Observatory | Medium: readers must choose a stream before seeing the weekly conclusion | Medium: relationship map can imply unsupported completeness | Risky: dense focus/tap graph becomes a long mobile control | Medium: connection layout and interaction add client work | **Adapt** as a secondary Signals surface  |
| Motion 1 — Editorial handoff          | High: movement follows source → consequence → governance action          | High: each motion has an explicit relationship verb         | Strong: ordered static fallback is equivalent              | Strong: CSS/WAAPI/SVG, no pinning                         | **Select** as signature Home/Brief motion |
| Motion 2 — Evidence lens              | Medium as a passive story; high for deliberate exploration               | High only when every highlighted edge has provenance        | Good with focus/tap and list/accordion mobile variant      | Medium: state/path computation needs profiling            | **Prototype first** on Signals, not Home  |

The prototype gate is therefore not a vote for “more motion”. It selects the least complex direction that communicates the conversion model and reserves the more interactive lens for the one surface where comparison is the user's task.

## Library decision

Prototype with CSS and Web Animations API first. They cover composited transitions, explicit playback lifecycle, cancellation, and reduced-motion without adding client weight.

Do not add Motion, GSAP, Lenis, or a 3D/media runtime during the first prototype. Reconsider Motion only if shared layout/route continuity becomes substantially simpler and measurable. Reconsider GSAP only if the approved signature timeline cannot be made deterministic and testable with the platform. Lenis and 3D runtimes are currently rejected because native scrolling and semantic SVG/CSS can express the chosen experience.

## Performance and accessibility contract

- Content is visible, ordered, and navigable before JavaScript.
- Essential links and controls never wait for an animation.
- Full and reduced modes expose identical facts, labels, controls, and URLs.
- Interaction feedback begins within 200ms; exits are shorter than entrances.
- Most transitions use `transform` and `opacity`; paint/layout-heavy properties need measured justification.
- No layout shift is introduced by entrance states.
- Observers/animations disconnect on cleanup; no persistent offscreen work.
- The page stops non-essential animation while hidden.
- Keyboard, focus, touch, zoom/reflow, and screen-reader announcements are verified per family.
- Animation APIs are seekable/finishable in tests.
- Performance is profiled at 1440, 1280, 768, 390, and 320px, including representative mobile emulation.

## Explicit design hypotheses

1. At 1440×900, the week, current judgement, board question, evidence ask, nearest deadline, and full-brief action can be found without passing two content sections.
2. At 390×844, the same executive-glance content is reachable within two screens.
3. In a 30-second comprehension check, a reader can answer what changed, why it matters, what to ask, and what evidence to request.
4. In under two minutes, a reader can name the eight streams and reach the relevant topic for their role.
5. Every displayed relationship has a visible provenance reason and a typed relationship record.
6. The signature sequence remains completely understandable with JavaScript disabled and in reduced-motion mode.
7. The signature sequence produces no continuous offscreen work, layout shift, or invented data geometry.
8. Feedback begins within 200ms and composed entrances settle in approximately 450–700ms.
9. A topic dossier exposes its originating edition, source trail, archive path, and only explicitly supported related content.
10. Archive comparison makes change visible without generating a new editorial conclusion.

## Decisions that change implementation

1. Preserve snapshots as evidence/fixtures, but migrate production routes to typed entities and server components.
2. Model conflicting captured pages/feeds as separate editions; do not create a synthetic “latest”.
3. Build the Executive Decision Spine, not the Observatory, as the Home direction.
4. Prototype the editorial handoff on Home and the evidence lens on Signals; mobile evidence lens becomes a list/accordion.
5. Define relationships and provenance before drawing paths or recommendations.
6. Use one canonical topic map and remove repeated taxonomy presentations.
7. Use meaning-specific components rather than a universal card or global reveal selector.
8. Use CSS/WAAPI first and document any later dependency against measurable gaps.
9. Implement reduced motion as a designed static experience plus a user preference when significant motion ships.
10. Add parity tests for text, links, dates, headings, sources, disclaimers, and metadata before retiring any raw route.
11. Restore deployment only after an explicit Next.js-to-Cloudflare adapter decision and clean CI contract.
12. Treat current Committee Questions as new dated content while retaining the capture-time 404 fixture.

## Research gate — passed

- `docs/research/live-reference-matrix.md` contains 15 confirmed SOTD sites, two relevant nominees, and ten deep analyses.
- `docs/research/enterprise-reference-matrix.md` contains 15 organisations and 23 first-party URLs.
- The adopted/rejected mechanisms are reconciled with the principles, prototype comparison, library decision, and implementation changes above.
- The lead selects the Executive Decision Spine for Home and the editorial handoff as its signature motion.
- The evidence lens is prototype-first for Signals, not a competing Home direction.
- No unresolved finding contradicts the selected direction. The next gate is low-fidelity/prototype comparison with real content, accessibility, mobile, and performance evidence.
