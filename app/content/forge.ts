import type { Locale } from '@/lib/i18n';

/**
 * Forge page copy. Course ids, hrefs, accents and the logo stay out of here —
 * they are structure, not language.
 */
export type ForgeCourseCopy = {
  id: string;
  code: string;
  title: string;
  /** Optional pill next to the title, e.g. "Free". */
  badge?: string;
  pitch: string;
  product: string;
  adapt: string;
  get: string[];
  path: { step: string; desc: string }[];
  forWho: string;
  ctaLabel: string;
  secondaryLabel?: string;
};

export type ForgeCopy = {
  label: string;
  title: string;
  description: string;
  backLabel: string;
  cardLabels: { get: string; path: string; forWho: string };
  courses: ForgeCourseCopy[];
  roadmapLabel: string;
  roadmapTag: string;
  roadmap: { title: string; blurb: string }[];
  footerLinks: { tutorials: string; blog: string };
};

const en: ForgeCopy = {
  label: 'Pillar 03 · Forge',
  title: 'Skill Forge',
  description:
    'Free courses on real products. Each track names the product it follows and adapts as that product moves.',
  backLabel: 'Home',
  cardLabels: { get: 'What you get', path: 'Path', forWho: 'For:' },
  courses: [
    {
      id: 'my-first-ai-agent',
      code: 'Course 01 · Flagship · Live',
      title: 'My First AI Agent',
      badge: '100% free',
      pitch:
        'Thirteen free lessons to set up a real AI agent — the kind that **actually does things for you**, not just answers questions. Start from zero, finish with an agent that reads your files, runs your errands, and answers on your phone. No code, no ML background.',
      product: 'Product: Hermes Desktop',
      adapt:
        'Aligned with official Hermes docs. Every step has a screenshot; advanced settings stay out of the way until you want them.',
      get: [
        'The words you need, so nothing on screen is a mystery',
        'A guided install with a verified first chat',
        'Ready-made agent personalities — pick one, paste it, done',
        'Your agent on your phone, answering only you',
        'Memory, notes, skills, safety settings, and scheduled jobs',
      ],
      path: [
        { step: 'Part I', desc: 'words, install, personality, phone, first real task' },
        { step: 'Part II', desc: 'memory, notes, skills, safety, scheduled jobs' },
        { step: 'Labs', desc: 'optional drills after the course' },
      ],
      forWho: 'Anyone curious about AI agents — complete beginners welcome, on a standard PC.',
      ctaLabel: 'Start the course',
      secondaryLabel: 'Labs after Part I',
    },
    {
      id: 'open-design',
      code: 'Course 02 · Live',
      title: 'Open Design',
      pitch:
        'Decks, stills, and content packs you open offline — **not video engines**. Built on Hermes + design workflow (Open Design / stills stack).',
      product: 'Product: Hermes + Open Design / stills',
      adapt:
        'Model and skill names shift with the stack. Proof is always: file opens without Hermes.',
      get: [
        'design-lab workspace + first real deck offline',
        'Image set with prompts logged',
        'Brand file (DESIGN.md) and model split habits',
        'Handoff zip a client can open',
      ],
      path: [
        { step: 'Part I', desc: 'stack, deck, images, content pack' },
        { step: 'Part II', desc: 'brand, models, skills filter, export, habits' },
        { step: 'Prereq', desc: 'Own Your AI Part I on Desktop' },
      ],
      forWho: 'Anyone who ships decks and content and is tired of renting design tabs.',
      ctaLabel: 'Open Design',
      secondaryLabel: 'Prereq: Own Your AI',
    },
  ],
  roadmapLabel: 'Later · not live mastery',
  roadmapTag: 'Roadmap',
  roadmap: [
    { title: 'Open Video', blurb: 'Motion teaser after Design stills work.' },
    { title: 'x402 & agent payments', blurb: 'Workshop outline only.' },
  ],
  footerLinks: { tutorials: 'Tutorials', blog: 'Blog' },
};

const fr: ForgeCopy = {
  label: 'Pilier 03 · Forge',
  title: 'Skill Forge',
  description:
    'Des cours gratuits sur de vrais produits. Chaque parcours nomme le produit qu’il suit et évolue avec lui.',
  backLabel: 'Accueil',
  cardLabels: { get: 'Ce que vous obtenez', path: 'Parcours', forWho: 'Pour :' },
  courses: [
    {
      id: 'my-first-ai-agent',
      code: 'Cours 01 · Phare · En ligne',
      title: 'Mon premier agent IA',
      badge: '100 % gratuit',
      pitch:
        'Treize leçons gratuites pour mettre en place un vrai agent IA — celui qui **fait vraiment les choses à votre place**, au lieu de simplement répondre. Partez de zéro et terminez avec un agent qui lit vos fichiers, exécute vos tâches et vous répond sur votre téléphone. Sans code, sans bagage en machine learning.',
      product: 'Produit : Hermes Desktop',
      adapt:
        'Aligné sur la documentation officielle Hermes. Chaque étape a sa capture d’écran ; les réglages avancés restent de côté tant que vous n’en voulez pas.',
      get: [
        'Les mots dont vous avez besoin, pour que rien à l’écran ne reste opaque',
        'Une installation guidée, avec une première conversation vérifiée',
        'Des personnalités d’agent prêtes à l’emploi — choisissez, collez, c’est fait',
        'Votre agent sur votre téléphone, qui ne répond qu’à vous',
        'Mémoire, notes, compétences, réglages de sécurité et tâches planifiées',
      ],
      path: [
        { step: 'Partie I', desc: 'le vocabulaire, l’installation, la personnalité, le téléphone, la première vraie tâche' },
        { step: 'Partie II', desc: 'mémoire, notes, compétences, sécurité, tâches planifiées' },
        { step: 'Labs', desc: 'exercices optionnels après le cours' },
      ],
      forWho:
        'Toute personne curieuse des agents IA — les grands débutants sont les bienvenus, sur un PC ordinaire.',
      ctaLabel: 'Commencer le cours',
      secondaryLabel: 'Labs après la Partie I',
    },
    {
      id: 'open-design',
      code: 'Cours 02 · En ligne',
      title: 'Open Design',
      pitch:
        'Des présentations, des visuels et des kits de contenu que vous ouvrez hors ligne — **pas des moteurs vidéo**. Bâti sur Hermes et un flux de travail design (Open Design / stills).',
      product: 'Produit : Hermes + Open Design / stills',
      adapt:
        'Les noms de modèles et de compétences bougent avec la stack. La preuve reste la même : le fichier s’ouvre sans Hermes.',
      get: [
        'Un espace de travail design-lab et une première vraie présentation, hors ligne',
        'Une série d’images avec les prompts consignés',
        'Un fichier de marque (DESIGN.md) et de bonnes habitudes de répartition entre modèles',
        'Un zip de livraison qu’un client peut ouvrir',
      ],
      path: [
        { step: 'Partie I', desc: 'stack, présentation, images, kit de contenu' },
        { step: 'Partie II', desc: 'marque, modèles, filtrage des compétences, export, habitudes' },
        { step: 'Prérequis', desc: 'Mon premier agent IA, Partie I, sur Desktop' },
      ],
      forWho:
        'Celles et ceux qui produisent des présentations et du contenu, et en ont assez de louer des outils de design.',
      ctaLabel: 'Ouvrir Open Design',
      secondaryLabel: 'Prérequis : Mon premier agent IA',
    },
  ],
  roadmapLabel: 'Plus tard · pas encore un parcours complet',
  roadmapTag: 'Feuille de route',
  roadmap: [
    { title: 'Open Video', blurb: 'Teaser animé, après le travail sur les visuels d’Open Design.' },
    { title: 'x402 et paiements entre agents', blurb: 'Plan d’atelier uniquement.' },
  ],
  footerLinks: { tutorials: 'Tutoriels', blog: 'Blog' },
};

export const FORGE_PAGE: Record<Locale, ForgeCopy> = { en, fr };
