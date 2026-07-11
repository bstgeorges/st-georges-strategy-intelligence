// Authored regulatory-horizon data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const regulatoryHorizonRecords = [
  {
    route: "/regulatory-horizon/",
    status: 200,
    kind: "regulatory-horizon",
    archetype: "regulatory-horizon",
    sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "cd956db89c886192d3f1a944e9811edf39299dccb3ca2a017faf41c93cb82740",
    metadata: {
      title: "Reg Horizon | The Virtual Officer",
      description:
        "A weekly Reg Horizon view of regulatory deadlines, policy movement, material signals, owner prompts, and source-backed evidence expectations.",
      canonical: "https://stgeorgesstrategy.com/regulatory-horizon/",
      openGraphTitle: "Reg Horizon | The Virtual Officer",
      openGraphDescription:
        "A weekly Reg Horizon view of regulatory deadlines, policy movement, material signals, owner prompts, and source-backed evidence expectations.",
      openGraphUrl: "https://stgeorgesstrategy.com/regulatory-horizon/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Reg Horizon | The Virtual Officer",
      twitterDescription:
        "A weekly Reg Horizon view of regulatory deadlines, policy movement, material signals, owner prompts, and source-backed evidence expectations.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Reg Horizon",
        description:
          "A weekly Reg Horizon view of regulatory deadlines, policy movement, material signals, owner prompts, and source-backed evidence expectations.",
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
          "@id": "https://stgeorgesstrategy.com/regulatory-horizon/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:6f4b6c92626191523f83adc4ac0296434008d7d5cda9a24459835f3fee3443aa:/regulatory-horizon/",
        corpus: "frozen",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "6f4b6c92626191523f83adc4ac0296434008d7d5cda9a24459835f3fee3443aa",
      },
      {
        key: "live:cd956db89c886192d3f1a944e9811edf39299dccb3ca2a017faf41c93cb82740:/regulatory-horizon/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/regulatory-horizon/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "cd956db89c886192d3f1a944e9811edf39299dccb3ca2a017faf41c93cb82740",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Reg Horizon",
        title: "What is coming next",
        dek: "A weekly public-source view of regulatory deadlines, policy movement, and the evidence prompts that should be owned before the date arrives.",
        detail:
          "This page turns regulatory movement into an operating decision: assign an owner, decide to respond or monitor, and keep the evidence before each deadline closes. Use it for the weekly review, deadline ownership, and the audit trail governance will ask for.",
      },
      dashboard: {
        heading: {
          eyebrow: "Edition / 2026-07-08",
          title: "This week's regulatory bottom line",
          description:
            "This edition is dominated by FCA movement across digital money, customer outcomes, and market plumbing. The practical question is whether accountable owners have been assigned before the next consultation deadline.",
          note: "Reg Horizon runs its own weekly scan and is dated separately from this week's main Weekly Brief and Signals updates — see the Archive for how each feed's freshness is tracked.",
        },
        summary:
          'The clearest trigger this week is "FCA sets landmark crypto rules to cement the UK\'s place as a global hub" from FCA. Material signals span digital money, customer outcomes, and market plumbing. One consultation remains open to influence.',
        metrics: [
          {
            label: "Material signals",
            value: "6",
            detail: "ranked items requiring business-impact triage",
          },
          {
            label: "Active themes",
            value: "3 / 8",
            detail: "digital money, customer outcomes, and market plumbing",
          },
          {
            label: "Open deadline",
            value: "14 Aug",
            detail: "listing-rules consultation needs an owner decision",
          },
          {
            label: "Primary source set",
            value: "FCA",
            detail: "current run is concentrated, so quiet themes remain watch-listed",
          },
        ],
      },
      operating: {
        heading: {
          eyebrow: "Operating readout",
          title: "What needs attention now",
          description:
            "The horizon scan should help an operating team prepare early: assign owners, test affected controls, follow the source evidence, and connect each move back to the Signals library.",
        },
        cards: [
          {
            meta: "Open influence window",
            title: "Consultation windows need a named decision owner",
            paragraphs: [
              "Decide whether to respond, monitor, or brief affected product and market teams before each close date.",
            ],
            facts: [
              {
                term: "Evidence",
                description:
                  "Owner, decision route, draft response or documented decision not to respond.",
              },
            ],
            sources: [
              {
                href: "#horizon-deadlines",
                label: "View deadline",
              },
            ],
          },
          {
            meta: "Digital money",
            title: "Crypto and stablecoin rules are becoming operating-model issues",
            paragraphs: [
              "Map affected counterparties, custody flows, capital assumptions, disclosures, and financial-crime controls.",
            ],
            facts: [
              {
                term: "Read-across",
                description:
                  "Financial crime, market structure, data lineage, and customer outcome controls.",
              },
            ],
            sources: [
              {
                href: "/signals/financial-crime/",
                label: "Financial crime signals",
              },
              {
                href: "/signals/market-structure/",
                label: "Markets signals",
              },
            ],
          },
          {
            meta: "Customer outcomes",
            title: "Disclosure and Consumer Duty perimeter changes need interpretation",
            paragraphs: [
              "Check whether product governance, client communications, complaints, overseas business, and redress assumptions need updating.",
            ],
            facts: [
              {
                term: "Read-across",
                description:
                  "Conduct evidence, complaints MI, product governance, and data-quality controls.",
              },
            ],
            sources: [
              {
                href: "/signals/data/",
                label: "Data signals",
              },
              {
                href: "/signals/financial-crime/",
                label: "Customer harm read-across",
              },
            ],
          },
          {
            meta: "Market plumbing",
            title: "Listing-rule change belongs with market-structure monitoring",
            paragraphs: [
              "Keep legal, product, markets, operations, and client-facing teams aligned on practical impact.",
            ],
            facts: [
              {
                term: "Read-across",
                description:
                  "Liquidity, disclosures, execution routes, governance sign-off, and client communications.",
              },
            ],
            sources: [
              {
                href: "/signals/market-structure/",
                label: "Markets signals",
              },
            ],
          },
        ],
      },
      currentDeadline: {
        heading: {
          eyebrow: "Reg Horizon dates",
          title: "Deadline with owner, action, and evidence prompts",
          description:
            "Each date should have an owner, an action decision, and evidence that the decision was made before the window closes.",
        },
        deadlines: [
          {
            date: [
              {
                kind: "text",
                value: "14 Aug",
              },
              {
                kind: "break",
              },
              {
                kind: "label",
                role: "meta",
                content: "31-60 days",
              },
            ],
            dateTime: "2026-08-14",
            action:
              "FCA consults on targeted changes to listing rules for closed-ended investment funds",
            href: "https://www.fca.org.uk/news/press-releases/fca-consults-targeted-changes-listing-rules-closed-ended-investment-funds",
            owner: "FCA",
          },
        ],
      },
      lanes: [
        {
          meta: "Owner",
          title: "Who decides whether we respond - and who drafts?",
          paragraphs: [
            "Name the accountable owner, contributors, legal reviewer, and governance forum before the deadline enters the last fortnight.",
          ],
        },
        {
          meta: "Action",
          title:
            "Log the closing date; decide respond, monitor, or brief at least two weeks before it",
          paragraphs: [
            "Turn each deadline into a tracked operating action, not a passive calendar entry.",
          ],
        },
        {
          meta: "Evidence",
          title: "Response draft, impact assessment, or documented decision not to respond",
          paragraphs: [
            "Evidence prompts make the horizon scan useful for audit trail, handover, and governance challenge.",
          ],
        },
      ],
      watchlist: {
        heading: {
          eyebrow: "Material signals",
          title: "Top 5 now. Additional rows as the scan widens",
          description:
            "The Reg Horizon follows the same discipline as Signals: a short leadership view first, then additional source-backed rows where the scan supports them.",
        },
        items: [
          {
            rank: "01",
            title: "FCA sets landmark crypto rules to cement the UK's place as a global hub",
            href: "https://www.fca.org.uk/news/press-releases/fca-sets-landmark-crypto-rules-cement-uks-place-global-hub",
            meta: "Final rule / digital-money",
          },
          {
            rank: "02",
            title: "FCA and Bank of England set out approach to systemic stablecoin issuers",
            href: "https://www.fca.org.uk/news/statements/fca-and-bank-england-set-out-approach-joint-regulation-systemic-stablecoin-issuers",
            meta: "Statement / digital-money",
          },
          {
            rank: "03",
            title: "Financial regulator to simplify investment disclosure regime",
            href: "https://www.fca.org.uk/news/press-releases/financial-regulator-simplify-investment-disclosure-regime",
            meta: "Customer outcomes",
          },
          {
            rank: "04",
            title: "Motor finance scheme partially suspended",
            href: "https://www.fca.org.uk/news/statements/motor-finance-scheme-partially-suspended",
            meta: "Customer outcomes",
          },
          {
            rank: "05",
            title:
              "FCA consults on targeted changes to listing rules for closed-ended investment funds",
            href: "https://www.fca.org.uk/news/press-releases/fca-consults-targeted-changes-listing-rules-closed-ended-investment-funds",
            meta: "Consultation / market-plumbing",
          },
        ],
      },
      evidenceWatchlist: {
        heading: {
          eyebrow: "Additional material rows",
          title: "What else made the run",
          description:
            "Only one further item cleared the material threshold beyond the Top 5 this edition.",
        },
        items: [
          {
            rank: "06",
            title: "Non-UK business removed from Consumer Duty scope",
            href: "https://www.fca.org.uk/news/press-releases/non-uk-business-removed-consumer-duty-scope-reduce-burdens-wholesale-businesses",
            meta: "Customer outcomes",
          },
        ],
      },
      coverage: {
        heading: {
          eyebrow: "Source coverage",
          title: "What the horizon engine should draw from",
          description:
            "The reg-scan registry spans approved core UK, EU/global, and national-supervisor sources, plus a pilot watch-list. Each edition publishes only what cleared the material threshold that week.",
        },
        cards: [
          {
            meta: "Approved / core UK",
            title: "FCA, BoE/PRA, HM Treasury, OFSI, PSR, NCSC",
            paragraphs: [
              "Conduct, prudential, sanctions, payments, cyber, resilience, and customer-harm signals.",
            ],
          },
          {
            meta: "Approved / EU and global",
            title: "ECB/SSM, EBA, ESMA, EIOPA, ESRB, FSB, IOSCO, FATF",
            paragraphs: [
              "Prudential, markets, financial stability, insurance, operational risk, and financial-crime signals.",
            ],
          },
          {
            meta: "Approved / national supervisors",
            title: "BaFin, Bundesbank, ACPR, AMF, CBI, CSSF, FINMA, SNB",
            paragraphs: [
              "Cross-border regulatory movement, non-English source intake, and supervisory read-across.",
            ],
          },
          {
            meta: "Pilot / watch only",
            title: "OFAC, NCA, DSIT, EDPB, CERT-EU, DFSA, ADGM, CMA and others",
            paragraphs: [
              "Useful policy watch sources, but not sole support for public material signals until promoted.",
            ],
          },
        ],
        note: "FCA supplies most of this week's material rows. Source concentration like this is flagged here each week so a single-regulator run doesn't read as full source-universe coverage.",
      },
      sources: {
        heading: {
          eyebrow: "Watch themes",
          title: "Where the signals landed",
          description:
            "This edition triggered three of the eight watch themes. Quiet themes still matter: a blank week is useful evidence when a topic is being monitored deliberately.",
        },
        cards: [
          {
            meta: "Active",
            title: "Digital money",
            paragraphs: [
              "Crypto, stablecoin, tokenisation, custody, payments, capital, stress testing, and financial crime controls.",
            ],
          },
          {
            meta: "Active",
            title: "Customer outcomes",
            paragraphs: [
              "Consumer Duty, disclosure, complaints, redress, vulnerable customers, promotions, and overseas perimeter changes.",
            ],
          },
          {
            meta: "Active",
            title: "Market plumbing",
            paragraphs: [
              "Listing rules, trading venues, settlement, clearing, benchmarks, repo, wholesale markets, and post-trade change.",
            ],
          },
          {
            meta: "Quiet this run",
            title: "Balance sheet",
            paragraphs: [
              "Capital, liquidity, funding, credit risk, insurance, reinsurance, leverage, and prudential reporting.",
            ],
          },
          {
            meta: "Quiet this run",
            title: "Board accountability",
            paragraphs: [
              "SMCR, governance, risk appetite, board packs, attestations, accountability, and committee evidence.",
            ],
          },
          {
            meta: "Quiet this run",
            title: "Crime and sanctions",
            paragraphs: [
              "AML, fraud, scams, sanctions, market abuse, surveillance, enforcement, and suspicious activity controls.",
            ],
          },
          {
            meta: "Quiet this run",
            title: "Digital resilience",
            paragraphs: [
              "Operational resilience, cyber, outsourcing, cloud, incident reporting, continuity, and critical third parties.",
            ],
          },
          {
            meta: "Quiet this run",
            title: "AI/model governance",
            paragraphs: [
              "AI assurance, model risk, automated decisioning, explainability, agentic systems, and validation evidence.",
            ],
          },
        ],
      },
      tools: {
        heading: {
          eyebrow: "Signals read-across",
          title: "Where horizon becomes operating risk",
          description:
            "Regulatory movement should feed the same eight-topic library as the weekly Signals page. This makes the horizon scan useful even when there is only one formal deadline.",
        },
        cards: [
          {
            meta: "Financial crime",
            title: "Digital-money rules become control evidence",
            href: "/signals/financial-crime/",
            paragraphs: [
              "Cryptoasset AML, sanctions screening, fraud typologies, and customer-harm controls need one view.",
            ],
          },
          {
            meta: "Market structure",
            title: "Listing-rule and crypto changes affect market plumbing",
            href: "/signals/market-structure/",
            paragraphs: [
              "Execution, liquidity, disclosure, product governance, and client-communication assumptions need review.",
            ],
          },
          {
            meta: "Data",
            title: "Regulatory change creates lineage questions",
            href: "/signals/data/",
            paragraphs: [
              "Disclosure, reporting, surveillance, product MI, and supervisory evidence need traceable data sources.",
            ],
          },
          {
            meta: "Third-party",
            title: "Stablecoin and platform changes travel through vendors",
            href: "/signals/third-party/",
            paragraphs: [
              "Custody, processors, market data, cloud, and outsourcing arrangements need contract and exit evidence.",
            ],
          },
        ],
      },
      archives: {
        heading: {
          eyebrow: "Evidence trail",
          title: "How to use this page",
          description:
            "The page should support three operating uses: weekly review, deadline ownership, and audit trail. The machine-readable files remain available, but the reader-facing purpose is governance and preparation.",
        },
        cards: [
          {
            meta: "Data",
            title: "Current edition JSON",
            href: "/regulatory-horizon/latest.json",
            paragraphs: [
              "Structured bottom line, horizon dates, signals, source links, and archive references.",
            ],
          },
          {
            meta: "Feed",
            title: "Material signals RSS",
            href: "/regulatory-horizon/feed.xml",
            paragraphs: [
              "A stable feed for readers or systems that want the regulatory signal stream, with a browser-friendly view for normal clicks.",
            ],
          },
          {
            meta: "Calendar",
            title: "Deadline calendar",
            href: "/regulatory-horizon/horizon.ics",
            paragraphs: [
              "All-day events for future deadlines that need owner assignment and evidence.",
            ],
          },
          {
            meta: "Archive",
            title: "Frozen edition",
            href: "/regulatory-horizon/archive/2026-07-02.html",
            paragraphs: [
              "A dated record of the bottom line, source set, and deadline prompts for review.",
            ],
          },
        ],
      },
      questions: {
        heading: {
          eyebrow: "Owner questions / editorial layer",
          title: "Questions for this week's governance rhythm",
          description:
            "These prompts are deliberately practical. They are refreshed as part of the weekly editorial pass and bridge the data feed to an accountable internal response.",
        },
        items: [
          "Which relationships, products, services, or client journeys are affected by this week's active horizon themes?",
          "Do product, legal, compliance, operations, and client teams agree on whether the live signals change current controls?",
          "Who owns each open consultation or deadline decision, and what evidence will show whether the firm responded, monitored, or consciously took no action?",
        ],
      },
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "regulatory-horizon" }>[];
