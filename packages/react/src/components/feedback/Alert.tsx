import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface AlertProps {
  /** Alert status/color */
  status?: 'info' | 'success' | 'warning' | 'error';
  /** Visual variant */
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
  /** Alert size */
  size?: 'sm' | 'md' | 'lg';
  /** Show dismiss button */
  dismissible?: boolean;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Alert title (optional) */
  title?: string;
  /** Alert content */
  children?: React.ReactNode;
  /** Icon override (optional) */
  icon?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Alert - Status messages for info, success, warning, and error states
 * 
 * @example
 * ```tsx
 * // Basic alert
 * <Alert>Information message</Alert>
 * 
 * // Status variants
 * <Alert status="success">Operation completed successfully!</Alert>
 * <Alert status="warning">Please review your input.</Alert>
 * <Alert status="error">An error occurred.</Alert>
 * 
 * // With title
 * <Alert status="info" title="Did you know?">
 *   You can customize these alerts.
 * </Alert>
 * 
 * // Dismissible
 * <Alert dismissible onDismiss={() => console.log('dismissed')}>
 *   Click the X to dismiss this alert.
 * </Alert>
 * 
 * // Solid variant
 * <Alert status="success" variant="solid">
 *   Solid background style
 * </Alert>
 * 
 * // Accent variants
 * <Alert status="warning" variant="left-accent">
 *   Left border accent style
 * </Alert>
 * ```
 */
export const Alert = createComponent<AlertProps>('Alert', {
  status: 'info',
  variant: 'subtle',
  size: 'md',
  dismissible: false,
});

export default Alert;
