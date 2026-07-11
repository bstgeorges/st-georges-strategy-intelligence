# ADR 0001 — Preserve the audited edition as typed static content

## Decision

Use Next.js App Router 16.2.10 with static generation. Every audited HTML page is imported into a typed `PageSnapshot` record containing route, status, metadata, JSON-LD, body HTML, capture source, and checksum. A single static renderer serves the route graph; machine endpoints remain independent public files.

## Rationale

The reference contains 41 successful pages and one capture-time 404 with large, exact editorial bodies and two historical editions. Snapshot-backed content preserves wording, links, attribution, archived differences, DOM classes, and source metadata without duplicating page components or risking transcription drift. Adding an edition is a content import, not a layout copy.

The renderer is intentionally small and server-first. Trusted, repository-owned snapshot HTML is rendered with `dangerouslySetInnerHTML`; untrusted runtime HTML is never accepted. Presentation remains in the measured stylesheet, and enhancement JavaScript is isolated to a small client boundary.

## Constraints

- Stage A must match the initial audited edition, including the Committee 404 and broken hero asset.
- Original dynamic JSON/RSS/ICS endpoints and useful static fallbacks remain available.
- No CMS/auth dependency is introduced. A future admin can write validated snapshot/content records through the same schema boundary.
- Route metadata is generated from the content records, with archived canonical relationships preserved.

## Rejected alternatives

- Hand-transcribing every page into JSX: high fidelity and maintenance risk with no user-visible benefit.
- Serving a copied static directory without an application layer: weak validation, metadata control, route testing, and enhancement boundaries.
- Shipping an improvised client-only admin editor: not production-secure and not required for public delivery.
