# ADR 0002 — Typed editorial domain with immutable provenance

Status: accepted  
Date: 11 July 2026

This supersedes ADR 0001 incrementally. The snapshot architecture remains the fidelity-fixture and rollback description until the raw-renderer retirement gate passes.

## Context

The clone models a public page as one PageSnapshot containing its full body HTML. That preserved pixel and copy fidelity, but it cannot express stable editorial identity, revisions, relationships, or conflicting publication channels.

The continuation audit found three truths that must remain distinct:

- the frozen corpus has 42 routes, a Committee Questions 404, and 8/9 July archives;
- the live corpus captured at 2026-07-11T13:11:40.871Z has 33 successful routes, Committee Questions as 200, and 6 July archives;
- rendered Horizon, Horizon JSON/RSS/ICS, and AI page/JSON records contain different dates and signal sets.

Selecting the greatest date or joining records by similar title/topic would invent an editorial conclusion.

## Decision

Production content will use a typed editorial domain while both snapshot corpora and public feeds remain immutable evidence.

Captured artifact → provenance reference → typed entity/edition → server-rendered archetype

### Captures and channels

Every HTML page, JSON feed, RSS document, ICS document, and sitemap is a CapturedArtifact with corpus, channel, URL/route, capture time, status, checksum, repository path, and optional declared-edition provenance.

Rendered pages, AI JSON, Horizon JSON, Horizon RSS, and Horizon ICS are separate channels. An authored ReconciliationRecord may conclude equivalent, supersedes, overlaps, or conflicts. Only equivalent/supersedes can authorise shared typed content.

### Editorial identity

- PublicationSeries owns an explicit currentEditionId. Current is never computed from the greatest date.
- Edition IDs include series and provenance lineage.
- Signals have immutable authored IDs and edition-specific revisions.
- Sources use canonical-URL-derived seed IDs with collision checks and aliases.
- Dates distinguish coverage, publication, modification, archive routing, and capture.

### Relationships

Relationships are discriminated, typed, and provenance-backed:

- signal revision supports judgement;
- judgement translates to question;
- question requests evidence;
- evidence/deadline is owned by a role;
- evidence is due at a deadline;
- an entity has an explicit topic read-across.

Similar words, dates, publishers, routes, or topic tags are not relationships.

Archive comparison matches stable IDs: only-new is added, only-old is removed, equal semantic revision hash is unchanged, and equal entity with changed revision hash is revised. A diff reports fields and never generates judgement.

### Rendering and routes

Explicit App Router route families replace the optional catch-all incrementally: Home, Brief/current and dated archive, Signals index/topic/archive, Reg Horizon, Committee Questions, Archive, About, not-found, sitemap, and robots.

Dynamic topic/date routes use generated parameters, runtime narrowing, and dynamicParams false.

Archetypes and content registries remain Server Components. Client islands are limited to mobile navigation, URL-addressable Signals filtering/evidence lens, reading progress, motion preference/control, and optional archive comparison.

### Metadata and parity

Metadata and structured data derive from typed route/edition records. JSON-LD is stored as structured values and serialized safely. The sitemap includes only successful canonical typed routes; evidence fixtures, captured 404s, redirects, and mirrors are excluded.

The page checksum remains evidence but cannot prove semantic migration. A parity manifest decomposes each baseline route into text, heading, link, date, source, disclaimer, metadata, and JSON-LD atoms. Every atom must be mapped to an entity/rendered route, marked evidence-only, or linked to an approved intentional-difference decision.

## Validation

Validation fails on duplicate/malformed IDs, routes or hashes; unresolved keys/provenance; cross-channel reuse without reconciliation; invalid or cyclic edition pointers; duplicate/non-positive ranks; invalid dates; colliding source aliases; relationship endpoint mismatches; missing parity dispositions; or semantic hash mismatch.

Golden tests cover archive diff semantics, channel isolation, Committee captured-404/live-200 preservation, metadata/sitemap rules, and the prohibition on max-date latest selection.

## Migration sequence

1. Add types, validators, artifact/channel registry, known conflicts, route registry, and parity contracts without changing rendering.
2. Migrate the shared shell, About, and not-found.
3. Migrate current AI and one AI archive edition end-to-end.
4. Migrate the other seven topic series.
5. Migrate Brief after signal identities and relationships exist.
6. Migrate rendered Horizon while public feed channels remain isolated.
7. Migrate live Committee Questions while retaining the frozen 404 artifact.
8. Migrate Signals/Home aggregates after their referenced editions resolve.
9. Migrate archive indexes and comparisons.
10. Retire raw rendering only after all gates pass.

## Raw-renderer retirement gate

The production bodyHtml renderer may be removed only when:

1. every frozen/live artifact has a parity disposition;
2. every public route has an approved typed edition/current pointer;
3. no unapproved parity difference remains;
4. status, text, headings, links, dates, sources, disclaimers, metadata, JSON-LD, and canonicals pass;
5. archive comparisons use stable IDs/revisions;
6. feeds are byte-preserved or have approved reconciliation/generation;
7. no production component imports PageSnapshot or renders bodyHtml;
8. dangerouslySetInnerHTML remains only for safely serialized structured data;
9. raw fixtures remain rollback evidence for at least one release;
10. the full verification matrix passes.

## Consequences

This preserves contradictory evidence honestly, makes weekly updates record-driven, and gives cross-links/archive/motion explicit contracts. The cost is authored IDs, provenance locators, reconciliation, atom-level parity, more route files, and local runtime validation. That cost is accepted because inference would weaken the publication's core promise: disciplined conversion from evidence into judgement.
