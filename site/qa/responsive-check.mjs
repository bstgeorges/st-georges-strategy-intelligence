import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "qa", "responsive");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [
  { name: "320", width: 320, height: 1200 },
  { name: "390", width: 390, height: 1200 },
  { name: "768", width: 768, height: 1200 },
  { name: "1440", width: 1440, height: 1200 },
];

const pages = [
  ["home", "index.html"],
  ["brief", "brief/index.html"],
  ["signals", "signals/index.html"],
  ["signals-ai", "signals/ai/index.html"],
  ["signals-resilience", "signals/resilience/index.html"],
  ["signals-third-party", "signals/third-party/index.html"],
  ["signals-market-structure", "signals/market-structure/index.html"],
  ["signals-financial-crime", "signals/financial-crime/index.html"],
  ["signals-cyber", "signals/cyber/index.html"],
  ["signals-technology-failure", "signals/technology-failure/index.html"],
  ["signals-data", "signals/data/index.html"],
  ["regulatory-horizon", "regulatory-horizon/index.html"],
  ["archive", "archive/index.html"],
  ["about", "about/index.html"],
];

function wait(ms) {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

function requestJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.json();
  });
}

class Cdp {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.socket = new WebSocket(url);
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve: finish, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else finish(message.result || {});
      }
    });
  }

  ready() {
    return new Promise((resolveReady, reject) => {
      this.socket.addEventListener("open", resolveReady, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    const promise = new Promise((resolveSend, reject) => {
      this.pending.set(id, { resolve: resolveSend, reject });
    });
    this.socket.send(payload);
    return promise;
  }

  close() {
    this.socket.close();
  }
}

async function launchChrome() {
  const userDataDir = join(tmpdir(), `sgs-responsive-chrome-${Date.now()}`);
  mkdirSync(userDataDir, { recursive: true });
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ]);

  let stderr = "";
  const endpoint = await new Promise((resolveEndpoint, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out waiting for Chrome DevTools endpoint")), 15000);
    chrome.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolveEndpoint(match[1]);
      }
    });
    chrome.on("error", reject);
    chrome.on("exit", (code) => {
      if (code !== null && code !== 0) reject(new Error(`Chrome exited early with ${code}`));
    });
  });

  return { chrome, endpoint };
}

async function checkPage(browser, pageName, relativePath, viewport) {
  const target = await browser.send("Target.createTarget", { url: "about:blank" });
  const info = await requestJson(`http://127.0.0.1:${browser.port}/json/list`);
  const targetInfo = info.find((entry) => entry.id === target.targetId);
  const page = new Cdp(targetInfo.webSocketDebuggerUrl);
  await page.ready();
  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 768,
  });

  const fileUrl = pathToFileURL(join(root, relativePath)).href;
  await page.send("Page.navigate", { url: fileUrl });
  await wait(650);
  const metrics = await page.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const doc = document.documentElement;
      const body = document.body;
      const candidates = [...document.querySelectorAll("body *")].map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          cls: el.className && String(el.className).slice(0, 80),
          text: (el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      }).filter((item) => item.right > window.innerWidth + 1 || item.left < -1);
      return {
        innerWidth: window.innerWidth,
        scrollWidth: Math.max(doc.scrollWidth, body ? body.scrollWidth : 0),
        overflowing: candidates.slice(0, 8),
      };
    })()`,
  });

  const screenshot = await page.send("Page.captureScreenshot", { format: "png" });
  const screenshotPath = join(outDir, `${pageName}-${viewport.name}.png`);
  writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));
  await page.close();
  await browser.send("Target.closeTarget", { targetId: target.targetId });
  const value = metrics.result?.value || {
    innerWidth: viewport.width,
    scrollWidth: viewport.width,
    overflowing: [],
    metricWarning: "Runtime metrics unavailable",
  };
  return {
    page: pageName,
    viewport: viewport.name,
    screenshot: screenshotPath.replace(`${root}/`, ""),
    ...value,
  };
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const { chrome, endpoint } = await launchChrome();
  const port = Number(new URL(endpoint).port);
  const browser = new Cdp(endpoint);
  browser.port = port;
  await browser.ready();

  const results = [];
  try {
    for (const [pageName, relativePath] of pages) {
      for (const viewport of viewports) {
        results.push(await checkPage(browser, pageName, relativePath, viewport));
      }
    }
  } finally {
    browser.close();
    chrome.kill();
  }

  const reportPath = join(outDir, "responsive-report.json");
  writeFileSync(reportPath, `${JSON.stringify(results, null, 2)}\n`);
  const failures = results.filter((result) => result.scrollWidth > result.innerWidth + 1 || (result.overflowing || []).length);
  console.log(JSON.stringify({
    pages: pages.length,
    captures: results.length,
    failures: failures.length,
    report: reportPath.replace(`${root}/`, ""),
  }, null, 2));
  if (failures.length) {
    console.log(JSON.stringify(failures.slice(0, 10), null, 2));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
