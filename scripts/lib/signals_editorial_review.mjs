const DECISION_TYPE_ORDER = ["rule-change", "enforcement", "active-threat", "outage", "research", "context"];

const EMEA_JURISDICTIONS = new Set([
  "UK", "EU", "France", "Germany", "Ireland", "Spain", "Italy", "Switzerland",
  "Portugal", "Netherlands", "Belgium", "Luxembourg", "Austria", "Denmark", "Sweden",
  "Norway", "Finland", "Poland", "United Arab Emirates", "Abu Dhabi", "Dubai",
  "Saudi Arabia", "South Africa",
]);

function text(candidate) {
  // Source tags describe a feed, not necessarily the individual event. Keep
  // classification grounded in the event headline and its specific match terms.
  return `${candidate.title || ""} ${(candidate.matchedKeywords || []).join(" ")}`.toLowerCase();
}

function has(value, patterns) {
  return patterns.some((pattern) => value.includes(pattern));
}

export function classifyDecisionType(candidate) {
  const value = text(candidate);
  if (has(value, ["enforcement", "penalty", "reprimand", "fine", "charged", "prosecution", "sanctioned"])) return "enforcement";
  if (has(value, ["known exploited", "vulnerability", "exploit", "ransomware", "malware", "phishing", "cyber attack", "zero-day"])) return "active-threat";
  if (has(value, ["outage", "disruption", "service incident", "connectivity", "unavailable", "error rates", "service failure", "system failure", "cooling failure"])) return "outage";
  if (has(value, ["consultation", "guideline", "guidance", "regulation", "directive", "policy", "standard", "rule", "supervisory", "requirements", "framework"])) return "rule-change";
  if (candidate.sourceTier === "research" || (candidate.tags || []).includes("research") || has(value, ["research", "working paper", "report", "study", "evaluation", "analysis"])) return "research";
  return "context";
}

export function regionForSource(source = {}) {
  const jurisdictions = source.jurisdictions || [];
  if (jurisdictions.includes("US")) return "US";
  if (jurisdictions.some((jurisdiction) => EMEA_JURISDICTIONS.has(jurisdiction))) return "UK/EMEA";
  return "Global/other";
}

function percentage(numerator, denominator) {
  return denominator ? Math.round((numerator / denominator) * 1000) / 10 : 0;
}

function uniqueRows(candidates) {
  const byUrl = new Map();
  for (const candidate of candidates) {
    const existing = byUrl.get(candidate.url);
    if (!existing) {
      byUrl.set(candidate.url, { ...candidate, topics: [candidate.topicId] });
      continue;
    }
    existing.topics = [...new Set([...existing.topics, candidate.topicId])].sort();
    if (candidate.relevanceScore > existing.relevanceScore) Object.assign(existing, candidate, { topics: existing.topics });
  }
  return [...byUrl.values()];
}

function countPublishedRows(currentSignals, key) {
  const urls = new Set();
  for (const topic of currentSignals?.topics || []) {
    for (const row of topic[key] || []) if (row.url) urls.add(row.url);
  }
  return urls;
}

function compactCandidate(candidate, sourceRegistry) {
  const source = sourceRegistry.get(candidate.sourceRegistryId) || {};
  return {
    title: candidate.title,
    url: candidate.url,
    sourceName: candidate.sourceName,
    sourceOwner: candidate.sourceRegistryId,
    publishedAt: candidate.publishedAt,
    relevanceScore: candidate.relevanceScore,
    decisionType: classifyDecisionType(candidate),
    region: regionForSource(source),
    topics: candidate.topics,
  };
}

export function buildSourceHealth(sourceStats, historyRuns, feedRegistry) {
  const monitoringById = new Map((feedRegistry.sources || []).map((source) => [source.id, source.healthMonitoring !== false]));
  const recentRuns = (historyRuns || []).slice(-12);
  const entries = (sourceStats || []).map((stat) => {
    let consecutiveIssueRuns = 0;
    for (const run of [...recentRuns].reverse()) {
      const prior = (run.sourceStats || []).find((row) => row.sourceId === stat.sourceId);
      if (!prior || !["quiet", "failed"].includes(prior.status)) break;
      consecutiveIssueRuns += 1;
    }
    const monitored = monitoringById.get(stat.sourceId) !== false;
    const investigate = monitored && consecutiveIssueRuns >= 2;
    return {
      sourceId: stat.sourceId,
      sourceRegistryId: stat.sourceRegistryId || "",
      status: stat.status,
      consecutiveIssueRuns,
      monitoring: monitored ? "standard" : "supplementary",
      action: investigate ? "investigate" : monitored && ["quiet", "failed"].includes(stat.status) ? "watch" : "none",
      detail: stat.error || stat.reason || "",
    };
  });
  return {
    runsRetained: recentRuns.length,
    healthy: entries.filter((entry) => entry.status === "ok").length,
    watching: entries.filter((entry) => entry.action === "watch").length,
    investigate: entries.filter((entry) => entry.action === "investigate").length,
    supplementary: entries.filter((entry) => entry.monitoring === "supplementary").length,
    entries,
  };
}

export function buildEditorialReview({ candidates, currentSignals, sourceRegistry, feedRegistry, historyRuns }) {
  const flattened = uniqueRows((candidates.topics || []).flatMap((topic) => topic.candidates || []));
  const currentTop5Urls = countPublishedRows(currentSignals, "top5");
  const continuingUrls = countPublishedRows(currentSignals, "stillMaterial");
  const decisionTypes = Object.fromEntries(DECISION_TYPE_ORDER.map((type) => [type, []]));
  const sourceOwners = new Map();
  const regionalBalance = new Map([["UK/EMEA", 0], ["US", 0], ["Global/other", 0]]);

  for (const candidate of flattened) {
    const compact = compactCandidate(candidate, sourceRegistry);
    decisionTypes[compact.decisionType].push(compact);
    const owner = sourceOwners.get(compact.sourceOwner) || { sourceOwner: compact.sourceOwner, sourceName: compact.sourceName, count: 0 };
    owner.count += 1;
    sourceOwners.set(compact.sourceOwner, owner);
    regionalBalance.set(compact.region, (regionalBalance.get(compact.region) || 0) + 1);
  }

  for (const candidatesForType of Object.values(decisionTypes)) {
    candidatesForType.sort((a, b) => b.relevanceScore - a.relevanceScore || String(b.publishedAt).localeCompare(String(a.publishedAt)));
  }
  const total = flattened.length;
  const ownerRows = [...sourceOwners.values()]
    .sort((a, b) => b.count - a.count || a.sourceName.localeCompare(b.sourceName))
    .map((row) => ({ ...row, share: percentage(row.count, total) }));
  const alreadyPublished = flattened.filter((candidate) => currentTop5Urls.has(candidate.url) || continuingUrls.has(candidate.url)).length;

  return {
    decisionTypeCounts: Object.fromEntries(DECISION_TYPE_ORDER.map((type) => [type, decisionTypes[type].length])),
    decisionTypeGroups: DECISION_TYPE_ORDER.map((type) => ({
      id: type,
      label: type.replace(/-/g, " "),
      candidateCount: decisionTypes[type].length,
      candidates: decisionTypes[type].slice(0, 10),
    })).filter((group) => group.candidateCount > 0),
    diversity: {
      candidateRows: (candidates.topics || []).reduce((sum, topic) => sum + (topic.candidates || []).length, 0),
      uniqueCandidateEvents: total,
      crossThemeDuplicatesCollapsed: (candidates.topics || []).reduce((sum, topic) => sum + (topic.candidates || []).length, 0) - total,
      sourceOwnerConcentration: ownerRows.slice(0, 8),
      sourceOwnerConcentrationWarning: ownerRows[0]?.share >= 25 ? `${ownerRows[0].sourceName} supplies ${ownerRows[0].share}% of unique candidate events.` : "",
      regionalBalance: [...regionalBalance.entries()].map(([region, count]) => ({ region, count, share: percentage(count, total) })),
      newVersusContinuing: {
        newCandidateEvents: total - alreadyPublished,
        alreadyPublishedCandidates: alreadyPublished,
        continuingPublishedEvents: continuingUrls.size,
        currentEditionTop5Events: currentTop5Urls.size,
      },
    },
    sourceHealth: buildSourceHealth(candidates.sourceStats, historyRuns, feedRegistry),
  };
}

export function appendHealthRun(history, candidates) {
  const runs = [...(history?.runs || [])];
  if (runs.some((run) => run.generatedAt === candidates.generatedAt)) return { version: "signals.source-health.v1", runs };
  runs.push({
    generatedAt: candidates.generatedAt,
    mode: candidates.mode,
    sourceStats: (candidates.sourceStats || []).map((stat) => ({
      sourceId: stat.sourceId,
      sourceRegistryId: stat.sourceRegistryId || "",
      status: stat.status,
      reason: stat.reason || "",
      error: stat.error || "",
    })),
  });
  return { version: "signals.source-health.v1", runs: runs.slice(-12) };
}
