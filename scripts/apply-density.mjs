/**
 * Extract the density-pass proposals from the workflow output file, then apply
 * them serially against app/data/courses/open-harness.ts with validation:
 * an edit is applied only if its `find` occurs EXACTLY once. Everything else
 * is reported and skipped — no fuzzy matching, no second guesses.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const OUT =
  'C:/Users/alexm/AppData/Local/Temp/claude/C--Users-alexm-kDrive-2-Projet-Vibe-Coding-12--AI-Dojo-website/44549d27-ceb4-4d2a-8ad6-4f63c980920a/tasks/wn6xdqzb4.output';
const FILE = 'app/data/courses/open-harness.ts';

const data = JSON.parse(readFileSync(OUT, 'utf8')).result;

writeFileSync('scripts/.density-proposals.json', JSON.stringify(data, null, 1));

let src = readFileSync(FILE, 'utf8');
let applied = 0;
const skipped = [];

for (const mod of data.proposals) {
  for (const e of mod.edits) {
    const count = src.split(e.find).length - 1;
    if (count !== 1) {
      skipped.push(`[${mod.slug}] occurrences=${count} :: ${e.find.slice(0, 70)}`);
      continue;
    }
    src = src.replace(e.find, e.replace);
    applied++;
  }
}

writeFileSync(FILE, src);
console.log(`appliques: ${applied} | ignores: ${skipped.length}`);
if (skipped.length) console.log(skipped.map((s) => '  SKIP ' + s).join('\n'));
