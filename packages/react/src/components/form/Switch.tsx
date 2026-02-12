import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface SwitchProps {
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
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
  /** Label text (for on state) */
  onLabel?: string;
  /** Label text (for off state) */
  offLabel?: string;
  /** Additional className */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
}

/**
 * Switch - Toggle switch (checkbox alternative)
 * 
 * @example
 * ```tsx
 * // Basic switch
 * <Switch />
 * 
 * // With labels
 * <Switch onLabel="On" offLabel="Off" />
 * 
 * // Controlled
 * <Switch 
 *   checked={enabled} 
 *   onChange={setEnabled} 
 * />
 * 
 * // Sizes
 * <Switch size="sm" />
 * <Switch size="lg" />
 * 
 * // Disabled
 * <Switch disabled />
 * ```
 */
export const Switch = createComponent<SwitchProps>('Switch', {
  size: 'md',
  disabled: false,
  required: false,
});

// Forward ref version
export const SwitchField = forwardRef<HTMLInputElement, Omit<SwitchProps, 'ref'>>(
  (props, ref) => {
    return <Switch {...props} ref={ref} />;
  }
);

SwitchField.displayName = 'SwitchField';

export default Switch;
