import type { Metadata } from "next";

import type {
  EditorialDocumentArchetype,
  EditorialDocumentMetadata,
  JsonValue,
} from "@/content/editorial/document-types";

const twitterCards = new Set(["summary", "summary_large_image", "player", "app"]);
export const editorialOrigin = "https://stgeorgesstrategy.com";

export interface EditorialMetadataSource {
  readonly route: string;
  readonly archetype: EditorialDocumentArchetype;
  readonly metadata: EditorialDocumentMetadata;
}

export function editorialCanonical(document: EditorialMetadataSource): string {
  return new URL(document.route, editorialOrigin).href;
}

function objectValue(
  value: JsonValue | undefined,
): Readonly<Record<string, JsonValue>> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Readonly<Record<string, JsonValue>>)
    : undefined;
}

/**
 * Preserve captured schema fields while making the selected route the sole public identity.
 * Capture-time canonical aliases remain evidence, but must not collapse dated archive routes.
 */
export function editorialStructuredData(
  document: EditorialMetadataSource,
): Readonly<Record<string, JsonValue>> {
  const canonical = editorialCanonical(document);
  const source = document.metadata.structuredData;
  const sourceMainEntity = objectValue(source?.mainEntityOfPage);

  return {
    ...(source ?? {
      "@context": "https://schema.org",
      "@type": document.archetype === "archive" ? "CollectionPage" : "WebPage",
      name: document.metadata.title,
      ...(document.metadata.description ? { description: document.metadata.description } : {}),
    }),
    "@id": canonical,
    url: canonical,
    mainEntityOfPage: {
      ...(sourceMainEntity ?? {}),
      "@type": sourceMainEntity?.["@type"] ?? "WebPage",
      "@id": canonical,
    },
  };
}

export function toEditorialMetadata(document: EditorialMetadataSource): Metadata {
  const source = document.metadata;
  const canonical = editorialCanonical(document);
  const twitterCard =
    source.twitterCard && twitterCards.has(source.twitterCard)
      ? (source.twitterCard as "summary" | "summary_large_image" | "player" | "app")
      : undefined;
  const hasTwitter = Boolean(twitterCard || source.twitterTitle || source.twitterDescription);

  return {
    title: source.title,
    description: source.description,
    alternates: { canonical },
    ...(source.robots ? { robots: source.robots } : {}),
    openGraph: {
      type: document.archetype === "home" ? ("website" as const) : ("article" as const),
      siteName: "St Georges Strategy",
      title: source.openGraphTitle ?? source.title,
      description: source.openGraphDescription ?? source.description,
      url: canonical,
      images: source.openGraphImage ? [{ url: source.openGraphImage }] : undefined,
    },
    ...(hasTwitter
      ? {
          twitter: {
            card: twitterCard,
            title: source.twitterTitle ?? source.title,
            description: source.twitterDescription ?? source.description,
          },
        }
      : {}),
  };
}
