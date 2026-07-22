'use client';

import { useState } from 'react';

const bookingUrl = 'https://cal.com/delta-v/30min';
const embedUrl = `${bookingUrl}?embed=true&layout=month_view&timezone=Europe%2FParis`;

export default function CalBooker() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex min-h-[36rem] flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-deep)] p-8 text-center">
        <div className="text-[10px] font-semibold uppercase tracking-[2px] text-[var(--accent-orange)]">Cal.com availability</div>
        <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
          Cal.com could not be displayed here. Continue to the secure booking page to choose a time.
        </p>
        <a className="button-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Open Cal.com <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  return (
    <div className="cal-booker-shell w-full overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-deep)]">
      <iframe
        title="Cal.com booking calendar"
        src={embedUrl}
        className="block h-[46rem] w-full border-0 bg-[var(--bg-deep)] md:h-[52rem]"
        loading="eager"
        allow="payment"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
