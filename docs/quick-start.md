# Quick Start Guide

Get started with Intent in 5 minutes.

## Installation

```bash
# Create a new project
mkdir my-app && cd my-app
npm init -y

# Install Intent
npm install -D @intent/cli
npm install @intent/react

# Initialize Intent
npx intent init
```

## Define Your Design System

Edit `intent.config.ts`:

```typescript
import { defineSystem, defineComponent, prop, when } from '@intent/core';

export default defineSystem({
  name: 'MyApp',
  tokens: {
    color: {
      'brand-primary': '#3B82F6',
      'brand-secondary': '#64748B',
      'surface-default': '#FFFFFF',
      'text-default': '#1E293B',
    },
    space: {
      'tight': '4px',
      'normal': '8px',
      'relaxed': '16px',
    },
  },
  components: {
    Button: defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      },
      constraints: [],
      mappings: {
        'importance=primary': { background: 'brand-primary', color: 'surface-default' },
        'importance=secondary': { background: 'transparent', border: '1px solid brand-secondary' },
      },
    }),
  },
});
```

## Compile

```bash
npx intent compile
```

This generates:
- `.intent/intent.css` - Compiled CSS
- `.intent/types.d.ts` - TypeScript definitions
- `.intent/ai-manifest.json` - AI documentation

## Use in Your App

```tsx
// main.tsx
import '.intent/intent.css';
import { Button, Stack } from '@intent/react';

function App() {
  return (
    <Stack direction="row" gap="normal">
      <Button importance="primary" size="md">Save</Button>
      <Button importance="secondary" size="md">Cancel</Button>
    </Stack>
  );
}
```

## Validate

```bash
# Check your components for errors
npx intent validate

# Generate AI documentation
npx intent generate --prompt
```

## Next Steps

- Read the [AI Starter Prompt](./ai-starter-prompt.md) for your Cursor/Claude configuration
- Check out the [example dashboard](../examples/dashboard) for a complete implementation
- Review [ADR-001](./ADR-001-constraints-over-utilities.md) for design philosophy
