/**
 * Writes an ordered `blocks` array into every CourseSection of
 * app/data/courses/open-harness.ts, derived from the legacy keys, in the exact
 * order SectionInner renders them today.
 *
 * Parses with the TypeScript compiler (already a devDependency) and splices by
 * node position, reusing each initializer's SOURCE TEXT verbatim. Nothing is
 * re-serialised, so nested template literals, `L(...)` calls and unicode all
 * survive untouched. The legacy keys are left in place — this is additive, the
 * current renderer is unaffected.
 *
 *   node scripts/emit-course-blocks.mjs           # dry run, prints the plan
 *   node scripts/emit-course-blocks.mjs --write   # rewrite the file
 */
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const FILE = 'app/data/courses/open-harness.ts';
const write = process.argv.includes('--write');

const source = readFileSync(FILE, 'utf8');
const sf = ts.createSourceFile(FILE, source, ts.ScriptTarget.Latest, true);

const txt = (node) => source.slice(node.getStart(sf), node.getEnd());
const prop = (obj, name) =>
  obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(sf) === name);
const val = (obj, name) => {
  const p = prop(obj, name);
  return p ? p.initializer : null;
};
const elements = (node) => (node && ts.isArrayLiteralExpression(node) ? node.elements : []);

/** Locate the exported OPEN_HARNESS_MODULES array literal. */
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

const edits = [];
const census = {};
const singletons = [];
let sectionCount = 0;
const keysAfter = [];

for (const mod of modulesArray.elements) {
  if (!ts.isObjectLiteralExpression(mod)) continue;
  const slug = val(mod, 'slug')?.text;
  const sections = elements(val(mod, 'sections'));

  sections.forEach((section, i) => {
    if (!ts.isObjectLiteralExpression(section)) return;
    sectionCount++;
    const blocks = [];
    const add = (kind, code) => {
      blocks.push(code);
      census[kind] = (census[kind] || 0) + 1;
    };
    const note = (kind) => singletons.push(`${slug}#${i} ${kind}`);

    // ── SectionInner's render order, reproduced exactly ──────────────────
    const lead = val(section, 'lead');
    if (lead) {
      add('p', `{ k: 'p', lead: true, text: ${txt(lead)} }`);
      note('lead → p(lead)');
    }

    for (const p of elements(val(section, 'paragraphs'))) {
      add('p', `{ k: 'p', text: ${txt(p)} }`);
    }

    const who = val(section, 'whoSteps');
    if (who) {
      const rows = elements(who)
        .map((w) => `[${txt(val(w, 'who'))}, ${txt(val(w, 'title'))}, ${txt(val(w, 'body'))}]`)
        .join(', ');
      add(
        'table',
        `{ k: 'table', headers: [L('Who'), L('Beat'), L('What happens')], rows: [${rows}] }`,
      );
      note('whoSteps → table');
    }

    const bullets = val(section, 'bullets');
    if (bullets) add('list', `{ k: 'list', items: ${txt(bullets)} }`);

    const table = val(section, 'table');
    if (table) {
      add(
        'table',
        `{ k: 'table', headers: ${txt(val(table, 'headers'))}, rows: ${txt(val(table, 'rows'))} }`,
      );
    }

    const lex = val(section, 'lexicon');
    if (lex) add('lexicon', `{ k: 'lexicon', cards: ${txt(lex)} }`);

    const remember = val(section, 'remember');
    if (remember) {
      add('callout', `{ k: 'callout', variant: 'note', text: ${txt(remember)} }`);
      note('remember → callout(note)');
    }

    const callout = val(section, 'callout');
    if (callout) {
      const variant = val(section, 'calloutVariant');
      add(
        'callout',
        `{ k: 'callout', ${variant ? `variant: ${txt(variant)}, ` : ''}text: ${txt(callout)} }`,
      );
    }

    const winWhen = val(section, 'winWhen');
    if (winWhen) {
      add('list', `{ k: 'list', items: ${txt(winWhen)} }`);
      note('winWhen → list');
    }

    // paths is dead schema (0 usages) — steps is the only branch that fires.
    const steps = val(section, 'steps');
    if (steps) {
      const items = elements(steps)
        .map((s) => `{ title: ${txt(s)} }`)
        .join(', ');
      add('steps', `{ k: 'steps', id: '${i}-steps', items: [${items}] }`);
      keysAfter.push(`dv-check:open-harness:${slug}:${i}-steps`);
    }

    const checklist = val(section, 'checklist');
    if (checklist) {
      add('checklist', `{ k: 'checklist', id: '${i}', items: ${txt(checklist)} }`);
      keysAfter.push(`dv-check:open-harness:${slug}:${i}`);
    }

    for (const q of elements(val(section, 'quizzes'))) {
      add('quiz', `{ k: 'quiz', quiz: ${txt(q)} }`);
    }

    const souls = val(section, 'souls');
    if (souls) {
      const items = elements(souls)
        .map(
          (s) =>
            `{ label: ${txt(val(s, 'name'))}, href: '/courses/open-harness/souls/${val(s, 'id').text}.md' }`,
        )
        .join(', ');
      add('links', `{ k: 'links', label: L('Soul packs'), items: [${items}] }`);
      note('souls → links');
    }

    const links = val(section, 'links');
    if (links) add('links', `{ k: 'links', items: ${txt(links)} }`);

    const primary = val(section, 'primarySources');
    const citations = val(section, 'citations');
    if (primary || citations) {
      const parts = [];
      if (primary) parts.push(`primary: ${txt(primary)}`);
      if (citations) parts.push(`citations: ${txt(citations)}`);
      add('refs', `{ k: 'refs', ${parts.join(', ')} }`);
    }

    const visual = val(section, 'visual');
    if (visual) add('figure', `{ k: 'figure', variant: ${txt(visual)} }`);

    // Insert right after the `heading:` property so the diff reads top-down.
    const heading = prop(section, 'heading');
    if (!heading) throw new Error(`section ${slug}#${i} sans heading`);
    const at = heading.getEnd() + (source[heading.getEnd()] === ',' ? 1 : 0);
    const body = blocks.map((b) => `          ${b},`).join('\n');
    edits.push({ at, text: `\n        blocks: [\n${body}\n        ],` });
  });

  keysAfter.push(`dv-check:open-harness:${slug}:module-proof`);
}

// ── Gate: progress keys must be byte-identical to the frozen baseline ──────
const before = readFileSync('scripts/.keys-before.txt', 'utf8').split('\n').filter(Boolean).sort();
const after = [...keysAfter].sort();
const drift = [
  ...before.filter((k) => !after.includes(k)).map((k) => `- ${k}`),
  ...after.filter((k) => !before.includes(k)).map((k) => `+ ${k}`),
];

console.log(`sections: ${sectionCount} | blocs: ${Object.values(census).reduce((a, b) => a + b, 0)}`);
console.log(
  Object.entries(census)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `  ${k} ${v}`)
    .join('\n'),
);
console.log(`\nconversions a relire a l'oeil (${singletons.length}):\n  ${singletons.join('\n  ')}`);
console.log(`\ncles de progression: ${before.length} avant / ${after.length} apres`);
if (drift.length) {
  console.error(`ECHEC parite:\n${drift.join('\n')}`);
  process.exit(1);
}
console.log('OK parite identique');

if (!write) {
  console.log('\n(dry run — relancer avec --write)');
  process.exit(0);
}

let out = source;
for (const e of edits.sort((a, b) => b.at - a.at)) {
  out = out.slice(0, e.at) + e.text + out.slice(e.at);
}
writeFileSync(FILE, out);
console.log(`\necrit: ${edits.length} sections, ${out.length - source.length} caracteres ajoutes`);
