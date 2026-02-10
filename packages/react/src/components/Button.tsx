/**
 * Button Component
 * 
 * An interactive element that triggers an action.
 * Replaces: bg-*, text-*, px-*, py-*, rounded-*, hover:*, disabled:*
 */

import React, { forwardRef } from 'react';
import type { ButtonProps } from '../types.js';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    importance = 'primary',
    size = 'md',
    state = 'default',
    type = 'button',
    onClick,
    disabled,
    className,
    style,
    ...rest 
  }, ref) => {
    const dataAttrs = {
      'data-importance': importance,
      'data-size': size,
      'data-state': disabled ? 'disabled' : state,
    };
    
    const baseClass = 'intent-button';
    const finalClassName = className ? `${baseClass} ${className}` : baseClass;
    
    return (
      <button 
        ref={ref}
        type={type}
        className={finalClassName}
        style={style}
        onClick={onClick}
        disabled={disabled || state === 'disabled'}
        {...dataAttrs}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
