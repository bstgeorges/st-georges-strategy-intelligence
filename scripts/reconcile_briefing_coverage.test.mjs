import { test } from "node:test";
import assert from "node:assert/strict";
import { reconcileBriefings } from "./reconcile_briefing_coverage.mjs";

const page = (id, texts, hasMore = false) => ({ thread: { id }, page: { hasMore }, turns: [{ items: texts.map(([id, text, truncated]) => ({ type: "agentMessage", id, text, truncated })) }] });
const daily = page("d", [["1", "DAILY INTELLIGENCE · TUESDAY 10 NOVEMBER 2026\nfirst"], ["2", "DAILY INTELLIGENCE · SUNDAY 15 NOVEMBER 2026\nsecond"]]);
const weekly = page("w", [["3", "# AI Risk &amp; Frontier Brief\n\nFriday, 13 November 2026 | Coverage: 6–12 November\nbrief"]]);
const args = { previous: "2026-11-08", through: "2026-11-15", dailyPages: [daily], weeklyPages: [weekly] };

test("reads multiple messages in one turn and records absent days without failing", () => {
  const report = reconcileBriefings(args);
  assert.deepEqual(report.daily.map((issue) => issue.date), ["2026-11-10", "2026-11-15"]);
  assert.deepEqual(report.missingDays, ["2026-11-09", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14"]);
  assert.equal(report.latestWeekly.date, "2026-11-13");
});

test("combines continuations and rejects incomplete pagination or truncated current issues", () => {
  const more = page("d2", [["4", "Daily Intelligence Briefing\nMonday, 9 November 2026\nissue"]]);
  assert.ok(!reconcileBriefings({ ...args, dailyPages: [daily, more] }).missingDays.includes("2026-11-09"));
  assert.throws(() => reconcileBriefings({ ...args, dailyPages: [page("d", [], true)] }), /more history/);
  assert.throws(() => reconcileBriefings({ ...args, weeklyPages: [page("w", [["3", "# AI Risk & Frontier Brief\nFriday, 13 November 2026", true]])] }), /truncated/);
});

test("rejects missing or stale source material and impossible dates", () => {
  assert.throws(() => reconcileBriefings({ ...args, weeklyPages: [page("w", [["x", "AI Risk & Frontier Brief\nFriday, 6 November 2026"]])] }), /No current weekly/);
  assert.throws(() => reconcileBriefings({ ...args, dailyPages: [] }), /No daily/);
  assert.throws(() => reconcileBriefings({ ...args, through: "2026-02-30" }), /valid previous/);
  assert.throws(() => reconcileBriefings({ ...args, dailyPages: [page("d", [["x", "Daily Intelligence Briefing\nNo date supplied"]])] }), /no recognizable issue date/);
});

test("accepts actual tool response envelopes and deduplicates overlapping pages", () => {
  const wrapped = (data) => ({ content: [{ type: "text", text: JSON.stringify(data) }], isError: false });
  const older = page("d", [["1", "DAILY INTELLIGENCE · TUESDAY 10 NOVEMBER 2026\nfirst"]], true);
  older.page.nextCursor = "cursor-1";
  const first = { requestCursor: null, response: wrapped(older) };
  const last = { requestCursor: "cursor-1", response: wrapped(daily) };
  const report = reconcileBriefings({ ...args, dailyPages: [first, last], weeklyPages: [wrapped(weekly)] });
  assert.equal(report.daily.length, 2);
  assert.throws(() => reconcileBriefings({ ...args, dailyPages: [first, { ...last, requestCursor: "cursor-2" }] }), /missing history page/);
  assert.throws(() => reconcileBriefings({ ...args, dailyPages: [{ isError: true }] }), /could not be read/);
});
