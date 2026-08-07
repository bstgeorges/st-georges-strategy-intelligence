const HEALTHY_STATUSES = new Set(["ok"]);
const UNAVAILABLE_STATUSES = new Set(["blocked", "failed", "degraded", "not-configured"]);

function number(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

/**
 * Return the single coverage vocabulary used by the scanner, editorial review,
 * validation, and release readiness. Raw scan participation and the reviewed
 * public shortlist are deliberately separate measures.
 */
export function deriveHorizonCoverage(data, reviewedSignals = data.signals || []) {
  const participation = data.runMetrics?.sourceParticipation || data.sourceHealth || [];
  const configured = number(data.runMetrics?.sourcesConfigured) || participation.length;
  const healthy = participation.filter((entry) => HEALTHY_STATUSES.has(entry.status)).length;
  const candidateAuthorities = participation.filter((entry) => number(entry.candidateItems) > 0).length;
  const materialAuthorities = participation.filter((entry) => number(entry.materialItems) > 0).length;
  const unavailable = participation.filter((entry) => UNAVAILABLE_STATUSES.has(entry.status));
  const reviewedAuthorities = unique(reviewedSignals.map((signal) => signal.source));
  const reviewedJurisdictions = unique(reviewedSignals.flatMap((signal) => signal.jurisdictions || []));
  const limited = configured > 0 && reviewedAuthorities.length / configured < 0.5;

  return {
    version: "horizon-coverage.v1",
    configuredPrimaryAuthorities: configured,
    successfullyFetchedAuthorities: healthy,
    authoritiesWithCandidates: candidateAuthorities,
    authoritiesWithMaterialCandidates: materialAuthorities,
    reviewedAuthorities: reviewedAuthorities.length,
    publishedAuthorities: reviewedAuthorities.length,
    publishedJurisdictions: reviewedJurisdictions.length,
    blockedAuthorities: unavailable.filter((entry) => entry.status === "blocked").length,
    failedAuthorities: unavailable.filter((entry) => entry.status === "failed").length,
    degradedAuthorities: unavailable.filter((entry) => ["degraded", "not-configured"].includes(entry.status)).length,
    state: limited ? "limited" : "broad",
  };
}

export function legacyCoverageLabel(coverage) {
  return `${coverage.publishedAuthorities} of ${coverage.configuredPrimaryAuthorities}`;
}

export function validateHorizonCoverage(data, assert) {
  const actual = data.coverage;
  assert(actual && actual.version === "horizon-coverage.v1", "coverage must use horizon-coverage.v1");
  if (!actual || actual.version !== "horizon-coverage.v1") return;

  const expected = deriveHorizonCoverage(data);
  for (const key of Object.keys(expected)) {
    assert(actual[key] === expected[key], `coverage.${key} must match the reviewed edition inputs`);
  }
  assert(
    actual.successfullyFetchedAuthorities + actual.blockedAuthorities + actual.failedAuthorities + actual.degradedAuthorities <= actual.configuredPrimaryAuthorities,
    "coverage counts must not exceed configured primary authorities",
  );
}
