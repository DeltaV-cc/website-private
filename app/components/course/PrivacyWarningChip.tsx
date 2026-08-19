'use client';

import { useId } from 'react';
import { useOpenHarnessLang } from '@/app/components/course/CourseShell';

/**
 * Inline privacy cue: a hover/focus tooltip instead of another paragraph of
 * fine print. Reused anywhere the course needs a compact cloud-model warning.
 */
export function PrivacyWarningChip() {
  const tooltipId = useId();
  const lang = useOpenHarnessLang();
  const aria = lang === 'fr' ? 'Avertissement confidentialité' : 'Privacy warning';
  const note =
    lang === 'fr'
      ? 'Note confidentialité : les modèles cloud gratuits peuvent envoyer vos prompts et le contexte de la page au fournisseur — le contenu quitte donc votre machine.'
      : 'Privacy note: free cloud models can send your prompts and page context to the provider, so the content leaves your machine.';

  return (
    <span className="course-privacy-chip-wrap group relative inline-flex align-middle">
      <button
        type="button"
        aria-label={aria}
        aria-describedby={tooltipId}
        className="course-privacy-chip"
      >
        <span aria-hidden>⚠</span>
      </button>
      <span id={tooltipId} role="tooltip" className="course-privacy-chip-tooltip">
        {note}
      </span>
    </span>
  );
}
