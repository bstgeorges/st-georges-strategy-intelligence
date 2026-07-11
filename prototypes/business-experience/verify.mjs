import { chromium } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173/";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 844 },
];
const directions = ["spine", "observatory"];
const failures = [];
const results = [];

const browser = await chromium.launch();

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

  for (const direction of directions) {
    await page.goto(`${baseUrl}#${direction}`, { waitUntil: "networkidle" });
    await page.locator('label[for="motion-full"]').click();
    await page.evaluate(() => window.prototypeMotion?.finish());
    const selectedDirection = await page
      .locator("[data-direction]:visible")
      .getAttribute("data-direction");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    const mainText = await page.locator("main").innerText();
    const motionMode = await page.evaluate(() => window.prototypeMotion?.mode);

    if (selectedDirection !== direction)
      failures.push(`${viewport.name}/${direction}: wrong direction`);
    if (overflow > 0)
      failures.push(`${viewport.name}/${direction}: ${overflow}px horizontal overflow`);
    if (!mainText.includes("Can we stop an agent quickly")) {
      failures.push(`${viewport.name}/${direction}: board question missing`);
    }
    if (!mainText.includes("14 Aug"))
      failures.push(`${viewport.name}/${direction}: deadline missing`);

    await page.screenshot({
      path: `prototypes/business-experience/screenshots/${direction}-${viewport.width}x${viewport.height}-verified-full.png`,
      fullPage: false,
    });

    await page.locator('label[for="motion-reduced"]').click();
    const reducedMode = await page.evaluate(() => window.prototypeMotion?.mode);
    const runningAnimations = await page.evaluate(
      () =>
        document.getAnimations().filter((animation) => animation.playState === "running").length,
    );
    if (reducedMode !== "reduced")
      failures.push(`${viewport.name}/${direction}: reduced mode not active`);
    if (runningAnimations !== 0) {
      failures.push(
        `${viewport.name}/${direction}: ${runningAnimations} animations running in reduced mode`,
      );
    }
    await page.screenshot({
      path: `prototypes/business-experience/screenshots/${direction}-${viewport.width}x${viewport.height}-verified-reduced.png`,
      fullPage: false,
    });

    results.push({
      viewport: `${viewport.width}x${viewport.height}`,
      direction,
      motionMode,
      reducedMode,
      overflow,
      consoleErrors: consoleErrors.length,
      failedRequests: failedRequests.length,
    });
  }

  if (consoleErrors.length)
    failures.push(`${viewport.name}: console errors: ${consoleErrors.join(" | ")}`);
  if (failedRequests.length)
    failures.push(`${viewport.name}: failed requests: ${failedRequests.join(" | ")}`);
  await context.close();
}

const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const keyboardPage = await keyboardContext.newPage();
await keyboardPage.goto(`${baseUrl}#spine`, { waitUntil: "networkidle" });
await keyboardPage.getByRole("link", { name: /Observatory/ }).focus();
await keyboardPage.keyboard.press("Enter");
if (
  (await keyboardPage.locator("[data-direction]:visible").getAttribute("data-direction")) !==
  "observatory"
) {
  failures.push("keyboard: direction switch did not activate");
}
await keyboardPage.getByRole("button", { name: "Cyber" }).focus();
await keyboardPage.keyboard.press("Enter");
if (
  (await keyboardPage.getByRole("button", { name: "Cyber" }).getAttribute("aria-pressed")) !==
  "true"
) {
  failures.push("keyboard: evidence lens selection did not activate");
}
await keyboardContext.close();

const staticContext = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const staticPage = await staticContext.newPage();
await staticPage.goto(baseUrl, { waitUntil: "networkidle" });
const staticText = await staticPage.locator("main").innerText();
const staticDirections = await staticPage.locator("[data-direction]").count();
const staticVisibleDirections = await staticPage.locator("[data-direction]:visible").count();
if (staticDirections !== 2 || staticVisibleDirections !== 2) {
  failures.push(
    `js-disabled: expected two visible directions, got ${staticVisibleDirections}/${staticDirections}`,
  );
}
for (const required of [
  "What changed, why it matters, what to ask for next",
  "Eight streams. One weekly pattern.",
  "Can we stop an agent quickly",
  "14 Aug",
]) {
  if (!staticText.includes(required)) failures.push(`js-disabled: missing ${required}`);
}
if ((await staticPage.evaluate(() => document.documentElement.scrollWidth - innerWidth)) > 0) {
  failures.push("js-disabled: horizontal overflow");
}
await staticContext.close();

await browser.close();

console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
