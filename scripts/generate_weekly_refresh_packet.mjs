import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const options = {
    date: "",
    out: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--date") {
      options.date = argv[++index] || "";
    } else if (arg.startsWith("--date=")) {
      options.date = arg.slice("--date=".length);
    } else if (arg === "--out") {
      options.out = argv[++index] || "";
    } else if (arg.startsWith("--out=")) {
      options.out = arg.slice("--out=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!options.date) {
    options.date = new Date().toISOString().slice(0, 10);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) {
    throw new Error("Pass the weekly refresh date as --date YYYY-MM-DD.");
  }

  if (!options.out) {
    options.out = path.join(ROOT, "site-dist", `weekly-refresh-packet-${options.date}.md`);
  } else if (!path.isAbsolute(options.out)) {
    options.out = path.join(ROOT, options.out);
  }

  return options;
}

function readRelative(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readJsonRelative(relativePath) {
  return JSON.parse(readRelative(relativePath));
}

function formatDisplayDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return `${date.getUTCDate()} ${date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  })} ${date.getUTCFullYear()}`;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceLine(markdown, label, value) {
  const pattern = new RegExp(`(^- ${escapeRegExp(label)}:).*$`, "m");
  return markdown.replace(pattern, `$1 ${value}`);
}

function extractIntelligenceEditionLine(html) {
  const match = html.match(/<p class="edition-line">([^<]+)<\/p>/i);
  return match ? match[1].trim() : "";
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const displayDate = formatDisplayDate(options.date);
  const template = readRelative("docs/weekly-refresh-packet-template.md");
  const intelligence = readRelative("dashboard/index.html");
  const aiSignalsData = readJsonRelative("dashboard/data/ai-signals.json");
  const horizon = readJsonRelative("dashboard/regulatory-horizon/latest.json");

  const intelligenceEditionLine = extractIntelligenceEditionLine(intelligence) || `Live edition · ${displayDate} · Vol. N`;
  const currentVolume = intelligenceEditionLine.match(/Vol\.\s+([IVXLCDM]+)/)?.[1] || "N";
  const proposedIntelligenceEditionLine = `Live edition · ${displayDate} · Vol. ${currentVolume}`;
  const proposedAiSignalsEditionLine = `Live edition / Updated ${displayDate}`;
  const aiSignalsEditionLine = aiSignalsData.edition?.line || `Live edition / Updated ${displayDate}`;
  const aiSections = Array.isArray(aiSignalsData.sections) ? aiSignalsData.sections : [];
  const aiCards = aiSections.flatMap((section) => (Array.isArray(section.cards) ? section.cards : []));
  const horizonItems = Array.isArray(horizon.horizon) ? horizon.horizon : [];

  let packet = template.replace(/^Publication date: .*/m, `Publication date: ${options.date}`);
  packet = replaceLine(packet, "Display date", displayDate);
  packet = packet.replace(
    /^- Volume:\s*$/m,
    currentVolume ? `- Volume: ${currentVolume}` : "- Volume: ",
  );
  packet = replaceLine(packet, "Proposed edition line", proposedIntelligenceEditionLine);
  packet = replaceLine(packet, "Scheduled task wrote `dashboard/data/ai-signals.json`", aiSignalsData.generatedAt || "Yes");

  // Replace the second AI Signals display / edition block without disturbing the intelligence block.
  const sections = packet.split("AI Signals:");
  if (sections.length === 2) {
    sections[1] = sections[1]
      .replace(/^- Display date:.*$/m, `- Display date: ${displayDate}`)
      .replace(/^- Proposed edition line:.*$/m, `- Proposed edition line: ${proposedAiSignalsEditionLine}`);
    packet = sections.join("AI Signals:");
  }

  packet = replaceLine(packet, "Refresh date computed at runtime", `Yes (${options.date})`);
  packet = replaceLine(packet, "Previous Intelligence archive reviewed", "Fill during editorial pass");
  packet = replaceLine(packet, "Previous AI Signals archive reviewed", "Fill during editorial pass");
  packet = replaceLine(packet, "Items dropped as already covered", "Fill during editorial pass");
  packet = replaceLine(packet, "Search used only after primary-source fetches", "Fill during editorial pass");
  packet = replaceLine(packet, "Statistics older than 90 days flagged", "Fill during editorial pass");
  packet = replaceLine(packet, "Previous dated AI Signals archive checked", "Fill during editorial pass");
  packet = replaceLine(packet, "`npm run ai-signals:validate -- --date YYYY-MM-DD` passed", "Use GitHub Actions validation and final editorial QA");
  packet = replaceLine(packet, "Duplicate AI Signals items dropped unless status changed", "Fill during editorial pass");

  const automationSummary = [
    "## Automation Context",
    "",
    `- Packet generated at: ${new Date().toISOString()}`,
    `- Target publication date: ${options.date}`,
    `- Current Intelligence edition line: ${intelligenceEditionLine}`,
    `- Current AI Signals edition line: ${aiSignalsEditionLine}`,
    `- Current AI Signals card count: ${aiCards.length}`,
    `- Current AI Signals sections: ${aiSections.map((section) => `${section.id}:${Array.isArray(section.cards) ? section.cards.length : 0}`).join(", ") || "none"}`,
    `- Current Reg Horizon items: ${horizonItems.length}`,
    `- Candidate signals file: dashboard/data/signals-candidates.generated.json`,
    `- Horizon feed file: dashboard/regulatory-horizon/latest.json`,
    "",
  ].join("\n");

  const finalPacket = `${automationSummary}\n${packet}`;
  fs.mkdirSync(path.dirname(options.out), { recursive: true });
  fs.writeFileSync(options.out, finalPacket);
  console.log(`Weekly refresh packet written to ${path.relative(ROOT, options.out)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
