import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ProseProps {
  /** Text size for the prose content */
  size?: 'sm' | 'base' | 'lg';
  /** Color scheme */
  color?: 'default' | 'invert';
  /** Child elements (markdown/rich text content) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Prose - Markdown content wrapper (like Tailwind Typography)
 * 
 * Provides sensible defaults for rendered markdown content
 * including proper spacing, typography, and element styling.
 * 
 * @example
 * ```tsx
 * // Basic prose wrapper
 * <Prose>
 *   <h1>Article Title</h1>
 *   <p>Introduction paragraph...</p>
 *   <ul>
 *     <li>List item</li>
 *   </ul>
 * </Prose>
 * 
 * // Small prose (for sidebars)
 * <Prose size="sm">
 *   {markdownContent}
 * </Prose>
 * 
 * // Large prose (for featured content)
 * <Prose size="lg">
 *   {articleContent}
 * </Prose>
 * 
 * // Inverted colors (for dark backgrounds)
 * <Prose color="invert">
 *   {content}
 * </Prose>
 * ```
 */
export const Prose = createComponent<ProseProps>('Prose', {
  size: 'base',
  color: 'default',
});

export default Prose;
