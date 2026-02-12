import React, { useEffect, useRef } from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ModalProps {
  /** Modal size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Modal placement */
  placement?: 'center' | 'top';
  /** Scroll behavior */
  scrollBehavior?: 'inside' | 'outside';
  /** Whether modal is open */
  isOpen?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Modal title */
  title?: string;
  /** Show close button */
  closeOnOverlayClick?: boolean;
  /** Modal content */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Modal - Focus-trapped overlay dialog
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <p>Modal content goes here.</p>
 * </Modal>
 * 
 * // With title
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * 
 * // Different sizes
 * <Modal size="sm" isOpen={isOpen} onClose={close}>
 *   Small modal
 * </Modal>
 * 
 * <Modal size="lg" isOpen={isOpen} onClose={close}>
 *   Large modal
 * </Modal>
 * 
 * // Full screen
 * <Modal size="full" isOpen={isOpen} onClose={close}>
 *   Full screen content
 * </Modal>
 * ```
 */
export const Modal = createComponent<ModalProps>('Modal', {
  size: 'md',
  placement: 'center',
  scrollBehavior: 'inside',
  isOpen: false,
  closeOnOverlayClick: true,
});

export default Modal;
