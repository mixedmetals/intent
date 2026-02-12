# intent-core

[![npm version](https://img.shields.io/npm/v/intent-core.svg)](https://www.npmjs.com/package/intent-core)
[![License](https://img.shields.io/npm/l/intent-core.svg)](https://github.com/mixedmetals/intent-framework/blob/main/LICENSE)

> Core schema definition, compiler, and validator for the Intent styling framework.

## Installation

```bash
npm install intent-core
# or
pnpm add intent-core
# or
yarn add intent-core
```

## Quick Start

```typescript
import { defineComponent, defineSystem } from 'intent-core';

// Define a component schema
const Button = defineComponent({
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
      backgroundColor: '#3B82F6',
      color: 'white'
    },
    'size=lg': {
      padding: '1rem 2rem',
      fontSize: '1.125rem'
    }
  }
});

// Create a design system
const system = defineSystem({
  name: 'MyDesignSystem',
  tokens: {
    color: {
      primary: '#3B82F6'
    }
  },
  components: { Button }
});
```

## Features

- **Schema-First Design** - Define components with TypeScript schemas
- **Constraint Validation** - Prevent invalid prop combinations
- **CSS Generation** - Compile schemas to optimized CSS
- **Type Generation** - Generate TypeScript types from schemas
- **Theme System** - Inheritance, composition, dark mode
- **Plugin Architecture** - Extend with custom functionality

## API Reference

### Schema Definition

- `defineComponent(config)` - Define a component schema
- `defineSystem(config)` - Create a design system
- `prop` - Property definition helpers
- `when(), forbid(), require()` - Constraint helpers

### Validation

- `validateSchema(schema)` - Validate a schema definition
- `validateUsage(usage, schema)` - Validate component usage
- `validateConstraints(props, constraints)` - Check constraints

### CSS Generation

- `compileComponent(schema)` - Compile single component
- `compileSystem(system)` - Compile entire system
- `generateCSSVariables(tokens)` - Generate CSS variables
- `generateDarkModeVariables(tokens)` - Generate dark mode CSS

### Type Generation

- `generateComponentTypes(schema)` - Generate component types
- `generateTokenTypes(tokens)` - Generate token types
- `generateSystemTypes(system)` - Generate system types

### Theme System

- `registerTheme(theme)` - Register a theme
- `resolveTheme(name)` - Resolve theme with inheritance
- `extendTheme(base, overrides)` - Create theme variant
- `composeThemes(themes)` - Combine multiple themes

## Example: Complete Schema

```typescript
import { 
  defineComponent, 
  prop,
  when,
  forbid 
} from 'intent-core';

const Card = defineComponent({
  name: 'Card',
  description: 'Container for grouped content',
  properties: {
    elevation: prop.enum(['none', 'low', 'medium', 'high'], {
      default: 'low'
    }),
    padding: prop.enum(['none', 'sm', 'md', 'lg'], {
      default: 'md'
    }),
    radius: prop.enum(['none', 'sm', 'md', 'lg'], {
      default: 'md'
    }),
    interactive: prop.boolean({ default: false })
  },
  constraints: [
    // Prevent high elevation without interactivity
    when({ elevation: 'high' })
      .suggest({ interactive: true })
  ],
  mappings: {
    'elevation=low': {
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    'elevation=high': {
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
    },
    'padding=sm': { padding: '0.5rem' },
    'padding=md': { padding: '1rem' },
    'padding=lg': { padding: '1.5rem' }
  }
});
```

## License

MIT © Intent Framework Contributors
