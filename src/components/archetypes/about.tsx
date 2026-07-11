import type { AuthoredEditorialRecord } from "@/content/editorial/authored-types";
import { Fragment } from "react";

import {
  EditorialCard,
  EditorialFlow,
  EditorialLink,
  Masthead,
  MotionGrid,
  RichText,
  SectionHeading,
} from "./editorial-primitives";

type AboutRecord = Extract<AuthoredEditorialRecord, { kind: "about" }>;

export function AboutArchetype({ record }: { record: AboutRecord }) {
  const { content } = record;
  return (
    <main id="main-content" tabIndex={-1} className="sgs-document-main page">
      <EditorialFlow>
        <Masthead masthead={content.masthead} />
        <section className="band">
          <MotionGrid className="grid-3" kind="signal">
            {content.principles.map((card, index) => (
              <EditorialCard key={index} card={card} className="about-card" titleLevel={2} />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          {content.standards.heading ? (
            <SectionHeading heading={content.standards.heading} />
          ) : null}
          <MotionGrid className="archive-grid" kind="archive">
            {content.standards.cards.map((card, index) => (
              <EditorialCard key={index} card={card} className="archive-card" />
            ))}
          </MotionGrid>
        </section>
        <section className="band">
          <div className="author-grid">
            <p className="eyebrow">
              <RichText value={content.author.eyebrow} />
            </p>{" "}
            <div className="author-body">
              <p className="author-lede">
                <RichText value={content.author.lede} />
              </p>
              <p className="author-note">
                <RichText value={content.author.note} />
              </p>
              <div className="button-row">
                {content.author.links.map((item) => (
                  <Fragment key={item.href}>
                    <EditorialLink link={item} className="button secondary light" />{" "}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="band">
          <div className="status-note">
            <p>
              <RichText value={content.status} />
            </p>
          </div>
        </section>
      </EditorialFlow>
    </main>
  );
}
