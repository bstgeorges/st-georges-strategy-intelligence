// @ts-expect-error Node's type-stripping runtime needs the explicit extension; the bundler supports it.
import { capturedArtifacts, frozenArtifactForRoute, liveArtifactForRoute } from "./artifacts.ts";
import type {
  ArtifactId,
  EditorialRepository,
  ParityAtom,
  ParityAtomKind,
  ProvenanceRef,
} from "./types";

function artifactId(value: ReturnType<typeof liveArtifactForRoute>, route: string): ArtifactId {
  if (!value) throw new Error(`Missing captured artifact for ${route}`);
  return value.id;
}

const frozenHome = artifactId(frozenArtifactForRoute("/"), "/");
const frozenAi = artifactId(frozenArtifactForRoute("/signals/ai/"), "/signals/ai/");
const frozenHorizon = artifactId(
  frozenArtifactForRoute("/regulatory-horizon/"),
  "/regulatory-horizon/",
);
const frozenCommittee = artifactId(
  frozenArtifactForRoute("/committee-questions/"),
  "/committee-questions/",
);
const liveHome = artifactId(liveArtifactForRoute("/"), "/");
const liveAi = artifactId(liveArtifactForRoute("/signals/ai/"), "/signals/ai/");
const liveHorizon = artifactId(
  liveArtifactForRoute("/regulatory-horizon/"),
  "/regulatory-horizon/",
);
const liveCommittee = artifactId(
  liveArtifactForRoute("/committee-questions/"),
  "/committee-questions/",
);

const textAnchor = (artifactId: ArtifactId, value: string): ProvenanceRef => ({
  artifactId,
  locator: { kind: "text-anchor", value },
});

const jsonPointer = (artifactId: ArtifactId, value: `/${string}`): ProvenanceRef => ({
  artifactId,
  locator: { kind: "json-pointer", value },
});

const parityAtoms = (
  prefix: string,
  artifactId: ArtifactId,
  mappedRef: NonNullable<ParityAtom["targetRefs"]>[number],
  overrides: Partial<Record<ParityAtomKind, ParityAtom["disposition"]>> = {},
): ParityAtom[] =>
  (["text", "heading", "link", "date", "source", "disclaimer", "metadata", "json-ld"] as const).map(
    (kind) => {
      const disposition = overrides[kind] ?? "mapped";
      return {
        id: `${prefix}:${kind}`,
        kind,
        source: textAnchor(artifactId, `${prefix}:${kind}`),
        disposition,
        targetRefs: disposition === "mapped" ? [mappedRef] : undefined,
        reason:
          disposition === "mapped"
            ? undefined
            : kind === "json-ld"
              ? "No truthful structured-data atom was present in this capture."
              : "The capture remains evidence but does not define the selected typed state.",
      };
    },
  );

export const editorialRepository = {
  artifacts: capturedArtifacts,
  series: [
    {
      id: "series:weekly-brief-html",
      name: "Weekly Brief (reader-facing HTML)",
      channel: "live-html",
      currentEditionId: "edition:weekly-brief:2026-07-06",
      cadence: "weekly",
    },
    {
      id: "series:ai-topic-html",
      name: "AI Signals dossier (reader-facing HTML)",
      channel: "live-html",
      currentEditionId: "edition:ai-topic:2026-07-08",
      cadence: "weekly",
    },
    {
      id: "series:ai-json",
      name: "AI Signals JSON",
      channel: "ai-json",
      currentEditionId: "edition:ai-json:2026-07-08",
      cadence: "weekly",
    },
    {
      id: "series:committee-html",
      name: "Committee Questions",
      channel: "live-html",
      currentEditionId: "edition:committee:2026-07-09",
      cadence: "weekly",
    },
    {
      id: "series:horizon-rendered-live",
      name: "Reg Horizon (reader-facing HTML)",
      channel: "live-html",
      currentEditionId: "edition:horizon-rendered:2026-07-08",
      cadence: "weekly",
    },
    {
      id: "series:horizon-rendered-frozen",
      name: "Reg Horizon (frozen clone evidence)",
      channel: "frozen-html",
      currentEditionId: "edition:horizon-rendered-frozen:2026-07-02",
      cadence: "captured",
    },
    {
      id: "series:horizon-json",
      name: "Reg Horizon JSON",
      channel: "horizon-json",
      currentEditionId: "edition:horizon-json:2026-07-08",
      cadence: "weekly",
    },
    {
      id: "series:horizon-rss",
      name: "Reg Horizon RSS",
      channel: "horizon-rss",
      currentEditionId: "edition:horizon-rss:2026-07-04",
      cadence: "weekly",
    },
    {
      id: "series:horizon-ics",
      name: "Reg Horizon deadline calendar",
      channel: "horizon-ics",
      currentEditionId: "edition:horizon-ics:2026-07-04",
      cadence: "weekly",
    },
  ],
  editions: [
    {
      id: "edition:weekly-brief:2026-07-06",
      seriesId: "series:weekly-brief-html",
      label: "Week of 6 Jul 2026",
      effectiveDate: "2026-07-06",
      artifactIds: [liveHome],
      provenance: [textAnchor(liveHome, "Latest brief / Week of 6 Jul 2026")],
    },
    {
      id: "edition:ai-topic:2026-07-08",
      seriesId: "series:ai-topic-html",
      label: "Week of 8 Jul 2026",
      effectiveDate: "2026-07-08",
      artifactIds: [liveAi],
      provenance: [textAnchor(liveAi, "Week of 8 Jul 2026")],
    },
    {
      id: "edition:ai-json:2026-07-08",
      seriesId: "series:ai-json",
      label: "Live edition / Updated 8 Jul 2026",
      effectiveDate: "2026-07-08",
      artifactIds: ["artifact:ai-json:2026-07-08"],
      provenance: [jsonPointer("artifact:ai-json:2026-07-08", "/edition/line")],
    },
    {
      id: "edition:committee:2026-07-09",
      seriesId: "series:committee-html",
      label: "Last updated 9 Jul 2026",
      effectiveDate: "2026-07-09",
      artifactIds: [liveCommittee],
      provenance: [textAnchor(liveCommittee, "Last updated 9 Jul 2026")],
    },
    {
      id: "edition:horizon-rendered:2026-07-08",
      seriesId: "series:horizon-rendered-live",
      label: "Edition / 2026-07-08",
      effectiveDate: "2026-07-08",
      artifactIds: [liveHorizon],
      provenance: [textAnchor(liveHorizon, "Edition / 2026-07-08")],
    },
    {
      id: "edition:horizon-rendered-frozen:2026-07-02",
      seriesId: "series:horizon-rendered-frozen",
      label: "Edition / 2026-07-02",
      effectiveDate: "2026-07-02",
      artifactIds: [frozenHorizon],
      provenance: [textAnchor(frozenHorizon, "Edition / 2026-07-02")],
    },
    {
      id: "edition:horizon-json:2026-07-08",
      seriesId: "series:horizon-json",
      label: "2026-07-08 JSON channel",
      effectiveDate: "2026-07-08",
      artifactIds: ["artifact:horizon-json:2026-07-08"],
      provenance: [jsonPointer("artifact:horizon-json:2026-07-08", "/edition")],
    },
    {
      id: "edition:horizon-rss:2026-07-04",
      seriesId: "series:horizon-rss",
      label: "Built 4 Jul 2026",
      effectiveDate: "2026-07-04",
      artifactIds: ["artifact:horizon-rss:2026-07-04"],
      provenance: [
        {
          artifactId: "artifact:horizon-rss:2026-07-04",
          locator: { kind: "rss-guid", value: "78dc46ad6326323d@reg-scan" },
        },
      ],
    },
    {
      id: "edition:horizon-ics:2026-07-04",
      seriesId: "series:horizon-ics",
      label: "Generated 4 Jul 2026",
      effectiveDate: "2026-07-04",
      artifactIds: ["artifact:horizon-ics:2026-07-04"],
      provenance: [
        {
          artifactId: "artifact:horizon-ics:2026-07-04",
          locator: { kind: "ics-uid", value: "267eda22338c4979@reg-scan" },
        },
      ],
    },
  ],
  topics: [
    ["ai", "AI and agentic control"],
    ["resilience", "Operational resilience"],
    ["third-party", "Third-party and vendor risk"],
    ["market-structure", "Market structure"],
    ["financial-crime", "Financial crime"],
    ["cyber", "Cyber"],
    ["technology-failure", "Technology failure"],
    ["data", "Data"],
  ].map(([slug, name]) => ({ id: `topic:${slug}` as const, slug, name })),
  sources: [
    {
      id: "source:fca-ai-retail-review-2026-07-06",
      title: "FCA publishes landmark review into the impact of AI on retail financial services",
      publisher: "FCA",
      url: "https://www.fca.org.uk/news/press-releases/fca-publishes-landmark-review-impact-ai-retail-financial-services",
      sourceClass: "primary",
      publishedDate: "2026-07-06",
      provenance: [textAnchor(liveAi, "FCA publishes landmark review")],
    },
    {
      id: "source:esas-frontier-ai-warning-2026-07-07",
      title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
      publisher: "EBA",
      url: "https://www.eba.europa.eu/publications-and-media/press-releases/esas-support-esrb-warning-systemic-cyber-risks-frontier-ai-models",
      sourceClass: "primary",
      publishedDate: "2026-07-07",
      provenance: [textAnchor(liveAi, "ESAs back ESRB warning")],
    },
    {
      id: "source:fca-listing-rules-consultation-2026",
      title: "FCA consults on targeted changes to listing rules for closed-ended investment funds",
      publisher: "FCA",
      url: "https://www.fca.org.uk/news/press-releases/fca-consults-targeted-changes-listing-rules-closed-ended-investment-funds",
      sourceClass: "primary",
      provenance: [textAnchor(liveHorizon, "FCA consults on targeted changes to listing rules")],
    },
    {
      id: "source:eba-email-alert-2026-07-03",
      title: "EBA E-mail alert 3 July, 2026",
      publisher: "EBA",
      url: "https://www.eba.europa.eu/node/19812",
      sourceClass: "official",
      publishedDate: "2026-07-03",
      provenance: [jsonPointer("artifact:horizon-json:2026-07-08", "/signals/0")],
    },
  ],
  signals: [
    { id: "signal:fca-ai-retail-review", topicIds: ["topic:ai"] },
    { id: "signal:esas-frontier-ai-cyber-warning", topicIds: ["topic:ai", "topic:cyber"] },
    { id: "signal:fca-listing-rules-closed-ended-funds", topicIds: ["topic:market-structure"] },
    { id: "signal:eba-email-alert-2026-07-03", topicIds: ["topic:market-structure"] },
  ],
  signalRevisions: [
    {
      id: "signal-revision:fca-ai-retail-review:2026-07-08",
      signalId: "signal:fca-ai-retail-review",
      editionId: "edition:ai-topic:2026-07-08",
      title: "FCA publishes landmark review into the impact of AI on retail financial services",
      implication: "Retail outcomes and agentic control now sit in one supervisory frame.",
      rank: 1,
      semanticHash: "414134c7f8b1dad1960f9dc41bfd586cd2983eeaa2f1e0786582bb0d83cc3f91",
      sourceIds: ["source:fca-ai-retail-review-2026-07-06"],
      provenance: [textAnchor(liveAi, "Top 5 AI signals")],
    },
    {
      id: "signal-revision:esas-frontier-ai-cyber-warning:2026-07-08",
      signalId: "signal:esas-frontier-ai-cyber-warning",
      editionId: "edition:ai-topic:2026-07-08",
      title: "ESAs back ESRB warning on systemic cyber risk from frontier AI models",
      implication: "AI governance must include cyber-resilience evidence.",
      rank: 2,
      semanticHash: "150a18fe736cb3c99a7a3a69c57c8de80d6ee779295e1f8845f2ed2b80bbf409",
      sourceIds: ["source:esas-frontier-ai-warning-2026-07-07"],
      provenance: [textAnchor(liveAi, "ESAs back ESRB warning")],
    },
    {
      id: "signal-revision:fca-listing-rules:rendered-2026-07-08",
      signalId: "signal:fca-listing-rules-closed-ended-funds",
      editionId: "edition:horizon-rendered:2026-07-08",
      title: "FCA consults on targeted changes to listing rules for closed-ended investment funds",
      implication: "The consultation needs an owner decision before 14 August.",
      rank: 5,
      semanticHash: "a413df474bb5e691ec46d9cd3394ac60ffbc20518dc48e5382c205bde3b9771c",
      sourceIds: ["source:fca-listing-rules-consultation-2026"],
      provenance: [textAnchor(liveHorizon, "14 Aug")],
    },
    {
      id: "signal-revision:eba-email-alert:horizon-json-2026-07-08",
      signalId: "signal:eba-email-alert-2026-07-03",
      editionId: "edition:horizon-json:2026-07-08",
      title: "EBA E-mail alert 3 July, 2026",
      implication: "Review the guidance before 2026-08-03.",
      rank: 1,
      semanticHash: "d30be9e82f34fc593bea2495e6cb06a39c08757f485fc084f79fef40fd469447",
      sourceIds: ["source:eba-email-alert-2026-07-03"],
      provenance: [jsonPointer("artifact:horizon-json:2026-07-08", "/signals/0")],
    },
  ],
  judgements: [
    {
      id: "judgement:weekly-2026-07-06-ai-control",
      editionId: "edition:weekly-brief:2026-07-06",
      headline: "Regulators landed on both sides of the AI risk story in the same week.",
      body: "Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, and accountable for customer outcomes — and resilient against AI-accelerated attack.",
      provenance: [textAnchor(liveHome, "This week in three lines")],
    },
  ],
  questions: [
    {
      id: "question:can-we-stop-an-agent",
      editionId: "edition:committee:2026-07-09",
      question:
        "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
      context:
        "Ask this when agentic AI is being proposed for a bigger mandate — before the mandate, not after an incident.",
      provenance: [textAnchor(liveCommittee, "Can we stop an agent quickly")],
    },
  ],
  evidenceAsks: [
    {
      id: "evidence:ai-permission-stop-rehearsal",
      editionId: "edition:weekly-brief:2026-07-06",
      label: "What to ask for",
      ask: "The permission map, the stop path, and the rehearsal evidence — not just the policy document.",
      provenance: [textAnchor(liveHome, "The permission map, the stop path")],
    },
  ],
  owners: [{ id: "owner:listing-rules-response", label: "Listing-rules response owner" }],
  deadlines: [
    {
      id: "deadline:fca-listing-rules-2026-08-14",
      editionId: "edition:horizon-rendered:2026-07-08",
      dueDate: "2026-08-14",
      title: "FCA listing-rules consultation",
      status: "open",
      sourceIds: ["source:fca-listing-rules-consultation-2026"],
      provenance: [textAnchor(liveHorizon, "14 Aug")],
    },
  ],
  relationships: [
    {
      id: "relationship:fca-supports-weekly-judgement",
      type: "supports",
      from: { kind: "source", id: "source:fca-ai-retail-review-2026-07-06" },
      to: { kind: "judgement", id: "judgement:weekly-2026-07-06-ai-control" },
      rationale:
        "The weekly judgement explicitly combines the FCA review with the systemic cyber warning.",
      provenance: [textAnchor(liveHome, "Regulators landed on both sides")],
    },
    {
      id: "relationship:judgement-to-agent-question",
      type: "translates-to-question",
      from: { kind: "judgement", id: "judgement:weekly-2026-07-06-ai-control" },
      to: { kind: "governance-question", id: "question:can-we-stop-an-agent" },
      rationale:
        "The portable board question is the governance translation of the weekly judgement.",
      provenance: [textAnchor(liveHome, "The board question")],
    },
    {
      id: "relationship:question-to-evidence",
      type: "requests-evidence",
      from: { kind: "governance-question", id: "question:can-we-stop-an-agent" },
      to: { kind: "evidence-ask", id: "evidence:ai-permission-stop-rehearsal" },
      rationale: "The evidence ask makes the question testable.",
      provenance: [textAnchor(liveHome, "What to ask for")],
    },
    {
      id: "relationship:deadline-owner",
      type: "owned-by",
      from: { kind: "deadline", id: "deadline:fca-listing-rules-2026-08-14" },
      to: { kind: "owner", id: "owner:listing-rules-response" },
      rationale: "The rendered horizon says the consultation needs a named decision owner.",
      provenance: [textAnchor(liveHorizon, "Who decides whether we respond")],
    },
    {
      id: "relationship:listing-signal-deadline",
      type: "due-at",
      from: {
        kind: "signal-revision",
        id: "signal-revision:fca-listing-rules:rendered-2026-07-08",
      },
      to: { kind: "deadline", id: "deadline:fca-listing-rules-2026-08-14" },
      rationale: "The signal and deadline are linked explicitly in the rendered horizon.",
      provenance: [textAnchor(liveHorizon, "View deadline")],
    },
    {
      id: "relationship:ai-cyber-read-across",
      type: "explicit-read-across",
      from: {
        kind: "signal-revision",
        id: "signal-revision:esas-frontier-ai-cyber-warning:2026-07-08",
      },
      to: { kind: "topic", id: "topic:cyber" },
      rationale: "The source is explicitly classified as both AI and cyber relevance.",
      provenance: [textAnchor(liveHome, "Cyber / EBA-ESMA-EIOPA")],
    },
  ],
  reconciliations: [
    {
      id: "reconciliation:committee-frozen-v-live",
      artifactIds: [frozenCommittee, liveCommittee],
      status: "unresolved",
      note: "The frozen capture is a 404 while the live capture is a 200 editorial page; both remain authoritative evidence for their capture times.",
    },
    {
      id: "reconciliation:horizon-rendered-v-json-2026-07-08",
      artifactIds: [liveHorizon, "artifact:horizon-json:2026-07-08"],
      status: "unresolved",
      note: "The rendered HTML reports 6 material signals and one 14 Aug deadline; JSON reports 15 material signals and three different deadlines.",
    },
    {
      id: "reconciliation:horizon-json-v-rss-v-ics",
      artifactIds: [
        "artifact:horizon-json:2026-07-08",
        "artifact:horizon-rss:2026-07-04",
        "artifact:horizon-ics:2026-07-04",
      ],
      status: "unresolved",
      note: "JSON, RSS and ICS are separate publication channels with different build dates and scopes.",
    },
    {
      id: "reconciliation:ai-html-v-json-2026-07-08",
      artifactIds: [liveAi, "artifact:ai-json:2026-07-08"],
      status: "unresolved",
      note: "The ten ranked HTML signals and fifteen JSON cards are related source products but are not declared equivalent.",
    },
  ],
  routes: [
    {
      id: "route:home",
      path: "/",
      archetype: "home",
      editionId: "edition:weekly-brief:2026-07-06",
      parityManifestId: "parity:home",
      evidenceArtifactIds: [frozenHome, liveHome],
    },
    {
      id: "route:signals-ai",
      path: "/signals/ai/",
      archetype: "signal-topic",
      editionId: "edition:ai-topic:2026-07-08",
      parityManifestId: "parity:signals-ai",
      evidenceArtifactIds: [frozenAi, liveAi, "artifact:ai-json:2026-07-08"],
    },
    {
      id: "route:committee-questions",
      path: "/committee-questions/",
      archetype: "committee-questions",
      editionId: "edition:committee:2026-07-09",
      parityManifestId: "parity:committee-questions",
      evidenceArtifactIds: [frozenCommittee, liveCommittee],
    },
    {
      id: "route:regulatory-horizon",
      path: "/regulatory-horizon/",
      archetype: "regulatory-horizon",
      editionId: "edition:horizon-rendered:2026-07-08",
      parityManifestId: "parity:regulatory-horizon",
      evidenceArtifactIds: [
        frozenHorizon,
        liveHorizon,
        "artifact:horizon-json:2026-07-08",
        "artifact:horizon-rss:2026-07-04",
        "artifact:horizon-ics:2026-07-04",
      ],
    },
  ],
  parityManifests: [
    {
      id: "parity:home",
      routeId: "route:home",
      atoms: parityAtoms(
        "home",
        liveHome,
        {
          kind: "judgement",
          id: "judgement:weekly-2026-07-06-ai-control",
        },
        { "json-ld": "evidence-only" },
      ),
    },
    {
      id: "parity:signals-ai",
      routeId: "route:signals-ai",
      atoms: parityAtoms(
        "signals-ai",
        liveAi,
        {
          kind: "signal-revision",
          id: "signal-revision:fca-ai-retail-review:2026-07-08",
        },
        { "json-ld": "evidence-only" },
      ),
    },
    {
      id: "parity:committee-questions",
      routeId: "route:committee-questions",
      atoms: [
        ...parityAtoms(
          "committee-live",
          liveCommittee,
          {
            kind: "governance-question",
            id: "question:can-we-stop-an-agent",
          },
          { "json-ld": "evidence-only" },
        ),
        {
          id: "committee-frozen:status",
          kind: "metadata",
          source: textAnchor(frozenCommittee, "404 / Page not found"),
          disposition: "intentional-difference",
          reason:
            "The selected live state is 200; the prior capture-time 404 remains immutable evidence.",
        },
      ],
    },
    {
      id: "parity:regulatory-horizon",
      routeId: "route:regulatory-horizon",
      atoms: parityAtoms(
        "horizon-live",
        liveHorizon,
        {
          kind: "deadline",
          id: "deadline:fca-listing-rules-2026-08-14",
        },
        { "json-ld": "evidence-only" },
      ),
    },
  ],
} as const satisfies EditorialRepository;
