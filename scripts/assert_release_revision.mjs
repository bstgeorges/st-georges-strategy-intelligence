import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// An automated dispatch names the commit it prepared. Refuse to deploy if the
// branch moved before GitHub started the release, or checkout is inconsistent.
export function assertReleaseRevision({ expected, workflow, checkedOut }) {
  const sha = /^[0-9a-f]{40}$/i;
  if (!sha.test(workflow || "") || !sha.test(checkedOut || "")) {
    throw new Error("Workflow and checkout revisions must be full Git commit SHAs.");
  }
  if (workflow.toLowerCase() !== checkedOut.toLowerCase()) {
    throw new Error("Checked-out commit does not match the workflow revision.");
  }
  if (expected && (!sha.test(expected) || expected.toLowerCase() !== workflow.toLowerCase())) {
    throw new Error("Requested release commit does not match the workflow revision.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    assertReleaseRevision({
      expected: process.env.EXPECTED_RELEASE_SHA || "",
      workflow: process.env.WORKFLOW_RELEASE_SHA || "",
      checkedOut: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    });
    console.log("Release revision verified.");
  } catch (error) {
    console.error(`Release revision check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
