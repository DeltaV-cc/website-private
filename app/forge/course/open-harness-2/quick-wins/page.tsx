import type { Metadata } from 'next';
import { AihChrome } from '@/app/components/course/aihero/AihChrome';
import { QuickWinsBody } from '@/app/components/course/aihero/QuickWinsBody';

export const metadata: Metadata = {
  title: 'Quick wins — Open Harness 2 | Delta V',
  description:
    'Small, real things to run once your agent chats: clean your data-broker footprint, teach the agent a book, point at your screen.',
};

export default function QuickWinsPage() {
  return (
    <AihChrome>
      <QuickWinsBody />
    </AihChrome>
  );
}
