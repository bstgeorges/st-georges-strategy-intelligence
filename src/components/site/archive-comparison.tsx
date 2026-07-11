import type { SignalRevision, SourceReference } from "@/content/editorial/types";

import { buildArchiveComparison, type ArchiveComparisonStatus } from "./archive-comparison-model";

const statusLabels: Record<ArchiveComparisonStatus, string> = {
  added: "Added",
  removed: "Removed",
  revised: "Revised",
  unchanged: "Unchanged",
};

export interface ArchiveComparisonProps {
  readonly previousLabel: string;
  readonly currentLabel: string;
  readonly previousRevisions: readonly SignalRevision[];
  readonly currentRevisions: readonly SignalRevision[];
  readonly sources: readonly SourceReference[];
}

export function ArchiveComparison({
  previousLabel,
  currentLabel,
  previousRevisions,
  currentRevisions,
  sources,
}: ArchiveComparisonProps) {
  const groups = buildArchiveComparison(previousRevisions, currentRevisions, sources);
  const headingId = "archive-edition-comparison";

  return (
    <section className="band" aria-labelledby={headingId}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Edition comparison</p>
          <h2 id={headingId}>What changed since the adjacent edition</h2>
        </div>
        <p>
          Comparing {previousLabel} with {currentLabel}. Statuses are calculated from stable signal
          IDs and authored semantic hashes; each result retains its source trail.
        </p>
      </div>
      <div className="archive-grid">
        {groups.map(({ status, items }) => {
          const statusId = `${headingId}-${status}`;
          return (
            <section
              className="archive-card"
              aria-labelledby={statusId}
              data-comparison-status={status}
              key={status}
            >
              <p className="meta">{items.length} signals</p>
              <h3 id={statusId}>{statusLabels[status]}</h3>
              {items.length ? (
                <ul>
                  {items.map((item) => (
                    <li key={item.signalId}>
                      <h4>{item.title}</h4>
                      <p>{item.implication}</p>
                      <p className="source-row" aria-label={`Sources for ${item.title}`}>
                        <span>Sources:</span>{" "}
                        {item.sources.map((source, index) => (
                          <span key={source.id}>
                            {index ? "; " : null}
                            <a href={source.url}>
                              {source.publisher} — {source.title}
                            </a>
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No {statusLabels[status].toLocaleLowerCase()} signals in this comparison.</p>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
