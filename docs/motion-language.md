# Motion language

Motion explains reading order, priority, causality, time and archive depth. It is progressive enhancement over complete server-rendered content, never a gate.

## Families

| Family                          | Meaning                                        | Authored state and treatment                                                                                                                |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Orientation                     | Establish the page's reading order             | Context → claim → explanation → action settles vertically once; the masthead records `reading-order-established`                            |
| Source → implication            | Connect provenance to the claim it supports    | Source/date/topic enters from the source edge, then its adjacent implication; the row records `source-linked`                               |
| Stream convergence → judgement  | Resolve public inputs into this week's pattern | Home's numbered source → stream → pattern → judgement stages converge from opposing edges into the central decision                         |
| Judgement → question → evidence | Translate a conclusion into governance action  | Judgement leads from the source edge; question, evidence and owner/deadline answer from the action edge; the group records `translated`     |
| Priority                        | Make rank and shortlist order visible          | The rank marker settles before its claim, with a capped 65ms stagger; each row records `prioritised`                                        |
| Time and archive continuity     | Keep deadlines directional and dates stable    | Horizon advances down its authored axis; archive date/meta stays fixed while historical detail settles, recording `timeline-advanced`/depth |
| Feedback                        | Confirm navigation/control state               | Underlines, borders and colour respond within 150ms with hover, focus and active parity; no fact exists only in a transient state           |

Reading progress is state feedback, not decoration. It uses a native `progress` element inside a labelled complementary landmark.

## Tokens

- Immediate feedback: 150ms.
- Standard state transition: 260ms.
- Editorial item: 380ms.
- Orientation/Home sequence: 520–560ms.
- Stagger: 65ms, capped at five offsets.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Travel: 8–16px; never enough to obscure content relationships.

## Runtime contract

- CSS handles hover/focus/active and non-sequenced feedback.
- Web Animations API handles bounded semantic sequences; no animation library is installed. The six families have different keyframes, child order and persistent state names rather than sharing a generic fade-rise.
- `IntersectionObserver` plays each region once near the reading boundary. Home uses explicit `data-home-motion` contracts; captured archetypes use meaning-derived `data-editorial-motion` contracts.
- Editorial sequences use transform only; content never becomes translucent or hidden. They cancel on unmount/hidden documents and do not create layout shift.
- Observed items remain visible before JavaScript and after cancellation.
- No scroll lock, smoothing layer, pointer follower, video, canvas, timer loop or continuous ambient animation runs.
- Internal prefetch is disabled because automatically fetching several long editorial routes increased Home's transfer/task cost without improving a deliberate reading journey.

## User preference and reduced motion

The header exposes persistent Full/Reduced radio controls. Without a stored choice, the initial mode respects `prefers-reduced-motion` and follows operating-system changes live. A deliberate reader choice becomes the stored override and applies to all routes.

Reduced mode is intentionally still: observers do not play, smooth scrolling and transitions are disabled, and all semantic content appears in its final position. It is not a `0.01ms` imitation of the full sequence. The preference works without hiding content when storage is unavailable.

Forced-colors mode gives the selected radio, menu, buttons and focus ring system-colour borders. The smallest visible motion/menu target is checked at mobile widths against WCAG's 24px minimum; content links keep their existing generous padding.

## Verification contract

`scripts/profile-motion.mjs` profiles Home, Brief, AI topic, Reg Horizon and Archive at 1440×900, 768×1024, 390×844 and 320×844 in both full and reduced modes under 4× CPU throttling. It writes full-page evidence to `output/motion/` and fails on overflow, CLS ≥ 0.1, residual running animation, reduced-mode playback, missing Home families, sub-24px motion/menu targets or an invisible forced-colors focus state.

The focused Playwright suite also proves live operating-system preference changes, stored user override, all six Home contracts, deep-route family coverage, JavaScript-disabled parity and keyboard feedback parity.

## R8 measured evidence

The repaired grammar passed the 40-case matrix on the local Next development server with 4× CPU throttling:

- all five routes at all four widths in full and reduced modes completed;
- p95 frame interval was at most 17.7ms across the matrix;
- CLS was 0 across all cases;
- no animation remained running after its stable state;
- reduced mode played zero semantic regions;
- visible motion/menu targets were at least 37.8px wide and 31px high (above the WCAG 2.2 24px minimum);
- forced-colors focus exposed a solid 2px system-colour outline;
- 40 viewport screenshots were written to `output/motion/`.

There were 77 individual intervals over 32ms and development-server route compilation produced a 323ms maximum long task. Because the same profile's p95 stayed at or below 17.7ms and reduced/full modes showed the same development-runtime spikes, this is recorded as local compilation/navigation variance rather than hidden with an average. Production Workerd/preview profiling remains the release authority.

## Previous measured baseline

Against local Workerd at 390×844 with 4× CPU throttling:

- full motion median frame: 16.7ms; p95: 17.5ms; zero frames over 32ms;
- reduced motion median frame: 16.7ms; p95: 17.5ms;
- full CLS: 0.00023; reduced CLS: 0;
- zero animations remain running after the final stable state;
- the prior generic implementation played eight Home sequences in full mode and zero in reduced mode. This is retained only as the pre-repair performance baseline; new evidence must come from the matrix above.

Lighthouse on local Workerd scored Performance 93–95, Accessibility/Best Practices/SEO 100, CLS 0 and TBT 0–50ms on Home, Brief and Signals. Simulated mobile LCP remained 2.9–3.2s despite local observed LCP below 0.6s; treat that as an environment-sensitive release risk and monitor real field data rather than claiming the lab target passed.

## Dependency decision

Motion/GSAP/Lenis/3D were rejected. The current grammar needs no layout animation, scroll pinning, smooth-scroll replacement or scene runtime. If a future concept genuinely requires one, document the unique job, client weight, lifecycle cleanup, reduced alternative and removal path before installation.
