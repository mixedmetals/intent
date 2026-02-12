import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Steps Component
// ============================================================================

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of steps */
  orientation?: 'horizontal' | 'vertical';
  /** Size of step indicators */
  size?: 'sm' | 'md' | 'lg';
  /** Current active step (0-indexed) */
  current?: number;
  children: React.ReactNode;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ 
    orientation = 'horizontal',
    size = 'md',
    current = 0,
    className,
    children,
    ...props 
  }, ref) => {
    const clonedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === Step) {
        let status: 'complete' | 'current' | 'upcoming';
        if (index < current) {
          status = 'complete';
        } else if (index === current) {
          status = 'current';
        } else {
          status = 'upcoming';
        }
        
        return React.cloneElement(child as React.ReactElement<StepProps>, {
          status,
          stepNumber: index + 1,
          size,
          isLast: index === React.Children.count(children) - 1,
        });
      }
      return child;
    });
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-steps',
          className
        )}
        data-orientation={orientation}
        data-size={size}
        {...styleAttr(props)}
        {...props}
      >
        {clonedChildren}
      </div>
    );
  }
);
Steps.displayName = 'Steps';

// ============================================================================
// Step Component
// ============================================================================

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Status of the step */
  status?: 'complete' | 'current' | 'upcoming';
  /** Step number (passed from Steps) */
  stepNumber?: number;
  /** Size (passed from Steps) */
  size?: 'sm' | 'md' | 'lg';
  /** Whether this is the last step (passed from Steps) */
  isLast?: boolean;
  /** Step title */
  title?: string;
  /** Step description */
  description?: string;
  children?: React.ReactNode;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ 
    status = 'upcoming',
    stepNumber,
    size,
    isLast,
    title,
    description,
    className,
    children,
    ...props 
  }, ref) => {
    const renderIcon = () => {
      if (status === 'complete') {
        return (
          <svg viewBox="0 0 20 20" fill="currentColor" className="intent-step-icon">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      }
      return <span className="intent-step-number">{stepNumber}</span>;
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-step',
          className
        )}
        data-status={status}
        data-size={size}
        data-last={isLast}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-step-indicator">
          {renderIcon()}
        </div>
        {!isLast && <div className="intent-step-connector" aria-hidden="true" />}
        <div className="intent-step-content">
          {title && <div className="intent-step-title">{title}</div>}
          {description && <div className="intent-step-description">{description}</div>}
          {children}
        </div>
      </div>
    );
  }
);
Step.displayName = 'Step';
