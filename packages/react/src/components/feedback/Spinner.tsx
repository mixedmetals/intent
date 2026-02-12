import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface SpinnerProps {
  /** Spinner size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Spinner color */
  color?: 'current' | 'blue' | 'green' | 'amber' | 'red' | 'neutral';
  /** Border thickness */
  thickness?: 'thin' | 'normal' | 'thick';
  /** Label for accessibility */
  label?: string;
  /** Additional className */
  className?: string;
}

/**
 * Spinner - Loading indicator
 * 
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner />
 * 
 * // Sizes
 * <Spinner size="xs" />
 * <Spinner size="sm" />
 * <Spinner size="lg" />
 * 
 * // Colors
 * <Spinner color="blue" />
 * <Spinner color="green" />
 * 
 * // Thickness
 * <Spinner thickness="thin" />
 * <Spinner thickness="thick" />
 * 
 * // With label for accessibility
 * <Spinner label="Loading content..." />
 * 
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="sm" />
 *   Loading
 * </Button>
 * ```
 */
export const Spinner = createComponent<SpinnerProps>('Spinner', {
  size: 'md',
  color: 'current',
  thickness: 'normal',
});

export default Spinner;
