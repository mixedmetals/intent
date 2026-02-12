# Quick Start

Get up and running with Intent Framework in minutes.

## Prerequisites

- Node.js 18+ 
- React 18+ (for React components)
- TypeScript 5+ (recommended)

## 1. Create a Project

### With Vite

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### With Next.js

```bash
npx create-next-app@latest my-app --typescript
cd my-app
```

## 2. Install Intent

```bash
npm install intent-core intent-react
```

## 3. Add Styles

### Option A: Import CSS (Recommended)

```tsx
// main.tsx or App.tsx
import 'intent-core/theme.css'
```

### Option B: Custom Build

```bash
npx intentcss-cli init
npx intentcss-cli build
```

Then import the generated CSS:

```tsx
import './intent.css'
```

## 4. Use Components

```tsx
// App.tsx
import { Stack, Button, Text, Card } from 'intent-react'

function App() {
  return (
    <Stack direction="column" gap="relaxed" padding="normal">
      <Text size="2xl" weight="bold">
        Welcome to Intent!
      </Text>
      
      <Card elevation="low">
        <Text color="muted">
          Start building with schema-first components.
        </Text>
      </Card>
      
      <Stack direction="row" gap="normal">
        <Button importance="primary">Get Started</Button>
        <Button importance="secondary">Learn More</Button>
      </Stack>
    </Stack>
  )
}

export default App
```

## 5. Run Your App

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## What's Next?

### Learn the Basics

- [Component Documentation](/docs/components/) - Browse all 72 components
- [Schema Definition](/docs/api/schema) - Define custom components
- [Theming](/docs/api/theme) - Customize the design

### Try Examples

```tsx
// Form example
import { Form, Field, Input, Button } from 'intent-react'

function LoginForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <Field label="Email">
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field label="Password">
        <Input type="password" />
      </Field>
      <Button importance="primary" fullWidth>
        Sign In
      </Button>
    </Form>
  )
}
```

```tsx
// Modal example
import { useState } from 'react'
import { Button, Modal, Text } from 'intent-react'

function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      
      <Modal open={open} onOpenChange={setOpen}>
        <Text weight="bold">Are you sure?</Text>
        <Text color="muted">This action cannot be undone.</Text>
        <Button importance="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal>
    </>
  )
}
```

## Common Issues

### Styles not loading?

Make sure you've imported the theme CSS:

```tsx
import 'intent-core/theme.css'
```

### TypeScript errors?

Ensure TypeScript is configured correctly:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```

### Components look unstyled?

Check that the CSS file path is correct and the file exists in your build output.

## Getting Help

- [GitHub Discussions](https://github.com/mixedmetals/intent/discussions)
- [GitHub Issues](https://github.com/mixedmetals/intent/issues)
- Documentation: [intentcss.dev](https://intentcss.dev)

Happy building! 🚀
