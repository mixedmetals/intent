/**
 * ============================================================================
 * Input Component - Milled Archetype Implementation
 * ============================================================================
 * 
 * Form input using the milled surface archetype.
 * Supports density-aware sizing and validation states.
 * 
 * @example
 * ```tsx
 * <Input 
 *   placeholder="Enter email"
 *   validation="error"
 *   leftIcon={<MailIcon />}
 * />
 * ```
 */

import React, { forwardRef } from 'react';
import { cx, intentVariants } from '../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export type InputValidation = 'default' | 'error' | 'success' | 'warning';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual validation state - affects border token */
  validation?: InputValidation;
  
  /** Size scale - multiplies density tokens */
  size?: InputSize;
  
  /** Icon rendered at start of input */
  leftIcon?: React.ReactNode;
  
  /** Icon rendered at end of input */
  rightIcon?: React.ReactNode;
  
  /** Helper text rendered below input */
  helperText?: string;
}

// ============================================================================
// Variant Generation
// ============================================================================

const inputVariants = intentVariants(
  'intent-input',
  {
    validation: {
      default: 'intent-input--default',
      error: 'intent-input--error',
      success: 'intent-input--success',
      warning: 'intent-input--warning',
    },
    size: {
      sm: 'intent-input--sm',
      md: 'intent-input--md',
      lg: 'intent-input--lg',
    },
  }
);

// ============================================================================
// Components
// ============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      validation = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      helperText,
      disabled,
      className,
      ...props
    },
    ref
  ) {
    const classes = cx(
      inputVariants({ validation, size }),
      className
    );

    return (
      <div className="intent-input-wrapper">
        <div
          className={classes}
          data-intent-component="input"
          data-intent-validation={validation}
          data-intent-size={size}
          data-intent-archetype="milled"
          data-state={disabled ? 'disabled' : validation}
        >
          {leftIcon && (
            <span className="intent-input__icon intent-input__icon--left" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className="intent-input__field"
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <span className="intent-input__icon intent-input__icon--right" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {helperText && (
          <span className="intent-input__helper" data-validation={validation}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  validation?: InputValidation;
  size?: InputSize;
  helperText?: string;
}

// TextArea variant using same archetype
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>
(
  function TextArea({ validation = 'default', size = 'md', helperText, className, ...props }, ref) {
    const classes = cx(
      'intent-input intent-input--textarea',
      inputVariants({ validation, size }),
      className
    );

    return (
      <div className="intent-input-wrapper">
        <div
          className={classes}
          data-intent-component="textarea"
          data-intent-validation={validation}
          data-intent-archetype="milled"
        >
          <textarea
            ref={ref}
            className="intent-input__field intent-input__field--textarea"
            {...props}
          />
        </div>
        {helperText && (
          <span className="intent-input__helper" data-validation={validation}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

// ============================================================================
// Schema Definition
// ============================================================================

export const InputSchema = {
  name: 'Input',
  archetype: 'milled',
  description: 'Form input using milled surface archetype with validation states',
  properties: {
    validation: {
      type: 'enum',
      values: ['default', 'error', 'success', 'warning'],
      default: 'default',
      description: 'Visual validation state - affects border gradient token',
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      description: 'Size scale - multiplies density tokens and min-height',
    },
  },
  constraints: [
    {
      when: { validation: 'error' },
      require: { helperText: 'string' },
      message: 'Error state should include helper text explaining the error',
    },
  ],
  tokens: {
    background: '--intent-surface-milled-bg',
    border: '--intent-surface-milled-border',
    shadow: '--intent-surface-milled-shadow',
    padding: '--intent-density-padding',
    focusRing: '--intent-color-primary',
  },
};

export default Object.assign(Input, {
  TextArea,
  schema: InputSchema,
});
