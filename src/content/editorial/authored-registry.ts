// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { authoredEditorialRecords } from "./authored-records.ts";
import type { AuthoredEditorialRecord } from "./authored-types";

const recordsByRoute = new Map<string, AuthoredEditorialRecord>(
  authoredEditorialRecords.map((record) => [record.route, record]),
);

export const authoredEditorialRegistry: readonly AuthoredEditorialRecord[] =
  authoredEditorialRecords;

export function getAuthoredEditorialRecord(route: string): AuthoredEditorialRecord | undefined {
  return recordsByRoute.get(route);
}
