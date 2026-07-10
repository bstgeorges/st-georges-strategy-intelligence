# St Georges Strategy task registry

Reference capture: `2026-07-10T14:16:05Z` (`2026-07-10 15:16:05 BST`)

| ID | Outcome | Difficulty | Risk | Independence | Ownership | Dependencies | Mode / tier | Budget | Acceptance / validation | Status / handoff |
| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- |
| P0 | Repository/authority baseline recorded | 1 | 2 | 5 | Lead; `.codex/`, `docs/project_state/` | None | lead-local / Tier A | small | Workspace, Git, tooling, instructions recorded | Complete; blank non-Git workspace confirmed |
| R1 | Complete same-origin route, content, metadata, and link inventory | 3 | 3 | 5 | Recon agent; `docs/route-inventory.md`, `docs/asset-content-inventory.md`, `artifacts/reference/recon/` | P0 | delegated `explore` / Tier C | medium | Crawl reports canonical URLs, status, content/data endpoints, internal/outbound links, redirects | Pending |
| R2 | Measured responsive visual/reference audit | 4 | 4 | 5 | Fidelity agent; `docs/reference-site-audit.md`, `artifacts/reference/screenshots/` | P0 | delegated `vision` / Tier A | large | Representative screenshots at 1440×900, 1280×800, 768×1024, 390×844 plus computed tokens | Pending |
| A1 | Architecture, content schemas, route contracts, and tokens | 4 | 4 | 2 | Lead; `docs/architecture/`, `src/content/`, `src/lib/`, shared configs | R1, R2 | lead-local / Tier A | large | Typecheck + schema/content validation; one real record passes | Pending |
| I1 | Faithful global shell and home vertical slice | 5 | 5 | 2 | Lead; shared shell/components/styles/home | A1 | lead-local / Tier A | large | Four target viewports; no console errors; visual verdict ≥90 | Pending |
| I2 | Full public route/content implementation | 5 | 5 | 3 | Lead + bounded route agents after contracts | I1 | delegated `executor` / Tier B with lead integration | large | Route inventory 100% accounted for; content fidelity/link checks pass | Pending |
| Q1 | Stage A independent fidelity audit and repair list | 4 | 4 | 5 | QA agent; `docs/project_state/fidelity-review.md` | I2 | delegated `verifier` / Tier A | medium | All archetypes sampled; critical/high mismatches ranked with evidence | Pending |
| M1 | Motion language and enhancement implementation | 4 | 4 | 3 | Lead; motion components/tokens + `docs/motion-language.md` | Q1 | lead-local / Tier A | medium | Purposeful motion; reduced motion immediate; no CLS/scroll traps | Pending |
| Q2 | Accessibility, performance, SEO, resilience, integrated QA | 5 | 5 | 3 | Lead + focused verifier | M1 | mixed / Tier A+B | large | Verification matrix passes or true external blockers separated | Pending |
| D1 | Docs, clean-build proof, Vercel-ready packaging | 3 | 3 | 3 | Lead; README/docs/config | Q2 | lead-local / Tier B | medium | Another engineer can install, run, update content, build, deploy | Pending |

## Operating constraints

- The workspace began empty and was not a Git repository.
- No remote deployment, DNS, push, or production mutation is authorized.
- Generated browser artifacts remain local and must not include sensitive context.
- Lead owns shared contracts and integration; delegated agents must not edit shared implementation files until ownership is assigned.
- Token usage is recorded qualitatively because exact per-agent estimates are unavailable.

