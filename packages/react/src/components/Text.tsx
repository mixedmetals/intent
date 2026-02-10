/**
 * Text Component
 * 
 * Typography component for consistent text styling.
 * Replaces: text-*, font-*, text-*-*, leading-*
 */

import React, { forwardRef, createElement } from 'react';
import type { TextProps } from '../types.js';

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    children, 
    size = 'md',
    weight = 'normal',
    color = 'default',
    align = 'left',
    as: Component = 'span',
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-size': size,
      'data-weight': weight,
      'data-color': color,
      'data-align': align,
    };
    
    const baseClass = 'intent-text';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return createElement(
      Component,
      {
        ref,
        className: finalClassName,
        style: { ...style, textAlign: align },
        ...dataAttrs,
        ...rest,
      },
      children
    );
  }
);

Text.displayName = 'Text';

// Convenience components for common text types
export const Heading = forwardRef<HTMLHeadingElement, Omit<TextProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 1, size, weight = 'bold', ...props }, ref) => {
    const sizeMap: Record<number, TextProps['size']> = {
      1: '2xl',
      2: 'xl',
      3: 'lg',
      4: 'md',
      5: 'sm',
      6: 'xs',
    };
    
    return (
      <Text 
        ref={ref}
        as={`h${level}` as const}
        size={size || sizeMap[level]}
        weight={weight}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';
