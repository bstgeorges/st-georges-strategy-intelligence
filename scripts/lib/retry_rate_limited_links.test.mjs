import { test } from "node:test";
import assert from "node:assert/strict";
import { retryRateLimitedLinks } from "./retry_rate_limited_links.mjs";

test("rechecks rate-limited links and accepts an actual successful response", async () => {
  const results = [{ url: "https://example.test/a", status: 429, ok: false }, { url: "https://example.test/b", status: 404, ok: false }];
  const waits = [];
  let calls = 0;
  await retryRateLimitedLinks(results, async (url) => ({ url, status: ++calls === 1 ? 429 : 200, ok: calls > 1 }),
    { wait: async (ms) => waits.push(ms), delays: [5, 10, 20] });
  assert.equal(results[0].status, 200);
  assert.equal(results[1].status, 404);
  assert.deepEqual(waits, [5, 10]);
});

test("persistent throttling stays a failure after bounded retries", async () => {
  const results = [{ url: "https://example.test/a", status: 429, ok: false }];
  let calls = 0;
  await retryRateLimitedLinks(results, async (url) => { calls += 1; return { url, status: 429, ok: false }; },
    { wait: async () => {}, delays: [5, 10, 20] });
  assert.equal(calls, 3);
  assert.equal(results[0].ok, false);
});
