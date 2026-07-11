import type { MetadataRoute } from "next";

import { publicEditorialRegistry } from "@/content/editorial/public-registry";
import type { JsonValue } from "@/content/editorial/document-types";
import { editorialCanonical } from "@/lib/editorial-metadata";

const canonicalOrigin = "https://stgeorgesstrategy.com";

function objectValue(
  value: JsonValue | undefined,
): Readonly<Record<string, JsonValue>> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Readonly<Record<string, JsonValue>>)
    : undefined;
}

function editorialDate(value: JsonValue | undefined): string | undefined {
  const record = objectValue(value);
  const date = record?.dateModified ?? record?.datePublished;
  return typeof date === "string" && /^\d{4}-\d{2}-\d{2}/.test(date) ? date : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = publicEditorialRegistry.map(
    ({ route, archetype, metadata, selectionReason }) => ({
      url: editorialCanonical({ route, archetype, metadata }),
      ...(editorialDate(metadata.structuredData)
        ? { lastModified: editorialDate(metadata.structuredData) }
        : {}),
      changeFrequency:
        selectionReason === "frozen-historical" ? ("never" as const) : ("weekly" as const),
      priority: route === "/" ? 1 : archetype === "archive" || archetype === "about" ? 0.6 : 0.8,
    }),
  );
  const urls = new Set<string>();
  for (const [index, entry] of entries.entries()) {
    const route = publicEditorialRegistry[index].route;
    const url = new URL(entry.url);
    if (url.origin !== canonicalOrigin || url.pathname !== route || url.search || url.hash) {
      throw new Error(`Sitemap URL does not identify ${route}: ${entry.url}`);
    }
    if (urls.has(entry.url)) throw new Error(`Duplicate sitemap URL: ${entry.url}`);
    urls.add(entry.url);
  }
  return entries;
}
