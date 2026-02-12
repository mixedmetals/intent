import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: 'text' | 'circle' | 'rectangle';
  /** Height preset */
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  /** Width preset */
  width?: 'auto' | 'full' | 'sm' | 'md' | 'lg';
  /** Custom CSS height */
  style?: React.CSSProperties;
  /** Additional className */
  className?: string;
}

/**
 * Skeleton - Content loading placeholder
 * 
 * @example
 * ```tsx
 * // Text skeleton (default)
 * <Skeleton />
 * 
 * // Text with custom width
 * <Skeleton width="lg" />
 * 
 * // Circle (for avatars)
 * <Skeleton variant="circle" width="md" height="md" />
 * 
 * // Rectangle
 * <Skeleton variant="rectangle" height="lg" />
 * 
 * // Full width
 * <Skeleton width="full" height="sm" />
 * 
 * // Card skeleton pattern
 * <Stack gap="4">
 *   <Skeleton variant="circle" width="md" height="md" />
 *   <Skeleton width="lg" />
 *   <Skeleton width="full" />
 *   <Skeleton width="full" />
 * </Stack>
 * ```
 */
export const Skeleton = createComponent<SkeletonProps>('Skeleton', {
  variant: 'text',
  height: 'auto',
  width: 'auto',
});

// Convenience component for skeleton groups
export interface SkeletonTextProps {
  lines?: number;
  /** Last line width */
  lastLineWidth?: 'full' | 'sm' | 'md' | 'lg';
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 3, 
  lastLineWidth = 'md' 
}) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          width={i === lines - 1 ? lastLineWidth : 'full'} 
          height="sm"
        />
      ))}
    </div>
  );
};

export default Skeleton;
