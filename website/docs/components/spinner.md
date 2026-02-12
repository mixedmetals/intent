# Spinner

Loading indicator with multiple sizes and styles.

## Overview

Spinner provides visual feedback for loading states across your application.

```tsx
import { Spinner } from 'intent-react'

<Spinner size="medium" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small'` \| `'medium'` \| `'large'` | `'medium'` | Spinner diameter |
| `color` | `'primary'` \| `'secondary'` \| `'muted'` | `'primary'` | Color variant |

## Examples

### Sizes

```tsx
<Stack direction="row" gap="normal" align="center">
  <Spinner size="small" />
  <Spinner size="medium" />
  <Spinner size="large" />
</Stack>
```

### Inside Button

```tsx
<Button disabled>
  <Spinner size="small" color="secondary" />
  Loading...
</Button>
```

### Page Loading

```tsx
<Stack align="center" justify="center" gap="normal" padding="loose">
  <Spinner size="large" />
  <Text color="muted">Loading content...</Text>
</Stack>
```

### With Delay

Show spinner only after 300ms to prevent flashing:

```tsx
function DelayedSpinner({ loading }) {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(timer)
  }, [])
  
  if (!loading) return null
  if (!show) return null
  
  return <Spinner />
}
```

## CSS Output

```css
@keyframes spinner-spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spinner-spin 1s linear infinite;
}

.spinner--medium {
  width: 24px;
  height: 24px;
}

.spinner--primary {
  color: var(--intent-color-primary);
}
```

## Accessibility

- Includes `aria-label="Loading"` by default
- Set `aria-busy="true"` on parent container
- Provide text alternative when visible

```tsx
<div aria-busy="true" aria-live="polite">
  <Spinner aria-label="Loading posts" />
  <span className="sr-only">Loading posts...</span>
</div>
```

## Best Practices

1. **Use consistent sizes** - Match button sizes to spinner sizes
2. **Show within 300ms** - Delay prevents flashing on fast loads
3. **Provide feedback** - Pair with text for longer operations
4. **Disable controls** - Prevent interaction while loading
5. **Consider skeletons** - Use Skeleton for content placeholders

## Related

- [Skeleton](/docs/components/skeleton) - Content placeholder
- [Button](/docs/components/button) - Often paired with spinner
- [Progress](/docs/components/progress) - Determinate loading
