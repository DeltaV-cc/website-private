/**
 * Open Harness 2 — the same course, the aihero.dev reading experience.
 *
 * The 13 modules are re-exported from open-harness.ts on purpose: content and
 * progress (courseId + block ids) are shared, so a checkbox ticked in either
 * edition is ticked in both. Only the chrome differs.
 */
import type { CourseSection, LocaleString } from '@/app/data/courses/open-harness';

export {
  OPEN_HARNESS_MODULES,
  OPEN_HARNESS_PARTS,
  UI_COPY,
  getModule,
  getModuleIndex,
  t,
  type CourseLang,
  type CourseModule,
} from '@/app/data/courses/open-harness';

const L = (en: string, fr?: string): LocaleString => ({ en, fr: fr ?? en });

export const OH2_META = {
  id: 'open-harness-2',
  href: '/forge/course/open-harness-2/',
  title: L('Open Harness 2'),
  tagline: L('Own one agent on a host you control — the same course, rebuilt for reading.'),
  description: L(
    'Thirteen lessons across two parts, plus quick wins you can run today. Progress is shared with the original edition: tick a box here, it is ticked there.',
  ),
} as const;

/**
 * Quick wins — small, real things to run once the agent chats.
 * Every third-party command cites the doc it was copied from.
 */
export const QUICK_WINS: { slug: string; title: LocaleString; minutes: number; sections: CourseSection[] } = {
  slug: 'quick-wins',
  title: L('Quick wins'),
  minutes: 20,
  sections: [
    {
      heading: L('Clean your digital footprint — Unbroker'),
      blocks: [
        {
          k: 'p',
          text: L(
            'Data brokers republish your name, address and phone. The official `Unbroker` skill scans them and files removals autonomously, with your explicit consent per subject.',
          ),
        },
        {
          k: 'code',
          block: {
            label: L('Install the skill'),
            lang: 'sh',
            code: 'hermes skills install official/security/unbroker',
            note: L(
              'From [the official skill page](https://hermes-agent.nousresearch.com/docs/user-guide/skills/optional/security/security-unbroker). It never submits more than the broker already displays.',
            ),
          },
        },
        {
          k: 'steps',
          id: 'qw-unbroker',
          items: [
            {
              title: L('Configure automatically, then check readiness.'),
              code: { lang: 'sh', code: '$PDD setup --auto' },
            },
            {
              title: L('Verify the setup before registering anyone.'),
              code: { lang: 'sh', code: '$PDD doctor' },
            },
            {
              title: L('Register yourself, with consent — it refuses to run without it.'),
              code: {
                lang: 'sh',
                code: '$PDD intake --full-name "Your Name" --email you@example.com --consent',
              },
            },
            {
              title: L('Run the removal loop until actions are exhausted.'),
              code: { lang: 'sh', code: '$PDD next <subject>' },
            },
          ],
        },
      ],
    },
    {
      heading: L('Teach your agent a book — book-to-skill'),
      blocks: [
        {
          k: 'p',
          text: L(
            'Instead of pasting a whole PDF into context, [book-to-skill](https://github.com/virgiliojr94/book-to-skill) distils a book into a skill: mental models, per-chapter files loaded on demand, a glossary and a cheatsheet — 24-51× fewer tokens than a raw dump.',
          ),
        },
        {
          k: 'code',
          block: {
            label: L('Install'),
            lang: 'sh',
            code: 'git clone https://github.com/virgiliojr94/book-to-skill.git ~/.claude/skills/book-to-skill',
            note: L('From the repo README. Works with PDF, EPUB, DOCX, HTML, Markdown and more.'),
          },
        },
        {
          k: 'code',
          block: {
            label: L('Turn a book into a skill'),
            lang: 'text',
            code: '/book-to-skill ~/books/my-book.pdf my-book',
            note: L(
              'Usage from [the repo README](https://github.com/virgiliojr94/book-to-skill). Processing happens on your machine — the book is never uploaded.',
            ),
          },
        },
      ],
    },
    {
      heading: L('Point at your screen — the HUD'),
      blocks: [
        {
          k: 'p',
          text: L(
            'With the HUD, you stop describing which window you mean. Put the bar over it and say **"this"** — the agent resolves the reference itself.',
          ),
        },
        {
          k: 'callout',
          variant: 'note',
          text: L(
            '“You don\'t tell Hermes which app you mean anymore. Put the bar over it and say this.” — [seen in the wild](https://x.com/imbabybrooklyn/status/2086270328926240782)',
          ),
        },
      ],
    },
  ],
};
