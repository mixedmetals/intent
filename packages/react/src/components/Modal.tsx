/**
 * ============================================================================
 * Modal Component - Elevated Archetype Implementation
 * ============================================================================
 * 
 * Dialog overlay using the elevated surface archetype with backdrop blur.
 * Highest elevation level with multi-layered ambient shadows.
 * 
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={handleClose} size="md">
 *   <ModalHeader title="Confirm Action" />
 *   <ModalContent>Are you sure you want to proceed?</ModalContent>
 *   <ModalFooter>
 *     <Button importance="ghost" onClick={handleClose}>Cancel</Button>
 *     <Button importance="primary" onClick={handleConfirm}>Confirm</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */

import React, { forwardRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../utils/cx.js';

// ============================================================================
// Types
// ============================================================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Controls modal visibility */
  open: boolean;
  
  /** Callback when modal should close (backdrop click, escape key) */
  onClose: () => void;
  
  /** Modal content */
  children: React.ReactNode;
  
  /** Width constraint */
  size?: ModalSize;
  
  /** Prevents closing on backdrop click */
  persistent?: boolean;
  
  /** Hides the close button in header */
  hideCloseButton?: boolean;
}

export interface ModalHeaderProps {
  /** Dialog title */
  title?: React.ReactNode;
  
  /** Optional description/subtitle */
  description?: React.ReactNode;
  
  /** Custom action element (replaces close button) */
  action?: React.ReactNode;
  
  /** Callback when close is triggered */
  onClose?: () => void;
  
  /** Hides close button */
  hideCloseButton?: boolean;
}

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Removes default padding */
  flush?: boolean;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content alignment */
  align?: 'start' | 'center' | 'end' | 'space-between';
}

// ============================================================================
// Components
// ============================================================================

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  function Modal(
    {
      open,
      onClose,
      children,
      size = 'md',
      persistent = false,
      hideCloseButton = false,
    },
    ref
  ) {
    // Handle escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape' && !persistent) {
        onClose();
      }
    }, [onClose, persistent]);

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [open, handleKeyDown]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !persistent) {
        onClose();
      }
    };

    if (!open) return null;

    return createPortal(
      <div
        className="intent-modal-overlay"
        onClick={handleBackdropClick}
        data-intent-component="modal"
        data-intent-archetype="elevated"
        data-intent-size={size}
      >
        <div
          ref={ref}
          className={cx('intent-modal', `intent-modal--size-${size}`)}
          role="dialog"
          aria-modal="true"
        >
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === ModalHeader) {
              return React.cloneElement(child as React.ReactElement<ModalHeaderProps>, {
                onClose,
                hideCloseButton,
              });
            }
            return child;
          })}
        </div>
      </div>,
      document.body
    );
  }
);

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader({ title, description, action, onClose, hideCloseButton }, ref) {
    return (
      <div ref={ref} className="intent-modal__header">
        <div className="intent-modal__header-text">
          {title && <h2 className="intent-modal__title">{title}</h2>}
          {description && <p className="intent-modal__description">{description}</p>}
        </div>
        {(action || !hideCloseButton) && (
          <div className="intent-modal__header-action">
            {action || (
              <button
                type="button"
                className="intent-modal__close"
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent({ flush = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('intent-modal__content', flush && 'intent-modal__content--flush', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter({ align = 'end', children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cx('intent-modal__footer', `intent-modal__footer--align-${align}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Close icon component
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 3L8 8M8 8L3 13M8 8L13 3M8 8L13 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ============================================================================
// Schema Definition
// ============================================================================

export const ModalSchema = {
  name: 'Modal',
  archetype: 'elevated',
  description: 'Dialog overlay using elevated archetype with backdrop blur and highest elevation',
  properties: {
    open: {
      type: 'boolean',
      required: true,
      description: 'Controls modal visibility',
    },
    onClose: {
      type: 'function',
      required: true,
      description: 'Callback when modal should close',
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg', 'xl', 'full'],
      default: 'md',
      description: 'Width constraint - affects max-width token',
    },
    persistent: {
      type: 'boolean',
      default: false,
      description: 'Prevents closing on backdrop click or escape key',
    },
  },
  constraints: [
    {
      when: { persistent: true },
      require: { onClose: 'function' },
      message: 'Persistent modals must still provide onClose for the close button',
    },
  ],
  tokens: {
    background: '--intent-surface-elevated-bg',
    border: '--intent-surface-elevated-border',
    shadow: '--intent-surface-elevated-shadow', // Enhanced in CSS
    backdrop: '--intent-surface-elevated-backdrop',
    overlayBackground: 'oklch(5% 0 0 / 0.7)',
    padding: '--intent-density-padding',
    gap: '--intent-density-gap',
  },
  subComponents: ['ModalHeader', 'ModalContent', 'ModalFooter'],
};

export default Object.assign(Modal, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
  schema: ModalSchema,
});
