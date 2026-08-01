import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_FILE = path.join(ROOT, "dashboard", "regulatory-horizon", "latest.json");

function parseArgs(argv) {
  const options = { file: DEFAULT_FILE, asOf: new Date().toISOString().slice(0, 10), maxAgeDays: 8 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--file") options.file = path.resolve(argv[++index] || "");
    else if (arg.startsWith("--file=")) options.file = path.resolve(arg.slice("--file=".length));
    else if (arg === "--as-of") options.asOf = argv[++index] || "";
    else if (arg.startsWith("--as-of=")) options.asOf = arg.slice("--as-of=".length);
    else if (arg === "--max-age-days") options.maxAgeDays = Number(argv[++index]);
    else if (arg.startsWith("--max-age-days=")) options.maxAgeDays = Number(arg.slice("--max-age-days=".length));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));
if (!/^\d{4}-\d{2}-\d{2}$/.test(options.asOf)) throw new Error(`--as-of must use YYYY-MM-DD; received ${options.asOf}`);
if (!Number.isInteger(options.maxAgeDays) || options.maxAgeDays < 0) throw new Error("--max-age-days must be a non-negative integer");

const data = JSON.parse(fs.readFileSync(options.file, "utf8"));
if (!/^\d{4}-\d{2}-\d{2}$/.test(data.edition || "")) throw new Error("Reg Horizon edition is missing or invalid");
if (data.edition > options.asOf) throw new Error(`Reg Horizon edition ${data.edition} is later than the publication date ${options.asOf}`);
const ageDays = Math.floor((Date.parse(`${options.asOf}T00:00:00Z`) - Date.parse(`${data.edition}T00:00:00Z`)) / 86400000);
if (data.status !== "published") throw new Error(`Reg Horizon latest edition is ${data.status || "unknown"}; editorial prep requires a published reviewed edition`);
if (ageDays > options.maxAgeDays) {
  throw new Error(`Reg Horizon latest reviewed edition is ${data.edition} (${ageDays} days old; maximum allowed is ${options.maxAgeDays})`);
}

console.log(`Reg Horizon freshness passed: edition ${data.edition}, ${ageDays} day(s) old as of ${options.asOf}.`);
