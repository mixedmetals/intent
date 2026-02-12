# Intent Framework

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/intent-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-162%20passing-brightgreen.svg)]()

> **Schema-First, AI-Native Styling Framework**

Intent is a revolutionary CSS framework that uses per-property attribute selectors instead of utility classes, achieving **74x CSS reduction** (588KB → 8KB) compared to traditional utility-first approaches like Tailwind CSS.

## 🚀 Quick Start

```bash
# Install the core package
npm install intent-core

# For React components
npm install intent-react

# CLI tools
npm install -g intentcss-cli
```

```tsx
import { Stack, Button, Text } from 'intent-react';

function App() {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="lg" weight="bold">Hello Intent</Text>
      <Stack direction="row" gap="normal">
        <Button importance="primary">Save</Button>
        <Button importance="secondary">Cancel</Button>
      </Stack>
    </Stack>
  );
}
```

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`intent-core`](packages/core) | 1.0.0 | Schema definition, compiler, validator |
| [`intent-react`](packages/react) | 1.0.0 | React component library |
| [`intentcss-cli`](packages/cli) | 1.0.0 | CLI tools and build pipeline |
| [`intent-mcp`](packages/mcp) | 1.0.0 | MCP server for AI integration |

## ✨ Key Features

### 1. Schema-First Design
Define your design system with TypeScript schemas:

```typescript
import { defineComponent } from 'intent-core';

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
    },
  },
  mappings: {
    'importance=primary': { 
      backgroundColor: 'var(--intent-color-primary-600)',
      color: 'white'
    },
    'size=sm': { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    'size=lg': { padding: '1rem 2rem', fontSize: '1.125rem' },
  },
});
```

### 2. AI-Native
Built for AI code generation with:
- Complete component schemas for context
- Constraint validation for error prevention
- Semantic property names

### 3. Massive CSS Reduction
| Metric | Tailwind | Intent | Reduction |
|--------|----------|--------|-----------|
| CSS Size | 588 KB | 8 KB | **74x** |
| Classes | 50,000+ | Per-component | **~99%** |
| Build Time | ~3s | ~50ms | **60x** |

### 4. Theme System
Comprehensive theming with dark mode support:

```typescript
import { defaultTheme, generateThemeCSS } from 'intent-core';

// Generate CSS variables
const css = generateThemeCSS(defaultTheme);
```

### 5. Component Library (66+ Components)

**Layout:** Container, Grid, Box, AspectRatio, Center, Spacer, Show, Hide

**Typography:** Heading, Text, Paragraph, List, Code, Quote, Prose, Kbd, Mark

**Forms:** Input, Textarea, Select, Checkbox, Radio, Switch, Label, Form

**Feedback:** Alert, Progress, Spinner, Skeleton

**Overlay:** Modal, Drawer, Tooltip, Popover, Menu

**Navigation:** Tabs, Breadcrumbs, Pagination, Link, Nav, Command, Steps, Sidebar, Navbar

**Data Display:** Table, Stat, Timeline, DescriptionList, Tree, Calendar

## 🛠️ Usage

### With React

```tsx
import { 
  Stack, VStack, HStack,
  Button, 
  Card,
  Text,
  Input,
  Modal
} from 'intent-react';

function MyApp() {
  return (
    <VStack gap="relaxed" padding="normal">
      <Text size="2xl" weight="bold">Welcome</Text>
      
      <Card elevation="low">
        <Input placeholder="Enter your name" />
        <HStack gap="normal" justify="end">
          <Button importance="ghost">Cancel</Button>
          <Button importance="primary">Submit</Button>
        </HStack>
      </Card>
    </VStack>
  );
}
```

### CLI Usage

```bash
# Initialize Intent in your project
intent init

# Compile schemas to CSS
intent build --input ./src/schemas --output ./dist/styles.css

# Watch for changes
intent watch --input ./src/schemas

# Validate component usage
intent validate --src ./src
```

### Custom Schema

```typescript
// my-component.schema.ts
import { defineComponent } from 'intent-core';

export const MyComponentSchema = defineComponent({
  name: 'MyComponent',
  properties: {
    variant: {
      type: 'enum',
      values: ['solid', 'outline', 'ghost'],
      default: 'solid'
    },
    size: {
      type: 'enum',
      values: ['sm', 'md', 'lg'],
      default: 'md'
    }
  },
  mappings: {
    'variant=solid': {
      backgroundColor: 'var(--intent-color-primary-600)',
      color: 'white'
    },
    'variant=outline': {
      backgroundColor: 'transparent',
      border: '1px solid var(--intent-color-primary-600)',
      color: 'var(--intent-color-primary-600)'
    }
  }
});
```

## 🎨 Theming

```typescript
import { extendTheme, registerTheme } from 'intent-core';

const customTheme = extendTheme('default', {
  tokens: {
    color: {
      primary: {
        500: '#FF6B6B',
        600: '#EE5A5A'
      }
    }
  }
});

registerTheme(customTheme);
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build all packages
pnpm build
```

## 📊 Bundle Analysis

Intent includes a built-in bundle analyzer:

```typescript
import { analyzeBundle, compareBundleSizes } from 'intent-core';

const analysis = analyzeBundle('./dist/styles.css');
console.log(`CSS Size: ${analysis.minifiedSize} bytes`);

// Compare with Tailwind
const comparison = compareBundleSizes(intentCSS, tailwindCSS);
console.log(`Intent is ${comparison.ratio}x smaller`);
```

## 🤖 AI Integration

Intent is designed for AI code generation. Use the MCP server for Claude, GPT, and other AI assistants:

```bash
# Start MCP server
intent-mcp
```

## 📖 Documentation

- [Core Package Documentation](packages/core/README.md)
- [React Components](packages/react/README.md)
- [CLI Tools](packages/cli/README.md)
- [MCP Server](packages/mcp/README.md)

## 🔧 Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0 (optional, for type generation)
- React >= 18.0.0 (for React components)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

- Inspired by Tailwind CSS's utility-first approach
- Built for the AI-powered development era
- Designed for design system scalability

---

**Built with ❤️ by the Intent Team**
