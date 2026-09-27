import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTER_DIR = path.join(ROOT, "dashboard", "regulatory-deadline-register");
const OUTPUT_DIR = path.join(ROOT, "dashboard", "regulatory-horizon-preview");
const ARCHIVE_DIR = path.join(OUTPUT_DIR, "archive");

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

function formatMonth(value) {
  if (!/^\d{4}-\d{2}$/.test(String(value || ""))) return "—";
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${value}-01T00:00:00Z`));
}

function titleCase(value) {
  return String(value || "Other").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function readerTitle(item) {
  const title = String(item?.title || "Official item");
  if (item?.authority?.id === "hkma" && /Systemically Important Banks/.test(title)) {
    return "Consultation on revised SPM CA-B-2: Systemically Important Banks";
  }
  return title;
}

function readerThemes(item) {
  if (item?.themes?.length) return item.themes.map(titleCase);
  if (item?.authority?.id === "hkma" && /Systemically Important Banks/.test(item?.title || "")) return ["Balance Sheet"];
  if (item?.authority?.id === "hkma" && /Hong Kong Taxonomy/.test(item?.title || "")) return ["Market Plumbing"];
  if (item?.authority?.id === "uk-boe-pra" && /friendly society/i.test(item?.title || "")) return ["Balance Sheet"];
  return [titleCase(item?.stage)];
}

function renderPreview({ register, changes, editorial }) {
  const asOf = register.asOf || "";
  const asOfTime = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? new Date(`${asOf}T00:00:00Z`).valueOf() : Date.now();
  const confirmed = (register.items || [])
    .filter((item) => item.status === "confirmed" && item.deadline > asOf)
    .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  const dueIn30 = confirmed.filter((item) => (new Date(`${item.deadline}T00:00:00Z`).valueOf() - asOfTime) / 86400000 <= 30);
  const authorities = new Set(confirmed.map((item) => item.authority?.name).filter(Boolean));
  const dueIn30Authorities = new Set(dueIn30.map((item) => item.authority?.name).filter(Boolean));
  const weeklyWatch = editorial?.sourceEdition === asOf ? editorial.weeklyWatch : null;
  const weeklyWatchText = `${dueIn30.length} confirmed date${dueIn30.length === 1 ? "" : "s"} fall within the next 30 days, across ${dueIn30Authorities.size} authorit${dueIn30Authorities.size === 1 ? "y" : "ies"}.`;
  const additions = changes?.additions || [];
  const revisedDates = changes?.revisedDates || [];
  const reconfirmed = changes?.reconfirmed || [];
  const carriedForward = changes?.notReconfirmed || [];
  const firstEdition = editorial?.firstEdition === true;
  const changeSummary = additions.length || revisedDates.length
    ? `${additions.length ? `${additions.length} new confirmed date${additions.length === 1 ? "" : "s"}` : "No new confirmed dates"}${additions.length && revisedDates.length ? " · " : ""}${revisedDates.length ? `${revisedDates.length} revised date${revisedDates.length === 1 ? "" : "s"}` : ""}`
    : carriedForward.length
      ? `No confirmed dates were added or revised. ${carriedForward.length} carry-forward record${carriedForward.length === 1 ? " was" : "s were"} not re-seen in this scan and remain temporarily retained for review.`
      : `No confirmed dates were added or revised. ${reconfirmed.length} source record${reconfirmed.length === 1 ? " was" : "s were"} rechecked.`;
  const deadlineCards = confirmed.slice(0, 5).map((item) => {
    return `<article class="deadline-card"><p class="date">${escapeHtml(formatDate(item.deadline))}</p><p class="days" data-deadline="${escapeHtml(item.deadline)}">—</p><h3><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(readerTitle(item))}</a></h3><p>${escapeHtml(item.authority?.name || "Official source")} · ${escapeHtml(titleCase(item.stage))}</p></article>`;
  }).join("");
  const tableRows = confirmed.map((item) => `<tr><td><strong>${escapeHtml(formatDate(item.deadline))}</strong></td><td><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(readerTitle(item))}</a><span>${escapeHtml(readerThemes(item).join(" · "))}</span></td><td>${escapeHtml(item.authority?.name || "Official source")}</td><td>${escapeHtml(titleCase(item.stage))}</td></tr>`).join("");
  const timelineMonths = new Map();
  for (const item of confirmed) {
    const month = String(item.deadline).slice(0, 7);
    timelineMonths.set(month, [...(timelineMonths.get(month) || []), item]);
  }
  const timeline = [...timelineMonths.entries()].map(([month, records]) => `<article class="timeline-month"><p>${escapeHtml(formatMonth(month))}</p><div>${records.map((item) => `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><strong>${escapeHtml(formatDate(item.deadline))}</strong><span>${escapeHtml(item.authority?.name || "Official source")}</span><em>${escapeHtml(readerTitle(item))}</em></a>`).join("")}</div></article>`).join("");
  const dashboardRecords = confirmed.map((item) => ({ deadline: item.deadline, title: readerTitle(item), url: item.url, authority: item.authority?.name || "Official source", stage: titleCase(item.stage), themes: readerThemes(item) }));
  const nextHeading = confirmed.length > 5 ? "The next five decision windows" : "The next decision windows";
  const nextDescription = confirmed.length > 5
    ? `The five nearest dates are shown here; the full horizon below includes all ${confirmed.length} confirmed upcoming dates.`
    : "Each card leads to the primary record. It does not imply that the item applies to every organisation.";
  const changeStrip = firstEdition ? "" : `
      <section class="change-strip" aria-label="Changes since last review"><p class="eyebrow">Change since last review</p><p>${escapeHtml(changeSummary)}</p></section>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Regulatory Horizon | Private product preview</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      :root{--ink:#0d2637;--paper:#f1ede3;--surface:#fffdf8;--line:#d8d0c0;--muted:#657078;--gold:#a77b28;--green:#1f7157;--red:#99433d}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.shell{width:min(1320px,calc(100% - 48px));margin:0 auto}.top{padding:18px 0;background:var(--ink);color:#fff}.top .shell{display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-size:13px;font-weight:800;letter-spacing:.12em}.nav{display:flex;gap:22px}.nav a{color:#ccd7dc;font-size:10px;font-weight:800;letter-spacing:.11em;text-decoration:none;text-transform:uppercase}.preview{color:#f0d492;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}main{padding:56px 0 76px}.eyebrow{margin:0 0 12px;color:var(--gold);font-size:11px;font-weight:850;letter-spacing:.16em;text-transform:uppercase}h1,h2,h3,p{margin-top:0}h1{max-width:800px;margin-bottom:18px;font:600 clamp(48px,7vw,94px)/.92 Georgia,"Times New Roman",serif;letter-spacing:-.055em}h2{font:600 clamp(27px,3vw,42px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.03em}h3{font:600 18px/1.2 Georgia,"Times New Roman",serif}.intro{max-width:690px;margin-bottom:0;color:#4f5b61;font:400 clamp(21px,2.2vw,29px)/1.3 Georgia,"Times New Roman",serif}.meta{margin-top:25px;color:var(--muted);font-size:12px}.hero{display:grid;grid-template-columns:1.25fr .75fr;gap:50px;align-items:end;padding-bottom:52px;border-bottom:1px solid var(--line)}.hero-note{padding:24px;border-left:3px solid var(--gold);background:#e8e1d1}.hero-note p{margin-bottom:0;color:#3f4e55;font-size:15px}.metric-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin:34px 0;background:var(--line);border:1px solid var(--line)}.metric{min-height:145px;padding:20px;background:var(--surface)}.metric span{display:block;margin-bottom:10px;color:var(--muted);font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.metric strong{display:block;font:600 clamp(32px,3vw,47px)/1 Georgia,serif}.metric p{margin:8px 0 0;color:var(--muted);font-size:12px}.change-strip{display:grid;grid-template-columns:190px 1fr;gap:24px;align-items:start;margin:34px 0 0;padding:20px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.change-strip p{margin:0;color:#4f5b61;font-size:14px}.change-strip .eyebrow{margin:2px 0 0}.section{margin-top:54px}.section-head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:20px}.section-head p{max-width:420px;margin:0;color:var(--muted);font-size:13px}.deadline-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.deadline-card{min-height:265px;padding:19px;background:var(--surface)}.deadline-card .date{margin-bottom:0;color:var(--gold);font-size:12px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.deadline-card .days{margin:4px 0 26px;color:var(--muted);font-size:12px}.deadline-card h3{font-size:20px}.deadline-card h3 a,.table-wrap a,.timeline-month a{color:var(--ink);text-decoration-thickness:1px;text-underline-offset:3px}.deadline-card>p:last-child{margin-bottom:0;color:var(--muted);font-size:12px}.timeline{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}.timeline-month{min-height:220px;padding:18px;background:var(--surface)}.timeline-month>p{margin-bottom:19px;color:var(--gold);font-size:11px;font-weight:850;letter-spacing:.1em;text-transform:uppercase}.timeline-month>div{display:grid;gap:14px}.timeline-month a{display:grid;gap:2px;text-decoration:none}.timeline-month strong{font-size:12px}.timeline-month span{color:var(--muted);font-size:11px}.timeline-month em{font:600 15px/1.25 Georgia,serif;font-style:normal}.filters{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:8px;margin-bottom:14px}.filters select{width:100%;min-height:42px;padding:8px 10px;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:0;font:13px ui-sans-serif,system-ui,sans-serif}.filter-note{margin:0 0 14px;color:var(--muted);font-size:12px}.table-wrap{overflow:auto;border:1px solid var(--line);background:var(--surface)}table{width:100%;min-width:800px;border-collapse:collapse}th{padding:13px 16px;background:#f8f4eb;color:var(--muted);font-size:10px;letter-spacing:.12em;text-align:left;text-transform:uppercase}td{padding:17px 16px;vertical-align:top;border-top:1px solid var(--line)}td strong{font:600 17px/1.2 Georgia,serif;white-space:nowrap}td a{display:block;max-width:620px;font-weight:700;line-height:1.3}td span{display:block;margin-top:5px;color:var(--muted);font-size:12px}.footer{margin-top:42px;color:var(--muted);font-size:12px}@media(max-width:980px){.hero{grid-template-columns:1fr}.metric-grid{grid-template-columns:repeat(2,1fr)}.deadline-grid,.timeline{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.shell{width:min(100% - 30px,1320px)}.top .shell{align-items:flex-start;flex-direction:column}.nav{gap:14px}.hero{gap:28px}main{padding-top:36px}.metric-grid,.deadline-grid,.timeline,.filters,.change-strip{grid-template-columns:1fr}.section-head{align-items:flex-start;flex-direction:column;gap:8px}}
      :root{--ink:#15140f;--paper:#e7e1d3;--surface:#f4efe3;--line:rgba(15,34,51,.16);--muted:#6b6555;--gold:#6f531f;--navy:#0f2233;--cream:#f4efe3;--serif:"Playfair Display",Georgia,serif;--sans:"Hanken Grotesk",sans-serif;--mono:"JetBrains Mono",monospace}body{font:17px/1.55 var(--sans)}.top{background:var(--navy)}.brand,.nav a,.preview,.eyebrow,.metric span,.deadline-card .date,.timeline-month>p,th,.meta{font-family:var(--mono);letter-spacing:.14em;text-transform:uppercase}.hero{margin:0 calc((1320px - 100vw)/2);padding:64px max(calc((100vw - 1320px)/2),24px);background:var(--navy);border-top:3px double rgba(244,239,227,.45);border-bottom:3px double rgba(244,239,227,.45)}.hero h1{font-family:var(--serif);letter-spacing:0;color:var(--cream)}.hero .intro,.hero .meta{color:#d3dce3}.hero .eyebrow{color:#c49a4a}.hero-note{background:rgba(244,239,227,.1);border-left-color:#c49a4a}.hero-note p{color:var(--cream)}.metric,.deadline-card,.timeline-month,.table-wrap{background:var(--surface);box-shadow:none}.metric strong,h2,h3,td strong,.timeline-month em{font-family:var(--serif);letter-spacing:0}.eyebrow,.deadline-card .date,.timeline-month>p{color:var(--gold)}.section{border-top:3px double var(--line);padding-top:28px}.deadline-card{border-top:3px solid var(--navy)}.filters select{font-family:var(--sans);background:var(--surface)}
    </style>
  </head>
  <body>
    <header class="top"><div class="shell"><span class="brand">ST GEORGES STRATEGY</span><nav class="nav" aria-label="Dashboard sections"><a href="#next">Next up</a><a href="#timeline">Timeline</a><a href="#horizon">Full horizon</a></nav><span class="preview">Private product preview · not published</span></div></header>
    <main class="shell">
      <section class="hero"><div><p class="eyebrow">Regulatory Horizon</p><h1>What is moving — and what is next.</h1><p class="intro">A clear, source-linked view of the deadlines and regulatory developments that deserve attention before they become a late surprise.</p><p class="meta">Updated ${escapeHtml(formatDate(asOf))} · 90-day source review · confirmed dates only, not a complete regulatory calendar</p></div><aside class="hero-note"><p class="eyebrow">${escapeHtml(weeklyWatch?.label || "This week’s picture")}</p><p>${escapeHtml(weeklyWatchText)}</p></aside></section>
      <section class="metric-grid" aria-label="Regulatory Horizon overview"><article class="metric"><span>Confirmed dates</span><strong>${escapeHtml(String(confirmed.length))}</strong><p>Future dates retained with primary-source evidence.</p></article><article class="metric"><span>Next 30 days</span><strong>${escapeHtml(String(dueIn30.length))}</strong><p>Dates that should already have an owner or a monitoring decision.</p></article><article class="metric"><span>Authorities represented</span><strong>${escapeHtml(String(authorities.size))}</strong><p>Official bodies behind the confirmed current horizon.</p></article></section>
${changeStrip}
      <section class="section" id="next"><div class="section-head"><div><p class="eyebrow">Calendar ahead</p><h2>${escapeHtml(nextHeading)}</h2></div><p>${escapeHtml(nextDescription)}</p></div><div class="deadline-grid">${deadlineCards || '<article class="deadline-card"><h3>No confirmed future dates are currently available.</h3></article>'}</div></section>
      <section class="section" id="timeline"><div class="section-head"><div><p class="eyebrow">Horizon timeline</p><h2>When the current agenda lands</h2></div><p>A time view of all confirmed dates, so near-term decisions do not obscure what is coming next.</p></div><div class="timeline">${timeline || '<article class="timeline-month"><p>No future dates</p></article>'}</div></section>
      <section class="section" id="horizon"><div class="section-head"><div><p class="eyebrow">Full horizon</p><h2>Confirmed upcoming dates</h2></div><p>Use this as a clear starting point for discussion, ownership and evidence—not as a substitute for legal or regulatory advice.</p></div><div class="filters" aria-label="Horizon filters"><select id="window-filter"><option value="all">All time windows</option><option value="30">Next 30 days</option><option value="90">Next 90 days</option><option value="beyond">Beyond 90 days</option></select><select id="authority-filter"><option value="all">All authorities</option></select><select id="stage-filter"><option value="all">All stages</option></select></div><p class="filter-note" id="filter-note"></p><div class="table-wrap"><table><thead><tr><th>Due</th><th>Official item</th><th>Authority</th><th>Stage</th></tr></thead><tbody id="full-horizon-rows">${tableRows || '<tr><td colspan="4">No confirmed future dates are currently available.</td></tr>'}</tbody></table></div></section>
      <p class="footer">Every date links directly to its official source. This private preview has not been released to the public site.</p>
    </main>
    <script id="horizon-preview-data" type="application/json">${JSON.stringify({ asOf, records: dashboardRecords }).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")}</script>
    <script>
      (() => {
        const data = JSON.parse(document.getElementById("horizon-preview-data").textContent);
        const asOf = new Date(data.asOf + "T00:00:00Z");
        const todayUtc = () => { const now=new Date(); return Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()); };
        const countdown = (deadline) => { const days=Math.round((new Date(deadline+"T00:00:00Z").valueOf()-todayUtc())/86400000); return days===0?"today":days===1?"1 day":days>1?days+" days":Math.abs(days)===1?"1 day ago":Math.abs(days)+" days ago"; };
        const qs = (id) => document.getElementById(id);
        const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => { if (char === "&") return "&amp;"; if (char === "<") return "&lt;"; if (char === ">") return "&gt;"; if (char === "'") return "&#039;"; return "&quot;"; });
        const date = (value) => new Intl.DateTimeFormat("en-GB", { day:"numeric", month:"short", year:"numeric", timeZone:"UTC" }).format(new Date(value + "T00:00:00Z"));
        const authority = qs("authority-filter"), stage = qs("stage-filter"), windowFilter = qs("window-filter");
        [...new Set(data.records.map((row) => row.authority))].sort().forEach((value) => authority.insertAdjacentHTML("beforeend", '<option value="'+esc(value)+'">'+esc(value)+'</option>'));
        [...new Set(data.records.map((row) => row.stage))].sort().forEach((value) => stage.insertAdjacentHTML("beforeend", '<option value="'+esc(value)+'">'+esc(value)+'</option>'));
        function renderRows() { const filtered = data.records.filter((row) => { const days = Math.round((new Date(row.deadline + "T00:00:00Z") - asOf) / 86400000); const windowMatch = windowFilter.value === "all" || (windowFilter.value === "30" && days <= 30) || (windowFilter.value === "90" && days <= 90) || (windowFilter.value === "beyond" && days > 90); return windowMatch && (authority.value === "all" || row.authority === authority.value) && (stage.value === "all" || row.stage === stage.value); }); qs("filter-note").textContent = filtered.length + " confirmed date" + (filtered.length === 1 ? "" : "s") + " shown"; qs("full-horizon-rows").innerHTML = filtered.length ? filtered.map((row) => '<tr><td><strong>'+esc(date(row.deadline))+'</strong></td><td><a href="'+esc(row.url)+'" target="_blank" rel="noreferrer">'+esc(row.title)+'</a><span>'+esc(row.themes.join(" · ") || row.stage)+'</span></td><td>'+esc(row.authority)+'</td><td>'+esc(row.stage)+'</td></tr>').join("") : '<tr><td colspan="4">No confirmed dates match these filters.</td></tr>'; }
        document.querySelectorAll("[data-deadline]").forEach((node) => { node.textContent=countdown(node.dataset.deadline); });
        [windowFilter, authority, stage].forEach((control) => control.addEventListener("change", renderRows)); renderRows();
      })();
    </script>
  </body>
</html>`;
}

function archivePreview(html, edition, { force = false } = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(edition || "")) return null;
  const archiveFile = path.join(ARCHIVE_DIR, edition, "index.html");
  if (fs.existsSync(archiveFile) && !force) return archiveFile;
  fs.mkdirSync(path.dirname(archiveFile), { recursive: true });
  fs.writeFileSync(archiveFile, `${html}\n`);
  return archiveFile;
}

function run() {
  const register = readJson(path.join(REGISTER_DIR, "register.json"), { items: [] });
  const changes = readJson(path.join(REGISTER_DIR, "changes.json"), {});
  const editorial = readJson(path.join(OUTPUT_DIR, "editorial.json"), {});
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const html = renderPreview({ register, changes, editorial });
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), `${html}\n`);
  const archiveFile = archivePreview(html, register.sourceEdition || register.asOf, { force: process.argv.includes("--force-archive") });
  console.log(`Regulatory Horizon product preview rendered: ${path.relative(ROOT, path.join(OUTPUT_DIR, "index.html"))}`);
  if (archiveFile) console.log(`Regulatory Horizon private preview archived: ${path.relative(ROOT, archiveFile)}`);
}

if (import.meta.url === `file://${process.argv[1]}`) run();

export { archivePreview, renderPreview };
