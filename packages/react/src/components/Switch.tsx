/**
 * ============================================================================
 * Switch Component - Milled Archetype Implementation
 * ============================================================================
 * 
 * Toggle switch using the milled surface archetype.
 * Specialized track/thumb structure with spring physics animation.
 * 
 * @example
 * ```tsx
 * <Switch 
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */

import React, { forwardRef, useId } from 'react';
import { cx } from '../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text rendered next to switch */
  label?: React.ReactNode;
  
  /** Position of label relative to switch */
  labelPosition?: 'left' | 'right';
  
  /** Size scale - affects track and thumb dimensions */
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// Component
// ============================================================================

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      label,
      labelPosition = 'right',
      size = 'md',
      checked,
      defaultChecked,
      onChange,
      disabled,
      className,
      id: idProp,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : defaultChecked;

    return (
      <label
        className={cx(
          'intent-switch',
          `intent-switch--size-${size}`,
          disabled && 'intent-switch--disabled',
          className
        )}
        data-intent-component="switch"
        data-intent-size={size}
        data-intent-archetype="milled"
        data-state={isChecked ? 'checked' : 'unchecked'}
      >
        {label && labelPosition === 'left' && (
          <span className="intent-switch__label intent-switch__label--left">
            {label}
          </span>
        )}
        
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className="intent-switch__input intent-sr-only"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        
        <span
          className={cx(
            'intent-switch__track',
            isChecked && 'intent-switch__track--checked'
          )}
          aria-hidden="true"
        >
          <span className="intent-switch__thumb" />
        </span>
        
        {label && labelPosition === 'right' && (
          <span className="intent-switch__label intent-switch__label--right">
            {label}
          </span>
        )}
      </label>
    );
  }
);

// ============================================================================
// Schema Definition
// ============================================================================

export const SwitchSchema = {
  name: 'Switch',
  archetype: 'milled',
  description: 'Toggle switch using milled archetype with spring physics thumb',
  properties: {
    label: {
      type: 'string',
      description: 'Text label rendered next to switch',
    },
    labelPosition: {
      type: 'enum',
      values: ['left', 'right'],
      default: 'right',
      description: 'Position of label relative to switch track',
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md',
      description: 'Size scale - multiplies track and thumb dimensions',
    },
  },
  constraints: [
    {
      when: { disabled: true },
      forbid: ['labelPosition'],
      message: 'Disabled switch styling is consistent regardless of label position',
    },
  ],
  tokens: {
    trackBackground: '--intent-surface-milled-bg',
    trackBorder: '--intent-surface-milled-border',
    trackShadow: '--intent-surface-milled-shadow',
    checkedBackground: '--intent-color-primary',
    thumbBackground: '--intent-color-neutral-0',
    thumbShadow: '0 2px 4px 0 oklch(0% 0 0 / 0.2)',
    transition: '--intent-easing-spring',
  },
};

export default Object.assign(Switch, {
  schema: SwitchSchema,
});
