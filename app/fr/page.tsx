import type { Metadata } from 'next';
import HomeView from '../components/HomeView';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  // `absolute` skips the layout's "%s · Delta V" template, which would
  // otherwise render "… souveraine · Delta V".
  title: { absolute: 'Delta V — Ingénierie IA et Web3 souveraine' },
  description:
    'Ingénierie IA, Web3 et OpSec. Adaptatif par conception. L’open source d’abord.',
  alternates: {
    canonical: `${SITE_URL}/fr/`,
    languages: { en: `${SITE_URL}/`, fr: `${SITE_URL}/fr/` },
  },
};

export default function HomePageFr() {
  return <HomeView lang="fr" />;
}
