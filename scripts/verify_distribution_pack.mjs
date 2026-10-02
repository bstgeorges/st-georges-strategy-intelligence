import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertDistributionPack,
  distributionPackFileName,
  linkedinTemplateFileName,
  renderLinkedinDistributionTemplate,
} from "./lib/distribution_pack.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT_DIR = path.join(ROOT, "release-artifacts", "distribution");

function argValue(name) {
  const argv = process.argv.slice(2);
  const index = argv.indexOf(name);
  if (index >= 0) return argv[index + 1] || "";
  const prefix = `${name}=`;
  return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length) || "";
}

const edition = JSON.parse(fs.readFileSync(path.join(ROOT, "site/data/current-edition.json"), "utf8"));
const deepDiveLibrary = JSON.parse(fs.readFileSync(path.join(ROOT, "site/data/deep-dives.json"), "utf8")).items || [];
const outDir = path.resolve(ROOT, argValue("--out-dir") || DEFAULT_OUT_DIR);
const packPath = path.join(outDir, distributionPackFileName(edition));
if (!fs.existsSync(packPath)) throw new Error(`Distribution pack is missing: ${path.relative(ROOT, packPath)}`);
const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
assertDistributionPack(pack, edition, deepDiveLibrary);
const linkedinPath = path.join(outDir, linkedinTemplateFileName(edition));
if (!fs.existsSync(linkedinPath)) throw new Error(`LinkedIn template is missing: ${path.relative(ROOT, linkedinPath)}`);
if (fs.readFileSync(linkedinPath, "utf8") !== renderLinkedinDistributionTemplate(pack)) {
  throw new Error("LinkedIn template has drifted from the approved distribution pack.");
}

console.log(`Distribution pack verified for ${edition.publicationDate}.`);
