import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const options = {
    date: "",
    dryRun: false,
    force: false,
    target: "all",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--date") {
      options.date = argv[++index] || "";
    } else if (arg.startsWith("--date=")) {
      options.date = arg.slice("--date=".length);
    } else if (arg === "--target") {
      options.target = argv[++index] || "";
    } else if (arg.startsWith("--target=")) {
      options.target = arg.slice("--target=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("Pass an archive date as --date YYYY-MM-DD.");
  }

  if (!["all", "intelligence", "ai-signals"].includes(options.target)) {
    throw new Error("--target must be one of: all, intelligence, ai-signals.");
  }

  return options;
}

function formatDisplayDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return `${date.getUTCDate()} ${date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  })} ${date.getUTCFullYear()}`;
}

function decodeHtml(text) {
  return text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ");
}

function cleanTitleText(text) {
  return decodeHtml(text)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[.?!]\s*$/, "")
    .trim();
}

function firstMatch(content, patterns) {
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[1]) return cleanTitleText(match[1]);
  }
  return "";
}

function buildIntelligenceArchiveTitle(html, displayDate) {
  const topic = firstMatch(html, [
    /<article class="signal-card featured lead-signal-card">[\s\S]*?<h3>([\s\S]*?)<\/h3>/,
    /<article class="lead-brief">[\s\S]*?<h3>([\s\S]*?)<\/h3>/,
  ]);
  return topic
    ? `${topic} — Intelligence Brief, ${displayDate}`
    : `The Virtual Officer Intelligence Brief, ${displayDate}`;
}

function buildAiSignalsArchiveTitle(displayDate) {
  const data = JSON.parse(readRelative("dashboard/data/ai-signals.json"));
  const topic = cleanTitleText(data.sections?.[0]?.cards?.[0]?.title || "");
  return topic ? `${topic} — AI Signals, ${displayDate}` : `AI Signals Brief, ${displayDate}`;
}

function ensureFavicon(html) {
  if (html.includes('rel="icon"')) return html;
  return replaceRequired(
    html,
    /(<meta name="twitter:card" content="summary_large_image">\n)/,
    `$1    <link rel="icon" type="image/svg+xml" href="https://stgeorgesstrategy.com/intelligence/assets/favicon.svg">\n`,
    "favicon",
  );
}

function readRelative(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function writeRelative(relativePath, content, options, actions) {
  const absolutePath = path.join(ROOT, relativePath);
  actions.push(`${options.dryRun ? "Would write" : "Wrote"} ${relativePath}`);
  if (options.dryRun) return;
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content);
}

function assertArchiveDestination(relativePath, options) {
  const absolutePath = path.join(ROOT, relativePath);
  if (fs.existsSync(absolutePath) && !options.force) {
    throw new Error(`${relativePath} already exists. Pass --force to replace it.`);
  }
}

function replaceRequired(content, pattern, replacement, label) {
  if (!pattern.test(content)) {
    throw new Error(`Could not update ${label}.`);
  }
  const updated = content.replace(pattern, replacement);
  return updated;
}

function replaceOptional(content, pattern, replacement) {
  return content.replace(pattern, replacement);
}

function archiveIntelligence(options, displayDate, actions) {
  const destination = `dashboard/archive/${options.date}/index.html`;
  assertArchiveDestination(destination, options);

  let html = readRelative("dashboard/index.html");
  const archiveTitle = buildIntelligenceArchiveTitle(html, displayDate);
  html = replaceRequired(
    html,
    /<title>.*?<\/title>/,
    `<title>${archiveTitle}</title>`,
    "intelligence title",
  );
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]+">/,
    `<link rel="canonical" href="https://stgeorgesstrategy.com/intelligence/archive/${options.date}/">`,
    "intelligence canonical",
  );
  html = replaceRequired(
    html,
    /<meta property="og:title" content="[^"]+">/,
    `<meta property="og:title" content="${archiveTitle}">`,
    "intelligence og:title",
  );
  html = replaceRequired(
    html,
    /<meta property="og:url" content="[^"]+">/,
    `<meta property="og:url" content="https://stgeorgesstrategy.com/intelligence/archive/${options.date}/">`,
    "intelligence og:url",
  );
  html = replaceRequired(
    html,
    /<meta property="og:image" content="[^"]+">/,
    `<meta property="og:image" content="https://stgeorgesstrategy.com/intelligence/assets/financial-services-intelligence-og.png">`,
    "intelligence og:image",
  );
  html = replaceRequired(
    html,
    /<link rel="stylesheet" href="styles\.css">/,
    `<link rel="stylesheet" href="https://stgeorgesstrategy.com/intelligence/styles.css">`,
    "intelligence stylesheet path",
  );
  html = replaceRequired(
    html,
    /<img src="assets\/financial-services-intelligence-hero\.webp"/,
    `<img src="https://stgeorgesstrategy.com/intelligence/assets/financial-services-intelligence-hero.webp"`,
    "intelligence hero image path",
  );
  html = replaceRequired(
    html,
    /<p class="edition-line">Live edition · .*? · (.*?)<\/p>/,
    (_match, volumeLabel) => `<p class="edition-line">Archived edition · ${displayDate} · ${volumeLabel}</p>`,
    "intelligence edition line",
  );
  html = replaceRequired(
    html,
    /<a class="button secondary" href="https:\/\/stgeorgesstrategy\.com\/thevirtualofficer\/">&larr; The method behind this brief<\/a>/,
    `<a class="button secondary" href="https://stgeorgesstrategy.com/intelligence/">&larr; Back to latest</a>`,
    "intelligence archive back link",
  );
  html = ensureFavicon(html);

  writeRelative(destination, html, options, actions);
  upsertMainArchiveEntry(options, displayDate, actions);
}

function upsertMainArchiveEntry(options, displayDate, actions) {
  const relativePath = "dashboard/archive/index.html";
  let html = readRelative(relativePath);
  const href = `https://stgeorgesstrategy.com/intelligence/archive/${options.date}/`;
  if (html.includes(href)) {
    actions.push(`Skipped ${relativePath}; intelligence ${options.date} already listed`);
    return;
  }

  const entry = `        <a class="edition" href="${href}">
          <div>
            <h2>The Virtual Officer Intelligence Brief</h2>
            <p>Regulation, resilience, AI governance, control lessons, markets, and supervisory pressure.</p>
          </div>
          <span class="meta">${displayDate}</span>
        </a>
`;

  html = replaceRequired(
    html,
    /(<section class="list" aria-label="Archived St Georges Strategy editions">\n)/,
    `$1${entry}`,
    "main archive intelligence insertion point",
  );
  writeRelative(relativePath, html, options, actions);
}

function archiveAiSignals(options, displayDate, actions) {
  const destination = `dashboard/ai-signals/archive/${options.date}/index.html`;
  assertArchiveDestination(destination, options);

  let html = readRelative("dashboard/ai-signals/index.html");
  const archiveTitle = buildAiSignalsArchiveTitle(displayDate);
  html = replaceRequired(
    html,
    /<title>.*?<\/title>/,
    `<title>${archiveTitle}</title>`,
    "AI Signals title",
  );
  html = replaceRequired(
    html,
    /<meta name="description" content="[^"]+">/,
    `<meta name="description" content="Archived AI Signals edition from ${displayDate}.">`,
    "AI Signals description",
  );
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]+">/,
    `<link rel="canonical" href="https://stgeorgesstrategy.com/ai-signals/archive/${options.date}/">`,
    "AI Signals canonical",
  );
  html = replaceRequired(
    html,
    /<meta property="og:title" content="[^"]+">/,
    `<meta property="og:title" content="${archiveTitle}">`,
    "AI Signals og:title",
  );
  html = replaceRequired(
    html,
    /<meta property="og:description" content="[^"]+">/,
    `<meta property="og:description" content="Archived AI Signals edition from ${displayDate}.">`,
    "AI Signals og:description",
  );
  html = replaceRequired(
    html,
    /<meta property="og:url" content="[^"]+">/,
    `<meta property="og:url" content="https://stgeorgesstrategy.com/ai-signals/archive/${options.date}/">`,
    "AI Signals og:url",
  );
  html = replaceRequired(
    html,
    /<meta property="og:image" content="[^"]+">/,
    `<meta property="og:image" content="https://stgeorgesstrategy.com/intelligence/assets/financial-services-intelligence-og.png">`,
    "AI Signals og:image",
  );
  html = replaceRequired(
    html,
    /<span id="edition-line">.*?<\/span>/,
    `<span id="edition-line">Archived edition / ${displayDate}</span>`,
    "AI Signals edition label",
  );
  html = replaceRequired(
    html,
    /<span id="edition-descriptor">.*?<\/span>/,
    `<span id="edition-descriptor">Preserved snapshot / Source-linked</span>`,
    "AI Signals snapshot label",
  );
  html = replaceRequired(
    html,
    /<body data-ai-signals-url="\.\.\/data\/ai-signals\.json">/,
    `<body data-ai-signals-url="data/ai-signals.json">`,
    "AI Signals archive data path",
  );
  html = replaceOptional(
    html,
    /<h1>The AI Signals brief<\/h1>/,
    `<h1>The AI signal brief</h1>`,
  );
  html = replaceOptional(
    html,
    /<span class="footer-title">AI Signals<\/span>/,
    `<span class="footer-title">The AI signal brief</span>`,
  );
  html = ensureFavicon(html);

  writeRelative(destination, html, options, actions);
  archiveAiSignalsData(options, displayDate, actions);
  writeRelative(`dashboard/ai-signals/archive/${options.date}/app.js`, readRelative("dashboard/ai-signals/app.js"), options, actions);
  upsertAiSignalsArchiveEntry(options, displayDate, actions);
}

function archiveAiSignalsData(options, displayDate, actions) {
  const data = JSON.parse(readRelative("dashboard/data/ai-signals.json"));
  data.status = "archived";
  data.archivedAt = options.date;
  data.edition = {
    ...(data.edition || {}),
    line: `Archived edition / ${displayDate}`,
    descriptor: "Preserved snapshot / Source-linked",
  };

  writeRelative(
    `dashboard/ai-signals/archive/${options.date}/data/ai-signals.json`,
    `${JSON.stringify(data, null, 2)}\n`,
    options,
    actions,
  );
}

function upsertAiSignalsArchiveEntry(options, displayDate, actions) {
  const relativePath = "dashboard/ai-signals/archive/index.html";
  let html = readRelative(relativePath);
  const href = `https://stgeorgesstrategy.com/ai-signals/archive/${options.date}/`;
  if (html.includes(href)) {
    actions.push(`Skipped ${relativePath}; AI Signals ${options.date} already listed`);
    return;
  }

  const entry = `        <a class="edition" href="${href}">
          <div>
            <h2>AI Signals</h2>
            <p>Model releases, feature launches, and industry news shaping the AI landscape.</p>
          </div>
          <span class="meta">${displayDate}</span>
        </a>
`;

  html = replaceRequired(
    html,
    /(<section class="list" aria-label="Archived AI Signals editions">\n)/,
    `$1${entry}`,
    "AI Signals archive insertion point",
  );
  writeRelative(relativePath, html, options, actions);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const displayDate = formatDisplayDate(options.date);
  const actions = [];

  if (options.target === "all" || options.target === "intelligence") {
    archiveIntelligence(options, displayDate, actions);
  }

  if (options.target === "all" || options.target === "ai-signals") {
    archiveAiSignals(options, displayDate, actions);
  }

  console.log(actions.join("\n"));
  console.log(options.dryRun ? "Dry run complete." : "Archive update complete.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
