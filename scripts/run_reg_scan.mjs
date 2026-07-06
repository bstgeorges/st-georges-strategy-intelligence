import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REG_SCAN = path.join(ROOT, "tools", "reg-scan");
const LOCAL_PYTHON = path.join(ROOT, ".venv-reg-scan", "bin", "python");

function pythonCommand() {
  if (process.env.REG_SCAN_PYTHON) return process.env.REG_SCAN_PYTHON;
  if (fs.existsSync(LOCAL_PYTHON)) return LOCAL_PYTHON;
  return "python3";
}

function main() {
  const [command, ...extra] = process.argv.slice(2);
  const python = pythonCommand();
  let args;

  if (command === "test") args = ["tests/test_units.py", ...extra];
  else if (command === "dry-run") args = ["-m", "scan", "--dry-run", ...extra];
  else if (command === "run") args = ["-m", "scan", ...extra];
  else {
    throw new Error("Usage: node scripts/run_reg_scan.mjs <test|dry-run|run> [extra args]");
  }

  const result = spawnSync(python, args, {
    cwd: REG_SCAN,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
