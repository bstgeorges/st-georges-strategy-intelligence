# Design-system drift — Codex fix handoff

Repository: `bstgeorges/st-georges-strategy-intelligence`

Prepared from the Claude design audit supplied on 2026-08-16. The audit reviewed the deployed site and source tree at older references (`site/styles.css` around tree `9b5b566`, deployed release `04ce598`). The current branch has since advanced to Edition 9, so verify by content and current source rather than relying on old line numbers.

## Scope and ground rules

This is a design-system alignment pass, not a redesign.

- Preserve the current layout, content, palette direction, typography families, 1320px measure, and squared corners.
- Do not introduce new one-off hex colours. Every colour must resolve to a token declared in `site/styles.css`.
- Keep `prefers-reduced-motion` behaviour intact.
- Check home, Weekly Brief, Signals hub, one topic page, Committee Questions, Archive, About, and Regulatory Horizon at mobile, tablet, and desktop widths.
- Edit source files only; rebuild `site-dist/` rather than hand-editing it.

## P0 — functional and token defects

### 1. Declare or remove `--ink-soft`

`var(--ink-soft)` is used repeatedly but is not declared. Prefer adding this next to `--muted` in the `:root` token block:

```css
--ink-soft: #6b6555; /* alias of --muted; retained for horizon/radar blocks */
```

Alternatively replace every occurrence with `var(--muted)`. Supporting copy in horizon, radar, coverage, and freshness blocks must visibly render as muted text.

### 2. Remove off-token colour literals

Audit all hex literals outside `:root` in `site/styles.css`. Align the known drift as follows, adjusting only where the current tree proves a different semantic need:

| Current literal | Use |
| --- | --- |
| `#f1ebdc` | `var(--cream)` |
| `#f6f1e5` | `var(--paper-soft)` |
| `#ede7d7` | `var(--paper)` or a single documented `--paper-sunken` token |
| `#fff` | `var(--cream)` or a declared `--white` token if pure white is intentional |
| `#33312a` | `var(--body)` |
| `#9db0c0`, `#a9b6c0`, `#c3ccd4`, `#c7cfd7`, `#aab5bf` | `var(--navy-text)` or `var(--navy-muted)` |
| `#7d8790`, `#6e7c88` | `var(--navy-muted)` or one documented `--navy-faint` token |
| `#a64c31`, `#8a3d21` | `var(--rose)` |
| `#7c642e` | `var(--accent-readable)` |

The old Regulatory Horizon archive pages also contain forked palette values and `#8a3324` footer flags. Either reconcile those pages to the shared stylesheet or explicitly mark them as intentionally frozen historical artefacts. Do not silently leave them looking current while using a separate token set.

## P1 — typography and surface drift

### 3. Consolidate mono tracking

Use two named tracking tokens:

```css
--tracking-label: 0.14em;
--tracking-eyebrow: 0.2em;
```

Route eyebrow/kicker text to the second token and all other tracked mono labels, buttons, tags, metadata, and table headers to the first. Remove intermediate `em` values from current source and any live archive templates where practical.

### 4. Remove negative Playfair tracking

Playfair headings should use `letter-spacing: 0`. Remove negative tracking from the essay heading and the old Regulatory Horizon archive mastheads. If needed, tighten line-height rather than reintroducing negative tracking.

### 5. Respect the 11px minimum furniture size

The smallest type step is 11px. Raise or remove tracked uppercase furniture below 11px, including mobile labels. Check widths after raising sizes; shorten labels before reducing the type floor.

### 6. Keep paper surfaces flat

Remove paper-surface gradients and decorative dot fields unless they are explicitly documented as part of the system. The navy hero gradient is the current sanctioned exception. For accented paper cards, prefer a rule or left border rather than a gradient.

Decision required before changing the hero: either remove the looping hero dot/light treatment or document it as a named hero device and add it to the design-system rules. Do not leave it as an undocumented exception.

### 7. Use the defined shadow ceiling

Align paper/card elevation to the existing shadow tokens:

```css
--shadow-sm: 0 1px 2px rgba(15,34,51,0.04);
--shadow-md: 0 2px 10px rgba(15,34,51,0.06);
--shadow-lg: 0 10px 30px rgba(15,34,51,0.10);
```

Remove heavy card lifts, hover glows, and black shadows. Keep the fixed banner separation shadow only if it remains necessary to distinguish the banner from content.

### 8. Reconcile old Horizon archives

`site/regulatory-horizon/archive/2026-07-02.html` and `2026-07-04.html` contain local roots and stale values. Preferred approach: use the shared stylesheet and reconcile page-local rules. If archive immutability is more important, keep them byte-stable and add a clear HTML comment that they are frozen historical artefacts outside the current token contract.

### 9. Align button vocabulary

The markup currently uses `primary`, `secondary`, `secondary light`, and `outline`, while the design contract uses `primary`, `navy`, and `outline`. Rename selectors and markup without changing rendered appearance:

- `secondary` → `navy` where it is a solid dark button
- `secondary light` → `primary` where it is a cream button on navy
- retain `outline`

Confirm button heights. The system target is 52px; 44px may remain a documented mobile tap-target exception, but do not leave multiple unexplained heights.

### 10. Limit Playfair weights

Use only 700 for hero/page titles and large display numerals, and 600 for section/card headings. Convert comparable 500-weight headings to 600.

## Reverse drift — decisions for the design system

The site has moved ahead of parts of the written system. Decide and document rather than automatically reverting:

1. `site/assets/hero.svg` now exists and may be a sanctioned hero asset.
2. `site/assets/favicon.svg` contains the SGS mark and its small radius may be a documented mark exception.
3. Choose one readable gold token. The site’s darker `#6f531f` / `--accent-readable` reads more strongly on beige than the system’s `#8a6a22`.
4. Reconcile navy text tokens between the site and written system.
5. Decide whether unused `--violet-soft` belongs in the site or should be removed from the system.
6. Decide whether hero loops are intentional brand motion. If retained, amend the no-loop rule and document duration, reduced-motion behaviour, and purpose. If not, remove the loops and keep transitions within 120–320ms.

## Verification checklist

Before handing back:

- [ ] `--ink-soft` is declared or all uses are removed.
- [ ] Hex search shows only intentional `:root` token declarations in current source stylesheets.
- [ ] Mono tracking resolves to the two named token values, plus zero where appropriate.
- [ ] No negative tracking remains on Playfair or anywhere else.
- [ ] No tracked mono furniture is below 11px.
- [ ] Paper surfaces have no undocumented gradients or patterns.
- [ ] Shadows stay within the documented ceiling.
- [ ] Button names match the component contract.
- [ ] Playfair headings use only 600 or 700.
- [ ] Reduced-motion blocks suppress every retained animation.
- [ ] The seven principal page families render consistently at 375px, 768px, and 1440px.
- [ ] Run `npm run site:build`, `npm run site:verify`, and relevant data validation.
- [ ] Publish only through the guarded `Site release (Cloudflare)` workflow; a green workflow with exact deployed SHA verification is the publication proof.

## Browser-review note

The original Claude audit was source-based and did not use the user’s Chrome extension. A rendered browser review is still useful for contrast in situ, breakpoints, hover states, and motion. If performed, record viewport sizes, routes, and findings here or in a dated QA note; do not treat a browser screenshot as a replacement for source and build validation.
