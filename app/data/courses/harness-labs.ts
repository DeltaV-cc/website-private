/**
 * Harness Labs — drills AFTER mastery, not a second install path.
 * Assumes Hermes already installed (My First AI Agent Part I).
 * Mastery owns pedagogy; labs own measurement artifacts and extensions.
 */

export type HarnessLab = {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  minutes: number;
  level: 'after-part-i' | 'after-part-ii' | 'advanced';
  tags: string[];
  /** Hard prereq shown on every lab page */
  requires: string;
  /** One-liner: what is already true before starting */
  assumes: string;
  /** Mastery module links if prereq missing */
  ifNotHref: string;
  ifNotLabel: string;
  outcome: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    steps?: string[];
    callout?: string;
    calloutVariant?: 'note' | 'warning' | 'quote';
    links?: { label: string; href: string }[];
    /**
     * A cited post from X, embedded from X's own iframe endpoint — never
     * re-hosted. `height` is tuned per post so the frame ends on the timestamp
     * rather than the like/reply bar; see CourseTweet.
     */
    tweet?: { id: string; author: string; href: string; caption?: string; height?: number };
  }[];
};

export const HARNESS_LABS_META = {
  title: 'Harness Labs',
  tagline: 'Drills after mastery — not a second install course.',
  description:
    'Four optional drills after My First AI Agent Part I: rotate a key, break the harness on purpose, measure the empty-session budget, and try the Kanban plugin. Not a second install course.',
  href: '/forge/course/my-first-ai-agent/labs/',
  courseHref: '/forge/course/my-first-ai-agent/',
};

export const HARNESS_LABS: HarnessLab[] = [
  {
    id: 'api-key-hygiene',
    slug: 'api-key-hygiene',
    number: '01',
    title: 'Key rotation drill',
    subtitle: 'You already know what a key is (Harness 01/03). Prove rotation and no secrets in git.',
    minutes: 20,
    level: 'after-part-i',
    tags: ['OpSec', 'Keys'],
    requires: 'Hermes running with at least one provider key',
    assumes: 'You understand .env from mastery; this is audit + rotate practice.',
    ifNotHref: '/forge/course/my-first-ai-agent/03/',
    ifNotLabel: 'Harness 03 — Install',
    outcome:
      'keys-audit.md lists providers and secret locations; one key rotated and retested; git status clean of .env.',
    sections: [
      {
        heading: 'Rules (reminder only)',
        bullets: [
          'Secrets only in env / secure store — never SOUL, MEMORY, briefs, or git',
          'Rotate on any chat/log leak',
          'Dev vs prod keys when the provider allows',
        ],
        callout: 'If a key hit chat, rotate now. Editing history is not revocation.',
        calloutVariant: 'warning',
      },
      {
        heading: 'Drill',
        steps: [
          'List every provider in keys-audit.md with where the secret lives.',
          'Move any secret that lives in a markdown note into env; rotate that key.',
          'Rotate the least-critical key on purpose; update Hermes; one successful chat.',
          'Confirm .env is gitignored in repos Hermes can write; git status.',
        ],
      },
    ],
  },
  {
    id: 'failure-studio',
    slug: 'failure-studio',
    number: '02',
    title: 'Failure studio',
    subtitle: 'Break it on purpose: doctor, logs, stuck approvals, bad tool loops — then fix.',
    minutes: 30,
    level: 'after-part-i',
    tags: ['Ops', 'Debug', 'Security'],
    requires: 'My First AI Agent Part I (Hermes chats; gateway optional)',
    assumes: 'Desktop or CLI install works on a good day; you have not turned YOLO on for the course.',
    ifNotHref: '/forge/course/my-first-ai-agent/03/',
    ifNotLabel: 'Harness 03 — Install',
    outcome:
      'failure-log.md with three forced failures, what you saw (logs/UI), and the fix for each. No secrets pasted.',
    sections: [
      {
        heading: 'Why this lab exists',
        paragraphs: [
          'Mastery teaches the happy path. Production is the unhappy path: wrong key, hung approval, agent looping tools, gateway silent. This lab forces three failures so doctor and logs become muscle memory — not panic search.',
        ],
        links: [
          { label: 'Harness 10 — Security dials', href: '/forge/course/my-first-ai-agent/10/' },
          { label: 'Harness 06 — First agency', href: '/forge/course/my-first-ai-agent/06/' },
        ],
      },
      {
        heading: 'Safety rules',
        bullets: [
          'Do this on a non-production profile if you have one.',
          'Never paste API keys or bot tokens into failure-log.md.',
          'Do not open WAN ports or disable allowlist “to reproduce.”',
          'Stop if you are about to run destructive shell on real data — use a throwaway folder.',
        ],
        calloutVariant: 'warning',
        callout:
          'Goal is observability, not bricking the host. If chat dies completely, reinstall path is mastery 03 — not this lab.',
      },
      {
        heading: 'Failure A — provider / auth smoke',
        steps: [
          'With Hermes working, temporarily break model auth (wrong key in a throwaway env, or disable the active provider in UI). Do not commit the bad key.',
          'Send a one-line chat. Capture the error surface (UI message or hermes logs snippet redacted).',
          'Run hermes doctor (or Desktop health) if available. Note what it caught vs what it missed.',
          'Restore the good key. Confirm chat works. Log A in failure-log.md.',
        ],
      },
      {
        heading: 'Failure B — approval stuck',
        steps: [
          'Set approvals to manual (or ensure a dangerous tool will prompt).',
          'Ask for a tool action that needs approval. Leave it unanswered for 30–60s (or until timeout if shorter).',
          'Note timeout / deny behavior. Approve or cancel deliberately.',
          'Log B: approval mode, what the UI showed, final outcome.',
        ],
      },
      {
        heading: 'Failure C — tool thrash / bad path',
        steps: [
          'Ask the agent to write a file to a path that does not exist or is outside the allowed workspace (safe denial expected).',
          'If it loops retries, stop the run after 2–3 cycles. Prefer “stop / cancel” over force-kill unless hung.',
          'Find logs or session transcript. Redact paths if sensitive. Note how you stopped the loop.',
          'Log C with one sentence on how you will scope tools next time.',
        ],
      },
      {
        heading: 'failure-log.md template',
        callout: `# failure-log.md
Date / profile: [...]
A Auth: error seen · doctor said · fix
B Approval: mode · timeout · fix
C Tool thrash: prompt · stop method · fix
Secrets: none pasted
`,
        calloutVariant: 'note',
      },
    ],
  },
  {
    id: 'prompt-budget',
    slug: 'prompt-budget',
    number: '03',
    title: 'Prompt budget audit',
    subtitle: 'Measure fixed empty-session cost; cut tools and skills; re-measure.',
    minutes: 20,
    level: 'after-part-i',
    tags: ['Cost', 'Tools', 'Skills'],
    requires: 'My First AI Agent 06; better after 09 skills',
    assumes: 'Primary model works. You can open Tools and Skills panels (or CLI hermes tools / hermes skills).',
    ifNotHref: '/forge/course/my-first-ai-agent/06/',
    ifNotLabel: 'Harness 06 — First agency',
    outcome:
      'prompt-budget.md with before/after prompt-size (or Desktop audit) and two concrete cuts (toolset and/or skill).',
    sections: [
      {
        heading: 'Why this lab',
        paragraphs: [
          'Empty sessions still load system prompt, skills index, memory snapshots, tool schemas, and AGENTS.md. Upgrading the model will not fix a bloated fixed budget. This lab measures and cuts.',
        ],
        links: [
          { label: 'Harness 06 — Spend / fixed cost', href: '/forge/course/my-first-ai-agent/06/' },
          { label: 'Harness 09 — Skills', href: '/forge/course/my-first-ai-agent/09/' },
        ],
      },
      {
        heading: 'Audit',
        steps: [
          'Run hermes prompt-size (offline OK) or the Desktop prompt-budget / context audit if labeled differently. Record total and top slices in prompt-budget.md.',
          'List enabled toolsets. Disable one you never use for this profile (hermes tools or Desktop Tools).',
          'List skills. Uninstall or disable one “for later” skill.',
          'Re-run the audit. Write before → after numbers.',
          'One-line chat: confirm the agent still works for a simple task.',
        ],
        callout:
          'Do not delete SOUL or MEMORY to win the audit. Cut unused tools and skills first.',
        calloutVariant: 'note',
      },
      {
        heading: 'prompt-budget.md template',
        callout: `# prompt-budget.md
Before: total […] · top slices: tools […] skills […] memory […]
Cuts: toolset […] · skill […]
After: total […]
Still works: yes/no
`,
        calloutVariant: 'note',
      },
    ],
  },
  {
    id: 'kanban-board',
    slug: 'kanban-board',
    number: '04',
    title: 'Kanban multi-profile',
    subtitle: 'Enable the official Desktop Kanban plugin; run one card across profiles.',
    minutes: 30,
    level: 'advanced',
    tags: ['Desktop', 'Multi-agent', 'Plugin'],
    requires: 'My First AI Agent Part I; two profiles with SOUL optional but recommended',
    assumes: 'Desktop chat works on at least one profile. You are not installing Hermes here.',
    ifNotHref: '/forge/course/my-first-ai-agent/04/',
    ifNotLabel: 'Harness 04 — Soul pack',
    outcome:
      'kanban-notes.md: plugin enabled, one card moved through columns, which profile ran which step, screenshot optional (no secrets).',
    sections: [
      {
        heading: 'Why this lab',
        paragraphs: [
          'Kanban is the first official Hermes Desktop plugin: board UI, sidebar, hotkeys, backend. It is multi-step / multi-profile work — growth after a solid single harness, not Part I.',
        ],
        tweet: {
          id: '2083421808385307115',
          author: '@tonbistudio',
          href: 'https://x.com/tonbistudio/status/2083421808385307115',
          caption: 'The Kanban board in use.',
          // Tall on purpose: this is a quote-post, so the frame holds two
          // stacked cards and the quoted Nous announcement video.
          height: 1324,
        },
        links: [
          { label: 'Harness 12 — Own it forever', href: '/forge/course/my-first-ai-agent/12/' },
          {
            label: 'Desktop plugin SDK',
            href: 'https://hermes-agent.nousresearch.com/docs/developer-guide/desktop-plugin-sdk',
          },
        ],
      },
      {
        heading: 'Enable and run',
        steps: [
          'In Desktop, open Plugins (or Extensions). Enable Kanban if not already on. Restart Desktop if required.',
          'Confirm a Kanban page or sidebar entry appears.',
          'Create one real-ish task card (e.g. “Draft weekly notes outline”). Keep scope small.',
          'If you have two profiles: assign steps so each profile handles a different stage (research vs draft). If one profile only: run the board end-to-end on that profile and note “single profile” in kanban-notes.md.',
          'Move the card through at least two columns. Capture which agent/profile acted.',
          'Write kanban-notes.md: enable path, columns used, profile map, one friction note.',
        ],
        callout:
          'Do not open the board to untrusted users. Same allowlist discipline as gateway. Plugins extend trust surface.',
        calloutVariant: 'warning',
      },
      {
        heading: 'kanban-notes.md template',
        callout: `# kanban-notes.md
Plugin enabled: how […]
Card: […]
Columns: […]
Profiles: […]
Friction / next: […]
`,
        calloutVariant: 'note',
      },
    ],
  },
];

export function getHarnessLab(slug: string) {
  return HARNESS_LABS.find((l) => l.slug === slug);
}
