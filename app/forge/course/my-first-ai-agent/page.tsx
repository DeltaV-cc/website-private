import type { Metadata } from 'next';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import { AihLanding } from '@/app/components/course/aihero/AihLanding';

export const metadata: Metadata = {
  title: 'My First AI Agent — build your own agent harness | Delta V',
  description:
    'Thirteen free lessons to build your own agent harness — yours to run and change, instead of renting one from Claude or OpenAI. No code required.',
};

export default function OwnYourAILandingPage() {
  return (
    <AihChrome>
      <AihLanding />
    </AihChrome>
  );
}
