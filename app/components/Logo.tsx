import React from 'react';

/**
 * Delta V signal mark. The same PNG is also used for the favicon.
 */
export default function Logo({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img src="/website-private/icon.png" width={size} height={size} className={className} alt="Delta V" />
  );
}
