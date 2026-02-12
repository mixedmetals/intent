import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Control size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant */
  variant?: 'outline' | 'filled' | 'flushed';
  /** Validation state */
  validation?: 'none' | 'valid' | 'invalid' | 'warning';
  /** Selection mode */
  mode?: 'single' | 'multiple';
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Allow clearing selection */
  clearable?: boolean;
  /** Enable search/filter */
  searchable?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Selected value(s) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Available options */
  options?: SelectOption[];
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Additional className */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Child elements (for custom options) */
  children?: React.ReactNode;
}

/**
 * Select - Dropdown select with single or multiple selection
 * 
 * @example
 * ```tsx
 * // Basic select
 * <Select 
 *   options={[
 *     { value: 'a', label: 'Option A' },
 *     { value: 'b', label: 'Option B' },
 *   ]}
 * />
 * 
 * // With children
 * <Select placeholder="Choose...">
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 * </Select>
 * 
 * // Different variant
 * <Select variant="filled" options={options} />
 * 
 * // With validation
 * <Select validation="invalid" options={options} />
 * ```
 */
export const Select = createComponent<SelectProps>('Select', {
  size: 'md',
  variant: 'outline',
  validation: 'none',
  mode: 'single',
  disabled: false,
  required: false,
  loading: false,
  clearable: false,
  searchable: false,
  fullWidth: false,
});

// Forward ref version
export const SelectField = forwardRef<HTMLSelectElement, Omit<SelectProps, 'ref'>>(
  (props, ref) => {
    return <Select {...props} ref={ref} />;
  }
);

SelectField.displayName = 'SelectField';

export default Select;
