import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUT_DIR = path.join(ROOT, "site-dist", "newsletter");
const PUBLIC_ORIGIN = "https://stgeorgesstrategy.com";

function parseArgs(argv) {
  const options = {
    outDir: DEFAULT_OUT_DIR,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out-dir") {
      options.outDir = argv[++index] || "";
    } else if (arg.startsWith("--out-dir=")) {
      options.outDir = arg.slice("--out-dir=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!options.outDir) throw new Error("Pass --out-dir with a directory path.");
  if (!path.isAbsolute(options.outDir)) options.outDir = path.join(ROOT, options.outDir);
  return options;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateLong(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return `${date.getUTCDate()} ${date.toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  })} ${date.getUTCFullYear()}`;
}

function findTopic(signalsData, topicId) {
  return (signalsData.topics || []).find((topic) => topic.id === topicId);
}

function findSignalUrl(signalsData, signal) {
  const topic = findTopic(signalsData, signal.topic);
  const match = [...(topic?.top5 || []), ...(topic?.stillMaterial || [])].find(
    (row) => row.title === signal.title,
  );
  return match?.url || `${PUBLIC_ORIGIN}/signals/${signal.topic}/`;
}

function buildCommitteeQuestion(edition) {
  if (edition.committeeQuestion?.question) {
    return {
      question: edition.committeeQuestion.question,
      context: edition.committeeQuestion.context || edition.judgement.implication,
    };
  }

  return {
    question: "Can management show the current owner, evidence trail, escalation route, remediation date, and exception record for each critical control break?",
    context: edition.judgement.implication,
  };
}

function buildSignalList(edition, signalsData) {
  return edition.topSignals
    .map((signal, index) => {
      const url = findSignalUrl(signalsData, signal);
      const rank = String(index + 1).padStart(2, "0");
      const border = index === edition.topSignals.length - 1 ? "" : "border-bottom:1px solid rgba(15,34,51,0.16);";
      const source = signal.source
        .split("·")
        .map((part) => escapeHtml(part.trim()))
        .join(" &middot; ");
      return `<tr>
<td width="46" valign="top" style="padding:18px 12px 18px 0;font-family:'Courier New',Courier,monospace;font-size:20px;color:#a07e2e;${border}">${rank}</td>
<td valign="top" style="padding:18px 0;${border}">
<div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:16px;line-height:1.3;color:#15140f;"><a href="${escapeHtml(url)}" style="color:#15140f;text-decoration:none;">${escapeHtml(signal.title)}</a></div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.5;color:#2c2a22;padding-top:6px;"><b>Why it matters:</b> ${escapeHtml(signal.why)}</div>
<div style="font-family:'Courier New',Courier,monospace;font-size:10.5px;letter-spacing:0.5px;color:#8a8672;text-transform:uppercase;padding-top:8px;">${source}</div>
  </td>
</tr>`;
    })
    .join("\n");
}

function buildHtml(edition, signalsData) {
  const title = `The Virtual Officer: ${edition.title}`;
  const issueDate = formatDateLong(edition.publicationDate);
  const signals = buildSignalList(edition, signalsData);
  const committeeQuestion = buildCommitteeQuestion(edition);
  const fullBriefUrl = edition.canonicalUrl || `${PUBLIC_ORIGIN}/brief/`;
  const previewText = `${edition.mainJudgement} Five ranked signals and one committee question for the week.`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escapeHtml(title)}</title>
<!--[if mso]>
<style>table {border-collapse:collapse;} .fallback-font {font-family: Georgia, 'Times New Roman', serif;}</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#e7e1d3;">
<span style="display:none;font-size:1px;color:#e7e1d3;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(previewText)}</span>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e7e1d3;">
<tr><td align="center" style="padding:24px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#f4efe3;">

<!-- Masthead -->
<tr>
<td bgcolor="#0f2233" style="background-color:#0f2233;padding:22px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;color:#c49a4a;text-transform:uppercase;">St Georges Strategy</td>
<td align="right" style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1px;color:#9fb1bf;">${escapeHtml(edition.editionNumber)} &middot; ${escapeHtml(issueDate)}</td>
</tr>
</table>
</td>
</tr>

<!-- Hero -->
<tr>
<td bgcolor="#0f2233" style="background-color:#0f2233;padding:8px 28px 36px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;color:#c49a4a;text-transform:uppercase;padding-bottom:10px;">The Virtual Officer / Weekly Brief</td></tr>
<tr><td style="border-top:2px solid #c49a4a;font-size:1px;line-height:1px;width:64px;">&nbsp;</td></tr>
<tr><td style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:30px;line-height:1.15;color:#f4efe3;padding-top:16px;">
${escapeHtml(edition.title)}
</td></tr>
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#c9cfd6;padding-top:14px;">What changed. Why it matters. What to ask for next.</td></tr>
</table>
</td>
</tr>

<!-- Judgement -->
<tr>
<td bgcolor="#f4efe3" style="background-color:#f4efe3;padding:32px 28px 8px 28px;border-bottom:1px solid rgba(15,34,51,0.16);">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;color:#8a6a22;text-transform:uppercase;padding-bottom:14px;">This Week&rsquo;s Judgement</td></tr>
<tr><td style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:22px;line-height:1.3;color:#15140f;padding-bottom:14px;">${escapeHtml(edition.mainJudgement)}</td></tr>
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2c2a22;padding-bottom:12px;">${escapeHtml(edition.judgement.observation)}</td></tr>
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2c2a22;padding-bottom:12px;">${escapeHtml(edition.judgement.executiveJudgement)}</td></tr>
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2c2a22;padding-bottom:24px;">${escapeHtml(edition.judgement.implication)}</td></tr>
</table>
</td>
</tr>

<!-- Signals -->
<tr>
<td bgcolor="#f4efe3" style="background-color:#f4efe3;padding:28px 28px 8px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;color:#8a6a22;text-transform:uppercase;padding-bottom:16px;">Five Signals Worth Taking Into The Week</td></tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(15,34,51,0.16);">
${signals}
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" style="padding:22px 0 8px 0;">
<a href="${escapeHtml(fullBriefUrl)}" style="font-family:'Courier New',Courier,monospace;font-size:12px;letter-spacing:1px;color:#8a6a22;text-decoration:underline;text-transform:uppercase;">See all 5 signals on site &rarr;</a>
</td></tr>
</table>
</td>
</tr>

<!-- Committee question -->
<tr>
<td bgcolor="#0f2233" style="background-color:#0f2233;padding:32px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2px;color:#c49a4a;text-transform:uppercase;padding-bottom:16px;">Committee Question</td></tr>
<tr>
<td style="border-left:2px solid #c49a4a;padding-left:16px;">
<div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-style:italic;font-size:19px;line-height:1.4;color:#f4efe3;">${escapeHtml(committeeQuestion.question)}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:#aab6bf;padding-top:10px;">${escapeHtml(committeeQuestion.context)}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td bgcolor="#f4efe3" style="background-color:#f4efe3;padding:32px 28px;text-align:center;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
<tr>
<td bgcolor="#0f2233" style="background-color:#0f2233;padding:14px 30px;">
<a href="${escapeHtml(fullBriefUrl)}" style="display:block;font-family:'Courier New',Courier,monospace;font-size:12px;letter-spacing:1.5px;color:#f4efe3;text-decoration:none;text-transform:uppercase;">Read the full brief &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td bgcolor="#15140f" style="background-color:#15140f;padding:26px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8a8672;">
St Georges Strategy &middot; The Virtual Officer<br>
Source-backed intelligence based on sector-wide public sources. Not investment, legal, compliance, or regulatory advice.
</td></tr>
<tr><td style="padding-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#605d4f;">
You're receiving this because you subscribed at stgeorgesstrategy.com.<br>
<a href="{{unsubscribe_url}}" style="color:#8a8672;">Unsubscribe</a>
</td></tr>
</table>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildPayload(edition, html) {
  return {
    title: `The Virtual Officer: ${edition.title}`,
    subtitle: edition.mainJudgement,
    status: "draft",
    body_content: html,
    seo_settings: {
      meta_title: `The Virtual Officer: ${edition.title}`,
      meta_description: edition.mainJudgement,
    },
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const edition = readJson("site/data/current-edition.json");
  const signalsData = readJson("site/data/signals.json");
  const html = buildHtml(edition, signalsData);
  const payload = buildPayload(edition, html);

  fs.mkdirSync(options.outDir, { recursive: true });
  const base = `beehiiv-${edition.publicationDate}`;
  const htmlPath = path.join(options.outDir, `${base}.html`);
  const jsonPath = path.join(options.outDir, `${base}.post.json`);
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(`Beehiiv newsletter HTML written to ${path.relative(ROOT, htmlPath)}`);
  console.log(`Beehiiv draft-post payload written to ${path.relative(ROOT, jsonPath)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
