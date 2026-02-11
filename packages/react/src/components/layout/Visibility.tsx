import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ShowProps {
  /** Breakpoint and above where content is visible */
  above: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export interface HideProps {
  /** Breakpoint and above where content is hidden */
  above: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Show - Shows content at specified breakpoint and up
 * 
 * Content is hidden below the breakpoint, visible at and above.
 * 
 * @example
 * ```tsx
 * // Show on tablet and up
 * <Show above="md">
 *   <DesktopNavigation />
 * </Show>
 * 
 * // Show on large screens only
 * <Show above="lg">
 *   <Sidebar />
 * </Show>
 * ```
 */
export const Show = createComponent<ShowProps>('Show', {});

/**
 * Hide - Hides content at specified breakpoint and up
 * 
 * Content is visible below the breakpoint, hidden at and above.
 * 
 * @example
 * ```tsx
 * // Hide on tablet and up (mobile only)
 * <Hide above="md">
 *   <MobileMenu />
 * </Hide>
 * 
 * // Hide on large screens
 * <Hide above="lg">
 *   <CompactView />
 * </Hide>
 * ```
 */
export const Hide = createComponent<HideProps>('Hide', {});

// Convenience exports
export { Show, Hide };
