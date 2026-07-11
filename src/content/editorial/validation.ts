import type {
  ArchiveSignalDiff,
  EditorialEdition,
  EditorialRepository,
  EntityKind,
  EntityRef,
  RelationshipType,
  SeriesId,
  SignalId,
  SignalRevision,
} from "./types";

const ID = /^[a-z][a-z-]*:[a-z0-9][a-z0-9:.-]*$/;
const SHA256 = /^[a-f0-9]{64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const relationshipEndpoints: Record<
  RelationshipType,
  readonly [readonly EntityKind[], readonly EntityKind[]]
> = {
  supports: [
    ["source", "signal-revision"],
    ["signal-revision", "judgement"],
  ],
  "translates-to-question": [["judgement", "signal-revision"], ["governance-question"]],
  "requests-evidence": [["governance-question", "judgement"], ["evidence-ask"]],
  "owned-by": [["evidence-ask", "deadline"], ["owner"]],
  "due-at": [["evidence-ask", "signal-revision"], ["deadline"]],
  "explicit-read-across": [
    ["signal-revision", "judgement", "deadline", "topic"],
    ["signal-revision", "deadline", "topic"],
  ],
};

function assertUnique(records: readonly { id: string }[], label: string): void {
  const ids = new Set<string>();
  for (const record of records) {
    invariant(ID.test(record.id), `Invalid ${label} ID: ${record.id}`);
    invariant(!ids.has(record.id), `Duplicate ${label} ID: ${record.id}`);
    ids.add(record.id);
  }
}

function entityCatalog(repository: EditorialRepository): Map<EntityKind, Set<string>> {
  const entries: Array<[EntityKind, Set<string>]> = [
    ["source", new Set(repository.sources.map(({ id }) => id))],
    ["signal-revision", new Set(repository.signalRevisions.map(({ id }) => id))],
    ["judgement", new Set(repository.judgements.map(({ id }) => id))],
    ["governance-question", new Set(repository.questions.map(({ id }) => id))],
    ["evidence-ask", new Set(repository.evidenceAsks.map(({ id }) => id))],
    ["deadline", new Set(repository.deadlines.map(({ id }) => id))],
    ["owner", new Set(repository.owners.map(({ id }) => id))],
    ["topic", new Set(repository.topics.map(({ id }) => id))],
  ];
  return new Map(entries);
}

function assertEntityRef(
  catalog: Map<EntityKind, Set<string>>,
  ref: EntityRef,
  context: string,
): void {
  invariant(
    catalog.get(ref.kind)?.has(ref.id),
    `${context} references missing ${ref.kind}: ${ref.id}`,
  );
}

function assertAcyclicSeries(editions: readonly EditorialEdition[], seriesId: SeriesId): void {
  const seriesEditions = editions.filter((edition) => edition.seriesId === seriesId);
  const byId = new Map(seriesEditions.map((edition) => [edition.id, edition]));
  for (const edition of seriesEditions) {
    const seen = new Set<string>();
    let cursor: EditorialEdition | undefined = edition;
    while (cursor?.previousEditionId) {
      invariant(!seen.has(cursor.id), `Edition chain cycle in ${seriesId} at ${cursor.id}`);
      seen.add(cursor.id);
      const previous: EditorialEdition | undefined = byId.get(cursor.previousEditionId);
      invariant(previous, `${cursor.id} points outside ${seriesId} to ${cursor.previousEditionId}`);
      cursor = previous;
    }
  }
}

export function resolveCurrentEdition(
  repository: EditorialRepository,
  seriesId: SeriesId,
): EditorialEdition {
  const series = repository.series.find((candidate) => candidate.id === seriesId);
  invariant(series, `Unknown publication series: ${seriesId}`);
  const edition = repository.editions.find((candidate) => candidate.id === series.currentEditionId);
  invariant(edition, `Missing authored current edition ${series.currentEditionId}`);
  invariant(
    edition.seriesId === series.id,
    `Current edition ${edition.id} belongs to another series`,
  );
  return edition;
}

export function diffSignalRevisions(
  previous: readonly Pick<SignalRevision, "signalId" | "semanticHash">[],
  current: readonly Pick<SignalRevision, "signalId" | "semanticHash">[],
): ArchiveSignalDiff {
  const before = new Map(previous.map((revision) => [revision.signalId, revision.semanticHash]));
  const after = new Map(current.map((revision) => [revision.signalId, revision.semanticHash]));
  const added: SignalId[] = [];
  const removed: SignalId[] = [];
  const changed: SignalId[] = [];
  const unchanged: SignalId[] = [];

  for (const [id, hash] of after) {
    if (!before.has(id)) added.push(id);
    else if (before.get(id) === hash) unchanged.push(id);
    else changed.push(id);
  }
  for (const id of before.keys()) if (!after.has(id)) removed.push(id);

  const sort = (values: SignalId[]) => values.sort((a, b) => a.localeCompare(b));
  return {
    added: sort(added),
    removed: sort(removed),
    changed: sort(changed),
    unchanged: sort(unchanged),
  };
}

export function validateEditorialRepository(repository: EditorialRepository) {
  const collections = [
    [repository.artifacts, "artifact"],
    [repository.series, "series"],
    [repository.editions, "edition"],
    [repository.topics, "topic"],
    [repository.sources, "source"],
    [repository.signals, "signal"],
    [repository.signalRevisions, "signal revision"],
    [repository.judgements, "judgement"],
    [repository.questions, "question"],
    [repository.evidenceAsks, "evidence ask"],
    [repository.owners, "owner"],
    [repository.deadlines, "deadline"],
    [repository.relationships, "relationship"],
    [repository.reconciliations, "reconciliation"],
    [repository.routes, "route"],
    [repository.parityManifests, "parity manifest"],
  ] as const;
  for (const [records, label] of collections) assertUnique(records, label);

  const artifactIds = new Set(repository.artifacts.map(({ id }) => id));
  for (const artifact of repository.artifacts) {
    invariant(SHA256.test(artifact.sha256), `Invalid artifact checksum: ${artifact.id}`);
    invariant(URL.canParse(artifact.sourceUrl), `Invalid artifact URL: ${artifact.id}`);
    invariant(
      !Number.isNaN(Date.parse(artifact.capturedAt)),
      `Invalid capture date: ${artifact.id}`,
    );
    invariant(artifact.repositoryPath.length > 0, `Missing artifact path: ${artifact.id}`);
  }

  const editionIds = new Set(repository.editions.map(({ id }) => id));
  const seriesIds = new Set(repository.series.map(({ id }) => id));
  for (const series of repository.series) {
    resolveCurrentEdition(repository, series.id);
    assertAcyclicSeries(repository.editions, series.id);
  }
  for (const edition of repository.editions) {
    invariant(seriesIds.has(edition.seriesId), `Unknown series on ${edition.id}`);
    invariant(DATE.test(edition.effectiveDate), `Invalid edition date: ${edition.id}`);
    invariant(edition.artifactIds.length > 0, `Edition has no artifacts: ${edition.id}`);
    for (const id of edition.artifactIds)
      invariant(artifactIds.has(id), `${edition.id} references ${id}`);
  }

  const topicIds = new Set(repository.topics.map(({ id }) => id));
  const sourceIds = new Set(repository.sources.map(({ id }) => id));
  const signalIds = new Set(repository.signals.map(({ id }) => id));
  for (const source of repository.sources) {
    invariant(URL.canParse(source.url), `Invalid source URL: ${source.id}`);
    invariant(
      !source.publishedDate || DATE.test(source.publishedDate),
      `Invalid source date: ${source.id}`,
    );
  }
  for (const signal of repository.signals) {
    invariant(signal.topicIds.length > 0, `Signal has no topic: ${signal.id}`);
    for (const id of signal.topicIds) invariant(topicIds.has(id), `${signal.id} references ${id}`);
  }

  const ranks = new Map<string, Set<number>>();
  for (const revision of repository.signalRevisions) {
    invariant(signalIds.has(revision.signalId), `${revision.id} references ${revision.signalId}`);
    invariant(
      editionIds.has(revision.editionId),
      `${revision.id} references ${revision.editionId}`,
    );
    invariant(SHA256.test(revision.semanticHash), `Invalid semantic hash: ${revision.id}`);
    for (const id of revision.sourceIds)
      invariant(sourceIds.has(id), `${revision.id} references ${id}`);
    if (revision.rank !== undefined) {
      invariant(
        Number.isInteger(revision.rank) && revision.rank > 0,
        `Invalid rank: ${revision.id}`,
      );
      const used = ranks.get(revision.editionId) ?? new Set<number>();
      invariant(
        !used.has(revision.rank),
        `Duplicate rank ${revision.rank} in ${revision.editionId}`,
      );
      used.add(revision.rank);
      ranks.set(revision.editionId, used);
    }
  }

  for (const entity of [
    ...repository.judgements,
    ...repository.questions,
    ...repository.evidenceAsks,
    ...repository.deadlines,
  ]) {
    invariant(editionIds.has(entity.editionId), `${entity.id} references ${entity.editionId}`);
  }
  for (const deadline of repository.deadlines) {
    invariant(DATE.test(deadline.dueDate), `Invalid deadline date: ${deadline.id}`);
    for (const id of deadline.sourceIds)
      invariant(sourceIds.has(id), `${deadline.id} references ${id}`);
  }

  const catalog = entityCatalog(repository);
  for (const relationship of repository.relationships) {
    assertEntityRef(catalog, relationship.from, relationship.id);
    assertEntityRef(catalog, relationship.to, relationship.id);
    const [fromKinds, toKinds] = relationshipEndpoints[relationship.type];
    invariant(
      fromKinds.includes(relationship.from.kind),
      `Invalid from endpoint for ${relationship.id}`,
    );
    invariant(toKinds.includes(relationship.to.kind), `Invalid to endpoint for ${relationship.id}`);
  }

  for (const reconciliation of repository.reconciliations) {
    invariant(
      reconciliation.artifactIds.length >= 2,
      `${reconciliation.id} needs at least two artifacts`,
    );
    for (const id of reconciliation.artifactIds)
      invariant(artifactIds.has(id), `${reconciliation.id} references ${id}`);
    invariant(
      reconciliation.status === "resolved"
        ? Boolean(reconciliation.conclusion)
        : !reconciliation.conclusion,
      `Reconciliation conclusion/status mismatch: ${reconciliation.id}`,
    );
  }

  const routeIds = new Set(repository.routes.map(({ id }) => id));
  const parityIds = new Set(repository.parityManifests.map(({ id }) => id));
  for (const route of repository.routes) {
    invariant(route.path.startsWith("/"), `Invalid route path: ${route.id}`);
    invariant(editionIds.has(route.editionId), `${route.id} references ${route.editionId}`);
    invariant(
      parityIds.has(route.parityManifestId),
      `${route.id} references ${route.parityManifestId}`,
    );
    for (const id of route.evidenceArtifactIds)
      invariant(artifactIds.has(id), `${route.id} references ${id}`);
  }
  for (const manifest of repository.parityManifests) {
    invariant(routeIds.has(manifest.routeId), `${manifest.id} references ${manifest.routeId}`);
    invariant(manifest.atoms.length > 0, `${manifest.id} has no parity atoms`);
    for (const atom of manifest.atoms) {
      invariant(
        artifactIds.has(atom.source.artifactId),
        `${atom.id} references ${atom.source.artifactId}`,
      );
      if (atom.disposition === "mapped") {
        invariant(atom.targetRefs?.length, `Mapped parity atom has no target: ${atom.id}`);
        for (const ref of atom.targetRefs) assertEntityRef(catalog, ref, atom.id);
      } else {
        invariant(atom.reason?.trim(), `Parity disposition needs a reason: ${atom.id}`);
      }
    }
  }

  const provenanceOwners = [
    ...repository.editions,
    ...repository.sources,
    ...repository.signalRevisions,
    ...repository.judgements,
    ...repository.questions,
    ...repository.evidenceAsks,
    ...repository.deadlines,
    ...repository.relationships,
  ];
  for (const owner of provenanceOwners) {
    invariant(owner.provenance.length > 0, `Missing provenance: ${owner.id}`);
    for (const ref of owner.provenance)
      invariant(artifactIds.has(ref.artifactId), `${owner.id} references ${ref.artifactId}`);
  }

  return {
    artifacts: repository.artifacts.length,
    frozenHtmlArtifacts: repository.artifacts.filter(({ channel }) => channel === "frozen-html")
      .length,
    liveHtmlArtifacts: repository.artifacts.filter(({ channel }) => channel === "live-html").length,
    series: repository.series.length,
    editions: repository.editions.length,
    signals: repository.signals.length,
    relationships: repository.relationships.length,
    routes: repository.routes.length,
    parityAtoms: repository.parityManifests.reduce(
      (count, manifest) => count + manifest.atoms.length,
      0,
    ),
  };
}
