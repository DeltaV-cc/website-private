import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CoursePageChrome } from '@/app/components/course/CourseShell';
import { ModuleBody } from '@/app/components/course/ModuleBody';
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
  if (!mod) return { title: 'Open Harness' };
  return {
    title: `${mod.number} · ${mod.title.en} — Open Harness | Delta V`,
    description: mod.subtitle.en,
    openGraph: {
      title: `${mod.title.en} — Open Harness`,
      description: mod.subtitle.en,
      url: `${SITE_URL}/forge/course/open-harness/${mod.slug}/`,
      siteName: 'Delta V',
      type: 'article',
    },
  };
}

export default async function OpenHarnessModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  return (
    <CoursePageChrome activeSlug={mod.slug}>
      <ModuleBody module={mod} />
    </CoursePageChrome>
  );
}
