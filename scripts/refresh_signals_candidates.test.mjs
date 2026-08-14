import assert from "node:assert/strict";
import test from "node:test";

import {
  assessCandidateQuality,
  canonicaliseUrl,
  dedupeEntriesByTitle,
  inferDateFromUrl,
  isRecent,
  matchesKeywords,
  parseRssOrAtom,
  parseSitemap,
  relevanceScore,
  topicRelevance,
} from "./refresh_signals_candidates.mjs";

test("missing feed dates can be recovered from official dated URLs", () => {
  assert.equal(inferDateFromUrl("https://www.fsa.go.jp/en/news/20260717/report.html"), "2026-07-17T00:00:00.000Z");
  assert.equal(inferDateFromUrl("https://example.com/20261340/report.html"), "");
});

test("RSS 1.0 dc:date fields are preserved for freshness checks", () => {
  const xml = `<rdf:RDF><item><title>ICT risk report</title><link>https://example.com/report</link><dc:date>2026-06-02</dc:date></item></rdf:RDF>`;
  assert.equal(parseRssOrAtom(xml, { maxItems: 8 })[0].publishedAt, "2026-06-02T00:00:00.000Z");
});

test("freshness accepts current records and rejects future-dated or undated records", () => {
  const now = new Date("2026-07-18T12:00:00.000Z");
  assert.equal(isRecent("2026-07-10T00:00:00.000Z", 14, now), true);
  assert.equal(isRecent("2026-07-21T00:00:00.000Z", 14, now), false);
  assert.equal(isRecent("", 14, now), false);
  assert.equal(isRecent("not-a-date", 14, now), false);
});

test("candidate quality warnings expose empty, thin and concentrated topics", () => {
  const warnings = assessCandidateQuality([
    { id: "technology-failure", candidates: [] },
    { id: "data", candidates: [{ ingestSourceId: "a" }] },
    { id: "cyber", candidates: [1, 2, 3, 4].map(() => ({ ingestSourceId: "ncsc" })) },
  ]);
  assert.ok(warnings.some((warning) => warning.includes("technology-failure has no candidates")));
  assert.ok(warnings.some((warning) => warning.includes("data has only 1")));
  assert.ok(warnings.some((warning) => warning.includes("cyber relies on ncsc for 4/4")));
});

test("canonicaliseUrl removes tracking parameters without removing useful query data", () => {
  assert.equal(
    canonicaliseUrl("https://example.com/news/item/?utm_id=1&document=42#section"),
    "https://example.com/news/item?document=42",
  );
});

test("sitemap ingestion includes research and publication pages and honours configured paths", () => {
  const xml = `
    <urlset>
      <url><loc>https://example.com/research/model-risk</loc><lastmod>2026-07-17</lastmod></url>
      <url><loc>https://example.com/about</loc></url>
      <url><loc>https://example.com/insights/cloud-risk</loc></url>
    </urlset>`;
  assert.deepEqual(parseSitemap(xml, { maxItems: 8 }).map((row) => row.url), ["https://example.com/research/model-risk"]);
  assert.deepEqual(
    parseSitemap(xml, { maxItems: 8, pathPatterns: ["/insights/"] }).map((row) => row.url),
    ["https://example.com/insights/cloud-risk"],
  );
});

test("sitemap ingestion ranks recent entries before applying the source cap", () => {
  const xml = `<urlset>
    <url><loc>https://example.com/research/old</loc><lastmod>2026-01-01</lastmod></url>
    <url><loc>https://example.com/research/new</loc><lastmod>2026-07-17</lastmod></url>
  </urlset>`;
  assert.deepEqual(parseSitemap(xml, { maxItems: 1 }).map((row) => row.url), ["https://example.com/research/new"]);
});

test("multi-topic feeds only route an entry to topics supported by its text", () => {
  const source = { topics: ["ai", "third-party", "cyber"] };
  const entry = { title: "Cloud supplier concentration raises outsourcing concerns", summary: "" };
  assert.equal(topicRelevance(entry, source, "third-party").accepted, true);
  assert.equal(topicRelevance(entry, source, "ai").accepted, false);
  assert.equal(topicRelevance(entry, source, "cyber").accepted, false);
});

test("third-party routing recognises the common plural form", () => {
  const source = { topics: ["market-structure", "third-party"] };
  const entry = { title: "Regulators designate critical third parties", summary: "" };
  assert.equal(topicRelevance(entry, source, "third-party").accepted, true);
});

test("multilingual topic vocabulary routes French and German headlines", () => {
  const source = { topics: ["cyber", "technology-failure"] };
  assert.equal(topicRelevance({ title: "Vulnérabilité critique", summary: "" }, source, "cyber").accepted, true);
  assert.equal(topicRelevance({ title: "Störung nach Systemausfall", summary: "" }, source, "technology-failure").accepted, true);
});

test("summary boilerplate cannot route a multi-topic feed without explicit opt-in", () => {
  const source = { topics: ["market-structure", "cyber", "resilience"] };
  const weak = { title: "Committee appointment announced", summary: "The role supports operational oversight." };
  const corroborated = { title: "Committee appointment announced", summary: "The role supports operational resilience and recovery." };
  assert.equal(topicRelevance(weak, source, "market-structure").accepted, false);
  assert.equal(topicRelevance(corroborated, source, "resilience").accepted, false);
  assert.equal(
    topicRelevance(corroborated, { ...source, allowSummaryOnlyTopicMatch: true }, "resilience").accepted,
    true,
  );
});

test("topicKeywordHints can override the default topic vocabulary", () => {
  const source = {
    topics: ["ai", "third-party"],
    topicKeywordHints: { ai: ["foundation model"], "third-party": ["provider dependency"] },
  };
  const entry = { title: "Foundation model release", summary: "" };
  assert.equal(topicRelevance(entry, source, "ai").accepted, true);
  assert.equal(topicRelevance(entry, source, "third-party").accepted, false);
});

test("source title and exclusion hints suppress high-volume feed noise", () => {
  const source = { titleKeywordHints: ["known exploited"], excludeKeywordHints: ["competition"] };
  assert.equal(matchesKeywords({ title: "Known exploited vulnerabilities", summary: "" }, source), true);
  assert.equal(matchesKeywords({ title: "Industrial controller", summary: "Known exploited issue" }, source), false);
  assert.equal(matchesKeywords({ title: "Known exploited competition", summary: "" }, source), false);
});

test("provider-status feeds collapse repeated updates with the same incident title", () => {
  const entries = [
    { title: "Service disruption: Increased Error Rates", url: "https://status.example/1" },
    { title: "Service disruption: Increased Error Rates", url: "https://status.example/2" },
    { title: "Connectivity issue", url: "https://status.example/3" },
  ];
  assert.deepEqual(
    dedupeEntriesByTitle(entries, { dedupeTitles: true }).map((entry) => entry.url),
    ["https://status.example/1", "https://status.example/3"],
  );
  assert.equal(dedupeEntriesByTitle(entries, {}).length, 3);
});

test("provider disruption wording routes to the thin dependency and failure topics", () => {
  const source = {
    topics: ["third-party", "technology-failure"],
    topicKeywordHints: {
      "third-party": ["service disruption", "connectivity"],
      "technology-failure": ["service disruption", "connectivity"],
    },
  };
  const entry = { title: "Service disruption: Increased Connectivity Issues", summary: "" };
  assert.equal(topicRelevance(entry, source, "third-party").accepted, true);
  assert.equal(topicRelevance(entry, source, "technology-failure").accepted, true);
});

test("ranking rewards primary sources, freshness and stronger topic evidence", () => {
  const fresh = { publishedAt: "2026-07-17T00:00:00.000Z" };
  const now = new Date("2026-07-18T00:00:00.000Z");
  assert.ok(
    relevanceScore(fresh, { tier: "primary" }, ["market", "liquidity"], now) >
      relevanceScore(fresh, { tier: "press" }, ["market"], now),
  );
});

test("ranking is capped at the candidate contract maximum", () => {
  const now = new Date("2026-07-18T00:00:00.000Z");
  assert.equal(
    relevanceScore(
      { publishedAt: "2026-07-18T00:00:00.000Z" },
      { tier: "primary" },
      ["outage", "failure", "disruption", "incident"],
      now,
      ["outage", "failure", "disruption", "incident"],
    ),
    100,
  );
});
