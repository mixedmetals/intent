import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Timeline Component
// ============================================================================

export interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Size of timeline elements */
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ 
    orientation = 'vertical',
    size = 'md',
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <ol
        ref={ref}
        className={clsx(
          'intent-timeline',
          className
        )}
        data-orientation={orientation}
        data-size={size}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </ol>
    );
  }
);
Timeline.displayName = 'Timeline';

// ============================================================================
// TimelineItem
// ============================================================================

export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /** Status of the timeline item */
  status?: 'completed' | 'current' | 'pending';
  /** Icon element (replaces default dot) */
  icon?: React.ReactNode;
  /** Title/content */
  title?: React.ReactNode;
  /** Description/subtitle */
  description?: React.ReactNode;
  /** Timestamp */
  timestamp?: React.ReactNode;
  children?: React.ReactNode;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ 
    status = 'pending',
    icon,
    title,
    description,
    timestamp,
    className,
    children,
    ...props 
  }, ref) => {
    const renderDot = () => {
      if (icon) {
        return <span className="intent-timeline-icon">{icon}</span>;
      }
      
      switch (status) {
        case 'completed':
          return (
            <svg viewBox="0 0 20 20" fill="currentColor" className="intent-timeline-icon">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          );
        case 'current':
          return <span className="intent-timeline-dot intent-timeline-dot-current" />;
        case 'pending':
        default:
          return <span className="intent-timeline-dot" />;
      }
    };
    
    return (
      <li
        ref={ref}
        className={clsx(
          'intent-timeline-item',
          className
        )}
        data-status={status}
        {...styleAttr(props)}
        {...props}
      >
        <div className="intent-timeline-marker">
          {renderDot()}
          <div className="intent-timeline-line" aria-hidden="true" />
        </div>
        <div className="intent-timeline-content">
          {timestamp && <div className="intent-timeline-timestamp">{timestamp}</div>}
          {title && <div className="intent-timeline-title">{title}</div>}
          {description && <div className="intent-timeline-description">{description}</div>}
          {children}
        </div>
      </li>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';
