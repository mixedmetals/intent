/**
 * ============================================================================
 * Intent React Hooks
 * ============================================================================
 * 
 * Schema-aware React hooks for the Intent component framework.
 * 
 * These hooks are designed to be:
 * - SSR-safe (work with server-side rendering)
 * - Token-aware (integrate with Intent's theme system)
 * - Schema-driven (usable by LLMs via component schemas)
 * 
 * @example
 * ```tsx
 * import { useMediaQuery, useResizeObserver, useBreakpoint } from 'intent-react/hooks';
 * ```
 */

// ============================================================================
// Layout & Responsive Hooks
// ============================================================================

export {
  useMediaQuery,
  useBreakpoint,
  useDeviceCapabilities,
  IntentBreakpoints,
} from './useMediaQuery.js';
export type {
  BreakpointName,
  UseMediaQueryOptions,
} from './useMediaQuery.js';

export {
  useResizeObserver,
  useElementSize,
  useContainerQuery,
} from './useResizeObserver.js';
export type {
  ResizeObserverEntry,
  UseResizeObserverResult,
  UseResizeObserverOptions,
  ContainerQueryCondition,
} from './useResizeObserver.js';

// ============================================================================
// Re-export Types
// ============================================================================

export type {
  // Media Query
  BreakpointName as IntentBreakpointName,
  UseMediaQueryOptions as IntentUseMediaQueryOptions,
  
  // Resize Observer
  ResizeObserverEntry as IntentResizeObserverEntry,
  UseResizeObserverResult as IntentUseResizeObserverResult,
  UseResizeObserverOptions as IntentUseResizeObserverOptions,
  ContainerQueryCondition as IntentContainerQueryCondition,
} from './index.js';
