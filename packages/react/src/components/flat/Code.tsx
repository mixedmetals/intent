import React, { forwardRef } from 'react';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean;
}

export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code({ block, children, ...props }, ref) {
    const Component = block ? 'pre' : 'code';
    return <Component ref={ref as any} className="intent-code" {...props}>{children}</Component>;
  }
);

export const CodeBlock = forwardRef<HTMLPreElement, React.HTMLAttributes<HTMLPreElement>>(
  function CodeBlock(props, ref) {
    return <Code ref={ref as any} block {...props} />;
  }
);

export default Object.assign(Code, { Block: CodeBlock });
