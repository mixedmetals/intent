---
sidebar_position: 2
---

# Installation

Get Intent Framework running in your project.

## Package Overview

Intent is distributed as modular packages:

| Package | Purpose | Install |
|---------|---------|---------|
| `intent-core` | Schemas, theme, base CSS | Required |
| `intent-react` | React components | For React apps |
| `intent-vue` | Vue components | For Vue apps |
| `intent-cli` | Build tools, code generation | Dev dependency |

## Quick Install

### React Applications

```bash
npm install intent-core intent-react
```

### Vue Applications

```bash
npm install intent-core intent-vue
```

### CLI Tools (Recommended)

```bash
npm install -D intent-cli
```

## Setup Methods

### Method 1: Pre-built CSS (Easiest)

Import the default theme CSS in your app entry:

```tsx
// main.tsx or App.tsx
import 'intent-core/theme.css'
```

That's it. You're ready to use components.

### Method 2: Custom Build (Advanced)

For custom themes and tree-shaking:

```bash
# Initialize configuration
npx intent-cli init

# This creates:
# - intent.config.js
# - theme.config.js

# Build custom CSS
npx intent-cli build
```

Import the generated CSS:

```tsx
import './intent.css'
```

### Method 3: CDN (Prototyping)

For quick prototypes or CodePen:

```html
<link rel="stylesheet" href="https://cdn.intentcss.dev/theme.css" />
<script type="module">
  import { Button } from 'https://cdn.intentcss.dev/react.js'
</script>
```

## Framework Guides

### Vite

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install intent-core intent-react
```

```tsx
// main.tsx
import 'intent-core/theme.css'
```

### Next.js

```bash
npx create-next-app@latest my-app --typescript
cd my-app
npm install intent-core intent-react
```

```tsx
// app/layout.tsx
import 'intent-core/theme.css'
```

### Remix

```bash
npx create-remix@latest
cd my-app
npm install intent-core intent-react
```

```tsx
// app/root.tsx
import intentStyles from 'intent-core/theme.css?url'

export const links = () => [
  { rel: 'stylesheet', href: intentStyles }
]
```

## TypeScript Configuration

Intent works best with strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler"
  }
}
```

## Verification

Test your installation:

```tsx
import { Button } from 'intent-react'

function App() {
  return (
    <Button importance="primary">
      Intent is working!
    </Button>
  )
}
```

You should see a styled button rendering correctly.

## Troubleshooting

### Styles not loading?

- Verify CSS import path
- Check browser DevTools for 404 errors
- Ensure build process handles CSS imports

### TypeScript errors?

- Check `moduleResolution` is set to `"bundler"` or `"node"`
- Restart TypeScript server in your editor

### Components look unstyled?

- Ensure theme CSS is loaded before components render
- Check for CSS specificity conflicts

## Next Steps

- [Quick Start](./quick-start) - Build your first screen
- [Components](../components) - Explore the component library
- [API Reference](../api/schema) - Learn the schema syntax
