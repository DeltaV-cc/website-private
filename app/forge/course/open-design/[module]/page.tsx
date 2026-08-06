import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DesignModuleBody, DesignPageChrome } from '@/app/components/course/DesignCourseShell';
import {
  OPEN_DESIGN_MODULES,
  getOdModule,
  t,
} from '@/app/data/courses/open-design';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return OPEN_DESIGN_MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = getOdModule(slug);
  if (!mod) return { title: 'Open Design' };
  return {
    title: `${mod.number} · ${t(mod.title)} — Open Design | Delta V`,
    description: t(mod.subtitle),
    openGraph: {
      title: `${t(mod.title)} — Open Design`,
      description: t(mod.subtitle),
      url: `${SITE_URL}/forge/course/open-design/${mod.slug}/`,
      siteName: 'Delta V',
      type: 'article',
    },
  };
}

export default async function OpenDesignModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: slug } = await params;
  const mod = getOdModule(slug);
  if (!mod) notFound();

  return (
    <DesignPageChrome activeSlug={mod.slug}>
      <DesignModuleBody module={mod} />
    </DesignPageChrome>
  );
}
