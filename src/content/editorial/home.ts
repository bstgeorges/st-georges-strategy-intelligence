export interface NavigationItem {
  href: string;
  label: string;
}

export interface RankedHomeSignal {
  rank: number;
  href: string;
  title: string;
  meta: string;
}

export interface TopicStreamSummary {
  slug: string;
  label: string;
  title: string;
  summary: string;
  href: string;
}

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/brief/", label: "Weekly Brief" },
  { href: "/signals/", label: "Signals" },
  { href: "/regulatory-horizon/", label: "Reg Horizon" },
  { href: "/committee-questions/", label: "Committee Questions" },
  { href: "/archive/", label: "Archive" },
  { href: "/about/", label: "About" },
] as const satisfies readonly NavigationItem[];

export const homeEdition = {
  week: "Week of 6 Jul 2026",
  editionDate: "6 Jul 2026",
  eyebrow: "The Virtual Officer, from St Georges Strategy",
  title: "What changed, why it matters, what to ask for next",
  description:
    "Public signals, regulatory movement, and technology developments turned into executive judgement, board questions, and evidence to ask for. Built for senior risk, compliance, resilience, technology, and AI governance leaders in regulated financial services — for committee prep, horizon scanning, and control challenge.",
  pattern:
    "Regulators landed on both sides of the AI risk story in the same week. This is the shortest possible version of what that means for a committee pack.",
  judgement:
    "Firms need one evidence base that shows AI is authorised, bounded, observable, reversible, and accountable for customer outcomes — and resilient against AI-accelerated attack.",
  boardQuestion:
    "Can we stop an agent quickly, prove why it acted, and show who owned the decision?",
  evidenceAsk:
    "The permission map, the stop path, and the rehearsal evidence — not just the policy document.",
  briefTitle: "Regulators land on both sides of the AI risk story",
  briefStandfirst:
    "The FCA's first review of AI in retail financial services and the ESAs' warning on systemic cyber risk from frontier AI models arrived days apart. Firms need one evidence base that covers both conduct outcomes and cyber resilience.",
  nearestDeadline: {
    date: "14 Aug",
    title: "Needs an owner",
    summary: "Listing-rules consultation still open to influence.",
    href: "/regulatory-horizon/",
  },
} as const;

export const homeTopSignals = [
  {
    rank: 1,
    href: "/signals/ai/",
    title: "FCA's first AI review puts retail outcomes and agentic control on the same page",
    meta: "AI governance / FCA, 6 Jul",
  },
  {
    rank: 2,
    href: "/signals/cyber/",
    title: "Frontier AI models are now a declared systemic cyber risk, say the ESAs and ESRB",
    meta: "Cyber / EBA-ESMA-EIOPA, 7 Jul",
  },
  {
    rank: 3,
    href: "/signals/financial-crime/",
    title: "OFSI's largest-ever circumvention penalty resets sanctions control expectations",
    meta: "Financial crime / OFSI, 17 Jun",
  },
  {
    rank: 4,
    href: "/signals/resilience/",
    title:
      "Bank of England's July Financial Stability Report resets the resilience and market baseline",
    meta: "Resilience / Market structure / BoE, 7 Jul",
  },
  {
    rank: 5,
    href: "/signals/data/",
    title: "A new UK legal duty on data protection complaints takes effect",
    meta: "Data / ICO, 23 Jun",
  },
] as const satisfies readonly RankedHomeSignal[];

export const homeTopicStreams = [
  {
    slug: "ai",
    label: "AI",
    title: "Agents and control",
    summary: "Permission boundaries, kill switches, and escalation evidence.",
    href: "/signals/ai/",
  },
  {
    slug: "resilience",
    label: "Resilience",
    title: "Failure paths",
    summary: "Fallback evidence and customer-visible impact.",
    href: "/signals/resilience/",
  },
  {
    slug: "third-party",
    label: "Third-party",
    title: "Dependencies",
    summary: "What looks internal until it fails.",
    href: "/signals/third-party/",
  },
  {
    slug: "market-structure",
    label: "Markets",
    title: "Structure",
    summary: "Capital, liquidity, and concentration risk.",
    href: "/signals/market-structure/",
  },
  {
    slug: "financial-crime",
    label: "Financial crime",
    title: "Fraud and sanctions",
    summary: "Scams, AML, and control evidence.",
    href: "/signals/financial-crime/",
  },
  {
    slug: "cyber",
    label: "Cyber",
    title: "Threats and response",
    summary: "Vulnerabilities, identity, and recovery.",
    href: "/signals/cyber/",
  },
  {
    slug: "technology-failure",
    label: "Technology failure",
    title: "Outages",
    summary: "Change failure and recovery evidence.",
    href: "/signals/technology-failure/",
  },
  {
    slug: "data",
    label: "Data",
    title: "Lineage",
    summary: "Reporting, privacy, and evidence integrity.",
    href: "/signals/data/",
  },
] as const satisfies readonly TopicStreamSummary[];

export const executiveRoles = [
  "Chief Risk Officer",
  "Chief Operating Officer",
  "Chief Compliance Officer",
  "Head of Operational Risk",
  "CISO",
  "AI governance lead",
  "Resilience lead",
] as const;

export const publicationUses = [
  {
    label: "Committee prep",
    description:
      "One judgement, five ranked signals, and a board question built to travel straight into the pack.",
  },
  {
    label: "Horizon scanning",
    description:
      "Consultation and deadline dates, each with an owner prompt attached before the window closes.",
  },
  {
    label: "Control challenge",
    description:
      "Every signal resolves into a testable question a firm can put to an accountable owner.",
  },
  {
    label: "Evidence planning",
    description:
      "Reg Horizon connects dates to the evidence trail that should exist before they close.",
  },
] as const;

export const trustSignals = [
  {
    label: "Source discipline",
    title: "Official sources first, secondary reporting labelled",
    description:
      "Regulators, central banks, and standard setters are preferred; press and specialist reporting are marked as monitoring signal, not settled fact.",
  },
  {
    label: "Archived judgement",
    title: "Every issue is dated and kept",
    description:
      "The weekly brief, the eight signal streams, and Reg Horizon are all preserved so a reader can trace how the judgement changed over time.",
  },
  {
    label: "The author",
    title: "Two decades in risk, compliance, and governance",
    description:
      "Written by Ben St Georges, drawing on operational risk, audit, and governance leadership across financial institutions in Paris, Hong Kong, Tokyo, Montreal, and London.",
  },
] as const;

export const siteDisclaimer =
  "Illustrative content based on sector-wide public sources. Not investment, legal, compliance, or regulatory advice.";
