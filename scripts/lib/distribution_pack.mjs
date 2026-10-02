const PUBLIC_ORIGIN = "https://stgeorgesstrategy.com";

function requireText(value, label) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`Distribution pack requires ${label}.`);
  return text;
}

export function distributionPackFileName(edition) {
  return `edition-${requireText(edition.publicationDate, "publicationDate")}.json`;
}

export function linkedinTemplateFileName(edition) {
  return `edition-${requireText(edition.publicationDate, "publicationDate")}-linkedin.md`;
}

function deepDiveSlug(record) {
  const route = requireText(record?.route, "deepDive.route");
  const match = route.match(/^\/deep-dives\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/);
  if (!match) throw new Error(`Deep Dive route must be a canonical /deep-dives/<slug>/ URL: ${route}`);
  return match[1];
}

function buildDeepDivePost(record) {
  const route = requireText(record.route, "deepDive.route");
  const slug = deepDiveSlug(record);
  const title = requireText(record.title, "deepDive.title");
  const dek = requireText(record.dek, "deepDive.dek");
  const readTime = requireText(record.readTime, "deepDive.readTime");
  const publishedDate = requireText(record.publishedDate, "deepDive.publishedDate");
  const url = `${PUBLIC_ORIGIN}${route}`;
  const image = `${PUBLIC_ORIGIN}/assets/og/deep-dive-${slug}.png`;
  const copy = [
    "The Virtual Officer — Deep Dive",
    "",
    title,
    "",
    dek,
    "",
    `Read the Deep Dive (${readTime}): ${url}`,
  ].join("\n");

  return {
    publishedDate,
    title,
    category: requireText(record.category, "deepDive.category"),
    url,
    cover: {
      image,
      alt: `${title} — St Georges Strategy Deep Dive`,
    },
    linkedin: {
      title: "The Virtual Officer — Deep Dive",
      copy,
    },
  };
}

/**
 * Keep the distribution copy mechanical. The editor approves the three public
 * Judgement paragraphs once in current-edition.json; LinkedIn and newsletter
 * drafts must inherit those paragraphs rather than becoming a second source
 * of editorial claims.
 */
export function buildDistributionPack(edition, deepDiveLibrary = []) {
  const publicationDate = requireText(edition.publicationDate, "publicationDate");
  const editionNumber = requireText(edition.editionNumber, "editionNumber");
  const title = requireText(edition.title || edition.mainJudgement, "title");
  const canonicalUrl = requireText(edition.canonicalUrl, "canonicalUrl");
  const observation = requireText(edition.judgement?.observation, "judgement.observation");
  const executiveJudgement = requireText(edition.judgement?.executiveJudgement, "judgement.executiveJudgement");
  const implication = requireText(edition.judgement?.implication, "judgement.implication");
  const permanentUrl = `${PUBLIC_ORIGIN}/brief/${publicationDate}/`;

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
    `Read the five-minute Brief: ${permanentUrl}`,
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
    `Read the five-minute Brief: ${permanentUrl}`,
  ].join("\n");

  return {
    version: "sgs-distribution-pack.v2",
    publicationDate,
    source: {
      currentEdition: "site/data/current-edition.json",
      canonicalUrl,
      permanentUrl,
    },
    cover: {
      image: `${PUBLIC_ORIGIN}/assets/og/weekly-brief-${publicationDate}.png`,
      alt: `${editionNumber} — St Georges Strategy weekly intelligence edition card`,
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
    deepDives: (deepDiveLibrary || [])
      .filter((record) => record?.route && record?.publishedDate && record?.title && record?.dek && record?.readTime && record?.category)
      .sort((left, right) => String(right.publishedDate).localeCompare(String(left.publishedDate)))
      .map(buildDeepDivePost),
  };
}

export function renderLinkedinDistributionTemplate(pack) {
  const sections = [
    `# LinkedIn distribution — ${pack.source.permanentUrl.split("/").filter(Boolean).at(-1)}`,
    "",
    "Use the copy unchanged unless an editor approves a factual alteration. Post manually; this pack never publishes to LinkedIn.",
    "",
    "## Weekly Brief",
    "",
    `- Permanent URL: ${pack.source.permanentUrl}`,
    `- Share image: ${pack.cover.image}`,
    "",
    "```text",
    pack.linkedin.copy,
    "```",
  ];
  for (const deepDive of pack.deepDives || []) {
    sections.push(
      "",
      `## Deep Dive — ${deepDive.title}`,
      "",
      `- Permanent URL: ${deepDive.url}`,
      `- Share image: ${deepDive.cover.image}`,
      "",
      "```text",
      deepDive.linkedin.copy,
      "```",
    );
  }
  return `${sections.join("\n")}\n`;
}

export function assertDistributionPack(pack, edition, deepDiveLibrary = []) {
  const expected = buildDistributionPack(edition, deepDiveLibrary);
  const actual = JSON.stringify(pack);
  const required = [
    expected.linkedin.title,
    expected.linkedin.threeBeat.whatHappened,
    expected.linkedin.threeBeat.whyItMatters,
    expected.linkedin.threeBeat.whatToDo,
    expected.source.permanentUrl,
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
  if (JSON.stringify(pack.deepDives) !== JSON.stringify(expected.deepDives)) {
    throw new Error("Deep Dive LinkedIn posts have drifted from the approved Deep Dive library.");
  }
}
