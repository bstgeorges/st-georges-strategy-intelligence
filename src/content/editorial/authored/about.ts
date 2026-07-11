// Authored about data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const aboutRecords = [
  {
    route: "/about/",
    status: 200,
    kind: "about",
    archetype: "about",
    sourceUrl: "https://stgeorgesstrategy.com/about/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "392781b6897be7c2cf5e66e8caeadb7823c6005fc44459d0497347271abf15f4",
    metadata: {
      title: "About | The Virtual Officer",
      description:
        "About The Virtual Officer concept, editorial model, source discipline, and St Georges Strategy context.",
      canonical: "https://stgeorgesstrategy.com/about/",
      openGraphTitle: "About | The Virtual Officer",
      openGraphDescription:
        "About The Virtual Officer concept, editorial model, source discipline, and St Georges Strategy context.",
      openGraphUrl: "https://stgeorgesstrategy.com/about/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "About | The Virtual Officer",
      twitterDescription:
        "About The Virtual Officer concept, editorial model, source discipline, and St Georges Strategy context.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "About The Virtual Officer",
        description:
          "About The Virtual Officer concept, editorial model, source discipline, and St Georges Strategy context.",
        author: {
          "@type": "Person",
          name: "Ben St Georges",
          email: "ben@stgeorgesstrategy.com",
          sameAs: "https://www.linkedin.com/in/benstgeorges/",
        },
        publisher: {
          "@type": "Organization",
          name: "St Georges Strategy",
        },
        datePublished: "2026-07-04",
        dateModified: "2026-07-04",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/about/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:854342aed4357839d6a46b88b215b20840b65569e6985c16cdf5163d2f7aaab7:/about/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/about/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "854342aed4357839d6a46b88b215b20840b65569e6985c16cdf5163d2f7aaab7",
      },
      {
        key: "live:392781b6897be7c2cf5e66e8caeadb7823c6005fc44459d0497347271abf15f4:/about/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/about/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "392781b6897be7c2cf5e66e8caeadb7823c6005fc44459d0497347271abf15f4",
      },
    ],
    content: {
      masthead: {
        eyebrow: "About",
        title: "The concept, the method, and the person behind it",
        dek: "The Virtual Officer is a public-source intelligence brief for financial-services leaders who need signals translated into practical judgement.",
        detail:
          "The Virtual Officer is the weekly intelligence product published by St Georges Strategy — SGS is the practice, The Virtual Officer is what you read each week.",
      },
      principles: [
        {
          meta: "Concept",
          title: "The Virtual Officer",
          paragraphs: [
            "A public-source intelligence system for financial services leaders who need a weekly view of what matters, what is coming, and what evidence to ask for.",
          ],
        },
        {
          meta: "About Ben",
          title: "Risk, governance, and intelligence",
          paragraphs: [
            "Over two decades across operational risk, compliance, audit, and governance, with a focus on moving risk management from control to cognition.",
          ],
        },
        {
          meta: "Method",
          title: "Source discipline",
          paragraphs: [
            "Official sources are preferred. Secondary reporting is labelled as monitoring signal. Weekly judgement is archived so the reasoning remains visible.",
          ],
        },
      ],
      standards: {
        heading: {
          eyebrow: "Source method",
          title: "What makes the brief different from a feed",
          description:
            "The credibility comes from explicit judgement: primary sources are preferred, secondary reporting is labelled rather than treated as settled fact, every important item is translated toward an owner or evidence prompt, and each week's issue is archived so the reasoning stays checkable.",
        },
        cards: [
          {
            meta: "Primary",
            title:
              "Regulators, central banks, standard setters, official company or research sources",
            paragraphs: [
              "Used for rules, deadlines, enforcement, policy movement, and official claims.",
            ],
          },
          {
            meta: "Specialist",
            title: "Legal, risk, technology, cyber, payments, and market implementation sources",
            paragraphs: ["Used for context, practical read-across, and implementation detail."],
          },
          {
            meta: "Press",
            title: "General media and market reporting",
            paragraphs: [
              "Used for incidents, market colour, and early weak signals, with care around claims and wording.",
            ],
          },
        ],
      },
      author: {
        eyebrow: "About the author",
        lede: [
          {
            kind: "text",
            value: "St Georges Strategy is written by ",
          },
          {
            kind: "strong",
            content: "Ben St Georges",
          },
          {
            kind: "text",
            value:
              ", who has spent over two decades leading operational risk, compliance, audit, and governance across financial institutions in Paris, Hong Kong, Tokyo, Montreal, and London.",
          },
        ],
        note: "The throughline of that work, and of this site, is moving risk management from control to cognition: applying data, AI, and human judgement to anticipate issues before they occur. Written in a personal capacity; views are the author's own.",
        links: [
          {
            href: "mailto:ben@stgeorgesstrategy.com",
            label: "Email Ben",
          },
          {
            href: "https://www.linkedin.com/in/benstgeorges/",
            label: "Connect on LinkedIn",
            target: "_blank",
            rel: "noopener noreferrer",
          },
        ],
      },
      status:
        "The aim is not to publish more noise. It is to preserve a disciplined weekly view of what deserves attention, what evidence should exist, and what questions senior leaders should ask.",
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "about" }>[];
