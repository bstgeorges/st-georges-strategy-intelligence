import { spawn } from "node:child_process";

const baseURL = "http://127.0.0.1:8787";
const preview = spawn("npm", ["run", "cf:preview"], {
  detached: process.platform !== "win32",
  env: { ...process.env, CI: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let previewLog = "";
preview.stdout.on("data", (chunk) => {
  previewLog += chunk;
});
preview.stderr.on("data", (chunk) => {
  previewLog += chunk;
});

const stopPreview = () => {
  if (preview.exitCode !== null) return;
  try {
    if (process.platform === "win32") preview.kill("SIGTERM");
    else process.kill(-preview.pid, "SIGTERM");
  } catch {
    preview.kill("SIGTERM");
  }
};

async function waitForPreview() {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (preview.exitCode !== null) throw new Error(`Workerd exited early:\n${previewLog}`);
    try {
      const response = await fetch(baseURL);
      if (response.status === 200) return;
    } catch {
      // Workerd is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Workerd did not become ready:\n${previewLog}`);
}

async function run(command, args, extraEnvironment) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: { ...process.env, ...extraEnvironment },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

try {
  await waitForPreview();
  await run("node", ["scripts/verify-home.mjs"], { SGS_BASE_URL: baseURL });
  await run("node", ["scripts/verify-archetypes.mjs"], { BASE_URL: baseURL });
  await run("node", ["scripts/verify-release.mjs"], { BASE_URL: baseURL });
  await run("node", ["scripts/profile-motion.mjs"], { BASE_URL: baseURL });
  console.log(JSON.stringify({ ok: true, runtime: "workerd", baseURL }, null, 2));
} finally {
  stopPreview();
}
