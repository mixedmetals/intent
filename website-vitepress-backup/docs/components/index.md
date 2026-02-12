# All Components

Intent provides **72 production-ready components** organized by category.

## Foundation (8)

Basic building blocks for any interface.

| Component | Description | Status |
|-----------|-------------|--------|
| [Button](./button) | Action trigger | ✅ |
| Badge | Status indicator | ✅ |
| Card | Content container | ✅ |
| Divider | Visual separator | ✅ |
| Stack | Flexbox layout | ✅ |
| Surface | Styled container | ✅ |
| Text | Typography | ✅ |
| Spacer | Flexible spacing | ✅ |

## Layout (9)

Structure and position your content.

| Component | Description | Status |
|-----------|-------------|--------|
| Container | Max-width wrapper | ✅ |
| Grid | CSS Grid system | ✅ |
| GridItem | Grid child | ✅ |
| Box | Generic layout | ✅ |
| AspectRatio | Maintain aspect ratio | ✅ |
| Center | Center content | ✅ |
| Show | Responsive visibility | ✅ |
| Hide | Hide at breakpoints | ✅ |

## Typography (10)

Text styling and content formatting.

| Component | Description | Status |
|-----------|-------------|--------|
| Heading | H1-H6 headings | ✅ |
| Text | Body text | ✅ |
| Paragraph | Paragraph blocks | ✅ |
| List | Ordered/unordered | ✅ |
| Code | Inline/block code | ✅ |
| Quote | Blockquotes | ✅ |
| Prose | Article content | ✅ |
| Kbd | Keyboard input | ✅ |
| Mark | Highlighted text | ✅ |

## Forms (12)

Complete form control collection.

| Component | Description | Status |
|-----------|-------------|--------|
| Input | Text input | ✅ |
| Textarea | Multi-line input | ✅ |
| Select | Dropdown select | ✅ |
| Checkbox | Boolean input | ✅ |
| Radio | Single selection | ✅ |
| Switch | Toggle input | ✅ |
| Label | Form labels | ✅ |
| Field | Field wrapper | ✅ |
| Form | Form container | ✅ |

## Feedback (6)

Inform users about status and progress.

| Component | Description | Status |
|-----------|-------------|--------|
| Alert | Status messages | ✅ |
| Toast | Notifications | ✅ |
| Progress | Progress bars | ✅ |
| Spinner | Loading indicator | ✅ |
| Skeleton | Loading placeholder | ✅ |

## Overlay (6)

Floating content and dialogs.

| Component | Description | Status |
|-----------|-------------|--------|
| Modal | Dialog window | ✅ |
| Drawer | Side panel | ✅ |
| Tooltip | Hover information | ✅ |
| Popover | Click popup | ✅ |
| Menu | Dropdown menu | ✅ |

## Navigation (9)

Help users move through your app.

| Component | Description | Status |
|-----------|-------------|--------|
| Tabs | Tab navigation | ✅ |
| Breadcrumbs | Path navigation | ✅ |
| Pagination | Page navigation | ✅ |
| Link | Styled anchor | ✅ |
| Nav | Navigation list | ✅ |
| Command | Command palette | ✅ |
| Steps | Progress steps | ✅ |
| Sidebar | Side navigation | ✅ |
| Navbar | Top navigation | ✅ |

## Data Display (12)

Present complex information clearly.

| Component | Description | Status |
|-----------|-------------|--------|
| Table | Data table | ✅ |
| Stat | Statistics display | ✅ |
| Timeline | Chronological display | ✅ |
| Accordion | Collapsible sections | ✅ |
| Avatar | User avatar | ✅ |
| AvatarGroup | Stacked avatars | ✅ |
| Calendar | Date display | ✅ |
| Tree | Hierarchical data | ✅ |
| DescriptionList | Key-value pairs | ✅ |
| CardMedia | Card images | ✅ |
| CardHeader | Card header | ✅ |
| CardFooter | Card footer | ✅ |

---

## Component Status

- ✅ **Available** - Ready to use
- 🚧 **Beta** - API may change
- ⏳ **Coming Soon** - In development

## Usage Example

```tsx
import { Button, Card, Stack, Text } from 'intent-react'

function Example() {
  return (
    <Card elevation="low" padding="normal">
      <Stack direction="column" gap="normal">
        <Text size="lg" weight="bold">Welcome</Text>
        <Text color="muted">Get started with Intent components</Text>
        <Button importance="primary">Get Started</Button>
      </Stack>
    </Card>
  )
}
```

## Customization

All components can be customized via:

1. **Props** - Component-specific options
2. **Theme** - Global design tokens
3. **CSS** - Custom styles

See the [Theming Guide](/docs/api/theme) for details.
