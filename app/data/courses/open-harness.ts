/**
 * Open Harness — curriculum (EN primary; FR fields kept for a later translate job).
 * Sources: Delta V ateliers + official Hermes docs.
 * Voice: formal, concise (offer-card tone). Basics/lexicon first; Desktop day-one; no Docker track.
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
    subtitle: L(
      'Basics and lexicon, then Hermes Desktop on your PC — soul, Telegram gateway, and a first tools proof.',
    ),
    promise: L(
      'You leave with shared vocabulary, a working Desktop install, a written soul, Telegram access, and proof the agent can act with tools.',
    ),
    startSlug: '00',
    slugs: ['00', '01', '02', '03', '04', '05', '06'],
  },
  {
    id: 2,
    code: 'II',
    title: L('Your compounding harness'),
    subtitle: L(
      'Memory, vault, skills, security dials, and cron — each as its own module so the system compounds.',
    ),
    promise: L(
      'You leave with durable memory on disk, a linked vault, skills under control, documented trust settings, and one self-contained cron runbook.',
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
    en: 'From lexicon to a harness you own — Hermes Desktop, end to end.',
    fr: 'From lexicon to a harness you own — Hermes Desktop, end to end.',
  } satisfies LocaleString,
  description: {
    en: 'Part I covers AI basics, install, soul, gateway, and tools. Part II covers memory, vault, skills, security, and cron. Day one is local Desktop; advanced hosts and Docker appear in Settings only when needed. Labels follow official Hermes docs.',
    fr: 'Part I covers AI basics, install, soul, gateway, and tools. Part II covers memory, vault, skills, security, and cron. Day one is local Desktop; advanced hosts and Docker appear in Settings only when needed. Labels follow official Hermes docs.',
  } satisfies LocaleString,
  verifiedAsOf: '2026-08-06',
  revision: 'mvp-forge-2026-08',
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
      'Two parts: vocabulary and a working agent, then a harness that remembers and compounds.',
    ),
    minutes: 5,
    proof: L(
      'You can state Part I and Part II outcomes in one sentence each, and name why module 01 (lexicon) comes before install.',
    ),
    sections: [
      {
        heading: L('The promise'),
        paragraphs: [
          L(
            'Most people rent intelligence: a browser tab, a subscription, and memory they cannot open offline. This course builds the opposite — a Hermes harness whose identity, tools, memory, and gateway live in files you control.',
          ),
          L(
            'Day one is Hermes Desktop on your PC. The same files remain portable later; we do not teach CLI or VPS install here. We do cover the basics — lexicon, mental models, and ownership — so the stack is intelligible before you configure anything.',
          ),
        ],
        callout: L(
          'Prefer harness over model. Models change; your loop, tools, soul, and memory remain. UI labels follow official Hermes docs and may move with the product.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('How the course is built'),
        paragraphs: [
          L(
            'Two arcs. Complete Part I before Part II. Part II assumes Desktop chat works, SOUL.md exists, and the Telegram gateway is trusted.',
          ),
        ],
        table: {
          headers: [L('Part'), L('Name'), L('You leave with')],
          rows: [
            [
              L('I'),
              L('Your sovereign agent'),
              L('Lexicon, Desktop, SOUL, Telegram gateway, tools proof'),
            ],
            [
              L('II'),
              L('Your compounding harness'),
              L('Memory, vault, skills, security dials, cron runbook, backup map'),
            ],
          ],
        },
      },
      {
        heading: L('What you leave with'),
        checklist: [
          L('Shared vocabulary (agent, harness, token, context, cron)'),
          L('Part I: Desktop cockpit and the agent reachable from your phone'),
          L('Part II: memory, vault, skills, and cron on disk'),
          L('Files you can open offline and back up by copy'),
        ],
      },
      {
        heading: L('How to follow'),
        bullets: [
          L('Desktop path only — skip CLI-first install guides for this course.'),
          L('Modules in order; each ends with a binary proof.'),
          L('Do not skip module 01 unless you already explain agent vs chat and harness vs runtime cleanly.'),
          L('If a button label moved, official docs win. Install carries a verified-as-of date.'),
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
      'Shared vocabulary before install — so every later module is precise.',
      'Vocabulaire commun avant l’install — pour que chaque module soit précis.',
    ),
    minutes: 20,
    proof: L(
      'You can define agent vs chat and harness vs runtime in plain language, without empty jargon.',
      'Tu définis agent vs chat et harness vs runtime en langage clair, sans jargon vide.',
    ),
    sections: [
      {
        heading: L('Why this module first'),
        paragraphs: [
          L(
            'Open Harness is not only install steps. Without a shared lexicon, Settings screens and official docs stay opaque. Read the cards; the table at the end is the decision frame for the rest of the course.',
          ),
        ],
      },
      {
        heading: L('Definition cards', 'Cartes de définition'),
        lexicon: [
          {
            term: L('LLM', 'LLM'),
            body: L(
              'Large Language Model: a model trained on large text corpora. It predicts the next token with high skill. It answers, drafts, translates, and codes — it does not “understand” the way a person does.',
              'Large Language Model : un modèle entraîné sur de grands corpus. Il prédit le prochain token avec une grande habileté. Il répond, rédige, traduit, code — il ne « comprend » pas comme une personne.',
            ),
            remember: L('Strong next-token prediction is not agency by itself.', 'Une forte prédiction de tokens n’est pas l’agency.'),
          },
          {
            term: L('Agent', 'Agent'),
            body: L(
              'LLM plus tools plus memory. A chat product answers. An agent acts: files, terminal, browser, messages, scheduled work.',
              'LLM + outils + mémoire. Un chat répond. Un agent agit : fichiers, terminal, navigateur, messages, tâches planifiées.',
            ),
            remember: L('Brain + hands + memory = agent.', 'Cerveau + mains + mémoire = agent.'),
          },
          {
            term: L('Token', 'Token'),
            body: L(
              'The unit of model I/O and, for cloud APIs, cost. Roughly three-quarters of a word. Local inference shifts cost to hardware and time.',
              'Unité d’entrée/sortie du modèle et, en cloud, de facturation. Environ trois quarts d’un mot. En local, le coût bascule vers le matériel et le temps.',
            ),
            remember: L('Cloud bills tokens; local bills hardware and patience.', 'Le cloud facture le token ; le local facture le matériel et le temps.'),
          },
          {
            term: L('API key & .env', 'Clé API & .env'),
            body: L(
              'An API key authenticates a program to a provider. A .env file holds secrets outside the repository. A leaked key is unauthorized spend in your name.',
              'Une clé API authentifie un programme auprès d’un fournisseur. Un .env stocke les secrets hors du dépôt. Une clé exposée, c’est de la dépense non autorisée à ton nom.',
            ),
            remember: L('Keys in .env. Never commit .env.', 'Clés dans .env. Ne jamais committer .env.'),
          },
          {
            term: L('Runtime vs harness', 'Runtime vs harness'),
            body: L(
              'Runtime is where the process runs: PC, VPS, container. Harness is the frame that turns a model into an agent: loop, tools, context, memory, approvals, gateways.',
              'Le runtime est le lieu d’exécution : PC, VPS, conteneur. Le harness est le cadre qui fait d’un modèle un agent : boucle, outils, contexte, mémoire, approbations, gateways.',
            ),
            remember: L('Runtime = where. Harness = how it becomes yours.', 'Runtime = où. Harness = comment ça devient à toi.'),
          },
          {
            term: L('Skills, plugins, MCP', 'Skills, plugins, MCP'),
            body: L(
              'A skill is a reusable procedure (often SKILL.md). A plugin adds product capability. MCP is an open standard for connecting external services through one interface.',
              'Une skill est une procédure réutilisable (souvent SKILL.md). Un plugin ajoute une capacité produit. MCP est un standard ouvert pour brancher des services externes via une interface unique.',
            ),
            remember: L('Skills describe how; MCP describes what you plug in.', 'Les skills décrivent le comment ; MCP ce que l’on branche.'),
          },
          {
            term: L('Local vs cloud models', 'Modèles local vs cloud'),
            body: L(
              'Local models run on your machine — data stays, you pay hardware. Cloud models run at a provider — pay per use, often higher capability, data leaves. A good harness lets you change this choice without rewriting the agent.',
              'Local : modèle sur ta machine — données chez toi, coût matériel. Cloud : chez le fournisseur — à l’usage, souvent plus capable, les données sortent. Un bon harness permet de changer ce choix sans réécrire l’agent.',
            ),
            remember: L('What matters is an explicit choice, not ideological purity.', 'L’essentiel est un choix explicite, non une pureté idéologique.'),
          },
          {
            term: L('Cron', 'Cron'),
            body: L(
              'A scheduled job. Example: each weekday at 08:00, fetch headlines, summarize three items, deliver to Telegram. Work that continues without you in the chair.',
              'Une tâche planifiée. Exemple : chaque jour ouvré à 8h, récupérer des titres, en résumer trois, livrer sur Telegram. Du travail qui continue sans toi devant l’écran.',
            ),
            remember: L('Harness + cron = recurring work without a live session.', 'Harness + cron = travail récurrent sans session ouverte.'),
          },
          {
            term: L('Context window', 'Fenêtre de contexte'),
            body: L(
              'Everything the model can see in the current session. Large and volatile: close or prune the session and it fades. Treat it as RAM, not permanent storage.',
              'Tout ce que le modèle voit dans la session. Large et volatile : fermer ou élaguer efface. C’est de la RAM, pas un stockage permanent.',
            ),
            remember: L('Context is session RAM; durable memory is what you write to disk.', 'Le contexte est la RAM de session ; la mémoire durable s’écrit sur disque.'),
          },
          {
            term: L('Hallucination', 'Hallucination'),
            body: L(
              'Models must emit tokens. When evidence is missing, they complete the pattern with plausible text. Grounding in files and sources reduces, but does not eliminate, that risk.',
              'Un modèle doit émettre des tokens. Sans évidence, il complète le motif avec du texte plausible. Ancrer dans des fichiers et sources réduit le risque sans l’éliminer.',
            ),
            remember: L('Unknown → invention. Prefer files you can open.', 'Inconnu → invention. Préférer des fichiers ouverts.'),
          },
        ],
      },
      {
        heading: L('Chat product vs harness agent'),
        table: {
          headers: [L('Chat in the browser'), L('Agent on your harness')],
          rows: [
            [L('Answers; you copy-paste'), L('Acts on files and tools')],
            [L('Forgets when the tab closes'), L('Can persist facts and projects on disk')],
            [L('Requires you present'), L('Can run on schedule or gateway')],
            [L('One reply at a time'), L('Chains multi-step work')],
          ],
        },
        callout: L(
          'When you need action rather than prose alone, you need an agent inside a harness you control.',
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
      'Day-one runtime: this PC and Hermes Desktop. Advanced hosts stay in Settings until you need them.',
    ),
    minutes: 10,
    proof: L(
      'You can state the day-one path (Desktop on this PC), that Hermes home is a folder on disk, and where Advanced / Providers / Gateway live for later.',
    ),
    sections: [
      {
        heading: L('Day one (this course)'),
        paragraphs: [
          L(
            'Use Hermes Desktop on the computer you use every day. Chat, profiles, tools, gateway, and cron share one UI. Complete Part I on this path before always-on hosts.',
          ),
        ],
        bullets: [
          L('Machine: your PC (awake when Telegram or cron must answer)'),
          L('App: Hermes Desktop installer — not a CLI-first install for this course'),
          L('Files: Hermes home on disk; back up by copying folders'),
        ],
        checklist: [
          L('You know which PC will host the course proofs'),
          L('You accept Desktop as the cockpit for modules 03–12'),
        ],
      },
      {
        heading: L('Model location is separate'),
        paragraphs: [
          L(
            'Where Hermes runs is not where the model runs. Most learners keep Hermes local and call a cloud provider. Fully local models are optional and do not change the Desktop path.',
          ),
        ],
      },
      {
        heading: L('Advanced options (map only — do not configure yet)'),
        paragraphs: [
          L(
            'Docker, remote terminals, and always-on hosts are real product features. They appear inside Desktop when relevant — not as alternate day-one curricula.',
          ),
        ],
        bullets: [
          L('Settings → Advanced: terminal backend / Docker (isolate tool commands)'),
          L('Providers: cloud APIs or local OpenAI-compatible endpoints'),
          L('Gateway: messaging surfaces; later, the same profile can run on a host that stays awake'),
          L('Phone-only paths (e.g. Termux) exist in official docs — not the course cockpit'),
        ],
        callout: L(
          'For Open Harness proofs, leave Advanced on local defaults. Knowing the map is enough for now.',
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
      'Download, complete setup, obtain one chat reply. Leave Advanced settings for later.',
    ),
    minutes: 25,
    proof: L(
      'Hermes Desktop is open, setup is finished, one chat reply works, and Advanced/Docker was left at defaults.',
    ),
    sections: [
      {
        heading: L('You need'),
        bullets: [
          L('A PC you control (Windows or macOS; Linux Desktop if offered for your build)'),
          L('Network for download and one model provider'),
        ],
      },
      {
        heading: L('Install Desktop'),
        paragraphs: [
          L(
            'Later modules assume this cockpit: chat, profiles, tools, approvals, gateway, and cron.',
          ),
        ],
        steps: [
          L('Open hermes-agent.nousresearch.com and download Hermes Desktop for your OS.'),
          L('Install and launch the application.'),
          L('Complete the setup wizard with one reliable provider. Optional: Portal / “setup with portal” if offered (model + Tool Gateway).'),
          L('Stop when chat works. Do not configure Telegram yet. Do not change Settings → Advanced.'),
          L('Send: “Reply with one sentence confirming you are online.”'),
          L('Optional: use health / doctor in the app if shown; fix only what blocks chat.'),
        ],
        callout: L(
          `Day-one path is Desktop on this PC (verified ${OPEN_HARNESS_META.verifiedAsOf}). If a wizard label moved, official Installation docs win.`,
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Download Hermes Desktop'), href: 'https://hermes-agent.nousresearch.com/' },
          { label: L('Installation docs'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
          { label: L('Quickstart'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
        ],
      },
      {
        heading: L('Settings map (inspect, then leave defaults)'),
        paragraphs: [
          L(
            'After chat works, open Settings once to learn the layout, then close without changing Advanced defaults.',
          ),
        ],
        bullets: [
          L('Providers / models — APIs, local endpoints, routing'),
          L('Gateway / messaging — Telegram and other surfaces (module 05)'),
          L('Advanced — terminal backend, Docker, isolation (not required for Part I proofs)'),
        ],
        callout: L(
          'CLI, Termux, and VPS installs are documented officially. This course stays on Desktop so the first harness is not a shell exercise.',
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
            'Choose one model provider you can call reliably, then stop. Do not debug gateway, Docker, and authentication in parallel.',
          ),
        ],
      },
      {
        heading: L('Where your files live'),
        paragraphs: [
          L(
            'Desktop stores the harness on disk (Hermes home — often ~/.hermes or under user AppData). Each profile is an isolated home. Back up by copying folders; the same files can move later to another host.',
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
            'IDE-shaped coding agents are optional. This course’s home base is Hermes; add companions only after the harness works.',
          ),
        ],
      },
      {
        heading: L('After this proof'),
        paragraphs: [
          L(
            'Install is complete here. Ops drills (Desktop checklist, key rotation, extra models) belong in Harness Labs — after this proof, not instead of it.',
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
      'Write identity into Hermes home. Keep project rules in project context files.',
      'Écris l’identité dans le home Hermes. Garde les règles de projet dans les fichiers de contexte projet.',
    ),
    minutes: 25,
    proof: L(
      'A profile has SOUL.md under Hermes home (template or edited). The agent answers in that voice. You can state SOUL vs AGENTS.md in one sentence.',
    ),
    sections: [
      {
        heading: L('What SOUL.md is', 'Ce qu’est SOUL.md'),
        paragraphs: [
          L(
            'SOUL.md is primary identity: name, role, tone, hard limits. Official docs place it first in the system prompt. Prefer a short brief (~12–20 lines) over a one-line slogan.',
          ),
          L(
            'Location: Hermes loads SOUL.md from the instance home only — typically ~/.hermes/SOUL.md or $HERMES_HOME/SOUL.md for a profile. It does not load SOUL from the project working directory. Personality stays stable across folders.',
          ),
        ],
        callout: L(
          'One profile = one home (own HERMES_HOME). Profiles do not share soul or memory by accident.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('SOUL vs project context'),
        paragraphs: [
          L(
            'If it should follow every session → SOUL.md. If it belongs to a repository or campaign → project context (AGENTS.md, .hermes.md / HERMES.md, or CLAUDE.md / .cursorrules when present). One project-context type loads per session (first match). SOUL still loads as identity.',
          ),
        ],
        bullets: [
          L('SOUL.md — identity, tone, limits (Hermes home only)'),
          L('AGENTS.md or .hermes.md — architecture, conventions, ports, project “never do X”'),
          L('/personality — temporary session overlay, not a SOUL replacement'),
          L('Context files are scanned for injection; review files from untrusted repos'),
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
            'Download a template, copy it to SOUL.md under this profile’s Hermes home, set the agent name, then start a new session.',
          ),
        ],
        souls: [
          { id: 'orchestrator', name: L('Orchestrator', 'Orchestrateur'), blurb: L('Morning brief, triage, delegates work.', 'Brief du matin, triage, délègue le travail.') },
          { id: 'analyst', name: L('Analyst', 'Analyste'), blurb: L('Research, structure, cites sources.', 'Recherche, structure, cite les sources.') },
          { id: 'ops', name: L('Ops', 'Ops'), blurb: L('Files, cleanup, local automation.', 'Fichiers, ménage, automation locale.') },
          { id: 'writer', name: L('Writer', 'Rédacteur'), blurb: L('Drafts with controlled tone.', 'Brouillons avec ton maîtrisé.') },
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
          L('Paste a pack soul. Set the name. Keep project paths out of SOUL — use AGENTS.md later.'),
          L('Start a session and ask: “Who are you and what are your hard limits?”'),
          L('Optional: place a short AGENTS.md in a real project folder and ask a project-specific question from that directory.'),
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
      'After soul: put the harness on Telegram. Pocket access is the course path.',
    ),
    minutes: 25,
    proof: L(
      'You messaged the bot from Telegram, received a reply from your profile, and allowlist or pairing is enabled.',
    ),
    sections: [
      {
        heading: L('Why gateway sits here'),
        paragraphs: [
          L(
            'With Desktop installed and SOUL written, messaging is the fastest proof the harness is real outside the laptop window. Wire Telegram before deep tool and MCP theory; Part I then expands capability with tools.',
          ),
          L(
            'A harness confined to one desktop window is incomplete. Gateway is how you operate from phone or, later, from an always-on host without daily SSH.',
          ),
        ],
        callout: L(
          'Order: Install → Soul → Gateway → Tools.',
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Telegram path (Desktop)'),
        steps: [
          L('Open Telegram → @BotFather → create a bot → copy the token.'),
          L('In Hermes Desktop: gateway / messaging → Telegram. Paste the token into the app (env storage — never a public chat).'),
          L('Allowlist: only your Telegram user id. Empty allowlists fail closed.'),
          L('Start the gateway from Desktop. Leave Desktop running during the test.'),
          L('Message the bot. If a pairing code appears, approve only on your side. Do not share codes.'),
          L('Send: “Who are you and what are your hard limits?” — the answer should match SOUL.'),
        ],
        callout: L(
          'Trust model: pairing plus allowlist. Do not open the bot to everyone for this course. Official Telegram docs win if labels move.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('Runtime notes'),
        bullets: [
          L('The PC must stay awake while this machine hosts Telegram gateway.'),
          L('Other platforms (Discord, etc.) may appear in Settings — Telegram is the course proof; add others after it works.'),
          L('Always-on later: keep the same allowlist discipline on VPS or always-on hosts.'),
          L('One profile ≈ one bot token when you need concurrent personas.'),
        ],
        checklist: [
          L('Bot replies from your profile'),
          L('Allowlist or pairing confirmed'),
          L('Token not written into notes or git'),
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
      'Tools, spend control, and a multi-step proof on Desktop after the gateway works.',
    ),
    minutes: 30,
    proof: L(
      'A multi-step tool task left a file or on-screen result you can open. You know where model cost is decided (provider vs model).',
    ),
    sections: [
      {
        heading: L('Agent with tools'),
        paragraphs: [
          L(
            'Telegram already reaches the agent. Now enable hands: terminal, browser, filesystem, search when configured. The model requests; Hermes executes.',
          ),
          L(
            'In Desktop: open Tools / Dashboard, confirm toolsets for this profile, run the proof from Desktop chat. Telegram remains a second surface.',
          ),
        ],
        bullets: [
          L('Prefer structured tools over long shell improvisation when both exist.'),
          L('A failing tool should return a clear error so the model can recover.'),
          L('Scope tools to the job — research often needs read and web, not full shell write.'),
          L('If Portal enabled Tool Gateway tools, verify them in the Tools UI.'),
          L('Resume sessions for long jobs when the UI offers it.'),
        ],
        links: [
          { label: L('Tools'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
          { label: L('Sessions'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/sessions' },
        ],
      },
      {
        heading: L('Terminal backend (Advanced — when tools hit the shell)'),
        paragraphs: [
          L(
            'Shell and file tools use a terminal backend. Day one stays local (host process). Settings → Advanced may offer Docker and other backends so commands run with isolation from the host.',
          ),
        ],
        bullets: [
          L('Local (course default) — simplest; approvals still apply'),
          L('Docker — isolation; enable only after chat and tools work'),
          L('SSH / cloud sandboxes — remote workers for later'),
        ],
        callout: L(
          'Do not enable Advanced → Docker mid-proof for experiment. Map the setting; harden after Part I if required.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Docker / backends'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Security (containers)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
        ],
      },
      {
        heading: L('MCP — connect services carefully'),
        paragraphs: [
          L(
            'MCP connects external services (docs, drives, repos, APIs) through a standard interface. Treat each server as new code on the trust surface.',
          ),
        ],
        bullets: [
          L('Add one server for a concrete need.'),
          L('Filter tools to the smallest useful surface.'),
          L('Prefer OAuth over long-lived tokens when available.'),
          L('Keep secrets out of chat; store them in .env / setup.'),
        ],
        links: [
          { label: L('MCP with Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/guides/use-mcp-with-hermes' },
          { label: L('Tools docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools' },
        ],
      },
      {
        heading: L('Spend control'),
        paragraphs: [
          L(
            'Provider and model are separate decisions. Provider is auth and billing; model is capability and price. Use a strong model where mistakes are expensive; cheaper models for auxiliary jobs when supported.',
          ),
        ],
        bullets: [
          L('Stabilize one primary model before fallbacks.'),
          L('Credential pools help with rate limits, not only multi-billing.'),
          L('Local models: set sufficient context; broken tool loops are often truncated context.'),
          L('Providers is also where remote or local OpenAI-compatible endpoints appear.'),
        ],
        links: [
          { label: L('Configuration / providers'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration' },
        ],
      },
      {
        heading: L('Fixed cost of an empty session'),
        paragraphs: [
          L(
            'Before the first user message, Hermes already loads system prompt, skills index, MEMORY/USER snapshots, tool schemas, and project context (for example AGENTS.md). That fixed budget is often why an agent feels slow or expensive — not a “weak model.”',
          ),
        ],
        steps: [
          L('Run hermes prompt-size (CLI) or the Desktop equivalent that audits assembled prompt size. It works offline — no API key required.'),
          L('Note the largest slices: tools, skills, memory, context files.'),
          L('Disable one unused toolset (hermes tools or Desktop Tools) and re-check. Prefer fewer tools over a stronger model until the budget is sane.'),
        ],
        callout: L(
          'More tools do not always make a smarter agent. They give the model more instructions to read before it can start. Deep drills: Labs → Prompt budget audit.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Lab: Prompt budget audit'), href: '/forge/course/open-harness/labs/prompt-budget/' },
        ],
      },
      {
        heading: L('Session commands (map)'),
        paragraphs: [
          L(
            'Long sessions fill the context window. Official and community practice uses in-session commands rather than starting over every time.',
          ),
        ],
        bullets: [
          L('/context — what consumes the window and how much room remains'),
          L('/compress — summarize older turns; keep recent exchanges or focus a topic (session file stays)'),
          L('/undo — rewind last user turn(s) into the composer; does not restore files already changed'),
          L('/retry · /branch — same prompt again, or explore another path without losing the first'),
          L('/rollback + checkpoints — restore files when the agent already wrote to disk'),
        ],
        callout: L(
          'Practice these in Labs → Session control studio after tools work. Do not skip the multi-step proof below to chase commands.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Lab: Session control studio'), href: '/forge/course/open-harness/labs/session-control/' },
        ],
      },
      {
        heading: L('Proof task'),
        steps: [
          L('Ask: “List the largest folders in Downloads (or home), propose an archive plan, write the plan to a markdown file in a path I choose.”'),
          L('Approve tool actions if prompted. Prefer smart approvals: safe actions pass, dangerous ones ask.'),
          L('Open the markdown file yourself — that file is the receipt.'),
          L('Optional stretch: run prompt-size once and write the top two budget lines into the same notes folder.'),
        ],
        checklist: [
          L('Multi-step tool task left a file I can open offline'),
          L('Approvals stayed smart or manual (not YOLO)'),
          L('I know where fixed session cost is audited (prompt-size)'),
        ],
      },
      {
        heading: L('Desktop cockpit'),
        paragraphs: [
          L(
            'If you followed module 03, Hermes Desktop is the everyday surface for tools, approvals, and sessions for the rest of the course.',
          ),
          L(
            'Optional stretch: request a small custom Desktop widget if your build supports it (for example a memory monitor). Agency on phone and machine is the goal.',
          ),
        ],
        callout: L(
          'Keep Desktop as the home surface through Part II.',
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Human in the loop'),
        paragraphs: [
          L(
            'Dangerous actions require approval. Smart mode may pass low-risk actions and escalate uncertainty. Keep approvals on for this course. YOLO-style modes are expert-only and still cannot bypass hardline host protections — do not treat them as safe defaults.',
          ),
        ],
      },
      {
        heading: L('After this proof'),
        paragraphs: [
          L(
            'Tools and spend are introduced here. To measure one job and reduce a toolset, use the spend drill lab — not a second lecture.',
          ),
        ],
        links: [
          { label: L('Lab: spend drill'), href: '/forge/course/open-harness/labs/model-spend/' },
          { label: L('Lab: failure studio'), href: '/forge/course/open-harness/labs/failure-studio/' },
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
      'Context is session RAM. Durable memory is on disk. Caps are intentional.',
    ),
    minutes: 30,
    proof: L(
      'You wrote a durable fact, verified it on disk, closed the session, reopened, and the agent still knew it.',
    ),
    sections: [
      {
        heading: L('Three floors'),
        paragraphs: [
          L(
            'Part II starts with memory because tools without durable facts re-hallucinate preferences every session. Map the floors before you write anything.',
          ),
        ],
        table: {
          headers: [L('Floor'), L('What'), L('Limit')],
          rows: [
            [L('1 · Notebook'), L('SOUL, MEMORY, USER — always loaded'), L('Intentionally capped')],
            [L('2 · Journal'), L('Session recall — verbatim / full-text search'), L('Local history size')],
            [L('3 · Library'), L('Vault / external notes (next module)'), L('Your disk')],
          ],
        },
      },
      {
        heading: L('Cap as a feature'),
        paragraphs: [
          L(
            'MEMORY.md and USER.md share a tight prompt budget on purpose. The cap forces durable preferences, facts, corrections, and conventions — not a dump of chat logs. Near capacity: merge, compress, drop stale lines.',
          ),
        ],
        callout: L(
          'Remembering everything is remembering nothing. Prefer dense facts.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('Gotcha: write now, load next session'),
        paragraphs: [
          L(
            'Disk updates can succeed while the current system prompt stays frozen for cache efficiency. A same-session “do you remember?” check can look like failure when the file is already correct. Verify the file, then open a new session for the behavioral proof.',
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
            'MEMORY.md is the agent notebook (environment, conventions, lessons). USER.md is your card (name, preferences, avoid-list). The agent writes them; you may edit them in any text editor. Unwritten facts do not persist.',
          ),
        ],
        callout: L(
          'File over app: closed chat products do not offer this honesty.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('External providers (optional)'),
        paragraphs: [
          L(
            'Pluggable providers (user modeling, fact extraction, graphs) augment the built-in layer; they do not replace your files. Run one provider at a time. Switching does not migrate prior accumulation.',
          ),
        ],
        bullets: [
          L('Default for this course: files plus vault.'),
          L('Add a provider only when built-in memory is clearly insufficient.'),
          L('Export or note important facts before switching providers.'),
        ],
      },
      {
        heading: L('Proof ritual'),
        steps: [
          L('Tell the agent: “Remember that project codename is HARNESS-01 and I prefer short answers.”'),
          L('Ask it to write that to durable memory.'),
          L('Open MEMORY.md / USER.md on disk and verify the lines.'),
          L('Fully close the session. Reopen. Ask: “What is my project codename and answer length preference?”'),
          L('Optional: query session recall for an earlier vault mention if available.'),
        ],
        links: [
          { label: L('Memory system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory' },
        ],
      },
      {
        heading: L('Memory vs hallucination'),
        paragraphs: [
          L(
            'Without memory the model fills gaps with confidence. With memory and sources it consults first. Still fallible — but checkable by you and by the agent.',
          ),
        ],
      },
      {
        heading: L('Context window vs durable memory'),
        paragraphs: [
          L(
            'The context window is session RAM. Hermes may auto-compress long threads; you can also run /context and /compress so the active prompt shrinks while the stored session remains. Prefer writing durable facts to MEMORY.md / USER.md rather than hoping a long chat will still “know” them next week.',
          ),
        ],
        checklist: [
          L('Durable fact verified on disk and in a new session'),
          L('I can state context window vs MEMORY.md in one sentence'),
        ],
        links: [
          { label: L('Lab: Session control studio'), href: '/forge/course/open-harness/labs/session-control/' },
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
        paragraphs: [
          L(
            'An Obsidian vault is a folder of markdown on disk. Local use needs no account. Once connected, the agent can read and write there. This is floor three from the memory module: unlimited library, still files you own.',
            'Un vault Obsidian est un dossier de markdown sur disque. L’usage local n’exige pas de compte. Une fois connecté, l’agent y lit et écrit. C’est l’étage trois du module mémoire : bibliothèque large, toujours des fichiers à toi.',
          ),
        ],
        steps: [
          L('Install Obsidian. Create a vault (for example second-brain).', 'Installe Obsidian. Crée un vault (ex. second-brain).'),
          L('Create three folders: inbox / sources / synthesis.', 'Crée trois dossiers : inbox / sources / synthesis.'),
          L('Add two or three short notes about a real project.', 'Ajoute deux ou trois notes courtes sur un vrai projet.'),
          L('Connect Hermes to the vault path (Obsidian skill / config for your version).', 'Connecte Hermes au chemin du vault (skill Obsidian / config de ta version).'),
          L('Ask: “Find my notes on X and summarize with quotes.”', 'Demande : « Retrouve mes notes sur X et résume avec citations. »'),
        ],
      },
      {
        heading: L('Linked notes', 'Notes liées'),
        paragraphs: [
          L(
            'Double brackets [[like this]] build a network. The graph maps what you know; the agent can follow links, not only keyword search.',
            'Les doubles crochets [[comme ça]] forment un réseau. Le graphe cartographie ce que tu sais ; l’agent suit les liens, pas seulement les mots-clés.',
          ),
        ],
      },
      {
        heading: L('Wiki pattern (advanced)', 'Pattern wiki (avancé)'),
        paragraphs: [
          L(
            'Pure retrieval re-searches every time and compounds little. A wiki-style loop deposits sources, summarizes, updates linked pages, and flags contradictions. The vault becomes compiled knowledge.',
            'La recherche pure recommence à chaque fois et accumule peu. Une boucle type wiki dépose des sources, résume, met à jour les pages liées et signale les contradictions. Le vault devient du savoir compilé.',
          ),
        ],
        checklist: [
          L('Vault path connected in Hermes'),
          L('At least one retrieval with a quote from your note'),
          L('You can open the same note offline without Hermes'),
        ],
        callout: L(
          'Course default: files on disk plus vault. External memory providers remain optional and never replace your files.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Obsidian'), href: 'https://obsidian.md' },
          { label: L('File over app'), href: 'https://stephango.com/file-over-app' },
          { label: L('Lab: staged wiki'), href: '/forge/course/open-harness/labs/wiki-kanban/' },
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
      'On-demand procedural memory — not a second system-prompt dump.',
    ),
    minutes: 20,
    proof: L(
      'You listed skills for this profile, ran or inspected one, and wrote skills-notes.md with name and when to use it.',
    ),
    sections: [
      {
        heading: L('What a skill is'),
        paragraphs: [
          L(
            'A skill is a reusable instruction package (SKILL.md). Front matter names and describes it; the body teaches the procedure. Hermes sees names and descriptions first — a vague description means the right skill may never load.',
          ),
          L(
            'Skills use progressive disclosure: the catalog stays cheap; only the selected body enters the prompt. That is how a large library avoids burning the context window every turn.',
          ),
        ],
        bullets: [
          L('Skill = procedure / knowledge package (agentskills-compatible).'),
          L('Plugin / MCP = executable surface or product hooks — a different layer.'),
          L('Slash commands (for example /plan) and /learn can capture workflows as skills when supported.'),
          L('Install narrowly; run security scans on hub skills before trust.'),
          L('Pin or curator: critical skills should not vanish to automated cleanup when you outgrow defaults.'),
        ],
      },
      {
        heading: L('Desktop first'),
        steps: [
          L('Open Skills in Hermes Desktop.'),
          L('Copy the list into skills-notes.md under your course notes folder.'),
          L('Run or inspect one bundled skill appropriate to your OS.'),
          L('Optional: install one official hub skill after reading the scan warning — log the reason. Do not install a catalog “for later.”'),
        ],
        callout: L(
          'If every skill is enabled, the model spends tokens choosing rather than working. Least privilege. Skills Hub is a map, not homework.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Skills system'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills' },
          { label: L('Work with skills (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/work-with-skills' },
          { label: L('Curator (later)'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/curator' },
        ],
      },
      {
        heading: L('Skills tax the fixed budget'),
        paragraphs: [
          L(
            'The skills index and every enabled tool schema load into the empty-session budget (see module 06 — prompt-size). A large “install for later” catalog costs tokens before any task starts.',
          ),
        ],
        steps: [
          L('Run hermes prompt-size (or Desktop equivalent). Note the skills / tools share.'),
          L('Disable or uninstall one skill you will not use this week. Re-run the audit.'),
          L('Record before/after in skills-notes.md (one line each is enough).'),
        ],
        links: [
          { label: L('Lab: Prompt budget audit'), href: '/forge/course/open-harness/labs/prompt-budget/' },
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('skills-notes.md lists at least three skill names'),
          L('One skill run or inspect logged with outcome'),
          L('You can state skill vs MCP in one sentence'),
          L('You re-checked fixed budget after trimming at least one skill or toolset'),
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
      'Capability and safety trade off. Document who may reach tools and how approvals work.',
    ),
    minutes: 20,
    proof: L(
      'You confirmed allowlist and approval mode (smart or manual), wrote security-dials.md with three settings and rationale, and did not enable YOLO for this course.',
    ),
    sections: [
      {
        heading: L('Threat model'),
        paragraphs: [
          L(
            'A private laptop is not a public bot. Choose capability deliberately. Gateway should fail closed: strangers never reach tools by default.',
          ),
        ],
        bullets: [
          L('Allowlist messaging gateway users (fail closed if unset).'),
          L('Approvals: manual | smart (default) | off — course uses smart or manual. YOLO is expert-only and still cannot bypass the hardline blocklist.'),
          L('Timeouts deny by default when you do not answer.'),
          L('Secret filtering: keep tokens out of prompts and MCP child environments where possible.'),
          L('Injection scans on SOUL / AGENTS.md / context files when enabled.'),
          L('Network: SSRF protections block private ranges; open only for a trusted local service you understand.'),
          L('Profile least privilege: research does not need a coder tool surface.'),
          L('Optional later: approval suggestions mine past decisions — they should never auto-apply destructive classes.'),
        ],
        callout: L(
          'Keep defaults for this course. Disabling approvals for speed is how harnesses become liabilities. Checkpoints and rollback, if available, support recovery — they do not replace approvals.',
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
          L('Open gateway / security / approvals for this profile (or config.yaml approvals.mode).'),
          L('Confirm allowlist is only your user id (Telegram path from module 05).'),
          L('Confirm smart or manual approvals. Do not use YOLO for course work.'),
          L('Write security-dials.md: allowlist status, approval mode, one tool surface left off.'),
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('security-dials.md records three concrete settings'),
          L('YOLO is off (or documented expert exception)'),
          L('You know where logs live if something fails'),
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
      'Scheduled work as a full runbook. Each fire starts without prior session memory.',
    ),
    minutes: 25,
    proof: L(
      'You created one self-contained cron job (or a complete plan) covering host, path, success, failure, and delivery — and ran it once or dry-ran the prompt.',
    ),
    sections: [
      {
        heading: L('Amnesia is intentional'),
        paragraphs: [
          L(
            'Cron usually runs with the always-on gateway. Each execution is an isolated session that does not inherit “yesterday’s issue.” Write a self-contained runbook into the job prompt.',
          ),
        ],
        bullets: [
          L('Include host, path, command, expected state, delivery target, success and failure behavior.'),
          L('silent: suppress “all good” noise; still surface failures.'),
          L('no_agent / script-only: deterministic checks that need no model tokens.'),
          L('Wake gate: cheap pre-check first; wake the model only when something changed.'),
          L('Jobs must not spawn unbounded new jobs — runaway self-scheduling is blocked in healthy setups.'),
          L('Dangerous commands: prefer approvals.cron_mode deny (default) so headless jobs cannot YOLO host damage.'),
        ],
      },
      {
        heading: L('Build one job'),
        steps: [
          L('Define a small job: for example weekday 08:00 — three headlines, short summary, deliver to Telegram (or a local file if gateway is off).'),
          L('Write the prompt as if the agent has amnesia. Save as cron-runbook.md.'),
          L('Create it in the Desktop cron UI or Hermes cron flow for your version.'),
          L('Run once manually if possible, then schedule — or stop after dry-run if offline.'),
        ],
        callout: L(
          'Cron spend is easy to waste. Prefer script checks first; wake the model only when the check fails or changes.',
        ),
        calloutVariant: 'note',
        links: [
          { label: L('Cron feature docs'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron' },
          { label: L('Automate with cron (guide)'), href: 'https://hermes-agent.nousresearch.com/docs/guides/automate-with-cron' },
          { label: L('Lab: webhooks'), href: '/forge/course/open-harness/labs/webhooks/' },
          { label: L('Sample runbook'), href: '/courses/open-harness/samples/cron-runbook.example.md' },
        ],
      },
      {
        heading: L('Proof'),
        checklist: [
          L('cron-runbook.md is self-contained (a stranger could execute it)'),
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
      'Backup, update habit, and growth map — without expanding the day-one path.',
    ),
    minutes: 20,
    proof: L(
      'You know which folders to back up, how to brief a sub-agent, and which growth step matches your next constraint.',
    ),
    sections: [
      {
        heading: L('What to back up'),
        bullets: [
          L('Hermes home / profile directory (SOUL, memory, config, skills you keep)'),
          L('Obsidian vault and AGENTS.md / project context you rely on'),
          L('.env holds secrets — back up encrypted; never publish'),
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
            'Official docs change often. Run hermes update (or reinstall Desktop) on a cadence you can keep. After updates: doctor or health check, one chat smoke test, gateway still allowlisted. If a flag renames, Installation / Updating docs win over this page.',
          ),
        ],
        links: [
          { label: L('Updating Hermes'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/updating' },
          { label: L('Learning path (official)'), href: 'https://hermes-agent.nousresearch.com/docs/getting-started/learning-path' },
        ],
      },
      {
        heading: L('When one agent is not enough'),
        paragraphs: [
          L(
            'Sub-agents: spawn helpers for independent work. Brief them as strangers (failure, paths, definition of done). Least tools. Prefer cheaper children and a strong parent for synthesis. Avoid delegating tightly sequential interactive work.',
          ),
          L(
            'Profiles: a second Hermes home (own model, memory, gateway, persona) when roles must stay isolated permanently — not a temporary helper.',
          ),
          L(
            'Kanban / boards: when work must cross agents and survive restarts. Use official multi-agent docs when serial pain is real.',
          ),
        ],
        callout: L(
          'Basics stop at one solid harness. Multi-agent and extra platforms are optional growth — not Part I homework.',
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
            'You already practice tools and approvals. Add the rest when a concrete constraint appears.',
          ),
        ],
        bullets: [
          L('1 Tools — day one (done)'),
          L('2 MCP servers — when work spans external services and APIs'),
          L('3 Sequential pipeline — multi-step jobs via profiles and wake gates'),
          L('4 Parallel — research fan-out / batch delegation'),
          L('5 Routers — assign by type to specialist profiles or board'),
          L('6 Human in the loop — keep for high-impact actions'),
          L('7 Dynamic sub-agents — orchestrator spawns help mid-task'),
        ],
      },
      {
        heading: L('Course completion checklist'),
        checklist: [
          L('Lexicon: agent vs chat; harness vs runtime; token, context, cron'),
          L('Hermes Desktop on this PC; chat works; Advanced left default for proofs'),
          L('You know Settings → Advanced / Providers / Gateway for later'),
          L('SOUL in Hermes home (not project CWD); SOUL vs AGENTS.md clear'),
          L('Tool task completed; smart or manual approvals on'),
          L('Telegram gateway trusted and working'),
          L('Memory fact on disk and survives a new session'),
          L('Vault note retrieved'),
          L('Skills listed (09); security dials written (10); cron runbook (11)'),
          L('Backup locations known; update habit named'),
        ],
      },
      {
        heading: L('Next ops (optional)'),
        paragraphs: [
          L(
            'Same product, deeper Settings: Docker terminal backend, remote providers, always-on gateway host, Termux paths. Official docs and Harness Labs (VPS ship, remote shell, session control, prompt budget) cover them after this checklist — not instead of it.',
          ),
        ],
        links: [
          { label: L('Docker guide'), href: 'https://hermes-agent.nousresearch.com/docs/user-guide/docker' },
          { label: L('Lab: VPS ship'), href: '/forge/course/open-harness/labs/vps-ship/' },
          { label: L('Lab: remote shell'), href: '/forge/course/open-harness/labs/remote-access/' },
          { label: L('Lab: Session control'), href: '/forge/course/open-harness/labs/session-control/' },
          { label: L('Lab: Prompt budget'), href: '/forge/course/open-harness/labs/prompt-budget/' },
        ],
      },
      {
        heading: L('Desktop Kanban (growth)'),
        paragraphs: [
          L(
            'The first official Hermes Desktop plugin is Kanban: a board in the app for multi-step work across profiles. Enable it only after one profile, tools, and approvals are solid. It is not Part I homework.',
          ),
        ],
        bullets: [
          L('Plugin can add a page, sidebar entry, hotkeys, and backend endpoints.'),
          L('Multi-profile boards need SOUL + tools working per profile first.'),
          L('Write your own plugin or import via the Desktop plugin SDK when you outgrow defaults.'),
        ],
        links: [
          { label: L('Lab: Kanban multi-profile'), href: '/forge/course/open-harness/labs/kanban-board/' },
          {
            label: L('Desktop plugin SDK'),
            href: 'https://hermes-agent.nousresearch.com/docs/developer-guide/desktop-plugin-sdk',
          },
        ],
      },
      {
        heading: L('Keep going'),
        paragraphs: [
          L(
            'Official docs are the living manual. Optional labs deepen operations. Open Design is the next live mastery track on Forge.',
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
