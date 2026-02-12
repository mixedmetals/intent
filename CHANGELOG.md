# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0 (2026-02-10)

Initial release of the Intent Framework — a schema-first, AI-native styling system.

### intent-core

- **Schema DSL**: `defineSystem`, `defineComponent`, `prop`, `when` for defining design systems in TypeScript
- **CSS Compiler**: Per-prop attribute selectors (no combinatorial explosion)
- **Token Resolver**: Handles category-prefixed tokens, compound CSS values, multi-word shorthands
- **Validator**: Schema validation and component usage validation
- **Constraint Engine**: Forbid/require rules with `generateValidCombinations` and `suggestValidAlternatives`
- **Dark Mode**: Generates both `@media (prefers-color-scheme: dark)` and `.dark` class overrides
- **AI Manifest**: Generates machine-readable component documentation for AI tools

### intent-react

- **8 Components**: Stack, Surface, Button, Text, Badge, Input, Card, Divider
- **Convenience Aliases**: VStack, HStack, Heading
- **TypeScript**: Full prop types matching schema enum values
- **Type Coherence**: Runtime tests verifying React types match canonical schema

### intentcss-cli

- `intent init` — Scaffold project with complete 5-component design system
- `intent compile` — Generate static CSS from schema (with dark mode support)
- `intent validate` — Check component usage against schema constraints
- `intent migrate` — Tailwind migration (experimental)
- `intent generate` — AI documentation generator (cursorrules, prompts)
- **Config Loading**: TypeScript config support via jiti

### intent-mcp

- MCP (Model Context Protocol) server for AI assistant integration
- Tools: `get_component_schema`, `validate_component_usage`, `suggest_component_props`, `get_design_tokens`, `generate_ai_prompt`

### Infrastructure

- GitHub Actions workflow for website deployment
- Website uses published npm packages (`intent-core`, `intent-react`, `intentcss-cli`) instead of workspace references

## [Unreleased] - Phase 1: Foundation (v0.2.0)

### Roadmap
- Added comprehensive roadmap to v1.0.0 with Tailwind component parity (~70 components)
- See [ROADMAP.md](./ROADMAP.md) for full details

### Plugin System
- `PluginManager` for registering/unregistering plugins with lifecycle hooks
- Hooks: `tokens`, `component`, `beforeValidate`, `afterValidate`, `beforeGenerate`, `afterGenerate`
- Custom validators and generators support
- `usePlugin()`, `definePlugin()`, `definePreset()` helpers

### Theme Inheritance
- Theme registration and resolution with parent themes via `extends`
- Deep merging of tokens, darkTokens, and componentOverrides
- `composeThemes()` for ad-hoc theme composition
- `extendTheme()` for creating theme variants
- `defaultTheme` with essential tokens (colors, space, elevation, radius, typography)

### Source Maps
- `SourceMapBuilder` for tracking CSS generation from schema
- VLQ encoding for compact mappings
- Debug info: component, property, value, condition
- Compilation trace for auditing CSS generation
- `generateDebugReport()` for markdown reports

### Visual Regression Testing
- `generateTestHTML()` for isolated component testing
- `intentVisualTest()` Playwright integration
- Automatic baseline management and comparison
- Accessibility checks (color contrast, ARIA)

### Performance Benchmarks
- `benchmarkIntentSystem()` and `benchmarkIntentComponent()`
- `analyzeBundle()` - CSS metrics (rules, selectors, variables)
- `compareBundleSizes()` - Intent vs Tailwind
- `runBenchmarks()` full suite with reporting

### Bundle Size Dashboard
- Historical snapshot tracking with git metadata
- Trend analysis with warning (10%) and error (25%) thresholds
- Interactive HTML dashboard with Chart.js
- Recommendations engine based on bundle analysis

## Phase 2: Layout System (v0.3.0)

### Layout Props (intent-core/schema)
- Position: `position`, `inset`, `zIndex`, `overflow`
- Display: `display`, `flexDirection`, `flexWrap`, `flexGrow`, `flexShrink`
- Sizing: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- Grid: `gridColumns`, `gridRows`, `gridFlow`, `gap`, `gapX`, `gapY`
- Alignment: `justifyContent`, `alignContent`, `alignItems`, `alignSelf`
- Media: `aspectRatio`, `objectFit`, `objectPosition`
- Visibility: `visibility`, responsive breakpoints

### Layout Components
- **Container**: Max-width wrapper with xs/sm/md/lg/xl/2xl/full breakpoints
- **Grid**: 12-column grid with configurable columns, rows, gaps, alignment
- **GridItem**: Grid child with colSpan, rowSpan, positioning controls
- **Box**: Generic layout primitive with display, position, sizing
- **AspectRatio**: Maintains consistent ratios (square, video, portrait, landscape)
- **Center**: Flexbox centering helper (horizontal, vertical, or both)
- **Spacer**: Flexible spacing element with size and grow options
- **Show/Hide**: Responsive visibility toggles by breakpoint

### Bundle Size Dashboard
- Historical snapshot tracking with git metadata
- Trend analysis with warning (10%) and error (25%) thresholds
- Interactive HTML dashboard with Chart.js
- Recommendations engine based on bundle analysis
- `generateHTMLDashboard()`, `saveHTMLDashboard()`

## Phase 3: Typography System (v0.4.0)

### Typography Props
- **Font**: `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`
- **Text**: `align`, `transform`, `decoration`, `decorationStyle`
- **Overflow**: `textOverflow`, `truncate`, `wrap`, `break`, `hyphens`
- **Style**: `fontStyle`, `fontVariantNumeric`, `italic`
- **Accessibility**: `srOnly` for screen reader only text

### Typography Components
- **Heading**: H1-H6 with size, weight, lineHeight, letterSpacing, truncate
- **Paragraph**: Body text with lead/caption/small variants
- **Text**: Extended with decoration, wrap, break, hyphens, srOnly
- **List/ListItem**: Unordered/ordered with marker styles (disc, decimal, roman, etc.)
- **Code**: Inline and block variants with language support
- **Quote**: Default, bordered, pull quote variants with citation
- **Prose**: Markdown content wrapper (Tailwind Typography-like)
- **Kbd**: Keyboard key styling for shortcuts documentation
- **Mark**: Highlight text with variant colors (default, primary, success, warning, error)

## Phase 4: Form Components (v0.5.0)

### Form Props
- **Sizing**: `formSize`, `checkSize`, `switchSize` (xs/sm/md/lg/xl)
- **Variants**: `formVariant` (outline/filled/flushed/unstyled)
- **Validation**: `validationState` (none/valid/invalid/warning)
- **Input**: `inputType`, `autocomplete` (all HTML5 values)
- **Layout**: `labelPosition`, `fieldLayout`, `formSpacing`

### Form Components
- **Input**: All HTML5 input types with 4 variants, validation states
- **Textarea**: Multi-line input with resize control (none/both/horizontal/vertical)
- **Select**: Dropdown with single/multiple mode, clearable, searchable
- **Checkbox**: Single checkbox with indeterminate state, 3 sizes
- **CheckboxGroup**: Group layout (vertical/horizontal/inline) with spacing
- **Radio**: Radio button with grouping support
- **RadioGroup**: Shared layout container for radio buttons
- **Switch**: Toggle switch (checkbox alternative), 3 sizes
- **Label**: Form label with required indicator (*) and disabled state
- **Field**: Complete field wrapper with label, input, help text, error message
- **Form**: Context provider with layout, spacing, and state management
- **HelperText**: Validation/help message with color variants

### Form Features
- Form context for consistent field styling across components
- `useFormContext()` hook for accessing form state
- `useFormField()` hook for field registration
- Forward ref support for all inputs (react-hook-form compatible)
- Horizontal, vertical, and inline field layouts
- Validation state inheritance from Form to Field to Input

## Phase 5: Feedback & Overlay (v0.6.0)

### Feedback Components
- **Alert**: Status messages (info/success/warning/error) with subtle/solid/left-accent/top-accent variants
- **Progress**: Linear and circular progress bars with sizes (xs/sm/md/lg) and colors
- **Spinner**: Loading indicator with sizes (xs/sm/md/lg/xl), colors, thickness options
- **Skeleton**: Content loading placeholders with text/circle/rectangle variants

### Overlay Components
- **Modal**: Focus-trapped dialog with sizes (xs/sm/md/lg/xl/full), placements (center/top)
- **Drawer**: Sliding side panel with placements (left/right/top/bottom) and sizes
- **Tooltip**: Hover popup with 4 placements (top/right/bottom/left)
- **Popover**: Click-triggered popup with 8 placements and sizes (sm/md/lg)
- **Menu**: Dropdown menu system with items, icons, keyboard shortcuts
- **MenuItem**: Individual menu item with disabled state and shortcut display

### Overlay Features
- Position-based CSS mappings for all overlay types
- Z-index management (backdrop: 40, overlays: 50)
- Animation-ready style structures
- Focus trap support for Modal
- Click-outside detection support
