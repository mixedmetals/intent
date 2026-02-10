/**
 * Input Component
 * 
 * Form control for accepting user text input.
 * Replaces: border-*, bg-*, px-*, py-*, rounded-*, focus:*
 */

import React, { forwardRef } from 'react';
import type { InputProps } from '../types.js';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    size = 'md',
    state = 'default',
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled,
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-size': size,
      'data-state': state,
    };
    
    const baseClass = 'intent-input';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return (
      <input 
        ref={ref}
        type={type}
        className={finalClassName}
        style={style}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        disabled={disabled}
        {...dataAttrs}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
