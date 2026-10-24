import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_ROOT = path.resolve(process.argv[2] || process.env.REG_HORIZON_PRIVATE_DIR || path.join(ROOT, ".private-horizon"));
const REQUIRED_FILES = [
  "dashboard/regulatory-deadline-register/register.json",
  "dashboard/regulatory-deadline-register/changes.json",
  "dashboard/regulatory-deadline-register/qa.json",
  "tools/reg-scan/docs/latest.json",
];
const COPY_PATHS = [
  "dashboard/regulatory-deadline-register",
  "tools/reg-scan/docs",
  "tools/reg-scan/state/scan.db",
];

function copyPath(relativePath) {
  const source = path.join(PRIVATE_ROOT, relativePath);
  const destination = path.join(ROOT, relativePath);
  if (!fs.existsSync(source)) {
    if (relativePath.endsWith("scan.db")) return;
    throw new Error(`Private Regulatory Horizon input is missing: ${relativePath}`);
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}

for (const relativePath of REQUIRED_FILES) {
  if (!fs.existsSync(path.join(PRIVATE_ROOT, relativePath))) {
    throw new Error(`Private Regulatory Horizon input is missing: ${relativePath}`);
  }
}

for (const relativePath of COPY_PATHS) copyPath(relativePath);

console.log(`Loaded private Regulatory Horizon inputs from ${path.relative(ROOT, PRIVATE_ROOT) || PRIVATE_ROOT}.`);
