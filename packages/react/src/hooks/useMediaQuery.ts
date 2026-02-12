/**
 * ============================================================================
 * useMediaQuery Hook
 * ============================================================================
 * 
 * SSR-safe media query hook that integrates with Intent's breakpoint token registry.
 * 
 * Schema Example (LLM Usage):
 * ```
 * // Card component that adapts density based on viewport
 * properties: {
 *   density: prop.enum(['compact', 'normal', 'relaxed']),
 * },
 * responsive: {
 *   density: {
 *     'screen < 640px': 'compact',   // Uses useMediaQuery('(max-width: 639px)')
 *     'screen >= 640px && < 1024px': 'normal',
 *     'screen >= 1024px': 'relaxed',
 *   }
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // In a component
 * const isMobile = useMediaQuery('(max-width: 639px)');
 * const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
 * 
 * // Using Intent breakpoint presets
 * const isCompact = useMediaQuery(IntentBreakpoints.sm);
 * ```
 */

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

// ============================================================================
// Intent Breakpoint Registry
// ============================================================================

/**
 * Intent's default breakpoint tokens.
 * These align with the theme's breakpoint scale.
 */
export const IntentBreakpoints = {
  /** Extra small: < 640px */
  xs: '(max-width: 639px)',
  
  /** Small: >= 640px */
  sm: '(min-width: 640px)',
  
  /** Small only: 640px - 767px */
  smOnly: '(min-width: 640px) and (max-width: 767px)',
  
  /** Medium: >= 768px */
  md: '(min-width: 768px)',
  
  /** Medium only: 768px - 1023px */
  mdOnly: '(min-width: 768px) and (max-width: 1023px)',
  
  /** Large: >= 1024px */
  lg: '(min-width: 1024px)',
  
  /** Large only: 1024px - 1279px */
  lgOnly: '(min-width: 1024px) and (max-width: 1279px)',
  
  /** Extra large: >= 1280px */
  xl: '(min-width: 1280px)',
  
  /** Extra large only: 1280px - 1535px */
  xlOnly: '(min-width: 1280px) and (max-width: 1535px)',
  
  /** 2XL: >= 1536px */
  '2xl': '(min-width: 1536px)',
  
  /** Reduced motion preference */
  reducedMotion: '(prefers-reduced-motion: reduce)',
  
  /** High contrast mode */
  highContrast: '(prefers-contrast: high)',
  
  /** Dark mode */
  dark: '(prefers-color-scheme: dark)',
  
  /** Light mode */
  light: '(prefers-color-scheme: light)',
  
  /** Hover capable devices */
  hover: '(hover: hover)',
  
  /** Touch devices (no hover) */
  touch: '(hover: none)',
} as const;

/** Type for breakpoint names */
export type BreakpointName = keyof typeof IntentBreakpoints;

// ============================================================================
// SSR-Safe Match Media
// ============================================================================

/**
 * Check if we're in a browser environment.
 */
const isBrowser = typeof window !== 'undefined' && typeof window.matchMedia === 'function';

/**
 * Subscribe to media query changes.
 * Used by useSyncExternalStore for SSR safety.
 */
function subscribeToMediaQuery(
  query: string,
  callback: (matches: boolean) => void
): () => void {
  if (!isBrowser) {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia(query);
  
  // Modern API (addEventListener)
  if (mediaQuery.addEventListener) {
    const handler = (event: MediaQueryListEvent) => callback(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }
  
  // Legacy API (addListener) for older browsers
  const handler = () => callback(mediaQuery.matches);
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

/**
 * Get the current match state for a media query.
 * Returns false during SSR.
 */
function getMediaQuerySnapshot(query: string): boolean {
  if (!isBrowser) {
    return false;
  }
  return window.matchMedia(query).matches;
}

// ============================================================================
// useMediaQuery Hook
// ============================================================================

export interface UseMediaQueryOptions {
  /** Default value during SSR (server-side rendering) */
  defaultValue?: boolean;
  
  /** Callback when match state changes */
  onChange?: (matches: boolean) => void;
}

/**
 * React to media query changes in a component.
 * 
 * This hook is SSR-safe: it returns `defaultValue` (or `false`) during server
 * rendering, then hydrates to the correct value on the client.
 * 
 * @param query - Media query string or Intent breakpoint name
 * @param options - Hook options
 * @returns Whether the media query currently matches
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const isMobile = useMediaQuery('(max-width: 639px)');
 * 
 * // Using Intent breakpoint preset
 * const isDesktop = useMediaQuery(IntentBreakpoints.lg);
 * 
 * // With SSR default
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
 *   defaultValue: false,
 * });
 * 
 * // With change callback
 * useMediaQuery(IntentBreakpoints.reducedMotion, {
 *   onChange: (prefersReduced) => {
 *     setShouldAnimate(!prefersReduced);
 *   },
 * });
 * ```
 */
export function useMediaQuery(
  query: string | BreakpointName,
  options: UseMediaQueryOptions = {}
): boolean {
  const { defaultValue = false, onChange } = options;
  
  // Resolve Intent breakpoint name to query string
  const resolvedQuery = query in IntentBreakpoints 
    ? IntentBreakpoints[query as BreakpointName] 
    : query;
  
  // SSR-safe external store subscription
  const matches = useSyncExternalStore(
    // Subscribe function
    (callback) => subscribeToMediaQuery(resolvedQuery, callback),
    // Get snapshot (client)
    () => getMediaQuerySnapshot(resolvedQuery),
    // Get snapshot (server) - must match hydrate
    () => defaultValue
  );
  
  // Optional change callback
  useEffect(() => {
    onChange?.(matches);
  }, [matches, onChange]);
  
  return matches;
}

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Hook for responsive breakpoint detection.
 * Returns the current breakpoint name.
 * 
 * Schema Example:
 * ```
 * // Grid component adjusts columns based on breakpoint
 * properties: {
 *   columns: prop.enum([1, 2, 3, 4, 6, 12]),
 * },
 * responsive: {
 *   columns: {
 *     'xs': 1,
 *     'sm': 2,
 *     'md': 3,
 *     'lg': 4,
 *     'xl': 6,
 *   }
 * }
 * ```
 */
export function useBreakpoint(): {
  /** Current breakpoint name */
  name: BreakpointName | null;
  /** Whether currently at xs */
  isXs: boolean;
  /** Whether currently at sm or above */
  isSm: boolean;
  /** Whether currently at md or above */
  isMd: boolean;
  /** Whether currently at lg or above */
  isLg: boolean;
  /** Whether currently at xl or above */
  isXl: boolean;
  /** Whether currently at 2xl or above */
  is2xl: boolean;
} {
  const isXs = useMediaQuery('xs');
  const isSm = useMediaQuery('sm');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  const isXl = useMediaQuery('xl');
  const is2xl = useMediaQuery('2xl');
  
  // Determine current breakpoint name
  let name: BreakpointName | null = null;
  if (is2xl) name = '2xl';
  else if (isXl) name = 'xl';
  else if (isLg) name = 'lg';
  else if (isMd) name = 'md';
  else if (isSm) name = 'sm';
  else if (isXs) name = 'xs';
  
  return {
    name,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
  };
}

/**
 * Hook for device capability detection.
 * 
 * Schema Example:
 * ```
 * // Button component enlarges touch targets on touch devices
 * properties: {
 *   size: prop.enum(['sm', 'md', 'lg']),
 * },
 * responsive: {
 *   size: {
 *     'touch': 'lg',      // Larger touch target
 *     'hover': 'md',      // Standard size for mouse
 *   }
 * }
 * ```
 */
export function useDeviceCapabilities(): {
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Whether user prefers high contrast */
  prefersHighContrast: boolean;
  /** Whether dark mode is preferred */
  prefersDarkMode: boolean;
  /** Whether device supports hover */
  hasHover: boolean;
  /** Whether device is touch-only */
  isTouch: boolean;
} {
  return {
    prefersReducedMotion: useMediaQuery('reducedMotion'),
    prefersHighContrast: useMediaQuery('highContrast'),
    prefersDarkMode: useMediaQuery('dark'),
    hasHover: useMediaQuery('hover'),
    isTouch: useMediaQuery('touch'),
  };
}

// ============================================================================
// Export
// ============================================================================

export default useMediaQuery;
