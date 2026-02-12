import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface TextProps {
  /** Font size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Font weight */
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  /** Line height */
  lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  /** Letter spacing */
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text transform */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Text decoration */
  decoration?: 'none' | 'underline' | 'line-through' | 'overline';
  /** Decoration style */
  decorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' | 'inherit';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Text wrapping */
  wrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty';
  /** Word breaking */
  break?: 'normal' | 'words' | 'all' | 'keep';
  /** Hyphenation */
  hyphens?: 'none' | 'manual' | 'auto';
  /** Italic style */
  italic?: boolean;
  /** Screen reader only (visually hidden) */
  srOnly?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Text - Extended text component with full typography control
 * 
 * A flexible text wrapper for inline content with comprehensive
 * typography styling options.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Text>Default text</Text>
 * 
 * // Styled text
 * <Text weight="bold" color="primary">Bold primary text</Text>
 * 
 * // Uppercase tracking
 * <Text transform="uppercase" letterSpacing="wide">LABEL</Text>
 * 
 * // Underlined link style
 * <Text decoration="underline" decorationStyle="dotted">Dotted underline</Text>
 * 
 * // Truncated text
 * <Text truncate>Very long text that will be truncated...</Text>
 * 
 * // Screen reader only (accessible but hidden visually)
 * <Text srOnly>Accessible description</Text>
 * ```
 */
export const Text = createComponent<TextProps>('Text', {
  size: 'base',
  weight: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  align: 'left',
  transform: 'none',
  decoration: 'none',
  decorationStyle: 'solid',
  color: 'default',
  truncate: false,
  wrap: 'wrap',
  break: 'normal',
  hyphens: 'manual',
  italic: false,
  srOnly: false,
});

export default Text;
