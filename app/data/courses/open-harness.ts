/**
 * Open Harness — curriculum (EN primary; FR fields kept for a later translate job).
 * Sources: Delta V ateliers + official Hermes docs. A1 basics pass: high-priority operator gaps only.
 * No Docker track in this revision.
 */

export type CourseLang = 'en' | 'fr';

export type LocaleString = Record<CourseLang, string>;

export type LexiconCard = {
  term: LocaleString;
  body: LocaleString;
  remember: LocaleString;
};

export type CourseSection = {
  heading: LocaleString;
  paragraphs?: LocaleString[];
  bullets?: LocaleString[];
  steps?: LocaleString[];
  callout?: LocaleString;
  calloutVariant?: 'note' | 'warning' | 'quote';
  table?: {
    headers: LocaleString[];
    rows: LocaleString[][];
  };
  lexicon?: LexiconCard[];
  checklist?: LocaleString[];
  souls?: { id: string; name: LocaleString; blurb: LocaleString }[];
  links?: { label: LocaleString; href: string }[];
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
};

/** EN is source of truth; omit `fr` to mirror EN until a full translate pass. */
const L = (en: string, fr?: string): LocaleString => ({ en, fr: fr ?? en });

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
    title: L('Your sovereign agent'),
    subtitle: L('From zero to an agent that acts — Hermes Desktop on your PC, in your pocket via Telegram.'),
    promise: L(
      'You understand the words, install Hermes, give it a soul, prove it can use tools, and reach it from Telegram. One agent. Yours.',
    ),
    startSlug: '00',
    slugs: ['00', '01', '02', '03', '04', '05', '06'],
  },
  {
    id: 2,
    code: 'II',
    title: L('Your compounding harness'),
    subtitle: L('Memory, vault, then skills, security, and cron as separate modules — so it compounds.'),
    promise: L(
      'You fix the memory gotcha, open files on disk, link a vault, load skills, set trust dials, and write a cron runbook. The harness compounds.',
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
    en: 'Two parts. One harness you own forever.',
    fr: 'Two parts. One harness you own forever.',
  } satisfies LocaleString,
  description: {
    en: 'Part I: Hermes Desktop on your PC — soul, Telegram, tools. Part II: memory, vault, skills, security, cron. Day one is local Desktop; Docker, remote providers, and always-on hosts show up in Settings when relevant. Labels follow official docs.',
    fr: 'Part I: Hermes Desktop on your PC — soul, Telegram, tools. Part II: memory, vault, skills, security, cron. Day one is local Desktop; Docker, remote providers, and always-on hosts show up in Settings when relevant. Labels follow official docs.',
  } satisfies LocaleString,
  verifiedAsOf: '2026-08-06',
  revision: 'docs-refresh-2026-08',
} as const;

export const UI_COPY = {
  modules: { en: 'Modules', fr: 'Modules' },
  start: { en: 'Start Part I', fr: 'Start Part I' },
  startPart2: { en: 'Start Part II', fr: 'Start Part II' },
  next: { en: 'Next', fr: 'Next' },
  prev: { en: 'Previous', fr: 'Previous' },
  proof: { en: 'Proof of completion', fr: 'Proof of completion' },
  minRead: { en: 'min', fr: 'min' },
  backCourse: { en: 'Open Harness', fr: 'Open Harness' },
  backForge: { en: 'Forge', fr: 'Forge' },
  syllabus: { en: 'Full syllabus', fr: 'Full syllabus' },
  outcomes: { en: 'What you will own', fr: 'What you will own' },
  part: { en: 'Part', fr: 'Part' },
  langEn: { en: 'EN', fr: 'EN' },
  langFr: { en: 'FR', fr: 'FR' },
  downloadSoul: { en: 'Download SOUL', fr: 'Download SOUL' },
  downloadDesktop: { en: 'Download Desktop', fr: 'Download Desktop' },
  resources: { en: 'Resources', fr: 'Resources' },
  courseLabel: { en: 'Forge / Course 01', fr: 'Forge / Course 01' },
} as const;

/** Official Desktop download / product home — used on landing + install. */
export const HERMES_DESKTOP_URL = 'https://hermes-agent.nousresearch.com/';

export const OPEN_HARNESS_MODULES: CourseModule[] = [
  // ─── 00 ─────────────────────────────────────────────
  {
    id: 'welcome',
    slug: '00',
    number: '00',
    part: 1,
    title: L('Welcome — Open Harness'),
    subtitle: L(
      'Two parts: first an agent that acts, then a harness that remembers and compounds.',
    ),
    minutes: 5,
    proof: L(
      'You can name Part I and Part II in one sentence each.',
    ),
    sections: [
      {
        heading: L('The promise'),
        paragraphs: [
          L(
            'Most people rent intelligence: a browser tab, a subscription, a memory they cannot open. This course builds the opposite — an open Hermes harness whose identity, memory, tools, and gateway live in files you control.',
          ),
          L(
            'This course is Hermes Desktop on your PC. Same ownership later if you move files — but we do not teach CLI or day-one VPS here (too messy for a first harness).',
          ),
        ],
        callout: L(
          'Harness > model. Models change. Your loop, tools, soul, and memory stay. UI labels follow official Hermes docs and will move as the product does.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('How the course is built'),
        paragraphs: [
          L(
            'Two arcs. Finish Part I before Part II — Part II assumes Desktop chats, SOUL exists, and Telegram gateway works.',
          ),
        ],
        table: {
          headers: [L('Part'), L('Name'), L('You leave with')],
          rows: [
            [
              L('I'),
              L('Your sovereign agent'),
              L('Hermes Desktop, SOUL, Telegram gateway, tools proof'),
            ],
            [
              L('II'),
              L('Your compounding harness'),
              L('Memory, vault, skills, security, cron runbook, backup'),
            ],
          ],
        },
      },
      {
        heading: L('What you leave with'),
        checklist: [
          L('Part I: Desktop cockpit + agent from your phone'),
          L('Part II: memory + vault + skills + cron on disk'),
          L('Files you can open offline and back up by copy'),
        ],
      },
      {
        heading: L('How to follow'),
        bullets: [
          L('Desktop only — ignore CLI install guides for this course.'),
          L('Modules in order; each ends with a proof.'),
          L('Lightning path: 02 → 03 → 04 → 05 → 06, then 00–01 if words are fuzzy.'),
          L('If a button label moved, official docs win — we pin a verified date on install.'),
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
      'The words everyone uses without really understanding them.',
      'Les mots qu’on entend partout sans vraiment les comprendre.',
    ),
    minutes: 20,
    proof: L(
      'You can explain agent vs chat, and harness vs runtime, without jargon theater.',
      'Tu expliques agent vs chat, et harness vs runtime, sans théâtre de jargon.',
    ),
    sections: [
      {
        heading: L('Definition cards', 'Cartes de définition'),
        lexicon: [
          {
            term: L('LLM', 'LLM'),
            body: L(
              'Large Language Model: a brain trained on huge amounts of text. It does not “understand” like you — it predicts the next token extremely well. It answers, drafts, translates, codes.',
              'Large Language Model : un cerveau entraîné sur d’énormes quantités de texte. Il ne « comprend » pas comme toi — il prédit le prochain token extrêmement bien. Il répond, rédige, traduit, code.',
            ),
            remember: L('A brilliant intern who has read the whole library — still needs hands and memory to become an agent.', 'Un stagiaire brillant qui a lu toute la bibliothèque — il lui faut des mains et une mémoire pour devenir agent.'),
          },
          {
            term: L('Agent', 'Agent'),
            body: L(
              'LLM + tools + memory. ChatGPT answers. An agent acts: files, terminal, browser, messages, scheduled work.',
              'LLM + outils + mémoire. ChatGPT répond. Un agent agit : fichiers, terminal, navigateur, messages, tâches planifiées.',
            ),
            remember: L('Brain + hands + memory = agent.', 'Cerveau + mains + mémoire = agent.'),
          },
          {
            term: L('Token', 'Token'),
            body: L(
              'The unit of measure and cloud cost. Roughly three-quarters of a word. Local inference: token cost collapses to electricity and time.',
              'L’unité de mesure et de coût cloud. Environ trois quarts d’un mot. En local : le coût par token tombe à l’électricité et au temps.',
            ),
            remember: L('Cloud bills in tokens. Local bills in hardware and patience.', 'Le cloud facture au token. Le local facture le matos et la patience.'),
          },
          {
            term: L('API key & .env', 'Clé API & .env'),
            body: L(
              'An API key is a password programs present to a provider. A .env file stores secrets outside the repo. A leaked key = someone spends as you.',
              'Une clé API est un mot de passe que les programmes présentent à un fournisseur. Un .env range les secrets hors du dépôt. Une clé volée = quelqu’un dépense à ta place.',
            ),
            remember: L('Keys in .env. .env never in Git.', 'Clés dans .env. .env jamais dans Git.'),
          },
          {
            term: L('Runtime vs harness', 'Runtime vs harness'),
            body: L(
              'Runtime is where it runs: your PC, a VPS, a container. Harness is the frame that turns a model into an agent: loop, tools, context, memory, approvals, gateways.',
              'Le runtime, c’est où ça tourne : ton PC, un VPS, un conteneur. Le harness, c’est le cadre qui transforme un modèle en agent : boucle, outils, contexte, mémoire, approbations, gateways.',
            ),
            remember: L('Runtime = where. Harness = how it becomes yours.', 'Runtime = où. Harness = comment ça devient à toi.'),
          },
          {
            term: L('Skills, plugins, MCP', 'Skills, plugins, MCP'),
            body: L(
              'A skill is a reusable procedure (often a SKILL.md). A plugin adds capability. MCP is an open standard — the USB-C of AI: one socket, many services.',
              'Une skill est une procédure réutilisable (souvent un SKILL.md). Un plugin ajoute une capacité. MCP est un standard ouvert — l’USB-C de l’IA : une prise, plein de services.',
            ),
            remember: L('Skills = how. MCP = plug anything in safely.', 'Skills = comment faire. MCP = brancher n’importe quoi, proprement.'),
          },
          {
            term: L('Local vs cloud models', 'Modèles local vs cloud'),
            body: L(
              'Local: model on your machine (e.g. Ollama) — data stays, you pay hardware. Cloud: model at a provider — pay per use, stronger models, data leaves. An agnostic harness lets you switch.',
              'Local : le modèle sur ta machine (ex. Ollama) — données chez toi, tu paies le matos. Cloud : chez le fournisseur — à l’usage, plus puissant, les données sortent. Un harness agnostique te laisse choisir.',
            ),
            remember: L('The important part is knowing what you chose — not purity cosplay.', 'L’important n’est pas lequel, mais de savoir ce qu’on choisit.'),
          },
          {
            term: L('Cron', 'Cron'),
            body: L(
              'A scheduled job. Example: every morning at 08:00 fetch AI headlines, summarize three, send to your phone. An employee who worked while you slept.',
              'Une tâche planifiée. Exemple : chaque matin à 8h, récupérer l’actu IA, résumer 3 titres, envoyer sur ton téléphone. Un employé qui a bossé pendant que tu dormais.',
            ),
            remember: L('Harness + cron = work without you in the chair.', 'Harness + cron = du travail sans toi devant l’écran.'),
          },
          {
            term: L('Context window', 'Fenêtre de contexte'),
            body: L(
              'Everything the model can “see” in the current session — huge and volatile. Close the session (or prune context) and it fades. That is RAM, not disk.',
              'Tout ce que le modèle « voit » dans la session — immense et volatile. Tu fermes (ou on prune) : ça s’efface. C’est la RAM, pas le disque.',
            ),
            remember: L('Context is session RAM. Memory is what you write down.', 'Le contexte, c’est la RAM de session. La mémoire, c’est ce qui est écrit.'),
          },
          {
            term: L('Hallucination', 'Hallucination'),
            body: L(
              'A model must produce tokens. When it does not know, it fills gaps with plausible text. It is not “lying” for sport — it completes the pattern. Memory and sources reduce that.',
              'Un modèle doit produire des tokens. Quand il ignore, il comble avec du plausible. Il ne ment pas pour le plaisir — il complète le motif. Mémoire et sources réduisent ça.',
            ),
            remember: L('It does not know → it invents. Ground it in files.', 'Il ne sait pas → il invente. Ancre-le dans des fichiers.'),
          },
        ],
      },
      {
        heading: L('The click', 'Le déclic'),
        table: {
          headers: [L('Chat in the browser', 'Chat dans le navigateur'), L('Agent on your harness', 'Agent sur ton harness')],
          rows: [
            [L('Answers; you copy-paste', 'Répond ; tu copies-colles'), L('Acts on files and tools', 'Agit sur fichiers et outils')],
            [L('Forgets when you close', 'Oublie à la fermeture'), L('Can remember you and projects', 'Peut se souvenir de toi et des projets')],
            [L('You must be present', 'Tu dois être devant'), L('Can run on schedule / gateway', 'Tourne en cron / gateway')],
            [L('One reply at a time', 'Une réponse à la fois'), L('Chains multi-step work', 'Enchaîne plusieurs étapes')],
          ],
        },
        callout: L(
          'As soon as you want it to do something — not just say something — you need an agent in a harness.',
          'Dès que tu veux qu’il fasse quelque chose — pas seulement le dire — il te faut un agent dans un harness.',
        ),
        calloutVariant: 'note',
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
      'Day one: PC + Hermes Desktop. Advanced options (Docker, remote hosts) live in the app — learn where, not install menus of five paths.',
    ),
    minutes: 10,
    proof: L(
      'You know the day-one path (Desktop on this PC), that Hermes home is on disk, and where advanced settings live for Docker / remote later.',
    ),
    sections: [
      {
        heading: L('Day one (this course)'),
        paragraphs: [
          L(
            'Install Hermes Desktop on the computer you use every day. Wizard, chat, profiles, tools, gateway, cron — one UI. Finish Part I here before you chase always-on boxes.',
          ),
        ],
        bullets: [
          L('Machine: your PC (awake when you want Telegram/cron to answer)'),
          L('App: Hermes Desktop installer (not a CLI-first install for this course)'),
          L('Files: Hermes home on disk — back up by copy'),
        ],
      },
      {
        heading: L('Model location is separate'),
        paragraphs: [
          L(
            'Where Hermes runs (Desktop on your PC) is not the same as where the model runs. Most learners use a cloud provider while Hermes stays local. Fully local models are optional.',
          ),
        ],
      },
      {
        heading: L('Where advanced options appear (peek, don’t configure yet)'),
        paragraphs: [
          L(
            'Docker, remote terminals, and always-on hosts are real Hermes features. They show up inside Desktop when you need them — not as day-one forks of this course.',
          ),
        ],
        bullets: [
          L('Settings → Advanced (or similar): terminal backend / Docker — isolate tool commands from the host'),
          L('Providers: remote or local OpenAI-compatible endpoints (including a model host that is not your laptop)'),
          L('Gateway: keep messaging up; later you can run the same profile on a box that stays awake (VPS) with Desktop or gateway still in the picture'),
          L('Phone-only installs (e.g. Termux) exist in official docs — useful later, not the course cockpit'),
        ],
        callout: L(
          'For Open Harness proofs: leave Advanced on local defaults. Know the tabs exist so you are not surprised later.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Installation (all methods)'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
          { label: L('Docker / terminal backends'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Platform support'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/platform-support' },
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
      'Download Desktop, finish setup, chat once. Advanced settings can wait.',
    ),
    minutes: 25,
    proof: L(
      'Hermes Desktop is open, setup finished, one chat reply works. You left Advanced/Docker alone for now.',
    ),
    sections: [
      {
        heading: L('You need'),
        bullets: [
          L('A PC you control (Windows or macOS — Linux Desktop if offered for your build)'),
          L('Network access for download + one model provider'),
        ],
      },
      {
        heading: L('Install Desktop'),
        paragraphs: [
          L(
            'Every later module assumes this cockpit: chat, profiles, tools, approvals, gateway, cron.',
          ),
        ],
        steps: [
          L('Open hermes-agent.nousresearch.com and download Hermes Desktop for your OS.'),
          L('Install and launch the app.'),
          L('Run the setup wizard. One reliable provider first. Optional: Portal / “setup with portal” if the app offers it (model + Tool Gateway in one go).'),
          L('Stop when chat works — do not configure Telegram yet. Do not open Settings → Advanced yet.'),
          L('Send: “Reply with one sentence confirming you are online.”'),
          L('Optional: open health / doctor in the app if shown; fix only what blocks chat.'),
        ],
        callout: L(
          `Day-one path is Desktop on this PC (as of ${OPEN_HARNESS_META.verifiedAsOf}). If a wizard label moved, official Installation docs win.`,
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Download Hermes Desktop'), href: 'https://hermes-agent.nousresearch.com/' },
          { label: L('Installation docs'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
          { label: L('Quickstart'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
        ],
      },
      {
        heading: L('Peek: Settings you will meet later'),
        paragraphs: [
          L(
            'After chat works, open Settings once just to know the map — then close without changing Advanced defaults.',
          ),
        ],
        bullets: [
          L('Providers / models — cloud APIs, local endpoints, routing (where the brain lives)'),
          L('Gateway / messaging — Telegram and other surfaces (module 05)'),
          L('Advanced — terminal backend, Docker, isolation (do not enable for Part I proofs)'),
        ],
        callout: L(
          'CLI install, Termux, and bare VPS installs are valid Hermes paths in official docs. This course stays on Desktop so newbies are not juggling shells on day one.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('All install methods'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
          { label: L('Docker guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
        ],
      },
      {
        heading: L('Stabilize one provider'),
        paragraphs: [
          L(
            'Pick one model provider you can call reliably, then stop. Do not debug gateway, Docker, and auth at the same time.',
          ),
        ],
      },
      {
        heading: L('Where your files live'),
        paragraphs: [
          L(
            'Desktop still stores the harness on disk (Hermes home — often ~/.hermes or under your user AppData). Profiles isolate homes: each profile is a sealed house. You back up by copying folders — same files if you later run that home on a VPS.',
          ),
        ],
        links: [
          { label: L('Configuration'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration' },
          { label: L('Updating'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating' },
        ],
      },
      {
        heading: L('Optional companions'),
        paragraphs: [
          L(
            'Other coding agents are optional. This course’s home base is Hermes. Add an IDE-shaped companion later only if you want that workflow.',
          ),
        ],
      },
      {
        heading: L('After this proof'),
        paragraphs: [
          L(
            'Install lives only here. Ops drills (Desktop checklist, key rotation, extra models) are Harness Labs — after this module’s proof, not instead of it.',
          ),
        ],
        links: [
          { label: L('Harness Labs'), href: '/forge/course/open-harness/labs/' },
          { label: L('Lab: key rotation'), href: '/forge/course/open-harness/labs/api-key-hygiene/' },
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
      'Adopt a personality in Hermes home. Project rules live elsewhere.',
      'Adopte une personnalité dans le home Hermes. Les règles de projet vivent ailleurs.',
    ),
    minutes: 25,
    proof: L(
      'A profile exists with a SOUL.md from the pack (or a clear edit of one) under Hermes home. The agent answers in that voice. You can name SOUL vs AGENTS.md in one sentence.',
    ),
    sections: [
      {
        heading: L('What SOUL.md is', 'Ce qu’est SOUL.md'),
        paragraphs: [
          L(
            'SOUL.md is the agent’s primary identity: name, role, tone, hard limits. Official docs put it in slot #1 of the system prompt. You write it (or adopt a template). Three lines is marketing; a solid soul is closer to a short brief (~12–20 lines).',
          ),
          L(
            'Location (important): Hermes loads SOUL.md from the instance home only — typically ~/.hermes/SOUL.md, or $HERMES_HOME/SOUL.md for a profile/custom home. It does not probe your project working directory for SOUL.md. That keeps personality stable across folders.',
          ),
        ],
        callout: L(
          'One profile = one house (own HERMES_HOME). Two profiles never share soul or memory by accident.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('SOUL vs project context (do not mix)'),
        paragraphs: [
          L(
            'If it should follow you everywhere → SOUL.md. If it belongs to a repo or campaign folder → project context files (AGENTS.md, .hermes.md / HERMES.md, or CLAUDE.md / .cursorrules when present). Only one project-context type loads per session (first match wins). SOUL still loads independently as identity.',
          ),
        ],
        bullets: [
          L('SOUL.md — identity, tone, limits (Hermes home only)'),
          L('AGENTS.md or .hermes.md — architecture, conventions, ports, “never do X” for this project'),
          L('/personality — temporary session overlay, not a replacement for SOUL'),
          L('Context files are scanned for injection before load — still review files in repos you did not write'),
        ],
        links: [
          { label: L('Personality & SOUL.md'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/personality' },
          { label: L('Context files'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files' },
          { label: L('Sample AGENTS.md'), href: '/courses/open-harness/samples/AGENTS.example.md' },
        ],
      },
      {
        heading: L('Ready-to-adopt souls', 'Âmes prêtes à adopter'),
        paragraphs: [
          L(
            'Download a template, copy it into SOUL.md under this profile’s Hermes home, rename the agent, restart or open a new session.',
          ),
        ],
        souls: [
          { id: 'orchestrator', name: L('Orchestrator', 'Orchestrateur'), blurb: L('Morning brief, triage, delegates work.', 'Brief du matin, triage, délègue le travail.') },
          { id: 'analyst', name: L('Analyst', 'Analyste'), blurb: L('Research, structure, cites sources.', 'Recherche, structure, cite les sources.') },
          { id: 'ops', name: L('Ops', 'Ops'), blurb: L('Files, cleanup, local automation.', 'Fichiers, ménage, automation locale.') },
          { id: 'writer', name: L('Writer', 'Rédacteur'), blurb: L('Drafts with tone control, no flattery.', 'Brouillons avec ton maîtrisé, sans flatterie.') },
          { id: 'coach', name: L('Coach', 'Coach'), blurb: L('Direct accountability, short check-ins.', 'Responsabilité directe, check-ins courts.') },
          { id: 'coder', name: L('Coder', 'Codeur'), blurb: L('Engineering pair inside Hermes.', 'Binôme d’ingénierie dans Hermes.') },
          { id: 'kids-safe', name: L('Kids-safe', 'Kids-safe'), blurb: L('Strict boundaries, simple language.', 'Limites strictes, langage simple.') },
          { id: 'sales', name: L('Sales', 'Sales'), blurb: L('Research and drafts; human sends.', 'Recherche et brouillons ; l’humain envoie.') },
        ],
      },
      {
        heading: L('Steps', 'Étapes'),
        steps: [
          L('Create or select a profile in Desktop (Profiles).'),
          L('Open that profile’s Hermes home and locate SOUL.md (not a random project folder).'),
          L('Paste a soul from the pack. Change the name to yours. Keep project paths out of SOUL — use AGENTS.md later.'),
          L('Start a session and ask: “Who are you and what are your hard limits?”'),
          L('Optional stretch: drop a short AGENTS.md in a real project folder and ask a project-specific question from that directory.'),
        ],
        links: [
          { label: L('Use SOUL.md guide'), href: 'https://hermes-agent.nousresearch.com/docs/guides/use-soul-with-hermes' },
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
    title: L('Gateway (required)'),
    subtitle: L(
      'Right after the soul: put the harness in your pocket. Telegram is the course path.',
    ),
    minutes: 25,
    proof: L(
      'You messaged the bot from Telegram, got a real reply from your profile, and allowlist/pairing is on.',
    ),
    sections: [
      {
        heading: L('Why gateway sits here (not at the end)'),
        paragraphs: [
          L(
            'Once Hermes is installed and has a SOUL, pocket access is the fastest proof the harness is real. We wire Telegram before deep tool/MCP theory so you feel the agent outside the laptop early — then Part I finishes by expanding what it can do with tools.',
          ),
          L(
            'A harness that only lives in one window is half a harness. Messaging is how you run work from the couch, the street, or a VPS you never SSH into daily.',
          ),
        ],
        callout: L(
          'Order: Install → Soul → Gateway → Tools. Not “tools first, phone never.”',
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Telegram path (Desktop)'),
        steps: [
          L('Open Telegram → @BotFather → create a bot → copy the token.'),
          L('In Hermes Desktop: gateway / messaging setup → Telegram. Paste the token into the app (stored in env — never in a public chat).'),
          L('Allowlist: only your Telegram user id. Empty allowlists fail closed.'),
          L('Start the gateway with the Desktop control. Leave Desktop running while you test.'),
          L('Message the bot. If a pairing code appears, approve only on your side. Do not share codes.'),
          L('Send: “Who are you and what are your hard limits?” — it should match your SOUL.'),
        ],
        callout: L(
          'Trust: pairing + allowlist. Never open the bot to everyone for this course. Official Telegram docs win if labels move.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('Runtime note (Desktop gateway)'),
        bullets: [
          L('PC must be awake for the gateway while you rely on Telegram from this machine.'),
          L('Desktop gateway settings also surface other platforms (Discord, etc.) — Telegram is the course proof; add others only after it works.'),
          L('Always-on later: same allowlist habits if you run gateway on a VPS or always-on host — providers and gateway screens are where remote/host options show up.'),
          L('One profile ≈ one bot token when you need concurrent personas later.'),
        ],
        links: [
          { label: L('Telegram setup'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram' },
          { label: L('Messaging overview'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging' },
          { label: L('Security (allowlists)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
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
      'You already have the pocket. Now tools, spend control, and a Desktop quick win.',
    ),
    minutes: 30,
    proof: L(
      'In Desktop (default): a multi-step tool task left a file or on-screen result you can open. Telegram optional for the same task. You know where model cost leaks happen.',
    ),
    sections: [
      {
        heading: L('Type 1 — agent with tools'),
        paragraphs: [
          L(
            'You already talk to Hermes from Telegram (previous module). Now open its hands: terminal, browser, filesystem, search (when configured). The model requests; Hermes executes.',
          ),
          L(
            'In Desktop: open Tools / Dashboard, confirm toolsets for this profile, run the proof from Desktop chat (Telegram is fine as a second surface).',
          ),
        ],
        bullets: [
          L('Prefer structured tools over long shell improvisation when both exist.'),
          L('A failing tool should return a clean error so the model can recover.'),
          L('Scope tools to the job. Research does not need full write+shell if read+web is enough.'),
          L('If Portal setup enabled Tool Gateway tools, verify them in the Tools UI.'),
          L('Sessions can resume — continue a known thread for long jobs when the UI offers it.'),
        ],
        links: [
          { label: L('Tools'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
          { label: L('Sessions'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/sessions' },
        ],
      },
      {
        heading: L('Terminal backend (Advanced — relevant when tools hit the shell)'),
        paragraphs: [
          L(
            'When tools run shell/file work, Hermes uses a terminal backend. Day one stays local (host process). In Desktop Settings → Advanced you will often see Docker (and other backends): commands run in a container so mistakes are less likely to wreck the host.',
          ),
        ],
        bullets: [
          L('Local (default for this course) — simplest; approvals still matter'),
          L('Docker — isolation; enable only after chat + tools work and you understand the trade-off'),
          L('SSH / cloud sandboxes — remote workers; same idea as “brain local, hands elsewhere”'),
        ],
        callout: L(
          'Do not flip Advanced → Docker mid-proof just to experiment. Know the setting; harden after Part I if you want.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Docker / backends'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Security (containers)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
        ],
      },
      {
        heading: L('MCP — plug services carefully'),
        paragraphs: [
          L(
            'MCP connects external services (docs, drives, repos, APIs) through a standard interface. Treat every MCP server as new code on the agent’s trust surface.',
          ),
        ],
        bullets: [
          L('Add one server for a real need — not every server you can find.'),
          L('Filter tools to the smallest useful surface.'),
          L('Prefer OAuth over long-lived tokens when the server offers it.'),
          L('Secrets should not appear in chat; store them in .env / setup.'),
        ],
        links: [
          { label: L('MCP with Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes' },
          { label: L('Tools docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
        ],
      },
      {
        heading: L('Spend intelligence wisely'),
        paragraphs: [
          L(
            'Provider and model are different decisions. Provider = auth and billing. Model = capability and price. Use a strong model where mistakes are expensive; cheap models for auxiliary jobs (titles, search helpers, compression) when your setup supports them.',
          ),
        ],
        bullets: [
          L('Stabilize one primary model before adding fallbacks.'),
          L('Credential pools (multiple keys) help survive rate limits — not only multi-billing.'),
          L('Local models: set a large enough context window; broken tool loops are often truncated context, not “Hermes is dumb.”'),
          L('Providers screen is also where remote/local OpenAI-compatible endpoints show up (including a model host that is not this PC).'),
          L('If you run a local OpenAI-compatible endpoint later, keep real OAuth credentials out of third-party tools.'),
        ],
        links: [
          { label: L('Configuration / providers'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration' },
        ],
      },
      {
        heading: L('Proof task'),
        steps: [
          L('Ask: “List the largest folders in my Downloads (or home), propose an archive plan, write the plan to a markdown file in a safe path I choose.”'),
          L('Approve tool actions if prompted. Prefer smart approvals: safe actions pass, dangerous ones ask.'),
          L('Open the markdown file yourself. That file is the receipt.'),
        ],
      },
      {
        heading: L('Desktop cockpit (expected on the default path)'),
        paragraphs: [
          L(
            'If you followed module 03’s default path, Hermes Desktop is your everyday cockpit for tools, approvals, and sessions for the rest of the course — not an optional extra.',
          ),
          L(
            'Stretch proof (recommended): ask the agent to create a small custom UI widget (e.g. system memory monitor) if your build supports it. If it can change the Desktop, you felt agency twice — phone + machine.',
          ),
        ],
        callout: L(
          'Keep Desktop open as the home surface for the rest of the course.',
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Human in the loop (type 6)'),
        paragraphs: [
          L(
            'Default safety: dangerous actions need approval. Smart mode lets an auxiliary judgment pass low-risk actions and escalate uncertainty. Keep this on. Mistakes on email, deletes, and deploys are expensive. YOLO-style modes exist for experts; they are not the course default. Even with YOLO, a hardline blocklist still refuses catastrophic host wipes — do not treat YOLO as “safe.”',
          ),
        ],
      },
      {
        heading: L('After this proof'),
        paragraphs: [
          L(
            'Spend and tools intro live here. To measure one job and cut a toolset, use the spend drill lab — not a second lecture.',
          ),
        ],
        links: [
          { label: L('Lab: spend drill'), href: '/forge/course/open-harness/labs/model-spend/' },
          { label: L('Lab: failure studio (after tools work)'), href: '/forge/course/open-harness/labs/failure-studio/' },
          { label: L('Tips & best practices'), href: 'https://hermes-agent.nousresearch.com/docs/guides/tips' },
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
      'Context is RAM. Memory is disk. Cap is a feature. Writes often show next session.',
    ),
    minutes: 30,
    proof: L(
      'You wrote a durable fact, verified it on disk, closed the session, reopened, and the agent still knew it.',
    ),
    sections: [
      {
        heading: L('Three floors'),
        table: {
          headers: [L('Floor'), L('What'), L('Limit')],
          rows: [
            [L('1 · Notebook'), L('SOUL, MEMORY, USER — always loaded'), L('Intentionally capped')],
            [L('2 · Journal'), L('Session recall — verbatim / FTS search'), L('Local history size')],
            [L('3 · Library'), L('Vault / external notes (next module)'), L('Your disk')],
          ],
        },
      },
      {
        heading: L('Cap-as-feature'),
        paragraphs: [
          L(
            'MEMORY.md and USER.md share a tight prompt budget on purpose. The small cap forces durable preferences, facts, corrections, and conventions — not a junk drawer of chat logs. Near capacity, merge, compress, and drop stale lines.',
          ),
        ],
        callout: L(
          'Remembering everything is remembering nothing. Prefer dense facts over chatty logs.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('Gotcha: write now, load next session'),
        paragraphs: [
          L(
            'Disk updates can succeed immediately while the current system prompt stays frozen for cache efficiency. A same-session “do you remember?” test can look like failure even when the file on disk is correct. Always verify the file, then open a new session for the behavioral proof.',
          ),
        ],
        callout: L(
          'If MEMORY.md has the line and this session ignores it — close and reopen before blaming the agent.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('MEMORY.md and USER.md'),
        paragraphs: [
          L(
            'MEMORY.md is the agent’s notebook (environment, conventions, lessons). USER.md is your card (name, preferences, avoid-list). The agent writes them; you can open and edit them in any text editor. If it is not written, it disappears.',
          ),
        ],
        callout: L(
          'File over app: try the same honesty with a closed chat product. You cannot.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('External providers (optional)'),
        paragraphs: [
          L(
            'Pluggable providers (user modeling, fact extraction, graphs, etc.) augment the built-in layer — they do not replace your files. Run one provider at a time. Switching providers does not migrate what you accumulated in the previous one.',
          ),
        ],
        bullets: [
          L('Default for this course: files + vault.'),
          L('Add one provider only when built-in memory is clearly not enough.'),
          L('Export or note important facts before you switch providers.'),
        ],
      },
      {
        heading: L('Proof ritual'),
        steps: [
          L('Tell the agent: “Remember that project codename is HARNESS-01 and I prefer short answers.”'),
          L('Ask it to write that to durable memory.'),
          L('Open MEMORY.md / USER.md on disk and verify the lines (this is the real check).'),
          L('Fully close the session. Reopen. Ask: “What is my project codename and answer length preference?”'),
          L('Bonus: “What did we say about the vault?” via session recall if available.'),
        ],
        links: [
          { label: L('Memory system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory' },
        ],
      },
      {
        heading: L('Memory vs hallucination'),
        paragraphs: [
          L(
            'Without memory the model fills gaps with confidence. With memory and sources it consults first. Not infallible — but checkable by you and by it.',
          ),
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
      'Obsidian as the unlimited library floor. Notes you keep forever.',
      'Obsidian comme étage bibliothèque illimité. Des notes pour toujours.',
    ),
    minutes: 25,
    proof: L(
      'Hermes retrieves a note you wrote in the vault — not a generic web answer.',
      'Hermes retrouve une note que tu as écrite dans le vault — pas une réponse web générique.',
    ),
    sections: [
      {
        heading: L('Vault = a folder', 'Vault = un dossier'),
        paragraphs: [
          L(
            'An Obsidian vault is a folder of markdown on your disk. Free, no account required for local use. Your agent reads and writes there when connected.',
            'Un vault Obsidian est un dossier de markdown sur ton disque. Gratuit, sans compte pour l’usage local. Ton agent y lit et écrit une fois connecté.',
          ),
        ],
        steps: [
          L('Install Obsidian. Create a vault named second-brain (or similar).', 'Installe Obsidian. Crée un vault second-brain (ou similaire).'),
          L('Create three folders: inbox / sources / synthesis.', 'Crée trois dossiers : inbox / sources / synthesis.'),
          L('Drop two or three short notes about a real project.', 'Dépose deux ou trois notes courtes sur un vrai projet.'),
          L('Connect Hermes to the vault path (Obsidian skill / config as in your Hermes version).', 'Branche Hermes sur le chemin du vault (skill Obsidian / config selon ta version).'),
          L('Ask: “Find my notes on X and summarize with quotes.”', 'Demande : « Retrouve mes notes sur X et résume avec citations. »'),
        ],
      },
      {
        heading: L('Linked notes', 'Notes liées'),
        paragraphs: [
          L(
            'Double brackets [[like this]] turn notes into a network. The graph is a map of what you know — the agent navigates links, not only keyword search.',
            'Les doubles crochets [[comme ça]] font réseau. Le graphe est la carte de ce que tu sais — l’agent navigue les liens, pas seulement les mots-clés.',
          ),
        ],
      },
      {
        heading: L('Wiki pattern (advanced idea)', 'Pattern wiki (idée avancée)'),
        paragraphs: [
          L(
            'Pure RAG re-searches every time and nothing compounds. A wiki-style loop deposits sources, summarizes, updates linked pages, flags contradictions. Your vault becomes compiled knowledge.',
            'Le RAG pur re-cherche à chaque fois et rien ne s’accumule. Une boucle type wiki dépose des sources, résume, met à jour les pages liées, signale les contradictions. Le vault devient du savoir compilé.',
          ),
        ],
        callout: L(
          'Default for this course: files on disk + vault. External memory providers are optional and never replace your files. Run one provider at a time if you add any.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Obsidian'), href: 'https://obsidian.md' },
          { label: L('File over app'), href: 'https://stephango.com/file-over-app' },
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
      'Procedural memory that loads on demand — not a second system prompt dump.',
    ),
    minutes: 20,
    proof: L(
      'You listed skills for this profile, ran or inspected one, and wrote skills-notes.md with name + when to use it.',
    ),
    sections: [
      {
        heading: L('What a skill is'),
        paragraphs: [
          L(
            'A skill is a reusable instruction package (SKILL.md). Front matter names and describes it; the body teaches the procedure. Hermes sees names + descriptions first — a vague description means the right skill may never load.',
          ),
          L(
            'Skills are progressive disclosure: the catalog stays cheap; only the selected skill body enters the prompt. That is how you keep a large library without burning the context window every turn.',
          ),
        ],
        bullets: [
          L('Skill = procedure / knowledge package (agentskills-compatible).'),
          L('Plugin / MCP = executable surface or product hooks — different layer.'),
          L('Slash commands (e.g. /plan) and /learn can capture workflows as skills when your build supports them.'),
          L('Install narrowly; let security scans run on hub skills before you trust them.'),
          L('Pin / curator: business-critical skills should not vanish to automated cleanup — see Curator docs when you outgrow defaults.'),
        ],
      },
      {
        heading: L('Desktop first'),
        steps: [
          L('Open Skills in Hermes Desktop.'),
          L('Paste the list into skills-notes.md under your course notes folder.'),
          L('Try one bundled skill appropriate to your OS (e.g. a file or shell helper).'),
          L('Optional: browse hub and install one official skill after reading the scan warning — log why you installed it. Do not install a catalog “for later.”'),
        ],
        callout: L(
          'If everything is “on,” the model spends tokens deciding which skill, not doing the job. Least privilege on skills. Skills Hub is a map — not homework.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Skills system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills' },
          { label: L('Work with skills (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/work-with-skills' },
          { label: L('Curator (later)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/curator' },
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('skills-notes.md exists with at least three skill names'),
          L('One skill run or inspect logged with outcome'),
          L('You can say skill vs MCP in one sentence'),
        ],
        links: [
          { label: L('Next: Security'), href: '/forge/course/open-harness/10/' },
          { label: L('Sample skills-notes'), href: '/courses/open-harness/samples/skills-notes.example.md' },
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
      'There is no fully capable, fully safe agent. Tune trust for who can reach it.',
    ),
    minutes: 20,
    proof: L(
      'You confirmed allowlist + approval mode (smart or manual), wrote security-dials.md with three settings and why, and did not enable YOLO for this course.',
    ),
    sections: [
      {
        heading: L('Threat model in one page'),
        paragraphs: [
          L(
            'Private laptop ≠ public bot. Capability and safety trade off — pick deliberately. Gateway should fail closed: strangers never reach tools by default.',
          ),
        ],
        bullets: [
          L('Allowlist who may talk on messaging gateways (fail closed if unset).'),
          L('Approvals: manual | smart (default) | off — course uses smart or manual. YOLO / --yolo is expert-only and still cannot bypass the hardline blocklist.'),
          L('Timeouts deny by default when you do not answer.'),
          L('Secret filtering: tokens stay out of prompts and MCP child envs where possible.'),
          L('Injection scans on SOUL / AGENTS.md / context files; tirith-style scanners catch pipe-to-shell and homoglyph tricks when enabled.'),
          L('Network: SSRF protections block private ranges; only open them for a trusted local service you understand.'),
          L('Profile least privilege: a researcher does not need the same surface as a coder.'),
          L('Optional later: hermes approvals suggest mines past approvals into allowlist proposals — never auto-applies destructive classes.'),
        ],
        callout: L(
          'Leave defaults on for this course. “Disable approvals to go faster” is how harnesses become liabilities. Checkpoints/rollback (if your build offers them) are a safety net — not a substitute for approvals.',
        ),
        calloutVariant: 'warning',
        links: [
          { label: L('Security guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
          { label: L('Checkpoints & rollback'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/checkpoints-and-rollback' },
          { label: L('Lab: key rotation'), href: '/forge/course/open-harness/labs/api-key-hygiene/' },
          { label: L('Lab: failure studio'), href: '/forge/course/open-harness/labs/failure-studio/' },
        ],
      },
      {
        heading: L('Desktop check'),
        steps: [
          L('Open gateway / security / approvals UI for this profile (or config.yaml approvals.mode).'),
          L('Confirm allowlist still only your user id (Telegram path from module 05).'),
          L('Set or confirm smart approvals (or manual if you prefer slower). Never YOLO for course work.'),
          L('Write security-dials.md: allowlist status, approval mode, one tool surface you turned off or left off.'),
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('security-dials.md has three concrete settings'),
          L('YOLO is off (or explicitly documented expert exception)'),
          L('You know where logs live if something scary happens'),
        ],
        links: [
          { label: L('Next: Cron'), href: '/forge/course/open-harness/11/' },
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
      'Automation that is a full runbook — not a one-line hope. Each fire is amnesia.',
    ),
    minutes: 25,
    proof: L(
      'You created one self-contained cron job (or a fully written plan) with host/path/success/failure/delivery — and ran it once or dry-ran the prompt.',
    ),
    sections: [
      {
        heading: L('Amnesia is a feature'),
        paragraphs: [
          L(
            'Cron usually lives with the always-on gateway. Each run is a fresh, isolated session that knows nothing about “that issue from yesterday.” Write a self-contained runbook in the job prompt.',
          ),
        ],
        bullets: [
          L('Include host/path/command/expected state/delivery target/success and failure behavior.'),
          L('silent: suppress “all good” noise; still surface failures.'),
          L('no_agent / script-only path: when a deterministic check needs no model tokens.'),
          L('Wake gate: cheap pre-check first; wake the model only when something changed.'),
          L('Jobs should not spawn infinite new jobs — runaway self-scheduling is blocked in healthy setups.'),
          L('Dangerous commands in cron: prefer approvals.cron_mode deny (default) so headless jobs cannot YOLO host damage.'),
        ],
      },
      {
        heading: L('Build one job'),
        steps: [
          L('Define a tiny job: e.g. weekday 08:00 — three AI headlines, short summary, deliver to Telegram (or a local file if no gateway).'),
          L('Write the prompt as if the agent has amnesia (full runbook). Save as cron-runbook.md.'),
          L('Create it in Desktop cron UI or Hermes cron flow for your version.'),
          L('Run once manually if possible, then leave it scheduled — or stop after dry-run if you are offline.'),
        ],
        callout: L(
          'Spend on cron is easy to waste. Prefer script checks first; wake the model only when the check fails or changes.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Cron feature docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron' },
          { label: L('Automate with cron (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/automate-with-cron' },
          { label: L('Lab: webhooks (events beyond cron)'), href: '/forge/course/open-harness/labs/webhooks/' },
          { label: L('Sample runbook'), href: '/courses/open-harness/samples/cron-runbook.example.md' },
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('cron-runbook.md is self-contained (stranger could run it)'),
          L('Job created in Desktop/CLI or fully planned with schedule'),
          L('Success and failure paths both named'),
        ],
        links: [
          { label: L('Next: Own forever'), href: '/forge/course/open-harness/12/' },
          { label: L('All Harness Labs'), href: '/forge/course/open-harness/labs/' },
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
      'Backup, growth map, and the next moves — without bloating the basics path.',
    ),
    minutes: 20,
    proof: L(
      'You know which folders to back up, how to brief a sub-agent, and which growth step fits your next pain.',
    ),
    sections: [
      {
        heading: L('What to back up'),
        bullets: [
          L('Hermes home / profile directory (SOUL, memory, config, skills you care about)'),
          L('Your Obsidian vault and any AGENTS.md / project context you rely on'),
          L('.env is secrets — back up encrypted, never publish'),
        ],
        callout: L(
          'Copy the folders. That is the backup. The harness is portable because it is files.',
        ),
        calloutVariant: 'quote',
        links: [
          { label: L('Sample tree'), href: '/courses/open-harness/samples/profile-tree.example.md' },
        ],
      },
      {
        heading: L('Stay current'),
        paragraphs: [
          L(
            'Official docs refresh often. Run hermes update (or reinstall Desktop) on a cadence you can keep. After updates: hermes doctor, one chat smoke, gateway still allowlisted. If a flag renames, Installation / Updating docs win over this course page.',
          ),
        ],
        links: [
          { label: L('Updating Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating' },
          { label: L('Learning path (official)'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/learning-path' },
        ],
      },
      {
        heading: L('When you outgrow one agent'),
        paragraphs: [
          L(
            'Sub-agents: spawn helpers for independent messy work. Brief them like strangers (exact failure, paths, definition of done). Give least tools. Prefer cheap children + a strong parent for synthesis. Do not delegate tightly sequential interactive work.',
          ),
          L(
            'Profiles: a full second Hermes home (own model, memory, gateway, persona) — not a temporary helper. Use when roles must stay isolated forever.',
          ),
          L(
            'Kanban / boards: when work must cross agents and survive restarts. Official multi-agent Kanban docs exist — use them when serial pain is real, not for vanity.',
          ),
        ],
        callout: L(
          'Basics stop at one solid harness. Multi-agent and extra messaging platforms are optional growth — or a future Forge track — not Part I homework.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Delegation'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation' },
          { label: L('Kanban multi-agent'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban' },
        ],
      },
      {
        heading: L('Growth map — seven patterns'),
        paragraphs: [
          L(
            'You already practice tools + approvals. Add the rest when pain appears — not for vanity.',
          ),
        ],
        bullets: [
          L('1 Tools — day one (done)'),
          L('2 MCP servers — when work lives across Notion/GitHub/Slack/APIs'),
          L('3 Sequential pipeline — multi-step jobs via profiles + wake gates'),
          L('4 Parallel — research fan-out / batch delegation'),
          L('5 Routers — assign by type to specialist profiles / board'),
          L('6 Human in the loop — keep forever for high-impact actions'),
          L('7 Dynamic sub-agents — orchestrator spawns help mid-task'),
        ],
      },
      {
        heading: L('Course completion checklist'),
        checklist: [
          L('Lexicon: agent vs chat, harness vs runtime'),
          L('Hermes Desktop on this PC; chat works; Advanced left default for proofs'),
          L('You know where Settings → Advanced / Providers / Gateway live for later'),
          L('SOUL in Hermes home (not project CWD); SOUL vs AGENTS.md clear'),
          L('Tool task completed; smart approvals on'),
          L('Telegram gateway trusted and working'),
          L('Memory fact on disk + survives new session (not same-session only)'),
          L('Vault note retrieved'),
          L('Skills listed (09); security dials written (10); cron runbook (11)'),
          L('Backup locations known; update habit named'),
        ],
      },
      {
        heading: L('Next ops (when Desktop basics feel boring)'),
        paragraphs: [
          L(
            'Same product, deeper Settings: Docker terminal backend, remote providers, always-on gateway host, Termux/phone paths. Official docs + Harness Labs (VPS ship, remote shell) cover them — optional after this checklist, not instead of it.',
          ),
        ],
        links: [
          { label: L('Docker guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Lab: VPS ship'), href: '/forge/course/open-harness/labs/vps-ship/' },
          { label: L('Lab: remote shell'), href: '/forge/course/open-harness/labs/remote-access/' },
        ],
      },
      {
        heading: L('Keep going'),
        paragraphs: [
          L(
            'Official docs are the living manual. Optional labs deepen ops. Open Design is the next live mastery track. More harness courses may join Forge later.',
          ),
        ],
        links: [
          { label: L('Hermes docs home'), href: 'https://hermes-agent.nousresearch.com/docs/' },
          { label: L('Docs index (llms.txt)'), href: 'https://hermes-agent.nousresearch.com/docs/llms.txt' },
          { label: L('Harness Labs (after mastery)'), href: '/forge/course/open-harness/labs/' },
          { label: L('Open Design'), href: '/forge/course/open-design/' },
          { label: L('Sample gallery'), href: '/courses/open-harness/samples/README.md' },
          { label: L('Contact Delta V'), href: '/contact/?topic=open-harness' },
          { label: L('Back to Forge'), href: '/forge/' },
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
