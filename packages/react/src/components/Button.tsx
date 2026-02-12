/**
 * ============================================================================
 * Button Component - Milled Archetype Implementation
 * ============================================================================
 * 
 * Uses the Subtle Tactility design system with mathematical token precision.
 * All values reference tokens - no hard-coded hex values allowed.
 * 
 * @example
 * ```tsx
 * <Button importance="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

import React, { forwardRef } from 'react';
import { cx, intentVariants } from '../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export type ButtonImportance = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual importance level - affects background token selection */
  importance?: ButtonImportance;
  
  /** Size scale - multiplies density tokens */
  size?: ButtonSize;
  
  /** Whether the button takes full width of container */
  fullWidth?: boolean;
  
  /** Loading state - applies shimmer and disables interaction */
  loading?: boolean;
  
  /** Icon element to render before text */
  leftIcon?: React.ReactNode;
  
  /** Icon element to render after text */
  rightIcon?: React.ReactNode;
}

// ============================================================================
// Schema-Compliant Variant Generation
// ============================================================================

/**
 * Button variants using intentVariants factory.
 * All styles use CSS custom properties (tokens) for dynamic density support.
 */
const buttonVariants = intentVariants(
  'intent-button',
  {
    importance: {
      primary: 'intent-button--primary',
      secondary: 'intent-button--secondary',
      ghost: 'intent-button--ghost',
      danger: 'intent-button--danger',
    },
    size: {
      sm: 'intent-button--sm',
      md: 'intent-button--md',
      lg: 'intent-button--lg',
    },
    fullWidth: {
      true: 'intent-button--full-width',
      false: '',
    },
    loading: {
      true: 'intent-button--loading',
      false: '',
    },
  }
);

// ============================================================================
// Component
// ============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      importance = 'secondary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className,
      ...props
    },
    ref
  ) {
    // Merge variant classes with any additional classes
    const classes = cx(
      buttonVariants({ 
        importance, 
        size, 
        fullWidth: fullWidth ? 'true' : 'false', 
        loading: loading ? 'true' : 'false' 
      }),
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        data-intent-component="button"
        data-intent-importance={importance}
        data-intent-size={size}
        {...props}
      >
        {loading && (
          <span className="intent-button__spinner" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" className="intent-button__spinner-svg">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="24"
                strokeDashoffset="8"
              />
            </svg>
          </span>
        )}
        {!loading && leftIcon && (
          <span className="intent-button__icon intent-button__icon--left">
            {leftIcon}
          </span>
        )}
        <span className="intent-button__text">{children}</span>
        {!loading && rightIcon && (
          <span className="intent-button__icon intent-button__icon--right">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

// ============================================================================
// Schema Definition (for LLM consumption)
// ============================================================================

export const ButtonSchema = {
  name: 'Button',
  archetype: 'milled',
  description: 'Interactive button component using the milled surface archetype',
  properties: {
    importance: {
      type: 'enum',
      values: ['primary', 'secondary', 'ghost', 'danger'],
      default: 'secondary',
      description: 'Visual weight - affects background token selection',
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      description: 'Size scale - multiplies density tokens',
    },
    fullWidth: {
      type: 'boolean',
      default: false,
      description: 'Whether button expands to fill container',
    },
    loading: {
      type: 'boolean',
      default: false,
      description: 'Shows spinner and disables interaction',
    },
  },
  constraints: [
    {
      when: { importance: 'ghost', loading: true },
      message: 'Ghost buttons should not show loading state (low visibility)',
    },
  ],
  tokens: {
    background: '--intent-surface-milled-bg',
    border: '--intent-surface-milled-border',
    shadow: '--intent-surface-milled-shadow',
    padding: '--intent-density-padding',
  },
};

export default Button;
