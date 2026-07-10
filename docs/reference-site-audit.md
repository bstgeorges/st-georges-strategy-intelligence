# Reference visual audit

Capture window: `2026-07-10 14:22–14:24 UTC`. The Committee screenshots are post-capture-only because that route changed from the locked 404 to 200 during the audit.

The evidence set contains exact viewport and full-page captures for home, brief, Signals, AI topic, Reg Horizon, Committee Questions, archive, and About at 1440×900, 1280×800, 768×1024, and 390×844. Generated screenshots live under `artifacts/reference/screenshots/` and computed measurements are in `live-measurements.json`.

## Measured design system

- Containers: main `max-width:1320px; width:calc(100% - 40px)`; header inner max 1280px.
- Breakpoints: 1000px and 760px.
- Core colors: paper `#e7e1d3`, soft `#f6f2e9`, raised `#f4efe3`, ink `#15140f`, body `#2c2a22`, muted `#6b6555`, navy `#0f2233`, deep navy `#0b1a29`, gold `#a07e2e`, bright gold `#c49a4a`.
- Body: Hanken Grotesk 17px/1.55, becoming 16px/1.55 at 760px.
- Home H1: Playfair 700, `clamp(52px,7.8vw,118px)/.98`, max 14ch; mobile `clamp(36px,11vw,48px)/1.04`, max 8ch.
- Masthead H1: `clamp(52px,8vw,106px)/.98`, max 820px.
- H2: `clamp(36px,4.5vw,66px)/1.02`; mobile `clamp(28px,8vw,34px)/1.08`, max 12ch.
- Dek: Playfair italic `clamp(22px,2.5vw,32px)/1.28`; mobile 18px/1.28.
- Eyebrows/nav: JetBrains Mono, uppercase with `.2em`/`.16em` tracking.
- Cards: square, no shadow, 1px navy-alpha rule, raised paper, `clamp(22px,2.4vw,34px)` padding.
- Bands: `clamp(58px,7vw,94px)` vertical padding.

## Responsive behavior

The header is sticky at z-index 50. It has no mobile drawer: the full navigation wraps, producing measured heights of 67px at 1440/1280, 81.55px at 768, and 114px at 390. At 1000px primary grids collapse to two or one columns depending on archetype; at 760px major grids become one column. The footer moves from three to two to one columns.

The home headline wraps to 3/3/3/6 lines across the four target widths. About intentionally reaches seven lines on mobile because of its narrow 8ch maximum.

## Interaction baseline

Navigation current/hover is bright gold. Focus-visible is a 3px translucent gold outline with 3px offset. Primary buttons lighten to white; secondary borders strengthen and text becomes cream; archive-card headings become gold. The live site has no reduced-motion override and retains smooth scroll and transitions.

## Source defects and enhancement decisions

- The hero image is broken. Stage A preserves the source condition; Stage B adds only code-native, non-data decorative depth.
- The live Reg Horizon tablet page expands to 16,784px due to conflicting timeline grid rules. The faithful source is documented, but the production enhancement repairs this accessibility/usability defect.
- Committee visual captures are not used for Stage A because they were taken after the route changed.

