// ============================================================================
// Form Components
// ============================================================================

/**
 * Intent Form Components
 * 
 * Complete form controls with validation, layout, and accessibility.
 * 
 * @example
 * ```tsx
 * import {
 *   Form,
 *   Field,
 *   Label,
 *   Input,
 *   Textarea,
 *   Select,
 *   Checkbox,
 *   Radio,
 *   Switch,
 * } from 'intent-react/form';
 * 
 * function ContactForm() {
 *   return (
 *     <Form onSubmit={handleSubmit}>
 *       <Field label="Name" required>
 *         <Input name="name" required />
 *       </Field>
 *       
 *       <Field label="Email" required>
 *         <Input name="email" type="email" required />
 *       </Field>
 *       
 *       <Field label="Message">
 *         <Textarea name="message" rows={4} />
 *       </Field>
 *       
 *       <Field label="Subscribe">
 *         <Switch name="subscribe" />
 *       </Field>
 *       
 *       <Button type="submit">Send</Button>
 *     </Form>
 *   );
 * }
 * ```
 */

// Form controls
export { Input, InputField, type InputProps } from './Input.js';
export { Textarea, TextareaField, type TextareaProps } from './Textarea.js';
export { Select, SelectField, type SelectProps, type SelectOption } from './Select.js';

// Selection controls
export { Checkbox, CheckboxField, type CheckboxProps } from './Checkbox.js';
export { Radio, RadioField, type RadioProps } from './Radio.js';
export { Switch, SwitchField, type SwitchProps } from './Switch.js';

// Form structure
export { Label, type LabelProps } from './Label.js';
export { Field, type FieldProps } from './Field.js';
export { 
  Form, 
  useFormContext, 
  useFormField,
  type FormProps, 
  type FormContextValue 
} from './Form.js';
