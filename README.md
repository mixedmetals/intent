# Intent

> A Schema-First, AI-Native Styling Framework

Intent treats styling as a **type system** with compile-time validation. Instead of thousands of utility classes, you define constrained, semantic components that prevent invalid states at the schema level.

## Why Intent?

```tsx
// Tailwind: 60+ tokens, any combination valid (including broken ones)
<button className="inline-flex items-center justify-center px-4 py-2
  rounded-md font-medium bg-indigo-500 text-white hover:bg-indigo-600
  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors">
  Save
</button>

// Intent: 4 tokens, compile-time validated
<Button importance="primary" size="md">Save</Button>
```

**Key differences:**

- ✅ **75% fewer tokens** for AI to generate
- ✅ **Invalid prop combinations** caught at compile time
- ✅ **Dark mode works automatically** via token system
- ✅ **MCP server** for real-time AI validation

## Quick Start

```bash
# Install
npm install intent-core intent-react
npm install -D intent-cli

# Initialize (creates intent.config.ts with full design system)
npx intent init

# Compile to CSS
npx intent compile

# Validate your components
npx intent validate
```

## Usage

```tsx
import { Stack, Button, Text, Surface, Badge } from 'intent-react';

function Dashboard() {
  return (
    <Stack direction="column" gap="relaxed">
      <Surface elevation="low" padding="relaxed" radius="lg">
        <Stack direction="row" align="center" justify="between">
          <Text size="lg" weight="semibold">Projects</Text>
          <Badge importance="success" size="sm">Active</Badge>
        </Stack>
      </Surface>
      
      <Stack direction="row" gap="normal">
        <Button importance="primary">Create</Button>
        <Button importance="secondary">Export</Button>
        <Button importance="ghost">Cancel</Button>
      </Stack>
    </Stack>
  );
}
```

## Design System Schema

Define your design system in `intent.config.ts`:

```typescript
import { defineSystem, defineComponent, prop, when } from 'intent-core';

export default defineSystem({
  name: 'MyDesignSystem',
  tokens: {
    color: {
      'brand-primary': '#6366F1',
      'surface-default': '#FFFFFF',
      'text-default': '#0F172A',
    },
    space: {
      tight: '4px',
      normal: '12px',
      relaxed: '16px',
    },
  },
  darkTokens: {
    color: {
      'brand-primary': '#818CF8',
      'surface-default': '#0F172A',
      'text-default': '#F1F5F9',
    },
  },
  components: {
    Button: defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary', 'ghost', 'danger'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      },
      constraints: [
        when({ importance: 'danger' }).require(
          { size: ['md', 'lg'] },
          'Danger actions require larger touch targets'
        ),
      ],
      mappings: {
        'importance=primary': { background: 'brand-primary', color: 'text-inverse' },
        'importance=secondary': { background: 'transparent', border: '1px solid border-default' },
      },
    }),
  },
});
```

## Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| Stack | Flexbox layout | direction, gap, align, justify |
| Surface | Container with elevation | elevation, padding, background, radius |
| Button | Interactive trigger | importance, size |
| Text | Typography | size, weight, color, align |
| Badge | Status label | importance, size |
| Input | Form input | size, state |
| Divider | Visual separator | orientation, weight |

## Packages

| Package | Description |
|---------|-------------|
| `intent-core` | Schema definition, compiler, CSS generator, validator |
| `intent-react` | React components with TypeScript props |
| `intent-cli` | CLI for compile, validate, init, migrate, generate |
| `intent-mcp` | MCP server for AI integration |

## Architecture

```
intent.config.ts → intent compile → .intent/intent.css
     (schema)        (compiler)      (static CSS)
                                        ↓
                    React components emit data-* attributes
                    CSS attribute selectors apply styles
                    Zero runtime overhead
```

## Dark Mode

Intent supports dark mode via token overrides. Define `darkTokens` in your config — the compiler generates both `@media (prefers-color-scheme: dark)` and a `.dark` class toggle:

```tsx
// Toggle programmatically
document.documentElement.classList.toggle('dark');
```

## AI Integration

### MCP Server

```bash
npx intent-mcp
```

Provides tools: `get_component_schema`, `validate_component_usage`, `suggest_component_props`, `get_design_tokens`

### Cursor/Claude Rules

```bash
npx intent generate --prompt
# Generates .intent/ai-prompt.md for .cursorrules
```

## License

MIT
