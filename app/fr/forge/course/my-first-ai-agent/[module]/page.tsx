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
  if (!mod) return { title: 'Mon premier agent IA' };
  return {
    title: `${mod.number} · ${mod.title.fr} — Mon premier agent IA | Delta V`,
    description: mod.subtitle.fr,
    alternates: {
      canonical: `${SITE_URL}/fr/forge/course/my-first-ai-agent/${mod.slug}/`,
      languages: {
        en: `${SITE_URL}/forge/course/my-first-ai-agent/${mod.slug}/`,
        fr: `${SITE_URL}/fr/forge/course/my-first-ai-agent/${mod.slug}/`,
      },
    },
    openGraph: {
      title: `${mod.title.fr} — Mon premier agent IA`,
      description: mod.subtitle.fr,
      url: `${SITE_URL}/fr/forge/course/my-first-ai-agent/${mod.slug}/`,
      siteName: 'Delta V',
      type: 'article',
    },
  };
}

export default async function OwnYourAIModulePageFr({
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
