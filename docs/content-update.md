# Editorial update workflow

## Contract

An edition is immutable evidence. A current route is an explicit editorial pointer, not the record with the greatest date. Production pages read the checked-in, layout-free records under `src/content/editorial/authored/`; capture snapshots and `src/content/generated/editorial-documents.ts` are import/parity fixtures only. Never overwrite a historical edition or silently combine rendered and machine-feed channels.

## Publish a reviewed weekly edition

1. Capture or add the approved source artifact under the relevant corpus. Keep its exact route, source URL, capture instant, status, metadata, body and SHA-256 checksum.
2. Update the corpus manifest and confirm route/file/checksum agreement.
3. Add the reader-facing route data to the matching authored module: `brief.ts`, `signals-index.ts`, `topic-dossier.ts`, `regulatory-horizon.ts`, `committee-questions.ts`, `archive.ts`, or `about.ts`. Edit content fields only; layout remains in the matching component under `src/components/archetypes/`.
4. Add or revise durable domain entities in `src/content/editorial/records.ts` when the edition introduces a new signal identity, revision, judgement, question, evidence ask, deadline, owner or relationship.
5. Give persistent entities stable IDs. Wording/rank changes create a revision; they do not silently create a new signal identity.
6. Set `currentEditionId` explicitly for the relevant publication series. Do not derive it from a maximum date.
7. Record unresolved cross-channel differences as reconciliation records with `conflicts` or `overlaps`. Only an approved `equivalent`/`supersedes` decision permits shared typed content.
8. Run:

   ```bash
   npm run generate:documents
   npm run validate:content
   npm run validate:editorial
   npm test
   npm run build
   ```

9. Review the capture-fixture diff and authored-data diff separately. Generation must never rewrite authored production records. Confirm the parity tests retain every wording token, href, date, source, disclaimer, metadata field, and structured-data field.
10. Run the site and execute `verify:home`, `verify:archetypes`, `verify:release` and `profile:motion` against it.
11. Preserve the previous edition route and archive relationships. Advance the current alias only after the new edition passes review.

## Archive comparisons

Dated Brief and topic editions compare only adjacent records in the same rendered-HTML series. A comparison identity is the series namespace plus the exact authoritative source URL. Exact URL equality may produce an unchanged or revised record when its authored label/content changes; a URL entering or leaving the list is added or removed. Never join sources by similar titles, publishers, redirects, or topics, and never compare rendered HTML with JSON/RSS/ICS channels. The first observed dated edition carries an explicit `first-observed` state because no earlier evidence exists.

`ArchiveComparison` receives the checked-in previous/current revision sets and their source records. Every revision has one exact-URL source ID. Update the adjacent comparison data when adding a dated edition and let validation fail closed if a revision cannot cite that source.

## Images

- Store publication-owned assets in `public/` with stable descriptive paths.
- Supply meaningful `alt` text for informative images and empty alt text for decoration.
- Do not hotlink third-party imagery or add unlicensed artwork.
- Verify source integrity, mobile crop, intrinsic sizing and missing-image behavior.

## Rollback

Repoint the affected series/current route to the last reviewed authored record, regenerate parity fixtures, rerun the full gate, and deploy a new immutable Worker version. Do not delete the failed edition; retain it as evidence with a reconciliation/incident note.

## Admin boundary

No public or client-only editor is shipped. A future admin/CMS must authenticate and authorize server-side, validate the same schemas, preserve immutable revisions, keep drafts out of the sitemap, and produce auditable changes. Until that infrastructure is approved, reviewed repository content is the production boundary.
