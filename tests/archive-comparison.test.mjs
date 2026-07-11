import assert from "node:assert/strict";
import test from "node:test";

import { buildArchiveComparison } from "../src/components/site/archive-comparison-model.ts";

const hash = (character) => character.repeat(64);
const source = (id, publisher) => ({
  id,
  publisher,
  title: `${publisher} source`,
  url: `https://example.com/${publisher.toLowerCase()}`,
  sourceClass: "primary",
  provenance: [],
});
const revision = (signalId, semanticHash, sourceId, title = signalId) => ({
  id: `signal-revision:${signalId.slice("signal:".length)}:${semanticHash[0]}`,
  signalId,
  editionId: "edition:test:2026-07-11",
  title,
  implication: `${title} implication`,
  semanticHash,
  sourceIds: [sourceId],
  provenance: [],
});

test("adjacent archive comparison classifies stable IDs and preserves source evidence", () => {
  const previous = [
    revision("signal:unchanged", hash("a"), "source:stable"),
    revision("signal:revised", hash("b"), "source:old", "Old revision"),
    revision("signal:removed", hash("c"), "source:removed"),
  ];
  const current = [
    revision("signal:unchanged", hash("a"), "source:stable"),
    revision("signal:revised", hash("d"), "source:new", "Current revision"),
    revision("signal:added", hash("e"), "source:added"),
  ];
  const groups = buildArchiveComparison(previous, current, [
    source("source:stable", "Stable authority"),
    source("source:old", "Old authority"),
    source("source:new", "Current authority"),
    source("source:removed", "Removed authority"),
    source("source:added", "Added authority"),
  ]);

  assert.deepEqual(
    groups.map(({ status, items }) => [
      status,
      items.map(({ signalId, title, sources }) => [
        signalId,
        title,
        sources.map(({ publisher }) => publisher),
      ]),
    ]),
    [
      ["added", [["signal:added", "signal:added", ["Added authority"]]]],
      ["removed", [["signal:removed", "signal:removed", ["Removed authority"]]]],
      ["revised", [["signal:revised", "Current revision", ["Current authority"]]]],
      ["unchanged", [["signal:unchanged", "signal:unchanged", ["Stable authority"]]]],
    ],
  );
});

test("archive comparison fails closed when a status cannot cite its source", () => {
  assert.throws(
    () => buildArchiveComparison([], [revision("signal:added", hash("a"), "source:missing")], []),
    /missing source: source:missing/,
  );
});
