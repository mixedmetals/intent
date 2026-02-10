# Intent Framework — AI Coding Rules

You are coding with **Intent**, a schema-first styling framework. All visual styling is controlled by semantic props that compile to static CSS. You MUST follow these rules.

## ⛔ Hard Rules

1. **NEVER use Tailwind utility classes.** No `className="flex items-center gap-3 bg-blue-500"`. Use Intent components instead.
2. **NEVER use arbitrary values** like `pt-[7px]`, `w-[123px]`, `text-[13px]`. All values come from design tokens.
3. **NEVER set visual CSS in `style` prop.** No `color`, `backgroundColor`, `fontSize`, `padding`, `margin`, `border`, `borderRadius`, `boxShadow`, `opacity` in style props. These are controlled by the schema.
4. **ALWAYS check valid prop values** in `intent.config.ts`. Invalid values will fail validation.

## ✅ Allowed Escape Hatches (Layout Only)

The `style` prop IS allowed for **layout positioning** that doesn't affect visual design:

```tsx
// ✅ Allowed - layout properties
style={{ position: 'fixed', top: '50%', left: '50%' }}
style={{ width: 48, height: 48 }}
style={{ flex: 1 }}
style={{ overflowY: 'auto', maxHeight: 400 }}
style={{ paddingBlock: '12px' }}

// ❌ Forbidden - visual properties (use Intent props)
style={{ backgroundColor: '#FF0000' }}   // Use Surface background="..."
style={{ color: 'red' }}                 // Use Text color="..."
style={{ fontSize: '13px' }}             // Use Text size="..."
style={{ padding: '16px' }}              // Use Surface padding="..."
style={{ gap: '7px' }}                   // Use Stack gap="..."
```

## Components

All components are imported from `intent-react`.

### Stack

Flexbox layout container.

```tsx
<Stack direction="column" gap="relaxed" align="center" justify="between">
  {children}
</Stack>
```

| Prop | Values | Default |
|------|--------|---------|
| direction | `"row"` · `"column"` | `"column"` |
| gap | `"none"` · `"tight"` · `"compact"` · `"normal"` · `"relaxed"` · `"loose"` | `"normal"` |
| align | `"start"` · `"center"` · `"end"` · `"stretch"` | `"stretch"` |
| justify | `"start"` · `"center"` · `"end"` · `"between"` · `"around"` | `"start"` |

Aliases: `<VStack>` = `direction="column"`, `<HStack>` = `direction="row"`

### Surface

Container with elevation, background, and border radius.

```tsx
<Surface elevation="low" padding="relaxed" radius="lg" background="elevated">
  {children}
</Surface>
```

| Prop | Values | Default |
|------|--------|---------|
| elevation | `"none"` · `"low"` · `"medium"` · `"high"` | `"none"` |
| padding | `"none"` · `"tight"` · `"compact"` · `"normal"` · `"relaxed"` · `"loose"` | `"none"` |
| background | `"default"` · `"subtle"` · `"elevated"` · `"inverse"` | `"default"` |
| radius | `"none"` · `"sm"` · `"md"` · `"lg"` | `"none"` |

**Constraint:** `inverse` background requires elevation of `"medium"` or `"high"`.

### Button

Interactive action trigger.

```tsx
<Button importance="primary" size="md" onClick={handleClick}>
  Save
</Button>
```

| Prop | Values | Default |
|------|--------|---------|
| importance | `"primary"` · `"secondary"` · `"ghost"` · `"danger"` | _required_ |
| size | `"sm"` · `"md"` · `"lg"` | `"md"` |

**Constraints:**

- Ghost buttons cannot be disabled
- Danger importance requires size of `"md"` or `"lg"` (larger touch targets)

### Text

Typography for all text content.

```tsx
<Text size="lg" weight="semibold" color="subtle">Hello</Text>
<Text as="h1" size="2xl" weight="bold">Page Title</Text>
```

| Prop | Values | Default |
|------|--------|---------|
| size | `"xs"` · `"sm"` · `"md"` · `"lg"` · `"xl"` · `"2xl"` | `"md"` |
| weight | `"normal"` · `"medium"` · `"semibold"` · `"bold"` | `"normal"` |
| color | `"default"` · `"subtle"` · `"muted"` · `"inverse"` · `"brand"` | `"default"` |
| align | `"left"` · `"center"` · `"right"` | `"left"` |
| as | `"p"` · `"span"` · `"div"` · `"h1"` · `"h2"` · `"h3"` · `"h4"` · `"h5"` · `"h6"` · `"label"` | — |

### Badge

Status label or count.

```tsx
<Badge importance="success" size="sm">Active</Badge>
```

| Prop | Values | Default |
|------|--------|---------|
| importance | `"default"` · `"primary"` · `"success"` · `"warning"` · `"error"` | `"default"` |
| size | `"sm"` · `"md"` | `"sm"` |

### Input

Form text input.

```tsx
<Input size="md" state="default" placeholder="Enter text..." onChange={handleChange} />
```

| Prop | Values | Default |
|------|--------|---------|
| size | `"sm"` · `"md"` · `"lg"` | `"md"` |
| state | `"default"` · `"error"` · `"success"` | `"default"` |
| type | `"text"` · `"password"` · `"email"` · `"number"` · `"search"` | `"text"` |

### Card

Interactive surface (extends Surface).

```tsx
<Card elevation="low" padding="relaxed" radius="lg" interactive>
  {children}
</Card>
```

Same props as Surface, plus `interactive?: boolean`.

### Divider

Visual separator between content.

```tsx
<Divider />
<Divider orientation="vertical" weight="thick" />
```

| Prop | Values | Default |
|------|--------|---------|
| orientation | `"horizontal"` · `"vertical"` | `"horizontal"` |
| weight | `"thin"` · `"normal"` · `"thick"` | `"normal"` |

## Design Tokens

**Spacing scale:**

| Token | Value | Use for |
|-------|-------|---------|
| none | 0 | No spacing |
| tight | 4px | Compact elements, badges |
| compact | 8px | Form fields, tight lists |
| normal | 12px | Standard spacing |
| relaxed | 16px | Card padding, comfortable spacing |
| loose | 24px | Section spacing |

**Semantic colors** (use through props, not directly):

| Name | Meaning |
|------|---------|
| primary | Main call-to-action, brand |
| secondary | Alternative action |
| ghost | Low emphasis, minimal visual weight |
| danger / error | Destructive action, error state |
| success | Positive outcome, active state |
| warning | Caution, attention needed |

## Dark Mode

The framework supports dark mode. Token colors invert automatically.

```tsx
// Toggle dark mode programmatically:
document.documentElement.classList.toggle('dark');

// Also respects system preference via @media (prefers-color-scheme: dark)
```

You do NOT need to write any dark-mode-specific styles. All Intent components adapt automatically.

## Patterns

### ✅ Complete Example: User Card

```tsx
import { Stack, Surface, Text, Badge, Button } from 'intent-react';

function UserCard({ user, onEdit }) {
  return (
    <Surface elevation="low" padding="relaxed" radius="lg">
      <Stack direction="row" gap="normal" align="center">
        <Surface
          elevation="none"
          radius="lg"
          background="subtle"
          style={{ width: 48, height: 48 }}
        />
        <Stack direction="column" gap="tight" style={{ flex: 1 }}>
          <Text size="md" weight="semibold">{user.name}</Text>
          <Text size="sm" color="subtle">{user.email}</Text>
        </Stack>
        <Badge importance={user.active ? 'success' : 'default'} size="sm">
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
        <Button importance="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </Stack>
    </Surface>
  );
}
```

### ❌ What NOT to Do

```tsx
// DON'T: Tailwind utility classes
<div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">

// DON'T: Inline visual styles
<div style={{ backgroundColor: '#f8f8f8', padding: '16px', borderRadius: '8px' }}>

// DON'T: Arbitrary values
<Button className="px-[13px] py-[7px]" importance="primary">

// DON'T: Bypassing the design system
<span style={{ color: '#6366F1', fontSize: '14px', fontWeight: 600 }}>
```

## Adding Custom Values

If a design requires a value not in the token list:

1. **Don't inline it.** Add a token to `intent.config.ts`:
   ```typescript
   tokens: {
     space: { 'custom-gap': '7px' },
     color: { 'custom-accent': '#FF6B35' },
   }
   ```
2. Run `intent compile` to regenerate CSS
3. Use the new token through component props

## Validation

```bash
intent validate    # Check all components against schema
intent compile     # Regenerate CSS from schema
```

If `intent validate` reports errors, fix them before committing.

**Intent is a type system for styles.** Every visual decision goes through the schema. When in doubt, check `intent.config.ts`.
