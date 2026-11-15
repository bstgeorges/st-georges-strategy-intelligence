import { test } from "node:test";
import assert from "node:assert/strict";
import { dispatchRelease } from "./dispatch_verified_release.mjs";

const sha = "a".repeat(40);
const json = (value) => ({ ok: true, json: async () => value });

test("dispatches the exact revision and waits for its successful run", async () => {
  const calls = [];
  const request = async (url, options) => {
    calls.push({ url, options });
    if (calls.length === 1) return json({ workflow_run_id: 42 });
    return json({ id: 42, event: "workflow_dispatch", head_sha: sha, status: calls.length === 2 ? "in_progress" : "completed", conclusion: "success" });
  };
  const result = await dispatchRelease({ sha, token: "test", request, wait: async () => {} });
  assert.equal(result.runId, 42);
  assert.deepEqual(JSON.parse(calls[0].options.body), { ref: "main", inputs: { target: "production", expected_sha: sha } });
  assert.equal(calls.length, 3);
});

test("does not report success for a failed or different run", async () => {
  for (const run of [
    { id: 42, event: "workflow_dispatch", head_sha: sha, status: "completed", conclusion: "failure" },
    { id: 42, event: "workflow_dispatch", head_sha: "b".repeat(40), status: "completed", conclusion: "success" },
  ]) {
    let calls = 0;
    await assert.rejects(dispatchRelease({ sha, token: "test", request: async () => json(++calls === 1 ? { workflow_run_id: 42 } : run) }));
    assert.equal(calls, 2);
  }
});

test("does not retry a dispatch without an identifiable run", async () => {
  let calls = 0;
  await assert.rejects(dispatchRelease({ sha, token: "test", request: async () => { calls += 1; return json({}); } }));
  assert.equal(calls, 1);
});
