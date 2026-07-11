// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { diffSignalRevisions } from "../../content/editorial/validation.ts";
import type { SignalId, SignalRevision, SourceReference } from "../../content/editorial/types";

export type ArchiveComparisonStatus = "added" | "removed" | "revised" | "unchanged";

export interface ArchiveComparisonItem {
  readonly signalId: SignalId;
  readonly title: string;
  readonly implication: string;
  readonly sources: readonly Pick<SourceReference, "id" | "publisher" | "title" | "url">[];
}

export interface ArchiveComparisonGroup {
  readonly status: ArchiveComparisonStatus;
  readonly items: readonly ArchiveComparisonItem[];
}

function comparisonItem(
  revision: SignalRevision | undefined,
  sourcesById: ReadonlyMap<string, SourceReference>,
): ArchiveComparisonItem {
  if (!revision) throw new Error("Archive comparison references a missing signal revision");
  if (revision.sourceIds.length === 0) {
    throw new Error(`Archive comparison signal has no source evidence: ${revision.signalId}`);
  }
  const sources = revision.sourceIds.map((sourceId) => {
    const source = sourcesById.get(sourceId);
    if (!source) throw new Error(`Archive comparison references missing source: ${sourceId}`);
    return source;
  });
  return {
    signalId: revision.signalId,
    title: revision.title,
    implication: revision.implication,
    sources,
  };
}

export function buildArchiveComparison(
  previous: readonly SignalRevision[],
  current: readonly SignalRevision[],
  sources: readonly SourceReference[],
): readonly ArchiveComparisonGroup[] {
  const diff = diffSignalRevisions(previous, current);
  const previousBySignal = new Map(previous.map((revision) => [revision.signalId, revision]));
  const currentBySignal = new Map(current.map((revision) => [revision.signalId, revision]));
  const sourcesById = new Map(sources.map((source) => [source.id, source]));
  const groups: ReadonlyArray<
    readonly [ArchiveComparisonStatus, readonly SignalId[], ReadonlyMap<SignalId, SignalRevision>]
  > = [
    ["added", diff.added, currentBySignal],
    ["removed", diff.removed, previousBySignal],
    ["revised", diff.changed, currentBySignal],
    ["unchanged", diff.unchanged, currentBySignal],
  ];

  return groups.map(([status, signalIds, revisions]) => ({
    status,
    items: signalIds.map((signalId) => comparisonItem(revisions.get(signalId), sourcesById)),
  }));
}
