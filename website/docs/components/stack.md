# Stack

The foundation of Intent layouts. Stack provides vertical and horizontal spacing with consistent, theme-aware gaps.

## Overview

Stack is the most fundamental layout component in Intent. It handles spacing between child elements consistently across your application.

```tsx
import { Stack } from 'intent-react'

<Stack direction="column" gap="normal">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'column'` \| `'row'` | `'column'` | Stack direction |
| `gap` | `'compact'` \| `'normal'` \| `'relaxed'` \| `'loose'` | `'normal'` | Space between items |
| `padding` | `'compact'` \| `'normal'` \| `'relaxed'` \| `'loose'` \| `'none'` | `'none'` | Inner padding |
| `align` | `'start'` \| `'center'` \| `'end'` \| `'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start'` \| `'center'` \| `'end'` \| `'between'` \| `'around'` | `'start'` | Main-axis distribution |
| `wrap` | `boolean` | `false` | Allow items to wrap |

## Examples

### Vertical Stack

Default column layout with standard spacing:

```tsx
<Stack gap="normal">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>
```

### Horizontal Stack

Row layout for inline elements:

```tsx
<Stack direction="row" gap="normal">
  <Button>Cancel</Button>
  <Button importance="primary">Submit</Button>
</Stack>
```

### Nested Stacks

Combine directions for complex layouts:

```tsx
<Stack direction="row" gap="relaxed">
  <Stack direction="column" gap="normal">
    <Text weight="bold">Personal Info</Text>
    <Input placeholder="Name" />
    <Input placeholder="Email" />
  </Stack>
  <Stack direction="column" gap="normal">
    <Text weight="bold">Address</Text>
    <Input placeholder="Street" />
    <Input placeholder="City" />
  </Stack>
</Stack>
```

### Alignment

Control how items align on the cross-axis:

```tsx
{/* Center aligned */}
<Stack align="center" gap="normal">
  <Icon name="check" />
  <Text>Centered content</Text>
</Stack>

{/* Space between */}
<Stack direction="row" justify="between">
  <Logo />
  <Navigation />
  <UserMenu />
</Stack>
```

## Gap Values

| Value | Pixels | Usage |
|-------|--------|-------|
| `compact` | 4px | Tight groupings, icon buttons |
| `normal` | 8px | Standard spacing |
| `relaxed` | 16px | Form sections |
| `loose` | 24px | Page sections |

## Responsive Behavior

Stack values are theme-aware and scale with your design system:

```tsx
// Your theme defines these values
tokens: {
  spacing: {
    compact: '4px',
    normal: '8px',
    relaxed: '16px',
    loose: '24px'
  }
}
```

## CSS Output

```css
.stack {
  display: flex;
}

.stack--column {
  flex-direction: column;
}

.stack--gap-normal {
  gap: var(--intent-spacing-normal);
}

.stack--padding-normal {
  padding: var(--intent-spacing-normal);
}
```

## Accessibility

- Uses semantic `<div>` elements
- Respects reduced motion preferences
- Maintains document flow for screen readers

## Best Practices

1. **Use Stack for spacing** - Prefer Stack over manual margins
2. **Nest intentionally** - Deep nesting can impact performance
3. **Choose appropriate gaps** - Use consistent spacing tokens
4. **Consider responsive needs** - Stack works with responsive props

## Related

- [Box](/docs/components/box) - Single element wrapper
- [Container](/docs/components/container) - Max-width wrapper
- [Grid](/docs/components/grid) - Two-dimensional layouts
