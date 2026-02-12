import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface QuoteProps {
  /** Quote variant */
  variant?: 'default' | 'bordered' | 'pull';
  /** Text size */
  size?: 'sm' | 'base' | 'lg' | 'xl';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Optional citation/source */
  cite?: string;
  /** Child elements (quote content) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Quote - Blockquote with citation
 * 
 * @example
 * ```tsx
 * // Basic quote
 * <Quote>
 *   The only way to do great work is to love what you do.
 * </Quote>
 * 
 * // With citation
 * <Quote cite="Steve Jobs">
 *   Stay hungry, stay foolish.
 * </Quote>
 * 
 * // Bordered variant
 * <Quote variant="bordered" size="lg">
 *   A prominent quote with border and background.
 * </Quote>
 * 
 * // Pull quote (floats left)
 * <Quote variant="pull" size="xl">
 *   An eye-catching pull quote for articles.
 * </Quote>
 * ```
 */
export const Quote = createComponent<QuoteProps>('Quote', {
  variant: 'default',
  size: 'base',
  align: 'left',
});

// Convenience alias
export const Blockquote = Quote;

export default Quote;
