/**
 * Phase F: drop the legacy CourseSection keys now that `blocks` renders.
 *
 * Keeps `heading`, `blocks`, `advanced`. Everything else was folded into blocks
 * by emit-course-blocks.mjs and is dead weight — ~100 KB of duplicated content
 * that would silently drift out of sync with what the page actually shows.
 *
 * AST-driven and position-spliced, same as the emitter: no regex over values.
 *
 *   node scripts/strip-legacy-keys.mjs           # dry run
 *   node scripts/strip-legacy-keys.mjs --write
 */
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const FILE = 'app/data/courses/open-harness.ts';
const write = process.argv.includes('--write');

const KEEP = new Set(['heading', 'blocks', 'advanced']);

const source = readFileSync(FILE, 'utf8');
const sf = ts.createSourceFile(FILE, source, ts.ScriptTarget.Latest, true);

let modulesArray = null;
sf.forEachChild((node) => {
  if (!ts.isVariableStatement(node)) return;
  for (const d of node.declarationList.declarations) {
    if (d.name.getText(sf) === 'OPEN_HARNESS_MODULES' && d.initializer) {
      modulesArray = ts.isAsExpression(d.initializer) ? d.initializer.expression : d.initializer;
    }
  }
});
if (!modulesArray) throw new Error('OPEN_HARNESS_MODULES introuvable');

const cuts = [];
const removed = {};

for (const mod of modulesArray.elements) {
  if (!ts.isObjectLiteralExpression(mod)) continue;
  const sections = mod.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText(sf) === 'sections',
  );
  if (!sections || !ts.isArrayLiteralExpression(sections.initializer)) continue;

  for (const section of sections.initializer.elements) {
    if (!ts.isObjectLiteralExpression(section)) continue;
    for (const p of section.properties) {
      if (!ts.isPropertyAssignment(p)) continue;
      const name = p.name.getText(sf);
      if (KEEP.has(name)) continue;
      removed[name] = (removed[name] || 0) + 1;
      // Swallow the trailing comma and the preceding indentation.
      let start = p.getStart(sf);
      while (start > 0 && (source[start - 1] === ' ' || source[start - 1] === '\n')) start--;
      let end = p.getEnd();
      if (source[end] === ',') end++;
      cuts.push({ start, end });
    }
  }
}

console.log(
  `cles supprimees (${Object.values(removed).reduce((a, b) => a + b, 0)} occurrences) :\n` +
    Object.entries(removed)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `  ${k} ${v}`)
      .join('\n'),
);

if (!write) {
  console.log('\n(dry run — relancer avec --write)');
  process.exit(0);
}

let out = source;
for (const c of cuts.sort((a, b) => b.start - a.start)) {
  out = out.slice(0, c.start) + '\n' + out.slice(c.end);
}
writeFileSync(FILE, out);
console.log(`\necrit : ${source.length - out.length} caracteres retires`);
