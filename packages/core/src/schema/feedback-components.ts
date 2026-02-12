// ============================================================================
// Feedback Component Schemas
// ============================================================================

import { defineComponent } from './define.js';

// ============================================================================
// Alert (Enhanced)
// ============================================================================

export const AlertSchema = defineComponent({
  name: 'Alert',
  description: 'Status message with subtle/solid/accent variants',
  properties: {
    status: { type: 'enum', values: ['info', 'success', 'warning', 'error'], default: 'info' },
    variant: { type: 'enum', values: ['subtle', 'solid', 'accent', 'outline'], default: 'subtle' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    dismissible: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Status colors for subtle variant
    'status=info,variant=subtle': { backgroundColor: 'var(--intent-color-info-50)', color: 'var(--intent-color-info-800)', borderColor: 'var(--intent-color-info-200)' },
    'status=success,variant=subtle': { backgroundColor: 'var(--intent-color-success-50)', color: 'var(--intent-color-success-800)', borderColor: 'var(--intent-color-success-200)' },
    'status=warning,variant=subtle': { backgroundColor: 'var(--intent-color-warning-50)', color: 'var(--intent-color-warning-800)', borderColor: 'var(--intent-color-warning-200)' },
    'status=error,variant=subtle': { backgroundColor: 'var(--intent-color-error-50)', color: 'var(--intent-color-error-800)', borderColor: 'var(--intent-color-error-200)' },
    
    // Status colors for solid variant
    'status=info,variant=solid': { backgroundColor: 'var(--intent-color-info-500)', color: 'white' },
    'status=success,variant=solid': { backgroundColor: 'var(--intent-color-success-500)', color: 'white' },
    'status=warning,variant=solid': { backgroundColor: 'var(--intent-color-warning-500)', color: 'white' },
    'status=error,variant=solid': { backgroundColor: 'var(--intent-color-error-500)', color: 'white' },
    
    // Status colors for accent variant (left border)
    'status=info,variant=accent': { backgroundColor: 'var(--intent-color-info-50)', color: 'var(--intent-color-info-800)', borderLeft: '4px solid var(--intent-color-info-500)' },
    'status=success,variant=accent': { backgroundColor: 'var(--intent-color-success-50)', color: 'var(--intent-color-success-800)', borderLeft: '4px solid var(--intent-color-success-500)' },
    'status=warning,variant=accent': { backgroundColor: 'var(--intent-color-warning-50)', color: 'var(--intent-color-warning-800)', borderLeft: '4px solid var(--intent-color-warning-500)' },
    'status=error,variant=accent': { backgroundColor: 'var(--intent-color-error-50)', color: 'var(--intent-color-error-800)', borderLeft: '4px solid var(--intent-color-error-500)' },
    
    // Status colors for outline variant
    'status=info,variant=outline': { backgroundColor: 'transparent', color: 'var(--intent-color-info-600)', border: '1px solid var(--intent-color-info-300)' },
    'status=success,variant=outline': { backgroundColor: 'transparent', color: 'var(--intent-color-success-600)', border: '1px solid var(--intent-color-success-300)' },
    'status=warning,variant=outline': { backgroundColor: 'transparent', color: 'var(--intent-color-warning-600)', border: '1px solid var(--intent-color-warning-300)' },
    'status=error,variant=outline': { backgroundColor: 'transparent', color: 'var(--intent-color-error-600)', border: '1px solid var(--intent-color-error-300)' },
    
    // Sizes
    'size=sm': { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    'size=md': { padding: '0.75rem 1rem', fontSize: '1rem' },
    'size=lg': { padding: '1rem 1.25rem', fontSize: '1.125rem' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid transparent',
  },
});

// ============================================================================
// Toast
// ============================================================================

export const ToastSchema = defineComponent({
  name: 'Toast',
  description: 'Temporary notification toast with auto-dismiss',
  properties: {
    status: { type: 'enum', values: ['info', 'success', 'warning', 'error'], default: 'info' },
    variant: { type: 'enum', values: ['subtle', 'solid'], default: 'subtle' },
    position: { type: 'enum', values: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'], default: 'bottom-right' },
    duration: { type: 'number', default: 5000 },
  },
  constraints: [],
  mappings: {
    // Same color mappings as Alert
    'status=info,variant=subtle': { backgroundColor: 'var(--intent-color-info-50)', color: 'var(--intent-color-info-800)', borderColor: 'var(--intent-color-info-200)' },
    'status=success,variant=subtle': { backgroundColor: 'var(--intent-color-success-50)', color: 'var(--intent-color-success-800)', borderColor: 'var(--intent-color-success-200)' },
    'status=warning,variant=subtle': { backgroundColor: 'var(--intent-color-warning-50)', color: 'var(--intent-color-warning-800)', borderColor: 'var(--intent-color-warning-200)' },
    'status=error,variant=subtle': { backgroundColor: 'var(--intent-color-error-50)', color: 'var(--intent-color-error-800)', borderColor: 'var(--intent-color-error-200)' },
    
    'status=info,variant=solid': { backgroundColor: 'var(--intent-color-info-500)', color: 'white' },
    'status=success,variant=solid': { backgroundColor: 'var(--intent-color-success-500)', color: 'white' },
    'status=warning,variant=solid': { backgroundColor: 'var(--intent-color-warning-500)', color: 'white' },
    'status=error,variant=solid': { backgroundColor: 'var(--intent-color-error-500)', color: 'white' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid transparent',
    minWidth: '300px',
    maxWidth: '500px',
  },
});

// ============================================================================
// Progress
// ============================================================================

export const ProgressSchema = defineComponent({
  name: 'Progress',
  description: 'Progress indicator (linear or circular)',
  properties: {
    type: { type: 'enum', values: ['linear', 'circular'], default: 'linear' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    color: { type: 'enum', values: ['primary', 'success', 'warning', 'error', 'neutral'], default: 'primary' },
    indeterminate: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'type=linear': { height: 'var(--progress-height, 0.5rem)' },
    'type=circular': {},
    
    'size=sm': { '--progress-height': '0.25rem', '--progress-size': '1rem' },
    'size=md': { '--progress-height': '0.5rem', '--progress-size': '2rem' },
    'size=lg': { '--progress-height': '0.75rem', '--progress-size': '3rem' },
    
    'color=primary': { '--progress-color': 'var(--intent-color-primary-500)' },
    'color=success': { '--progress-color': 'var(--intent-color-success-500)' },
    'color=warning': { '--progress-color': 'var(--intent-color-warning-500)' },
    'color=error': { '--progress-color': 'var(--intent-color-error-500)' },
    'color=neutral': { '--progress-color': 'var(--intent-color-neutral-500)' },
    
    'indeterminate=true': {},
  },
  baseStyles: {
    overflow: 'hidden',
    borderRadius: '9999px',
    backgroundColor: 'var(--intent-color-neutral-200)',
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
    color: { type: 'enum', values: ['primary', 'neutral', 'white'], default: 'primary' },
    thickness: { type: 'enum', values: ['thin', 'normal', 'thick'], default: 'normal' },
  },
  constraints: [],
  mappings: {
    'size=xs': { width: '0.75rem', height: '0.75rem' },
    'size=sm': { width: '1rem', height: '1rem' },
    'size=md': { width: '1.5rem', height: '1.5rem' },
    'size=lg': { width: '2rem', height: '2rem' },
    'size=xl': { width: '3rem', height: '3rem' },
    
    'color=primary': { borderColor: 'var(--intent-color-primary-500)', borderTopColor: 'transparent' },
    'color=neutral': { borderColor: 'var(--intent-color-neutral-500)', borderTopColor: 'transparent' },
    'color=white': { borderColor: 'white', borderTopColor: 'transparent' },
    
    'thickness=thin': { borderWidth: '1px' },
    'thickness=normal': { borderWidth: '2px' },
    'thickness=thick': { borderWidth: '4px' },
  },
  baseStyles: {
    display: 'inline-block',
    borderStyle: 'solid',
    borderRadius: '50%',
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
    variant: { type: 'enum', values: ['default', 'circle', 'text'], default: 'default' },
    animate: { type: 'boolean', default: true },
  },
  constraints: [],
  mappings: {
    'variant=default': {},
    'variant=circle': { borderRadius: '50%' },
    'variant=text': { borderRadius: '0.25rem' },
    'animate=true': { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
    'animate=false': { animation: 'none' },
  },
  baseStyles: {
    backgroundColor: 'var(--intent-color-neutral-200)',
  },
});

// ============================================================================
// Badge (Enhanced)
// ============================================================================

export const BadgeSchema = defineComponent({
  name: 'Badge',
  description: 'Status indicator badge with dot and count variants',
  properties: {
    variant: { type: 'enum', values: ['solid', 'subtle', 'outline', 'dot'], default: 'subtle' },
    color: { type: 'enum', values: ['neutral', 'primary', 'success', 'warning', 'error'], default: 'neutral' },
    size: { type: 'enum', values: ['sm', 'md'], default: 'md' },
  },
  constraints: [],
  mappings: {
    // Solid variant
    'variant=solid,color=neutral': { backgroundColor: 'var(--intent-color-neutral-600)', color: 'white' },
    'variant=solid,color=primary': { backgroundColor: 'var(--intent-color-primary-500)', color: 'white' },
    'variant=solid,color=success': { backgroundColor: 'var(--intent-color-success-500)', color: 'white' },
    'variant=solid,color=warning': { backgroundColor: 'var(--intent-color-warning-500)', color: 'white' },
    'variant=solid,color=error': { backgroundColor: 'var(--intent-color-error-500)', color: 'white' },
    
    // Subtle variant
    'variant=subtle,color=neutral': { backgroundColor: 'var(--intent-color-neutral-100)', color: 'var(--intent-color-neutral-700)' },
    'variant=subtle,color=primary': { backgroundColor: 'var(--intent-color-primary-100)', color: 'var(--intent-color-primary-700)' },
    'variant=subtle,color=success': { backgroundColor: 'var(--intent-color-success-100)', color: 'var(--intent-color-success-700)' },
    'variant=subtle,color=warning': { backgroundColor: 'var(--intent-color-warning-100)', color: 'var(--intent-color-warning-700)' },
    'variant=subtle,color=error': { backgroundColor: 'var(--intent-color-error-100)', color: 'var(--intent-color-error-700)' },
    
    // Outline variant
    'variant=outline,color=neutral': { backgroundColor: 'transparent', border: '1px solid var(--intent-color-neutral-300)', color: 'var(--intent-color-neutral-700)' },
    'variant=outline,color=primary': { backgroundColor: 'transparent', border: '1px solid var(--intent-color-primary-300)', color: 'var(--intent-color-primary-700)' },
    'variant=outline,color=success': { backgroundColor: 'transparent', border: '1px solid var(--intent-color-success-300)', color: 'var(--intent-color-success-700)' },
    'variant=outline,color=warning': { backgroundColor: 'transparent', border: '1px solid var(--intent-color-warning-300)', color: 'var(--intent-color-warning-700)' },
    'variant=outline,color=error': { backgroundColor: 'transparent', border: '1px solid var(--intent-color-error-300)', color: 'var(--intent-color-error-700)' },
    
    // Dot variant
    'variant=dot,color=neutral': { '--dot-color': 'var(--intent-color-neutral-500)' },
    'variant=dot,color=primary': { '--dot-color': 'var(--intent-color-primary-500)' },
    'variant=dot,color=success': { '--dot-color': 'var(--intent-color-success-500)' },
    'variant=dot,color=warning': { '--dot-color': 'var(--intent-color-warning-500)' },
    'variant=dot,color=error': { '--dot-color': 'var(--intent-color-error-500)' },
    
    'size=sm': { fontSize: '0.75rem', padding: '0.125rem 0.5rem' },
    'size=md': { fontSize: '0.875rem', padding: '0.25rem 0.75rem' },
  },
  baseStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    borderRadius: '9999px',
    fontWeight: '500',
    lineHeight: '1',
    whiteSpace: 'nowrap',
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
  Badge: BadgeSchema,
};
