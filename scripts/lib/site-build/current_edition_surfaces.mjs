function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function committeeQuestionLinks(question) {
  const routesById = {
    brief: ["/brief/", "Current brief"],
    ai: ["/signals/ai/", "AI signals"],
    cyber: ["/signals/cyber/", "Cyber signals"],
    "third-party": ["/signals/third-party/", "Third-party signals"],
    resilience: ["/signals/resilience/", "Resilience signals"],
    data: ["/signals/data/", "Data signals"],
  };
  return (question.links || [])
    .map((id) => routesById[id])
    .filter(Boolean)
    .map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`)
    .join("");
}

/**
 * Render the shared current-edition record onto the two public entry surfaces.
 * File I/O remains in the publisher; this module owns only the editorial markup.
 */
export function renderCurrentEditionSurfaces({
  editionRecord,
  horizonData,
  homeHtml,
  committeeHtml,
  formatDateShort,
  replaceElementContent,
}) {
  if (!editionRecord) return { homeHtml, committeeHtml };
  const question = editionRecord.committeeQuestion || {};
  let renderedHome = homeHtml;
  let renderedCommittee = committeeHtml;

  if (renderedHome) {
    const lead = editionRecord.topSignals?.[0] || {};
    const bridge = `<!-- home-current:start -->
        <section class="band home-current" aria-label="This edition at a glance">
          <div class="section-heading">
            <div><p class="eyebrow">This edition</p><h2>One judgement. Three useful next moves.</h2></div>
            <p>The front door is deliberately brief. The full evidence lives in the Weekly Brief, the practical challenge in Committee Questions, and the source trail in Signals.</p>
          </div>
          <div class="grid-3 home-current-grid">
            <a class="brief-card" href="/brief/"><p class="meta">Lead signal / ${escapeHtml(lead.label || "Current edition")}</p><h3>${escapeHtml(lead.title || "Read the full weekly brief")}</h3><p>${escapeHtml(lead.why || "Open the complete five-minute brief with the sources and evidence requests behind this week's call.")}</p></a>
            <a class="brief-card" href="/committee-questions/"><p class="meta">This week’s question</p><h3>${escapeHtml(question.question || "Turn the judgement into challenge")}</h3><p>${escapeHtml(question.evidence || "Use the current question and the evergreen library to ask for evidence rather than reassurance.")}</p></a>
            <a class="brief-card" href="/archive/"><p class="meta">Trace the record</p><h3>Read the judgement in context</h3><p>Use the dated brief and topic archives to follow the evidence and how the operating judgement changed.</p></a>
          </div>
          <div class="button-row"><a class="button secondary light" href="/brief/">Read the full brief</a><a class="button secondary light" href="/signals/">Explore the signal library</a></div>
        </section>
        <!-- home-current:end -->`;
    renderedHome = renderedHome
      .replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(editionRecord.title)}</h1>`)
      .replace(/<p class="hero-copy">[\s\S]*?<\/p>/, `<p class="hero-copy">${escapeHtml(editionRecord.mainJudgement || "What changed. Why it matters. What to ask for next — ready for Monday.")}</p>`)
      .replace(/<!-- home-current:start -->[\s\S]*?<!-- home-current:end -->/, bridge);
  }

  if (renderedCommittee) {
    const content = `<div class="section-heading"><div><p class="eyebrow">This week’s question</p><h2>What should the committee ask for now?</h2></div><p>A current question gives the library a live entry point. The rest of the page stays useful beyond this week’s news cycle.</p></div><article class="committee-question-card featured-question"><p class="meta">${escapeHtml(question.domain || "Current edition")}</p><h3>${escapeHtml(question.question || "Ask for the current decision, owner and evidence.")}</h3><dl><div><dt>Why ask now</dt><dd>${escapeHtml(question.why || "The current edition identifies a live operating decision.")}</dd></div><div><dt>Evidence to request</dt><dd>${escapeHtml(question.evidence || "Ask for a dated decision trail and supporting evidence.")}</dd></div></dl><div class="source-row">${committeeQuestionLinks(question)}</div></article>`;
    renderedCommittee = replaceElementContent(renderedCommittee, "section", "committee-current-question", content);
  }

  return { homeHtml: renderedHome, committeeHtml: renderedCommittee };
}
