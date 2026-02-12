import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface LabelProps {
  /** Label size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold';
  /** Show required indicator */
  required?: boolean;
  /** Disabled state (affects styling) */
  disabled?: boolean;
  /** Associated input id */
  htmlFor?: string;
  /** Label text */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Label - Form label with required indicator
 * 
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" />
 * 
 * // Required field
 * <Label htmlFor="name" required>Name</Label>
 * <Input id="name" required />
 * 
 * // Different sizes
 * <Label size="lg" htmlFor="title">Title</Label>
 * ```
 */
export const Label = createComponent<LabelProps>('Label', {
  size: 'sm',
  weight: 'medium',
  required: false,
  disabled: false,
});

export default Label;
