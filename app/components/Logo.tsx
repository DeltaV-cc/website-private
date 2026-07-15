import React from 'react';

/**
 * Delta V brand mark — dark navy disc with a white "ΔV".
 * Self-colored (does not inherit currentColor) so it renders correctly
 * on any background. Rebuilt from _Ressources/deltav_logo.png.
 */
export default function Logo({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      role="img"
      aria-label="Delta V"
    >
      <circle cx="60" cy="60" r="57" fill="#10251D" stroke="#5B9E83" strokeWidth="1.5" />
      {/* Δ — hollow delta */}
      <path
        d="M44 40 L29 82 L59 82 Z"
        fill="none"
        stroke="#B1E9D2"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      {/* V */}
      <path
        d="M63 40 L76 82 L89 40"
        fill="none"
        stroke="#B1E9D2"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
