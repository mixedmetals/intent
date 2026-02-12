import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface RadioProps {
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'filled' | 'outline';
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
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
  /** Input name (group identifier) */
  name?: string;
  /** Input id */
  id?: string;
  /** Input value */
  value: string;
}

/**
 * Radio - Single radio button input
 * 
 * Use with RadioGroup or share name attribute for grouping.
 * 
 * @example
 * ```tsx
 * // Basic radio
 * <Radio name="fruit" value="apple" label="Apple" />
 * <Radio name="fruit" value="banana" label="Banana" />
 * 
 * // Controlled
 * <Radio 
 *   name="size" 
 *   value="lg" 
 *   checked={size === 'lg'} 
 *   onChange={() => setSize('lg')} 
 *   label="Large" 
 * />
 * 
 * // Sizes
 * <Radio size="sm" name="option" value="1" label="Small" />
 * <Radio size="lg" name="option" value="2" label="Large" />
 * ```
 */
export const Radio = createComponent<RadioProps>('Radio', {
  size: 'md',
  variant: 'default',
  disabled: false,
  required: false,
});

// Forward ref version
export const RadioField = forwardRef<HTMLInputElement, Omit<RadioProps, 'ref'>>(
  (props, ref) => {
    return <Radio {...props} ref={ref} />;
  }
);

RadioField.displayName = 'RadioField';

export default Radio;
