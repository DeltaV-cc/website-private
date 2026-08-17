import type { Metadata } from 'next';
import LegacyRedirect from '@/app/components/LegacyRedirect';
import { OPEN_HARNESS_MODULES } from '@/app/data/courses/open-harness';

export function generateStaticParams() {
  return OPEN_HARNESS_MODULES.map((m) => ({ module: m.slug }));
}

export const metadata: Metadata = { title: 'Moved', robots: { index: false, follow: true } };

export default async function LegacyModule({ params }: { params: Promise<{ module: string }> }) {
  const { module: slug } = await params;
  return <LegacyRedirect to={`/forge/course/my-first-ai-agent/${slug}/`} label={`lesson ${slug}`} />;
}
