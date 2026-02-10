/**
 * Surface Component
 * 
 * A container providing visual elevation and background treatment.
 * Replaces: bg-*, shadow-*, p-*, rounded-*
 */

import React, { forwardRef } from 'react';
import type { SurfaceProps } from '../types.js';

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ 
    children, 
    elevation = 'none',
    padding = 'normal',
    background = 'default',
    radius = 'md',
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-elevation': elevation,
      'data-padding': padding,
      'data-background': background,
      'data-radius': radius,
    };
    
    const baseClass = 'intent-surface';
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

Surface.displayName = 'Surface';
