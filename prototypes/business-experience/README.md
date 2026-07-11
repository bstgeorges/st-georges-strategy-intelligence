# Business experience and motion prototype

Phase-2, low-fidelity comparison only. This prototype does not select a winner and does not modify a production route.

## Run locally

From the repository root:

```sh
python3 -m http.server 4173 -d prototypes/business-experience
```

Then open:

- `http://127.0.0.1:4173/#spine` — Executive Decision Spine with Editorial Handoff
- `http://127.0.0.1:4173/#observatory` — Intelligence Observatory with Evidence Lens

No install, build, external data, web font, or JavaScript framework is required. JavaScript enhances the comparison switcher and motion; with JavaScript disabled, both complete directions appear in document order. The CSS font stacks preserve the Playfair Display, Hanken Grotesk, and mono roles when those fonts are locally available and use safe local fallbacks otherwise.

## What is being compared

### Direction A — Executive Decision Spine

Hypothesis: putting the exact judgement, board question, evidence ask, nearest deadline, and brief action beside the opening promise will let an executive identify the weekly consequence inside 30 seconds. The Editorial Handoff then makes the source → topic → pattern → judgement → question → evidence conversion explicit without pinning or scroll capture.

### Direction B — Intelligence Observatory

Hypothesis: exposing the eight-stream coverage universe first will improve discovery and help readers understand the breadth of the publication, but may delay the weekly conclusion. The Evidence Lens tests deliberate focus on a stream and reveals only the approved source/topic record attached to it. On narrow screens, the coverage universe becomes a normal list rather than a small spatial graph.

## Motion comparison

- **Editorial Handoff:** a single 540 ms, 18 px, source-to-action entrance with 65 ms stagger. All stages are present and readable before enhancement.
- **Evidence Lens:** a user-triggered 380 ms, 14 px change between selected evidence records. Selection is exposed with `aria-pressed`; focus and touch use the same control.
- **Reduced mode:** the visible Full/Reduced control persists the user choice. Reduced mode cancels Web Animations API work and removes transition travel. `prefers-reduced-motion` is also respected when no explicit user choice exists.

## Real-content boundary

The prototype uses the approved week-of-6-Jul-2026 content from the frozen Home record and the current live-reference records: the AI/cyber judgement, the exact board question, the inventory/permissions/kill-switch/fallback evidence ask, all five ranked headlines with source/topic labels, the eight streams, and the 14 August owner deadline. The prototype does not fetch or infer live relationships.

## Comparison criteria

1. **30-second clarity:** can a reader state what changed, why it matters, the board question, evidence ask, and nearest deadline?
2. **Two-minute findability:** can a reader name all eight streams and reach the relevant source/topic record?
3. **Credibility:** are judgement, source class, topic, and date adjacent, without invented graph geometry?
4. **Mobile/reflow:** is the same content understandable at 390 and 320 px without horizontal scrolling?
5. **Keyboard/touch:** are direction, motion, replay, and evidence controls native, focus-visible, and usable without hover?
6. **Static parity:** is the content complete with JavaScript disabled and with reduced motion selected?
7. **Performance:** does the concept remain useful with zero media, canvas, external requests, or continuous animation?

## Verification targets

- Viewports: 1440 × 900, 390 × 844, and 320 × 844
- Both direction hashes
- Full and reduced user motion modes
- JavaScript-disabled document
- Keyboard traversal and activation
- Console errors and horizontal overflow

Screenshots are stored in [`screenshots/`](screenshots/).
