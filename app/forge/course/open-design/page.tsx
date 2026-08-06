import type { Metadata } from 'next';
import { DesignLandingBody, DesignPageChrome } from '@/app/components/course/DesignCourseShell';
import { OPEN_DESIGN_META, t } from '@/app/data/courses/open-design';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open Design — Course 02 | Delta V',
  description: t(OPEN_DESIGN_META.description),
  openGraph: {
    title: 'Open Design — decks, images, content you own',
    description: t(OPEN_DESIGN_META.tagline),
    url: `${SITE_URL}/forge/course/open-design/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

export default function OpenDesignLandingPage() {
  return (
    <DesignPageChrome>
      <DesignLandingBody />
    </DesignPageChrome>
  );
}
