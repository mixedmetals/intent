import React, { forwardRef } from 'react';
import { cx } from '../../utils/cx.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ variant = 'default', className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cx('intent-badge', `intent-badge--${variant}`, className)}
        data-intent-component="badge"
        data-intent-archetype="flat"
        {...props}
      >
        {children}
      </span>
    );
  }
);

export default Badge;
