import frozenManifest from "../reference/content-fidelity-manifest.json" with { type: "json" };
import liveManifest from "../live-reference/manifest.json" with { type: "json" };

import type { ArtifactId, CapturedArtifact } from "./types";

type SnapshotManifestPage = {
  route: string;
  status: 200 | 404;
  sha256: string;
  file: string;
  sourceUrl?: string;
};

function snapshotArtifacts(
  channel: "frozen-html" | "live-html",
  capturedAt: string,
  pages: readonly SnapshotManifestPage[],
): CapturedArtifact[] {
  return pages.map((page) =>
    Object.freeze({
      id: `artifact:${channel}:${page.file.replace(".json", "")}` as ArtifactId,
      channel,
      mediaType: "text/html" as const,
      sourceUrl: page.sourceUrl ?? new URL(page.route, "https://stgeorgesstrategy.com").href,
      repositoryPath: `src/content/${channel === "frozen-html" ? "reference" : "live-reference"}/${page.file}`,
      capturedAt,
      sha256: page.sha256,
      route: page.route,
      status: page.status,
    }),
  );
}

export const frozenHtmlArtifacts = Object.freeze(
  snapshotArtifacts(
    "frozen-html",
    frozenManifest.capturedAt,
    frozenManifest.pages as SnapshotManifestPage[],
  ),
);

export const liveHtmlArtifacts = Object.freeze(
  snapshotArtifacts(
    "live-html",
    liveManifest.capturedAt,
    liveManifest.pages as SnapshotManifestPage[],
  ),
);

export const machineArtifacts = Object.freeze([
  {
    id: "artifact:ai-json:2026-07-08",
    channel: "ai-json",
    mediaType: "application/json",
    sourceUrl: "https://stgeorgesstrategy.com/data/ai-signals.json",
    repositoryPath: "public/data/ai-signals.json",
    capturedAt: "2026-07-10T14:16:05Z",
    sha256: "dba24549d76f233549c096e66cee2c11dbd7c4d1e8ff7b9aa23db57cffe377b8",
  },
  {
    id: "artifact:horizon-json:2026-07-08",
    channel: "horizon-json",
    mediaType: "application/json",
    sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/latest.json",
    repositoryPath: "public/regulatory-horizon/latest.json",
    capturedAt: "2026-07-10T14:16:05Z",
    sha256: "e989b716bab26276a473221b9c285ce607049a0a396538b37a6336a1abfcf1d6",
  },
  {
    id: "artifact:horizon-rss:2026-07-04",
    channel: "horizon-rss",
    mediaType: "application/rss+xml",
    sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/feed.xml",
    repositoryPath: "public/regulatory-horizon/feed.xml",
    capturedAt: "2026-07-10T14:16:05Z",
    sha256: "2f1f0347f063a106f8ac9d494b9407488b33ac85e68e85d4c1bc69017fa4d5d4",
  },
  {
    id: "artifact:horizon-ics:2026-07-04",
    channel: "horizon-ics",
    mediaType: "text/calendar",
    sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/horizon.ics",
    repositoryPath: "public/regulatory-horizon/horizon.ics",
    capturedAt: "2026-07-10T14:16:05Z",
    sha256: "855a432b2e26fa89df3965bc3337bb9146ac60266d790ae5fc10d7fcba3f305d",
  },
] as const satisfies readonly CapturedArtifact[]);

export const capturedArtifacts = Object.freeze([
  ...frozenHtmlArtifacts,
  ...liveHtmlArtifacts,
  ...machineArtifacts,
]);

export const frozenArtifactForRoute = (route: string) =>
  frozenHtmlArtifacts.find((artifact) => artifact.route === route);

export const liveArtifactForRoute = (route: string) =>
  liveHtmlArtifacts.find((artifact) => artifact.route === route);
