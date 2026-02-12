import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Navbar Component
// ============================================================================

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Positioning behavior */
  position?: 'static' | 'sticky' | 'fixed';
  /** Height of the navbar */
  height?: 'sm' | 'md' | 'lg';
  /** Logo or brand element */
  brand?: React.ReactNode;
  /** Left side content */
  left?: React.ReactNode;
  /** Right side content */
  right?: React.ReactNode;
  /** Whether to add a shadow */
  shadow?: boolean;
  children?: React.ReactNode;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ 
    position = 'static',
    height = 'md',
    brand,
    left,
    right,
    shadow = true,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(
          'intent-navbar',
          className
        )}
        data-position={position}
        data-height={height}
        data-shadow={shadow}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-navbar-container">
          {brand && (
            <div className="intent-navbar-brand">
              {brand}
            </div>
          )}
          
          {left && (
            <div className="intent-navbar-left">
              {left}
            </div>
          )}
          
          {children}
          
          {right && (
            <div className="intent-navbar-right">
              {right}
            </div>
          )}
        </div>
      </header>
    );
  }
);
Navbar.displayName = 'Navbar';

// ============================================================================
// NavbarItem Component
// ============================================================================

export interface NavbarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this item is active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Link href (optional) */
  href?: string;
  children?: React.ReactNode;
}

export const NavbarItem = React.forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ 
    active = false,
    disabled = false,
    icon,
    href,
    className,
    children,
    onClick,
    ...props 
  }, ref) => {
    const content = (
      <>
        {icon && <span className="intent-navbar-item-icon">{icon}</span>}
        {children && <span className="intent-navbar-item-text">{children}</span>}
      </>
    );
    
    const commonProps = {
      className: clsx('intent-navbar-item', className),
      'data-active': active,
      'data-disabled': disabled,
      ...styleAttr(props),
    };
    
    if (href) {
      return (
        <a href={href} {...commonProps} aria-current={active ? 'page' : undefined}>
          {content}
        </a>
      );
    }
    
    return (
      <button
        ref={ref}
        {...commonProps}
        disabled={disabled}
        aria-current={active ? 'true' : undefined}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);
NavbarItem.displayName = 'NavbarItem';
