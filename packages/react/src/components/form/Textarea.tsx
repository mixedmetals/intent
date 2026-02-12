import React, { forwardRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface TextareaProps {
  /** Control size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  /** Validation state */
  validation?: 'none' | 'valid' | 'invalid' | 'warning';
  /** Resize behavior */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** Number of rows */
  rows?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field */
  required?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Input value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Additional className */
  className?: string;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
}

/**
 * Textarea - Multi-line text input
 * 
 * @example
 * ```tsx
 * // Basic textarea
 * <Textarea placeholder="Enter your message..." />
 * 
 * // With rows
 * <Textarea rows={5} placeholder="Larger textarea" />
 * 
 * // No resize
 * <Textarea resize="none" placeholder="Fixed size" />
 * 
 * // Horizontal resize only
 * <Textarea resize="horizontal" />
 * 
 * // With validation
 * <Textarea validation="invalid" placeholder="Error state" />
 * ```
 */
export const Textarea = createComponent<TextareaProps>('Textarea', {
  size: 'md',
  variant: 'outline',
  validation: 'none',
  resize: 'vertical',
  rows: 3,
  disabled: false,
  readOnly: false,
  required: false,
  fullWidth: false,
});

// Forward ref version
export const TextareaField = forwardRef<HTMLTextAreaElement, Omit<TextareaProps, 'ref'>>(
  (props, ref) => {
    return <Textarea {...props} ref={ref} />;
  }
);

TextareaField.displayName = 'TextareaField';

export default Textarea;
