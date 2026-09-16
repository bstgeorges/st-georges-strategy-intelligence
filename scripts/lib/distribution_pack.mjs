const PUBLIC_ORIGIN = "https://stgeorgesstrategy.com";

function requireText(value, label) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`Distribution pack requires ${label}.`);
  return text;
}

export function distributionPackFileName(edition) {
  return `edition-${requireText(edition.publicationDate, "publicationDate")}.json`;
}

/**
 * Keep the distribution copy mechanical. The editor approves the three public
 * Judgement paragraphs once in current-edition.json; LinkedIn and newsletter
 * drafts must inherit those paragraphs rather than becoming a second source
 * of editorial claims.
 */
export function buildDistributionPack(edition) {
  const publicationDate = requireText(edition.publicationDate, "publicationDate");
  const editionNumber = requireText(edition.editionNumber, "editionNumber");
  const title = requireText(edition.title || edition.mainJudgement, "title");
  const canonicalUrl = requireText(edition.canonicalUrl, "canonicalUrl");
  const observation = requireText(edition.judgement?.observation, "judgement.observation");
  const executiveJudgement = requireText(edition.judgement?.executiveJudgement, "judgement.executiveJudgement");
  const implication = requireText(edition.judgement?.implication, "judgement.implication");

  const linkedinCopy = [
    `The Virtual Officer — ${editionNumber}`,
    "",
    title,
    "",
    "What happened",
    observation,
    "",
    "Why it matters",
    executiveJudgement,
    "",
    "What to do",
    implication,
    "",
    `Read the five-minute Brief: ${canonicalUrl}`,
  ].join("\n");
  const newsletterCopy = [
    title,
    "",
    "What happened",
    observation,
    "",
    "Why it matters",
    executiveJudgement,
    "",
    "What to do",
    implication,
    "",
    `Read the five-minute Brief: ${canonicalUrl}`,
  ].join("\n");

  return {
    version: "sgs-distribution-pack.v1",
    publicationDate,
    source: {
      currentEdition: "site/data/current-edition.json",
      canonicalUrl,
    },
    cover: {
      image: `${PUBLIC_ORIGIN}/assets/og-card.png`,
      alt: "St Georges Strategy weekly intelligence edition card",
    },
    linkedin: {
      title: `The Virtual Officer — ${editionNumber}`,
      copy: linkedinCopy,
      threeBeat: { whatHappened: observation, whyItMatters: executiveJudgement, whatToDo: implication },
    },
    newsletter: {
      subject: `The Virtual Officer: ${title}`,
      preheader: `${edition.mainJudgement || title} Five ranked signals and one committee question for the week.`,
      copy: newsletterCopy,
    },
  };
}

export function assertDistributionPack(pack, edition) {
  const expected = buildDistributionPack(edition);
  const actual = JSON.stringify(pack);
  const required = [
    expected.linkedin.title,
    expected.linkedin.threeBeat.whatHappened,
    expected.linkedin.threeBeat.whyItMatters,
    expected.linkedin.threeBeat.whatToDo,
    expected.source.canonicalUrl,
    expected.cover.image,
  ];
  if (pack.version !== expected.version || pack.publicationDate !== expected.publicationDate) {
    throw new Error("Distribution pack edition metadata is out of sync with current-edition.json.");
  }
  for (const value of required) {
    if (!actual.includes(value)) throw new Error("Distribution pack does not faithfully mirror the approved Weekly Judgement.");
  }
  if (pack.linkedin?.copy !== expected.linkedin.copy) {
    throw new Error("LinkedIn copy has drifted from the approved three-beat Weekly Judgement.");
  }
  if (pack.newsletter?.subject !== expected.newsletter.subject || pack.newsletter?.preheader !== expected.newsletter.preheader || pack.newsletter?.copy !== expected.newsletter.copy) {
    throw new Error("Newsletter metadata has drifted from the approved current edition.");
  }
}
