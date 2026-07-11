import type {
  EditorialDocumentArchetype,
  EditorialDocumentMetadata,
  EditorialDocumentEvidence,
} from "./document-types";
import type { SignalRevision, SourceReference } from "./types";

export type AuthoredInlineRole = "meta" | "owner" | "rank" | "top-source";

export type AuthoredRichText = string | readonly AuthoredInlineToken[];

export type AuthoredInlineToken =
  | { readonly kind: "text"; readonly value: string }
  | { readonly kind: "strong"; readonly content: AuthoredRichText }
  | {
      readonly kind: "link";
      readonly href: string;
      readonly content: AuthoredRichText;
      readonly target?: "_blank";
      readonly rel?: string;
    }
  | {
      readonly kind: "label";
      readonly role: AuthoredInlineRole;
      readonly content: AuthoredRichText;
    }
  | {
      readonly kind: "time";
      readonly dateTime?: string;
      readonly content: AuthoredRichText;
    }
  | { readonly kind: "break" };

export interface AuthoredHeading {
  readonly eyebrow?: AuthoredRichText;
  readonly title: AuthoredRichText;
  readonly description?: AuthoredRichText;
  readonly note?: AuthoredRichText;
}

export interface AuthoredMasthead {
  readonly eyebrow: AuthoredRichText;
  readonly title: AuthoredRichText;
  readonly dek: AuthoredRichText;
  readonly detail?: AuthoredRichText;
  readonly questionsLabel?: AuthoredRichText;
  readonly questions?: readonly AuthoredRichText[];
}

export interface AuthoredLink {
  readonly href: string;
  readonly label: AuthoredRichText;
  readonly target?: "_blank";
  readonly rel?: string;
}

export interface AuthoredFact {
  readonly term: AuthoredRichText;
  readonly description: AuthoredRichText;
}

export interface AuthoredCard {
  readonly meta?: AuthoredRichText;
  readonly title?: AuthoredRichText;
  readonly href?: string;
  readonly paragraphs?: readonly AuthoredRichText[];
  readonly facts?: readonly AuthoredFact[];
  readonly question?: AuthoredRichText;
  readonly sources?: readonly AuthoredLink[];
  readonly items?: readonly AuthoredRichText[];
  readonly actions?: readonly AuthoredLink[];
  readonly featured?: boolean;
  readonly rank?: AuthoredRichText;
}

export interface AuthoredRankedItem {
  readonly rank: AuthoredRichText;
  readonly title: AuthoredRichText;
  readonly href?: string;
  readonly meta?: AuthoredRichText;
}

export interface AuthoredDeadline {
  readonly date: AuthoredRichText;
  readonly dateTime?: string;
  readonly action: AuthoredRichText;
  readonly href?: string;
  readonly owner: AuthoredRichText;
}

export interface AuthoredMetric {
  readonly label: AuthoredRichText;
  readonly value: AuthoredRichText;
  readonly detail: AuthoredRichText;
}

export interface AuthoredCardSection {
  readonly heading?: AuthoredHeading;
  readonly cards: readonly AuthoredCard[];
}

export interface AuthoredRankedSection {
  readonly heading: AuthoredHeading;
  readonly items: readonly AuthoredRankedItem[];
}

export interface AuthoredDeadlineSection {
  readonly heading: AuthoredHeading;
  readonly deadlines: readonly AuthoredDeadline[];
  readonly sources?: readonly AuthoredLink[];
}

export interface AuthoredRouteBase {
  readonly route: string;
  readonly status: 200;
  readonly archetype: EditorialDocumentArchetype;
  readonly sourceUrl: string;
  readonly capturedAt: string;
  readonly sourceSha256: string;
  readonly metadata: EditorialDocumentMetadata;
  readonly selectionReason: "live-current" | "frozen-historical";
  readonly evidence: readonly EditorialDocumentEvidence[];
  readonly archiveComparison?:
    | {
        readonly state: "first-observed";
        readonly currentLabel: string;
      }
    | {
        readonly state: "available";
        readonly previousLabel: string;
        readonly currentLabel: string;
        readonly previousRevisions: readonly SignalRevision[];
        readonly currentRevisions: readonly SignalRevision[];
        readonly sources: readonly SourceReference[];
      };
}

export interface AuthoredBriefContent {
  readonly masthead: AuthoredMasthead;
  readonly summary: AuthoredRichText;
  readonly priorities: AuthoredRankedSection;
  readonly streams: AuthoredCardSection;
  readonly decisionWindow: readonly AuthoredCard[];
  readonly lead: {
    readonly heading: AuthoredHeading;
    readonly meta?: AuthoredRichText;
    readonly title: AuthoredRichText;
    readonly paragraphs: readonly AuthoredRichText[];
    readonly lenses: readonly {
      readonly title: AuthoredRichText;
      readonly body: AuthoredRichText;
    }[];
    readonly sources: readonly AuthoredLink[];
  };
  readonly committeeAngles: AuthoredCardSection;
  readonly evidenceAsks: AuthoredCardSection;
  readonly nextQuestions: {
    readonly heading: AuthoredHeading;
    readonly questions: readonly AuthoredRichText[];
  };
  readonly deadlines: AuthoredDeadlineSection;
  readonly radar: AuthoredCardSection;
}

export interface AuthoredSignalsIndexContent {
  readonly masthead: AuthoredMasthead;
  readonly streams: AuthoredCardSection;
  readonly operatingModel: AuthoredCardSection;
  readonly priorities: AuthoredRankedSection;
  readonly topicArchives: AuthoredCardSection;
  readonly coverage: AuthoredCardSection;
  readonly archiveCadence: AuthoredCardSection;
  readonly liveChannels: AuthoredCardSection;
  readonly archiveDirectories: AuthoredCardSection;
}

export interface AuthoredTopicDossierContent {
  readonly masthead: AuthoredMasthead;
  readonly sourcePanel: AuthoredCard;
  readonly evidence: AuthoredRankedSection;
  readonly judgements: AuthoredCardSection;
  readonly deadlines: AuthoredDeadlineSection;
  readonly archives: AuthoredCardSection;
}

export interface AuthoredHorizonContent {
  readonly masthead: AuthoredMasthead;
  readonly dashboard: {
    readonly heading: AuthoredHeading;
    readonly summary: AuthoredRichText;
    readonly metrics: readonly AuthoredMetric[];
  };
  readonly operating: AuthoredCardSection;
  readonly currentDeadline: AuthoredDeadlineSection;
  readonly lanes: readonly AuthoredCard[];
  readonly watchlist: AuthoredRankedSection;
  readonly evidenceWatchlist: AuthoredRankedSection;
  readonly coverage: AuthoredCardSection & { readonly note?: AuthoredRichText };
  readonly sources: AuthoredCardSection;
  readonly tools: AuthoredCardSection;
  readonly archives: AuthoredCardSection;
  readonly questions: {
    readonly heading: AuthoredHeading;
    readonly items: readonly AuthoredRichText[];
  };
}

export interface AuthoredCommitteeContent {
  readonly masthead: AuthoredMasthead;
  readonly introduction: AuthoredHeading;
  readonly sections: readonly AuthoredCardSection[];
  readonly status: AuthoredRichText;
}

export interface AuthoredArchiveGroup {
  readonly purpose: "editions" | "notes";
  readonly heading?: AuthoredHeading;
  readonly cards: readonly AuthoredCard[];
  readonly footer?: AuthoredRichText;
}

export interface AuthoredArchiveContent {
  readonly masthead: AuthoredMasthead;
  readonly groups: readonly AuthoredArchiveGroup[];
}

export interface AuthoredAboutContent {
  readonly masthead: AuthoredMasthead;
  readonly principles: readonly AuthoredCard[];
  readonly standards: AuthoredCardSection;
  readonly author: {
    readonly eyebrow: AuthoredRichText;
    readonly lede: AuthoredRichText;
    readonly note: AuthoredRichText;
    readonly links: readonly AuthoredLink[];
  };
  readonly status: AuthoredRichText;
}

export type AuthoredEditorialRecord =
  | (AuthoredRouteBase & { readonly kind: "brief"; readonly content: AuthoredBriefContent })
  | (AuthoredRouteBase & {
      readonly kind: "signals-index";
      readonly content: AuthoredSignalsIndexContent;
    })
  | (AuthoredRouteBase & {
      readonly kind: "topic-dossier";
      readonly content: AuthoredTopicDossierContent;
    })
  | (AuthoredRouteBase & {
      readonly kind: "regulatory-horizon";
      readonly content: AuthoredHorizonContent;
    })
  | (AuthoredRouteBase & {
      readonly kind: "committee-questions";
      readonly content: AuthoredCommitteeContent;
    })
  | (AuthoredRouteBase & { readonly kind: "archive"; readonly content: AuthoredArchiveContent })
  | (AuthoredRouteBase & { readonly kind: "about"; readonly content: AuthoredAboutContent });
