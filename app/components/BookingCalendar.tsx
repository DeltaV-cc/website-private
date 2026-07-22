'use client';

import CalBooker from './CalBooker';

/**
 * The booking surface is intentionally the official Cal.com calendar.
 * Keeping one calendar avoids a misleading local date picker followed by a
 * second calendar inside the provider embed.
 */
export default function BookingCalendar() {
  return (
    <div className="w-full" aria-label="Book a 30-minute call">
      <CalBooker />
    </div>
  );
}
