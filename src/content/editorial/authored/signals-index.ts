// Authored signals-index data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const signalsIndexRecords = [
  {
    route: "/signals/",
    status: 200,
    kind: "signals-index",
    archetype: "signals-index",
    sourceUrl: "https://stgeorgesstrategy.com/signals/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "0adc98487748da1856d2bd8e247f98b6741d29e993880f855ae95741bdfbc0a7",
    metadata: {
      title: "Signals | The Virtual Officer",
      description:
        "A source-backed Signals library for AI, resilience, third-party risk, market structure, financial crime, cyber, technology failure, and data.",
      canonical: "https://stgeorgesstrategy.com/signals/",
      openGraphTitle: "Signals | The Virtual Officer",
      openGraphDescription:
        "A source-backed Signals library for AI, resilience, third-party risk, market structure, financial crime, cyber, technology failure, and data.",
      openGraphUrl: "https://stgeorgesstrategy.com/signals/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Signals | The Virtual Officer",
      twitterDescription:
        "A source-backed Signals library for AI, resilience, third-party risk, market structure, financial crime, cyber, technology failure, and data.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Signals Library",
        description:
          "A source-backed Signals library for AI, resilience, third-party risk, market structure, financial crime, cyber, technology failure, and data.",
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
          "@id": "https://stgeorgesstrategy.com/signals/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:e27c8e135150229e6607866f082c0282966bc92da50b8f700f447dc6ef4d7edf:/signals/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "e27c8e135150229e6607866f082c0282966bc92da50b8f700f447dc6ef4d7edf",
      },
      {
        key: "live:0adc98487748da1856d2bd8e247f98b6741d29e993880f855ae95741bdfbc0a7:/signals/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/signals/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "0adc98487748da1856d2bd8e247f98b6741d29e993880f855ae95741bdfbc0a7",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Signals library",
        title: "What is moving now",
        dek: "A source-backed library of the regulatory, operational, technology, and market signals that sit behind the weekly brief.",
        detail: "Edition 2026-07-09",
      },
      streams: {
        heading: {
          eyebrow: "Signal streams",
          title: "The current intelligence map",
          description:
            "Each stream has a weekly top five, five more source-backed rows, source links, and practical control prompts. The weekly brief selects across these streams when one pattern matters most.",
        },
        cards: [
          {
            meta: "Top 5 shortlist / five more signals / archived weekly",
            title: "AI and agentic control",
            href: "/signals/ai/",
            paragraphs: [
              "Models, agents, infrastructure, market exposure, governance, and control failures.",
            ],
            featured: true,
            rank: "Top topic",
          },
          {
            meta: "Top 5 shortlist / five more signals / control checklist",
            title: "Operational resilience",
            href: "/signals/resilience/",
            paragraphs: [
              "Payment outages, telecom dependencies, cloud incidents, cyber response, and customer evidence.",
            ],
            rank: "02",
          },
          {
            meta: "Top 5 shortlist / five more signals / evidence prompts",
            title: "Third-party and vendor risk",
            href: "/signals/third-party/",
            paragraphs: [
              "AI tooling, processors, model providers, cloud concentration, and contractual evidence gaps.",
            ],
            rank: "03",
          },
          {
            meta: "Top 5 shortlist / five more signals / exposure map",
            title: "Market structure",
            href: "/signals/market-structure/",
            paragraphs: [
              "Private credit, AI infrastructure, crypto, liquidity, capital concentration, and valuation stress.",
            ],
            rank: "04",
          },
          {
            meta: "Top 5 shortlist / five more signals / evidence prompts",
            title: "Financial crime",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Fraud, scams, sanctions, AML controls, mule activity, APP reimbursement, and crypto misuse.",
            ],
            rank: "05",
          },
          {
            meta: "Top 5 shortlist / five more signals / control prompts",
            title: "Cyber",
            href: "/signals/cyber/",
            paragraphs: [
              "Ransomware, vulnerability exposure, identity controls, threat intelligence, and cyber regulation.",
            ],
            rank: "06",
          },
          {
            meta: "Top 5 shortlist / five more signals / outage prompts",
            title: "Technology failure",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Platform outages, change failure, cloud incidents, data integrity, batch failures, and recovery evidence.",
            ],
            rank: "07",
          },
          {
            meta: "Top 5 shortlist / five more signals / lineage prompts",
            title: "Data",
            href: "/signals/data/",
            paragraphs: [
              "Risk data, reporting quality, lineage, records, privacy, AI inputs, and evidence integrity.",
            ],
            rank: "08",
          },
        ],
      },
      operatingModel: {
        heading: {
          eyebrow: "How signals become the brief",
          title: "Outputs, not permanent streams",
          description:
            "Control lessons and board questions are produced when the week gives enough evidence. They should not pretend to be fixed topic streams every week.",
        },
        cards: [
          {
            meta: "Weekly top 5",
            title: "The editorial shortlist",
            paragraphs: [
              "Selected across active streams when a signal is important enough for a leadership conversation.",
            ],
          },
          {
            meta: "Control lessons / conditional",
            title: "Use only when the evidence is strong",
            paragraphs: [
              "If there are three to five credible incidents, outages, enforcement actions, penalties, or post-mortems, the brief turns them into internal control tests.",
            ],
          },
          {
            meta: "Board challenge questions",
            title: "Convert judgement into questions",
            paragraphs: [
              "Questions are drawn from the strongest weekly signals and written so they can travel into a committee, review, or executive 1:1.",
            ],
          },
          {
            meta: "Reg Horizon prompts",
            title: "Turn dates into ownership",
            paragraphs: [
              "Deadlines and policy movements become owner, action, and evidence prompts before the date arrives.",
            ],
          },
        ],
      },
      priorities: {
        heading: {
          eyebrow: "This week's signal stack",
          title: "What is connected this week",
          description:
            "The strongest pattern is not one isolated headline. It is the way AI autonomy, financial-crime controls, technology failure, cyber response, and data lineage are beginning to share the same evidence questions.",
        },
        items: [
          {
            rank: "01",
            title: "Agentic AI needs a control room before it gets a bigger mandate",
            href: "/signals/ai/",
            meta: "AI governance",
          },
          {
            rank: "02",
            title: "Scam and crypto controls are converging into one financial-crime evidence test",
            href: "/signals/financial-crime/",
            meta: "Financial crime / Reg Horizon",
          },
          {
            rank: "03",
            title: "Payment and platform outages need customer-visible recovery evidence",
            href: "/signals/technology-failure/",
            meta: "Technology failure / Resilience",
          },
          {
            rank: "04",
            title: "Cyber vulnerability response is becoming a board-level resilience clock",
            href: "/signals/cyber/",
            meta: "Cyber / Third-party risk",
          },
          {
            rank: "05",
            title: "Risk data lineage is now part of AI, reporting, and supervisory readiness",
            href: "/signals/data/",
            meta: "Data / Markets",
          },
        ],
      },
      topicArchives: {
        heading: {
          eyebrow: "Topic coverage this week",
          title: "Top 5 visible. Five more source-backed rows behind each topic",
          description:
            "This is the progress view for the Signals library: each topic has a leadership shortlist, five more supporting rows, and a clear distinction between primary evidence and monitoring sources.",
        },
        cards: [
          {
            meta: "AI / Top 5 selected / Five more supporting rows",
            title: "Agents, models, infrastructure, and governance",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                  content: "Kill-switch language enters the AI-finance debate.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.thetimes.com/business/technology/article/bank-of-england-ai-agents-market-meltdown-h36jqjzc6",
                  content: "Agentic commerce raises consent and liability questions.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://arxiv.org/abs/2606.26959",
                  content: "Agentic coding evidence broadens the adoption case.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
                  content: "AI and analytics need lawful, explainable, and controlled data inputs.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
                  content: "EU AI Act turns deployment inventory into a live control obligation.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/ai/",
                label: "Open AI Signals",
              },
            ],
          },
          {
            meta: "Resilience / Top 5 selected / Five more supporting rows",
            title: "Failure paths, fallback evidence, and customer impact",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                  content:
                    "Payment fallback maps need processor, tokenisation, power, and comms dependencies.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                  content: "Customer-edge telemetry should challenge green internal status pages.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
                  content: "Scam response speed is becoming a banking control signal.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                  content: "CDN, DNS, routing, and carrier paths are resilience dependencies.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                  content: "AI-agent outage drills should assume the model is technically online.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/resilience/",
                label: "Open Resilience Signals",
              },
            ],
          },
          {
            meta: "Third-party / Top 5 selected / Five more supporting rows",
            title: "Dependencies that look internal when they fail",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                  content: "Payment processors can define the customer's lived outage.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/publications/policy-statements/ps24-16-operational-resilience-critical-third-parties-uk-financial-sector",
                  content:
                    "Model providers should be governed like critical technology dependencies.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                  content:
                    "CDN and network providers should be mapped into important business services.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                  content: "Critical vendor assurance should include customer-impact telemetry.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
                  content: "Contractual audit rights need evidence that they can be exercised.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/third-party/",
                label: "Open Third-party Signals",
              },
            ],
          },
          {
            meta: "Markets / Top 5 selected / Five more supporting rows",
            title: "Capital, liquidity, infrastructure, and concentration",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.wsj.com/economy/bis-sees-peril-for-economy-financial-system-in-ai-investment-boom-326960fb",
                  content: "AI infrastructure capex needs a downside financing scenario.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.theguardian.com/technology/2026/jun/30/crypto-firms-sweeping-new-rules-uk-fca-regulator",
                  content: "Crypto rules are moving from perimeter debate to operating model.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
                  content: "ECB policy meeting needs a fresh euro-area liquidity scenario check.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/trading",
                  content:
                    "ESMA market-structure watch can create execution and best-execution work.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
                  content:
                    "MiCA transition checks raise custody, liquidity, and settlement questions.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/market-structure/",
                label: "Open Markets Signals",
              },
            ],
          },
          {
            meta: "Financial Crime / Top 5 selected / Five more supporting rows",
            title: "Fraud, sanctions, AML, and scam controls",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/financial-crime",
                  content:
                    "Financial-crime controls need evidence across fraud, AML, sanctions, and market abuse.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.psr.org.uk/our-work/app-scams/",
                  content:
                    "APP fraud reimbursement keeps scam prevention tied to customer outcomes.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.gov.uk/government/organisations/office-of-financial-sanctions-implementation",
                  content:
                    "Sanctions screening needs ownership, alert quality, and escalation evidence.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fatf-gafi.org/en/publications.html",
                  content:
                    "FATF work keeps crypto, beneficial ownership, and cross-border AML pressure live.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/financial-crime/money-laundering-terrorist-financing/cryptoassets-aml-ctf-regime",
                  content:
                    "Cryptoasset AML expectations should link onboarding, monitoring, custody, and suspicious activity controls.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/financial-crime/",
                label: "Open Financial Crime Signals",
              },
            ],
          },
          {
            meta: "Cyber / Top 5 selected / Five more supporting rows",
            title: "Threats, vulnerabilities, identity, and response",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.ncsc.gov.uk/ransomware/home",
                  content:
                    "Ransomware resilience should be evidenced through recovery, communications, and decision rehearsals.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.ncsc.gov.uk/collection/vulnerability-management",
                  content:
                    "Vulnerability management needs prioritisation evidence, not only patch counts.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/cyber-resilience",
                  content:
                    "Cyber resilience should connect board ownership, incident reporting, and customer-impact assessment.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.bankofengland.co.uk/financial-stability/operational-resilience-of-the-financial-sector/2025-cbest-thematic",
                  content:
                    "CBEST-style testing keeps threat-led assurance tied to important business services.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.gov.uk/government/publications/cyber-security-and-resilience-bill-policy-statement/cyber-security-and-resilience-bill-policy-statement",
                  content:
                    "The UK cyber resilience reform path raises expectations for essential digital services and suppliers.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/cyber/",
                label: "Open Cyber Signals",
              },
            ],
          },
          {
            meta: "Technology Failure / Top 5 selected / Five more supporting rows",
            title: "Outages, change failure, data integrity, and recovery",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/operational-resilience",
                  content:
                    "Important business services need customer-visible outage and recovery evidence.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/operational-resilience",
                  content:
                    "Impact tolerances should be tested against real failure paths, not only component uptime.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-outsourcing-arrangements",
                  content:
                    "Cloud and critical-provider failure should map to exit, substitution, and manual workaround evidence.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj",
                  content:
                    "DORA keeps ICT incidents, third-party risk, testing, and governance in one resilience frame.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.ncsc.gov.uk/collection/cloud",
                  content:
                    "Cloud assurance should cover architecture, identity, logging, data recovery, and operational responsibility.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/technology-failure/",
                label: "Open Technology Failure Signals",
              },
            ],
          },
          {
            meta: "Data / Top 5 selected / Five more supporting rows",
            title: "Lineage, reporting, privacy, records, and evidence integrity",
            items: [
              [
                {
                  kind: "link",
                  href: "https://www.bis.org/publ/bcbs239.htm",
                  content:
                    "Risk data aggregation should be governed for accuracy, completeness, timeliness, and adaptability.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.bankofengland.co.uk/statistics/data-collection",
                  content:
                    "Regulatory reporting needs accountable ownership, reconciliation, and change control over submitted data.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://www.fca.org.uk/firms/regulatory-reporting",
                  content:
                    "FCA reporting obligations should map data owners, source systems, validation, and evidence of sign-off.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/",
                  content: "AI and analytics need lawful, explainable, and controlled data inputs.",
                },
              ],
              [
                {
                  kind: "link",
                  href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/",
                  content:
                    "Privacy accountability should be visible through records, retention, access, and control evidence.",
                },
              ],
            ],
            actions: [
              {
                href: "/signals/data/",
                label: "Open Data Signals",
              },
            ],
          },
        ],
      },
      coverage: {
        heading: {
          eyebrow: "Editorial filter",
          title: "What makes a signal material",
          description:
            "A signal becomes material when it changes what a regulated firm should own, evidence, test, explain, or prepare for.",
        },
        cards: [
          {
            meta: "Control impact",
            title: "Does it change evidence?",
            paragraphs: [
              "Permissions, logs, testing, accountability, fallback, audit trail, notification, or remediation.",
            ],
          },
          {
            meta: "Supervisory relevance",
            title: "Will a regulator care?",
            paragraphs: [
              "Official policy, speeches, consultations, enforcement, thematic pressure, or deadline movement.",
            ],
          },
          {
            meta: "Customer harm",
            title: "Could it affect outcomes?",
            paragraphs: [
              "Access, payments, scams, redress, disclosure, complaints, fairness, resilience, or vulnerable customers.",
            ],
          },
          {
            meta: "Market exposure",
            title: "Could it change risk appetite?",
            paragraphs: [
              "Capital, liquidity, private markets, infrastructure spend, concentration, valuation, or counterparty channels.",
            ],
          },
        ],
      },
      archiveCadence: {
        heading: {
          eyebrow: "Source discipline",
          title: "How to read the source trail",
          description:
            "Signals separates official sources from secondary monitoring. That distinction matters: a regulator page is a control input; a credible article may be a watch item until confirmed.",
        },
        cards: [
          {
            meta: "Official source",
            title: "Use as evidence or deadline input",
            paragraphs: [
              "Regulator pages, official consultations, policy statements, standards, enforcement notices, and central-bank material.",
            ],
          },
          {
            meta: "Credible monitoring",
            title: "Use as a watch item",
            paragraphs: [
              "Financial press, technology reporting, incident coverage, market commentary, and sector research with clear attribution.",
            ],
          },
          {
            meta: "Internal prompt",
            title: "Use as a control question",
            paragraphs: [
              "The editorial layer translates the source into ownership, evidence, fallback, or committee challenge.",
            ],
          },
        ],
      },
      liveChannels: {
        heading: {
          eyebrow: "Reg Horizon feed",
          title: "Signals by watch theme",
          description:
            "This section groups the current regulatory signals by watch theme, making it easier to see where supervisory movement is gathering pace.",
        },
        cards: [
          {
            meta: "digital-money",
            title: "FCA crypto and stablecoin signals",
            href: "/regulatory-horizon/",
            paragraphs: [
              "Digital-money items currently feed market structure and the weekly brief.",
            ],
          },
          {
            meta: "customer-outcomes",
            title: "Disclosure and Consumer Duty movement",
            href: "/regulatory-horizon/",
            paragraphs: [
              "Customer-outcomes items currently feed conduct and executive challenge questions.",
            ],
          },
          {
            meta: "market-plumbing",
            title: "Listing-rule consultation and market structure",
            href: "/regulatory-horizon/",
            paragraphs: [
              "Market-plumbing items currently feed market structure and deadline ownership.",
            ],
          },
        ],
      },
      archiveDirectories: {
        heading: {
          eyebrow: "Topic archive",
          title: "Follow a theme over time",
          description:
            "The value of Signals compounds when repeated weak signals become a visible pattern. Each topic page keeps the current edition and preserves the archive trail.",
        },
        cards: [
          {
            meta: "AI",
            title: "Agents, models, infrastructure, and governance",
            href: "/signals/ai/",
            paragraphs: [
              "Top 5 shortlist, additional source rows, source data, and control evidence checklist.",
            ],
          },
          {
            meta: "Resilience",
            title: "Failure paths, fallback evidence, and customer impact",
            href: "/signals/resilience/",
            paragraphs: [
              "Outages, penalties, cyber timing, incident response, and important business services.",
            ],
          },
          {
            meta: "Third-party",
            title: "Dependencies that look internal when they fail",
            href: "/signals/third-party/",
            paragraphs: [
              "Model providers, processors, outsourcing, cloud, contracts, exit, and assurance.",
            ],
          },
          {
            meta: "Markets",
            title: "Capital, liquidity, infrastructure, and concentration",
            href: "/signals/market-structure/",
            paragraphs: [
              "AI capex, crypto, market plumbing, private credit, and supervisory technology.",
            ],
          },
          {
            meta: "Financial crime",
            title: "Fraud, scams, AML, sanctions, and crypto misuse",
            href: "/signals/financial-crime/",
            paragraphs: [
              "APP fraud, sanctions screening, AML governance, typologies, and customer harm evidence.",
            ],
          },
          {
            meta: "Cyber",
            title: "Threats, vulnerabilities, identity, and response",
            href: "/signals/cyber/",
            paragraphs: [
              "Ransomware, threat-led testing, vulnerability management, incident response, and supplier exposure.",
            ],
          },
          {
            meta: "Technology failure",
            title: "Outages, cloud, change, and recovery",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Important business services, ICT incidents, change failure, cloud resilience, and tested recovery.",
            ],
          },
          {
            meta: "Data",
            title: "Lineage, reporting, privacy, and evidence integrity",
            href: "/signals/data/",
            paragraphs: [
              "Risk data aggregation, regulatory reporting, AI inputs, privacy records, and sign-off evidence.",
            ],
          },
        ],
      },
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "signals-index" }>[];
