/**
 * Divider Component
 * 
 * Visual separator between content sections.
 * Replaces: border-t, border-b, w-full, h-px
 */

import React, { forwardRef } from 'react';
import type { DividerProps } from '../types.js';

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ 
    orientation = 'horizontal',
    weight = 'normal',
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-orientation': orientation,
      'data-weight': weight,
    };
    
    const baseClass = 'intent-divider';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return (
      <hr 
        ref={ref}
        className={finalClassName}
        style={style}
        {...dataAttrs}
        {...rest}
      />
    );
  }
);

Divider.displayName = 'Divider';
