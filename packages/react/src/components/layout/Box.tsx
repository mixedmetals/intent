import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface BoxProps {
  /** Display type */
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  /** Position type */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Width */
  width?: 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '1/12' | '2/12' | '3/12' | '4/12' | '5/12' | '6/12' | '7/12' | '8/12' | '9/12' | '10/12' | '11/12';
  /** Height */
  height?: 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '2/6' | '3/6' | '4/6' | '5/6';
  /** Minimum width */
  minWidth?: '0' | 'full' | 'min' | 'max' | 'fit';
  /** Maximum width */
  maxWidth?: 'none' | 'full' | 'screen' | 'min' | 'max' | 'fit' | 'prose';
  /** Minimum height */
  minHeight?: '0' | 'full' | 'screen' | 'min' | 'max' | 'fit';
  /** Maximum height */
  maxHeight?: 'none' | 'full' | 'screen' | 'min' | 'max' | 'fit';
  /** Inset (top/right/bottom/left) for positioned elements */
  inset?: '0' | 'auto' | '1/2' | 'full' | 'px';
  /** Z-index */
  zIndex?: 'auto' | '0' | '10' | '20' | '30' | '40' | '50';
  /** Overflow behavior */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Box - Generic layout primitive
 * 
 * A flexible wrapper component for layout control with display, position,
 * width, height, overflow, and z-index props.
 * 
 * @example
 * ```tsx
 * // Basic box with dimensions
 * <Box width="full" height="64" display="flex">
 *   Content
 * </Box>
 * 
 * // Positioned element
 * <Box position="absolute" inset="0" zIndex="50">
 *   Overlay
 * </Box>
 * 
 * // Responsive sizing
 * <Box width="1/2" minWidth="64" maxWidth="prose">
 *   Constrained width
 * </Box>
 * ```
 */
export const Box = createComponent<BoxProps>('Box', {
  display: 'block',
  position: 'static',
  width: 'auto',
  height: 'auto',
  minWidth: '0',
  maxWidth: 'none',
  minHeight: '0',
  maxHeight: 'none',
  inset: 'auto',
  zIndex: 'auto',
  overflow: 'visible',
});

// Convenience exports
export default Box;
