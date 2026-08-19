'use client';

import { useId } from 'react';

/**
 * Inline privacy cue: a hover/focus tooltip instead of another paragraph of
 * fine print. Reused anywhere the course needs a compact cloud-model warning.
 */
export function PrivacyWarningChip() {
  const tooltipId = useId();

  return (
    <span className="course-privacy-chip-wrap group relative inline-flex align-middle">
      <button
        type="button"
        aria-label="Privacy warning"
        aria-describedby={tooltipId}
        className="course-privacy-chip"
      >
        <span aria-hidden>⚠</span>
      </button>
      <span id={tooltipId} role="tooltip" className="course-privacy-chip-tooltip">
        Privacy note: free cloud models can send your prompts and page context to the provider,
        so the content leaves your machine.
      </span>
    </span>
  );
}
