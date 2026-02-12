// ============================================================================
// Form Component Schemas
// ============================================================================

import { defineComponent } from './define.js';
import {
  formSizeProp,
  formVariantProp,
  validationStateProp,
  inputTypeProp,
  autocompleteProp,
  resizeProp,
  checkSizeProp,
  checkVariantProp,
  switchSizeProp,
  labelPositionProp,
  fieldLayoutProp,
  selectModeProp,
  formSpacingProp,
} from './form-props.js';

// ============================================================================
// Input (Enhanced)
// ============================================================================

export const InputSchema = defineComponent({
  name: 'Input',
  description: 'Text input with support for all HTML5 input types',
  properties: {
    type: inputTypeProp,
    size: formSizeProp,
    variant: formVariantProp,
    validation: validationStateProp,
    placeholder: { type: 'string', default: '' },
    disabled: { type: 'boolean', default: false },
    readOnly: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    loading: { type: 'boolean', default: false },
    fullWidth: { type: 'boolean', default: false },
    autocomplete: autocompleteProp,
  },
  constraints: [
    {
      when: { disabled: true },
      forbid: ['loading'],
      message: 'Disabled input cannot be in loading state',
    },
    {
      when: { readOnly: true },
      forbid: ['loading'],
      message: 'Read-only input cannot be in loading state',
    },
  ],
  mappings: {
    // Size
    'size=xs': { height: '1.5rem', padding: '0 0.5rem', fontSize: '0.75rem' },
    'size=sm': { height: '2rem', padding: '0 0.625rem', fontSize: '0.875rem' },
    'size=md': { height: '2.5rem', padding: '0 0.75rem', fontSize: '1rem' },
    'size=lg': { height: '3rem', padding: '0 1rem', fontSize: '1.125rem' },
    'size=xl': { height: '3.5rem', padding: '0 1.25rem', fontSize: '1.25rem' },
    
    // Variant - Outline
    'variant=outline': {
      border: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0.375rem',
    },
    'variant=outline,validation=valid': {
      borderColor: 'var(--intent-color-success-500)',
    },
    'variant=outline,validation=invalid': {
      borderColor: 'var(--intent-color-error-500)',
    },
    'variant=outline,validation=warning': {
      borderColor: 'var(--intent-color-warning-500)',
    },
    
    // Variant - Filled
    'variant=filled': {
      border: '1px solid transparent',
      backgroundColor: 'var(--intent-color-neutral-100)',
      borderRadius: '0.375rem',
    },
    'variant=filled,validation=valid': {
      backgroundColor: 'var(--intent-color-success-50)',
      borderColor: 'var(--intent-color-success-500)',
    },
    'variant=filled,validation=invalid': {
      backgroundColor: 'var(--intent-color-error-50)',
      borderColor: 'var(--intent-color-error-500)',
    },
    'variant=filled,validation=warning': {
      backgroundColor: 'var(--intent-color-warning-50)',
      borderColor: 'var(--intent-color-warning-500)',
    },
    
    // Variant - Flushed
    'variant=flushed': {
      border: '0',
      borderBottom: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0',
      paddingLeft: '0',
      paddingRight: '0',
    },
    'variant=flushed,validation=valid': {
      borderBottomColor: 'var(--intent-color-success-500)',
    },
    'variant=flushed,validation=invalid': {
      borderBottomColor: 'var(--intent-color-error-500)',
    },
    'variant=flushed,validation=warning': {
      borderBottomColor: 'var(--intent-color-warning-500)',
    },
    
    // Variant - Unstyled
    'variant=unstyled': {
      border: 'none',
      backgroundColor: 'transparent',
      padding: '0',
      height: 'auto',
    },
    
    // States
    'disabled=true': {
      opacity: '0.6',
      cursor: 'not-allowed',
      backgroundColor: 'var(--intent-color-neutral-100)',
    },
    'readOnly=true': {
      backgroundColor: 'var(--intent-color-neutral-50)',
    },
    'fullWidth=true': {
      width: '100%',
    },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
    transition: 'border-color 150ms, box-shadow 150ms',
    outline: 'none',
  },
});

// ============================================================================
// Textarea
// ============================================================================

export const TextareaSchema = defineComponent({
  name: 'Textarea',
  description: 'Multi-line text input',
  properties: {
    size: formSizeProp,
    variant: formVariantProp,
    validation: validationStateProp,
    resize: resizeProp,
    rows: { type: 'number', default: 3 },
    placeholder: { type: 'string', default: '' },
    disabled: { type: 'boolean', default: false },
    readOnly: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    fullWidth: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Size
    'size=xs': { padding: '0.375rem 0.5rem', fontSize: '0.75rem' },
    'size=sm': { padding: '0.5rem 0.625rem', fontSize: '0.875rem' },
    'size=md': { padding: '0.625rem 0.75rem', fontSize: '1rem' },
    'size=lg': { padding: '0.75rem 1rem', fontSize: '1.125rem' },
    'size=xl': { padding: '1rem 1.25rem', fontSize: '1.25rem' },
    
    // Resize
    'resize=none': { resize: 'none' },
    'resize=both': { resize: 'both' },
    'resize=horizontal': { resize: 'horizontal' },
    'resize=vertical': { resize: 'vertical' },
    
    // Variant - Outline
    'variant=outline': {
      border: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0.375rem',
    },
    'variant=outline,validation=valid': { borderColor: 'var(--intent-color-success-500)' },
    'variant=outline,validation=invalid': { borderColor: 'var(--intent-color-error-500)' },
    'variant=outline,validation=warning': { borderColor: 'var(--intent-color-warning-500)' },
    
    // Variant - Filled
    'variant=filled': {
      border: '1px solid transparent',
      backgroundColor: 'var(--intent-color-neutral-100)',
      borderRadius: '0.375rem',
    },
    
    // Variant - Flushed
    'variant=flushed': {
      border: '0',
      borderBottom: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0',
      paddingLeft: '0',
      paddingRight: '0',
    },
    
    // States
    'disabled=true': {
      opacity: '0.6',
      cursor: 'not-allowed',
      backgroundColor: 'var(--intent-color-neutral-100)',
    },
    'fullWidth=true': { width: '100%' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
    lineHeight: '1.5',
    transition: 'border-color 150ms, box-shadow 150ms',
    outline: 'none',
    minHeight: '80px',
  },
});

// ============================================================================
// Select
// ============================================================================

export const SelectSchema = defineComponent({
  name: 'Select',
  description: 'Dropdown select with single or multiple selection',
  properties: {
    size: formSizeProp,
    variant: formVariantProp,
    validation: validationStateProp,
    mode: selectModeProp,
    placeholder: { type: 'string', default: '' },
    disabled: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    loading: { type: 'boolean', default: false },
    clearable: { type: 'boolean', default: false },
    searchable: { type: 'boolean', default: false },
    fullWidth: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Size
    'size=xs': { height: '1.5rem', padding: '0 1.5rem 0 0.5rem', fontSize: '0.75rem' },
    'size=sm': { height: '2rem', padding: '0 2rem 0 0.625rem', fontSize: '0.875rem' },
    'size=md': { height: '2.5rem', padding: '0 2.5rem 0 0.75rem', fontSize: '1rem' },
    'size=lg': { height: '3rem', padding: '0 3rem 0 1rem', fontSize: '1.125rem' },
    'size=xl': { height: '3.5rem', padding: '0 3.5rem 0 1.25rem', fontSize: '1.25rem' },
    
    // Variant
    'variant=outline': {
      border: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0.375rem',
    },
    'variant=filled': {
      border: '1px solid transparent',
      backgroundColor: 'var(--intent-color-neutral-100)',
      borderRadius: '0.375rem',
    },
    'variant=flushed': {
      border: '0',
      borderBottom: '1px solid var(--intent-color-neutral-300)',
      backgroundColor: 'transparent',
      borderRadius: '0',
    },
    
    // States
    'disabled=true': {
      opacity: '0.6',
      cursor: 'not-allowed',
      backgroundColor: 'var(--intent-color-neutral-100)',
    },
    'fullWidth=true': { width: '100%' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
    transition: 'border-color 150ms, box-shadow 150ms',
    cursor: 'pointer',
  },
});

// ============================================================================
// Checkbox
// ============================================================================

export const CheckboxSchema = defineComponent({
  name: 'Checkbox',
  description: 'Single checkbox input',
  properties: {
    size: checkSizeProp,
    variant: checkVariantProp,
    disabled: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    indeterminate: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Size
    'size=sm': { width: '0.875rem', height: '0.875rem' },
    'size=md': { width: '1.125rem', height: '1.125rem' },
    'size=lg': { width: '1.375rem', height: '1.375rem' },
    
    // Disabled
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  baseStyles: {
    appearance: 'none',
    border: '2px solid var(--intent-color-neutral-300)',
    borderRadius: '0.25rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
});

// ============================================================================
// Checkbox Group
// ============================================================================

export const CheckboxGroupSchema = defineComponent({
  name: 'CheckboxGroup',
  description: 'Group of checkboxes with shared layout',
  properties: {
    layout: { type: 'enum', values: ['vertical', 'horizontal', 'inline'], default: 'vertical' },
    spacing: formSpacingProp,
  },
  constraints: [],
  mappings: {
    'layout=vertical': { display: 'flex', flexDirection: 'column' },
    'layout=horizontal': { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
    'layout=inline': { display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap' },
    
    'spacing=none': { gap: '0' },
    'spacing=xs': { gap: '0.25rem' },
    'spacing=sm': { gap: '0.5rem' },
    'spacing=md': { gap: '0.75rem' },
    'spacing=lg': { gap: '1rem' },
    'spacing=xl': { gap: '1.5rem' },
  },
});

// ============================================================================
// Radio
// ============================================================================

export const RadioSchema = defineComponent({
  name: 'Radio',
  description: 'Single radio button input',
  properties: {
    size: checkSizeProp,
    variant: checkVariantProp,
    disabled: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Size
    'size=sm': { width: '0.875rem', height: '0.875rem' },
    'size=md': { width: '1.125rem', height: '1.125rem' },
    'size=lg': { width: '1.375rem', height: '1.375rem' },
    
    // Disabled
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  baseStyles: {
    appearance: 'none',
    border: '2px solid var(--intent-color-neutral-300)',
    borderRadius: '50%',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
});

// ============================================================================
// Radio Group
// ============================================================================

export const RadioGroupSchema = defineComponent({
  name: 'RadioGroup',
  description: 'Group of radio buttons with shared name',
  properties: {
    layout: { type: 'enum', values: ['vertical', 'horizontal', 'inline'], default: 'vertical' },
    spacing: formSpacingProp,
  },
  constraints: [],
  mappings: {
    'layout=vertical': { display: 'flex', flexDirection: 'column' },
    'layout=horizontal': { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
    'layout=inline': { display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap' },
    
    'spacing=none': { gap: '0' },
    'spacing=xs': { gap: '0.25rem' },
    'spacing=sm': { gap: '0.5rem' },
    'spacing=md': { gap: '0.75rem' },
    'spacing=lg': { gap: '1rem' },
    'spacing=xl': { gap: '1.5rem' },
  },
});

// ============================================================================
// Switch
// ============================================================================

export const SwitchSchema = defineComponent({
  name: 'Switch',
  description: 'Toggle switch (checkbox alternative) with schema-driven focus management',
  properties: {
    size: switchSizeProp,
    disabled: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },
    /**
     * Focus ring variant - automatically applied by schema
     * LLM doesn't need to "remember" accessibility
     */
    focusVariant: { 
      type: 'enum', 
      values: ['default', 'inner', 'outer', 'none'], 
      default: 'default' 
    },
  },
  constraints: [
    {
      when: { disabled: true },
      forbid: ['required'],
      message: 'Disabled switch cannot be required',
    },
  ],
  mappings: {
    // Size
    'size=sm': { width: '1.75rem', height: '1rem' },
    'size=md': { width: '2.25rem', height: '1.25rem' },
    'size=lg': { width: '2.75rem', height: '1.5rem' },
    
    // Disabled
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    
    // Focus ring variants (schema-driven accessibility)
    'focusVariant=default': {
      focusClass: 'intent-switch--focus-default',
    },
    'focusVariant=inner': {
      focusClass: 'intent-switch--focus-inner',
    },
    'focusVariant=outer': {
      focusClass: 'intent-switch--focus-outer',
    },
    'focusVariant=none': {
      focusClass: 'intent-switch--focus-none',
    },
  },
  baseStyles: {
    appearance: 'none',
    borderRadius: '9999px',
    backgroundColor: 'var(--intent-color-neutral-300)',
    cursor: 'pointer',
    transition: 'background-color 150ms',
    position: 'relative',
    // Default focus ring uses CSS custom properties
    '--intent-focus-ring-width': '2px',
    '--intent-focus-ring-offset': '2px',
    '--intent-focus-ring-color': 'var(--intent-color-primary)',
  },
});

// ============================================================================
// Label
// ============================================================================

export const LabelSchema = defineComponent({
  name: 'Label',
  description: 'Form label with required indicator',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg'], default: 'sm' },
    weight: { type: 'enum', values: ['normal', 'medium', 'semibold'], default: 'medium' },
    required: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
    'size=md': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    
    'weight=normal': { fontWeight: '400' },
    'weight=medium': { fontWeight: '500' },
    'weight=semibold': { fontWeight: '600' },
    
    'disabled=true': { opacity: '0.6', cursor: 'not-allowed' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-700)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
  },
});

// ============================================================================
// Field
// ============================================================================

export const FieldSchema = defineComponent({
  name: 'Field',
  description: 'Form field wrapper with label, input, help text, and error',
  properties: {
    layout: fieldLayoutProp,
    spacing: formSpacingProp,
    required: { type: 'boolean', default: false },
    invalid: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    loading: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'layout=vertical': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    'layout=horizontal': {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      alignItems: 'center',
      gap: '1rem',
    },
    'layout=inline': {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem',
    },
    
    'spacing=none': { gap: '0' },
    'spacing=xs': { gap: '0.125rem' },
    'spacing=sm': { gap: '0.25rem' },
    'spacing=md': { gap: '0.5rem' },
    'spacing=lg': { gap: '0.75rem' },
    'spacing=xl': { gap: '1rem' },
    
    'disabled=true': { opacity: '0.6' },
  },
});

// ============================================================================
// Form
// ============================================================================

export const FormSchema = defineComponent({
  name: 'Form',
  description: 'Form container with layout and spacing',
  properties: {
    layout: fieldLayoutProp,
    spacing: formSpacingProp,
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'layout=vertical': {
      display: 'flex',
      flexDirection: 'column',
    },
    'layout=horizontal': {
      display: 'flex',
      flexDirection: 'column',
    },
    'layout=inline': {
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    
    'spacing=none': { gap: '0' },
    'spacing=xs': { gap: '0.5rem' },
    'spacing=sm': { gap: '1rem' },
    'spacing=md': { gap: '1.5rem' },
    'spacing=lg': { gap: '2rem' },
    'spacing=xl': { gap: '2.5rem' },
  },
});

// ============================================================================
// Helper Text
// ============================================================================

export const HelperTextSchema = defineComponent({
  name: 'HelperText',
  description: 'Helper or error text below form controls',
  properties: {
    variant: { type: 'enum', values: ['default', 'error', 'warning', 'success'], default: 'default' },
    size: { type: 'enum', values: ['xs', 'sm'], default: 'sm' },
  },
  constraints: [],
  mappings: {
    'variant=default': { color: 'var(--intent-color-neutral-500)' },
    'variant=error': { color: 'var(--intent-color-error-500)' },
    'variant=warning': { color: 'var(--intent-color-warning-500)' },
    'variant=success': { color: 'var(--intent-color-success-500)' },
    
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    marginTop: '0.25rem',
  },
});

// ============================================================================
// Export all form schemas
// ============================================================================

export const FormSchemas = {
  Input: InputSchema,
  Textarea: TextareaSchema,
  Select: SelectSchema,
  Checkbox: CheckboxSchema,
  CheckboxGroup: CheckboxGroupSchema,
  Radio: RadioSchema,
  RadioGroup: RadioGroupSchema,
  Switch: SwitchSchema,
  Label: LabelSchema,
  Field: FieldSchema,
  Form: FormSchema,
  HelperText: HelperTextSchema,
};
