import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedRoot = resolve(sourceRoot, "..", "site-dist");
const pageRoot = existsSync(join(generatedRoot, "index.html")) ? generatedRoot : sourceRoot;
const outDir = join(sourceRoot, "qa", "responsive");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [
  { name: "320", width: 320, height: 1200 },
  { name: "390", width: 390, height: 1200 },
  { name: "768", width: 768, height: 1200 },
  { name: "1366x768", width: 1366, height: 768 },
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
  ["deep-dives", "deep-dives/index.html"],
  ["archive", "archive/index.html"],
  ["about", "about/index.html"],
];
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
};

function wait(ms) {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function waitForPageReady(page) {
  let lastState = null;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const state = await page.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({
        ready: document.readyState !== "loading",
        styled: document.styleSheets.length > 0,
      })`,
    });
    const value = state.result?.value;
    lastState = value;
    if (value?.ready && value?.styled) return;
    await wait(100);
  }
  throw new Error(`Timed out waiting for generated page styles: ${JSON.stringify(lastState)}`);
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

async function startPreviewServer() {
  const server = createServer((request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }
    const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
    let filePath = resolve(pageRoot, relativePath);
    if (filePath !== pageRoot && !filePath.startsWith(`${pageRoot}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  });
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.removeListener("error", reject);
      resolveListen();
    });
  });
  const address = server.address();
  return { server, origin: `http://127.0.0.1:${address.port}` };
}

async function checkPage(browser, previewOrigin, pageName, relativePath, viewport) {
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

  const pageUrl = new URL(relativePath, `${previewOrigin}/`).href;
  await page.send("Page.navigate", { url: pageUrl });
  await waitForPageReady(page);
  const metrics = await page.send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const doc = document.documentElement;
      const body = document.body;
      const candidates = [...document.querySelectorAll("body *")].map((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right <= window.innerWidth + 1 && rect.left >= -1) return null;
        let ancestor = el.parentElement;
        while (ancestor && ancestor !== body) {
          const overflowX = getComputedStyle(ancestor).overflowX;
          if (["auto", "scroll"].includes(overflowX) && ancestor.scrollWidth > ancestor.clientWidth) return null;
          ancestor = ancestor.parentElement;
        }
        return {
          tag: el.tagName,
          cls: el.className && String(el.className).slice(0, 80),
          text: (el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      }).filter(Boolean);
      return {
        innerWidth: window.innerWidth,
        scrollWidth: Math.max(doc.scrollWidth, body ? body.scrollWidth : 0),
        overflowing: candidates.slice(0, 8),
        undersizedNavigationTargets: window.innerWidth < 768
          ? [...document.querySelectorAll(".site-menu summary, .site-menu .site-nav a")]
            .filter((element) => element.getClientRects().length > 0 && (!element.matches("a") || element.closest("details.site-menu")?.open))
            .map((element) => ({
              text: (element.textContent || "").trim().replace(/\s+/g, " "),
              height: Math.round(element.getBoundingClientRect().height),
              width: Math.round(element.getBoundingClientRect().width),
            }))
            .filter((target) => target.width > 0 && target.height < 44)
          : [],
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
    screenshot: screenshotPath.replace(`${sourceRoot}/`, ""),
    ...value,
  };
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const { chrome, endpoint } = await launchChrome();
  const preview = await startPreviewServer();
  const port = Number(new URL(endpoint).port);
  const browser = new Cdp(endpoint);
  browser.port = port;
  await browser.ready();

  const results = [];
  try {
    for (const [pageName, relativePath] of pages) {
      for (const viewport of viewports) {
        results.push(await checkPage(browser, preview.origin, pageName, relativePath, viewport));
      }
    }
  } finally {
    browser.close();
    chrome.kill();
    preview.server.close();
  }

  const reportPath = join(outDir, "responsive-report.json");
  writeFileSync(reportPath, `${JSON.stringify(results, null, 2)}\n`);
  const failures = results.filter((result) => (
    result.scrollWidth > result.innerWidth + 1 ||
    (result.overflowing || []).length ||
    (result.undersizedNavigationTargets || []).length
  ));
  console.log(JSON.stringify({
    pages: pages.length,
    captures: results.length,
    failures: failures.length,
    report: reportPath.replace(`${sourceRoot}/`, ""),
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
