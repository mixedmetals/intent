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
  ContainerConditions,
  ContainerMatches,
} from './useResizeObserver.js';

// ============================================================================
// Form Hooks
// ============================================================================

export {
  useForm,
  createFormContext,
} from './useForm.js';
export type {
  UseFormOptions,
  UseFormReturn,
  FormErrors,
  FormTouched,
  FormDirty,
  RegisterOptions,
  FieldRegistration,
} from './useForm.js';

// ============================================================================
// Motion & Animation Hooks
// ============================================================================

export {
  useStagger,
  useStaggerGroup,
  StaggerPresets,
} from './useStagger.js';
export type {
  StaggerOptions,
  StaggerItemProps,
  StaggerState,
  StaggerGroupOptions,
  StaggerGroupState,
} from './useStagger.js';

// ============================================================================
// Re-export Types (already exported above)
// ============================================================================

export type {
  // Media Query
  BreakpointName as IntentBreakpointName,
  UseMediaQueryOptions as IntentUseMediaQueryOptions,
} from './useMediaQuery.js';

export type {
  // Resize Observer
  ResizeObserverEntry as IntentResizeObserverEntry,
  UseResizeObserverResult as IntentUseResizeObserverResult,
  UseResizeObserverOptions as IntentUseResizeObserverOptions,
  ContainerConditions as IntentContainerConditions,
  ContainerMatches as IntentContainerMatches,
} from './useResizeObserver.js';

export type {
  // Stagger
  StaggerOptions as IntentStaggerOptions,
  StaggerItemProps as IntentStaggerItemProps,
  StaggerState as IntentStaggerState,
} from './useStagger.js';

export type {
  // Form
  UseFormOptions as IntentUseFormOptions,
  UseFormReturn as IntentUseFormReturn,
  FormErrors as IntentFormErrors,
  FormTouched as IntentFormTouched,
  FormDirty as IntentFormDirty,
  RegisterOptions as IntentRegisterOptions,
  FieldRegistration as IntentFieldRegistration,
} from './useForm.js';
