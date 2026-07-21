import React from 'react';

/**
 * Delta V signal mark. The favicon stays PNG for Next's app-icon convention;
 * page chrome uses the smaller WebP copy.
 */
export default function Logo({
  size = 28,
  className = '',
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/website-private/delta-v-mark.webp"
      width={size}
      height={size}
      className={className}
      alt="Delta V"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
