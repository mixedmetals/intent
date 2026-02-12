import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface CheckboxProps {
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'filled' | 'outline';
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checked state */
  checked?: boolean;
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Additional className */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Input value */
  value?: string;
}

/**
 * Checkbox - Single checkbox input
 * 
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox label="Accept terms" />
 * 
 * // Controlled
 * <Checkbox 
 *   checked={accepted} 
 *   onChange={setAccepted} 
 *   label="I agree" 
 * />
 * 
 * // Sizes
 * <Checkbox size="sm" label="Small" />
 * <Checkbox size="lg" label="Large" />
 * 
 * // Indeterminate (for parent of partial selection)
 * <Checkbox indeterminate label="Select all" />
 * 
 * // Disabled
 * <Checkbox disabled label="Disabled" />
 * ```
 */
export const Checkbox = createComponent<CheckboxProps>('Checkbox', {
  size: 'md',
  variant: 'default',
  disabled: false,
  required: false,
  indeterminate: false,
});

// Forward ref version
export const CheckboxField = forwardRef<HTMLInputElement, Omit<CheckboxProps, 'ref'>>(
  (props, ref) => {
    return <Checkbox {...props} ref={ref} />;
  }
);

CheckboxField.displayName = 'CheckboxField';

export default Checkbox;
