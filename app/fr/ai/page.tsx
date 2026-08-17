import type { Metadata } from 'next';
import PillarPageView from '../../components/PillarPageView';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Ingénierie IA',
  description:
    'Des outils d’IA génériques aux systèmes de production taillés pour vos processus — conçus, livrés et durcis par nos ingénieurs.',
  alternates: {
    canonical: `${SITE_URL}/fr/ai/`,
    languages: { en: `${SITE_URL}/ai/`, fr: `${SITE_URL}/fr/ai/` },
  },
};

export default function AIPageFr() {
  return <PillarPageView pillar="ai" lang="fr" />;
}
