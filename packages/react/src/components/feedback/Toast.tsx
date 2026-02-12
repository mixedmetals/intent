import * as React from 'react';
import { clsx, styleAttr } from '../../utils/classname.js';

// ============================================================================
// Types
// ============================================================================

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'subtle' | 'solid';
  duration?: number;
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: ToastItem;
  onDismiss?: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ============================================================================
// Toast Context
// ============================================================================

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// ============================================================================
// Toast Provider
// ============================================================================

export function ToastProvider({ 
  children, 
  position = 'bottom-right' 
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...item, id }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = React.useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ============================================================================
// Toast Container
// ============================================================================

interface ToastContainerProps {
  toasts: ToastItem[];
  position: ToastProviderProps['position'];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, position, onDismiss }: ToastContainerProps) {
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
  };

  return (
    <div
      className="intent-toast-container"
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: position?.startsWith('bottom') ? 'column-reverse' : 'column',
        gap: '0.5rem',
        ...positionStyles[position || 'bottom-right'],
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// ============================================================================
// Toast Component
// ============================================================================

export function Toast({ toast, onDismiss }: ToastProps) {
  const { id, title, description, status = 'info', variant = 'subtle', duration = 5000 } = toast;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const icons = {
    info: <InfoIcon />,
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  return (
    <div
      className={clsx('intent-toast')}
      data-status={status}
      data-variant={variant}
      role="alert"
      {...styleAttr({})}
    >
      <span className="intent-toast-icon">{icons[status]}</span>
      <div className="intent-toast-content">
        <div className="intent-toast-title">{title}</div>
        {description && <div className="intent-toast-description">{description}</div>}
      </div>
      <button
        type="button"
        className="intent-toast-close"
        onClick={() => onDismiss?.(id)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

// ============================================================================
// Icons
// ============================================================================

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );
}
