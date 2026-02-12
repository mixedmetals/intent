import React, { forwardRef } from 'react';
import { cx } from '../../utils/cx.js';

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  function Separator({ orientation = 'horizontal', className, ...props }, ref) {
    return (
      <hr
        ref={ref}
        className={cx('intent-separator', `intent-separator--${orientation}`, className)}
        data-intent-component="separator"
        data-intent-archetype="flat"
        {...props}
      />
    );
  }
);

export default Separator;
