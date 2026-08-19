import type { Metadata } from 'next';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import { AihLanding } from '@/app/components/course/aihero/AihLanding';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mon premier agent IA — construisez votre harness | Delta V',
  description:
    'Treize leçons gratuites pour mettre en place un vrai agent IA qui lit vos fichiers, exécute vos tâches et vous répond sur votre téléphone. Sans code.',
  alternates: {
    canonical: `${SITE_URL}/fr/forge/course/my-first-ai-agent/`,
    languages: {
      en: `${SITE_URL}/forge/course/my-first-ai-agent/`,
      fr: `${SITE_URL}/fr/forge/course/my-first-ai-agent/`,
    },
  },
};

export default function OwnYourAILandingPageFr() {
  return (
    <AihChrome>
      <AihLanding />
    </AihChrome>
  );
}
