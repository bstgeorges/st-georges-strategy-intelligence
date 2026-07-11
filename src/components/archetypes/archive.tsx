import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";

import {
  EditorialCard,
  EditorialFlow,
  Masthead,
  MotionGrid,
  RichText,
  SectionHeading,
} from "./editorial-primitives";

type ArchiveRecord = Extract<AuthoredEditorialRecord, { kind: "archive" }>;

export function ArchiveArchetype({ record }: { record: ArchiveRecord }) {
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={record.content.masthead} />
        {record.content.groups.map((group, groupIndex) => (
          <section className="band" key={groupIndex}>
            {group.heading ? <SectionHeading heading={group.heading} /> : null}
            <MotionGrid
              className={group.purpose === "editions" ? "archive-grid" : "grid-3"}
              kind="archive"
            >
              {group.cards.map((card, index) => (
                <EditorialCard
                  key={index}
                  card={card}
                  className={group.purpose === "editions" ? "archive-card" : "card"}
                  as={card.href ? "link" : "article"}
                />
              ))}
            </MotionGrid>
            {group.footer ? (
              <p>
                <RichText value={group.footer} />
              </p>
            ) : null}
          </section>
        ))}
      </EditorialFlow>
    </main>
  );
}
