import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// CardMedia - For images/videos in cards
// ============================================================================

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position of media in card */
  position?: 'top' | 'bottom' | 'background';
  /** Aspect ratio */
  ratio?: 'auto' | '16:9' | '4:3' | '1:1' | '21:9';
  /** Image/video source */
  src?: string;
  /** Alt text for images */
  alt?: string;
  /** Whether content is a video */
  isVideo?: boolean;
  children?: React.ReactNode;
}

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ 
    position = 'top',
    ratio = 'auto',
    src,
    alt,
    isVideo = false,
    className,
    children,
    ...props 
  }, ref) => {
    const content = isVideo ? (
      <video src={src} controls className="intent-card-media-element" />
    ) : src ? (
      <img src={src} alt={alt} className="intent-card-media-element" />
    ) : (
      children
    );
    
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-card-media',
          className
        )}
        data-position={position}
        data-ratio={ratio}
        {...styleAttr(props)}
        {...props}
      >
        {content}
      </div>
    );
  }
);
CardMedia.displayName = 'CardMedia';

// ============================================================================
// CardHeader
// ============================================================================

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Title element */
  title?: React.ReactNode;
  /** Subtitle/description */
  subtitle?: React.ReactNode;
  /** Action element (top right) */
  action?: React.ReactNode;
  /** Icon element */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ 
    align = 'left',
    title,
    subtitle,
    action,
    icon,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-card-header',
          className
        )}
        data-align={align}
        {...styleAttr(props)}
        {...props}
      >
        {icon && <div className="intent-card-header-icon">{icon}</div>}
        <div className="intent-card-header-content">
          {title && <div className="intent-card-header-title">{title}</div>}
          {subtitle && <div className="intent-card-header-subtitle">{subtitle}</div>}
          {children}
        </div>
        {action && <div className="intent-card-header-action">{action}</div>}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

// ============================================================================
// CardFooter
// ============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether to show top divider */
  divider?: boolean;
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ 
    align = 'left',
    divider = true,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-card-footer',
          className
        )}
        data-align={align}
        data-divider={divider}
        {...styleAttr(props)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

// ============================================================================
// CardBody
// ============================================================================

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-card-body',
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
CardBody.displayName = 'CardBody';

// ============================================================================
// HorizontalCard - Card with horizontal layout
// ============================================================================

export interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Media content (left side) */
  media?: React.ReactNode;
  /** Media width */
  mediaWidth?: string;
  /** Whether to stack on mobile */
  stack?: boolean;
  children: React.ReactNode;
}

export const HorizontalCard = React.forwardRef<HTMLDivElement, HorizontalCardProps>(
  ({ 
    media,
    mediaWidth = '200px',
    stack = true,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'intent-card-horizontal',
          className
        )}
        data-stack={stack}
        style={{ '--card-media-width': mediaWidth } as React.CSSProperties}
        {...styleAttr(props)}
        {...props}
      >
        {media && <div className="intent-card-horizontal-media">{media}</div>}
        <div className="intent-card-horizontal-content">{children}</div>
      </div>
    );
  }
);
HorizontalCard.displayName = 'HorizontalCard';
