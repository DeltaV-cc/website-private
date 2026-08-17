import type { Metadata } from 'next';
import OpSec from '../../opsec/page';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'OpSec Web3',
  description:
    'Des cadres de sécurité opérationnelle à haut signal, bâtis sur des sources complémentaires et des principes de souveraineté.',
  alternates: {
    canonical: `${SITE_URL}/fr/opsec/`,
    languages: { en: `${SITE_URL}/opsec/`, fr: `${SITE_URL}/fr/opsec/` },
  },
};

export default function OpSecPageFr() {
  return <OpSec lang="fr" />;
}
