# Button

Interactive element that triggers an action when clicked.

## Import

```tsx
import { Button } from 'intent-react'
```

## Usage

### Basic Button

```tsx
<Button>Click me</Button>
```

### Importance Levels

```tsx
<Button importance="primary">Primary</Button>
<Button importance="secondary">Secondary</Button>
<Button importance="ghost">Ghost</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### States

```tsx
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `importance` | `'primary' \| 'secondary' \| 'ghost'` | `'secondary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables interactions |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `fullWidth` | `boolean` | `false` | Expands to full width |

## Examples

### Button with Icon

```tsx
import { Button } from 'intent-react'

function Example() {
  return (
    <Button importance="primary">
      <PlusIcon />
      Add Item
    </Button>
  )
}
```

### Full Width Button

```tsx
<Button fullWidth importance="primary">
  Submit
</Button>
```

### Button Group

```tsx
import { Stack } from 'intent-react'

function ButtonGroup() {
  return (
    <Stack direction="row" gap="normal">
      <Button importance="primary">Save</Button>
      <Button importance="secondary">Cancel</Button>
      <Button importance="ghost">Delete</Button>
    </Stack>
  )
}
```

## Schema

```typescript
import { defineComponent } from 'intent-core'

const ButtonSchema = defineComponent({
  name: 'Button',
  properties: {
    importance: {
      type: 'enum',
      values: ['primary', 'secondary', 'ghost'],
      default: 'secondary'
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md'
    },
    disabled: {
      type: 'boolean',
      default: false
    },
    loading: {
      type: 'boolean',
      default: false
    }
  },
  constraints: [
    // Ghost buttons can't be loading
    {
      when: { importance: 'ghost' },
      forbid: ['loading']
    }
  ],
  mappings: {
    'importance=primary': {
      backgroundColor: 'var(--intent-color-primary-600)',
      color: 'white'
    },
    'importance=secondary': {
      backgroundColor: 'var(--intent-color-neutral-100)',
      color: 'var(--intent-color-neutral-900)'
    },
    'importance=ghost': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-neutral-700)'
    },
    'size=sm': {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem'
    },
    'size=lg': {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem'
    }
  }
})
```

## Accessibility

- Uses native `<button>` element
- Supports `disabled` state
- Keyboard focusable
- ARIA attributes automatically applied
