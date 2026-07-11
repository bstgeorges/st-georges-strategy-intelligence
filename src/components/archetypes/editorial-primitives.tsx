import Link from "next/link";
import { Children, Fragment, type ReactNode } from "react";

import type {
  AuthoredCard,
  AuthoredDeadline,
  AuthoredHeading,
  AuthoredInlineToken,
  AuthoredLink,
  AuthoredMasthead,
  AuthoredRankedItem,
  AuthoredRichText,
} from "@/content/editorial/authored-types";

function secureRel(rel?: string): string {
  return [rel, "noopener", "noreferrer"].filter(Boolean).join(" ");
}

export function RichText({ value }: { value: AuthoredRichText }) {
  if (typeof value === "string") return value;
  return value.map((token, index) => {
    const key = `${token.kind}-${index}`;
    const separator = index > 0 && needsInlineSpace(value[index - 1], token) ? " " : null;
    let rendered: ReactNode;
    switch (token.kind) {
      case "text":
        rendered = token.value;
        break;
      case "strong":
        rendered = (
          <strong>
            <RichText value={token.content} />
          </strong>
        );
        break;
      case "link": {
        const content = <RichText value={token.content} />;
        rendered = token.href.startsWith("/") ? (
          <Link href={token.href} prefetch={false}>
            {content}
          </Link>
        ) : (
          <a
            href={token.href}
            target={token.target}
            rel={token.target === "_blank" ? secureRel(token.rel) : token.rel}
            data-external={/^https?:\/\//.test(token.href) ? "true" : undefined}
          >
            {content}
          </a>
        );
        break;
      }
      case "label":
        rendered = (
          <span className={token.role}>
            <RichText value={token.content} />
          </span>
        );
        break;
      case "time":
        rendered = (
          <time dateTime={token.dateTime}>
            <RichText value={token.content} />
          </time>
        );
        break;
      case "break":
        rendered = <br />;
        break;
    }
    return (
      <Fragment key={key}>
        {separator}
        {rendered}
      </Fragment>
    );
  });
}

function tokenEdge(token: AuthoredInlineToken, edge: "start" | "end"): string {
  if (token.kind === "text") {
    return edge === "start" ? (token.value.at(0) ?? "") : (token.value.at(-1) ?? "");
  }
  if (token.kind === "break") return " ";
  if (typeof token.content === "string") {
    return edge === "start" ? (token.content.at(0) ?? "") : (token.content.at(-1) ?? "");
  }
  const nested = edge === "start" ? token.content[0] : token.content.at(-1);
  return nested ? tokenEdge(nested, edge) : "";
}

function needsInlineSpace(left: AuthoredInlineToken, right: AuthoredInlineToken): boolean {
  return (
    /[\p{L}\p{N}]$/u.test(tokenEdge(left, "end")) &&
    /^[\p{L}\p{N}]/u.test(tokenEdge(right, "start"))
  );
}

export function EditorialFlow({ children }: { children: ReactNode }) {
  return Children.toArray(children).map((child, index) => (
    <Fragment key={index}>
      {index ? " " : null}
      {child}
    </Fragment>
  ));
}

export function EditorialLink({ link, className }: { link: AuthoredLink; className?: string }) {
  const content = <RichText value={link.label} />;
  if (link.href.startsWith("/")) {
    return (
      <Link className={className} href={link.href} prefetch={false}>
        {content}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={link.href}
      target={link.target}
      rel={link.target === "_blank" ? secureRel(link.rel) : link.rel}
      data-external={/^https?:\/\//.test(link.href) ? "true" : undefined}
    >
      {content}
    </a>
  );
}

export function Masthead({ masthead }: { masthead: AuthoredMasthead }) {
  return (
    <section className="masthead">
      <p className="eyebrow">
        <RichText value={masthead.eyebrow} />
      </p>{" "}
      <h1>
        <RichText value={masthead.title} />
      </h1>{" "}
      <p className="dek">
        <RichText value={masthead.dek} />
      </p>{" "}
      {masthead.detail ? (
        <p className="masthead-purpose">
          <RichText value={masthead.detail} />
        </p>
      ) : null}{" "}
      {masthead.questionsLabel ? (
        <p className="eyebrow">
          <RichText value={masthead.questionsLabel} />
        </p>
      ) : null}{" "}
      {masthead.questions ? (
        <ol className="question-list">
          {masthead.questions.map((question, index) => (
            <li key={index}>
              <RichText value={question} />{" "}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function SectionHeading({
  heading,
  compact = false,
}: {
  heading: AuthoredHeading;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "section-heading compact-heading" : "section-heading"}>
      <div>
        {heading.eyebrow ? (
          <p className="eyebrow">
            <RichText value={heading.eyebrow} />
          </p>
        ) : null}{" "}
        <h2>
          <RichText value={heading.title} />
        </h2>{" "}
        {heading.note ? (
          <p className="horizon-cadence-note">
            <RichText value={heading.note} />
          </p>
        ) : null}
      </div>{" "}
      {heading.description ? (
        <p>
          <RichText value={heading.description} />
        </p>
      ) : null}{" "}
    </div>
  );
}

function CardBody({
  card,
  titleLevel = 3,
  linkTitle = false,
}: {
  card: AuthoredCard;
  titleLevel?: 2 | 3;
  linkTitle?: boolean;
}) {
  const title = card.title ? <RichText value={card.title} /> : null;
  const heading =
    titleLevel === 2 ? (
      <h2>
        {linkTitle && card.href ? (
          <EditorialLink link={{ href: card.href, label: card.title! }} />
        ) : (
          title
        )}
      </h2>
    ) : (
      <h3>
        {linkTitle && card.href ? (
          <EditorialLink link={{ href: card.href, label: card.title! }} />
        ) : (
          title
        )}
      </h3>
    );
  return (
    <>
      {card.rank ? (
        <span className="rank">
          <RichText value={card.rank} />
        </span>
      ) : null}{" "}
      {card.meta ? (
        <p className="meta">
          <RichText value={card.meta} />
        </p>
      ) : null}{" "}
      {card.title ? heading : null}{" "}
      {card.paragraphs?.map((paragraph, index) => (
        <p key={index}>
          <RichText value={paragraph} />{" "}
        </p>
      ))}{" "}
      {card.facts ? (
        <dl className="brief-note">
          {card.facts.map((fact, index) => (
            <div key={index}>
              <dt>
                <RichText value={fact.term} />
              </dt>{" "}
              <dd>
                <RichText value={fact.description} />
              </dd>{" "}
            </div>
          ))}
        </dl>
      ) : null}{" "}
      {card.question ? (
        <p className="question-callout">
          <RichText value={card.question} />
        </p>
      ) : null}{" "}
      {card.items ? (
        <ul className="mini-list">
          {card.items.map((item, index) => (
            <li key={index}>
              <RichText value={item} />{" "}
            </li>
          ))}
        </ul>
      ) : null}{" "}
      {card.sources ? <SourceRow links={card.sources} /> : null}{" "}
      {card.actions ? (
        <div className="button-row">
          {card.actions.map((action) => (
            <Fragment key={action.href}>
              <EditorialLink link={action} className="button secondary" />{" "}
            </Fragment>
          ))}
        </div>
      ) : null}{" "}
    </>
  );
}

export function EditorialCard({
  card,
  className = "card",
  as = "article",
  titleLevel = 3,
  linkTitle = false,
  motionKind,
}: {
  card: AuthoredCard;
  className?: string;
  as?: "article" | "aside" | "link";
  titleLevel?: 2 | 3;
  linkTitle?: boolean;
  motionKind?: "orientation" | "priority" | "signal" | "translation" | "time" | "archive";
}) {
  const body = <CardBody card={card} titleLevel={titleLevel} linkTitle={linkTitle} />;
  if (as === "aside") {
    return (
      <aside className={className} data-editorial-motion={motionKind}>
        {body}
      </aside>
    );
  }
  if (as === "link" && card.href) {
    if (card.href.startsWith("/")) {
      return (
        <Link
          className={className}
          href={card.href}
          prefetch={false}
          data-editorial-motion={motionKind}
        >
          {body}
        </Link>
      );
    }
    return (
      <a
        className={className}
        href={card.href}
        data-external="true"
        data-editorial-motion={motionKind}
      >
        {body}
      </a>
    );
  }
  return (
    <article className={className} data-editorial-motion={motionKind}>
      {body}
    </article>
  );
}

export function SourceRow({ links }: { links: readonly AuthoredLink[] }) {
  return (
    <div className="source-row" data-editorial-motion="signal">
      {links.map((item, index) => (
        <Fragment key={`${item.href}-${index}`}>
          {index ? " " : null}
          <EditorialLink link={item} />
        </Fragment>
      ))}
    </div>
  );
}

export function RankedList({
  items,
  evidence = false,
}: {
  items: readonly AuthoredRankedItem[];
  evidence?: boolean;
}) {
  return (
    <ol className={evidence ? "brief-index evidence-list" : "brief-index"}>
      {items.map((item, index) => (
        <li key={index}>
          <span className="rank">
            <RichText value={item.rank} />
          </span>{" "}
          {item.href ? (
            <EditorialLink link={{ href: item.href, label: item.title }} />
          ) : (
            <h3>
              <RichText value={item.title} />
            </h3>
          )}{" "}
          {item.meta ? (
            <span className="meta">
              <RichText value={item.meta} />
            </span>
          ) : null}{" "}
        </li>
      ))}
    </ol>
  );
}

export function DeadlineList({ deadlines }: { deadlines: readonly AuthoredDeadline[] }) {
  return (
    <ul className="horizon-list" data-editorial-motion="time">
      {deadlines.map((deadline, index) => (
        <li key={index}>
          <time dateTime={deadline.dateTime}>
            <RichText value={deadline.date} />
          </time>{" "}
          <span>
            {deadline.href ? (
              <EditorialLink link={{ href: deadline.href, label: deadline.action }} />
            ) : (
              <RichText value={deadline.action} />
            )}
          </span>{" "}
          <span className="owner">
            <RichText value={deadline.owner} />
          </span>{" "}
        </li>
      ))}
    </ul>
  );
}

export function QuestionList({ items }: { items: readonly AuthoredRichText[] }) {
  return (
    <ol className="question-list">
      {items.map((item, index) => (
        <li key={index}>
          <RichText value={item} />{" "}
        </li>
      ))}
    </ol>
  );
}

export function MotionGrid({
  className,
  children,
  kind,
}: {
  className: string;
  children: ReactNode;
  kind: string;
}) {
  return (
    <div className={className} data-editorial-motion={kind}>
      {children}
    </div>
  );
}
