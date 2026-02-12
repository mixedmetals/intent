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

export interface ResizeObserverSize {
  inlineSize: number;
  blockSize: number;
}

export interface ResizeObserverEntry {
  /** Target element */
  target: Element;
  /** Content rectangle */
  contentRect: DOMRectReadOnly;
  /** Border box size */
  borderBoxSize?: readonly ResizeObserverSize[];
  /** Content box size */
  contentBoxSize?: readonly ResizeObserverSize[];
  /** Device pixel content box size */
  devicePixelContentBoxSize?: readonly ResizeObserverSize[];
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
function debounce(
  fn: (entries: globalThis.ResizeObserverEntry[]) => void,
  delay: number
): (entries: globalThis.ResizeObserverEntry[]) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (entries: globalThis.ResizeObserverEntry[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(entries);
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
  
  // Set up ResizeObserver
  useEffect(() => {
    const element = ref.current;
    
    if (!element || !isBrowser) {
      return;
    }
    
    // Use native ResizeObserver if available
    if (hasResizeObserver) {
      const callback = debounceMs > 0 ? debounce(handleResize, debounceMs) : handleResize;
      const observer = new ResizeObserver(callback);
      observer.observe(element);
      
      return () => {
        observer.disconnect();
      };
    }
    
    // Fallback: measure on window resize
    const handleWindowResize = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const newSize: UseResizeObserverResult = {
        width: rect.width,
        height: rect.height,
        entry: {
          target: element,
          contentRect: rect as unknown as DOMRectReadOnly,
        },
      };
      
      lastSizeRef.current = newSize;
      setSize(newSize);
      onResize?.(newSize);
    };
    
    // Initial measurement
    handleWindowResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleWindowResize);
    
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [ref, debounceMs, handleResize, onResize]);
  
  return size;
}

// ============================================================================
// useElementSize - Simplified hook
// ============================================================================

/**
 * Simplified hook that returns just width and height.
 * 
 * @example
 * ```tsx
 * const { ref, width, height } = useElementSize<HTMLDivElement>();
 * 
 * return <div ref={ref}>{width}x{height}</div>;
 * ```
 */
export function useElementSize<T extends HTMLElement = HTMLElement>(): {
  ref: RefObject<T>;
  width: number;
  height: number;
} {
  const ref = useRef<T>(null);
  const { width, height } = useResizeObserver(ref);
  
  return { ref, width, height };
}

// ============================================================================
// Container Query Conditions
// ============================================================================

export interface ContainerConditions {
  /** Minimum width in pixels */
  minWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels */
  maxHeight?: number;
  /** Aspect ratio range (width/height) */
  aspectRatio?: { min?: number; max?: number };
}

export interface ContainerMatches {
  /** Whether minWidth condition is met */
  minWidth: boolean;
  /** Whether maxWidth condition is met */
  maxWidth: boolean;
  /** Whether minHeight condition is met */
  minHeight: boolean;
  /** Whether maxHeight condition is met */
  maxHeight: boolean;
  /** Whether aspectRatio condition is met */
  aspectRatio: boolean;
  /** Whether all conditions are met */
  matches: boolean;
}

/**
 * Hook for container query-like functionality.
 * Checks if the element matches the specified size conditions.
 * 
 * @example
 * ```tsx
 * // Switch to horizontal layout when container is wide
 * const { ref, matches } = useContainerQuery<HTMLDivElement>({
 *   minWidth: 400,
 * });
 * 
 * return (
 *   <div 
 *     ref={ref}
 *     className={intent('card', {
 *       'card--horizontal': matches,
 *     })}
 *   >
 *     ...
 *   </div>
 * );
 * ```
 */
export function useContainerQuery<T extends HTMLElement = HTMLElement>(
  conditions: ContainerConditions
): {
  ref: RefObject<T>;
  matches: ContainerMatches;
} {
  const ref = useRef<T>(null);
  const { width, height } = useResizeObserver(ref);
  
  // Calculate aspect ratio
  const aspectRatio = height > 0 ? width / height : 0;
  
  // Check each condition
  const minWidthMatch = conditions.minWidth === undefined || width >= conditions.minWidth;
  const maxWidthMatch = conditions.maxWidth === undefined || width <= conditions.maxWidth;
  const minHeightMatch = conditions.minHeight === undefined || height >= conditions.minHeight;
  const maxHeightMatch = conditions.maxHeight === undefined || height <= conditions.maxHeight;
  
  const aspectRatioMatch =
    conditions.aspectRatio === undefined ||
    (
      (conditions.aspectRatio.min === undefined || aspectRatio >= conditions.aspectRatio.min) &&
      (conditions.aspectRatio.max === undefined || aspectRatio <= conditions.aspectRatio.max)
    );
  
  const matches: ContainerMatches = {
    minWidth: minWidthMatch,
    maxWidth: maxWidthMatch,
    minHeight: minHeightMatch,
    maxHeight: maxHeightMatch,
    aspectRatio: aspectRatioMatch,
    matches: minWidthMatch && maxWidthMatch && minHeightMatch && maxHeightMatch && aspectRatioMatch,
  };
  
  return { ref, matches };
}
