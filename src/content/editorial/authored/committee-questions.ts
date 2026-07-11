// Authored committee-questions data. Edit records here; layout belongs to the matching archetype component.
import type { AuthoredEditorialRecord } from "../authored-types";

export const committeeQuestionsRecords = [
  {
    route: "/committee-questions/",
    status: 200,
    kind: "committee-questions",
    archetype: "committee-questions",
    sourceUrl: "https://stgeorgesstrategy.com/committee-questions/",
    capturedAt: "2026-07-11T13:11:40.871Z",
    sourceSha256: "90f8eba30071cb08b4b7c2852114857902d7b8c2542474ba116b57627043f9a3",
    metadata: {
      title: "Committee Questions | The Virtual Officer",
      description:
        "A running set of board-ready committee questions, drawn from recent weekly briefs and Signals, for risk, compliance, resilience, technology, and AI governance leaders.",
      canonical: "https://stgeorgesstrategy.com/committee-questions/",
      openGraphTitle: "Committee Questions | The Virtual Officer",
      openGraphDescription:
        "A running set of board-ready committee questions, drawn from recent weekly briefs and Signals, for risk, compliance, resilience, technology, and AI governance leaders.",
      openGraphUrl: "https://stgeorgesstrategy.com/committee-questions/",
      openGraphImage: "https://stgeorgesstrategy.com/assets/og-card.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Committee Questions | The Virtual Officer",
      twitterDescription:
        "A running set of board-ready committee questions, drawn from recent weekly briefs and Signals, for risk, compliance, resilience, technology, and AI governance leaders.",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Committee Questions",
        description:
          "A running set of board-ready committee questions, drawn from recent weekly briefs and Signals.",
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
          "@id": "https://stgeorgesstrategy.com/committee-questions/",
        },
      },
    },
    selectionReason: "live-current",
    evidence: [
      {
        key: "frozen:e7078985965109bed75a6f1bb842123e1dfda04bcbc5e67a7f9080d1866f3eff:/committee-questions/",
        corpus: "frozen",
        status: 404,
        sourceUrl: "https://stgeorgesstrategy.com/committee-questions/",
        capturedAt: "2026-07-10T14:16:05Z",
        sourceSha256: "e7078985965109bed75a6f1bb842123e1dfda04bcbc5e67a7f9080d1866f3eff",
      },
      {
        key: "live:90f8eba30071cb08b4b7c2852114857902d7b8c2542474ba116b57627043f9a3:/committee-questions/",
        corpus: "live",
        status: 200,
        sourceUrl: "https://stgeorgesstrategy.com/committee-questions/",
        capturedAt: "2026-07-11T13:11:40.871Z",
        sourceSha256: "90f8eba30071cb08b4b7c2852114857902d7b8c2542474ba116b57627043f9a3",
      },
    ],
    content: {
      masthead: {
        eyebrow: "Committee questions",
        title: "Questions worth taking into the room",
        dek: "Every weekly brief resolves into a small number of portable questions. This page collects the ones still worth asking, pulled from recent editions and kept until they are answered or overtaken.",
        detail: "Last updated 9 Jul 2026 · drawn from the week of 6 Jul 2026",
      },
      introduction: {
        eyebrow: "How to use this",
        title: "Take one question, not all of them",
        description:
          "These are not a checklist. Pick the one or two that are live for your firm this quarter, put a name against them, and use the linked topic page for the source trail behind the question.",
      },
      sections: [
        {
          heading: {
            eyebrow: "AI and agentic control",
            title: "Authority, boundaries, and the kill switch",
            description:
              "The test is whether the firm can bound what an agent may do, see what it did, and stop it — with a named owner for each answer.",
          },
          cards: [
            {
              paragraphs: [
                "Ask this when agentic AI is being proposed for a bigger mandate — before the mandate, not after an incident.",
              ],
              question:
                "Board question Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
              sources: [
                {
                  href: "/signals/ai/",
                  label: "AI signals",
                },
                {
                  href: "/brief/",
                  label: "From the 6 Jul brief",
                },
              ],
            },
            {
              paragraphs: [
                "Ask AI governance teams for the permission map, not just the policy that describes what should happen.",
              ],
              question:
                "Governance question Which AI agents or copilots can touch production data, code, email, or tickets today, and are their permissions and emergency stops technically enforced?",
              sources: [
                {
                  href: "/signals/ai/",
                  label: "AI signals",
                },
                {
                  href: "/signals/cyber/",
                  label: "Cyber signals",
                },
              ],
            },
          ],
        },
        {
          heading: {
            eyebrow: "Resilience and third-party dependency",
            title: "What happens when the dependency, not the firm, fails",
          },
          cards: [
            {
              paragraphs: [
                "Turn each deadline or dependency into an owner, a decision, and an evidence trail before it is tested by an outage.",
              ],
              question:
                "Resilience question Which critical payment journeys would fail if a processor, tokenisation provider, or telecom route degraded for two hours tonight?",
              sources: [
                {
                  href: "/signals/resilience/",
                  label: "Resilience signals",
                },
                {
                  href: "/signals/third-party/",
                  label: "Third-party signals",
                },
              ],
            },
            {
              paragraphs: [
                "Status pages can stay green while customers experience failure — ask for customer-edge telemetry, not internal uptime alone.",
              ],
              question:
                "Telemetry question Do we know which network providers and CDN paths sit behind each top digital service, by user region?",
              sources: [
                {
                  href: "/signals/technology-failure/",
                  label: "Technology failure signals",
                },
              ],
            },
            {
              paragraphs: [
                "Give the three questions on this page to service owners, then ask for the fallback test evidence, not the assurance.",
              ],
              question:
                "Portability question Which top customer journeys depend on third parties whose failure would look to customers like our failure, and when did we last test the fallback?",
              sources: [
                {
                  href: "/signals/third-party/",
                  label: "Third-party signals",
                },
              ],
            },
            {
              paragraphs: [
                "Ask what would be shown to a supervisor, not what would be said to one.",
              ],
              question:
                "Evidence question Where are we relying on policy, attestation, or status pages instead of telemetry, technical controls, and evidence of recovery under stress?",
              sources: [
                {
                  href: "/regulatory-horizon/",
                  label: "Reg Horizon",
                },
              ],
            },
          ],
        },
        {
          heading: {
            eyebrow: "Financial crime and data",
            title: "Fraud, sanctions, and whether the data trail holds up",
          },
          cards: [
            {
              paragraphs: [
                "Scam controls are not only customer education; prevention, complaint ageing, and restoration speed are evidence of control quality.",
              ],
              question:
                "Conduct question Where do rising scam typologies, known control gaps, or complaint ageing risk being characterised as systemic inaction?",
              sources: [
                {
                  href: "/signals/financial-crime/",
                  label: "Financial crime signals",
                },
              ],
            },
            {
              paragraphs: [
                "Ask for what to show, not what to trust — lineage and sign-off should be provable on request, not asserted.",
              ],
              question:
                "Lineage question Which critical decisions this week relied on data whose source, transformation, quality controls, and accountable sign-off can be reconstructed?",
              sources: [
                {
                  href: "/signals/data/",
                  label: "Data signals",
                },
              ],
            },
          ],
        },
      ],
      status: [
        {
          kind: "text",
          value: "Have a question a committee actually asked that belongs here? Send it across — ",
        },
        {
          kind: "link",
          href: "mailto:ben@stgeorgesstrategy.com",
          content: "ben@stgeorgesstrategy.com",
        },
        {
          kind: "text",
          value: " — and it may be added to the next edition of this page.",
        },
      ],
    },
  },
] as const satisfies readonly Extract<AuthoredEditorialRecord, { kind: "committee-questions" }>[];
