import type { Metadata } from 'next';
import PillarPageView from '../../components/PillarPageView';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Web3',
  description:
    'Avancer dans la complexité avec clarté, souveraineté et une vraie profondeur technique — de l’architecture de portefeuilles aux enquêtes onchain.',
  alternates: {
    canonical: `${SITE_URL}/fr/web3/`,
    languages: { en: `${SITE_URL}/web3/`, fr: `${SITE_URL}/fr/web3/` },
  },
};

export default function Web3PageFr() {
  return <PillarPageView pillar="web3" lang="fr" />;
}
