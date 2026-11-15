import { test } from "node:test";
import assert from "node:assert/strict";
import { assertReleaseRevision } from "./assert_release_revision.mjs";

const a = "a".repeat(40);
const b = "b".repeat(40);

test("accepts a matching automated release and an ordinary push", () => {
  assert.doesNotThrow(() => assertReleaseRevision({ expected: a, workflow: a, checkedOut: a }));
  assert.doesNotThrow(() => assertReleaseRevision({ expected: "", workflow: a, checkedOut: a }));
});

test("rejects a changed branch, mismatched checkout, and abbreviated revisions", () => {
  assert.throws(() => assertReleaseRevision({ expected: a, workflow: b, checkedOut: b }));
  assert.throws(() => assertReleaseRevision({ expected: a, workflow: a, checkedOut: b }));
  assert.throws(() => assertReleaseRevision({ expected: a.slice(0, 7), workflow: a, checkedOut: a }));
});
