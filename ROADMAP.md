# Intent Framework Roadmap to v1.0.0

## Vision
Intent Framework v1.0.0 will provide **complete component parity with Tailwind CSS patterns** plus a **comprehensive default theme** that works out of the box, while maintaining the schema-first, AI-native architecture.

---

## Phase 1: Foundation (v0.2.0) - ✅ COMPLETE

### Core Infrastructure
- [x] **Plugin System**: Allow third-party component libraries to extend Intent
  - PluginManager with lifecycle hooks (tokens, component, before/after validate/generate)
  - Custom validators and generators support
  - `usePlugin()`, `definePlugin()`, `definePreset()` helpers
- [x] **Theme Inheritance**: Theme composition and extension mechanism
  - Theme registration with `extends` for parent themes
  - Deep merging of tokens, darkTokens, componentOverrides
  - `composeThemes()`, `extendTheme()`, `defaultTheme`
- [x] **CSS Variable Optimization**: Tree-shaking unused CSS custom properties
- [x] **Build Performance**: Per-prop selectors (74x CSS reduction)
- [x] **Source Maps**: Debug mappings from generated CSS back to schema
  - VLQ encoding, debug info tracking, compilation trace

### Testing & Quality
- [x] Visual regression testing with Playwright
  - `generateTestHTML()`, `intentVisualTest()` helper
  - Baseline management and comparison
- [x] Accessibility audit automation (basic contrast and ARIA checks)
- [x] Performance benchmarks vs Tailwind
  - `benchmarkIntentSystem()`, `benchmarkIntentComponent()`
  - Bundle analysis and comparison
- [x] Bundle size analysis dashboard
  - Historical snapshots, trend analysis with thresholds
  - Interactive HTML dashboard with Chart.js
  - Recommendations engine

---

## Phase 2: Layout System (v0.3.0) - ✅ COMPLETE

### Layout Components
| Component | Status | Priority | Description |
|-----------|--------|----------|-------------|
| `Container` | ✅ | P0 | Max-width wrapper with xs/sm/md/lg/xl/2xl/full breakpoints |
| `Grid` | ✅ | P0 | CSS Grid with gap, columns, rows, areas |
| `GridItem` | ✅ | P0 | Grid child with colSpan, rowSpan, positioning |
| `Box` | ✅ | P0 | Generic layout primitive (display, position, sizing) |
| `AspectRatio` | ✅ | P0 | Consistent media aspect ratios |
| `Center` | ✅ | P1 | Flexbox centering helper |
| `Spacer` | ✅ | P1 | Fixed/grow spacing element |
| `Show` | ✅ | P1 | Responsive visibility (show at breakpoint+) |
| `Hide` | ✅ | P1 | Responsive visibility (hide at breakpoint+) |
| `ScrollArea` | ⏳ | P2 | Custom scrollable container (v0.4.0) |
| `Resizable` | ⏳ | P2 | Split-pane layout component (v0.4.0) |

### Layout Props (Schema Additions) - ✅ Complete
```typescript
// Position & Layout
prop('position', enum('static', 'relative', 'absolute', 'fixed', 'sticky'))
prop('inset', enum('0', 'auto', '1/2', 'full'))
prop('zIndex', enum('auto', '0', '10', '20', '30', '40', '50'))
prop('overflow', enum('visible', 'hidden', 'scroll', 'auto'))
prop('display', enum('block', 'inline', 'flex', 'grid', 'none'))

// Sizing
prop('width', enum('auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '1/5', '1/6', '1/12'))
prop('height', enum('auto', 'full', 'screen', '1/2', '1/3', '2/3'))
prop('minWidth', enum('0', 'full', 'min', 'max', 'fit'))
prop('maxWidth', enum('none', 'full', 'prose'))
prop('minHeight', enum('0', 'full', 'screen'))
prop('maxHeight', enum('none', 'full', 'screen'))

// Grid
prop('columns', enum('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'))
prop('rows', enum('1', '2', '3', '4', '5', '6', 'none'))
prop('colSpan', enum('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'))
prop('rowSpan', enum('1', '2', '3', '4', '5', '6', 'full'))
prop('gap', enum('0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'))

// Flexbox
prop('flexDirection', enum('row', 'column', 'row-reverse', 'column-reverse'))
prop('flexWrap', enum('nowrap', 'wrap', 'wrap-reverse'))
prop('flexGrow', enum('0', '1'))
prop('flexShrink', enum('0', '1'))
prop('justifyContent', enum('start', 'end', 'center', 'between', 'around', 'evenly'))
prop('alignContent', enum('start', 'end', 'center', 'between', 'around', 'evenly'))
prop('alignItems', enum('start', 'end', 'center', 'baseline', 'stretch'))
prop('alignSelf', enum('auto', 'start', 'end', 'center', 'baseline', 'stretch'))

// Media
prop('aspectRatio', enum('auto', 'square', 'video', 'portrait', 'landscape'))
prop('objectFit', enum('contain', 'cover', 'fill', 'none'))
prop('display', enum('block', 'inline', 'inline-block', 'flex', 'grid', 'none'))
prop('width', enum('auto', 'full', 'screen', '1/2', '1/3', '1/4', '3/4'))
prop('height', enum('auto', 'full', 'screen', 'min', 'max', 'fit'))
```

---

## Phase 3: Typography System (v0.4.0) - ✅ COMPLETE

### Typography Components
| Component | Status | Priority | Description |
|-----------|--------|----------|-------------|
| `Heading` | ✅ | P0 | H1-H6 with size, weight, lineHeight, letterSpacing |
| `Paragraph` | ✅ | P0 | Body text with lead/caption/small variants |
| `Text` | ✅ | P0 | Extended with decoration, wrap, break, hyphens, srOnly |
| `List` / `ListItem` | ✅ | P0 | Ordered/unordered with marker styles |
| `Code` | ✅ | P1 | Inline and block with language support |
| `Quote` | ✅ | P1 | Blockquote with default/bordered/pull variants |
| `Prose` | ✅ | P1 | Markdown content wrapper (Tailwind Typography-like) |
| `Kbd` | ✅ | P2 | Keyboard key styling |
| `Mark` | ✅ | P2 | Highlight text with variant colors |

### Typography Props - ✅ Complete
```typescript
// Font properties
prop('fontSize', enum('xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'))
prop('fontWeight', enum('thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'black'))
prop('lineHeight', enum('none', 'tight', 'snug', 'normal', 'relaxed', 'loose'))
prop('letterSpacing', enum('tighter', 'tight', 'normal', 'wide', 'wider', 'widest'))

// Text styling
prop('align', enum('left', 'center', 'right', 'justify', 'start', 'end'))
prop('transform', enum('none', 'uppercase', 'lowercase', 'capitalize'))
prop('decoration', enum('none', 'underline', 'line-through', 'overline'))
prop('decorationStyle', enum('solid', 'double', 'dotted', 'dashed', 'wavy'))

// Text overflow and wrapping
prop('textOverflow', enum('clip', 'ellipsis'))
prop('truncate', boolean())
prop('wrap', enum('wrap', 'nowrap', 'balance', 'pretty'))
prop('break', enum('normal', 'words', 'all', 'keep'))
prop('hyphens', enum('none', 'manual', 'auto'))

// Style variants
prop('fontStyle', enum('normal', 'italic'))
prop('fontVariantNumeric', enum('normal', 'ordinal', 'lining-nums', 'oldstyle-nums', 'tabular-nums'))

// List styles
prop('listStyleType', enum('none', 'disc', 'circle', 'square', 'decimal', 'lower-roman', 'upper-roman', 'lower-alpha', 'upper-alpha'))
prop('listStylePosition', enum('inside', 'outside'))

// Accessibility
prop('srOnly', boolean()) // Screen reader only text

---

## Phase 4: Form Components (v0.5.0) - ✅ COMPLETE

### Form Components
| Component | Status | Priority | Description |
|-----------|--------|----------|-------------|
| `Input` | ✅ | P0 | All HTML5 types with 4 variants, validation states |
| `Textarea` | ✅ | P0 | Multi-line with resize control, validation |
| `Select` | ✅ | P0 | Dropdown with single/multiple, clearable, searchable |
| `Checkbox` | ✅ | P0 | Single checkbox with indeterminate state |
| `CheckboxGroup` | ✅ | P0 | Group layout (vertical/horizontal/inline) |
| `Radio` | ✅ | P0 | Radio button input |
| `RadioGroup` | ✅ | P0 | Shared layout for radio buttons |
| `Switch` | ✅ | P0 | Toggle switch (checkbox alternative) |
| `Label` | ✅ | P0 | Form label with required indicator (*) |
| `Field` | ✅ | P0 | Wrapper with label, help text, error message |
| `Form` | ✅ | P1 | Context provider with layout, spacing, state |
| `HelperText` | ✅ | P1 | Validation/help message display |
| `Combobox` | ⏳ | P1 | Autocomplete dropdown (v0.6.0) |
| `MultiSelect` | ⏳ | P1 | Tag-style multi selection (v0.6.0) |
| `DatePicker` | ⏳ | P2 | Calendar date selection (v0.7.0) |
| `FileUpload` | ⏳ | P2 | Drag-drop file input (v0.7.0) |
| `Slider` | ⏳ | P2 | Range slider input (v0.7.0) |
| `Rating` | ⏳ | P2 | Star rating input (v0.7.0) |

### Form Props - ✅ Complete
```typescript
// Sizing & Variants
prop('formSize', enum('xs', 'sm', 'md', 'lg', 'xl'))
prop('formVariant', enum('outline', 'filled', 'flushed', 'unstyled'))
prop('checkSize', enum('sm', 'md', 'lg'))
prop('switchSize', enum('sm', 'md', 'lg'))

// Validation & State
prop('validationState', enum('none', 'valid', 'invalid', 'warning'))
prop('disabled', boolean())
prop('readOnly', boolean())
prop('required', boolean())
prop('loading', boolean())

// Input-specific
prop('inputType', enum('text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'datetime-local', 'month', 'week', 'time'))
prop('autocomplete', enum(...)) // All HTML5 autocomplete values
prop('resize', enum('none', 'both', 'horizontal', 'vertical'))

// Layout
prop('labelPosition', enum('top', 'left', 'right', 'bottom', 'floating'))
prop('fieldLayout', enum('vertical', 'horizontal', 'inline'))
prop('formSpacing', enum('none', 'xs', 'sm', 'md', 'lg', 'xl'))
prop('selectMode', enum('single', 'multiple'))
```

---

## Phase 5: Feedback & Overlay (v0.6.0) - ✅ COMPLETE

### Feedback Components
| Component | Status | Priority | Description |
|-----------|--------|----------|-------------|
| `Alert` | ✅ | P0 | Status messages with subtle/solid/accent variants |
| `Progress` | ✅ | P0 | Linear and circular with sizes and colors |
| `Spinner` | ✅ | P0 | Loading indicator with sizes, colors, thickness |
| `Skeleton` | ✅ | P0 | Content loading placeholders |
| `Toast` | ⏳ | P0 | Temporary notification system (hook-based) |
| `Badge` (enhanced) | ⏳ | P1 | Extended with dot, count, status variants |

### Overlay Components
| Component | Status | Priority | Description |
|-----------|--------|----------|-------------|
| `Modal` | ✅ | P0 | Focus-trapped dialog with sizes and placements |
| `Drawer` | ✅ | P0 | Side panel overlay (left/right/top/bottom) |
| `Tooltip` | ✅ | P0 | Hover information popup |
| `Popover` | ✅ | P0 | Click-triggered content popup |
| `Menu` | ✅ | P0 | Dropdown menu system with icons, shortcuts |
| `MenuItem` | ✅ | P0 | Individual menu item component |
| `Backdrop` | ✅ | P1 | Dimmed overlay background |
| `Sheet` | ⏳ | P1 | Bottom/Top sliding panel (mobile) |
| `HoverCard` | ⏳ | P2 | Preview on hover |

### Overlay Props - ✅ Complete
```typescript
// Positioning
prop('placement', enum('top', 'right', 'bottom', 'left', 'center'))
prop('placement', enum('top-start', 'top-end', 'bottom-start', 'bottom-end')) // Extended

// Sizing
prop('size', enum('xs', 'sm', 'md', 'lg', 'xl', 'full'))

// Behavior
prop('closeOnOverlayClick', boolean())
prop('closeOnBlur', boolean())
prop('closeOnEsc', boolean())

// Z-index layers
--z-backdrop: 40
--z-overlay: 50
```

---

## Phase 6: Navigation (v0.7.0) - Q3 2026

### Navigation Components
| Component | Priority | Description |
|-----------|----------|-------------|
| `Tabs` | P0 | Horizontal/vertical tab navigation |
| `Breadcrumbs` | P0 | Hierarchical navigation path |
| `Pagination` | P0 | Page number navigation |
| `Link` | P0 | Styled anchor component |
| `Nav` / `NavItem` | P1 | Navigation list |
| `Command` | P1 | Command palette (cmd+k) |
| `Steps` | P2 | Wizard/progress steps |
| `Sidebar` | P2 | Collapsible side navigation |
| `Navbar` | P2 | Top navigation bar |

---

## Phase 7: Data Display (v0.8.0) - Q4 2026

### Data Components
| Component | Priority | Description |
|-----------|----------|-------------|
| `Table` | P0 | Data table with sorting, filtering |
| `Accordion` | P0 | Collapsible content sections |
| `Avatar` | P0 | User/image avatar with fallback |
| `AvatarGroup` | P0 | Stacked avatar collection |
| `Card` (enhanced) | P1 | Extended with header, footer, media |
| `Timeline` | P2 | Vertical chronological display |
| `Tree` | P2 | Hierarchical tree view |
| `Calendar` | P2 | Month view calendar |
| `Chart` | P3 | Basic chart primitives (bar, line, pie) |
| `DataGrid` | P3 | Advanced data grid with virtualization |

---

## Phase 8: Default Theme (v0.9.0) - Q4 2026

### Complete Design System

#### Color Palette (Tailwind-compatible)
```typescript
// Gray scales
tokens.color.slate = { 50: '#f8fafc', 100: '#f1f5f9', ... 950: '#020617' }
tokens.color.gray = { 50: '#f9fafb', 100: '#f3f4f6', ... 950: '#030712' }
tokens.color.zinc = { ... }
tokens.color.neutral = { ... }
tokens.color.stone = { ... }

// Brand colors
tokens.color.red = { 50: '#fef2f2', ..., 950: '#450a0a' }
tokens.color.orange = { ... }
tokens.color.amber = { ... }
tokens.color.yellow = { ... }
tokens.color.lime = { ... }
tokens.color.green = { ... }
tokens.color.emerald = { ... }
tokens.color.teal = { ... }
tokens.color.cyan = { ... }
tokens.color.sky = { ... }
tokens.color.blue = { ... }
tokens.color.indigo = { ... }
tokens.color.violet = { ... }
tokens.color.purple = { ... }
tokens.color.fuchsia = { ... }
tokens.color.pink = { ... }
tokens.color.rose = { ... }

// Semantic colors
tokens.color.primary = tokens.color.blue
tokens.color.success = tokens.color.green
tokens.color.warning = tokens.color.amber
tokens.color.error = tokens.color.red
```

#### Spacing Scale
```typescript
tokens.spacing = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem',    // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem',     // 8px
  '2.5': '0.625rem', // 10px
  '3': '0.75rem',    // 12px
  '3.5': '0.875rem', // 14px
  '4': '1rem',       // 16px
  '5': '1.25rem',    // 20px
  '6': '1.5rem',     // 24px
  '7': '1.75rem',    // 28px
  '8': '2rem',       // 32px
  '9': '2.25rem',    // 36px
  '10': '2.5rem',    // 40px
  '11': '2.75rem',   // 44px
  '12': '3rem',      // 48px
  '14': '3.5rem',    // 56px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
  '28': '7rem',      // 112px
  '32': '8rem',      // 128px
  '36': '9rem',      // 144px
  '40': '10rem',     // 160px
  '44': '11rem',     // 176px
  '48': '12rem',     // 192px
  '52': '13rem',     // 208px
  '56': '14rem',     // 224px
  '60': '15rem',     // 240px
  '64': '16rem',     // 256px
  '72': '18rem',     // 288px
  '80': '20rem',     // 320px
  '96': '24rem',     // 384px
}
```

#### Typography Scale
```typescript
tokens.fontSize = {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
}

tokens.fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}
```

#### Shadows, Radii, Animations
```typescript
tokens.shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
}

tokens.radius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}

tokens.animation = {
  'fade-in': 'fadeIn 150ms ease-out',
  'fade-out': 'fadeOut 150ms ease-in',
  'slide-in': 'slideIn 200ms ease-out',
  'slide-out': 'slideOut 200ms ease-in',
  'scale-in': 'scaleIn 150ms ease-out',
  'scale-out': 'scaleOut 150ms ease-in',
  'spin': 'spin 1s linear infinite',
  'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce': 'bounce 1s infinite',
}
```

#### Breakpoints
```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

---

## Phase 9: Polish & Release (v1.0.0) - Q1 2027

### Final Components (Gap Fillers)
- [ ] Carousel/Slider
- [ ] Masonry layout
- [ ] Virtualized lists
- [ ] Rich text editor primitives
- [ ] Drag and drop utilities

### Documentation
- [ ] Interactive component documentation
- [ ] Migration guide from Tailwind
- [ ] Best practices guide
- [ ] Design system cookbook
- [ ] Video tutorials

### Ecosystem
- [ ] Figma plugin (sync tokens)
- [ ] Design tokens export (Style Dictionary)
- [ ] Integration examples (Next.js, Remix, Astro, SvelteKit)
- [ ] Server components support

### Performance
- [ ] Sub-50ms compile time for typical projects
- [ ] <5KB runtime overhead
- [ ] CSS size comparable to PurgeCSS-optimized Tailwind

### Stability
- [ ] 100% test coverage
- [ ] Browser testing matrix (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Security audit

---

## Post-v1.0.0 Ideas

### Advanced Features
- [ ] Animation/transition system
- [ ] 3D transform utilities
- [ ] Print styles
- [ ] Container queries (full support)
- [ ] CSS Subgrid support
- [ ] Logical properties (RTL support)

### AI Enhancements
- [ ] AI-powered component generation from descriptions
- [ ] Automatic accessibility fixes
- [ ] Smart token suggestions from brand colors
- [ ] Migration assistant (from any CSS framework)

### Platform Expansion
- [ ] Vue components (`intent-vue`)
- [ ] Svelte components (`intent-svelte`)
- [ ] Solid components (`intent-solid`)
- [ ] React Native components (`intent-native`)
- [ ] Web Components (`intent-elements`)

---

## Component Count Summary

| Phase | Components | Cumulative |
|-------|-----------|------------|
| Current (v0.1) | 8 | 8 |
| Layout | 8 | 16 |
| Typography | 9 | 25 |
| Forms | 14 | 39 |
| Feedback | 6 | 45 |
| Overlay | 7 | 52 |
| Navigation | 9 | 61 |
| Data Display | 10 | 71 |
| **v1.0 Total** | **~70** | **~70** |

---

## Contributing

We welcome contributions! Priority areas:
1. **Components**: Start with P0/P1 items in upcoming phases
2. **Testing**: Help reach 100% coverage
3. **Documentation**: Improve examples and guides
4. **Themes**: Create additional preset themes

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
