/**
 * Place the three missing glossary chips on first prose mentions:
 * module 06 → harness, module 07 → harness, loop. Skips mentions inside
 * bold, backticks or existing links. Reports context; applies with --write.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'app/data/courses/open-harness.ts';
const write = process.argv.includes('--write');
let src = readFileSync(FILE, 'utf8');

const bounds = (slug) => {
  const a = src.indexOf(`slug: '${slug}',`);
  const nextSlug = String(Number(slug) + 1).padStart(2, '0');
  const b = src.indexOf(`slug: '${nextSlug}',`);
  return [a, b > 0 ? b : src.length];
};

const TARGETS = [
  { slug: '06', word: 'harness', chip: '[harness](~harness)' },
  { slug: '07', word: 'harness', chip: '[harness](~harness)' },
  { slug: '07', word: 'loop', chip: '[loop](~loop)' },
];

for (const t of TARGETS) {
  const [a, b] = bounds(t.slug);
  const chunk = src.slice(a, b);
  // word bounded by space/punctuation, not adjacent to * ` [ ] ( ~
  const re = new RegExp(`([ (])${t.word}([ ,.;)])`);
  const m = chunk.match(re);
  if (!m) {
    console.log(`${t.slug} ${t.word}: aucune mention nue trouvée — sauté`);
    continue;
  }
  const at = a + chunk.indexOf(m[0]);
  const ctx = src.slice(Math.max(0, at - 50), at + 60).replace(/\n/g, ' ');
  // guard: not inside bold/backticks/link (check nearby markers)
  const before = src.slice(Math.max(0, at - 40), at);
  if (/\*\*[^*]*$/.test(before) || /`[^`]*$/.test(before) || /\[[^\]]*$/.test(before)) {
    console.log(`${t.slug} ${t.word}: première mention dans bold/code/lien — sauté (${ctx})`);
    continue;
  }
  console.log(`${t.slug} ${t.word}: ...${ctx}...`);
  if (write) {
    src = src.slice(0, at) + m[1] + t.chip + m[2] + src.slice(at + m[0].length);
  }
}

if (write) {
  writeFileSync(FILE, src);
  console.log('écrit');
}
