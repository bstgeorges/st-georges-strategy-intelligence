import fs from "node:fs";
import { pathToFileURL } from "node:url";

const months = Object.fromEntries("january february march april may june july august september october november december".split(" ").map((month, index) => [month, index + 1]));

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || "") && Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

function issueDate(text) {
  // Look only in the heading: source dates in the body do not date the issue.
  const heading = String(text || "").slice(0, 500).replace(/&#\d+;/g, " ");
  const match = heading.match(/\b(\d{1,2})\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})\b/i);
  if (!match) return null;
  const date = `${match[3]}-${String(months[match[2].toLowerCase()]).padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  return validDate(date) ? date : null;
}

function unwrap(value) {
  if (value?.isError) throw new Error("A briefing chat could not be read.");
  if (Array.isArray(value?.content)) {
    const block = value.content.find((item) => item.type === "text");
    if (!block?.text) throw new Error("Briefing tool response has no readable text.");
    return JSON.parse(block.text);
  }
  return value;
}

function collect(pages, kind, previous, through) {
  if (!Array.isArray(pages) || pages.length === 0) throw new Error(`No ${kind} briefing chat was supplied.`);
  const states = new Map();
  const issues = [];
  for (const raw of pages) {
    const data = unwrap(raw);
    const id = data?.thread?.id;
    if (!id || !Array.isArray(data.turns) || !data.page || typeof data.page.hasMore !== "boolean") {
      throw new Error(`The ${kind} briefing response is incomplete.`);
    }
    const state = states.get(id) || { terminalPage: false };
    state.terminalPage ||= !data.page.hasMore;
    states.set(id, state);
    for (const turn of data.turns) for (const item of turn.items || []) {
      if (item.type !== "agentMessage" || typeof item.text !== "string") continue;
      const heading = item.text.slice(0, 250);
      const matches = kind === "daily" ? /daily\s+intelligence/i.test(heading) : /ai\s+risk\s*(?:&|&amp;|and)\s*frontier\s+brief/i.test(heading);
      if (!matches) continue;
      const date = issueDate(item.text);
      if (!date) throw new Error(`A ${kind} briefing has no recognizable issue date; inspect it rather than silently excluding it.`);
      if (date <= previous || date > through) continue;
      if (item.truncated) throw new Error(`The ${kind} issue dated ${date} was truncated; its full content is required.`);
      issues.push({ date, threadId: id, messageId: item.id || null });
    }
  }
  for (const [id, state] of states) if (!state.terminalPage) throw new Error(`Briefing chat ${id} has more history; read all required pages before reconciling.`);
  return [...new Map(issues.map((issue) => [`${issue.threadId}:${issue.messageId || issue.date}`, issue])).values()].sort((a, b) => a.date.localeCompare(b.date));
}

export function reconcileBriefings({ previous, through, dailyPages, weeklyPages }) {
  if (!validDate(previous) || !validDate(through) || previous >= through) throw new Error("Provide valid previous and through dates in increasing order.");
  const daily = collect(dailyPages, "daily", previous, through);
  const weekly = collect(weeklyPages, "weekly", previous, through);
  if (!daily.length) throw new Error("No daily briefing issue was found for this edition period; find a current dated workspace record or report the missing source.");
  if (!weekly.length) throw new Error("No current weekly AI Risk brief was found for this edition period; find a current dated workspace record or report the missing source.");
  const missingDays = [];
  for (let ms = Date.parse(`${previous}T00:00:00Z`) + 86400000; ms <= Date.parse(`${through}T00:00:00Z`); ms += 86400000) {
    const date = new Date(ms).toISOString().slice(0, 10);
    if (!daily.some((issue) => issue.date === date)) missingDays.push(date);
  }
  return { previous, through, daily, latestWeekly: weekly.at(-1), missingDays };
}

function main(args) {
  const options = { dailyPages: [], weeklyPages: [] };
  for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    const value = args[++i];
    if (!value) throw new Error(`Missing value for ${key}.`);
    if (key === "--previous") options.previous = value;
    else if (key === "--through") options.through = value;
    else if (key === "--daily") options.dailyPages.push(JSON.parse(fs.readFileSync(value, "utf8")));
    else if (key === "--weekly") options.weeklyPages.push(JSON.parse(fs.readFileSync(value, "utf8")));
    else throw new Error(`Unknown argument: ${key}`);
  }
  console.log(JSON.stringify(reconcileBriefings(options), null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(`Briefing coverage incomplete: ${error.message}`); process.exitCode = 1; }
}
