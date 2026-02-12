import React, { forwardRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ indeterminate, ...props }, ref) {
    return (
      <input
        type="checkbox"
        ref={ref}
        className="intent-checkbox"
        data-indeterminate={indeterminate}
        {...props}
      />
    );
  }
);

export default Checkbox;
