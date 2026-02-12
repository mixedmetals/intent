/**
 * Component Factory
 * 
 * Creates React components from Intent schemas with proper type safety
 * and data attribute binding.
 */

import React, { forwardRef, type ElementType, type ReactNode } from 'react';
import type { ComponentSchema } from 'intent-core';

// Props extractor - converts Intent props to data attributes
export function intentPropsToDataAttributes(
  props: Record<string, unknown>,
  schema: ComponentSchema
): Record<string, string> {
  const attrs: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(props)) {
    // Skip React-specific props
    if (['children', 'key', 'ref', 'as', 'className', 'style'].includes(key)) {
      continue;
    }
    
    // Skip event handlers
    if (typeof key === 'string' && key.startsWith('on')) {
      continue;
    }
    
    // Only include defined schema properties
    if (schema.properties[key]) {
      attrs[`data-${key.toLowerCase()}`] = String(value);
    }
  }
  
  return attrs;
}

// Default props application
export function applyDefaultProps(
  props: Record<string, unknown>,
  schema: ComponentSchema
): Record<string, unknown> {
  const result = { ...props };
  
  for (const [key, definition] of Object.entries(schema.properties)) {
    if (!(key in result) && 'default' in definition) {
      result[key] = definition.default;
    }
  }
  
  return result;
}

// Component class name generator
export function generateIntentClassName(
  componentName: string,
  prefix = 'intent'
): string {
  return `${prefix}-${componentName.toLowerCase()}`;
}

// Validation helper (dev mode only)
export function validateProps(
  props: Record<string, unknown>,
  schema: ComponentSchema,
  componentName: string
): void {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  
  // Check required props
  for (const [key, definition] of Object.entries(schema.properties)) {
    if (definition.required && !(key in props)) {
      console.warn(
        `[Intent] ${componentName}: Required prop "${key}" is missing`
      );
    }
  }
  
  // Check for unknown props
  for (const key of Object.keys(props)) {
    if (['children', 'as', 'className', 'style', 'ref', 'key'].includes(key)) {
      continue;
    }
    if (!schema.properties[key]) {
      console.warn(
        `[Intent] ${componentName}: Unknown prop "${key}". ` +
        `Valid props: ${Object.keys(schema.properties).join(', ')}`
      );
    }
  }
}

// ============================================================================
// Component Factory
// ============================================================================

interface CreateComponentOptions {
  /** Default className */
  className?: string;
  /** Default props */
  defaultProps?: Record<string, unknown>;
}

/**
 * Create a React component with Intent schema binding
 * 
 * @param name - Component name (used for className and data attributes)
 * @param defaults - Default props for the component
 * @returns React component with Intent styling
 */
export function createComponent<P extends object>(
  name: string,
  defaults?: Partial<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & { as?: ElementType; className?: string }> & React.RefAttributes<HTMLElement>> {
  const baseClassName = generateIntentClassName(name);
  
  return React.forwardRef<HTMLElement, P & { as?: ElementType; className?: string }>(
    ({ as: Component = 'div', className, ...props }, ref) => {
      const mergedProps = { ...defaults, ...props } as Record<string, unknown>;
      const finalClassName = className ? `${baseClassName} ${className}` : baseClassName;
      
      return React.createElement(Component as string, {
        ref,
        className: finalClassName,
        'data-intent': name.toLowerCase(),
        ...mergedProps,
      });
    }
  ) as React.ForwardRefExoticComponent<React.PropsWithoutRef<P & { as?: ElementType; className?: string }> & React.RefAttributes<HTMLElement>>;
}

createComponent.displayName = 'createComponent';
