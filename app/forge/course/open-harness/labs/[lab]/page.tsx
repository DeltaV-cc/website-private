import type { Metadata } from 'next';
import LegacyRedirect from '@/app/components/LegacyRedirect';
import { HARNESS_LABS } from '@/app/data/courses/harness-labs';

export function generateStaticParams() {
  return HARNESS_LABS.map((l) => ({ lab: l.slug }));
}

export const metadata: Metadata = { title: 'Moved', robots: { index: false, follow: true } };

export default async function LegacyLab({ params }: { params: Promise<{ lab: string }> }) {
  const { lab: slug } = await params;
  return <LegacyRedirect to={`/forge/course/my-first-ai-agent/labs/${slug}/`} label="the lab" />;
}
