const DEFAULT_PAGES = [
  "https://stgeorgesstrategy.com/",
  "https://stgeorgesstrategy.com/about/",
  "https://stgeorgesstrategy.com/brief/",
  "https://stgeorgesstrategy.com/signals/",
  "https://stgeorgesstrategy.com/signals/ai/",
  "https://stgeorgesstrategy.com/signals/resilience/",
  "https://stgeorgesstrategy.com/signals/third-party/",
  "https://stgeorgesstrategy.com/signals/market-structure/",
  "https://stgeorgesstrategy.com/signals/financial-crime/",
  "https://stgeorgesstrategy.com/signals/cyber/",
  "https://stgeorgesstrategy.com/signals/technology-failure/",
  "https://stgeorgesstrategy.com/signals/data/",
  "https://stgeorgesstrategy.com/regulatory-horizon/",
  "https://stgeorgesstrategy.com/archive/",
  "https://intelligence.stgeorgesstrategy.com/",
  "https://stgeorgesstrategy.com/thevirtualofficer/",
  "https://stgeorgesstrategy.com/ai-signals/",
];

const USER_AGENT =
  "ProjectVirtualOfficerLinkVerifier/1.0 (+https://stgeorgesstrategy.com/)";

const ignoredSchemes = /^(#|mailto:|tel:|javascript:)/i;
const restrictedButPresentStatuses = new Set([401, 403]);
const templateBindingPattern = /\{\{[^}]+\}\}|<x-dc\b/i;

function isRestrictedButPresent(url, status) {
  if (restrictedButPresentStatuses.has(status)) return true;

  try {
    const hostname = new URL(url).hostname;
    return status === 999 && hostname.endsWith("linkedin.com");
  } catch {
    return false;
  }
}

function getArgPages() {
  const explicit = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  return explicit.length ? explicit : DEFAULT_PAGES;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match ? match[1] : "";
}

function extractLinks(html, baseUrl) {
  const links = [];
  const tagPattern = /<(a|link)\b[^>]*\bhref=["'][^"']+["'][^>]*>/gi;
  let match;

  while ((match = tagPattern.exec(html))) {
    const tag = match[0];
    const tagName = match[1].toLowerCase();
    const href = attr(tag, "href");
    const rel = attr(tag, "rel").toLowerCase();

    if (!href || ignoredSchemes.test(href)) continue;
    if (tagName === "link" && rel.includes("preconnect")) continue;

    try {
      links.push(new URL(href, baseUrl).href);
    } catch {
      links.push(href);
    }
  }

  return [...new Set(links)];
}

async function fetchUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT },
    });
    const restricted = isRestrictedButPresent(url, response.status);
    const ok = response.status < 400 || restricted;

    return {
      url,
      status: response.status,
      ok,
      finalUrl: response.url,
      note: restricted ? "restricted" : "",
    };
  } catch (error) {
    return { url, ok: false, error: String(error) };
  }
}

async function main() {
  const pages = getArgPages();
  const links = new Set();
  const pageResults = [];

  for (const page of pages) {
    const pageResult = await fetchUrl(page);
    if (!pageResult.ok) {
      pageResults.push({ ...pageResult, links: 0 });
      continue;
    }

    const response = await fetch(page, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT },
    });
    const html = await response.text();
    const pageLinks = extractLinks(html, page);
    pageLinks.forEach((link) => links.add(link));
    pageResults.push({
      ...pageResult,
      ok: pageResult.ok && !templateBindingPattern.test(html),
      links: pageLinks.length,
      rawTemplateBindings: (html.match(/\{\{[^}]+\}\}/g) || []).length,
      hasDcTemplate: /<x-dc\b/i.test(html),
    });
  }

  const linkResults = [];
  for (const link of [...links].sort()) {
    linkResults.push(await fetchUrl(link));
  }

  const failures = [...pageResults, ...linkResults].filter((result) => !result.ok);
  const restricted = linkResults.filter((result) => result.note === "restricted");

  for (const page of pageResults) {
    const templateNote =
      page.rawTemplateBindings || page.hasDcTemplate
        ? ` rawTemplates=${page.rawTemplateBindings} xDc=${page.hasDcTemplate}`
        : "";
    console.log(`${page.ok ? "OK" : "FAIL"} page ${page.status ?? "ERR"} ${page.url} links=${page.links}${templateNote}`);
  }

  for (const result of linkResults) {
    const status = result.status ?? "ERR";
    const note = result.note ? ` ${result.note}` : "";
    console.log(`${result.ok ? "OK" : "FAIL"} link ${status}${note} ${result.url}`);
  }

  console.log(
    `Checked ${pageResults.length} pages and ${linkResults.length} unique links; ` +
      `${failures.length} failures; ${restricted.length} restricted/paywalled links.`,
  );

  if (failures.length) {
    console.error("Broken public links:");
    for (const failure of failures) {
      const reason =
        failure.rawTemplateBindings || failure.hasDcTemplate
          ? ` (rawTemplates=${failure.rawTemplateBindings}, xDc=${failure.hasDcTemplate})`
          : failure.error
            ? ` (${failure.error})`
            : "";
      console.error(`- ${failure.status ?? "ERR"} ${failure.url}${reason}`);
    }
    process.exit(1);
  }

  process.exit(0);
}

main();
