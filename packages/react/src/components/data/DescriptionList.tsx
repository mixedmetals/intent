import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// DescriptionList Component
// ============================================================================

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Size of the list */
  size?: 'sm' | 'md' | 'lg';
  /** Number of columns for horizontal layout */
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ 
    orientation = 'vertical',
    size = 'md',
    columns = 1,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <dl
        ref={ref}
        className={clsx(
          'intent-description-list',
          className
        )}
        data-orientation={orientation}
        data-size={size}
        data-columns={columns}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </dl>
    );
  }
);
DescriptionList.displayName = 'DescriptionList';

// ============================================================================
// DescriptionTerm
// ============================================================================

export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const DescriptionTerm = React.forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={clsx(
          'intent-description-term',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </dt>
    );
  }
);
DescriptionTerm.displayName = 'DescriptionTerm';

// ============================================================================
// DescriptionDetail
// ============================================================================

export interface DescriptionDetailProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const DescriptionDetail = React.forwardRef<HTMLElement, DescriptionDetailProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={clsx(
          'intent-description-detail',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </dd>
    );
  }
);
DescriptionDetail.displayName = 'DescriptionDetail';

// ============================================================================
// DescriptionGroup - For grouping term/detail pairs
// ============================================================================

export interface DescriptionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DescriptionGroup = React.forwardRef<HTMLDivElement, DescriptionGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-description-group',
          className
        )}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DescriptionGroup.displayName = 'DescriptionGroup';
