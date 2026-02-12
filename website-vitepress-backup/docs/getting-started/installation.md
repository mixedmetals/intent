# Installation

## Package Overview

| Package | Purpose | Install |
|---------|---------|---------|
| `intent-core` | Schema compiler, themes, validation | Required |
| `intent-react` | React components | For React apps |
| `intentcss-cli` | Build tools, CLI | Dev dependency |
| `intent-mcp` | AI integration | Optional |

## Quick Install

### React Applications

::: code-group

```bash [npm]
npm install intent-core intent-react
npm install -D intentcss-cli
```

```bash [pnpm]
pnpm add intent-core intent-react
pnpm add -D intentcss-cli
```

```bash [yarn]
yarn add intent-core intent-react
yarn add -D intentcss-cli
```

:::

### Framework-Specific

#### Next.js

```bash
npm install intent-core intent-react
```

No additional configuration needed for Next.js 13+ with App Router.

#### Vite

```bash
npm install intent-core intent-react
```

Add to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Intent works out of the box with Vite
})
```

#### Remix

```bash
npm install intent-core intent-react
```

Intent works with Remix without additional configuration.

## CLI Setup

### Initialize Project

```bash
npx intentcss-cli init
```

This creates:
- `intent.config.ts` - Configuration file
- `.intent/` - Cache directory
- Basic folder structure

### Manual Setup

Create `intent.config.ts`:

```typescript
import { defineConfig } from 'intentcss-cli'

export default defineConfig({
  // Input: Your component schemas
  input: './src/schemas',
  
  // Output: Generated CSS
  output: './public/intent.css',
  
  // Theme configuration
  theme: {
    name: 'default',
    // Custom tokens...
  },
  
  // Minify in production
  minify: process.env.NODE_ENV === 'production',
})
```

### Build CSS

```bash
# Development (watch mode)
npx intentcss-cli watch

# Production build
npx intentcss-cli build
```

### Add to HTML

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Intent CSS -->
  <link rel="stylesheet" href="/intent.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## TypeScript Configuration

Intent provides full TypeScript support out of the box.

### tsconfig.json

No special configuration needed. Intent works with standard React TypeScript setups.

### Type Generation (Optional)

Generate types from your custom schemas:

```bash
npx intentcss-cli types --output ./src/types/intent.d.ts
```

## Verification

Test your installation:

```tsx
import { Button, Stack, Text } from 'intent-react'

function Test() {
  return (
    <Stack direction="column" gap="normal">
      <Text size="lg">Intent is working!</Text>
      <Button importance="primary">Test Button</Button>
    </Stack>
  )
}
```

You should see:
- Styled button with proper colors
- Text with correct sizing
- Stack with proper spacing

## Troubleshooting

### CSS Not Loading

1. Check that `intent.css` is built:
   ```bash
   npx intentcss-cli build
   ```

2. Verify the CSS file path in your HTML

3. Check for 404 errors in browser dev tools

### TypeScript Errors

1. Ensure `intent-core` is installed:
   ```bash
   npm list intent-core
   ```

2. Restart TypeScript server in your IDE

3. Check `tsconfig.json` includes your source files

### Components Not Styled

1. Verify CSS is loaded before React app
2. Check browser console for errors
3. Ensure no conflicting CSS frameworks

## Next Steps

- [Quick Start Tutorial](/docs/getting-started/what-is-intent) - Learn more about Intent
- [Theming Guide](/docs/api/theme) - Customize the default theme
- [Component Docs](/docs/components/) - Browse all components
