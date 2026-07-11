# Live reference matrix: motion for a serious intelligence experience

Research date: 11 July 2026  
Scope: live, first-party pages only. No proprietary code, imagery, typefaces, or media were copied.

## Method and evidence standard

- Discovery began at the [Awwwards Animation directory](https://www.awwwards.com/websites/animation/). The directory's own **Awards → Sites of the Day** link was then used to restrict the primary comparison set to confirmed SOTD records. Each Awwwards detail URL below was used only to resolve the production site; analysis happened on the live production site.
- Each of the 15 SOTD sites was opened directly at desktop width (1440 × 1000), then taken to a deeper route or a materially different state. Mobile was checked at 390 × 844. Two unusually relevant Awwwards nominees—the AI in Design Report and Boulder County Climate Guide—were also inspected deeply and are labelled as nominees, not winners.
- Observations include redirect/final URL, semantic headings and controls, visible hierarchy, media/canvas/SVG presence, responsive overflow, Web Animations API timings, computed CSS transition timing, and the presence of `prefers-reduced-motion` rules. A CSS media query is only evidence that a fallback was authored somewhere, not proof that every motion path respects it.
- Resource and media counts are directional snapshots from a single WebKit session, not Lighthouse results. Zero decoded bytes sometimes means cross-origin transfer sizes were not exposed. “Travel” is a visual estimate from before/after states unless an API exposed the transform directly.
- Sites that blocked or stalled were not retried. The only material blocker was BlackRock's deeper Insights route; its live UK homepage remained accessible and is included in the institutional benchmark section.

## Executive conclusions

1. **The best serious motion explains structure.** Useful examples move a reader from claim → evidence → implication, or from system → component → detail. Motion that merely proves production value becomes a credibility cost in an intelligence product.
2. **Use two tempo bands.** Interface feedback belongs around **150–300 ms**; section or evidence reveals around **400–800 ms**. The slowest credible observed hero reveal was Vectr's **1,500 ms** `cubic-bezier(0.16, 1, 0.3, 1)` entrance. Longer effects should be ambient and non-blocking.
3. **Prefer short, bounded travel.** For text and evidence cards, prototype **12–24 px** vertical travel or **3–6%** image scale; avoid the large camera journeys and persistent parallax used by 21 Hrs, EverSwap, and high-cinema portfolios.
4. **Data-rich pages need stable reading anchors.** Sticky chapter labels, progress, filters, methodology, source links, and section indexes increase trust. Full-screen scroll capture, duplicated marquee text, or hidden page semantics work against it.
5. **Reduced motion must be a release gate.** Only 8 of the 17 Awwwards-derived sites exposed reduced-motion CSS on at least one inspected route, and some were inconsistent between homepage and deeper pages. Continuous canvas/video motion should have a static equivalent and no content should depend on scrubbing.
6. **Performance restraint is part of authority.** The strongest institutional references generally used zero or one canvas. Contrast: 21 Hrs exposed 16 canvases, Sui's deeper mobile page 33, Fauna's product page 12 canvases plus 19 videos, and Depo Luxe's archive 82 video elements.

## Decision vocabulary

- **Adopt** — suitable as a default principle, implemented in our own system.
- **Adapt** — useful pattern, but reduce spectacle, duration, density, or interaction burden.
- **Prototype-first** — potentially valuable but requires mobile, keyboard, reduced-motion, and performance proof before commitment.
- **Reject** — conflicts with authority, accessibility, comprehension, or performance goals.

## Fifteen directly inspected Awwwards SOTD sites

| Site and live final URL                                                                                                    | Awwwards discovery record                                                           | States inspected                                                                                                        | Motion evidence and narrative role                                                                                                                                                                                                                                                      | Costs / cautions                                                                                                                                                                                                                                 | Decision                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vectr** — [www.vectrfl.com](https://www.vectrfl.com/)                                                                    | [Awwwards: Vectr](https://www.awwwards.com/sites/vectr)                             | Homepage; [Industries](https://www.vectrfl.com/industries); desktop and mobile                                          | Hero title/subtitle/CTA entrance: **1,500 ms**, `cubic-bezier(0.16,1,0.3,1)`; header **1,200 ms**; ordinary links **300 ms**. One canvas supports a pale, low-contrast operational world. Motion frames staffing as a system, not a gallery. Estimated reveal travel: roughly 20–40 px. | No reduced-motion rule detected. The almost-white 3D field risks weak contrast and adds GPU cost to a simple claim.                                                                                                                              | **Adapt**: adopt claim-first hierarchy and system metaphor; shorten first reveal to 700–900 ms and provide static art.                                    |
| **21 Hrs on the Moon** — [www.21hrs.space](https://www.21hrs.space/)                                                       | [Awwwards: 21 Hrs on the Moon](https://www.awwwards.com/sites/21-hrs-on-the-moon)   | Landing hero; wheel-triggered transition to [/overview/](https://www.21hrs.space/overview/); lunar map state; mobile    | Wheel input makes the lunar horizon rise to fill the viewport, then changes route/state into a spatial evidence map. Repeated UI transitions are about **400 ms linear**; local dividers use **300 ms** `cubic-bezier(0.61,1,0.88,1)`. The motion converts chronology into place.       | 16 canvases, ~175 SVGs, 231 sampled resources, ~17.6 MB decoded in-session; no meaningful heading/link semantics in the snapshot; no reduced-motion rule detected. On mobile, the map remains a fixed 390 × 844 canvas-like viewport.            | **Reject** as a core reading model. **Prototype-first** only for an optional standalone explainer with a non-spatial index.                               |
| **MONOLOG** — [bymonolog.com](https://bymonolog.com/)                                                                      | [Awwwards: MONOLOG](https://www.awwwards.com/sites/monolog)                         | Homepage; [Work](https://bymonolog.com/work); desktop and mobile                                                        | Cursor/controls use **200–650 ms** transitions; recurring ease is `cubic-bezier(0.16,1,0.3,1)`. One 500 ms linear grain animation adds materiality. Project media appears on demand and the deeper route becomes a quieter index.                                                       | Homepage contained 9 videos and 3 canvases; no reduced-motion rule detected; sound control and custom cursor are unnecessary for an intelligence product.                                                                                        | **Adapt**: use the calmer indexed work state as a model for evidence libraries; reject cursor, sound, and grain.                                          |
| **Hildén & Kaira** — [hildenkaira.fi](https://www.hildenkaira.fi/)                                                         | [Awwwards: Hildén & Kaira](https://www.awwwards.com/sites/hilden-kaira)             | Homepage; [Uusi Juttu case](https://www.hildenkaira.fi/work/uusi-juttu); desktop and mobile                             | Buttons/backgrounds use **200–525 ms**, often `cubic-bezier(0.625,0.05,0,1)`. The case page combines testimonial, time-window controls, outcome statements, and content-format evidence, so motion advances proof rather than decoration.                                               | Homepage exposed 35 videos; case route 22. No reduced-motion rule detected. Several form-success headings exist in the DOM before interaction, weakening semantic clarity.                                                                       | **Adapt**: adopt the evidence stack and time-windowed outcomes; replace most video with posters or click-to-play.                                         |
| **Radian** — [rideradian.com](https://www.rideradian.com/)                                                                 | [Awwwards: Radian](https://www.awwwards.com/sites/radian)                           | Homepage; [EXR technical specs](https://www.rideradian.com/exr/specs); desktop and mobile                               | Navigation **150–600 ms**; spec-section movement **350 ms** `cubic-bezier(0.22,1,0.36,1)` and icon movement **450 ms** `cubic-bezier(0.625,0.05,0,1)`. The technical route uses a stable category index to convert product drama into scannable facts.                                  | Eight videos and a canvas on home, four videos in specs; no reduced-motion rule detected. Product cinema can overshadow specifications if repeated.                                                                                              | **Adopt** the anchored specification index and topic-to-detail rhythm; **adapt** media to one purposeful demonstration per concept.                       |
| **Units** — [units.gr/en/homepage](https://units.gr/en/homepage/)                                                          | [Awwwards: Units](https://www.awwwards.com/sites/units)                             | Homepage; [Units Parkside](https://units.gr/en/unit/units-parkside/); desktop and mobile                                | Header and core links use **700–1,000 ms** `cubic-bezier(0.19,1,0.22,1)`; carousel about **500–800 ms**. The deeper page maps benefits, location, and booking into one narrative.                                                                                                       | Home exposed reduced-motion CSS but the deep route did not in the sampled styles. Deep page lacked H1/H2 semantics. Several 700 ms link effects are slow for routine UI.                                                                         | **Adapt** the place → evidence → action sequence; reduce UI timing to 180–250 ms and repair headings.                                                     |
| **NRG — Build Your Data Center** — [business.nrg.com campaign](https://business.nrg.com/campaigns/build-your-data-center/) | [Awwwards: NRG](https://www.awwwards.com/sites/nrg-build-your-data-center)          | Loader/“Enter Site”; hero; Phase 1 Site Evaluation state; mobile                                                        | The explicit entry reveals a five-phase model. Phase 1 decomposes readiness into resources, coordination, land/environment, and named subchecks. Routine UI is **200–300 ms**; reduced-motion CSS is present. Scroll is used as a staged build-process explanation.                     | Entry gate delays content and initially hides a substantial already-rendered document. Five videos plus a canvas. Scroll-capture must not be the only route between phases.                                                                      | **Adopt** the phased operating model and named subchecks; remove the entry gate and expose an always-available phase index.                               |
| **Podium** — [podium.global](https://podium.global/)                                                                       | [Awwwards: Podium](https://www.awwwards.com/sites/podium)                           | Homepage project index; [Deviate project](https://podium.global/projects/deviate); desktop and mobile                   | Project previews use **520 ms** exposure and **580/1,050 ms** video/image transforms with `cubic-bezier(0.16,1,0.3,1)`. Motion answers “what is this project?” at hover; the case page limits itself to play/mute/fullscreen controls.                                                  | 27 videos on the index; no reduced-motion rule detected. Hover previews have little value on touch and create bandwidth risk.                                                                                                                    | **Adapt** hover-to-preview only for a small, curated evidence grid with poster-first loading; do not use for article lists.                               |
| **Wolverine Worldwide** — [wolverineworldwide.com](https://wolverineworldwide.com/)                                        | [Awwwards: Wolverine Worldwide](https://www.awwwards.com/sites/wolverine-worldwide) | Homepage; [Brands](https://wolverineworldwide.com/brands); desktop and mobile                                           | Scroll reveals: **600 ms** `cubic-bezier(0.215,0.61,0.355,1)` fade and **800 ms** `cubic-bezier(0.19,1,0.22,1)` rise/scale. Motion leads from corporate purpose to portfolio, annual report, market snapshot, and news. Reduced-motion CSS present.                                     | Autoplay hero video is powerful but competes with the annual-report card. Brands page is very long on mobile (~12,576 px).                                                                                                                       | **Adopt** the purpose → proof → portfolio → report/news hierarchy and restrained reveals. Use a static hero or user-controlled video.                     |
| **Sui** — [sui.io](https://www.sui.io/)                                                                                    | [Awwwards: Sui](https://www.awwwards.com/sites/sui)                                 | Homepage; [Intro to Sui](https://www.sui.io/intro-to-sui); desktop and mobile                                           | Home uses **100–300 ms** link/description changes and reduced-motion CSS. The architecture page maps platform primitives to benefits and uses visual system diagrams as connective tissue.                                                                                              | Home had 15 canvases/346 SVGs/179 resources; the deep mobile route exposed 33 canvases and no reduced-motion rule in sampled styles. Duplicate H1 on home.                                                                                       | **Adapt** its “stack primitive → user benefit → industry outcome” taxonomy; reject canvas-heavy delivery for ordinary diagrams.                           |
| **EverSwap** — [everswap.com](https://everswap.com/)                                                                       | [Awwwards: EverSwap](https://www.awwwards.com/sites/everswap)                       | Landing; navigation-driven “Flows” state; mobile                                                                        | Fixed-page chapter navigation changes the rendered section without conventional scroll/URL state. Most controls use **250 ms ease-in-out/ease-out**. Motion explains liquidity flowing through one pool and different participant roles.                                                | Six canvases, ~7.6 MB decoded, no H1, no internal page routes, no reduced-motion rule. The state change did not create a deep link; mobile remained a fixed-height 390 × 844 experience. “Launch app” is still “coming soon,” a credibility gap. | **Reject** as navigation. Retain only the idea of one shared system diagram, built as accessible SVG/HTML with deep links.                                |
| **Fauna Robotics** — [faunarobotics.com](https://faunarobotics.com/)                                                       | [Awwwards: Fauna Robotics](https://www.awwwards.com/sites/fauna-robotics)           | Homepage; [Product](https://faunarobotics.com/product); desktop and mobile                                              | Routine navigation is **200–350 ms** with `cubic-bezier(0.25,0.46,0.45,0.94)`. The product page pairs capability labels with visible demonstrations, moving from promise to locomotion, teleoperation, autonomy, social behaviour, and safety.                                          | Home: 27 videos/9 canvases. Product mobile: 19 videos/12 canvases. No reduced-motion rule detected. The abundance of demos makes the page expensive and repetitive.                                                                              | **Adapt** capability → demonstration → technical detail, but cap at one user-initiated demo per capability and provide transcripts/stills.                |
| **Tresmares Capital** — [tresmarescapital.com/en](https://www.tresmarescapital.com/en/)                                    | [Awwwards: Tresmares Capital](https://www.awwwards.com/sites/tresmares-capital)     | Homepage; [Private Equity](https://www.tresmarescapital.com/en/financial-solutions/private-equity/); desktop and mobile | Header/images use **400–600 ms** `cubic-bezier(0.5,1,0.89,1)`; selected image movement reaches **800 ms**, with a 4 s non-blocking image transition. Reduced-motion CSS present. Sparse visual field signals selectivity and routes directly to solutions, portfolio, team, investors.  | Homepage document title was empty in the live session; deep page title was only “» Private Equity”; deep page lacked semantic H1/H2. Excess whitespace can conceal decision-useful facts.                                                        | **Adapt** its restraint, strong typographic scale, and investor routing; add clear proposition, proof metrics, descriptive titles, and semantic headings. |
| **Serve Robotics** — [serverobotics.com](https://www.serverobotics.com/)                                                   | [Awwwards: Serve Robotics](https://www.awwwards.com/sites/serve-robotics)           | Homepage; [Data](https://www.serverobotics.com/data/); desktop and mobile                                               | Navigation uses **400 ms** standard easing; data-page word/line reveals use **300 ms ease-in-out**. The deeper route converts a broad robotics claim into street-condition reporting, accessibility checks, infrastructure alerts, mapping, and safety/ethics.                          | No reduced-motion rule detected. Duplicate marquee text appears inside H1/H2 strings, which is hostile to screen readers and search. Five home videos and two canvases.                                                                          | **Adopt** the capability → use case → safeguards sequence; implement one semantic copy of every heading and hide decorative duplicates.                   |
| **Depo Luxe** — [depoluxe.xyz](https://depoluxe.xyz/)                                                                      | [Awwwards: Depo Luxe](https://www.awwwards.com/sites/depo-luxe)                     | Homepage; [Archive](https://depoluxe.xyz/archive/); desktop and mobile                                                  | Controls are a restrained **200–300 ms ease-out**. The archive converts cinematic work into a fixed, numbered catalogue.                                                                                                                                                                | Archive exposed **82 video elements**, two canvases, a fixed 844 px mobile viewport, and no reduced-motion rule. The catalogue is visually efficient but technically extravagant.                                                                | **Reject** the media implementation. **Adapt** the numbered editorial archive with still images and opt-in playback.                                      |

## Two highly relevant Awwwards nominees

These were selected from the same Animation directory because their subject matter is unusually close to an intelligence and institutional brief. They are not counted among the 15 SOTD sites.

| Site                                                                                                                                                                                     | Discovery record                                                                 | Why it matters                                                                                                                                                                                                                  | Verdict                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **AI in Design Report 2026** — [stateofaidesign.com](https://stateofaidesign.com/) and [Tools chapter](https://stateofaidesign.com/chapters/tools)                                       | [Awwwards nominee](https://www.awwwards.com/sites/ai-in-design-report-2026)      | A 32,944 px mobile chapter remains navigable because chapter, reading-time, methodology, finding headlines, and cases are explicit. Six videos on home, three on the Tools chapter; no canvas. No reduced-motion rule detected. | **Adopt** its report architecture; **adapt** its aggressive colour/image treatment and correct duplicated home H1.                     |
| **Boulder County Climate Action Guide** — [climateguide.bouldercounty.gov](https://climateguide.bouldercounty.gov/) and [Heat Pumps](https://climateguide.bouldercounty.gov/heat-pumps/) | [Awwwards nominee](https://www.awwwards.com/sites/boulder-county-climate-action) | Public-sector topic cards lead to evidence pages with opportunity, source attribution, share/PDF actions, bilingual access, and “learn more.” No video/canvas; reduced-motion CSS present.                                      | **Adopt** the public evidence pattern. Repair duplicated animated intro text in the H1 and shorten the 1–3 s header/image transitions. |

## Ten deep analyses for a serious editorial/data-rich/B2B product

### 1. AI in Design Report 2026 — adopt report architecture

**Observed:** The homepage moves from a clear thesis to numbered chapters (Tools, Craft, Teams). The Tools route adds a chapter label, a 25-minute reading-time cue, finding-led headings, methodology access, and named case-study slots. The live mobile page was long but did not overflow horizontally.

**Narrative purpose:** It makes a research report feel finite and navigable. Each motion/content shift signals a change in argument level rather than a new visual trick.

**Transfer:** Use persistent chapter position, reading time, short finding headlines, a methodology link near the first claim, and case studies as evidence—not as a separate marketing carousel. Animate chapter transitions with a 400–600 ms colour/position change; keep paragraph reading static.

**Costs:** No sampled reduced-motion rule. Home exposed duplicate H1 content. The visual language is intentionally loud; an institutional intelligence product should reduce saturation and image noise.

**Decision:** **Adopt** structure; **adapt** art direction.

### 2. Boulder County Climate Guide — adopt action-oriented evidence pages

**Observed:** Topic cards on the home state open directly into single-subject routes. Heat Pumps combines a concrete benefit statement, human image, “The Opportunity,” source attribution, share and PDF actions, “Learn More,” a skip link, and bilingual controls. Reduced-motion CSS was present; zero video/canvas.

**Narrative purpose:** It turns a large policy problem into bounded, answerable actions while retaining the institution and sources behind each claim.

**Transfer:** Create a reusable evidence-page template: topic → why now → quantified opportunity → source → implication → action/download. Use a 300–500 ms reveal only between these layers. Preserve a text-first layout and a print/PDF route.

**Costs:** The animated home intro duplicated words in its semantic H1. Header transitions reached 3 s on home and 1 s on the article—too slow for repeated navigation.

**Decision:** **Adopt**, with semantic and timing repair.

### 3. Vectr — adapt the operational-system metaphor

**Observed:** A sparse hero presents one large claim, one operational explanation, two high-intent actions, and a single canvas-based world. The Industries route replaces the canvas with a long, conventional document and mobile menu. Hero elements use the measured 1,500 ms expo-out reveal; routine links are 300 ms.

**Narrative purpose:** The miniature environment positions the service as infrastructure: crews, sites, and industries are parts of one controlled system.

**Transfer:** A restrained system map could introduce an intelligence product's coverage universe, then hand off to standard documents. Keep labels clickable and offer a list equivalent.

**Costs:** No reduced-motion rule; near-white-on-pale-blue art risks contrast. The 1.5 s title reveal should not block reading.

**Decision:** **Prototype-first** for a static-first system map; otherwise use the typographic hierarchy only.

### 4. NRG Build Your Data Center — adopt phased process storytelling

**Observed:** After the unnecessary “Enter Site” layer, the page exposes five named phases. Phase 1, Site Evaluation, is divided into three steps and concrete checks including fibre, water, gas, load ramp, grid/ISO engagement, environmental evaluation, community alignment, air permits, and lower-carbon options. Reduced-motion CSS is present; the entered mobile document remains a normal 390 px-wide page.

**Narrative purpose:** It transforms a complex, high-capex engagement into a predictable operating sequence and demonstrates expertise through the questions asked at each phase.

**Transfer:** Use this pattern for “how analysis becomes a decision”: scope → evidence → model → review → action. Pair each phase with inputs, checks, output, owner, and confidence. Provide direct phase links and a printable full process.

**Costs:** Loader/entry gates undermine trust and delay content. Five videos and a canvas are unnecessary for the underlying process.

**Decision:** **Adopt** phase decomposition; **reject** entry gate and scroll-only progression.

### 5. Wolverine Worldwide — adopt corporate proof sequencing

**Observed:** The home page leads with purpose, then surfaces portfolio, an annual report, culture, a market snapshot, and latest news. Scroll reveals use measured 600 ms fades and 800 ms rise/scale with reduced-motion CSS. The Brands route turns the portfolio into named, repeated brand modules with explicit next/previous controls and job/shop actions.

**Narrative purpose:** It balances emotional identity with investor-grade proof surfaces without making the homepage a dashboard.

**Transfer:** For St Georges Strategies, lead with a precise thesis, then expose coverage/offerings, featured evidence, a latest briefing, and credibility signals. Use one reveal grammar across modules: opacity plus 12–24 px rise, 450–650 ms.

**Costs:** Autoplay video competes with the annual report. The mobile Brands page is extremely long and needs a compact index.

**Decision:** **Adopt** hierarchy and reveal grammar; use static media by default.

### 6. Sui — adapt system taxonomy, not canvas volume

**Observed:** The homepage describes a full stack and gives individual primitives their own named destinations. The Intro route contrasts centralized tech, other Web3 solutions, and Sui's model, then maps specific technical primitives to benefits. Home link transitions are 100–300 ms. Reduced-motion CSS appeared on home but not the sampled deep route.

**Narrative purpose:** It reduces a technically dense platform into a composable ontology and repeatedly connects architecture to user outcome.

**Transfer:** Build an accessible “intelligence stack” diagram—sources, validation, models, analysis, delivery—with each layer linked to a plain-language explanation and evidence. Use SVG/HTML and progressive disclosure.

**Costs:** 15 canvases/346 SVGs on home; 33 canvases on deep mobile. That is not a defensible baseline for B2B reading.

**Decision:** **Adapt** taxonomy; **reject** rendering density.

### 7. Hildén & Kaira / Uusi Juttu — adapt outcome-led case studies

**Observed:** The case route foregrounds a client testimonial, then a measured reach claim, time controls (“Past 30 days” / “All time”), and three content formats that explain the mechanism behind outcomes.

**Narrative purpose:** It connects result to method and lets the reader change the time lens—more persuasive than a single animated vanity number.

**Transfer:** Case studies should show baseline, intervention, result, period, source, and the mechanism believed to have caused it. Animate number changes in 250–400 ms and preserve the prior/next values in text for assistive tech.

**Costs:** 22 videos on the case route, no reduced-motion rule, and non-interacted form states appearing as headings in the DOM.

**Decision:** **Adapt** evidence model; sharply reduce media.

### 8. Radian technical specifications — adopt anchored technical reading

**Observed:** The specs page offers an immediately visible category list—Overview, Drivetrain, Battery, Chassis, Charging, Storage, Suspension, Brakes & Wheels, Lighting, Connectivity, Homologation. Active-category motion is 350–450 ms and the page has no horizontal mobile overflow.

**Narrative purpose:** It lets the reader move from aspiration to verification without losing product context.

**Transfer:** Use a sticky or horizontally scrollable local index for long analytical pages. Highlight the current section with colour/weight and at most a 2–3 px underline movement; do not animate the data itself unless state changes.

**Costs:** No reduced-motion rule; four videos remain on the technical route.

**Decision:** **Adopt** information architecture; **adapt** media.

### 9. Tresmares Capital — adapt visual restraint and investor routing

**Observed:** The hero uses ample whitespace, one restrained mountain texture, a large “Drive to grow” line, and clear routes to financial solutions, portfolio, team, investors, and an investor portal. Movement is mostly 400–800 ms expo-out and reduced-motion CSS is present.

**Narrative purpose:** It signals selectivity and long-horizon confidence—useful in high-stakes advisory contexts.

**Transfer:** Preserve whitespace and a small number of high-value routes, but use the space to expose a proof point, scope, and latest insight. Keep decorative image drift under 3–4% scale and disable it when reduced motion is requested.

**Costs:** Empty homepage title, weak deep-page title, missing heading semantics, and overly sparse factual content create avoidable credibility gaps.

**Decision:** **Adapt** tone, not information density.

### 10. Serve Robotics Data — adopt capability → use case → safeguards

**Observed:** The Data page converts “street smarts” into named outputs: street-condition reporting, accessibility checks, infrastructure alerts, and urban mapping, followed by safety/ethics. Text reveals are around 300 ms; the mobile layout is conventional and overflow-free.

**Narrative purpose:** It shows what the system senses, what decision it enables, and what guardrails govern it.

**Transfer:** Every intelligence capability page should answer: input, transformation, decision supported, limitation, and governance. Use motion only to connect these layers, not to loop the headline.

**Costs:** No reduced-motion rule and duplicated semantic headings caused by decorative text copies.

**Decision:** **Adopt** the explanatory sequence; rebuild semantics.

## Direct institutional and product benchmarks

The following pages were opened directly from their organisations, not through award galleries. Only transferable principles are extracted.

| Live source and inspected page(s)                                                                                                                               | Transferable principle                                                                                                                                                                                      | Motion / delivery evidence and caution                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Apple** — [UK homepage](https://www.apple.com/uk/) and [iPhone](https://www.apple.com/uk/iphone/)                                                             | One product family per section; giant product name, short benefit, two actions. Progressive disclosure keeps specifications off the top layer.                                                              | Mobile iPhone exposed one video, no canvas, reduced-motion CSS, and **240 ms linear** chevron feedback. Adopt the content discipline and compact UI tempo, not product-launch spectacle.                         |
| **Stripe** — [UK homepage](https://stripe.com/gb) and [Enterprise](https://stripe.com/gb/enterprise)                                                            | Organise complexity by business model and customer proof, then connect claims to guides and stories. Technical sophistication is demonstrated through concrete modules.                                     | Mobile Enterprise exposed one canvas, reduced-motion CSS, and **150 ms linear** nav-arrow feedback. The page is very long (~22,149 px mobile) and SVG-heavy; provide an in-page index for comparable depth.      |
| **Bloomberg** — [UK](https://www.bloomberg.com/uk) and [Bloomberg Terminal](https://professional.bloomberg.com/products/bloomberg-terminal/#overview)           | Dense systems can remain legible when product name, core promise, capabilities, customer problems, support, and contact have explicit hierarchy.                                                            | Terminal mobile used one video/no canvas and exposed reduced-motion CSS. Bloomberg UK sampled 250 resources and weak heading semantics; do not equate density with authority.                                    |
| **Financial Times** — [Home](https://www.ft.com/) and [World](https://www.ft.com/world)                                                                         | Stable masthead, explicit sections, lead story, news, analysis, recommended, and most-read modules make a changing information surface predictable. “Accessibility help” is visible as a first-class route. | World used no video/canvas, one SVG, and reduced-motion CSS. Adopt its stable editorial grid and labelling; avoid copying trade dress. Paywalled content was not bypassed.                                       |
| **McKinsey** — [Home](https://www.mckinsey.com/) and [Financial Services](https://www.mckinsey.com/industries/financial-services/how-we-help-clients)           | Practice pages progress from remit → how we help → capabilities → insights → case study → contact. This is a strong model for expertise made navigable.                                                     | Deep mobile used no video/canvas; no reduced-motion CSS detected. Motion is not required to make the expertise credible.                                                                                         |
| **BCG** — [Home](https://www.bcg.com/) and [Energy](https://www.bcg.com/industries/energy/overview)                                                             | Start with a point of view, then provide services, approach, client success, and experts. Local page navigation (“Overview / Latest Thinking / Experts”) helps long practice pages.                         | Deep mobile used one video/no canvas; **350 ms linear** SVG effects were detected; no reduced-motion rule. Use the local index and proof sequence, not decorative icon repetition.                               |
| **BlackRock** — [UK homepage](https://www.blackrock.com/uk)                                                                                                     | Lead with a current investment question, then connect education, goal-based products, market insights, and social/current updates.                                                                          | Accessible homepage used three videos/no canvas. Deeper Insights navigation stalled and was not retried. Keep jurisdiction/audience selection from overwhelming primary content.                                 |
| **J.P. Morgan** — [Global](https://www.jpmorgan.com/global) and [Corporate News](https://www.jpmorgan.com/about-us/corporate-news)                              | Outlooks and forecasts lead; institutional purpose, problem categories, initiatives, and news create multiple credibility paths. The news page uses plain chronological headlines.                          | Deep mobile used no video/canvas and no active motion; no reduced-motion CSS detected. Authority comes from publication structure and specificity.                                                               |
| **Goldman Sachs** — [Home](https://www.goldmansachs.com/) and [Artificial Intelligence insights](https://www.goldmansachs.com/insights/artificial-intelligence) | Treat an expertise theme as a durable editorial collection and connect it to reports, client work, and business capabilities.                                                                               | AI insights mobile used no video/canvas; no active animation or reduced-motion CSS detected. Strong evidence that a serious insight destination does not require scroll theatre.                                 |
| **Palantir** — [UK](https://www.palantir.com/uk) and [AIP](https://www.palantir.com/platforms/aip/)                                                             | Separate platforms, impact studies, documentation, news, and careers. Product pages make the operational decision the unit of value, not the model itself.                                                  | AIP mobile used 10 videos, no canvas, and reduced-motion CSS. Adopt decision/use-case framing and direct documentation links; reduce video volume.                                                               |
| **Linear** — [Home](https://linear.app/) and [Build](https://linear.app/build)                                                                                  | Each product chapter has one action-oriented promise and a corresponding interface illustration. Copy is compact and product evidence sits immediately behind the claim.                                    | Build mobile used one video/no canvas, reduced-motion CSS, and ambient **1,000–2,500 ms linear** path/cursor loops. Keep ambient motion optional; use 150–250 ms for controls and static fallbacks for diagrams. |

## Recommended motion grammar for St Georges Strategies

### Adopt by default

| Purpose                   | Trigger                                       | Timing / easing                                                                    | Travel / transform                                            | Evidence model                                  |
| ------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| Control feedback          | Hover, focus, press, menu open                | **150–250 ms**, linear or ease-out                                                 | 2–4 px underline/arrow; opacity/colour; no layout shift       | Apple 240 ms; Stripe 150 ms; Radian 150–300 ms  |
| Section reveal            | First entry into viewport; once               | **450–650 ms**, `cubic-bezier(0.16,1,0.3,1)` or `cubic-bezier(0.215,0.61,0.355,1)` | 12–24 px rise plus opacity; stagger 40–80 ms, maximum 3 items | Wolverine, Vectr, Radian                        |
| Chapter / evidence change | Explicit click, filter, tab, or next/previous | **250–450 ms**, ease-out                                                           | Crossfade plus ≤16 px lateral/vertical shift                  | AI in Design, Hildén case metrics, Radian specs |
| Diagram emphasis          | Focus/hover/click on named node               | **250–400 ms**                                                                     | Colour/weight plus ≤3% scale; connected line draw ≤500 ms     | Sui taxonomy adapted to accessible SVG/HTML     |
| Number update             | Explicit period/filter change                 | **250–400 ms**                                                                     | Crossfade digits; do not roll through unrelated values        | Hildén time controls                            |
| Page transition           | Route navigation after content is ready       | **300–500 ms**                                                                     | Old content fade 100–150 ms, new content rise 12–16 px        | Keep URL/history authoritative                  |

### Prototype-first

- A single coverage/system map inspired by Vectr, with accessible list parity, keyboard focus, static reduced-motion image, and a strict <150 KB initial budget.
- A staged decision-process explainer inspired by NRG, but with direct phase links, no entry gate, and a “view all steps” document.
- Optional evidence previews inspired by Podium, poster-first and loaded only on hover/focus/tap intent.

### Reject

- Full-screen wheel capture or camera journeys as the primary navigation model.
- Continuous text marquees or duplicated accessibility-tree text.
- Motion that changes reading order, delays headings, or hides already-available content behind a loader/“enter” gate.
- More than one autoplay media element in the initial viewport.
- Canvas for static charts, diagrams, labels, or typography that HTML/SVG can express.
- Hover-only meaning, sound by default, custom cursor dependence, and route changes without URL/history changes.

## Verification gates before release

1. Every animated state has a static equivalent under `prefers-reduced-motion: reduce`; test that DOM order and content are identical.
2. Keyboard and screen-reader users can reach every chapter, filter, chart explanation, and evidence source without traversing decorative duplicates.
3. No content waits for animation completion. Heading, summary, and primary action are readable in the first frame.
4. Mobile has no horizontal overflow at 320, 390, and 430 px; sticky elements do not consume more than 20% of viewport height.
5. One animation timeline per component; stop offscreen loops and pause video. Do not start nonessential motion until after the main content is interactive.
6. Lab and real-device checks cover LCP/INP/CLS, CPU throttling, Save-Data, and low-power mode. The visual concept is rejected if it cannot remain useful with all video/canvas disabled.
7. Charts and metrics include source, period, units, methodology/definition, and a textual takeaway. Motion must not be the sole carrier of comparison or direction.
