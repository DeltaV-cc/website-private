'use client';

import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent-orange' | 'accent-purple';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--accent-cyan)] text-black hover:bg-white transition-colors duration-200',
  secondary: 'bg-white/[0.06] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-white/[0.08] transition-all duration-200',
  outline: 'border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 hover:border-[var(--accent-cyan)]/50 transition-all duration-200',
  ghost: 'text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors duration-150',
  'accent-orange': 'bg-[var(--accent-orange)] text-white hover:bg-[#d94d0f] transition-colors duration-200',
  'accent-purple': 'bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/30 text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/20 transition-all duration-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-sm rounded-xl font-medium',
};

export default function Button({
  children, variant = 'secondary', size = 'md', href, onClick,
  className = '', disabled = false, type = 'button', icon, iconPosition = 'right',
}: ButtonProps) {
  const base = `inline-flex items-center gap-2 font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`;
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );
  if (href) return <Link href={href} className={base} aria-disabled={disabled}>{content}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{content}</button>;
}
