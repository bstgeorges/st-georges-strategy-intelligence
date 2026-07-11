// The sole production/public route registry. Snapshot AST registries are parity fixtures only.
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { authoredEditorialRegistry } from "./authored-registry.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { homeEditorialRecord } from "./home.ts";

export type PublicEditorialRecord =
  typeof homeEditorialRecord | (typeof authoredEditorialRegistry)[number];

export const publicEditorialRegistry: readonly PublicEditorialRecord[] = Object.freeze([
  homeEditorialRecord,
  ...authoredEditorialRegistry,
]);
