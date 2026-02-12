import React, { createContext, useContext, useCallback } from 'react';

export interface FormContextValue {
  /** Form layout inherited by fields */
  layout: 'vertical' | 'horizontal' | 'inline';
  /** Form spacing inherited by fields */
  spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether form is disabled */
  disabled: boolean;
  /** Register field with form */
  registerField: (name: string, value: unknown) => void;
  /** Update field value */
  setFieldValue: (name: string, value: unknown) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => useContext(FormContext);

export interface FormProps {
  /** Form layout for all fields */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Spacing between form fields */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Disabled state for all fields */
  disabled?: boolean;
  /** Form values (controlled) */
  values?: Record<string, unknown>;
  /** Default values (uncontrolled) */
  defaultValues?: Record<string, unknown>;
  /** Form submission handler */
  onSubmit?: (values: Record<string, unknown>) => void;
  /** Change handler */
  onChange?: (values: Record<string, unknown>) => void;
  /** Child form elements */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
  /** Form id */
  id?: string;
  /** Form name */
  name?: string;
}

/**
 * Form - Form container with layout and context
 * 
 * Provides form context for consistent field styling and state management.
 * 
 * @example
 * ```tsx
 * // Basic form
 * <Form onSubmit={handleSubmit}>
 *   <Field label="Name">
 *     <Input name="name" />
 *   </Field>
 *   <Field label="Email">
 *     <Input name="email" type="email" />
 *   </Field>
 *   <Button type="submit">Submit</Button>
 * </Form>
 * 
 * // Horizontal layout
 * <Form layout="horizontal" spacing="lg">
 *   <Field label="Username">
 *     <Input />
 *   </Field>
 *   <Field label="Password">
 *     <Input type="password" />
 *   </Field>
 * </Form>
 * 
 * // With validation
 * <Form onSubmit={handleSubmit}>
 *   <Field label="Email" error="Invalid email" invalid>
 *     <Input validation="invalid" />
 *   </Field>
 * </Form>
 * ```
 */
export const Form: React.FC<FormProps> = ({
  layout = 'vertical',
  spacing = 'md',
  disabled = false,
  values,
  defaultValues = {},
  onSubmit,
  onChange,
  children,
  className,
  id,
  name,
}) => {
  const [formValues, setFormValues] = React.useState(defaultValues);
  
  const currentValues = values !== undefined ? values : formValues;
  
  const setFieldValue = useCallback((fieldName: string, value: unknown) => {
    const newValues = { ...currentValues, [fieldName]: value };
    if (values === undefined) {
      setFormValues(newValues);
    }
    onChange?.(newValues);
  }, [currentValues, values, onChange]);
  
  const registerField = useCallback((fieldName: string, value: unknown) => {
    if (!(fieldName in currentValues)) {
      setFieldValue(fieldName, value);
    }
  }, [currentValues, setFieldValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(currentValues);
  };
  
  const contextValue: FormContextValue = {
    layout,
    spacing,
    disabled,
    registerField,
    setFieldValue,
  };
  
  const spacingClasses = {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };
  
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-col',
    inline: 'inline-flex flex-row flex-wrap items-center',
  };
  
  return (
    <FormContext.Provider value={contextValue}>
      <form
        id={id}
        name={name}
        onSubmit={handleSubmit}
        className={`${layoutClasses[layout]} ${spacingClasses[spacing]} ${className || ''}`}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Helper hook for field registration
export const useFormField = (name: string, defaultValue: unknown = '') => {
  const context = useFormContext();
  
  if (!context) {
    return null;
  }
  
  return {
    register: () => {
      context.registerField(name, defaultValue);
    },
    setValue: (value: unknown) => {
      context.setFieldValue(name, value);
    },
  };
};

export default Form;
