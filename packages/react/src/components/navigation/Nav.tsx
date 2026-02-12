import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Nav Component
// ============================================================================

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  /** Orientation of navigation */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing between nav items */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** ARIA label for the navigation */
  'aria-label'?: string;
  children: React.ReactNode;
}

export const Nav = React.forwardRef<HTMLElement, NavProps>(
  ({ 
    orientation = 'vertical',
    spacing = 'sm',
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(
          'intent-nav',
          className
        )}
        data-orientation={orientation}
        data-spacing={spacing}
        {...styleAttr(props)}
        {...props}
      >
        <ul className="intent-nav-list">
          {children}
        </ul>
      </nav>
    );
  }
);
Nav.displayName = 'Nav';

// ============================================================================
// NavItem Component
// ============================================================================

export interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Link href */
  href?: string;
  /** Icon element */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ 
    active = false,
    disabled = false,
    href,
    icon,
    className,
    children,
    ...props 
  }, ref) => {
    const content = (
      <>
        {icon && <span className="intent-nav-item-icon">{icon}</span>}
        <span className="intent-nav-item-text">{children}</span>
      </>
    );
    
    return (
      <li
        ref={ref}
        className={clsx(
          'intent-nav-item',
          className
        )}
        data-active={active}
        data-disabled={disabled}
        {...styleAttr(props)}
        {...props}
      >
        {href ? (
          <a href={href} className="intent-nav-item-link" aria-current={active ? 'page' : undefined}>
            {content}
          </a>
        ) : (
          <span className="intent-nav-item-link" aria-current={active ? 'true' : undefined}>
            {content}
          </span>
        )}
      </li>
    );
  }
);
NavItem.displayName = 'NavItem';
