// Authored production registry. Capture ASTs are parity fixtures and are never imported here.
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { aboutRecords } from "./authored/about.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { archiveRecords } from "./authored/archive.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { briefRecords } from "./authored/brief.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { committeeQuestionsRecords } from "./authored/committee-questions.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { regulatoryHorizonRecords } from "./authored/regulatory-horizon.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { signalsIndexRecords } from "./authored/signals-index.ts";
// @ts-expect-error Node's type-stripping test runtime needs the extension; the bundler supports it.
import { topicDossierRecords } from "./authored/topic-dossier.ts";
import type { AuthoredEditorialRecord } from "./authored-types";

export const authoredEditorialRecords = [
  ...aboutRecords,
  ...archiveRecords,
  ...briefRecords,
  ...committeeQuestionsRecords,
  ...regulatoryHorizonRecords,
  ...signalsIndexRecords,
  ...topicDossierRecords,
].sort((left, right) =>
  left.route.localeCompare(right.route),
) satisfies readonly AuthoredEditorialRecord[];
