# What is Intent?

Intent is a **schema-first, AI-native CSS framework** that generates 74× smaller CSS than Tailwind CSS by using per-property attribute selectors instead of combinatorial utility classes.

## Core Philosophy

### Schema-First Design

Traditional CSS frameworks use utility classes (Tailwind) or pre-built components (Bootstrap). Intent takes a different approach:

1. **Define your component schema** with TypeScript
2. **Intent generates optimized CSS** from the schema
3. **Use semantic props** in your components
4. **AI understands your design system** via schemas

### Why This Matters

| Problem | Traditional Solution | Intent Solution |
|---------|---------------------|-----------------|
| CSS bloat | PurgeCSS (imperfect) | Per-property selectors (perfect) |
| Type safety | None (className strings) | Full TypeScript validation |
| AI code generation | Unreliable (class guessing) | Reliable (semantic props) |
| Design consistency | Documentation | Enforced by schema |

## Key Features

### 🎯 Schema-First Components

```typescript
// Define once
const ButtonSchema = defineComponent({
  name: 'Button',
  properties: {
    importance: {
      type: 'enum',
      values: ['primary', 'secondary', 'ghost'],
      default: 'secondary'
    }
  }
})

// Use everywhere
<Button importance="primary">Click me</Button>
```

### 🤖 AI-Native

Intent schemas provide complete context for AI assistants:

```tsx
// AI sees the schema and generates valid code
<Card elevation="low" padding="normal">
  <Text size="lg" weight="bold">Title</Text>
  <Text color="muted">Description</Text>
</Card>
```

### ⚡ 74× Smaller CSS

| Framework | CSS Size | Approach |
|-----------|----------|----------|
| Tailwind CSS | ~588KB | 50,000+ utility classes |
| Intent | **~8KB** | Per-property selectors |

### 🔒 Type-Safe

Catch errors at build time:

```tsx
// ❌ TypeScript error: 'variant' is not a valid prop
<Button variant="primary">Text</Button>

// ✅ Valid
<Button importance="primary">Text</Button>
```

### 🎨 Complete Theme System

```typescript
import { defaultTheme, extendTheme } from 'intent-core'

const myTheme = extendTheme('default', {
  tokens: {
    color: {
      primary: { 500: '#your-brand-color' }
    }
  }
})
```

## How It Works

### 1. Schema Definition

```typescript
// my-button.schema.ts
import { defineComponent } from 'intent-core'

export const ButtonSchema = defineComponent({
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
    }
  },
  mappings: {
    'importance=primary': {
      backgroundColor: 'var(--intent-color-primary-600)',
      color: 'white'
    },
    'size=lg': {
      padding: '1rem 2rem',
      fontSize: '1.125rem'
    }
  }
})
```

### 2. CSS Generation

Intent compiles schemas to efficient CSS:

```css
/* Generated CSS */
.intent-button[data-importance="primary"] {
  background-color: var(--intent-color-primary-600);
  color: white;
}

.intent-button[data-size="lg"] {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
```

### 3. React Component

```tsx
// Button.tsx
import { ButtonSchema } from './my-button.schema'

export const Button = (props) => {
  return (
    <button
      className="intent-button"
      data-importance={props.importance}
      data-size={props.size}
    >
      {props.children}
    </button>
  )
}
```

## Comparison with Other Frameworks

### vs Tailwind CSS

| | Tailwind CSS | Intent |
|---|---|---|
| **Approach** | Utility classes | Schema-generated selectors |
| **CSS Size** | ~588KB | ~8KB |
| **Type Safety** | ❌ | ✅ Full TS |
| **AI-Friendly** | ❌ | ✅ |
| **Learning Curve** | Memorize classes | Learn props |

### vs Bootstrap

| | Bootstrap | Intent |
|---|---|---|
| **Approach** | Pre-built components | Schema-defined components |
| **Customization** | Override CSS | Theme tokens |
| **Bundle Size** | ~200KB | ~8KB |
| **Modern** | ❌ jQuery era | ✅ Modern React |

### vs Chakra UI

| | Chakra UI | Intent |
|---|---|---|
| **Approach** | Style props | Schema props |
| **CSS-in-JS** | Emotion/Styled | Generated CSS |
| **Runtime** | Runtime overhead | Zero runtime |
| **AI-Friendly** | ⚠️ Partial | ✅ Full schema |

## When to Use Intent

### ✅ Perfect For

- **Design systems** that need consistency
- **AI-assisted development** workflows
- **Performance-critical** applications
- **TypeScript-first** projects
- **Component libraries**

### ⚠️ Consider Alternatives When

- **Prototyping quickly** (Tailwind might be faster)
- **Small projects** without design system needs
- **Non-React projects** (Vue/Svelte support coming)

## Next Steps

- [Installation Guide](/docs/getting-started/installation)
- [All Components](/docs/components/)
- [Component Documentation](/docs/components/button)
