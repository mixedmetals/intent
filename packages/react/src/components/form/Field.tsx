import React from 'react';

export interface FieldProps {
  /** Field layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Spacing between label and input */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Label text */
  label?: string;
  /** Show required indicator on label */
  required?: boolean;
  /** Help text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Validation state */
  invalid?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Label htmlFor attribute */
  labelFor?: string;
  /** Child input element */
  children: React.ReactElement;
  /** Additional className */
  className?: string;
}

/**
 * Field - Form field wrapper with label, help text, and error
 * 
 * Wraps form controls with consistent labeling and validation display.
 * 
 * @example
 * ```tsx
 * // Basic field
 * <Field label="Email" labelFor="email">
 *   <Input id="email" type="email" />
 * </Field>
 * 
 * // With helper text
 * <Field label="Password" helperText="Must be at least 8 characters">
 *   <Input type="password" />
 * </Field>
 * 
 * // With error
 * <Field label="Username" error="Username is required" invalid>
 *   <Input validation="invalid" />
 * </Field>
 * 
 * // Horizontal layout
 * <Field label="Name" layout="horizontal">
 *   <Input />
 * </Field>
 * 
 * // Required field
 * <Field label="Email" required>
 *   <Input required />
 * </Field>
 * ```
 */
export const Field: React.FC<FieldProps> = ({
  layout = 'vertical',
  spacing = 'md',
  label,
  required,
  helperText,
  error,
  invalid,
  disabled,
  loading,
  labelFor,
  children,
  className,
}) => {
  // Clone child with validation state
  const childWithProps = React.cloneElement(children, {
    ...children.props,
    validation: invalid ? 'invalid' : children.props.validation,
    disabled: disabled || children.props.disabled,
    loading: loading || children.props.loading,
    id: children.props.id || labelFor,
    required: required || children.props.required,
  });

  const spacingClasses = {
    none: 'gap-0',
    xs: 'gap-0.5',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
    xl: 'gap-4',
  };

  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'grid grid-cols-[1fr_2fr] items-center gap-4',
    inline: 'inline-flex items-center gap-2',
  };

  return (
    <div className={`${layoutClasses[layout]} ${spacingClasses[spacing]} ${className || ''}`}>
      {label && (
        <label
          htmlFor={labelFor || children.props.id}
          className={`
            text-sm font-medium text-neutral-700
            ${disabled ? 'opacity-60' : ''}
          `}
        >
          {label}
          {required && <span className="text-error-500 ml-0.5">*</span>}
        </label>
      )}
      
      <div className="flex-1">
        {childWithProps}
        
        {(helperText || error) && (
          <p className={`text-sm mt-1 ${error ? 'text-error-500' : 'text-neutral-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Field;
