/**
 * ============================================================================
 * useResizeObserver Hook
 * ============================================================================
 * 
 * SSR-safe ResizeObserver hook for element-level responsive behavior.
 * Enables container-query-like functionality before native CQ support.
 * 
 * Schema Example (LLM Usage):
 * ```
 * // Card switches to compact layout when container is narrow
 * properties: {
 *   density: prop.enum(['compact', 'normal', 'relaxed']),
 * },
 * responsive: {
 *   // Unlike media queries, this observes the CARD's container, not viewport
 *   density: {
 *     'containerWidth < 200px': 'compact',
 *     'containerWidth >= 200px && < 400px': 'normal',
 *     'containerWidth >= 400px': 'relaxed',
 *   }
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const ref = useRef<HTMLDivElement>(null);
 * const { width, height } = useResizeObserver(ref);
 * 
 * // With callback
 * useResizeObserver(ref, (entry) => {
 *   console.log('Size changed:', entry.contentRect);
 * });
 * 
 * // Conditional density
 * const density = width < 200 ? 'compact' : width < 400 ? 'normal' : 'relaxed';
 * ```
 */

import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ResizeObserverEntry {
  /** Target element */
  target: Element;
  /** Content rectangle */
  contentRect: DOMRectReadOnly;
  /** Border box size */
  borderBoxSize?: ResizeObserverSize[];
  /** Content box size */
  contentBoxSize?: ResizeObserverSize[];
  /** Device pixel content box size */
  devicePixelContentBoxSize?: ResizeObserverSize[];
}

export interface UseResizeObserverResult {
  /** Current width in pixels */
  width: number;
  /** Current height in pixels */
  height: number;
  /** Full ResizeObserver entry (if available) */
  entry: ResizeObserverEntry | null;
}

export interface UseResizeObserverOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Callback when size changes */
  onResize?: (result: UseResizeObserverResult) => void;
  /** Initial width for SSR */
  initialWidth?: number;
  /** Initial height for SSR */
  initialHeight?: number;
}

// ============================================================================
// SSR Safety
// ============================================================================

const isBrowser = typeof window !== 'undefined';
const hasResizeObserver = isBrowser && typeof ResizeObserver !== 'undefined';

// ============================================================================
// Debounce Utility
// ============================================================================

/**
 * Debounce function for performance optimization.
 */
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

// ============================================================================
// useResizeObserver Hook
// ============================================================================

/**
 * Observe element size changes with ResizeObserver.
 * 
 * This hook is SSR-safe and handles browser compatibility gracefully.
 * Falls back to window resize events if ResizeObserver is unavailable.
 * 
 * @param ref - Ref to the element to observe
 * @param options - Hook options
 * @returns Current size information
 * 
 * @example
 * ```tsx
 * function ResponsiveCard() {
 *   const cardRef = useRef<HTMLDivElement>(null);
 *   const { width, height } = useResizeObserver(cardRef);
 *   
 *   // Switch layout based on container size
 *   const isCompact = width < 300;
 *   
 *   return (
 *     <div 
 *       ref={cardRef}
 *       className={intent('intent-card', {
 *         'intent-card--compact': isCompact,
 *         'intent-card--horizontal': width > 500,
 *       })}
 *     >
 *       {isCompact ? <CompactView /> : <FullView />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useResizeObserver<T extends Element = HTMLElement>(
  ref: RefObject<T>,
  options: UseResizeObserverOptions = {}
): UseResizeObserverResult {
  const {
    debounce: debounceMs = 0,
    onResize,
    initialWidth = 0,
    initialHeight = 0,
  } = options;
  
  // State for size
  const [size, setSize] = useState<UseResizeObserverResult>({
    width: initialWidth,
    height: initialHeight,
    entry: null,
  });
  
  // Keep track of last known size for callbacks
  const lastSizeRef = useRef(size);
  
  // Create resize handler
  const handleResize = useCallback(
    (entries: globalThis.ResizeObserverEntry[]) => {
      if (!entries.length) return;
      
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      
      const newSize: UseResizeObserverResult = {
        width,
        height,
        entry: {
          target: entry.target,
          contentRect: entry.contentRect,
          borderBoxSize: entry.borderBoxSize as ResizeObserverSize[] | undefined,
          contentBoxSize: entry.contentBoxSize as ResizeObserverSize[] | undefined,
          devicePixelContentBoxSize: entry.devicePixelContentBoxSize as ResizeObserverSize[] | undefined,
        },
      };
      
      lastSizeRef.current = newSize;
      setSize(newSize);
      onResize?.(newSize);
    },
    [onResize]
  );
  
  // Debounced version if requested
  const debouncedHandler = useCallback(
    debounceMs > 0 ? debounce(handleResize, debounceMs) : handleResize,
    [handleResize, debounceMs]
  );
  
  // Set up ResizeObserver
  useEffect(() => {
    const element = ref.current;
    
    if (!element || !isBrowser) {
      return;
    }
    
    // Use native ResizeObserver if available
    if (hasResizeObserver) {
      const observer = new ResizeObserver(debounceMs > 0 ? debouncedHandler : handleResize);
      observer.observe(element);
      
      return () => {
        observer.disconnect();
      };
    }
    
    // Fallback: measure on window resize
    const handleWindowResize = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const fallbackEntry: globalThis.ResizeObserverEntry = {
        target: element,
        contentRect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          x: rect.x,
          y: rect.y,
          toJSON: () => ({}),
        },
        borderBoxSize: [{ inlineSize: rect.width, blockSize: rect.height }],
        contentBoxSize: [{ inlineSize: rect.width, blockSize: rect.height }],
        devicePixelContentBoxSize: undefined,
      } as globalThis.ResizeObserverEntry;
      
      handleResize([fallbackEntry]);
    };
    
    // Initial measurement
    handleWindowResize();
    
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [ref, handleResize, debouncedHandler, debounceMs]);
  
  return size;
}

// ============================================================================
// Convenience: useElementSize
// ============================================================================

/**
 * Simplified hook that just returns width/height.
 * 
 * Schema Example:
 * ```
 * // Stat component switches to vertical layout when narrow
 * properties: {
 *   layout: prop.enum(['horizontal', 'vertical']),
 * },
 * responsive: {
 *   layout: {
 *     'containerWidth < 150px': 'vertical',
 *     'containerWidth >= 150px': 'horizontal',
 *   }
 * }
 * ```
 */
export function useElementSize<T extends Element = HTMLElement>(
  ref: RefObject<T>,
  options?: { debounce?: number; initialWidth?: number; initialHeight?: number }
): { width: number; height: number } {
  const { width, height } = useResizeObserver(ref, options);
  return { width, height };
}

// ============================================================================
// Convenience: useContainerQuery
// ============================================================================

export type ContainerQueryCondition = 
  | { type: 'min-width'; value: number }
  | { type: 'max-width'; value: number }
  | { type: 'min-height'; value: number }
  | { type: 'max-height'; value: number }
  | { type: 'aspect-ratio'; value: number; operator: '>' | '<' | '=' };

/**
 * Evaluate container query conditions against current size.
 * 
 * Schema Example:
 * ```
 * // Complex conditional layout
 * properties: {
 *   variant: prop.enum(['banner', 'card', 'chip']),
 * },
 * responsive: {
 *   variant: [
 *     { when: 'width > 600 && aspect-ratio > 2', then: 'banner' },
 *     { when: 'width > 300', then: 'card' },
 *     { when: 'width <= 300', then: 'chip' },
 *   ]
 * }
 * ```
 */
export function useContainerQuery(
  ref: RefObject<Element>,
  conditions: ContainerQueryCondition[],
  options?: UseResizeObserverOptions
): { matches: boolean; size: { width: number; height: number } } {
  const { width, height } = useResizeObserver(ref, options);
  
  const matches = conditions.every((condition) => {
    switch (condition.type) {
      case 'min-width':
        return width >= condition.value;
      case 'max-width':
        return width <= condition.value;
      case 'min-height':
        return height >= condition.value;
      case 'max-height':
        return height <= condition.value;
      case 'aspect-ratio':
        const ratio = width / (height || 1);
        switch (condition.operator) {
          case '>':
            return ratio > condition.value;
          case '<':
            return ratio < condition.value;
          case '=':
            return Math.abs(ratio - condition.value) < 0.01;
          default:
            return false;
        }
      default:
        return false;
    }
  });
  
  return { matches, size: { width, height } };
}

// ============================================================================
// Export
// ============================================================================

export default useResizeObserver;
