---
sidebar_position: 1
---

# Schema Definition

Define components with schemas. Intent validates props, generates TypeScript types, and creates optimized CSS.

## Overview

Schemas are the heart of Intent. They describe:
- What properties a component accepts
- What values each property can have
- How properties relate to each other
- What CSS to generate

## Basic Schema

```tsx
import { defineComponent } from 'intent-core'

const Button = defineComponent({
  name: 'Button',
  
  props: {
    importance: {
      type: 'enum',
      values: ['primary', 'secondary', 'tertiary'],
      default: 'secondary'
    },
    size: {
      type: 'enum',
      values: ['small', 'medium', 'large'],
      default: 'medium'
    },
    disabled: {
      type: 'boolean',
      default: false
    }
  },
  
  mappings: {
    base: 'display: inline-flex; align-items: center;',
    importance: {
      primary: 'background: blue; color: white;',
      secondary: 'background: gray; color: black;',
      tertiary: 'background: transparent; border: 1px solid gray;'
    },
    size: {
      small: 'padding: 4px 8px; font-size: 12px;',
      medium: 'padding: 8px 16px; font-size: 14px;',
      large: 'padding: 12px 24px; font-size: 16px;'
    }
  }
})
```

## Property Types

### Enum

Fixed set of values:

```tsx
variant: {
  type: 'enum',
  values: ['solid', 'outline', 'ghost'],
  default: 'solid'
}
```

### Boolean

True/false toggle:

```tsx
disabled: {
  type: 'boolean',
  default: false
}
```

### String

Freeform text:

```tsx
placeholder: {
  type: 'string',
  default: ''
}
```

### Number

Numeric values:

```tsx
maxLength: {
  type: 'number'
}
```

## Constraints

### When

Apply CSS only when conditions are met:

```tsx
constraints: {
  when: {
    'importance:primary AND size:large': {
      // Extra styles for large primary buttons
      padding: '16px 32px'
    }
  }
}
```

### Forbid

Prevent invalid combinations:

```tsx
constraints: {
  forbid: [
    { importance: 'tertiary', variant: 'ghost' }
    // Can't have ghost tertiary buttons
  ]
}
```

### Require

Ensure properties are used together:

```tsx
constraints: {
  require: [
    { when: 'icon', then: 'iconPosition' }
    // If icon is set, iconPosition must also be set
  ]
}
```

## Mappings

Maps property values to CSS output:

```tsx
mappings: {
  // Always applied
  base: `
    display: flex;
    align-items: center;
  `,
  
  // Property-based
  direction: {
    row: 'flex-direction: row;',
    column: 'flex-direction: column;'
  },
  
  // Theme token reference
  gap: {
    compact: 'gap: var(--intent-spacing-1);',
    normal: 'gap: var(--intent-spacing-2);',
    relaxed: 'gap: var(--intent-spacing-4);'
  }
}
```

## TypeScript Generation

Intent automatically generates types from schemas:

```tsx
// Generated automatically
type ButtonProps = {
  importance?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}
```

Use them in your React components:

```tsx
import type { ButtonProps } from 'intent-react'

function MyButton(props: ButtonProps) {
  return <button className={Button.getClasses(props)} {...props} />
}
```

## CSS Generation

Intent generates atomic CSS classes:

```css
/* Button component */
.button--importance-primary { background: blue; color: white; }
.button--importance-secondary { background: gray; color: black; }
.button--size-small { padding: 4px 8px; font-size: 12px; }
.button--size-medium { padding: 8px 16px; font-size: 14px; }
.button--size-large { padding: 12px 24px; font-size: 16px; }
```

## Complete Example

```tsx
import { defineComponent } from 'intent-core'

const Card = defineComponent({
  name: 'Card',
  
  props: {
    elevation: {
      type: 'enum',
      values: ['none', 'low', 'medium', 'high'],
      default: 'low'
    },
    padding: {
      type: 'enum',
      values: ['none', 'compact', 'normal', 'relaxed'],
      default: 'normal'
    },
    interactive: {
      type: 'boolean',
      default: false
    }
  },
  
  constraints: {
    when: {
      'interactive:true': {
        cursor: 'pointer',
        transition: 'box-shadow 150ms ease'
      }
    }
  },
  
  mappings: {
    base: `
      background: var(--intent-color-surface);
      border-radius: var(--intent-radius-lg);
    `,
    elevation: {
      none: 'box-shadow: none;',
      low: 'box-shadow: var(--intent-shadow-sm);',
      medium: 'box-shadow: var(--intent-shadow-md);',
      high: 'box-shadow: var(--intent-shadow-lg);'
    },
    padding: {
      none: 'padding: 0;',
      compact: 'padding: var(--intent-spacing-2);',
      normal: 'padding: var(--intent-spacing-4);',
      relaxed: 'padding: var(--intent-spacing-6);'
    }
  }
})
```

## Design Systems

Define multiple components together:

```tsx
import { defineSystem } from 'intent-core'

const MyDesignSystem = defineSystem({
  name: 'MyDesignSystem',
  
  components: [
    Button,
    Card,
    Stack,
    // ...
  ],
  
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      // ...
    },
    spacing: {
      1: '4px',
      2: '8px',
      4: '16px',
      // ...
    }
  }
})

// Generate everything
const { css, types } = MyDesignSystem.build()
```

## Best Practices

1. **Use semantic names** - `importance` not `color`
2. **Provide defaults** - Every prop should have a default
3. **Constrain values** - Enums over freeform strings
4. **Document constraints** - Explain why combinations are forbidden
5. **Test edge cases** - Validate all prop combinations

## Related

- [Theme API](./theme) - Customizing design tokens
- Component documentation for real-world examples
