import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface TooltipProps {
  /** Tooltip placement */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** Tooltip size */
  size?: 'sm' | 'md';
  /** Whether tooltip is open (controlled) */
  isOpen?: boolean;
  /** Tooltip content */
  label: string;
  /** Child element that triggers tooltip */
  children: React.ReactElement;
  /** Delay before showing (ms) */
  openDelay?: number;
  /** Delay before hiding (ms) */
  closeDelay?: number;
  /** Additional className */
  className?: string;
}

/**
 * Tooltip - Hover information popup
 * 
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip label="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * 
 * // Different placements
 * <Tooltip label="Top tooltip" placement="top">
 *   <span>Top</span>
 * </Tooltip>
 * 
 * <Tooltip label="Right tooltip" placement="right">
 *   <span>Right</span>
 * </Tooltip>
 * 
 * <Tooltip label="Bottom tooltip" placement="bottom">
 *   <span>Bottom</span>
 * </Tooltip>
 * 
 * <Tooltip label="Left tooltip" placement="left">
 *   <span>Left</span>
 * </Tooltip>
 * 
 * // With delay
 * <Tooltip label="Delayed" openDelay={500} closeDelay={200}>
 *   <Button>Hover with delay</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = createComponent<TooltipProps>('Tooltip', {
  placement: 'top',
  size: 'md',
  openDelay: 0,
  closeDelay: 0,
});

export default Tooltip;
