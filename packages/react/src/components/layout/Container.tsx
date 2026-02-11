import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ContainerProps {
  /** Container max-width size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Center the container horizontally */
  center?: boolean;
  /** Make container fluid (full width, no max-width) */
  fluid?: boolean;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Container - Max-width wrapper with responsive breakpoints
 * 
 * Centers content and provides consistent max-width constraints.
 * 
 * @example
 * ```tsx
 * <Container size="lg">
 *   <h1>Content</h1>
 * </Container>
 * 
 * <Container fluid>
 *   <p>Full-width content</p>
 * </Container>
 * ```
 */
export const Container = createComponent<ContainerProps>('Container', {
  size: 'full',
  center: true,
  fluid: false,
});

// Convenience exports
export default Container;
