import React, { forwardRef } from 'react';

export const Blockquote = forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  function Blockquote(props, ref) {
    return <blockquote ref={ref} className="intent-blockquote" {...props} />;
  }
);

export default Blockquote;
