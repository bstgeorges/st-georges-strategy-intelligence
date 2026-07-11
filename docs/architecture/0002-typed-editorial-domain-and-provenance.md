# ADR 0002 — Typed editorial domain with immutable provenance

Status: accepted and implemented
Date: 11 July 2026

This supersedes ADR 0001 for production rendering. The snapshot architecture remains only the fidelity-fixture, parity, and rollback-evidence description.

## Context

The clone models a public page as one PageSnapshot containing its full body HTML. That preserved pixel and copy fidelity, but it cannot express stable editorial identity, revisions, relationships, or conflicting publication channels.

The continuation audit found three truths that must remain distinct:

- the frozen corpus has 42 routes, a Committee Questions 404, and 8/9 July archives;
- the live corpus captured at 2026-07-11T13:11:40.871Z has 33 successful routes, Committee Questions as 200, and 6 July archives;
- rendered Horizon, Horizon JSON/RSS/ICS, and AI page/JSON records contain different dates and signal sets.

Selecting the greatest date or joining records by similar title/topic would invent an editorial conclusion.

## Decision

Production content uses a typed editorial domain while both snapshot corpora and public feeds remain immutable evidence.

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

The Home route remains its dedicated typed page. The 50 non-Home routes are statically enumerated by an authored registry behind a required catch-all with `dynamicParams = false`: Brief/current and dated archive, Signals index/topic/archive, Reg Horizon, Committee Questions, Archive, and About.

Seven explicit Server Component archetypes own layout. Their checked-in modules contain named, layout-free mastheads, judgements, ranked signals, sources, questions, evidence facts, deadlines, metrics, and archive links. No production component accepts an element tag/attribute tree or recursively renders arbitrary markup.

Archetypes and content registries remain Server Components. Client islands are limited to mobile navigation, URL-addressable Signals filtering/evidence lens, reading progress, motion preference/control, and optional archive comparison.

### Metadata and parity

Metadata and structured data derive from typed route/edition records. JSON-LD is stored as structured values and serialized safely. The sitemap includes only successful canonical typed routes; evidence fixtures, captured 404s, redirects, and mirrors are excluded.

The page checksum remains evidence but cannot prove semantic migration. A parity manifest decomposes each baseline route into text, heading, link, date, source, disclaimer, metadata, and JSON-LD atoms. Every atom must be mapped to an entity/rendered route, marked evidence-only, or linked to an approved intentional-difference decision.

## Validation

Validation fails on duplicate/malformed IDs, routes or hashes; unresolved keys/provenance; cross-channel reuse without reconciliation; invalid or cyclic edition pointers; duplicate/non-positive ranks; invalid dates; colliding source aliases; relationship endpoint mismatches; missing parity dispositions; or semantic hash mismatch.

Golden tests cover archive diff semantics, channel isolation, Committee captured-404/live-200 preservation, metadata/sitemap rules, the prohibition on max-date latest selection, the authored/capture route bijection, body-token and href parity, and the production import boundary.

Adjacent dated Brief/topic comparisons use an exact identity rule: `series namespace + authoritative source URL`. They never match by similar title, publisher, topic, or redirect, and never cross rendered/feed channels. The first observed edition is explicit; later editions compare checked-in source-backed revisions and fail closed when a revision lacks its exact source.

## Completed migration sequence

1. Types, validators, artifact/channel registry, conflicts, route registry, and parity contracts were added without changing rendering.
2. All selected live/frozen page content was normalized once into reviewed archetype data modules.
3. Brief, eight topic series and their historical editions, Signals index, Horizon, Committee, Archive, and About moved to explicit archetype components.
4. Committee's frozen 404 remains evidence while its live 200 record is the production selection.
5. Same-series exact-URL archive comparisons were added without joining channels or inferring identity.
6. Production imports of generated snapshot ASTs and the arbitrary-markup renderer were removed.

## Raw-renderer retirement gate

The production bodyHtml/element-tree renderer was removed after verifying:

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

This preserves contradictory evidence honestly, makes weekly updates record-driven, and gives cross-links/archive/motion explicit contracts. Snapshot parsing and generated element trees still exist, but only in the fixture/parity boundary used by generation and tests; production routes and components cannot import them. The cost is authored IDs, provenance locators, reconciliation, atom-level parity, archetype data modules, and local runtime validation. That cost is accepted because inference would weaken the publication's core promise: disciplined conversion from evidence into judgement.
