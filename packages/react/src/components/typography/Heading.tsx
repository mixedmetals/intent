import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface HeadingProps {
  /** Heading level (1-6) */
  level: '1' | '2' | '3' | '4' | '5' | '6';
  /** Font size override */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  /** Font weight */
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  /** Line height */
  lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  /** Letter spacing */
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Child elements (heading text) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Heading - Semantic heading with consistent typography scale
 * 
 * @example
 * ```tsx
 * <Heading level="1">Page Title</Heading>
 * <Heading level="2" size="3xl">Section Heading</Heading>
 * <Heading level="3" weight="semibold" color="primary">Custom Heading</Heading>
 * ```
 */
export const Heading = createComponent<HeadingProps>('Heading', {
  size: 'base',
  weight: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  align: 'left',
  transform: 'none',
  color: 'default',
  truncate: false,
});

// Convenience exports with semantic aliases
export const H1 = (props: Omit<HeadingProps, 'level'>) => <Heading level="1" {...props} />;
export const H2 = (props: Omit<HeadingProps, 'level'>) => <Heading level="2" {...props} />;
export const H3 = (props: Omit<HeadingProps, 'level'>) => <Heading level="3" {...props} />;
export const H4 = (props: Omit<HeadingProps, 'level'>) => <Heading level="4" {...props} />;
export const H5 = (props: Omit<HeadingProps, 'level'>) => <Heading level="5" {...props} />;
export const H6 = (props: Omit<HeadingProps, 'level'>) => <Heading level="6" {...props} />;

export default Heading;
