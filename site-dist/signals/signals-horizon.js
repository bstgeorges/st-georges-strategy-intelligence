(function () {
  const THEME_LABELS = {
    "balance-sheet": "Balance sheet",
    "customer-outcomes": "Customer outcomes",
    "boardroom-and-accountability": "Boardroom and accountability",
    "crime-and-sanctions": "Crime and sanctions",
    "digital-resilience": "Digital resilience",
    "ai-and-models": "AI and models",
    "digital-money": "Digital money",
    "market-plumbing": "Market plumbing",
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function groupedSignals(signals) {
    const groups = new Map();
    for (const signal of signals || []) {
      for (const area of signal.riskAreas || []) {
        if (!groups.has(area)) groups.set(area, []);
        groups.get(area).push(signal);
      }
    }
    return groups;
  }

  function renderGroup(slug, items) {
    const first = items[0] || {};
    const extra = items.length > 1 ? ` plus ${items.length - 1} more` : "";
    return `
      <a class="archive-card" href="../regulatory-horizon/index.html">
        <p class="meta">${escapeHtml(slug)}</p>
        <h3>${escapeHtml(THEME_LABELS[slug] || slug)}</h3>
        <p>${escapeHtml(first.title || "No material signal in this edition")}${escapeHtml(extra)}.</p>
      </a>
    `;
  }

  async function init() {
    if (window.location.protocol === "file:") return;

    const target = document.getElementById("signals-horizon-themes");
    if (!target) return;

    const response = await fetch("../regulatory-horizon/latest.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to load Horizon latest.json: ${response.status}`);
    const data = await response.json();
    const groups = groupedSignals(data.signals || []);
    const rendered = Object.keys(THEME_LABELS)
      .filter((slug) => groups.has(slug))
      .map((slug) => renderGroup(slug, groups.get(slug)))
      .join("");

    target.innerHTML = rendered || `
      <article class="archive-card">
        <p class="meta">No material Horizon signals</p>
        <h3>No regulatory risk-area movement in this edition</h3>
        <p>Keep monitoring the next weekly run and archived editions.</p>
      </article>
    `;
  }

  init().catch((error) => {
    console.warn("Signals Horizon grouping fell back to static HTML.", error);
  });
})();
