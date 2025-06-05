import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'primary', children, className }: BadgeProps) => {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    outline: 'bg-transparent border border-gray-300 text-gray-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};