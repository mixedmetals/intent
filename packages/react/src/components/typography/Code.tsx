import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface CodeProps {
  /** Code variant */
  variant?: 'inline' | 'block';
  /** Programming language (for syntax highlighting hooks) */
  language?: string;
  /** Font size */
  size?: 'xs' | 'sm' | 'base' | 'lg';
  /** Child elements (code content) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Code - Inline and block code with syntax highlighting hooks
 * 
 * @example
 * ```tsx
 * // Inline code
 * <p>
 *   Use the <Code>useState</Code> hook for state management.
 * </p>
 * 
 * // Inline with language
 * <p>
 *   Import with <Code language="typescript">import React from 'react'</Code>
 * </p>
 * 
 * // Code block
 * <Code variant="block" language="javascript">
 * {`function greet(name) {
 *   return \`Hello, \${name}!\`;
 * }`}
 * </Code>
 * 
 * // Small inline code
 * <Code size="xs">npm install intent-react</Code>
 * ```
 */
export const Code = createComponent<CodeProps>('Code', {
  variant: 'inline',
  size: 'sm',
});

export default Code;
