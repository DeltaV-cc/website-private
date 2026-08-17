import type { Metadata } from 'next';
import LegacyRedirect from '@/app/components/LegacyRedirect';

export const metadata: Metadata = { title: 'Moved', robots: { index: false, follow: true } };

export default function LegacyGlossary() {
  return <LegacyRedirect to="/forge/course/my-first-ai-agent/glossary/" label="the glossary" />;
}
