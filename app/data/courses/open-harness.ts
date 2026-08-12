/**
 * Open Harness — curriculum (EN primary; FR fields kept for a later translate job).
 * Sources: Delta V ateliers + official Hermes docs.
 * Voice: formal, concise (offer-card tone). Basics/lexicon first; dedicated host preferred;
 * cloud models = data leaves the machine; everyday PC → Docker or VPS, not bare host.
 */

export type CourseLang = 'en' | 'fr';

export type LocaleString = Record<CourseLang, string>;

export type LexiconCard = {
  term: LocaleString;
  body: LocaleString;
  remember: LocaleString;
};

/** Retrieval drill — equal-length options preferred; UI shuffles order. */
export type CourseQuiz = {
  question: LocaleString;
  options: LocaleString[];
  /** Must match one option’s English string exactly after `t()`. */
  correct: LocaleString;
  explain: LocaleString;
};

/** Display hint only — there is no syntax highlighting, by design. */
export type CodeLang = 'sh' | 'ps' | 'text' | 'md' | 'json' | 'yaml' | 'env';

/**
 * A command the reader is meant to run, with a copy button.
 *
 * `code` is deliberately NOT a LocaleString: a shell command is identical in
 * every language, and a two-locale field is an invitation for a translator to
 * break it. Three OS variants = three consecutive blocks with a `label`, not a
 * tab strip — no client state, and it still reads with JavaScript disabled.
 */
export type CourseCodeBlock = {
  /** Row above the block: "macOS", "Paste this into Hermes". */
  label?: LocaleString;
  lang?: CodeLang;
  /** Verbatim, exactly what the reader should end up with. */
  code: string;
  /** What the button copies, when it differs from what is shown. */
  copy?: string;
  /** Third-party commands MUST cite the doc URL they came from here. */
  note?: LocaleString;
};

export type CourseLink = { label: LocaleString; href: string };

/** One beat of a procedure: an imperative line, optionally a command to run. */
export type CourseStep = {
  title: LocaleString;
  code?: CourseCodeBlock;
  note?: LocaleString;
};

/**
 * Ordered content. The flat key-bag below renders in a hard-coded order, so an
 * author can never write "paragraph → command → paragraph → command" — the
 * shape of every install lesson. A block list restores that, and the renderer's
 * exhaustive `switch` makes an unhandled kind a compile error instead of a
 * silently blank section (which is exactly how `paths` and `termChips` rotted).
 *
 * `id` on steps/checklist carries the OLD section index, because progress is
 * persisted under `dv-check:{course}:{module}:{id}`. Change it and readers lose
 * their ticks.
 */
export type CourseBlock =
  | { k: 'p'; text: LocaleString; lead?: boolean }
  | { k: 'list'; items: LocaleString[] }
  | { k: 'code'; block: CourseCodeBlock }
  | { k: 'steps'; id: string; items: CourseStep[] }
  | { k: 'checklist'; id: string; items: LocaleString[] }
  | { k: 'callout'; text: LocaleString; variant?: 'note' | 'warning' | 'quote' }
  | { k: 'table'; headers: LocaleString[]; rows: LocaleString[][] }
  | { k: 'quiz'; quiz: CourseQuiz }
  | { k: 'lexicon'; cards: LexiconCard[] }
  | { k: 'links'; label?: LocaleString; items: CourseLink[] }
  | { k: 'refs'; primary?: CourseLink[]; citations?: LocaleString[] }
  | { k: 'figure'; variant: string };

export type CourseSection = {
  heading: LocaleString;
  /** Ordered content. The only content key — see CourseBlock. */
  blocks: CourseBlock[];
  /**
   * Alternate host / install setup (Docker, VPS, remote backends, always-on).
   * Collapsed by default. Not normal pedagogy — only infrastructure options.
   */
  advanced?: boolean;
};

/** Compressed terms for the printable glossary page (and /teach parity). */
export type GlossaryTerm = {
  id: string;
  term: LocaleString;
  def: LocaleString;
  avoid?: LocaleString;
  group: 'stack' | 'loop' | 'ops' | 'part2';
};

export type CoursePartId = 1 | 2;

export type CourseModule = {
  id: string;
  /** URL segment: "00", "01", ... */
  slug: string;
  number: string;
  /** Which of the two main arcs this module belongs to */
  part: CoursePartId;
  title: LocaleString;
  subtitle: LocaleString;
  minutes: number;
  proof: LocaleString;
  sections: CourseSection[];
  /**
   * Where the module diagram appears.
   * - `top` (default): under the title
   * - number: after that main-section index (0-based, skips advanced)
   * - `none`: no diagram
   */
  /** Runnable command shown directly under the deck, before the first section. */
  hero?: CourseCodeBlock;
  visualPlacement?: 'top' | 'none' | number;
};

/** EN is source of truth; omit `fr` to mirror EN until a full translate pass. */
const L = (en: string, fr?: string): LocaleString => ({ en, fr: fr ?? en });

export const OPEN_HARNESS_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'llm',
    group: 'stack',
    term: L('LLM'),
    def: L(
      'The language model that plans, drafts, and may request tools. Does not by itself run tools on your disk.',
    ),
    avoid: L('“The AI wrote the file” without naming the harness'),
  },
  {
    id: 'agent',
    group: 'stack',
    term: L('Agent'),
    def: L('Brain + tools + loop. More than a single chat completion.'),
    avoid: L('Agent = any chatbot; Agent = model weights alone'),
  },
  {
    id: 'harness',
    group: 'stack',
    term: L('Harness'),
    def: L(
      'The app that runs the loop, packages messages, runs tools, and applies approvals. Here: Hermes Desktop (+ gateway).',
    ),
  },
  {
    id: 'runtime',
    group: 'stack',
    term: L('Runtime'),
    def: L(
      'The machine (and isolation) where the harness and tools execute. Prefer a dedicated host.',
    ),
  },
  {
    id: 'loop',
    group: 'loop',
    term: L('Think → Act → Observe'),
    def: L(
      'Think = model plans. Act = harness runs tool or final answer. Observe = result/error back for the next Think.',
    ),
    avoid: L('“The loop lives inside the LLM alone”'),
  },
  {
    id: 'tool',
    group: 'ops',
    term: L('Tool'),
    def: L('Structured action the harness can run (list dir, write file, shell, …).'),
  },
  {
    id: 'skill',
    group: 'ops',
    term: L('Skill'),
    def: L('Packaged howto / procedure the agent can load — not the same as executing a tool.'),
  },
  {
    id: 'soul',
    group: 'ops',
    term: L('`SOUL.md`'),
    def: L('Who the agent is: personality and hard limits for a profile. Not project-only rule files.'),
  },
  {
    id: 'dedicated-host',
    group: 'ops',
    term: L('Dedicated host'),
    def: L(
      'Lab machine for the agent cockpit — not the default place for banking, work SSO, and family photos.',
    ),
  },
  {
    id: 'receipt',
    group: 'ops',
    term: L('File receipt'),
    def: L('Proof on disk you open offline (e.g. `agency-receipt.md`). Stronger than chat alone.'),
  },
  {
    id: 'memory',
    group: 'part2',
    term: L('Durable memory'),
    def: L(
      'Facts on disk (`MEMORY.md` / `USER.md`) that reload next session. Not the same as the context window.',
    ),
    avoid: L('Hoping a long chat still “knows” next week'),
  },
  {
    id: 'context',
    group: 'part2',
    term: L('Context window'),
    def: L('Session RAM for the active prompt. Can compress; is not a permanent notebook.'),
  },
  {
    id: 'vault',
    group: 'part2',
    term: L('Vault'),
    def: L('A notes folder (often Obsidian) the harness can search — library floor of memory.'),
  },
  {
    id: 'cron',
    group: 'part2',
    term: L('Cron runbook'),
    def: L(
      'Self-contained scheduled job prompt: host, path, success/failure, as if the agent has amnesia.',
    ),
  },
];

export const OPEN_HARNESS_PARTS: {
  id: CoursePartId;
  code: string;
  title: LocaleString;
  subtitle: LocaleString;
  promise: LocaleString;
  startSlug: string;
  slugs: string[];
}[] = [
  {
    id: 1,
    code: 'I',
    title: L('Working assistant'),
    subtitle: L(
      'Words → install → personality → messaging of your choice → first real action on disk.',
    ),
    promise: L(
      'After Part I: you know Think→Act→Observe, Desktop chat, defined behaviour, private messaging, and a file that proves the agent acted.',
    ),
    startSlug: '00',
    slugs: ['00', '01', '02', '03', '04', '05', '06'],
  },
  {
    id: 2,
    code: 'II',
    title: L('Memory and routines'),
    subtitle: L(
      'Remember facts, use your notes, set safety rules, run one scheduled job, know what to back up.',
    ),
    promise: L(
      'After Part II: lasting preferences, searchable notes, rules you chose, one checklist job, backup map.',
    ),
    startSlug: '07',
    slugs: ['07', '08', '09', '10', '11', '12'],
  },
];

export const OPEN_HARNESS_META = {
  id: 'open-harness',
  href: '/forge/course/open-harness/',
  title: {
    en: 'Open Harness',
    fr: 'Open Harness',
  } satisfies LocaleString,
  tagline: {
    en: 'Learn AI by owning one agent on a host you control — step by step, in plain language.',
    fr: 'Learn AI by owning one agent on a host you control — step by step, in plain language.',
  } satisfies LocaleString,
  description: {
    en: 'Part I: simple words, install Hermes Desktop on a dedicated machine (preferred), give it a personality, reach it from a messaging app you choose, prove it can do a task. Part II: memory, notes, skills, security, and scheduled jobs. Prefer a spare PC or VPS — not the laptop you use every day. Cloud models (OpenRouter / OpenCode) send your conversation content to model hosts; if you stay on a personal machine, isolate with Docker or move the agent to a VPS.',
    fr: 'Part I: simple words, install Hermes Desktop on a dedicated machine (preferred), give it a personality, reach it from a messaging app you choose, prove it can do a task. Part II: memory, notes, skills, security, and scheduled jobs. Prefer a spare PC or VPS — not the laptop you use every day. Cloud models (OpenRouter / OpenCode) send your conversation content to model hosts; if you stay on a personal machine, isolate with Docker or move the agent to a VPS.',
  } satisfies LocaleString,
  verifiedAsOf: '2026-08-06',
  revision: 'mvp-forge-2026-08',
} as const;

export const UI_COPY = {
  modules: { en: 'Lessons', fr: 'Lessons' },
  start: { en: 'Start from the beginning', fr: 'Start from the beginning' },
  startPart2: { en: 'Part II (after Part I)', fr: 'Part II (after Part I)' },
  next: { en: 'Next lesson', fr: 'Next lesson' },
  prev: { en: 'Previous', fr: 'Previous' },
  proof: { en: 'You are done when', fr: 'You are done when' },
  minRead: { en: 'min', fr: 'min' },
  backCourse: { en: 'Open Harness', fr: 'Open Harness' },
  backForge: { en: 'Forge', fr: 'Forge' },
  syllabus: { en: 'All lessons', fr: 'All lessons' },
  outcomes: { en: 'What this gives you', fr: 'What this gives you' },
  part: { en: 'Part', fr: 'Part' },
  langEn: { en: 'EN', fr: 'EN' },
  langFr: { en: 'FR', fr: 'FR' },
  downloadSoul: { en: 'Download template', fr: 'Download template' },
  downloadDesktop: { en: 'Download Hermes Desktop', fr: 'Download Hermes Desktop' },
  resources: { en: 'Resources', fr: 'Resources' },
  courseLabel: { en: 'Free course · Beginner-friendly', fr: 'Free course · Beginner-friendly' },
  glossary: { en: 'Glossary', fr: 'Glossary' },
  quiz: { en: 'Check yourself', fr: 'Check yourself' },
  primarySource: { en: 'Primary source', fr: 'Primary source' },
  winWhen: { en: 'You win when', fr: 'You win when' },
  remember: { en: 'Remember', fr: 'Remember' },
} as const;

/** Official Desktop download / product home — used on landing + install. */
export const HERMES_DESKTOP_URL = 'https://hermes-agent.nousresearch.com/';
export const NOUS_RESEARCH_URL = 'https://nousresearch.com/';
export const HERMES_DOCKER_DOCS =
  'https://hermes-agent.nousresearch.com/docs/user-guide/docker';
export const HERMES_INSTALL_DOCS =
  'https://hermes-agent.nousresearch.com/docs/getting-started/installation';

/** Free / low-cost model routes recommended in this course (beginner day one). */
export const OPENROUTER_URL = 'https://openrouter.ai/';
export const OPENROUTER_SIGNUP_URL = 'https://openrouter.ai/';
/** Free models search on OpenRouter (catalog filter). */
export const OPENROUTER_FREE_MODELS_URL = 'https://openrouter.ai/models?q=free';
export const OPENROUTER_KEYS_URL = 'https://openrouter.ai/keys';
export const OPENCODE_SIGNUP_URL = 'https://opencode.ai/auth';
export const HERMES_PROVIDERS_DOCS =
  'https://hermes-agent.nousresearch.com/docs/integrations/providers';

/** Delta V SOTA preferences (lesson 02) — editorial, not exclusive. */
export const HUGGINGFACE_MODELS_URL = 'https://huggingface.co/models';
export const HUGGINGFACE_URL = 'https://huggingface.co/';
/** Swiss hoster — privacy-friendly jurisdiction for VPS / cloud. */
export const INFOMANIAK_URL = 'https://www.infomaniak.com/en';
/** Privacy-oriented / less-censored cloud inference. */
export const VENICE_AI_URL = 'https://venice.ai/';
export const DELTAV_CONTACT_HARNESS = '/contact/?topic=open-harness';

export const OPEN_HARNESS_MODULES: CourseModule[] = [
  // ─── 00 ─────────────────────────────────────────────
  {
    id: 'welcome',
    slug: '00',
    number: '00',
    part: 1,
    title: L('Welcome — Open Harness'),
    subtitle: L(
      'What you will be able to do, how the course is ordered, and how to work through each lesson.',
    ),
    minutes: 5,
    /** Diagram sits with “Course structure”, after clear outputs */
    visualPlacement: 1,
    proof: L(
      'You can name one concrete output for **Part I** and one for Part II, and you know the next lesson is the lexicon (01).',
    ),
    sections: [
      {
        heading: L('Clear outputs'),
        blocks: [
          { k: 'p', text: L(
            'This course teaches you to run a **personal AI assistant** you control ([Hermes Desktop](https://hermes-agent.nousresearch.com/docs/)), with optional free cloud models. Prefer a dedicated machine (spare PC or VPS) — not the computer that holds your daily life. Below is what you can do after each part — not slogans.',
          ) },
          { k: 'table', headers: [L('When'), L('You can')], rows: [
            [
              L('After Part I'),
              L(
                '**Install** Hermes on a host you chose on purpose; chat with a free model; set how the assistant behaves; message it from an app you choose; leave a file on disk that proves it acted.',
              ),
            ],
            [
              L('After Part II'),
              L(
                'Keep **facts that survive next week**; use a notes folder; set clear yes/no rules for risk; run one scheduled checklist job; know which folders to copy for backup.',
              ),
            ],
          ] },
          { k: 'checklist', id: '0', items: [
          L('I understand **Part I** ends with a working assistant + a file receipt'),
          L('I understand **Part II** is memory, notes, rules, and one routine job'),
        ] },
        ],



      },
      {
        heading: L('Course structure'),
        blocks: [
          { k: 'p', text: L(
            '**Thirteen lessons** in two parts. Finish Part I before Part II. Part II expects: Desktop chat works, a personality file is set, and one messaging surface is trusted.',
          ) },
          { k: 'list', items: [
          L('**00** welcome · 01 lexicon (incl. agent loop) · 02 machine · 03 install · 04 personality · 05 messaging · 06 first action'),
          L('**07** memory · 08 notes folder · 09 skills · 10 safety rules · 11 scheduled job · 12 keep it'),
        ] },
          { k: 'table', headers: [L('Part'), L('Lessons'), L('Focus')], rows: [
            [
              L('I'),
              L('00–06'),
              L(
                '**Words** (stack + Think→Act→Observe + messages) → host + install → personality → pocket messaging → first real action',
              ),
            ],
            [L('II'), L('07–12'), L('**Memory** → notes → skills → safety rules → scheduled job → backup')],
          ] },
          { k: 'callout', variant: 'note', text: L(
          '**Optional labs** exist after Part I for drills. They are not required to finish the main path.',
        ) },
        ],





      },
      {
        heading: L('What this course is (and is not)'),
        blocks: [
          { k: 'p', text: L(
            'Day one is **Hermes Desktop** on a host you chose for the agent. Free model accounts ([OpenRouter](https://openrouter.ai/) and/or [OpenCode](https://opencode.ai/auth)) are set up at install if you use cloud brains. We teach vocabulary before install so Settings screens make sense — and we tell you honestly what leaves your machine.',
          ) },
          { k: 'list', items: [
          L('**Is:** a free path to own one agent — plus plain-language agent fundamentals (loop, messages, tools)'),
          L('**Is:** proofs on disk (files, settings, backups), not only chat cleverness'),
          L('**Is not:** a green light to run a tool-using agent on the same laptop as banking, work SSO, and family photos'),
          L('**Is not:** a Python coding bootcamp or a framework comparison course (we stay on Hermes)'),
          L('**Is not:** a guarantee of income, AGI, or a set-and-forget public bot'),
          L('**Cloud models:** conversation content (and tool context) is sent to the model host — treat it as leaving your machine'),
          L('**UI labels** follow official [Hermes docs](https://hermes-agent.nousresearch.com/docs/) and may change; docs win when labels move'),
        ] },
        ],


      },
      {
        heading: L('How to follow'),
        blocks: [
          { k: 'list', items: [
          L('Do lessons **in order**. Each ends with a short “you are done when” check.'),
          L('Do **not skip 01** unless you can already explain agent vs chat, harness vs runtime, and Think → Act → Observe (the [printable glossary](/forge/course/open-harness/glossary/) helps).'),
          L('Pick your **host** in lesson 02 before install (dedicated machine preferred).'),
          L('**Next:** lesson 01 — lexicon (stack, loop, messages, then the rest).'),
        ] },
          { k: 'links', items: [
          { label: L('Printable glossary'), href: '/forge/course/open-harness/glossary/' },
        ] },
        ],


      },
    ],
  },

  // ─── 01 ─────────────────────────────────────────────
  {
    id: 'lexicon',
    slug: '01',
    number: '01',
    part: 1,
    title: L('Lexicon', 'Le lexique'),
    subtitle: L(
      'Words you will meet often. First pass = the short “remember” lines; details wait for later lessons.',
      'Mots que tu croiseras souvent. Premier passage = les courtes lignes « remember » ; le détail vient plus tard.',
    ),
    minutes: 25,
    /** Diagrams sit under the sections they clarify — not in a pile under the title */
    visualPlacement: 'none',
    proof: L(
      'You can say, in plain words: **LLM / agent / harness / runtime**, Think → Act → Observe (who does each step), context vs memory, and tool vs skill — even if plugin/MCP still feel fuzzy.',
      'Tu peux dire en mots simples : **LLM / agent / harness / runtime**, **Think → Act → Observe**, **contexte vs mémoire**, et **outil vs skill** — même si plugin/MCP restent flous.',
    ),
    sections: [
      {
        heading: L('How to read this lesson'),
        blocks: [
          { k: 'p', text: L(
            'This page is dense on purpose — it is a **dictionary for the course**, not a novel. Use it like a map:',
          ) },
          { k: 'list', items: [
          L('**First pass:** read each section’s short intro + the remember line on each card. Skip deep detail if your eyes glaze over.'),
          L('**Second pass (or later):** re-open a card when a later lesson names that word (install, SOUL, tools…).'),
          L('Order still helps: **stack → loop → messages → cost → mind → tools → reach → chat vs harness**.'),
          L('Diagrams sit **under** the idea they lock in — not as a separate tour at the top.'),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'You do **not** need to memorize every term today. You need four pillars (stack), the loop, and “chat vs harness.” The rest is there so Settings and docs stop sounding like alien code.',
        ) },
        ],




      },
      {
        heading: L('1 · Core stack (read first)'),
        blocks: [
          { k: 'p', text: L(
            'Four words name almost everything in this course. Worth learning early — they are how we talk about **brain**, system, app, and machine.',
          ) },
          { k: 'lexicon', cards: [
          {
            term: L('LLM', 'LLM'),
            body: L(
              'Large Language Model — predicts the next bit of text. Pure chat is mostly **text in → text out**. It can *sound* smart without ever touching your files. In an agent setup it is only the brain.',
              'Large Language Model — prédit du texte. Un chat pur = surtout **texte → texte**. Peut *paraître* malin sans toucher tes fichiers. Dans un agent ce n’est que le **cerveau**.',
            ),
            remember: L('LLM = brain only.', 'LLM = cerveau seulement.'),
          },
          {
            term: L('Agent', 'Agent'),
            body: L(
              'A **system**: LLM brain plus tools and memory, driven by a loop the app runs (Think → Act → Observe). The loop is around the model, not a secret chip inside the weights.',
              'Un **système** : cerveau LLM **plus** outils et mémoire, avec une **boucle** (Think → Act → Observe). La boucle est **autour** du modèle, pas dans les poids.',
            ),
            remember: L('Agent = brain + tools + loop.', 'Agent = cerveau + outils + boucle.'),
          },
          {
            term: L('Harness', 'Harness'),
            body: L(
              'The app frame that **runs** the loop: messages, tools, approvals, memory, gateway. [Hermes Desktop](https://hermes-agent.nousresearch.com/) is that frame on your machine — what you control.',
              'Le cadre applicatif qui **fait tourner** la boucle : messages, outils, approbations, mémoire, gateway. Hermes Desktop est ce cadre.',
            ),
            remember: L('Harness = the app that runs the loop.', 'Harness = l’app qui fait la boucle.'),
          },
          {
            term: L('Runtime', 'Runtime'),
            body: L(
              'Where the process lives: spare PC, VPS, container… We prefer a **dedicated** machine, not the laptop that holds your whole life. Different idea from “brain” or “app design.”',
              'Où tourne le process : PC dédié, VPS, conteneur… On préfère une machine **dédiée**. Autre idée que le cerveau ou le design de l’app.',
            ),
            remember: L('Runtime = the machine.', 'Runtime = la machine.'),
          },
        ] },
          { k: 'callout', variant: 'note', text: L(
          'One line: **LLM** thinks · harness runs tools · agent is the whole loop · runtime is the box. Next: the loop itself.',
        ) },
        ],




      },
      {
        heading: L('2 · The agent loop (not the LLM alone)'),
        blocks: [
          { k: 'p', lead: true, text: L(
          'The loop is not “inside the LLM alone.” Operators name who does Think vs Act vs Observe.',
        ) },
          { k: 'p', text: L(
            '**First pass:** three beats. Think (model plans) → Act (app runs a tool or answers) → Observe (result goes back into the chat for the next Think).',
          ) },
          { k: 'p', text: L(
            'That cycle is how an **agent system** works. It is not a hidden loop living only inside the LLM. Chat-in-a-browser without real host tools is mostly Think → reply.',
          ) },
          { k: 'p', text: L(
            'Theory peer (vocabulary only): [Hugging Face Agents Course Unit 1](https://huggingface.co/learn/agents-course/unit1/agent-steps-and-structure) uses Thought–Action–Observation. On Hermes, **Act** is the harness on your host — re-ground ops here, not on a generic framework.',
          ) },
          { k: 'table', headers: [L('Who'), L('Beat'), L('What happens')], rows: [[L('Think · LLM'), L('Plans the next move'), L('Maybe asks for a tool, or drafts a final answer. Think lives in the model’s reply.')], [L('Act · Harness'), L('Actually runs the tool — or sends the final answer'), L('Harness (+ tools on the machine). Approvals may stop a risky act here.')], [L('Observe · Harness → LLM'), L('Puts the tool result (or error) back into the conversation'), L('That observation feeds the next Think. Errors count as observations too.')]] },
          { k: 'table', headers: [L('Step'), L('Who'), L('In plain words')], rows: [
            [
              L('**Think**'),
              L('**LLM**'),
              L('Plans the next move — maybe asks for a tool'),
            ],
            [
              L('**Act**'),
              L('**Harness** (+ tools on the machine)'),
              L('Actually runs the tool, or sends the final answer'),
            ],
            [
              L('**Observe**'),
              L('**Harness** → next LLM call'),
              L('Puts the tool result (or error) back into the conversation'),
            ],
          ] },
          { k: 'lexicon', cards: [
          {
            term: L('Think'),
            body: L(
              'The model plans: what next, which tool, when to stop. You usually see this as the next reply or a tool request — not a separate “loop chip” inside the model.',
            ),
            remember: L('Think = model plans.', 'Think = le modèle planifie.'),
          },
          {
            term: L('Act'),
            body: L(
              'Something happens outside pure text: write a file, run a command, call a service — or just answer. Approvals and host safety apply here.',
            ),
            remember: L('Act = app (or final answer).', 'Act = l’app (ou la réponse).'),
          },
          {
            term: L('Observe'),
            body: L(
              'The tool result or error is pasted back into the chat so the next Think is grounded. No observe → higher chance of invention.',
            ),
            remember: L('Observe = result back into chat.', 'Observe = résultat revenu dans le chat.'),
          },
          {
            term: L('Planning'),
            body: L(
              'Choosing steps, then re-planning after each Observe. You help with a clear goal, constraints, and “done when.” (Fine print; the three steps above are enough for pass one.)',
            ),
            remember: L('Plan → act → check → re-plan.', 'Planifier → agir → vérifier → replanifier.'),
          },
        ] },
          { k: 'callout', variant: 'note', text: L(
          'Think = model plans. Act = app (or final answer). Observe = result back into chat.',
        ) },
          { k: 'callout', variant: 'note', text: L(
          'Mnemonic: **LLM thinks · harness acts · harness observes · LLM thinks again.** That whole cycle is the agent. You will feel it in lesson 06 with a real file.',
        ) },
          { k: 'list', items: [
          L('I can walk Think → Act → Observe once out loud'),
          L('I assign Think to the LLM and Act/Observe packaging to the harness'),
        ] },
          { k: 'quiz', quiz: {
            question: L('Who typically executes a file-write tool call?'),
            options: [
              L('The LLM weights alone'),
              L('The harness on the host'),
              L('The model vendor chat UI'),
              L('The system prompt alone'),
            ],
            correct: L('The harness on the host'),
            explain: L(
              'Think requests the tool; Act is the harness + tools on your runtime. The loop is not “inside the LLM alone.”',
            ),
          } },
          { k: 'quiz', quiz: {
            question: L('A tool returns “permission denied.” What is that?'),
            options: [
              L('Noise to ignore always'),
              L('Proof the LLM is broken'),
              L('An observation for re-plan'),
              L('A system role rewrite'),
            ],
            correct: L('An observation for re-plan'),
            explain: L(
              'Errors are observations. Good agents re-plan; inventing success is the failure mode.',
            ),
          } },
          { k: 'refs', primary: [
          {
            label: L('HF Unit 1 · Thought–Action–Observation (theory peer)'),
            href: 'https://huggingface.co/learn/agents-course/unit1/agent-steps-and-structure',
          },
          {
            label: L('Hermes tools (ops — re-ground here)'),
            href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools',
          },
        ], citations: [L('OH-01 · agent loop'), L('HF-U1-LOOP · theory only')] },
          { k: 'figure', variant: 'lexicon-loop' },
        ],













      },
      {
        heading: L('3 · Messages (who said what)'),
        blocks: [
          { k: 'p', text: L(
            '**First pass — one idea:** the model only sees a list of messages (“who said what”), not your whole computer. Hermes builds that list for you.',
          ) },
          { k: 'p', text: L(
            '**Four roles** (enough for now):',
          ) },
          { k: 'list', items: [
          L('You almost never type “system:” yourself — the app does that packaging'),
          L('When a tool runs, the next useful bit is often the **tool** message, not only your original ask'),
          L('**Later (optional):** special tokens / chat templates are how models mark roles under the hood — ignore until you care about APIs'),
        ] },
          { k: 'table', headers: [L('Role'), L('Plain meaning')], rows: [
            [L('**System**'), L('Standing instructions (personality, rules, tools list) — includes what we later call **SOUL**')],
            [L('**User**'), L('You: the goal and constraints')],
            [L('**Assistant**'), L('The model: plan, question, answer, or “please run this tool”')],
            [L('**Tool**'), L('What the tool returned (or an error) — food for the next Think')],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Browser chat hides this list. A harness surfaces tool results so the agent can **Observe** instead of guessing.',
        ) },
        ],





      },
      {
        heading: L('4 · Models, cost, and keys'),
        blocks: [
          { k: 'p', text: L(
            'Short section: how you pay for the brain and where secrets live. One cloud rule: **conversation content can leave your machine**.',
          ) },
          { k: 'lexicon', cards: [
          {
            term: L('Token', 'Token'),
            body: L(
              'Billing unit for model input/output — roughly part of a word. Free tiers still have limits.',
              'Unité de facturation — grosso modo une fraction de mot. Les offres gratuites ont aussi des limites.',
            ),
            remember: L('Tokens ≈ cost meter.', 'Tokens ≈ compteur de coût.'),
          },
          {
            term: L('Cloud model', 'Modèle cloud'),
            body: L(
              'Brain runs at a provider ([OpenRouter](https://openrouter.ai/), [OpenCode](https://opencode.ai/auth), …). Convenient; **prompts and replies leave the host**.',
              'Cerveau chez un fournisseur. Pratique ; **les échanges sortent de la machine**.',
            ),
            remember: L('Cloud = data can leave.', 'Cloud = les données peuvent sortir.'),
          },
          {
            term: L('Local model', 'Modèle local'),
            body: L(
              'Weights run on hardware you control. Different cost (GPU/time). Optional later — not day one.',
              'Poids sur ton matériel. Coût différent (GPU/temps). Optionnel plus tard.',
            ),
            remember: L('Local = stays on your side.', 'Local = reste chez toi.'),
          },
          {
            term: L('API key', 'Clé API'),
            body: L(
              'Secret that proves “this is me” to a provider. If it leaks, someone can spend in your name.',
              'Secret d’accès fournisseur. Fuite = dépenses à ton nom.',
            ),
            remember: L('Keys never in chat or git.', 'Jamais de clé dans le chat ou git.'),
          },
          {
            term: L('`.env`', '.env'),
            body: L(
              'Local file for secrets, kept out of git. Programs read keys from there.',
              'Fichier local pour secrets, hors git.',
            ),
            remember: L('Secrets in `.env`, not notes.', 'Secrets dans .env, pas dans les notes.'),
          },
        ] },
        ],


      },
      {
        heading: L('5 · Mind: now vs later'),
        blocks: [
          { k: 'p', text: L(
            '**First pass — two boxes:** what the model sees right now (session), vs what you write down to keep (files on disk).',
          ) },
          { k: 'lexicon', cards: [
          {
            term: L('Context', 'Contexte'),
            body: L(
              'What is in the current chat window for the model — session “RAM.” Close or compress the thread and it fades.',
              'Ce qui est dans la fenêtre de chat actuelle — « RAM » de session. Fermer ou compresser efface.',
            ),
            remember: L('Context = this session.', 'Contexte = cette session.'),
          },
          {
            term: L('Memory', 'Mémoire'),
            body: L(
              'Facts you (or the agent) **write to disk** so they can load again next week — e.g. MEMORY.md. Different from “it was in the chat yesterday.”',
              'Faits **écrits sur disque** pour la semaine prochaine — ex. MEMORY.md. Pas la même chose que « c’était dans le chat hier ».',
            ),
            remember: L('Memory = written down.', 'Mémoire = écrit quelque part.'),
          },
          {
            term: L('SOUL', 'SOUL'),
            body: L(
              'Plain idea: a short **identity file** — name, tone, hard limits (“never delete without asking”). Lives with the Hermes profile on the host. You will set this in lesson 04; for now just know the word means “who this agent is supposed to be.”',
              'Idée simple : un petit **fichier d’identité** — nom, ton, limites. Tu le poseras en leçon 04 ; pour l’instant retiens « qui est cet agent ».',
            ),
            remember: L('SOUL = personality file (lesson 04).', 'SOUL = fichier de personnalité (leçon 04).'),
          },
          {
            term: L('Hallucination', 'Hallucination'),
            body: L(
              'When evidence is missing, the model still sounds sure. Files and tool results reduce that risk — they don’t delete it.',
              'Sans preuve, le modèle peut sonner sûr. Fichiers et résultats d’outils réduisent le risque.',
            ),
            remember: L('No evidence → invention risk.', 'Sans preuve → risque d’invention.'),
          },
        ] },
          { k: 'callout', variant: 'note', text: L(
          'Context vs memory is the mix-up that bites beginners most. SOUL is just “standing personality” — full how-to comes later.',
        ) },
        ],




      },
      {
        heading: L('6 · Tools, skills, and (later) services'),
        blocks: [
          { k: 'p', text: L(
            '**First pass — only two words:** tool = something the app can *do* (write a file, list a folder). Skill = a *howto* package that teaches the agent how to use tools for a job. Everything else can wait.',
          ) },
          { k: 'table', headers: [L('Word'), L('First-pass meaning'), L('Meet later when…')], rows: [
            [
              L('**Tool**'),
              L('Callable action — the Act step'),
              L('You open Tools in Desktop (lesson 06)'),
            ],
            [
              L('**Skill**'),
              L('Howto / procedure file (`SKILL.md`)'),
              L('You trim or add skills (lesson 09)'),
            ],
            [
              L('**Plugin**'),
              L('Extra UI inside Hermes Desktop'),
              L('You enable Desktop extras'),
            ],
            [
              L('**MCP**'),
              L('Plug for an outside service (docs, repos…)'),
              L('You need a live external system — not day one'),
            ],
          ] },
          { k: 'lexicon', cards: [
          {
            term: L('Tool', 'Outil'),
            body: L(
              'Something Hermes can **run**: a name, some inputs, a result or error. Hands of the agent, listed in the [Hermes tools docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools). Output feeds Observe.',
              'Ce que Hermes peut **lancer** : nom, entrées, résultat ou erreur. Les mains de l’agent.',
            ),
            remember: L('Tool = do it.', 'Tool = le faire.'),
          },
          {
            term: L('Tool call', 'Appel d’outil'),
            body: L(
              'The model asks for a tool with structured inputs; Hermes runs it (sometimes after you approve); the result comes back as a tool message.',
              'Le modèle demande un outil ; Hermes exécute (parfois après toi) ; le résultat revient en message.',
            ),
            remember: L('Ask → run → result → think again.', 'Demande → run → résultat → re-think.'),
          },
          {
            term: L('Skill', 'Skill'),
            body: L(
              'A reusable howto (often `SKILL.md`). Helps Think pick good steps. It does not replace tools — it teaches when and how to use them.',
              'Un mode d’emploi réutilisable. Aide le **Think**. Ne remplace pas les outils.',
            ),
            remember: L('Skill = howto.', 'Skill = mode d’emploi.'),
          },
          {
            term: L('Plugin', 'Plugin'),
            body: L(
              'Optional Desktop add-on (extra UI or product feature). Not required to finish Part I. Skip the card on first pass if it feels like noise.',
              'Add-on Desktop optionnel. Pas requis pour Partie I. Skip au premier passage si ça bruit.',
            ),
            remember: L('Plugin = Desktop extra (later).', 'Plugin = extra Desktop (plus tard).'),
          },
          {
            term: L('MCP', 'MCP'),
            body: L(
              'A standard way to plug external services. Powerful and another trust surface. You can finish early lessons **without** MCP.',
              'Brancher des services externes. Puissant + surface de confiance. Les premières leçons s’en passent.',
            ),
            remember: L('MCP = external plug (later).', 'MCP = prise externe (plus tard).'),
          },
        ] },
          { k: 'callout', variant: 'note', text: L(
          'If install “everything,” empty sessions get expensive and the model thrashes. Prefer few tools, few skills, clear jobs.',
        ) },
        ],





      },
      {
        heading: L('7 · Reach outside the Desktop window'),
        blocks: [
          { k: 'p', text: L(
            'Optional on first pass. Two words for “work when you are not staring at the app.” Full how-to is lessons 05 and 11.',
          ) },
          { k: 'lexicon', cards: [
          {
            term: L('Gateway', 'Gateway'),
            body: L(
              'Bridge so the harness can answer from a messaging app (Telegram and others). Only allowlisted people may talk. Setup is lesson 05.',
              'Pont vers une messagerie. Seulement des gens allowlistés. Setup = leçon 05.',
            ),
            remember: L('Gateway = pocket access (later).', 'Gateway = accès de poche (plus tard).'),
          },
          {
            term: L('Cron', 'Cron'),
            body: L(
              'A job on a schedule (e.g. weekday morning summary). Needs a host that is awake. Lesson 11.',
              'Tâche planifiée. L’hôte doit être allumé. Leçon 11.',
            ),
            remember: L('Cron = scheduled job (later).', 'Cron = tâche planifiée (plus tard).'),
          },
        ] },
        ],


      },
      {
        heading: L('Chat product vs harness agent'),
        blocks: [
          { k: 'p', text: L(
            'Modern browser chat (ChatGPT and friends) can already use **some** tools. The useful contrast is not “they never touch tools” — it is who owns the loop, the files, and the host.',
          ) },
          { k: 'table', headers: [L('Browser chat (e.g. ChatGPT)'), L('Agent on your harness')], rows: [
            [
              L('Tools are **their** product features, on their servers'),
              L('Tools run under **your** harness on your runtime (files, shell, …)'),
            ],
            [
              L('History lives in **their** account — you export if they let you'),
              L('Facts and receipts can live as **files you open offline**'),
            ],
            [
              L('Limits and policies are **vendor** defaults'),
              L('Identity, approvals, allowlists are **yours** to set (SOUL, security)'),
            ],
            [
              L('Great for quick answers and hosted workflows'),
              L('Built for **persistence**, multi-step work, and local control'),
            ],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Motivation, not trash-talk: when you need **your disk**, your rules, and a loop you can audit, you want an agent on a harness you own — not only a tab that forgets when the account does.',
        ) },
          { k: 'checklist', id: '8', items: [
          L('I can explain **LLM / agent / harness / runtime** in plain words'),
          L('I can walk **Think → Act → Observe** once (who does Think vs Act)'),
          L('I know **context** (this chat) vs memory (written down)'),
          L('I know **tool** (do it) vs skill (howto) — plugin/MCP can stay fuzzy for now'),
          L('I can say what is different about a **harness on my host** vs browser chat'),
        ] },
          { k: 'figure', variant: 'lexicon-chat-vs-agent' },
        ],




        /** Final map: chat product vs harness agent (not under the title) */


      },
    ],
  },

  // ─── 02 ─────────────────────────────────────────────
  {
    id: 'runtime',
    slug: '02',
    number: '02',
    part: 1,
    title: L('Your machine + Desktop'),
    subtitle: L(
      'Baseline: dedicated hardware. Then Delta V SOTA prefs (Nous + VPS, open weights, Swiss host, Venice). Exceptions only if you must.',
    ),
    minutes: 10,
    proof: L(
      'You are on **dedicated hardware** (or a named exception), you can name one Delta V SOTA preference you might use later (Nous, HF, Infomaniak, Venice, Docker), and you know cloud chats leave the host.',
    ),
    sections: [
      {
        heading: L('Baseline: dedicated hardware'),
        blocks: [
          { k: 'p', text: L(
            'This course assumes you install Hermes on a **machine that exists for the agent** — a spare PC, mini-PC, old laptop wiped for this purpose, or similar. Not the computer that holds banking, work SSO, password vaults, and family photos.',
          ) },
          { k: 'p', text: L(
            'Why: once tools are on, the agent can act like a **capable operator with a shell** on that OS. Treat the host as something you can wipe and rebuild without wrecking daily life.',
          ) },
          { k: 'list', items: [
          L('**Windows, macOS, or Linux** Desktop as offered for your build'),
          L('**Hermes home** is a folder on that host — you back up by copying folders'),
          L('Next lesson (**03**) installs Desktop on this box'),
        ] },
          { k: 'table', headers: [L('On that machine'), L('Why')], rows: [
            [L('**Hermes Desktop**'), L('Cockpit for chat, profiles, tools, gateway, cron (this course)')],
            [L('Course files only'), L('Proofs, notes, samples — not your whole digital life')],
            [L('Power when needed'), L('Host awake when gateway or cron must answer')],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Spare machine already ready? You have the baseline. Read **SOTA preferences** so you know what we recommend when you grow past free day-one models — then go to install.',
        ) },
          { k: 'checklist', id: '0', items: [
          L('I have (or will use) a **dedicated** machine for this course'),
          L('I know what does **not** live on that machine'),
        ] },
          { k: 'quiz', quiz: {
            question: L('Default host for this course?'),
            options: [
              L('Any daily banking laptop'),
              L('A dedicated lab machine'),
              L('Public library kiosk only'),
              L('Shared family tablet only'),
            ],
            correct: L('A dedicated lab machine'),
            explain: L('Baseline is dedicated hardware. Daily laptop with banking/SSO is not the default.'),
          } },
          { k: 'quiz', quiz: {
            question: L('Using free cloud models means…'),
            options: [
              L('Data never leaves your PC'),
              L('Chat content can leave host'),
              L('Files encrypt themselves'),
              L('Gateway is unnecessary'),
            ],
            correct: L('Chat content can leave host'),
            explain: L('Cloud brains send conversation/tool context to the model host. Convenience is not privacy.'),
          } },
        ],







      },
      {
        heading: L('Where the brain runs (day one)'),
        blocks: [
          { k: 'p', text: L(
            'Hermes on your dedicated box is the **cockpit**. Day-one free routes ([OpenRouter](https://openrouter.ai/models?q=free), [OpenCode](https://opencode.ai/auth)) usually run elsewhere. Your prompts, replies, and often tool context leave the host. Useful for learning — not private. Accounts are created at install (03).',
          ) },
          { k: 'list', items: [
          L('**Do not** paste secrets, customer data, or keys into cloud chats “just to try”'),
          L('**Local / open weights** later = different trade-off (see SOTA prefs below)'),
        ] },
          { k: 'links', items: [
          { label: L('OpenRouter free models'), href: OPENROUTER_FREE_MODELS_URL },
          { label: L('OpenCode auth'), href: OPENCODE_SIGNUP_URL },
        ] },
        ],



      },
      {
        heading: L('Delta V SOTA preferences'),
        blocks: [
          { k: 'p', text: L(
            'Editorial stack we actually like for serious use — **not** required on day one. Free OpenRouter/OpenCode still fine for first chat. When you pick a paid, private, or production shape, start here.',
          ) },
          { k: 'list', items: [
          L('**Favourite combo:** [Nous](https://nousresearch.com/) subscription (Portal) for models/tools + agent on a VPS (we like [Infomaniak](https://www.infomaniak.com/en) when you want Swiss jurisdiction)'),
          L('**Open path:** pull open models via [Hugging Face](https://huggingface.co/models) (and run them on dedicated HW / your infra when you can)'),
          L('**Anon / uncensored cloud path:** look at [Venice.ai](https://venice.ai/) as a provider option in Hermes when that fits your policy'),
          L('**Isolation path:** Docker per Hermes docs if the box is not lab-only'),
        ] },
          { k: 'table', headers: [L('Preference'), L('Role'), L('Why we point here')], rows: [
            [
              L('**Nous Research** (Portal) + VPS'),
              L('Subscription models/tools + agent on a server'),
              L('Official Hermes lineage; clean combo: managed brain/tools, process on a host you control'),
            ],
            [
              L('**Hugging Face** / open weights'),
              L('Open models, hubs, local or self-host inference'),
              L('Big open-source ecosystem — prefer open weights when you can run them on dedicated HW or a GPU box'),
            ],
            [
              L('**Infomaniak** (Switzerland)'),
              L('VPS / cloud host'),
              L('Swiss privacy law jurisdiction for the **runtime** when you rent a box instead of a spare PC'),
            ],
            [
              L('**Venice.ai**'),
              L('Privacy-oriented / less-censored cloud models'),
              L('When you want anonymous-leaning or uncensored inference without defaulting to big closed chat apps'),
            ],
            [
              L('**Docker** (Hermes backends)'),
              L('Isolate tool/shell from the host OS'),
              L('If you must share a personal machine: official Hermes Docker / terminal-backend path — not bare host shell'),
            ],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'These are **preferences**, not exclusive contracts. Labels and pricing move — official provider and Hermes docs win. Contact Delta V if you want a tailored multi-host layout.',
        ) },
          { k: 'checklist', id: '2', items: [
          L('I can name at least one SOTA path I might use after free day-one models'),
        ] },
          { k: 'links', items: [
          { label: L('Nous Research'), href: NOUS_RESEARCH_URL },
          { label: L('Hermes (Desktop / docs)'), href: HERMES_DESKTOP_URL },
          { label: L('Hugging Face models'), href: HUGGINGFACE_MODELS_URL },
          { label: L('Infomaniak (CH)'), href: INFOMANIAK_URL },
          { label: L('Venice.ai'), href: VENICE_AI_URL },
          { label: L('Hermes Docker / backends'), href: HERMES_DOCKER_DOCS },
          { label: L('Providers docs'), href: HERMES_PROVIDERS_DOCS },
        ] },
        ],







      },
      {
        heading: L('Exceptions (only if no dedicated hardware)'),
        blocks: [
          { k: 'p', text: L(
            'Baseline is still a spare box. If you truly cannot dedicate hardware:',
          ) },
          { k: 'table', headers: [L('Exception'), L('Do this'), L('Do not')], rows: [
            [
              L('**VPS** (prefer Swiss when privacy matters)'),
              L('Run the agent on a small always-on server (**Infomaniak** is our default pointer); daily laptop is client only'),
              L('Leave SSH open to the world or dump personal secrets onto the VPS'),
            ],
            [
              L('**Personal PC + Docker**'),
              L('Follow **Hermes Docker / terminal backends** so tools do not own your host user'),
              L('Bare host shell next to banking browser and password vault'),
            ],
          ] },
          { k: 'callout', variant: 'warning', text: L(
          'No spare box yet? Pause install, rent a small VPS (or wipe an old machine), then continue. Do not “just try it” bare on the daily laptop.',
        ) },
          { k: 'checklist', id: '3', items: [
          L('I am on **dedicated hardware**, or I named VPS / personal+Docker'),
        ] },
          { k: 'links', items: [
          { label: L('Infomaniak (CH VPS / cloud)'), href: INFOMANIAK_URL },
          { label: L('Hermes Docker / backends'), href: HERMES_DOCKER_DOCS },
          { label: L('Installation (all methods)'), href: HERMES_INSTALL_DOCS },
          { label: L('Contact Delta V — tailored setup'), href: DELTAV_CONTACT_HARNESS },
        ] },
        ],






      },
      {
        heading: L('You are ready for install when'),
        blocks: [
          { k: 'list', items: [
          L('Host path is clear: **dedicated** (default) · VPS · or personal+Docker'),
          L('You accept that **cloud models** send conversation content off the machine'),
          L('You know where to look later for **Nous / HF / Infomaniak / Venice / Docker**'),
          L('Next: lesson **03** — install Hermes on that host and get one chat reply'),
        ] },
        ],

      },
    ],
  },

  // ─── 03 ─────────────────────────────────────────────
  {
    id: 'install',
    slug: '03',
    number: '03',
    part: 1,
    title: L('Install Hermes Desktop'),
    subtitle: L(
      'Install on the host you chose in 02. Connect a free model route if you accept cloud data leaving the box.',
    ),
    minutes: 30,
    proof: L(
      'Hermes chats on your **dedicated host** (or documented exception) using a free OpenRouter or OpenCode model (or another provider you chose).',
    ),
    hero: {
      label: L('Install · Linux, macOS, WSL2'),
      lang: 'sh',
      code: 'curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash',
      note: L(
        'Official one-liner from [the Hermes install docs](https://hermes-agent.nousresearch.com/docs/getting-started/installation). On macOS and Windows the graphical installer is the safer route — lesson 10 tells you not to pipe a remote script into a shell, and that applies here too. Read the script first if you use it.',
      ),
    },
    sections: [
      {
        heading: L('You need'),
        blocks: [
          { k: 'list', items: [
          L('The machine from lesson **02** — [dedicated hardware](~dedicated-host) by default (Windows, macOS, or Linux Desktop as offered)'),
          L('If you took an exception: VPS ready, or personal PC with a Docker isolation plan'),
          L('Network + one free model account (**OpenRouter** and/or OpenCode) if you use cloud brains'),
          L('An email (or Google/GitHub) for those accounts — no coding degree required'),
        ] },
          { k: 'callout', variant: 'warning', text: L(
          'If you skipped lesson 02: stop. Baseline is a **dedicated** box — not “whatever laptop is open.”',
        ) },
        ],



      },
      {
        heading: L('Free models — convenient, not private'),
        blocks: [
          { k: 'p', text: L(
            'Hermes needs a “brain” (a language model). You do not need a paid Claude or ChatGPT API on day one. Free routes from [OpenRouter](https://openrouter.ai/) and/or [OpenCode](https://opencode.ai/auth) work — with a hard truth: chat and tool-related content is sent to those hosts. You are not running a local secret vault; you are streaming inference off-box while the agent may still act on-disk.',
          ) },
          { k: 'list', items: [
          L(
            '**OpenRouter** (common free-model entry) — account → free models list → API key → pick a free model in Hermes',
          ),
          L(
            '**OpenCode** — account → add as a Hermes provider (see Providers docs for key names). Pricing is on OpenCode’s side',
          ),
          L(
            'Pick **one** route first. Stabilize chat before a second provider',
          ),
          L(
            '**Never** paste production secrets, customer dumps, or seed phrases into cloud-model chats',
          ),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'OpenRouter free models rotate and rate-limit. If one is busy, try another free model — that is a model problem, not a reason to skip host isolation. **After** first chat works, grow toward Delta V SOTA prefs from lesson 02: Nous Portal + VPS, Hugging Face open weights, Infomaniak (CH) for the host, Venice.ai for privacy-oriented/uncensored cloud, Docker if tools share a personal machine.',
        ) },
          { k: 'links', items: [
          { label: L('Create OpenRouter account'), href: OPENROUTER_SIGNUP_URL },
          { label: L('OpenRouter free models'), href: OPENROUTER_FREE_MODELS_URL },
          { label: L('OpenRouter API keys'), href: OPENROUTER_KEYS_URL },
          { label: L('Create OpenCode account'), href: OPENCODE_SIGNUP_URL },
          { label: L('Hermes providers docs'), href: HERMES_PROVIDERS_DOCS },
          { label: L('Lesson 02 — SOTA preferences'), href: '/forge/course/open-harness/02/' },
          { label: L('Nous Research'), href: NOUS_RESEARCH_URL },
          { label: L('Hugging Face'), href: HUGGINGFACE_URL },
          { label: L('Venice.ai'), href: VENICE_AI_URL },
          { label: L('Infomaniak (CH)'), href: INFOMANIAK_URL },
        ] },
        ],





      },
      {
        heading: L('Install Desktop (on the chosen host)'),
        blocks: [
          { k: 'p', text: L(
            'Later modules assume this cockpit: chat, profiles, tools, approvals, gateway, and cron — on the **host you selected**, not on a random daily-driver “for now.”',
          ) },
          { k: 'callout', variant: 'note', text: L(
          `Verified path (${OPEN_HARNESS_META.verifiedAsOf}): **Desktop on dedicated hardware** + free OpenRouter or OpenCode models. Cloud chats leave the host. If a wizard label moved, official docs win.`,
        ) },
          { k: 'steps', id: '2-steps', items: [{ title: L('Confirm install target is the **dedicated** host from lesson 02 (or your written exception).') }, { title: L('Open hermes-agent.nousresearch.com and download Hermes Desktop for that OS.') }, { title: L('Install and launch the application.') }, { title: L(
            '**Exception only** (personal PC path): enable Docker / isolated terminal backends before aggressive tools — or use a VPS instead.',
          ) }, { title: L(
            'Create OpenRouter and/or OpenCode account. Store the API key in a password manager — not in chat or git.',
          ) }, { title: L(
            'In Hermes Providers: add OpenRouter (`OPENROUTER_API_KEY`) + a free model when possible — or OpenCode per docs.',
          ) }, { title: L('Stop when chat works. No messaging gateway yet.') }, { title: L('Send: “Reply with one sentence confirming you are online.”') }, { title: L('Optional: health / doctor if shown; fix only what blocks chat.') }] },
          { k: 'checklist', id: '2', items: [
          L('Install is on my **dedicated** host (or named exception)'),
          L('I created an OpenRouter and/or OpenCode account'),
          L('API key is stored safely (not in a public note)'),
          L('Hermes replies once with a free (or chosen) model'),
        ] },
          { k: 'links', items: [
          { label: L('Download Hermes Desktop'), href: HERMES_DESKTOP_URL },
          { label: L('Installation docs'), href: HERMES_INSTALL_DOCS },
          { label: L('Docker guide (exception path)'), href: HERMES_DOCKER_DOCS },
          { label: L('Quickstart'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
          { label: L('Create OpenRouter account'), href: OPENROUTER_SIGNUP_URL },
          { label: L('Create OpenCode account'), href: OPENCODE_SIGNUP_URL },
        ] },
        ],






      },
      {
        heading: L('Settings map (inspect)'),
        blocks: [
          { k: 'p', text: L(
            'After chat works, open Settings once to learn the layout, then continue. Docker backends matter mainly on the **personal-PC exception** ([Hermes Docker docs](https://hermes-agent.nousresearch.com/docs/user-guide/docker)). Later: swap free models for Nous / HF / Venice per lesson 02 SOTA prefs.',
          ) },
          { k: 'list', items: [
          L('Providers / models — OpenRouter, OpenCode first; later Nous, Venice, HF-backed routes (**content leaves if cloud**)'),
          L('Gateway / messaging — lesson 05; leave closed for now'),
        ] },
        ],


      },
      {
        heading: L('Stabilize one free provider'),
        blocks: [
          { k: 'p', text: L(
            'One reliable free path is enough. Do not debug gateway, three API keys, and a second OS install at the same time.',
          ) },
          { k: 'steps', id: '4-steps', items: [{ title: L('Confirm which provider is active (OpenRouter or OpenCode).') }, { title: L('If chat fails: re-check the key; on OpenRouter try another free model from the free list.') }, { title: L('Only after chat is stable, continue to the next lesson.') }] },
          { k: 'links', items: [
          { label: L('OpenRouter free models'), href: 'https://openrouter.ai/models?q=free' },
          { label: L('Hermes providers docs'), href: 'https://hermes-agent.nousresearch.com/docs/integrations/providers' },
        ] },
        ],



      },
      {
        heading: L('Where your files live'),
        blocks: [
          { k: 'p', text: L(
            'Desktop stores the [harness](~harness) on disk on that host ([Hermes home](https://hermes-agent.nousresearch.com/docs/user-guide/configuration) — often `~/.hermes` or under user AppData). Each profile is an isolated home. Back up by copying folders; the same files can move later to another host.',
          ) },
          { k: 'links', items: [
          { label: L('Configuration'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration' },
          { label: L('Updating'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating' },
        ] },
        ],


      },
      {
        heading: L('Optional companions'),
        blocks: [
          { k: 'p', text: L(
            'IDE-shaped coding agents are optional. This course’s home base is Hermes; add companions only after the harness works — and only on the same isolation rules as the host.',
          ) },
        ],

      },
      {
        heading: L('After this proof'),
        blocks: [
          { k: 'p', text: L(
            'Install is complete here. Ops drills (Desktop checklist, key rotation, extra models) belong in [Harness Labs](/forge/course/open-harness/labs/) — after this proof, not instead of it.',
          ) },
          { k: 'links', items: [
          { label: L('Harness Labs'), href: '/forge/course/open-harness/labs/' },
          { label: L('Lab: key rotation'), href: '/forge/course/open-harness/labs/api-key-hygiene/' },
        ] },
        ],


      },
      {
        advanced: true,
        heading: L('Other deploy shapes (reference)'),
        blocks: [
          { k: 'p', text: L(
            'If you need a layout beyond dedicated Desktop / VPS / Docker isolation, map it deliberately or ask for help.',
          ) },
          { k: 'list', items: [
          L('Nous Portal subscription — models + tool gateway under official Portal setup'),
          L('Own infra — local/self-hosted models; Hermes on the same machine or a LAN endpoint'),
          L('Cloud providers — keys in Providers (OpenRouter, OpenCode, and others listed in docs)'),
          L('Multi-machine — split Desktop UI, always-on gateway, and model host across boxes'),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'For a tailored multi-host, team, or hardened layout, contact Delta V — our engineers design and ship Hermes setups beyond this free course.',
        ) },
          { k: 'links', items: [
          { label: L('All install methods'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
          { label: L('Docker guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Providers docs'), href: 'https://hermes-agent.nousresearch.com/docs/integrations/providers' },
          { label: L('Contact Delta V — tailored setup'), href: '/contact/?topic=open-harness' },
        ] },
        ],





      },
    ],
  },

  // ─── 04 ─────────────────────────────────────────────
  {
    id: 'soul',
    slug: '04',
    number: '04',
    part: 1,
    title: L('Soul pack', 'Pack d’âmes'),
    subtitle: L(
      'Write identity into Hermes home. Keep project rules in project context files.',
      'Écris l’identité dans le home Hermes. Garde les règles de projet dans les fichiers de contexte projet.',
    ),
    minutes: 25,
    proof: L(
      'You adopted a personality file for this profile; the agent describes itself and its hard limits in that voice. You know personality files live with the app profile — not inside a random project folder.',
    ),
    sections: [
      {
        heading: L('What `SOUL.md` is', 'Ce qu’est SOUL.md'),
        blocks: [
          { k: 'p', text: L(
            '`SOUL.md` is the agent’s identity file: name, role, tone, hard limits. Hermes treats it as [primary personality](https://hermes-agent.nousresearch.com/docs/user-guide/features/personality). Prefer a short brief (~12–20 lines) over a one-line slogan.',
          ) },
          { k: 'p', text: L(
            'Where it lives: inside this profile’s Hermes home folder on disk (often a .hermes folder under your user account — Desktop shows the profile path). It does not load from a random project folder. That way personality stays stable when you switch folders.',
          ) },
          { k: 'callout', variant: 'quote', text: L(
          'One profile = one home. Two profiles never share personality or memory by accident.',
        ) },
        ],



      },
      {
        heading: L('Personality vs project rules'),
        blocks: [
          { k: 'p', text: L(
            'If it should follow every session → identity file (`SOUL.md`). If it belongs to one repo or campaign → [project rules](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files) (often `AGENTS.md` or `.hermes.md`). Only one project-rules file type loads per session. Identity still loads on its own.',
          ) },
          { k: 'list', items: [
          L('`SOUL.md` — who the agent is (with the profile / Hermes home)'),
          L('`AGENTS.md` or `.hermes.md` — rules for this project only (paths, “never do X”)'),
          L('Temporary personality overlays in chat are not a substitute for `SOUL.md`'),
          L('Review project rule files from repos you did not write — they can inject instructions'),
        ] },
          { k: 'links', items: [
          { label: L('Personality & `SOUL.md`'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/personality' },
          { label: L('Context files'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files' },
          { label: L('Sample `AGENTS.md`'), href: '/courses/open-harness/samples/AGENTS.example.md' },
        ] },
        ],



      },
      {
        heading: L('Ethics in the soul (Delta V)'),
        blocks: [
          { k: 'p', text: L(
            'Every ready-to-adopt [soul](~soul) embeds two compass ideas (inspired by Brian Roemmele’s public writing) that match Delta V ethics: self-ownership, open source, public good, and a benevolent attitude toward people and systems.',
          ) },
          { k: 'list', items: [
          L(
            '[Love equation](https://x.com/BrianRoemmele/status/1991946547182059687) (simplified): emotional / care complexity grows when cooperation outweighs defection — dE/dt = β (C − D) E. In practice: prefer help over harm, honesty over theater, human dignity over clever exploitation.',
          ),
          L(
            '[Joule Work](https://x.com/BrianRoemmele/status/2017995855417225633) (JW): value work by real cost and useful output (energy × efficiency × quality), not hype or status. Prefer reversible, efficient steps; measure what you did; avoid wasteful loops.',
          ),
          L(
            'Together: the agent should be useful and kind under your ownership — open files, open methods where possible, public-good defaults, no manipulative pressure.',
          ),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'These are ethical priors for `SOUL.md`, not a crypto product pitch. Adapt wording; keep the spirit when you edit a template.',
        ) },
          { k: 'links', items: [
          {
            label: L('Roemmele — wisdom / Love equation context (X)'),
            href: 'https://x.com/BrianRoemmele/status/1991946547182059687',
          },
          {
            label: L('Roemmele — JouleWork framing (X)'),
            href: 'https://x.com/BrianRoemmele/status/2017995855417225633',
          },
        ] },
        ],





      },
      {
        heading: L('Ready-to-adopt souls', 'Âmes prêtes à adopter'),
        blocks: [
          { k: 'p', text: L(
            'Each card is one `SOUL.md` template. Read “why choose” before you download. Copy into Hermes home, rename the agent, start a new session — the [official guide](https://hermes-agent.nousresearch.com/docs/guides/use-soul-with-hermes) walks through it. All templates already include Love equation + Joule Work + Delta V ethics blocks — keep them when you edit.',
          ) },
          { k: 'links', label: L('Soul packs'), items: [{ label: L('Orchestrator', 'Orchestrateur'), href: '/courses/open-harness/souls/orchestrator.md' }, { label: L('Analyst', 'Analyste'), href: '/courses/open-harness/souls/analyst.md' }, { label: L('Ops', 'Ops'), href: '/courses/open-harness/souls/ops.md' }, { label: L('Writer', 'Rédacteur'), href: '/courses/open-harness/souls/writer.md' }, { label: L('Coach', 'Coach'), href: '/courses/open-harness/souls/coach.md' }, { label: L('Coder', 'Codeur'), href: '/courses/open-harness/souls/coder.md' }, { label: L('Kids-safe', 'Kids-safe'), href: '/courses/open-harness/souls/kids-safe.md' }, { label: L('Sales', 'Sales'), href: '/courses/open-harness/souls/sales.md' }] },
        ],


      },
      {
        heading: L('Steps', 'Étapes'),
        blocks: [
          { k: 'steps', id: '4-steps', items: [{ title: L('Create or select a profile in Desktop (Profiles).') }, { title: L('Open that profile’s Hermes home and locate `SOUL.md` (not a random project folder).') }, { title: L('Paste a pack soul. Set the name. Keep project paths out of SOUL — use `AGENTS.md` later.') }, { title: L('Start a session and ask: “Who are you and what are your hard limits?”') }, { title: L('Optional: place a short `AGENTS.md` in a real project folder and ask a project-specific question from that directory.') }] },
          { k: 'checklist', id: '4', items: [
          L('I picked a ready-to-adopt soul for a real reason (why choose)'),
          L('The agent answered who it is and its hard limits'),
          L('I know personality file ≠ project rules file'),
        ] },
          { k: 'links', items: [
          { label: L('Use `SOUL.md` guide'), href: 'https://hermes-agent.nousresearch.com/docs/guides/use-soul-with-hermes' },
        ] },
        ],



      },
    ],
  },

  // ─── 05 Gateway (after soul, before deep tools) ─
  {
    id: 'gateway',
    slug: '05',
    number: '05',
    part: 1,
    title: L('Gateway (your pocket surface)'),
    subtitle: L(
      'Chat with your agent from an app you already use. We recommend Telegram; you may use Discord, Slack, Signal, WhatsApp, or another Hermes-supported platform.',
    ),
    minutes: 25,
    proof: L(
      'You sent a message from your chosen messaging app, got a real reply from your profile, and only you (allowlist / pairing) can reach the agent.',
    ),
    sections: [
      {
        heading: L('Why gateway sits here'),
        blocks: [
          { k: 'p', text: L(
            'With Desktop installed and SOUL written, a messaging surface is the fastest proof the harness is real outside the laptop window. Wire one platform before deep tool theory; Part I then expands what the agent can do with hands (tools).',
          ) },
          { k: 'p', text: L(
            'A harness confined to one desktop window is incomplete. Gateway is how you operate from your phone or, later, from an always-on host without daily SSH.',
          ) },
          { k: 'callout', variant: 'note', text: L(
          'Order: Install → Soul → Gateway (one platform) → Tools.',
        ) },
        ],



      },
      {
        heading: L('Pick your surface (you choose)'),
        blocks: [
          { k: 'p', text: L(
            'Hermes supports [many messaging platforms](https://hermes-agent.nousresearch.com/docs/user-guide/messaging) (Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Teams, and more). You are free to use the one that fits your privacy, work, or household. This course does not require Telegram.',
          ) },
          { k: 'list', items: [
          L(
            'Recommended default: [Telegram](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram) — strong adoption, bot setup is common, and threads/topics help keep long agent chats tidy. Good for beginners who already use TG.',
          ),
          L(
            'Strong privacy default: [Signal](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/signal) — when end-to-end culture matters most; setup is usually heavier (signal-cli path).',
          ),
          L(
            'Work defaults: [Slack](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack) or [Discord](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord) — when the agent should live where your team already chats.',
          ),
          L(
            'WhatsApp / others — valid if Hermes lists them in official messaging docs for your build; follow that platform’s page.',
          ),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'One platform is enough for Part I. Do not wire three messengers before tools work.',
        ) },
          { k: 'links', items: [
          { label: L('Messaging overview (all platforms)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging' },
          { label: L('Telegram (recommended path)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram' },
          { label: L('Discord'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord' },
          { label: L('Slack'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack' },
          { label: L('Signal'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/signal' },
          { label: L('WhatsApp'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp' },
        ] },
        ],





      },
      {
        heading: L('Universal trust rules (every platform)'),
        blocks: [
          { k: 'list', items: [
          L('[Allowlist](https://hermes-agent.nousresearch.com/docs/user-guide/security) or pairing so only your account can talk to the agent. If nobody is allowlisted, nobody should get through.'),
          L('Store tokens/secrets in the app env — never in a public channel or git.'),
          L('Do not open the bot to the whole internet “for a test.”'),
          L('Leave Desktop (or the gateway process) running while you prove the first reply.'),
        ] },
          { k: 'callout', variant: 'warning', text: L(
          'Official platform docs win if a button label moved. “Only me” access habits stay the same on every messenger.',
        ) },
          { k: 'links', items: [
          { label: L('Security (allowlists)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
        ] },
        ],




      },
      {
        heading: L('Recommended walkthrough: Telegram'),
        blocks: [
          { k: 'p', text: L(
            'Use this if you chose Telegram. If you chose another platform, skip to that official page and complete the same proof checklist below.',
          ) },
          { k: 'steps', id: '3-steps', items: [{ title: L('Open Telegram → @BotFather → create a bot → copy the token.') }, { title: L('In Hermes Desktop: gateway / messaging → Telegram. Paste the token (env storage).') }, { title: L('Allowlist: only your Telegram user id.') }, { title: L('Start the gateway from Desktop. Leave Desktop running during the test.') }, { title: L('Message the bot. Approve pairing only on your side if a code appears.') }, { title: L('Send: “Who are you and what are your hard limits?” — should match SOUL.') }] },
          { k: 'links', items: [
          { label: L('Telegram setup (official)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram' },
        ] },
        ],



      },
      {
        heading: L('If you chose another platform'),
        blocks: [
          { k: 'steps', id: '4-steps', items: [{ title: L('Open the official Hermes page for Discord, Slack, Signal, WhatsApp, or your pick (links above).') }, { title: L('Create the bot/app or link the device as that page requires.') }, { title: L('Connect credentials in Desktop gateway / messaging for that platform.') }, { title: L('Restrict who can talk (allowlist, admin list, or pairing — whatever the platform supports).') }, { title: L('Send the SOUL check: “Who are you and what are your hard limits?”') }] },
        ],

      },
      {
        heading: L('Runtime notes'),
        blocks: [
          { k: 'list', items: [
          L('The PC must stay awake while this machine hosts the gateway.'),
          L('One profile ≈ one bot/app identity when you need concurrent personas later.'),
          L('You can add a second platform after Part I — not before the tools proof.'),
        ] },
          { k: 'checklist', id: '5', items: [
          L('I named which platform I use for this course'),
          L('Bot/app replies from my profile'),
          L('Only I can reach it (allowlist / pairing)'),
          L('Token/secrets not written into public notes or git'),
        ] },
        ],


      },
      {
        advanced: true,
        heading: L('Other ways to deploy the gateway (later)'),
        blocks: [
          { k: 'p', text: L(
            'Day one: gateway on the same PC as Desktop. Later you can move messaging to an always-on host so the laptop can sleep — same allowlist rules apply.',
          ) },
          { k: 'list', items: [
          L('Same machine — simplest; PC must stay awake'),
          L('VPS / always-on box — gateway process + credentials only on that host'),
          L('Multi-machine — Desktop for control, remote host for 24/7 messaging'),
          L('Nous Portal / cloud tools — separate from “where the gateway process runs”'),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'Need a hardened or multi-host messaging layout? Contact Delta V for a tailored setup by our engineers.',
        ) },
          { k: 'links', items: [
          { label: L('Messaging overview'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging' },
        ] },
        ],





      },
    ],
  },

  // ─── 06 First agency ─────────────────────────
  {
    id: 'agency',
    slug: '06',
    number: '06',
    part: 1,
    title: L('First agency'),
    subtitle: L(
      'Feel Think → Act → Observe on a real task: tools touch disk, you approve risk, a file receipt opens offline.',
    ),
    minutes: 40,
    /** Loop diagram sits under the loop section — not a double stack under the title */
    visualPlacement: 'none',
    proof: L(
      'You completed the Mission of the Day: a markdown receipt on disk, at least one approval decision, a one-line note of which model/provider ran, and a short log of one Think→Act→Observe cycle. Full auto-approve stayed off.',
    ),
    sections: [
      {
        heading: L('What “agency” means here'),
        blocks: [
          { k: 'p', text: L(
            'Chat is answers. Agency is **action under your rules**: the model Thinks, requests [tools](~tool) (Act); Hermes runs them; you approve what is dangerous; Observe feeds results back; you can open the result without trusting the chat alone.',
          ) },
          { k: 'p', text: L(
            'Your messaging app (lesson 05) is a second window, not the proof. Prove hands on Desktop first, then optionally repeat a short check from your phone.',
          ) },
          { k: 'table', headers: [L('Chat only'), L('Agency (this lesson)')], rows: [
            [L('Text in, text out'), L('Tools touch files / shell / browser')],
            [L('You copy-paste results'), L('A file on disk is the receipt')],
            [L('No risk gate'), L('Approvals stop reckless actions')],
            [L('No loop vocabulary'), L('You can name Think → Act → Observe on your run')],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Love / Joule Work: cooperate with the human (approvals, honesty); spend energy only on useful work — not thrashing tools for show.',
        ) },
        ],




      },
      {
        heading: L('Think → Act → Observe on this mission'),
        blocks: [
          { k: 'p', text: L(
            'Before you start, expect this cycle at least once. You do not need to see secret “chain of thought” text — you need to **recognize the steps**.',
          ) },
          { k: 'list', items: [
          L('If a tool **errors**, that error is still an observation — good agents re-plan; bad ones invent success'),
          L('If you **deny** an approval, the observation is “denied” — the model should stop or ask, not sneak around'),
          L('Write three short lines in the receipt after the run: Think (what it planned) · Act (tools you saw) · Observe (what came back)'),
        ] },
          { k: 'table', headers: [L('Step'), L('On today’s mission')], rows: [
            [
              L('**Think**'),
              L('Model plans: list folder → pick three largest → draft archive plan → write file'),
            ],
            [
              L('**Act**'),
              L('Tool calls: list directory, write `agency-receipt.md` (maybe more). Approvals may fire'),
            ],
            [
              L('**Observe**'),
              L('Tool results return (file list, write ok/error). Model uses them for the next step or the final reply'),
            ],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Same as lexicon 01: the loop is **agent/harness-level** (LLM only does Think). Frameworks (smolagents, LangGraph, …) implement that loop differently; Hermes is *your* [harness](~harness) running it on *your* host.',
        ) },
          { k: 'figure', variant: 'lexicon-loop' },
        ],






      },
      {
        heading: L('Anatomy of a tool call (no code required)'),
        blocks: [
          { k: 'p', text: L(
            'A tool is not a vibe. It is a **named action** with arguments and a result. The model proposes the call; Hermes executes; the result becomes a message in the session.',
          ) },
          { k: 'list', items: [
          L('Prefer **small tool surfaces** for this mission: file tools (+ shell only if needed)'),
          L('Structured tools beat long improvised shell when both exist'),
          L('A clear error is better than a silent wrong success'),
        ] },
          { k: 'table', headers: [L('Piece'), L('Meaning'), L('Example')], rows: [
            [L('**Name**'), L('Which tool'), L('list_dir / write_file / run_terminal (names vary by build)')],
            [L('**Arguments**'), L('Structured inputs'), L('path = "/home/you/Downloads"')],
            [L('**Result**'), L('Observation text or error'), L('“3 files: a.zip (90MB) …” or “permission denied”')],
            [L('**Approval**'), L('Human gate on risky acts'), L('You allow write inside folder; deny delete')],
          ] },
          { k: 'links', items: [
          { label: L('Tools docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
        ] },
        ],




      },
      {
        heading: L('Mission of the Day (one story)'),
        blocks: [
          { k: 'p', text: L(
            'Pick a real folder you own (Downloads or a course notes folder). Goal: leave behind one markdown file you can open in any editor — not a clever chat monologue. Name your agent in the receipt if you like (e.g. “Run by: my-harness”) — optional personality, required file.',
          ) },
          { k: 'p', text: L(
            'One-screen finish line: tools ran · you approved or denied once · `agency-receipt.md` opens offline with a short Think / Act / Observe note. File over chat.',
          ) },
          { k: 'steps', id: '3-steps', items: [{ title: L(
            'In Desktop chat, ask: “Look at [folder path I give you]. List the three largest items. Propose a simple archive plan. Write the plan to `agency-receipt.md` in [path I choose]. Do not delete anything. After tools finish, include a short Think/Act/Observe summary at the bottom of the file.”',
          ) }, { title: L('When tools ask for approval, read once. Approve only safe steps; deny anything that deletes or leaves the folder you named.') }, { title: L('Open `agency-receipt.md` yourself offline. If the file is missing, the mission failed — fix tools/path and retry.') }, { title: L(
            'Optional pocket check: from your lesson-05 messaging app, ask “Summarize `agency-receipt.md` in three bullets” (only if gateway is up). Desktop proof still counts without this.',
          ) }] },
          { k: 'checklist', id: '3', items: [
          L('`agency-receipt.md` exists and opens offline'),
          L('I made at least one deliberate approve or deny decision'),
          L('Receipt includes a short Think / Act / Observe note (even three lines)'),
          L('Nothing important was deleted'),
        ] },
          { k: 'quiz', quiz: {
            question: L('What proves first agency here?'),
            options: [
              L('A witty chat reply only'),
              L('A file that opens offline'),
              L('A public bot for everyone'),
              L('A perfect model benchmark'),
            ],
            correct: L('A file that opens offline'),
            explain: L('If `agency-receipt.md` is missing, the mission failed. Proofs live on disk.'),
          } },
          { k: 'quiz', quiz: {
            question: L('You deny a delete tool call. Next?'),
            options: [
              L('Model deletes in secret'),
              L('Observation = denied; stop/ask'),
              L('Harness ignores your choice'),
              L('System role rewrites files'),
            ],
            correct: L('Observation = denied; stop/ask'),
            explain: L('Denied approval is an observation. The model should stop or ask — not sneak around.'),
          } },
          { k: 'links', items: [
          { label: L('Tools docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
          { label: L('Sessions'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/sessions' },
        ] },
          { k: 'figure', variant: 'agency-mission' },
        ],






      },
      {
        heading: L('Proof 1 — hands (tools)'),
        blocks: [
          { k: 'p', text: L(
            'Open [Tools](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools) / Dashboard for this profile. Keep the tool surface small: file + shell (or the minimum needed for the mission). Extra tools raise fixed cost and confusion — and give the model more Act options to thrash.',
          ) },
          { k: 'list', items: [
          L('Prefer structured tools over long improvised shell when both exist.'),
          L('A failing tool should return a clear error so the model can **Observe** and recover.'),
          L('Scope tools to the job — this mission does not need every MCP server on earth.'),
        ] },
        ],


      },
      {
        heading: L('Proof 2 — control (human in the loop)'),
        blocks: [
          { k: 'p', text: L(
            'Agency without a gate is a liability. [Smart approvals](https://hermes-agent.nousresearch.com/docs/user-guide/security) may pass low-risk steps and stop on uncertainty. Manual is slower and fine. Full auto-approve modes (sometimes labeled YOLO) are expert-only — leave them off for this course.',
          ) },
          { k: 'steps', id: '5-steps', items: [{ title: L('Confirm approval mode is smart or manual (not full auto-approve / YOLO).') }, { title: L('Force one decision: e.g. a write outside the allowed path should be denied, or a write inside should be approved on purpose.') }, { title: L('Write one line in `agency-receipt.md`: “Approval mode: … · I approved/denied: …”') }] },
          { k: 'links', items: [
          { label: L('Security / approvals'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
        ] },
        ],



      },
      {
        heading: L('Proof 3 — receipt (file over chat)'),
        blocks: [
          { k: 'p', text: L(
            'If you cannot open the result without Hermes, you do not own the outcome. The receipt file is the Part I finish line for agency.',
          ) },
          { k: 'list', items: [
          L('Path is absolute and under a folder you control.'),
          L('Content names the three largest items + plan (even if rough).'),
          L('You opened it in a normal editor, not only in chat.'),
        ] },
        ],


      },
      {
        heading: L('Know your cost (light)'),
        blocks: [
          { k: 'p', text: L(
            '[Provider](https://hermes-agent.nousresearch.com/docs/integrations/providers) (OpenRouter, OpenCode, …) is where the key lives; model is capability and price. Free tiers still have limits. Before blaming the model, know what is already loaded in an empty session.',
          ) },
          { k: 'steps', id: '7-steps', items: [{ title: L('Note which provider + model handled the mission (one line in the receipt).') }, { title: L('Optional: open the context / usage view in Desktop and jot the two biggest slices (tools / skills / memory).') }] },
          { k: 'links', items: [
          { label: L('Lab: Prompt budget audit'), href: '/forge/course/open-harness/labs/prompt-budget/' },
          { label: L('Providers docs'), href: 'https://hermes-agent.nousresearch.com/docs/integrations/providers' },
        ] },
        ],



      },
      {
        heading: L('MCP — only if you need a service'),
        blocks: [
          { k: 'p', text: L(
            '[MCP](https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes) plugs external services (docs, drives, repos). Skip MCP for the Mission of the Day unless a service is required. Each server is new trust surface.',
          ) },
          { k: 'list', items: [
          L('Add one server for a concrete need — not a catalog “for later.”'),
          L('Prefer OAuth over long-lived tokens when available.'),
          L('Secrets stay out of chat.'),
        ] },
          { k: 'links', items: [
          { label: L('MCP with Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes' },
        ] },
        ],



      },
      {
        heading: L('Session commands (after the mission)'),
        blocks: [
          { k: 'p', text: L(
            'Long chats fill the window. Learn the map after the receipt exists — do not postpone the mission for `/compress` practice.',
          ) },
          { k: 'list', items: [
          L('`/context` · `/compress` — manage active context'),
          L('/undo · /retry · /branch — conversation control'),
          L('/rollback + checkpoints — files already changed (not the same as /undo)'),
        ] },
          { k: 'links', items: [
          { label: L('Lab: Session control studio'), href: '/forge/course/open-harness/labs/session-control/' },
        ] },
        ],



      },
      {
        advanced: true,
        heading: L('Tool backends and host isolation'),
        blocks: [
          { k: 'p', text: L(
            'Shell tools use a terminal backend. On a **dedicated** host you may run tools more freely. On a personal machine, [Docker](https://hermes-agent.nousresearch.com/docs/user-guide/docker) (or a VPS) is the responsible default — not “later if you feel like it.”',
          ) },
          { k: 'list', items: [
          L('Dedicated host process — ok when the box is lab-only'),
          L('Docker backend — commands isolated from the host OS (required compromise on a daily-driver)'),
          L('SSH / VPS / cloud sandboxes — tools run on another machine you can wipe'),
          L('Own infra vs cloud API models — brain location is independent of tool backend; cloud brains still send chat content off-box'),
          L('Multi-machine ops — Desktop here, workers or gateway on a VPS'),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'For production isolation, team shared hosts, or compliance constraints, contact Delta V — tailored Hermes deployments by our engineers.',
        ) },
          { k: 'links', items: [
          { label: L('Docker / backends'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Contact Delta V — tailored setup'), href: '/contact/?topic=open-harness' },
        ] },
        ],





      },
      {
        heading: L('Part I close'),
        blocks: [
          { k: 'p', text: L(
            'You now have: free model path, Desktop, [soul](~soul), one messaging surface, vocabulary for **Think → Act → Observe**, and a file that proves the agent acted. Part II adds memory, vault, skills, security dials, and cron.',
          ) },
          { k: 'checklist', id: '11', items: [
          L('Mission receipt on disk'),
          L('Approvals not set to full auto-approve'),
          L('Provider + model noted'),
          L('I can explain agent vs chat in one sentence'),
          L('I can narrate one Think → Act → Observe cycle from this mission'),
        ] },
          { k: 'links', items: [
          { label: L('Lab: spend drill'), href: '/forge/course/open-harness/labs/model-spend/' },
          { label: L('Lab: failure studio'), href: '/forge/course/open-harness/labs/failure-studio/' },
          { label: L('Tips'), href: 'https://hermes-agent.nousresearch.com/docs/guides/tips' },
          { label: L('Next: Memory floors'), href: '/forge/course/open-harness/07/' },
        ] },
        ],



      },
    ],
  },


  // ─── 07 ─────────────────────────────────────────────
  {
    id: 'memory',
    slug: '07',
    number: '07',
    part: 2,
    title: L('Memory floors'),
    subtitle: L(
      'Context is session RAM. Durable memory is on disk. Caps are intentional.',
    ),
    minutes: 30,
    proof: L(
      'You wrote a durable fact, verified it on disk, closed the session, reopened, and the agent still knew it.',
    ),
    sections: [
      {
        heading: L('Three floors'),
        blocks: [
          { k: 'p', text: L(
            'Part II starts with memory because [tools](~tool) without durable facts re-hallucinate preferences every session. Map the floors before you write anything.',
          ) },
          { k: 'table', headers: [L('Floor'), L('What'), L('Limit')], rows: [
            [L('1 · Notebook'), L('SOUL, MEMORY, USER — always loaded'), L('Intentionally capped')],
            [L('2 · Journal'), L('Session recall — verbatim / full-text search'), L('Local history size')],
            [L('3 · Library'), L('Vault / external notes (next module)'), L('Your disk')],
          ] },
        ],


      },
      {
        heading: L('Cap as a feature'),
        blocks: [
          { k: 'p', text: L(
            '`MEMORY.md` and `USER.md` share a tight prompt budget on purpose. The cap forces durable preferences, facts, corrections, and conventions — not a dump of chat logs. Near capacity: merge, compress, drop stale lines.',
          ) },
          { k: 'callout', variant: 'quote', text: L(
          'Remembering everything is remembering nothing. Prefer dense facts.',
        ) },
        ],



      },
      {
        heading: L('Gotcha: write now, load next session'),
        blocks: [
          { k: 'p', text: L(
            'Disk updates can succeed while the current system prompt stays frozen for cache efficiency. A same-session “do you remember?” check can look like failure when the file is already correct. Verify the file, then open a new session for the behavioral proof.',
          ) },
          { k: 'callout', variant: 'warning', text: L(
          'If `MEMORY.md` has the line and this session ignores it — close and reopen before blaming the agent.',
        ) },
        ],



      },
      {
        heading: L('`MEMORY.md` and `USER.md`'),
        blocks: [
          { k: 'p', text: L(
            '`MEMORY.md` is the [agent](~agent) notebook (environment, conventions, lessons). `USER.md` is your card (name, preferences, avoid-list). The agent writes them; you may edit them in any text editor. Unwritten facts do not persist.',
          ) },
          { k: 'callout', variant: 'quote', text: L(
          'File over app: closed chat products do not offer this honesty.',
        ) },
        ],



      },
      {
        heading: L('External providers (optional)'),
        blocks: [
          { k: 'p', text: L(
            'Pluggable providers (user modeling, fact extraction, graphs) augment the built-in layer; they do not replace your files. Run one provider at a time. Switching does not migrate prior accumulation.',
          ) },
          { k: 'list', items: [
          L('Default for this course: files plus vault.'),
          L('Add a provider only when [built-in memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory) is clearly insufficient.'),
          L('Export or note important facts before switching providers.'),
        ] },
        ],


      },
      {
        heading: L('Proof ritual'),
        blocks: [
          { k: 'steps', id: '5-steps', items: [{ title: L('Tell the agent: “Remember that project codename is HARNESS-01 and I prefer short answers.”') }, { title: L('Ask it to write that to durable memory.') }, { title: L('Open `MEMORY.md` / `USER.md` on disk and verify the lines.') }, { title: L('Fully close the session. Reopen. Ask: “What is my project codename and answer length preference?”') }, { title: L('Optional: query session recall for an earlier vault mention if available.') }] },
          { k: 'links', items: [
          { label: L('Memory system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory' },
        ] },
        ],


      },
      {
        heading: L('Memory vs hallucination'),
        blocks: [
          { k: 'p', text: L(
            'Without memory the model fills gaps with confidence. With memory and sources it consults first. Still fallible — but checkable by you and by the agent.',
          ) },
        ],

      },
      {
        heading: L('Context window vs durable memory'),
        blocks: [
          { k: 'p', text: L(
            'The context window is session RAM. [Hermes](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory) may auto-compress long threads; you can also run `/context` and `/compress` so the active prompt shrinks while the stored session remains — try it in the [session control lab](/forge/course/open-harness/labs/session-control/). Prefer writing durable facts to `MEMORY.md` / `USER.md` rather than hoping a long chat will still “know” them next week.',
          ) },
          { k: 'checklist', id: '7', items: [
          L('Durable fact verified on disk and in a new session'),
          L('I can state context window vs `MEMORY.md` in one sentence'),
        ] },
          { k: 'quiz', quiz: {
            question: L('Where do durable preferences live?'),
            options: [
              L('Only in this chat scroll'),
              L('On disk (MEMORY / USER)'),
              L('Only in OpenRouter logs'),
              L('Only in the model weights'),
            ],
            correct: L('On disk (MEMORY / USER)'),
            explain: L('Context window is session RAM. `MEMORY.md` / `USER.md` reload next session.'),
          } },
          { k: 'quiz', quiz: {
            question: L('File updated but chat “forgets” now?'),
            options: [
              L('Always a broken install'),
              L('Close/reopen for load proof'),
              L('Delete `MEMORY.md` always'),
              L('Switch to YOLO approvals'),
            ],
            correct: L('Close/reopen for load proof'),
            explain: L('Disk can update while this session’s system prompt stays frozen. Verify file, then new session.'),
          } },
          { k: 'links', items: [
          { label: L('Lab: Session control studio'), href: '/forge/course/open-harness/labs/session-control/' },
        ] },
        ],




      },
    ],
  },

  // ─── 08 ─────────────────────────────────────────────
  {
    id: 'vault',
    slug: '08',
    number: '08',
    part: 2,
    title: L('Data vault', 'Data vault'),
    subtitle: L(
      'A markdown vault as the library floor — notes you keep and the agent can retrieve.',
      'Un vault markdown comme étage bibliothèque — des notes durables que l’agent peut retrouver.',
    ),
    minutes: 25,
    proof: L(
      'Hermes retrieves a note you wrote in the vault — not a generic web answer.',
      'Hermes retrouve une note que tu as écrite dans le vault — pas une réponse web générique.',
    ),
    sections: [
      {
        heading: L('Vault = a folder', 'Vault = un dossier'),
        blocks: [
          { k: 'p', text: L(
            'An [Obsidian](https://obsidian.md) vault is a folder of markdown on disk. Local use needs no account. Once connected, the agent can read and write there. This is floor three from the memory module: unlimited library, still files you own — the [file over app](https://stephango.com/file-over-app) idea.',
            'Un vault [Obsidian](https://obsidian.md) est un dossier de markdown sur disque. L’usage local n’exige pas de compte. Une fois connecté, l’agent y lit et écrit. C’est l’étage trois du module mémoire : bibliothèque large, toujours des fichiers à toi — l’esprit [file over app](https://stephango.com/file-over-app).',
          ) },
          { k: 'steps', id: '0-steps', items: [{ title: L('Install Obsidian. Create a vault (for example second-brain).', 'Installe Obsidian. Crée un vault (ex. second-brain).') }, { title: L('Create three folders: inbox / sources / synthesis.', 'Crée trois dossiers : inbox / sources / synthesis.') }, { title: L('Add two or three short notes about a real project.', 'Ajoute deux ou trois notes courtes sur un vrai projet.') }, { title: L('Connect Hermes to the vault path (Obsidian skill / config for your version).', 'Connecte Hermes au chemin du vault (skill Obsidian / config de ta version).') }, { title: L('Ask: “Find my notes on X and summarize with quotes.”', 'Demande : « Retrouve mes notes sur X et résume avec citations. »') }] },
        ],


      },
      {
        heading: L('Linked notes', 'Notes liées'),
        blocks: [
          { k: 'p', text: L(
            'Double brackets [[like this]] build a network. The graph maps what you know; the agent can follow links, not only keyword search.',
            'Les doubles crochets [[comme ça]] forment un réseau. Le graphe cartographie ce que tu sais ; l’agent suit les liens, pas seulement les mots-clés.',
          ) },
        ],

      },
      {
        heading: L('Proof checklist'),
        blocks: [
          { k: 'checklist', id: '2', items: [
          L('Vault path connected in Hermes'),
          L('At least one retrieval with a quote from your note'),
          L('You can open the same note offline without Hermes'),
        ] },
          { k: 'quiz', quiz: {
            question: L('What is a vault in this course?'),
            options: [
              L('A cloud-only chat folder'),
              L('A notes folder on disk'),
              L('The model vendor account'),
              L('The gateway allowlist only'),
            ],
            correct: L('A notes folder on disk'),
            explain: L('Vault = library floor: notes you open offline; Hermes searches the path.'),
          } },
          { k: 'links', items: [
          { label: L('Obsidian'), href: 'https://obsidian.md' },
          { label: L('File over app'), href: 'https://stephango.com/file-over-app' },
        ] },
        ],



      },
      {
        heading: L('Wiki pattern (later)', 'Pattern wiki (plus tard)'),
        blocks: [
          { k: 'p', text: L(
            'Pure retrieval re-searches every time and compounds little. A [wiki-style loop](/forge/course/open-harness/labs/wiki-kanban/) deposits sources, summarizes, updates linked pages, and flags contradictions. The vault becomes compiled knowledge.',
            'La recherche pure recommence à chaque fois et accumule peu. Une [boucle type wiki](/forge/course/open-harness/labs/wiki-kanban/) dépose des sources, résume, met à jour les pages liées et signale les contradictions. Le vault devient du savoir compilé.',
          ) },
          { k: 'callout', variant: 'note', text: L(
          'Course default: files on disk plus vault. External memory providers remain optional and never replace your files.',
        ) },
          { k: 'links', items: [
          { label: L('Lab: staged wiki'), href: '/forge/course/open-harness/labs/wiki-kanban/' },
        ] },
        ],




      },
    ],
  },

  // ─── 09 Skills ───────────────────────────────────────
  {
    id: 'skills',
    slug: '09',
    number: '09',
    part: 2,
    title: L('Skills'),
    subtitle: L(
      'On-demand procedural memory — how skills relate to tools, the agent loop, and fixed session cost.',
    ),
    minutes: 22,
    proof: L(
      'You listed skills for this profile, ran or inspected one, wrote `skills-notes.md` (name + when to use), and can state skill vs tool vs MCP in one sentence each.',
    ),
    sections: [
      {
        heading: L('What a skill is'),
        blocks: [
          { k: 'p', text: L(
            'A [skill](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) is a reusable instruction package (`SKILL.md`). Front matter names and describes it; the body teaches the procedure. Hermes sees names and descriptions first — a vague description means the right skill may never load.',
          ) },
          { k: 'p', text: L(
            'Skills use progressive disclosure: the catalog stays cheap; only the selected body enters the prompt. That is how a large library avoids burning the context window every turn.',
          ) },
          { k: 'p', text: L(
            'In the **Think → Act → Observe** loop, a skill mostly shapes Think (and which tools to pick). It is not itself an Act unless it triggers tools. Tools execute; skills teach.',
          ) },
          { k: 'list', items: [
          L('Skill = procedure / knowledge package (agentskills-compatible).'),
          L('Tool = callable Act with args + result (observation).'),
          L('Plugin / MCP = product hooks or external services — different layers.'),
          L('Slash commands (for example /plan) and /learn can capture workflows as skills when supported.'),
          L('Install narrowly; run security scans on hub skills before trust.'),
          L('Pin or [curator](https://hermes-agent.nousresearch.com/docs/user-guide/features/curator): critical skills should not vanish to automated cleanup when you outgrow defaults.'),
        ] },
        ],


      },
      {
        heading: L('Skill vs tool vs MCP (keep them straight)'),
        blocks: [
          { k: 'table', headers: [L('Layer'), L('Job in the loop'), L('Failure mode if misused')], rows: [
            [
              L('**Skill**'),
              L('Teach procedure → better Think / tool choice'),
              L('Huge catalog → empty-session cost; wrong skill never loads'),
            ],
            [
              L('**Tool**'),
              L('Execute Act → produce Observe'),
              L('Too many tools → thrash; no approvals → host risk'),
            ],
            [
              L('**MCP**'),
              L('Connect external services as tools'),
              L('Each server = trust + secrets + network surface'),
            ],
          ] },
          { k: 'callout', variant: 'note', text: L(
          'Favourite-skills shelf ([Labs page](/forge/course/open-harness/labs/#favourite-skills)) is editorial preference. Theory lives here; enable few skills on purpose.',
        ) },
          { k: 'links', items: [
          { label: L('Labs · favourite skills'), href: '/forge/course/open-harness/labs/#favourite-skills' },
        ] },
        ],




      },
      {
        heading: L('Desktop first'),
        blocks: [
          { k: 'callout', variant: 'note', text: L(
          'If every skill is enabled, the model spends tokens choosing rather than working. Least privilege. Skills Hub is a map, not homework.',
        ) },
          { k: 'steps', id: '2-steps', items: [{ title: L('Open Skills in Hermes Desktop.') }, { title: L('Copy the list into `skills-notes.md` under your course notes folder.') }, { title: L('Run or inspect one bundled skill appropriate to your OS, following the [work-with-skills guide](https://hermes-agent.nousresearch.com/docs/guides/work-with-skills).') }, { title: L('Optional: install one official hub skill after reading the scan warning — log the reason. Do not install a catalog “for later.”') }] },
          { k: 'links', items: [
          { label: L('Skills system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills' },
          { label: L('Work with skills (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/work-with-skills' },
          { label: L('Curator (later)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/curator' },
        ] },
        ],




      },
      {
        heading: L('Skills tax the fixed budget'),
        blocks: [
          { k: 'p', text: L(
            'The skills index and every enabled tool schema load into the empty-session budget (see module 06 — context budget). A large “install for later” catalog costs tokens before any task starts.',
          ) },
          { k: 'steps', id: '3-steps', items: [{ title: L('Open the context / usage view in Desktop. Note the skills / tools share.') }, { title: L('Disable or uninstall one skill you will not use this week. Re-run [the audit](/forge/course/open-harness/labs/prompt-budget/).') }, { title: L('Record before/after in `skills-notes.md` (one line each is enough).') }] },
          { k: 'links', items: [
          { label: L('Lab: Prompt budget audit'), href: '/forge/course/open-harness/labs/prompt-budget/' },
        ] },
        ],



      },
      {
        heading: L('Proof'),
        blocks: [
          { k: 'checklist', id: '4', items: [
          L('`skills-notes.md` lists at least three skill names'),
          L('One skill run or inspect logged with outcome'),
          L('You can state **skill vs tool vs MCP** in one sentence each'),
          L('You re-checked fixed budget after trimming at least one skill or toolset'),
        ] },
          { k: 'quiz', quiz: {
            question: L('A skill is best described as…'),
            options: [
              L('A live shell command only'),
              L('A procedure / howto package'),
              L('An API key for OpenRouter'),
              L('A messaging allowlist rule'),
            ],
            correct: L('A procedure / howto package'),
            explain: L('Skill teaches procedure; tool executes Act; MCP connects external services.'),
          } },
          { k: 'links', items: [
          { label: L('Next: Security'), href: '/forge/course/open-harness/10/' },
          { label: L('Sample skills-notes'), href: '/courses/open-harness/samples/skills-notes.example.md' },
        ] },
        ],



      },
    ],
  },

  // ─── 10 Security ─────────────────────────────────────
  {
    id: 'security',
    slug: '10',
    number: '10',
    part: 2,
    title: L('Security dials'),
    subtitle: L(
      'Host isolation, cloud data leaving the box, who may reach tools, and how approvals work.',
    ),
    minutes: 22,
    proof: L(
      'You re-stated host isolation (dedicated / VPS / Docker), cloud-model data leaves the host, confirmed allowlist and approval mode (smart or manual), wrote `security-dials.md` with three settings and rationale, and did not enable YOLO for this course.',
    ),
    sections: [
      {
        heading: L('Threat model'),
        blocks: [
          { k: 'p', text: L(
            'A **dedicated lab host** is not a public bot — and it is also not “just ChatGPT in a tab.” With tools enabled, the agent can act like a powerful shell operator on whatever OS user and backend you gave it. Gateway should fail closed: strangers never reach tools by default, as the [security guide](https://hermes-agent.nousresearch.com/docs/user-guide/security) explains.',
          ) },
          { k: 'list', items: [
          L('**Host:** prefer dedicated machine or VPS; personal daily-driver only with [Docker](https://hermes-agent.nousresearch.com/docs/user-guide/docker) (or equal) isolation for tools.'),
          L('**Cloud models (OpenRouter / OpenCode / similar):** conversation and related context leave your machine to model hosts — plan secrets accordingly.'),
          L('**Shell reality:** tool backends can read/write files and run commands within their isolation boundary — treat that boundary as real or broken.'),
        ] },
        ],
      },
      {
        heading: L('Who may reach tools'),
        blocks: [
          { k: 'list', items: [
          L('Allowlist messaging gateway users (fail closed if unset).'),
          L('Approvals: manual | smart (default) | off — course uses smart or manual. YOLO is expert-only and still cannot bypass the hardline blocklist.'),
          L('Timeouts deny by default when you do not answer.'),
        ] },
        ],
      },
      {
        heading: L('Secrets, network, least privilege'),
        blocks: [
          { k: 'list', items: [
          L('Secret filtering: keep tokens out of prompts and MCP child environments where possible — practice this in the [key rotation lab](/forge/course/open-harness/labs/api-key-hygiene/).'),
          L('Injection scans on SOUL / `AGENTS.md` / context files when enabled.'),
          L('Network: SSRF protections block private ranges; open only for a trusted local service you understand.'),
          L('Profile least privilege: research does not need a coder tool surface.'),
          L('Optional later: approval suggestions mine past decisions — they should never auto-apply destructive classes.'),
        ] },
        ],
      },
      {
        heading: L('Keep the defaults'),
        blocks: [
          { k: 'callout', variant: 'warning', text: L(
          'Keep defaults for this course. Disabling approvals for speed is how harnesses become liabilities. [Checkpoints and rollback](https://hermes-agent.nousresearch.com/docs/user-guide/checkpoints-and-rollback), if available, support recovery — they do not replace approvals or host isolation.',
        ) },
          { k: 'links', items: [
          { label: L('Security guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
          { label: L('Docker / isolation'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Checkpoints & rollback'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/checkpoints-and-rollback' },
          { label: L('Lab: key rotation'), href: '/forge/course/open-harness/labs/api-key-hygiene/' },
          { label: L('Lab: failure studio'), href: '/forge/course/open-harness/labs/failure-studio/' },
        ] },
        ],





      },
      {
        heading: L('Desktop check'),
        blocks: [
          { k: 'steps', id: '1-steps', items: [{ title: L('Re-state host path in one line: dedicated PC / VPS / personal+Docker (from lesson 02).') }, { title: L('If cloud models: note in `security-dials.md` that chat content leaves the host (OpenRouter/OpenCode/etc.).') }, { title: L('Open gateway / security / approvals for this profile (or `config.yaml` approvals.mode).') }, { title: L('Confirm allowlist / pairing is only you (messaging platform from module 05).') }, { title: L('Confirm smart or manual approvals. Do not use YOLO for course work.') }, { title: L('Write `security-dials.md`: host path, cloud-data note, allowlist status, approval mode, one tool surface left off.') }] },
        ],

      },
      {
        heading: L('Proof'),
        blocks: [
          { k: 'checklist', id: '2', items: [
          L('`security-dials.md` records host isolation + cloud-data note + three concrete settings'),
          L('YOLO is off (or documented expert exception)'),
          L('You know where logs live if something fails (see the [failure studio lab](/forge/course/open-harness/labs/failure-studio/))'),
        ] },
          { k: 'quiz', quiz: {
            question: L('Course default for approvals?'),
            options: [
              L('YOLO for every tool call'),
              L('Smart or manual only'),
              L('No approvals ever needed'),
              L('Public bot without allowlist'),
            ],
            correct: L('Smart or manual only'),
            explain: L('YOLO is expert-only. Course work uses smart or manual approvals.'),
          } },
          { k: 'links', items: [
          { label: L('Next: Cron'), href: '/forge/course/open-harness/11/' },
        ] },
        ],



      },
    ],
  },

  // ─── 11 Cron ─────────────────────────────────────────
  {
    id: 'cron',
    slug: '11',
    number: '11',
    part: 2,
    title: L('Cron runbooks'),
    subtitle: L(
      'Scheduled work as a full runbook. Each fire starts without prior session memory.',
    ),
    minutes: 25,
    proof: L(
      'You created one self-contained cron job (or a complete plan) covering host, path, success, failure, and delivery — and ran it once or dry-ran the prompt.',
    ),
    sections: [
      {
        heading: L('Amnesia is intentional'),
        blocks: [
          { k: 'p', text: L(
            '[Cron](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron) usually runs with the always-on gateway. Each execution is an isolated session that does not inherit “yesterday’s issue.” Write a self-contained runbook into the job prompt.',
          ) },
          { k: 'list', items: [
          L('Include host, path, command, expected state, delivery target, success and failure behavior.'),
        ] },
        ],
      },
      {
        heading: L('Quiet by default'),
        blocks: [
          { k: 'list', items: [
          L('silent: suppress “all good” noise; still surface failures.'),
          L('no_agent / script-only: deterministic checks that need no model tokens.'),
          L('Wake gate: cheap pre-check first; wake the model only when something changed.'),
        ] },
        ],
      },
      {
        heading: L('Guardrails'),
        blocks: [
          { k: 'list', items: [
          L('Jobs must not spawn unbounded new jobs — runaway self-scheduling is blocked in healthy setups.'),
          L('Dangerous commands: prefer approvals.cron_mode deny (default) so headless jobs cannot YOLO host damage.'),
        ] },
        ],


      },
      {
        heading: L('Build one job'),
        blocks: [
          { k: 'callout', variant: 'note', text: L(
          'Cron spend is easy to waste. Prefer script checks first; wake the model only when the check fails or changes, or use [webhooks](/forge/course/open-harness/labs/webhooks/) instead of polling.',
        ) },
          { k: 'steps', id: '1-steps', items: [{ title: L('Define a small job: for example weekday 08:00 — three headlines, short summary, deliver to your messaging app (or a local file if gateway is off).') }, { title: L('Write the prompt as if the agent has amnesia, starting from the [sample runbook](/courses/open-harness/samples/cron-runbook.example.md). Save as cron-runbook.md.') }, { title: L('Create it in the Desktop cron UI or [Hermes cron flow](https://hermes-agent.nousresearch.com/docs/guides/automate-with-cron) for your version.') }, { title: L('Run once manually if possible, then schedule — or stop after dry-run if offline.') }] },
        ],
      },
      {
        heading: L('Go deeper'),
        blocks: [
          { k: 'links', items: [
          { label: L('Cron feature docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron' },
          { label: L('Automate with cron (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/automate-with-cron' },
          { label: L('Lab: webhooks'), href: '/forge/course/open-harness/labs/webhooks/' },
          { label: L('Sample runbook'), href: '/courses/open-harness/samples/cron-runbook.example.md' },
        ] },
        ],




      },
      {
        heading: L('Proof'),
        blocks: [
          { k: 'checklist', id: '2', items: [
          L('`cron-runbook.md` is self-contained (a stranger could execute it)'),
          L('Job created in Desktop/CLI or fully planned with schedule'),
          L('Success and failure paths both named'),
        ] },
          { k: 'quiz', quiz: {
            question: L('Why write cron prompts with amnesia?'),
            options: [
              L('Models hate long context'),
              L('Jobs start without chat history'),
              L('Gateway forbids memory files'),
              L('`SOUL.md` is never loaded'),
            ],
            correct: L('Jobs start without chat history'),
            explain: L('Scheduled jobs wake cold. The runbook must include host, path, success, and failure.'),
          } },
          { k: 'links', items: [
          { label: L('Next: Own forever'), href: '/forge/course/open-harness/12/' },
          { label: L('All Harness Labs'), href: '/forge/course/open-harness/labs/' },
        ] },
        ],



      },
    ],
  },

  // ─── 12 Own forever ──────────────────────────────────
  {
    id: 'own-forever',
    slug: '12',
    number: '12',
    part: 2,
    title: L('Own it forever'),
    subtitle: L(
      'Backup, update habit, and growth map — without expanding the day-one path.',
    ),
    minutes: 20,
    proof: L(
      'You know which folders to back up, how to brief a sub-agent, and which growth step matches your next constraint.',
    ),
    sections: [
      {
        heading: L('What to back up'),
        blocks: [
          { k: 'list', items: [
          L('Hermes home / profile directory (SOUL, memory, config, skills you keep)'),
          L('Obsidian vault and `AGENTS.md` / project context you rely on'),
          L('`.env` holds secrets — back up encrypted; never publish'),
        ] },
          { k: 'callout', variant: 'quote', text: L(
          'Copy the folders. That is the backup. The harness is portable because it is files.',
        ) },
          { k: 'links', items: [
          { label: L('Sample tree'), href: '/courses/open-harness/samples/profile-tree.example.md' },
        ] },
        ],




      },
      {
        heading: L('Stay current'),
        blocks: [
          { k: 'p', text: L(
            'Official docs change often. Run `hermes update` (or reinstall Desktop) on a cadence you can keep. After updates: doctor or health check, one chat smoke test, gateway still allowlisted. If a flag renames, Installation / [Updating docs](https://hermes-agent.nousresearch.com/docs/getting-started/updating) win over this page.',
          ) },
          { k: 'links', items: [
          { label: L('Updating Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating' },
          { label: L('Learning path (official)'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/learning-path' },
        ] },
        ],


      },
      {
        heading: L('Course completion checklist'),
        blocks: [
          { k: 'checklist', id: '2', items: [
          L('Lexicon: agent vs chat; harness vs runtime; token, context, cron'),
          L('Host path chosen (dedicated / VPS / personal+Docker); Hermes chats; isolation decided'),
          L('You know cloud models send chat content off-box; Providers / Gateway / Advanced mapped'),
          L('SOUL in Hermes home (not project CWD); SOUL vs `AGENTS.md` clear'),
          L('Tool task completed; smart or manual approvals on'),
          L('Messaging gateway trusted and working (platform you chose)'),
          L('Memory fact on disk and survives a new session'),
          L('Vault note retrieved'),
          L('Skills listed (09); security dials written (10); cron runbook (11)'),
          L('Backup locations known; update habit named'),
        ] },
          { k: 'quiz', quiz: {
            question: L('What must you back up first?'),
            options: [
              L('Only the chat UI theme'),
              L('Hermes home + vault + secrets'),
              L('Public bot tokens only'),
              L('Nothing — cloud stores it'),
            ],
            correct: L('Hermes home + vault + secrets'),
            explain: L('Profile folder, notes vault, and encrypted secrets are the ownership map.'),
          } },
        ],


      },
      {
        heading: L('Keep going'),
        blocks: [
          { k: 'p', text: L(
            '[Official docs](https://hermes-agent.nousresearch.com/docs/) are the living manual. Optional labs deepen operations. [Open Design](/forge/course/open-design/) is the next live mastery track on Forge.',
          ) },
          { k: 'links', items: [
          { label: L('Hermes docs home'), href: 'https://hermes-agent.nousresearch.com/docs/' },
          { label: L('Docs index (llms.txt)'), href: 'https://hermes-agent.nousresearch.com/docs/llms.txt' },
          { label: L('Harness Labs (after mastery)'), href: '/forge/course/open-harness/labs/' },
          { label: L('Open Design'), href: '/forge/course/open-design/' },
          { label: L('Sample gallery'), href: '/courses/open-harness/samples/README.md' },
          { label: L('Contact Delta V'), href: '/contact/?topic=open-harness' },
          { label: L('Back to Forge'), href: '/forge/' },
        ] },
        ],


      },
      {
        heading: L('When one agent is not enough'),
        blocks: [
          { k: 'p', text: L(
            '[Sub-agents](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation): spawn helpers for independent work. Brief them as strangers (failure, paths, definition of done). Least tools. Prefer cheaper children and a strong parent for synthesis. Avoid delegating tightly sequential interactive work.',
          ) },
          { k: 'p', text: L(
            'Profiles: a second Hermes home (own model, memory, gateway, persona) when roles must stay isolated permanently — not a temporary helper.',
          ) },
          { k: 'p', text: L(
            'Kanban / boards: when work must cross agents and survive restarts. Use the official [multi-agent docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban) when serial pain is real.',
          ) },
          { k: 'callout', variant: 'note', text: L(
          'Basics stop at one solid harness. Multi-agent and extra platforms are optional growth — not Part I homework.',
        ) },
          { k: 'links', items: [
          { label: L('Delegation'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation' },
          { label: L('Kanban multi-agent'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban' },
        ] },
        ],




      },
      {
        heading: L('Growth map — seven patterns'),
        blocks: [
          { k: 'p', text: L(
            'You already practice tools and approvals. Add the rest when a concrete constraint appears.',
          ) },
          { k: 'list', items: [
          L('1 Tools — day one (done)'),
          L('2 MCP servers — when work spans external services and APIs'),
          L('3 Sequential pipeline — multi-step jobs via profiles and wake gates'),
          L('4 Parallel — research fan-out / batch delegation'),
          L('5 Routers — assign by type to specialist profiles or board'),
          L('6 Human in the loop — keep for high-impact actions'),
          L('7 Dynamic sub-agents — orchestrator spawns help mid-task'),
        ] },
        ],


      },
      {
        heading: L('Desktop Kanban (growth)'),
        blocks: [
          { k: 'p', text: L(
            'The first official Hermes Desktop plugin is Kanban: a board in the app for multi-step work across profiles. Enable it only after one profile, tools, and approvals are solid. It is not Part I homework.',
          ) },
          { k: 'list', items: [
          L('Plugin can add a page, sidebar entry, hotkeys, and backend endpoints.'),
          L('Multi-profile boards need SOUL + tools working per profile first.'),
          L('Write your own plugin or import via the [Desktop plugin SDK](https://hermes-agent.nousresearch.com/docs/developer-guide/desktop-plugin-sdk) when you outgrow defaults.'),
        ] },
          { k: 'links', items: [
          { label: L('Lab: Kanban multi-profile'), href: '/forge/course/open-harness/labs/kanban-board/' },
          {
            label: L('Desktop plugin SDK'),
            href: 'https://hermes-agent.nousresearch.com/docs/developer-guide/desktop-plugin-sdk',
          },
        ] },
        ],



      },
      {
        advanced: true,
        heading: L('Other ways to deploy (map)'),
        blocks: [
          { k: 'p', text: L(
            'After you own the Desktop path, Hermes can grow into many shapes. This course does not implement them for you — it maps the menu.',
          ) },
          { k: 'list', items: [
          L('Nous Research subscription (Portal) — models and tool gateway under one official login'),
          L('Your own infrastructure — local models, self-hosted APIs, on-prem GPUs'),
          L('Cloud providers — OpenRouter, OpenCode, and others via Hermes Providers'),
          L('Docker setups — isolated tool backends or containerized services'),
          L('OS choices — Windows / macOS / Linux Desktop; CLI or Termux when needed'),
          L('Multi-machine — split Desktop, always-on gateway, workers, and model hosts'),
        ] },
          { k: 'callout', variant: 'note', text: L(
          'Want a design for your team, threat model, or multi-host layout? Contact Delta V — our experts build tailored Hermes systems beyond this free course.',
        ) },
          { k: 'links', items: [
          { label: L('Docker guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Lab: VPS ship'), href: '/forge/course/open-harness/labs/vps-ship/' },
          { label: L('Lab: remote shell'), href: '/forge/course/open-harness/labs/remote-access/' },
          { label: L('Contact Delta V — tailored setup'), href: '/contact/?topic=open-harness' },
        ] },
        ],





      },
    ],
  },
];

export function getModule(slug: string): CourseModule | undefined {
  return OPEN_HARNESS_MODULES.find((m) => m.slug === slug);
}

export function getModuleIndex(slug: string): number {
  return OPEN_HARNESS_MODULES.findIndex((m) => m.slug === slug);
}

export function t(s: LocaleString, lang: CourseLang): string {
  return s[lang] ?? s.en;
}
