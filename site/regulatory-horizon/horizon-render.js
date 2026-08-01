(function () {
  const THEME_COPY = {
    "balance-sheet": {
      label: "Balance sheet",
      body: "Capital, liquidity, funding, stress testing, prudential reporting, and balance-sheet resilience.",
    },
    "customer-outcomes": {
      label: "Customer outcomes",
      body: "Consumer Duty, disclosure, complaints, redress, vulnerable customers, promotions, and client communications.",
    },
    "boardroom-and-accountability": {
      label: "Boardroom and accountability",
      body: "Senior accountability, governance, board packs, committee evidence, culture, and supervisory challenge.",
    },
    "crime-and-sanctions": {
      label: "Crime and sanctions",
      body: "Financial crime, sanctions, fraud, scams, AML, market abuse, and enforcement pressure.",
    },
    "digital-resilience": {
      label: "Digital resilience",
      body: "Operational resilience, cyber, important business services, cloud, outsourcing, and incident response.",
    },
    "ai-and-models": {
      label: "AI and models",
      body: "AI governance, model risk, explainability, agentic workflows, kill switches, and control evidence.",
    },
    "digital-money": {
      label: "Digital money",
      body: "Crypto, stablecoins, tokenisation, custody, payments, capital, stress testing, and financial crime controls.",
    },
    "market-plumbing": {
      label: "Market plumbing",
      body: "Listing rules, trading venues, settlement, clearing, benchmarks, repo, wholesale markets, and post-trade change.",
    },
  };

  const pad = (value) => String(value).padStart(2, "0");

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  }

  function typeLabel(type) {
    return String(type || "other").replace(/-/g, " ");
  }

  function renderDeadline(item) {
    const prompts = item.prompts || {};
    return `
      <li>
        <time datetime="${escapeHtml(item.date)}">${formatDate(item.date)}<br><span class="meta">${escapeHtml(item.band || "")} days</span></time>
        <span>
          <a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a>
          <small>${escapeHtml(prompts.action || "")}</small>
        </span>
        <span class="owner">${escapeHtml(item.source || "Owner")}</span>
      </li>
    `;
  }

  function renderSignal(item, index) {
    const areas = (item.riskAreas || []).join(", ");
    const sourceStatus = item.sourceStatus ? `${item.sourceStatus} source / ` : "";
    const chips = [typeLabel(item.type), areas || "unclassified", sourceStatus ? `${sourceStatus}${item.source || ""}` : item.source, item.date]
      .filter(Boolean).map((value) => `<span class="horizon-chip">${escapeHtml(value)}</span>`).join("");
    return `
      <li class="horizon-signal">
        <span class="rank">${pad(index + 1)}</span>
        <div class="horizon-signal-body"><a href="${escapeHtml(item.url)}"><h3>${escapeHtml(item.title)}</h3></a>
        <div class="horizon-chips">${chips}</div></div>
      </li>
    `;
  }

  function renderCoverageNotes(data) {
    const warnings = data.warnings || [];
    if (!warnings.length) {
      return "<p>No source coverage warning is attached to this public edition.</p>";
    }
    return `<p>${warnings.map((warning) => escapeHtml(warning.message || warning.type)).join(" ")}</p>`;
  }

  function renderReviewQueue(entries) {
    if (!entries.length) return '<article class="review-empty"><p class="eyebrow">Clear</p><h3>No items awaiting review</h3><p>This edition has no unresolved medium-confidence signals.</p></article>';
    return entries.map((item) => `<article class="review-item"><div><p class="eyebrow">Medium confidence · ${escapeHtml(item.confidence?.score || "")}</p><h3><a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a></h3><p>Review classification, deadline evidence, and business impact before publication.</p></div><span class="meta">${escapeHtml(item.source || "Official source")}</span></article>`).join("");
  }

  function renderDashboard(data) {
    const signals = data.signals || [];
    const horizon = data.horizon || [];
    const activeThemes = new Set(signals.flatMap((item) => item.riskAreas || []));
    const firstDeadline = horizon[0];
    const sourceSet = new Set(signals.map((item) => item.source).filter(Boolean));
    const activeLabels = Array.from(activeThemes)
      .map((slug) => THEME_COPY[slug]?.label || slug)
      .slice(0, 4)
      .join(", ");
    if (data.status === "withheld") {
      return `
      <article><p class="meta">Publication status</p><strong>Withheld</strong><span>editorial and source checks did not pass</span></article>
      <article><p class="meta">Material signals</p><strong>0</strong><span>no rows from this scan are presented as reviewed intelligence</span></article>
      <article><p class="meta">Open deadline</p><strong>None</strong><span>no deadline from this scan is being published</span></article>
      <article><p class="meta">Next step</p><strong>Review</strong><span>use the prior reviewed archive while the scan is corrected</span></article>
    `;
    }
    return `
      <article>
        <p class="meta">Material signals</p>
        <strong>${escapeHtml(data.kpis?.material || signals.length || 0)}</strong>
        <span>ranked items requiring business-impact triage</span>
      </article>
      <article>
        <p class="meta">Active themes</p>
        <strong>${escapeHtml(`${data.kpis?.themes ?? activeThemes.size} of ${Object.keys(THEME_COPY).length}`)}</strong>
        <span>${escapeHtml(activeLabels || "no active theme detected in this run")}</span>
      </article>
      <article>
        <p class="meta">Open deadline</p>
        <strong>${escapeHtml(firstDeadline ? formatDate(firstDeadline.date) : "None")}</strong>
        <span>${escapeHtml(firstDeadline ? `${firstDeadline.title} needs an owner decision` : "no future deadline detected in this edition")}</span>
      </article>
      <article>
        <p class="meta">Primary source set</p>
        <strong>${escapeHtml(sourceSet.size ? Array.from(sourceSet).slice(0, 2).join(" / ") : "Monitor")}</strong>
        <span>${escapeHtml(sourceSet.size === 1 ? "current run is concentrated, so quiet themes remain watch-listed" : `${sourceSet.size} sources represented in the current run`)}</span>
      </article>
    `;
  }

  function renderTheme(slug, active) {
    const copy = THEME_COPY[slug] || { label: slug, body: "Monitor for material regulatory movement." };
    return `
      <article class="card">
        <p class="meta">${active ? "Active" : "Quiet this run"}</p>
        <h3>${escapeHtml(copy.label)}</h3>
        <p>${escapeHtml(copy.body)}</p>
      </article>
    `;
  }

  function renderEvidenceFiles(data) {
    const archiveHref = data.archives && data.archives[0] ? data.archives[0] : "archive/2026-07-04.html";
    return `
      <a class="archive-card" href="latest.json"><p class="meta">Data</p><h3>Current edition JSON</h3><p>Structured bottom line, horizon dates, signals, source links, and archive references.</p></a>
      <a class="archive-card" href="feed.xml"><p class="meta">Feed</p><h3>Material signals RSS</h3><p>A stable feed for readers or systems that want the regulatory signal stream, with a browser-friendly view for normal clicks.</p></a>
      <a class="archive-card" href="horizon.ics"><p class="meta">Calendar</p><h3>Deadline calendar</h3><p>All-day events for future deadlines that need owner assignment and evidence.</p></a>
      <a class="archive-card" href="${escapeHtml(archiveHref)}"><p class="meta">Archive</p><h3>Frozen edition</h3><p>A dated record of the bottom line, source set, and deadline prompts for review.</p></a>
    `;
  }

  async function init() {
    if (window.location.protocol === "file:") return;

    const response = await fetch("latest.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to load latest.json: ${response.status}`);
    const data = await response.json();

    const edition = document.getElementById("horizon-edition");
    const generated = document.getElementById("horizon-generated");
    const bottomLine = document.getElementById("horizon-bottom-line");
    const dashboard = document.getElementById("horizon-dashboard");
    const deadlines = document.getElementById("horizon-deadlines");
    const materialTop5 = document.getElementById("horizon-material-top5");
    const materialAdditional = document.getElementById("horizon-material-additional");
    const reviewItems = document.getElementById("horizon-review-items");
    const themes = document.getElementById("horizon-watch-themes");
    const evidence = document.getElementById("horizon-evidence-files");
    const coverageNotes = document.getElementById("horizon-coverage-notes");

    if (edition) edition.textContent = `Edition / ${data.edition || ""}`;
    if (generated) generated.textContent = `Generated ${data.generatedAt || "from the current weekly run"} across a ${data.windowDays || 7}-day review window.`;
    if (bottomLine) bottomLine.innerHTML = `<p>${escapeHtml(data.bottomLine || "")}</p>`;
    if (dashboard) dashboard.innerHTML = renderDashboard(data);
    if (deadlines) {
      deadlines.innerHTML = data.horizon && data.horizon.length ? data.horizon.map(renderDeadline).join("") : "<li><time>No deadline</time><span>No future deadline detected in this edition.</span><span class=\"owner\">Monitor</span></li>";
      // §5: suppress/restyle any rendered deadline whose date has already passed,
      // relative to the reader's own clock — this only ever touches the live page,
      // never an archived snapshot, since archive pages don't load this script.
      if (window.applyHorizonDateStatus) window.applyHorizonDateStatus(deadlines);
    }
    if (materialTop5) {
      materialTop5.innerHTML = (data.signals || []).length
        ? (data.signals || []).slice(0, 5).map(renderSignal).join("")
        : "<li><span class=\"rank\">--</span><span><h3>No material signals are published for this edition</h3></span><span class=\"meta\">Edition withheld</span></li>";
    }
    if (materialAdditional) {
      const additional = (data.signals || []).slice(5, 15);
    materialAdditional.innerHTML = additional.length
      ? additional.map((item, index) => renderSignal(item, index + 5)).join("")
      : "<li class=\"horizon-empty\"><div><p class=\"eyebrow\">No additional rows</p><h3>The wider source universe was reviewed, but no further items met the materiality threshold.</h3><p>Continue monitoring approved sources; this is an intentional empty state, not a missing scan.</p></div></li>";
    if (reviewItems) reviewItems.innerHTML = renderReviewQueue(data.reviewQueue || []);
    }
    if (themes) {
      const active = new Set((data.signals || []).flatMap((item) => item.riskAreas || []));
      themes.innerHTML = Object.keys(THEME_COPY).map((slug) => renderTheme(slug, active.has(slug))).join("");
    }
    if (evidence) evidence.innerHTML = renderEvidenceFiles(data);
    if (coverageNotes) coverageNotes.innerHTML = renderCoverageNotes(data);
  }

  init().catch((error) => {
    console.warn("Horizon renderer fell back to static HTML.", error);
  });
})();
