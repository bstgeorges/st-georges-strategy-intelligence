import assert from "node:assert/strict";
import test from "node:test";

import { runEditorialValidation } from "../scripts/validate-editorial.mjs";
import { editorialRepository } from "../src/content/editorial/records.ts";
import {
  diffSignalRevisions,
  resolveCurrentEdition,
  validateEditorialRepository,
} from "../src/content/editorial/validation.ts";

test("representative editorial records and immutable artifacts validate", async () => {
  assert.deepEqual(await runEditorialValidation(), {
    artifacts: 79,
    frozenHtmlArtifacts: 42,
    liveHtmlArtifacts: 33,
    series: 9,
    editions: 9,
    signals: 4,
    relationships: 6,
    routes: 4,
    parityAtoms: 33,
    checkedArtifacts: 79,
  });
});

test("current edition resolution uses the authored series pointer, never a global maximum date", () => {
  const repository = structuredClone(editorialRepository);
  repository.editions.push({
    ...repository.editions[0],
    id: "edition:weekly-brief:2099-12-31",
    label: "Test fixture only",
    effectiveDate: "2099-12-31",
  });
  assert.equal(
    resolveCurrentEdition(repository, "series:weekly-brief-html").id,
    "edition:weekly-brief:2026-07-06",
  );
});

test("Committee 404 and live 200 are preserved as distinct artifacts", () => {
  const committee = editorialRepository.artifacts.filter(
    ({ route }) => route === "/committee-questions/",
  );
  assert.deepEqual(
    committee.map(({ channel, status }) => [channel, status]),
    [
      ["frozen-html", 404],
      ["live-html", 200],
    ],
  );
});

test("Horizon HTML, JSON, RSS and ICS remain isolated unresolved channels", () => {
  const reconciliation = editorialRepository.reconciliations.find(
    ({ id }) => id === "reconciliation:horizon-json-v-rss-v-ics",
  );
  assert.equal(reconciliation?.status, "unresolved");
  assert.equal(reconciliation?.conclusion, undefined);
  assert.deepEqual(
    reconciliation?.artifactIds.map(
      (id) => editorialRepository.artifacts.find((artifact) => artifact.id === id)?.channel,
    ),
    ["horizon-json", "horizon-rss", "horizon-ics"],
  );
  assert.equal(
    editorialRepository.reconciliations.find(
      ({ id }) => id === "reconciliation:horizon-rendered-v-json-2026-07-08",
    )?.status,
    "unresolved",
  );
});

test("invalid relationship endpoints fail closed", () => {
  const repository = structuredClone(editorialRepository);
  repository.relationships[0].to.id = "judgement:missing";
  assert.throws(
    () => validateEditorialRepository(repository),
    /references missing judgement: judgement:missing/,
  );
});

test("archive diffs use stable signal IDs and semantic hashes, independent of rank", () => {
  const sameHash = "a".repeat(64);
  const oldHash = "b".repeat(64);
  const newHash = "c".repeat(64);
  assert.deepEqual(
    diffSignalRevisions(
      [
        { signalId: "signal:stable", semanticHash: sameHash },
        { signalId: "signal:changed", semanticHash: oldHash },
        { signalId: "signal:removed", semanticHash: oldHash },
      ],
      [
        { signalId: "signal:stable", semanticHash: sameHash },
        { signalId: "signal:changed", semanticHash: newHash },
        { signalId: "signal:added", semanticHash: newHash },
      ],
    ),
    {
      added: ["signal:added"],
      removed: ["signal:removed"],
      changed: ["signal:changed"],
      unchanged: ["signal:stable"],
    },
  );
});

test("every parity atom has an explicit disposition", () => {
  for (const manifest of editorialRepository.parityManifests) {
    assert.ok(manifest.atoms.length > 0);
    for (const atom of manifest.atoms) {
      assert.ok(["mapped", "intentional-difference", "evidence-only"].includes(atom.disposition));
      if (atom.disposition === "mapped") assert.ok(atom.targetRefs?.length);
      else assert.ok(atom.reason);
    }
  }
});
