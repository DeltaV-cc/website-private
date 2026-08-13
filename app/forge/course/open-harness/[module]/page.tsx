import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import { AihLessonBody } from '@/app/components/course/aihero/AihLessonBody';
import { OPEN_HARNESS_MODULES, getModule } from '@/app/data/courses/open-harness';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return OPEN_HARNESS_MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = getModule(slug);
  if (!mod) return { title: 'Own Your AI' };
  return {
    title: `${mod.number} · ${mod.title.en} — Own Your AI | Delta V`,
    description: mod.subtitle.en,
    openGraph: {
      title: `${mod.title.en} — Own Your AI`,
      description: mod.subtitle.en,
      url: `${SITE_URL}/forge/course/open-harness/${mod.slug}/`,
      siteName: 'Delta V',
      type: 'article',
    },
  };
}

export default async function OwnYourAIModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  return (
    <AihChrome activeSlug={mod.slug}>
      <AihLessonBody module={mod} />
    </AihChrome>
  );
}
