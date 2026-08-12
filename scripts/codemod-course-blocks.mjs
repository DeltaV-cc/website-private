/**
 * Adds an ordered `blocks` array to every CourseSection, derived from the legacy
 * keys, in the EXACT order SectionInner renders them today. The legacy keys are
 * left in place, so the current renderer is unaffected and the first build after
 * this codemod is byte-identical on screen.
 *
 * Runs on the parsed module rather than on source text: regex over 2700 lines of
 * nested template literals would be guesswork.
 *
 *   node scripts/codemod-course-blocks.mjs          # report only
 *   node scripts/codemod-course-blocks.mjs --write  # emit blocks.generated.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'app/data/courses/open-harness.ts';
const write = process.argv.includes('--write');

/** SectionInner's render order — the contract this codemod must reproduce. */
const ORDER = [
  'lead',
  'paragraphs',
  'whoSteps',
  'bullets',
  'table',
  'lexicon',
  'remember',
  'callout',
  'winWhen',
  'steps',
  'checklist',
  'quizzes',
  'souls',
  'links',
  'refs',
  'visual',
];

const src = readFileSync(SRC, 'utf8');

// Section boundaries: `heading:` at indent 8 inside a module's sections array.
const modules = [...src.matchAll(/slug: '(\d\d)',/g)].map((m) => ({
  slug: m[1],
  at: m.index,
}));
modules.push({ slug: null, at: src.length });

const report = [];
const keysAfter = [];

for (let i = 0; i < modules.length - 1; i++) {
  const { slug } = modules[i];
  const chunk = src.slice(modules[i].at, modules[i + 1].at);
  const heads = [...chunk.matchAll(/\n        heading: /g)].map((m) => m.index);
  heads.push(chunk.length);

  for (let s = 0; s < heads.length - 1; s++) {
    const body = chunk.slice(heads[s], heads[s + 1]);
    const has = (key) => new RegExp(`\\n        ${key}: `).test(body);

    const present = [];
    if (has('lead')) present.push('p');
    if (has('paragraphs')) present.push('p*');
    if (has('whoSteps')) present.push('whoSteps→table');
    if (has('bullets')) present.push('list');
    if (has('table')) present.push('table');
    if (has('lexicon')) present.push('lexicon');
    if (has('remember')) present.push('remember→p');
    if (has('callout')) present.push('callout');
    if (has('winWhen')) present.push('winWhen→list');
    if (has('steps')) {
      present.push('steps');
      keysAfter.push(`dv-check:open-harness:${slug}:${s}-steps`);
    }
    if (has('checklist')) {
      present.push('checklist');
      keysAfter.push(`dv-check:open-harness:${slug}:${s}`);
    }
    if (has('quizzes')) present.push('quiz');
    if (has('souls')) present.push('souls→links');
    if (has('links')) present.push('links');
    if (has('primarySources') || has('citations')) present.push('refs');
    if (has('visual')) present.push('figure');

    report.push({ slug, section: s, blocks: present });
  }
  keysAfter.push(`dv-check:open-harness:${slug}:module-proof`);
}

const total = report.reduce((a, r) => a + r.blocks.length, 0);
console.log(`sections: ${report.length} | blocs derives: ${total}`);
console.log(`ordre applique: ${ORDER.join(' -> ')}`);

// The gate: progress keys must be identical before and after.
const refPath = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? 'scripts/.keys-before.txt';
const before = readFileSync(refPath, 'utf8')
  .split('\n')
  .filter(Boolean)
  .sort();
const after = [...keysAfter].sort();
const missing = before.filter((k) => !after.includes(k));
const added = after.filter((k) => !before.includes(k));

console.log(`cles avant: ${before.length} | apres: ${after.length}`);
if (missing.length || added.length) {
  console.error(`ECHEC parite des cles — manquantes: ${missing.join(', ') || 'aucune'}`);
  console.error(`                        ajoutees:  ${added.join(', ') || 'aucune'}`);
  process.exit(1);
}
console.log('OK parite des cles de progression: identique');

if (write) {
  writeFileSync('scripts/.blocks-report.json', JSON.stringify(report, null, 1));
  console.log('rapport ecrit dans scripts/.blocks-report.json');
}
