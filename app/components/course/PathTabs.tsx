'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { InteractiveChecklist } from '@/app/components/course/CourseLearning';
import { formatCourseText } from '@/app/components/course/formatCourseText';
import { t, type CourseLang, type LocaleString } from '@/app/data/courses/open-harness';

export type CoursePath = {
  id: string;
  label: LocaleString;
  minutes: number;
  steps: string[];
};

export function PathTabs({
  paths,
  lang,
  moduleSlug,
  sectionKey,
}: {
  paths: CoursePath[];
  lang: CourseLang;
  moduleSlug: string;
  sectionKey: string;
}) {
  const [selectedId, setSelectedId] = useState(paths[0]?.id ?? 'dedicated');
  const selectedPath = paths.find((p) => p.id === selectedId) || paths[0];

  if (!selectedPath) {
    console.warn('PathTabs: no paths provided');
    return null;
  }

  return (
    <div className="mt-6">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--border-default)]">
        {paths.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedId(path.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              selectedId === path.id
                ? 'border-[var(--accent-orange)] text-[var(--accent-orange)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{formatCourseText(t(path.label, lang))}</span>
            <span className="ml-2 text-xs text-[var(--text-tertiary)]">
              (~{path.minutes} min)
            </span>
          </button>
        ))}
      </div>

      {/* Content for selected path */}
      <div className="mt-6">
        <InteractiveChecklist
          courseId="open-harness"
          moduleSlug={moduleSlug}
          sectionKey={`${sectionKey}-${selectedPath.id}`}
          items={selectedPath.steps}
          accent="orange"
          mode="steps"
        />
      </div>
    </div>
  );
}
