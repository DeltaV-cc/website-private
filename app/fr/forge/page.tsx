import type { Metadata } from 'next';
import ForgePageView from '../../components/ForgePageView';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Skill Forge',
  description:
    'Des cours gratuits sur de vrais produits. Chaque parcours nomme le produit qu’il suit et évolue avec lui.',
  alternates: {
    canonical: `${SITE_URL}/fr/forge/`,
    languages: { en: `${SITE_URL}/forge/`, fr: `${SITE_URL}/fr/forge/` },
  },
};

export default function ForgePageFr() {
  return <ForgePageView lang="fr" />;
}
