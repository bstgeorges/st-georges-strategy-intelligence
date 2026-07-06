import fs from "node:fs";

const workerPath = "workers/landing-page.js";
const source = fs.readFileSync(workerPath, "utf8");

if (source.includes("<x-dc") || /\{\{[^}]+\}\}/.test(source)) {
  throw new Error("Landing Worker must be static HTML. Remove x-dc/template bindings before deploy.");
}

if (!source.includes("const LANDING_HTML = `<!doctype html>")) {
  throw new Error("Landing Worker does not contain the expected static LANDING_HTML template.");
}

console.log(`${workerPath} is static and ready to deploy.`);
