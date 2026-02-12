---
layout: home

hero:
  name: "Intent Framework"
  text: "The Schema-First, AI-Native CSS Framework"
  tagline: 74× smaller CSS than Tailwind. Type-safe. Built for the AI era.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started/what-is-intent
    - theme: alt
      text: View on GitHub
      link: https://github.com/mixedmetals/intent

features:
  - icon: 🎯
    title: Schema-First Design
    details: Define components with TypeScript schemas. AI generates valid code. Constraints prevent errors.
  - icon: 🤖
    title: AI-Native
    details: Built for AI code generation. Complete schemas provide context. Semantic props are AI-friendly.
  - icon: 🔒
    title: Type-Safe
    details: Full TypeScript validation. Props are checked. Invalid combinations are caught at build time.
  - icon: ⚡
    title: 74× Smaller CSS
    details: ~8KB vs Tailwind's ~588KB. Per-property selectors. 60× faster build times.
  - icon: 🎨
    title: Complete Theme System
    details: 9 color palettes. Dark mode built-in. Theme inheritance. Component tokens.
  - icon: 🧩
    title: 72 Components
    details: Production-ready React components. Forms, overlays, navigation, data display.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3b82f6 30%, #8b5cf6);
  --vp-button-brand-bg: #3b82f6;
  --vp-button-brand-hover-bg: #2563eb;
}

.VPHero .tagline {
  font-size: 1.2rem;
  margin-top: 1rem;
}

.vp-doc h2 {
  border-top: none;
  margin-top: 0;
}
</style>

## Quick Start

::: code-group

```bash [npm]
npm install intent-core intent-react
```

```bash [pnpm]
pnpm add intent-core intent-react
```

```bash [yarn]
yarn add intent-core intent-react
```

:::

```tsx
import { Button, Stack, Text } from 'intent-react'

function App() {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="lg" weight="bold">Hello Intent</Text>
      <Stack direction="row" gap="normal">
        <Button importance="primary">Save</Button>
        <Button importance="secondary">Cancel</Button>
      </Stack>
    </Stack>
  )
}
```

## Why Intent?

### Tailwind CSS vs Intent Framework

**Tailwind Approach (Utility Classes):**
```tsx
<button className="bg-blue-500 hover:bg-blue-600 text-white 
  px-4 py-2 rounded-lg transition-all duration-200 
  disabled:opacity-50 disabled:cursor-not-allowed">
  Click me
</button>
```

**Intent Approach (Schema-First):**
```tsx
<Button importance="primary" size="md">
  Click me
</Button>
```

| | Tailwind CSS | Intent Framework |
|---|---|---|
| **CSS Size** | ~588KB | **~8KB** (74× smaller) |
| **Classes** | 50,000+ | Per-component selectors |
| **Build Time** | ~3 seconds | **~50ms** (60× faster) |
| **Type Safety** | ❌ Runtime strings | ✅ Compile-time checks |
| **AI-Friendly** | ❌ Class memorization | ✅ Semantic props |

## Component Showcase

<div class="component-grid">

**Button**
```tsx
<Button importance="primary">Primary</Button>
<Button importance="secondary">Secondary</Button>
<Button importance="ghost">Ghost</Button>
```

**Alert**
```tsx
<Alert status="success">Operation successful!</Alert>
<Alert status="error">Something went wrong.</Alert>
```

**Input**
```tsx
<Input placeholder="Enter your name" />
<Input type="email" validation="invalid" />
```

</div>

## What Makes Intent Different?

### 1. Schema-First Design

Define once, use everywhere:

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
    }
  },
  constraints: [
    // Prevent invalid combinations
    when({ importance: 'ghost' }).forbid(['loading'])
  ],
  mappings: {
    'importance=primary': {
      backgroundColor: '#3b82f6',
      color: 'white'
    }
  }
})
```

### 2. AI-Native Architecture

Intent is built for AI code generation:
- Complete schemas provide full context
- Semantic property names
- Constraint validation prevents errors
- Works with Claude, GPT, Copilot

### 3. Complete Theme System

```typescript
import { defaultTheme, extendTheme } from 'intent-core'

const customTheme = extendTheme('default', {
  tokens: {
    color: {
      primary: {
        500: '#FF6B6B'  // Your brand color
      }
    }
  }
})
```

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Community

- [GitHub Discussions](https://github.com/mixedmetals/intent/discussions)
- [Twitter](https://twitter.com/intentcss)
- [Discord](https://discord.gg/intent) (coming soon)

---

<div align="center">

**Ready to try Intent?**

[Get Started →](/docs/getting-started/what-is-intent)

</div>
