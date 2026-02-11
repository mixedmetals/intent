import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface AspectRatioProps {
  /** Aspect ratio preset */
  ratio?: 'auto' | 'square' | 'video' | 'portrait' | 'landscape' | 'widescreen' | 'ultrawide';
  /** Object fit behavior for child media */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position for child media */
  position?: 'top' | 'bottom' | 'center' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom';
  /** Child elements (typically img, video, or iframe) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * AspectRatio - Maintains consistent aspect ratio for media content
 * 
 * Useful for images, videos, embeds, and responsive containers.
 * 
 * @example
 * ```tsx
 * // Video embed
 * <AspectRatio ratio="video">
 *   <iframe src="..." />
 * </AspectRatio>
 * 
 * // Square image
 * <AspectRatio ratio="square">
 *   <img src="..." alt="..." />
 * </AspectRatio>
 * 
 * // Cover image
 * <AspectRatio ratio="landscape" fit="cover">
 *   <img src="..." />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = createComponent<AspectRatioProps>('AspectRatio', {
  ratio: 'auto',
  fit: 'cover',
  position: 'center',
});

// Convenience exports
export default AspectRatio;
