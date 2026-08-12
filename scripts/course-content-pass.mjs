/**
 * Content pass: turn buried literals into inline code chips, then cap bold.
 *
 * Two hard rules learned the hard way:
 *  - NEVER a pattern containing `[a-z]+/` — it matches "and/", "yes/", "input/"
 *    and produces 30 false positives.
 *  - NEVER nest a chip inside bold. formatCourseText does not recurse, so
 *    ** `SOUL.md` ** would render a literal backtick. `**X**` becomes `` `X` ``.
 *
 * Transformations are applied only OUTSIDE existing backticks and outside the
 * `(...)` half of a markdown link, so URLs are never touched.
 *
 *   node scripts/course-content-pass.mjs           # dry run
 *   node scripts/course-content-pass.mjs --write
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'app/data/courses/open-harness.ts';
const write = process.argv.includes('--write');

/** Longest first, so `agency-receipt.md` wins over `.md`, `~/.hermes` over `.hermes`. */
const LITERALS = [
  'agency-receipt.md',
  'security-dials.md',
  'cron-runbook.md',
  'skills-notes.md',
  'prompts-used.md',
  'OPENROUTER_API_KEY',
  '.hermes.md',
  'AGENTS.md',
  'MEMORY.md',
  'SKILL.md',
  'SOUL.md',
  'USER.md',
  '~/.hermes',
  'hermes doctor',
  'hermes update',
  'config.yaml',
  '/compress',
  '/context',
  '.env',
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Split a string into segments, marking the ones that must not be touched. */
function segments(str) {
  const out = [];
  const re = /(`[^`]*`|\]\([^)]*\)|https?:\/\/\S+)/g;
  let last = 0;
  let m;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ text: str.slice(last, m.index), safe: true });
    out.push({ text: m[0], safe: false });
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push({ text: str.slice(last), safe: true });
  return out;
}

let chips = 0;
let unbolded = 0;
let promptSizeFixed = 0;
const perTerm = {};

function chipify(str) {
  return segments(str)
    .map((seg) => {
      if (!seg.safe) return seg.text;
      let s = seg.text;
      for (const lit of LITERALS) {
        const e = esc(lit);
        // Bold wrapping a literal becomes a chip — never a chip inside bold.
        s = s.replace(new RegExp(`\\*\\*${e}\\*\\*`, 'g'), () => {
          chips++;
          perTerm[lit] = (perTerm[lit] || 0) + 1;
          return '`' + lit + '`';
        });
        // Bare occurrence, not already adjacent to a backtick or word char.
        s = s.replace(new RegExp(`(^|[^\\w\`/.-])${e}(?![\\w\`.-])`, 'g'), (_m, pre) => {
          chips++;
          perTerm[lit] = (perTerm[lit] || 0) + 1;
          return pre + '`' + lit + '`';
        });
      }
      return s;
    })
    .join('');
}

/**
 * Emphasis budget: roughly one bold span per 40 words, hard cap 2, minimum 1.
 * A short line with three bold phrases has no emphasis at all — everything is
 * loud, so nothing reads as important.
 */
function capBold(str) {
  const words = str.split(/\s+/).length;
  let allowed = Math.max(1, Math.min(2, Math.floor(words / 40)));
  // A line that already carries a code chip has its anchor. Bolding on top of
  // it is a second emphasis channel competing for the same phrase.
  if (str.includes('`')) allowed -= 1;
  let seen = 0;
  return str.replace(/\*\*([^*]+)\*\*/g, (m, inner) => {
    seen++;
    if (seen <= allowed) return m;
    unbolded++;
    return inner;
  });
}

const src = readFileSync(FILE, 'utf8');

// Only rewrite the inside of L('...') / L("...") arguments — never keys, hrefs
// or identifiers. Handles both single-arg and two-arg (EN, FR) forms.
const out = src.replace(/L\(\s*'((?:[^'\\]|\\.)*)'/g, (whole, body) => {
  let next = chipify(body);
  next = capBold(next);
  if (next.includes('hermes prompt-size')) promptSizeFixed++;
  return whole.replace(body, next);
});

const count = (s, re) => (s.match(re) || []).length;
console.log(`puces de code posees : ${chips}`);
console.log(
  Object.entries(perTerm)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `  ${k} ${v}`)
    .join('\n'),
);
console.log(`gras retires : ${unbolded}`);
console.log(`\navant : gras ${count(src, /\*\*/g) / 2}, backticks ${count(src, /`/g) / 2}`);
console.log(`apres : gras ${count(out, /\*\*/g) / 2}, backticks ${count(out, /`/g) / 2}`);

if (!write) {
  console.log('\n(dry run — relancer avec --write)');
  process.exit(0);
}
writeFileSync(FILE, out);
console.log('\necrit');
