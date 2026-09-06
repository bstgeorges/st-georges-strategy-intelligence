import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTER_DIR = path.join(ROOT, "dashboard", "regulatory-deadline-register");
const OUTPUT_DIR = path.join(ROOT, "dashboard", "regulatory-horizon-preview");

function readJson(file, fallback) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : fallback;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}

function titleCase(value) {
  return String(value || "Other").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderPreview({ register, health }) {
  const asOf = register.asOf || "";
  const asOfTime = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? new Date(`${asOf}T00:00:00Z`).valueOf() : Date.now();
  const confirmed = (register.items || [])
    .filter((item) => item.status === "confirmed" && item.deadline > asOf)
    .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  const dueIn30 = confirmed.filter((item) => (new Date(`${item.deadline}T00:00:00Z`).valueOf() - asOfTime) / 86400000 <= 30);
  const authorities = new Set(confirmed.map((item) => item.authority?.name).filter(Boolean));
  const sourceHealth = health.sourceHealth || [];
  const healthy = sourceHealth.filter((source) => source.status === "ok").length;
  const sourceCount = sourceHealth.length;
  const deadlineCards = confirmed.slice(0, 5).map((item) => {
    const days = Math.round((new Date(`${item.deadline}T00:00:00Z`).valueOf() - asOfTime) / 86400000);
    return `<article class="deadline-card"><p class="date">${escapeHtml(formatDate(item.deadline))}</p><p class="days">${escapeHtml(String(days))} days</p><h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.authority?.name || "Official source")} · ${escapeHtml(titleCase(item.stage))}</p></article>`;
  }).join("");
  const tableRows = confirmed.map((item) => `<tr><td><strong>${escapeHtml(formatDate(item.deadline))}</strong></td><td><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.title)}</a><span>${escapeHtml((item.themes || []).map(titleCase).join(" · ") || titleCase(item.stage))}</span></td><td>${escapeHtml(item.authority?.name || "Official source")}</td><td>${escapeHtml(titleCase(item.stage))}</td></tr>`).join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Regulatory Horizon | Private product preview</title>
    <style>
      :root{--ink:#0d2637;--paper:#f1ede3;--surface:#fffdf8;--line:#d8d0c0;--muted:#657078;--gold:#a77b28;--green:#1f7157;--red:#99433d}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.shell{width:min(1320px,calc(100% - 48px));margin:0 auto}.top{padding:18px 0;background:var(--ink);color:#fff}.top .shell{display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-size:13px;font-weight:800;letter-spacing:.12em}.preview{color:#f0d492;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}main{padding:56px 0 76px}.eyebrow{margin:0 0 12px;color:var(--gold);font-size:11px;font-weight:850;letter-spacing:.16em;text-transform:uppercase}h1,h2,h3,p{margin-top:0}h1{max-width:800px;margin-bottom:18px;font:600 clamp(48px,7vw,94px)/.92 Georgia,"Times New Roman",serif;letter-spacing:-.055em}h2{font:600 clamp(27px,3vw,42px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.03em}h3{font:600 18px/1.2 Georgia,"Times New Roman",serif}.intro{max-width:690px;margin-bottom:0;color:#4f5b61;font:400 clamp(21px,2.2vw,29px)/1.3 Georgia,"Times New Roman",serif}.meta{margin-top:25px;color:var(--muted);font-size:12px}.hero{display:grid;grid-template-columns:1.25fr .75fr;gap:50px;align-items:end;padding-bottom:52px;border-bottom:1px solid var(--line)}.hero-note{padding:24px;border-left:3px solid var(--gold);background:#e8e1d1}.hero-note p{margin-bottom:0;color:#3f4e55;font-size:15px}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin:34px 0;background:var(--line);border:1px solid var(--line)}.metric{min-height:145px;padding:20px;background:var(--surface)}.metric span{display:block;margin-bottom:10px;color:var(--muted);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.metric strong{display:block;font:600 clamp(32px,3vw,47px)/1 Georgia,serif}.metric p{margin:8px 0 0;color:var(--muted);font-size:12px}.section{margin-top:54px}.section-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:20px}.section-head p{max-width:420px;margin:0;color:var(--muted);font-size:13px}.deadline-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.deadline-card{min-height:265px;padding:19px;background:var(--surface)}.deadline-card .date{margin-bottom:0;color:var(--gold);font-size:12px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.deadline-card .days{margin:4px 0 26px;color:var(--muted);font-size:12px}.deadline-card h3{font-size:20px}.deadline-card h3 a,.table-wrap a{color:var(--ink);text-decoration-thickness:1px;text-underline-offset:3px}.deadline-card>p:last-child{margin-bottom:0;color:var(--muted);font-size:12px}.insight-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.panel{padding:27px;background:var(--surface);border:1px solid var(--line)}.panel h2{margin-bottom:14px;font-size:31px}.panel>p{color:var(--muted);font-size:14px}.bar-list{display:grid;gap:14px;margin-top:24px}.bar{display:grid;grid-template-columns:156px minmax(70px,1fr) 26px;gap:12px;align-items:center}.bar span{color:#536168;font-size:13px}.track{height:9px;background:#e7e1d4}.fill{height:100%;background:var(--ink)}.bar b{font-size:13px;text-align:right}.method{background:var(--ink);color:#fff}.method h2{color:#f5d897}.method p{color:#d3e0e4}.method ul{margin:21px 0 0;padding-left:18px;color:#e6eceb}.method li{margin:9px 0;font-size:14px}.table-wrap{overflow:auto;border:1px solid var(--line);background:var(--surface)}table{width:100%;min-width:800px;border-collapse:collapse}th{padding:13px 16px;background:#f8f4eb;color:var(--muted);font-size:10px;letter-spacing:.12em;text-align:left;text-transform:uppercase}td{padding:17px 16px;vertical-align:top;border-top:1px solid var(--line)}td strong{font:600 17px/1.2 Georgia,serif;white-space:nowrap}td a{display:block;max-width:620px;font-weight:700;line-height:1.3}td span{display:block;margin-top:5px;color:var(--muted);font-size:12px}.footer{margin-top:42px;color:var(--muted);font-size:12px}@media(max-width:980px){.hero,.insight-grid{grid-template-columns:1fr}.metric-grid{grid-template-columns:repeat(2,1fr)}.deadline-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.shell{width:min(100% - 30px,1320px)}.top .shell{align-items:flex-start;flex-direction:column}.hero{gap:28px}main{padding-top:36px}.metric-grid,.deadline-grid{grid-template-columns:1fr}.section-head{align-items:flex-start;flex-direction:column;gap:8px}.bar{grid-template-columns:106px minmax(50px,1fr) 24px}}
    </style>
  </head>
  <body>
    <header class="top"><div class="shell"><span class="brand">ST GEORGES STRATEGY</span><span class="preview">Private product preview · not published</span></div></header>
    <main class="shell">
      <section class="hero"><div><p class="eyebrow">Regulatory Horizon</p><h1>What is moving — and what is next.</h1><p class="intro">A clear, source-linked view of the deadlines and regulatory developments that deserve attention before they become a late surprise.</p><p class="meta">Updated ${escapeHtml(formatDate(asOf))} · 90-day evidence window · official sources only</p></div><aside class="hero-note"><p class="eyebrow">This week’s picture</p><p>${escapeHtml(String(dueIn30.length))} confirmed dates fall within the next 30 days, across ${escapeHtml(String(authorities.size))} authorities. The purpose is not to predict every change; it is to make the next relevant decision window visible.</p></aside></section>
      <section class="metric-grid" aria-label="Regulatory Horizon overview"><article class="metric"><span>Confirmed dates</span><strong>${escapeHtml(String(confirmed.length))}</strong><p>Future dates retained with primary-source evidence.</p></article><article class="metric"><span>Next 30 days</span><strong>${escapeHtml(String(dueIn30.length))}</strong><p>Dates that should already have an owner or a monitoring decision.</p></article><article class="metric"><span>Authorities represented</span><strong>${escapeHtml(String(authorities.size))}</strong><p>Official bodies behind the confirmed current horizon.</p></article><article class="metric"><span>Source coverage</span><strong>${escapeHtml(String(healthy))}/${escapeHtml(String(sourceCount))}</strong><p>Official sources returning usable material in the latest scan.</p></article></section>
      <section class="section"><div class="section-head"><div><p class="eyebrow">Calendar ahead</p><h2>The next decision windows</h2></div><p>Each card leads to the primary record. It does not imply that the item applies to every organisation.</p></div><div class="deadline-grid">${deadlineCards || '<article class="deadline-card"><h3>No confirmed future dates are currently available.</h3></article>'}</div></section>
      <section class="section"><div class="section-head"><div><p class="eyebrow">Full horizon</p><h2>Confirmed upcoming dates</h2></div><p>Use this as a clear starting point for discussion, ownership and evidence—not as a substitute for legal or regulatory advice.</p></div><div class="table-wrap"><table><thead><tr><th>Due</th><th>Official item</th><th>Authority</th><th>Stage</th></tr></thead><tbody>${tableRows || '<tr><td colspan="4">No confirmed future dates are currently available.</td></tr>'}</tbody></table></div></section>
      <p class="footer">Every date links directly to its official source. This private preview has not been released to the public site.</p>
    </main>
  </body>
</html>`;
}

function run() {
  const register = readJson(path.join(REGISTER_DIR, "register.json"), { items: [] });
  const health = readJson(path.join(REGISTER_DIR, "health.json"), { sourceHealth: [] });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), `${renderPreview({ register, health })}\n`);
  console.log(`Regulatory Horizon product preview rendered: ${path.relative(ROOT, path.join(OUTPUT_DIR, "index.html"))}`);
}

if (import.meta.url === `file://${process.argv[1]}`) run();

export { renderPreview };
