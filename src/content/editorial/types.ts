export type ArtifactId = `artifact:${string}`;
export type SeriesId = `series:${string}`;
export type EditionId = `edition:${string}`;
export type TopicId = `topic:${string}`;
export type SourceId = `source:${string}`;
export type SignalId = `signal:${string}`;
export type SignalRevisionId = `signal-revision:${string}`;
export type JudgementId = `judgement:${string}`;
export type GovernanceQuestionId = `question:${string}`;
export type EvidenceAskId = `evidence:${string}`;
export type DeadlineId = `deadline:${string}`;
export type OwnerId = `owner:${string}`;
export type RelationshipId = `relationship:${string}`;
export type ReconciliationId = `reconciliation:${string}`;
export type RouteId = `route:${string}`;
export type ParityManifestId = `parity:${string}`;

export type EditorialChannel =
  "frozen-html" | "live-html" | "ai-json" | "horizon-json" | "horizon-rss" | "horizon-ics";

export type ProvenanceLocator =
  | { kind: "css"; value: string }
  | { kind: "json-pointer"; value: `/${string}` }
  | { kind: "text-anchor"; value: string }
  | { kind: "rss-guid"; value: string }
  | { kind: "ics-uid"; value: string };

export interface ProvenanceRef {
  artifactId: ArtifactId;
  locator: ProvenanceLocator;
}

export interface CapturedArtifact {
  id: ArtifactId;
  channel: EditorialChannel;
  mediaType: "text/html" | "application/json" | "application/rss+xml" | "text/calendar";
  sourceUrl: string;
  repositoryPath: string;
  capturedAt: string;
  sha256: string;
  route?: string;
  status?: 200 | 404;
}

export interface PublicationSeries {
  id: SeriesId;
  name: string;
  channel: EditorialChannel;
  currentEditionId: EditionId;
  cadence: "weekly" | "event-driven" | "captured";
}

export interface EditorialEdition {
  id: EditionId;
  seriesId: SeriesId;
  label: string;
  effectiveDate: string;
  previousEditionId?: EditionId;
  artifactIds: readonly ArtifactId[];
  provenance: readonly ProvenanceRef[];
}

export interface TopicStream {
  id: TopicId;
  slug: string;
  name: string;
}

export type SourceClass =
  "primary" | "official" | "standard-setter" | "monitoring" | "specialist-reporting";

export interface SourceReference {
  id: SourceId;
  title: string;
  publisher: string;
  url: string;
  sourceClass: SourceClass;
  publishedDate?: string;
  provenance: readonly ProvenanceRef[];
}

export interface Signal {
  id: SignalId;
  topicIds: readonly TopicId[];
}

export interface SignalRevision {
  id: SignalRevisionId;
  signalId: SignalId;
  editionId: EditionId;
  title: string;
  implication: string;
  rank?: number;
  semanticHash: string;
  sourceIds: readonly SourceId[];
  provenance: readonly ProvenanceRef[];
}

export interface ExecutiveJudgement {
  id: JudgementId;
  editionId: EditionId;
  headline: string;
  body: string;
  provenance: readonly ProvenanceRef[];
}

export interface GovernanceQuestion {
  id: GovernanceQuestionId;
  editionId: EditionId;
  question: string;
  context: string;
  provenance: readonly ProvenanceRef[];
}

export interface EvidenceAsk {
  id: EvidenceAskId;
  editionId: EditionId;
  label: string;
  ask: string;
  provenance: readonly ProvenanceRef[];
}

export interface AccountabilityOwner {
  id: OwnerId;
  label: string;
}

export interface Deadline {
  id: DeadlineId;
  editionId: EditionId;
  dueDate: string;
  title: string;
  status: "open" | "closed" | "future" | "captured";
  sourceIds: readonly SourceId[];
  provenance: readonly ProvenanceRef[];
}

export type EntityKind =
  | "source"
  | "signal-revision"
  | "judgement"
  | "governance-question"
  | "evidence-ask"
  | "deadline"
  | "owner"
  | "topic";

export interface EntityRef {
  kind: EntityKind;
  id: string;
}

export type RelationshipType =
  | "supports"
  | "translates-to-question"
  | "requests-evidence"
  | "owned-by"
  | "due-at"
  | "explicit-read-across";

export interface EditorialRelationship {
  id: RelationshipId;
  type: RelationshipType;
  from: EntityRef;
  to: EntityRef;
  rationale: string;
  provenance: readonly ProvenanceRef[];
}

export interface ReconciliationRecord {
  id: ReconciliationId;
  artifactIds: readonly [ArtifactId, ArtifactId, ...ArtifactId[]];
  status: "unresolved" | "resolved";
  conclusion?: "equivalent" | "supersedes" | "independent";
  note: string;
}

export type PageArchetype =
  | "home"
  | "weekly-brief"
  | "signals-index"
  | "signal-topic"
  | "regulatory-horizon"
  | "committee-questions"
  | "archive"
  | "about"
  | "not-found";

export interface EditorialRoute {
  id: RouteId;
  path: string;
  archetype: PageArchetype;
  editionId: EditionId;
  parityManifestId: ParityManifestId;
  evidenceArtifactIds: readonly ArtifactId[];
}

export type ParityAtomKind =
  "text" | "heading" | "link" | "date" | "source" | "disclaimer" | "metadata" | "json-ld";

export type ParityDisposition = "mapped" | "intentional-difference" | "evidence-only";

export interface ParityAtom {
  id: string;
  kind: ParityAtomKind;
  source: ProvenanceRef;
  disposition: ParityDisposition;
  targetRefs?: readonly EntityRef[];
  reason?: string;
}

export interface ParityManifest {
  id: ParityManifestId;
  routeId: RouteId;
  atoms: readonly ParityAtom[];
}

export interface EditorialRepository {
  artifacts: readonly CapturedArtifact[];
  series: readonly PublicationSeries[];
  editions: readonly EditorialEdition[];
  topics: readonly TopicStream[];
  sources: readonly SourceReference[];
  signals: readonly Signal[];
  signalRevisions: readonly SignalRevision[];
  judgements: readonly ExecutiveJudgement[];
  questions: readonly GovernanceQuestion[];
  evidenceAsks: readonly EvidenceAsk[];
  owners: readonly AccountabilityOwner[];
  deadlines: readonly Deadline[];
  relationships: readonly EditorialRelationship[];
  reconciliations: readonly ReconciliationRecord[];
  routes: readonly EditorialRoute[];
  parityManifests: readonly ParityManifest[];
}

export interface ArchiveSignalDiff {
  added: readonly SignalId[];
  removed: readonly SignalId[];
  changed: readonly SignalId[];
  unchanged: readonly SignalId[];
}
