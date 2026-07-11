import { execFileSync } from "node:child_process";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

const branch = git(["branch", "--show-current"]);
if (branch !== "main") {
  throw new Error(`Production deploy refused: current branch is ${branch || "detached HEAD"}, not main. Use GitHub Actions or switch to main.`);
}

const dirty = git(["status", "--porcelain", "--untracked-files=normal"]);
if (dirty) {
  throw new Error("Production deploy refused: the checkout has uncommitted files. Commit/stash them or use the canonical GitHub Actions release.");
}

const [behind = "0", ahead = "0"] = git(["rev-list", "--left-right", "--count", "HEAD...origin/main"]).split(/\s+/);
if (behind !== "0" || ahead !== "0") {
  throw new Error(`Production deploy refused: main differs from origin/main (behind ${behind}, ahead ${ahead}). Fetch/sync first.`);
}

console.log("Release checkout guard passed: clean, synced main branch.");
