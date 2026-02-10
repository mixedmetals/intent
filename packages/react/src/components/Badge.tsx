/**
 * Badge Component
 * 
 * Small label for displaying status, count, or category.
 * Replaces: inline-flex, px-*, py-*, rounded-full, text-xs, bg-*, text-*
 */

import React, { forwardRef } from 'react';
import type { BadgeProps } from '../types.js';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    children, 
    importance = 'default',
    size = 'sm',
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-importance': importance,
      'data-size': size,
    };
    
    const baseClass = 'intent-badge';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return (
      <span 
        ref={ref}
        className={finalClassName}
        style={style}
        {...dataAttrs}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
