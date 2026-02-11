import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface CenterProps {
  /** Use inline-flex instead of flex */
  inline?: boolean;
  /** Flex direction for children */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Center - Flexbox centering helper
 * 
 * Centers content horizontally and vertically using flexbox.
 * 
 * @example
 * ```tsx
 * // Center a single element
 * <Center>
 *   <p>Centered content</p>
 * </Center>
 * 
 * // Center with column layout
 * <Center direction="column">
 *   <h1>Title</h1>
 *   <p>Subtitle</p>
 * </Center>
 * 
 * // Inline centering
 * <p>
 *   Text with <Center inline>centered</Center> word
 * </p>
 * 
 * // Full viewport center
 * <Center width="screen" height="screen">
 *   <h1>Hero Content</h1>
 * </Center>
 * ```
 */
export const Center = createComponent<CenterProps>('Center', {
  inline: false,
  direction: 'row',
});

// Convenience exports
export default Center;
