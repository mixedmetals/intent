# Schema Definition API

Intent uses schemas to define components, their properties, and visual mappings.

## defineComponent

Creates a component schema.

```typescript
import { defineComponent } from 'intent-core'

const Button = defineComponent({
  name: 'Button',
  description: 'Clickable button element',
  properties: {
    importance: {
      type: 'enum',
      values: ['primary', 'secondary', 'ghost'],
      default: 'secondary'
    }
  },
  mappings: {
    'importance=primary': {
      backgroundColor: '#3b82f6',
      color: 'white'
    }
  }
})
```

## Schema Options

### name

**Type:** `string` (required)

The component name. Used for CSS class generation.

```typescript
name: 'Button' // Generates .intent-button
```

### description

**Type:** `string`

Human-readable description for documentation.

```typescript
description: 'Clickable button element'
```

### properties

**Type:** `Record<string, PropertyDefinition>`

Define the component's props.

#### Enum Property

```typescript
properties: {
  size: {
    type: 'enum',
    values: ['sm', 'md', 'lg'],
    default: 'md',      // Optional
    required: false     // Optional
  }
}
```

#### Boolean Property

```typescript
properties: {
  disabled: {
    type: 'boolean',
    default: false
  }
}
```

#### String Property

```typescript
properties: {
  placeholder: {
    type: 'string',
    default: ''
  }
}
```

#### Number Property

```typescript
properties: {
  maxLength: {
    type: 'number',
    default: 100
  }
}
```

### constraints

**Type:** `Constraint[]`

Prevent invalid prop combinations.

```typescript
constraints: [
  // Forbid loading on ghost buttons
  {
    when: { importance: 'ghost' },
    forbid: ['loading'],
    message: 'Ghost buttons cannot show loading state'
  },
  
  // Require icon when circular
  {
    when: { shape: 'circle' },
    require: { icon: [] },
    message: 'Circular buttons must have an icon'
  }
]
```

### mappings

**Type:** `Record<string, CSSProperties>`

Map property values to CSS styles.

```typescript
mappings: {
  // Single property
  'importance=primary': {
    backgroundColor: 'var(--intent-color-primary-600)',
    color: 'white'
  },
  
  // Multiple properties (AND)
  'importance=primary,size=lg': {
    padding: '1rem 2rem'
  },
  
  // Responsive (if supported)
  'size=lg,md:': {  // md: prefix = at medium breakpoint
    fontSize: '1.25rem'
  }
}
```

### baseStyles

**Type:** `CSSProperties`

Styles applied regardless of props.

```typescript
baseStyles: {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '0.375rem',
  cursor: 'pointer'
}
```

## Constraint Helpers

### when

Create conditional constraints.

```typescript
import { when, forbid, require } from 'intent-core'

constraints: [
  when({ importance: 'ghost' }).forbid(['loading']),
  when({ size: 'sm' }).suggest({ padding: 'compact' }),
  when({ variant: 'solid' }).require({ color: [] })
]
```

### forbid

Prevent certain prop combinations.

```typescript
forbid(['prop1', 'prop2'])
```

### require

Require certain props.

```typescript
require({ icon: [], label: [] })
```

### suggest

Provide default suggestions (not enforced).

```typescript
suggest({ size: 'md', importance: 'secondary' })
```

## Complete Example

```typescript
import { defineComponent, when } from 'intent-core'

export const CardSchema = defineComponent({
  name: 'Card',
  description: 'Container for grouped content',
  
  properties: {
    elevation: {
      type: 'enum',
      values: ['none', 'low', 'medium', 'high'],
      default: 'low'
    },
    padding: {
      type: 'enum',
      values: ['none', 'sm', 'md', 'lg'],
      default: 'md'
    },
    radius: {
      type: 'enum',
      values: ['none', 'sm', 'md', 'lg'],
      default: 'md'
    },
    interactive: {
      type: 'boolean',
      default: false
    }
  },
  
  constraints: [
    // High elevation suggests interactivity
    when({ elevation: 'high' })
      .suggest({ interactive: true }),
    
    // Non-interactive cards shouldn't have high elevation
    when({ interactive: false, elevation: 'high' })
      .suggest({ elevation: 'medium' })
  ],
  
  mappings: {
    // Elevation shadows
    'elevation=none': { boxShadow: 'none' },
    'elevation=low': { boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    'elevation=medium': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    'elevation=high': { boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
    
    // Padding
    'padding=sm': { padding: '0.5rem' },
    'padding=md': { padding: '1rem' },
    'padding=lg': { padding: '1.5rem' },
    
    // Radius
    'radius=sm': { borderRadius: '0.25rem' },
    'radius=md': { borderRadius: '0.5rem' },
    'radius=lg': { borderRadius: '1rem' }
  },
  
  baseStyles: {
    backgroundColor: 'white',
    border: '1px solid var(--intent-color-neutral-200)'
  }
})
```

## Type Generation

Generate TypeScript types from schemas:

```bash
npx intentcss-cli types --input ./src/schemas --output ./src/types/intent.d.ts
```

## Best Practices

1. **Use semantic names** - `importance` not `color`
2. **Provide defaults** - Every prop should have a default
3. **Add constraints** - Prevent invalid combinations
4. **Document with description** - Helps AI and developers
5. **Use CSS variables** - Enable theming
