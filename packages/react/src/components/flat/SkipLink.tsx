import React, { forwardRef } from 'react';

export const SkipLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function SkipLink(props, ref) {
    return <a ref={ref} className="intent-skip-link" {...props} />;
  }
);

export default SkipLink;
