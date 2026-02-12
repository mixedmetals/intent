import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Link Component
// ============================================================================

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual style variant */
  variant?: 'default' | 'subtle' | 'underline' | 'button';
  /** Color scheme */
  color?: 'default' | 'primary' | 'neutral' | 'danger';
  /** Size of the link */
  size?: 'sm' | 'md' | 'lg';
  /** Whether this is an external link */
  external?: boolean;
  /** Whether the link is disabled */
  disabled?: boolean;
  children: React.ReactNode;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    variant = 'default',
    color = 'default',
    size = 'md',
    external = false,
    disabled = false,
    className,
    children,
    ...props 
  }, ref) => {
    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer',
    } : {};
    
    return (
      <a
        ref={ref}
        className={clsx(
          'intent-link',
          className
        )}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-external={external}
        data-disabled={disabled}
        aria-disabled={disabled}
        {...externalProps}
        {...styleAttr(props)}
        {...props}
      >
        {children}
        {external && (
          <span className="intent-link-external-icon" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);
Link.displayName = 'Link';
