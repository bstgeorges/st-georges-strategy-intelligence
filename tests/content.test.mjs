import assert from "node:assert/strict";
import test from "node:test";

import {
  loadSnapshots,
  validateMachineContent,
  validateSnapshots,
} from "../scripts/content-validation.mjs";

test("the audited route graph and relationships are complete", async () => {
  const result = validateSnapshots(await loadSnapshots());
  assert.deepEqual(result, { pages: 42, routes: 42, topics: 8 });
});

test("machine-readable editorial feeds retain their audited shape", async () => {
  const result = await validateMachineContent();
  assert.equal(result.aiSha256, "dba24549d76f233549c096e66cee2c11dbd7c4d1e8ff7b9aa23db57cffe377b8");
  assert.equal(
    result.horizonSha256,
    "e989b716bab26276a473221b9c285ce607049a0a396538b37a6336a1abfcf1d6",
  );
});
