import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Stat Component
// ============================================================================

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the stat display */
  size?: 'sm' | 'md' | 'lg';
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Whether to show border */
  bordered?: boolean;
  children: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ 
    size = 'md',
    orientation = 'vertical',
    bordered = false,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-stat',
          className
        )}
        data-size={size}
        data-orientation={orientation}
        data-bordered={bordered}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Stat.displayName = 'Stat';

// ============================================================================
// StatLabel
// ============================================================================

export interface StatLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const StatLabel = React.forwardRef<HTMLDivElement, StatLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-stat-label',
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
StatLabel.displayName = 'StatLabel';

// ============================================================================
// StatValue
// ============================================================================

export interface StatValueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trend direction for styling */
  trend?: 'neutral' | 'up' | 'down';
  children: React.ReactNode;
}

export const StatValue = React.forwardRef<HTMLDivElement, StatValueProps>(
  ({ trend = 'neutral', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-stat-value',
          className
        )}
        data-trend={trend}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StatValue.displayName = 'StatValue';

// ============================================================================
// StatHelpText
// ============================================================================

export interface StatHelpTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const StatHelpText = React.forwardRef<HTMLDivElement, StatHelpTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-stat-help-text',
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
StatHelpText.displayName = 'StatHelpText';

// ============================================================================
// StatGroup - For grouping multiple stats
// ============================================================================

export interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider between stats */
  divided?: boolean;
  children: React.ReactNode;
}

export const StatGroup = React.forwardRef<HTMLDivElement, StatGroupProps>(
  ({ divided = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-stat-group',
          className
        )}
        data-divided={divided}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StatGroup.displayName = 'StatGroup';
