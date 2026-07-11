import { ArchiveComparison } from "@/components/site/archive-comparison";
import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

export function AuthoredArchiveComparison({
  comparison,
}: {
  comparison: AuthoredEditorialRecord["archiveComparison"];
}) {
  if (!comparison) return null;
  if (comparison.state === "available") {
    return (
      <ArchiveComparison
        previousLabel={comparison.previousLabel}
        currentLabel={comparison.currentLabel}
        previousRevisions={comparison.previousRevisions}
        currentRevisions={comparison.currentRevisions}
        sources={comparison.sources}
      />
    );
  }
  return (
    <section className="band" aria-label="Edition comparison">
      <div className="status-note">
        <p>
          First observed edition for {comparison.currentLabel}; no earlier same-series HTML edition
          is present in the evidence corpus for an exact-identity comparison.
        </p>
      </div>
    </section>
  );
}
