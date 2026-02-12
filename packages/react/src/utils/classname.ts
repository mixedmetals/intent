/**
 * Classname Utilities
 * 
 * Helper functions for generating and managing CSS class names
 * and style attributes for Intent components.
 */

import type { CSSProperties } from 'react';

/**
 * Combine multiple class names into a single string
 * Filters out falsy values
 */
export function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Convert style object to data attributes for Intent styling
 * Extracts Intent-specific props and converts to data attributes
 */
export function styleAttr(
  props: Record<string, unknown>
): { style?: CSSProperties } {
  // Extract standard CSS properties from props
  const style: CSSProperties = {};
  
  // Common CSS properties that can be passed as props
  const cssProps = [
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'display', 'position', 'top', 'right', 'bottom', 'left',
    'flex', 'flexGrow', 'flexShrink', 'flexBasis',
    'gridColumn', 'gridRow', 'gridArea',
    'order', 'alignSelf', 'justifySelf',
    'opacity', 'visibility', 'zIndex',
    'transform', 'transition', 'animation',
    'cursor', 'pointerEvents', 'userSelect',
  ];
  
  for (const prop of cssProps) {
    if (prop in props && props[prop] !== undefined) {
      (style as Record<string, unknown>)[prop] = props[prop];
    }
  }
  
  return Object.keys(style).length > 0 ? { style } : {};
}

/**
 * Generate Intent component class name
 */
export function intentClassName(
  componentName: string,
  ...modifiers: (string | undefined | null | false)[]
): string {
  const base = `intent-${componentName.toLowerCase()}`;
  const mods = modifiers
    .filter(Boolean)
    .map(mod => `${base}--${mod}`);
  return [base, ...mods].join(' ');
}
