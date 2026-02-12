import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Sidebar Component
// ============================================================================

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;
  /** Width variant when expanded */
  width?: 'sm' | 'md' | 'lg';
  /** Header content (logo, etc.) */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Collapse toggle button */
  collapseToggle?: React.ReactNode;
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ 
    collapsed = false,
    width = 'md',
    header,
    footer,
    collapseToggle,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <aside
        ref={ref}
        className={clsx(
          'intent-sidebar',
          className
        )}
        data-collapsed={collapsed}
        data-width={width}
        {...styleAttr(props)}
        {...props}
      >
        {header && (
          <div className="intent-sidebar-header">
            {header}
          </div>
        )}
        
        <nav className="intent-sidebar-nav" aria-label="Sidebar">
          {children}
        </nav>
        
        {(footer || collapseToggle) && (
          <div className="intent-sidebar-footer">
            {footer}
            {collapseToggle}
          </div>
        )}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

// ============================================================================
// SidebarSection Component
// ============================================================================

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  children: React.ReactNode;
}

export const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-sidebar-section',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {title && <div className="intent-sidebar-section-title">{title}</div>}
        <div className="intent-sidebar-section-content">
          {children}
        </div>
      </div>
    );
  }
);
SidebarSection.displayName = 'SidebarSection';

// ============================================================================
// SidebarItem Component
// ============================================================================

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this item is active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Link href (optional) */
  href?: string;
  /** Whether to show tooltip when collapsed */
  tooltip?: string;
  children: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ 
    active = false,
    disabled = false,
    icon,
    href,
    tooltip,
    className,
    children,
    onClick,
    ...props 
  }, ref) => {
    const content = (
      <>
        {icon && <span className="intent-sidebar-item-icon">{icon}</span>}
        <span className="intent-sidebar-item-text">{children}</span>
      </>
    );
    
    const buttonProps = {
      ref: ref as React.Ref<HTMLButtonElement>,
      className: clsx('intent-sidebar-item', className),
      'data-active': active,
      'data-disabled': disabled,
      title: tooltip,
      disabled,
      onClick,
      ...styleAttr(props),
      ...props,
    };
    
    if (href) {
      return (
        <a href={href} className={buttonProps.className} data-active={active} data-disabled={disabled} title={tooltip}>
          {content}
        </a>
      );
    }
    
    return (
      <button {...buttonProps}>
        {content}
      </button>
    );
  }
);
SidebarItem.displayName = 'SidebarItem';
