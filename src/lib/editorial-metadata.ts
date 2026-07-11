import type { Metadata } from "next";

import type { EditorialDocument } from "@/content/editorial/document-types";

const twitterCards = new Set(["summary", "summary_large_image", "player", "app"]);

export function toEditorialMetadata(document: EditorialDocument): Metadata {
  const source = document.metadata;
  const hasOpenGraph = Boolean(
    source.openGraphTitle ||
    source.openGraphDescription ||
    source.openGraphUrl ||
    source.openGraphImage,
  );
  const twitterCard =
    source.twitterCard && twitterCards.has(source.twitterCard)
      ? (source.twitterCard as "summary" | "summary_large_image" | "player" | "app")
      : undefined;
  const hasTwitter = Boolean(twitterCard || source.twitterTitle || source.twitterDescription);

  return {
    title: source.title,
    description: source.description,
    ...(source.canonical ? { alternates: { canonical: source.canonical } } : {}),
    ...(source.robots ? { robots: source.robots } : {}),
    ...(hasOpenGraph
      ? {
          openGraph: {
            type: "article" as const,
            siteName: "St Georges Strategy",
            title: source.openGraphTitle ?? source.title,
            description: source.openGraphDescription ?? source.description,
            url: source.openGraphUrl ?? source.canonical,
            images: source.openGraphImage ? [{ url: source.openGraphImage }] : undefined,
          },
        }
      : {}),
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
