# intent-react

[![npm version](https://img.shields.io/npm/v/intent-react.svg)](https://www.npmjs.com/package/intent-react)
[![License](https://img.shields.io/npm/l/intent-react.svg)](https://github.com/mixedmetals/intent-framework/blob/main/LICENSE)

> React components for the Intent styling framework.

## Installation

```bash
npm install intent-react
# or
pnpm add intent-react
# or
yarn add intent-react
```

## Quick Start

```tsx
import { Stack, Button, Text, Card } from 'intent-react';

function App() {
  return (
    <Stack direction="column" gap="relaxed">
      <Text size="xl" weight="bold">Welcome to Intent</Text>
      
      <Card elevation="low" padding="normal">
        <Stack direction="row" gap="normal">
          <Button importance="primary">Save</Button>
          <Button importance="secondary">Cancel</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
```

## Components

### Layout
- `Stack`, `VStack`, `HStack` - Flexbox layouts
- `Container` - Centered content container
- `Grid`, `GridItem` - CSS Grid system
- `Box` - Generic layout primitive
- `AspectRatio` - Maintain aspect ratio
- `Center` - Center content
- `Spacer` - Flexible spacing
- `Show`, `Hide` - Responsive visibility

### Typography
- `Heading`, `H1-H6` - Section headings
- `Text` - Body text with variants
- `Paragraph`, `P` - Paragraph blocks
- `List`, `ListItem`, `Ul`, `Ol`, `Li` - Lists
- `Code` - Inline code
- `Quote`, `Blockquote` - Quotations
- `Prose` - Article content
- `Kbd` - Keyboard input
- `Mark`, `Highlight` - Highlighted text

### Forms
- `Input`, `InputField` - Text input
- `Textarea`, `TextareaField` - Multi-line input
- `Select`, `SelectField` - Dropdown select
- `Checkbox`, `CheckboxField` - Checkbox input
- `Radio`, `RadioField` - Radio input
- `Switch`, `SwitchField` - Toggle switch
- `Label` - Form labels
- `Field` - Form field wrapper
- `Form` - Form container with context

### Feedback
- `Alert` - Status messages
- `Progress` - Progress bars
- `Spinner` - Loading indicators
- `Skeleton`, `SkeletonText` - Loading placeholders

### Overlay
- `Modal` - Dialog windows
- `Drawer` - Slide-out panels
- `Tooltip` - Hover information
- `Popover` - Floating content
- `Menu` - Dropdown menus

### Navigation
- `Tabs`, `Tab`, `TabPanel` - Tab navigation
- `Breadcrumbs`, `BreadcrumbItem` - Path navigation
- `Pagination`, `PaginationItem` - Page navigation
- `Link` - Styled anchors
- `Nav`, `NavItem` - Navigation lists
- `Command`, `CommandDialog` - Command palette
- `Steps`, `Step` - Step indicators
- `Sidebar` - Side navigation
- `Navbar` - Top navigation

### Data Display
- `Table`, `TableHeader`, `TableRow`, `TableCell` - Data tables
- `Stat`, `StatLabel`, `StatValue` - Statistics display
- `Timeline`, `TimelineItem` - Chronological display
- `DescriptionList`, `DescriptionTerm`, `DescriptionDetail` - Key-value pairs
- `Tree`, `TreeItem` - Hierarchical data
- `Calendar`, `CalendarDay` - Date display
- `CardMedia`, `CardHeader`, `CardFooter` - Card parts

## Example Usage

```tsx
import { 
  VStack, 
  HStack,
  Button,
  Input,
  Card,
  Text,
  Modal
} from 'intent-react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <VStack gap="relaxed" padding="normal">
      <Text size="2xl" weight="bold">Settings</Text>
      
      <Card elevation="low">
        <VStack gap="normal">
          <Input placeholder="Your name" />
          <Input type="email" placeholder="Email address" />
          
          <HStack gap="normal" justify="end">
            <Button importance="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button importance="primary" onClick={() => setIsOpen(true)}>
              Save Changes
            </Button>
          </HStack>
        </VStack>
      </Card>
      
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Text>Settings saved successfully!</Text>
      </Modal>
    </VStack>
  );
}
```

## License

MIT © Intent Framework Contributors
