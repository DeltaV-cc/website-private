import type { Metadata } from 'next';
import LegacyRedirect from '@/app/components/LegacyRedirect';

/** The course used to live here, under its retired "Open Harness" name. */
export const metadata: Metadata = { title: 'Moved', robots: { index: false, follow: true } };

export default function LegacyCourseIndex() {
  return <LegacyRedirect to="/forge/course/my-first-ai-agent/" label="My First AI Agent" />;
}
