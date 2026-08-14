import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_DIR = path.join(ROOT, "dashboard", "regulatory-deadline-register");

function readJson(file, fallback = null) {
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

function healthSummary(health) {
  const counts = new Map();
  for (const source of health?.sourceHealth || []) {
    const status = source.status || "unknown";
    counts.set(status, (counts.get(status) || 0) + 1);
  }
  return Object.fromEntries(counts);
}

function renderDashboard({ register, review, health, qa }) {
  const items = [...(register?.items || [])].sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  const confirmed = items.filter((item) => item.status === "confirmed");
  const reviewItems = items.filter((item) => ["review", "ready-for-review"].includes(item.status));
  const healthCounts = healthSummary(health);
  const readiness = qa?.readiness || {};
  const metrics = readiness.metrics || {};
  const sourceEdition = register?.sourceEdition || qa?.sourceEdition || "unknown";
  const asOf = register?.asOf || qa?.asOf || "";
  // QA's wall-clock generation timestamp would make the dashboard differ on
  // every local validation run without changing any reader-facing judgement.
  const dashboardQa = { ...(qa || {}) };
  delete dashboardQa.generatedAt;
  const data = {
    register: { ...register, items }, review: review?.items || [], health: health?.sourceHealth || [], qa: dashboardQa,
  };
  const readinessScore = Number(readiness.score || 0);
  const sourceAge = Number(metrics.sourceAgeDays);
  const readinessTone = readiness.relaunchEligible ? "good" : readinessScore >= 70 ? "watch" : "hold";
  const statusText = readiness.relaunchEligible ? "Relaunch criteria met" : "Private shadow mode";
  const coverageText = `${metrics.confirmedAuthorities || 0} of 4 confirmed authorities`;
  const healthText = `${healthCounts.ok || 0} healthy sources`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Regulatory Deadlines | Private dashboard</title>
    <style>
      :root { --ink:#102b3a; --paper:#f4f0e8; --surface:#fffdf8; --line:#dcd5c7; --muted:#6b6d6a; --gold:#a77b28; --green:#246653; --amber:#9b6a16; --red:#aa4c43; --blue:#2d647e; }
      * { box-sizing:border-box; } html { scroll-behavior:smooth; } body { margin:0; color:var(--ink); background:var(--paper); font:15px/1.48 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      button,input,select { font:inherit; } button { cursor:pointer; } .shell { width:min(1400px,calc(100% - 44px)); margin:0 auto; } .top { background:var(--ink); color:white; padding:15px 0; } .top-inner { display:flex; align-items:center; justify-content:space-between; gap:24px; } .brand { font-size:14px; font-weight:800; letter-spacing:.07em; } .private { display:inline-flex; align-items:center; gap:8px; color:#ead89f; font-size:12px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; } .private:before { content:""; width:7px; height:7px; border-radius:50%; background:#d2a438; }
      main { padding:42px 0 70px; } .eyebrow { margin:0 0 8px; color:var(--gold); font-size:11px; font-weight:850; letter-spacing:.14em; text-transform:uppercase; } h1,h2,h3,p { margin-top:0; } h1 { margin-bottom:10px; font:600 clamp(38px,5vw,64px)/.98 Georgia,"Times New Roman",serif; letter-spacing:-.035em; } h2 { margin-bottom:0; font:600 28px/1.08 Georgia,"Times New Roman",serif; letter-spacing:-.02em; } h3 { font:600 18px/1.18 Georgia,"Times New Roman",serif; } .intro { max-width:820px; color:#4f5d63; font-size:18px; } .asof { color:var(--muted); font-size:13px; }
      .status-strip { display:grid; grid-template-columns:1.3fr repeat(3,1fr); gap:1px; margin:34px 0 40px; border:1px solid var(--line); background:var(--line); } .status-card { min-height:120px; padding:18px; background:var(--surface); } .status-card .label { display:block; margin-bottom:8px; color:var(--muted); font-size:11px; font-weight:750; letter-spacing:.1em; text-transform:uppercase; } .status-card strong { display:block; font:600 27px/1.05 Georgia,serif; } .status-card p { margin:6px 0 0; color:var(--muted); font-size:13px; } .status-card.primary { background:var(--ink); color:white; } .status-card.primary .label,.status-card.primary p { color:#d2e0dc; } .status-card.primary strong { color:#f3d888; } .tone-good strong{color:var(--green)}.tone-watch strong{color:var(--amber)}.tone-hold strong{color:var(--red)}
      .grid { display:grid; grid-template-columns:minmax(0,2.1fr) minmax(310px,.9fr); gap:26px; align-items:start; } .panel { background:var(--surface); border:1px solid var(--line); } .panel-pad { padding:24px; } .panel-head { display:flex; align-items:end; justify-content:space-between; gap:18px; margin-bottom:20px; } .panel-head p { max-width:410px; margin:0; color:var(--muted); font-size:13px; } .quiet { color:var(--muted); font-size:13px; }
      .outlook { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; } .outlook-card { min-height:108px; padding:15px; border:1px solid var(--line); background:#fbf9f4; } .outlook-card small { display:block; color:var(--muted); font-size:11px; font-weight:750; letter-spacing:.08em; text-transform:uppercase; } .outlook-card b { display:block; margin:9px 0 3px; font:600 29px/1 Georgia,serif; } .outlook-card span { color:var(--muted); font-size:12px; }
      .filters { display:grid; grid-template-columns:1.3fr repeat(3,.7fr) auto; gap:8px; margin-bottom:16px; } input,select { width:100%; min-height:39px; padding:8px 10px; color:var(--ink); background:white; border:1px solid var(--line); border-radius:2px; } .export { padding:0 13px; color:white; border:0; background:var(--ink); border-radius:2px; font-weight:700; }
      .table-wrap { overflow:auto; border-top:1px solid var(--line); } table { width:100%; min-width:870px; border-collapse:collapse; } th { padding:12px 10px; color:var(--muted); background:#faf7f1; font-size:10px; letter-spacing:.09em; text-align:left; text-transform:uppercase; } td { padding:15px 10px; vertical-align:top; border-top:1px solid var(--line); } td strong { display:block; max-width:450px; font-size:15px; line-height:1.25; } .due { white-space:nowrap; color:var(--ink); font-weight:800; } .sub { margin-top:4px; color:var(--muted); font-size:12px; } .pill { display:inline-block; padding:3px 7px; border-radius:999px; font-size:11px; font-weight:750; white-space:nowrap; } .pill-confirmed{color:#155a47;background:#d9efe7}.pill-ready-for-review{color:#745113;background:#f4e7bd}.pill-review{color:#7a4b14;background:#f7e0bd}.pill-superseded{color:#5e6060;background:#e8e8e4}.pill-rejected{color:#843c36;background:#f1d8d5}.empty { padding:26px 10px; color:var(--muted); text-align:center; }
      .side-stack { display:grid; gap:18px; } .review-list { display:grid; gap:0; } .review-item { padding:18px 0; border-top:1px solid var(--line); } .review-item:first-child { padding-top:0; border-top:0; } .review-item h3 { margin:4px 0 7px; font-size:18px; } .review-item p { margin-bottom:0; color:#536168; font-size:13px; } .review-item a,.source-link { color:var(--ink); text-decoration-thickness:1px; text-underline-offset:3px; } .action-label { color:var(--amber); font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
      .quality { padding:22px; background:#e8eeeb; border:1px solid #cad8d1; } .quality h2 { font-size:25px; } .quality ul { padding-left:18px; margin:16px 0 0; color:#40534c; } .quality li { margin:8px 0; } .gate { display:flex; gap:9px; align-items:flex-start; padding:12px 0; border-top:1px solid #cad8d1; } .gate:first-of-type { margin-top:16px; } .dot { width:8px;height:8px;margin-top:7px;border-radius:50%;background:var(--red);flex:none }.gate.met .dot{background:var(--green)} .gate span{font-size:13px;color:#40534c}
      .source-summary { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; } .source-stat { padding:13px; border:1px solid var(--line); } .source-stat b{display:block;font:600 24px/1 Georgia,serif}.source-stat span{color:var(--muted);font-size:12px}.footer-note { margin-top:26px; color:var(--muted); font-size:12px; }
      @media(max-width:980px) { .status-strip{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}.side-stack{grid-template-columns:repeat(2,1fr)} } @media(max-width:660px) { .shell{width:min(100% - 28px,1400px)} main{padding-top:30px}.top-inner{align-items:flex-start;flex-direction:column;gap:6px}.status-strip,.side-stack,.outlook{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.export{min-height:39px}.panel-pad{padding:18px}.panel-head{display:block}.panel-head p{margin-top:8px} }
    </style>
  </head>
  <body>
    <header class="top"><div class="shell top-inner"><span class="brand">ST GEORGES STRATEGY · REGULATORY DEADLINES</span><span class="private">Private operating dashboard</span></div></header>
    <main class="shell">
      <p class="eyebrow">Cumulative register / internal use</p>
      <h1>Every deadline. One accountable record.</h1>
      <p class="intro">A private, cumulative view of consultation closes, implementation milestones and application dates. It keeps the operating record separate from the public editorial Horizon.</p>
      <p class="asof">Register as of ${escapeHtml(formatDate(asOf))} · scanner edition ${escapeHtml(sourceEdition)} · this page is not published or indexed.</p>

      <section class="status-strip" aria-label="Deadline dashboard status">
        <article class="status-card primary"><span class="label">Operating mode</span><strong>${escapeHtml(statusText)}</strong><p>${readiness.relaunchEligible ? "Quality criteria are satisfied." : "The public Horizon remains withdrawn while evidence accumulates."}</p></article>
        <article class="status-card"><span class="label">Confirmed open dates</span><strong>${confirmed.length}</strong><p>${items.length} cumulative record${items.length === 1 ? "" : "s"} currently retained.</p></article>
        <article class="status-card tone-${readinessTone}"><span class="label">Readiness</span><strong>${readinessScore} / 100</strong><p>${coverageText} · ${sourceAge >= 0 ? `${sourceAge} day-old source edition` : "source age pending"}</p></article>
        <article class="status-card"><span class="label">Source health</span><strong>${escapeHtml(String(healthCounts.ok || 0))}</strong><p>${healthText}; ${(healthCounts.blocked || 0) + (healthCounts.failed || 0)} need attention.</p></article>
      </section>

      <div class="grid">
        <div class="main-stack">
          <section class="panel panel-pad">
            <div class="panel-head"><div><p class="eyebrow">Calendar outlook</p><h2>Where decisions are gathering</h2></div><p>Urgency is calculated from the register date, not from when an item happened to appear in a weekly edition.</p></div>
            <div class="outlook" id="outlook"></div>
          </section>

          <section class="panel panel-pad" style="margin-top:26px">
            <div class="panel-head"><div><p class="eyebrow">Deadline register</p><h2>Reviewable, cumulative, source-linked</h2></div><p>Use this as the operating record. A confidence score supports review; it is not a publishing decision.</p></div>
            <div class="filters" aria-label="Register filters"><input id="search" type="search" placeholder="Search title, authority or theme"><select id="status-filter"><option value="">All statuses</option></select><select id="stage-filter"><option value="">All stages</option></select><select id="authority-filter"><option value="">All authorities</option></select><button class="export" id="export" type="button">Export filtered CSV</button></div>
            <p class="quiet" id="filter-summary"></p>
            <div class="table-wrap"><table><thead><tr><th>Due</th><th>Deadline</th><th>Authority</th><th>Stage</th><th>Status</th><th>Owner route</th></tr></thead><tbody id="register-rows"></tbody></table></div>
          </section>
        </div>

        <aside class="side-stack">
          <section class="panel panel-pad"><div class="panel-head"><div><p class="eyebrow">Review queue</p><h2>Decisions waiting</h2></div></div><div class="review-list" id="review-list"></div></section>
          <section class="quality"><p class="eyebrow">Relaunch gate</p><h2>Evidence before visibility.</h2><p class="quiet">The public page is not a consequence of a score. It requires every gate to be met and recorded human sign-off.</p><div id="gates"></div></section>
          <section class="panel panel-pad"><div class="panel-head"><div><p class="eyebrow">Source health</p><h2>Intake status</h2></div></div><div class="source-summary" id="source-summary"></div><p class="footer-note">A quiet source is not assumed inactive; a failed or blocked source is made visible here rather than disappearing from the process.</p></section>
        </aside>
      </div>
      <p class="footer-note">Private dashboard generated from the deadline register, review queue, source health and quality gate. No data from this page is included in the public site build.</p>
    </main>
    <script id="deadline-dashboard-data" type="application/json">${JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")}</script>
    <script>
      (() => {
        const data = JSON.parse(document.getElementById("deadline-dashboard-data").textContent);
        const items = data.register.items || [];
        const asOf = new Date((data.register.asOf || new Date().toISOString().slice(0,10)) + "T00:00:00Z");
        const qs = (id) => document.getElementById(id);
        const esc = (v) => String(v ?? "").replace(/[&<>'"]/g, (c) => { if (c === "&") return "&amp;"; if (c === "<") return "&lt;"; if (c === ">") return "&gt;"; if (c === "'") return "&#039;"; return "&quot;"; });
        const date = (v) => /^\\d{4}-\\d{2}-\\d{2}$/.test(v || "") ? new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(v+"T00:00:00Z")) : "—";
        const days = (v) => Math.round((new Date(v+"T00:00:00Z") - asOf) / 86400000);
        const label = (status) => ({"ready-for-review":"Ready for review",review:"Needs review",confirmed:"Confirmed",superseded:"Superseded",rejected:"Rejected"}[status] || status || "Unknown");
        const unique = (values) => [...new Set(values.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b)));
        const populate = (id, values) => values.forEach((value) => { const option=document.createElement("option"); option.value=value; option.textContent=label(value); if(id === "authority-filter") option.textContent=value; if(id === "stage-filter") option.textContent=String(value).replace(/-/g," "); qs(id).append(option); });
        populate("status-filter", unique(items.map((item)=>item.status))); populate("stage-filter", unique(items.map((item)=>item.stage))); populate("authority-filter", unique(items.map((item)=>item.authority?.name)));
        function renderOutlook() { const bands=[[-Infinity,14,"Next 14 days"],[15,30,"15–30 days"],[31,60,"31–60 days"],[61,90,"61–90 days"]]; qs("outlook").innerHTML=bands.map(([min,max,title])=>{const rows=items.filter((item)=>{const n=days(item.deadline);return n>=min&&n<=max&&!["rejected","superseded"].includes(item.status)});return '<article class="outlook-card"><small>'+title+'</small><b>'+rows.length+'</b><span>'+ (rows.length===1?"deadline":"deadlines") +'</span></article>'}).join(""); }
        function filtered() { const search=qs("search").value.trim().toLowerCase(), status=qs("status-filter").value, stage=qs("stage-filter").value, authority=qs("authority-filter").value; return items.filter((item)=>{const hay=[item.title,item.authority?.name,(item.themes||[]).join(" "),item.stage].join(" ").toLowerCase(); return (!search||hay.includes(search))&&(!status||item.status===status)&&(!stage||item.stage===stage)&&(!authority||item.authority?.name===authority); }); }
        function renderRows() { const rows=filtered(); qs("filter-summary").textContent=rows.length + " record" + (rows.length===1?"":"s") + " shown"; qs("register-rows").innerHTML=rows.length ? rows.map((item)=>{const owner=(item.ownerGuidance?.owners||[]).join(" · ") || "Owner to assign";const prep=(item.ownerGuidance?.prepare||[])[0] || "Confirm owner and evidence";return '<tr><td class="due">'+esc(date(item.deadline))+'<div class="sub">'+esc(String(days(item.deadline)))+' days</div></td><td><strong><a class="source-link" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></strong><div class="sub">'+esc((item.themes||[]).join(" · ") || "Unclassified")+'</div></td><td>'+esc(item.authority?.name||item.authority?.id||"Unknown")+'<div class="sub">'+esc((item.jurisdictions||[]).join(" · "))+'</div></td><td>'+esc(String(item.stage||"other").replace(/-/g," "))+'</td><td><span class="pill pill-'+esc(item.status)+'">'+esc(label(item.status))+'</span><div class="sub">'+esc(item.confidence?.band||"unknown")+' confidence</div></td><td>'+esc(owner)+'<div class="sub">'+esc(prep)+'</div></td></tr>';}).join("") : '<tr><td class="empty" colspan="6">No deadlines match these filters.</td></tr>'; return rows; }
        function renderReview() { const rows=(data.review||[]).filter((item)=>!["confirmed","rejected","superseded"].includes(item.status)); qs("review-list").innerHTML=rows.length ? rows.map((item)=>'<article class="review-item"><span class="action-label">'+esc(label(item.status))+'</span><h3><a href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></h3><p>Due '+esc(date(item.deadline))+' · '+esc(item.authority?.name||"Official source")+'</p><p><strong>Next:</strong> verify the deadline evidence and record an approve / reject decision.</p></article>').join("") : '<p class="quiet">No items are waiting for editorial review.</p>'; }
        function renderGates() { const r=data.qa?.readiness||{},m=r.metrics||{}, reasons=r.relaunchReasons||[]; const gates=[[(m.stableCoreAuthorities||0)>=4,"Four core authorities healthy across three shadow runs"],[(m.confirmedOpenDeadlines||0)>=10,"Ten confirmed open deadlines"],[(m.confirmedAuthorities||0)>=4,"Four contributing authorities"],[r.relaunchEligible,"Named editor and product-owner approval"]]; qs("gates").innerHTML=gates.map(([met,text])=>'<div class="gate '+(met?"met":"")+'"><span class="dot"></span><span>'+esc(text)+(met?"":" · not yet met")+'</span></div>').join(""); if(reasons.length) qs("gates").insertAdjacentHTML("beforeend",'<p class="footer-note">'+esc(reasons.join(" · "))+'</p>'); }
        function renderHealth() { const counts={}; (data.health||[]).forEach((source)=>{const status=source.status||"unknown";counts[status]=(counts[status]||0)+1;}); qs("source-summary").innerHTML=Object.entries(counts).sort(([a],[b])=>a.localeCompare(b)).map(([status,count])=>'<article class="source-stat"><b>'+esc(count)+'</b><span>'+esc(status.replace(/-/g," "))+'</span></article>').join("") || '<p class="quiet">No source-health record available.</p>'; }
        function exportCsv() { const rows=renderRows(); const columns=["Deadline","Title","Authority","Stage","Status","Confidence","Themes","Owners","URL"]; const lines=[columns,...rows.map((item)=>[item.deadline,item.title,item.authority?.name,item.stage,item.status,item.confidence?.band,(item.themes||[]).join("; "),(item.ownerGuidance?.owners||[]).join("; "),item.url])].map((row)=>row.map((cell)=>'"'+String(cell??"").replaceAll('"','""')+'"').join(",")); const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([lines.join("\\n")],{type:"text/csv"}));a.download="regulatory-deadlines.csv";a.click();URL.revokeObjectURL(a.href); }
        ["search","status-filter","stage-filter","authority-filter"].forEach((id)=>qs(id).addEventListener(id==="search"?"input":"change",renderRows)); qs("export").addEventListener("click",exportCsv); renderOutlook(); renderRows(); renderReview(); renderGates(); renderHealth();
      })();
    </script>
  </body>
</html>`;
}

function run() {
  const outDir = path.resolve(process.argv[2] || DEFAULT_DIR);
  const register = readJson(path.join(outDir, "register.json"), { items: [] });
  const review = readJson(path.join(outDir, "review.json"), { items: [] });
  const health = readJson(path.join(outDir, "health.json"), { sourceHealth: [] });
  const qa = readJson(path.join(outDir, "qa.json"), {});
  const html = renderDashboard({ register, review, health, qa });
  fs.writeFileSync(path.join(outDir, "index.html"), `${html}\n`);
  console.log(`Private deadline dashboard rendered: ${path.relative(ROOT, path.join(outDir, "index.html"))}`);
}

if (import.meta.url === `file://${process.argv[1]}`) run();

export { renderDashboard };
