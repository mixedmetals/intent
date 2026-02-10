/**
 * Stack Component
 * 
 * A layout component for distributing children along an axis with consistent spacing.
 * Replaces: flex, flex-col, flex-row, gap-*, items-*, justify-*
 */

import React, { forwardRef } from 'react';
import type { StackProps } from '../types.js';

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ 
    children, 
    direction = 'column', 
    gap = 'normal',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-direction': direction,
      'data-gap': gap,
      'data-align': align,
      'data-justify': justify,
      'data-wrap': wrap ? 'true' : undefined,
    };
    
    const baseClass = 'intent-stack';
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

Stack.displayName = 'Stack';

// Convenience aliases
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);
VStack.displayName = 'VStack';

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);
HStack.displayName = 'HStack';
