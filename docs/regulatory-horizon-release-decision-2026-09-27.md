# Regulatory Horizon — public-release decision, 27 September 2026

## Current evidence state

The private register is at its strongest recorded state as of 26 September:

- 100/100 private QA; no correctness warnings or errors;
- 13 maintained confirmed milestones, including eight genuinely upcoming dates;
- seven contributing authorities, with no authority above the concentration threshold;
- all seven core authorities healthy across three distinct-day shadow runs;
- 48 of 53 configured sources healthy, with five governed exceptions kept explicit.

This establishes a reliable private evidence process. It does **not** establish universal regulatory completeness or organisational applicability.

## Decision for the 27 September release

### Option A — retain the public hold (recommended unless a product decision is made)

Publish the standard Weekly Brief, Signals and Committee Questions package. Keep the existing public redirect to Archive. The private preview and register remain the place to improve reader experience and coverage.

### Option B — restore Regulatory Horizon as a separately reviewed public product

This requires both named approvers to record the decision in `dashboard/regulatory-deadline-register/relaunch-approval.json` against scanner edition `2026-09-26`, including a reasoned statement of reader value and scope.

Approval is necessary but not sufficient. The release must also include a reviewed public-product change that:

1. replaces the withdrawn route and navigation deliberately;
2. uses only confirmed upcoming dates with official links;
3. states its source and applicability limits plainly, without reader-facing scanner-health or private-review machinery;
4. adds the route to the sitemap/canonical contract and verifies trailing-slash routing;
5. passes the normal site build, bundle, link, responsive and guarded Cloudflare-release checks.

## Approval wording to complete only after review

> We approve restoration of Regulatory Horizon as a limited reader-facing date register, using confirmed upcoming primary-source dates only. It is a monitoring aid, not a statement of organisational applicability or market completeness. We have reviewed the 26 September private evidence state, the source-limit wording and the reader preview.

Do not mark `approved: true` merely to make the page appear. If either approver does not accept the product scope above, retain Option A and revisit after the next private scan.
