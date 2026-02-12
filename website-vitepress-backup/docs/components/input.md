# Input

Text input component with validation states and full form integration.

## Overview

Input provides a consistent text entry experience with built-in support for validation states, icons, and accessibility.

```tsx
import { Input } from 'intent-react'

<Input 
  type="email" 
  placeholder="Enter your email"
  validation="valid"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text'` \| `'email'` \| `'password'` \| `'number'` \| `'tel'` \| `'url'` | `'text'` | Input type |
| `size` | `'small'` \| `'medium'` \| `'large'` | `'medium'` | Input size |
| `validation` | `'valid'` \| `'invalid'` \| `'none'` | `'none'` | Validation state |
| `icon` | `string` | - | Left icon name |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only state |
| `placeholder` | `string` | - | Placeholder text |

## Examples

### Basic Input

```tsx
<Input placeholder="Type something..." />
```

### With Icon

```tsx
<Input 
  type="email" 
  icon="mail"
  placeholder="you@example.com" 
/>
```

### Sizes

```tsx
<Stack gap="normal">
  <Input size="small" placeholder="Small input" />
  <Input size="medium" placeholder="Medium input" />
  <Input size="large" placeholder="Large input" />
</Stack>
```

### Validation States

```tsx
<Stack gap="normal">
  <Input 
    validation="valid" 
    value="valid@email.com"
    icon="check"
  />
  <Input 
    validation="invalid" 
    value="invalid"
    icon="alert-circle"
  />
</Stack>
```

### Password with Toggle

```tsx
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      icon="lock"
      placeholder="Password"
      // Toggle button handled by parent or specialized component
    />
  )
}
```

### With Form Integration

```tsx
import { Field, Form } from 'intent-react'

<Form onSubmit={handleSubmit}>
  <Field 
    label="Username" 
    hint="Choose a unique username"
    error={errors.username}
  >
    <Input 
      name="username"
      icon="user"
      validation={errors.username ? 'invalid' : 'none'}
    />
  </Field>
  
  <Field label="Email" error={errors.email}>
    <Input 
      name="email" 
      type="email"
      icon="mail"
      validation={errors.email ? 'invalid' : 'none'}
    />
  </Field>
</Form>
```

## Validation States

| State | Visual | Use Case |
|-------|--------|----------|
| `none` | Default border | Initial state |
| `valid` | Green border + icon | Successful validation |
| `invalid` | Red border + icon | Failed validation |

## CSS Output

```css
.input {
  display: flex;
  align-items: center;
  border: 1px solid var(--intent-color-border);
  border-radius: var(--intent-radius-md);
  background: var(--intent-color-surface);
  color: var(--intent-color-text);
}

.input:focus-within {
  border-color: var(--intent-color-primary);
  box-shadow: 0 0 0 2px var(--intent-color-primary-alpha);
}

.input--valid {
  border-color: var(--intent-color-success);
}

.input--invalid {
  border-color: var(--intent-color-danger);
}
```

## Accessibility

- Native `<input>` element for full browser support
- Label association via `Field` component
- Error messages announced to screen readers
- Focus indicators visible
- Keyboard navigation supported

## Best Practices

1. **Always use Field wrapper** - Provides labels and error handling
2. **Show validation on blur** - Don't validate while typing
3. **Clear error indicators** - Reset to `none` on input
4. **Use appropriate types** - Email, tel, url for mobile keyboards
5. **Provide placeholders** - Help users understand expected format

## Related

- [Field](/docs/components/field) - Label and error wrapper
- [Textarea](/docs/components/textarea) - Multi-line text input
- [Select](/docs/components/select) - Dropdown selection
- [Form](/docs/components/form) - Form wrapper component
