import type { Metadata } from 'next';
import ContactView from '../../components/ContactView';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  // The root layout template already appends "· Delta V".
  title: 'Contact',
  description: 'Des canaux de communication à haut signal. Chiffrés par défaut.',
  alternates: {
    canonical: `${SITE_URL}/fr/contact/`,
    languages: {
      en: `${SITE_URL}/contact/`,
      fr: `${SITE_URL}/fr/contact/`,
    },
  },
};

export default function ContactPageFr() {
  return <ContactView lang="fr" />;
}
