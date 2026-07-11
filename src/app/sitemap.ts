import type { MetadataRoute } from "next";

import { editorialDocumentRegistry } from "@/content/editorial/document-registry";
import type { JsonValue } from "@/content/editorial/document-types";

const origin = "https://stgeorgesstrategy.com";

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
  return editorialDocumentRegistry.map(({ route, archetype, document, selectionReason }) => ({
    url: document.metadata.canonical ?? new URL(route, origin).href,
    ...(editorialDate(document.metadata.structuredData)
      ? { lastModified: editorialDate(document.metadata.structuredData) }
      : {}),
    changeFrequency: selectionReason === "frozen-historical" ? "never" : "weekly",
    priority: route === "/" ? 1 : archetype === "archive" || archetype === "about" ? 0.6 : 0.8,
  }));
}
