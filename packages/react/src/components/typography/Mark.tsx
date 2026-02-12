import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface MarkProps {
  /** Highlight variant/color */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Child elements (text to highlight) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Mark - Highlight/mark text
 * 
 * Highlighted text for search results, emphasis, or annotations.
 * 
 * @example
 * ```tsx
 * // Default highlight (yellow)
 * <p>Search results for <Mark>keyword</Mark> in document.</p>
 * 
 * // Primary highlight (blue)
 * <p>The <Mark variant="primary">important</Mark> information.</p>
 * 
 * // Success highlight (green)
 * <p>Task <Mark variant="success">completed</Mark> successfully.</p>
 * 
 * // Warning highlight (orange)
 * <p><Mark variant="warning">Caution</Mark> required here.</p>
 * 
 * // Error highlight (red)
 * <p><Mark variant="error">Invalid</Mark> input detected.</p>
 * ```
 */
export const Mark = createComponent<MarkProps>('Mark', {
  variant: 'default',
});

// Convenience aliases
export const Highlight = Mark;
export const SearchHighlight = (props: Omit<MarkProps, 'variant'>) => <Mark variant="default" {...props} />;

export default Mark;
