/**
 * ============================================================================
 * Transition - Base Animation Primitive
 * ============================================================================
 * 
 * Orchestrates opacity, transform, and filter animations with Intent's
 * mechanical motion system. Respects prefers-reduced-motion automatically.
 * 
 * Schema Example (Badge value change):
 * ```
 * properties: {
 *   value: { type: 'number' },
 *   animation: { type: 'enum', values: ['mechanical', 'heavy', 'spring', 'none'], default: 'mechanical' }
 * },
 * responsive: {
 *   // When value changes, use spring animation
 *   animation: {
 *     'valueChanged': 'spring'
 *   }
 * }
 * 
 * // Usage:
 * <Transition
 *   in={value !== prevValue}
 *   animation="spring"
 *   properties={['scale', 'opacity']}
 * >
 *   <Badge>{value}</Badge>
 * </Transition>
 * ```
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDeviceCapabilities } from '../../hooks/useMediaQuery.js';

// ============================================================================
// Motion Token Registry
// ============================================================================

/**
 * Intent's mechanical motion timing functions.
 * These give components that "heavy click" Linear-esque feel.
 */
export const IntentEasing = {
  /** Standard smooth transition - use for most UI */
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  /** Mechanical - precise, industrial feel (default for tactility) */
  mechanical: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  /** Heavy - slower start, deliberate end (for large movements) */
  heavy: 'cubic-bezier(0.7, 0, 0.3, 1)',
  
  /** Spring - bouncy, energetic (for badges, notifications) */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  
  /** Bounce - playful overshoot */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  /** Linear - constant speed (for progress indicators) */
  linear: 'linear',
  
  /** Instant - no transition (for reduced motion) */
  instant: 'step-end',
} as const;

export type IntentEasingName = keyof typeof IntentEasing;

/**
 * Duration presets following a perceptual timing scale.
 */
export const IntentDuration = {
  /** Micro - for hover states, small feedback */
  micro: 75,
  
  /** Fast - for button presses, toggles */
  fast: 150,
  
  /** Normal - for most transitions (default) */
  normal: 200,
  
  /** Slow - for page transitions, modals */
  slow: 300,
  
  /** Deliberate - for emphasis, large movements */
  deliberate: 500,
} as const;

export type IntentDurationName = keyof typeof IntentDuration;

// ============================================================================
// Types
// ============================================================================

export type AnimatedProperty = 
  | 'opacity'
  | 'transform'
  | 'scale'
  | 'translateX'
  | 'translateY'
  | 'rotate'
  | 'filter'
  | 'backgroundColor'
  | 'borderColor'
  | 'boxShadow';

export interface TransitionConfig {
  /** Whether the element is visible/entered */
  in: boolean;
  
  /** Animation easing preset or custom bezier */
  animation?: IntentEasingName | string;
  
  /** Duration preset or custom ms */
  duration?: IntentDurationName | number;
  
  /** Delay before animation starts */
  delay?: number;
  
  /** Which properties to animate */
  properties?: AnimatedProperty[];
  
  /** Initial state (from) */
  from?: Partial<Record<AnimatedProperty, string | number>>;
  
  /** Enter state (to) */
  enter?: Partial<Record<AnimatedProperty, string | number>>;
  
  /** Exit state */
  exit?: Partial<Record<AnimatedProperty, string | number>>;
  
  /** Callback when enter completes */
  onEntered?: () => void;
  
  /** Callback when exit completes */
  onExited?: () => void;
  
  /** Children to animate */
  children: React.ReactNode;
  
  /** Additional className */
  className?: string;
  
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

// ============================================================================
// Helper Functions
// ============================================================================

function resolveEasing(animation: IntentEasingName | string | undefined): string {
  if (!animation) return IntentEasing.mechanical;
  return animation in IntentEasing 
    ? IntentEasing[animation as IntentEasingName] 
    : animation;
}

function resolveDuration(duration: IntentDurationName | number | undefined): number {
  if (duration === undefined) return IntentDuration.normal;
  if (typeof duration === 'number') return duration;
  return IntentDuration[duration] ?? IntentDuration.normal;
}

function buildTransitionString(
  properties: AnimatedProperty[],
  duration: number,
  easing: string,
  delay: number
): string {
  const validProperties = properties.map(p => {
    switch (p) {
      case 'scale':
      case 'translateX':
      case 'translateY':
      case 'rotate':
        return 'transform';
      default:
        return p;
    }
  });
  
  // Deduplicate
  const uniqueProps = [...new Set(validProperties)];
  
  return uniqueProps
    .map(prop => `${prop} ${duration}ms ${easing} ${delay}ms`)
    .join(', ');
}

// ============================================================================
// Transition Component
// ============================================================================

/**
 * Base animation primitive that orchestrates CSS transitions.
 * 
 * Automatically respects prefers-reduced-motion from the user's system.
 * 
 * @example
 * ```tsx
 * // Badge value change with spring animation
 * <Transition
 *   in={value !== prevValue}
 *   animation="spring"
 *   duration="fast"
 *   properties={['scale', 'opacity']}
 *   from={{ scale: 0.8, opacity: 0 }}
 *   enter={{ scale: 1, opacity: 1 }}
 * >
 *   <Badge>{value}</Badge>
 * </Transition>
 * ```
 */
export function Transition({
  in: isIn,
  animation = 'mechanical',
  duration = 'normal',
  delay = 0,
  properties = ['opacity'],
  from,
  enter,
  exit,
  onEntered,
  onExited,
  children,
  className = '',
  as: Component = 'div',
}: TransitionConfig): React.ReactElement {
  const { prefersReducedMotion } = useDeviceCapabilities();
  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
    isIn ? 'entered' : 'exited'
  );
  
  // Resolve animation values (respect reduced motion)
  const resolvedEasing = prefersReducedMotion 
    ? IntentEasing.instant 
    : resolveEasing(animation);
  const resolvedDuration = prefersReducedMotion ? 0 : resolveDuration(duration);
  const resolvedDelay = prefersReducedMotion ? 0 : delay;
  
  // Build styles based on state
  const getStyles = useCallback((): React.CSSProperties => {
    const baseTransition = buildTransitionString(
      properties,
      resolvedDuration,
      resolvedEasing,
      resolvedDelay
    );
    
    // Determine current values based on state
    let currentValues: Record<string, string> = {};
    
    switch (state) {
      case 'entering':
      case 'entered':
        currentValues = enter ? Object.entries(enter).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>) : { opacity: '1' };
        break;
      case 'exiting':
      case 'exited':
        currentValues = exit ? Object.entries(exit).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>) : { opacity: '0' };
        break;
    }
    
    // Apply from values if provided and entering
    if ((state === 'entering' || state === 'exited') && from) {
      const fromValues = Object.entries(from).reduce((acc, [key, value]) => {
        if (key === 'scale' || key === 'translateX' || key === 'translateY' || key === 'rotate') {
          acc.transform = acc.transform || '';
          const transformProp = key === 'scale' ? `scale(${value})` : 
                               key === 'translateX' ? `translateX(${value})` :
                               key === 'translateY' ? `translateY(${value})` :
                               `rotate(${value})`;
          acc.transform = acc.transform ? `${acc.transform} ${transformProp}` : transformProp;
        } else {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>);
      
      currentValues = { ...currentValues, ...fromValues };
    }
    
    return {
      transition: baseTransition,
      ...currentValues,
      willChange: properties.join(', '),
    };
  }, [state, properties, resolvedDuration, resolvedEasing, resolvedDelay, from, enter, exit]);
  
  // Handle state changes
  useEffect(() => {
    if (isIn && state !== 'entered' && state !== 'entering') {
      setState('entering');
      
      const timer = setTimeout(() => {
        setState('entered');
        onEntered?.();
      }, resolvedDuration + resolvedDelay);
      
      return () => clearTimeout(timer);
    }
    
    if (!isIn && state !== 'exited' && state !== 'exiting') {
      setState('exiting');
      
      const timer = setTimeout(() => {
        setState('exited');
        onExited?.();
      }, resolvedDuration + resolvedDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isIn, state, resolvedDuration, resolvedDelay, onEntered, onExited]);
  
  const Element = Component as React.ElementType;
  
  return (
    <Element
      ref={elementRef}
      className={className}
      style={getStyles()}
      data-transition-state={state}
    >
      {children}
    </Element>
  );
}

// ============================================================================
// Convenience Presets
// ============================================================================

export function Fade(props: Omit<TransitionConfig, 'properties'>): React.ReactElement {
  return <Transition {...props} properties={['opacity']} />;
}

export function FadeUp(props: Omit<TransitionConfig, 'properties' | 'from' | 'enter' | 'exit'>): React.ReactElement {
  return (
    <Transition 
      {...props} 
      properties={['opacity', 'transform']}
      from={{ opacity: 0, translateY: '8px' }}
      enter={{ opacity: 1, translateY: '0' }}
      exit={{ opacity: 0, translateY: '-8px' }}
    />
  );
}

export function FadeDown(props: Omit<TransitionConfig, 'properties' | 'from' | 'enter' | 'exit'>): React.ReactElement {
  return (
    <Transition 
      {...props} 
      properties={['opacity', 'transform']}
      from={{ opacity: 0, translateY: '-8px' }}
      enter={{ opacity: 1, translateY: '0' }}
      exit={{ opacity: 0, translateY: '8px' }}
    />
  );
}

export function Scale(props: Omit<TransitionConfig, 'properties' | 'from' | 'enter' | 'exit'>): React.ReactElement {
  return (
    <Transition 
      {...props} 
      properties={['opacity', 'transform']}
      from={{ opacity: 0, scale: 0.95 }}
      enter={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  );
}

export function ScaleSpring(props: Omit<TransitionConfig, 'properties' | 'from' | 'enter' | 'exit' | 'animation'>): React.ReactElement {
  return (
    <Transition 
      {...props} 
      animation="spring"
      properties={['opacity', 'transform']}
      from={{ opacity: 0, scale: 0.5 }}
      enter={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    />
  );
}

export function Slide(props: Omit<TransitionConfig, 'properties'> & { direction?: 'left' | 'right' | 'up' | 'down' }): React.ReactElement {
  const { direction = 'right', ...rest } = props;
  
  const transforms = {
    left: { from: '-100%', enter: '0', exit: '100%' },
    right: { from: '100%', enter: '0', exit: '-100%' },
    up: { from: '100%', enter: '0', exit: '-100%' },
    down: { from: '-100%', enter: '0', exit: '100%' },
  };
  
  const axis = direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
  const t = transforms[direction];
  
  return (
    <Transition 
      {...rest} 
      properties={['transform']}
      from={{ [axis]: t.from }}
      enter={{ [axis]: t.enter }}
      exit={{ [axis]: t.exit }}
    />
  );
}

// ============================================================================
// Export
// ============================================================================

export default Transition;
