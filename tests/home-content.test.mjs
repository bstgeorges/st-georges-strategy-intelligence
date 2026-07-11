import assert from "node:assert/strict";
import test from "node:test";

import {
  homeEdition,
  homeTopicStreams,
  homeTopSignals,
  primaryNavigation,
  siteDisclaimer,
} from "../src/content/editorial/home.ts";

test("the typed Home preserves the current executive glance exactly", () => {
  assert.equal(homeEdition.week, "Week of 6 Jul 2026");
  assert.equal(
    homeEdition.judgement,
    "Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, and accountable for customer outcomes — and resilient against AI-accelerated attack.",
  );
  assert.equal(
    homeEdition.boardQuestion,
    "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
  );
  assert.equal(
    homeEdition.evidenceAsk,
    "The permission map, the stop path, and the rehearsal evidence — not just the policy document.",
  );
  assert.equal(homeEdition.nearestDeadline.date, "14 Aug");
});

test("the typed Home retains all ranked signals, streams, routes, and disclaimer", () => {
  assert.equal(homeTopSignals.length, 5);
  assert.deepEqual(
    homeTopSignals.map(({ rank }) => rank),
    [1, 2, 3, 4, 5],
  );
  assert.equal(homeTopicStreams.length, 8);
  assert.equal(new Set(homeTopicStreams.map(({ href }) => href)).size, 8);
  assert.ok(primaryNavigation.some(({ href }) => href === "/committee-questions/"));
  assert.equal(
    siteDisclaimer,
    "Illustrative content based on sector-wide public sources. Not investment, legal, compliance, or regulatory advice.",
  );
});
