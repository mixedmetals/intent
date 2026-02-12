import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface InputProps {
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'week' | 'time';
  /** Control size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  /** Validation state */
  validation?: 'none' | 'valid' | 'invalid' | 'warning';
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field */
  required?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Autocomplete hint */
  autocomplete?: string;
  /** Input value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Additional className */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
}

/**
 * Input - Text input with support for all HTML5 input types
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 * 
 * // Email input
 * <Input type="email" placeholder="email@example.com" />
 * 
 * // With validation
 * <Input validation="invalid" placeholder="Invalid input" />
 * 
 * // Different sizes
 * <Input size="sm" placeholder="Small" />
 * <Input size="lg" placeholder="Large" />
 * 
 * // Different variants
 * <Input variant="filled" placeholder="Filled" />
 * <Input variant="flushed" placeholder="Flushed" />
 * 
 * // Controlled
 * <Input 
 *   value={value} 
 *   onChange={setValue} 
 *   placeholder="Controlled input" 
 * />
 * ```
 */
export const Input = createComponent<InputProps>('Input', {
  type: 'text',
  size: 'md',
  variant: 'outline',
  validation: 'none',
  disabled: false,
  readOnly: false,
  required: false,
  loading: false,
  fullWidth: false,
});

// Forward ref version for form library integration
export const InputField = forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(
  (props, ref) => {
    return <Input {...props} ref={ref} />;
  }
);

InputField.displayName = 'InputField';

export default Input;
