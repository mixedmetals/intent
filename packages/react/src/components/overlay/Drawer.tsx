import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface DrawerProps {
  /** Drawer placement */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether drawer is open */
  isOpen?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Drawer title */
  title?: string;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Drawer content */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Drawer - Side panel overlay that slides in
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * // Right drawer (default)
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <p>Drawer content</p>
 * </Drawer>
 * 
 * // Left drawer
 * <Drawer placement="left" isOpen={isOpen} onClose={close}>
 *   Left side content
 * </Drawer>
 * 
 * // Top drawer
 * <Drawer placement="top" isOpen={isOpen} onClose={close}>
 *   Top panel content
 * </Drawer>
 * 
 * // With title
 * <Drawer 
 *   isOpen={isOpen} 
 *   onClose={close}
 *   title="Navigation"
 *   placement="left"
 * >
 *   <nav>...</nav>
 * </Drawer>
 * 
 * // Different sizes
 * <Drawer size="sm" isOpen={isOpen} onClose={close}>
 *   Small drawer
 * </Drawer>
 * 
 * <Drawer size="lg" isOpen={isOpen} onClose={close}>
 *   Large drawer
 * </Drawer>
 * ```
 */
export const Drawer = createComponent<DrawerProps>('Drawer', {
  placement: 'right',
  size: 'md',
  isOpen: false,
  closeOnOverlayClick: true,
});

export default Drawer;
