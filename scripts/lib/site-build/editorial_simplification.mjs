export function removeSectionById(html, id) {
  const pattern = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<\\/section>\\s*`, "g");
  return html.replace(pattern, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeBandByEyebrow(html, eyebrow) {
  const opening = /<section\b[^>]*>/gi;
  const isTarget = new RegExp(`\\bclass="[^"]*\\bband\\b[^"]*"`, "i");
  const hasEyebrow = new RegExp(`<p class="eyebrow">${escapeRegExp(eyebrow)}<\\/p>`, "i");
  let match;

  while ((match = opening.exec(html))) {
    if (!isTarget.test(match[0])) continue;

    const nestedSections = /<\/?section\b[^>]*>/gi;
    nestedSections.lastIndex = match.index;
    let depth = 0;
    let token;
    while ((token = nestedSections.exec(html))) {
      depth += token[0].startsWith("</") ? -1 : 1;
      if (depth === 0) break;
    }
    if (!token) return html;

    const section = html.slice(match.index, nestedSections.lastIndex);
    if (hasEyebrow.test(section)) {
      return `${html.slice(0, match.index)}${html.slice(nestedSections.lastIndex)}`;
    }
  }
  return html;
}

/**
 * Keep the public edition compact. Detailed source mechanics, theme routing,
 * and idea-development material belong in the underlying products, not the
 * reader's first pass through the weekly edition.
 */
export function simplifyBriefExperience(html) {
  return [
    "Coverage read",
    "Executive challenge",
    "Thought leadership radar",
    "Reg Horizon",
  ].reduce((result, eyebrow) => removeBandByEyebrow(result, eyebrow), html);
}

export function simplifySignalsExperience(html) {
  return [
    "Source discipline",
    "Reg Horizon feed",
  ].reduce((result, eyebrow) => removeBandByEyebrow(result, eyebrow), html);
}
