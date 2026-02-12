/**
 * ============================================================================
 * Intent Motion Components
 * ============================================================================
 * 
 * Animation primitives and utilities for the Intent design system.
 * 
 * All components automatically respect prefers-reduced-motion.
 * 
 * @example
 * ```tsx
 * import { 
 *   AnimatePresence, 
 *   Transition, 
 *   Fade, 
 *   ScaleSpring,
 *   IntentEasing 
 * } from 'intent-react/components/motion';
 * ```
 */

// ============================================================================
// Core Components
// ============================================================================

export {
  AnimatePresence,
  AnimatePresenceItem,
  useStaggerDelay,
} from './AnimatePresence.js';

export {
  Transition,
  Fade,
  FadeUp,
  FadeDown,
  Scale,
  ScaleSpring,
  Slide,
  IntentEasing,
  IntentDuration,
} from './Transition.js';

// ============================================================================
// Types
// ============================================================================

export type {
  AnimatePresenceConfig,
  AnimatePresenceItemConfig,
  StaggerConfig,
} from './AnimatePresence.js';

export type {
  TransitionConfig,
  AnimatedProperty,
  IntentEasingName,
  IntentDurationName,
} from './Transition.js';

// ============================================================================
// Motion Tokens
// ============================================================================

/**
 * Quick reference for motion presets:
 * 
 * **Easing:**
 * - `mechanical` - Default tactile feel (cubic-bezier(0.4, 0, 0.2, 1))
 * - `heavy` - Deliberate, large movements (cubic-bezier(0.7, 0, 0.3, 1))
 * - `spring` - Bouncy, energetic (cubic-bezier(0.34, 1.56, 0.64, 1))
 * - `bounce` - Playful overshoot
 * - `smooth` - Standard transitions
 * - `linear` - Constant speed
 * - `instant` - No transition (for reduced motion)
 * 
 * **Duration:**
 * - `micro` - 75ms (hover states)
 * - `fast` - 150ms (button presses)
 * - `normal` - 200ms (default)
 * - `slow` - 300ms (page transitions)
 * - `deliberate` - 500ms (emphasis)
 * 
 * @example
 * ```tsx
 * <Transition 
 *   in={isOpen} 
 *   animation="heavy" 
 *   duration="slow"
 * >
 *   <Modal />
 * </Transition>
 * ```
 */
