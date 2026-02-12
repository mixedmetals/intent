// ============================================================================
// Feedback Component Schemas
// ============================================================================

import { defineComponent } from './define.js';

// ============================================================================
// Alert
// ============================================================================

export const AlertSchema = defineComponent({
  name: 'Alert',
  description: 'Status messages for info, success, warning, and error states',
  properties: {
    status: { type: 'enum', values: ['info', 'success', 'warning', 'error'], default: 'info' },
    variant: { type: 'enum', values: ['subtle', 'solid', 'left-accent', 'top-accent'], default: 'subtle' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    dismissible: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Status colors - Subtle variant (default)
    'status=info,variant=subtle': {
      backgroundColor: 'var(--intent-color-blue-50)',
      borderColor: 'var(--intent-color-blue-200)',
      color: 'var(--intent-color-blue-800)',
    },
    'status=success,variant=subtle': {
      backgroundColor: 'var(--intent-color-green-50)',
      borderColor: 'var(--intent-color-green-200)',
      color: 'var(--intent-color-green-800)',
    },
    'status=warning,variant=subtle': {
      backgroundColor: 'var(--intent-color-amber-50)',
      borderColor: 'var(--intent-color-amber-200)',
      color: 'var(--intent-color-amber-800)',
    },
    'status=error,variant=subtle': {
      backgroundColor: 'var(--intent-color-red-50)',
      borderColor: 'var(--intent-color-red-200)',
      color: 'var(--intent-color-red-800)',
    },
    
    // Solid variant
    'status=info,variant=solid': {
      backgroundColor: 'var(--intent-color-blue-500)',
      borderColor: 'var(--intent-color-blue-500)',
      color: 'white',
    },
    'status=success,variant=solid': {
      backgroundColor: 'var(--intent-color-green-500)',
      borderColor: 'var(--intent-color-green-500)',
      color: 'white',
    },
    'status=warning,variant=solid': {
      backgroundColor: 'var(--intent-color-amber-500)',
      borderColor: 'var(--intent-color-amber-500)',
      color: 'white',
    },
    'status=error,variant=solid': {
      backgroundColor: 'var(--intent-color-red-500)',
      borderColor: 'var(--intent-color-red-500)',
      color: 'white',
    },
    
    // Left accent variant
    'variant=left-accent': {
      borderLeftWidth: '4px',
    },
    
    // Top accent variant
    'variant=top-accent': {
      borderTopWidth: '4px',
    },
    
    // Sizes
    'size=sm': { padding: '0.75rem', fontSize: '0.875rem' },
    'size=md': { padding: '1rem', fontSize: '1rem' },
    'size=lg': { padding: '1.25rem', fontSize: '1.125rem' },
  },
  baseStyles: {
    border: '1px solid',
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
});

// ============================================================================
// Toast
// ============================================================================

export const ToastSchema = defineComponent({
  name: 'Toast',
  description: 'Temporary notification that auto-dismisses',
  properties: {
    status: { type: 'enum', values: ['info', 'success', 'warning', 'error'], default: 'info' },
    variant: { type: 'enum', values: ['subtle', 'solid'], default: 'solid' },
    position: { type: 'enum', values: ['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left'], default: 'bottom-right' },
  },
  constraints: [],
  mappings: {
    // Status colors
    'status=info,variant=solid': {
      backgroundColor: 'var(--intent-color-blue-500)',
      color: 'white',
    },
    'status=success,variant=solid': {
      backgroundColor: 'var(--intent-color-green-500)',
      color: 'white',
    },
    'status=warning,variant=solid': {
      backgroundColor: 'var(--intent-color-amber-500)',
      color: 'white',
    },
    'status=error,variant=solid': {
      backgroundColor: 'var(--intent-color-red-500)',
      color: 'white',
    },
    
    // Positions
    'position=top': { position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'position=top-right': { position: 'fixed', top: '1rem', right: '1rem' },
    'position=top-left': { position: 'fixed', top: '1rem', left: '1rem' },
    'position=bottom': { position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'position=bottom-right': { position: 'fixed', bottom: '1rem', right: '1rem' },
    'position=bottom-left': { position: 'fixed', bottom: '1rem', left: '1rem' },
  },
  baseStyles: {
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: '300px',
    maxWidth: '500px',
    zIndex: '50',
  },
});

// ============================================================================
// Progress
// ============================================================================

export const ProgressSchema = defineComponent({
  name: 'Progress',
  description: 'Linear and circular progress indicators',
  properties: {
    variant: { type: 'enum', values: ['linear', 'circular'], default: 'linear' },
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg'], default: 'md' },
    color: { type: 'enum', values: ['blue', 'green', 'amber', 'red', 'neutral'], default: 'blue' },
    indeterminate: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Sizes - Linear
    'variant=linear,size=xs': { height: '0.25rem' },
    'variant=linear,size=sm': { height: '0.5rem' },
    'variant=linear,size=md': { height: '0.75rem' },
    'variant=linear,size=lg': { height: '1rem' },
    
    // Sizes - Circular
    'variant=circular,size=xs': { width: '1rem', height: '1rem' },
    'variant=circular,size=sm': { width: '1.5rem', height: '1.5rem' },
    'variant=circular,size=md': { width: '2rem', height: '2rem' },
    'variant=circular,size=lg': { width: '3rem', height: '3rem' },
    
    // Colors
    'color=blue': { '--progress-color': 'var(--intent-color-blue-500)' },
    'color=green': { '--progress-color': 'var(--intent-color-green-500)' },
    'color=amber': { '--progress-color': 'var(--intent-color-amber-500)' },
    'color=red': { '--progress-color': 'var(--intent-color-red-500)' },
    'color=neutral': { '--progress-color': 'var(--intent-color-neutral-500)' },
  },
  baseStyles: {
    width: '100%',
    backgroundColor: 'var(--intent-color-neutral-200)',
    borderRadius: '9999px',
    overflow: 'hidden',
  },
});

// ============================================================================
// Spinner
// ============================================================================

export const SpinnerSchema = defineComponent({
  name: 'Spinner',
  description: 'Loading spinner indicator',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    color: { type: 'enum', values: ['current', 'blue', 'green', 'amber', 'red', 'neutral'], default: 'current' },
    thickness: { type: 'enum', values: ['thin', 'normal', 'thick'], default: 'normal' },
  },
  constraints: [],
  mappings: {
    'size=xs': { width: '0.75rem', height: '0.75rem' },
    'size=sm': { width: '1rem', height: '1rem' },
    'size=md': { width: '1.5rem', height: '1.5rem' },
    'size=lg': { width: '2rem', height: '2rem' },
    'size=xl': { width: '3rem', height: '3rem' },
    
    'color=current': { color: 'currentColor' },
    'color=blue': { color: 'var(--intent-color-blue-500)' },
    'color=green': { color: 'var(--intent-color-green-500)' },
    'color=amber': { color: 'var(--intent-color-amber-500)' },
    'color=red': { color: 'var(--intent-color-red-500)' },
    'color=neutral': { color: 'var(--intent-color-neutral-500)' },
    
    'thickness=thin': { borderWidth: '1px' },
    'thickness=normal': { borderWidth: '2px' },
    'thickness=thick': { borderWidth: '4px' },
  },
  baseStyles: {
    display: 'inline-block',
    borderRadius: '50%',
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    animation: 'spin 1s linear infinite',
  },
});

// ============================================================================
// Skeleton
// ============================================================================

export const SkeletonSchema = defineComponent({
  name: 'Skeleton',
  description: 'Content loading placeholder',
  properties: {
    variant: { type: 'enum', values: ['text', 'circle', 'rectangle'], default: 'text' },
    height: { type: 'enum', values: ['auto', 'sm', 'md', 'lg', 'xl'], default: 'auto' },
    width: { type: 'enum', values: ['auto', 'full', 'sm', 'md', 'lg'], default: 'auto' },
  },
  constraints: [],
  mappings: {
    'variant=text': { borderRadius: '0.25rem' },
    'variant=circle': { borderRadius: '50%' },
    'variant=rectangle': { borderRadius: '0.375rem' },
    
    'height=sm': { height: '1rem' },
    'height=md': { height: '1.5rem' },
    'height=lg': { height: '2rem' },
    'height=xl': { height: '3rem' },
    
    'width=full': { width: '100%' },
    'width=sm': { width: '3rem' },
    'width=md': { width: '6rem' },
    'width=lg': { width: '12rem' },
  },
  baseStyles: {
    backgroundColor: 'var(--intent-color-neutral-200)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
});

// ============================================================================
// Export all feedback schemas
// ============================================================================

export const FeedbackSchemas = {
  Alert: AlertSchema,
  Toast: ToastSchema,
  Progress: ProgressSchema,
  Spinner: SpinnerSchema,
  Skeleton: SkeletonSchema,
};
