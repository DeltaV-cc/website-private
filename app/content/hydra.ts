import type { Locale } from '@/lib/i18n';

/**
 * Copy for the Hydra strip on the AI pillar page.
 *
 * Every claim here is taken from the product itself — hydra.deltav.cc and its
 * one-minute presentation — rather than written as marketing. The strip stays
 * short on purpose: it sits between the hero and three long offer cards, and
 * its whole job is to say what Hydra is and open the live demo.
 */
export type HydraCopy = {
  label: string;
  title: string;
  lead: string;
  /** Short proofs, not a feature list. */
  chips: string[];
  /** Hydra's own closing line — the bridge from "a demo" to "your systems". */
  bridge: string;
  demoLabel: string;
};

const en: HydraCopy = {
  label: 'Showcase · Hydra',
  title: 'The receptionist that never lets a lead go cold.',
  lead: 'An agent workspace we built and put online: mail, calendar, tasks and treasury on one surface, asked in plain language and answered with sources. Sign in with the shared demo account and use it — the data inside is fictional, the system is not.',
  chips: ['Inbox to invoice', 'Read-only by default', 'Runs on a schedule'],
  bridge: 'Built on mocked company data — your deployment runs on your real systems.',
  demoLabel: 'Open the live demo',
};

const fr: HydraCopy = {
  label: 'Vitrine · Hydra',
  title: 'La réceptionniste qui ne laisse jamais un prospect refroidir.',
  lead: "Un espace de travail agentique que nous avons construit et mis en ligne : messagerie, agenda, tâches et trésorerie sur une seule surface, interrogée en langage courant et répondue avec ses sources. Connectez-vous avec le compte de démonstration partagé et essayez — les données sont fictives, le système ne l'est pas.",
  chips: ['De l’e-mail à la facture', 'Lecture seule par défaut', 'Tourne à l’heure dite'],
  bridge: "Construit sur des données d'entreprise fictives — votre déploiement, lui, tourne sur vos systèmes réels.",
  demoLabel: 'Ouvrir la démo en ligne',
};

export const HYDRA_SHOWCASE: Record<Locale, HydraCopy> = { en, fr };

export const HYDRA_URL = 'https://hydra.deltav.cc';
