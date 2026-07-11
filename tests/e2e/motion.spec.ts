import { expect, test } from "@playwright/test";

test("motion preference follows live OS changes until the reader chooses an override", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect(page.locator("html")).toHaveAttribute("data-motion-source", "system");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator("html")).toHaveAttribute("data-motion-source", "system");
  await expect
    .poll(() =>
      page.evaluate(
        () => document.getAnimations().filter(({ playState }) => playState === "running").length,
      ),
    )
    .toBe(0);

  await page.locator('.sgs-motion-controls label:has(input[value="full"])').click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect(page.locator("html")).toHaveAttribute("data-motion-source", "user");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("sgs-motion-preference")))
    .toBe("full");
});

test("the six semantic families expose distinct authored states", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  await expect(page.locator('[data-home-motion="orientation"]')).toHaveCount(1);
  await expect(page.locator('[data-home-motion="signal"]')).toHaveCount(1);
  await expect(page.locator('[data-home-motion="convergence"]')).toHaveCount(1);
  await expect(page.locator('[data-home-motion="translation"]')).toHaveCount(1);
  await expect(page.locator('[data-home-motion="priority"]')).toHaveCount(1);
  await expect(page.locator('[data-home-motion="time"]')).toHaveCount(1);

  for (const family of ["convergence", "priority", "time"] as const) {
    const region = page.locator(`[data-home-motion="${family}"]`);
    await region.scrollIntoViewIfNeeded();
    await expect(region).toHaveAttribute("data-motion-played", "true");
  }
  await expect(page.locator("[data-motion-stage='6']")).toHaveAttribute(
    "data-motion-state",
    /stage-6-settled|active/,
  );
  await expect(page.locator("[data-motion-rank='1']")).toHaveAttribute(
    "data-motion-state",
    "prioritised",
  );
  await expect(page.locator("[data-motion-time='deadline']")).toHaveAttribute(
    "data-motion-state",
    /deadline-settled|active/,
  );
});

test("deep archetypes carry source, question, time, priority and archive semantics", async ({
  page,
}) => {
  const routes = [
    ["/brief/", "priority"],
    ["/signals/ai/", "signal"],
    ["/committee-questions/", "translation"],
    ["/regulatory-horizon/", "time"],
    ["/archive/", "archive"],
  ] as const;

  for (const [route, family] of routes) {
    await page.goto(route);
    const element = page.locator(`[data-editorial-motion="${family}"]`).first();
    await expect(element, `${route} should expose ${family}`).toBeVisible();
    await element.scrollIntoViewIfNeeded();
    await expect(element).toHaveAttribute("data-motion-played", "true");
  }
});

test("reduced and JavaScript-disabled documents retain every motion-labelled fact", async ({
  browser,
}) => {
  const reducedContext = await browser.newContext({ reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/");
  await expect(reducedPage.locator("[data-home-motion]")).toHaveCount(6);
  await expect(reducedPage.locator("[data-motion-played='true']")).toHaveCount(0);
  await reducedContext.close();

  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator("[data-home-motion]")).toHaveCount(6);
  await expect(staticPage.getByRole("heading", { name: /How public information/i })).toBeVisible();
  await expect(staticPage.getByText(/14 Aug — needs an owner/i).first()).toBeVisible();
  await staticContext.close();
});

test("keyboard focus receives the same stream and deadline feedback as pointer input", async ({
  page,
}) => {
  await page.goto("/");
  const stream = page.locator(".sgs-stream-grid a").first();
  await stream.focus();
  await expect
    .poll(() => stream.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe("rgba(0, 0, 0, 0)");
  expect(await stream.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe(
    "none",
  );

  const deadline = page.locator(".sgs-horizon-grid a").last();
  await deadline.focus();
  await expect(deadline).toBeFocused();
  await expect
    .poll(() => deadline.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe("rgba(0, 0, 0, 0)");
});
