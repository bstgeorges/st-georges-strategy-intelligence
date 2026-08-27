import assert from "node:assert/strict";
import test from "node:test";
import { resolveRedirect } from "../workers/site-routes.mjs";

test("www requests permanently redirect to the apex while retaining query strings", () => {
  const redirect = resolveRedirect("https://www.stgeorgesstrategy.com/brief/?source=mail");
  assert.deepEqual(redirect, { location: "https://stgeorgesstrategy.com/brief/?source=mail", status: 301 });
});

test("legacy route mappings retain the established destinations", () => {
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/ai-signals/archive/2026-08-16/?x=1"), {
    location: "https://stgeorgesstrategy.com/signals/ai/archive/2026-08-16/?x=1",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://intelligence.stgeorgesstrategy.com/archive/2026-08-16/"), {
    location: "https://stgeorgesstrategy.com/archive/brief/2026-08-16/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/intelligence/anything-else"), {
    location: "https://stgeorgesstrategy.com/brief/",
    status: 301,
  });
  assert.deepEqual(resolveRedirect("https://intelligence.stgeorgesstrategy.com/regulatory-horizon/"), {
    location: "https://stgeorgesstrategy.com/archive/",
    status: 301,
  });
});

test("current directories are canonicalised and normal asset paths are not intercepted", () => {
  assert.deepEqual(resolveRedirect("https://stgeorgesstrategy.com/signals/ai"), {
    location: "https://stgeorgesstrategy.com/signals/ai/",
    status: 308,
  });
  assert.equal(resolveRedirect("https://stgeorgesstrategy.com/assets/hero.svg"), null);
});
