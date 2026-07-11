import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { editorialRepository } from "../src/content/editorial/records.ts";
import { validateEditorialRepository } from "../src/content/editorial/validation.ts";

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = path.dirname(scriptRoot);

const invariant = (condition, message) => {
  if (!condition) throw new Error(message);
};

export async function validateEditorialArtifacts(projectRoot = defaultProjectRoot) {
  for (const artifact of editorialRepository.artifacts) {
    const contents = await readFile(path.join(projectRoot, artifact.repositoryPath), "utf8");
    if (artifact.mediaType === "text/html") {
      const snapshot = JSON.parse(contents);
      invariant(snapshot.route === artifact.route, `Artifact route drift: ${artifact.id}`);
      invariant(snapshot.status === artifact.status, `Artifact status drift: ${artifact.id}`);
      invariant(snapshot.sha256 === artifact.sha256, `Artifact checksum drift: ${artifact.id}`);
      invariant(
        snapshot.capturedAt === artifact.capturedAt,
        `Artifact capture-time drift: ${artifact.id}`,
      );
    } else {
      const hash = createHash("sha256").update(contents).digest("hex");
      invariant(hash === artifact.sha256, `Machine artifact checksum drift: ${artifact.id}`);
    }
  }

  const frozenCommittee = editorialRepository.artifacts.find(
    ({ channel, route }) => channel === "frozen-html" && route === "/committee-questions/",
  );
  const liveCommittee = editorialRepository.artifacts.find(
    ({ channel, route }) => channel === "live-html" && route === "/committee-questions/",
  );
  invariant(
    frozenCommittee?.status === 404,
    "Frozen Committee Questions must remain a 404 artifact",
  );
  invariant(liveCommittee?.status === 200, "Live Committee Questions must remain a 200 artifact");

  return { checkedArtifacts: editorialRepository.artifacts.length };
}

export async function runEditorialValidation(projectRoot = defaultProjectRoot) {
  return {
    ...validateEditorialRepository(editorialRepository),
    ...(await validateEditorialArtifacts(projectRoot)),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify({ ok: true, ...(await runEditorialValidation()) }, null, 2));
}
