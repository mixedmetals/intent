/**
 * ============================================================================
 * Card Component - Elevated Archetype Implementation
 * ============================================================================
 * 
 * Container component using the elevated surface archetype.
 * Supports density-aware responsive sizing via CSS custom properties.
 * 
 * @example
 * ```tsx
 * <Card elevation="high" interactive>
 *   <CardHeader title="Title" />
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

import React, { forwardRef, createContext, useContext } from 'react';
import { cx, intentVariants } from '../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export type CardElevation = 'none' | 'low' | 'medium' | 'high';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shadow elevation level - affects ambient shadow tokens */
  elevation?: CardElevation;
  
  /** Enables hover/active interaction states */
  interactive?: boolean;
  
  /** Padding density - overrides CSS density */
  padding?: 'none' | 'compact' | 'normal' | 'relaxed';
}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Title text - uses text tokens */
  title?: React.ReactNode;
  
  /** Subtitle text - uses muted text tokens */
  subtitle?: React.ReactNode;
  
  /** Action element rendered on the right */
  action?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Removes default padding */
  flush?: boolean;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of footer content */
  align?: 'start' | 'center' | 'end';
}

// ============================================================================
// Context for density inheritance
// ============================================================================

interface CardContextValue {
  density: 'compact' | 'normal' | 'relaxed';
}

const CardContext = createContext<CardContextValue>({ density: 'normal' });

// ============================================================================
// Variant Generation
// ============================================================================

const cardVariants = intentVariants(
  'intent-card',
  {
    elevation: {
      none: 'intent-card--elevation-none',
      low: 'intent-card--elevation-low',
      medium: 'intent-card--elevation-medium',
      high: 'intent-card--elevation-high',
    },
    interactive: {
      true: 'intent-card--interactive',
      false: '',
    },
    padding: {
      none: 'intent-card--padding-none',
      compact: 'intent-card--padding-compact',
      normal: 'intent-card--padding-normal',
      relaxed: 'intent-card--padding-relaxed',
    },
  }
);

// ============================================================================
// Components
// ============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      elevation = 'medium',
      interactive = false,
      padding = 'normal',
      children,
      className,
      ...props
    },
    ref
  ) {
    const classes = cx(
      cardVariants({ 
        elevation, 
        interactive: interactive ? 'true' : 'false', 
        padding 
      }),
      className
    );

    return (
      <CardContext.Provider value={{ density: padding === 'none' ? 'normal' : padding }}>
        <div
          ref={ref}
          className={classes}
          data-intent-component="card"
          data-intent-elevation={elevation}
          data-intent-archetype="elevated"
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ title, subtitle, action, children, className, ...props }, ref) {
    const { density } = useContext(CardContext);
    
    return (
      <div
        ref={ref}
        className={cx('intent-card__header', className)}
        data-intent-density={density}
        {...props}
      >
        <div className="intent-card__header-content">
          {title && (
            <h3 className="intent-card__title">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="intent-card__subtitle">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="intent-card__header-action">
            {action}
          </div>
        )}
      </div>
    );
  }
);

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ flush = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('intent-card__content', flush && 'intent-card__content--flush', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ align = 'end', children, className, ...props }, ref) {
    const { density } = useContext(CardContext);
    
    return (
      <div
        ref={ref}
        className={cx('intent-card__footer', `intent-card__footer--align-${align}`, className)}
        data-intent-density={density}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// ============================================================================
// Schema Definition
// ============================================================================

export const CardSchema = {
  name: 'Card',
  archetype: 'elevated',
  description: 'Container component using elevated surface archetype with backdrop blur',
  properties: {
    elevation: {
      type: 'enum',
      values: ['none', 'low', 'medium', 'high'],
      default: 'medium',
      description: 'Shadow elevation level - maps to ambient shadow tokens',
    },
    interactive: {
      type: 'boolean',
      default: false,
      description: 'Enables hover lift and active press states',
    },
    padding: {
      type: 'enum',
      values: ['none', 'compact', 'normal', 'relaxed'],
      default: 'normal',
      description: 'Internal spacing - references density tokens',
    },
  },
  constraints: [
    {
      when: { elevation: 'none', interactive: true },
      message: 'Interactive cards should have elevation for affordance',
    },
  ],
  tokens: {
    background: '--intent-surface-elevated-bg',
    border: '--intent-surface-elevated-border',
    shadow: '--intent-surface-elevated-shadow',
    backdrop: '--intent-surface-elevated-backdrop',
    padding: '--intent-density-padding',
  },
  subComponents: ['CardHeader', 'CardContent', 'CardFooter'],
};

export default Object.assign(Card, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  schema: CardSchema,
});
