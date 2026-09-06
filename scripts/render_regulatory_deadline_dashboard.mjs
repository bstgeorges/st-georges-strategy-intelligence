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

function renderDashboard({ register, review, health, qa, qaHistory, changes, discovery, exceptions }) {
  const items = [...(register?.items || [])].sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
  const confirmed = items.filter((item) => item.status === "confirmed");
  const reviewItems = items.filter((item) => ["review", "ready-for-review"].includes(item.status));
  const healthCounts = healthSummary(health);
  const readiness = qa?.readiness || {};
  const metrics = readiness.metrics || {};
  const sourceEdition = register?.sourceEdition || qa?.sourceEdition || "unknown";
  const asOf = register?.asOf || qa?.asOf || "";
  const activeItems = items.filter((item) => !["rejected", "superseded", "not-applicable"].includes(item.status));
  const asOfTime = /^\d{4}-\d{2}-\d{2}$/.test(asOf) ? new Date(`${asOf}T00:00:00Z`).valueOf() : Date.now();
  const dueIn30Days = activeItems.filter((item) => {
    const dueAt = new Date(`${item.deadline}T00:00:00Z`).valueOf();
    const days = Math.round((dueAt - asOfTime) / 86400000);
    return days >= 0 && days <= 30;
  });
  // QA's wall-clock generation timestamp would make the dashboard differ on
  // every local validation run without changing any reader-facing judgement.
  const dashboardQa = { ...(qa || {}) };
  delete dashboardQa.generatedAt;
  const data = {
    register: { ...register, items },
    review: review?.items || [],
    health: health?.sourceHealth || [],
    coverage: health?.coverage || {},
    coreAuthorities: health?.coreAuthorities || [],
    qa: dashboardQa,
    qaHistory: qaHistory?.runs || [],
    changes: changes || {},
    discovery: discovery || {},
    exceptions: exceptions?.exceptions || [],
  };
  const readinessScore = Number(readiness.score || 0);
  const sourceAge = Number(metrics.sourceAgeDays);
  const readinessTone = readiness.relaunchEligible ? "good" : readinessScore >= 70 ? "watch" : "hold";
  const statusText = readiness.relaunchEligible ? "Relaunch criteria met" : "Private shadow mode";
  const coverageText = `${metrics.confirmedAuthorities || 0} confirmed authorities · threshold 4`;
  const healthText = `${healthCounts.ok || 0} healthy sources`;
  const attentionCount = Object.entries(healthCounts)
    .filter(([status]) => status !== "ok")
    .reduce((sum, [, count]) => sum + Number(count || 0), 0);

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
      .control-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin:0 0 26px; } .action-list { display:grid; gap:0; } .action-item { padding:13px 0; border-top:1px solid var(--line); } .action-item:first-child { padding-top:0; border-top:0; } .action-item strong { display:block; font-size:14px; line-height:1.3; } .action-item p { margin:5px 0 0; color:#536168; font-size:12px; } .action-meta { display:block; margin-bottom:5px; color:var(--amber); font-size:10px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
      .assurance-panel { margin:0 0 26px; } .assurance-grid { display:grid; grid-template-columns:1.25fr .75fr; gap:28px; } .assurance-grid h3 { margin-bottom:14px; font-size:19px; } .coverage-bars,.run-history { display:grid; gap:10px; } .bar-row { display:grid; grid-template-columns:132px minmax(80px,1fr) 38px; gap:10px; align-items:center; } .bar-row span { color:#536168; font-size:12px; } .bar-track { height:9px; overflow:hidden; background:#e7e1d5; } .bar-fill { display:block; height:100%; background:var(--ink); } .bar-fill.is-watch { background:var(--amber); } .bar-fill.is-risk { background:var(--red); } .bar-row b { color:var(--ink); font-size:12px; text-align:right; } .run-row { display:grid; grid-template-columns:76px 1fr 32px; gap:10px; align-items:center; } .run-row span { color:#536168; font-size:12px; } .run-track { height:9px; overflow:hidden; background:#e7e1d5; } .run-fill { display:block; height:100%; background:var(--green); } .run-row b { font-size:12px; text-align:right; }
      .outlook { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; } .outlook-card { min-height:108px; padding:15px; border:1px solid var(--line); background:#fbf9f4; } .outlook-card small { display:block; color:var(--muted); font-size:11px; font-weight:750; letter-spacing:.08em; text-transform:uppercase; } .outlook-card b { display:block; margin:9px 0 3px; font:600 29px/1 Georgia,serif; } .outlook-card span { color:var(--muted); font-size:12px; }
      .filters { display:grid; grid-template-columns:1.3fr repeat(5,.7fr) auto; gap:8px; margin-bottom:16px; } input,select { width:100%; min-height:39px; padding:8px 10px; color:var(--ink); background:white; border:1px solid var(--line); border-radius:2px; } .export { padding:0 13px; color:white; border:0; background:var(--ink); border-radius:2px; font-weight:700; }
      .table-wrap { overflow:auto; border-top:1px solid var(--line); } table { width:100%; min-width:870px; border-collapse:collapse; } th { padding:12px 10px; color:var(--muted); background:#faf7f1; font-size:10px; letter-spacing:.09em; text-align:left; text-transform:uppercase; } td { padding:15px 10px; vertical-align:top; border-top:1px solid var(--line); } td strong { display:block; max-width:450px; font-size:15px; line-height:1.25; } .due { white-space:nowrap; color:var(--ink); font-weight:800; } .sub { margin-top:4px; color:var(--muted); font-size:12px; } .pill { display:inline-block; padding:3px 7px; border-radius:999px; font-size:11px; font-weight:750; white-space:nowrap; } .pill-confirmed{color:#155a47;background:#d9efe7}.pill-ready-for-review{color:#745113;background:#f4e7bd}.pill-review{color:#7a4b14;background:#f7e0bd}.pill-superseded{color:#5e6060;background:#e8e8e4}.pill-rejected{color:#843c36;background:#f1d8d5}.pill-not-applicable{color:#604b72;background:#e8dff0}.empty { padding:26px 10px; color:var(--muted); text-align:center; }
      .side-stack { display:grid; gap:18px; } .review-list { display:grid; gap:0; } .review-item { padding:18px 0; border-top:1px solid var(--line); } .review-item:first-child { padding-top:0; border-top:0; } .review-item h3 { margin:4px 0 7px; font-size:18px; } .review-item p { margin-bottom:0; color:#536168; font-size:13px; } .review-item a,.source-link { color:var(--ink); text-decoration-thickness:1px; text-underline-offset:3px; } .action-label { color:var(--amber); font-size:11px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
      .quality { padding:22px; background:#e8eeeb; border:1px solid #cad8d1; } .quality h2 { font-size:25px; } .quality ul { padding-left:18px; margin:16px 0 0; color:#40534c; } .quality li { margin:8px 0; } .gate { display:flex; gap:9px; align-items:flex-start; padding:12px 0; border-top:1px solid #cad8d1; } .gate:first-of-type { margin-top:16px; } .dot { width:8px;height:8px;margin-top:7px;border-radius:50%;background:var(--red);flex:none }.gate.met .dot{background:var(--green)} .gate span{font-size:13px;color:#40534c}
      .source-summary { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; } .source-stat { padding:13px; border:1px solid var(--line); } .source-stat b{display:block;font:600 24px/1 Georgia,serif}.source-stat span{color:var(--muted);font-size:12px}.health-list { display:grid; gap:0; margin-top:16px; } .health-item { padding:12px 0; border-top:1px solid var(--line); } .health-item strong { display:block; font-size:13px; line-height:1.3; } .health-item p { margin:4px 0 0; color:#536168; font-size:12px; } .footer-note { margin-top:26px; color:var(--muted); font-size:12px; }
      .source-estate { margin:0 0 26px; } .estate-grid { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--line); background:var(--line); gap:1px; } .estate-stat { min-height:112px; padding:17px; background:#fbf9f4; } .estate-stat small { display:block; color:var(--muted); font-size:10px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; } .estate-stat b { display:block; margin:8px 0 3px; font:600 30px/1 Georgia,serif; } .estate-stat span { display:block; color:var(--muted); font-size:12px; } .estate-actions { margin:15px 0 0; color:#536168; font-size:13px; }
      .changes-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.change-stat{padding:14px;border:1px solid var(--line);background:#fbf9f4}.change-stat b{display:block;font:600 27px/1 Georgia,serif}.change-stat span{color:var(--muted);font-size:12px}.change-list{display:grid;gap:0;margin-top:16px}.change-item{padding:12px 0;border-top:1px solid var(--line);font-size:13px}.change-item strong{display:block}.change-item span{color:var(--muted)}.details{display:inline-block;margin-top:8px;padding:6px 8px;color:var(--ink);background:transparent;border:1px solid var(--line);border-radius:2px;font-size:12px;font-weight:700}.details:hover{background:#f3efe5}
      dialog{width:min(760px,calc(100% - 28px));max-height:min(820px,calc(100vh - 42px));padding:0;color:var(--ink);background:var(--surface);border:1px solid var(--line);box-shadow:0 24px 70px rgba(16,43,58,.28)}dialog::backdrop{background:rgba(16,43,58,.48)}.dialog-head{display:flex;align-items:start;justify-content:space-between;gap:18px;padding:24px;border-bottom:1px solid var(--line);background:#faf7f1}.dialog-head h2{font-size:28px}.dialog-close{min-width:36px;height:36px;color:var(--ink);background:transparent;border:1px solid var(--line);border-radius:50%;font-size:21px;line-height:1}.detail-body{padding:24px}.detail-body h3{margin:24px 0 9px;font-size:19px}.detail-body h3:first-child{margin-top:0}.evidence-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.evidence-card{padding:13px;border:1px solid var(--line);background:#fbf9f4}.evidence-card small{display:block;margin-bottom:4px;color:var(--muted);font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.evidence-card span{font-size:13px}.decision-box{padding:16px;background:#e8eeeb;border:1px solid #cad8d1}.decision-box p{margin-bottom:10px;color:#40534c;font-size:13px}.decision-template{width:100%;min-height:138px;padding:10px;color:var(--ink);background:white;border:1px solid #cad8d1;resize:vertical;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace}.copy-note{display:inline-block;margin-left:8px;color:var(--green);font-size:12px;font-weight:700}.source-detail{color:var(--ink);text-underline-offset:3px}
      @media(max-width:980px) { .status-strip{grid-template-columns:repeat(2,1fr)}.estate-grid{grid-template-columns:repeat(2,1fr)}.control-grid,.assurance-grid,.grid{grid-template-columns:1fr}.side-stack{grid-template-columns:repeat(2,1fr)}.changes-grid{grid-template-columns:repeat(2,1fr)}.filters{grid-template-columns:repeat(2,1fr)}.filters input{grid-column:span 2}.export{min-height:39px} } @media(max-width:660px) { .shell{width:min(100% - 28px,1400px)} main{padding-top:30px}.top-inner{align-items:flex-start;flex-direction:column;gap:6px}.status-strip,.estate-grid,.control-grid,.side-stack,.outlook,.changes-grid,.evidence-grid{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.filters input{grid-column:auto}.export{min-height:39px}.panel-pad,.detail-body,.dialog-head{padding:18px}.panel-head{display:block}.panel-head p{margin-top:8px}.bar-row{grid-template-columns:106px minmax(50px,1fr) 32px} }
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
        <article class="status-card"><span class="label">Confirmed future dates</span><strong>${metrics.confirmedOpenDeadlines || 0}</strong><p>${items.length} cumulative record${items.length === 1 ? "" : "s"} retained with full audit history.</p></article>
        <article class="status-card tone-${dueIn30Days.length ? "watch" : "good"}"><span class="label">Due in 30 days</span><strong>${dueIn30Days.length}</strong><p>Confirmed or review-ready dates requiring an owner and evidence.</p></article>
        <article class="status-card tone-${reviewItems.length ? "watch" : "good"}"><span class="label">Decisions waiting</span><strong>${reviewItems.length}</strong><p>Records awaiting confirmed, rejected or not-applicable treatment.</p></article>
        <article class="status-card tone-${readinessTone}"><span class="label">Readiness</span><strong>${readinessScore} / 100</strong><p>${coverageText} · ${sourceAge >= 0 ? `${sourceAge} day-old source edition` : "source age pending"}</p></article>
        <article class="status-card"><span class="label">Source health</span><strong>${escapeHtml(String(healthCounts.ok || 0))}</strong><p>${healthText}; ${attentionCount} need attention.</p></article>
      </section>

      <section class="panel panel-pad source-estate" aria-labelledby="source-estate-title">
        <div class="panel-head"><div><p class="eyebrow">Source estate</p><h2 id="source-estate-title">Breadth, without false coverage</h2></div><p>The catalogue is a discovery perimeter. Only active primary sources can create a private deadline candidate, and each still needs evidence review.</p></div>
        <div class="estate-grid" id="source-estate"></div>
        <p class="estate-actions" id="source-estate-actions"></p>
      </section>

      <section class="control-grid" aria-label="Immediate regulatory control work">
        <section class="panel panel-pad"><div class="panel-head"><div><p class="eyebrow">Deadline pressure</p><h2>What needs a move now</h2></div></div><div class="action-list" id="urgent-deadlines"></div></section>
        <section class="panel panel-pad"><div class="panel-head"><div><p class="eyebrow">Decision workbench</p><h2>Evidence waiting for a call</h2></div></div><div class="action-list" id="decision-workbench"></div></section>
        <section class="panel panel-pad"><div class="panel-head"><div><p class="eyebrow">Source resilience</p><h2>Exceptions with an owner</h2></div></div><div class="action-list" id="source-exceptions"></div></section>
      </section>

      <section class="panel panel-pad assurance-panel" aria-labelledby="assurance-title">
        <div class="panel-head"><div><p class="eyebrow">Coverage assurance</p><h2 id="assurance-title">Can we trust this week’s picture?</h2></div><p>Coverage is shown as evidence, not a claim of completeness. A quiet authority is not treated as an inactive one.</p></div>
        <div class="assurance-grid"><div><h3>Scanner coverage</h3><div class="coverage-bars" id="coverage-bars"></div></div><div><h3>Core-authority shadow runs</h3><div class="run-history" id="run-history"></div></div></div>
      </section>

      <div class="grid">
        <div class="main-stack">
          <section class="panel panel-pad">
            <div class="panel-head"><div><p class="eyebrow">Calendar outlook</p><h2>Where decisions are gathering</h2></div><p>Urgency is calculated from the register date, not from when an item happened to appear in a weekly edition.</p></div>
            <div class="outlook" id="outlook"></div>
          </section>

          <section class="panel panel-pad" style="margin-top:26px">
            <div class="panel-head"><div><p class="eyebrow">Run-to-run record</p><h2>What changed since the last scan</h2></div><p>New dates, changed dates, review decisions and unreconfirmed records are shown separately so a quiet week cannot look like a clean week.</p></div>
            <div id="changes-summary"></div><div class="change-list" id="changes-list"></div>
          </section>

          <section class="panel panel-pad" style="margin-top:26px">
            <div class="panel-head"><div><p class="eyebrow">Deadline register</p><h2>Reviewable, cumulative, source-linked</h2></div><p>Use this as the operating record. A confidence score supports review; it is not a publishing decision.</p></div>
            <div class="filters" aria-label="Register filters"><input id="search" type="search" placeholder="Search title, authority or theme"><select id="due-filter"><option value="">All due dates</option><option value="next-14">Next 14 days</option><option value="next-30">Next 30 days</option><option value="next-90">Next 90 days</option><option value="overdue">Overdue</option></select><select id="status-filter"><option value="">All statuses</option></select><select id="stage-filter"><option value="">All stages</option></select><select id="authority-filter"><option value="">All authorities</option></select><select id="jurisdiction-filter"><option value="">All jurisdictions</option></select><button class="export" id="export" type="button">Export filtered CSV</button></div>
            <p class="quiet" id="filter-summary"></p>
            <div class="table-wrap"><table><thead><tr><th>Due</th><th>Deadline</th><th>Authority</th><th>Stage</th><th>Status</th><th>Owner route</th><th>Review</th></tr></thead><tbody id="register-rows"></tbody></table></div>
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
    <dialog id="record-detail" aria-labelledby="detail-title"><div class="dialog-head"><div><p class="eyebrow">Deadline record</p><h2 id="detail-title">Evidence and decision trail</h2></div><button class="dialog-close" type="button" id="detail-close" aria-label="Close deadline record">×</button></div><div class="detail-body" id="detail-body"></div></dialog>
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
        const label = (status) => ({"ready-for-review":"Ready for review",review:"Needs review",confirmed:"Confirmed",superseded:"Superseded",rejected:"Rejected","not-applicable":"Not applicable"}[status] || status || "Unknown");
        const unique = (values) => [...new Set(values.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b)));
        const populate = (id, values) => values.forEach((value) => { const option=document.createElement("option"); option.value=value; option.textContent=label(value); if(id === "authority-filter") option.textContent=value; if(id === "stage-filter") option.textContent=String(value).replace(/-/g," "); qs(id).append(option); });
        populate("status-filter", unique(items.map((item)=>item.status))); populate("stage-filter", unique(items.map((item)=>item.stage))); populate("authority-filter", unique(items.map((item)=>item.authority?.name))); populate("jurisdiction-filter", unique(items.flatMap((item)=>item.jurisdictions||[])));
        function renderOutlook() { const bands=[[-Infinity,14,"Next 14 days"],[15,30,"15–30 days"],[31,60,"31–60 days"],[61,90,"61–90 days"]]; qs("outlook").innerHTML=bands.map(([min,max,title])=>{const rows=items.filter((item)=>{const n=days(item.deadline);return n>=min&&n<=max&&!["rejected","superseded"].includes(item.status)});return '<article class="outlook-card"><small>'+title+'</small><b>'+rows.length+'</b><span>'+ (rows.length===1?"deadline":"deadlines") +'</span></article>'}).join(""); }
        function active(row) { return !["rejected","superseded","not-applicable"].includes(row.status); }
        function sourceName(sourceId) { return (data.discovery?.sourceStatus||[]).find((source)=>source.id===sourceId)?.name || sourceId || "Official source"; }
        function renderImmediateActions() { const urgent=items.filter((item)=>active(item)&&days(item.deadline)>=0&&days(item.deadline)<=30).sort((a,b)=>String(a.deadline).localeCompare(String(b.deadline))).slice(0,4); qs("urgent-deadlines").innerHTML=urgent.length ? urgent.map((item)=>'<article class="action-item"><span class="action-meta">Due '+esc(date(item.deadline))+' · '+esc(String(days(item.deadline)))+' days</span><strong><a class="source-link" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></strong><p>'+esc(item.authority?.name||"Official source")+' · '+esc((item.ownerGuidance?.owners||[]).join(" · ")||"Owner to assign")+'</p></article>').join("") : '<p class="quiet">No active deadline falls in the next 30 days.</p>';
          const decisions=(data.review||[]).filter((item)=>active(item)).sort((a,b)=>String(a.deadline).localeCompare(String(b.deadline))).slice(0,4); qs("decision-workbench").innerHTML=decisions.length ? decisions.map((item)=>'<article class="action-item"><span class="action-meta">'+esc(label(item.status))+' · due '+esc(date(item.deadline))+'</span><strong><a class="source-link" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></strong><p>Confirm the source wording, then record a decision.</p></article>').join("") : '<p class="quiet">No evidence decisions are waiting.</p>';
          const exceptions=data.exceptions||[]; qs("source-exceptions").innerHTML=exceptions.length ? exceptions.map((item)=>'<article class="action-item"><span class="action-meta">'+esc(item.expectedStatus||"attention")+' · check '+esc(date(item.nextCheck))+'</span><strong>'+esc(sourceName(item.sourceId))+'</strong><p>'+esc(item.governance||item.issue||"Review the source transport and record the result.")+'</p></article>').join("") : '<p class="quiet">No governed source exceptions are currently open.</p>';
        }
        function renderAssurance() { const coverage=data.coverage||{}, configured=Number(coverage.configuredPrimaryAuthorities||0), rows=[
          ["Sources checked",coverage.successfullyFetchedAuthorities||0,configured,""],
          ["With candidates",coverage.authoritiesWithCandidates||0,configured,""],
          ["Material candidates",coverage.authoritiesWithMaterialCandidates||0,configured,"is-watch"],
          ["Blocked / degraded",Number(coverage.blockedAuthorities||0)+Number(coverage.degradedAuthorities||0)+Number(coverage.failedAuthorities||0),configured,"is-risk"]
        ]; qs("coverage-bars").innerHTML=rows.map(([name,value,total,tone])=>'<div class="bar-row"><span>'+esc(name)+'</span><div class="bar-track"><i class="bar-fill '+esc(tone)+'" style="width:'+esc(String(total?Math.round((value/total)*100):0))+'%"></i></div><b>'+esc(String(value))+'/'+esc(String(total))+'</b></div>').join("");
          const runs=(data.qaHistory||[]).slice(-4); qs("run-history").innerHTML=runs.length ? runs.map((run)=>{const healthy=(run.healthyCore||[]).length,total=(data.coreAuthorities||[]).length||7,percent=total?Math.round((healthy/total)*100):0;return '<div class="run-row"><span>'+esc(date(run.asOf))+'</span><div class="run-track"><i class="run-fill" style="width:'+esc(String(percent))+'%"></i></div><b>'+esc(String(healthy))+'/'+esc(String(total))+'</b></div>';}).join("") : '<p class="quiet">Shadow-run history will appear after the next governed scan.</p>';
        }
        function renderChanges() { const c=data.changes||{}; if(c.baseline){qs("changes-summary").innerHTML='<p class="quiet">This is the first tracked run. The next scan will distinguish new records, revised dates, review decisions and records that were not reconfirmed.</p>';qs("changes-list").innerHTML='';return;} const groups=[[["additions"],"New records"],[["revisedDates"],"Revised dates"],[["statusChanges"],"Review decisions"],[["notReconfirmed"],"Not reconfirmed"]];qs("changes-summary").innerHTML='<div class="changes-grid">'+groups.map(([key,title])=>'<article class="change-stat"><b>'+((c[key[0]]||[]).length)+'</b><span>'+esc(title)+'</span></article>').join('')+'</div>';const entries=[];(c.additions||[]).forEach((item)=>entries.push('<article class="change-item"><strong>Added · '+esc(item.title)+'</strong><span>'+esc(item.authority?.name||"Official source")+' · due '+esc(date(item.deadline))+'</span></article>'));(c.revisedDates||[]).forEach((item)=>entries.push('<article class="change-item"><strong>Date revised · '+esc(item.title)+'</strong><span>'+esc(item.authority?.name||"Official source")+' · '+esc(date(item.from))+' → '+esc(date(item.to))+'</span></article>'));(c.statusChanges||[]).forEach((item)=>entries.push('<article class="change-item"><strong>Review decision · '+esc(item.title)+'</strong><span>'+esc(label(item.from))+' → '+esc(label(item.to))+'</span></article>'));(c.notReconfirmed||[]).forEach((item)=>entries.push('<article class="change-item"><strong>Not reconfirmed · '+esc(item.title)+'</strong><span>Still retained from the previous run · due '+esc(date(item.deadline))+'</span></article>'));if(!entries.length) entries.push('<p class="quiet">No record-level changes in this scan. '+(c.reconfirmed||[]).length+' record'+((c.reconfirmed||[]).length===1?' was':'s were')+' reconfirmed.</p>');qs("changes-list").innerHTML=entries.join(''); }
        function filtered() { const search=qs("search").value.trim().toLowerCase(), due=qs("due-filter").value, status=qs("status-filter").value, stage=qs("stage-filter").value, authority=qs("authority-filter").value, jurisdiction=qs("jurisdiction-filter").value; return items.filter((item)=>{const hay=[item.title,item.authority?.name,(item.themes||[]).join(" "),item.stage].join(" ").toLowerCase(), remaining=days(item.deadline); const dueMatch=!due||(due==="overdue"&&remaining<0)||(due==="next-14"&&remaining>=0&&remaining<=14)||(due==="next-30"&&remaining>=0&&remaining<=30)||(due==="next-90"&&remaining>=0&&remaining<=90); return (!search||hay.includes(search))&&dueMatch&&(!status||item.status===status)&&(!stage||item.stage===stage)&&(!authority||item.authority?.name===authority)&&(!jurisdiction||(item.jurisdictions||[]).includes(jurisdiction)); }); }
        function renderRows() { const rows=filtered(); qs("filter-summary").textContent=rows.length + " record" + (rows.length===1?"":"s") + " shown"; qs("register-rows").innerHTML=rows.length ? rows.map((item)=>{const owner=(item.ownerGuidance?.owners||[]).join(" · ") || "Owner to assign";const prep=(item.ownerGuidance?.prepare||[])[0] || "Confirm owner and evidence";return '<tr><td class="due">'+esc(date(item.deadline))+'<div class="sub">'+esc(String(days(item.deadline)))+' days</div></td><td><strong><a class="source-link" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></strong><div class="sub">'+esc((item.themes||[]).join(" · ") || "Unclassified")+'</div></td><td>'+esc(item.authority?.name||item.authority?.id||"Unknown")+'<div class="sub">'+esc((item.jurisdictions||[]).join(" · "))+'</div></td><td>'+esc(String(item.stage||"other").replace(/-/g," "))+'</td><td><span class="pill pill-'+esc(item.status)+'">'+esc(label(item.status))+'</span><div class="sub">'+esc(item.confidence?.band||"unknown")+' confidence</div></td><td>'+esc(owner)+'<div class="sub">'+esc(prep)+'</div></td><td><button class="details" type="button" data-record="'+esc(item.id)+'">Evidence &amp; decision</button></td></tr>';}).join("") : '<tr><td class="empty" colspan="7">No deadlines match these filters.</td></tr>'; return rows; }
        function renderReview() { const rows=(data.review||[]).filter((item)=>!["confirmed","rejected","not-applicable","superseded"].includes(item.status)); qs("review-list").innerHTML=rows.length ? rows.map((item)=>'<article class="review-item"><span class="action-label">'+esc(label(item.status))+'</span><h3><a href="'+esc(item.url)+'" target="_blank" rel="noreferrer">'+esc(item.title)+'</a></h3><p>Due '+esc(date(item.deadline))+' · '+esc(item.authority?.name||"Official source")+'</p><p><strong>Next:</strong> verify the deadline evidence and record a confirmed, rejected or not-applicable decision.</p></article>').join("") : '<p class="quiet">No items are waiting for editorial review.</p>'; }
        function renderGates() { const r=data.qa?.readiness||{},m=r.metrics||{}, reasons=r.relaunchReasons||[]; const gates=[[(m.stableCoreAuthorities||0)>=4,"Four core authorities healthy across three shadow runs"],[(m.confirmedOpenDeadlines||0)>=10,"Ten confirmed open deadlines"],[(m.confirmedAuthorities||0)>=4,"Four contributing authorities"],[r.relaunchEligible,"Named editor and product-owner approval"]]; qs("gates").innerHTML=gates.map(([met,text])=>'<div class="gate '+(met?"met":"")+'"><span class="dot"></span><span>'+esc(text)+(met?"":" · not yet met")+'</span></div>').join(""); if(reasons.length) qs("gates").insertAdjacentHTML("beforeend",'<p class="footer-note">'+esc(reasons.join(" · "))+'</p>'); }
        function renderHealth() { const counts={}; (data.health||[]).forEach((source)=>{const status=source.status||"unknown";counts[status]=(counts[status]||0)+1;}); qs("source-summary").innerHTML=Object.entries(counts).sort(([a],[b])=>a.localeCompare(b)).map(([status,count])=>'<article class="source-stat"><b>'+esc(count)+'</b><span>'+esc(status.replace(/-/g," "))+'</span></article>').join("") || '<p class="quiet">No source-health record available.</p>'; const attention=(data.health||[]).filter((source)=>(source.status||"unknown")!=="ok"); const detail=attention.length ? '<div class="health-list">'+attention.map((source)=>'<article class="health-item"><span class="action-meta">'+esc(source.status||"unknown")+'</span><strong>'+esc(sourceName(source.sourceId))+'</strong><p>'+esc(source.error||"No usable source items returned in this run.")+'</p></article>').join("")+'</div>' : '<p class="quiet">All configured sources returned usable results.</p>'; qs("source-summary").insertAdjacentHTML("afterend",detail); }
        function renderDiscovery() { const d=data.discovery||{}, catalogue=d.catalogue||{}, intake=d.activeIntake||{}, scan=d.latestScan||{}; const checked=scan.activeSourcesChecked ?? 0, configured=intake.sources ?? 0, unscanned=(scan.unscannedActiveSources||[]).length; const cards=[[catalogue.authorities||0,"Authorities catalogued",(catalogue.jurisdictions||0)+" jurisdictions · discovery only"],[intake.primarySources||configured,"Active primary sources",(intake.jurisdictions||0)+" jurisdictions · source-checked intake"],[checked,"Sources checked last run",scan.edition?"edition "+scan.edition:"no completed run"],[intake.deadlineLookbackDays||"—","Policy lookback",unscanned?unscanned+" active source"+(unscanned===1?"":"s")+" not yet in the recorded run":"use for deadline discovery, not weekly news"]]; qs("source-estate").innerHTML=cards.map(([number,label,detail])=>'<article class="estate-stat"><small>'+esc(label)+'</small><b>'+esc(number)+'</b><span>'+esc(detail)+'</span></article>').join(""); const actions=d.nextActions||[]; qs("source-estate-actions").textContent=actions.length?"Next source action: "+actions[0]:"The discovery and intake estates are aligned."; }
        function approvalTemplate(item) { return JSON.stringify({id:item.id,url:item.url,deadline:item.deadline,decision:"confirmed | rejected | not-applicable",scope:"source-date-only | applicability",reviewer:"Name",decidedAt:"YYYY-MM-DD",note:"State the official evidence and the basis for this decision.",evidence:{quote:"Exact primary-source wording",url:item.url}},null,2); }
        function openDetail(id) { const item=items.find((row)=>row.id===id);if(!item)return;const decision=item.decision;const components=Object.entries(item.confidence?.components||{}).map(([name,value])=>name.replace(/-/g," ")+": "+value).join(" · ") || "No confidence components recorded";const drivers=Object.entries(item.businessImpact?.drivers||{}).filter(([,value])=>Number(value)>0).map(([name])=>name.replace(/_/g," ")).join(" · ") || "No impact drivers recorded";const cue=item.evidence?.deadlineCue||"No separate deadline cue was captured; check the source wording below.";const sourceCheck=item.evidence?.verifiedAt?'Primary source checked '+date(item.evidence.verifiedAt)+(item.evidence?.verification?' · '+item.evidence.verification:''):'Published '+date(item.sourcePublishedAt)+' · '+(item.evidence?.detailChecked?'detail page checked':'detail page not confirmed');const historyLabel=item.intake==='verified-backfill'?'Primary source checked':'Last reconfirmed';const review=decision?'<p><strong>'+esc(label(decision.decision))+'</strong> ('+esc(decision.scope||"scope not recorded")+') by '+esc(decision.reviewer||"recorded reviewer")+' on '+esc(date(decision.decidedAt))+'. '+esc(decision.note||"")+'</p>':'<p>No decision is recorded. Verify the official wording, then record a confirmed, rejected or not-applicable decision.</p>';qs("detail-title").textContent=item.title||"Deadline record";qs("detail-body").innerHTML='<h3>Evidence</h3><div class="evidence-grid"><article class="evidence-card"><small>Official source</small><span><a class="source-detail" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">Open source record</a></span></article><article class="evidence-card"><small>Deadline</small><span>'+esc(date(item.deadline))+' · '+esc(String(days(item.deadline)))+' days from register date</span></article><article class="evidence-card"><small>Source and check</small><span>'+esc(sourceCheck)+'</span></article><article class="evidence-card"><small>Confidence checks</small><span>'+esc(components)+'</span></article></div><h3>What the source says</h3><p>'+esc(item.evidence?.change||"No extracted change summary. Review the official source before deciding.")+'</p><p><strong>Deadline wording:</strong> '+esc(typeof cue === "string" ? cue : cue.quote || JSON.stringify(cue))+'</p><h3>Operating record</h3><div class="evidence-grid"><article class="evidence-card"><small>Owner route</small><span>'+esc((item.ownerGuidance?.owners||[]).join(" · ")||"Owner to assign")+'</span></article><article class="evidence-card"><small>Impact assessment</small><span>'+esc(item.businessImpact?.band||"not assessed")+' · '+esc(drivers)+'</span></article><article class="evidence-card"><small>First seen</small><span>'+esc(date(item.firstSeen))+'</span></article><article class="evidence-card"><small>'+esc(historyLabel)+'</small><span>'+esc(date(item.lastSeen))+' · edition '+esc(item.sourceEdition||"unknown")+'</span></article></div><h3>Decision</h3><div class="decision-box">'+review+'<p>Copy a complete decision record, fill in the reviewer, date and evidence note, then have it entered in the controlled approvals record.</p><textarea class="decision-template" id="decision-template" readonly aria-label="Decision template"></textarea><div style="margin-top:10px"><button class="details" type="button" id="detail-copy">Copy decision template</button><span class="copy-note" id="copy-note" aria-live="polite"></span></div></div>';qs("decision-template").value=approvalTemplate(item);const dialog=qs("record-detail");if(!dialog.open)dialog.showModal();qs("detail-copy").addEventListener("click",()=>{const field=qs("decision-template"),note=qs("copy-note");field.focus();field.select();const copied=()=>{note.textContent="Copied — complete it before use.";};if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(field.value).then(copied).catch(()=>{document.execCommand("copy");copied();});}else{document.execCommand("copy");copied();}}); }
        function exportCsv() { const rows=renderRows(); const columns=["Deadline","Title","Authority","Stage","Status","Confidence","Themes","Owners","URL"]; const lines=[columns,...rows.map((item)=>[item.deadline,item.title,item.authority?.name,item.stage,item.status,item.confidence?.band,(item.themes||[]).join("; "),(item.ownerGuidance?.owners||[]).join("; "),item.url])].map((row)=>row.map((cell)=>'"'+String(cell??"").replaceAll('"','""')+'"').join(",")); const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([lines.join("\\n")],{type:"text/csv"}));a.download="regulatory-deadlines.csv";a.click();URL.revokeObjectURL(a.href); }
        ["search","due-filter","status-filter","stage-filter","authority-filter","jurisdiction-filter"].forEach((id)=>qs(id).addEventListener(id==="search"?"input":"change",renderRows)); qs("export").addEventListener("click",exportCsv);qs("register-rows").addEventListener("click",(event)=>{const button=event.target.closest("[data-record]");if(button)openDetail(button.dataset.record);});qs("detail-close").addEventListener("click",()=>qs("record-detail").close());qs("record-detail").addEventListener("click",(event)=>{if(event.target===qs("record-detail"))qs("record-detail").close();}); renderOutlook(); renderImmediateActions(); renderAssurance(); renderChanges(); renderRows(); renderReview(); renderGates(); renderHealth(); renderDiscovery();
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
  const qaHistory = readJson(path.join(outDir, "qa-history.json"), { runs: [] });
  const changes = readJson(path.join(outDir, "changes.json"), {});
  const discovery = readJson(path.join(outDir, "discovery.json"), {});
  const exceptions = readJson(path.join(outDir, "source-exceptions.json"), { exceptions: [] });
  const html = renderDashboard({ register, review, health, qa, qaHistory, changes, discovery, exceptions });
  fs.writeFileSync(path.join(outDir, "index.html"), `${html}\n`);
  console.log(`Private deadline dashboard rendered: ${path.relative(ROOT, path.join(outDir, "index.html"))}`);
}

if (import.meta.url === `file://${process.argv[1]}`) run();

export { renderDashboard };
