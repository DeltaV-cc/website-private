/**
 * Harness Labs — drills AFTER mastery, not a second install path.
 * Assumes Hermes already installed (Own Your AI Part I).
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
    'Optional ops drills once Own Your AI Part I is done. Mastery default is Hermes Desktop (profile + SOUL). Labs do not re-teach install, gateway setup from zero, or memory theory. Prefer finishing the mastery modules first; CLI-only learners map Desktop steps themselves.',
  href: '/forge/course/open-harness/labs/',
  courseHref: '/forge/course/open-harness/',
};

export const HARNESS_LABS: HarnessLab[] = [
  {
    id: 'desktop-cockpit',
    slug: 'desktop-cockpit',
    number: '01',
    title: 'Desktop cockpit checklist',
    subtitle: 'Quick confirm only — install and SOUL live in mastery, not here.',
    minutes: 10,
    level: 'after-part-i',
    tags: ['Desktop', 'Checklist'],
    requires: 'Own Your AI Part I (modules 03–06 proofs)',
    assumes: 'Hermes Desktop already installed and chatting; profile + SOUL exist; gateway optional.',
    ifNotHref: '/forge/course/open-harness/03/',
    ifNotLabel: 'Harness 03 — Install',
    outcome:
      'cockpit-check.md with four yes/no lines: profile, skills panel, tools glance, file write path. No install steps performed in this lab.',
    sections: [
      {
        heading: 'Do not use this lab to install',
        paragraphs: [
          'Install, first Desktop run, SOUL writing, Telegram from zero, and first tool task are mastery topics. If any of those fail, leave this lab and open the linked modules.',
        ],
        links: [
          { label: '03 Install (Desktop canonical)', href: '/forge/course/open-harness/03/' },
          { label: '04 Soul pack', href: '/forge/course/open-harness/04/' },
          { label: '05 Gateway', href: '/forge/course/open-harness/05/' },
          { label: '06 First agency', href: '/forge/course/open-harness/06/' },
        ],
      },
      {
        heading: 'Checklist (5 minutes)',
        steps: [
          'Open Desktop on the profile you already use. Note profile name in cockpit-check.md.',
          'Skills: confirm the panel opens (do not re-learn what a skill is — see mastery 09 if needed).',
          'Tools: confirm you still know which toolsets are on for this profile.',
          'If gateway was configured in mastery 05: one restart from UI + one phone ping. If not configured, write “gateway: N/A”.',
          'One line task with an absolute path: write cockpit-check.md and open it offline.',
        ],
        callout: 'If Desktop will not start or chat fails, fix mastery 03 — do not improvise a second install guide here.',
        calloutVariant: 'warning',
      },
    ],
  },
  {
    id: 'model-spend',
    slug: 'model-spend',
    number: '02',
    title: 'Spend drill: measure and cut',
    subtitle: 'Mastery taught spend and cron. This lab only measures one job and cuts waste.',
    minutes: 20,
    level: 'after-part-i',
    tags: ['Cost', 'Models'],
    requires: 'Own Your AI 06 (agency/spend intro); better after 09 if you have a cron',
    assumes: 'Primary model already works. You are not choosing a provider for the first time.',
    ifNotHref: '/forge/course/open-harness/06/',
    ifNotLabel: 'Harness 06 — First agency',
    outcome:
      'spend-log.md with primary model ID, one timed cheap task, one tightened runbook (or cron prompt), one toolset disabled or justified.',
    sections: [
      {
        heading: 'Mastery owns the theory',
        paragraphs: [
          'Token tiers, tool catalogs, and cron-as-runbook are taught in Own Your AI 06 and 09. Do not re-read a lecture here. Open those modules if the ideas are new.',
        ],
        links: [
          { label: '06 Spend / tools intro', href: '/forge/course/open-harness/06/' },
          { label: '11 Cron runbooks', href: '/forge/course/open-harness/11/' },
        ],
      },
      {
        heading: 'Drill',
        steps: [
          'Record primary model + provider in spend-log.md (already configured).',
          'Run one light task on the cheapest acceptable model you can select; note time and quality vs primary.',
          'Take one existing cron or candidate job from mastery; rewrite only the prompt to a full amnesia runbook; paste before/after into spend-log.md.',
          'Disable one unused toolset for this profile, or write one sentence why it stays.',
        ],
        callout: 'Pass = measurement file. Fail = “I feel like it’s cheaper” with no log.',
        calloutVariant: 'quote',
      },
    ],
  },
  {
    id: 'grok-wire',
    slug: 'grok-wire',
    number: '03',
    title: 'Add Grok as a text model',
    subtitle: 'Optional provider wire after Hermes works. Image/Imagine setup belongs to Open Design.',
    minutes: 15,
    level: 'after-part-i',
    tags: ['Models', 'Grok'],
    requires: 'Hermes already chatting on another model (Harness 03 done)',
    assumes: 'Install complete. This is “add a provider,” not “install Hermes.”',
    ifNotHref: '/forge/course/open-harness/03/',
    ifNotLabel: 'Harness 03 — Install',
    outcome:
      'GROK_OK (or equivalent) reply on this profile. models-grok.md notes auth path. Imagine: “configure in Open Design 03/06” unless already done.',
    sections: [
      {
        heading: 'Drill',
        steps: [
          'Desktop providers or hermes setup — add xAI/Grok with key/OAuth per current docs. Never paste keys into chat.',
          'Select Grok. Prompt: “Reply with exactly: GROK_OK and your model name.”',
          'Save model string to models-grok.md.',
          'Images: do not deep-configure here. Write “Imagine → Open Design modules 03 and 06” unless you already use stills day-to-day.',
        ],
        links: [
          {
            label: 'Configuration',
            href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration',
          },
          { label: 'Open Design — models', href: '/forge/course/open-design/06/' },
        ],
      },
    ],
  },
  {
    id: 'api-key-hygiene',
    slug: 'api-key-hygiene',
    number: '04',
    title: 'Key rotation drill',
    subtitle: 'You already know what a key is (Harness 01/03). Prove rotation and no secrets in git.',
    minutes: 20,
    level: 'after-part-i',
    tags: ['OpSec', 'Keys'],
    requires: 'Hermes running with at least one provider key',
    assumes: 'You understand .env from mastery; this is audit + rotate practice.',
    ifNotHref: '/forge/course/open-harness/03/',
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
    id: 'webhooks',
    slug: 'webhooks',
    number: '05',
    title: 'Webhooks beyond cron',
    subtitle: 'Extension of mastery automation — events, not “what is a cron.”',
    minutes: 25,
    level: 'after-part-ii',
    tags: ['Automation', 'Webhooks'],
    requires: 'Own Your AI 11 cron proof (runbook-style job understood)',
    assumes: 'You can write a full amnesia cron prompt. Hermes is installed and online.',
    ifNotHref: '/forge/course/open-harness/11/',
    ifNotLabel: 'Harness 11 — Cron runbooks',
    outcome:
      'webhook-design.md fully filled (event, auth, runbook, failure). Working test or honest design-only pass.',
    sections: [
      {
        heading: 'Why this is a lab',
        paragraphs: [
          'Mastery 11 owns cron pedagogy. This lab only adds event-driven wakes: form, CI, deploy — with auth and failure behavior.',
        ],
      },
      {
        heading: 'Fill every field',
        callout: `Event:
Source:
Auth: [secret header | signature | IP allowlist]
Trusted payload fields:
Hermes runbook (amnesia):
Success:
Failure / retry / alert:
Idempotency:
Human approval for:`,
        calloutVariant: 'note',
      },
      {
        heading: 'Drill',
        steps: [
          'Pick one real event. Complete webhook-design.md with no empty lines.',
          'Implement only if your Hermes version documents webhooks and you can protect the endpoint; else stop at design-only.',
          'One test event logged, or explicit “deferred — no public URL yet.”',
        ],
        links: [{ label: 'Hermes docs', href: 'https://hermes-agent.nousresearch.com/docs/' }],
      },
    ],
  },
  {
    id: 'vps-ship',
    slug: 'vps-ship',
    number: '06',
    title: 'Ship a small app on an existing VPS',
    subtitle: 'Runtime choice was mastery 02. This lab deploys one artifact on a box that already runs Hermes.',
    minutes: 30,
    level: 'after-part-ii',
    tags: ['VPS', 'Deploy'],
    requires: 'Hermes already on a host (local always-on or VPS from mastery 02)',
    assumes: 'You are not learning SSH or “what is a VPS” for the first time here.',
    ifNotHref: '/forge/course/open-harness/02/',
    ifNotLabel: 'Harness 02 — Where it runs',
    outcome:
      'URL or IP:port serves a reviewed page/API. deploy-notes.md with path, restart, rollback. Human-reviewed: yes.',
    sections: [
      {
        heading: 'Scope',
        paragraphs: [
          'One static site or hello API. You read every file before anything listens on a port. Docker still optional.',
        ],
      },
      {
        heading: 'Drill',
        steps: [
          'SSH to the host that already runs Hermes. Create a dedicated app directory.',
          'Hermes scaffolds only into that directory. You forbid system-wide changes without approval.',
          'Review code. Reject surprise firewall-open or remote download scripts.',
          'Serve safely; hit from phone; write deploy-notes.md (path, port, restart, rollback).',
        ],
        callout: 'No second “how to rent a VPS” essay. If you have no host, finish mastery 02 first.',
        calloutVariant: 'note',
      },
    ],
  },
  {
    id: 'wiki-kanban',
    slug: 'wiki-kanban',
    number: '07',
    title: 'Staged wiki on an existing vault',
    subtitle: 'Vault basics are mastery 08. This lab is stages + retrieval proof only.',
    minutes: 30,
    level: 'after-part-ii',
    tags: ['Wiki', 'Kanban', 'Memory'],
    requires: 'Own Your AI 08 vault proof (Obsidian path linked, retrieval worked once)',
    assumes: 'Vault folder exists and Hermes can read it. You are not installing Obsidian here.',
    ifNotHref: '/forge/course/open-harness/08/',
    ifNotLabel: 'Harness 08 — Data vault',
    outcome:
      'BOARD.md (or Kanban) stages complete; ≥3 linked notes; one new-session answer cites vault files only.',
    sections: [
      {
        heading: 'Mastery vs lab',
        paragraphs: [
          'Harness 08 owns inbox/sources/synthesis and first retrieval. This lab only enforces multi-stage work so research does not collapse into one muddy chat.',
        ],
        links: [{ label: 'Harness 08 — vault', href: '/forge/course/open-harness/08/' }],
      },
      {
        heading: 'BOARD.md',
        callout: `## BOARD.md
- [ ] S1 Collect: ≥3 sources under vault/sources/
- [ ] S2 Synthesize: ≥2 notes with [[wikilinks]]
- [ ] S3 Open questions / contradictions note
- [ ] S4 Retrieval: new session answers from vault only + file citations`,
        calloutVariant: 'note',
      },
      {
        heading: 'Drill',
        steps: [
          'Use your existing vault path from mastery 08.',
          'Run S1–S4. Tick BOARD.md.',
          'Fail the lab if the agent invents a source not in the vault.',
        ],
      },
    ],
  },
  {
    id: 'remote-access',
    slug: 'remote-access',
    number: '08',
    title: 'Remote shell via mesh',
    subtitle: 'Gateway is chat (mastery 05). This lab is private SSH to a host that already runs Hermes.',
    minutes: 25,
    level: 'advanced',
    tags: ['Remote', 'Tailscale'],
    requires: 'Host already running Hermes (not a fresh install lab)',
    assumes: 'You can already use the agent; you need shell without opening WAN SSH.',
    ifNotHref: '/forge/course/open-harness/05/',
    ifNotLabel: 'Harness 05 — Gateway (chat remote)',
    outcome:
      'SSH over mesh from a second network; hermes status works; remote-access.md notes hostnames; public :22 not required.',
    sections: [
      {
        heading: 'Drill',
        steps: [
          'Install mesh (e.g. Tailscale) on laptop + Hermes host; both online on the tailnet.',
          'SSH via MagicDNS or tailnet IP (keys preferred).',
          'Run hermes status / doctor. Truncated output → remote-access.md (no secrets).',
          'Confirm you did not leave WAN SSH open “for the lab.”',
        ],
        callout: 'Mesh first. Do not disable host firewalls to force success.',
        calloutVariant: 'warning',
      },
    ],
  },
  {
    id: 'failure-studio',
    slug: 'failure-studio',
    number: '09',
    title: 'Failure studio',
    subtitle: 'Break it on purpose: doctor, logs, stuck approvals, bad tool loops — then fix.',
    minutes: 30,
    level: 'after-part-i',
    tags: ['Ops', 'Debug', 'Security'],
    requires: 'Own Your AI Part I (Hermes chats; gateway optional)',
    assumes: 'Desktop or CLI install works on a good day; you have not turned YOLO on for the course.',
    ifNotHref: '/forge/course/open-harness/03/',
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
          { label: 'Harness 10 — Security dials', href: '/forge/course/open-harness/10/' },
          { label: 'Harness 06 — First agency', href: '/forge/course/open-harness/06/' },
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
    id: 'session-control',
    slug: 'session-control',
    number: '10',
    title: 'Session control studio',
    subtitle: 'Long threads without a new session: /context, /compress, /undo, /rollback.',
    minutes: 25,
    level: 'after-part-i',
    tags: ['Sessions', 'Context', 'Ops'],
    requires: 'Own Your AI 06 (tools proof); chat works on Desktop or CLI',
    assumes: 'You can run a multi-turn conversation. You are not learning install here.',
    ifNotHref: '/forge/course/open-harness/06/',
    ifNotLabel: 'Harness 06 — First agency',
    outcome:
      'session-control.md with: context snapshot, one compress result, one undo test, and a one-line note that file restore needs /rollback + checkpoints.',
    sections: [
      {
        heading: 'Why this lab',
        paragraphs: [
          'Mastery 06–07 map session commands. This lab drills them so you stop burning a new session every time the window fills or a prompt goes wrong.',
        ],
        links: [
          { label: 'Harness 06 — First agency', href: '/forge/course/open-harness/06/' },
          { label: 'Harness 07 — Making it remember', href: '/forge/course/open-harness/07/' },
        ],
      },
      {
        heading: 'Commands under test',
        bullets: [
          '/context — budget and what consumes the window',
          '/compress here N — keep last N exchanges full; summarize the rest',
          '/compress focus <topic> — protect a subject while compressing elsewhere',
          '/undo · /undo N — rewind user turns into the composer (conversation only)',
          '/retry · /branch — same prompt again, or a side path without losing the first',
          '/rollback + checkpoints — restore files Hermes already changed (not /undo)',
        ],
        callout:
          '/undo rewinds chat. It does not restore files. For disk damage, use checkpoints and /rollback when enabled.',
        calloutVariant: 'warning',
      },
      {
        heading: 'Drill',
        steps: [
          'Open a throwaway session. Have a 6–10 turn chat about a fake task (no production paths).',
          'Run /context. Paste redacted numbers into session-control.md (tokens used / remaining).',
          'Run /compress here 3 (or Desktop equivalent). Note roughly how much room returned.',
          'Send a deliberately wrong ask, then /undo. Edit and resend a corrected prompt. Confirm prior good turns remain.',
          'Optional: enable checkpoints if available; touch one throwaway file; /rollback and confirm file restore vs /undo.',
          'Write one sentence: when you will use compress vs new session vs undo.',
        ],
      },
      {
        heading: 'session-control.md template',
        callout: `# session-control.md
Profile: [...]
/context: used […] remaining […]
/compress: kept N=… · room after: […]
/undo: worked yes/no · note: […]
Files: /rollback needed for disk — tested yes/no
Rule of thumb: […]
`,
        calloutVariant: 'note',
      },
    ],
  },
  {
    id: 'prompt-budget',
    slug: 'prompt-budget',
    number: '11',
    title: 'Prompt budget audit',
    subtitle: 'Measure fixed empty-session cost; cut tools and skills; re-measure.',
    minutes: 20,
    level: 'after-part-i',
    tags: ['Cost', 'Tools', 'Skills'],
    requires: 'Own Your AI 06; better after 09 skills',
    assumes: 'Primary model works. You can open Tools and Skills panels (or CLI hermes tools / hermes skills).',
    ifNotHref: '/forge/course/open-harness/06/',
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
          { label: 'Harness 06 — Spend / fixed cost', href: '/forge/course/open-harness/06/' },
          { label: 'Harness 09 — Skills', href: '/forge/course/open-harness/09/' },
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
    number: '12',
    title: 'Kanban multi-profile',
    subtitle: 'Enable the official Desktop Kanban plugin; run one card across profiles.',
    minutes: 30,
    level: 'advanced',
    tags: ['Desktop', 'Multi-agent', 'Plugin'],
    requires: 'Own Your AI Part I; two profiles with SOUL optional but recommended',
    assumes: 'Desktop chat works on at least one profile. You are not installing Hermes here.',
    ifNotHref: '/forge/course/open-harness/04/',
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
          { label: 'Harness 12 — Own it forever', href: '/forge/course/open-harness/12/' },
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
