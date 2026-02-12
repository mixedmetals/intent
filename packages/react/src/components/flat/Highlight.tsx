import React, { forwardRef } from 'react';

export const Mark = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  function Mark(props, ref) {
    return <mark ref={ref} className="intent-mark" {...props} />;
  }
);

export const Highlight = Mark;

export default Object.assign(Highlight, { Mark });
