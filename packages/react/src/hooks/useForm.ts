/**
 * ============================================================================
 * useForm Hook - Schema Validation Integration
 * ============================================================================
 * 
 * Production-ready form validation with optional Zod schema integration.
 * 
 * Features:
 * - Optional Zod schema validation with type inference
 * - Real-time and on-blur validation modes
 * - Field-level error tracking
 * - Form submission handling
 * - Dirty/pristine state tracking
 * - Reset functionality
 * 
 * @example
 * ```tsx
 * // Without Zod (runtime validation)
 * const { register, handleSubmit, errors } = useForm({
 *   onSubmit: async (data) => {
 *     await login(data);
 *   },
 * });
 * 
 * // With Zod
 * import { z } from 'zod';
 * 
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   password: z.string().min(8, 'Password too short'),
 * });
 * 
 * const { register, handleSubmit, errors } = useForm({
 *   schema,
 *   onSubmit: async (data) => {
 *     await login(data);
 *   },
 * });
 * ```
 */

import { useState, useCallback, useRef, ChangeEvent, FocusEvent, FormEvent } from 'react';

// ============================================================================
// Types
// ============================================================================

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;
export type FormDirty<T> = Partial<Record<keyof T, boolean>>;

/** Generic schema interface - works with Zod, Yup, or custom validators */
export interface Schema<T> {
  parse: (data: unknown) => T;
  safeParse?: (data: unknown) => { success: boolean; data?: T; error?: { issues: Array<{ path: (string | number)[]; message: string }> } };
}

export interface UseFormOptions<T extends Record<string, unknown>> {
  /** Optional schema for validation (Zod, Yup, or custom) */
  schema?: Schema<T>;
  
  /** Initial form values */
  defaultValues?: Partial<T>;
  
  /** Submit handler - called when validation passes */
  onSubmit: (data: T) => void | Promise<void>;
  
  /** Validation mode */
  mode?: 'onSubmit' | 'onBlur' | 'onChange' | 'all';
  
  /** Re-validate mode (after initial validation) */
  reValidateMode?: 'onBlur' | 'onChange' | 'all';
}

export interface RegisterOptions {
  /** Whether field is required */
  required?: boolean;
  /** Field type for input element */
  type?: string;
  /** Custom validation function */
  validate?: (value: unknown) => string | undefined;
}

export interface FieldRegistration {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
  /** Register a field for validation and tracking */
  register: (name: keyof T, options?: RegisterOptions) => FieldRegistration;
  
  /** Handle form submission */
  handleSubmit: (e?: FormEvent) => Promise<void>;
  
  /** Current form values */
  values: Partial<T>;
  
  /** Validation errors by field */
  errors: FormErrors<T>;
  
  /** Fields that have been touched (focused then blurred) */
  touched: FormTouched<T>;
  
  /** Fields that have been modified from default */
  dirty: FormDirty<T>;
  
  /** Whether form has any errors */
  isValid: boolean;
  
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  
  /** Whether form has been submitted at least once */
  isSubmitted: boolean;
  
  /** Whether form values differ from defaults */
  isDirty: boolean;
  
  /** Set a field value programmatically */
  setValue: (name: keyof T, value: unknown) => void;
  
  /** Set multiple values programmatically */
  setValues: (values: Partial<T>) => void;
  
  /** Clear a specific error */
  clearError: (name: keyof T) => void;
  
  /** Clear all errors */
  clearErrors: () => void;
  
  /** Trigger validation for specific fields or all */
  trigger: (name?: keyof T | Array<keyof T>) => Promise<boolean>;
  
  /** Reset form to initial state */
  reset: (values?: Partial<T>) => void;
  
  /** Get field error message */
  getFieldError: (name: keyof T) => string | undefined;
  
  /** Check if field has error */
  hasError: (name: keyof T) => boolean;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse error into field error map
 */
function parseValidationError<T>(error: { issues: Array<{ path: (string | number)[]; message: string }> }): FormErrors<T> {
  const errors: FormErrors<T> = {};
  
  for (const issue of error.issues) {
    const path = issue.path.join('.') as keyof T;
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  
  return errors;
}

/**
 * Deep clone an object
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if two values are different
 */
function isDifferent(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

// ============================================================================
// Hook
// ============================================================================

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const {
    schema,
    defaultValues = {} as Partial<T>,
    onSubmit,
    mode = 'onSubmit',
    reValidateMode = 'onChange',
  } = options;
  
  // Store defaults for reset
  const initialValuesRef = useRef(deepClone(defaultValues));
  
  // Form state
  const [values, setValues] = useState<Partial<T>>(deepClone(defaultValues));
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [dirty, setDirty] = useState<FormDirty<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Track which fields have been validated
  const validatedFieldsRef = useRef<Set<keyof T>>(new Set());
  
  // Derived state
  const isValid = Object.keys(errors).length === 0;
  const isDirty = Object.values(dirty).some(Boolean);
  
  // ==========================================================================
  // Validation
  // ==========================================================================
  
  const validateField = useCallback((name: keyof T, value: unknown): string | undefined => {
    if (!schema) return undefined;
    
    try {
      // Validate single field by creating partial schema
      const partialData = { ...values, [name]: value };
      schema.parse(partialData);
      return undefined;
    } catch (error) {
      const err = error as { issues?: Array<{ path: (string | number)[]; message: string }> };
      if (err.issues) {
        const fieldError = err.issues.find(issue => 
          issue.path.length === 1 && issue.path[0] === name
        );
        return fieldError?.message;
      }
      return undefined;
    }
  }, [schema, values]);
  
  const validateAll = useCallback((): boolean => {
    if (!schema) return true;
    
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      const err = error as { issues?: Array<{ path: (string | number)[]; message: string }> };
      if (err.issues) {
        setErrors(parseValidationError<T>({ issues: err.issues }));
      }
      return false;
    }
  }, [schema, values]);
  
  const trigger = useCallback(async (
    name?: keyof T | Array<keyof T>
  ): Promise<boolean> => {
    if (!name) {
      return validateAll();
    }
    
    const names = Array.isArray(name) ? name : [name];
    const newErrors = { ...errors };
    let hasError = false;
    
    for (const fieldName of names) {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        hasError = true;
      } else {
        delete newErrors[fieldName];
      }
      validatedFieldsRef.current.add(fieldName);
    }
    
    setErrors(newErrors);
    return !hasError;
  }, [errors, validateField, values]);
  
  // ==========================================================================
  // Field Registration
  // ==========================================================================
  
  const register = useCallback((
    name: keyof T,
    options: RegisterOptions = {}
  ): FieldRegistration => {
    const value = values[name] ?? '';
    const stringValue = typeof value === 'string' ? value : String(value ?? '');
    const hasFieldError = !!errors[name] && (touched[name] || isSubmitted);
    
    return {
      name: String(name),
      value: stringValue,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = e.target.type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : e.target.value;
        
        setValues(prev => ({ ...prev, [name]: newValue }));
        setDirty(prev => ({ ...prev, [name]: isDifferent(newValue, initialValuesRef.current[name]) }));
        
        // Real-time validation
        const shouldValidate = 
          mode === 'onChange' || 
          mode === 'all' ||
          (validatedFieldsRef.current.has(name) && (reValidateMode === 'onChange' || reValidateMode === 'all'));
        
        if (shouldValidate && schema) {
          const error = validateField(name, newValue);
          setErrors(prev => {
            const next = { ...prev };
            if (error) {
              next[name] = error;
            } else {
              delete next[name];
            }
            return next;
          });
        }
        
        // Custom validation
        if (options.validate) {
          const customError = options.validate(newValue);
          if (customError) {
            setErrors(prev => ({ ...prev, [name]: customError }));
          }
        }
      },
      onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        
        // Blur validation
        const shouldValidate = 
          mode === 'onBlur' || 
          mode === 'all' ||
          (validatedFieldsRef.current.has(name) && (reValidateMode === 'onBlur' || reValidateMode === 'all'));
        
        if (shouldValidate && schema) {
          const error = validateField(name, values[name]);
          setErrors(prev => {
            const next = { ...prev };
            if (error) {
              next[name] = error;
            } else {
              delete next[name];
            }
            return next;
          });
          validatedFieldsRef.current.add(name);
        }
      },
      'aria-invalid': hasFieldError || undefined,
      'aria-describedby': hasFieldError ? `${String(name)}-error` : undefined,
    };
  }, [errors, isSubmitted, mode, reValidateMode, schema, touched, validateField, values]);
  
  // ==========================================================================
  // Form Submission
  // ==========================================================================
  
  const handleSubmit = useCallback(async (e?: FormEvent): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    
    setIsSubmitted(true);
    
    // Validate all fields
    const isValidForm = validateAll();
    
    if (!isValidForm) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values as T);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, validateAll, values]);
  
  // ==========================================================================
  // State Management
  // ==========================================================================
  
  const setValue = useCallback((name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setDirty(prev => ({ ...prev, [name]: isDifferent(value, initialValuesRef.current[name]) }));
  }, []);
  
  const setValuesCallback = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
    setDirty(prev => {
      const next = { ...prev };
      for (const key of Object.keys(newValues) as Array<keyof T>) {
        next[key] = isDifferent(newValues[key], initialValuesRef.current[key]);
      }
      return next;
    });
  }, []);
  
  const clearError = useCallback((name: keyof T) => {
    setErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);
  
  const clearErrors = useCallback(() => {
    setErrors({});
    validatedFieldsRef.current.clear();
  }, []);
  
  const reset = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues !== undefined ? newValues : initialValuesRef.current;
    initialValuesRef.current = deepClone(resetValues);
    setValues(deepClone(resetValues));
    setErrors({});
    setTouched({});
    setDirty({});
    setIsSubmitted(false);
    validatedFieldsRef.current.clear();
  }, []);
  
  const getFieldError = useCallback((name: keyof T): string | undefined => {
    return errors[name];
  }, [errors]);
  
  const hasError = useCallback((name: keyof T): boolean => {
    return !!errors[name];
  }, [errors]);
  
  // ==========================================================================
  // Return
  // ==========================================================================
  
  return {
    register,
    handleSubmit,
    values,
    errors,
    touched,
    dirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isDirty,
    setValue,
    setValues: setValuesCallback,
    clearError,
    clearErrors,
    trigger,
    reset,
    getFieldError,
    hasError,
  };
}

// ============================================================================
// Utility Exports
// ============================================================================

/**
 * Create a form context for nested components
 * This is a placeholder for future context implementation
 */
export function createFormContext<T extends Record<string, unknown>>() {
  return {
    values: {} as Partial<T>,
    errors: {} as FormErrors<T>,
    touched: {} as FormTouched<T>,
    setValue: (() => { /* placeholder */ }) as (name: keyof T, value: unknown) => void,
    register: (() => ({ 
      name: '', 
      value: '', 
      onChange: () => { /* placeholder */ }, 
      onBlur: () => { /* placeholder */ } 
    })) as (name: keyof T, options?: RegisterOptions) => FieldRegistration,
  };
}

export default useForm;
