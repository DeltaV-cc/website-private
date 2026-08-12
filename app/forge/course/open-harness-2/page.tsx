import type { Metadata } from 'next';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import { AihLanding } from '@/app/components/course/aihero/AihLanding';

export const metadata: Metadata = {
  title: 'Open Harness 2 — the readable edition | Delta V',
  description:
    'The Open Harness course rebuilt for reading: same 13 lessons, shared progress, plus quick wins you can run today.',
};

export default function OpenHarness2LandingPage() {
  return (
    <AihChrome>
      <AihLanding />
    </AihChrome>
  );
}
