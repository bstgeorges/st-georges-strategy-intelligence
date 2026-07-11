// Authored topic-dossier data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const topicDossierRecords = [
  {
    route: "/signals/ai/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/ai/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9",
    metadata: {
      title: "AI Signals | The Virtual Officer",
      description:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      canonical: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphTitle: "AI Signals | The Virtual Officer",
      openGraphDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "AI Signals | The Virtual Officer",
      twitterDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "AI Signals",
        description:
          "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
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
          "@id": "https://stgeorgesstrategy.com/signals/ai/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:fec3e45b132557d987b08324d45f0960f9b0719077496e6f59225db0c933b1bb:/signals/ai/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "fec3e45b132557d987b08324d45f0960f9b0719077496e6f59225db0c933b1bb",
      },
      {
        key: "live:80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9:/signals/ai/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / AI",
        title: "AI, agents, and control evidence",
        dek: "A source-backed view of the AI developments, control questions, and market signals most relevant to regulated financial services this week.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 AI signals",
        paragraphs: [
          "These are the items that carry the most weekly weight from the current AI Signals source set.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
              content:
                "FCA publishes landmark review into the impact of AI on retail financial services",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Government of Alberta case study shows agentic AI operating at production security scale",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
              content: "Kill-switch language enters the AI-finance debate",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Financial Times / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
              content: "EU AI Act turns deployment inventory into a live control obligation",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EUR-Lex AI Act",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more AI signals",
          description:
            "The shortlist above carries the leadership read. These five more rows preserve the source trail, adjacent themes, and control context.",
        },
        items: [
          {
            rank: "06",
            title:
              "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
            href: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update",
            meta: "Primary / NIST / 2026-06-09",
          },
          {
            rank: "07",
            title:
              'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
            href: "https://blogs.microsoft.com/blog/2026/06/16/achieving-success-with-ai/",
            meta: "Primary / Microsoft / 2026-06-16",
          },
          {
            rank: "08",
            title: "Vendor AI guardrails need technical controls outside the prompt",
            href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
            meta: "Monitoring / TechRadar / 2026-06-22",
          },
          {
            rank: "09",
            title: "AI infrastructure capex needs downside financing and concentration scenarios",
            href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
            meta: "Monitoring / Wall Street Journal / 2026-06-29",
          },
          {
            rank: "10",
            title: "Supervisors are building AI capability to supervise AI-era threats",
            href: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
            meta: "Monitoring / Financial Times / 2026-07-05",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "This page explains why AI matters in the current edition and what kind of internal response it should trigger.",
        },
        cards: [
          {
            meta: "So what",
            title: "Autonomy creates faster control failure",
            paragraphs: [
              "The risk is not simply wrong output. It is authorised-looking action across customer, market, payment, technology, or control processes before normal escalation catches up.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, compliance, technology, cyber, product, and boards",
            paragraphs: [
              "The same agent can create model risk, conduct risk, operational resilience risk, cyber risk, financial crime exposure, and third-party dependency at once.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Inventory, permissioning, logs, tests, and stop paths",
            paragraphs: [
              "Governance needs to be evidenced through technical controls and rehearsed operating playbooks, not only principles or acceptable-use policy.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "AI evidence checklist",
          title: "What the reader should ask for",
          description:
            "The aim is practical use: a short checklist a senior reader can carry into a committee, review, or control discussion.",
        },
        deadlines: [
          {
            date: "Inventory",
            action:
              "Which AI agents, copilots, and autonomous workflows exist, who owns them, and what systems can they touch?",
            owner: "Owner",
          },
          {
            date: "Authority",
            action:
              "What transactions, data, messages, decisions, code, or customer actions can each agent initiate or influence?",
            owner: "Boundary",
          },
          {
            date: "Telemetry",
            action:
              "Can the firm reconstruct what the agent saw, decided, called, changed, escalated, or suppressed?",
            owner: "Evidence",
          },
          {
            date: "Fallback",
            action:
              "Who can pause, rollback, override, compensate, disclose, or notify when an agent behaves incorrectly?",
            owner: "Recovery",
          },
          {
            date: "Rehearsal",
            action:
              "Has the firm tested a plausible agent failure where the model and vendor appear technically available?",
            owner: "Test",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "This topic becomes more valuable as it accumulates dated weekly judgement and a visible source trail over time.",
        },
        cards: [
          {
            meta: "Week of 8 Jul 2026",
            title: "Agentic AI needs a control room",
            href: "/brief/",
            paragraphs: ["Included as the lead weekly signal."],
          },
          {
            meta: "Source data",
            title: "AI Signals JSON",
            href: "/data/ai-signals.json",
            paragraphs: ["The source-backed model, feature, and industry rows used on this page."],
          },
          {
            meta: "Archive",
            title: "Previous AI Signals editions",
            href: "/signals/ai/archive/",
            paragraphs: [
              "Track how the weekly judgement, source mix, and control questions evolve over time.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/ai/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9",
    metadata: {
      title: "AI Signals | The Virtual Officer",
      description:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      canonical: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphTitle: "AI Signals | The Virtual Officer",
      openGraphDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "AI Signals | The Virtual Officer",
      twitterDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "AI Signals",
        description:
          "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
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
          "@id": "https://stgeorgesstrategy.com/signals/ai/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9:/signals/ai/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "80dff828e8dd337e3cec43f67b94dbef532e0f4e333e4091cdee3e9a6f446da9",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / AI",
        title: "AI, agents, and control evidence",
        dek: "A source-backed view of the AI developments, control questions, and market signals most relevant to regulated financial services this week.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 AI signals",
        paragraphs: [
          "These are the items that carry the most weekly weight from the current AI Signals source set.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
              content:
                "FCA publishes landmark review into the impact of AI on retail financial services",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Government of Alberta case study shows agentic AI operating at production security scale",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
              content: "Kill-switch language enters the AI-finance debate",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Financial Times / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
              content: "EU AI Act turns deployment inventory into a live control obligation",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EUR-Lex AI Act",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more AI signals",
          description:
            "The shortlist above carries the leadership read. These five more rows preserve the source trail, adjacent themes, and control context.",
        },
        items: [
          {
            rank: "06",
            title:
              "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
            href: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update",
            meta: "Primary / NIST / 2026-06-09",
          },
          {
            rank: "07",
            title:
              'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
            href: "https://blogs.microsoft.com/blog/2026/06/16/achieving-success-with-ai/",
            meta: "Primary / Microsoft / 2026-06-16",
          },
          {
            rank: "08",
            title: "Vendor AI guardrails need technical controls outside the prompt",
            href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
            meta: "Monitoring / TechRadar / 2026-06-22",
          },
          {
            rank: "09",
            title: "AI infrastructure capex needs downside financing and concentration scenarios",
            href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
            meta: "Monitoring / Wall Street Journal / 2026-06-29",
          },
          {
            rank: "10",
            title: "Supervisors are building AI capability to supervise AI-era threats",
            href: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
            meta: "Monitoring / Financial Times / 2026-07-05",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "This page explains why AI matters in the current edition and what kind of internal response it should trigger.",
        },
        cards: [
          {
            meta: "So what",
            title: "Autonomy creates faster control failure",
            paragraphs: [
              "The risk is not simply wrong output. It is authorised-looking action across customer, market, payment, technology, or control processes before normal escalation catches up.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, compliance, technology, cyber, product, and boards",
            paragraphs: [
              "The same agent can create model risk, conduct risk, operational resilience risk, cyber risk, financial crime exposure, and third-party dependency at once.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Inventory, permissioning, logs, tests, and stop paths",
            paragraphs: [
              "Governance needs to be evidenced through technical controls and rehearsed operating playbooks, not only principles or acceptable-use policy.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "AI evidence checklist",
          title: "What the reader should ask for",
          description:
            "The aim is practical use: a short checklist a senior reader can carry into a committee, review, or control discussion.",
        },
        deadlines: [
          {
            date: "Inventory",
            action:
              "Which AI agents, copilots, and autonomous workflows exist, who owns them, and what systems can they touch?",
            owner: "Owner",
          },
          {
            date: "Authority",
            action:
              "What transactions, data, messages, decisions, code, or customer actions can each agent initiate or influence?",
            owner: "Boundary",
          },
          {
            date: "Telemetry",
            action:
              "Can the firm reconstruct what the agent saw, decided, called, changed, escalated, or suppressed?",
            owner: "Evidence",
          },
          {
            date: "Fallback",
            action:
              "Who can pause, rollback, override, compensate, disclose, or notify when an agent behaves incorrectly?",
            owner: "Recovery",
          },
          {
            date: "Rehearsal",
            action:
              "Has the firm tested a plausible agent failure where the model and vendor appear technically available?",
            owner: "Test",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "This topic becomes more valuable as it accumulates dated weekly judgement and a visible source trail over time.",
        },
        cards: [
          {
            meta: "Week of 8 Jul 2026",
            title: "Agentic AI needs a control room",
            href: "/brief/",
            paragraphs: ["Included as the lead weekly signal."],
          },
          {
            meta: "Source data",
            title: "AI Signals JSON",
            href: "/data/ai-signals.json",
            paragraphs: ["The source-backed model, feature, and industry rows used on this page."],
          },
          {
            meta: "Archive",
            title: "Previous AI Signals editions",
            href: "/signals/ai/archive/",
            paragraphs: [
              "Track how the weekly judgement, source mix, and control questions evolve over time.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "ai / 2026-07-06",
    },
  },
  {
    route: "/signals/ai/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "fd3cd8f644064522c433042c8e75cd41129ee0727c3b01804f558a6122ed9c1e",
    metadata: {
      title: "AI Signals | The Virtual Officer",
      description:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      canonical: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphTitle: "AI Signals | The Virtual Officer",
      openGraphDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "AI Signals | The Virtual Officer",
      twitterDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "AI Signals",
        description:
          "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
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
          "@id": "https://stgeorgesstrategy.com/signals/ai/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:fd3cd8f644064522c433042c8e75cd41129ee0727c3b01804f558a6122ed9c1e:/signals/ai/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "fd3cd8f644064522c433042c8e75cd41129ee0727c3b01804f558a6122ed9c1e",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / AI",
        title: "AI, agents, and control evidence",
        dek: "A source-backed view of the AI developments, control questions, and market signals most relevant to regulated financial services this week.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 AI signals",
        paragraphs: [
          "These are the items that carry the most weekly weight from the current AI Signals source set.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
              content:
                "FCA publishes landmark review into the impact of AI on retail financial services",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Government of Alberta case study shows agentic AI operating at production security scale",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
              content: "Kill-switch language enters the AI-finance debate",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Financial Times / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
              content: "EU AI Act turns deployment inventory into a live control obligation",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EUR-Lex AI Act",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more AI signals",
          description:
            "The shortlist above carries the leadership read. These five more rows preserve the source trail, adjacent themes, and control context.",
        },
        items: [
          {
            rank: "06",
            title: "NIST AI RMF remains a usable baseline for governance evidence",
            href: "https://www.nist.gov/itl/ai-risk-management-framework",
            meta: "Primary / NIST AI RMF",
          },
          {
            rank: "07",
            title: "Enterprise AI features can enter production through existing tooling",
            href: "https://workspace.google.com/solutions/ai/",
            meta: "Primary / Google Workspace AI",
          },
          {
            rank: "08",
            title: "Vendor AI guardrails need technical controls outside the prompt",
            href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
            meta: "Monitoring / TechRadar / 2026",
          },
          {
            rank: "09",
            title: "AI infrastructure capex needs downside financing and concentration scenarios",
            href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
            meta: "Monitoring / Wall Street Journal / 2026-06",
          },
          {
            rank: "10",
            title: "Supervisors are building AI capability to supervise AI-era threats",
            href: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
            meta: "Monitoring / Financial Times / 2026-07-05",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "This page explains why AI matters in the current edition and what kind of internal response it should trigger.",
        },
        cards: [
          {
            meta: "So what",
            title: "Autonomy creates faster control failure",
            paragraphs: [
              "The risk is not simply wrong output. It is authorised-looking action across customer, market, payment, technology, or control processes before normal escalation catches up.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, compliance, technology, cyber, product, and boards",
            paragraphs: [
              "The same agent can create model risk, conduct risk, operational resilience risk, cyber risk, financial crime exposure, and third-party dependency at once.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Inventory, permissioning, logs, tests, and stop paths",
            paragraphs: [
              "Governance needs to be evidenced through technical controls and rehearsed operating playbooks, not only principles or acceptable-use policy.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "The aim is practical use: a short checklist a senior reader can carry into a committee, review, or control discussion.",
        },
        deadlines: [
          {
            date: "Inventory",
            action:
              "Which AI agents, copilots, and autonomous workflows exist, who owns them, and what systems can they touch?",
            owner: "Owner",
          },
          {
            date: "Authority",
            action:
              "What transactions, data, messages, decisions, code, or customer actions can each agent initiate or influence?",
            owner: "Boundary",
          },
          {
            date: "Telemetry",
            action:
              "Can the firm reconstruct what the agent saw, decided, called, changed, escalated, or suppressed?",
            owner: "Evidence",
          },
          {
            date: "Fallback",
            action:
              "Who can pause, rollback, override, compensate, disclose, or notify when an agent behaves incorrectly?",
            owner: "Recovery",
          },
          {
            date: "Rehearsal",
            action:
              "Has the firm tested a plausible agent failure where the model and vendor appear technically available?",
            owner: "Test",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "This topic becomes more valuable as it accumulates dated weekly judgement and a visible source trail over time.",
        },
        cards: [
          {
            meta: "Week of 8 Jul 2026",
            title: "Agentic AI needs a control room",
            href: "/brief/",
            paragraphs: ["Included as the lead weekly signal."],
          },
          {
            meta: "Source data",
            title: "AI Signals JSON",
            href: "/data/ai-signals.json",
            paragraphs: ["The source-backed model, feature, and industry rows used on this page."],
          },
          {
            meta: "Archive",
            title: "Previous AI Signals editions",
            href: "https://stgeorgesstrategy.com/ai-signals/archive/",
            paragraphs: [
              "Track how the weekly judgement, source mix, and control questions evolve over time.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "ai / 2026-07-06",
      currentLabel: "ai / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-c58b86e45e390f8ca66b6e1d:2026-07-06",
          signalId: "signal:archive-url-c58b86e45e390f8ca66b6e1d",
          editionId: "edition:authored-ai:2026-07-06",
          title:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          implication:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          rank: 1,
          semanticHash: "542abcb2dd7bd0f40c031552cd335c9b808a58c9f9962bd424812bd66698de92",
          sourceIds: ["source:archive-url-c58b86e45e390f8ca66b6e1d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7143e014fc38b75190717138:2026-07-06",
          signalId: "signal:archive-url-7143e014fc38b75190717138",
          editionId: "edition:authored-ai:2026-07-06",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          implication: "EU AI Act turns deployment inventory into a live control obligation",
          rank: 2,
          semanticHash: "d9e8c09c7cfff0cba512e59bba0978887b18b673fc4b928a90f8b1187e0137b0",
          sourceIds: ["source:archive-url-7143e014fc38b75190717138"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-27b52b7494f13d35f48dcbca:2026-07-06",
          signalId: "signal:archive-url-27b52b7494f13d35f48dcbca",
          editionId: "edition:authored-ai:2026-07-06",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          implication:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          rank: 3,
          semanticHash: "5c3fd3cf6091e4811f8b8642ac162c4cc29f0bfb774114ee0e26e4e0182c7ea4",
          sourceIds: ["source:archive-url-27b52b7494f13d35f48dcbca"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-067716327b539750e0ccc697:2026-07-06",
          signalId: "signal:archive-url-067716327b539750e0ccc697",
          editionId: "edition:authored-ai:2026-07-06",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          implication: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          rank: 4,
          semanticHash: "803544ea2199f3f5b129250d15e9388928dce73c09cb42535be646205d868d24",
          sourceIds: ["source:archive-url-067716327b539750e0ccc697"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fbb6da58c42f2bb4e372c36:2026-07-06",
          signalId: "signal:archive-url-5fbb6da58c42f2bb4e372c36",
          editionId: "edition:authored-ai:2026-07-06",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          implication:
            "FCA publishes landmark review into the impact of AI on retail financial services",
          rank: 5,
          semanticHash: "4b24c2455d7e4d3fea45e8a4cdc9ddc2c8bf58586776f8551b5cd54605500610",
          sourceIds: ["source:archive-url-5fbb6da58c42f2bb4e372c36"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb1cbfc90be48af59069a3d4:2026-07-06",
          signalId: "signal:archive-url-bb1cbfc90be48af59069a3d4",
          editionId: "edition:authored-ai:2026-07-06",
          title: "Kill-switch language enters the AI-finance debate",
          implication: "Kill-switch language enters the AI-finance debate",
          rank: 6,
          semanticHash: "038f8081ce0ef1025f8c8b37d0a8860d9ddfdf15dd9a384d9952058c6f193323",
          sourceIds: ["source:archive-url-bb1cbfc90be48af59069a3d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3d8074d1a1669addbe65a529:2026-07-06",
          signalId: "signal:archive-url-3d8074d1a1669addbe65a529",
          editionId: "edition:authored-ai:2026-07-06",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          implication: "Supervisors are building AI capability to supervise AI-era threats",
          rank: 7,
          semanticHash: "5fdedb20be18ef21191090f4588f665fe02f506095ca317568dc32e822e7ff71",
          sourceIds: ["source:archive-url-3d8074d1a1669addbe65a529"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e680f5aa678c48f7dd8a7c6f:2026-07-06",
          signalId: "signal:archive-url-e680f5aa678c48f7dd8a7c6f",
          editionId: "edition:authored-ai:2026-07-06",
          title:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          implication:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          rank: 8,
          semanticHash: "98471a7df96b3112c47887ce0555e727d11a691f41a8beadd4fefa302a080e9c",
          sourceIds: ["source:archive-url-e680f5aa678c48f7dd8a7c6f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-667fa5e5241480e85e66b41d:2026-07-06",
          signalId: "signal:archive-url-667fa5e5241480e85e66b41d",
          editionId: "edition:authored-ai:2026-07-06",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          implication: "Vendor AI guardrails need technical controls outside the prompt",
          rank: 9,
          semanticHash: "18d2bcc9765322172e5504427a59e7551ba38fb04962fa94dd13fc0b0324aba5",
          sourceIds: ["source:archive-url-667fa5e5241480e85e66b41d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d274df4722eda7dca3008b2d:2026-07-06",
          signalId: "signal:archive-url-d274df4722eda7dca3008b2d",
          editionId: "edition:authored-ai:2026-07-06",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          implication:
            "AI infrastructure capex needs downside financing and concentration scenarios",
          rank: 10,
          semanticHash: "7d943e7b679c08bef6a8421790fb188adcf1563c199943a884df82e23c12a277",
          sourceIds: ["source:archive-url-d274df4722eda7dca3008b2d"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-7143e014fc38b75190717138:2026-07-08",
          signalId: "signal:archive-url-7143e014fc38b75190717138",
          editionId: "edition:authored-ai:2026-07-08",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          implication: "EU AI Act turns deployment inventory into a live control obligation",
          rank: 1,
          semanticHash: "d9e8c09c7cfff0cba512e59bba0978887b18b673fc4b928a90f8b1187e0137b0",
          sourceIds: ["source:archive-url-7143e014fc38b75190717138"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-21d70a3c765b0467dcbc58c8:2026-07-08",
          signalId: "signal:archive-url-21d70a3c765b0467dcbc58c8",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Previous AI Signals editions",
          implication: "Previous AI Signals editions",
          rank: 2,
          semanticHash: "09624033be5212ec66d864df9f1df1a1fa474d98e02f9f0b70a8716837364e77",
          sourceIds: ["source:archive-url-21d70a3c765b0467dcbc58c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-eb139c1f7c2157c0a637ea4a:2026-07-08",
          signalId: "signal:archive-url-eb139c1f7c2157c0a637ea4a",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Enterprise AI features can enter production through existing tooling",
          implication: "Enterprise AI features can enter production through existing tooling",
          rank: 3,
          semanticHash: "f3d0eb3aef5cbdb2036c89a0d742ed9236a2aff42e6126560bbfb2bcc181c43e",
          sourceIds: ["source:archive-url-eb139c1f7c2157c0a637ea4a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-27b52b7494f13d35f48dcbca:2026-07-08",
          signalId: "signal:archive-url-27b52b7494f13d35f48dcbca",
          editionId: "edition:authored-ai:2026-07-08",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          implication:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          rank: 4,
          semanticHash: "5c3fd3cf6091e4811f8b8642ac162c4cc29f0bfb774114ee0e26e4e0182c7ea4",
          sourceIds: ["source:archive-url-27b52b7494f13d35f48dcbca"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-067716327b539750e0ccc697:2026-07-08",
          signalId: "signal:archive-url-067716327b539750e0ccc697",
          editionId: "edition:authored-ai:2026-07-08",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          implication: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          rank: 5,
          semanticHash: "803544ea2199f3f5b129250d15e9388928dce73c09cb42535be646205d868d24",
          sourceIds: ["source:archive-url-067716327b539750e0ccc697"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fbb6da58c42f2bb4e372c36:2026-07-08",
          signalId: "signal:archive-url-5fbb6da58c42f2bb4e372c36",
          editionId: "edition:authored-ai:2026-07-08",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          implication:
            "FCA publishes landmark review into the impact of AI on retail financial services",
          rank: 6,
          semanticHash: "4b24c2455d7e4d3fea45e8a4cdc9ddc2c8bf58586776f8551b5cd54605500610",
          sourceIds: ["source:archive-url-5fbb6da58c42f2bb4e372c36"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb1cbfc90be48af59069a3d4:2026-07-08",
          signalId: "signal:archive-url-bb1cbfc90be48af59069a3d4",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Kill-switch language enters the AI-finance debate",
          implication: "Kill-switch language enters the AI-finance debate",
          rank: 7,
          semanticHash: "038f8081ce0ef1025f8c8b37d0a8860d9ddfdf15dd9a384d9952058c6f193323",
          sourceIds: ["source:archive-url-bb1cbfc90be48af59069a3d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3d8074d1a1669addbe65a529:2026-07-08",
          signalId: "signal:archive-url-3d8074d1a1669addbe65a529",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          implication: "Supervisors are building AI capability to supervise AI-era threats",
          rank: 8,
          semanticHash: "5fdedb20be18ef21191090f4588f665fe02f506095ca317568dc32e822e7ff71",
          sourceIds: ["source:archive-url-3d8074d1a1669addbe65a529"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2d80bba96ff1d2766dde7640:2026-07-08",
          signalId: "signal:archive-url-2d80bba96ff1d2766dde7640",
          editionId: "edition:authored-ai:2026-07-08",
          title: "NIST AI RMF remains a usable baseline for governance evidence",
          implication: "NIST AI RMF remains a usable baseline for governance evidence",
          rank: 9,
          semanticHash: "4ef844320990ca6c747004aaad8e35d38ba5c2e48e4d1241ecd5f7ee3ca91940",
          sourceIds: ["source:archive-url-2d80bba96ff1d2766dde7640"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-667fa5e5241480e85e66b41d:2026-07-08",
          signalId: "signal:archive-url-667fa5e5241480e85e66b41d",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          implication: "Vendor AI guardrails need technical controls outside the prompt",
          rank: 10,
          semanticHash: "18d2bcc9765322172e5504427a59e7551ba38fb04962fa94dd13fc0b0324aba5",
          sourceIds: ["source:archive-url-667fa5e5241480e85e66b41d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d274df4722eda7dca3008b2d:2026-07-08",
          signalId: "signal:archive-url-d274df4722eda7dca3008b2d",
          editionId: "edition:authored-ai:2026-07-08",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          implication:
            "AI infrastructure capex needs downside financing and concentration scenarios",
          rank: 11,
          semanticHash: "7d943e7b679c08bef6a8421790fb188adcf1563c199943a884df82e23c12a277",
          sourceIds: ["source:archive-url-d274df4722eda7dca3008b2d"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-c58b86e45e390f8ca66b6e1d",
          title:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          publisher: "blogs.microsoft.com",
          url: "https://blogs.microsoft.com/blog/2026/06/16/achieving-success-with-ai/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7143e014fc38b75190717138",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-27b52b7494f13d35f48dcbca",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          publisher: "anthropic.com",
          url: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-067716327b539750e0ccc697",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5fbb6da58c42f2bb4e372c36",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb1cbfc90be48af59069a3d4",
          title: "Kill-switch language enters the AI-finance debate",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3d8074d1a1669addbe65a529",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          publisher: "ft.com",
          url: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e680f5aa678c48f7dd8a7c6f",
          title:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          publisher: "nist.gov",
          url: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-667fa5e5241480e85e66b41d",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          publisher: "techradar.com",
          url: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d274df4722eda7dca3008b2d",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          publisher: "wsj.com",
          url: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-21d70a3c765b0467dcbc58c8",
          title: "Previous AI Signals editions",
          publisher: "stgeorgesstrategy.com",
          url: "https://stgeorgesstrategy.com/ai-signals/archive/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-eb139c1f7c2157c0a637ea4a",
          title: "Enterprise AI features can enter production through existing tooling",
          publisher: "workspace.google.com",
          url: "https://workspace.google.com/solutions/ai/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2d80bba96ff1d2766dde7640",
          title: "NIST AI RMF remains a usable baseline for governance evidence",
          publisher: "nist.gov",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/ai/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "fec3e45b132557d987b08324d45f0960f9b0719077496e6f59225db0c933b1bb",
    metadata: {
      title: "AI Signals | The Virtual Officer",
      description:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      canonical: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphTitle: "AI Signals | The Virtual Officer",
      openGraphDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/ai/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "AI Signals | The Virtual Officer",
      twitterDescription:
        "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "AI Signals",
        description:
          "The AI Signals topic page covering agents, models, infrastructure, governance, evidence prompts, a weekly Top 5 shortlist, and additional source rows.",
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
          "@id": "https://stgeorgesstrategy.com/signals/ai/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:fec3e45b132557d987b08324d45f0960f9b0719077496e6f59225db0c933b1bb:/signals/ai/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/ai/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "fec3e45b132557d987b08324d45f0960f9b0719077496e6f59225db0c933b1bb",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / AI",
        title: "AI, agents, and control evidence",
        dek: "A source-backed view of the AI developments, control questions, and market signals most relevant to regulated financial services this week.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 AI signals",
        paragraphs: [
          "These are the items that carry the most weekly weight from the current AI Signals source set.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
              content:
                "FCA publishes landmark review into the impact of AI on retail financial services",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Government of Alberta case study shows agentic AI operating at production security scale",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
              content: "Kill-switch language enters the AI-finance debate",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Financial Times / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
              content: "EU AI Act turns deployment inventory into a live control obligation",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EUR-Lex AI Act",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more AI signals",
          description:
            "The shortlist above carries the leadership read. These five more rows preserve the source trail, adjacent themes, and control context.",
        },
        items: [
          {
            rank: "06",
            title:
              "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
            href: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update",
            meta: "Primary / NIST / 2026-06-09",
          },
          {
            rank: "07",
            title:
              'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
            href: "https://blogs.microsoft.com/blog/2026/06/16/achieving-success-with-ai/",
            meta: "Primary / Microsoft / 2026-06-16",
          },
          {
            rank: "08",
            title: "Vendor AI guardrails need technical controls outside the prompt",
            href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
            meta: "Monitoring / TechRadar / 2026",
          },
          {
            rank: "09",
            title: "AI infrastructure capex needs downside financing and concentration scenarios",
            href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
            meta: "Monitoring / Wall Street Journal / 2026-06",
          },
          {
            rank: "10",
            title: "Supervisors are building AI capability to supervise AI-era threats",
            href: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
            meta: "Monitoring / Financial Times / 2026-07-05",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "This page explains why AI matters in the current edition and what kind of internal response it should trigger.",
        },
        cards: [
          {
            meta: "So what",
            title: "Autonomy creates faster control failure",
            paragraphs: [
              "The risk is not simply wrong output. It is authorised-looking action across customer, market, payment, technology, or control processes before normal escalation catches up.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, compliance, technology, cyber, product, and boards",
            paragraphs: [
              "The same agent can create model risk, conduct risk, operational resilience risk, cyber risk, financial crime exposure, and third-party dependency at once.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Inventory, permissioning, logs, tests, and stop paths",
            paragraphs: [
              "Governance needs to be evidenced through technical controls and rehearsed operating playbooks, not only principles or acceptable-use policy.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "AI evidence checklist",
          title: "What the reader should ask for",
          description:
            "The aim is practical use: a short checklist a senior reader can carry into a committee, review, or control discussion.",
        },
        deadlines: [
          {
            date: "Inventory",
            action:
              "Which AI agents, copilots, and autonomous workflows exist, who owns them, and what systems can they touch?",
            owner: "Owner",
          },
          {
            date: "Authority",
            action:
              "What transactions, data, messages, decisions, code, or customer actions can each agent initiate or influence?",
            owner: "Boundary",
          },
          {
            date: "Telemetry",
            action:
              "Can the firm reconstruct what the agent saw, decided, called, changed, escalated, or suppressed?",
            owner: "Evidence",
          },
          {
            date: "Fallback",
            action:
              "Who can pause, rollback, override, compensate, disclose, or notify when an agent behaves incorrectly?",
            owner: "Recovery",
          },
          {
            date: "Rehearsal",
            action:
              "Has the firm tested a plausible agent failure where the model and vendor appear technically available?",
            owner: "Test",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "This topic becomes more valuable as it accumulates dated weekly judgement and a visible source trail over time.",
        },
        cards: [
          {
            meta: "Week of 8 Jul 2026",
            title: "Agentic AI needs a control room",
            href: "/brief/",
            paragraphs: ["Included as the lead weekly signal."],
          },
          {
            meta: "Source data",
            title: "AI Signals JSON",
            href: "/data/ai-signals.json",
            paragraphs: ["The source-backed model, feature, and industry rows used on this page."],
          },
          {
            meta: "Archive",
            title: "Previous AI Signals editions",
            href: "https://stgeorgesstrategy.com/ai-signals/archive/",
            paragraphs: [
              "Track how the weekly judgement, source mix, and control questions evolve over time.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "ai / 2026-07-08",
      currentLabel: "ai / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-7143e014fc38b75190717138:2026-07-08",
          signalId: "signal:archive-url-7143e014fc38b75190717138",
          editionId: "edition:authored-ai:2026-07-08",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          implication: "EU AI Act turns deployment inventory into a live control obligation",
          rank: 1,
          semanticHash: "d9e8c09c7cfff0cba512e59bba0978887b18b673fc4b928a90f8b1187e0137b0",
          sourceIds: ["source:archive-url-7143e014fc38b75190717138"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-21d70a3c765b0467dcbc58c8:2026-07-08",
          signalId: "signal:archive-url-21d70a3c765b0467dcbc58c8",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Previous AI Signals editions",
          implication: "Previous AI Signals editions",
          rank: 2,
          semanticHash: "09624033be5212ec66d864df9f1df1a1fa474d98e02f9f0b70a8716837364e77",
          sourceIds: ["source:archive-url-21d70a3c765b0467dcbc58c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-eb139c1f7c2157c0a637ea4a:2026-07-08",
          signalId: "signal:archive-url-eb139c1f7c2157c0a637ea4a",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Enterprise AI features can enter production through existing tooling",
          implication: "Enterprise AI features can enter production through existing tooling",
          rank: 3,
          semanticHash: "f3d0eb3aef5cbdb2036c89a0d742ed9236a2aff42e6126560bbfb2bcc181c43e",
          sourceIds: ["source:archive-url-eb139c1f7c2157c0a637ea4a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-27b52b7494f13d35f48dcbca:2026-07-08",
          signalId: "signal:archive-url-27b52b7494f13d35f48dcbca",
          editionId: "edition:authored-ai:2026-07-08",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          implication:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          rank: 4,
          semanticHash: "5c3fd3cf6091e4811f8b8642ac162c4cc29f0bfb774114ee0e26e4e0182c7ea4",
          sourceIds: ["source:archive-url-27b52b7494f13d35f48dcbca"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-067716327b539750e0ccc697:2026-07-08",
          signalId: "signal:archive-url-067716327b539750e0ccc697",
          editionId: "edition:authored-ai:2026-07-08",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          implication: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          rank: 5,
          semanticHash: "803544ea2199f3f5b129250d15e9388928dce73c09cb42535be646205d868d24",
          sourceIds: ["source:archive-url-067716327b539750e0ccc697"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fbb6da58c42f2bb4e372c36:2026-07-08",
          signalId: "signal:archive-url-5fbb6da58c42f2bb4e372c36",
          editionId: "edition:authored-ai:2026-07-08",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          implication:
            "FCA publishes landmark review into the impact of AI on retail financial services",
          rank: 6,
          semanticHash: "4b24c2455d7e4d3fea45e8a4cdc9ddc2c8bf58586776f8551b5cd54605500610",
          sourceIds: ["source:archive-url-5fbb6da58c42f2bb4e372c36"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb1cbfc90be48af59069a3d4:2026-07-08",
          signalId: "signal:archive-url-bb1cbfc90be48af59069a3d4",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Kill-switch language enters the AI-finance debate",
          implication: "Kill-switch language enters the AI-finance debate",
          rank: 7,
          semanticHash: "038f8081ce0ef1025f8c8b37d0a8860d9ddfdf15dd9a384d9952058c6f193323",
          sourceIds: ["source:archive-url-bb1cbfc90be48af59069a3d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3d8074d1a1669addbe65a529:2026-07-08",
          signalId: "signal:archive-url-3d8074d1a1669addbe65a529",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          implication: "Supervisors are building AI capability to supervise AI-era threats",
          rank: 8,
          semanticHash: "5fdedb20be18ef21191090f4588f665fe02f506095ca317568dc32e822e7ff71",
          sourceIds: ["source:archive-url-3d8074d1a1669addbe65a529"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2d80bba96ff1d2766dde7640:2026-07-08",
          signalId: "signal:archive-url-2d80bba96ff1d2766dde7640",
          editionId: "edition:authored-ai:2026-07-08",
          title: "NIST AI RMF remains a usable baseline for governance evidence",
          implication: "NIST AI RMF remains a usable baseline for governance evidence",
          rank: 9,
          semanticHash: "4ef844320990ca6c747004aaad8e35d38ba5c2e48e4d1241ecd5f7ee3ca91940",
          sourceIds: ["source:archive-url-2d80bba96ff1d2766dde7640"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-667fa5e5241480e85e66b41d:2026-07-08",
          signalId: "signal:archive-url-667fa5e5241480e85e66b41d",
          editionId: "edition:authored-ai:2026-07-08",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          implication: "Vendor AI guardrails need technical controls outside the prompt",
          rank: 10,
          semanticHash: "18d2bcc9765322172e5504427a59e7551ba38fb04962fa94dd13fc0b0324aba5",
          sourceIds: ["source:archive-url-667fa5e5241480e85e66b41d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d274df4722eda7dca3008b2d:2026-07-08",
          signalId: "signal:archive-url-d274df4722eda7dca3008b2d",
          editionId: "edition:authored-ai:2026-07-08",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          implication:
            "AI infrastructure capex needs downside financing and concentration scenarios",
          rank: 11,
          semanticHash: "7d943e7b679c08bef6a8421790fb188adcf1563c199943a884df82e23c12a277",
          sourceIds: ["source:archive-url-d274df4722eda7dca3008b2d"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-c58b86e45e390f8ca66b6e1d:2026-07-09",
          signalId: "signal:archive-url-c58b86e45e390f8ca66b6e1d",
          editionId: "edition:authored-ai:2026-07-09",
          title:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          implication:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          rank: 1,
          semanticHash: "542abcb2dd7bd0f40c031552cd335c9b808a58c9f9962bd424812bd66698de92",
          sourceIds: ["source:archive-url-c58b86e45e390f8ca66b6e1d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7143e014fc38b75190717138:2026-07-09",
          signalId: "signal:archive-url-7143e014fc38b75190717138",
          editionId: "edition:authored-ai:2026-07-09",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          implication: "EU AI Act turns deployment inventory into a live control obligation",
          rank: 2,
          semanticHash: "d9e8c09c7cfff0cba512e59bba0978887b18b673fc4b928a90f8b1187e0137b0",
          sourceIds: ["source:archive-url-7143e014fc38b75190717138"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-21d70a3c765b0467dcbc58c8:2026-07-09",
          signalId: "signal:archive-url-21d70a3c765b0467dcbc58c8",
          editionId: "edition:authored-ai:2026-07-09",
          title: "Previous AI Signals editions",
          implication: "Previous AI Signals editions",
          rank: 3,
          semanticHash: "09624033be5212ec66d864df9f1df1a1fa474d98e02f9f0b70a8716837364e77",
          sourceIds: ["source:archive-url-21d70a3c765b0467dcbc58c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-27b52b7494f13d35f48dcbca:2026-07-09",
          signalId: "signal:archive-url-27b52b7494f13d35f48dcbca",
          editionId: "edition:authored-ai:2026-07-09",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          implication:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          rank: 4,
          semanticHash: "5c3fd3cf6091e4811f8b8642ac162c4cc29f0bfb774114ee0e26e4e0182c7ea4",
          sourceIds: ["source:archive-url-27b52b7494f13d35f48dcbca"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-067716327b539750e0ccc697:2026-07-09",
          signalId: "signal:archive-url-067716327b539750e0ccc697",
          editionId: "edition:authored-ai:2026-07-09",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          implication: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          rank: 5,
          semanticHash: "803544ea2199f3f5b129250d15e9388928dce73c09cb42535be646205d868d24",
          sourceIds: ["source:archive-url-067716327b539750e0ccc697"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fbb6da58c42f2bb4e372c36:2026-07-09",
          signalId: "signal:archive-url-5fbb6da58c42f2bb4e372c36",
          editionId: "edition:authored-ai:2026-07-09",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          implication:
            "FCA publishes landmark review into the impact of AI on retail financial services",
          rank: 6,
          semanticHash: "4b24c2455d7e4d3fea45e8a4cdc9ddc2c8bf58586776f8551b5cd54605500610",
          sourceIds: ["source:archive-url-5fbb6da58c42f2bb4e372c36"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb1cbfc90be48af59069a3d4:2026-07-09",
          signalId: "signal:archive-url-bb1cbfc90be48af59069a3d4",
          editionId: "edition:authored-ai:2026-07-09",
          title: "Kill-switch language enters the AI-finance debate",
          implication: "Kill-switch language enters the AI-finance debate",
          rank: 7,
          semanticHash: "038f8081ce0ef1025f8c8b37d0a8860d9ddfdf15dd9a384d9952058c6f193323",
          sourceIds: ["source:archive-url-bb1cbfc90be48af59069a3d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3d8074d1a1669addbe65a529:2026-07-09",
          signalId: "signal:archive-url-3d8074d1a1669addbe65a529",
          editionId: "edition:authored-ai:2026-07-09",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          implication: "Supervisors are building AI capability to supervise AI-era threats",
          rank: 8,
          semanticHash: "5fdedb20be18ef21191090f4588f665fe02f506095ca317568dc32e822e7ff71",
          sourceIds: ["source:archive-url-3d8074d1a1669addbe65a529"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e680f5aa678c48f7dd8a7c6f:2026-07-09",
          signalId: "signal:archive-url-e680f5aa678c48f7dd8a7c6f",
          editionId: "edition:authored-ai:2026-07-09",
          title:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          implication:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          rank: 9,
          semanticHash: "98471a7df96b3112c47887ce0555e727d11a691f41a8beadd4fefa302a080e9c",
          sourceIds: ["source:archive-url-e680f5aa678c48f7dd8a7c6f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-667fa5e5241480e85e66b41d:2026-07-09",
          signalId: "signal:archive-url-667fa5e5241480e85e66b41d",
          editionId: "edition:authored-ai:2026-07-09",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          implication: "Vendor AI guardrails need technical controls outside the prompt",
          rank: 10,
          semanticHash: "18d2bcc9765322172e5504427a59e7551ba38fb04962fa94dd13fc0b0324aba5",
          sourceIds: ["source:archive-url-667fa5e5241480e85e66b41d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d274df4722eda7dca3008b2d:2026-07-09",
          signalId: "signal:archive-url-d274df4722eda7dca3008b2d",
          editionId: "edition:authored-ai:2026-07-09",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          implication:
            "AI infrastructure capex needs downside financing and concentration scenarios",
          rank: 11,
          semanticHash: "7d943e7b679c08bef6a8421790fb188adcf1563c199943a884df82e23c12a277",
          sourceIds: ["source:archive-url-d274df4722eda7dca3008b2d"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-7143e014fc38b75190717138",
          title: "EU AI Act turns deployment inventory into a live control obligation",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-21d70a3c765b0467dcbc58c8",
          title: "Previous AI Signals editions",
          publisher: "stgeorgesstrategy.com",
          url: "https://stgeorgesstrategy.com/ai-signals/archive/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-eb139c1f7c2157c0a637ea4a",
          title: "Enterprise AI features can enter production through existing tooling",
          publisher: "workspace.google.com",
          url: "https://workspace.google.com/solutions/ai/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-27b52b7494f13d35f48dcbca",
          title:
            "Government of Alberta case study shows agentic AI operating at production security scale",
          publisher: "anthropic.com",
          url: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-067716327b539750e0ccc697",
          title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5fbb6da58c42f2bb4e372c36",
          title: "FCA publishes landmark review into the impact of AI on retail financial services",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb1cbfc90be48af59069a3d4",
          title: "Kill-switch language enters the AI-finance debate",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3d8074d1a1669addbe65a529",
          title: "Supervisors are building AI capability to supervise AI-era threats",
          publisher: "ft.com",
          url: "https://www.ft.com/content/7f501320-9037-410f-b8e7-3111b9041311",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2d80bba96ff1d2766dde7640",
          title: "NIST AI RMF remains a usable baseline for governance evidence",
          publisher: "nist.gov",
          url: "https://www.nist.gov/itl/ai-risk-management-framework",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-667fa5e5241480e85e66b41d",
          title: "Vendor AI guardrails need technical controls outside the prompt",
          publisher: "techradar.com",
          url: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d274df4722eda7dca3008b2d",
          title: "AI infrastructure capex needs downside financing and concentration scenarios",
          publisher: "wsj.com",
          url: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-c58b86e45e390f8ca66b6e1d",
          title:
            'Microsoft\'s "Intelligence plus trust" framework puts agent cost and governance controls on the board agenda',
          publisher: "blogs.microsoft.com",
          url: "https://blogs.microsoft.com/blog/2026/06/16/achieving-success-with-ai/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e680f5aa678c48f7dd8a7c6f",
          title:
            "NIST proof shows no fixed set of AI guardrails can be universally robust against adversarial prompts",
          publisher: "nist.gov",
          url: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/cyber/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8",
    metadata: {
      title: "Cyber Signals | The Virtual Officer",
      description:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphTitle: "Cyber Signals | The Virtual Officer",
      openGraphDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Cyber Signals | The Virtual Officer",
      twitterDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cyber Signals",
        description:
          "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/cyber/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:b14cd7674291a776db25d6affdc66148520cbf4d84b032a9545e544c718b77ce:/signals/cyber/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "b14cd7674291a776db25d6affdc66148520cbf4d84b032a9545e544c718b77ce",
      },
      {
        key: "live:45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8:/signals/cyber/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Cyber",
        title: "Threats, vulnerabilities, identity, and response",
        dek: "The cyber page links threat and vulnerability signals to practical evidence: who owns the risk, what was tested, what was patched, and how the firm would recover.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 cyber signals",
        paragraphs: [
          "These items anchor the weekly read across ransomware, vulnerability management, cyber resilience, testing, and reform.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/news/international-cyber-agencies-fresh-advice-defend-against-china-linked-covert-networks",
              content:
                "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC and 15 international partners / 2026-04-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/blog-post/caf-v4-0-released-in-response-to-growing-threat",
              content:
                "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC / 2025-08-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2025/october/effective-practices-cyber-response-and-recovery-capabilities",
              content:
                "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England, PRA and FCA / 2025-10-20",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more cyber signals",
          description:
            "The shortlist carries the leadership read. These five more rows preserve the source trail behind cyber governance, identity, threat intelligence, incident response, and supplier exposure.",
        },
        items: [
          {
            rank: "06",
            title: "Basic control hygiene remains the first test of cyber governance",
            href: "https://www.ncsc.gov.uk/collection/10-steps",
            meta: "Official guidance / NCSC 10 steps",
          },
          {
            rank: "07",
            title:
              "Identity and access management should be treated as a board-visible cyber control",
            href: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
            meta: "Official guidance / NCSC 10 Steps IAM",
          },
          {
            rank: "08",
            title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
            href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
            meta: "Threat source / CISA KEV catalog",
          },
          {
            rank: "09",
            title:
              "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
            href: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
            meta: "Primary / ENISA / 2025-10-01, updated 2026-01-09",
          },
          {
            rank: "10",
            title: "Incident management needs rehearsed decisions, not only technical playbooks",
            href: "https://www.ncsc.gov.uk/collection/incident-management",
            meta: "Official guidance / NCSC incident management",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Cyber matters when it changes the evidence a firm needs to produce about exposure, response readiness, recovery, supplier control, and customer impact.",
        },
        cards: [
          {
            meta: "So what",
            title: "Cyber is an operating-risk signal, not a technology sidebar",
            paragraphs: [
              "Threats only matter to the brief when they change service continuity, customer outcomes, legal notification, or board confidence.",
            ],
          },
          {
            meta: "Who cares",
            title: "CISO, CIO, COO, resilience, legal, compliance, procurement, and boards",
            paragraphs: [
              "The same incident can trigger cyber, resilience, third-party, conduct, privacy, and regulatory-notification questions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure, ownership, test results, patch decisions, and recovery evidence",
            paragraphs: [
              "Good assurance explains what is vulnerable, what is prioritised, what is accepted, and what happens if the control fails.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Cyber evidence checklist",
          title: "What the reader should ask for",
          description:
            "Cyber evidence should show how a threat becomes a governed decision and a tested operating response.",
        },
        deadlines: [
          {
            date: "Expose",
            action:
              "Which systems, suppliers, identities, data stores, and services are exposed to the signal?",
            owner: "Map",
          },
          {
            date: "Prioritise",
            action:
              "What risk-based decision explains patching, compensating controls, or accepted exposure?",
            owner: "Decide",
          },
          {
            date: "Detect",
            action:
              "Which logs, alerts, behaviours, and playbooks would show the threat becoming active?",
            owner: "Monitor",
          },
          {
            date: "Recover",
            action:
              "Has recovery been tested for volume, customer impact, supplier dependency, and communications?",
            owner: "Recover",
          },
          {
            date: "Govern",
            action:
              "What changed in the board or risk committee view of cyber risk and remediation?",
            owner: "Board",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Cyber in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with technology failure, third-party risk, and data.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when cyber is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "NCSC guidance and advisories",
            href: "https://www.ncsc.gov.uk/",
            paragraphs: [
              "Standing source for cyber hygiene, threat response, cloud, identity, and incident guidance.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/cyber/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8",
    metadata: {
      title: "Cyber Signals | The Virtual Officer",
      description:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphTitle: "Cyber Signals | The Virtual Officer",
      openGraphDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Cyber Signals | The Virtual Officer",
      twitterDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cyber Signals",
        description:
          "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/cyber/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8:/signals/cyber/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "45dc74d70bd670b6db44ca060d759224d761a19e319c3f9d2c32cc8d78f6c6f8",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Cyber",
        title: "Threats, vulnerabilities, identity, and response",
        dek: "The cyber page links threat and vulnerability signals to practical evidence: who owns the risk, what was tested, what was patched, and how the firm would recover.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 cyber signals",
        paragraphs: [
          "These items anchor the weekly read across ransomware, vulnerability management, cyber resilience, testing, and reform.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/news/international-cyber-agencies-fresh-advice-defend-against-china-linked-covert-networks",
              content:
                "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC and 15 international partners / 2026-04-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/blog-post/caf-v4-0-released-in-response-to-growing-threat",
              content:
                "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC / 2025-08-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2025/october/effective-practices-cyber-response-and-recovery-capabilities",
              content:
                "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England, PRA and FCA / 2025-10-20",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more cyber signals",
          description:
            "The shortlist carries the leadership read. These five more rows preserve the source trail behind cyber governance, identity, threat intelligence, incident response, and supplier exposure.",
        },
        items: [
          {
            rank: "06",
            title: "Basic control hygiene remains the first test of cyber governance",
            href: "https://www.ncsc.gov.uk/collection/10-steps",
            meta: "Official guidance / NCSC 10 steps",
          },
          {
            rank: "07",
            title:
              "Identity and access management should be treated as a board-visible cyber control",
            href: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
            meta: "Official guidance / NCSC 10 Steps IAM",
          },
          {
            rank: "08",
            title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
            href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
            meta: "Threat source / CISA KEV catalog",
          },
          {
            rank: "09",
            title:
              "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
            href: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
            meta: "Primary / ENISA / 2025-10-01, updated 2026-01-09",
          },
          {
            rank: "10",
            title: "Incident management needs rehearsed decisions, not only technical playbooks",
            href: "https://www.ncsc.gov.uk/collection/incident-management",
            meta: "Official guidance / NCSC incident management",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Cyber matters when it changes the evidence a firm needs to produce about exposure, response readiness, recovery, supplier control, and customer impact.",
        },
        cards: [
          {
            meta: "So what",
            title: "Cyber is an operating-risk signal, not a technology sidebar",
            paragraphs: [
              "Threats only matter to the brief when they change service continuity, customer outcomes, legal notification, or board confidence.",
            ],
          },
          {
            meta: "Who cares",
            title: "CISO, CIO, COO, resilience, legal, compliance, procurement, and boards",
            paragraphs: [
              "The same incident can trigger cyber, resilience, third-party, conduct, privacy, and regulatory-notification questions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure, ownership, test results, patch decisions, and recovery evidence",
            paragraphs: [
              "Good assurance explains what is vulnerable, what is prioritised, what is accepted, and what happens if the control fails.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Cyber evidence checklist",
          title: "What the reader should ask for",
          description:
            "Cyber evidence should show how a threat becomes a governed decision and a tested operating response.",
        },
        deadlines: [
          {
            date: "Expose",
            action:
              "Which systems, suppliers, identities, data stores, and services are exposed to the signal?",
            owner: "Map",
          },
          {
            date: "Prioritise",
            action:
              "What risk-based decision explains patching, compensating controls, or accepted exposure?",
            owner: "Decide",
          },
          {
            date: "Detect",
            action:
              "Which logs, alerts, behaviours, and playbooks would show the threat becoming active?",
            owner: "Monitor",
          },
          {
            date: "Recover",
            action:
              "Has recovery been tested for volume, customer impact, supplier dependency, and communications?",
            owner: "Recover",
          },
          {
            date: "Govern",
            action:
              "What changed in the board or risk committee view of cyber risk and remediation?",
            owner: "Board",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Cyber in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with technology failure, third-party risk, and data.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when cyber is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "NCSC guidance and advisories",
            href: "https://www.ncsc.gov.uk/",
            paragraphs: [
              "Standing source for cyber hygiene, threat response, cloud, identity, and incident guidance.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "cyber / 2026-07-06",
    },
  },
  {
    route: "/signals/cyber/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "33107752674d6dadffc38886da666c112ddc351e8179967272545f58b07e3c37",
    metadata: {
      title: "Cyber Signals | The Virtual Officer",
      description:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphTitle: "Cyber Signals | The Virtual Officer",
      openGraphDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Cyber Signals | The Virtual Officer",
      twitterDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cyber Signals",
        description:
          "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/cyber/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:33107752674d6dadffc38886da666c112ddc351e8179967272545f58b07e3c37:/signals/cyber/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "33107752674d6dadffc38886da666c112ddc351e8179967272545f58b07e3c37",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Cyber",
        title: "Threats, vulnerabilities, identity, and response",
        dek: "The cyber page links threat and vulnerability signals to practical evidence: who owns the risk, what was tested, what was patched, and how the firm would recover.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 cyber signals",
        paragraphs: [
          "These items anchor the weekly read across ransomware, vulnerability management, cyber resilience, testing, and reform.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/ransomware/home",
              content:
                "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC ransomware",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/collection/vulnerability-management",
              content:
                "Vulnerability management needs prioritisation evidence, not only patch counts",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC vulnerability management",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/firms/cyber-resilience",
              content:
                "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official expectations / FCA cyber resilience",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more cyber signals",
          description:
            "The shortlist carries the leadership read. These five more rows preserve the source trail behind cyber governance, identity, threat intelligence, incident response, and supplier exposure.",
        },
        items: [
          {
            rank: "06",
            title: "Basic control hygiene remains the first test of cyber governance",
            href: "https://www.ncsc.gov.uk/collection/10-steps",
            meta: "Official guidance / NCSC 10 steps",
          },
          {
            rank: "07",
            title:
              "Identity and access management should be treated as a board-visible cyber control",
            href: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
            meta: "Official guidance / NCSC 10 Steps IAM",
          },
          {
            rank: "08",
            title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
            href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
            meta: "Threat source / CISA KEV catalog",
          },
          {
            rank: "09",
            title: "Threat landscape reporting should refresh scenarios and control tests",
            href: "https://www.enisa.europa.eu/topics/cyber-threats/threat-landscape",
            meta: "Threat source / ENISA",
          },
          {
            rank: "10",
            title: "Incident management needs rehearsed decisions, not only technical playbooks",
            href: "https://www.ncsc.gov.uk/collection/incident-management",
            meta: "Official guidance / NCSC incident management",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Cyber matters when it changes the evidence a firm needs to produce about exposure, response readiness, recovery, supplier control, and customer impact.",
        },
        cards: [
          {
            meta: "So what",
            title: "Cyber is an operating-risk signal, not a technology sidebar",
            paragraphs: [
              "Threats only matter to the brief when they change service continuity, customer outcomes, legal notification, or board confidence.",
            ],
          },
          {
            meta: "Who cares",
            title: "CISO, CIO, COO, resilience, legal, compliance, procurement, and boards",
            paragraphs: [
              "The same incident can trigger cyber, resilience, third-party, conduct, privacy, and regulatory-notification questions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure, ownership, test results, patch decisions, and recovery evidence",
            paragraphs: [
              "Good assurance explains what is vulnerable, what is prioritised, what is accepted, and what happens if the control fails.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "Cyber evidence should show how a threat becomes a governed decision and a tested operating response.",
        },
        deadlines: [
          {
            date: "Expose",
            action:
              "Which systems, suppliers, identities, data stores, and services are exposed to the signal?",
            owner: "Map",
          },
          {
            date: "Prioritise",
            action:
              "What risk-based decision explains patching, compensating controls, or accepted exposure?",
            owner: "Decide",
          },
          {
            date: "Detect",
            action:
              "Which logs, alerts, behaviours, and playbooks would show the threat becoming active?",
            owner: "Monitor",
          },
          {
            date: "Recover",
            action:
              "Has recovery been tested for volume, customer impact, supplier dependency, and communications?",
            owner: "Recover",
          },
          {
            date: "Govern",
            action:
              "What changed in the board or risk committee view of cyber risk and remediation?",
            owner: "Board",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Cyber in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with technology failure, third-party risk, and data.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when cyber is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "NCSC guidance and advisories",
            href: "https://www.ncsc.gov.uk/",
            paragraphs: [
              "Standing source for cyber hygiene, threat response, cloud, identity, and incident guidance.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "cyber / 2026-07-06",
      currentLabel: "cyber / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-6b10e90b55d40515ea8feb10:2026-07-06",
          signalId: "signal:archive-url-6b10e90b55d40515ea8feb10",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          implication:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          rank: 1,
          semanticHash: "d370a812b9f63720e26f8d7cd41e50ac709c567247a796e55f894d698e954799",
          sourceIds: ["source:archive-url-6b10e90b55d40515ea8feb10"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f9b77eacfab9f387e7202372:2026-07-06",
          signalId: "signal:archive-url-f9b77eacfab9f387e7202372",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          implication:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          rank: 2,
          semanticHash: "7c4a8d1d9024e64b7cccb8835c86d62a82c8c5fccf6f3ae1b1b7ce2797ac7861",
          sourceIds: ["source:archive-url-f9b77eacfab9f387e7202372"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e57b6f5d7643ac343821160f:2026-07-06",
          signalId: "signal:archive-url-e57b6f5d7643ac343821160f",
          editionId: "edition:authored-cyber:2026-07-06",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          implication:
            "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          rank: 3,
          semanticHash: "b608c7593bbe33448a65095d87e228cfa44c20d07be7d11a6486b66afe1253d4",
          sourceIds: ["source:archive-url-e57b6f5d7643ac343821160f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e21fe2ddbb5981fc8c95af0e:2026-07-06",
          signalId: "signal:archive-url-e21fe2ddbb5981fc8c95af0e",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          implication:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          rank: 4,
          semanticHash: "4d372dc4cf274f7cd191ba9e6b946b178b1139199620d2117c9a0dc6a69d43b7",
          sourceIds: ["source:archive-url-e21fe2ddbb5981fc8c95af0e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2af73c5cc88fb59425ad9541:2026-07-06",
          signalId: "signal:archive-url-2af73c5cc88fb59425ad9541",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          implication:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          rank: 5,
          semanticHash: "3e8404251e00461b4d4d9e37b8a92efb96bd89daf3ae7d08aa6a28b96156613d",
          sourceIds: ["source:archive-url-2af73c5cc88fb59425ad9541"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9ac4f8eeaa1214934fea0c32:2026-07-06",
          signalId: "signal:archive-url-9ac4f8eeaa1214934fea0c32",
          editionId: "edition:authored-cyber:2026-07-06",
          title: "NCSC guidance and advisories",
          implication: "NCSC guidance and advisories",
          rank: 6,
          semanticHash: "c515189cb7faab2f846abbcde8be2b8a982e89021c49a3182cf526cd67262d71",
          sourceIds: ["source:archive-url-9ac4f8eeaa1214934fea0c32"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-960de1cf0a1a31c86cc2ac0b:2026-07-06",
          signalId: "signal:archive-url-960de1cf0a1a31c86cc2ac0b",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          implication:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          rank: 7,
          semanticHash: "15bab1cb89f634c25aef3b31b815e5de11f30ed18608f3d37fa5c8379d49c4a8",
          sourceIds: ["source:archive-url-960de1cf0a1a31c86cc2ac0b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4f1a012330be046f8a7aa92d:2026-07-06",
          signalId: "signal:archive-url-4f1a012330be046f8a7aa92d",
          editionId: "edition:authored-cyber:2026-07-06",
          title: "Basic control hygiene remains the first test of cyber governance",
          implication: "Basic control hygiene remains the first test of cyber governance",
          rank: 8,
          semanticHash: "035e90e025c24663b0b13c55a8cb064f3115f78a5bcabb3e4ad1772f31a75142",
          sourceIds: ["source:archive-url-4f1a012330be046f8a7aa92d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-666216aaa4e8759c791fce52:2026-07-06",
          signalId: "signal:archive-url-666216aaa4e8759c791fce52",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          implication:
            "Identity and access management should be treated as a board-visible cyber control",
          rank: 9,
          semanticHash: "7909472dfd90bd89e8d81a625a3d700f549b88dda3f494eadc59d26530123712",
          sourceIds: ["source:archive-url-666216aaa4e8759c791fce52"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ba4dae5347488f5096f8de97:2026-07-06",
          signalId: "signal:archive-url-ba4dae5347488f5096f8de97",
          editionId: "edition:authored-cyber:2026-07-06",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          implication:
            "Incident management needs rehearsed decisions, not only technical playbooks",
          rank: 10,
          semanticHash: "edcaea06b538ad5790791afe8e891f7d4f935c035399608a810910fb0ab91295",
          sourceIds: ["source:archive-url-ba4dae5347488f5096f8de97"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e3d47244d201bc850d6022be:2026-07-06",
          signalId: "signal:archive-url-e3d47244d201bc850d6022be",
          editionId: "edition:authored-cyber:2026-07-06",
          title:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          implication:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          rank: 11,
          semanticHash: "a865a68cd2ae579e95a843267bc8503f3004f80ce0d394057349f91a1b8203ee",
          sourceIds: ["source:archive-url-e3d47244d201bc850d6022be"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-6b10e90b55d40515ea8feb10:2026-07-08",
          signalId: "signal:archive-url-6b10e90b55d40515ea8feb10",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          implication:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          rank: 1,
          semanticHash: "d370a812b9f63720e26f8d7cd41e50ac709c567247a796e55f894d698e954799",
          sourceIds: ["source:archive-url-6b10e90b55d40515ea8feb10"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e57b6f5d7643ac343821160f:2026-07-08",
          signalId: "signal:archive-url-e57b6f5d7643ac343821160f",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          implication:
            "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          rank: 2,
          semanticHash: "b608c7593bbe33448a65095d87e228cfa44c20d07be7d11a6486b66afe1253d4",
          sourceIds: ["source:archive-url-e57b6f5d7643ac343821160f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e21fe2ddbb5981fc8c95af0e:2026-07-08",
          signalId: "signal:archive-url-e21fe2ddbb5981fc8c95af0e",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          implication:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          rank: 3,
          semanticHash: "4d372dc4cf274f7cd191ba9e6b946b178b1139199620d2117c9a0dc6a69d43b7",
          sourceIds: ["source:archive-url-e21fe2ddbb5981fc8c95af0e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb24006d6f02a40b316636cc:2026-07-08",
          signalId: "signal:archive-url-bb24006d6f02a40b316636cc",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Threat landscape reporting should refresh scenarios and control tests",
          implication: "Threat landscape reporting should refresh scenarios and control tests",
          rank: 4,
          semanticHash: "6d5e2565a75e3872800125a0cc2fe11fd92d818298166ee7b3f75d5eaecdb849",
          sourceIds: ["source:archive-url-bb24006d6f02a40b316636cc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7c8175964241dc96343da8c:2026-07-08",
          signalId: "signal:archive-url-e7c8175964241dc96343da8c",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          implication:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          rank: 5,
          semanticHash: "97d1efdf2ea76c410ae843d689a5d0af433f17ef804ac7917a256dd7f741ab57",
          sourceIds: ["source:archive-url-e7c8175964241dc96343da8c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9ac4f8eeaa1214934fea0c32:2026-07-08",
          signalId: "signal:archive-url-9ac4f8eeaa1214934fea0c32",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "NCSC guidance and advisories",
          implication: "NCSC guidance and advisories",
          rank: 6,
          semanticHash: "c515189cb7faab2f846abbcde8be2b8a982e89021c49a3182cf526cd67262d71",
          sourceIds: ["source:archive-url-9ac4f8eeaa1214934fea0c32"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4f1a012330be046f8a7aa92d:2026-07-08",
          signalId: "signal:archive-url-4f1a012330be046f8a7aa92d",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Basic control hygiene remains the first test of cyber governance",
          implication: "Basic control hygiene remains the first test of cyber governance",
          rank: 7,
          semanticHash: "035e90e025c24663b0b13c55a8cb064f3115f78a5bcabb3e4ad1772f31a75142",
          sourceIds: ["source:archive-url-4f1a012330be046f8a7aa92d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-666216aaa4e8759c791fce52:2026-07-08",
          signalId: "signal:archive-url-666216aaa4e8759c791fce52",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          implication:
            "Identity and access management should be treated as a board-visible cyber control",
          rank: 8,
          semanticHash: "7909472dfd90bd89e8d81a625a3d700f549b88dda3f494eadc59d26530123712",
          sourceIds: ["source:archive-url-666216aaa4e8759c791fce52"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ba4dae5347488f5096f8de97:2026-07-08",
          signalId: "signal:archive-url-ba4dae5347488f5096f8de97",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          implication:
            "Incident management needs rehearsed decisions, not only technical playbooks",
          rank: 9,
          semanticHash: "edcaea06b538ad5790791afe8e891f7d4f935c035399608a810910fb0ab91295",
          sourceIds: ["source:archive-url-ba4dae5347488f5096f8de97"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2b301f26e6ef9d8bdf3884e6:2026-07-08",
          signalId: "signal:archive-url-2b301f26e6ef9d8bdf3884e6",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Vulnerability management needs prioritisation evidence, not only patch counts",
          implication:
            "Vulnerability management needs prioritisation evidence, not only patch counts",
          rank: 10,
          semanticHash: "f40858bdcac76fcf55cf5fb57f43e246d9acb7e2de1c7aefa99d1a20fca744d7",
          sourceIds: ["source:archive-url-2b301f26e6ef9d8bdf3884e6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-675b0323c7e8ec2a84c30898:2026-07-08",
          signalId: "signal:archive-url-675b0323c7e8ec2a84c30898",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          implication:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          rank: 11,
          semanticHash: "e92d1b89ab0de6abf17419d587c5ab73b34c62c0a3d373b98fed52a7fc4a9f26",
          sourceIds: ["source:archive-url-675b0323c7e8ec2a84c30898"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-6b10e90b55d40515ea8feb10",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          publisher: "anthropic.com",
          url: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f9b77eacfab9f387e7202372",
          title:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2025/october/effective-practices-cyber-response-and-recovery-capabilities",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e57b6f5d7643ac343821160f",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          publisher: "cisa.gov",
          url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e21fe2ddbb5981fc8c95af0e",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2af73c5cc88fb59425ad9541",
          title:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          publisher: "enisa.europa.eu",
          url: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9ac4f8eeaa1214934fea0c32",
          title: "NCSC guidance and advisories",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-960de1cf0a1a31c86cc2ac0b",
          title:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/blog-post/caf-v4-0-released-in-response-to-growing-threat",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4f1a012330be046f8a7aa92d",
          title: "Basic control hygiene remains the first test of cyber governance",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/10-steps",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-666216aaa4e8759c791fce52",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ba4dae5347488f5096f8de97",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/incident-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e3d47244d201bc850d6022be",
          title:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/news/international-cyber-agencies-fresh-advice-defend-against-china-linked-covert-networks",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb24006d6f02a40b316636cc",
          title: "Threat landscape reporting should refresh scenarios and control tests",
          publisher: "enisa.europa.eu",
          url: "https://www.enisa.europa.eu/topics/cyber-threats/threat-landscape",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e7c8175964241dc96343da8c",
          title:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/cyber-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2b301f26e6ef9d8bdf3884e6",
          title: "Vulnerability management needs prioritisation evidence, not only patch counts",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/vulnerability-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-675b0323c7e8ec2a84c30898",
          title:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/ransomware/home",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/cyber/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "b14cd7674291a776db25d6affdc66148520cbf4d84b032a9545e544c718b77ce",
    metadata: {
      title: "Cyber Signals | The Virtual Officer",
      description:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphTitle: "Cyber Signals | The Virtual Officer",
      openGraphDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/cyber/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Cyber Signals | The Virtual Officer",
      twitterDescription:
        "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cyber Signals",
        description:
          "Cyber signals covering ransomware, vulnerability management, threat-led testing, identity controls, cyber resilience, and incident evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/cyber/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:b14cd7674291a776db25d6affdc66148520cbf4d84b032a9545e544c718b77ce:/signals/cyber/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/cyber/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "b14cd7674291a776db25d6affdc66148520cbf4d84b032a9545e544c718b77ce",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Cyber",
        title: "Threats, vulnerabilities, identity, and response",
        dek: "The cyber page links threat and vulnerability signals to practical evidence: who owns the risk, what was tested, what was patched, and how the firm would recover.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 cyber signals",
        paragraphs: [
          "These items anchor the weekly read across ransomware, vulnerability management, cyber resilience, testing, and reform.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
              content:
                "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Anthropic / 2026-07-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/news/international-cyber-agencies-fresh-advice-defend-against-china-linked-covert-networks",
              content:
                "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC and 15 international partners / 2026-04-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/blog-post/caf-v4-0-released-in-response-to-growing-threat",
              content:
                "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / NCSC / 2025-08-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2025/october/effective-practices-cyber-response-and-recovery-capabilities",
              content:
                "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England, PRA and FCA / 2025-10-20",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more cyber signals",
          description:
            "The shortlist carries the leadership read. These five more rows preserve the source trail behind cyber governance, identity, threat intelligence, incident response, and supplier exposure.",
        },
        items: [
          {
            rank: "06",
            title: "Basic control hygiene remains the first test of cyber governance",
            href: "https://www.ncsc.gov.uk/collection/10-steps",
            meta: "Official guidance / NCSC 10 steps",
          },
          {
            rank: "07",
            title:
              "Identity and access management should be treated as a board-visible cyber control",
            href: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
            meta: "Official guidance / NCSC 10 Steps IAM",
          },
          {
            rank: "08",
            title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
            href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
            meta: "Threat source / CISA KEV catalog",
          },
          {
            rank: "09",
            title:
              "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
            href: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
            meta: "Primary / ENISA / 2025-10-01, updated 2026-01-09",
          },
          {
            rank: "10",
            title: "Incident management needs rehearsed decisions, not only technical playbooks",
            href: "https://www.ncsc.gov.uk/collection/incident-management",
            meta: "Official guidance / NCSC incident management",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Cyber matters when it changes the evidence a firm needs to produce about exposure, response readiness, recovery, supplier control, and customer impact.",
        },
        cards: [
          {
            meta: "So what",
            title: "Cyber is an operating-risk signal, not a technology sidebar",
            paragraphs: [
              "Threats only matter to the brief when they change service continuity, customer outcomes, legal notification, or board confidence.",
            ],
          },
          {
            meta: "Who cares",
            title: "CISO, CIO, COO, resilience, legal, compliance, procurement, and boards",
            paragraphs: [
              "The same incident can trigger cyber, resilience, third-party, conduct, privacy, and regulatory-notification questions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure, ownership, test results, patch decisions, and recovery evidence",
            paragraphs: [
              "Good assurance explains what is vulnerable, what is prioritised, what is accepted, and what happens if the control fails.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Cyber evidence checklist",
          title: "What the reader should ask for",
          description:
            "Cyber evidence should show how a threat becomes a governed decision and a tested operating response.",
        },
        deadlines: [
          {
            date: "Expose",
            action:
              "Which systems, suppliers, identities, data stores, and services are exposed to the signal?",
            owner: "Map",
          },
          {
            date: "Prioritise",
            action:
              "What risk-based decision explains patching, compensating controls, or accepted exposure?",
            owner: "Decide",
          },
          {
            date: "Detect",
            action:
              "Which logs, alerts, behaviours, and playbooks would show the threat becoming active?",
            owner: "Monitor",
          },
          {
            date: "Recover",
            action:
              "Has recovery been tested for volume, customer impact, supplier dependency, and communications?",
            owner: "Recover",
          },
          {
            date: "Govern",
            action:
              "What changed in the board or risk committee view of cyber risk and remediation?",
            owner: "Board",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Cyber in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with technology failure, third-party risk, and data.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when cyber is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "NCSC guidance and advisories",
            href: "https://www.ncsc.gov.uk/",
            paragraphs: [
              "Standing source for cyber hygiene, threat response, cloud, identity, and incident guidance.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "cyber / 2026-07-08",
      currentLabel: "cyber / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-6b10e90b55d40515ea8feb10:2026-07-08",
          signalId: "signal:archive-url-6b10e90b55d40515ea8feb10",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          implication:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          rank: 1,
          semanticHash: "d370a812b9f63720e26f8d7cd41e50ac709c567247a796e55f894d698e954799",
          sourceIds: ["source:archive-url-6b10e90b55d40515ea8feb10"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e57b6f5d7643ac343821160f:2026-07-08",
          signalId: "signal:archive-url-e57b6f5d7643ac343821160f",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          implication:
            "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          rank: 2,
          semanticHash: "b608c7593bbe33448a65095d87e228cfa44c20d07be7d11a6486b66afe1253d4",
          sourceIds: ["source:archive-url-e57b6f5d7643ac343821160f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e21fe2ddbb5981fc8c95af0e:2026-07-08",
          signalId: "signal:archive-url-e21fe2ddbb5981fc8c95af0e",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          implication:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          rank: 3,
          semanticHash: "4d372dc4cf274f7cd191ba9e6b946b178b1139199620d2117c9a0dc6a69d43b7",
          sourceIds: ["source:archive-url-e21fe2ddbb5981fc8c95af0e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb24006d6f02a40b316636cc:2026-07-08",
          signalId: "signal:archive-url-bb24006d6f02a40b316636cc",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Threat landscape reporting should refresh scenarios and control tests",
          implication: "Threat landscape reporting should refresh scenarios and control tests",
          rank: 4,
          semanticHash: "6d5e2565a75e3872800125a0cc2fe11fd92d818298166ee7b3f75d5eaecdb849",
          sourceIds: ["source:archive-url-bb24006d6f02a40b316636cc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7c8175964241dc96343da8c:2026-07-08",
          signalId: "signal:archive-url-e7c8175964241dc96343da8c",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          implication:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          rank: 5,
          semanticHash: "97d1efdf2ea76c410ae843d689a5d0af433f17ef804ac7917a256dd7f741ab57",
          sourceIds: ["source:archive-url-e7c8175964241dc96343da8c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9ac4f8eeaa1214934fea0c32:2026-07-08",
          signalId: "signal:archive-url-9ac4f8eeaa1214934fea0c32",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "NCSC guidance and advisories",
          implication: "NCSC guidance and advisories",
          rank: 6,
          semanticHash: "c515189cb7faab2f846abbcde8be2b8a982e89021c49a3182cf526cd67262d71",
          sourceIds: ["source:archive-url-9ac4f8eeaa1214934fea0c32"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4f1a012330be046f8a7aa92d:2026-07-08",
          signalId: "signal:archive-url-4f1a012330be046f8a7aa92d",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Basic control hygiene remains the first test of cyber governance",
          implication: "Basic control hygiene remains the first test of cyber governance",
          rank: 7,
          semanticHash: "035e90e025c24663b0b13c55a8cb064f3115f78a5bcabb3e4ad1772f31a75142",
          sourceIds: ["source:archive-url-4f1a012330be046f8a7aa92d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-666216aaa4e8759c791fce52:2026-07-08",
          signalId: "signal:archive-url-666216aaa4e8759c791fce52",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          implication:
            "Identity and access management should be treated as a board-visible cyber control",
          rank: 8,
          semanticHash: "7909472dfd90bd89e8d81a625a3d700f549b88dda3f494eadc59d26530123712",
          sourceIds: ["source:archive-url-666216aaa4e8759c791fce52"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ba4dae5347488f5096f8de97:2026-07-08",
          signalId: "signal:archive-url-ba4dae5347488f5096f8de97",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          implication:
            "Incident management needs rehearsed decisions, not only technical playbooks",
          rank: 9,
          semanticHash: "edcaea06b538ad5790791afe8e891f7d4f935c035399608a810910fb0ab91295",
          sourceIds: ["source:archive-url-ba4dae5347488f5096f8de97"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2b301f26e6ef9d8bdf3884e6:2026-07-08",
          signalId: "signal:archive-url-2b301f26e6ef9d8bdf3884e6",
          editionId: "edition:authored-cyber:2026-07-08",
          title: "Vulnerability management needs prioritisation evidence, not only patch counts",
          implication:
            "Vulnerability management needs prioritisation evidence, not only patch counts",
          rank: 10,
          semanticHash: "f40858bdcac76fcf55cf5fb57f43e246d9acb7e2de1c7aefa99d1a20fca744d7",
          sourceIds: ["source:archive-url-2b301f26e6ef9d8bdf3884e6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-675b0323c7e8ec2a84c30898:2026-07-08",
          signalId: "signal:archive-url-675b0323c7e8ec2a84c30898",
          editionId: "edition:authored-cyber:2026-07-08",
          title:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          implication:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          rank: 11,
          semanticHash: "e92d1b89ab0de6abf17419d587c5ab73b34c62c0a3d373b98fed52a7fc4a9f26",
          sourceIds: ["source:archive-url-675b0323c7e8ec2a84c30898"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-6b10e90b55d40515ea8feb10:2026-07-09",
          signalId: "signal:archive-url-6b10e90b55d40515ea8feb10",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          implication:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          rank: 1,
          semanticHash: "d370a812b9f63720e26f8d7cd41e50ac709c567247a796e55f894d698e954799",
          sourceIds: ["source:archive-url-6b10e90b55d40515ea8feb10"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f9b77eacfab9f387e7202372:2026-07-09",
          signalId: "signal:archive-url-f9b77eacfab9f387e7202372",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          implication:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          rank: 2,
          semanticHash: "7c4a8d1d9024e64b7cccb8835c86d62a82c8c5fccf6f3ae1b1b7ce2797ac7861",
          sourceIds: ["source:archive-url-f9b77eacfab9f387e7202372"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e57b6f5d7643ac343821160f:2026-07-09",
          signalId: "signal:archive-url-e57b6f5d7643ac343821160f",
          editionId: "edition:authored-cyber:2026-07-09",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          implication:
            "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          rank: 3,
          semanticHash: "b608c7593bbe33448a65095d87e228cfa44c20d07be7d11a6486b66afe1253d4",
          sourceIds: ["source:archive-url-e57b6f5d7643ac343821160f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e21fe2ddbb5981fc8c95af0e:2026-07-09",
          signalId: "signal:archive-url-e21fe2ddbb5981fc8c95af0e",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          implication:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          rank: 4,
          semanticHash: "4d372dc4cf274f7cd191ba9e6b946b178b1139199620d2117c9a0dc6a69d43b7",
          sourceIds: ["source:archive-url-e21fe2ddbb5981fc8c95af0e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2af73c5cc88fb59425ad9541:2026-07-09",
          signalId: "signal:archive-url-2af73c5cc88fb59425ad9541",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          implication:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          rank: 5,
          semanticHash: "3e8404251e00461b4d4d9e37b8a92efb96bd89daf3ae7d08aa6a28b96156613d",
          sourceIds: ["source:archive-url-2af73c5cc88fb59425ad9541"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9ac4f8eeaa1214934fea0c32:2026-07-09",
          signalId: "signal:archive-url-9ac4f8eeaa1214934fea0c32",
          editionId: "edition:authored-cyber:2026-07-09",
          title: "NCSC guidance and advisories",
          implication: "NCSC guidance and advisories",
          rank: 6,
          semanticHash: "c515189cb7faab2f846abbcde8be2b8a982e89021c49a3182cf526cd67262d71",
          sourceIds: ["source:archive-url-9ac4f8eeaa1214934fea0c32"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-960de1cf0a1a31c86cc2ac0b:2026-07-09",
          signalId: "signal:archive-url-960de1cf0a1a31c86cc2ac0b",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          implication:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          rank: 7,
          semanticHash: "15bab1cb89f634c25aef3b31b815e5de11f30ed18608f3d37fa5c8379d49c4a8",
          sourceIds: ["source:archive-url-960de1cf0a1a31c86cc2ac0b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4f1a012330be046f8a7aa92d:2026-07-09",
          signalId: "signal:archive-url-4f1a012330be046f8a7aa92d",
          editionId: "edition:authored-cyber:2026-07-09",
          title: "Basic control hygiene remains the first test of cyber governance",
          implication: "Basic control hygiene remains the first test of cyber governance",
          rank: 8,
          semanticHash: "035e90e025c24663b0b13c55a8cb064f3115f78a5bcabb3e4ad1772f31a75142",
          sourceIds: ["source:archive-url-4f1a012330be046f8a7aa92d"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-666216aaa4e8759c791fce52:2026-07-09",
          signalId: "signal:archive-url-666216aaa4e8759c791fce52",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          implication:
            "Identity and access management should be treated as a board-visible cyber control",
          rank: 9,
          semanticHash: "7909472dfd90bd89e8d81a625a3d700f549b88dda3f494eadc59d26530123712",
          sourceIds: ["source:archive-url-666216aaa4e8759c791fce52"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ba4dae5347488f5096f8de97:2026-07-09",
          signalId: "signal:archive-url-ba4dae5347488f5096f8de97",
          editionId: "edition:authored-cyber:2026-07-09",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          implication:
            "Incident management needs rehearsed decisions, not only technical playbooks",
          rank: 10,
          semanticHash: "edcaea06b538ad5790791afe8e891f7d4f935c035399608a810910fb0ab91295",
          sourceIds: ["source:archive-url-ba4dae5347488f5096f8de97"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e3d47244d201bc850d6022be:2026-07-09",
          signalId: "signal:archive-url-e3d47244d201bc850d6022be",
          editionId: "edition:authored-cyber:2026-07-09",
          title:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          implication:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          rank: 11,
          semanticHash: "a865a68cd2ae579e95a843267bc8503f3004f80ce0d394057349f91a1b8203ee",
          sourceIds: ["source:archive-url-e3d47244d201bc850d6022be"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-6b10e90b55d40515ea8feb10",
          title:
            "Alberta government's Claude deployment shows AI compressing vulnerability discovery and remediation timelines",
          publisher: "anthropic.com",
          url: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e57b6f5d7643ac343821160f",
          title: "Known exploited vulnerabilities should drive risk-based patch prioritisation",
          publisher: "cisa.gov",
          url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e21fe2ddbb5981fc8c95af0e",
          title:
            "ESAs back ESRB warning that frontier AI models pose a severe and rising systemic cyber risk",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb24006d6f02a40b316636cc",
          title: "Threat landscape reporting should refresh scenarios and control tests",
          publisher: "enisa.europa.eu",
          url: "https://www.enisa.europa.eu/topics/cyber-threats/threat-landscape",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e7c8175964241dc96343da8c",
          title:
            "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/cyber-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9ac4f8eeaa1214934fea0c32",
          title: "NCSC guidance and advisories",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4f1a012330be046f8a7aa92d",
          title: "Basic control hygiene remains the first test of cyber governance",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/10-steps",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-666216aaa4e8759c791fce52",
          title:
            "Identity and access management should be treated as a board-visible cyber control",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ba4dae5347488f5096f8de97",
          title: "Incident management needs rehearsed decisions, not only technical playbooks",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/incident-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2b301f26e6ef9d8bdf3884e6",
          title: "Vulnerability management needs prioritisation evidence, not only patch counts",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/vulnerability-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-675b0323c7e8ec2a84c30898",
          title:
            "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/ransomware/home",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f9b77eacfab9f387e7202372",
          title:
            "Bank, PRA, and FCA publish effective practices observed in systemic firms' cyber response and recovery",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2025/october/effective-practices-cyber-response-and-recovery-capabilities",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2af73c5cc88fb59425ad9541",
          title:
            "ENISA's 2025 threat landscape finds threat groups increasingly reusing tools and converging tactics across the EU",
          publisher: "enisa.europa.eu",
          url: "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-960de1cf0a1a31c86cc2ac0b",
          title:
            "NCSC releases CAF v4.0 with new supply-chain and AI-risk coverage to close the widening defence gap",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/blog-post/caf-v4-0-released-in-response-to-growing-threat",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e3d47244d201bc850d6022be",
          title:
            "International cyber agencies issue joint advisory on defending against China-linked covert device networks",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/news/international-cyber-agencies-fresh-advice-defend-against-china-linked-covert-networks",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/data/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/data/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0",
    metadata: {
      title: "Data Signals | The Virtual Officer",
      description:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      canonical: "https://stgeorgesstrategy.com/signals/data/",
      openGraphTitle: "Data Signals | The Virtual Officer",
      openGraphDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/data/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Data Signals | The Virtual Officer",
      twitterDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Data Signals",
        description:
          "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
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
          "@id": "https://stgeorgesstrategy.com/signals/data/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:82e7356a8e7c2d536f333c33604d965344d061f6dcf2d8b4e1ec0b9d078e469a:/signals/data/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "82e7356a8e7c2d536f333c33604d965344d061f6dcf2d8b4e1ec0b9d078e469a",
      },
      {
        key: "live:810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0:/signals/data/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Data",
        title: "Lineage, reporting, privacy, and evidence integrity",
        dek: "The data page turns reporting, risk aggregation, AI input, privacy, and record-keeping signals into practical questions about ownership, quality, lineage, and proof.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 data signals",
        paragraphs: [
          "These items anchor the weekly read across risk data, regulatory reporting, privacy, AI inputs, and evidence integrity.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
              content: "New UK legal duty to handle data protection complaints takes effect",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bis.org/publ/bcbs_nl36.htm",
              content:
                "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Standard setter / Basel Committee Newsletter 36 / 2026-01-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-digest/2026/june-2026",
              content:
                "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England PRA / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-poor-practice/prudential-regulatory-reporting-investment-firms-data-quality-review",
              content:
                "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2025-11-26",
            },
          ],
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/ai-and-biometrics-strategy-update-march-2026/",
              content:
                "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-03-17",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more data signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind data lineage, reporting quality, privacy governance, AI data controls, and auditability.",
        },
        items: [
          {
            rank: "06",
            title:
              "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
            href: "https://www.bis.org/bcbs/publ/d328.htm",
            meta: "Standard setter / Basel Committee",
          },
          {
            rank: "07",
            title:
              "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
            href: "https://www.bankofengland.co.uk/statistics/notice/2026/statistical-notice-2026-05",
            meta: "Primary / Bank of England / 2026-06-03",
          },
          {
            rank: "08",
            title:
              "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
            href: "https://www.fca.org.uk/publications/consultation-papers/cp25-32-improving-uk-transaction-reporting-regime",
            meta: "Primary / FCA / consultation closed 2026-02-20",
          },
          {
            rank: "09",
            title:
              "Surveillance data needs completeness and explainability before alerts can be trusted",
            href: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
            meta: "Official expectations / FCA market abuse surveillance",
          },
          {
            rank: "10",
            title:
              "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/ico-response-to-government-on-safe-ai-powered-innovation/",
            meta: "Primary / ICO / 2026-05-29",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Data matters when the firm cannot evidence the information used for reporting, AI, customer decisions, risk aggregation, privacy, or operational recovery.",
        },
        cards: [
          {
            meta: "So what",
            title: "Data quality is an accountability question",
            paragraphs: [
              "The issue is not only whether a field is right. It is whether the firm can explain source, transformation, validation, ownership, and use.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, finance, compliance, data, technology, AI, privacy, and audit",
            paragraphs: [
              "The same data weakness can affect reporting, models, conduct, resilience, privacy, surveillance, and board decisions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Lineage, controls, reconciliations, records, and sign-off",
            paragraphs: [
              "Good assurance shows where data came from, how it changed, who approved it, and how exceptions were resolved.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Data evidence checklist",
          title: "What the reader should ask for",
          description:
            "Data evidence should be useful to the people relying on the output, not only to the team maintaining the control inventory.",
        },
        deadlines: [
          {
            date: "Lineage",
            action:
              "Can the firm trace the data from source system through transformation, control, and final report or decision?",
            owner: "Trace",
          },
          {
            date: "Quality",
            action:
              "Which quality rules exist, who owns exceptions, and what happens when thresholds are breached?",
            owner: "Validate",
          },
          {
            date: "Use",
            action:
              "Which reports, models, customer decisions, controls, or regulatory submissions rely on this data?",
            owner: "Map",
          },
          {
            date: "Privacy",
            action:
              "Is lawful basis, retention, access, sharing, and deletion evidenced for the relevant data set?",
            owner: "Govern",
          },
          {
            date: "Sign-off",
            action:
              "Who is accountable for the final data product, and what evidence supports their attestation?",
            owner: "Own",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Data in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with AI, technology failure, cyber, and resilience.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when data is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "BCBS 239 risk data aggregation",
            href: "https://www.bis.org/publ/bcbs239.htm",
            paragraphs: [
              "Standing source for governance, architecture, accuracy, completeness, timeliness, and reporting usefulness.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/data/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0",
    metadata: {
      title: "Data Signals | The Virtual Officer",
      description:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      canonical: "https://stgeorgesstrategy.com/signals/data/",
      openGraphTitle: "Data Signals | The Virtual Officer",
      openGraphDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/data/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Data Signals | The Virtual Officer",
      twitterDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Data Signals",
        description:
          "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
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
          "@id": "https://stgeorgesstrategy.com/signals/data/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0:/signals/data/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "810fa64b390f7a65ed756d614843f44d4476f8b32579b08255fdbb415040d5a0",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Data",
        title: "Lineage, reporting, privacy, and evidence integrity",
        dek: "The data page turns reporting, risk aggregation, AI input, privacy, and record-keeping signals into practical questions about ownership, quality, lineage, and proof.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 data signals",
        paragraphs: [
          "These items anchor the weekly read across risk data, regulatory reporting, privacy, AI inputs, and evidence integrity.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
              content: "New UK legal duty to handle data protection complaints takes effect",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bis.org/publ/bcbs_nl36.htm",
              content:
                "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Standard setter / Basel Committee Newsletter 36 / 2026-01-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-digest/2026/june-2026",
              content:
                "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England PRA / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-poor-practice/prudential-regulatory-reporting-investment-firms-data-quality-review",
              content:
                "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2025-11-26",
            },
          ],
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/ai-and-biometrics-strategy-update-march-2026/",
              content:
                "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-03-17",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more data signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind data lineage, reporting quality, privacy governance, AI data controls, and auditability.",
        },
        items: [
          {
            rank: "06",
            title:
              "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
            href: "https://www.bis.org/bcbs/publ/d328.htm",
            meta: "Standard setter / Basel Committee",
          },
          {
            rank: "07",
            title:
              "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
            href: "https://www.bankofengland.co.uk/statistics/notice/2026/statistical-notice-2026-05",
            meta: "Primary / Bank of England / 2026-06-03",
          },
          {
            rank: "08",
            title:
              "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
            href: "https://www.fca.org.uk/publications/consultation-papers/cp25-32-improving-uk-transaction-reporting-regime",
            meta: "Primary / FCA / consultation closed 2026-02-20",
          },
          {
            rank: "09",
            title:
              "Surveillance data needs completeness and explainability before alerts can be trusted",
            href: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
            meta: "Official expectations / FCA market abuse surveillance",
          },
          {
            rank: "10",
            title:
              "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/ico-response-to-government-on-safe-ai-powered-innovation/",
            meta: "Primary / ICO / 2026-05-29",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Data matters when the firm cannot evidence the information used for reporting, AI, customer decisions, risk aggregation, privacy, or operational recovery.",
        },
        cards: [
          {
            meta: "So what",
            title: "Data quality is an accountability question",
            paragraphs: [
              "The issue is not only whether a field is right. It is whether the firm can explain source, transformation, validation, ownership, and use.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, finance, compliance, data, technology, AI, privacy, and audit",
            paragraphs: [
              "The same data weakness can affect reporting, models, conduct, resilience, privacy, surveillance, and board decisions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Lineage, controls, reconciliations, records, and sign-off",
            paragraphs: [
              "Good assurance shows where data came from, how it changed, who approved it, and how exceptions were resolved.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Data evidence checklist",
          title: "What the reader should ask for",
          description:
            "Data evidence should be useful to the people relying on the output, not only to the team maintaining the control inventory.",
        },
        deadlines: [
          {
            date: "Lineage",
            action:
              "Can the firm trace the data from source system through transformation, control, and final report or decision?",
            owner: "Trace",
          },
          {
            date: "Quality",
            action:
              "Which quality rules exist, who owns exceptions, and what happens when thresholds are breached?",
            owner: "Validate",
          },
          {
            date: "Use",
            action:
              "Which reports, models, customer decisions, controls, or regulatory submissions rely on this data?",
            owner: "Map",
          },
          {
            date: "Privacy",
            action:
              "Is lawful basis, retention, access, sharing, and deletion evidenced for the relevant data set?",
            owner: "Govern",
          },
          {
            date: "Sign-off",
            action:
              "Who is accountable for the final data product, and what evidence supports their attestation?",
            owner: "Own",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Data in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with AI, technology failure, cyber, and resilience.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when data is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "BCBS 239 risk data aggregation",
            href: "https://www.bis.org/publ/bcbs239.htm",
            paragraphs: [
              "Standing source for governance, architecture, accuracy, completeness, timeliness, and reporting usefulness.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "data / 2026-07-06",
    },
  },
  {
    route: "/signals/data/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "d21a278a90ed13bd98506cb08f684888f111f2bd939d6adacee21f1067af9c7f",
    metadata: {
      title: "Data Signals | The Virtual Officer",
      description:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      canonical: "https://stgeorgesstrategy.com/signals/data/",
      openGraphTitle: "Data Signals | The Virtual Officer",
      openGraphDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/data/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Data Signals | The Virtual Officer",
      twitterDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Data Signals",
        description:
          "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
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
          "@id": "https://stgeorgesstrategy.com/signals/data/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:d21a278a90ed13bd98506cb08f684888f111f2bd939d6adacee21f1067af9c7f:/signals/data/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "d21a278a90ed13bd98506cb08f684888f111f2bd939d6adacee21f1067af9c7f",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Data",
        title: "Lineage, reporting, privacy, and evidence integrity",
        dek: "The data page turns reporting, risk aggregation, AI input, privacy, and record-keeping signals into practical questions about ownership, quality, lineage, and proof.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 data signals",
        paragraphs: [
          "These items anchor the weekly read across risk data, regulatory reporting, privacy, AI inputs, and evidence integrity.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
              content: "New UK legal duty to handle data protection complaints takes effect",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bis.org/publ/bcbs239.htm",
              content:
                "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Standard setter / BCBS 239",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/statistics/data-collection",
              content:
                "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official source / Bank of England data collection",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/firms/regulatory-reporting",
              content:
                "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official expectations / FCA regulatory reporting",
            },
          ],
          [
            {
              kind: "link",
              href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
              content: "AI and analytics need lawful, explainable, and controlled data inputs",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / ICO AI and data protection",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more data signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind data lineage, reporting quality, privacy governance, AI data controls, and auditability.",
        },
        items: [
          {
            rank: "06",
            title:
              "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
            href: "https://www.bis.org/bcbs/publ/d328.htm",
            meta: "Standard setter / Basel Committee",
          },
          {
            rank: "07",
            title:
              "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
            href: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-reporting",
            meta: "Official expectations / Bank of England and PRA",
          },
          {
            rank: "08",
            title:
              "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
            href: "https://www.fca.org.uk/markets/transaction-reporting",
            meta: "Official expectations / FCA transaction reporting",
          },
          {
            rank: "09",
            title:
              "Surveillance data needs completeness and explainability before alerts can be trusted",
            href: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
            meta: "Official expectations / FCA market abuse surveillance",
          },
          {
            rank: "10",
            title:
              "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
            href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/",
            meta: "Official guidance / ICO accuracy principle",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Data matters when the firm cannot evidence the information used for reporting, AI, customer decisions, risk aggregation, privacy, or operational recovery.",
        },
        cards: [
          {
            meta: "So what",
            title: "Data quality is an accountability question",
            paragraphs: [
              "The issue is not only whether a field is right. It is whether the firm can explain source, transformation, validation, ownership, and use.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, finance, compliance, data, technology, AI, privacy, and audit",
            paragraphs: [
              "The same data weakness can affect reporting, models, conduct, resilience, privacy, surveillance, and board decisions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Lineage, controls, reconciliations, records, and sign-off",
            paragraphs: [
              "Good assurance shows where data came from, how it changed, who approved it, and how exceptions were resolved.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "Data evidence should be useful to the people relying on the output, not only to the team maintaining the control inventory.",
        },
        deadlines: [
          {
            date: "Lineage",
            action:
              "Can the firm trace the data from source system through transformation, control, and final report or decision?",
            owner: "Trace",
          },
          {
            date: "Quality",
            action:
              "Which quality rules exist, who owns exceptions, and what happens when thresholds are breached?",
            owner: "Validate",
          },
          {
            date: "Use",
            action:
              "Which reports, models, customer decisions, controls, or regulatory submissions rely on this data?",
            owner: "Map",
          },
          {
            date: "Privacy",
            action:
              "Is lawful basis, retention, access, sharing, and deletion evidenced for the relevant data set?",
            owner: "Govern",
          },
          {
            date: "Sign-off",
            action:
              "Who is accountable for the final data product, and what evidence supports their attestation?",
            owner: "Own",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Data in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with AI, technology failure, cyber, and resilience.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when data is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "BCBS 239 risk data aggregation",
            href: "https://www.bis.org/publ/bcbs239.htm",
            paragraphs: [
              "Standing source for governance, architecture, accuracy, completeness, timeliness, and reporting usefulness.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "data / 2026-07-06",
      currentLabel: "data / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-865b839c1c7669079bcb365c:2026-07-06",
          signalId: "signal:archive-url-865b839c1c7669079bcb365c",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          implication:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          rank: 1,
          semanticHash: "0a0220ac251fad8d3b88fb1d6ea7ba3ba5e963754efc2b6eb2201bf46413b21c",
          sourceIds: ["source:archive-url-865b839c1c7669079bcb365c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-712876f41ed8b64fa96f4cab:2026-07-06",
          signalId: "signal:archive-url-712876f41ed8b64fa96f4cab",
          editionId: "edition:authored-data:2026-07-06",
          title: "New UK legal duty to handle data protection complaints takes effect",
          implication: "New UK legal duty to handle data protection complaints takes effect",
          rank: 2,
          semanticHash: "1e8e5595f492b2812a167f9880bfa7e9559b62d99d07f457b8d28fe9aa5b9682",
          sourceIds: ["source:archive-url-712876f41ed8b64fa96f4cab"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-78151adb9f81820b11eec5b2:2026-07-06",
          signalId: "signal:archive-url-78151adb9f81820b11eec5b2",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          implication:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          rank: 3,
          semanticHash: "799245196a276afe6211ded74380d320a75d9dc679afb2a42e010fb9d364329c",
          sourceIds: ["source:archive-url-78151adb9f81820b11eec5b2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7b54e65f30222e7f645d73b6:2026-07-06",
          signalId: "signal:archive-url-7b54e65f30222e7f645d73b6",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          implication:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          rank: 4,
          semanticHash: "f57233bc19670a99389e4717468fa71acf03c6570509c03d22011aaec6d7ea80",
          sourceIds: ["source:archive-url-7b54e65f30222e7f645d73b6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-060185ca90305b213d355c0f:2026-07-06",
          signalId: "signal:archive-url-060185ca90305b213d355c0f",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          implication:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          rank: 5,
          semanticHash: "de17eea4f64bd46bc25fa75ee38a13db1c2e14dadf6d4ea8e0111e457b6c0516",
          sourceIds: ["source:archive-url-060185ca90305b213d355c0f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7a710a43ff08ef314ce98538:2026-07-06",
          signalId: "signal:archive-url-7a710a43ff08ef314ce98538",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          implication:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          rank: 6,
          semanticHash: "ac7651277f72def6c20a21eb86021c9ebd10fbf21f63899a40c10c8d5d32d846",
          sourceIds: ["source:archive-url-7a710a43ff08ef314ce98538"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e3720e70a7eaf86bf1441cb:2026-07-06",
          signalId: "signal:archive-url-5e3720e70a7eaf86bf1441cb",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          implication:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          rank: 7,
          semanticHash: "cff5da31b8b7471bf05e1b7176a3a91ac9b0be8195eb75c9d61ebee839a97d1f",
          sourceIds: ["source:archive-url-5e3720e70a7eaf86bf1441cb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1eb75e003d0b943b8e9986ff:2026-07-06",
          signalId: "signal:archive-url-1eb75e003d0b943b8e9986ff",
          editionId: "edition:authored-data:2026-07-06",
          title: "BCBS 239 risk data aggregation",
          implication: "BCBS 239 risk data aggregation",
          rank: 8,
          semanticHash: "8941e6f0201b2607ca5e8efe7821311e0bbdea91c27d732badc25d50ce4ebde4",
          sourceIds: ["source:archive-url-1eb75e003d0b943b8e9986ff"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bcae326d4992f1f0ba0b5f9e:2026-07-06",
          signalId: "signal:archive-url-bcae326d4992f1f0ba0b5f9e",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          implication:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          rank: 9,
          semanticHash: "91501758ee25da9be98f0b8cac2089e3894239fac018a66876b702ace7e2d02c",
          sourceIds: ["source:archive-url-bcae326d4992f1f0ba0b5f9e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9264a948b68b26290ce0d9bb:2026-07-06",
          signalId: "signal:archive-url-9264a948b68b26290ce0d9bb",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          implication:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          rank: 10,
          semanticHash: "264681d1a97d189529032448adf2b2dec8f28fe0ff58f6a0f3350eaf124cb845",
          sourceIds: ["source:archive-url-9264a948b68b26290ce0d9bb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-504e65f429142c4c5b467aa8:2026-07-06",
          signalId: "signal:archive-url-504e65f429142c4c5b467aa8",
          editionId: "edition:authored-data:2026-07-06",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          implication:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          rank: 11,
          semanticHash: "a7365491fe309bdc4a8e9a1a45670272095ab8c24371fc5377318783e40d98c4",
          sourceIds: ["source:archive-url-504e65f429142c4c5b467aa8"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-712876f41ed8b64fa96f4cab:2026-07-08",
          signalId: "signal:archive-url-712876f41ed8b64fa96f4cab",
          editionId: "edition:authored-data:2026-07-08",
          title: "New UK legal duty to handle data protection complaints takes effect",
          implication: "New UK legal duty to handle data protection complaints takes effect",
          rank: 1,
          semanticHash: "1e8e5595f492b2812a167f9880bfa7e9559b62d99d07f457b8d28fe9aa5b9682",
          sourceIds: ["source:archive-url-712876f41ed8b64fa96f4cab"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-11427e242494ed01d207cd37:2026-07-08",
          signalId: "signal:archive-url-11427e242494ed01d207cd37",
          editionId: "edition:authored-data:2026-07-08",
          title: "AI and analytics need lawful, explainable, and controlled data inputs",
          implication: "AI and analytics need lawful, explainable, and controlled data inputs",
          rank: 2,
          semanticHash: "f97713e8b45ee3dbeefa9d8155d5cc6d7e172fd8ab59f5edac064afa01ce4272",
          sourceIds: ["source:archive-url-11427e242494ed01d207cd37"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4577259e102893d66c07f4d4:2026-07-08",
          signalId: "signal:archive-url-4577259e102893d66c07f4d4",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          implication:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          rank: 3,
          semanticHash: "11844bacdc0c4544dbde274cbfcab58397084e62fdecd62bf59e8538aa0597f4",
          sourceIds: ["source:archive-url-4577259e102893d66c07f4d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f4c90bcb693d7571a4ed8a13:2026-07-08",
          signalId: "signal:archive-url-f4c90bcb693d7571a4ed8a13",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          implication:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          rank: 4,
          semanticHash: "6176f3a3544264c7d5b3851b729ee707dc5e4929ce798dab00230fbe50c9755c",
          sourceIds: ["source:archive-url-f4c90bcb693d7571a4ed8a13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8a0e9c76429dfe2fbf9a3787:2026-07-08",
          signalId: "signal:archive-url-8a0e9c76429dfe2fbf9a3787",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          implication:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          rank: 5,
          semanticHash: "71f3f67394e63a3b78f716978ac7f1e89e0cccc1611fd31f6719a9cdf1ff59f1",
          sourceIds: ["source:archive-url-8a0e9c76429dfe2fbf9a3787"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7a710a43ff08ef314ce98538:2026-07-08",
          signalId: "signal:archive-url-7a710a43ff08ef314ce98538",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          implication:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          rank: 6,
          semanticHash: "ac7651277f72def6c20a21eb86021c9ebd10fbf21f63899a40c10c8d5d32d846",
          sourceIds: ["source:archive-url-7a710a43ff08ef314ce98538"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1eb75e003d0b943b8e9986ff:2026-07-08",
          signalId: "signal:archive-url-1eb75e003d0b943b8e9986ff",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
          implication:
            "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
          rank: 7,
          semanticHash: "8a9baf6e09a04c2ada7d3736d8c1a12a3d2a4478510e9ee681f837021d113499",
          sourceIds: ["source:archive-url-1eb75e003d0b943b8e9986ff"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ea6de633b6829df28c975e2:2026-07-08",
          signalId: "signal:archive-url-5ea6de633b6829df28c975e2",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          implication:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          rank: 8,
          semanticHash: "935dc1858adffebde6d97ac7ba5b54793748d8cb206d6fbe9703b0a353bdc5ee",
          sourceIds: ["source:archive-url-5ea6de633b6829df28c975e2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b42bbd91e42a48d335bd180:2026-07-08",
          signalId: "signal:archive-url-4b42bbd91e42a48d335bd180",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          implication:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          rank: 9,
          semanticHash: "83906f818242898d673cebe9effc9c08d9a08bc026b3bfed0ca9bd201f6b7bc0",
          sourceIds: ["source:archive-url-4b42bbd91e42a48d335bd180"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-504e65f429142c4c5b467aa8:2026-07-08",
          signalId: "signal:archive-url-504e65f429142c4c5b467aa8",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          implication:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          rank: 10,
          semanticHash: "a7365491fe309bdc4a8e9a1a45670272095ab8c24371fc5377318783e40d98c4",
          sourceIds: ["source:archive-url-504e65f429142c4c5b467aa8"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-865b839c1c7669079bcb365c",
          title:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/ico-response-to-government-on-safe-ai-powered-innovation/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-712876f41ed8b64fa96f4cab",
          title: "New UK legal duty to handle data protection complaints takes effect",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-78151adb9f81820b11eec5b2",
          title:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/ai-and-biometrics-strategy-update-march-2026/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7b54e65f30222e7f645d73b6",
          title:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-digest/2026/june-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-060185ca90305b213d355c0f",
          title:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/statistics/notice/2026/statistical-notice-2026-05",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7a710a43ff08ef314ce98538",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          publisher: "bis.org",
          url: "https://www.bis.org/bcbs/publ/d328.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e3720e70a7eaf86bf1441cb",
          title:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs_nl36.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1eb75e003d0b943b8e9986ff",
          title:
            "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs239.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bcae326d4992f1f0ba0b5f9e",
          title:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/consultation-papers/cp25-32-improving-uk-transaction-reporting-regime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9264a948b68b26290ce0d9bb",
          title:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-poor-practice/prudential-regulatory-reporting-investment-firms-data-quality-review",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-504e65f429142c4c5b467aa8",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-11427e242494ed01d207cd37",
          title: "AI and analytics need lawful, explainable, and controlled data inputs",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4577259e102893d66c07f4d4",
          title:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f4c90bcb693d7571a4ed8a13",
          title:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8a0e9c76429dfe2fbf9a3787",
          title:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/statistics/data-collection",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ea6de633b6829df28c975e2",
          title:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4b42bbd91e42a48d335bd180",
          title:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/markets/transaction-reporting",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/data/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "82e7356a8e7c2d536f333c33604d965344d061f6dcf2d8b4e1ec0b9d078e469a",
    metadata: {
      title: "Data Signals | The Virtual Officer",
      description:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      canonical: "https://stgeorgesstrategy.com/signals/data/",
      openGraphTitle: "Data Signals | The Virtual Officer",
      openGraphDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/data/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Data Signals | The Virtual Officer",
      twitterDescription:
        "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Data Signals",
        description:
          "Data signals covering risk data aggregation, regulatory reporting, lineage, privacy, AI inputs, records, and evidence integrity.",
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
          "@id": "https://stgeorgesstrategy.com/signals/data/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:82e7356a8e7c2d536f333c33604d965344d061f6dcf2d8b4e1ec0b9d078e469a:/signals/data/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/data/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "82e7356a8e7c2d536f333c33604d965344d061f6dcf2d8b4e1ec0b9d078e469a",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Data",
        title: "Lineage, reporting, privacy, and evidence integrity",
        dek: "The data page turns reporting, risk aggregation, AI input, privacy, and record-keeping signals into practical questions about ownership, quality, lineage, and proof.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 data signals",
        paragraphs: [
          "These items anchor the weekly read across risk data, regulatory reporting, privacy, AI inputs, and evidence integrity.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
              content: "New UK legal duty to handle data protection complaints takes effect",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bis.org/publ/bcbs_nl36.htm",
              content:
                "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Standard setter / Basel Committee Newsletter 36 / 2026-01-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-digest/2026/june-2026",
              content:
                "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England PRA / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-poor-practice/prudential-regulatory-reporting-investment-firms-data-quality-review",
              content:
                "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2025-11-26",
            },
          ],
          [
            {
              kind: "link",
              href: "https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/ai-and-biometrics-strategy-update-march-2026/",
              content:
                "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ICO / 2026-03-17",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more data signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind data lineage, reporting quality, privacy governance, AI data controls, and auditability.",
        },
        items: [
          {
            rank: "06",
            title:
              "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
            href: "https://www.bis.org/bcbs/publ/d328.htm",
            meta: "Standard setter / Basel Committee",
          },
          {
            rank: "07",
            title:
              "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
            href: "https://www.bankofengland.co.uk/statistics/notice/2026/statistical-notice-2026-05",
            meta: "Primary / Bank of England / 2026-06-03",
          },
          {
            rank: "08",
            title:
              "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
            href: "https://www.fca.org.uk/publications/consultation-papers/cp25-32-improving-uk-transaction-reporting-regime",
            meta: "Primary / FCA / consultation closed 2026-02-20",
          },
          {
            rank: "09",
            title:
              "Surveillance data needs completeness and explainability before alerts can be trusted",
            href: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
            meta: "Official expectations / FCA market abuse surveillance",
          },
          {
            rank: "10",
            title:
              "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/ico-response-to-government-on-safe-ai-powered-innovation/",
            meta: "Primary / ICO / 2026-05-29",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Data matters when the firm cannot evidence the information used for reporting, AI, customer decisions, risk aggregation, privacy, or operational recovery.",
        },
        cards: [
          {
            meta: "So what",
            title: "Data quality is an accountability question",
            paragraphs: [
              "The issue is not only whether a field is right. It is whether the firm can explain source, transformation, validation, ownership, and use.",
            ],
          },
          {
            meta: "Who cares",
            title: "Risk, finance, compliance, data, technology, AI, privacy, and audit",
            paragraphs: [
              "The same data weakness can affect reporting, models, conduct, resilience, privacy, surveillance, and board decisions.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Lineage, controls, reconciliations, records, and sign-off",
            paragraphs: [
              "Good assurance shows where data came from, how it changed, who approved it, and how exceptions were resolved.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Data evidence checklist",
          title: "What the reader should ask for",
          description:
            "Data evidence should be useful to the people relying on the output, not only to the team maintaining the control inventory.",
        },
        deadlines: [
          {
            date: "Lineage",
            action:
              "Can the firm trace the data from source system through transformation, control, and final report or decision?",
            owner: "Trace",
          },
          {
            date: "Quality",
            action:
              "Which quality rules exist, who owns exceptions, and what happens when thresholds are breached?",
            owner: "Validate",
          },
          {
            date: "Use",
            action:
              "Which reports, models, customer decisions, controls, or regulatory submissions rely on this data?",
            owner: "Map",
          },
          {
            date: "Privacy",
            action:
              "Is lawful basis, retention, access, sharing, and deletion evidenced for the relevant data set?",
            owner: "Govern",
          },
          {
            date: "Sign-off",
            action:
              "Who is accountable for the final data product, and what evidence supports their attestation?",
            owner: "Own",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Data in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with AI, technology failure, cyber, and resilience.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when data is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "BCBS 239 risk data aggregation",
            href: "https://www.bis.org/publ/bcbs239.htm",
            paragraphs: [
              "Standing source for governance, architecture, accuracy, completeness, timeliness, and reporting usefulness.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "data / 2026-07-08",
      currentLabel: "data / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-712876f41ed8b64fa96f4cab:2026-07-08",
          signalId: "signal:archive-url-712876f41ed8b64fa96f4cab",
          editionId: "edition:authored-data:2026-07-08",
          title: "New UK legal duty to handle data protection complaints takes effect",
          implication: "New UK legal duty to handle data protection complaints takes effect",
          rank: 1,
          semanticHash: "1e8e5595f492b2812a167f9880bfa7e9559b62d99d07f457b8d28fe9aa5b9682",
          sourceIds: ["source:archive-url-712876f41ed8b64fa96f4cab"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-11427e242494ed01d207cd37:2026-07-08",
          signalId: "signal:archive-url-11427e242494ed01d207cd37",
          editionId: "edition:authored-data:2026-07-08",
          title: "AI and analytics need lawful, explainable, and controlled data inputs",
          implication: "AI and analytics need lawful, explainable, and controlled data inputs",
          rank: 2,
          semanticHash: "f97713e8b45ee3dbeefa9d8155d5cc6d7e172fd8ab59f5edac064afa01ce4272",
          sourceIds: ["source:archive-url-11427e242494ed01d207cd37"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4577259e102893d66c07f4d4:2026-07-08",
          signalId: "signal:archive-url-4577259e102893d66c07f4d4",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          implication:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          rank: 3,
          semanticHash: "11844bacdc0c4544dbde274cbfcab58397084e62fdecd62bf59e8538aa0597f4",
          sourceIds: ["source:archive-url-4577259e102893d66c07f4d4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f4c90bcb693d7571a4ed8a13:2026-07-08",
          signalId: "signal:archive-url-f4c90bcb693d7571a4ed8a13",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          implication:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          rank: 4,
          semanticHash: "6176f3a3544264c7d5b3851b729ee707dc5e4929ce798dab00230fbe50c9755c",
          sourceIds: ["source:archive-url-f4c90bcb693d7571a4ed8a13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8a0e9c76429dfe2fbf9a3787:2026-07-08",
          signalId: "signal:archive-url-8a0e9c76429dfe2fbf9a3787",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          implication:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          rank: 5,
          semanticHash: "71f3f67394e63a3b78f716978ac7f1e89e0cccc1611fd31f6719a9cdf1ff59f1",
          sourceIds: ["source:archive-url-8a0e9c76429dfe2fbf9a3787"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7a710a43ff08ef314ce98538:2026-07-08",
          signalId: "signal:archive-url-7a710a43ff08ef314ce98538",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          implication:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          rank: 6,
          semanticHash: "ac7651277f72def6c20a21eb86021c9ebd10fbf21f63899a40c10c8d5d32d846",
          sourceIds: ["source:archive-url-7a710a43ff08ef314ce98538"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1eb75e003d0b943b8e9986ff:2026-07-08",
          signalId: "signal:archive-url-1eb75e003d0b943b8e9986ff",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
          implication:
            "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability",
          rank: 7,
          semanticHash: "8a9baf6e09a04c2ada7d3736d8c1a12a3d2a4478510e9ee681f837021d113499",
          sourceIds: ["source:archive-url-1eb75e003d0b943b8e9986ff"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ea6de633b6829df28c975e2:2026-07-08",
          signalId: "signal:archive-url-5ea6de633b6829df28c975e2",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          implication:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          rank: 8,
          semanticHash: "935dc1858adffebde6d97ac7ba5b54793748d8cb206d6fbe9703b0a353bdc5ee",
          sourceIds: ["source:archive-url-5ea6de633b6829df28c975e2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b42bbd91e42a48d335bd180:2026-07-08",
          signalId: "signal:archive-url-4b42bbd91e42a48d335bd180",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          implication:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          rank: 9,
          semanticHash: "83906f818242898d673cebe9effc9c08d9a08bc026b3bfed0ca9bd201f6b7bc0",
          sourceIds: ["source:archive-url-4b42bbd91e42a48d335bd180"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-504e65f429142c4c5b467aa8:2026-07-08",
          signalId: "signal:archive-url-504e65f429142c4c5b467aa8",
          editionId: "edition:authored-data:2026-07-08",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          implication:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          rank: 10,
          semanticHash: "a7365491fe309bdc4a8e9a1a45670272095ab8c24371fc5377318783e40d98c4",
          sourceIds: ["source:archive-url-504e65f429142c4c5b467aa8"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-865b839c1c7669079bcb365c:2026-07-09",
          signalId: "signal:archive-url-865b839c1c7669079bcb365c",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          implication:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          rank: 1,
          semanticHash: "0a0220ac251fad8d3b88fb1d6ea7ba3ba5e963754efc2b6eb2201bf46413b21c",
          sourceIds: ["source:archive-url-865b839c1c7669079bcb365c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-712876f41ed8b64fa96f4cab:2026-07-09",
          signalId: "signal:archive-url-712876f41ed8b64fa96f4cab",
          editionId: "edition:authored-data:2026-07-09",
          title: "New UK legal duty to handle data protection complaints takes effect",
          implication: "New UK legal duty to handle data protection complaints takes effect",
          rank: 2,
          semanticHash: "1e8e5595f492b2812a167f9880bfa7e9559b62d99d07f457b8d28fe9aa5b9682",
          sourceIds: ["source:archive-url-712876f41ed8b64fa96f4cab"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-78151adb9f81820b11eec5b2:2026-07-09",
          signalId: "signal:archive-url-78151adb9f81820b11eec5b2",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          implication:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          rank: 3,
          semanticHash: "799245196a276afe6211ded74380d320a75d9dc679afb2a42e010fb9d364329c",
          sourceIds: ["source:archive-url-78151adb9f81820b11eec5b2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7b54e65f30222e7f645d73b6:2026-07-09",
          signalId: "signal:archive-url-7b54e65f30222e7f645d73b6",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          implication:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          rank: 4,
          semanticHash: "f57233bc19670a99389e4717468fa71acf03c6570509c03d22011aaec6d7ea80",
          sourceIds: ["source:archive-url-7b54e65f30222e7f645d73b6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-060185ca90305b213d355c0f:2026-07-09",
          signalId: "signal:archive-url-060185ca90305b213d355c0f",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          implication:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          rank: 5,
          semanticHash: "de17eea4f64bd46bc25fa75ee38a13db1c2e14dadf6d4ea8e0111e457b6c0516",
          sourceIds: ["source:archive-url-060185ca90305b213d355c0f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7a710a43ff08ef314ce98538:2026-07-09",
          signalId: "signal:archive-url-7a710a43ff08ef314ce98538",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          implication:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          rank: 6,
          semanticHash: "ac7651277f72def6c20a21eb86021c9ebd10fbf21f63899a40c10c8d5d32d846",
          sourceIds: ["source:archive-url-7a710a43ff08ef314ce98538"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e3720e70a7eaf86bf1441cb:2026-07-09",
          signalId: "signal:archive-url-5e3720e70a7eaf86bf1441cb",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          implication:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          rank: 7,
          semanticHash: "cff5da31b8b7471bf05e1b7176a3a91ac9b0be8195eb75c9d61ebee839a97d1f",
          sourceIds: ["source:archive-url-5e3720e70a7eaf86bf1441cb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1eb75e003d0b943b8e9986ff:2026-07-09",
          signalId: "signal:archive-url-1eb75e003d0b943b8e9986ff",
          editionId: "edition:authored-data:2026-07-09",
          title: "BCBS 239 risk data aggregation",
          implication: "BCBS 239 risk data aggregation",
          rank: 8,
          semanticHash: "8941e6f0201b2607ca5e8efe7821311e0bbdea91c27d732badc25d50ce4ebde4",
          sourceIds: ["source:archive-url-1eb75e003d0b943b8e9986ff"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bcae326d4992f1f0ba0b5f9e:2026-07-09",
          signalId: "signal:archive-url-bcae326d4992f1f0ba0b5f9e",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          implication:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          rank: 9,
          semanticHash: "91501758ee25da9be98f0b8cac2089e3894239fac018a66876b702ace7e2d02c",
          sourceIds: ["source:archive-url-bcae326d4992f1f0ba0b5f9e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9264a948b68b26290ce0d9bb:2026-07-09",
          signalId: "signal:archive-url-9264a948b68b26290ce0d9bb",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          implication:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          rank: 10,
          semanticHash: "264681d1a97d189529032448adf2b2dec8f28fe0ff58f6a0f3350eaf124cb845",
          sourceIds: ["source:archive-url-9264a948b68b26290ce0d9bb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-504e65f429142c4c5b467aa8:2026-07-09",
          signalId: "signal:archive-url-504e65f429142c4c5b467aa8",
          editionId: "edition:authored-data:2026-07-09",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          implication:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          rank: 11,
          semanticHash: "a7365491fe309bdc4a8e9a1a45670272095ab8c24371fc5377318783e40d98c4",
          sourceIds: ["source:archive-url-504e65f429142c4c5b467aa8"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-712876f41ed8b64fa96f4cab",
          title: "New UK legal duty to handle data protection complaints takes effect",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-11427e242494ed01d207cd37",
          title: "AI and analytics need lawful, explainable, and controlled data inputs",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4577259e102893d66c07f4d4",
          title:
            "Accuracy obligations should map to remediation, correction, and customer-impact evidence",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f4c90bcb693d7571a4ed8a13",
          title:
            "PRA reporting should connect templates, source systems, reconciliations, and senior sign-off",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8a0e9c76429dfe2fbf9a3787",
          title:
            "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/statistics/data-collection",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7a710a43ff08ef314ce98538",
          title:
            "BCBS 239 progress reviews keep accountability for data quality on the supervisory agenda",
          publisher: "bis.org",
          url: "https://www.bis.org/bcbs/publ/d328.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1eb75e003d0b943b8e9986ff",
          title: "BCBS 239 risk data aggregation",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs239.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ea6de633b6829df28c975e2",
          title:
            "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4b42bbd91e42a48d335bd180",
          title:
            "Transaction reporting quality depends on lineage, completeness, validation, and exception management",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/markets/transaction-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-504e65f429142c4c5b467aa8",
          title:
            "Surveillance data needs completeness and explainability before alerts can be trusted",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/techsprints/market-abuse-surveillance",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-865b839c1c7669079bcb365c",
          title:
            "ICO sets out 2026/27 workplan for its AI code of practice and dedicated agentic-AI data protection guidance",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/05/ico-response-to-government-on-safe-ai-powered-innovation/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-78151adb9f81820b11eec5b2",
          title:
            "ICO AI and biometrics strategy update tracks foundation-model scrutiny and agentic AI data protection risk",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/ai-and-biometrics-strategy-update-march-2026/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7b54e65f30222e7f645d73b6",
          title:
            "PRA Regulatory Digest confirms the Future Banking Data programme is streamlining reporting collection",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/regulatory-digest/2026/june-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-060185ca90305b213d355c0f",
          title:
            "Bank of England's Statistics Taxonomy v1.3.1 update retires the Statistical Utility tool firms relied on for XBRL filings",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/statistics/notice/2026/statistical-notice-2026-05",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e3720e70a7eaf86bf1441cb",
          title:
            "Basel Committee newsletter flags data lineage and cross-border consistency as the persistent BCBS 239 gaps",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs_nl36.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bcae326d4992f1f0ba0b5f9e",
          title:
            "FCA's transaction-reporting overhaul (CP25/32) would cut reporting fields from 65 to 52 and save firms over £100m a year",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/consultation-papers/cp25-32-improving-uk-transaction-reporting-regime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9264a948b68b26290ce0d9bb",
          title:
            "FCA data quality review finds 10% of MIFIDPRU firms have recurring regulatory reporting errors",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-poor-practice/prudential-regulatory-reporting-investment-firms-data-quality-review",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/financial-crime/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf",
    metadata: {
      title: "Financial Crime Signals | The Virtual Officer",
      description:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      canonical: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphTitle: "Financial Crime Signals | The Virtual Officer",
      openGraphDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Financial Crime Signals | The Virtual Officer",
      twitterDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Financial Crime Signals",
        description:
          "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
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
          "@id": "https://stgeorgesstrategy.com/signals/financial-crime/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:816f3e8d4c3ad725080699f3ac1b7e14205bcc9198b242709e54eefb3d29dbb6:/signals/financial-crime/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "816f3e8d4c3ad725080699f3ac1b7e14205bcc9198b242709e54eefb3d29dbb6",
      },
      {
        key: "live:cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf:/signals/financial-crime/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Financial crime",
        title: "Fraud, scams, sanctions, and control evidence",
        dek: "The financial-crime topic page turns public-source fraud, AML, sanctions, cryptoasset, and scam signals into ownership, prevention, detection, and escalation questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 financial-crime signals",
        paragraphs: [
          "These items anchor the weekly read across fraud, AML, sanctions, cryptoasset controls, and customer harm.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
              content:
                "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / HM Treasury and OFSI / 2026-06-17",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
              content:
                "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-05-28",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/",
              content:
                "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Payment Systems Regulator / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.nationalcrimeagency.gov.uk/news/fraudsters-targeting-cryptocurrency-stopped-and-12-million-frozen-in-nca-led-operation-atlantic",
              content:
                "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / National Crime Agency / 2026-04-09",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
              content:
                "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-06-30",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more financial-crime signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind scam response, sanctions, cryptoasset monitoring, AML governance, and evidence quality.",
        },
        items: [
          {
            rank: "06",
            title:
              "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
            href: "https://www.cifas.org.uk/newsroom/fraudscape2026",
            meta: "Industry data / Cifas Fraudscape 2026 / 2026-03-12",
          },
          {
            rank: "07",
            title:
              "Financial-crime governance should be traceable from risk assessment to control testing",
            href: "https://handbook.fca.org.uk/handbook/FCG/1/",
            meta: "Official guidance / FCA financial crime guide",
          },
          {
            rank: "08",
            title:
              "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/firms-customer-due-diligence-processes-and-controls-our-findings",
            meta: "Primary / FCA / 2026-04-08",
          },
          {
            rank: "09",
            title:
              "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
            href: "https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/",
            meta: "Industry guidance / JMLSG / 2026-06-01",
          },
          {
            rank: "10",
            title:
              "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
            href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
            meta: "Official expectations / FCA cryptoasset AML regime",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Financial crime matters when external threat, customer harm, regulatory expectation, and the evidence that controls actually worked meet in the same operating question.",
        },
        cards: [
          {
            meta: "So what",
            title: "Financial crime is a customer and control story",
            paragraphs: [
              "The best signal is not only loss. It is whether the firm can show prevention, detection, escalation, redress, and learning before harm repeats.",
            ],
          },
          {
            meta: "Who cares",
            title: "MLRO, fraud, sanctions, payments, product, conduct, and board owners",
            paragraphs: [
              "The same signal can sit across AML, sanctions, scam reimbursement, cryptoasset exposure, and Consumer Duty.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Risk assessment, typologies, alerts, decisions, and outcomes",
            paragraphs: [
              "Controls need to evidence why a scenario exists, when it fired, how it was dispositioned, and what customer or regulatory action followed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Financial crime evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives financial-crime owners practical prompts that can move straight into a review, committee pack, or assurance request.",
        },
        deadlines: [
          {
            date: "Risk",
            action:
              "Which typologies, channels, products, geographies, and customer segments changed this week?",
            owner: "Assess",
          },
          {
            date: "Controls",
            action:
              "Which prevention, screening, monitoring, and escalation controls map to those typologies?",
            owner: "Map",
          },
          {
            date: "Alerts",
            action:
              "Can the firm explain alert quality, suppression, overrides, backlogs, and false-positive trends?",
            owner: "Monitor",
          },
          {
            date: "Harm",
            action:
              "How are scam losses, complaints, reimbursement, vulnerable customers, and repeated exposure tracked?",
            owner: "Outcome",
          },
          {
            date: "Board",
            action:
              "What changed in the board view of financial-crime risk, appetite, resourcing, and remediation?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Financial crime in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and AI.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "When financial crime becomes the weekly so-what",
            href: "/brief/",
            paragraphs: [
              "See how the strongest signal is carried into the consolidated weekly issue.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA financial-crime expectations",
            href: "https://www.fca.org.uk/firms/financial-crime",
            paragraphs: [
              "Standing source for risk assessment, controls, governance, and supervision.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/financial-crime/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf",
    metadata: {
      title: "Financial Crime Signals | The Virtual Officer",
      description:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      canonical: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphTitle: "Financial Crime Signals | The Virtual Officer",
      openGraphDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Financial Crime Signals | The Virtual Officer",
      twitterDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Financial Crime Signals",
        description:
          "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
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
          "@id": "https://stgeorgesstrategy.com/signals/financial-crime/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf:/signals/financial-crime/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "cf9c377164f021289d5b20e4db0c4762c8077e0091066c11f88a20566eb928bf",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Financial crime",
        title: "Fraud, scams, sanctions, and control evidence",
        dek: "The financial-crime topic page turns public-source fraud, AML, sanctions, cryptoasset, and scam signals into ownership, prevention, detection, and escalation questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 financial-crime signals",
        paragraphs: [
          "These items anchor the weekly read across fraud, AML, sanctions, cryptoasset controls, and customer harm.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
              content:
                "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / HM Treasury and OFSI / 2026-06-17",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
              content:
                "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-05-28",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/",
              content:
                "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Payment Systems Regulator / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.nationalcrimeagency.gov.uk/news/fraudsters-targeting-cryptocurrency-stopped-and-12-million-frozen-in-nca-led-operation-atlantic",
              content:
                "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / National Crime Agency / 2026-04-09",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
              content:
                "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-06-30",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more financial-crime signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind scam response, sanctions, cryptoasset monitoring, AML governance, and evidence quality.",
        },
        items: [
          {
            rank: "06",
            title:
              "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
            href: "https://www.cifas.org.uk/newsroom/fraudscape2026",
            meta: "Industry data / Cifas Fraudscape 2026 / 2026-03-12",
          },
          {
            rank: "07",
            title:
              "Financial-crime governance should be traceable from risk assessment to control testing",
            href: "https://handbook.fca.org.uk/handbook/FCG/1/",
            meta: "Official guidance / FCA financial crime guide",
          },
          {
            rank: "08",
            title:
              "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/firms-customer-due-diligence-processes-and-controls-our-findings",
            meta: "Primary / FCA / 2026-04-08",
          },
          {
            rank: "09",
            title:
              "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
            href: "https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/",
            meta: "Industry guidance / JMLSG / 2026-06-01",
          },
          {
            rank: "10",
            title:
              "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
            href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
            meta: "Official expectations / FCA cryptoasset AML regime",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Financial crime matters when external threat, customer harm, regulatory expectation, and the evidence that controls actually worked meet in the same operating question.",
        },
        cards: [
          {
            meta: "So what",
            title: "Financial crime is a customer and control story",
            paragraphs: [
              "The best signal is not only loss. It is whether the firm can show prevention, detection, escalation, redress, and learning before harm repeats.",
            ],
          },
          {
            meta: "Who cares",
            title: "MLRO, fraud, sanctions, payments, product, conduct, and board owners",
            paragraphs: [
              "The same signal can sit across AML, sanctions, scam reimbursement, cryptoasset exposure, and Consumer Duty.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Risk assessment, typologies, alerts, decisions, and outcomes",
            paragraphs: [
              "Controls need to evidence why a scenario exists, when it fired, how it was dispositioned, and what customer or regulatory action followed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Financial crime evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives financial-crime owners practical prompts that can move straight into a review, committee pack, or assurance request.",
        },
        deadlines: [
          {
            date: "Risk",
            action:
              "Which typologies, channels, products, geographies, and customer segments changed this week?",
            owner: "Assess",
          },
          {
            date: "Controls",
            action:
              "Which prevention, screening, monitoring, and escalation controls map to those typologies?",
            owner: "Map",
          },
          {
            date: "Alerts",
            action:
              "Can the firm explain alert quality, suppression, overrides, backlogs, and false-positive trends?",
            owner: "Monitor",
          },
          {
            date: "Harm",
            action:
              "How are scam losses, complaints, reimbursement, vulnerable customers, and repeated exposure tracked?",
            owner: "Outcome",
          },
          {
            date: "Board",
            action:
              "What changed in the board view of financial-crime risk, appetite, resourcing, and remediation?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Financial crime in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and AI.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "When financial crime becomes the weekly so-what",
            href: "/brief/",
            paragraphs: [
              "See how the strongest signal is carried into the consolidated weekly issue.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA financial-crime expectations",
            href: "https://www.fca.org.uk/firms/financial-crime",
            paragraphs: [
              "Standing source for risk assessment, controls, governance, and supervision.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "financial-crime / 2026-07-06",
    },
  },
  {
    route: "/signals/financial-crime/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "402c1d8475e2e4f725b61eaa538333ba77c42d818cdb638342fadbf6921e123f",
    metadata: {
      title: "Financial Crime Signals | The Virtual Officer",
      description:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      canonical: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphTitle: "Financial Crime Signals | The Virtual Officer",
      openGraphDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Financial Crime Signals | The Virtual Officer",
      twitterDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Financial Crime Signals",
        description:
          "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
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
          "@id": "https://stgeorgesstrategy.com/signals/financial-crime/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:402c1d8475e2e4f725b61eaa538333ba77c42d818cdb638342fadbf6921e123f:/signals/financial-crime/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "402c1d8475e2e4f725b61eaa538333ba77c42d818cdb638342fadbf6921e123f",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Financial crime",
        title: "Fraud, scams, sanctions, and control evidence",
        dek: "The financial-crime topic page turns public-source fraud, AML, sanctions, cryptoasset, and scam signals into ownership, prevention, detection, and escalation questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 financial-crime signals",
        paragraphs: [
          "These items anchor the weekly read across fraud, AML, sanctions, cryptoasset controls, and customer harm.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
              content:
                "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / HM Treasury and OFSI / 2026-06-17",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
              content:
                "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-05-28",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fatf-gafi.org/en/publications.html",
              content:
                "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Global standard setter / FATF publications",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.psr.org.uk/our-work/app-scams/",
              content: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official source / Payment Systems Regulator APP scams",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
              content:
                "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official expectations / FCA cryptoasset AML regime",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more financial-crime signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind scam response, sanctions, cryptoasset monitoring, AML governance, and evidence quality.",
        },
        items: [
          {
            rank: "06",
            title:
              "Financial-crime governance should be traceable from risk assessment to control testing",
            href: "https://handbook.fca.org.uk/handbook/FCG/1/",
            meta: "Official guidance / FCA financial crime guide",
          },
          {
            rank: "07",
            title: "MLRO reporting needs evidence of judgement, escalation, and board visibility",
            href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing",
            meta: "Official expectations / FCA systems and controls",
          },
          {
            rank: "08",
            title:
              "JMLSG guidance remains the practical bridge from AML rules to operating controls",
            href: "https://www.jmlsg.org.uk/guidance/current-guidance/",
            meta: "Industry guidance / JMLSG",
          },
          {
            rank: "09",
            title: "Money-laundering typologies should refresh transaction monitoring scenarios",
            href: "https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/money-laundering-and-illicit-finance",
            meta: "Threat context / National Crime Agency",
          },
          {
            rank: "10",
            title:
              "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
            href: "https://www.cifas.org.uk/insight/fraud-risk-focus-blog",
            meta: "Industry data / UK Finance annual fraud report",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Financial crime matters when external threat, customer harm, regulatory expectation, and internal control evidence meet in the same operating question.",
        },
        cards: [
          {
            meta: "So what",
            title: "Financial crime is a customer and control story",
            paragraphs: [
              "The best signal is not only loss. It is whether the firm can show prevention, detection, escalation, redress, and learning before harm repeats.",
            ],
          },
          {
            meta: "Who cares",
            title: "MLRO, fraud, sanctions, payments, product, conduct, and board owners",
            paragraphs: [
              "The same signal can sit across AML, sanctions, scam reimbursement, cryptoasset exposure, and Consumer Duty.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Risk assessment, typologies, alerts, decisions, and outcomes",
            paragraphs: [
              "Controls need to evidence why a scenario exists, when it fired, how it was dispositioned, and what customer or regulatory action followed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives financial-crime owners practical prompts that can move straight into a review, committee pack, or assurance request.",
        },
        deadlines: [
          {
            date: "Risk",
            action:
              "Which typologies, channels, products, geographies, and customer segments changed this week?",
            owner: "Assess",
          },
          {
            date: "Controls",
            action:
              "Which prevention, screening, monitoring, and escalation controls map to those typologies?",
            owner: "Map",
          },
          {
            date: "Alerts",
            action:
              "Can the firm explain alert quality, suppression, overrides, backlogs, and false-positive trends?",
            owner: "Monitor",
          },
          {
            date: "Harm",
            action:
              "How are scam losses, complaints, reimbursement, vulnerable customers, and repeated exposure tracked?",
            owner: "Outcome",
          },
          {
            date: "Board",
            action:
              "What changed in the board view of financial-crime risk, appetite, resourcing, and remediation?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Financial crime in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and AI.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "When financial crime becomes the weekly so-what",
            href: "/brief/",
            paragraphs: [
              "See how the strongest signal is carried into the consolidated weekly issue.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA financial-crime expectations",
            href: "https://www.fca.org.uk/firms/financial-crime",
            paragraphs: [
              "Standing source for risk assessment, controls, governance, and supervision.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "financial-crime / 2026-07-06",
      currentLabel: "financial-crime / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-54dd76756a3862a1d9183dcc:2026-07-06",
          signalId: "signal:archive-url-54dd76756a3862a1d9183dcc",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          implication:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          rank: 1,
          semanticHash: "391561aad347b6ab820c28eb6851d5882d5ed0cd9c1ab812f7e4fdbe2ec25dd1",
          sourceIds: ["source:archive-url-54dd76756a3862a1d9183dcc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-06679ba76f28a9f55625d0f8:2026-07-06",
          signalId: "signal:archive-url-06679ba76f28a9f55625d0f8",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          implication:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          rank: 2,
          semanticHash: "9be8e31cfa19cc6c60c9a4778e229af5915150c72acedbbeac216f8eb0ed8757",
          sourceIds: ["source:archive-url-06679ba76f28a9f55625d0f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ab358c5d2aa0b93d865f1a3e:2026-07-06",
          signalId: "signal:archive-url-ab358c5d2aa0b93d865f1a3e",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title: "FCA financial-crime expectations",
          implication: "FCA financial-crime expectations",
          rank: 3,
          semanticHash: "3d4cf7888db29e868eebed88bbfe26e4b527d9de3aad5bd0bf431d37c7a16853",
          sourceIds: ["source:archive-url-ab358c5d2aa0b93d865f1a3e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ce36aa183f661840b717ce0:2026-07-06",
          signalId: "signal:archive-url-5ce36aa183f661840b717ce0",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          implication:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          rank: 4,
          semanticHash: "927dea9f3793ba2754de04f6d6bc8374626786aa352c7ac538392b9b3534674e",
          sourceIds: ["source:archive-url-5ce36aa183f661840b717ce0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-903f8d4f45e69a442ba06ece:2026-07-06",
          signalId: "signal:archive-url-903f8d4f45e69a442ba06ece",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          implication:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          rank: 5,
          semanticHash: "0e25183810a74103a48bbd595c9d36a549ccf5456b85f27e77b5a7e46da6767e",
          sourceIds: ["source:archive-url-903f8d4f45e69a442ba06ece"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4a0ea9c44f86a8289c57cbcf:2026-07-06",
          signalId: "signal:archive-url-4a0ea9c44f86a8289c57cbcf",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          implication:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          rank: 6,
          semanticHash: "1f181c42fef49333b6e9b9df9787251b8c176b2cf35fe3aacc87b8ba267f5a65",
          sourceIds: ["source:archive-url-4a0ea9c44f86a8289c57cbcf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-a2c14bcca7da1a5967f8bb07:2026-07-06",
          signalId: "signal:archive-url-a2c14bcca7da1a5967f8bb07",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          implication:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          rank: 7,
          semanticHash: "5d802ea603d57d0705c0adb81fabb290087d6d820ee5903ca28e085dd9b76aa8",
          sourceIds: ["source:archive-url-a2c14bcca7da1a5967f8bb07"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f848a09a25d869b1134ca57f:2026-07-06",
          signalId: "signal:archive-url-f848a09a25d869b1134ca57f",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          implication:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          rank: 8,
          semanticHash: "02709191435f6141575234eff5da298a6c4b1b8eed75c6e9057d2eaf6dad5aa1",
          sourceIds: ["source:archive-url-f848a09a25d869b1134ca57f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-49cc960918f7543d5f90f452:2026-07-06",
          signalId: "signal:archive-url-49cc960918f7543d5f90f452",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          implication:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          rank: 9,
          semanticHash: "9a49ee19ef42ba477b3892127943ccc126107f34ed4116c80213f2d64749f4c5",
          sourceIds: ["source:archive-url-49cc960918f7543d5f90f452"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1ac5a6311bcc297c90c9d1cd:2026-07-06",
          signalId: "signal:archive-url-1ac5a6311bcc297c90c9d1cd",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          implication:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          rank: 10,
          semanticHash: "00af1141554bc5aba96add2972b21f97a948a76d1c747d66aea84a9d23260473",
          sourceIds: ["source:archive-url-1ac5a6311bcc297c90c9d1cd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-af75ec6f2377e8b5bdbe0229:2026-07-06",
          signalId: "signal:archive-url-af75ec6f2377e8b5bdbe0229",
          editionId: "edition:authored-financial-crime:2026-07-06",
          title:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          implication:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          rank: 11,
          semanticHash: "8229666199e81aa1fb59e961d844679529243da56879a173d6bb051a06953e16",
          sourceIds: ["source:archive-url-af75ec6f2377e8b5bdbe0229"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-54dd76756a3862a1d9183dcc:2026-07-08",
          signalId: "signal:archive-url-54dd76756a3862a1d9183dcc",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          implication:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          rank: 1,
          semanticHash: "391561aad347b6ab820c28eb6851d5882d5ed0cd9c1ab812f7e4fdbe2ec25dd1",
          sourceIds: ["source:archive-url-54dd76756a3862a1d9183dcc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ad11862a98623caf3c6caad9:2026-07-08",
          signalId: "signal:archive-url-ad11862a98623caf3c6caad9",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          implication:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          rank: 2,
          semanticHash: "c0c90f7b29100b8f58d9716dec26bb46473c87658d88c50ded136fa85d44933b",
          sourceIds: ["source:archive-url-ad11862a98623caf3c6caad9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-072530ed3d7b3ac98f36518a:2026-07-08",
          signalId: "signal:archive-url-072530ed3d7b3ac98f36518a",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          implication:
            "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          rank: 3,
          semanticHash: "ad2d3f677aec76b1c39054e0d6560e5ab6174e4f227bcb89b63f24c5a3b3ffe1",
          sourceIds: ["source:archive-url-072530ed3d7b3ac98f36518a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ab358c5d2aa0b93d865f1a3e:2026-07-08",
          signalId: "signal:archive-url-ab358c5d2aa0b93d865f1a3e",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "FCA financial-crime expectations",
          implication: "FCA financial-crime expectations",
          rank: 4,
          semanticHash: "3d4cf7888db29e868eebed88bbfe26e4b527d9de3aad5bd0bf431d37c7a16853",
          sourceIds: ["source:archive-url-ab358c5d2aa0b93d865f1a3e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6f551e284a32ccf7f2fc9790:2026-07-08",
          signalId: "signal:archive-url-6f551e284a32ccf7f2fc9790",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          implication:
            "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          rank: 5,
          semanticHash: "14bf98641cf7c684d3d7271441a7a414890ca448b1649bdb25af8cc11446215a",
          sourceIds: ["source:archive-url-6f551e284a32ccf7f2fc9790"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ce36aa183f661840b717ce0:2026-07-08",
          signalId: "signal:archive-url-5ce36aa183f661840b717ce0",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          implication:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          rank: 6,
          semanticHash: "927dea9f3793ba2754de04f6d6bc8374626786aa352c7ac538392b9b3534674e",
          sourceIds: ["source:archive-url-5ce36aa183f661840b717ce0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4a0ea9c44f86a8289c57cbcf:2026-07-08",
          signalId: "signal:archive-url-4a0ea9c44f86a8289c57cbcf",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          implication:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          rank: 7,
          semanticHash: "1f181c42fef49333b6e9b9df9787251b8c176b2cf35fe3aacc87b8ba267f5a65",
          sourceIds: ["source:archive-url-4a0ea9c44f86a8289c57cbcf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f848a09a25d869b1134ca57f:2026-07-08",
          signalId: "signal:archive-url-f848a09a25d869b1134ca57f",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          implication:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          rank: 8,
          semanticHash: "02709191435f6141575234eff5da298a6c4b1b8eed75c6e9057d2eaf6dad5aa1",
          sourceIds: ["source:archive-url-f848a09a25d869b1134ca57f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c136fd25d4f04919b9fa6062:2026-07-08",
          signalId: "signal:archive-url-c136fd25d4f04919b9fa6062",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          implication:
            "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          rank: 9,
          semanticHash: "8c81268380e6ede8a4c548f74f2bf4d88d1a76b745b84923df5efecae2d2a9c3",
          sourceIds: ["source:archive-url-c136fd25d4f04919b9fa6062"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-a23fc1a3b96f9c4fc1cb7045:2026-07-08",
          signalId: "signal:archive-url-a23fc1a3b96f9c4fc1cb7045",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "Money-laundering typologies should refresh transaction monitoring scenarios",
          implication:
            "Money-laundering typologies should refresh transaction monitoring scenarios",
          rank: 10,
          semanticHash: "9554349575db9111f58aa0cdf779d4f3c5dd6f8795af2a44c0b614eec085a842",
          sourceIds: ["source:archive-url-a23fc1a3b96f9c4fc1cb7045"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9f709f689ff3687e12ead847:2026-07-08",
          signalId: "signal:archive-url-9f709f689ff3687e12ead847",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          implication: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          rank: 11,
          semanticHash: "c59819e7f1a4d7f3cd83431480c675ac98e1968824132a061eeea11f5fa9e6bb",
          sourceIds: ["source:archive-url-9f709f689ff3687e12ead847"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-54dd76756a3862a1d9183dcc",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          publisher: "handbook.fca.org.uk",
          url: "https://handbook.fca.org.uk/handbook/FCG/1/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-06679ba76f28a9f55625d0f8",
          title:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          publisher: "cifas.org.uk",
          url: "https://www.cifas.org.uk/newsroom/fraudscape2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ab358c5d2aa0b93d865f1a3e",
          title: "FCA financial-crime expectations",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ce36aa183f661840b717ce0",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-903f8d4f45e69a442ba06ece",
          title:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4a0ea9c44f86a8289c57cbcf",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-a2c14bcca7da1a5967f8bb07",
          title:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/firms-customer-due-diligence-processes-and-controls-our-findings",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f848a09a25d869b1134ca57f",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          publisher: "gov.uk",
          url: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-49cc960918f7543d5f90f452",
          title:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          publisher: "jmlsg.org.uk",
          url: "https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1ac5a6311bcc297c90c9d1cd",
          title:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          publisher: "nationalcrimeagency.gov.uk",
          url: "https://www.nationalcrimeagency.gov.uk/news/fraudsters-targeting-cryptocurrency-stopped-and-12-million-frozen-in-nca-led-operation-atlantic",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-af75ec6f2377e8b5bdbe0229",
          title:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          publisher: "psr.org.uk",
          url: "https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ad11862a98623caf3c6caad9",
          title:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          publisher: "cifas.org.uk",
          url: "https://www.cifas.org.uk/insight/fraud-risk-focus-blog",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-072530ed3d7b3ac98f36518a",
          title: "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          publisher: "fatf-gafi.org",
          url: "https://www.fatf-gafi.org/en/publications.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6f551e284a32ccf7f2fc9790",
          title: "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-c136fd25d4f04919b9fa6062",
          title: "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          publisher: "jmlsg.org.uk",
          url: "https://www.jmlsg.org.uk/guidance/current-guidance/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-a23fc1a3b96f9c4fc1cb7045",
          title: "Money-laundering typologies should refresh transaction monitoring scenarios",
          publisher: "nationalcrimeagency.gov.uk",
          url: "https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/money-laundering-and-illicit-finance",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9f709f689ff3687e12ead847",
          title: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          publisher: "psr.org.uk",
          url: "https://www.psr.org.uk/our-work/app-scams/",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/financial-crime/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "816f3e8d4c3ad725080699f3ac1b7e14205bcc9198b242709e54eefb3d29dbb6",
    metadata: {
      title: "Financial Crime Signals | The Virtual Officer",
      description:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      canonical: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphTitle: "Financial Crime Signals | The Virtual Officer",
      openGraphDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/financial-crime/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Financial Crime Signals | The Virtual Officer",
      twitterDescription:
        "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Financial Crime Signals",
        description:
          "Financial crime signals covering fraud, scams, AML, sanctions, cryptoasset controls, mule activity, and evidence expectations.",
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
          "@id": "https://stgeorgesstrategy.com/signals/financial-crime/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:816f3e8d4c3ad725080699f3ac1b7e14205bcc9198b242709e54eefb3d29dbb6:/signals/financial-crime/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/financial-crime/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "816f3e8d4c3ad725080699f3ac1b7e14205bcc9198b242709e54eefb3d29dbb6",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Financial crime",
        title: "Fraud, scams, sanctions, and control evidence",
        dek: "The financial-crime topic page turns public-source fraud, AML, sanctions, cryptoasset, and scam signals into ownership, prevention, detection, and escalation questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 financial-crime signals",
        paragraphs: [
          "These items anchor the weekly read across fraud, AML, sanctions, cryptoasset controls, and customer harm.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
              content:
                "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / HM Treasury and OFSI / 2026-06-17",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
              content:
                "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-05-28",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/",
              content:
                "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Payment Systems Regulator / 2026-07-01",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.nationalcrimeagency.gov.uk/news/fraudsters-targeting-cryptocurrency-stopped-and-12-million-frozen-in-nca-led-operation-atlantic",
              content:
                "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Enforcement / National Crime Agency / 2026-04-09",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
              content:
                "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-06-30",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more financial-crime signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the source trail behind scam response, sanctions, cryptoasset monitoring, AML governance, and evidence quality.",
        },
        items: [
          {
            rank: "06",
            title:
              "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
            href: "https://www.cifas.org.uk/newsroom/fraudscape2026",
            meta: "Industry data / Cifas Fraudscape 2026 / 2026-03-12",
          },
          {
            rank: "07",
            title:
              "Financial-crime governance should be traceable from risk assessment to control testing",
            href: "https://handbook.fca.org.uk/handbook/FCG/1/",
            meta: "Official guidance / FCA financial crime guide",
          },
          {
            rank: "08",
            title:
              "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/firms-customer-due-diligence-processes-and-controls-our-findings",
            meta: "Primary / FCA / 2026-04-08",
          },
          {
            rank: "09",
            title:
              "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
            href: "https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/",
            meta: "Industry guidance / JMLSG / 2026-06-01",
          },
          {
            rank: "10",
            title:
              "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
            href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
            meta: "Official expectations / FCA cryptoasset AML regime",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Financial crime matters when external threat, customer harm, regulatory expectation, and the evidence that controls actually worked meet in the same operating question.",
        },
        cards: [
          {
            meta: "So what",
            title: "Financial crime is a customer and control story",
            paragraphs: [
              "The best signal is not only loss. It is whether the firm can show prevention, detection, escalation, redress, and learning before harm repeats.",
            ],
          },
          {
            meta: "Who cares",
            title: "MLRO, fraud, sanctions, payments, product, conduct, and board owners",
            paragraphs: [
              "The same signal can sit across AML, sanctions, scam reimbursement, cryptoasset exposure, and Consumer Duty.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Risk assessment, typologies, alerts, decisions, and outcomes",
            paragraphs: [
              "Controls need to evidence why a scenario exists, when it fired, how it was dispositioned, and what customer or regulatory action followed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Financial crime evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives financial-crime owners practical prompts that can move straight into a review, committee pack, or assurance request.",
        },
        deadlines: [
          {
            date: "Risk",
            action:
              "Which typologies, channels, products, geographies, and customer segments changed this week?",
            owner: "Assess",
          },
          {
            date: "Controls",
            action:
              "Which prevention, screening, monitoring, and escalation controls map to those typologies?",
            owner: "Map",
          },
          {
            date: "Alerts",
            action:
              "Can the firm explain alert quality, suppression, overrides, backlogs, and false-positive trends?",
            owner: "Monitor",
          },
          {
            date: "Harm",
            action:
              "How are scam losses, complaints, reimbursement, vulnerable customers, and repeated exposure tracked?",
            owner: "Outcome",
          },
          {
            date: "Board",
            action:
              "What changed in the board view of financial-crime risk, appetite, resourcing, and remediation?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Financial crime in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and AI.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "When financial crime becomes the weekly so-what",
            href: "/brief/",
            paragraphs: [
              "See how the strongest signal is carried into the consolidated weekly issue.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA financial-crime expectations",
            href: "https://www.fca.org.uk/firms/financial-crime",
            paragraphs: [
              "Standing source for risk assessment, controls, governance, and supervision.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "financial-crime / 2026-07-08",
      currentLabel: "financial-crime / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-54dd76756a3862a1d9183dcc:2026-07-08",
          signalId: "signal:archive-url-54dd76756a3862a1d9183dcc",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          implication:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          rank: 1,
          semanticHash: "391561aad347b6ab820c28eb6851d5882d5ed0cd9c1ab812f7e4fdbe2ec25dd1",
          sourceIds: ["source:archive-url-54dd76756a3862a1d9183dcc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ad11862a98623caf3c6caad9:2026-07-08",
          signalId: "signal:archive-url-ad11862a98623caf3c6caad9",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          implication:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          rank: 2,
          semanticHash: "c0c90f7b29100b8f58d9716dec26bb46473c87658d88c50ded136fa85d44933b",
          sourceIds: ["source:archive-url-ad11862a98623caf3c6caad9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-072530ed3d7b3ac98f36518a:2026-07-08",
          signalId: "signal:archive-url-072530ed3d7b3ac98f36518a",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          implication:
            "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          rank: 3,
          semanticHash: "ad2d3f677aec76b1c39054e0d6560e5ab6174e4f227bcb89b63f24c5a3b3ffe1",
          sourceIds: ["source:archive-url-072530ed3d7b3ac98f36518a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ab358c5d2aa0b93d865f1a3e:2026-07-08",
          signalId: "signal:archive-url-ab358c5d2aa0b93d865f1a3e",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "FCA financial-crime expectations",
          implication: "FCA financial-crime expectations",
          rank: 4,
          semanticHash: "3d4cf7888db29e868eebed88bbfe26e4b527d9de3aad5bd0bf431d37c7a16853",
          sourceIds: ["source:archive-url-ab358c5d2aa0b93d865f1a3e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6f551e284a32ccf7f2fc9790:2026-07-08",
          signalId: "signal:archive-url-6f551e284a32ccf7f2fc9790",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          implication:
            "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          rank: 5,
          semanticHash: "14bf98641cf7c684d3d7271441a7a414890ca448b1649bdb25af8cc11446215a",
          sourceIds: ["source:archive-url-6f551e284a32ccf7f2fc9790"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ce36aa183f661840b717ce0:2026-07-08",
          signalId: "signal:archive-url-5ce36aa183f661840b717ce0",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          implication:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          rank: 6,
          semanticHash: "927dea9f3793ba2754de04f6d6bc8374626786aa352c7ac538392b9b3534674e",
          sourceIds: ["source:archive-url-5ce36aa183f661840b717ce0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4a0ea9c44f86a8289c57cbcf:2026-07-08",
          signalId: "signal:archive-url-4a0ea9c44f86a8289c57cbcf",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          implication:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          rank: 7,
          semanticHash: "1f181c42fef49333b6e9b9df9787251b8c176b2cf35fe3aacc87b8ba267f5a65",
          sourceIds: ["source:archive-url-4a0ea9c44f86a8289c57cbcf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f848a09a25d869b1134ca57f:2026-07-08",
          signalId: "signal:archive-url-f848a09a25d869b1134ca57f",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          implication:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          rank: 8,
          semanticHash: "02709191435f6141575234eff5da298a6c4b1b8eed75c6e9057d2eaf6dad5aa1",
          sourceIds: ["source:archive-url-f848a09a25d869b1134ca57f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c136fd25d4f04919b9fa6062:2026-07-08",
          signalId: "signal:archive-url-c136fd25d4f04919b9fa6062",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          implication:
            "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          rank: 9,
          semanticHash: "8c81268380e6ede8a4c548f74f2bf4d88d1a76b745b84923df5efecae2d2a9c3",
          sourceIds: ["source:archive-url-c136fd25d4f04919b9fa6062"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-a23fc1a3b96f9c4fc1cb7045:2026-07-08",
          signalId: "signal:archive-url-a23fc1a3b96f9c4fc1cb7045",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "Money-laundering typologies should refresh transaction monitoring scenarios",
          implication:
            "Money-laundering typologies should refresh transaction monitoring scenarios",
          rank: 10,
          semanticHash: "9554349575db9111f58aa0cdf779d4f3c5dd6f8795af2a44c0b614eec085a842",
          sourceIds: ["source:archive-url-a23fc1a3b96f9c4fc1cb7045"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9f709f689ff3687e12ead847:2026-07-08",
          signalId: "signal:archive-url-9f709f689ff3687e12ead847",
          editionId: "edition:authored-financial-crime:2026-07-08",
          title: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          implication: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          rank: 11,
          semanticHash: "c59819e7f1a4d7f3cd83431480c675ac98e1968824132a061eeea11f5fa9e6bb",
          sourceIds: ["source:archive-url-9f709f689ff3687e12ead847"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-54dd76756a3862a1d9183dcc:2026-07-09",
          signalId: "signal:archive-url-54dd76756a3862a1d9183dcc",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          implication:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          rank: 1,
          semanticHash: "391561aad347b6ab820c28eb6851d5882d5ed0cd9c1ab812f7e4fdbe2ec25dd1",
          sourceIds: ["source:archive-url-54dd76756a3862a1d9183dcc"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-06679ba76f28a9f55625d0f8:2026-07-09",
          signalId: "signal:archive-url-06679ba76f28a9f55625d0f8",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          implication:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          rank: 2,
          semanticHash: "9be8e31cfa19cc6c60c9a4778e229af5915150c72acedbbeac216f8eb0ed8757",
          sourceIds: ["source:archive-url-06679ba76f28a9f55625d0f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-ab358c5d2aa0b93d865f1a3e:2026-07-09",
          signalId: "signal:archive-url-ab358c5d2aa0b93d865f1a3e",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title: "FCA financial-crime expectations",
          implication: "FCA financial-crime expectations",
          rank: 3,
          semanticHash: "3d4cf7888db29e868eebed88bbfe26e4b527d9de3aad5bd0bf431d37c7a16853",
          sourceIds: ["source:archive-url-ab358c5d2aa0b93d865f1a3e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ce36aa183f661840b717ce0:2026-07-09",
          signalId: "signal:archive-url-5ce36aa183f661840b717ce0",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          implication:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          rank: 4,
          semanticHash: "927dea9f3793ba2754de04f6d6bc8374626786aa352c7ac538392b9b3534674e",
          sourceIds: ["source:archive-url-5ce36aa183f661840b717ce0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-903f8d4f45e69a442ba06ece:2026-07-09",
          signalId: "signal:archive-url-903f8d4f45e69a442ba06ece",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          implication:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          rank: 5,
          semanticHash: "0e25183810a74103a48bbd595c9d36a549ccf5456b85f27e77b5a7e46da6767e",
          sourceIds: ["source:archive-url-903f8d4f45e69a442ba06ece"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4a0ea9c44f86a8289c57cbcf:2026-07-09",
          signalId: "signal:archive-url-4a0ea9c44f86a8289c57cbcf",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          implication:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          rank: 6,
          semanticHash: "1f181c42fef49333b6e9b9df9787251b8c176b2cf35fe3aacc87b8ba267f5a65",
          sourceIds: ["source:archive-url-4a0ea9c44f86a8289c57cbcf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-a2c14bcca7da1a5967f8bb07:2026-07-09",
          signalId: "signal:archive-url-a2c14bcca7da1a5967f8bb07",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          implication:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          rank: 7,
          semanticHash: "5d802ea603d57d0705c0adb81fabb290087d6d820ee5903ca28e085dd9b76aa8",
          sourceIds: ["source:archive-url-a2c14bcca7da1a5967f8bb07"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-f848a09a25d869b1134ca57f:2026-07-09",
          signalId: "signal:archive-url-f848a09a25d869b1134ca57f",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          implication:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          rank: 8,
          semanticHash: "02709191435f6141575234eff5da298a6c4b1b8eed75c6e9057d2eaf6dad5aa1",
          sourceIds: ["source:archive-url-f848a09a25d869b1134ca57f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-49cc960918f7543d5f90f452:2026-07-09",
          signalId: "signal:archive-url-49cc960918f7543d5f90f452",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          implication:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          rank: 9,
          semanticHash: "9a49ee19ef42ba477b3892127943ccc126107f34ed4116c80213f2d64749f4c5",
          sourceIds: ["source:archive-url-49cc960918f7543d5f90f452"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1ac5a6311bcc297c90c9d1cd:2026-07-09",
          signalId: "signal:archive-url-1ac5a6311bcc297c90c9d1cd",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          implication:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          rank: 10,
          semanticHash: "00af1141554bc5aba96add2972b21f97a948a76d1c747d66aea84a9d23260473",
          sourceIds: ["source:archive-url-1ac5a6311bcc297c90c9d1cd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-af75ec6f2377e8b5bdbe0229:2026-07-09",
          signalId: "signal:archive-url-af75ec6f2377e8b5bdbe0229",
          editionId: "edition:authored-financial-crime:2026-07-09",
          title:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          implication:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          rank: 11,
          semanticHash: "8229666199e81aa1fb59e961d844679529243da56879a173d6bb051a06953e16",
          sourceIds: ["source:archive-url-af75ec6f2377e8b5bdbe0229"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-54dd76756a3862a1d9183dcc",
          title:
            "Financial-crime governance should be traceable from risk assessment to control testing",
          publisher: "handbook.fca.org.uk",
          url: "https://handbook.fca.org.uk/handbook/FCG/1/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ad11862a98623caf3c6caad9",
          title:
            "Fraud loss patterns should inform authentication, mule, and reimbursement controls",
          publisher: "cifas.org.uk",
          url: "https://www.cifas.org.uk/insight/fraud-risk-focus-blog",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-072530ed3d7b3ac98f36518a",
          title: "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live",
          publisher: "fatf-gafi.org",
          url: "https://www.fatf-gafi.org/en/publications.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-ab358c5d2aa0b93d865f1a3e",
          title: "FCA financial-crime expectations",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6f551e284a32ccf7f2fc9790",
          title: "MLRO reporting needs evidence of judgement, escalation, and board visibility",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ce36aa183f661840b717ce0",
          title:
            "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4a0ea9c44f86a8289c57cbcf",
          title:
            "FCA finds firms have improved sanctions controls but gaps remain in screening and frozen-asset management",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/firms-have-improved-must-do-more-prevent-sanctions-breaches",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-f848a09a25d869b1134ca57f",
          title:
            "OFSI issues its largest sanctions penalty since Russia's 2022 invasion, and its first for circumvention",
          publisher: "gov.uk",
          url: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-c136fd25d4f04919b9fa6062",
          title: "JMLSG guidance remains the practical bridge from AML rules to operating controls",
          publisher: "jmlsg.org.uk",
          url: "https://www.jmlsg.org.uk/guidance/current-guidance/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-a23fc1a3b96f9c4fc1cb7045",
          title: "Money-laundering typologies should refresh transaction monitoring scenarios",
          publisher: "nationalcrimeagency.gov.uk",
          url: "https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/money-laundering-and-illicit-finance",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9f709f689ff3687e12ead847",
          title: "APP fraud reimbursement keeps scam prevention tied to customer outcomes",
          publisher: "psr.org.uk",
          url: "https://www.psr.org.uk/our-work/app-scams/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-06679ba76f28a9f55625d0f8",
          title:
            "Fraudscape 2026: fraud cases hit record highs as identity fraud and AI-enabled account takeover scale up",
          publisher: "cifas.org.uk",
          url: "https://www.cifas.org.uk/newsroom/fraudscape2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-903f8d4f45e69a442ba06ece",
          title:
            "FCA finalises landmark cryptoasset regime rules, extending market-integrity and financial-crime expectations to crypto firms",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-a2c14bcca7da1a5967f8bb07",
          title:
            "FCA review finds firms still lack independent testing and version control in customer due diligence controls",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/firms-customer-due-diligence-processes-and-controls-our-findings",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-49cc960918f7543d5f90f452",
          title:
            "JMLSG consults on Part I amendments covering MLRO cross-border oversight and bank-insolvency exceptions",
          publisher: "jmlsg.org.uk",
          url: "https://www.jmlsg.org.uk/latest-news/jmlsg-consultation-part-i-2/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1ac5a6311bcc297c90c9d1cd",
          title:
            "Operation Atlantic freezes $12m and identifies 20,000 victims of cryptocurrency approval-phishing fraud",
          publisher: "nationalcrimeagency.gov.uk",
          url: "https://www.nationalcrimeagency.gov.uk/news/fraudsters-targeting-cryptocurrency-stopped-and-12-million-frozen-in-nca-led-operation-atlantic",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-af75ec6f2377e8b5bdbe0229",
          title:
            "Payment fraud falls by £73m as independent review confirms APP reimbursement policy is working",
          publisher: "psr.org.uk",
          url: "https://www.psr.org.uk/news-and-updates/latest-news/news/payment-fraud-falls-by-73m-following-psr-reimbursement-scheme/",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/market-structure/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9",
    metadata: {
      title: "Market Structure Signals | The Virtual Officer",
      description:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      canonical: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphTitle: "Market Structure Signals | The Virtual Officer",
      openGraphDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Market Structure Signals | The Virtual Officer",
      twitterDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Market Structure Signals",
        description:
          "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
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
          "@id": "https://stgeorgesstrategy.com/signals/market-structure/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:b32668fedc17443be8aaf814dbe2a695984b5d8a5182beff0a3df1a07348dccd:/signals/market-structure/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "b32668fedc17443be8aaf814dbe2a695984b5d8a5182beff0a3df1a07348dccd",
      },
      {
        key: "live:5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9:/signals/market-structure/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Market structure",
        title: "Capital, liquidity, infrastructure, and concentration risk",
        dek: "The exploded market-structure page behind the weekly brief. It connects AI infrastructure, crypto rules, private credit, liquidity, and market plumbing to financial-services control questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 market-structure signals",
        paragraphs: [
          "These are anchored in this week's dashboard sources: AI capex, crypto perimeter change, central-bank timing, and market-plumbing deadlines.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
              content: "AI infrastructure capex needs a downside financing scenario",
            },
            {
              kind: "label",
              role: "top-source",
              content: "AI capital / Wall Street Journal and BIS / 2026-06-29",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
              content: "Crypto rules are moving from perimeter debate to operating model",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Crypto / Guardian / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-proposes-key-reforms-settlement-discipline-supporting-transition-t1",
              content:
                "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2025-10-13",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more market-structure signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link market, infrastructure, regulatory, and balance-sheet signals to their source trail and control implication.",
        },
        items: [
          {
            rank: "06",
            title:
              "Autonomous trading agents put circuit breakers into the market-stability debate",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
            href: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
            meta: "Primary / ECB forum / 2026-06-29 to 2026-07-01",
          },
          {
            rank: "08",
            title:
              "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
            href: "https://www.esma.europa.eu/press-news/esma-news/esmas-annual-data-report-shows-increased-quality-wider-use-and-digital",
            meta: "Primary / ESMA / 2026-05-29",
          },
          {
            rank: "09",
            title:
              "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            meta: "Primary / EUR-Lex ESG ratings / applies 2026-07-02",
          },
          {
            rank: "10",
            title:
              "PRA funded reinsurance consultation raises collateral and counterparty questions",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            meta: "Primary / PRA consultation / closes 2026-07-31",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Market-structure signals matter when they move beyond market colour and start changing firm exposure, client outcomes, capital assumptions, or supervisory expectations.",
        },
        cards: [
          {
            meta: "So what",
            title: "Innovation stories can become concentration stories",
            paragraphs: [
              "AI infrastructure and crypto regulation are not only technology themes. They can become credit, liquidity, conduct, custody, market-integrity, and capital-planning issues.",
            ],
          },
          {
            meta: "Who cares",
            title: "Treasury, markets, credit, asset management, wealth, product, and risk",
            paragraphs: [
              "The same signal can sit in balance-sheet exposure, client portfolios, counterparty channels, vendor finance, and regulatory perimeter planning.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure maps, stress assumptions, controls, and client-impact reviews",
            paragraphs: [
              "The weekly brief should push readers toward a cross-book view of exposure and a practical test of downside scenarios.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Market-structure evidence checklist",
          title: "What the reader should ask for",
          description:
            "Market-structure pages should translate macro and market signals into evidence that a firm can actually produce.",
        },
        deadlines: [
          {
            date: "Exposure",
            action:
              "Where does this theme sit across public equities, lending, private credit, funds, client portfolios, suppliers, and counterparties?",
            owner: "Map",
          },
          {
            date: "Scenario",
            action:
              "What downside scenario has been tested for valuation reversal, liquidity stress, funding pullback, or regulatory constraint?",
            owner: "Stress",
          },
          {
            date: "Perimeter",
            action:
              "Which products, entities, or relationships may move closer to regulated operating standards?",
            owner: "Legal",
          },
          {
            date: "Controls",
            action:
              "Are custody, surveillance, disclosure, suitability, settlement, and wind-down controls aligned to the changing market structure?",
            owner: "Control",
          },
          {
            date: "Governance",
            action:
              "Does one committee have visibility across the exposure, or is the signal split across business lines?",
            owner: "Board",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Market-structure archives should preserve how a theme moved from weak signal to exposure map to control action.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: ["Included in the weekly executive pulse."],
          },
          {
            meta: "Source trail",
            title: "Central banks, supervisors, market data, and credible reporting",
            href: "/regulatory-horizon/",
            paragraphs: [
              "The horizon page now preserves the official deadlines behind the market-plumbing items.",
            ],
          },
          {
            meta: "Current edition",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: [
              "Included in the weekly executive pulse with source links and follow-up prompts.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/market-structure/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9",
    metadata: {
      title: "Market Structure Signals | The Virtual Officer",
      description:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      canonical: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphTitle: "Market Structure Signals | The Virtual Officer",
      openGraphDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Market Structure Signals | The Virtual Officer",
      twitterDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Market Structure Signals",
        description:
          "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
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
          "@id": "https://stgeorgesstrategy.com/signals/market-structure/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9:/signals/market-structure/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "5b5c6eebc6b8598b0f7fa64a7d177def3bfa37e2394974e09f4fa78013b5b5e9",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Market structure",
        title: "Capital, liquidity, infrastructure, and concentration risk",
        dek: "The exploded market-structure page behind the weekly brief. It connects AI infrastructure, crypto rules, private credit, liquidity, and market plumbing to financial-services control questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 market-structure signals",
        paragraphs: [
          "These are anchored in this week's dashboard sources: AI capex, crypto perimeter change, central-bank timing, and market-plumbing deadlines.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
              content: "AI infrastructure capex needs a downside financing scenario",
            },
            {
              kind: "label",
              role: "top-source",
              content: "AI capital / Wall Street Journal and BIS / 2026-06-29",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
              content: "Crypto rules are moving from perimeter debate to operating model",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Crypto / Guardian / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-proposes-key-reforms-settlement-discipline-supporting-transition-t1",
              content:
                "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2025-10-13",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more market-structure signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link market, infrastructure, regulatory, and balance-sheet signals to their source trail and control implication.",
        },
        items: [
          {
            rank: "06",
            title:
              "Autonomous trading agents put circuit breakers into the market-stability debate",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
            href: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
            meta: "Primary / ECB forum / 2026-06-29 to 2026-07-01",
          },
          {
            rank: "08",
            title:
              "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
            href: "https://www.esma.europa.eu/press-news/esma-news/esmas-annual-data-report-shows-increased-quality-wider-use-and-digital",
            meta: "Primary / ESMA / 2026-05-29",
          },
          {
            rank: "09",
            title:
              "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            meta: "Primary / EUR-Lex ESG ratings / applies 2026-07-02",
          },
          {
            rank: "10",
            title:
              "PRA funded reinsurance consultation raises collateral and counterparty questions",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            meta: "Primary / PRA consultation / closes 2026-07-31",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Market-structure signals matter when they move beyond market colour and start changing firm exposure, client outcomes, capital assumptions, or supervisory expectations.",
        },
        cards: [
          {
            meta: "So what",
            title: "Innovation stories can become concentration stories",
            paragraphs: [
              "AI infrastructure and crypto regulation are not only technology themes. They can become credit, liquidity, conduct, custody, market-integrity, and capital-planning issues.",
            ],
          },
          {
            meta: "Who cares",
            title: "Treasury, markets, credit, asset management, wealth, product, and risk",
            paragraphs: [
              "The same signal can sit in balance-sheet exposure, client portfolios, counterparty channels, vendor finance, and regulatory perimeter planning.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure maps, stress assumptions, controls, and client-impact reviews",
            paragraphs: [
              "The weekly brief should push readers toward a cross-book view of exposure and a practical test of downside scenarios.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Market-structure evidence checklist",
          title: "What the reader should ask for",
          description:
            "Market-structure pages should translate macro and market signals into evidence that a firm can actually produce.",
        },
        deadlines: [
          {
            date: "Exposure",
            action:
              "Where does this theme sit across public equities, lending, private credit, funds, client portfolios, suppliers, and counterparties?",
            owner: "Map",
          },
          {
            date: "Scenario",
            action:
              "What downside scenario has been tested for valuation reversal, liquidity stress, funding pullback, or regulatory constraint?",
            owner: "Stress",
          },
          {
            date: "Perimeter",
            action:
              "Which products, entities, or relationships may move closer to regulated operating standards?",
            owner: "Legal",
          },
          {
            date: "Controls",
            action:
              "Are custody, surveillance, disclosure, suitability, settlement, and wind-down controls aligned to the changing market structure?",
            owner: "Control",
          },
          {
            date: "Governance",
            action:
              "Does one committee have visibility across the exposure, or is the signal split across business lines?",
            owner: "Board",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Market-structure archives should preserve how a theme moved from weak signal to exposure map to control action.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: ["Included in the weekly executive pulse."],
          },
          {
            meta: "Source trail",
            title: "Central banks, supervisors, market data, and credible reporting",
            href: "/regulatory-horizon/",
            paragraphs: [
              "The horizon page now preserves the official deadlines behind the market-plumbing items.",
            ],
          },
          {
            meta: "Current edition",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: [
              "Included in the weekly executive pulse with source links and follow-up prompts.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "market-structure / 2026-07-06",
    },
  },
  {
    route: "/signals/market-structure/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "c9e5bf9e0777e4819a363df738b8a8498c43f1dc377850e1e06a402978d86555",
    metadata: {
      title: "Market Structure Signals | The Virtual Officer",
      description:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      canonical: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphTitle: "Market Structure Signals | The Virtual Officer",
      openGraphDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Market Structure Signals | The Virtual Officer",
      twitterDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Market Structure Signals",
        description:
          "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
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
          "@id": "https://stgeorgesstrategy.com/signals/market-structure/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:c9e5bf9e0777e4819a363df738b8a8498c43f1dc377850e1e06a402978d86555:/signals/market-structure/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "c9e5bf9e0777e4819a363df738b8a8498c43f1dc377850e1e06a402978d86555",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Market structure",
        title: "Capital, liquidity, infrastructure, and concentration risk",
        dek: "The exploded market-structure page behind the weekly brief. It connects AI infrastructure, crypto rules, private credit, liquidity, and market plumbing to financial-services control questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 market-structure signals",
        paragraphs: [
          "These are anchored in this week's dashboard sources: AI capex, crypto perimeter change, central-bank timing, and market-plumbing deadlines.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
              content: "AI infrastructure capex needs a downside financing scenario",
            },
            {
              kind: "label",
              role: "top-source",
              content: "AI capital / Wall Street Journal and BIS / 2026-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
              content: "Crypto rules are moving from perimeter debate to operating model",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Crypto / Guardian / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
              content: "CSDR settlement discipline needs operations and client-service readiness",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA CSDR / 2026-07-07",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more market-structure signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link market, infrastructure, regulatory, and balance-sheet signals to their source trail and control implication.",
        },
        items: [
          {
            rank: "06",
            title:
              "Autonomous trading agents put circuit breakers into the market-stability debate",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
            href: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
            meta: "Primary / ECB forum / 2026-06-29 to 2026-07-01",
          },
          {
            rank: "08",
            title: "CSDR settlement discipline needs operations and client-service readiness",
            href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
            meta: "Primary / ESMA CSDR / 2026-07-07",
          },
          {
            rank: "09",
            title:
              "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            meta: "Primary / EUR-Lex ESG ratings / applies 2026-07-02",
          },
          {
            rank: "10",
            title:
              "PRA funded reinsurance consultation raises collateral and counterparty questions",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            meta: "Primary / PRA consultation / closes 2026-07-31",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Market-structure signals matter when they move beyond market colour and start changing firm exposure, client outcomes, capital assumptions, or supervisory expectations.",
        },
        cards: [
          {
            meta: "So what",
            title: "Innovation stories can become concentration stories",
            paragraphs: [
              "AI infrastructure and crypto regulation are not only technology themes. They can become credit, liquidity, conduct, custody, market-integrity, and capital-planning issues.",
            ],
          },
          {
            meta: "Who cares",
            title: "Treasury, markets, credit, asset management, wealth, product, and risk",
            paragraphs: [
              "The same signal can sit in balance-sheet exposure, client portfolios, counterparty channels, vendor finance, and regulatory perimeter planning.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure maps, stress assumptions, controls, and client-impact reviews",
            paragraphs: [
              "The weekly brief should push readers toward a cross-book view of exposure and a practical test of downside scenarios.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "Market-structure pages should translate macro and market signals into evidence that a firm can actually produce.",
        },
        deadlines: [
          {
            date: "Exposure",
            action:
              "Where does this theme sit across public equities, lending, private credit, funds, client portfolios, suppliers, and counterparties?",
            owner: "Map",
          },
          {
            date: "Scenario",
            action:
              "What downside scenario has been tested for valuation reversal, liquidity stress, funding pullback, or regulatory constraint?",
            owner: "Stress",
          },
          {
            date: "Perimeter",
            action:
              "Which products, entities, or relationships may move closer to regulated operating standards?",
            owner: "Legal",
          },
          {
            date: "Controls",
            action:
              "Are custody, surveillance, disclosure, suitability, settlement, and wind-down controls aligned to the changing market structure?",
            owner: "Control",
          },
          {
            date: "Governance",
            action:
              "Does one committee have visibility across the exposure, or is the signal split across business lines?",
            owner: "Board",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Market-structure archives should preserve how a theme moved from weak signal to exposure map to control action.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: ["Included in the weekly executive pulse."],
          },
          {
            meta: "Source trail",
            title: "Central banks, supervisors, market data, and credible reporting",
            href: "/regulatory-horizon/",
            paragraphs: [
              "The horizon page now preserves the official deadlines behind the market-plumbing items.",
            ],
          },
          {
            meta: "Current edition",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: [
              "Included in the weekly executive pulse with source links and follow-up prompts.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "market-structure / 2026-07-06",
      currentLabel: "market-structure / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-3c6322d9591f8bb8e812f349:2026-07-06",
          signalId: "signal:archive-url-3c6322d9591f8bb8e812f349",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          implication:
            "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          rank: 1,
          semanticHash: "011c30c16c046c3bfd74ef233e2375baa4a5fa82b40479540312c3a6737ae44e",
          sourceIds: ["source:archive-url-3c6322d9591f8bb8e812f349"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-58a149e95ac8813cb76e1028:2026-07-06",
          signalId: "signal:archive-url-58a149e95ac8813cb76e1028",
          editionId: "edition:authored-market-structure:2026-07-06",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          implication:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          rank: 2,
          semanticHash: "719e197728f9d4a8542b96f78699352261521b7d948b756af30dab4211995290",
          sourceIds: ["source:archive-url-58a149e95ac8813cb76e1028"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-51bf843306b449f98b13048c:2026-07-06",
          signalId: "signal:archive-url-51bf843306b449f98b13048c",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          implication:
            "PRA funded reinsurance consultation raises collateral and counterparty questions",
          rank: 3,
          semanticHash: "3308e234af4187203647583cd4bb24e33446e75b4174e3a0453b25f66364d6bd",
          sourceIds: ["source:archive-url-51bf843306b449f98b13048c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19a9d1f151792688e1473924:2026-07-06",
          signalId: "signal:archive-url-19a9d1f151792688e1473924",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          implication: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          rank: 4,
          semanticHash: "6d81b4edae2f7f9faaf96e275aafa806d1e82dc19a6760cef6c3a2a275df01f0",
          sourceIds: ["source:archive-url-19a9d1f151792688e1473924"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6c89a9985330e8e3be5c9af6:2026-07-06",
          signalId: "signal:archive-url-6c89a9985330e8e3be5c9af6",
          editionId: "edition:authored-market-structure:2026-07-06",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          implication:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          rank: 5,
          semanticHash: "66c020a404bfd005b5b35be9550401c6c1ec9f79295a578519b55b9a434f0618",
          sourceIds: ["source:archive-url-6c89a9985330e8e3be5c9af6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ba905f9ec436e65a9a1c44f:2026-07-06",
          signalId: "signal:archive-url-7ba905f9ec436e65a9a1c44f",
          editionId: "edition:authored-market-structure:2026-07-06",
          title:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          implication:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          rank: 6,
          semanticHash: "47eb654d29ead44143d38e93a20a943e01dd59fbebeceae4e5553e1703896057",
          sourceIds: ["source:archive-url-7ba905f9ec436e65a9a1c44f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d2143a26dbe0026c69aa1730:2026-07-06",
          signalId: "signal:archive-url-d2143a26dbe0026c69aa1730",
          editionId: "edition:authored-market-structure:2026-07-06",
          title:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          implication:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          rank: 7,
          semanticHash: "89ca0721a6f4816f420d049dc42be1526881111909d159c318bbdf3ed486fca5",
          sourceIds: ["source:archive-url-d2143a26dbe0026c69aa1730"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-be715ca6e71ce4b409082480:2026-07-06",
          signalId: "signal:archive-url-be715ca6e71ce4b409082480",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          implication:
            "Autonomous trading agents put circuit breakers into the market-stability debate",
          rank: 8,
          semanticHash: "23e6165ddfcb4d7259bdc41ad896489d8ddc8a341c457d6cb5ad700144fbedd8",
          sourceIds: ["source:archive-url-be715ca6e71ce4b409082480"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5b18f2b35c0665fb44bab6f1:2026-07-06",
          signalId: "signal:archive-url-5b18f2b35c0665fb44bab6f1",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "Crypto rules are moving from perimeter debate to operating model",
          implication: "Crypto rules are moving from perimeter debate to operating model",
          rank: 9,
          semanticHash: "4ff91c5a43eab860dc4c4620d5fb44e8bd5d66cb915f8cbbbead5a2c346c5479",
          sourceIds: ["source:archive-url-5b18f2b35c0665fb44bab6f1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-539f3452dd8e778b96fc045f:2026-07-06",
          signalId: "signal:archive-url-539f3452dd8e778b96fc045f",
          editionId: "edition:authored-market-structure:2026-07-06",
          title: "AI infrastructure capex needs a downside financing scenario",
          implication: "AI infrastructure capex needs a downside financing scenario",
          rank: 10,
          semanticHash: "29818115f8a59fb54a3fd822fe268e8f58da7eb24a05725fb7841df0070f4ee6",
          sourceIds: ["source:archive-url-539f3452dd8e778b96fc045f"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-3c6322d9591f8bb8e812f349:2026-07-08",
          signalId: "signal:archive-url-3c6322d9591f8bb8e812f349",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          implication:
            "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          rank: 1,
          semanticHash: "011c30c16c046c3bfd74ef233e2375baa4a5fa82b40479540312c3a6737ae44e",
          sourceIds: ["source:archive-url-3c6322d9591f8bb8e812f349"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-58a149e95ac8813cb76e1028:2026-07-08",
          signalId: "signal:archive-url-58a149e95ac8813cb76e1028",
          editionId: "edition:authored-market-structure:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          implication:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          rank: 2,
          semanticHash: "719e197728f9d4a8542b96f78699352261521b7d948b756af30dab4211995290",
          sourceIds: ["source:archive-url-58a149e95ac8813cb76e1028"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-51bf843306b449f98b13048c:2026-07-08",
          signalId: "signal:archive-url-51bf843306b449f98b13048c",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          implication:
            "PRA funded reinsurance consultation raises collateral and counterparty questions",
          rank: 3,
          semanticHash: "3308e234af4187203647583cd4bb24e33446e75b4174e3a0453b25f66364d6bd",
          sourceIds: ["source:archive-url-51bf843306b449f98b13048c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19a9d1f151792688e1473924:2026-07-08",
          signalId: "signal:archive-url-19a9d1f151792688e1473924",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          implication: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          rank: 4,
          semanticHash: "6d81b4edae2f7f9faaf96e275aafa806d1e82dc19a6760cef6c3a2a275df01f0",
          sourceIds: ["source:archive-url-19a9d1f151792688e1473924"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e03f19c93b2153595c48505e:2026-07-08",
          signalId: "signal:archive-url-e03f19c93b2153595c48505e",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "CSDR settlement discipline needs operations and client-service readiness",
          implication: "CSDR settlement discipline needs operations and client-service readiness",
          rank: 5,
          semanticHash: "3f12b1ca6fc57bc583e39eadda7653be30b8f7e594480bf846d7fb02725c4604",
          sourceIds: ["source:archive-url-e03f19c93b2153595c48505e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6c89a9985330e8e3be5c9af6:2026-07-08",
          signalId: "signal:archive-url-6c89a9985330e8e3be5c9af6",
          editionId: "edition:authored-market-structure:2026-07-08",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          implication:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          rank: 6,
          semanticHash: "66c020a404bfd005b5b35be9550401c6c1ec9f79295a578519b55b9a434f0618",
          sourceIds: ["source:archive-url-6c89a9985330e8e3be5c9af6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-be715ca6e71ce4b409082480:2026-07-08",
          signalId: "signal:archive-url-be715ca6e71ce4b409082480",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          implication:
            "Autonomous trading agents put circuit breakers into the market-stability debate",
          rank: 7,
          semanticHash: "23e6165ddfcb4d7259bdc41ad896489d8ddc8a341c457d6cb5ad700144fbedd8",
          sourceIds: ["source:archive-url-be715ca6e71ce4b409082480"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5b18f2b35c0665fb44bab6f1:2026-07-08",
          signalId: "signal:archive-url-5b18f2b35c0665fb44bab6f1",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "Crypto rules are moving from perimeter debate to operating model",
          implication: "Crypto rules are moving from perimeter debate to operating model",
          rank: 8,
          semanticHash: "4ff91c5a43eab860dc4c4620d5fb44e8bd5d66cb915f8cbbbead5a2c346c5479",
          sourceIds: ["source:archive-url-5b18f2b35c0665fb44bab6f1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-539f3452dd8e778b96fc045f:2026-07-08",
          signalId: "signal:archive-url-539f3452dd8e778b96fc045f",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "AI infrastructure capex needs a downside financing scenario",
          implication: "AI infrastructure capex needs a downside financing scenario",
          rank: 9,
          semanticHash: "29818115f8a59fb54a3fd822fe268e8f58da7eb24a05725fb7841df0070f4ee6",
          sourceIds: ["source:archive-url-539f3452dd8e778b96fc045f"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-3c6322d9591f8bb8e812f349",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-58a149e95ac8813cb76e1028",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-51bf843306b449f98b13048c",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-19a9d1f151792688e1473924",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          publisher: "ecb.europa.eu",
          url: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6c89a9985330e8e3be5c9af6",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7ba905f9ec436e65a9a1c44f",
          title:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-proposes-key-reforms-settlement-discipline-supporting-transition-t1",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d2143a26dbe0026c69aa1730",
          title:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esmas-annual-data-report-shows-increased-quality-wider-use-and-digital",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-be715ca6e71ce4b409082480",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5b18f2b35c0665fb44bab6f1",
          title: "Crypto rules are moving from perimeter debate to operating model",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-539f3452dd8e778b96fc045f",
          title: "AI infrastructure capex needs a downside financing scenario",
          publisher: "wsj.com",
          url: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e03f19c93b2153595c48505e",
          title: "CSDR settlement discipline needs operations and client-service readiness",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/market-structure/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "b32668fedc17443be8aaf814dbe2a695984b5d8a5182beff0a3df1a07348dccd",
    metadata: {
      title: "Market Structure Signals | The Virtual Officer",
      description:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      canonical: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphTitle: "Market Structure Signals | The Virtual Officer",
      openGraphDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/market-structure/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Market Structure Signals | The Virtual Officer",
      twitterDescription:
        "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Market Structure Signals",
        description:
          "Market-structure signals covering AI infrastructure financing, crypto supervision, private credit, liquidity, and market plumbing.",
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
          "@id": "https://stgeorgesstrategy.com/signals/market-structure/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:b32668fedc17443be8aaf814dbe2a695984b5d8a5182beff0a3df1a07348dccd:/signals/market-structure/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/market-structure/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "b32668fedc17443be8aaf814dbe2a695984b5d8a5182beff0a3df1a07348dccd",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Market structure",
        title: "Capital, liquidity, infrastructure, and concentration risk",
        dek: "The exploded market-structure page behind the weekly brief. It connects AI infrastructure, crypto rules, private credit, liquidity, and market plumbing to financial-services control questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 market-structure signals",
        paragraphs: [
          "These are anchored in this week's dashboard sources: AI capex, crypto perimeter change, central-bank timing, and market-plumbing deadlines.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
              content: "AI infrastructure capex needs a downside financing scenario",
            },
            {
              kind: "label",
              role: "top-source",
              content: "AI capital / Wall Street Journal and BIS / 2026-06",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
              content: "Crypto rules are moving from perimeter debate to operating model",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Crypto / Guardian / 2026-06-30",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-proposes-key-reforms-settlement-discipline-supporting-transition-t1",
              content:
                "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2025-10-13",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more market-structure signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link market, infrastructure, regulatory, and balance-sheet signals to their source trail and control implication.",
        },
        items: [
          {
            rank: "06",
            title:
              "Autonomous trading agents put circuit breakers into the market-stability debate",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
            href: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
            meta: "Primary / ECB forum / 2026-06-29 to 2026-07-01",
          },
          {
            rank: "08",
            title:
              "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
            href: "https://www.esma.europa.eu/press-news/esma-news/esmas-annual-data-report-shows-increased-quality-wider-use-and-digital",
            meta: "Primary / ESMA / 2026-05-29",
          },
          {
            rank: "09",
            title:
              "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            meta: "Primary / EUR-Lex ESG ratings / applies 2026-07-02",
          },
          {
            rank: "10",
            title:
              "PRA funded reinsurance consultation raises collateral and counterparty questions",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            meta: "Primary / PRA consultation / closes 2026-07-31",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Market-structure signals matter when they move beyond market colour and start changing firm exposure, client outcomes, capital assumptions, or supervisory expectations.",
        },
        cards: [
          {
            meta: "So what",
            title: "Innovation stories can become concentration stories",
            paragraphs: [
              "AI infrastructure and crypto regulation are not only technology themes. They can become credit, liquidity, conduct, custody, market-integrity, and capital-planning issues.",
            ],
          },
          {
            meta: "Who cares",
            title: "Treasury, markets, credit, asset management, wealth, product, and risk",
            paragraphs: [
              "The same signal can sit in balance-sheet exposure, client portfolios, counterparty channels, vendor finance, and regulatory perimeter planning.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Exposure maps, stress assumptions, controls, and client-impact reviews",
            paragraphs: [
              "The weekly brief should push readers toward a cross-book view of exposure and a practical test of downside scenarios.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Market-structure evidence checklist",
          title: "What the reader should ask for",
          description:
            "Market-structure pages should translate macro and market signals into evidence that a firm can actually produce.",
        },
        deadlines: [
          {
            date: "Exposure",
            action:
              "Where does this theme sit across public equities, lending, private credit, funds, client portfolios, suppliers, and counterparties?",
            owner: "Map",
          },
          {
            date: "Scenario",
            action:
              "What downside scenario has been tested for valuation reversal, liquidity stress, funding pullback, or regulatory constraint?",
            owner: "Stress",
          },
          {
            date: "Perimeter",
            action:
              "Which products, entities, or relationships may move closer to regulated operating standards?",
            owner: "Legal",
          },
          {
            date: "Controls",
            action:
              "Are custody, surveillance, disclosure, suitability, settlement, and wind-down controls aligned to the changing market structure?",
            owner: "Control",
          },
          {
            date: "Governance",
            action:
              "Does one committee have visibility across the exposure, or is the signal split across business lines?",
            owner: "Board",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Market-structure archives should preserve how a theme moved from weak signal to exposure map to control action.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: ["Included in the weekly executive pulse."],
          },
          {
            meta: "Source trail",
            title: "Central banks, supervisors, market data, and credible reporting",
            href: "/regulatory-horizon/",
            paragraphs: [
              "The horizon page now preserves the official deadlines behind the market-plumbing items.",
            ],
          },
          {
            meta: "Current edition",
            title: "AI capex, crypto rules, and private-market exposure",
            href: "/brief/",
            paragraphs: [
              "Included in the weekly executive pulse with source links and follow-up prompts.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "market-structure / 2026-07-08",
      currentLabel: "market-structure / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-3c6322d9591f8bb8e812f349:2026-07-08",
          signalId: "signal:archive-url-3c6322d9591f8bb8e812f349",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          implication:
            "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          rank: 1,
          semanticHash: "011c30c16c046c3bfd74ef233e2375baa4a5fa82b40479540312c3a6737ae44e",
          sourceIds: ["source:archive-url-3c6322d9591f8bb8e812f349"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-58a149e95ac8813cb76e1028:2026-07-08",
          signalId: "signal:archive-url-58a149e95ac8813cb76e1028",
          editionId: "edition:authored-market-structure:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          implication:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          rank: 2,
          semanticHash: "719e197728f9d4a8542b96f78699352261521b7d948b756af30dab4211995290",
          sourceIds: ["source:archive-url-58a149e95ac8813cb76e1028"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-51bf843306b449f98b13048c:2026-07-08",
          signalId: "signal:archive-url-51bf843306b449f98b13048c",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          implication:
            "PRA funded reinsurance consultation raises collateral and counterparty questions",
          rank: 3,
          semanticHash: "3308e234af4187203647583cd4bb24e33446e75b4174e3a0453b25f66364d6bd",
          sourceIds: ["source:archive-url-51bf843306b449f98b13048c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19a9d1f151792688e1473924:2026-07-08",
          signalId: "signal:archive-url-19a9d1f151792688e1473924",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          implication: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          rank: 4,
          semanticHash: "6d81b4edae2f7f9faaf96e275aafa806d1e82dc19a6760cef6c3a2a275df01f0",
          sourceIds: ["source:archive-url-19a9d1f151792688e1473924"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e03f19c93b2153595c48505e:2026-07-08",
          signalId: "signal:archive-url-e03f19c93b2153595c48505e",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "CSDR settlement discipline needs operations and client-service readiness",
          implication: "CSDR settlement discipline needs operations and client-service readiness",
          rank: 5,
          semanticHash: "3f12b1ca6fc57bc583e39eadda7653be30b8f7e594480bf846d7fb02725c4604",
          sourceIds: ["source:archive-url-e03f19c93b2153595c48505e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6c89a9985330e8e3be5c9af6:2026-07-08",
          signalId: "signal:archive-url-6c89a9985330e8e3be5c9af6",
          editionId: "edition:authored-market-structure:2026-07-08",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          implication:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          rank: 6,
          semanticHash: "66c020a404bfd005b5b35be9550401c6c1ec9f79295a578519b55b9a434f0618",
          sourceIds: ["source:archive-url-6c89a9985330e8e3be5c9af6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-be715ca6e71ce4b409082480:2026-07-08",
          signalId: "signal:archive-url-be715ca6e71ce4b409082480",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          implication:
            "Autonomous trading agents put circuit breakers into the market-stability debate",
          rank: 7,
          semanticHash: "23e6165ddfcb4d7259bdc41ad896489d8ddc8a341c457d6cb5ad700144fbedd8",
          sourceIds: ["source:archive-url-be715ca6e71ce4b409082480"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5b18f2b35c0665fb44bab6f1:2026-07-08",
          signalId: "signal:archive-url-5b18f2b35c0665fb44bab6f1",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "Crypto rules are moving from perimeter debate to operating model",
          implication: "Crypto rules are moving from perimeter debate to operating model",
          rank: 8,
          semanticHash: "4ff91c5a43eab860dc4c4620d5fb44e8bd5d66cb915f8cbbbead5a2c346c5479",
          sourceIds: ["source:archive-url-5b18f2b35c0665fb44bab6f1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-539f3452dd8e778b96fc045f:2026-07-08",
          signalId: "signal:archive-url-539f3452dd8e778b96fc045f",
          editionId: "edition:authored-market-structure:2026-07-08",
          title: "AI infrastructure capex needs a downside financing scenario",
          implication: "AI infrastructure capex needs a downside financing scenario",
          rank: 9,
          semanticHash: "29818115f8a59fb54a3fd822fe268e8f58da7eb24a05725fb7841df0070f4ee6",
          sourceIds: ["source:archive-url-539f3452dd8e778b96fc045f"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-3c6322d9591f8bb8e812f349:2026-07-09",
          signalId: "signal:archive-url-3c6322d9591f8bb8e812f349",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          implication:
            "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          rank: 1,
          semanticHash: "011c30c16c046c3bfd74ef233e2375baa4a5fa82b40479540312c3a6737ae44e",
          sourceIds: ["source:archive-url-3c6322d9591f8bb8e812f349"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-58a149e95ac8813cb76e1028:2026-07-09",
          signalId: "signal:archive-url-58a149e95ac8813cb76e1028",
          editionId: "edition:authored-market-structure:2026-07-09",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          implication:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          rank: 2,
          semanticHash: "719e197728f9d4a8542b96f78699352261521b7d948b756af30dab4211995290",
          sourceIds: ["source:archive-url-58a149e95ac8813cb76e1028"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-51bf843306b449f98b13048c:2026-07-09",
          signalId: "signal:archive-url-51bf843306b449f98b13048c",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          implication:
            "PRA funded reinsurance consultation raises collateral and counterparty questions",
          rank: 3,
          semanticHash: "3308e234af4187203647583cd4bb24e33446e75b4174e3a0453b25f66364d6bd",
          sourceIds: ["source:archive-url-51bf843306b449f98b13048c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19a9d1f151792688e1473924:2026-07-09",
          signalId: "signal:archive-url-19a9d1f151792688e1473924",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          implication: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          rank: 4,
          semanticHash: "6d81b4edae2f7f9faaf96e275aafa806d1e82dc19a6760cef6c3a2a275df01f0",
          sourceIds: ["source:archive-url-19a9d1f151792688e1473924"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6c89a9985330e8e3be5c9af6:2026-07-09",
          signalId: "signal:archive-url-6c89a9985330e8e3be5c9af6",
          editionId: "edition:authored-market-structure:2026-07-09",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          implication:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          rank: 5,
          semanticHash: "66c020a404bfd005b5b35be9550401c6c1ec9f79295a578519b55b9a434f0618",
          sourceIds: ["source:archive-url-6c89a9985330e8e3be5c9af6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ba905f9ec436e65a9a1c44f:2026-07-09",
          signalId: "signal:archive-url-7ba905f9ec436e65a9a1c44f",
          editionId: "edition:authored-market-structure:2026-07-09",
          title:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          implication:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          rank: 6,
          semanticHash: "47eb654d29ead44143d38e93a20a943e01dd59fbebeceae4e5553e1703896057",
          sourceIds: ["source:archive-url-7ba905f9ec436e65a9a1c44f"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d2143a26dbe0026c69aa1730:2026-07-09",
          signalId: "signal:archive-url-d2143a26dbe0026c69aa1730",
          editionId: "edition:authored-market-structure:2026-07-09",
          title:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          implication:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          rank: 7,
          semanticHash: "89ca0721a6f4816f420d049dc42be1526881111909d159c318bbdf3ed486fca5",
          sourceIds: ["source:archive-url-d2143a26dbe0026c69aa1730"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-be715ca6e71ce4b409082480:2026-07-09",
          signalId: "signal:archive-url-be715ca6e71ce4b409082480",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          implication:
            "Autonomous trading agents put circuit breakers into the market-stability debate",
          rank: 8,
          semanticHash: "23e6165ddfcb4d7259bdc41ad896489d8ddc8a341c457d6cb5ad700144fbedd8",
          sourceIds: ["source:archive-url-be715ca6e71ce4b409082480"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5b18f2b35c0665fb44bab6f1:2026-07-09",
          signalId: "signal:archive-url-5b18f2b35c0665fb44bab6f1",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "Crypto rules are moving from perimeter debate to operating model",
          implication: "Crypto rules are moving from perimeter debate to operating model",
          rank: 9,
          semanticHash: "4ff91c5a43eab860dc4c4620d5fb44e8bd5d66cb915f8cbbbead5a2c346c5479",
          sourceIds: ["source:archive-url-5b18f2b35c0665fb44bab6f1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-539f3452dd8e778b96fc045f:2026-07-09",
          signalId: "signal:archive-url-539f3452dd8e778b96fc045f",
          editionId: "edition:authored-market-structure:2026-07-09",
          title: "AI infrastructure capex needs a downside financing scenario",
          implication: "AI infrastructure capex needs a downside financing scenario",
          rank: 10,
          semanticHash: "29818115f8a59fb54a3fd822fe268e8f58da7eb24a05725fb7841df0070f4ee6",
          sourceIds: ["source:archive-url-539f3452dd8e778b96fc045f"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-3c6322d9591f8bb8e812f349",
          title: "ESG ratings regulation changes procurement, methodology, and conflicts evidence",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-58a149e95ac8813cb76e1028",
          title:
            "Bank of England's July Financial Stability Report frames the current systemic risk outlook",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-51bf843306b449f98b13048c",
          title: "PRA funded reinsurance consultation raises collateral and counterparty questions",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-19a9d1f151792688e1473924",
          title: "ECB Sintra signals feed H2 rate, liquidity, and risk-appetite assumptions",
          publisher: "ecb.europa.eu",
          url: "https://www.ecb.europa.eu/pub/conferences/ecbforum/html/index.en.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e03f19c93b2153595c48505e",
          title: "CSDR settlement discipline needs operations and client-service readiness",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6c89a9985330e8e3be5c9af6",
          title:
            "ESMA launches common supervisory action on crypto-asset custody and digital operational resilience",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-be715ca6e71ce4b409082480",
          title: "Autonomous trading agents put circuit breakers into the market-stability debate",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5b18f2b35c0665fb44bab6f1",
          title: "Crypto rules are moving from perimeter debate to operating model",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-539f3452dd8e778b96fc045f",
          title: "AI infrastructure capex needs a downside financing scenario",
          publisher: "wsj.com",
          url: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7ba905f9ec436e65a9a1c44f",
          title:
            "ESMA proposes settlement discipline reforms to underpin the EU's move to T+1 by October 2027",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-proposes-key-reforms-settlement-discipline-supporting-transition-t1",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d2143a26dbe0026c69aa1730",
          title:
            "ESMA's sixth data-quality report shows measurable effects of transaction-reporting burden reduction across EU market infrastructure",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esmas-annual-data-report-shows-increased-quality-wider-use-and-digital",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/resilience/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8",
    metadata: {
      title: "Operational Resilience Signals | The Virtual Officer",
      description:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      canonical: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphTitle: "Operational Resilience Signals | The Virtual Officer",
      openGraphDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Operational Resilience Signals | The Virtual Officer",
      twitterDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Operational Resilience Signals",
        description:
          "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
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
          "@id": "https://stgeorgesstrategy.com/signals/resilience/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:bfc2d8caf20a1a5b861c64dc6ff5096e42cc86d0b6a021f2a4c160416d41c3d1:/signals/resilience/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "bfc2d8caf20a1a5b861c64dc6ff5096e42cc86d0b6a021f2a4c160416d41c3d1",
      },
      {
        key: "live:91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8:/signals/resilience/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Operational resilience",
        title: "Failure paths, fallback evidence, and customer impact",
        dek: "The exploded resilience page behind the weekly brief. It turns outages and control failures into internal tests of ownership, telemetry, tolerance, and recovery.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 resilience signals",
        paragraphs: [
          "These are drawn from this week's live dashboard control-failure sources and turned into resilience tests.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report resets the operational resilience baseline",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content:
                "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Payments / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
              content: "Customer-edge monitoring should challenge green internal status pages",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Digital services / Tom's Guide / 2026-06-22",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more resilience signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link public incidents and official signals to the resilience tests they imply.",
        },
        items: [
          {
            rank: "06",
            title: "Worldpay outage shows processor failure can become customer harm",
            href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
            meta: "Payments / Guardian / 2026-06-23",
          },
          {
            rank: "07",
            title:
              "HSBC Australia's $35m scam-protection penalty keeps complaint ageing in the resilience narrative",
            href: "https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-127mr-federal-court-orders-35-million-penalty-against-hsbc-for-scam-protection-failures/",
            meta: "Enforcement / ASIC / 2026-06-18",
          },
          {
            rank: "08",
            title:
              "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "09",
            title:
              "FCA one-year review: firms still lack clear, tested methodologies for setting impact tolerances",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "10",
            title: "Patch SLAs are compressing as AI changes vulnerability discovery",
            href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
            meta: "Cyber resilience / Wired / 2026-06-11",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Resilience signals matter when they reveal an internal control test: whether a firm understands its customer-visible failure paths and can evidence recovery under stress.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as service continuity",
            paragraphs: [
              "A platform can be technically up while customers cannot pay, trade, access, complain, or recover. The test is the journey, not the component.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CISO, payments, complaints, conduct, and resilience teams",
            paragraphs: [
              "Operational resilience belongs across business services, customer outcomes, third parties, cyber, incident response, and governance.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Dependency maps, tolerance tests, telemetry, and rehearsed fallback",
            paragraphs: [
              "The weekly brief should push readers toward evidence that failure paths have been tested, not simply documented.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Resilience evidence checklist",
          title: "What the reader should ask for",
          description:
            "Resilience pages should end in practical evidence prompts that can be handed to a service owner or control owner.",
        },
        deadlines: [
          {
            date: "Journey",
            action:
              "Which customer journeys would visibly fail if the named provider, network route, or process degraded tonight?",
            owner: "Service",
          },
          {
            date: "Map",
            action:
              "Do dependency maps cover processors, telecoms, cloud, CDN, identity, data, staff, and manual workarounds?",
            owner: "Dependency",
          },
          {
            date: "Measure",
            action:
              "Is there customer-edge telemetry for each important business service, not only internal platform uptime?",
            owner: "Telemetry",
          },
          {
            date: "Fallback",
            action:
              "Have fallback routes been tested against volume, staffing, permissions, data access, and communications?",
            owner: "Recovery",
          },
          {
            date: "Govern",
            action:
              "Are lessons from incidents tied to accountable owners, dates, evidence, and committee visibility?",
            owner: "Owner",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Resilience is especially valuable as an archive because incidents repeat in patterns. The archive should preserve the pattern, not only the incident.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Payment fallback and customer-edge telemetry",
            href: "/brief/",
            paragraphs: ["Included as weekly control lessons."],
          },
          {
            meta: "Source trail",
            title: "Outages, penalties, supervisory updates, and incident reporting",
            href: "/brief/",
            paragraphs: [
              "The weekly brief preserves the Guardian, FT, Wired, TechRadar, and official-source trail.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience expectations",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Use as the standing reference for impact tolerances, important business services, and evidence.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/resilience/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8",
    metadata: {
      title: "Operational Resilience Signals | The Virtual Officer",
      description:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      canonical: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphTitle: "Operational Resilience Signals | The Virtual Officer",
      openGraphDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Operational Resilience Signals | The Virtual Officer",
      twitterDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Operational Resilience Signals",
        description:
          "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
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
          "@id": "https://stgeorgesstrategy.com/signals/resilience/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8:/signals/resilience/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "91088fb69622be4160645ffd1af4791eff16f66f00f5d7397a1fc1b789e8eaa8",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Operational resilience",
        title: "Failure paths, fallback evidence, and customer impact",
        dek: "The exploded resilience page behind the weekly brief. It turns outages and control failures into internal tests of ownership, telemetry, tolerance, and recovery.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 resilience signals",
        paragraphs: [
          "These are drawn from this week's live dashboard control-failure sources and turned into resilience tests.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report resets the operational resilience baseline",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content:
                "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Payments / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
              content: "Customer-edge monitoring should challenge green internal status pages",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Digital services / Tom's Guide / 2026-06-22",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more resilience signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link public incidents and official signals to the resilience tests they imply.",
        },
        items: [
          {
            rank: "06",
            title: "Worldpay outage shows processor failure can become customer harm",
            href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
            meta: "Payments / Guardian / 2026-06-23",
          },
          {
            rank: "07",
            title:
              "HSBC Australia's $35m scam-protection penalty keeps complaint ageing in the resilience narrative",
            href: "https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-127mr-federal-court-orders-35-million-penalty-against-hsbc-for-scam-protection-failures/",
            meta: "Enforcement / ASIC / 2026-06-18",
          },
          {
            rank: "08",
            title:
              "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "09",
            title:
              "FCA one-year review: firms still lack clear, tested methodologies for setting impact tolerances",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "10",
            title: "Patch SLAs are compressing as AI changes vulnerability discovery",
            href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
            meta: "Cyber resilience / Wired / 2026-06-11",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Resilience signals matter when they reveal an internal control test: whether a firm understands its customer-visible failure paths and can evidence recovery under stress.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as service continuity",
            paragraphs: [
              "A platform can be technically up while customers cannot pay, trade, access, complain, or recover. The test is the journey, not the component.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CISO, payments, complaints, conduct, and resilience teams",
            paragraphs: [
              "Operational resilience belongs across business services, customer outcomes, third parties, cyber, incident response, and governance.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Dependency maps, tolerance tests, telemetry, and rehearsed fallback",
            paragraphs: [
              "The weekly brief should push readers toward evidence that failure paths have been tested, not simply documented.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Resilience evidence checklist",
          title: "What the reader should ask for",
          description:
            "Resilience pages should end in practical evidence prompts that can be handed to a service owner or control owner.",
        },
        deadlines: [
          {
            date: "Journey",
            action:
              "Which customer journeys would visibly fail if the named provider, network route, or process degraded tonight?",
            owner: "Service",
          },
          {
            date: "Map",
            action:
              "Do dependency maps cover processors, telecoms, cloud, CDN, identity, data, staff, and manual workarounds?",
            owner: "Dependency",
          },
          {
            date: "Measure",
            action:
              "Is there customer-edge telemetry for each important business service, not only internal platform uptime?",
            owner: "Telemetry",
          },
          {
            date: "Fallback",
            action:
              "Have fallback routes been tested against volume, staffing, permissions, data access, and communications?",
            owner: "Recovery",
          },
          {
            date: "Govern",
            action:
              "Are lessons from incidents tied to accountable owners, dates, evidence, and committee visibility?",
            owner: "Owner",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Resilience is especially valuable as an archive because incidents repeat in patterns. The archive should preserve the pattern, not only the incident.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Payment fallback and customer-edge telemetry",
            href: "/brief/",
            paragraphs: ["Included as weekly control lessons."],
          },
          {
            meta: "Source trail",
            title: "Outages, penalties, supervisory updates, and incident reporting",
            href: "/brief/",
            paragraphs: [
              "The weekly brief preserves the Guardian, FT, Wired, TechRadar, and official-source trail.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience expectations",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Use as the standing reference for impact tolerances, important business services, and evidence.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "resilience / 2026-07-06",
    },
  },
  {
    route: "/signals/resilience/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "2ec77e8ef5552899201672f64ca28b54baa9d73f90e6baa55077cb49237787b5",
    metadata: {
      title: "Operational Resilience Signals | The Virtual Officer",
      description:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      canonical: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphTitle: "Operational Resilience Signals | The Virtual Officer",
      openGraphDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Operational Resilience Signals | The Virtual Officer",
      twitterDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Operational Resilience Signals",
        description:
          "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
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
          "@id": "https://stgeorgesstrategy.com/signals/resilience/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:2ec77e8ef5552899201672f64ca28b54baa9d73f90e6baa55077cb49237787b5:/signals/resilience/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "2ec77e8ef5552899201672f64ca28b54baa9d73f90e6baa55077cb49237787b5",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Operational resilience",
        title: "Failure paths, fallback evidence, and customer impact",
        dek: "The exploded resilience page behind the weekly brief. It turns outages and control failures into internal tests of ownership, telemetry, tolerance, and recovery.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 resilience signals",
        paragraphs: [
          "These are drawn from this week's live dashboard control-failure sources and turned into resilience tests.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report resets the operational resilience baseline",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content:
                "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Payments / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
              content: "Customer-edge monitoring should challenge green internal status pages",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Digital services / Tom's Guide / 2026-06-22",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more resilience signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link public incidents and official signals to the resilience tests they imply.",
        },
        items: [
          {
            rank: "06",
            title: "Worldpay outage shows processor failure can become customer harm",
            href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
            meta: "Payments / Guardian / 2026-06-23",
          },
          {
            rank: "07",
            title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
            href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
            meta: "Conduct and fraud / Financial Times / 2026-06",
          },
          {
            rank: "08",
            title: "Important business services still need third-party evidence packs",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            meta: "Official expectations / FCA operational resilience",
          },
          {
            rank: "09",
            title: "Impact tolerances should be tested against customer-visible journeys",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            meta: "Official expectations / FCA",
          },
          {
            rank: "10",
            title: "Patch SLAs are compressing as AI changes vulnerability discovery",
            href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
            meta: "Cyber resilience / Wired / 2026",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Resilience signals matter when they reveal an internal control test: whether a firm understands its customer-visible failure paths and can evidence recovery under stress.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as service continuity",
            paragraphs: [
              "A platform can be technically up while customers cannot pay, trade, access, complain, or recover. The test is the journey, not the component.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CISO, payments, complaints, conduct, and resilience teams",
            paragraphs: [
              "Operational resilience belongs across business services, customer outcomes, third parties, cyber, incident response, and governance.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Dependency maps, tolerance tests, telemetry, and rehearsed fallback",
            paragraphs: [
              "The weekly brief should push readers toward evidence that failure paths have been tested, not simply documented.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "Resilience pages should end in practical evidence prompts that can be handed to a service owner or control owner.",
        },
        deadlines: [
          {
            date: "Journey",
            action:
              "Which customer journeys would visibly fail if the named provider, network route, or process degraded tonight?",
            owner: "Service",
          },
          {
            date: "Map",
            action:
              "Do dependency maps cover processors, telecoms, cloud, CDN, identity, data, staff, and manual workarounds?",
            owner: "Dependency",
          },
          {
            date: "Measure",
            action:
              "Is there customer-edge telemetry for each important business service, not only internal platform uptime?",
            owner: "Telemetry",
          },
          {
            date: "Fallback",
            action:
              "Have fallback routes been tested against volume, staffing, permissions, data access, and communications?",
            owner: "Recovery",
          },
          {
            date: "Govern",
            action:
              "Are lessons from incidents tied to accountable owners, dates, evidence, and committee visibility?",
            owner: "Owner",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Resilience is especially valuable as an archive because incidents repeat in patterns. The archive should preserve the pattern, not only the incident.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Payment fallback and customer-edge telemetry",
            href: "/brief/",
            paragraphs: ["Included as weekly control lessons."],
          },
          {
            meta: "Source trail",
            title: "Outages, penalties, supervisory updates, and incident reporting",
            href: "/brief/",
            paragraphs: [
              "The weekly brief preserves the Guardian, FT, Wired, TechRadar, and official-source trail.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience expectations",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Use as the standing reference for impact tolerances, important business services, and evidence.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "resilience / 2026-07-06",
      currentLabel: "resilience / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-6550092e0c2b52370b4d2614:2026-07-06",
          signalId: "signal:archive-url-6550092e0c2b52370b4d2614",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "HSBC Australia's $35m scam-protection penalty keeps complaint ageing in the resilience narrative",
          implication:
            "HSBC Australia's $35m scam-protection penalty keeps complaint ageing in the resilience narrative",
          rank: 1,
          semanticHash: "07371f2d95593f1f5461ecb9f5aa0a4bde830487c7cd92773d89533900abb3c5",
          sourceIds: ["source:archive-url-6550092e0c2b52370b4d2614"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-70e59c6d6bfd59ef78401faf:2026-07-06",
          signalId: "signal:archive-url-70e59c6d6bfd59ef78401faf",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          implication:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          rank: 2,
          semanticHash: "c38060a803bc74897641e92da5c417eeb3414587733cb91f1fa416a8b8301923",
          sourceIds: ["source:archive-url-70e59c6d6bfd59ef78401faf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-804a3de6ae158a90f440bee9:2026-07-06",
          signalId: "signal:archive-url-804a3de6ae158a90f440bee9",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          implication:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          rank: 3,
          semanticHash: "a005c45666a1d38896d0abbf2344a6bd14fb7a45c421db510145433ad29fab75",
          sourceIds: ["source:archive-url-804a3de6ae158a90f440bee9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ffba895b9208ffd2aca3158:2026-07-06",
          signalId: "signal:archive-url-5ffba895b9208ffd2aca3158",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          implication:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          rank: 4,
          semanticHash: "4a346b9352819ca8860cf3d11c8c34523c07513f89e9b39f42d101e78fdec670",
          sourceIds: ["source:archive-url-5ffba895b9208ffd2aca3158"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b7b1d9b4f27885b1c95fc9a0:2026-07-06",
          signalId: "signal:archive-url-b7b1d9b4f27885b1c95fc9a0",
          editionId: "edition:authored-resilience:2026-07-06",
          title: "FCA operational resilience expectations",
          implication: "FCA operational resilience expectations",
          rank: 5,
          semanticHash: "a721aaab1a39cf75a211d1825ed414f60280406d54887d72eb98897a9353c1cc",
          sourceIds: ["source:archive-url-b7b1d9b4f27885b1c95fc9a0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7c7ca570972f7605bf0cbe5e:2026-07-06",
          signalId: "signal:archive-url-7c7ca570972f7605bf0cbe5e",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          implication:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          rank: 6,
          semanticHash: "b3707ef20374fbed2c31782ba74061194d041dd35cd9a1e1cb287b39f21f8afa",
          sourceIds: ["source:archive-url-7c7ca570972f7605bf0cbe5e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b20e55396c3bf36946942d7:2026-07-06",
          signalId: "signal:archive-url-4b20e55396c3bf36946942d7",
          editionId: "edition:authored-resilience:2026-07-06",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          implication:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          rank: 7,
          semanticHash: "c9b70f2c28cb3372891126764455f42f9aa14f3ef672a703cee0a4b85b1300b4",
          sourceIds: ["source:archive-url-4b20e55396c3bf36946942d7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c2a5fac18bab055cdd469d2:2026-07-06",
          signalId: "signal:archive-url-3c2a5fac18bab055cdd469d2",
          editionId: "edition:authored-resilience:2026-07-06",
          title: "Customer-edge monitoring should challenge green internal status pages",
          implication: "Customer-edge monitoring should challenge green internal status pages",
          rank: 8,
          semanticHash: "54b5894c624fe481649c1398b22fde7ac9397c19ff14372edf5a36004710dbda",
          sourceIds: ["source:archive-url-3c2a5fac18bab055cdd469d2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b059fa30d52bee6da79347b8:2026-07-06",
          signalId: "signal:archive-url-b059fa30d52bee6da79347b8",
          editionId: "edition:authored-resilience:2026-07-06",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          implication: "Patch SLAs are compressing as AI changes vulnerability discovery",
          rank: 9,
          semanticHash: "1d32759f09fcf6fe0a6ac410c2b46c0ea84b200547aac7373e4e77b0ae036fc3",
          sourceIds: ["source:archive-url-b059fa30d52bee6da79347b8"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-70e59c6d6bfd59ef78401faf:2026-07-08",
          signalId: "signal:archive-url-70e59c6d6bfd59ef78401faf",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          implication:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          rank: 1,
          semanticHash: "c38060a803bc74897641e92da5c417eeb3414587733cb91f1fa416a8b8301923",
          sourceIds: ["source:archive-url-70e59c6d6bfd59ef78401faf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-804a3de6ae158a90f440bee9:2026-07-08",
          signalId: "signal:archive-url-804a3de6ae158a90f440bee9",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          implication:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          rank: 2,
          semanticHash: "a005c45666a1d38896d0abbf2344a6bd14fb7a45c421db510145433ad29fab75",
          sourceIds: ["source:archive-url-804a3de6ae158a90f440bee9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ffba895b9208ffd2aca3158:2026-07-08",
          signalId: "signal:archive-url-5ffba895b9208ffd2aca3158",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          implication:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          rank: 3,
          semanticHash: "4a346b9352819ca8860cf3d11c8c34523c07513f89e9b39f42d101e78fdec670",
          sourceIds: ["source:archive-url-5ffba895b9208ffd2aca3158"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b7b1d9b4f27885b1c95fc9a0:2026-07-08",
          signalId: "signal:archive-url-b7b1d9b4f27885b1c95fc9a0",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Important business services still need third-party evidence packs",
          implication: "Important business services still need third-party evidence packs",
          rank: 4,
          semanticHash: "6a8e7921261678c64397d2d1a9a7447abb18d783014ed354a2103c994b210a3a",
          sourceIds: ["source:archive-url-b7b1d9b4f27885b1c95fc9a0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d7b863c3c83608bc991bb6ec:2026-07-08",
          signalId: "signal:archive-url-d7b863c3c83608bc991bb6ec",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          implication: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          rank: 5,
          semanticHash: "11444fa7c48dfcd73b03fbdf9183aeb8d68a10bd90cd6323d23a0f0949cf3dad",
          sourceIds: ["source:archive-url-d7b863c3c83608bc991bb6ec"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b20e55396c3bf36946942d7:2026-07-08",
          signalId: "signal:archive-url-4b20e55396c3bf36946942d7",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          implication:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          rank: 6,
          semanticHash: "c9b70f2c28cb3372891126764455f42f9aa14f3ef672a703cee0a4b85b1300b4",
          sourceIds: ["source:archive-url-4b20e55396c3bf36946942d7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c2a5fac18bab055cdd469d2:2026-07-08",
          signalId: "signal:archive-url-3c2a5fac18bab055cdd469d2",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Customer-edge monitoring should challenge green internal status pages",
          implication: "Customer-edge monitoring should challenge green internal status pages",
          rank: 7,
          semanticHash: "54b5894c624fe481649c1398b22fde7ac9397c19ff14372edf5a36004710dbda",
          sourceIds: ["source:archive-url-3c2a5fac18bab055cdd469d2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b059fa30d52bee6da79347b8:2026-07-08",
          signalId: "signal:archive-url-b059fa30d52bee6da79347b8",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          implication: "Patch SLAs are compressing as AI changes vulnerability discovery",
          rank: 8,
          semanticHash: "1d32759f09fcf6fe0a6ac410c2b46c0ea84b200547aac7373e4e77b0ae036fc3",
          sourceIds: ["source:archive-url-b059fa30d52bee6da79347b8"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-6550092e0c2b52370b4d2614",
          title:
            "HSBC Australia's $35m scam-protection penalty keeps complaint ageing in the resilience narrative",
          publisher: "asic.gov.au",
          url: "https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-127mr-federal-court-orders-35-million-penalty-against-hsbc-for-scam-protection-failures/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-70e59c6d6bfd59ef78401faf",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-804a3de6ae158a90f440bee9",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ffba895b9208ffd2aca3158",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-b7b1d9b4f27885b1c95fc9a0",
          title: "Important business services still need third-party evidence packs",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7c7ca570972f7605bf0cbe5e",
          title:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4b20e55396c3bf36946942d7",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3c2a5fac18bab055cdd469d2",
          title: "Customer-edge monitoring should challenge green internal status pages",
          publisher: "tomsguide.com",
          url: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-b059fa30d52bee6da79347b8",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          publisher: "wired.com",
          url: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d7b863c3c83608bc991bb6ec",
          title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          publisher: "ft.com",
          url: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/resilience/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "bfc2d8caf20a1a5b861c64dc6ff5096e42cc86d0b6a021f2a4c160416d41c3d1",
    metadata: {
      title: "Operational Resilience Signals | The Virtual Officer",
      description:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      canonical: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphTitle: "Operational Resilience Signals | The Virtual Officer",
      openGraphDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/resilience/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Operational Resilience Signals | The Virtual Officer",
      twitterDescription:
        "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Operational Resilience Signals",
        description:
          "Operational resilience signals covering failure paths, fallback evidence, customer impact, third-party dependencies, and control tests.",
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
          "@id": "https://stgeorgesstrategy.com/signals/resilience/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:bfc2d8caf20a1a5b861c64dc6ff5096e42cc86d0b6a021f2a4c160416d41c3d1:/signals/resilience/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/resilience/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "bfc2d8caf20a1a5b861c64dc6ff5096e42cc86d0b6a021f2a4c160416d41c3d1",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Operational resilience",
        title: "Failure paths, fallback evidence, and customer impact",
        dek: "The exploded resilience page behind the weekly brief. It turns outages and control failures into internal tests of ownership, telemetry, tolerance, and recovery.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 resilience signals",
        paragraphs: [
          "These are drawn from this week's live dashboard control-failure sources and turned into resilience tests.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report resets the operational resilience baseline",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content:
                "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Payments / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
              content: "Customer-edge monitoring should challenge green internal status pages",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Digital services / Tom's Guide / 2026-06-22",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more resilience signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link public incidents and official signals to the resilience tests they imply.",
        },
        items: [
          {
            rank: "06",
            title: "Worldpay outage shows processor failure can become customer harm",
            href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
            meta: "Payments / Guardian / 2026-06-23",
          },
          {
            rank: "07",
            title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
            href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
            meta: "Conduct and fraud / Financial Times / 2026-06",
          },
          {
            rank: "08",
            title:
              "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "09",
            title:
              "FCA one-year review: firms still lack clear, tested methodologies for setting impact tolerances",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "10",
            title: "Patch SLAs are compressing as AI changes vulnerability discovery",
            href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
            meta: "Cyber resilience / Wired / 2026",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Resilience signals matter when they reveal an internal control test: whether a firm understands its customer-visible failure paths and can evidence recovery under stress.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as service continuity",
            paragraphs: [
              "A platform can be technically up while customers cannot pay, trade, access, complain, or recover. The test is the journey, not the component.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CISO, payments, complaints, conduct, and resilience teams",
            paragraphs: [
              "Operational resilience belongs across business services, customer outcomes, third parties, cyber, incident response, and governance.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Dependency maps, tolerance tests, telemetry, and rehearsed fallback",
            paragraphs: [
              "The weekly brief should push readers toward evidence that failure paths have been tested, not simply documented.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Resilience evidence checklist",
          title: "What the reader should ask for",
          description:
            "Resilience pages should end in practical evidence prompts that can be handed to a service owner or control owner.",
        },
        deadlines: [
          {
            date: "Journey",
            action:
              "Which customer journeys would visibly fail if the named provider, network route, or process degraded tonight?",
            owner: "Service",
          },
          {
            date: "Map",
            action:
              "Do dependency maps cover processors, telecoms, cloud, CDN, identity, data, staff, and manual workarounds?",
            owner: "Dependency",
          },
          {
            date: "Measure",
            action:
              "Is there customer-edge telemetry for each important business service, not only internal platform uptime?",
            owner: "Telemetry",
          },
          {
            date: "Fallback",
            action:
              "Have fallback routes been tested against volume, staffing, permissions, data access, and communications?",
            owner: "Recovery",
          },
          {
            date: "Govern",
            action:
              "Are lessons from incidents tied to accountable owners, dates, evidence, and committee visibility?",
            owner: "Owner",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Resilience is especially valuable as an archive because incidents repeat in patterns. The archive should preserve the pattern, not only the incident.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Payment fallback and customer-edge telemetry",
            href: "/brief/",
            paragraphs: ["Included as weekly control lessons."],
          },
          {
            meta: "Source trail",
            title: "Outages, penalties, supervisory updates, and incident reporting",
            href: "/brief/",
            paragraphs: [
              "The weekly brief preserves the Guardian, FT, Wired, TechRadar, and official-source trail.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience expectations",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Use as the standing reference for impact tolerances, important business services, and evidence.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "resilience / 2026-07-08",
      currentLabel: "resilience / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-70e59c6d6bfd59ef78401faf:2026-07-08",
          signalId: "signal:archive-url-70e59c6d6bfd59ef78401faf",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          implication:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          rank: 1,
          semanticHash: "c38060a803bc74897641e92da5c417eeb3414587733cb91f1fa416a8b8301923",
          sourceIds: ["source:archive-url-70e59c6d6bfd59ef78401faf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-804a3de6ae158a90f440bee9:2026-07-08",
          signalId: "signal:archive-url-804a3de6ae158a90f440bee9",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          implication:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          rank: 2,
          semanticHash: "a005c45666a1d38896d0abbf2344a6bd14fb7a45c421db510145433ad29fab75",
          sourceIds: ["source:archive-url-804a3de6ae158a90f440bee9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ffba895b9208ffd2aca3158:2026-07-08",
          signalId: "signal:archive-url-5ffba895b9208ffd2aca3158",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          implication:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          rank: 3,
          semanticHash: "4a346b9352819ca8860cf3d11c8c34523c07513f89e9b39f42d101e78fdec670",
          sourceIds: ["source:archive-url-5ffba895b9208ffd2aca3158"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b7b1d9b4f27885b1c95fc9a0:2026-07-08",
          signalId: "signal:archive-url-b7b1d9b4f27885b1c95fc9a0",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Important business services still need third-party evidence packs",
          implication: "Important business services still need third-party evidence packs",
          rank: 4,
          semanticHash: "6a8e7921261678c64397d2d1a9a7447abb18d783014ed354a2103c994b210a3a",
          sourceIds: ["source:archive-url-b7b1d9b4f27885b1c95fc9a0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d7b863c3c83608bc991bb6ec:2026-07-08",
          signalId: "signal:archive-url-d7b863c3c83608bc991bb6ec",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          implication: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          rank: 5,
          semanticHash: "11444fa7c48dfcd73b03fbdf9183aeb8d68a10bd90cd6323d23a0f0949cf3dad",
          sourceIds: ["source:archive-url-d7b863c3c83608bc991bb6ec"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b20e55396c3bf36946942d7:2026-07-08",
          signalId: "signal:archive-url-4b20e55396c3bf36946942d7",
          editionId: "edition:authored-resilience:2026-07-08",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          implication:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          rank: 6,
          semanticHash: "c9b70f2c28cb3372891126764455f42f9aa14f3ef672a703cee0a4b85b1300b4",
          sourceIds: ["source:archive-url-4b20e55396c3bf36946942d7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c2a5fac18bab055cdd469d2:2026-07-08",
          signalId: "signal:archive-url-3c2a5fac18bab055cdd469d2",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Customer-edge monitoring should challenge green internal status pages",
          implication: "Customer-edge monitoring should challenge green internal status pages",
          rank: 7,
          semanticHash: "54b5894c624fe481649c1398b22fde7ac9397c19ff14372edf5a36004710dbda",
          sourceIds: ["source:archive-url-3c2a5fac18bab055cdd469d2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b059fa30d52bee6da79347b8:2026-07-08",
          signalId: "signal:archive-url-b059fa30d52bee6da79347b8",
          editionId: "edition:authored-resilience:2026-07-08",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          implication: "Patch SLAs are compressing as AI changes vulnerability discovery",
          rank: 8,
          semanticHash: "1d32759f09fcf6fe0a6ac410c2b46c0ea84b200547aac7373e4e77b0ae036fc3",
          sourceIds: ["source:archive-url-b059fa30d52bee6da79347b8"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-70e59c6d6bfd59ef78401faf:2026-07-09",
          signalId: "signal:archive-url-70e59c6d6bfd59ef78401faf",
          editionId: "edition:authored-resilience:2026-07-09",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          implication:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          rank: 1,
          semanticHash: "c38060a803bc74897641e92da5c417eeb3414587733cb91f1fa416a8b8301923",
          sourceIds: ["source:archive-url-70e59c6d6bfd59ef78401faf"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-804a3de6ae158a90f440bee9:2026-07-09",
          signalId: "signal:archive-url-804a3de6ae158a90f440bee9",
          editionId: "edition:authored-resilience:2026-07-09",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          implication:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          rank: 2,
          semanticHash: "a005c45666a1d38896d0abbf2344a6bd14fb7a45c421db510145433ad29fab75",
          sourceIds: ["source:archive-url-804a3de6ae158a90f440bee9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ffba895b9208ffd2aca3158:2026-07-09",
          signalId: "signal:archive-url-5ffba895b9208ffd2aca3158",
          editionId: "edition:authored-resilience:2026-07-09",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          implication:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          rank: 3,
          semanticHash: "4a346b9352819ca8860cf3d11c8c34523c07513f89e9b39f42d101e78fdec670",
          sourceIds: ["source:archive-url-5ffba895b9208ffd2aca3158"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b7b1d9b4f27885b1c95fc9a0:2026-07-09",
          signalId: "signal:archive-url-b7b1d9b4f27885b1c95fc9a0",
          editionId: "edition:authored-resilience:2026-07-09",
          title: "FCA operational resilience expectations",
          implication: "FCA operational resilience expectations",
          rank: 4,
          semanticHash: "a721aaab1a39cf75a211d1825ed414f60280406d54887d72eb98897a9353c1cc",
          sourceIds: ["source:archive-url-b7b1d9b4f27885b1c95fc9a0"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7c7ca570972f7605bf0cbe5e:2026-07-09",
          signalId: "signal:archive-url-7c7ca570972f7605bf0cbe5e",
          editionId: "edition:authored-resilience:2026-07-09",
          title:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          implication:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          rank: 5,
          semanticHash: "b3707ef20374fbed2c31782ba74061194d041dd35cd9a1e1cb287b39f21f8afa",
          sourceIds: ["source:archive-url-7c7ca570972f7605bf0cbe5e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d7b863c3c83608bc991bb6ec:2026-07-09",
          signalId: "signal:archive-url-d7b863c3c83608bc991bb6ec",
          editionId: "edition:authored-resilience:2026-07-09",
          title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          implication: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          rank: 6,
          semanticHash: "11444fa7c48dfcd73b03fbdf9183aeb8d68a10bd90cd6323d23a0f0949cf3dad",
          sourceIds: ["source:archive-url-d7b863c3c83608bc991bb6ec"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-4b20e55396c3bf36946942d7:2026-07-09",
          signalId: "signal:archive-url-4b20e55396c3bf36946942d7",
          editionId: "edition:authored-resilience:2026-07-09",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          implication:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          rank: 7,
          semanticHash: "c9b70f2c28cb3372891126764455f42f9aa14f3ef672a703cee0a4b85b1300b4",
          sourceIds: ["source:archive-url-4b20e55396c3bf36946942d7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c2a5fac18bab055cdd469d2:2026-07-09",
          signalId: "signal:archive-url-3c2a5fac18bab055cdd469d2",
          editionId: "edition:authored-resilience:2026-07-09",
          title: "Customer-edge monitoring should challenge green internal status pages",
          implication: "Customer-edge monitoring should challenge green internal status pages",
          rank: 8,
          semanticHash: "54b5894c624fe481649c1398b22fde7ac9397c19ff14372edf5a36004710dbda",
          sourceIds: ["source:archive-url-3c2a5fac18bab055cdd469d2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-b059fa30d52bee6da79347b8:2026-07-09",
          signalId: "signal:archive-url-b059fa30d52bee6da79347b8",
          editionId: "edition:authored-resilience:2026-07-09",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          implication: "Patch SLAs are compressing as AI changes vulnerability discovery",
          rank: 9,
          semanticHash: "1d32759f09fcf6fe0a6ac410c2b46c0ea84b200547aac7373e4e77b0ae036fc3",
          sourceIds: ["source:archive-url-b059fa30d52bee6da79347b8"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-70e59c6d6bfd59ef78401faf",
          title:
            "Bank of England's July Financial Stability Report resets the operational resilience baseline",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-804a3de6ae158a90f440bee9",
          title:
            "ESAs back ESRB warning that frontier AI models could strain financial-system cyber resilience",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ffba895b9208ffd2aca3158",
          title:
            "ESMA launches supervisory action on crypto-asset custody digital operational resilience",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-b7b1d9b4f27885b1c95fc9a0",
          title: "FCA operational resilience expectations",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d7b863c3c83608bc991bb6ec",
          title: "HSBC Australia penalty keeps complaint ageing in the resilience narrative",
          publisher: "ft.com",
          url: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-4b20e55396c3bf36946942d7",
          title:
            "Payment fallback maps need processor, tokenisation, power, and comms dependencies",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3c2a5fac18bab055cdd469d2",
          title: "Customer-edge monitoring should challenge green internal status pages",
          publisher: "tomsguide.com",
          url: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-b059fa30d52bee6da79347b8",
          title: "Patch SLAs are compressing as AI changes vulnerability discovery",
          publisher: "wired.com",
          url: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7c7ca570972f7605bf0cbe5e",
          title:
            "FCA one-year review finds mapping still leans on technology over people, facilities, and third parties",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/technology-failure/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c",
    metadata: {
      title: "Technology Failure Signals | The Virtual Officer",
      description:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphTitle: "Technology Failure Signals | The Virtual Officer",
      openGraphDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Technology Failure Signals | The Virtual Officer",
      twitterDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Technology Failure Signals",
        description:
          "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/technology-failure/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:9827abdfa41f4527f0096830bd32c00457d568728e3b07d35abd8ac86b750505:/signals/technology-failure/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "9827abdfa41f4527f0096830bd32c00457d568728e3b07d35abd8ac86b750505",
      },
      {
        key: "live:ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c:/signals/technology-failure/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Technology failure",
        title: "Outages, change failure, data integrity, and recovery",
        dek: "The technology-failure page turns outages, cloud dependency, change risk, ICT incidents, and recovery expectations into practical control-evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 technology-failure signals",
        paragraphs: [
          "These items anchor the weekly read across resilience expectations, ICT incidents, cloud assurance, and recovery evidence.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
              content:
                "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-03-27",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
              content:
                "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official regulation / DORA / EUR-Lex",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/collection/cloud",
              content:
                "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC cloud",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more technology-failure signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the evidence trail behind incidents, change failure, third-party technology, resilience testing, and recovery.",
        },
        items: [
          {
            rank: "06",
            title:
              "Firms have invested in data vaulting and standby processing centres since the resilience deadline passed",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "07",
            title:
              "ICT and security risk management should connect change, access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Official expectations / EBA ICT risk guidelines",
          },
          {
            rank: "08",
            title:
              "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Official expectations / EBA outsourcing guidelines",
          },
          {
            rank: "09",
            title:
              "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
            href: "https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-report-dora-major-ict-related-incidents",
            meta: "Primary / ESAs (EBA, EIOPA, ESMA) / 2026-06-03",
          },
          {
            rank: "10",
            title:
              "Critical third-party policy turns technology concentration into a systemic resilience question",
            href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
            meta: "Official source / FCA critical third parties",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Technology failure matters when it moves from an internal incident into customer harm, regulatory exposure, market disruption, or evidence that recovery has not been tested.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as recoverability",
            paragraphs: [
              "A system can be up while a customer journey, payment flow, report, or control process is broken. The evidence test is the service outcome.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CTO, resilience, operations, product, compliance, and suppliers",
            paragraphs: [
              "The same failure can sit across change management, third-party risk, resilience, cyber, data, and customer communications.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Service maps, change records, logs, recovery tests, and communications",
            paragraphs: [
              "Good assurance shows the firm knows what failed, who was affected, how it recovered, and what control changed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Technology evidence checklist",
          title: "What the reader should ask for",
          description:
            "Technology-failure evidence should connect component events to service outcomes, owner decisions, recovery, and learning.",
        },
        deadlines: [
          {
            date: "Service",
            action:
              "Which important business services and customer journeys would fail if this technology failed?",
            owner: "Map",
          },
          {
            date: "Change",
            action:
              "What recent changes, releases, data loads, or access changes could explain the failure path?",
            owner: "Trace",
          },
          {
            date: "Recover",
            action:
              "What evidence proves backup, restore, failover, manual workaround, and communications work at volume?",
            owner: "Test",
          },
          {
            date: "Supplier",
            action:
              "Which cloud, processor, software, data, or network provider controls need evidence?",
            owner: "Assure",
          },
          {
            date: "Learn",
            action:
              "Which control owner, due date, and evidence artifact closes the post-incident action?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Technology failure in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and third-party risk.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when a failure pattern is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Standing source for important business services, impact tolerances, and evidence expectations.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/technology-failure/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c",
    metadata: {
      title: "Technology Failure Signals | The Virtual Officer",
      description:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphTitle: "Technology Failure Signals | The Virtual Officer",
      openGraphDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Technology Failure Signals | The Virtual Officer",
      twitterDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Technology Failure Signals",
        description:
          "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/technology-failure/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c:/signals/technology-failure/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "ae547a7c8016dbbe517f94e4db6f16496a5db855888d19735302023212ad1e2c",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Technology failure",
        title: "Outages, change failure, data integrity, and recovery",
        dek: "The technology-failure page turns outages, cloud dependency, change risk, ICT incidents, and recovery expectations into practical control-evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 technology-failure signals",
        paragraphs: [
          "These items anchor the weekly read across resilience expectations, ICT incidents, cloud assurance, and recovery evidence.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
              content:
                "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-03-27",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
              content:
                "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official regulation / DORA / EUR-Lex",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/collection/cloud",
              content:
                "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC cloud",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more technology-failure signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the evidence trail behind incidents, change failure, third-party technology, resilience testing, and recovery.",
        },
        items: [
          {
            rank: "06",
            title:
              "Firms have invested in data vaulting and standby processing centres since the resilience deadline passed",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "07",
            title:
              "ICT and security risk management should connect change, access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Official expectations / EBA ICT risk guidelines",
          },
          {
            rank: "08",
            title:
              "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Official expectations / EBA outsourcing guidelines",
          },
          {
            rank: "09",
            title:
              "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
            href: "https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-report-dora-major-ict-related-incidents",
            meta: "Primary / ESAs (EBA, EIOPA, ESMA) / 2026-06-03",
          },
          {
            rank: "10",
            title:
              "Critical third-party policy turns technology concentration into a systemic resilience question",
            href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
            meta: "Official source / FCA critical third parties",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Technology failure matters when it moves from an internal incident into customer harm, regulatory exposure, market disruption, or evidence that recovery has not been tested.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as recoverability",
            paragraphs: [
              "A system can be up while a customer journey, payment flow, report, or control process is broken. The evidence test is the service outcome.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CTO, resilience, operations, product, compliance, and suppliers",
            paragraphs: [
              "The same failure can sit across change management, third-party risk, resilience, cyber, data, and customer communications.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Service maps, change records, logs, recovery tests, and communications",
            paragraphs: [
              "Good assurance shows the firm knows what failed, who was affected, how it recovered, and what control changed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Technology evidence checklist",
          title: "What the reader should ask for",
          description:
            "Technology-failure evidence should connect component events to service outcomes, owner decisions, recovery, and learning.",
        },
        deadlines: [
          {
            date: "Service",
            action:
              "Which important business services and customer journeys would fail if this technology failed?",
            owner: "Map",
          },
          {
            date: "Change",
            action:
              "What recent changes, releases, data loads, or access changes could explain the failure path?",
            owner: "Trace",
          },
          {
            date: "Recover",
            action:
              "What evidence proves backup, restore, failover, manual workaround, and communications work at volume?",
            owner: "Test",
          },
          {
            date: "Supplier",
            action:
              "Which cloud, processor, software, data, or network provider controls need evidence?",
            owner: "Assure",
          },
          {
            date: "Learn",
            action:
              "Which control owner, due date, and evidence artifact closes the post-incident action?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Technology failure in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and third-party risk.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when a failure pattern is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Standing source for important business services, impact tolerances, and evidence expectations.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "technology-failure / 2026-07-06",
    },
  },
  {
    route: "/signals/technology-failure/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "6aaa3f7a2ec2ecc7652ca6dea2b875547753d21c9aa0a918591dd05a32afa48b",
    metadata: {
      title: "Technology Failure Signals | The Virtual Officer",
      description:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphTitle: "Technology Failure Signals | The Virtual Officer",
      openGraphDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Technology Failure Signals | The Virtual Officer",
      twitterDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Technology Failure Signals",
        description:
          "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/technology-failure/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:6aaa3f7a2ec2ecc7652ca6dea2b875547753d21c9aa0a918591dd05a32afa48b:/signals/technology-failure/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "6aaa3f7a2ec2ecc7652ca6dea2b875547753d21c9aa0a918591dd05a32afa48b",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Technology failure",
        title: "Outages, change failure, data integrity, and recovery",
        dek: "The technology-failure page turns outages, cloud dependency, change risk, ICT incidents, and recovery expectations into practical control-evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 technology-failure signals",
        paragraphs: [
          "These items anchor the weekly read across resilience expectations, ICT incidents, cloud assurance, and recovery evidence.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/firms/operational-resilience",
              content:
                "Important business services need customer-visible outage and recovery evidence",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official expectations / FCA operational resilience",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
              content:
                "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official regulation / DORA / EUR-Lex",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/collection/cloud",
              content:
                "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC cloud",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more technology-failure signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the evidence trail behind incidents, change failure, third-party technology, resilience testing, and recovery.",
        },
        items: [
          {
            rank: "06",
            title: "Outsourced technology remains inside the firm's resilience accountability",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            meta: "Official expectations / FCA outsourcing and resilience",
          },
          {
            rank: "07",
            title:
              "ICT and security risk management should connect change, access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Official expectations / EBA ICT risk guidelines",
          },
          {
            rank: "08",
            title:
              "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Official expectations / EBA outsourcing guidelines",
          },
          {
            rank: "09",
            title: "DORA implementation keeps ICT third-party concentration and testing in scope",
            href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora",
            meta: "Official source / ESMA DORA",
          },
          {
            rank: "10",
            title:
              "Critical third-party policy turns technology concentration into a systemic resilience question",
            href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
            meta: "Official source / FCA critical third parties",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Technology failure matters when it moves from an internal incident into customer harm, regulatory exposure, market disruption, or evidence that recovery has not been tested.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as recoverability",
            paragraphs: [
              "A system can be up while a customer journey, payment flow, report, or control process is broken. The evidence test is the service outcome.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CTO, resilience, operations, product, compliance, and suppliers",
            paragraphs: [
              "The same failure can sit across change management, third-party risk, resilience, cyber, data, and customer communications.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Service maps, change records, logs, recovery tests, and communications",
            paragraphs: [
              "Good assurance shows the firm knows what failed, who was affected, how it recovered, and what control changed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "Technology-failure evidence should connect component events to service outcomes, owner decisions, recovery, and learning.",
        },
        deadlines: [
          {
            date: "Service",
            action:
              "Which important business services and customer journeys would fail if this technology failed?",
            owner: "Map",
          },
          {
            date: "Change",
            action:
              "What recent changes, releases, data loads, or access changes could explain the failure path?",
            owner: "Trace",
          },
          {
            date: "Recover",
            action:
              "What evidence proves backup, restore, failover, manual workaround, and communications work at volume?",
            owner: "Test",
          },
          {
            date: "Supplier",
            action:
              "Which cloud, processor, software, data, or network provider controls need evidence?",
            owner: "Assure",
          },
          {
            date: "Learn",
            action:
              "Which control owner, due date, and evidence artifact closes the post-incident action?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Technology failure in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and third-party risk.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when a failure pattern is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Standing source for important business services, impact tolerances, and evidence expectations.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "technology-failure / 2026-07-06",
      currentLabel: "technology-failure / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-70d440829512122d062062c6:2026-07-06",
          signalId: "signal:archive-url-70d440829512122d062062c6",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          implication:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          rank: 1,
          semanticHash: "7b2d7e7b0d08d574a0c03ff74025a5edada6a25cdc70a6bf69bc88656bb36b04",
          sourceIds: ["source:archive-url-70d440829512122d062062c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fdfe4749a1d10f83555dfb1:2026-07-06",
          signalId: "signal:archive-url-5fdfe4749a1d10f83555dfb1",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          implication:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          rank: 2,
          semanticHash: "3f01627a7290fe665dfdb43103aeaa050ee015c3d9336cbf054d1888d89de20a",
          sourceIds: ["source:archive-url-5fdfe4749a1d10f83555dfb1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8fa840d3dae3e52108ab40:2026-07-06",
          signalId: "signal:archive-url-bb8fa840d3dae3e52108ab40",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          implication:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          rank: 3,
          semanticHash: "122c788a39acdb37f842efa83705abbcefc58bdbd8bd26c8518093d0242a08ab",
          sourceIds: ["source:archive-url-bb8fa840d3dae3e52108ab40"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e82530ed9e18be90a534e235:2026-07-06",
          signalId: "signal:archive-url-e82530ed9e18be90a534e235",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          implication:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          rank: 4,
          semanticHash: "f798fb66a43d8adecece7d15301c62cf5b15521d06e43e7a515dce271c479eea",
          sourceIds: ["source:archive-url-e82530ed9e18be90a534e235"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ed79e547acd5ed79034d58e:2026-07-06",
          signalId: "signal:archive-url-5ed79e547acd5ed79034d58e",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          implication:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          rank: 5,
          semanticHash: "db80511c5046d4bad75122bc0ef085ca7ba58b090271fafdd29447fdc7eadbd4",
          sourceIds: ["source:archive-url-5ed79e547acd5ed79034d58e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8b9b8322582b543dc4319dd3:2026-07-06",
          signalId: "signal:archive-url-8b9b8322582b543dc4319dd3",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          implication:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          rank: 6,
          semanticHash: "998ccd749625b8a18a84784bf329e4b212d965187f6c913b935101029366b6ad",
          sourceIds: ["source:archive-url-8b9b8322582b543dc4319dd3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7276a317e4f4ec8ee06f29c8:2026-07-06",
          signalId: "signal:archive-url-7276a317e4f4ec8ee06f29c8",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title: "FCA operational resilience",
          implication: "FCA operational resilience",
          rank: 7,
          semanticHash: "b0ba1fd29a3a00c3bcef71f5ee4d09be87eb1d9ee61cbc927c49c9c3d2232f40",
          sourceIds: ["source:archive-url-7276a317e4f4ec8ee06f29c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8542cb2b20a3003d7354f3:2026-07-06",
          signalId: "signal:archive-url-bb8542cb2b20a3003d7354f3",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          implication:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          rank: 8,
          semanticHash: "eaf62d08ebf06b569d6b607bbb3d3522d88848da5878cdabd28fb257fe309a6e",
          sourceIds: ["source:archive-url-bb8542cb2b20a3003d7354f3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7d5f568f5164797ee70fc0f2:2026-07-06",
          signalId: "signal:archive-url-7d5f568f5164797ee70fc0f2",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          implication:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          rank: 9,
          semanticHash: "4058f903b829a71d804d26751d95158deaf82fe69d19d7d0260b72deefedcf00",
          sourceIds: ["source:archive-url-7d5f568f5164797ee70fc0f2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-38e42733ceb0e924534e3eea:2026-07-06",
          signalId: "signal:archive-url-38e42733ceb0e924534e3eea",
          editionId: "edition:authored-technology-failure:2026-07-06",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          implication:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          rank: 10,
          semanticHash: "014edf8f231c2232d0d7926cc026315f9f2d1a39b9d69252ae80463020af3273",
          sourceIds: ["source:archive-url-38e42733ceb0e924534e3eea"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-70d440829512122d062062c6:2026-07-08",
          signalId: "signal:archive-url-70d440829512122d062062c6",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          implication:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          rank: 1,
          semanticHash: "7b2d7e7b0d08d574a0c03ff74025a5edada6a25cdc70a6bf69bc88656bb36b04",
          sourceIds: ["source:archive-url-70d440829512122d062062c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fdfe4749a1d10f83555dfb1:2026-07-08",
          signalId: "signal:archive-url-5fdfe4749a1d10f83555dfb1",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          implication:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          rank: 2,
          semanticHash: "3f01627a7290fe665dfdb43103aeaa050ee015c3d9336cbf054d1888d89de20a",
          sourceIds: ["source:archive-url-5fdfe4749a1d10f83555dfb1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8fa840d3dae3e52108ab40:2026-07-08",
          signalId: "signal:archive-url-bb8fa840d3dae3e52108ab40",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          implication:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          rank: 3,
          semanticHash: "122c788a39acdb37f842efa83705abbcefc58bdbd8bd26c8518093d0242a08ab",
          sourceIds: ["source:archive-url-bb8fa840d3dae3e52108ab40"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e82530ed9e18be90a534e235:2026-07-08",
          signalId: "signal:archive-url-e82530ed9e18be90a534e235",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          implication:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          rank: 4,
          semanticHash: "f798fb66a43d8adecece7d15301c62cf5b15521d06e43e7a515dce271c479eea",
          sourceIds: ["source:archive-url-e82530ed9e18be90a534e235"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ed79e547acd5ed79034d58e:2026-07-08",
          signalId: "signal:archive-url-5ed79e547acd5ed79034d58e",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          implication:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          rank: 5,
          semanticHash: "db80511c5046d4bad75122bc0ef085ca7ba58b090271fafdd29447fdc7eadbd4",
          sourceIds: ["source:archive-url-5ed79e547acd5ed79034d58e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e2b1b32773198409e1149fb:2026-07-08",
          signalId: "signal:archive-url-5e2b1b32773198409e1149fb",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "DORA implementation keeps ICT third-party concentration and testing in scope",
          implication:
            "DORA implementation keeps ICT third-party concentration and testing in scope",
          rank: 6,
          semanticHash: "d3c57568d5dc2bc2d0cc3f45d9377ab99d347ecdaa569bb923185ed116c21b84",
          sourceIds: ["source:archive-url-5e2b1b32773198409e1149fb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7276a317e4f4ec8ee06f29c8:2026-07-08",
          signalId: "signal:archive-url-7276a317e4f4ec8ee06f29c8",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "Important business services need customer-visible outage and recovery evidence",
          implication:
            "Important business services need customer-visible outage and recovery evidence",
          rank: 7,
          semanticHash: "022d72948e63b10fb38235fa312473c5dd810ce7695889e056d7584159d5f269",
          sourceIds: ["source:archive-url-7276a317e4f4ec8ee06f29c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-918f0bbf303ce8bc7fa406a2:2026-07-08",
          signalId: "signal:archive-url-918f0bbf303ce8bc7fa406a2",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          implication: "Outsourced technology remains inside the firm's resilience accountability",
          rank: 8,
          semanticHash: "2f23ec1ef227a9bbc59278c528b924fb3c30c176cc63922f252f191ff6601a59",
          sourceIds: ["source:archive-url-918f0bbf303ce8bc7fa406a2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7d5f568f5164797ee70fc0f2:2026-07-08",
          signalId: "signal:archive-url-7d5f568f5164797ee70fc0f2",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          implication:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          rank: 9,
          semanticHash: "4058f903b829a71d804d26751d95158deaf82fe69d19d7d0260b72deefedcf00",
          sourceIds: ["source:archive-url-7d5f568f5164797ee70fc0f2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-38e42733ceb0e924534e3eea:2026-07-08",
          signalId: "signal:archive-url-38e42733ceb0e924534e3eea",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          implication:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          rank: 10,
          semanticHash: "014edf8f231c2232d0d7926cc026315f9f2d1a39b9d69252ae80463020af3273",
          sourceIds: ["source:archive-url-38e42733ceb0e924534e3eea"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-70d440829512122d062062c6",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5fdfe4749a1d10f83555dfb1",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb8fa840d3dae3e52108ab40",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e82530ed9e18be90a534e235",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ed79e547acd5ed79034d58e",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8b9b8322582b543dc4319dd3",
          title:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-report-dora-major-ict-related-incidents",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7276a317e4f4ec8ee06f29c8",
          title: "Important business services need customer-visible outage and recovery evidence",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb8542cb2b20a3003d7354f3",
          title:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7d5f568f5164797ee70fc0f2",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-38e42733ceb0e924534e3eea",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/cloud",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e2b1b32773198409e1149fb",
          title: "DORA implementation keeps ICT third-party concentration and testing in scope",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-918f0bbf303ce8bc7fa406a2",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/technology-failure/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "9827abdfa41f4527f0096830bd32c00457d568728e3b07d35abd8ac86b750505",
    metadata: {
      title: "Technology Failure Signals | The Virtual Officer",
      description:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      canonical: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphTitle: "Technology Failure Signals | The Virtual Officer",
      openGraphDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/technology-failure/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Technology Failure Signals | The Virtual Officer",
      twitterDescription:
        "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Technology Failure Signals",
        description:
          "Technology failure signals covering outages, change failure, cloud resilience, data recovery, DORA, and operational evidence.",
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
          "@id": "https://stgeorgesstrategy.com/signals/technology-failure/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:9827abdfa41f4527f0096830bd32c00457d568728e3b07d35abd8ac86b750505:/signals/technology-failure/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/technology-failure/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "9827abdfa41f4527f0096830bd32c00457d568728e3b07d35abd8ac86b750505",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Technology failure",
        title: "Outages, change failure, data integrity, and recovery",
        dek: "The technology-failure page turns outages, cloud dependency, change risk, ICT incidents, and recovery expectations into practical control-evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 technology-failure signals",
        paragraphs: [
          "These items anchor the weekly read across resilience expectations, ICT incidents, cloud assurance, and recovery evidence.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
              content:
                "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / Bank of England / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
              content:
                "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA / 2026-03-27",
            },
          ],
          [
            {
              kind: "link",
              href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
              content:
                "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official regulation / DORA / EUR-Lex",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.ncsc.gov.uk/collection/cloud",
              content:
                "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Official guidance / NCSC cloud",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more technology-failure signals",
          description:
            "The shortlist carries the leadership read. These supporting rows preserve the evidence trail behind incidents, change failure, third-party technology, resilience testing, and recovery.",
        },
        items: [
          {
            rank: "06",
            title:
              "Firms have invested in data vaulting and standby processing centres since the resilience deadline passed",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "07",
            title:
              "ICT and security risk management should connect change, access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Official expectations / EBA ICT risk guidelines",
          },
          {
            rank: "08",
            title:
              "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Official expectations / EBA outsourcing guidelines",
          },
          {
            rank: "09",
            title:
              "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
            href: "https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-report-dora-major-ict-related-incidents",
            meta: "Primary / ESAs (EBA, EIOPA, ESMA) / 2026-06-03",
          },
          {
            rank: "10",
            title:
              "Critical third-party policy turns technology concentration into a systemic resilience question",
            href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
            meta: "Official source / FCA critical third parties",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Technology failure matters when it moves from an internal incident into customer harm, regulatory exposure, market disruption, or evidence that recovery has not been tested.",
        },
        cards: [
          {
            meta: "So what",
            title: "Availability is not the same as recoverability",
            paragraphs: [
              "A system can be up while a customer journey, payment flow, report, or control process is broken. The evidence test is the service outcome.",
            ],
          },
          {
            meta: "Who cares",
            title: "COO, CIO, CTO, resilience, operations, product, compliance, and suppliers",
            paragraphs: [
              "The same failure can sit across change management, third-party risk, resilience, cyber, data, and customer communications.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Service maps, change records, logs, recovery tests, and communications",
            paragraphs: [
              "Good assurance shows the firm knows what failed, who was affected, how it recovered, and what control changed.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Technology evidence checklist",
          title: "What the reader should ask for",
          description:
            "Technology-failure evidence should connect component events to service outcomes, owner decisions, recovery, and learning.",
        },
        deadlines: [
          {
            date: "Service",
            action:
              "Which important business services and customer journeys would fail if this technology failed?",
            owner: "Map",
          },
          {
            date: "Change",
            action:
              "What recent changes, releases, data loads, or access changes could explain the failure path?",
            owner: "Trace",
          },
          {
            date: "Recover",
            action:
              "What evidence proves backup, restore, failover, manual workaround, and communications work at volume?",
            owner: "Test",
          },
          {
            date: "Supplier",
            action:
              "Which cloud, processor, software, data, or network provider controls need evidence?",
            owner: "Assure",
          },
          {
            date: "Learn",
            action:
              "Which control owner, due date, and evidence artifact closes the post-incident action?",
            owner: "Govern",
          },
        ],
      },
      archives: {
        cards: [
          {
            meta: "Signals hub",
            title: "Technology failure in the eight-stream map",
            href: "/signals/",
            paragraphs: [
              "Return to the cross-topic view and compare with cyber, data, resilience, and third-party risk.",
            ],
          },
          {
            meta: "Weekly brief",
            title: "Use when a failure pattern is the weekly so-what",
            href: "/brief/",
            paragraphs: ["Promote the strongest signal into the consolidated weekly issue."],
          },
          {
            meta: "Official baseline",
            title: "FCA operational resilience",
            href: "https://www.fca.org.uk/firms/operational-resilience",
            paragraphs: [
              "Standing source for important business services, impact tolerances, and evidence expectations.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "technology-failure / 2026-07-08",
      currentLabel: "technology-failure / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-70d440829512122d062062c6:2026-07-08",
          signalId: "signal:archive-url-70d440829512122d062062c6",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          implication:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          rank: 1,
          semanticHash: "7b2d7e7b0d08d574a0c03ff74025a5edada6a25cdc70a6bf69bc88656bb36b04",
          sourceIds: ["source:archive-url-70d440829512122d062062c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fdfe4749a1d10f83555dfb1:2026-07-08",
          signalId: "signal:archive-url-5fdfe4749a1d10f83555dfb1",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          implication:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          rank: 2,
          semanticHash: "3f01627a7290fe665dfdb43103aeaa050ee015c3d9336cbf054d1888d89de20a",
          sourceIds: ["source:archive-url-5fdfe4749a1d10f83555dfb1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8fa840d3dae3e52108ab40:2026-07-08",
          signalId: "signal:archive-url-bb8fa840d3dae3e52108ab40",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          implication:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          rank: 3,
          semanticHash: "122c788a39acdb37f842efa83705abbcefc58bdbd8bd26c8518093d0242a08ab",
          sourceIds: ["source:archive-url-bb8fa840d3dae3e52108ab40"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e82530ed9e18be90a534e235:2026-07-08",
          signalId: "signal:archive-url-e82530ed9e18be90a534e235",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          implication:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          rank: 4,
          semanticHash: "f798fb66a43d8adecece7d15301c62cf5b15521d06e43e7a515dce271c479eea",
          sourceIds: ["source:archive-url-e82530ed9e18be90a534e235"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ed79e547acd5ed79034d58e:2026-07-08",
          signalId: "signal:archive-url-5ed79e547acd5ed79034d58e",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          implication:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          rank: 5,
          semanticHash: "db80511c5046d4bad75122bc0ef085ca7ba58b090271fafdd29447fdc7eadbd4",
          sourceIds: ["source:archive-url-5ed79e547acd5ed79034d58e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e2b1b32773198409e1149fb:2026-07-08",
          signalId: "signal:archive-url-5e2b1b32773198409e1149fb",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "DORA implementation keeps ICT third-party concentration and testing in scope",
          implication:
            "DORA implementation keeps ICT third-party concentration and testing in scope",
          rank: 6,
          semanticHash: "d3c57568d5dc2bc2d0cc3f45d9377ab99d347ecdaa569bb923185ed116c21b84",
          sourceIds: ["source:archive-url-5e2b1b32773198409e1149fb"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7276a317e4f4ec8ee06f29c8:2026-07-08",
          signalId: "signal:archive-url-7276a317e4f4ec8ee06f29c8",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "Important business services need customer-visible outage and recovery evidence",
          implication:
            "Important business services need customer-visible outage and recovery evidence",
          rank: 7,
          semanticHash: "022d72948e63b10fb38235fa312473c5dd810ce7695889e056d7584159d5f269",
          sourceIds: ["source:archive-url-7276a317e4f4ec8ee06f29c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-918f0bbf303ce8bc7fa406a2:2026-07-08",
          signalId: "signal:archive-url-918f0bbf303ce8bc7fa406a2",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          implication: "Outsourced technology remains inside the firm's resilience accountability",
          rank: 8,
          semanticHash: "2f23ec1ef227a9bbc59278c528b924fb3c30c176cc63922f252f191ff6601a59",
          sourceIds: ["source:archive-url-918f0bbf303ce8bc7fa406a2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7d5f568f5164797ee70fc0f2:2026-07-08",
          signalId: "signal:archive-url-7d5f568f5164797ee70fc0f2",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          implication:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          rank: 9,
          semanticHash: "4058f903b829a71d804d26751d95158deaf82fe69d19d7d0260b72deefedcf00",
          sourceIds: ["source:archive-url-7d5f568f5164797ee70fc0f2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-38e42733ceb0e924534e3eea:2026-07-08",
          signalId: "signal:archive-url-38e42733ceb0e924534e3eea",
          editionId: "edition:authored-technology-failure:2026-07-08",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          implication:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          rank: 10,
          semanticHash: "014edf8f231c2232d0d7926cc026315f9f2d1a39b9d69252ae80463020af3273",
          sourceIds: ["source:archive-url-38e42733ceb0e924534e3eea"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-70d440829512122d062062c6:2026-07-09",
          signalId: "signal:archive-url-70d440829512122d062062c6",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          implication:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          rank: 1,
          semanticHash: "7b2d7e7b0d08d574a0c03ff74025a5edada6a25cdc70a6bf69bc88656bb36b04",
          sourceIds: ["source:archive-url-70d440829512122d062062c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5fdfe4749a1d10f83555dfb1:2026-07-09",
          signalId: "signal:archive-url-5fdfe4749a1d10f83555dfb1",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          implication:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          rank: 2,
          semanticHash: "3f01627a7290fe665dfdb43103aeaa050ee015c3d9336cbf054d1888d89de20a",
          sourceIds: ["source:archive-url-5fdfe4749a1d10f83555dfb1"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8fa840d3dae3e52108ab40:2026-07-09",
          signalId: "signal:archive-url-bb8fa840d3dae3e52108ab40",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          implication:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          rank: 3,
          semanticHash: "122c788a39acdb37f842efa83705abbcefc58bdbd8bd26c8518093d0242a08ab",
          sourceIds: ["source:archive-url-bb8fa840d3dae3e52108ab40"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e82530ed9e18be90a534e235:2026-07-09",
          signalId: "signal:archive-url-e82530ed9e18be90a534e235",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          implication:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          rank: 4,
          semanticHash: "f798fb66a43d8adecece7d15301c62cf5b15521d06e43e7a515dce271c479eea",
          sourceIds: ["source:archive-url-e82530ed9e18be90a534e235"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5ed79e547acd5ed79034d58e:2026-07-09",
          signalId: "signal:archive-url-5ed79e547acd5ed79034d58e",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          implication:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          rank: 5,
          semanticHash: "db80511c5046d4bad75122bc0ef085ca7ba58b090271fafdd29447fdc7eadbd4",
          sourceIds: ["source:archive-url-5ed79e547acd5ed79034d58e"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8b9b8322582b543dc4319dd3:2026-07-09",
          signalId: "signal:archive-url-8b9b8322582b543dc4319dd3",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          implication:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          rank: 6,
          semanticHash: "998ccd749625b8a18a84784bf329e4b212d965187f6c913b935101029366b6ad",
          sourceIds: ["source:archive-url-8b9b8322582b543dc4319dd3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7276a317e4f4ec8ee06f29c8:2026-07-09",
          signalId: "signal:archive-url-7276a317e4f4ec8ee06f29c8",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title: "FCA operational resilience",
          implication: "FCA operational resilience",
          rank: 7,
          semanticHash: "b0ba1fd29a3a00c3bcef71f5ee4d09be87eb1d9ee61cbc927c49c9c3d2232f40",
          sourceIds: ["source:archive-url-7276a317e4f4ec8ee06f29c8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bb8542cb2b20a3003d7354f3:2026-07-09",
          signalId: "signal:archive-url-bb8542cb2b20a3003d7354f3",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          implication:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          rank: 8,
          semanticHash: "eaf62d08ebf06b569d6b607bbb3d3522d88848da5878cdabd28fb257fe309a6e",
          sourceIds: ["source:archive-url-bb8542cb2b20a3003d7354f3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7d5f568f5164797ee70fc0f2:2026-07-09",
          signalId: "signal:archive-url-7d5f568f5164797ee70fc0f2",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          implication:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          rank: 9,
          semanticHash: "4058f903b829a71d804d26751d95158deaf82fe69d19d7d0260b72deefedcf00",
          sourceIds: ["source:archive-url-7d5f568f5164797ee70fc0f2"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-38e42733ceb0e924534e3eea:2026-07-09",
          signalId: "signal:archive-url-38e42733ceb0e924534e3eea",
          editionId: "edition:authored-technology-failure:2026-07-09",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          implication:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          rank: 10,
          semanticHash: "014edf8f231c2232d0d7926cc026315f9f2d1a39b9d69252ae80463020af3273",
          sourceIds: ["source:archive-url-38e42733ceb0e924534e3eea"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-70d440829512122d062062c6",
          title:
            "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5fdfe4749a1d10f83555dfb1",
          title:
            "Bank of England's July Financial Stability Report reassesses technology and third-party failure risk",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb8fa840d3dae3e52108ab40",
          title:
            "ICT and security risk management should connect change, access, monitoring, and continuity",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e82530ed9e18be90a534e235",
          title:
            "ESAs warn frontier AI models could accelerate exploitation of ICT weaknesses across the financial system",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5ed79e547acd5ed79034d58e",
          title:
            "Technology outsourcing needs exit, audit, data return, and subcontracting evidence",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e2b1b32773198409e1149fb",
          title: "DORA implementation keeps ICT third-party concentration and testing in scope",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7276a317e4f4ec8ee06f29c8",
          title: "FCA operational resilience",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-918f0bbf303ce8bc7fa406a2",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7d5f568f5164797ee70fc0f2",
          title:
            "Critical third-party policy turns technology concentration into a systemic resilience question",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-38e42733ceb0e924534e3eea",
          title:
            "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility",
          publisher: "ncsc.gov.uk",
          url: "https://www.ncsc.gov.uk/collection/cloud",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8b9b8322582b543dc4319dd3",
          title:
            "ESAs' first DORA incident report finds a third of major ICT incidents have cross-border impact",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esas-publish-first-report-dora-major-ict-related-incidents",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bb8542cb2b20a3003d7354f3",
          title:
            "FCA cites AWS, Azure, and Cloudflare outages as the plausible-scenario bar firms must test against",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/third-party/",
    status: 200,
    kind: "topic-dossier",
    archetype: "signal-topic",
    sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454",
    metadata: {
      title: "Third-Party Risk Signals | The Virtual Officer",
      description:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      canonical: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphTitle: "Third-Party Risk Signals | The Virtual Officer",
      openGraphDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Third-Party Risk Signals | The Virtual Officer",
      twitterDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Third-Party Risk Signals",
        description:
          "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
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
          "@id": "https://stgeorgesstrategy.com/signals/third-party/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:eafb3cddf1e840d30d50ce64e474d506cc67584eb0ef272a1e74807365f10988:/signals/third-party/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "eafb3cddf1e840d30d50ce64e474d506cc67584eb0ef272a1e74807365f10988",
      },
      {
        key: "live:7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454:/signals/third-party/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Third-party risk",
        title: "Dependencies that look internal when they fail",
        dek: "The exploded third-party page behind the weekly brief. It translates vendor, model-provider, cloud, processor, and outsourcing signals into ownership and evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 third-party signals",
        paragraphs: [
          "These are anchored in this week's source trail: model providers, payment processors, AI tooling, and official outsourcing expectations.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content: "Payment processors can define the customer's lived outage",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
              content: "Model providers should be governed like critical technology dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA critical third parties",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fsb.org/2025/10/fsb-outlines-next-steps-for-authorities-on-ai-monitoring/",
              content:
                "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FSB / 2025-10-10",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more third-party signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link external signals to the dependency questions they create for procurement, resilience, technology, and risk owners.",
        },
        items: [
          {
            rank: "06",
            title: "Agentic AI suppliers create permission and audit-log questions",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title:
              "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "08",
            title: "ICT risk governance should connect supplier access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Primary / EBA ICT risk guidelines",
          },
          {
            rank: "09",
            title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Primary / EBA outsourcing guidelines",
          },
          {
            rank: "10",
            title:
              "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
            href: "https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/",
            meta: "Primary / FSB / 2026-06-10",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Third-party risk matters when the external provider effectively becomes part of the firm's control environment, customer journey, or regulatory evidence base.",
        },
        cards: [
          {
            meta: "So what",
            title: "Outsourced does not mean externally owned",
            paragraphs: [
              "The customer, supervisor, and board will often experience a vendor failure as the firm's failure. The weekly brief should make that accountability visible.",
            ],
          },
          {
            meta: "Who cares",
            title:
              "Procurement, technology, resilience, legal, compliance, data, and business owners",
            paragraphs: [
              "Third-party risk cuts across contract terms, control assurance, incident response, data lineage, exit planning, and customer impact.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Criticality, ownership, concentration, control rights, and exit practicality",
            paragraphs: [
              "Good assurance should show who owns the dependency, what rights exist, what evidence is available, and how the firm would operate during failure.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Third-party evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives a third-party or resilience owner enough prompts to test the current evidence pack.",
        },
        deadlines: [
          {
            date: "Criticality",
            action:
              "Which providers support important business services, regulated activities, customer journeys, or produce evidence a regulator would ask for?",
            owner: "Map",
          },
          {
            date: "Owner",
            action:
              "Who is the accountable internal owner for each provider, and who owns the failure response?",
            owner: "Govern",
          },
          {
            date: "Rights",
            action:
              "Are audit, information, incident, data return, subcontracting, and exit rights contractually clear and practically usable?",
            owner: "Legal",
          },
          {
            date: "Evidence",
            action:
              "What evidence proves the provider's control is operating, and how fresh is it?",
            owner: "Assure",
          },
          {
            date: "Exit",
            action:
              "Could the firm exit, substitute, degrade gracefully, or operate manually within the tolerance window?",
            owner: "Recover",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Third-party risk is cumulative: the value comes from seeing repeated dependency patterns across providers, services, and regulatory expectations over time.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Processors, model providers, and AI tools",
            href: "/brief/",
            paragraphs: ["Included in weekly signals and control lessons."],
          },
          {
            meta: "Source trail",
            title: "Provider incidents, regulatory expectations, and assurance signals",
            href: "/brief/",
            paragraphs: [
              "The weekly brief carries the linked sources used to build this dependency view.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA outsourcing and resilience expectations",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            paragraphs: [
              "Use as the standing UK reference for accountability, criticality, and resilience evidence around material suppliers.",
            ],
          },
        ],
      },
    },
  },
  {
    route: "/signals/third-party/archive/2026-07-06/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454",
    metadata: {
      title: "Third-Party Risk Signals | The Virtual Officer",
      description:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      canonical: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphTitle: "Third-Party Risk Signals | The Virtual Officer",
      openGraphDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Third-Party Risk Signals | The Virtual Officer",
      twitterDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Third-Party Risk Signals",
        description:
          "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
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
          "@id": "https://stgeorgesstrategy.com/signals/third-party/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454:/signals/third-party/archive/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "7129230312c1833b2de3e92790e1ab429df31aedf51c73b11aadb2bb3f28f454",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Third-party risk",
        title: "Dependencies that look internal when they fail",
        dek: "The exploded third-party page behind the weekly brief. It translates vendor, model-provider, cloud, processor, and outsourcing signals into ownership and evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 third-party signals",
        paragraphs: [
          "These are anchored in this week's source trail: model providers, payment processors, AI tooling, and official outsourcing expectations.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content: "Payment processors can define the customer's lived outage",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
              content: "Model providers should be governed like critical technology dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA critical third parties",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fsb.org/2025/10/fsb-outlines-next-steps-for-authorities-on-ai-monitoring/",
              content:
                "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FSB / 2025-10-10",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more third-party signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link external signals to the dependency questions they create for procurement, resilience, technology, and risk owners.",
        },
        items: [
          {
            rank: "06",
            title: "Agentic AI suppliers create permission and audit-log questions",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title:
              "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "08",
            title: "ICT risk governance should connect supplier access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Primary / EBA ICT risk guidelines",
          },
          {
            rank: "09",
            title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Primary / EBA outsourcing guidelines",
          },
          {
            rank: "10",
            title:
              "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
            href: "https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/",
            meta: "Primary / FSB / 2026-06-10",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Third-party risk matters when the external provider effectively becomes part of the firm's control environment, customer journey, or regulatory evidence base.",
        },
        cards: [
          {
            meta: "So what",
            title: "Outsourced does not mean externally owned",
            paragraphs: [
              "The customer, supervisor, and board will often experience a vendor failure as the firm's failure. The weekly brief should make that accountability visible.",
            ],
          },
          {
            meta: "Who cares",
            title:
              "Procurement, technology, resilience, legal, compliance, data, and business owners",
            paragraphs: [
              "Third-party risk cuts across contract terms, control assurance, incident response, data lineage, exit planning, and customer impact.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Criticality, ownership, concentration, control rights, and exit practicality",
            paragraphs: [
              "Good assurance should show who owns the dependency, what rights exist, what evidence is available, and how the firm would operate during failure.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Third-party evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives a third-party or resilience owner enough prompts to test the current evidence pack.",
        },
        deadlines: [
          {
            date: "Criticality",
            action:
              "Which providers support important business services, regulated activities, customer journeys, or produce evidence a regulator would ask for?",
            owner: "Map",
          },
          {
            date: "Owner",
            action:
              "Who is the accountable internal owner for each provider, and who owns the failure response?",
            owner: "Govern",
          },
          {
            date: "Rights",
            action:
              "Are audit, information, incident, data return, subcontracting, and exit rights contractually clear and practically usable?",
            owner: "Legal",
          },
          {
            date: "Evidence",
            action:
              "What evidence proves the provider's control is operating, and how fresh is it?",
            owner: "Assure",
          },
          {
            date: "Exit",
            action:
              "Could the firm exit, substitute, degrade gracefully, or operate manually within the tolerance window?",
            owner: "Recover",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Third-party risk is cumulative: the value comes from seeing repeated dependency patterns across providers, services, and regulatory expectations over time.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Processors, model providers, and AI tools",
            href: "/brief/",
            paragraphs: ["Included in weekly signals and control lessons."],
          },
          {
            meta: "Source trail",
            title: "Provider incidents, regulatory expectations, and assurance signals",
            href: "/brief/",
            paragraphs: [
              "The weekly brief carries the linked sources used to build this dependency view.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA outsourcing and resilience expectations",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            paragraphs: [
              "Use as the standing UK reference for accountability, criticality, and resilience evidence around material suppliers.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "third-party / 2026-07-06",
    },
  },
  {
    route: "/signals/third-party/archive/2026-07-08/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "b99d1fd1f605192b6e1cbcd47d11c75b45b0cd857d5b3280103747dcbb5a38be",
    metadata: {
      title: "Third-Party Risk Signals | The Virtual Officer",
      description:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      canonical: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphTitle: "Third-Party Risk Signals | The Virtual Officer",
      openGraphDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Third-Party Risk Signals | The Virtual Officer",
      twitterDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Third-Party Risk Signals",
        description:
          "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
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
          "@id": "https://stgeorgesstrategy.com/signals/third-party/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:b99d1fd1f605192b6e1cbcd47d11c75b45b0cd857d5b3280103747dcbb5a38be:/signals/third-party/archive/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "b99d1fd1f605192b6e1cbcd47d11c75b45b0cd857d5b3280103747dcbb5a38be",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Third-party risk",
        title: "Dependencies that look internal when they fail",
        dek: "The exploded third-party page behind the weekly brief. It translates vendor, model-provider, cloud, processor, and outsourcing signals into ownership and evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 third-party signals",
        paragraphs: [
          "These are anchored in this week's source trail: model providers, payment processors, AI tooling, and official outsourcing expectations.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content: "Payment processors can define the customer's lived outage",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
              content: "Model providers should be governed like critical technology dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA critical third parties",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
              content: "Contractual audit rights need evidence that they can be exercised",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA outsourcing guidelines",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more third-party signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link external signals to the dependency questions they create for procurement, resilience, technology, and risk owners.",
        },
        items: [
          {
            rank: "06",
            title: "Agentic AI suppliers create permission and audit-log questions",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title: "Outsourced technology remains inside the firm's resilience accountability",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            meta: "Primary / FCA outsourcing and resilience",
          },
          {
            rank: "08",
            title: "ICT risk governance should connect supplier access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Primary / EBA ICT risk guidelines",
          },
          {
            rank: "09",
            title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Primary / EBA outsourcing guidelines",
          },
          {
            rank: "10",
            title: "Concentration risk should be aggregated across business lines",
            href: "https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/",
            meta: "Primary / FSB financial innovation",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Third-party risk matters when the external provider effectively becomes part of the firm's control environment, customer journey, or regulatory evidence base.",
        },
        cards: [
          {
            meta: "So what",
            title: "Outsourced does not mean externally owned",
            paragraphs: [
              "The customer, supervisor, and board will often experience a vendor failure as the firm's failure. The weekly brief should make that accountability visible.",
            ],
          },
          {
            meta: "Who cares",
            title:
              "Procurement, technology, resilience, legal, compliance, data, and business owners",
            paragraphs: [
              "Third-party risk cuts across contract terms, control assurance, incident response, data lineage, exit planning, and customer impact.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Criticality, ownership, concentration, control rights, and exit practicality",
            paragraphs: [
              "Good assurance should show who owns the dependency, what rights exist, what evidence is available, and how the firm would operate during failure.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Control evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives a third-party or resilience owner enough prompts to test the current evidence pack.",
        },
        deadlines: [
          {
            date: "Criticality",
            action:
              "Which providers support important business services, regulated activities, customer journeys, or control evidence?",
            owner: "Map",
          },
          {
            date: "Owner",
            action:
              "Who is the accountable internal owner for each provider, and who owns the failure response?",
            owner: "Govern",
          },
          {
            date: "Rights",
            action:
              "Are audit, information, incident, data return, subcontracting, and exit rights contractually clear and practically usable?",
            owner: "Legal",
          },
          {
            date: "Evidence",
            action:
              "What evidence proves the provider's control is operating, and how fresh is it?",
            owner: "Assure",
          },
          {
            date: "Exit",
            action:
              "Could the firm exit, substitute, degrade gracefully, or operate manually within the tolerance window?",
            owner: "Recover",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Third-party risk is cumulative: the value comes from seeing repeated dependency patterns across providers, services, and regulatory expectations over time.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Processors, model providers, and AI tools",
            href: "/brief/",
            paragraphs: ["Included in weekly signals and control lessons."],
          },
          {
            meta: "Source trail",
            title: "Provider incidents, regulatory expectations, and assurance signals",
            href: "/brief/",
            paragraphs: [
              "The weekly brief carries the linked sources used to build this dependency view.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA outsourcing and resilience expectations",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            paragraphs: [
              "Use as the standing UK reference for accountability, criticality, and resilience evidence around material suppliers.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "third-party / 2026-07-06",
      currentLabel: "third-party / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-92a751668a65e8519cd98152:2026-07-06",
          signalId: "signal:archive-url-92a751668a65e8519cd98152",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          implication:
            "ICT risk governance should connect supplier access, monitoring, and continuity",
          rank: 1,
          semanticHash: "57ac0ea3f235bf439ba1497440ee056a812fca7e17502ea837a620c28adbc51f",
          sourceIds: ["source:archive-url-92a751668a65e8519cd98152"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-cddbd5e7d297cd6b97207fb7:2026-07-06",
          signalId: "signal:archive-url-cddbd5e7d297cd6b97207fb7",
          editionId: "edition:authored-third-party:2026-07-06",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          implication:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          rank: 2,
          semanticHash: "14e9eee454900e870bbd4ee2bbc9f94dd4f7d12b8d360f9dce6d65288f38e206",
          sourceIds: ["source:archive-url-cddbd5e7d297cd6b97207fb7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bfcd858ae4d48ad3e35a8ff7:2026-07-06",
          signalId: "signal:archive-url-bfcd858ae4d48ad3e35a8ff7",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
          implication: "Material outsourcing still needs audit, subcontracting, and exit evidence",
          rank: 3,
          semanticHash: "c3c23dc96ad983de539178a49ca0dbf69cbd0a2b79bb1012c3b0de280700dee0",
          sourceIds: ["source:archive-url-bfcd858ae4d48ad3e35a8ff7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-00f4cce6d1eee1f42d14c970:2026-07-06",
          signalId: "signal:archive-url-00f4cce6d1eee1f42d14c970",
          editionId: "edition:authored-third-party:2026-07-06",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          implication:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          rank: 4,
          semanticHash: "c986b3b5340306a7f4f9579e02e756c3982ea6b217ed9c0c0d4ef9df90cc907b",
          sourceIds: ["source:archive-url-00f4cce6d1eee1f42d14c970"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2c3acd612419ebdf7616f575:2026-07-06",
          signalId: "signal:archive-url-2c3acd612419ebdf7616f575",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "FCA outsourcing and resilience expectations",
          implication: "FCA outsourcing and resilience expectations",
          rank: 5,
          semanticHash: "6560f8f6ae4c71da09f6134c58db1b642d9d85d9209a4ef03cbe47a2ba78b896",
          sourceIds: ["source:archive-url-2c3acd612419ebdf7616f575"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c8bb27a6dae2f95d95788b3:2026-07-06",
          signalId: "signal:archive-url-3c8bb27a6dae2f95d95788b3",
          editionId: "edition:authored-third-party:2026-07-06",
          title:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          implication:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          rank: 6,
          semanticHash: "67a192b26bb9f13e3bd194fb4d8e2e25c269174579c9c6dbaab6852d0aaf500d",
          sourceIds: ["source:archive-url-3c8bb27a6dae2f95d95788b3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c2c6f564694c6a8ac1b5ad6b:2026-07-06",
          signalId: "signal:archive-url-c2c6f564694c6a8ac1b5ad6b",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "Model providers should be governed like critical technology dependencies",
          implication: "Model providers should be governed like critical technology dependencies",
          rank: 7,
          semanticHash: "f6f556d99ef4b98a47c5d996dc6bf823bd0920d95c3d5ca96e9a744f7cf042fb",
          sourceIds: ["source:archive-url-c2c6f564694c6a8ac1b5ad6b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0c57ea401ed9af253c77697c:2026-07-06",
          signalId: "signal:archive-url-0c57ea401ed9af253c77697c",
          editionId: "edition:authored-third-party:2026-07-06",
          title:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          implication:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          rank: 8,
          semanticHash: "bdac42e3c53e0b10c7879e2bf96c9199f2f56d22a8237dae9c4005e4a4854a16",
          sourceIds: ["source:archive-url-0c57ea401ed9af253c77697c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-17326efc4e25b670bdca9fa7:2026-07-06",
          signalId: "signal:archive-url-17326efc4e25b670bdca9fa7",
          editionId: "edition:authored-third-party:2026-07-06",
          title:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          implication:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          rank: 9,
          semanticHash: "dd7564d64d5e20232b0f500b390b9f9e8175776d60cd42a42bf124c6b902099d",
          sourceIds: ["source:archive-url-17326efc4e25b670bdca9fa7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d9cfab1b5040aaee03dfcf35:2026-07-06",
          signalId: "signal:archive-url-d9cfab1b5040aaee03dfcf35",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "Agentic AI suppliers create permission and audit-log questions",
          implication: "Agentic AI suppliers create permission and audit-log questions",
          rank: 10,
          semanticHash: "7d9b5a37b7a0796a735a329d0f6f07ff198e47ea042ca4899f870ea5dd61d008",
          sourceIds: ["source:archive-url-d9cfab1b5040aaee03dfcf35"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9739da46988178bc60e57be5:2026-07-06",
          signalId: "signal:archive-url-9739da46988178bc60e57be5",
          editionId: "edition:authored-third-party:2026-07-06",
          title: "Payment processors can define the customer's lived outage",
          implication: "Payment processors can define the customer's lived outage",
          rank: 11,
          semanticHash: "d67cfe39e0996f7c34911f3f6a90428ba8afd55dd00f2a4f8692fd6c39ad5a9c",
          sourceIds: ["source:archive-url-9739da46988178bc60e57be5"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-92a751668a65e8519cd98152:2026-07-08",
          signalId: "signal:archive-url-92a751668a65e8519cd98152",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          implication:
            "ICT risk governance should connect supplier access, monitoring, and continuity",
          rank: 1,
          semanticHash: "57ac0ea3f235bf439ba1497440ee056a812fca7e17502ea837a620c28adbc51f",
          sourceIds: ["source:archive-url-92a751668a65e8519cd98152"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-cddbd5e7d297cd6b97207fb7:2026-07-08",
          signalId: "signal:archive-url-cddbd5e7d297cd6b97207fb7",
          editionId: "edition:authored-third-party:2026-07-08",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          implication:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          rank: 2,
          semanticHash: "14e9eee454900e870bbd4ee2bbc9f94dd4f7d12b8d360f9dce6d65288f38e206",
          sourceIds: ["source:archive-url-cddbd5e7d297cd6b97207fb7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bfcd858ae4d48ad3e35a8ff7:2026-07-08",
          signalId: "signal:archive-url-bfcd858ae4d48ad3e35a8ff7",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Contractual audit rights need evidence that they can be exercised",
          implication: "Contractual audit rights need evidence that they can be exercised",
          rank: 3,
          semanticHash: "fbf8039f88b98843cae19af978ddb04884ab7837245fd2025d2a5430cb04d15a",
          sourceIds: ["source:archive-url-bfcd858ae4d48ad3e35a8ff7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-00f4cce6d1eee1f42d14c970:2026-07-08",
          signalId: "signal:archive-url-00f4cce6d1eee1f42d14c970",
          editionId: "edition:authored-third-party:2026-07-08",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          implication:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          rank: 4,
          semanticHash: "c986b3b5340306a7f4f9579e02e756c3982ea6b217ed9c0c0d4ef9df90cc907b",
          sourceIds: ["source:archive-url-00f4cce6d1eee1f42d14c970"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2c3acd612419ebdf7616f575:2026-07-08",
          signalId: "signal:archive-url-2c3acd612419ebdf7616f575",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          implication: "Outsourced technology remains inside the firm's resilience accountability",
          rank: 5,
          semanticHash: "2f23ec1ef227a9bbc59278c528b924fb3c30c176cc63922f252f191ff6601a59",
          sourceIds: ["source:archive-url-2c3acd612419ebdf7616f575"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c2c6f564694c6a8ac1b5ad6b:2026-07-08",
          signalId: "signal:archive-url-c2c6f564694c6a8ac1b5ad6b",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Model providers should be governed like critical technology dependencies",
          implication: "Model providers should be governed like critical technology dependencies",
          rank: 6,
          semanticHash: "f6f556d99ef4b98a47c5d996dc6bf823bd0920d95c3d5ca96e9a744f7cf042fb",
          sourceIds: ["source:archive-url-c2c6f564694c6a8ac1b5ad6b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-722a8143ef3c81b9450daf47:2026-07-08",
          signalId: "signal:archive-url-722a8143ef3c81b9450daf47",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Concentration risk should be aggregated across business lines",
          implication: "Concentration risk should be aggregated across business lines",
          rank: 7,
          semanticHash: "d41950ac67509ba586af134f6bf1380f194035a7e75a0560c528198504312e20",
          sourceIds: ["source:archive-url-722a8143ef3c81b9450daf47"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d9cfab1b5040aaee03dfcf35:2026-07-08",
          signalId: "signal:archive-url-d9cfab1b5040aaee03dfcf35",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Agentic AI suppliers create permission and audit-log questions",
          implication: "Agentic AI suppliers create permission and audit-log questions",
          rank: 8,
          semanticHash: "7d9b5a37b7a0796a735a329d0f6f07ff198e47ea042ca4899f870ea5dd61d008",
          sourceIds: ["source:archive-url-d9cfab1b5040aaee03dfcf35"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9739da46988178bc60e57be5:2026-07-08",
          signalId: "signal:archive-url-9739da46988178bc60e57be5",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Payment processors can define the customer's lived outage",
          implication: "Payment processors can define the customer's lived outage",
          rank: 9,
          semanticHash: "d67cfe39e0996f7c34911f3f6a90428ba8afd55dd00f2a4f8692fd6c39ad5a9c",
          sourceIds: ["source:archive-url-9739da46988178bc60e57be5"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-92a751668a65e8519cd98152",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-cddbd5e7d297cd6b97207fb7",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bfcd858ae4d48ad3e35a8ff7",
          title: "Contractual audit rights need evidence that they can be exercised",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-00f4cce6d1eee1f42d14c970",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2c3acd612419ebdf7616f575",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3c8bb27a6dae2f95d95788b3",
          title:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-c2c6f564694c6a8ac1b5ad6b",
          title: "Model providers should be governed like critical technology dependencies",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0c57ea401ed9af253c77697c",
          title:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          publisher: "fsb.org",
          url: "https://www.fsb.org/2025/10/fsb-outlines-next-steps-for-authorities-on-ai-monitoring/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-17326efc4e25b670bdca9fa7",
          title:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          publisher: "fsb.org",
          url: "https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d9cfab1b5040aaee03dfcf35",
          title: "Agentic AI suppliers create permission and audit-log questions",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9739da46988178bc60e57be5",
          title: "Payment processors can define the customer's lived outage",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-722a8143ef3c81b9450daf47",
          title: "Concentration risk should be aggregated across business lines",
          publisher: "fsb.org",
          url: "https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/signals/third-party/archive/2026-07-09/",
    status: 200,
    kind: "topic-dossier",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "eafb3cddf1e840d30d50ce64e474d506cc67584eb0ef272a1e74807365f10988",
    metadata: {
      title: "Third-Party Risk Signals | The Virtual Officer",
      description:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      canonical: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphTitle: "Third-Party Risk Signals | The Virtual Officer",
      openGraphDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/third-party/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Third-Party Risk Signals | The Virtual Officer",
      twitterDescription:
        "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Third-Party Risk Signals",
        description:
          "Third-party risk signals covering model providers, processors, cloud and network dependencies, outsourcing evidence, and vendor assurance.",
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
          "@id": "https://stgeorgesstrategy.com/signals/third-party/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:eafb3cddf1e840d30d50ce64e474d506cc67584eb0ef272a1e74807365f10988:/signals/third-party/archive/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/third-party/archive/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "eafb3cddf1e840d30d50ce64e474d506cc67584eb0ef272a1e74807365f10988",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals / Third-party risk",
        title: "Dependencies that look internal when they fail",
        dek: "The exploded third-party page behind the weekly brief. It translates vendor, model-provider, cloud, processor, and outsourcing signals into ownership and evidence questions.",
      },
      sourcePanel: {
        meta: "This week",
        title: "Top 5 third-party signals",
        paragraphs: [
          "These are anchored in this week's source trail: model providers, payment processors, AI tooling, and official outsourcing expectations.",
        ],
        items: [
          [
            {
              kind: "link",
              href: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
              content:
                "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / ESMA / 2026-07-08",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
              content:
                "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / EBA / 2026-07-07",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
              content: "Payment processors can define the customer's lived outage",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Monitoring / Guardian / 2026-06-23",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
              content: "Model providers should be governed like critical technology dependencies",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FCA critical third parties",
            },
          ],
          [
            {
              kind: "link",
              href: "https://www.fsb.org/2025/10/fsb-outlines-next-steps-for-authorities-on-ai-monitoring/",
              content:
                "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
            },
            {
              kind: "label",
              role: "top-source",
              content: "Primary / FSB / 2025-10-10",
            },
          ],
        ],
      },
      evidence: {
        heading: {
          eyebrow: "Supporting evidence",
          title: "Five more third-party signals",
          description:
            "The shortlist above carries the leadership read. These five more rows link external signals to the dependency questions they create for procurement, resilience, technology, and risk owners.",
        },
        items: [
          {
            rank: "06",
            title: "Agentic AI suppliers create permission and audit-log questions",
            href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
            meta: "Monitoring / Financial Times / 2026-06-30",
          },
          {
            rank: "07",
            title:
              "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
            href: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
            meta: "Primary / FCA / 2026-03-27",
          },
          {
            rank: "08",
            title: "ICT risk governance should connect supplier access, monitoring, and continuity",
            href: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
            meta: "Primary / EBA ICT risk guidelines",
          },
          {
            rank: "09",
            title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
            href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
            meta: "Primary / EBA outsourcing guidelines",
          },
          {
            rank: "10",
            title:
              "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
            href: "https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/",
            meta: "Primary / FSB / 2026-06-10",
          },
        ],
      },
      judgements: {
        heading: {
          eyebrow: "Why it made the weekly brief",
          title: "The editorial judgement",
          description:
            "Third-party risk matters when the external provider effectively becomes part of the firm's control environment, customer journey, or regulatory evidence base.",
        },
        cards: [
          {
            meta: "So what",
            title: "Outsourced does not mean externally owned",
            paragraphs: [
              "The customer, supervisor, and board will often experience a vendor failure as the firm's failure. The weekly brief should make that accountability visible.",
            ],
          },
          {
            meta: "Who cares",
            title:
              "Procurement, technology, resilience, legal, compliance, data, and business owners",
            paragraphs: [
              "Third-party risk cuts across contract terms, control assurance, incident response, data lineage, exit planning, and customer impact.",
            ],
          },
          {
            meta: "Evidence needed",
            title: "Criticality, ownership, concentration, control rights, and exit practicality",
            paragraphs: [
              "Good assurance should show who owns the dependency, what rights exist, what evidence is available, and how the firm would operate during failure.",
            ],
          },
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Third-party evidence checklist",
          title: "What the reader should ask for",
          description:
            "This checklist gives a third-party or resilience owner enough prompts to test the current evidence pack.",
        },
        deadlines: [
          {
            date: "Criticality",
            action:
              "Which providers support important business services, regulated activities, customer journeys, or produce evidence a regulator would ask for?",
            owner: "Map",
          },
          {
            date: "Owner",
            action:
              "Who is the accountable internal owner for each provider, and who owns the failure response?",
            owner: "Govern",
          },
          {
            date: "Rights",
            action:
              "Are audit, information, incident, data return, subcontracting, and exit rights contractually clear and practically usable?",
            owner: "Legal",
          },
          {
            date: "Evidence",
            action:
              "What evidence proves the provider's control is operating, and how fresh is it?",
            owner: "Assure",
          },
          {
            date: "Exit",
            action:
              "Could the firm exit, substitute, degrade gracefully, or operate manually within the tolerance window?",
            owner: "Recover",
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Archive and source trail",
          title: "How this topic should compound over time",
          description:
            "Third-party risk is cumulative: the value comes from seeing repeated dependency patterns across providers, services, and regulatory expectations over time.",
        },
        cards: [
          {
            meta: "Week of 1 Jul 2026",
            title: "Processors, model providers, and AI tools",
            href: "/brief/",
            paragraphs: ["Included in weekly signals and control lessons."],
          },
          {
            meta: "Source trail",
            title: "Provider incidents, regulatory expectations, and assurance signals",
            href: "/brief/",
            paragraphs: [
              "The weekly brief carries the linked sources used to build this dependency view.",
            ],
          },
          {
            meta: "Official baseline",
            title: "FCA outsourcing and resilience expectations",
            href: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
            paragraphs: [
              "Use as the standing UK reference for accountability, criticality, and resilience evidence around material suppliers.",
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "third-party / 2026-07-08",
      currentLabel: "third-party / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-92a751668a65e8519cd98152:2026-07-08",
          signalId: "signal:archive-url-92a751668a65e8519cd98152",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          implication:
            "ICT risk governance should connect supplier access, monitoring, and continuity",
          rank: 1,
          semanticHash: "57ac0ea3f235bf439ba1497440ee056a812fca7e17502ea837a620c28adbc51f",
          sourceIds: ["source:archive-url-92a751668a65e8519cd98152"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-cddbd5e7d297cd6b97207fb7:2026-07-08",
          signalId: "signal:archive-url-cddbd5e7d297cd6b97207fb7",
          editionId: "edition:authored-third-party:2026-07-08",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          implication:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          rank: 2,
          semanticHash: "14e9eee454900e870bbd4ee2bbc9f94dd4f7d12b8d360f9dce6d65288f38e206",
          sourceIds: ["source:archive-url-cddbd5e7d297cd6b97207fb7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bfcd858ae4d48ad3e35a8ff7:2026-07-08",
          signalId: "signal:archive-url-bfcd858ae4d48ad3e35a8ff7",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Contractual audit rights need evidence that they can be exercised",
          implication: "Contractual audit rights need evidence that they can be exercised",
          rank: 3,
          semanticHash: "fbf8039f88b98843cae19af978ddb04884ab7837245fd2025d2a5430cb04d15a",
          sourceIds: ["source:archive-url-bfcd858ae4d48ad3e35a8ff7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-00f4cce6d1eee1f42d14c970:2026-07-08",
          signalId: "signal:archive-url-00f4cce6d1eee1f42d14c970",
          editionId: "edition:authored-third-party:2026-07-08",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          implication:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          rank: 4,
          semanticHash: "c986b3b5340306a7f4f9579e02e756c3982ea6b217ed9c0c0d4ef9df90cc907b",
          sourceIds: ["source:archive-url-00f4cce6d1eee1f42d14c970"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2c3acd612419ebdf7616f575:2026-07-08",
          signalId: "signal:archive-url-2c3acd612419ebdf7616f575",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Outsourced technology remains inside the firm's resilience accountability",
          implication: "Outsourced technology remains inside the firm's resilience accountability",
          rank: 5,
          semanticHash: "2f23ec1ef227a9bbc59278c528b924fb3c30c176cc63922f252f191ff6601a59",
          sourceIds: ["source:archive-url-2c3acd612419ebdf7616f575"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c2c6f564694c6a8ac1b5ad6b:2026-07-08",
          signalId: "signal:archive-url-c2c6f564694c6a8ac1b5ad6b",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Model providers should be governed like critical technology dependencies",
          implication: "Model providers should be governed like critical technology dependencies",
          rank: 6,
          semanticHash: "f6f556d99ef4b98a47c5d996dc6bf823bd0920d95c3d5ca96e9a744f7cf042fb",
          sourceIds: ["source:archive-url-c2c6f564694c6a8ac1b5ad6b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-722a8143ef3c81b9450daf47:2026-07-08",
          signalId: "signal:archive-url-722a8143ef3c81b9450daf47",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Concentration risk should be aggregated across business lines",
          implication: "Concentration risk should be aggregated across business lines",
          rank: 7,
          semanticHash: "d41950ac67509ba586af134f6bf1380f194035a7e75a0560c528198504312e20",
          sourceIds: ["source:archive-url-722a8143ef3c81b9450daf47"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d9cfab1b5040aaee03dfcf35:2026-07-08",
          signalId: "signal:archive-url-d9cfab1b5040aaee03dfcf35",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Agentic AI suppliers create permission and audit-log questions",
          implication: "Agentic AI suppliers create permission and audit-log questions",
          rank: 8,
          semanticHash: "7d9b5a37b7a0796a735a329d0f6f07ff198e47ea042ca4899f870ea5dd61d008",
          sourceIds: ["source:archive-url-d9cfab1b5040aaee03dfcf35"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9739da46988178bc60e57be5:2026-07-08",
          signalId: "signal:archive-url-9739da46988178bc60e57be5",
          editionId: "edition:authored-third-party:2026-07-08",
          title: "Payment processors can define the customer's lived outage",
          implication: "Payment processors can define the customer's lived outage",
          rank: 9,
          semanticHash: "d67cfe39e0996f7c34911f3f6a90428ba8afd55dd00f2a4f8692fd6c39ad5a9c",
          sourceIds: ["source:archive-url-9739da46988178bc60e57be5"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-92a751668a65e8519cd98152:2026-07-09",
          signalId: "signal:archive-url-92a751668a65e8519cd98152",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          implication:
            "ICT risk governance should connect supplier access, monitoring, and continuity",
          rank: 1,
          semanticHash: "57ac0ea3f235bf439ba1497440ee056a812fca7e17502ea837a620c28adbc51f",
          sourceIds: ["source:archive-url-92a751668a65e8519cd98152"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-cddbd5e7d297cd6b97207fb7:2026-07-09",
          signalId: "signal:archive-url-cddbd5e7d297cd6b97207fb7",
          editionId: "edition:authored-third-party:2026-07-09",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          implication:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          rank: 2,
          semanticHash: "14e9eee454900e870bbd4ee2bbc9f94dd4f7d12b8d360f9dce6d65288f38e206",
          sourceIds: ["source:archive-url-cddbd5e7d297cd6b97207fb7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-bfcd858ae4d48ad3e35a8ff7:2026-07-09",
          signalId: "signal:archive-url-bfcd858ae4d48ad3e35a8ff7",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
          implication: "Material outsourcing still needs audit, subcontracting, and exit evidence",
          rank: 3,
          semanticHash: "c3c23dc96ad983de539178a49ca0dbf69cbd0a2b79bb1012c3b0de280700dee0",
          sourceIds: ["source:archive-url-bfcd858ae4d48ad3e35a8ff7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-00f4cce6d1eee1f42d14c970:2026-07-09",
          signalId: "signal:archive-url-00f4cce6d1eee1f42d14c970",
          editionId: "edition:authored-third-party:2026-07-09",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          implication:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          rank: 4,
          semanticHash: "c986b3b5340306a7f4f9579e02e756c3982ea6b217ed9c0c0d4ef9df90cc907b",
          sourceIds: ["source:archive-url-00f4cce6d1eee1f42d14c970"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-2c3acd612419ebdf7616f575:2026-07-09",
          signalId: "signal:archive-url-2c3acd612419ebdf7616f575",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "FCA outsourcing and resilience expectations",
          implication: "FCA outsourcing and resilience expectations",
          rank: 5,
          semanticHash: "6560f8f6ae4c71da09f6134c58db1b642d9d85d9209a4ef03cbe47a2ba78b896",
          sourceIds: ["source:archive-url-2c3acd612419ebdf7616f575"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3c8bb27a6dae2f95d95788b3:2026-07-09",
          signalId: "signal:archive-url-3c8bb27a6dae2f95d95788b3",
          editionId: "edition:authored-third-party:2026-07-09",
          title:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          implication:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          rank: 6,
          semanticHash: "67a192b26bb9f13e3bd194fb4d8e2e25c269174579c9c6dbaab6852d0aaf500d",
          sourceIds: ["source:archive-url-3c8bb27a6dae2f95d95788b3"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-c2c6f564694c6a8ac1b5ad6b:2026-07-09",
          signalId: "signal:archive-url-c2c6f564694c6a8ac1b5ad6b",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "Model providers should be governed like critical technology dependencies",
          implication: "Model providers should be governed like critical technology dependencies",
          rank: 7,
          semanticHash: "f6f556d99ef4b98a47c5d996dc6bf823bd0920d95c3d5ca96e9a744f7cf042fb",
          sourceIds: ["source:archive-url-c2c6f564694c6a8ac1b5ad6b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0c57ea401ed9af253c77697c:2026-07-09",
          signalId: "signal:archive-url-0c57ea401ed9af253c77697c",
          editionId: "edition:authored-third-party:2026-07-09",
          title:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          implication:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          rank: 8,
          semanticHash: "bdac42e3c53e0b10c7879e2bf96c9199f2f56d22a8237dae9c4005e4a4854a16",
          sourceIds: ["source:archive-url-0c57ea401ed9af253c77697c"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-17326efc4e25b670bdca9fa7:2026-07-09",
          signalId: "signal:archive-url-17326efc4e25b670bdca9fa7",
          editionId: "edition:authored-third-party:2026-07-09",
          title:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          implication:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          rank: 9,
          semanticHash: "dd7564d64d5e20232b0f500b390b9f9e8175776d60cd42a42bf124c6b902099d",
          sourceIds: ["source:archive-url-17326efc4e25b670bdca9fa7"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d9cfab1b5040aaee03dfcf35:2026-07-09",
          signalId: "signal:archive-url-d9cfab1b5040aaee03dfcf35",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "Agentic AI suppliers create permission and audit-log questions",
          implication: "Agentic AI suppliers create permission and audit-log questions",
          rank: 10,
          semanticHash: "7d9b5a37b7a0796a735a329d0f6f07ff198e47ea042ca4899f870ea5dd61d008",
          sourceIds: ["source:archive-url-d9cfab1b5040aaee03dfcf35"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-9739da46988178bc60e57be5:2026-07-09",
          signalId: "signal:archive-url-9739da46988178bc60e57be5",
          editionId: "edition:authored-third-party:2026-07-09",
          title: "Payment processors can define the customer's lived outage",
          implication: "Payment processors can define the customer's lived outage",
          rank: 11,
          semanticHash: "d67cfe39e0996f7c34911f3f6a90428ba8afd55dd00f2a4f8692fd6c39ad5a9c",
          sourceIds: ["source:archive-url-9739da46988178bc60e57be5"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-92a751668a65e8519cd98152",
          title: "ICT risk governance should connect supplier access, monitoring, and continuity",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-cddbd5e7d297cd6b97207fb7",
          title:
            "ESAs flag frontier-AI cyber risk in their role overseeing critical ICT third-party providers",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-bfcd858ae4d48ad3e35a8ff7",
          title: "Material outsourcing still needs audit, subcontracting, and exit evidence",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-00f4cce6d1eee1f42d14c970",
          title:
            "ESMA's custody supervisory action turns third-party and DLT dependency governance into an evidence test",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/press-news/esma-news/esma-launches-common-supervisory-action-casps-digital-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-2c3acd612419ebdf7616f575",
          title: "FCA outsourcing and resilience expectations",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/outsourcing-and-operational-resilience",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-c2c6f564694c6a8ac1b5ad6b",
          title: "Model providers should be governed like critical technology dependencies",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-722a8143ef3c81b9450daf47",
          title: "Concentration risk should be aggregated across business lines",
          publisher: "fsb.org",
          url: "https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d9cfab1b5040aaee03dfcf35",
          title: "Agentic AI suppliers create permission and audit-log questions",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-9739da46988178bc60e57be5",
          title: "Payment processors can define the customer's lived outage",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3c8bb27a6dae2f95d95788b3",
          title:
            "FCA one-year review: third-party vulnerability identification still needs more work despite mapping progress",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/publications/good-and-poor-practice/operational-resilience-insights-observations-one-year",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0c57ea401ed9af253c77697c",
          title:
            "FSB case study maps AI supply-chain concentration risk from chips to cloud to pre-trained models",
          publisher: "fsb.org",
          url: "https://www.fsb.org/2025/10/fsb-outlines-next-steps-for-authorities-on-ai-monitoring/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-17326efc4e25b670bdca9fa7",
          title:
            "FSB consults on sound practices for AI adoption, including third-party and vendor concentration risk oversight",
          publisher: "fsb.org",
          url: "https://www.fsb.org/2026/06/sound-practices-for-responsible-adoption-of-artificial-intelligence-ai-consultation-report/",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "topic-dossier" }>[];
