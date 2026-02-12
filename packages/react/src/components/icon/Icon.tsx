/**
 * ============================================================================
 * Intent Icon Component
 * ============================================================================
 * 
 * SVG icon component with precision cap-height alignment.
 * 
 * Philosophy:
 * - Icons should visually center with text, not just sit at text-baseline.
 * - Cap-height alignment puts the icon's visual center at the text's cap-height.
 * - This creates optically balanced icon+text pairs.
 * 
 * Schema Example:
 * ```
 * properties: {
 *   icon: { type: 'enum', values: Object.keys(iconRegistry) },
 *   iconSize: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', 'inherit'] },
 *   iconAlignment: { type: 'enum', values: ['cap', 'center', 'baseline'] }
 * }
 * 
 * // Usage:
 * <Icon name="plus" size="md" />
 * <Button icon="arrowRight">Next</Button>
 * ```
 */

import React, { forwardRef, useMemo } from 'react';
import { getIcon, IconSizeScale, type IconSize, type IconDefinition } from './registry.js';
import { cx } from '../../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon name from registry */
  name: string;
  
  /** Size preset (default: 'inherit' to match parent text) */
  size?: IconSize;
  
  /** Custom size (overrides size preset) */
  width?: string | number;
  height?: string | number;
  
  /** 
   * Vertical alignment strategy:
   * - 'cap': Align to cap-height (default, best for inline text)
   * - 'center': Center vertically
   * - 'baseline': Align to text baseline
   */
  alignment?: 'cap' | 'center' | 'baseline';
  
  /** Additional CSS class */
  className?: string;
  
  /** Accessible label (required unless icon is decorative) */
  label?: string;
  
  /** Whether icon is purely decorative (hides from screen readers) */
  decorative?: boolean;
  
  /** Rotation angle in degrees */
  rotate?: number;
  
  /** Flip horizontally */
  flipHorizontal?: boolean;
  
  /** Flip vertically */
  flipVertical?: boolean;
  
  /** Animation on hover */
  animate?: 'none' | 'pulse' | 'spin' | 'bounce';
}

// ============================================================================
// Cap Height Alignment Calculation
// ============================================================================

/**
 * Calculate the vertical offset needed for cap-height alignment.
 * 
 * The cap-height is the height of uppercase letters (like 'H') from the baseline.
 * Standard fonts have cap-height around 70-75% of font-size.
 * 
 * For icon alignment:
 * 1. Icon's visual center should align with text's cap-height center
 * 2. This requires offsetting from the baseline by: (capHeight - iconSize) / 2 + overshoot
 * 
 * Default cap-height ratio: 0.73 (matches Inter, SF Pro, etc.)
 */
const CAP_HEIGHT_RATIO = 0.73;

/**
 * Get the CSS transform for cap-height alignment.
 * 
 * @param iconSize - Size of the icon
 * @param offset - Custom cap-height offset (0-1, from icon definition)
 */
function getCapHeightOffset(iconSize: number, offset: number = 0.5): string {
  // Calculate where the cap-height center is relative to the font size
  // The icon needs to be offset upward from baseline to sit at cap-height center
  const capHeightCenter = CAP_HEIGHT_RATIO * 0.5;
  const iconCenter = offset;
  const verticalShift = (capHeightCenter - iconCenter) * iconSize;
  
  return `translateY(${verticalShift.toFixed(3)}em)`;
}

// ============================================================================
// Component
// ============================================================================

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  function Icon(
    {
      name,
      size = 'inherit',
      width,
      height,
      alignment = 'cap',
      className,
      label,
      decorative = false,
      rotate,
      flipHorizontal,
      flipVertical,
      animate = 'none',
      style,
      ...props
    },
    ref
  ) {
    // Get icon definition from registry
    const icon = useMemo(() => getIcon(name), [name]);
    
    if (!icon) {
      console.warn(`[Intent] Icon "${name}" not found in registry`);
      return null;
    }
    
    // Calculate dimensions
    const sizeValue = size === 'inherit' ? '1em' : IconSizeScale[size];
    const finalWidth = width ?? sizeValue;
    const finalHeight = height ?? sizeValue;
    
    // Build transform string for alignment and effects
    const transforms: string[] = [];
    
    // Cap-height alignment
    if (alignment === 'cap') {
      transforms.push(getCapHeightOffset(1, icon.capHeightOffset));
    } else if (alignment === 'center') {
      transforms.push('translateY(-0.1em)'); // Optical adjustment for center alignment
    }
    // baseline: no transform needed
    
    // Rotation
    if (rotate) {
      transforms.push(`rotate(${rotate}deg)`);
    }
    
    // Flips
    if (flipHorizontal) {
      transforms.push('scaleX(-1)');
    }
    if (flipVertical) {
      transforms.push('scaleY(-1)');
    }
    
    // Combine transforms
    const transform = transforms.length > 0 ? transforms.join(' ') : undefined;
    
    // Determine if stroke-based or fill-based
    const isStrokeBased = icon.stroke ?? false;
    
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={icon.viewBox}
        width={finalWidth}
        height={finalHeight}
        fill={isStrokeBased ? 'none' : 'currentColor'}
        stroke={isStrokeBased ? 'currentColor' : undefined}
        strokeWidth={isStrokeBased ? icon.strokeWidth : undefined}
        strokeLinecap={isStrokeBased ? 'round' : undefined}
        strokeLinejoin={isStrokeBased ? 'round' : undefined}
        aria-hidden={decorative ? true : undefined}
        aria-label={!decorative ? label : undefined}
        role={!decorative ? 'img' : undefined}
        className={cx(
          'intent-icon',
          `intent-icon--${alignment}`,
          animate !== 'none' && `intent-icon--animate-${animate}`,
          className
        )}
        style={{
          display: 'inline-block',
          flexShrink: 0,
          verticalAlign: alignment === 'baseline' ? 'baseline' : 'middle',
          transform,
          transformOrigin: 'center',
          ...style,
        }}
        data-intent-icon={name}
        {...props}
      >
        {icon.paths ? (
          // Multiple paths
          icon.paths.map((path, index) => (
            <path key={index} d={path} />
          ))
        ) : (
          // Single path
          <path d={icon.path} />
        )}
      </svg>
    );
  }
);

// ============================================================================
// Convenience Exports
// ============================================================================

/**
 * Icon with text - pre-configured for inline text usage.
 */
export interface IconTextProps extends Omit<IconProps, 'alignment'> {
  /** Gap between icon and text */
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  /** Icon position relative to text */
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export const IconText = forwardRef<HTMLSpanElement, IconTextProps>(
  function IconText(
    { gap = 'sm', position = 'left', children, ...iconProps },
    ref
  ) {
    const gapMap = {
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
    };
    
    return (
      <span
        ref={ref}
        className="intent-icon-text"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: gapMap[gap],
          flexDirection: position === 'left' ? 'row' : 'row-reverse',
        }}
      >
        <Icon {...iconProps} alignment="cap" />
        <span>{children}</span>
      </span>
    );
  }
);

// ============================================================================
// Export
// ============================================================================

export default Icon;
