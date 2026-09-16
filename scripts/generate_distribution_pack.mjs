import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildDistributionPack, distributionPackFileName } from "./lib/distribution_pack.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT_DIR = path.join(ROOT, "release-artifacts", "distribution");

function outputDirectory(argv) {
  const index = argv.indexOf("--out-dir");
  const value = index >= 0 ? argv[index + 1] : argv.find((arg) => arg.startsWith("--out-dir="))?.slice("--out-dir=".length);
  if (index >= 0 && !value) throw new Error("Pass a directory after --out-dir.");
  return value ? path.resolve(ROOT, value) : DEFAULT_OUT_DIR;
}

const edition = JSON.parse(fs.readFileSync(path.join(ROOT, "site/data/current-edition.json"), "utf8"));
const pack = buildDistributionPack(edition);
const outDir = outputDirectory(process.argv.slice(2));
fs.mkdirSync(outDir, { recursive: true });
const output = path.join(outDir, distributionPackFileName(edition));
fs.writeFileSync(output, `${JSON.stringify(pack, null, 2)}\n`);
console.log(`Distribution pack written to ${path.relative(ROOT, output)}`);
