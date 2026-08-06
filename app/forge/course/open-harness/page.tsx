import type { Metadata } from 'next';
import { CourseLandingBody, CoursePageChrome } from '@/app/components/course/CourseShell';
import { OPEN_HARNESS_META } from '@/app/data/courses/open-harness';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open Harness — Hermes course | Delta V',
  description: OPEN_HARNESS_META.description.en,
  openGraph: {
    title: 'Open Harness — Build a Hermes harness you own',
    description: OPEN_HARNESS_META.tagline.en,
    url: `${SITE_URL}/forge/course/open-harness/`,
    siteName: 'Delta V',
    type: 'website',
  },
};

export default function OpenHarnessLandingPage() {
  return (
    <CoursePageChrome>
      <CourseLandingBody />
    </CoursePageChrome>
  );
}
