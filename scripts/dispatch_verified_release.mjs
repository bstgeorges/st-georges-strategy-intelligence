import { pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const apiBase = "https://api.github.com/repos/bstgeorges/st-georges-strategy-intelligence";

export async function dispatchRelease({ sha, token, request = fetch, wait = delay, timeoutMs = 45 * 60_000, now = Date.now }) {
  if (!/^[a-f0-9]{40}$/i.test(sha || "")) throw new Error("A full 40-character commit SHA is required.");
  if (!token) throw new Error("GH_TOKEN is required, with Actions read and write permissions.");
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2026-03-10",
    "Content-Type": "application/json",
  };
  // Dispatch exactly once: on an ambiguous network failure do not create a
  // duplicate release. A human can inspect Actions before retrying.
  const dispatched = await request(`${apiBase}/actions/workflows/cloudflare-pages-publish.yml/dispatches`, {
    method: "POST", headers,
    body: JSON.stringify({ ref: "main", inputs: { target: "production", expected_sha: sha } }),
  });
  if (!dispatched.ok) throw new Error(`Release dispatch failed (HTTP ${dispatched.status}). Check Actions before retrying.`);
  const receipt = await dispatched.json();
  if (!Number.isSafeInteger(receipt.workflow_run_id) || receipt.workflow_run_id <= 0) {
    throw new Error("Dispatch did not return a run ID. Check Actions before retrying.");
  }
  const runId = receipt.workflow_run_id;
  const deadline = now() + timeoutMs;
  while (now() < deadline) {
    const response = await request(`${apiBase}/actions/runs/${runId}`, { headers });
    if (!response.ok) throw new Error(`Cannot inspect release run ${runId} (HTTP ${response.status}).`);
    const run = await response.json();
    if (run.id !== runId || run.head_sha?.toLowerCase() !== sha.toLowerCase() || run.event !== "workflow_dispatch") {
      throw new Error(`Release run ${runId} does not match the requested dispatch and commit.`);
    }
    if (run.status === "completed") {
      if (run.conclusion !== "success") throw new Error(`Release run ${runId} finished with ${run.conclusion || "no conclusion"}.`);
      return { runId, url: `https://github.com/bstgeorges/st-georges-strategy-intelligence/actions/runs/${runId}`, sha };
    }
    await wait(10_000);
  }
  throw new Error(`Timed out waiting for release run ${runId}; inspect it before retrying.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await dispatchRelease({ sha: process.argv[2], token: process.env.GH_TOKEN });
    console.log(`Verified production release ${result.sha}: ${result.url}`);
  } catch (error) {
    console.error(`Production release not verified: ${error.message}`);
    process.exitCode = 1;
  }
}
