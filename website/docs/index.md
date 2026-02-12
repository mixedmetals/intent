# Components

Intent provides 72 production-ready React components.

## Categories

### Foundation
- [Button](/docs/components/button) - Action trigger
- Badge - Status indicator
- Card - Content container
- Divider - Visual separator

### Layout
- [Stack](/docs/components/stack) - Flexbox layouts
- Container - Max-width wrapper
- Grid - CSS Grid system
- Box - Generic layout primitive

### Forms
- [Input](/docs/components/input) - Text input
- Textarea - Multi-line input
- Select - Dropdown
- Checkbox / Radio - Selection
- Switch - Toggle
- Form - Form wrapper

### Feedback
- Alert - Status messages
- Toast - Notifications
- Progress - Progress bars
- Spinner - Loading indicator
- Skeleton - Loading placeholder

### Overlay
- Modal - Dialog
- Drawer - Side panel
- Tooltip - Hover info
- Popover - Click popup
- Menu - Dropdown menu

### Navigation
- Tabs - Tab navigation
- Breadcrumbs - Path navigation
- Pagination - Page navigation
- Navbar - Top navigation
- Sidebar - Side navigation

### Data Display
- Table - Data table
- Accordion - Collapsible sections
- Avatar - User avatar
- Timeline - Chronological display
- Calendar - Date display

## Using Components

All components follow the same pattern:

```tsx
import { ComponentName } from 'intent-react'

<ComponentName prop="value">
  Content
</ComponentName>
```

## Common Props

Most components support these props:

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `style` | `CSSProperties` | Inline styles |
| `id` | `string` | HTML id attribute |
| `data-*` | `string` | Data attributes |

## Customization

Components can be customized via:

1. **Props** - Component-specific options
2. **Theme** - Global design tokens
3. **CSS** - Custom styles via className

See [Theming Guide](/docs/api/theme) for more.
