import assert from "node:assert/strict";
import test from "node:test";
import { renderPreview } from "./render_regulatory_horizon_preview.mjs";

test("omits the comparison strip from a first Regulatory Horizon edition", () => {
  const html = renderPreview({
    register: {
      asOf: "2026-09-26",
      items: [{
        status: "confirmed",
        deadline: "2026-10-06",
        title: "Example consultation",
        url: "https://example.test/consultation",
        authority: { name: "Example authority" },
        stage: "consultation",
      }],
    },
    changes: { notReconfirmed: [{ id: "carry-forward" }] },
    editorial: { firstEdition: true },
  });

  assert.doesNotMatch(html, /Change since last review/);
  assert.match(html, /The next decision windows/);
});
