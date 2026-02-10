/**
 * Card Component
 * 
 * Container for grouping related content and actions.
 * Extends Surface with card-specific defaults.
 */

import React, { forwardRef } from 'react';
import type { CardProps } from '../types.js';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    elevation = 'low',
    padding = 'relaxed',
    background = 'elevated',
    radius = 'lg',
    interactive = false,
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-elevation': elevation,
      'data-padding': padding,
      'data-background': background,
      'data-radius': radius,
      'data-interactive': interactive ? 'true' : undefined,
    };
    
    const baseClass = 'intent-card';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return (
      <div 
        ref={ref}
        className={finalClassName}
        style={style}
        {...dataAttrs}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
