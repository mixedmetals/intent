import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface SpacerProps {
  /** Size of the spacer */
  size?: '0' | 'px' | '0.5' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '64' | '80' | '96';
  /** Make spacer horizontal */
  horizontal?: boolean;
  /** Grow to fill available space */
  grow?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Spacer - Flexible spacing element
 * 
 * Creates fixed or flexible space in layouts.
 * 
 * @example
 * ```tsx
 * // Vertical spacing
 * <div>
 *   <h1>Title</h1>
 *   <Spacer size="4" />
 *   <p>Content below with space</p>
 * </div>
 * 
 * // Horizontal spacing
 * <div style={{ display: 'flex' }}>
 *   <span>Left</span>
 *   <Spacer size="4" horizontal />
 *   <span>Right</span>
 * </div>
 * 
 * // Flexible spacer to push content apart
 * <div style={{ display: 'flex' }}>
 *   <span>Left</span>
 *   <Spacer grow />
 *   <span>Right</span>
 * </div>
 * 
 * // Stack with consistent spacing
 * <Stack gap="0">
 *   <Item />
 *   <Spacer size="4" />
 *   <Item />
 *   <Spacer size="4" />
 *   <Item />
 * </Stack>
 * ```
 */
export const Spacer = createComponent<SpacerProps>('Spacer', {
  size: '4',
  horizontal: false,
  grow: false,
});

// Convenience exports
export default Spacer;
