# ADR-004: Escape Hatch Policy

## Status
Accepted

## Context

ADR-001 established "No Escape Hatches" as a principle: no arbitrary CSS values, no Tailwind utility classes, no inline styles for visual properties. However, in practice, every design system encounters one-off visual needs:

- Layout positioning (absolute positioning for modals/tooltips)
- Dynamic dimensions (responsive breakpoints, calculated widths)
- Third-party component integration (embedding external widgets)
- Migration scenarios (gradual adoption in existing codebases)

The original "no escape hatches" position is idealistic and creates a barrier to adoption. The documentation also contradicts itself:

- `ai-starter-prompt.md`: Shows `style={{ width: 48, height: 48 }}` on a Surface
- `types.ts`: `style?: React.CSSProperties` is typed as "Allowed but discouraged"

## Decision

We will define a **clear, documented escape hatch policy** with two categories:

### 1. Layout Escape Hatches (Permitted)

The `style` prop is allowed for **layout-only properties** that don't affect visual design tokens:

**Allowed:**
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
- `position`, `top`, `right`, `bottom`, `left`, `inset`, `zIndex`
- `overflow`, `overflowX`, `overflowY`
- `flexGrow`, `flexShrink`, `flexBasis` (when not using Stack)
- `gridColumn`, `gridRow`, `gridArea` (when not using Grid component)
- `transform`, `transformOrigin` (for animations/positioning)

**Rationale:** These are typically one-off layout needs that don't fit the design system's token model. They don't compromise the visual consistency that Intent enforces.

### 2. Visual Escape Hatches (Prohibited)

The `style` prop **MUST NOT** be used for visual design properties:

**Forbidden:**
- `color`, `backgroundColor`, `borderColor`
- `fontSize`, `fontWeight`, `fontFamily`, `lineHeight`
- `padding`, `margin`, `gap` (use Intent components)
- `border`, `borderRadius`, `boxShadow` (use Surface)
- `opacity`, `filter`

**Why:** These are core design tokens. Using arbitrary values breaks:
- Theme consistency (dark mode, brand colors)
- Accessibility (contrast ratios)
- AI guidance (AI sees `color: "#FF0000"` and learns bad patterns)

### Implementation

1. **TypeScript enforcement:** The `style` prop accepts `React.CSSProperties` but validators can flag violations
2. **Linter rule:** Add `intent/no-visual-inline-styles` ESLint rule (future)
3. **Documentation:** Update AI starter prompt with clear guidance
4. **Runtime warning:** Development mode warns on visual style props

## Examples

### ✅ Allowed (Layout)

```tsx
// Modal positioning
<Surface elevation="high" style={{ position: 'fixed', top: '50%', left: '50%' }}>
  <Text>Modal content</Text>
</Surface>

// Avatar sizing
<Surface radius="full" style={{ width: 48, height: 48 }} />

// Custom scrollbar
<Stack style={{ overflowY: 'auto', maxHeight: 400 }}>
  {items}
</Stack>
```

### ❌ Forbidden (Visual)

```tsx
// DON'T: Bypassing color tokens
<Surface style={{ backgroundColor: '#FF0000' }} />

// DON'T: Arbitrary spacing
<Stack style={{ gap: '7px' }} />

// DON'T: Custom typography
<Text style={{ fontSize: '13px', fontWeight: 600 }} />
```

### ✅ Correct Alternative

```tsx
// Add to schema if you need a new variant
// intent.config.ts
tokens: {
  color: {
    'custom-accent': '#FF0000',  // Now part of design system
  },
  space: {
    'custom': '7px',  // Documented, reusable
  },
}

// Use semantic props
<Surface background="custom-accent" />
<Stack gap="custom" />
```

## Migration Path

If you find yourself needing many escape hatches:

1. **Add tokens** to your schema for reusable values
2. **Add component variants** for common patterns
3. **Use `className`** with caution (documented exceptions only)
4. **Request upstream** - Intent should evolve to cover real use cases

## Related

- [ADR-001: Constraints Over Utilities](./ADR-001-constraints-over-utilities.md)
- [AI Starter Prompt](./ai-starter-prompt.md) - Updated with escape hatch rules

## Changelog

- **2024-02-10**: Initial escape hatch policy defined
