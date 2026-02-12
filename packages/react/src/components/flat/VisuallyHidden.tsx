import React, { forwardRef } from 'react';

export const VisuallyHidden = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function VisuallyHidden(props, ref) {
    return <span ref={ref} className="intent-sr-only" {...props} />;
  }
);

export default VisuallyHidden;
