import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Breadcrumbs Component
// ============================================================================

export interface BreadcrumbsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** Separator style between items */
  separator?: 'chevron' | 'slash' | 'arrow' | 'dot';
  /** Size of the breadcrumbs */
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  ({ 
    separator = 'chevron', 
    size = 'md',
    className,
    children,
    ...props 
  }, ref) => {
    const clonedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === BreadcrumbItem) {
        const isLast = index === React.Children.count(children) - 1;
        return React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {
          separator,
          isLast,
        });
      }
      return child;
    });
    
    return (
      <nav aria-label="Breadcrumb">
        <ol
          ref={ref}
          className={clsx(
            'intent-breadcrumbs',
            className
          )}
          data-separator={separator}
          data-size={size}
          {...styleAttr(props)}
          {...props}
        >
          {clonedChildren}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

// ============================================================================
// BreadcrumbItem Component
// ============================================================================

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Whether this is the current/active page */
  current?: boolean;
  /** Link href (if not current) */
  href?: string;
  /** Separator style (passed from Breadcrumbs) */
  separator?: BreadcrumbsProps['separator'];
  /** Whether this is the last item (passed from Breadcrumbs) */
  isLast?: boolean;
  children: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ 
    current = false,
    href,
    separator,
    isLast,
    className,
    children,
    ...props 
  }, ref) => {
    const renderSeparator = () => {
      if (isLast) return null;
      
      switch (separator) {
        case 'slash':
          return <span className="intent-breadcrumb-separator" aria-hidden="true">/</span>;
        case 'arrow':
          return <span className="intent-breadcrumb-separator" aria-hidden="true">→</span>;
        case 'dot':
          return <span className="intent-breadcrumb-separator" aria-hidden="true">•</span>;
        case 'chevron':
        default:
          return <span className="intent-breadcrumb-separator" aria-hidden="true">›</span>;
      }
    };
    
    return (
      <li
        ref={ref}
        className={clsx(
          'intent-breadcrumb-item',
          className
        )}
        data-current={current}
        {...styleAttr(props)}
        {...props}
      >
        {current ? (
          <span aria-current="page" className="intent-breadcrumb-link">
            {children}
          </span>
        ) : (
          <a href={href} className="intent-breadcrumb-link">
            {children}
          </a>
        )}
        {renderSeparator()}
      </li>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';
