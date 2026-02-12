# Intent Framework

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://www.npmjs.com/package/intent-core)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Subtle Tactility: A Schema-First, Density-Aware Component System**

Intent is a complete UI component framework featuring **92 tactile components** across three surface archetypes (Milled, Elevated, Flat) with mathematical precision—zero hard-coded values, full density propagation, and cap-height icon alignment.

## 🎨 The Three Archetypes

| Archetype | Components | Surface Character | Use Case |
|-----------|------------|-------------------|----------|
| **Milled** | 45 | Radial gradient + inner highlight | Buttons, Inputs, Data Grid |
| **Elevated** | 28 | Backdrop blur + multi-layer shadow | Cards, Modals, Overlays |
| **Flat** | 19 | Transparent tint + hairline border | Badges, Avatars, Separators |

## 🚀 Quick Start

```bash
# Install the React component library
npm install intent-react

# Or the core schema system
npm install intent-core
```

```tsx
import { Button, Card, DataGrid, Badge } from 'intent-react';

function App() {
  return (
    <Card elevation="high">
      <DataGrid
        density="compact"
        columns={[
          { key: 'name', title: 'Name' },
          { key: 'amount', title: 'Amount', align: 'right', tabular: true },
          { key: 'status', title: 'Status', render: (v) => <Badge>{v}</Badge> },
        ]}
        data={transactions}
      />
      <Button importance="primary">Export</Button>
    </Card>
  );
}
```

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`intent-core`](packages/core) | 2.0.0 | Schema definition, compiler, validator |
| [`intent-react`](packages/react) | 2.0.0 | 92 React components with archetype system |
| [`intentcss-cli`](packages/cli) | 2.0.0 | CLI tools and build pipeline |

## ✨ Key Features

### 1. Subtle Tactility Design System
Every component uses mathematically precise surface treatments:

```css
/* Milled Archetype */
--intent-surface-milled-bg: 
  radial-gradient(120% 80% at 50% 0%, oklch(100% 0 0 / 0.12), transparent 70%),
  oklch(25% 0.01 260);
--intent-surface-milled-border: 
  linear-gradient(to bottom, oklch(100% 0 0 / 0.15), oklch(100% 0 0 / 0.05));
--intent-surface-milled-shadow: 
  inset 0 1px 0 0 oklch(100% 0 0 / 0.08),
  0 1px 2px 0 oklch(0% 0 0 / 0.1);
```

### 2. Density Propagation
All 92 components respond to container density:

```tsx
<DataGrid density="compact" />  /* 0.75x scale */
<DataGrid density="normal" />   /* 1.0x scale */
<DataGrid density="relaxed" />  /* 1.25x scale */
```

### 3. Cap-Height Icon Alignment
Every icon uses optical alignment:

```tsx
<Icon name="arrowRight" alignment="cap" />  /* Visually centers with text */
```

### 4. Zero Hard-Coded Values
All 92 components reference tokens exclusively:

| Token Type | Example | Components |
|------------|---------|------------|
| Color | `oklch(25% 0.01 260)` | All 92 |
| Spacing | `calc(var(--intent-space-3) * var(--intent-density))` | All 92 |
| Motion | `var(--intent-easing-mechanical)` | Interactive 45 |

## 📖 Migration Guide: Tailwind → Intent

### Step 1: Replace Utility Classes with Components

**Before (Tailwind):**
```tsx
<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm 
                   transition-colors duration-200 flex items-center gap-2">
  <svg className="w-4 h-4">...</svg>
  Click me
</button>
```

**After (Intent):**
```tsx
<Button importance="primary" leftIcon={<Icon name="arrowRight" />}>
  Click me
</Button>
```

### Step 2: Replace Layout Utilities

**Before:**
```tsx
<div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
  <div className="bg-white rounded-lg shadow-lg p-4">
    {/* content */}
  </div>
</div>
```

**After:**
```tsx
<Container size="md">
  <Card elevation="high" padding="normal">
    {/* content */}
  </Card>
</Container>
```

### Step 3: Replace Data Tables

**Before:**
```tsx
<table className="w-full text-sm">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-4 py-2 text-left font-medium">Name</th>
      <th className="px-4 py-2 text-right font-medium">Amount</th>
    </tr>
  </thead>
  <tbody>
    {data.map(row => (
      <tr key={row.id} className="border-t">
        <td className="px-4 py-2">{row.name}</td>
        <td className="px-4 py-2 text-right tabular-nums">{row.amount}</td>
      </tr>
    ))}
  </tbody>
</table>
```

**After:**
```tsx
<DataGrid
  density="normal"
  columns={[
    { key: 'name', title: 'Name' },
    { key: 'amount', title: 'Amount', align: 'right', tabular: true },
  ]}
  data={data}
/>
```

### Step 4: Theme Migration

**Before (tailwind.config.js):**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
      },
    },
  },
}
```

**After (intent.config.js):**
```javascript
export default {
  tokens: {
    color: {
      primary: 'oklch(55% 0.22 255)',
      secondary: 'oklch(50% 0.01 260)',
    },
  },
  // Archetype surface definitions
  surfaces: {
    milled: {
      background: 'radial-gradient(...)',
      border: 'linear-gradient(...)',
      shadow: 'inset 0 1px...',
    },
  },
};
```

## 🧮 Component Registry (All 92)

### Milled Archetype (45 Interactive Components)
- **Form**: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker, TimePicker, ColorPicker, FileUpload, OTPInput, PinInput, PhoneInput, NumberInput, RangeSlider, Combobox, Editable
- **Navigation**: Tabs (List, Trigger, Content), BreadcrumbItem, PaginationItem, Stepper, Command, NavItem, TreeItem
- **Disclosure**: Accordion (Item, Trigger), Collapsible
- **Data**: DataGrid, Table (Row, Cell, HeaderCell), Calendar
- **Feedback**: Progress, Spinner, Rating
- **Overlay Triggers**: DialogTrigger, DropdownTrigger, TooltipTrigger, PopoverTrigger, MenuTrigger, ContextMenuTrigger, HoverCardTrigger
- **Misc**: Toggle, ToggleGroup, ResizableHandle, Splitter

### Elevated Archetype (28 Container Components)
- **Cards**: Card, CardHeader, CardContent, CardFooter
- **Overlays**: Modal, Alert, Drawer, Popover, Tooltip, Menu, Dialog, Sheet, Toast, HoverCard, ContextMenu
- **Layout**: Container, Stack, HStack, VStack, Grid, Flex, Box, AspectRatio, Center, Spacer
- **Data Display**: Table (Header, Body, Footer), List, Timeline, ScrollArea

### Flat Archetype (19 Indicator Components)
- **Indicators**: Badge, Tag, Kbd, Avatar, StatusIndicator
- **Typography**: Text, Heading, Paragraph, Code, Blockquote, Mark, Highlight
- **Dividers**: Separator, Divider
- **Loading**: Skeleton, SkeletonText, SkeletonCircle
- **Icons**: Icon, IconText

## 🏗️ Architecture

```
Intent Framework
├── Core Schema (intent-core)
│   ├── 3 Archetype Definitions
│   ├── Density System
│   ├── OKLCH Color Space
│   └── Constraint Engine
├── React Components (intent-react)
│   ├── 92 Components
│   ├── Cap-Height Alignment
│   └── useDensity Hook
└── Theme CSS (intent-theme.css)
    ├── 0 Hard-Coded Values
    ├── Token-Only Architecture
    └── Print/Reduced Motion
```

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Intent Framework**: Mathematical precision in UI design.
