/**
 * ============================================================================
 * AnimatePresence - Mount/Unmount Animation Wrapper
 * ============================================================================
 * 
 * Handles animating elements when they enter or exit the DOM.
 * Essential for Modals, Toasts, Drawers, and dropdown menus.
 * 
 * Schema Example (Modal):
 * ```
 * properties: {
 *   isOpen: { type: 'boolean', default: false },
 *   animation: { type: 'enum', values: ['mechanical', 'heavy', 'none'], default: 'heavy' }
 * },
 * 
 * // Usage:
 * <AnimatePresence>
 *   {isOpen && (
 *     <Modal animation="heavy">
 *       Content
 *     </Modal>
 *   )}
 * </AnimatePresence>
 * ```
 * 
 * Schema Example (Toast notifications):
 * ```
 * // Toast container manages multiple toasts with staggered animations
 * <AnimatePresence mode="popLayout">
 *   {toasts.map(toast => (
 *     <Toast key={toast.id} animation="spring" />
 *   ))}
 * </AnimatePresence>
 * ```
 */

import React, { 
  useState, 
  useEffect, 
  useRef, 
  Children, 
  cloneElement, 
  isValidElement,
  useCallback 
} from 'react';
import { useDeviceCapabilities } from '../../hooks/useMediaQuery.js';
import { IntentEasing, IntentDuration, type IntentEasingName, type IntentDurationName } from './Transition.js';

// ============================================================================
// Types
// ============================================================================

export interface AnimatePresenceConfig {
  /** Child elements to animate */
  children: React.ReactNode;
  
  /** Animation mode for list changes */
  mode?: 'sync' | 'popLayout' | 'wait';
  
  /** Default animation for entering elements */
  animation?: IntentEasingName | string;
  
  /** Default duration */
  duration?: IntentDurationName | number;
  
  /** Initial mount animation */
  initial?: boolean;
  
  /** Callback when all animations complete */
  onComplete?: () => void;
  
  /** Custom exit/enter configuration */
  exitBeforeEnter?: boolean;
}

interface ChildState {
  key: string;
  element: React.ReactElement;
  status: 'entering' | 'entered' | 'exiting' | 'exited';
}

// ============================================================================
// AnimatePresence Component
// ============================================================================

/**
 * Wrapper component that handles enter/exit animations for its children.
 * 
 * When a child is removed from React's tree, AnimatePresence keeps it in the
 * DOM long enough to complete its exit animation.
 * 
 * @example
 * ```tsx
 * // Modal with heavy exit animation
 * <AnimatePresence mode="wait">
 *   {isOpen && (
 *     <Modal animation="heavy" duration="slow">
 *       <h1>Modal Content</h1>
 *     </Modal>
 *   )}
 * </AnimatePresence>
 * 
 * // Toast stack with spring animations
 * <AnimatePresence mode="popLayout">
 *   {toasts.map(toast => (
 *     <Toast key={toast.id} animation="spring" />
 *   ))}
 * </AnimatePresence>
 * ```
 */
export function AnimatePresence({
  children,
  mode = 'sync',
  animation = 'mechanical',
  duration = 'normal',
  initial = true,
  onComplete,
  exitBeforeEnter = false,
}: AnimatePresenceConfig): React.ReactElement {
  const { prefersReducedMotion } = useDeviceCapabilities();
  const [childStates, setChildStates] = useState<ChildState[]>([]);
  const prevChildrenRef = useRef<React.ReactNode>(null);
  const completedAnimationsRef = useRef<Set<string>>(new Set());
  
  // Resolve animation values
  const resolvedEasing = prefersReducedMotion 
    ? IntentEasing.instant 
    : (animation in IntentEasing ? IntentEasing[animation as IntentEasingName] : animation);
  const resolvedDuration = prefersReducedMotion 
    ? 0 
    : (typeof duration === 'number' ? duration : IntentDuration[duration] ?? IntentDuration.normal);
  
  // Get current children as array
  const currentChildren = Children.toArray(children).filter(isValidElement);
  
  // Track which animations have completed
  const handleAnimationComplete = useCallback((key: string) => {
    completedAnimationsRef.current.add(key);
    
    // Check if all animations are done
    const allComplete = childStates.every(child => {
      if (child.status === 'exited') return true;
      if (child.status === 'exiting') return completedAnimationsRef.current.has(child.key);
      return true;
    });
    
    if (allComplete) {
      // Clean up exited children
      setChildStates(prev => prev.filter(c => c.status !== 'exited'));
      onComplete?.();
    }
  }, [childStates, onComplete]);
  
  // Sync children with state
  useEffect(() => {
    const prevChildren = prevChildrenRef.current;
    const prevKeys = new Set(
      Children.toArray(prevChildren)
        .filter(isValidElement)
        .map(c => c.key as string)
    );
    
    const currentKeys = new Set(currentChildren.map(c => c.key as string));
    
    setChildStates(prevStates => {
      const newStates: ChildState[] = [];
      
      // Process current children
      currentChildren.forEach(child => {
        const key = child.key as string;
        const existing = prevStates.find(s => s.key === key);
        
        if (existing) {
          // Child existed before - keep its state
          newStates.push({
            ...existing,
            element: child,
          });
        } else {
          // New child - start entering
          newStates.push({
            key,
            element: child,
            status: initial ? 'entering' : 'entered',
          });
          
          // Mark entering animation
          if (!initial && !prefersReducedMotion) {
            setTimeout(() => {
              setChildStates(current => 
                current.map(s => 
                  s.key === key ? { ...s, status: 'entered' as const } : s
                )
              );
              handleAnimationComplete(key);
            }, resolvedDuration);
          } else {
            handleAnimationComplete(key);
          }
        }
      });
      
      // Process removed children (they need to exit)
      prevStates.forEach(prevState => {
        if (!currentKeys.has(prevState.key) && prevState.status !== 'exited') {
          newStates.push({
            ...prevState,
            status: 'exiting',
          });
          
          // Schedule removal after animation
          if (!prefersReducedMotion) {
            setTimeout(() => {
              setChildStates(current => 
                current.map(s => 
                  s.key === prevState.key ? { ...s, status: 'exited' as const } : s
                )
              );
              handleAnimationComplete(prevState.key);
            }, resolvedDuration);
          } else {
            // Instant removal for reduced motion
            setChildStates(current => 
              current.map(s => 
                s.key === prevState.key ? { ...s, status: 'exited' as const } : s
              )
            );
            handleAnimationComplete(prevState.key);
          }
        }
      });
      
      return newStates;
    });
    
    prevChildrenRef.current = children;
  }, [children, initial, resolvedDuration, prefersReducedMotion, handleAnimationComplete]);
  
  // Apply animation props to children
  const animatedChildren = childStates.map(childState => {
    const { element, status } = childState;
    
    // Determine animation styles based on status
    const getAnimationStyles = (): React.CSSProperties => {
      if (prefersReducedMotion) {
        return {
          opacity: status === 'exiting' || status === 'exited' ? 0 : 1,
          transition: 'none',
        };
      }
      
      switch (status) {
        case 'entering':
          return {
            opacity: 0,
            transform: 'scale(0.95) translateY(8px)',
            transition: `all ${resolvedDuration}ms ${resolvedEasing}`,
          };
        case 'entered':
          return {
            opacity: 1,
            transform: 'scale(1) translateY(0)',
            transition: `all ${resolvedDuration}ms ${resolvedEasing}`,
          };
        case 'exiting':
          return {
            opacity: 0,
            transform: 'scale(0.95) translateY(-8px)',
            transition: `all ${resolvedDuration}ms ${resolvedEasing}`,
          };
        case 'exited':
          return {
            opacity: 0,
            pointerEvents: 'none',
          };
        default:
          return {};
      }
    };
    
    return cloneElement(element, {
      ...element.props,
      style: {
        ...element.props.style,
        ...getAnimationStyles(),
      },
      'data-animate-status': status,
    });
  });
  
  return (
    <>
      {animatedChildren}
    </>
  );
}

// ============================================================================
// AnimatePresenceItem - For complex per-child configuration
// ============================================================================

export interface AnimatePresenceItemConfig {
  /** Unique key for tracking */
  children: React.ReactElement;
  
  /** Enter animation config */
  enter?: {
    animation?: IntentEasingName;
    duration?: IntentDurationName | number;
    delay?: number;
    from?: React.CSSProperties;
    to?: React.CSSProperties;
  };
  
  /** Exit animation config */
  exit?: {
    animation?: IntentEasingName;
    duration?: IntentDurationName | number;
    delay?: number;
    to?: React.CSSProperties;
  };
}

/**
 * Individual animation configuration for AnimatePresence children.
 * 
 * @example
 * ```tsx
 * <AnimatePresence>
 *   <AnimatePresenceItem
 *     enter={{ animation: 'spring', duration: 'fast' }}
 *     exit={{ animation: 'heavy', duration: 'normal' }}
 *   >
 *     <Badge>99+</Badge>
 *   </AnimatePresenceItem>
 * </AnimatePresence>
 * ```
 */
export function AnimatePresenceItem({ 
  children, 
  enter, 
  exit 
}: AnimatePresenceItemConfig): React.ReactElement {
  // This is a marker component - AnimatePresence reads these configs
  return cloneElement(children, {
    'data-enter-config': JSON.stringify(enter),
    'data-exit-config': JSON.stringify(exit),
  });
}

// ============================================================================
// Stagger Animation Helper
// ============================================================================

export interface StaggerConfig {
  /** Base delay between items */
  staggerDelay?: number;
  
  /** Maximum total stagger time */
  maxStagger?: number;
  
  /** Direction of stagger */
  direction?: 'forward' | 'reverse' | 'center' | 'edges';
}

/**
 * Calculate stagger delays for a list of items.
 * 
 * @example
 * ```tsx
 * const delays = useStaggerDelay(5, { staggerDelay: 50 });
 * // Returns: [0, 50, 100, 150, 200]
 * 
 * // In component:
 * {items.map((item, i) => (
 *   <Transition 
 *     key={item.id} 
 *     in={isVisible} 
 *     delay={delays[i]}
 *   >
 *     <Card>{item.content}</Card>
 *   </Transition>
 * ))}
 * ```
 */
export function useStaggerDelay(
  itemCount: number,
  config: StaggerConfig = {}
): number[] {
  const { 
    staggerDelay = 50, 
    maxStagger = 500,
    direction = 'forward' 
  } = config;
  
  return React.useMemo(() => {
    const delays: number[] = [];
    const maxDelay = Math.min((itemCount - 1) * staggerDelay, maxStagger);
    
    for (let i = 0; i < itemCount; i++) {
      let delay: number;
      
      switch (direction) {
        case 'reverse':
          delay = maxDelay - (i * staggerDelay);
          break;
        case 'center':
          const centerIndex = Math.floor(itemCount / 2);
          delay = Math.abs(i - centerIndex) * staggerDelay;
          break;
        case 'edges':
          const middleIndex = itemCount / 2;
          delay = Math.abs(i - middleIndex) * staggerDelay * 2;
          break;
        case 'forward':
        default:
          delay = i * staggerDelay;
          break;
      }
      
      delays.push(Math.min(delay, maxStagger));
    }
    
    return delays;
  }, [itemCount, staggerDelay, maxStagger, direction]);
}

// ============================================================================
// Export
// ============================================================================

export default AnimatePresence;
