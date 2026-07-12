const FORBIDDEN_PUBLIC_COPY = [
  ["editorial scaffolding", /\bthis is where the new brief\b/i],
  ["editorial scaffolding", /\bthe weekly newsletter should\b/i],
  ["migration note", /\bthe existing site has good raw material here\b/i],
  ["migration note", /\bin the migration,\s+this could become\b/i],
  ["migration note", /\bbefore migration\b/i],
  ["migration note", /\bmigration-ready\b/i],
  ["draft marker", /\bdraft opening\b/i],
  ["placeholder marker", /\b(?:lorem ipsum|todo|tbd|tk)\b/i],
];

export function validatePublicHtmlCopy(html, source = "public HTML") {
  const failures = [];
  for (const [label, pattern] of FORBIDDEN_PUBLIC_COPY) {
    const match = html.match(pattern);
    if (match) failures.push(`${source} contains ${label}: "${match[0]}"`);
  }
  return failures;
}
