# St Georges Strategy Page Format

This records the approved public page roles for `stgeorgesstrategy.com` and the design rules that should be preserved when editing or restoring them.

## Canonical Public Pages

- `https://stgeorgesstrategy.com/`: concise St Georges Strategy homepage and navigation front door.
- `https://stgeorgesstrategy.com/thevirtualofficer/`: evergreen Virtual Officer capability page.
- `https://stgeorgesstrategy.com/intelligence/`: live weekly intelligence edition.
- `https://intelligence.stgeorgesstrategy.com/`: subdomain route to the same live weekly edition.

## Product Split

Two pages belong to the same product, but they perform different jobs.

- `/thevirtualofficer/` is the capability page. It explains how the intelligence function is built and run. It should rarely change.
- `/intelligence/` is the proof page. It carries the current weekly edition, dated content, counts, source links, and live card-and-question format. It changes weekly.

They should cross-link both ways and should not look like the same template reused.

## Homepage Format

The homepage should feel clean, brief, and editorial.

Keep:

- H1: `Sharper strategy for regulated financial services`
- Clear St Georges Strategy branding.
- Short positioning copy, not a long manifesto.
- Three capability pillars: intelligence, operating model, and executive challenge.
- Two distinct onward routes: `The Virtual Officer` as method, `Live intelligence` as the current edition.
- Footer disclaimer: `ILLUSTRATIVE CONTENT . SECTOR-WIDE` and `NOT INVESTMENT, LEGAL OR COMPLIANCE ADVICE`.

Avoid:

- Repeating the same two CTAs in multiple sections.
- Internal build-status language such as "building a public front door".
- Weekly metrics, datelines, or issue counts on the homepage.

## Virtual Officer Capability Page Format

The capability page should feel like a refined method note for a second-line financial-services audience.

Required structure:

1. Hero with H1: `Running risk intelligence as a product`.
2. `The Virtual Officer` named beneath or beside the H1, not as the H1.
3. One positioning sentence.
4. Thesis section on signals arriving faster than annual governance cycles and the gap between knowing and acting.
5. Conceptual pipeline: five input streams -> synthesis layer -> one themed weekly brief -> challenge questions.
6. Editorial discipline principles.
7. Five streams explained with coverage, the question each stream answers, and the signal that feeds it.
8. Brief "what it demonstrates" capability claim.
9. Bridge link to `https://stgeorgesstrategy.com/intelligence/`.

Do not include weekly numbers, datelines, issue counts, or the intelligence edition's card format on this page.

## Intelligence Proof Page Format

The intelligence page should keep the live edition format.

Keep:

- Current edition date and top-strip counts.
- Counts that reconcile to rendered content.
- Card-and-question format for live items.
- Primary-source links wherever possible.
- Backlink: `The method behind this brief` to `/thevirtualofficer/`.
- Footer disclaimer without broken wrapping.

Before publishing, run `npm run verify:public-links` and replace or remove missing source URLs.

## Visual Direction

The shared St Georges Strategy surface should be calm, editorial, credible, and easy to scan.

Core signals:

- Warm paper background rather than a glossy hero image.
- Dark navy for authority and contrast.
- Gold accent used sparingly.
- Thin rule lines and compact labels.
- `Playfair Display` for editorial display text.
- `Hanken Grotesk` for body copy.
- `JetBrains Mono` for labels and metadata.
- Squared corners, flat paper surfaces, hairline rules, and restrained motion.

Responsive rules:

- All pages must work at mobile, tablet, and desktop widths.
- Grids collapse to one column on narrow screens.
- Text must not overlap, clip, or depend on viewport-width font scaling.
- Footer disclaimer lines must keep readable spacing on mobile.

## Historical Restore Point

The old editorial masthead look that Ben liked is saved here:

- `snapshots/landing-page-editorial-masthead-2026-06-28.js`
- Git reference: `48735ba`

Use it as a visual reference or restore point, not as the current `/thevirtualofficer/` content model. That snapshot contains weekly-style elements that should stay off the evergreen capability page unless the page role changes again.

## Restore Procedure

To restore the historical masthead style to a Worker page:

1. Copy the relevant snapshot content into the target Worker file.
2. Reconcile the content with the current page role.
3. Run `node --check` on the edited Worker file.
4. Deploy the affected Cloudflare Worker route.
5. Run `npm run verify:public-links`.

If the `www` host is needed later, configure `www.stgeorgesstrategy.com` separately as a redirect or route to the same homepage.
