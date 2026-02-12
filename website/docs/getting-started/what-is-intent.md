---
sidebar_position: 1
---

# What is Intent?

Intent is a **schema-first, AI-native CSS framework** that bridges the gap between design intent and implementation.

## The Problem

Traditional CSS frameworks force you to write styles manually. You translate design intent into CSS classes, property values, and media queries. This process is:

- **Error-prone** - Typos in class names, inconsistent values
- **Time-consuming** - Endless back-and-forth between design and code
- **Hard to maintain** - Refactoring CSS is painful
- **Not AI-friendly** - LLMs struggle with arbitrary class names

## The Intent Solution

Intent flips the model. Instead of writing CSS, you define **schemas** that describe what a component *is* and what it *can do*. The framework generates everything else.

```tsx
// Define once
const buttonSchema = {
  importance: {
    type: 'enum',
    values: ['primary', 'secondary', 'tertiary'],
    default: 'secondary'
  },
  size: {
    type: 'enum', 
    values: ['small', 'medium', 'large'],
    default: 'medium'
  }
}

// Use everywhere
<Button importance="primary" size="large">
  Get Started
</Button>
```

## Key Concepts

### Schema-First Design

Every component in Intent is defined by a schema. This schema:
- Declares all possible states
- Specifies valid values for each property
- Defines relationships between properties
- Generates TypeScript types automatically

### AI-Native

The schema format is designed for LLMs:
- **Structured** - Easy to parse and understand
- **Constrained** - AI can't generate invalid values
- **Semantic** - Properties describe intent, not implementation

### Type-Safe

Full TypeScript support with autocomplete for all component props. No more guessing at class names.

### Zero Runtime

Intent generates static CSS at build time. No runtime overhead, no JavaScript in the browser for styling.

## Architecture

```
┌─────────────────┐
│  Schema Definition │  ← You write this
└────────┬────────┘
         │
    ┌────▼────┐
    │  Intent   │  ← Schema validation
    │  Compiler │  ← CSS generation
    └────┬────┘
         │
    ┌────▼────┐
    │  Output   │
    │  - CSS    │
    │  - Types  │
    │  - Docs   │
    └─────────┘
```

## Philosophy

### Design Intent Over Implementation

Intent cares about *what* you want to achieve, not *how* it's implemented. You say "this button is primary and large" - Intent figures out the colors, padding, typography, and interactions.

### Constraints Liberate

By constraining the possible values, Intent:
- Prevents design drift
- Ensures accessibility
- Makes code review easier
- Enables AI assistance

### Progressive Enhancement

Start with defaults, customize when needed. Intent provides sensible defaults for everything.

## Comparison

### vs Tailwind CSS

| Aspect | Tailwind | Intent |
|--------|----------|--------|
| Approach | Utility classes | Schema-driven |
| Learning Curve | Hundreds of classes | Semantic properties |
| Type Safety | None | Full |
| AI Friendly | Poor | Excellent |
| Runtime | Zero | Zero |

### vs CSS-in-JS

| Aspect | Styled Components | Intent |
|--------|-------------------|--------|
| Runtime | Heavy | None |
| Bundle Size | Large | Minimal |
| Type Safety | Limited | Full |
| Performance | Runtime overhead | Build-time only |

## When to Use Intent

Intent shines when:
- Building design systems
- Working with AI coding assistants
- Maintaining large applications
- Prioritizing type safety
- Reducing CSS bundle sizes

## Getting Started

Ready to try Intent?

→ [Installation Guide](./installation)

→ [Quick Start Tutorial](./quick-start)

→ [Component Library](../components)
