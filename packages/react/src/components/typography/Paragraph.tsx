import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ParagraphProps {
  /** Text size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /** Paragraph variant */
  variant?: 'default' | 'lead' | 'caption' | 'small';
  /** Font weight */
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  /** Line height */
  lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text color */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Paragraph - Body text with size variants for lead and caption
 * 
 * @example
 * ```tsx
 * // Standard paragraph
 * <Paragraph>Regular body text content.</Paragraph>
 * 
 * // Lead paragraph (intro text)
 * <Paragraph variant="lead">
 *   This is an introduction paragraph with larger text and relaxed line height.
 * </Paragraph>
 * 
 * // Caption paragraph
 * <Paragraph variant="caption" color="muted">
 *   Small caption text in muted color.
 * </Paragraph>
 * ```
 */
export const Paragraph = createComponent<ParagraphProps>('Paragraph', {
  size: 'base',
  variant: 'default',
  weight: 'normal',
  lineHeight: 'normal',
  align: 'left',
  color: 'default',
  truncate: false,
});

// Convenience alias
export const P = Paragraph;

export default Paragraph;
