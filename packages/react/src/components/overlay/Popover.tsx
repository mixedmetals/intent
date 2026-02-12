import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface PopoverProps {
  /** Popover placement */
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  /** Popover size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether popover is open (controlled) */
  isOpen?: boolean;
  /** Open handler */
  onOpen?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Close on click outside */
  closeOnBlur?: boolean;
  /** Trigger element */
  children: React.ReactElement;
  /** Popover content */
  content: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Popover - Click-triggered content popup
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * // Basic popover
 * <Popover 
 *   content={<div>Popover content</div>}
 *   isOpen={isOpen}
 *   onOpen={() => setIsOpen(true)}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <Button>Click me</Button>
 * </Popover>
 * 
 * // Different placements
 * <Popover content="Right content" placement="right">
 *   <Button>Right</Button>
 * </Popover>
 * 
 * <Popover content="Bottom content" placement="bottom">
 *   <Button>Bottom</Button>
 * </Popover>
 * 
 * // Sizes
 * <Popover content="Small" size="sm">
 *   <Button>Small</Button>
 * </Popover>
 * 
 * <Popover content="Large content..." size="lg">
 *   <Button>Large</Button>
 * </Popover>
 * ```
 */
export const Popover = createComponent<PopoverProps>('Popover', {
  placement: 'bottom',
  size: 'md',
  closeOnBlur: true,
});

export default Popover;
