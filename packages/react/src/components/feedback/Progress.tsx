import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ProgressProps {
  /** Progress variant */
  variant?: 'linear' | 'circular';
  /** Progress size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Progress color */
  color?: 'blue' | 'green' | 'amber' | 'red' | 'neutral';
  /** Current value (0-100) */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Indeterminate animation */
  indeterminate?: boolean;
  /** Show value label */
  showLabel?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Progress - Linear and circular progress indicators
 * 
 * @example
 * ```tsx
 * // Linear progress (default)
 * <Progress value={50} />
 * 
 * // With label
 * <Progress value={75} showLabel />
 * 
 * // Sizes
 * <Progress value={30} size="sm" />
 * <Progress value={60} size="lg" />
 * 
 * // Colors
 * <Progress value={80} color="green" />
 * <Progress value={45} color="amber" />
 * 
 * // Indeterminate (loading)
 * <Progress indeterminate />
 * 
 * // Circular
 * <Progress variant="circular" value={65} />
 * 
 * // Circular sizes
 * <Progress variant="circular" size="lg" value={80} />
 * ```
 */
export const Progress = createComponent<ProgressProps>('Progress', {
  variant: 'linear',
  size: 'md',
  color: 'blue',
  min: 0,
  max: 100,
  indeterminate: false,
  showLabel: false,
});

export default Progress;
