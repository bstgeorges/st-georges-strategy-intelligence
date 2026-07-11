// Authored brief data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const briefRecords = [
  {
    route: "/archive/brief/2026-07-06/",
    status: 200,
    kind: "brief",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-06/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d",
    metadata: {
      title: "Weekly Brief | The Virtual Officer",
      description:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      canonical: "https://stgeorgesstrategy.com/brief/",
      openGraphTitle: "Weekly Brief | The Virtual Officer",
      openGraphDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      openGraphUrl: "https://stgeorgesstrategy.com/brief/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Weekly Brief | The Virtual Officer",
      twitterDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Weekly Brief",
        description:
          "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
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
        datePublished: "2026-07-09",
        dateModified: "2026-07-09",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/brief/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "live:ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d:/archive/brief/2026-07-06/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-06/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Weekly brief / Week of 6 Jul 2026",
        title: "Regulators land on both sides of the AI risk story in the same week",
        dek: "The FCA's first review of AI in retail financial services and the ESAs' warning on systemic cyber risk from frontier AI models arrived days apart. Firms need one evidence base that covers both conduct outcomes and cyber resilience.",
        questionsLabel: "Five-minute read",
        questions: [
          [
            {
              kind: "strong",
              content: "Read the so-what",
            },
            {
              kind: "text",
              value: " — one paragraph, the judgement for the week.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Scan the Top 5",
            },
            {
              kind: "text",
              value: " — five ranked signals, each linked to its full topic page.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Take the board question to committee",
            },
            {
              kind: "text",
              value: " — one challenge question built to travel into a risk or governance forum.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Check Reg Horizon",
            },
            {
              kind: "text",
              value: " — the dates below that need an owner before they close.",
            },
          ],
        ],
      },
      summary:
        "So what: this week's FCA AI review and the ESA/ESRB frontier-AI cyber warning point to the same test. Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, accountable for customer outcomes, and resilient against AI-accelerated attack, before it scales further into customer, market, payments, or control workflows.",
      priorities: {
        heading: {
          eyebrow: "Top 5",
          title: "This week's significant signals",
          description:
            "The brief is intentionally selective. The eight topic pages hold the full Top 5 shortlists and supporting evidence rows; the weekly issue carries the judgement about what should reach a leadership conversation.",
        },
        items: [
          {
            rank: "01",
            title:
              "FCA's first AI review puts retail outcomes and agentic control on the same page",
            href: "/signals/ai/",
            meta: "AI governance / FCA, 6 Jul",
          },
          {
            rank: "02",
            title:
              "Frontier AI models are now a declared systemic cyber risk, say the ESAs and ESRB",
            href: "/signals/cyber/",
            meta: "Cyber / EBA-ESMA-EIOPA, 7 Jul",
          },
          {
            rank: "03",
            title:
              "OFSI's largest-ever circumvention penalty resets sanctions control expectations",
            href: "/signals/financial-crime/",
            meta: "Financial crime / OFSI, 17 Jun",
          },
          {
            rank: "04",
            title:
              "Bank of England's July Financial Stability Report resets the resilience and market baseline",
            href: "/signals/resilience/",
            meta: "Resilience / Market structure / BoE, 7 Jul",
          },
          {
            rank: "05",
            title: "A new UK legal duty on data protection complaints takes effect",
            href: "/signals/data/",
            meta: "Data / ICO, 23 Jun",
          },
        ],
      },
      streams: {
        heading: {
          eyebrow: "Coverage read",
          title: "How the eight streams fed the issue",
          description:
            "The weekly Top 5 is not one item per topic. It is the editorial shortlist from the eight-stream signal library, with related streams carried as read-across.",
        },
        cards: [
          {
            meta: "AI",
            title: "Lead signal",
            href: "/signals/ai/",
            paragraphs: [
              "Agentic control, permission boundaries, kill switches, and escalation evidence.",
            ],
          },
          {
            meta: "Financial crime",
            title: "Read-across",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Scams, cryptoasset AML, sanctions screening, and customer harm evidence.",
            ],
          },
          {
            meta: "Technology failure",
            title: "Read-across",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Payment outages, cloud dependencies, recovery tests, and customer-visible failure paths.",
            ],
          },
          {
            meta: "Cyber",
            title: "Read-across",
            href: "/signals/cyber/",
            paragraphs: [
              "Vulnerability response, ransomware recovery, identity controls, and threat-led testing.",
            ],
          },
          {
            meta: "Data",
            title: "Read-across",
            href: "/signals/data/",
            paragraphs: [
              "Risk data lineage, reporting quality, AI inputs, privacy records, and evidence integrity.",
            ],
          },
          {
            meta: "Third-party",
            title: "Dependency layer",
            href: "/signals/third-party/",
            paragraphs: [
              "Model providers, processors, cloud, contracts, audit rights, and exit practicality.",
            ],
          },
          {
            meta: "Resilience",
            title: "Service layer",
            href: "/signals/resilience/",
            paragraphs: [
              "Important business services, tolerances, fallback evidence, and incident learning.",
            ],
          },
          {
            meta: "Markets",
            title: "Exposure layer",
            href: "/signals/market-structure/",
            paragraphs: [
              "AI capex, crypto rules, liquidity assumptions, private credit, and market plumbing.",
            ],
          },
        ],
      },
      decisionWindow: [
        {
          meta: "Board question",
          title:
            "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
          paragraphs: [
            "This is the usable executive challenge question that travels from the weekly brief into risk committees.",
          ],
        },
        {
          meta: "Control evidence",
          title: "Inventory, permissions, kill switch, fallback, and rehearsed escalation",
          paragraphs: [
            "The point is evidence of control operation, not only policy approval or model documentation.",
          ],
        },
        {
          meta: "Archive logic",
          title: "Every weekly brief becomes a dated issue with links to topic pages",
          paragraphs: [
            "The archive shows how judgement changed over time and preserves the source trail.",
          ],
        },
      ],
      lead: {
        heading: {
          eyebrow: "Executive pulse",
          title: "The full weekly readout",
          description:
            "The weekly brief carries the deeper read: what changed, which functions are affected, what follow-up belongs on an owner list, and which sources justify the judgement.",
        },
        meta: "Operating readout",
        title:
          "AI's regulatory moment, sanctions enforcement, and systemic resilience converge in the same week",
        paragraphs: [
          "The operating brief has sharpened: the FCA's first review of AI in retail financial services lands the same week the ESAs and ESRB declare frontier AI models a systemic cyber risk; OFSI's largest-ever circumvention penalty resets sanctions expectations; the Bank of England's July Financial Stability Report resets the resilience and market baseline; and a new UK legal duty on data-protection complaints becomes the latest evidence-quality test.",
        ],
        lenses: [
          {
            title: "AI-agent read",
            body: "The FCA's Mills-led review expects firms to show explicit permissions, kill switches, liability routes, human accountability, and rehearsed degraded operation before agentic AI scales further into customer, market, or payments workflows.",
          },
          {
            title: "Financial-crime read",
            body: "OFSI's Sabre Global penalty, the FCA's sanctions systems review, and the FATF's new fraud roadmap should be read together as one sanctions-and-fraud evidence-quality problem, not three separate compliance streams.",
          },
          {
            title: "Cyber and resilience read",
            body: "The ESAs' and ESRB's frontier-AI cyber warning and the Bank of England's Financial Stability Report both point the same way: AI-accelerated attacks and third-party concentration now belong on the same resilience test as payment and technology outages.",
          },
          {
            title: "Data and markets read",
            body: "The ICO's new complaints-handling duty, data lineage, AI infrastructure exposure, and regulatory reporting quality are becoming connected tests of management information.",
          },
        ],
        sources: [
          {
            href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
            label: "AI review / FCA",
          },
          {
            href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
            label: "Frontier AI cyber warning / EBA",
          },
          {
            href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
            label: "Sanctions penalty / OFSI",
          },
          {
            href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
            label: "Financial Stability Report / BoE",
          },
          {
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
            label: "Complaints duty / ICO",
          },
        ],
      },
      committeeAngles: {
        heading: {
          eyebrow: "Regulator watch",
          title: "Questions the speeches put on the table",
          description:
            "Regulator speeches are included because they often signal supervisory direction before formal rules arrive — reading them alongside the rules gives an earlier warning than either source alone.",
        },
        cards: [
          {
            meta: "Autonomous agents",
            title: "The FCA's first AI review sets a sharper control vocabulary",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Refresh the AI inventory against the FCA's review to include agentic workflows, permission boundaries, external model and cloud dependencies, kill-switch ownership, and evidence of control operation.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
                label: "Source / FCA, 6 Jul",
              },
            ],
          },
          {
            meta: "Financial crime",
            title: "Sanctions circumvention is now a tested enforcement category",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Check whether sanctions due diligence, alert quality, and escalation would catch circumvention attempts like OFSI's Sabre Global case, not only direct breaches.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
                label: "Source / OFSI, 17 Jun",
              },
            ],
          },
          {
            meta: "Cyber and resilience",
            title: "Frontier AI is now a named systemic cyber risk",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Ask whether cyber scenarios and patch SLAs already assume AI-accelerated vulnerability discovery, not last year's threat-actor speed.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
                label: "Source / EBA-ESRB, 7 Jul",
              },
            ],
          },
        ],
      },
      evidenceAsks: {
        heading: {
          eyebrow: "Control lessons",
          title: "Failure patterns to test internally",
          description:
            "These cards turn public events into usable internal challenge: what happened, what control lesson follows, and what question a firm should ask before the next committee pack.",
        },
        cards: [
          {
            meta: "Payments",
            title:
              "Payment outages need processor, tokenisation, power, comms, and fallback mapping",
            facts: [
              {
                term: "What happened",
                description:
                  "A card-payment outage during peak demand showed how a nonbank infrastructure layer can still create customer harm for financial firms.",
              },
              {
                term: "Control lesson",
                description:
                  "Payment resilience needs explicit dependency mapping for processor platforms, tokenisation, power, communications, and fallback acceptance paths.",
              },
            ],
            question:
              "Question Which critical payment journeys would fail if a processor, tokenisation provider, or telecom route degraded for two hours tonight?",
            sources: [
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source / Guardian",
              },
            ],
          },
          {
            meta: "Digital services",
            title: "Internet routing and CDN dependencies need customer-edge telemetry",
            facts: [
              {
                term: "What happened",
                description:
                  "Outage spikes across major digital services showed that status pages can stay green while customers experience failure.",
              },
              {
                term: "Control lesson",
                description:
                  "Concentration risk includes internet routing, CDN, private interconnect, and carrier dependencies, not only core application uptime.",
              },
            ],
            question:
              "Question Do we know which network providers and CDN paths sit behind each top digital service by user region?",
            sources: [
              {
                href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                label: "Tom's Guide",
              },
              {
                href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Scams",
            title: "Scam controls are becoming a core banking obligation",
            facts: [
              {
                term: "What happened",
                description:
                  "Recent penalties and remediation cases show fraud, conduct, complaints, restrictions, and restoration speed converging into one supervisory narrative.",
              },
              {
                term: "Control lesson",
                description:
                  "Scam controls are not just customer education; prevention, complaint ageing, and restoration speed become evidence of control quality.",
              },
            ],
            question:
              "Question Where do rising scam typologies, known control gaps, or complaint ageing risk being characterised as systemic inaction?",
            sources: [
              {
                href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
                label: "Source / Financial Times",
              },
            ],
          },
          {
            meta: "AI identity",
            title: "AI agents create privileged-identity risk",
            facts: [
              {
                term: "What happened",
                description:
                  "AI accelerates discovery and exploitation while agentic tools can touch code, tickets, data, and communication channels.",
              },
              {
                term: "Control lesson",
                description:
                  "Patch SLAs, agent permissions, audit logs, and emergency stops need measurable technical enforcement outside the model prompt.",
              },
            ],
            question:
              "Question Which AI agents or copilots can touch production data, code, email, or tickets today, and are their permissions and emergency stops technically enforced?",
            sources: [
              {
                href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
                label: "Wired",
              },
              {
                href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Data lineage",
            title: "Reporting and AI controls fail if the data trail is not provable",
            facts: [
              {
                term: "What happened",
                description:
                  "Risk data, regulatory reporting, AI inputs, surveillance data, and privacy records are now part of the same evidence conversation.",
              },
              {
                term: "Control lesson",
                description:
                  "Lineage, validation, exception ownership, retention, access, and sign-off should be evidenced before a report, model, or control output is relied on.",
              },
            ],
            question:
              "Question Which critical decisions this week relied on data whose source, transformation, quality controls, and accountable sign-off can be reconstructed?",
            sources: [
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "BCBS 239",
              },
              {
                href: "https://www.fca.org.uk/firms/regulatory-reporting",
                label: "FCA reporting",
              },
            ],
          },
        ],
      },
      nextQuestions: {
        heading: {
          eyebrow: "Executive challenge",
          title: "Three questions from the week",
          description:
            "This is the most portable part of the edition: it gives the reader something they can carry into a committee, 1:1, or control review.",
        },
        questions: [
          "Which top customer journeys depend on third parties whose failure would look to customers like our failure, and when did we last test the fallback?",
          "Where are we relying on policy, attestation, or status pages instead of telemetry, technical controls, and evidence of recovery under stress?",
          "Which weak signals have owners, dates, and executive visibility: payment fallback gaps, scam exposure, data-lineage weaknesses, customer-edge telemetry, exposed vulnerabilities, or AI-agent permissions?",
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Reg Horizon",
          title: "Dates that need owners now",
          description:
            "The horizon section keeps the weekly operating rhythm visible: date, decision point, owner prompt, and the archive trail behind each item.",
        },
        deadlines: [
          {
            date: "1 Jul",
            dateTime: "2026-07-01",
            action: "MiCA transition checks and crypto counterparty review.",
            href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
            owner: "Digital assets",
          },
          {
            date: "2 Jul",
            dateTime: "2026-07-02",
            action: "EU ESG ratings governance and procurement evidence.",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            owner: "Risk / Legal",
          },
          {
            date: "7 Jul",
            dateTime: "2026-07-07",
            action: "CSDR settlement discipline and post-trade readiness.",
            href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
            owner: "Operations",
          },
          {
            date: "23 Jul",
            dateTime: "2026-07-23",
            action: "ECB policy meeting and liquidity scenario refresh.",
            href: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
            owner: "Treasury",
          },
          {
            date: "31 Jul",
            dateTime: "2026-07-31",
            action: "PRA funded reinsurance consultation closes.",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            owner: "Insurance risk",
          },
        ],
        sources: [
          {
            href: "/regulatory-horizon/latest.json",
            label: "Source data / latest.json",
          },
          {
            href: "/regulatory-horizon/",
            label: "Full horizon page",
          },
        ],
      },
      radar: {
        heading: {
          eyebrow: "Thought leadership radar",
          title: "Three angles worth developing",
          description:
            "The brief stays short by carrying forward only the themes that deserve a fuller note or another week of leadership attention.",
        },
        cards: [
          {
            meta: "AI",
            title: "Banking agents need control rooms, not only productivity cases",
            paragraphs: [
              "Agentic AI will not fail like a normal application, because the failure mode may be plausible action at speed rather than a clean outage.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " Enterprise adoption is moving from copilots into delegated workflows that touch customers, code, payments, and controls.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Transformation, model risk, operational resilience, product, and control owners.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/ai/",
                label: "AI signals",
              },
              {
                href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Technology failure",
            title: "Payment outages reveal the real operating perimeter",
            paragraphs: [
              "A customer does not care whether the failure sits inside the bank, a processor, a tokenisation path, a telecoms route, or a cloud service.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " High-volume outage events make fallback, communications, and customer-edge telemetry more important than internal status alone.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Operations, payments, resilience, technology risk, service owners, and incident response leads.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/technology-failure/",
                label: "Technology failure signals",
              },
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Data",
            title: "Data lineage is becoming the evidence layer for AI, cyber, and reporting",
            paragraphs: [
              "The question is not only whether data is accurate. It is whether the firm can prove source, transformation, quality control, ownership, and use.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " AI adoption, supervisory analytics, cyber evidence, and regulatory reporting all depend on data that can be reconstructed under challenge.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Data owners, risk, finance, compliance, technology, privacy, AI governance, and internal audit.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/data/",
                label: "Data signals",
              },
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "Source trail",
              },
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "first-observed",
      currentLabel: "weekly-brief / 2026-07-06",
    },
  },
  {
    route: "/archive/brief/2026-07-08/",
    status: 200,
    kind: "brief",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-08/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "0407d988156dd90c622a529b7c22e5ec7d392e2f1d8a0d76c195c6a6d4f641af",
    metadata: {
      title: "Weekly Brief | The Virtual Officer",
      description:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      canonical: "https://stgeorgesstrategy.com/brief/",
      openGraphTitle: "Weekly Brief | The Virtual Officer",
      openGraphDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      openGraphUrl: "https://stgeorgesstrategy.com/brief/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Weekly Brief | The Virtual Officer",
      twitterDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Weekly Brief",
        description:
          "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
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
        datePublished: "2026-07-09",
        dateModified: "2026-07-09",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/brief/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:0407d988156dd90c622a529b7c22e5ec7d392e2f1d8a0d76c195c6a6d4f641af:/archive/brief/2026-07-08/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-08/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "0407d988156dd90c622a529b7c22e5ec7d392e2f1d8a0d76c195c6a6d4f641af",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Weekly brief / Week of 6 Jul 2026",
        title: "Regulators land on both sides of the AI risk story in the same week",
        dek: "The FCA's first review of AI in retail financial services and the ESAs' warning on systemic cyber risk from frontier AI models arrived days apart. Firms need one evidence base that covers both conduct outcomes and cyber resilience.",
      },
      summary:
        "So what: this week's FCA AI review and the ESA/ESRB frontier-AI cyber warning point to the same test. Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, accountable for customer outcomes, and resilient against AI-accelerated attack, before it scales further into customer, market, payments, or control workflows.",
      priorities: {
        heading: {
          eyebrow: "Top 5",
          title: "This week's significant signals",
          description:
            "The brief is intentionally selective. The eight topic pages hold the full Top 5 shortlists and supporting evidence rows; the weekly issue carries the judgement about what should reach a leadership conversation.",
        },
        items: [
          {
            rank: "01",
            title:
              "FCA's first AI review puts retail outcomes and agentic control on the same page",
            href: "/signals/ai/",
            meta: "AI governance / FCA, 6 Jul",
          },
          {
            rank: "02",
            title:
              "Frontier AI models are now a declared systemic cyber risk, say the ESAs and ESRB",
            href: "/signals/cyber/",
            meta: "Cyber / EBA-ESMA-EIOPA, 7 Jul",
          },
          {
            rank: "03",
            title:
              "OFSI's largest-ever circumvention penalty resets sanctions control expectations",
            href: "/signals/financial-crime/",
            meta: "Financial crime / OFSI, 17 Jun",
          },
          {
            rank: "04",
            title:
              "Bank of England's July Financial Stability Report resets the resilience and market baseline",
            href: "/signals/resilience/",
            meta: "Resilience / Market structure / BoE, 7 Jul",
          },
          {
            rank: "05",
            title: "A new UK legal duty on data protection complaints takes effect",
            href: "/signals/data/",
            meta: "Data / ICO, 23 Jun",
          },
        ],
      },
      streams: {
        heading: {
          eyebrow: "Coverage read",
          title: "How the eight streams fed the issue",
          description:
            "The weekly Top 5 is not one item per topic. It is the editorial shortlist from the eight-stream signal library, with related streams carried as read-across.",
        },
        cards: [
          {
            meta: "AI",
            title: "Lead signal",
            href: "/signals/ai/",
            paragraphs: [
              "Agentic control, permission boundaries, kill switches, and escalation evidence.",
            ],
          },
          {
            meta: "Financial crime",
            title: "Read-across",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Scams, cryptoasset AML, sanctions screening, and customer harm evidence.",
            ],
          },
          {
            meta: "Technology failure",
            title: "Read-across",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Payment outages, cloud dependencies, recovery tests, and customer-visible failure paths.",
            ],
          },
          {
            meta: "Cyber",
            title: "Read-across",
            href: "/signals/cyber/",
            paragraphs: [
              "Vulnerability response, ransomware recovery, identity controls, and threat-led testing.",
            ],
          },
          {
            meta: "Data",
            title: "Read-across",
            href: "/signals/data/",
            paragraphs: [
              "Risk data lineage, reporting quality, AI inputs, privacy records, and evidence integrity.",
            ],
          },
          {
            meta: "Third-party",
            title: "Dependency layer",
            href: "/signals/third-party/",
            paragraphs: [
              "Model providers, processors, cloud, contracts, audit rights, and exit practicality.",
            ],
          },
          {
            meta: "Resilience",
            title: "Service layer",
            href: "/signals/resilience/",
            paragraphs: [
              "Important business services, tolerances, fallback evidence, and incident learning.",
            ],
          },
          {
            meta: "Markets",
            title: "Exposure layer",
            href: "/signals/market-structure/",
            paragraphs: [
              "AI capex, crypto rules, liquidity assumptions, private credit, and market plumbing.",
            ],
          },
        ],
      },
      decisionWindow: [
        {
          meta: "Board question",
          title:
            "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
          paragraphs: [
            "This is the usable executive challenge question that travels from the weekly brief into risk committees.",
          ],
        },
        {
          meta: "Control evidence",
          title: "Inventory, permissions, kill switch, fallback, and rehearsed escalation",
          paragraphs: [
            "The point is evidence of control operation, not only policy approval or model documentation.",
          ],
        },
        {
          meta: "Archive logic",
          title: "Every weekly brief becomes a dated issue with links to topic pages",
          paragraphs: [
            "The archive shows how judgement changed over time and preserves the source trail.",
          ],
        },
      ],
      lead: {
        heading: {
          eyebrow: "Executive pulse",
          title: "The full weekly readout",
          description:
            "The weekly brief carries the deeper read: what changed, which functions are affected, what follow-up belongs on an owner list, and which sources justify the judgement.",
        },
        meta: "Operating readout",
        title:
          "AI's regulatory moment, sanctions enforcement, and systemic resilience converge in the same week",
        paragraphs: [
          "The operating brief has sharpened: the FCA's first review of AI in retail financial services lands the same week the ESAs and ESRB declare frontier AI models a systemic cyber risk; OFSI's largest-ever circumvention penalty resets sanctions expectations; the Bank of England's July Financial Stability Report resets the resilience and market baseline; and a new UK legal duty on data-protection complaints becomes the latest evidence-quality test.",
        ],
        lenses: [
          {
            title: "AI-agent read",
            body: "The FCA's Mills-led review expects firms to show explicit permissions, kill switches, liability routes, human accountability, and rehearsed degraded operation before agentic AI scales further into customer, market, or payments workflows.",
          },
          {
            title: "Financial-crime read",
            body: "OFSI's Sabre Global penalty, the FCA's sanctions systems review, and the FATF's new fraud roadmap should be read together as one sanctions-and-fraud evidence-quality problem, not three separate compliance streams.",
          },
          {
            title: "Cyber and resilience read",
            body: "The ESAs' and ESRB's frontier-AI cyber warning and the Bank of England's Financial Stability Report both point the same way: AI-accelerated attacks and third-party concentration now belong on the same resilience test as payment and technology outages.",
          },
          {
            title: "Data and markets read",
            body: "The ICO's new complaints-handling duty, data lineage, AI infrastructure exposure, and regulatory reporting quality are becoming connected tests of management information.",
          },
        ],
        sources: [
          {
            href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
            label: "AI review / FCA",
          },
          {
            href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
            label: "Frontier AI cyber warning / EBA",
          },
          {
            href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
            label: "Sanctions penalty / OFSI",
          },
          {
            href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
            label: "Financial Stability Report / BoE",
          },
          {
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
            label: "Complaints duty / ICO",
          },
        ],
      },
      committeeAngles: {
        heading: {
          eyebrow: "Regulator watch",
          title: "Questions the speeches put on the table",
          description:
            "The weekly newsletter should keep the regulator-speech layer from the existing site. It is one of the things that makes the work feel useful rather than simply newsy.",
        },
        cards: [
          {
            meta: "Autonomous agents",
            title: "The FCA's first AI review sets a sharper control vocabulary",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Refresh the AI inventory against the FCA's review to include agentic workflows, permission boundaries, external model and cloud dependencies, kill-switch ownership, and evidence of control operation.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
                label: "Source / FCA, 6 Jul",
              },
            ],
          },
          {
            meta: "Financial crime",
            title: "Sanctions circumvention is now a tested enforcement category",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Check whether sanctions due diligence, alert quality, and escalation would catch circumvention attempts like OFSI's Sabre Global case, not only direct breaches.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
                label: "Source / OFSI, 17 Jun",
              },
            ],
          },
          {
            meta: "Cyber and resilience",
            title: "Frontier AI is now a named systemic cyber risk",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Ask whether cyber scenarios and patch SLAs already assume AI-accelerated vulnerability discovery, not last year's threat-actor speed.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
                label: "Source / EBA-ESRB, 7 Jul",
              },
            ],
          },
        ],
      },
      evidenceAsks: {
        heading: {
          eyebrow: "Control lessons",
          title: "Failure patterns to test internally",
          description:
            "These cards turn public events into usable internal challenge: what happened, what control lesson follows, and what question a firm should ask before the next committee pack.",
        },
        cards: [
          {
            meta: "Payments",
            title:
              "Payment outages need processor, tokenisation, power, comms, and fallback mapping",
            facts: [
              {
                term: "What happened",
                description:
                  "A card-payment outage during peak demand showed how a nonbank infrastructure layer can still create customer harm for financial firms.",
              },
              {
                term: "Control lesson",
                description:
                  "Payment resilience needs explicit dependency mapping for processor platforms, tokenisation, power, communications, and fallback acceptance paths.",
              },
            ],
            question:
              "Question Which critical payment journeys would fail if a processor, tokenisation provider, or telecom route degraded for two hours tonight?",
            sources: [
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source / Guardian",
              },
            ],
          },
          {
            meta: "Digital services",
            title: "Internet routing and CDN dependencies need customer-edge telemetry",
            facts: [
              {
                term: "What happened",
                description:
                  "Outage spikes across major digital services showed that status pages can stay green while customers experience failure.",
              },
              {
                term: "Control lesson",
                description:
                  "Concentration risk includes internet routing, CDN, private interconnect, and carrier dependencies, not only core application uptime.",
              },
            ],
            question:
              "Question Do we know which network providers and CDN paths sit behind each top digital service by user region?",
            sources: [
              {
                href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                label: "Tom's Guide",
              },
              {
                href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Scams",
            title: "Scam controls are becoming a core banking obligation",
            facts: [
              {
                term: "What happened",
                description:
                  "Recent penalties and remediation cases show fraud, conduct, complaints, restrictions, and restoration speed converging into one supervisory narrative.",
              },
              {
                term: "Control lesson",
                description:
                  "Scam controls are not just customer education; prevention, complaint ageing, and restoration speed become evidence of control quality.",
              },
            ],
            question:
              "Question Where do rising scam typologies, known control gaps, or complaint ageing risk being characterised as systemic inaction?",
            sources: [
              {
                href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
                label: "Source / Financial Times",
              },
            ],
          },
          {
            meta: "AI identity",
            title: "AI agents create privileged-identity risk",
            facts: [
              {
                term: "What happened",
                description:
                  "AI accelerates discovery and exploitation while agentic tools can touch code, tickets, data, and communication channels.",
              },
              {
                term: "Control lesson",
                description:
                  "Patch SLAs, agent permissions, audit logs, and emergency stops need measurable technical enforcement outside the model prompt.",
              },
            ],
            question:
              "Question Which AI agents or copilots can touch production data, code, email, or tickets today, and are their permissions and emergency stops technically enforced?",
            sources: [
              {
                href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
                label: "Wired",
              },
              {
                href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Data lineage",
            title: "Reporting and AI controls fail if the data trail is not provable",
            facts: [
              {
                term: "What happened",
                description:
                  "Risk data, regulatory reporting, AI inputs, surveillance data, and privacy records are now part of the same evidence conversation.",
              },
              {
                term: "Control lesson",
                description:
                  "Lineage, validation, exception ownership, retention, access, and sign-off should be evidenced before a report, model, or control output is relied on.",
              },
            ],
            question:
              "Question Which critical decisions this week relied on data whose source, transformation, quality controls, and accountable sign-off can be reconstructed?",
            sources: [
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "BCBS 239",
              },
              {
                href: "https://www.fca.org.uk/firms/regulatory-reporting",
                label: "FCA reporting",
              },
            ],
          },
        ],
      },
      nextQuestions: {
        heading: {
          eyebrow: "Executive challenge",
          title: "Three questions from the week",
          description:
            "This is the most portable part of the edition: it gives the reader something they can carry into a committee, 1:1, or control review.",
        },
        questions: [
          "Which top customer journeys depend on third parties whose failure would look to customers like our failure, and when did we last test the fallback?",
          "Where are we relying on policy, attestation, or status pages instead of telemetry, technical controls, and evidence of recovery under stress?",
          "Which weak signals have owners, dates, and executive visibility: payment fallback gaps, scam exposure, data-lineage weaknesses, customer-edge telemetry, exposed vulnerabilities, or AI-agent permissions?",
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Reg Horizon",
          title: "Dates that need owners now",
          description:
            "The horizon section keeps the weekly operating rhythm visible: date, decision point, owner prompt, and the archive trail behind each item.",
        },
        deadlines: [
          {
            date: "1 Jul",
            dateTime: "2026-07-01",
            action: "MiCA transition checks and crypto counterparty review.",
            href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
            owner: "Digital assets",
          },
          {
            date: "2 Jul",
            dateTime: "2026-07-02",
            action: "EU ESG ratings governance and procurement evidence.",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            owner: "Risk / Legal",
          },
          {
            date: "7 Jul",
            dateTime: "2026-07-07",
            action: "CSDR settlement discipline and post-trade readiness.",
            href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
            owner: "Operations",
          },
          {
            date: "23 Jul",
            dateTime: "2026-07-23",
            action: "ECB policy meeting and liquidity scenario refresh.",
            href: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
            owner: "Treasury",
          },
          {
            date: "31 Jul",
            dateTime: "2026-07-31",
            action: "PRA funded reinsurance consultation closes.",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            owner: "Insurance risk",
          },
        ],
        sources: [
          {
            href: "/regulatory-horizon/latest.json",
            label: "Source data / latest.json",
          },
          {
            href: "/regulatory-horizon/",
            label: "Full horizon page",
          },
        ],
      },
      radar: {
        heading: {
          eyebrow: "Thought leadership radar",
          title: "Three follow-up angles worth carrying forward",
          description:
            "The brief stays short by carrying forward only the themes that deserve a fuller note or another week of leadership attention.",
        },
        cards: [
          {
            meta: "AI",
            title: "Banking agents need control rooms, not only productivity cases",
            paragraphs: [
              "Agentic AI will not fail like a normal application, because the failure mode may be plausible action at speed rather than a clean outage.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " Enterprise adoption is moving from copilots into delegated workflows that touch customers, code, payments, and controls.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Transformation, model risk, operational resilience, product, and control owners.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/ai/",
                label: "AI signals",
              },
              {
                href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Technology failure",
            title: "Payment outages reveal the real operating perimeter",
            paragraphs: [
              "A customer does not care whether the failure sits inside the bank, a processor, a tokenisation path, a telecoms route, or a cloud service.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " High-volume outage events make fallback, communications, and customer-edge telemetry more important than internal status alone.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Operations, payments, resilience, technology risk, service owners, and incident response leads.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/technology-failure/",
                label: "Technology failure signals",
              },
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Data",
            title: "Data lineage is becoming the evidence layer for AI, cyber, and reporting",
            paragraphs: [
              "The question is not only whether data is accurate. It is whether the firm can prove source, transformation, quality control, ownership, and use.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " AI adoption, supervisory analytics, cyber evidence, and regulatory reporting all depend on data that can be reconstructed under challenge.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Data owners, risk, finance, compliance, technology, privacy, AI governance, and internal audit.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/data/",
                label: "Data signals",
              },
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "Source trail",
              },
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "weekly-brief / 2026-07-06",
      currentLabel: "weekly-brief / 2026-07-08",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-0907fd7aa19070fb4c3d706b:2026-07-06",
          signalId: "signal:archive-url-0907fd7aa19070fb4c3d706b",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "EU ESG ratings governance and procurement evidence.",
          implication: "EU ESG ratings governance and procurement evidence.",
          rank: 1,
          semanticHash: "3fe195144c2fa779a638c29ff299c490d416c99a2be5b0a980a21ec0130633db",
          sourceIds: ["source:archive-url-0907fd7aa19070fb4c3d706b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3a91b17362d2bbb66863c1c6:2026-07-06",
          signalId: "signal:archive-url-3a91b17362d2bbb66863c1c6",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Complaints duty / ICO",
          implication: "Complaints duty / ICO",
          rank: 2,
          semanticHash: "840437e135454819f25cd4cad2c9e864dd3335727e4cae400415518175ae01b1",
          sourceIds: ["source:archive-url-3a91b17362d2bbb66863c1c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1bdaf6abcf88847c82e3fe13:2026-07-06",
          signalId: "signal:archive-url-1bdaf6abcf88847c82e3fe13",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Financial Stability Report / BoE",
          implication: "Financial Stability Report / BoE",
          rank: 3,
          semanticHash: "4ca05807c4613de0a031465ea9baa9868dba8f859f91d51f5f7fdd359d611f28",
          sourceIds: ["source:archive-url-1bdaf6abcf88847c82e3fe13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-85446fbdc069f12a8340b703:2026-07-06",
          signalId: "signal:archive-url-85446fbdc069f12a8340b703",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "PRA funded reinsurance consultation closes.",
          implication: "PRA funded reinsurance consultation closes.",
          rank: 4,
          semanticHash: "ce8d6f2f5523829213800328d2e1631ff589869256a9e88a996f6fc3e260f2de",
          sourceIds: ["source:archive-url-85446fbdc069f12a8340b703"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d51a90d42f1d1fd278b6c0bd:2026-07-06",
          signalId: "signal:archive-url-d51a90d42f1d1fd278b6c0bd",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "BCBS 239",
          implication: "BCBS 239",
          rank: 5,
          semanticHash: "9639584c6805350f34311f31b3de5172470b2cf53778047c1b6d716150cdca0b",
          sourceIds: ["source:archive-url-d51a90d42f1d1fd278b6c0bd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-414f9a1fe1f2bd314f13434a:2026-07-06",
          signalId: "signal:archive-url-414f9a1fe1f2bd314f13434a",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Frontier AI cyber warning / EBA",
          implication: "Frontier AI cyber warning / EBA",
          rank: 6,
          semanticHash: "a843eacd287fed36d21afa9351374790e3e5786eb675eb120ee335d5040b92b4",
          sourceIds: ["source:archive-url-414f9a1fe1f2bd314f13434a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ed6d960c552a9731b9799f8:2026-07-06",
          signalId: "signal:archive-url-7ed6d960c552a9731b9799f8",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "ECB policy meeting and liquidity scenario refresh.",
          implication: "ECB policy meeting and liquidity scenario refresh.",
          rank: 7,
          semanticHash: "40d1c79d1297170686a4bd840e58ff69b625a911c85bbe9a7b5c3a8ea76d8291",
          sourceIds: ["source:archive-url-7ed6d960c552a9731b9799f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6da5c44f2e8e34a728e94736:2026-07-06",
          signalId: "signal:archive-url-6da5c44f2e8e34a728e94736",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "MiCA transition checks and crypto counterparty review.",
          implication: "MiCA transition checks and crypto counterparty review.",
          rank: 8,
          semanticHash: "19dbfa7f72c7b2dd632b09e8940bb4cf59a67c297da7fd8011d967a8ff740d4c",
          sourceIds: ["source:archive-url-6da5c44f2e8e34a728e94736"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e97eb021f6e217599096a6a:2026-07-06",
          signalId: "signal:archive-url-5e97eb021f6e217599096a6a",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "CSDR settlement discipline and post-trade readiness.",
          implication: "CSDR settlement discipline and post-trade readiness.",
          rank: 9,
          semanticHash: "26324fea816f13cb2e173b7c3043bf55f23d37e69fa35eeb953b3dbdb4dd8112",
          sourceIds: ["source:archive-url-5e97eb021f6e217599096a6a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-80d3b0edeb7b7a5dfda2d08a:2026-07-06",
          signalId: "signal:archive-url-80d3b0edeb7b7a5dfda2d08a",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "FCA reporting",
          implication: "FCA reporting",
          rank: 10,
          semanticHash: "ed440f651370623e4c3e9788500ae2aec92393f57232e42a27983cbdfceae0ff",
          sourceIds: ["source:archive-url-80d3b0edeb7b7a5dfda2d08a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8e4fa5d9d725f18b55f08e82:2026-07-06",
          signalId: "signal:archive-url-8e4fa5d9d725f18b55f08e82",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "AI review / FCA",
          implication: "AI review / FCA",
          rank: 11,
          semanticHash: "c44453b58f9f6ad3e43f9eb27f32e76ea8b71dcf11f964aa7213738cde42e1c0",
          sourceIds: ["source:archive-url-8e4fa5d9d725f18b55f08e82"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-48a27defa6ce142a7fa525a9:2026-07-06",
          signalId: "signal:archive-url-48a27defa6ce142a7fa525a9",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Source / Financial Times",
          implication: "Source / Financial Times",
          rank: 12,
          semanticHash: "37b179158a9deb596e2f0ecfcd962c8ac6d8184d67248610d2e471da554f8760",
          sourceIds: ["source:archive-url-48a27defa6ce142a7fa525a9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19c38ad2ba74da13f9e60492:2026-07-06",
          signalId: "signal:archive-url-19c38ad2ba74da13f9e60492",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Source trail",
          implication: "Source trail",
          rank: 13,
          semanticHash: "bf4c3de7788150100761cb44a8d6b5a3a439459ed5dc47ca8e0cdb0f16412dc1",
          sourceIds: ["source:archive-url-19c38ad2ba74da13f9e60492"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e9aae36f1f9fc45c3f100d00:2026-07-06",
          signalId: "signal:archive-url-e9aae36f1f9fc45c3f100d00",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Sanctions penalty / OFSI",
          implication: "Sanctions penalty / OFSI",
          rank: 14,
          semanticHash: "31fe2d456e7fd830b17fff2bf0c02b3eb7fea1071d50dc2884386f035406f01b",
          sourceIds: ["source:archive-url-e9aae36f1f9fc45c3f100d00"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0d5975b24bd99e886f57d25a:2026-07-06",
          signalId: "signal:archive-url-0d5975b24bd99e886f57d25a",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 15,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-0d5975b24bd99e886f57d25a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-66a71c860d9d1d35493e5397:2026-07-06",
          signalId: "signal:archive-url-66a71c860d9d1d35493e5397",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 16,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-66a71c860d9d1d35493e5397"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0890b19d23f3d8f6460cc9a4:2026-07-06",
          signalId: "signal:archive-url-0890b19d23f3d8f6460cc9a4",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Source / Guardian",
          implication: "Source / Guardian",
          rank: 17,
          semanticHash: "6218771f72420ffa040047702356a63ddf5f7622c8de5bfb254cdace8ed58f03",
          sourceIds: ["source:archive-url-0890b19d23f3d8f6460cc9a4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-40a9c0e034d9fe76a7372dd4:2026-07-06",
          signalId: "signal:archive-url-40a9c0e034d9fe76a7372dd4",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Tom's Guide",
          implication: "Tom's Guide",
          rank: 18,
          semanticHash: "b7ba739f28dd1b9eb1c0e30ffdc16738c6ceb4860e06fd8a969c1dce0d1713ce",
          sourceIds: ["source:archive-url-40a9c0e034d9fe76a7372dd4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7bf7167814d64e2ac7dc190:2026-07-06",
          signalId: "signal:archive-url-e7bf7167814d64e2ac7dc190",
          editionId: "edition:authored-weekly-brief:2026-07-06",
          title: "Wired",
          implication: "Wired",
          rank: 19,
          semanticHash: "fa6269dee4acd01f4de254f68328f961de68d3518318742917ad1578ac3a5ea6",
          sourceIds: ["source:archive-url-e7bf7167814d64e2ac7dc190"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-0907fd7aa19070fb4c3d706b:2026-07-08",
          signalId: "signal:archive-url-0907fd7aa19070fb4c3d706b",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "EU ESG ratings governance and procurement evidence.",
          implication: "EU ESG ratings governance and procurement evidence.",
          rank: 1,
          semanticHash: "3fe195144c2fa779a638c29ff299c490d416c99a2be5b0a980a21ec0130633db",
          sourceIds: ["source:archive-url-0907fd7aa19070fb4c3d706b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3a91b17362d2bbb66863c1c6:2026-07-08",
          signalId: "signal:archive-url-3a91b17362d2bbb66863c1c6",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Complaints duty / ICO",
          implication: "Complaints duty / ICO",
          rank: 2,
          semanticHash: "840437e135454819f25cd4cad2c9e864dd3335727e4cae400415518175ae01b1",
          sourceIds: ["source:archive-url-3a91b17362d2bbb66863c1c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1bdaf6abcf88847c82e3fe13:2026-07-08",
          signalId: "signal:archive-url-1bdaf6abcf88847c82e3fe13",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Financial Stability Report / BoE",
          implication: "Financial Stability Report / BoE",
          rank: 3,
          semanticHash: "4ca05807c4613de0a031465ea9baa9868dba8f859f91d51f5f7fdd359d611f28",
          sourceIds: ["source:archive-url-1bdaf6abcf88847c82e3fe13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-85446fbdc069f12a8340b703:2026-07-08",
          signalId: "signal:archive-url-85446fbdc069f12a8340b703",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "PRA funded reinsurance consultation closes.",
          implication: "PRA funded reinsurance consultation closes.",
          rank: 4,
          semanticHash: "ce8d6f2f5523829213800328d2e1631ff589869256a9e88a996f6fc3e260f2de",
          sourceIds: ["source:archive-url-85446fbdc069f12a8340b703"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d51a90d42f1d1fd278b6c0bd:2026-07-08",
          signalId: "signal:archive-url-d51a90d42f1d1fd278b6c0bd",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "BCBS 239",
          implication: "BCBS 239",
          rank: 5,
          semanticHash: "9639584c6805350f34311f31b3de5172470b2cf53778047c1b6d716150cdca0b",
          sourceIds: ["source:archive-url-d51a90d42f1d1fd278b6c0bd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-414f9a1fe1f2bd314f13434a:2026-07-08",
          signalId: "signal:archive-url-414f9a1fe1f2bd314f13434a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Frontier AI cyber warning / EBA",
          implication: "Frontier AI cyber warning / EBA",
          rank: 6,
          semanticHash: "a843eacd287fed36d21afa9351374790e3e5786eb675eb120ee335d5040b92b4",
          sourceIds: ["source:archive-url-414f9a1fe1f2bd314f13434a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ed6d960c552a9731b9799f8:2026-07-08",
          signalId: "signal:archive-url-7ed6d960c552a9731b9799f8",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "ECB policy meeting and liquidity scenario refresh.",
          implication: "ECB policy meeting and liquidity scenario refresh.",
          rank: 7,
          semanticHash: "40d1c79d1297170686a4bd840e58ff69b625a911c85bbe9a7b5c3a8ea76d8291",
          sourceIds: ["source:archive-url-7ed6d960c552a9731b9799f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6da5c44f2e8e34a728e94736:2026-07-08",
          signalId: "signal:archive-url-6da5c44f2e8e34a728e94736",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "MiCA transition checks and crypto counterparty review.",
          implication: "MiCA transition checks and crypto counterparty review.",
          rank: 8,
          semanticHash: "19dbfa7f72c7b2dd632b09e8940bb4cf59a67c297da7fd8011d967a8ff740d4c",
          sourceIds: ["source:archive-url-6da5c44f2e8e34a728e94736"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e97eb021f6e217599096a6a:2026-07-08",
          signalId: "signal:archive-url-5e97eb021f6e217599096a6a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "CSDR settlement discipline and post-trade readiness.",
          implication: "CSDR settlement discipline and post-trade readiness.",
          rank: 9,
          semanticHash: "26324fea816f13cb2e173b7c3043bf55f23d37e69fa35eeb953b3dbdb4dd8112",
          sourceIds: ["source:archive-url-5e97eb021f6e217599096a6a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-80d3b0edeb7b7a5dfda2d08a:2026-07-08",
          signalId: "signal:archive-url-80d3b0edeb7b7a5dfda2d08a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "FCA reporting",
          implication: "FCA reporting",
          rank: 10,
          semanticHash: "ed440f651370623e4c3e9788500ae2aec92393f57232e42a27983cbdfceae0ff",
          sourceIds: ["source:archive-url-80d3b0edeb7b7a5dfda2d08a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8e4fa5d9d725f18b55f08e82:2026-07-08",
          signalId: "signal:archive-url-8e4fa5d9d725f18b55f08e82",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "AI review / FCA",
          implication: "AI review / FCA",
          rank: 11,
          semanticHash: "c44453b58f9f6ad3e43f9eb27f32e76ea8b71dcf11f964aa7213738cde42e1c0",
          sourceIds: ["source:archive-url-8e4fa5d9d725f18b55f08e82"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-48a27defa6ce142a7fa525a9:2026-07-08",
          signalId: "signal:archive-url-48a27defa6ce142a7fa525a9",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source / Financial Times",
          implication: "Source / Financial Times",
          rank: 12,
          semanticHash: "37b179158a9deb596e2f0ecfcd962c8ac6d8184d67248610d2e471da554f8760",
          sourceIds: ["source:archive-url-48a27defa6ce142a7fa525a9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19c38ad2ba74da13f9e60492:2026-07-08",
          signalId: "signal:archive-url-19c38ad2ba74da13f9e60492",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source trail",
          implication: "Source trail",
          rank: 13,
          semanticHash: "bf4c3de7788150100761cb44a8d6b5a3a439459ed5dc47ca8e0cdb0f16412dc1",
          sourceIds: ["source:archive-url-19c38ad2ba74da13f9e60492"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e9aae36f1f9fc45c3f100d00:2026-07-08",
          signalId: "signal:archive-url-e9aae36f1f9fc45c3f100d00",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Sanctions penalty / OFSI",
          implication: "Sanctions penalty / OFSI",
          rank: 14,
          semanticHash: "31fe2d456e7fd830b17fff2bf0c02b3eb7fea1071d50dc2884386f035406f01b",
          sourceIds: ["source:archive-url-e9aae36f1f9fc45c3f100d00"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0d5975b24bd99e886f57d25a:2026-07-08",
          signalId: "signal:archive-url-0d5975b24bd99e886f57d25a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 15,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-0d5975b24bd99e886f57d25a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-66a71c860d9d1d35493e5397:2026-07-08",
          signalId: "signal:archive-url-66a71c860d9d1d35493e5397",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 16,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-66a71c860d9d1d35493e5397"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0890b19d23f3d8f6460cc9a4:2026-07-08",
          signalId: "signal:archive-url-0890b19d23f3d8f6460cc9a4",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source / Guardian",
          implication: "Source / Guardian",
          rank: 17,
          semanticHash: "6218771f72420ffa040047702356a63ddf5f7622c8de5bfb254cdace8ed58f03",
          sourceIds: ["source:archive-url-0890b19d23f3d8f6460cc9a4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-40a9c0e034d9fe76a7372dd4:2026-07-08",
          signalId: "signal:archive-url-40a9c0e034d9fe76a7372dd4",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Tom's Guide",
          implication: "Tom's Guide",
          rank: 18,
          semanticHash: "b7ba739f28dd1b9eb1c0e30ffdc16738c6ceb4860e06fd8a969c1dce0d1713ce",
          sourceIds: ["source:archive-url-40a9c0e034d9fe76a7372dd4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7bf7167814d64e2ac7dc190:2026-07-08",
          signalId: "signal:archive-url-e7bf7167814d64e2ac7dc190",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Wired",
          implication: "Wired",
          rank: 19,
          semanticHash: "fa6269dee4acd01f4de254f68328f961de68d3518318742917ad1578ac3a5ea6",
          sourceIds: ["source:archive-url-e7bf7167814d64e2ac7dc190"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-0907fd7aa19070fb4c3d706b",
          title: "EU ESG ratings governance and procurement evidence.",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3a91b17362d2bbb66863c1c6",
          title: "Complaints duty / ICO",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1bdaf6abcf88847c82e3fe13",
          title: "Financial Stability Report / BoE",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-85446fbdc069f12a8340b703",
          title: "PRA funded reinsurance consultation closes.",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d51a90d42f1d1fd278b6c0bd",
          title: "BCBS 239",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs239.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-414f9a1fe1f2bd314f13434a",
          title: "Frontier AI cyber warning / EBA",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7ed6d960c552a9731b9799f8",
          title: "ECB policy meeting and liquidity scenario refresh.",
          publisher: "ecb.europa.eu",
          url: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6da5c44f2e8e34a728e94736",
          title: "MiCA transition checks and crypto counterparty review.",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e97eb021f6e217599096a6a",
          title: "CSDR settlement discipline and post-trade readiness.",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-80d3b0edeb7b7a5dfda2d08a",
          title: "FCA reporting",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8e4fa5d9d725f18b55f08e82",
          title: "AI review / FCA",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-48a27defa6ce142a7fa525a9",
          title: "Source / Financial Times",
          publisher: "ft.com",
          url: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-19c38ad2ba74da13f9e60492",
          title: "Source trail",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e9aae36f1f9fc45c3f100d00",
          title: "Sanctions penalty / OFSI",
          publisher: "gov.uk",
          url: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0d5975b24bd99e886f57d25a",
          title: "TechRadar",
          publisher: "techradar.com",
          url: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-66a71c860d9d1d35493e5397",
          title: "TechRadar",
          publisher: "techradar.com",
          url: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0890b19d23f3d8f6460cc9a4",
          title: "Source / Guardian",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-40a9c0e034d9fe76a7372dd4",
          title: "Tom's Guide",
          publisher: "tomsguide.com",
          url: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e7bf7167814d64e2ac7dc190",
          title: "Wired",
          publisher: "wired.com",
          url: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/archive/brief/2026-07-09/",
    status: 200,
    kind: "brief",
    archetype: "archive",
    sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-09/",
    capturedAt: "2026-07-10T14:16:05Z",
    sourceSha256: "ec806b0c1eb5e6fd052a927def90b2820d4be45ccdd5f2bbfcadb460274d7578",
    metadata: {
      title: "Weekly Brief | The Virtual Officer",
      description:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      canonical: "https://stgeorgesstrategy.com/brief/",
      openGraphTitle: "Weekly Brief | The Virtual Officer",
      openGraphDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      openGraphUrl: "https://stgeorgesstrategy.com/brief/",
      openGraphImage:
        "https://stgeorgesstrategy.com/dashboard/assets/financial-services-intelligence-hero.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Weekly Brief | The Virtual Officer",
      twitterDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Weekly Brief",
        description:
          "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
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
        datePublished: "2026-07-09",
        dateModified: "2026-07-09",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/brief/",
        },
      },
    },
    selectionReason: "frozen-historical",
    evidence: [
      {
        key: "frozen:ec806b0c1eb5e6fd052a927def90b2820d4be45ccdd5f2bbfcadb460274d7578:/archive/brief/2026-07-09/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/archive/brief/2026-07-09/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "ec806b0c1eb5e6fd052a927def90b2820d4be45ccdd5f2bbfcadb460274d7578",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Weekly brief / Week of 6 Jul 2026",
        title: "Regulators land on both sides of the AI risk story in the same week",
        dek: "The FCA's first review of AI in retail financial services and the ESAs' warning on systemic cyber risk from frontier AI models arrived days apart. Firms need one evidence base that covers both conduct outcomes and cyber resilience.",
        questions: [
          [
            {
              kind: "strong",
              content: "Read the so-what",
            },
            {
              kind: "text",
              value: " — one paragraph, the judgement for the week.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Scan the Top 5",
            },
            {
              kind: "text",
              value: " — five ranked signals, each linked to its full topic page.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Take the board question to committee",
            },
            {
              kind: "text",
              value: " — one challenge question built to travel into a risk or governance forum.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Check Reg Horizon",
            },
            {
              kind: "text",
              value: " — the dates below that need an owner before they close.",
            },
          ],
        ],
      },
      summary:
        "So what: this week's FCA AI review and the ESA/ESRB frontier-AI cyber warning point to the same test. Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, accountable for customer outcomes, and resilient against AI-accelerated attack, before it scales further into customer, market, payments, or control workflows.",
      priorities: {
        heading: {
          eyebrow: "Top 5",
          title: "This week's significant signals",
          description:
            "The brief is intentionally selective. The eight topic pages hold the full Top 5 shortlists and supporting evidence rows; the weekly issue carries the judgement about what should reach a leadership conversation.",
        },
        items: [
          {
            rank: "01",
            title:
              "FCA's first AI review puts retail outcomes and agentic control on the same page",
            href: "/signals/ai/",
            meta: "AI governance / FCA, 6 Jul",
          },
          {
            rank: "02",
            title:
              "Frontier AI models are now a declared systemic cyber risk, say the ESAs and ESRB",
            href: "/signals/cyber/",
            meta: "Cyber / EBA-ESMA-EIOPA, 7 Jul",
          },
          {
            rank: "03",
            title:
              "OFSI's largest-ever circumvention penalty resets sanctions control expectations",
            href: "/signals/financial-crime/",
            meta: "Financial crime / OFSI, 17 Jun",
          },
          {
            rank: "04",
            title:
              "Bank of England's July Financial Stability Report resets the resilience and market baseline",
            href: "/signals/resilience/",
            meta: "Resilience / Market structure / BoE, 7 Jul",
          },
          {
            rank: "05",
            title: "A new UK legal duty on data protection complaints takes effect",
            href: "/signals/data/",
            meta: "Data / ICO, 23 Jun",
          },
        ],
      },
      streams: {
        heading: {
          eyebrow: "Coverage read",
          title: "How the eight streams fed the issue",
          description:
            "The weekly Top 5 is not one item per topic. It is the editorial shortlist from the eight-stream signal library, with related streams carried as read-across.",
        },
        cards: [
          {
            meta: "AI",
            title: "Lead signal",
            href: "/signals/ai/",
            paragraphs: [
              "Agentic control, permission boundaries, kill switches, and escalation evidence.",
            ],
          },
          {
            meta: "Financial crime",
            title: "Read-across",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Scams, cryptoasset AML, sanctions screening, and customer harm evidence.",
            ],
          },
          {
            meta: "Technology failure",
            title: "Read-across",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Payment outages, cloud dependencies, recovery tests, and customer-visible failure paths.",
            ],
          },
          {
            meta: "Cyber",
            title: "Read-across",
            href: "/signals/cyber/",
            paragraphs: [
              "Vulnerability response, ransomware recovery, identity controls, and threat-led testing.",
            ],
          },
          {
            meta: "Data",
            title: "Read-across",
            href: "/signals/data/",
            paragraphs: [
              "Risk data lineage, reporting quality, AI inputs, privacy records, and evidence integrity.",
            ],
          },
          {
            meta: "Third-party",
            title: "Dependency layer",
            href: "/signals/third-party/",
            paragraphs: [
              "Model providers, processors, cloud, contracts, audit rights, and exit practicality.",
            ],
          },
          {
            meta: "Resilience",
            title: "Service layer",
            href: "/signals/resilience/",
            paragraphs: [
              "Important business services, tolerances, fallback evidence, and incident learning.",
            ],
          },
          {
            meta: "Markets",
            title: "Exposure layer",
            href: "/signals/market-structure/",
            paragraphs: [
              "AI capex, crypto rules, liquidity assumptions, private credit, and market plumbing.",
            ],
          },
        ],
      },
      decisionWindow: [
        {
          meta: "Board question",
          title:
            "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
          paragraphs: [
            "This is the usable executive challenge question that travels from the weekly brief into risk committees.",
          ],
        },
        {
          meta: "Control evidence",
          title: "Inventory, permissions, kill switch, fallback, and rehearsed escalation",
          paragraphs: [
            "The point is evidence of control operation, not only policy approval or model documentation.",
          ],
        },
        {
          meta: "Archive logic",
          title: "Every weekly brief becomes a dated issue with links to topic pages",
          paragraphs: [
            "The archive shows how judgement changed over time and preserves the source trail.",
          ],
        },
      ],
      lead: {
        heading: {
          eyebrow: "Executive pulse",
          title: "The full weekly readout",
          description:
            "The weekly brief carries the deeper read: what changed, which functions are affected, what follow-up belongs on an owner list, and which sources justify the judgement.",
        },
        meta: "Operating readout",
        title:
          "AI's regulatory moment, sanctions enforcement, and systemic resilience converge in the same week",
        paragraphs: [
          "The operating brief has sharpened: the FCA's first review of AI in retail financial services lands the same week the ESAs and ESRB declare frontier AI models a systemic cyber risk; OFSI's largest-ever circumvention penalty resets sanctions expectations; the Bank of England's July Financial Stability Report resets the resilience and market baseline; and a new UK legal duty on data-protection complaints becomes the latest evidence-quality test.",
        ],
        lenses: [
          {
            title: "AI-agent read",
            body: "The FCA's Mills-led review expects firms to show explicit permissions, kill switches, liability routes, human accountability, and rehearsed degraded operation before agentic AI scales further into customer, market, or payments workflows.",
          },
          {
            title: "Financial-crime read",
            body: "OFSI's Sabre Global penalty, the FCA's sanctions systems review, and the FATF's new fraud roadmap should be read together as one sanctions-and-fraud evidence-quality problem, not three separate compliance streams.",
          },
          {
            title: "Cyber and resilience read",
            body: "The ESAs' and ESRB's frontier-AI cyber warning and the Bank of England's Financial Stability Report both point the same way: AI-accelerated attacks and third-party concentration now belong on the same resilience test as payment and technology outages.",
          },
          {
            title: "Data and markets read",
            body: "The ICO's new complaints-handling duty, data lineage, AI infrastructure exposure, and regulatory reporting quality are becoming connected tests of management information.",
          },
        ],
        sources: [
          {
            href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
            label: "AI review / FCA",
          },
          {
            href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
            label: "Frontier AI cyber warning / EBA",
          },
          {
            href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
            label: "Sanctions penalty / OFSI",
          },
          {
            href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
            label: "Financial Stability Report / BoE",
          },
          {
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
            label: "Complaints duty / ICO",
          },
        ],
      },
      committeeAngles: {
        heading: {
          eyebrow: "Regulator watch",
          title: "Questions the speeches put on the table",
          description:
            "Regulator speeches are included because they often signal supervisory direction before formal rules arrive — reading them alongside the rules gives an earlier warning than either source alone.",
        },
        cards: [
          {
            meta: "Autonomous agents",
            title: "The FCA's first AI review sets a sharper control vocabulary",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Refresh the AI inventory against the FCA's review to include agentic workflows, permission boundaries, external model and cloud dependencies, kill-switch ownership, and evidence of control operation.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
                label: "Source / FCA, 6 Jul",
              },
            ],
          },
          {
            meta: "Financial crime",
            title: "Sanctions circumvention is now a tested enforcement category",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Check whether sanctions due diligence, alert quality, and escalation would catch circumvention attempts like OFSI's Sabre Global case, not only direct breaches.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
                label: "Source / OFSI, 17 Jun",
              },
            ],
          },
          {
            meta: "Cyber and resilience",
            title: "Frontier AI is now a named systemic cyber risk",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Ask whether cyber scenarios and patch SLAs already assume AI-accelerated vulnerability discovery, not last year's threat-actor speed.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
                label: "Source / EBA-ESRB, 7 Jul",
              },
            ],
          },
        ],
      },
      evidenceAsks: {
        heading: {
          eyebrow: "Control lessons",
          title: "Failure patterns to test internally",
          description:
            "These cards turn public events into usable internal challenge: what happened, what control lesson follows, and what question a firm should ask before the next committee pack.",
        },
        cards: [
          {
            meta: "Payments",
            title:
              "Payment outages need processor, tokenisation, power, comms, and fallback mapping",
            facts: [
              {
                term: "What happened",
                description:
                  "A card-payment outage during peak demand showed how a nonbank infrastructure layer can still create customer harm for financial firms.",
              },
              {
                term: "Control lesson",
                description:
                  "Payment resilience needs explicit dependency mapping for processor platforms, tokenisation, power, communications, and fallback acceptance paths.",
              },
            ],
            question:
              "Question Which critical payment journeys would fail if a processor, tokenisation provider, or telecom route degraded for two hours tonight?",
            sources: [
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source / Guardian",
              },
            ],
          },
          {
            meta: "Digital services",
            title: "Internet routing and CDN dependencies need customer-edge telemetry",
            facts: [
              {
                term: "What happened",
                description:
                  "Outage spikes across major digital services showed that status pages can stay green while customers experience failure.",
              },
              {
                term: "Control lesson",
                description:
                  "Concentration risk includes internet routing, CDN, private interconnect, and carrier dependencies, not only core application uptime.",
              },
            ],
            question:
              "Question Do we know which network providers and CDN paths sit behind each top digital service by user region?",
            sources: [
              {
                href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                label: "Tom's Guide",
              },
              {
                href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Scams",
            title: "Scam controls are becoming a core banking obligation",
            facts: [
              {
                term: "What happened",
                description:
                  "Recent penalties and remediation cases show fraud, conduct, complaints, restrictions, and restoration speed converging into one supervisory narrative.",
              },
              {
                term: "Control lesson",
                description:
                  "Scam controls are not just customer education; prevention, complaint ageing, and restoration speed become evidence of control quality.",
              },
            ],
            question:
              "Question Where do rising scam typologies, known control gaps, or complaint ageing risk being characterised as systemic inaction?",
            sources: [
              {
                href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
                label: "Source / Financial Times",
              },
            ],
          },
          {
            meta: "AI identity",
            title: "AI agents create privileged-identity risk",
            facts: [
              {
                term: "What happened",
                description:
                  "AI accelerates discovery and exploitation while agentic tools can touch code, tickets, data, and communication channels.",
              },
              {
                term: "Control lesson",
                description:
                  "Patch SLAs, agent permissions, audit logs, and emergency stops need measurable technical enforcement outside the model prompt.",
              },
            ],
            question:
              "Question Which AI agents or copilots can touch production data, code, email, or tickets today, and are their permissions and emergency stops technically enforced?",
            sources: [
              {
                href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
                label: "Wired",
              },
              {
                href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Data lineage",
            title: "Reporting and AI controls fail if the data trail is not provable",
            facts: [
              {
                term: "What happened",
                description:
                  "Risk data, regulatory reporting, AI inputs, surveillance data, and privacy records are now part of the same evidence conversation.",
              },
              {
                term: "Control lesson",
                description:
                  "Lineage, validation, exception ownership, retention, access, and sign-off should be evidenced before a report, model, or control output is relied on.",
              },
            ],
            question:
              "Question Which critical decisions this week relied on data whose source, transformation, quality controls, and accountable sign-off can be reconstructed?",
            sources: [
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "BCBS 239",
              },
              {
                href: "https://www.fca.org.uk/firms/regulatory-reporting",
                label: "FCA reporting",
              },
            ],
          },
        ],
      },
      nextQuestions: {
        heading: {
          eyebrow: "Executive challenge",
          title: "Three questions from the week",
          description:
            "This is the most portable part of the edition: it gives the reader something they can carry into a committee, 1:1, or control review.",
        },
        questions: [
          "Which top customer journeys depend on third parties whose failure would look to customers like our failure, and when did we last test the fallback?",
          "Where are we relying on policy, attestation, or status pages instead of telemetry, technical controls, and evidence of recovery under stress?",
          "Which weak signals have owners, dates, and executive visibility: payment fallback gaps, scam exposure, data-lineage weaknesses, customer-edge telemetry, exposed vulnerabilities, or AI-agent permissions?",
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Reg Horizon",
          title: "Dates that need owners now",
          description:
            "The horizon section keeps the weekly operating rhythm visible: date, decision point, owner prompt, and the archive trail behind each item.",
        },
        deadlines: [
          {
            date: "1 Jul",
            dateTime: "2026-07-01",
            action: "MiCA transition checks and crypto counterparty review.",
            href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
            owner: "Digital assets",
          },
          {
            date: "2 Jul",
            dateTime: "2026-07-02",
            action: "EU ESG ratings governance and procurement evidence.",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            owner: "Risk / Legal",
          },
          {
            date: "7 Jul",
            dateTime: "2026-07-07",
            action: "CSDR settlement discipline and post-trade readiness.",
            href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
            owner: "Operations",
          },
          {
            date: "23 Jul",
            dateTime: "2026-07-23",
            action: "ECB policy meeting and liquidity scenario refresh.",
            href: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
            owner: "Treasury",
          },
          {
            date: "31 Jul",
            dateTime: "2026-07-31",
            action: "PRA funded reinsurance consultation closes.",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            owner: "Insurance risk",
          },
        ],
        sources: [
          {
            href: "/regulatory-horizon/latest.json",
            label: "Source data / latest.json",
          },
          {
            href: "/regulatory-horizon/",
            label: "Full horizon page",
          },
        ],
      },
      radar: {
        heading: {
          eyebrow: "Thought leadership radar",
          title: "Three follow-up angles worth carrying forward",
          description:
            "The brief stays short by carrying forward only the themes that deserve a fuller note or another week of leadership attention.",
        },
        cards: [
          {
            meta: "AI",
            title: "Banking agents need control rooms, not only productivity cases",
            paragraphs: [
              "Agentic AI will not fail like a normal application, because the failure mode may be plausible action at speed rather than a clean outage.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " Enterprise adoption is moving from copilots into delegated workflows that touch customers, code, payments, and controls.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Transformation, model risk, operational resilience, product, and control owners.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/ai/",
                label: "AI signals",
              },
              {
                href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Technology failure",
            title: "Payment outages reveal the real operating perimeter",
            paragraphs: [
              "A customer does not care whether the failure sits inside the bank, a processor, a tokenisation path, a telecoms route, or a cloud service.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " High-volume outage events make fallback, communications, and customer-edge telemetry more important than internal status alone.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Operations, payments, resilience, technology risk, service owners, and incident response leads.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/technology-failure/",
                label: "Technology failure signals",
              },
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Data",
            title: "Data lineage is becoming the evidence layer for AI, cyber, and reporting",
            paragraphs: [
              "The question is not only whether data is accurate. It is whether the firm can prove source, transformation, quality control, ownership, and use.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " AI adoption, supervisory analytics, cyber evidence, and regulatory reporting all depend on data that can be reconstructed under challenge.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Data owners, risk, finance, compliance, technology, privacy, AI governance, and internal audit.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/data/",
                label: "Data signals",
              },
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "Source trail",
              },
            ],
          },
        ],
      },
    },
    archiveComparison: {
      state: "available",
      previousLabel: "weekly-brief / 2026-07-08",
      currentLabel: "weekly-brief / 2026-07-09",
      previousRevisions: [
        {
          id: "signal-revision:archive-url-0907fd7aa19070fb4c3d706b:2026-07-08",
          signalId: "signal:archive-url-0907fd7aa19070fb4c3d706b",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "EU ESG ratings governance and procurement evidence.",
          implication: "EU ESG ratings governance and procurement evidence.",
          rank: 1,
          semanticHash: "3fe195144c2fa779a638c29ff299c490d416c99a2be5b0a980a21ec0130633db",
          sourceIds: ["source:archive-url-0907fd7aa19070fb4c3d706b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3a91b17362d2bbb66863c1c6:2026-07-08",
          signalId: "signal:archive-url-3a91b17362d2bbb66863c1c6",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Complaints duty / ICO",
          implication: "Complaints duty / ICO",
          rank: 2,
          semanticHash: "840437e135454819f25cd4cad2c9e864dd3335727e4cae400415518175ae01b1",
          sourceIds: ["source:archive-url-3a91b17362d2bbb66863c1c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1bdaf6abcf88847c82e3fe13:2026-07-08",
          signalId: "signal:archive-url-1bdaf6abcf88847c82e3fe13",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Financial Stability Report / BoE",
          implication: "Financial Stability Report / BoE",
          rank: 3,
          semanticHash: "4ca05807c4613de0a031465ea9baa9868dba8f859f91d51f5f7fdd359d611f28",
          sourceIds: ["source:archive-url-1bdaf6abcf88847c82e3fe13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-85446fbdc069f12a8340b703:2026-07-08",
          signalId: "signal:archive-url-85446fbdc069f12a8340b703",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "PRA funded reinsurance consultation closes.",
          implication: "PRA funded reinsurance consultation closes.",
          rank: 4,
          semanticHash: "ce8d6f2f5523829213800328d2e1631ff589869256a9e88a996f6fc3e260f2de",
          sourceIds: ["source:archive-url-85446fbdc069f12a8340b703"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d51a90d42f1d1fd278b6c0bd:2026-07-08",
          signalId: "signal:archive-url-d51a90d42f1d1fd278b6c0bd",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "BCBS 239",
          implication: "BCBS 239",
          rank: 5,
          semanticHash: "9639584c6805350f34311f31b3de5172470b2cf53778047c1b6d716150cdca0b",
          sourceIds: ["source:archive-url-d51a90d42f1d1fd278b6c0bd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-414f9a1fe1f2bd314f13434a:2026-07-08",
          signalId: "signal:archive-url-414f9a1fe1f2bd314f13434a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Frontier AI cyber warning / EBA",
          implication: "Frontier AI cyber warning / EBA",
          rank: 6,
          semanticHash: "a843eacd287fed36d21afa9351374790e3e5786eb675eb120ee335d5040b92b4",
          sourceIds: ["source:archive-url-414f9a1fe1f2bd314f13434a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ed6d960c552a9731b9799f8:2026-07-08",
          signalId: "signal:archive-url-7ed6d960c552a9731b9799f8",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "ECB policy meeting and liquidity scenario refresh.",
          implication: "ECB policy meeting and liquidity scenario refresh.",
          rank: 7,
          semanticHash: "40d1c79d1297170686a4bd840e58ff69b625a911c85bbe9a7b5c3a8ea76d8291",
          sourceIds: ["source:archive-url-7ed6d960c552a9731b9799f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6da5c44f2e8e34a728e94736:2026-07-08",
          signalId: "signal:archive-url-6da5c44f2e8e34a728e94736",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "MiCA transition checks and crypto counterparty review.",
          implication: "MiCA transition checks and crypto counterparty review.",
          rank: 8,
          semanticHash: "19dbfa7f72c7b2dd632b09e8940bb4cf59a67c297da7fd8011d967a8ff740d4c",
          sourceIds: ["source:archive-url-6da5c44f2e8e34a728e94736"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e97eb021f6e217599096a6a:2026-07-08",
          signalId: "signal:archive-url-5e97eb021f6e217599096a6a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "CSDR settlement discipline and post-trade readiness.",
          implication: "CSDR settlement discipline and post-trade readiness.",
          rank: 9,
          semanticHash: "26324fea816f13cb2e173b7c3043bf55f23d37e69fa35eeb953b3dbdb4dd8112",
          sourceIds: ["source:archive-url-5e97eb021f6e217599096a6a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-80d3b0edeb7b7a5dfda2d08a:2026-07-08",
          signalId: "signal:archive-url-80d3b0edeb7b7a5dfda2d08a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "FCA reporting",
          implication: "FCA reporting",
          rank: 10,
          semanticHash: "ed440f651370623e4c3e9788500ae2aec92393f57232e42a27983cbdfceae0ff",
          sourceIds: ["source:archive-url-80d3b0edeb7b7a5dfda2d08a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8e4fa5d9d725f18b55f08e82:2026-07-08",
          signalId: "signal:archive-url-8e4fa5d9d725f18b55f08e82",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "AI review / FCA",
          implication: "AI review / FCA",
          rank: 11,
          semanticHash: "c44453b58f9f6ad3e43f9eb27f32e76ea8b71dcf11f964aa7213738cde42e1c0",
          sourceIds: ["source:archive-url-8e4fa5d9d725f18b55f08e82"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-48a27defa6ce142a7fa525a9:2026-07-08",
          signalId: "signal:archive-url-48a27defa6ce142a7fa525a9",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source / Financial Times",
          implication: "Source / Financial Times",
          rank: 12,
          semanticHash: "37b179158a9deb596e2f0ecfcd962c8ac6d8184d67248610d2e471da554f8760",
          sourceIds: ["source:archive-url-48a27defa6ce142a7fa525a9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19c38ad2ba74da13f9e60492:2026-07-08",
          signalId: "signal:archive-url-19c38ad2ba74da13f9e60492",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source trail",
          implication: "Source trail",
          rank: 13,
          semanticHash: "bf4c3de7788150100761cb44a8d6b5a3a439459ed5dc47ca8e0cdb0f16412dc1",
          sourceIds: ["source:archive-url-19c38ad2ba74da13f9e60492"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e9aae36f1f9fc45c3f100d00:2026-07-08",
          signalId: "signal:archive-url-e9aae36f1f9fc45c3f100d00",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Sanctions penalty / OFSI",
          implication: "Sanctions penalty / OFSI",
          rank: 14,
          semanticHash: "31fe2d456e7fd830b17fff2bf0c02b3eb7fea1071d50dc2884386f035406f01b",
          sourceIds: ["source:archive-url-e9aae36f1f9fc45c3f100d00"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0d5975b24bd99e886f57d25a:2026-07-08",
          signalId: "signal:archive-url-0d5975b24bd99e886f57d25a",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 15,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-0d5975b24bd99e886f57d25a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-66a71c860d9d1d35493e5397:2026-07-08",
          signalId: "signal:archive-url-66a71c860d9d1d35493e5397",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 16,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-66a71c860d9d1d35493e5397"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0890b19d23f3d8f6460cc9a4:2026-07-08",
          signalId: "signal:archive-url-0890b19d23f3d8f6460cc9a4",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Source / Guardian",
          implication: "Source / Guardian",
          rank: 17,
          semanticHash: "6218771f72420ffa040047702356a63ddf5f7622c8de5bfb254cdace8ed58f03",
          sourceIds: ["source:archive-url-0890b19d23f3d8f6460cc9a4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-40a9c0e034d9fe76a7372dd4:2026-07-08",
          signalId: "signal:archive-url-40a9c0e034d9fe76a7372dd4",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Tom's Guide",
          implication: "Tom's Guide",
          rank: 18,
          semanticHash: "b7ba739f28dd1b9eb1c0e30ffdc16738c6ceb4860e06fd8a969c1dce0d1713ce",
          sourceIds: ["source:archive-url-40a9c0e034d9fe76a7372dd4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7bf7167814d64e2ac7dc190:2026-07-08",
          signalId: "signal:archive-url-e7bf7167814d64e2ac7dc190",
          editionId: "edition:authored-weekly-brief:2026-07-08",
          title: "Wired",
          implication: "Wired",
          rank: 19,
          semanticHash: "fa6269dee4acd01f4de254f68328f961de68d3518318742917ad1578ac3a5ea6",
          sourceIds: ["source:archive-url-e7bf7167814d64e2ac7dc190"],
          provenance: [],
        },
      ],
      currentRevisions: [
        {
          id: "signal-revision:archive-url-0907fd7aa19070fb4c3d706b:2026-07-09",
          signalId: "signal:archive-url-0907fd7aa19070fb4c3d706b",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "EU ESG ratings governance and procurement evidence.",
          implication: "EU ESG ratings governance and procurement evidence.",
          rank: 1,
          semanticHash: "3fe195144c2fa779a638c29ff299c490d416c99a2be5b0a980a21ec0130633db",
          sourceIds: ["source:archive-url-0907fd7aa19070fb4c3d706b"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-3a91b17362d2bbb66863c1c6:2026-07-09",
          signalId: "signal:archive-url-3a91b17362d2bbb66863c1c6",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Complaints duty / ICO",
          implication: "Complaints duty / ICO",
          rank: 2,
          semanticHash: "840437e135454819f25cd4cad2c9e864dd3335727e4cae400415518175ae01b1",
          sourceIds: ["source:archive-url-3a91b17362d2bbb66863c1c6"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-1bdaf6abcf88847c82e3fe13:2026-07-09",
          signalId: "signal:archive-url-1bdaf6abcf88847c82e3fe13",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Financial Stability Report / BoE",
          implication: "Financial Stability Report / BoE",
          rank: 3,
          semanticHash: "4ca05807c4613de0a031465ea9baa9868dba8f859f91d51f5f7fdd359d611f28",
          sourceIds: ["source:archive-url-1bdaf6abcf88847c82e3fe13"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-85446fbdc069f12a8340b703:2026-07-09",
          signalId: "signal:archive-url-85446fbdc069f12a8340b703",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "PRA funded reinsurance consultation closes.",
          implication: "PRA funded reinsurance consultation closes.",
          rank: 4,
          semanticHash: "ce8d6f2f5523829213800328d2e1631ff589869256a9e88a996f6fc3e260f2de",
          sourceIds: ["source:archive-url-85446fbdc069f12a8340b703"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-d51a90d42f1d1fd278b6c0bd:2026-07-09",
          signalId: "signal:archive-url-d51a90d42f1d1fd278b6c0bd",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "BCBS 239",
          implication: "BCBS 239",
          rank: 5,
          semanticHash: "9639584c6805350f34311f31b3de5172470b2cf53778047c1b6d716150cdca0b",
          sourceIds: ["source:archive-url-d51a90d42f1d1fd278b6c0bd"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-414f9a1fe1f2bd314f13434a:2026-07-09",
          signalId: "signal:archive-url-414f9a1fe1f2bd314f13434a",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Frontier AI cyber warning / EBA",
          implication: "Frontier AI cyber warning / EBA",
          rank: 6,
          semanticHash: "a843eacd287fed36d21afa9351374790e3e5786eb675eb120ee335d5040b92b4",
          sourceIds: ["source:archive-url-414f9a1fe1f2bd314f13434a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-7ed6d960c552a9731b9799f8:2026-07-09",
          signalId: "signal:archive-url-7ed6d960c552a9731b9799f8",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "ECB policy meeting and liquidity scenario refresh.",
          implication: "ECB policy meeting and liquidity scenario refresh.",
          rank: 7,
          semanticHash: "40d1c79d1297170686a4bd840e58ff69b625a911c85bbe9a7b5c3a8ea76d8291",
          sourceIds: ["source:archive-url-7ed6d960c552a9731b9799f8"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-6da5c44f2e8e34a728e94736:2026-07-09",
          signalId: "signal:archive-url-6da5c44f2e8e34a728e94736",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "MiCA transition checks and crypto counterparty review.",
          implication: "MiCA transition checks and crypto counterparty review.",
          rank: 8,
          semanticHash: "19dbfa7f72c7b2dd632b09e8940bb4cf59a67c297da7fd8011d967a8ff740d4c",
          sourceIds: ["source:archive-url-6da5c44f2e8e34a728e94736"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-5e97eb021f6e217599096a6a:2026-07-09",
          signalId: "signal:archive-url-5e97eb021f6e217599096a6a",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "CSDR settlement discipline and post-trade readiness.",
          implication: "CSDR settlement discipline and post-trade readiness.",
          rank: 9,
          semanticHash: "26324fea816f13cb2e173b7c3043bf55f23d37e69fa35eeb953b3dbdb4dd8112",
          sourceIds: ["source:archive-url-5e97eb021f6e217599096a6a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-80d3b0edeb7b7a5dfda2d08a:2026-07-09",
          signalId: "signal:archive-url-80d3b0edeb7b7a5dfda2d08a",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "FCA reporting",
          implication: "FCA reporting",
          rank: 10,
          semanticHash: "ed440f651370623e4c3e9788500ae2aec92393f57232e42a27983cbdfceae0ff",
          sourceIds: ["source:archive-url-80d3b0edeb7b7a5dfda2d08a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-8e4fa5d9d725f18b55f08e82:2026-07-09",
          signalId: "signal:archive-url-8e4fa5d9d725f18b55f08e82",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "AI review / FCA",
          implication: "AI review / FCA",
          rank: 11,
          semanticHash: "c44453b58f9f6ad3e43f9eb27f32e76ea8b71dcf11f964aa7213738cde42e1c0",
          sourceIds: ["source:archive-url-8e4fa5d9d725f18b55f08e82"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-48a27defa6ce142a7fa525a9:2026-07-09",
          signalId: "signal:archive-url-48a27defa6ce142a7fa525a9",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Source / Financial Times",
          implication: "Source / Financial Times",
          rank: 12,
          semanticHash: "37b179158a9deb596e2f0ecfcd962c8ac6d8184d67248610d2e471da554f8760",
          sourceIds: ["source:archive-url-48a27defa6ce142a7fa525a9"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-19c38ad2ba74da13f9e60492:2026-07-09",
          signalId: "signal:archive-url-19c38ad2ba74da13f9e60492",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Source trail",
          implication: "Source trail",
          rank: 13,
          semanticHash: "bf4c3de7788150100761cb44a8d6b5a3a439459ed5dc47ca8e0cdb0f16412dc1",
          sourceIds: ["source:archive-url-19c38ad2ba74da13f9e60492"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e9aae36f1f9fc45c3f100d00:2026-07-09",
          signalId: "signal:archive-url-e9aae36f1f9fc45c3f100d00",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Sanctions penalty / OFSI",
          implication: "Sanctions penalty / OFSI",
          rank: 14,
          semanticHash: "31fe2d456e7fd830b17fff2bf0c02b3eb7fea1071d50dc2884386f035406f01b",
          sourceIds: ["source:archive-url-e9aae36f1f9fc45c3f100d00"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0d5975b24bd99e886f57d25a:2026-07-09",
          signalId: "signal:archive-url-0d5975b24bd99e886f57d25a",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 15,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-0d5975b24bd99e886f57d25a"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-66a71c860d9d1d35493e5397:2026-07-09",
          signalId: "signal:archive-url-66a71c860d9d1d35493e5397",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "TechRadar",
          implication: "TechRadar",
          rank: 16,
          semanticHash: "71e83eebbc9c03d3067f3f4e1982a42362a2e336c059140d2b6d886202259f37",
          sourceIds: ["source:archive-url-66a71c860d9d1d35493e5397"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-0890b19d23f3d8f6460cc9a4:2026-07-09",
          signalId: "signal:archive-url-0890b19d23f3d8f6460cc9a4",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Source / Guardian",
          implication: "Source / Guardian",
          rank: 17,
          semanticHash: "6218771f72420ffa040047702356a63ddf5f7622c8de5bfb254cdace8ed58f03",
          sourceIds: ["source:archive-url-0890b19d23f3d8f6460cc9a4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-40a9c0e034d9fe76a7372dd4:2026-07-09",
          signalId: "signal:archive-url-40a9c0e034d9fe76a7372dd4",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Tom's Guide",
          implication: "Tom's Guide",
          rank: 18,
          semanticHash: "b7ba739f28dd1b9eb1c0e30ffdc16738c6ceb4860e06fd8a969c1dce0d1713ce",
          sourceIds: ["source:archive-url-40a9c0e034d9fe76a7372dd4"],
          provenance: [],
        },
        {
          id: "signal-revision:archive-url-e7bf7167814d64e2ac7dc190:2026-07-09",
          signalId: "signal:archive-url-e7bf7167814d64e2ac7dc190",
          editionId: "edition:authored-weekly-brief:2026-07-09",
          title: "Wired",
          implication: "Wired",
          rank: 19,
          semanticHash: "fa6269dee4acd01f4de254f68328f961de68d3518318742917ad1578ac3a5ea6",
          sourceIds: ["source:archive-url-e7bf7167814d64e2ac7dc190"],
          provenance: [],
        },
      ],
      sources: [
        {
          id: "source:archive-url-0907fd7aa19070fb4c3d706b",
          title: "EU ESG ratings governance and procurement evidence.",
          publisher: "eur-lex.europa.eu",
          url: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-3a91b17362d2bbb66863c1c6",
          title: "Complaints duty / ICO",
          publisher: "ico.org.uk",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-1bdaf6abcf88847c82e3fe13",
          title: "Financial Stability Report / BoE",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-85446fbdc069f12a8340b703",
          title: "PRA funded reinsurance consultation closes.",
          publisher: "bankofengland.co.uk",
          url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-d51a90d42f1d1fd278b6c0bd",
          title: "BCBS 239",
          publisher: "bis.org",
          url: "https://www.bis.org/publ/bcbs239.htm",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-414f9a1fe1f2bd314f13434a",
          title: "Frontier AI cyber warning / EBA",
          publisher: "eba.europa.eu",
          url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-7ed6d960c552a9731b9799f8",
          title: "ECB policy meeting and liquidity scenario refresh.",
          publisher: "ecb.europa.eu",
          url: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-6da5c44f2e8e34a728e94736",
          title: "MiCA transition checks and crypto counterparty review.",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-5e97eb021f6e217599096a6a",
          title: "CSDR settlement discipline and post-trade readiness.",
          publisher: "esma.europa.eu",
          url: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-80d3b0edeb7b7a5dfda2d08a",
          title: "FCA reporting",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/firms/regulatory-reporting",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-8e4fa5d9d725f18b55f08e82",
          title: "AI review / FCA",
          publisher: "fca.org.uk",
          url: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-48a27defa6ce142a7fa525a9",
          title: "Source / Financial Times",
          publisher: "ft.com",
          url: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-19c38ad2ba74da13f9e60492",
          title: "Source trail",
          publisher: "ft.com",
          url: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e9aae36f1f9fc45c3f100d00",
          title: "Sanctions penalty / OFSI",
          publisher: "gov.uk",
          url: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0d5975b24bd99e886f57d25a",
          title: "TechRadar",
          publisher: "techradar.com",
          url: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-66a71c860d9d1d35493e5397",
          title: "TechRadar",
          publisher: "techradar.com",
          url: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-0890b19d23f3d8f6460cc9a4",
          title: "Source / Guardian",
          publisher: "theguardian.com",
          url: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-40a9c0e034d9fe76a7372dd4",
          title: "Tom's Guide",
          publisher: "tomsguide.com",
          url: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
          sourceClass: "primary",
          provenance: [],
        },
        {
          id: "source:archive-url-e7bf7167814d64e2ac7dc190",
          title: "Wired",
          publisher: "wired.com",
          url: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
          sourceClass: "primary",
          provenance: [],
        },
      ],
    },
  },
  {
    route: "/brief/",
    status: 200,
    kind: "brief",
    archetype: "weekly-brief",
    sourceUrl: "https://stgeorgesstrategy.com/brief/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d",
    metadata: {
      title: "Weekly Brief | The Virtual Officer",
      description:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      canonical: "https://stgeorgesstrategy.com/brief/",
      openGraphTitle: "Weekly Brief | The Virtual Officer",
      openGraphDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      openGraphUrl: "https://stgeorgesstrategy.com/brief/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Weekly Brief | The Virtual Officer",
      twitterDescription:
        "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Weekly Brief",
        description:
          "The weekly so-what brief for financial-services leaders, with five significant signals, control implications, source trails, and executive challenge questions.",
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
        datePublished: "2026-07-09",
        dateModified: "2026-07-09",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://stgeorgesstrategy.com/brief/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:ec806b0c1eb5e6fd052a927def90b2820d4be45ccdd5f2bbfcadb460274d7578:/brief/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/brief/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "ec806b0c1eb5e6fd052a927def90b2820d4be45ccdd5f2bbfcadb460274d7578",
      },
      {
        key: "live:ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d:/brief/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/brief/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "ff4585e92e4c0db92ea37a52672ca027f22fd5cf6fe8cb7d4020c55a31c6a80d",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Weekly brief / Week of 6 Jul 2026",
        title: "Regulators land on both sides of the AI risk story in the same week",
        dek: "The FCA's first review of AI in retail financial services and the ESAs' warning on systemic cyber risk from frontier AI models arrived days apart. Firms need one evidence base that covers both conduct outcomes and cyber resilience.",
        questionsLabel: "Five-minute read",
        questions: [
          [
            {
              kind: "strong",
              content: "Read the so-what",
            },
            {
              kind: "text",
              value: " — one paragraph, the judgement for the week.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Scan the Top 5",
            },
            {
              kind: "text",
              value: " — five ranked signals, each linked to its full topic page.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Take the board question to committee",
            },
            {
              kind: "text",
              value: " — one challenge question built to travel into a risk or governance forum.",
            },
          ],
          [
            {
              kind: "strong",
              content: "Check Reg Horizon",
            },
            {
              kind: "text",
              value: " — the dates below that need an owner before they close.",
            },
          ],
        ],
      },
      summary:
        "So what: this week's FCA AI review and the ESA/ESRB frontier-AI cyber warning point to the same test. Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, accountable for customer outcomes, and resilient against AI-accelerated attack, before it scales further into customer, market, payments, or control workflows.",
      priorities: {
        heading: {
          eyebrow: "Top 5",
          title: "This week's significant signals",
          description:
            "The brief is intentionally selective. The eight topic pages hold the full Top 5 shortlists and supporting evidence rows; the weekly issue carries the judgement about what should reach a leadership conversation.",
        },
        items: [
          {
            rank: "01",
            title:
              "FCA's first AI review puts retail outcomes and agentic control on the same page",
            href: "/signals/ai/",
            meta: "AI governance / FCA, 6 Jul",
          },
          {
            rank: "02",
            title:
              "Frontier AI models are now a declared systemic cyber risk, say the ESAs and ESRB",
            href: "/signals/cyber/",
            meta: "Cyber / EBA-ESMA-EIOPA, 7 Jul",
          },
          {
            rank: "03",
            title:
              "OFSI's largest-ever circumvention penalty resets sanctions control expectations",
            href: "/signals/financial-crime/",
            meta: "Financial crime / OFSI, 17 Jun",
          },
          {
            rank: "04",
            title:
              "Bank of England's July Financial Stability Report resets the resilience and market baseline",
            href: "/signals/resilience/",
            meta: "Resilience / Market structure / BoE, 7 Jul",
          },
          {
            rank: "05",
            title: "A new UK legal duty on data protection complaints takes effect",
            href: "/signals/data/",
            meta: "Data / ICO, 23 Jun",
          },
        ],
      },
      streams: {
        heading: {
          eyebrow: "Coverage read",
          title: "How the eight streams fed the issue",
          description:
            "The weekly Top 5 is not one item per topic. It is the editorial shortlist from the eight-stream signal library, with related streams carried as read-across.",
        },
        cards: [
          {
            meta: "AI",
            title: "Lead signal",
            href: "/signals/ai/",
            paragraphs: [
              "Agentic control, permission boundaries, kill switches, and escalation evidence.",
            ],
          },
          {
            meta: "Financial crime",
            title: "Read-across",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Scams, cryptoasset AML, sanctions screening, and customer harm evidence.",
            ],
          },
          {
            meta: "Technology failure",
            title: "Read-across",
            href: "/signals/technology-failure/",
            paragraphs: [
              "Payment outages, cloud dependencies, recovery tests, and customer-visible failure paths.",
            ],
          },
          {
            meta: "Cyber",
            title: "Read-across",
            href: "/signals/cyber/",
            paragraphs: [
              "Vulnerability response, ransomware recovery, identity controls, and threat-led testing.",
            ],
          },
          {
            meta: "Data",
            title: "Read-across",
            href: "/signals/data/",
            paragraphs: [
              "Risk data lineage, reporting quality, AI inputs, privacy records, and evidence integrity.",
            ],
          },
          {
            meta: "Third-party",
            title: "Dependency layer",
            href: "/signals/third-party/",
            paragraphs: [
              "Model providers, processors, cloud, contracts, audit rights, and exit practicality.",
            ],
          },
          {
            meta: "Resilience",
            title: "Service layer",
            href: "/signals/resilience/",
            paragraphs: [
              "Important business services, tolerances, fallback evidence, and incident learning.",
            ],
          },
          {
            meta: "Markets",
            title: "Exposure layer",
            href: "/signals/market-structure/",
            paragraphs: [
              "AI capex, crypto rules, liquidity assumptions, private credit, and market plumbing.",
            ],
          },
        ],
      },
      decisionWindow: [
        {
          meta: "Board question",
          title:
            "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
          paragraphs: [
            "This is the usable executive challenge question that travels from the weekly brief into risk committees.",
          ],
        },
        {
          meta: "Control evidence",
          title: "Inventory, permissions, kill switch, fallback, and rehearsed escalation",
          paragraphs: [
            "The point is evidence of control operation, not only policy approval or model documentation.",
          ],
        },
        {
          meta: "Archive logic",
          title: "Every weekly brief becomes a dated issue with links to topic pages",
          paragraphs: [
            "The archive shows how judgement changed over time and preserves the source trail.",
          ],
        },
      ],
      lead: {
        heading: {
          eyebrow: "Executive pulse",
          title: "The full weekly readout",
          description:
            "The weekly brief carries the deeper read: what changed, which functions are affected, what follow-up belongs on an owner list, and which sources justify the judgement.",
        },
        meta: "Operating readout",
        title:
          "AI's regulatory moment, sanctions enforcement, and systemic resilience converge in the same week",
        paragraphs: [
          "The operating brief has sharpened: the FCA's first review of AI in retail financial services lands the same week the ESAs and ESRB declare frontier AI models a systemic cyber risk; OFSI's largest-ever circumvention penalty resets sanctions expectations; the Bank of England's July Financial Stability Report resets the resilience and market baseline; and a new UK legal duty on data-protection complaints becomes the latest evidence-quality test.",
        ],
        lenses: [
          {
            title: "AI-agent read",
            body: "The FCA's Mills-led review expects firms to show explicit permissions, kill switches, liability routes, human accountability, and rehearsed degraded operation before agentic AI scales further into customer, market, or payments workflows.",
          },
          {
            title: "Financial-crime read",
            body: "OFSI's Sabre Global penalty, the FCA's sanctions systems review, and the FATF's new fraud roadmap should be read together as one sanctions-and-fraud evidence-quality problem, not three separate compliance streams.",
          },
          {
            title: "Cyber and resilience read",
            body: "The ESAs' and ESRB's frontier-AI cyber warning and the Bank of England's Financial Stability Report both point the same way: AI-accelerated attacks and third-party concentration now belong on the same resilience test as payment and technology outages.",
          },
          {
            title: "Data and markets read",
            body: "The ICO's new complaints-handling duty, data lineage, AI infrastructure exposure, and regulatory reporting quality are becoming connected tests of management information.",
          },
        ],
        sources: [
          {
            href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
            label: "AI review / FCA",
          },
          {
            href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
            label: "Frontier AI cyber warning / EBA",
          },
          {
            href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
            label: "Sanctions penalty / OFSI",
          },
          {
            href: "https://www.bankofengland.co.uk/financial-stability-report/2026/july-2026",
            label: "Financial Stability Report / BoE",
          },
          {
            href: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/06/new-data-protection-complaints-law-now-in-force/",
            label: "Complaints duty / ICO",
          },
        ],
      },
      committeeAngles: {
        heading: {
          eyebrow: "Regulator watch",
          title: "Questions the speeches put on the table",
          description:
            "Regulator speeches are included because they often signal supervisory direction before formal rules arrive — reading them alongside the rules gives an earlier warning than either source alone.",
        },
        cards: [
          {
            meta: "Autonomous agents",
            title: "The FCA's first AI review sets a sharper control vocabulary",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Refresh the AI inventory against the FCA's review to include agentic workflows, permission boundaries, external model and cloud dependencies, kill-switch ownership, and evidence of control operation.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
                label: "Source / FCA, 6 Jul",
              },
            ],
          },
          {
            meta: "Financial crime",
            title: "Sanctions circumvention is now a tested enforcement category",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Check whether sanctions due diligence, alert quality, and escalation would catch circumvention attempts like OFSI's Sabre Global case, not only direct breaches.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.gov.uk/government/news/uk-issues-largest-penalty-for-financial-sanctions-breaches-since-russias-2022-illegal-invasion-of-ukraine",
                label: "Source / OFSI, 17 Jun",
              },
            ],
          },
          {
            meta: "Cyber and resilience",
            title: "Frontier AI is now a named systemic cyber risk",
            paragraphs: [
              [
                {
                  kind: "strong",
                  content: "Follow-up:",
                },
                {
                  kind: "text",
                  value:
                    " Ask whether cyber scenarios and patch SLAs already assume AI-accelerated vulnerability discovery, not last year's threat-actor speed.",
                },
              ],
            ],
            sources: [
              {
                href: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
                label: "Source / EBA-ESRB, 7 Jul",
              },
            ],
          },
        ],
      },
      evidenceAsks: {
        heading: {
          eyebrow: "Control lessons",
          title: "Failure patterns to test internally",
          description:
            "These cards turn public events into usable internal challenge: what happened, what control lesson follows, and what question a firm should ask before the next committee pack.",
        },
        cards: [
          {
            meta: "Payments",
            title:
              "Payment outages need processor, tokenisation, power, comms, and fallback mapping",
            facts: [
              {
                term: "What happened",
                description:
                  "A card-payment outage during peak demand showed how a nonbank infrastructure layer can still create customer harm for financial firms.",
              },
              {
                term: "Control lesson",
                description:
                  "Payment resilience needs explicit dependency mapping for processor platforms, tokenisation, power, communications, and fallback acceptance paths.",
              },
            ],
            question:
              "Question Which critical payment journeys would fail if a processor, tokenisation provider, or telecom route degraded for two hours tonight?",
            sources: [
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source / Guardian",
              },
            ],
          },
          {
            meta: "Digital services",
            title: "Internet routing and CDN dependencies need customer-edge telemetry",
            facts: [
              {
                term: "What happened",
                description:
                  "Outage spikes across major digital services showed that status pages can stay green while customers experience failure.",
              },
              {
                term: "Control lesson",
                description:
                  "Concentration risk includes internet routing, CDN, private interconnect, and carrier dependencies, not only core application uptime.",
              },
            ],
            question:
              "Question Do we know which network providers and CDN paths sit behind each top digital service by user region?",
            sources: [
              {
                href: "https://www.tomsguide.com/news/live/reddit-down-live-outage-6-22-2026",
                label: "Tom's Guide",
              },
              {
                href: "https://www.techradar.com/news/live/x-and-reddit-down-june-2026",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Scams",
            title: "Scam controls are becoming a core banking obligation",
            facts: [
              {
                term: "What happened",
                description:
                  "Recent penalties and remediation cases show fraud, conduct, complaints, restrictions, and restoration speed converging into one supervisory narrative.",
              },
              {
                term: "Control lesson",
                description:
                  "Scam controls are not just customer education; prevention, complaint ageing, and restoration speed become evidence of control quality.",
              },
            ],
            question:
              "Question Where do rising scam typologies, known control gaps, or complaint ageing risk being characterised as systemic inaction?",
            sources: [
              {
                href: "https://www.ft.com/content/32b5af43-6ceb-452d-ac2f-d4cda3f4938c",
                label: "Source / Financial Times",
              },
            ],
          },
          {
            meta: "AI identity",
            title: "AI agents create privileged-identity risk",
            facts: [
              {
                term: "What happened",
                description:
                  "AI accelerates discovery and exploitation while agentic tools can touch code, tickets, data, and communication channels.",
              },
              {
                term: "Control lesson",
                description:
                  "Patch SLAs, agent permissions, audit logs, and emergency stops need measurable technical enforcement outside the model prompt.",
              },
            ],
            question:
              "Question Which AI agents or copilots can touch production data, code, email, or tickets today, and are their permissions and emergency stops technically enforced?",
            sources: [
              {
                href: "https://www.wired.com/story/cisa-ai-vulnerability-directive",
                label: "Wired",
              },
              {
                href: "https://www.techradar.com/pro/phishing-the-agent-why-ai-guardrails-arent-enough",
                label: "TechRadar",
              },
            ],
          },
          {
            meta: "Data lineage",
            title: "Reporting and AI controls fail if the data trail is not provable",
            facts: [
              {
                term: "What happened",
                description:
                  "Risk data, regulatory reporting, AI inputs, surveillance data, and privacy records are now part of the same evidence conversation.",
              },
              {
                term: "Control lesson",
                description:
                  "Lineage, validation, exception ownership, retention, access, and sign-off should be evidenced before a report, model, or control output is relied on.",
              },
            ],
            question:
              "Question Which critical decisions this week relied on data whose source, transformation, quality controls, and accountable sign-off can be reconstructed?",
            sources: [
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "BCBS 239",
              },
              {
                href: "https://www.fca.org.uk/firms/regulatory-reporting",
                label: "FCA reporting",
              },
            ],
          },
        ],
      },
      nextQuestions: {
        heading: {
          eyebrow: "Executive challenge",
          title: "Three questions from the week",
          description:
            "This is the most portable part of the edition: it gives the reader something they can carry into a committee, 1:1, or control review.",
        },
        questions: [
          "Which top customer journeys depend on third parties whose failure would look to customers like our failure, and when did we last test the fallback?",
          "Where are we relying on policy, attestation, or status pages instead of telemetry, technical controls, and evidence of recovery under stress?",
          "Which weak signals have owners, dates, and executive visibility: payment fallback gaps, scam exposure, data-lineage weaknesses, customer-edge telemetry, exposed vulnerabilities, or AI-agent permissions?",
        ],
      },
      deadlines: {
        heading: {
          eyebrow: "Reg Horizon",
          title: "Dates that need owners now",
          description:
            "The horizon section keeps the weekly operating rhythm visible: date, decision point, owner prompt, and the archive trail behind each item.",
        },
        deadlines: [
          {
            date: "1 Jul",
            dateTime: "2026-07-01",
            action: "MiCA transition checks and crypto counterparty review.",
            href: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
            owner: "Digital assets",
          },
          {
            date: "2 Jul",
            dateTime: "2026-07-02",
            action: "EU ESG ratings governance and procurement evidence.",
            href: "https://eur-lex.europa.eu/eli/reg/2024/3005/oj",
            owner: "Risk / Legal",
          },
          {
            date: "7 Jul",
            dateTime: "2026-07-07",
            action: "CSDR settlement discipline and post-trade readiness.",
            href: "https://www.esma.europa.eu/esmas-activities/markets-and-infrastructure/central-securities-depositories",
            owner: "Operations",
          },
          {
            date: "23 Jul",
            dateTime: "2026-07-23",
            action: "ECB policy meeting and liquidity scenario refresh.",
            href: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html",
            owner: "Treasury",
          },
          {
            date: "31 Jul",
            dateTime: "2026-07-31",
            action: "PRA funded reinsurance consultation closes.",
            href: "https://www.bankofengland.co.uk/prudential-regulation/publication/2026/april/funded-reinsurance-consultation-paper",
            owner: "Insurance risk",
          },
        ],
        sources: [
          {
            href: "/regulatory-horizon/latest.json",
            label: "Source data / latest.json",
          },
          {
            href: "/regulatory-horizon/",
            label: "Full horizon page",
          },
        ],
      },
      radar: {
        heading: {
          eyebrow: "Thought leadership radar",
          title: "Three angles worth developing",
          description:
            "The brief stays short by carrying forward only the themes that deserve a fuller note or another week of leadership attention.",
        },
        cards: [
          {
            meta: "AI",
            title: "Banking agents need control rooms, not only productivity cases",
            paragraphs: [
              "Agentic AI will not fail like a normal application, because the failure mode may be plausible action at speed rather than a clean outage.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " Enterprise adoption is moving from copilots into delegated workflows that touch customers, code, payments, and controls.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Transformation, model risk, operational resilience, product, and control owners.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/ai/",
                label: "AI signals",
              },
              {
                href: "https://www.ft.com/content/61ccaf26-e0cf-41af-afc6-f5eb43e4e568",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Technology failure",
            title: "Payment outages reveal the real operating perimeter",
            paragraphs: [
              "A customer does not care whether the failure sits inside the bank, a processor, a tokenisation path, a telecoms route, or a cloud service.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " High-volume outage events make fallback, communications, and customer-edge telemetry more important than internal status alone.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Operations, payments, resilience, technology risk, service owners, and incident response leads.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/technology-failure/",
                label: "Technology failure signals",
              },
              {
                href: "https://www.theguardian.com/business/2026/jun/23/card-payments-outage-during-england-match-hits-pubs-and-shops",
                label: "Source trail",
              },
            ],
          },
          {
            meta: "Data",
            title: "Data lineage is becoming the evidence layer for AI, cyber, and reporting",
            paragraphs: [
              "The question is not only whether data is accurate. It is whether the firm can prove source, transformation, quality control, ownership, and use.",
              [
                {
                  kind: "strong",
                  content: "Why now:",
                },
                {
                  kind: "text",
                  value:
                    " AI adoption, supervisory analytics, cyber evidence, and regulatory reporting all depend on data that can be reconstructed under challenge.",
                },
              ],
              [
                {
                  kind: "strong",
                  content: "Audience:",
                },
                {
                  kind: "text",
                  value:
                    " Data owners, risk, finance, compliance, technology, privacy, AI governance, and internal audit.",
                },
              ],
            ],
            sources: [
              {
                href: "/signals/data/",
                label: "Data signals",
              },
              {
                href: "https://www.bis.org/publ/bcbs239.htm",
                label: "Source trail",
              },
            ],
          },
        ],
      },
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "brief" }>[];
