// Authored archive data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const archiveRecords = [
  {
    route: "/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "ac1989a12e6a9dc7f2fce9829907a1a24cee4d76bdd5cffab05334bcf270a3a3",
    metadata: {
      title: "Archive | The Virtual Officer",
      description:
        "The Virtual Officer archive for dated weekly briefs, Signals topic pages, and Reg Horizon editions.",
      canonical: "https://stgeorgesstrategy.com/archive/",
      openGraphTitle: "Archive | The Virtual Officer",
      openGraphDescription:
        "The Virtual Officer archive for dated weekly briefs, Signals topic pages, and Reg Horizon editions.",
      openGraphUrl: "https://stgeorgesstrategy.com/archive/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Archive | The Virtual Officer",
      twitterDescription:
        "The Virtual Officer archive for dated weekly briefs, Signals topic pages, and Reg Horizon editions.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Archive",
        description:
          "The Virtual Officer archive for dated weekly briefs, Signals topic pages, and Reg Horizon editions.",
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
        dateModified: "2026-07-11",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/archive/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:f7229963209e2413d4ffddac5eb2924412fe61ce2a95f59ea8ada5429f142a74:/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "f7229963209e2413d4ffddac5eb2924412fe61ce2a95f59ea8ada5429f142a74",
      },
      {
        key: "live:ac1989a12e6a9dc7f2fce9829907a1a24cee4d76bdd5cffab05334bcf270a3a3:/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "ac1989a12e6a9dc7f2fce9829907a1a24cee4d76bdd5cffab05334bcf270a3a3",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive",
        title: "The dated trail",
        dek: "Every weekly brief and supporting topic page is preserved so readers can see what changed, when it changed, and how the source trail evolved.",
        detail: "Last updated 9 Jul 2026 · 2 dated editions archived so far",
      },
      groups: [
        {
          purpose: "editions",
          heading: {
            eyebrow: "Archive model",
            title: "Preserve issues and topic trails",
            description:
              "The archive lets a reader trace what mattered in a given week and then follow the supporting topic pages behind that judgement.",
          },
          cards: [
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Weekly brief archive",
              href: "/archive/brief/",
              paragraphs: ["Every dated issue, preserved as published."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "AI, agents, and control evidence.",
              href: "/signals/ai/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Failure paths, fallback evidence, and customer impact.",
              href: "/signals/resilience/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Dependencies that look internal when they fail.",
              href: "/signals/third-party/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Capital, liquidity, infrastructure, and concentration risk.",
              href: "/signals/market-structure/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Fraud, scams, sanctions, and control evidence.",
              href: "/signals/financial-crime/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Threats, vulnerabilities, identity, and response.",
              href: "/signals/cyber/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Outages, change failure, data integrity, and recovery.",
              href: "/signals/technology-failure/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "1 edition archived, latest 2026-07-06",
              title: "Lineage, reporting, privacy, and evidence integrity.",
              href: "/signals/data/archive/",
              paragraphs: ["Top 5 shortlist, additional evidence rows, and source trail."],
            },
            {
              meta: "Reg Horizon",
              title: "Reg Horizon scan / 2026-07-08",
              href: "/regulatory-horizon/",
              paragraphs: [
                "Public-source horizon scan with bottom line, deadline, material signals, and machine outputs.",
              ],
            },
          ],
        },
        {
          purpose: "notes",
          cards: [
            {
              meta: "Weekly",
              title: "Brief archive",
              paragraphs: [
                "One issue per week, preserving the so-what, top 5, questions, and source trail.",
              ],
            },
            {
              meta: "Topic",
              title: "Signal archive",
              paragraphs: [
                "Each topic page keeps its dated shortlist and additional evidence rows, so all eight signal streams can be traced separately.",
              ],
            },
            {
              meta: "Forward",
              title: "Reg Horizon archive",
              paragraphs: [
                "Each horizon edition preserves the deadlines, owner prompts, and evidence expectations visible at that point in time.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    route: "/archive/brief/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/archive/brief/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "5ebc943e180526a43ea4f8576404d5a2c2987bb5d0b45867afd0d5b5432c551c",
    metadata: {
      title: "Weekly Brief Archive | The Virtual Officer",
      description: "Every dated edition of the weekly brief, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:a6dcd7fa966dbbe0cf9090f1099e843ff17e96eda33d076c1469eefa9bad9825:/archive/brief/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/brief/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "a6dcd7fa966dbbe0cf9090f1099e843ff17e96eda33d076c1469eefa9bad9825",
      },
      {
        key: "live:5ebc943e180526a43ea4f8576404d5a2c2987bb5d0b45867afd0d5b5432c551c:/archive/brief/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/brief/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "5ebc943e180526a43ea4f8576404d5a2c2987bb5d0b45867afd0d5b5432c551c",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Weekly Brief",
        title: "Weekly Brief Archive | The Virtual Officer",
        dek: "Every dated edition of the weekly brief, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Weekly Brief — 2026-07-06",
              href: "/archive/brief/2026-07-06/",
              paragraphs: ["Open the brief exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/archive/",
              content: "Back to the archive",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/ai/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "268eea8ecad45ecaa17b62d1cb52d049090d7cece7d50aec602fbc53d3721670",
    metadata: {
      title: "AI, agents, and control evidence Archive | The Virtual Officer",
      description: "Every dated edition of the ai topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:1af8b3e277f6f8907dc42cff56c553ce21e44e4083e348465fe5383c3b724062:/signals/ai/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "1af8b3e277f6f8907dc42cff56c553ce21e44e4083e348465fe5383c3b724062",
      },
      {
        key: "live:268eea8ecad45ecaa17b62d1cb52d049090d7cece7d50aec602fbc53d3721670:/signals/ai/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "268eea8ecad45ecaa17b62d1cb52d049090d7cece7d50aec602fbc53d3721670",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / ai",
        title: "AI, agents, and control evidence Archive | The Virtual Officer",
        dek: "Every dated edition of the ai topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "AI, agents, and control evidence — 2026-07-06",
              href: "/signals/ai/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/ai/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/cyber/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "8c0876d8d423a8e1d47c675a9615355705f781051a863d6331fc8e8445aa57e2",
    metadata: {
      title: "Threats, vulnerabilities, identity, and response Archive | The Virtual Officer",
      description: "Every dated edition of the cyber topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:7daa1df7496aca1fb915f2ed5ad32d6eb403c0d82d673e96bf6ed5c84364e1ba:/signals/cyber/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "7daa1df7496aca1fb915f2ed5ad32d6eb403c0d82d673e96bf6ed5c84364e1ba",
      },
      {
        key: "live:8c0876d8d423a8e1d47c675a9615355705f781051a863d6331fc8e8445aa57e2:/signals/cyber/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "8c0876d8d423a8e1d47c675a9615355705f781051a863d6331fc8e8445aa57e2",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / cyber",
        title: "Threats, vulnerabilities, identity, and response Archive | The Virtual Officer",
        dek: "Every dated edition of the cyber topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Threats, vulnerabilities, identity, and response — 2026-07-06",
              href: "/signals/cyber/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/cyber/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/data/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "2acf5519051e9ae3874b18dfe93070129346e3851909c3338b05c5f13e114a49",
    metadata: {
      title: "Lineage, reporting, privacy, and evidence integrity Archive | The Virtual Officer",
      description: "Every dated edition of the data topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:9525ce7e41726ffdeddc40287e56619c5cc14b08651abbd85c6cc6514d9dcf49:/signals/data/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "9525ce7e41726ffdeddc40287e56619c5cc14b08651abbd85c6cc6514d9dcf49",
      },
      {
        key: "live:2acf5519051e9ae3874b18dfe93070129346e3851909c3338b05c5f13e114a49:/signals/data/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "2acf5519051e9ae3874b18dfe93070129346e3851909c3338b05c5f13e114a49",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / data",
        title: "Lineage, reporting, privacy, and evidence integrity Archive | The Virtual Officer",
        dek: "Every dated edition of the data topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Lineage, reporting, privacy, and evidence integrity — 2026-07-06",
              href: "/signals/data/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/data/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/financial-crime/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "010946d8d3ce11e11404921e3961a800b1a03b8e964c6fd1c2a5be198e6e9b2d",
    metadata: {
      title: "Fraud, scams, sanctions, and control evidence Archive | The Virtual Officer",
      description:
        "Every dated edition of the financial crime topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:c8dc65541d0220bd74b6a19e1d98a3834a61e65074cc883080aa16868dfa5b82:/signals/financial-crime/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "c8dc65541d0220bd74b6a19e1d98a3834a61e65074cc883080aa16868dfa5b82",
      },
      {
        key: "live:010946d8d3ce11e11404921e3961a800b1a03b8e964c6fd1c2a5be198e6e9b2d:/signals/financial-crime/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "010946d8d3ce11e11404921e3961a800b1a03b8e964c6fd1c2a5be198e6e9b2d",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / financial-crime",
        title: "Fraud, scams, sanctions, and control evidence Archive | The Virtual Officer",
        dek: "Every dated edition of the financial crime topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Fraud, scams, sanctions, and control evidence — 2026-07-06",
              href: "/signals/financial-crime/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/financial-crime/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/market-structure/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "456753d0223796948b61cd817d70582cd9460e05359b17dc83f04ce40ada5449",
    metadata: {
      title:
        "Capital, liquidity, infrastructure, and concentration risk Archive | The Virtual Officer",
      description:
        "Every dated edition of the market structure topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:aa284c6bcd36bec2ff2e4cee429ff15f0e92716e0171d42c66948cd598a8c871:/signals/market-structure/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "aa284c6bcd36bec2ff2e4cee429ff15f0e92716e0171d42c66948cd598a8c871",
      },
      {
        key: "live:456753d0223796948b61cd817d70582cd9460e05359b17dc83f04ce40ada5449:/signals/market-structure/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "456753d0223796948b61cd817d70582cd9460e05359b17dc83f04ce40ada5449",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / market-structure",
        title:
          "Capital, liquidity, infrastructure, and concentration risk Archive | The Virtual Officer",
        dek: "Every dated edition of the market structure topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Capital, liquidity, infrastructure, and concentration risk — 2026-07-06",
              href: "/signals/market-structure/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/market-structure/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/resilience/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "23a72f3ad5df360b9986566cfd6deb47d49cf954ce5eecdb11dff72298db96cb",
    metadata: {
      title: "Failure paths, fallback evidence, and customer impact Archive | The Virtual Officer",
      description:
        "Every dated edition of the resilience topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:d7752b93f1eff4dd3c0849e60958171784860b88b2f5910ba77123b366fa3963:/signals/resilience/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "d7752b93f1eff4dd3c0849e60958171784860b88b2f5910ba77123b366fa3963",
      },
      {
        key: "live:23a72f3ad5df360b9986566cfd6deb47d49cf954ce5eecdb11dff72298db96cb:/signals/resilience/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "23a72f3ad5df360b9986566cfd6deb47d49cf954ce5eecdb11dff72298db96cb",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / resilience",
        title:
          "Failure paths, fallback evidence, and customer impact Archive | The Virtual Officer",
        dek: "Every dated edition of the resilience topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Failure paths, fallback evidence, and customer impact — 2026-07-06",
              href: "/signals/resilience/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/resilience/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/technology-failure/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "f7733d1e0c5125dcc7284b6e990f23a930bcc2e1ea5f53464d9d17920cc87764",
    metadata: {
      title: "Outages, change failure, data integrity, and recovery Archive | The Virtual Officer",
      description:
        "Every dated edition of the technology failure topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:da8be5cc6a5860efa809f49452a0f054729b8c53aa62a3dd9246b8e63cb01877:/signals/technology-failure/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "da8be5cc6a5860efa809f49452a0f054729b8c53aa62a3dd9246b8e63cb01877",
      },
      {
        key: "live:f7733d1e0c5125dcc7284b6e990f23a930bcc2e1ea5f53464d9d17920cc87764:/signals/technology-failure/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "f7733d1e0c5125dcc7284b6e990f23a930bcc2e1ea5f53464d9d17920cc87764",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / technology-failure",
        title:
          "Outages, change failure, data integrity, and recovery Archive | The Virtual Officer",
        dek: "Every dated edition of the technology failure topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Outages, change failure, data integrity, and recovery — 2026-07-06",
              href: "/signals/technology-failure/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/technology-failure/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
  {
    route: "/signals/third-party/archive/",
    status: 200,
    kind: "archive",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "0a4fbe5145a3d7162ca5d287306b31eddf7452d8fac6312218f5567dce15f96b",
    metadata: {
      title: "Dependencies that look internal when they fail Archive | The Virtual Officer",
      description:
        "Every dated edition of the third party topic page, preserved exactly as published.",
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:dfe5583b3228c2f35b140a65c526c4237ec16342de9be089a19636cc9846e70c:/signals/third-party/archive/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "dfe5583b3228c2f35b140a65c526c4237ec16342de9be089a19636cc9846e70c",
      },
      {
        key: "live:0a4fbe5145a3d7162ca5d287306b31eddf7452d8fac6312218f5567dce15f96b:/signals/third-party/archive/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "0a4fbe5145a3d7162ca5d287306b31eddf7452d8fac6312218f5567dce15f96b",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Archive / Signals / third-party",
        title: "Dependencies that look internal when they fail Archive | The Virtual Officer",
        dek: "Every dated edition of the third party topic page, preserved exactly as published.",
      },
      groups: [
        {
          purpose: "editions",
          cards: [
            {
              meta: "Edition / 2026-07-06",
              title: "Dependencies that look internal when they fail — 2026-07-06",
              href: "/signals/third-party/archive/2026-07-06/",
              paragraphs: ["Open this topic page exactly as it was published that week."],
            },
          ],
          footer: [
            {
              kind: "link",
              href: "/signals/third-party/",
              content: "Back to the current edition",
            },
          ],
        },
      ],
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "archive" }>[];
