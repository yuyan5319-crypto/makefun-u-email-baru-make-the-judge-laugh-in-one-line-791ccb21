// Make the Judge Laugh in One Line — entry program.
//
// Writes a single original one-line joke (under 200 characters) to
// /output/entry.txt, the file the competition gate scores.
//
// The joke, written for this entry:
//   "I finally organized my whole life into folders.
//    'Future Me' hasn't opened a single one."
// Setup: getting organized, the virtuous digital-age fix. Punchline: the
// future self the whole system was built for never shows up to use it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I finally organized my whole life into folders. 'Future Me' hasn't opened a single one.";

// The grader runs this in a sandbox where /output exists; OUTPUT_DIR lets a
// local run point the same code at a scratch directory instead.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

if (JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} characters, over the 200 limit`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");

// Read it back and hold it to the same gate the scorer applies: UTF-8 text
// of 1 to 200 characters, not only white space.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written.length < 1 || written.length > 200 || written.trim().length === 0) {
  throw new Error(`gate check failed: wrote ${written.length} characters`);
}
console.log(`wrote ${written.length} characters to ${OUTPUT_PATH}`);
