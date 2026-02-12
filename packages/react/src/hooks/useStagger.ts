/**
 * ============================================================================
 * useStagger Hook
 * ============================================================================
 * 
 * Orchestrates staggered animations for Bento grids and list items.
 * 
 * Philosophy:
 * - Bento grids need coordinated, staggered entrance animations
 * - The hook handles timing calculation, intersection observer triggering,
 *   and reduced-motion preferences automatically.
 * 
 * Schema Example:
 * ```
 * // Hook used in BentoGrid component
 * const { getItemProps, isAnimating } = useStagger({
 *   count: items.length,
 *   staggerDelay: 50,
 *   duration: 400,
 * });
 * 
 * return (
 *   <div className="bento-grid">
 *     {items.map((item, i) => (
 *       <div key={i} {...getItemProps(i)}>
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDeviceCapabilities } from './useMediaQuery';

// ============================================================================
// Types
// ============================================================================

export interface StaggerOptions {
  /** Total number of items to animate */
  count: number;
  
  /** Delay between each item in ms (default: 50) */
  staggerDelay?: number;
  
  /** Base delay before animation starts (default: 0) */
  baseDelay?: number;
  
  /** Animation duration in ms (default: 400) */
  duration?: number;
  
  /** Easing function (default: 'ease-out') */
  easing?: 'ease' | 'ease-out' | 'ease-in' | 'linear' | 'spring';
  
  /** 
   * Trigger mode:
   * - 'immediate': Start immediately when mounted
   * - 'inView': Start when container enters viewport
   * - 'manual': Call start() manually
   * (default: 'inView')
   */
  trigger?: 'immediate' | 'inView' | 'manual';
  
  /** Intersection observer threshold (default: 0.1) */
  inViewThreshold?: number;
  
  /** Root margin for intersection observer (default: '0px') */
  inViewMargin?: string;
  
  /** Direction of stagger effect (default: 'normal') */
  direction?: 'normal' | 'reverse' | 'random';
  
  /** Once triggered, don't re-animate (default: true) */
  once?: boolean;
  
  /** Custom order for stagger (overrides direction) */
  customOrder?: number[];
}

export interface StaggerItemProps {
  'data-intent-stagger': string;
  'data-intent-stagger-index': number;
  style: React.CSSProperties;
}

export interface StaggerState {
  /** Whether any animation is currently running */
  isAnimating: boolean;
  
  /** Whether the animation has completed */
  isComplete: boolean;
  
  /** Whether the animation has been triggered */
  isTriggered: boolean;
  
  /** Progress from 0 to 1 */
  progress: number;
  
  /** Get props for a stagger item by index */
  getItemProps: (index: number) => StaggerItemProps;
  
  /** Get props for the container */
  containerProps: {
    ref: React.RefObject<HTMLDivElement>;
    'data-intent-stagger-container': string;
  };
  
  /** Manually start the animation (for trigger: 'manual') */
  start: () => void;
  
  /** Reset animation state */
  reset: () => void;
}

// ============================================================================
// Spring Animation Physics
// ============================================================================

const SPRING_CONFIG = {
  stiffness: 100,
  damping: 10,
  mass: 1,
};

/**
 * Simple spring easing function.
 * Approximates spring physics with bezier for CSS compatibility.
 */
function getEasingValue(easing: StaggerOptions['easing']): string {
  switch (easing) {
    case 'ease':
      return 'ease';
    case 'ease-in':
      return 'ease-in';
    case 'ease-out':
      return 'ease-out';
    case 'linear':
      return 'linear';
    case 'spring':
      // Approximate spring with cubic-bezier
      return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    default:
      return 'ease-out';
  }
}

// ============================================================================
// Hook
// ============================================================================

export function useStagger(options: StaggerOptions): StaggerState {
  const {
    count,
    staggerDelay = 50,
    baseDelay = 0,
    duration = 400,
    easing = 'ease-out',
    trigger = 'inView',
    inViewThreshold = 0.1,
    inViewMargin = '0px',
    direction = 'normal',
    once = true,
    customOrder,
  } = options;
  
  // Get device capabilities for reduced motion
  const { prefersReducedMotion } = useDeviceCapabilities();
  
  // Refs and state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(trigger === 'immediate');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  // Calculate item order based on direction
  const itemOrder = useMemo(() => {
    if (customOrder) return customOrder;
    
    const indices = Array.from({ length: count }, (_, i) => i);
    
    switch (direction) {
      case 'reverse':
        return indices.reverse();
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      case 'normal':
      default:
        return indices;
    }
  }, [count, direction, customOrder]);
  
  // Calculate total duration
  const totalDuration = useMemo(() => {
    return baseDelay + (count - 1) * staggerDelay + duration;
  }, [baseDelay, count, staggerDelay, duration]);
  
  // ==========================================================================
  // Animation Loop
  // ==========================================================================
  
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min(elapsed / totalDuration, 1);
    
    setProgress(newProgress);
    
    if (newProgress < 1) {
      setIsAnimating(true);
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      setIsComplete(true);
    }
  }, [totalDuration]);
  
  // ==========================================================================
  // Start Animation
  // ==========================================================================
  
  const start = useCallback(() => {
    if (isComplete && once) return;
    
    setIsTriggered(true);
    setIsComplete(false);
    startTimeRef.current = undefined;
    
    if (prefersReducedMotion) {
      // Skip animation, jump to complete
      setProgress(1);
      setIsComplete(true);
      return;
    }
    
    rafRef.current = requestAnimationFrame(animate);
  }, [animate, isComplete, once, prefersReducedMotion]);
  
  // ==========================================================================
  // Reset
  // ==========================================================================
  
  const reset = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setIsTriggered(trigger === 'immediate');
    setIsAnimating(false);
    setIsComplete(false);
    setProgress(0);
    startTimeRef.current = undefined;
  }, [trigger]);
  
  // ==========================================================================
  // Intersection Observer (for 'inView' trigger)
  // ==========================================================================
  
  useEffect(() => {
    if (trigger !== 'inView' || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTriggered) {
            start();
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold: inViewThreshold,
        rootMargin: inViewMargin,
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [trigger, inViewThreshold, inViewMargin, isTriggered, once, start]);
  
  // ==========================================================================
  // Immediate Trigger
  // ==========================================================================
  
  useEffect(() => {
    if (trigger === 'immediate' && !isComplete) {
      start();
    }
  }, [trigger, start, isComplete]);
  
  // ==========================================================================
  // Cleanup
  // ==========================================================================
  
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  // ==========================================================================
  // Get Item Props
  // ==========================================================================
  
  const getItemProps = useCallback((index: number): StaggerItemProps => {
    const orderIndex = itemOrder.indexOf(index);
    const itemDelay = baseDelay + orderIndex * staggerDelay;
    
    // Calculate if this item has started animating
    const itemProgress = Math.max(0, Math.min(1, 
      (progress * totalDuration - itemDelay) / duration
    ));
    
    return {
      'data-intent-stagger': 'item',
      'data-intent-stagger-index': index,
      style: {
        // CSS custom properties for use by styled components
        '--intent-stagger-index': index,
        '--intent-stagger-delay': `${itemDelay}ms`,
        '--intent-stagger-duration': `${duration}ms`,
        '--intent-stagger-easing': getEasingValue(easing),
        '--intent-stagger-progress': itemProgress,
        // Prevent flash of unstyled content
        opacity: isTriggered ? undefined : 0,
      } as React.CSSProperties,
    };
  }, [baseDelay, duration, easing, isTriggered, itemOrder, progress, staggerDelay, totalDuration]);
  
  // ==========================================================================
  // Return
  // ==========================================================================
  
  return {
    isAnimating,
    isComplete,
    isTriggered,
    progress,
    getItemProps,
    containerProps: {
      ref: containerRef,
      'data-intent-stagger-container': trigger,
    },
    start,
    reset,
  };
}

// ============================================================================
// useStaggerGroup - For nested/nested grids
// ============================================================================

export interface StaggerGroupOptions {
  /** Groups of items, each with its own count */
  groups: Array<{ id: string; count: number }>;
  
  /** Delay between groups */
  groupDelay?: number;
  
  /** Options passed to each group's stagger */
  staggerOptions?: Omit<StaggerOptions, 'count' | 'trigger'>;
  
  /** Trigger for the entire group */
  trigger?: StaggerOptions['trigger'];
}

export interface StaggerGroupState {
  groups: Array<StaggerState & { id: string }>;
  start: () => void;
  reset: () => void;
}

/**
 * Orchestrate multiple stagger groups (e.g., Bento grid with sections).
 */
export function useStaggerGroup(options: StaggerGroupOptions): StaggerGroupState {
  const { groups, groupDelay = 200, staggerOptions = {}, trigger = 'inView' } = options;
  
  const [groupStates, setGroupStates] = useState<
    Array<{ isTriggered: boolean; isComplete: boolean }>
  >(
    groups.map(() => ({ isTriggered: trigger === 'immediate', isComplete: false }))
  );
  
  const start = useCallback(() => {
    groups.forEach((_, groupIndex) => {
      setTimeout(() => {
        setGroupStates((prev) => {
          const next = [...prev];
          next[groupIndex] = { isTriggered: true, isComplete: false };
          return next;
        });
      }, groupIndex * groupDelay);
    });
  }, [groups, groupDelay]);
  
  const reset = useCallback(() => {
    setGroupStates(groups.map(() => ({ isTriggered: false, isComplete: false })));
  }, [groups]);
  
  // Create stagger states for each group
  const staggerStates = useMemo(() => {
    return groups.map((group, index) => ({
      id: group.id,
      ...useStagger({
        count: group.count,
        trigger: 'manual', // Controlled by group state
        ...staggerOptions,
      }),
    }));
  }, [groups, staggerOptions]);
  
  return {
    groups: staggerStates,
    start,
    reset,
  };
}

// ============================================================================
// CSS Presets for Common Animations
// ============================================================================

/**
 * CSS animation presets that work with useStagger.
 * These can be used with the data-intent-stagger attributes.
 * 
 * Example CSS:
 * ```css
 * [data-intent-stagger="item"] {
 *   animation: stagger-fade-up var(--intent-stagger-duration) 
 *              var(--intent-stagger-easing) 
 *              var(--intent-stagger-delay) 
 *              both;
 * }
 * 
 * @keyframes stagger-fade-up {
 *   from {
 *     opacity: 0;
 *     transform: translateY(20px);
 *   }
 *   to {
 *     opacity: 1;
 *     transform: translateY(0);
 *   }
 * }
 * ```
 */
export const StaggerPresets = {
  /** Fade up - most common for Bento grids */
  fadeUp: {
    keyframes: `
      @keyframes stagger-fade-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    className: 'intent-stagger-fade-up',
  },
  
  /** Fade in with scale */
  fadeScale: {
    keyframes: `
      @keyframes stagger-fade-scale {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    className: 'intent-stagger-fade-scale',
  },
  
  /** Slide in from left */
  slideLeft: {
    keyframes: `
      @keyframes stagger-slide-left {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    className: 'intent-stagger-slide-left',
  },
  
  /** Slide in from right */
  slideRight: {
    keyframes: `
      @keyframes stagger-slide-right {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    className: 'intent-stagger-slide-right',
  },
  
  /** Blur in */
  blurIn: {
    keyframes: `
      @keyframes stagger-blur-in {
        from { opacity: 0; filter: blur(8px); }
        to { opacity: 1; filter: blur(0); }
      }
    `,
    className: 'intent-stagger-blur-in',
  },
} as const;

// ============================================================================
// Export
// ============================================================================

export default useStagger;
