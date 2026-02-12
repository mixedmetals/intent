# Changelog

All notable changes to the Intent Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-02-09

### Added
- **Initial Release** - Complete Intent Framework v1.0.0

#### Core Features
- Schema-first component definition system with `defineComponent()`
- Constraint validation with `when`, `forbid`, `require` operators
- CSS generation with per-property attribute selectors
- Complete TypeScript type generation
- Source map support for debugging
- Plugin system with lifecycle hooks
- Theme inheritance and composition
- Dark mode support

#### Component Library (66 Components)
- **Layout**: Container, Grid, Box, AspectRatio, Center, Spacer, Show, Hide
- **Typography**: Heading, Text, Paragraph, List, Code, Quote, Prose, Kbd, Mark
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Label, Form, Field
- **Feedback**: Alert, Progress, Spinner, Skeleton
- **Overlay**: Modal, Drawer, Tooltip, Popover, Menu
- **Navigation**: Tabs, Breadcrumbs, Pagination, Link, Nav, Command, Steps, Sidebar, Navbar
- **Data Display**: Table, Stat, Timeline, DescriptionList, Tree, Calendar, CardParts

#### Default Theme
- 9 color palettes (11 shades each)
- Complete typography scale
- 41 spacing values
- 10 elevation/shadow levels
- Border radius system
- Transition and animation tokens
- Z-index scale
- Breakpoint system
- Component-specific tokens
- Full dark mode support

#### CLI Tools
- `intent init` - Initialize projects
- `intent build` - Compile schemas to CSS
- `intent watch` - Watch mode for development
- `intent validate` - Validate component usage
- Configuration file support

#### AI Integration
- MCP server for Model Context Protocol
- AI manifest generation
- Component schema exports for AI context

#### Testing & Quality
- 146 core tests (Vitest)
- 16 React type-coherence tests
- Visual regression testing with Playwright
- Bundle size analysis tools
- Performance benchmarks
- Source map generation

### Performance
- **74x CSS reduction** compared to Tailwind (588KB → 8KB)
- **60x faster build times** (~50ms vs ~3000ms)
- **99% fewer CSS classes** (per-property selectors)

### Technical Highlights
- 74x CSS reduction vs Tailwind CSS
- Type-safe component definitions
- Constraint-based validation
- Dark mode support
- Plugin architecture
- Theme inheritance
- Source maps for debugging
- Visual regression testing
- Bundle size dashboard

### Packages
- `intent-core@1.0.0` - Core schema and compiler
- `intent-react@1.0.0` - React component library
- `intentcss-cli@1.0.0` - CLI tools
- `intent-mcp@1.0.0` - MCP server for AI

---

## Pre-Release Development

### Phase 9 (v0.9.0) - Default Theme
- Complete default theme system
- Color palettes (primary, neutral, semantic)
- Typography scale
- Spacing and elevation systems
- Dark mode tokens

### Phase 8 (v0.8.0) - Data Display
- Table, DataGrid components
- Stat, Timeline components
- Description List, Tree
- Calendar component
- Card variations

### Phase 7 (v0.7.0) - Navigation
- Tabs, Breadcrumbs, Pagination
- Link, Nav components
- Command palette
- Steps, Sidebar, Navbar

### Phase 6 (v0.6.0) - Feedback & Overlay
- Alert, Progress, Spinner, Skeleton
- Modal, Drawer, Tooltip
- Popover, Menu components

### Phase 5 (v0.5.0) - Forms
- Input, Textarea, Select
- Checkbox, Radio, Switch
- Label, Field, Form components
- Form validation integration

### Phase 4 (v0.4.0) - Typography
- Heading, Paragraph, Text
- List, Code, Quote
- Prose, Kbd, Mark components

### Phase 3 (v0.3.0) - Layout
- Container, Grid system
- Box, AspectRatio
- Center, Spacer
- Show/Hide utilities

### Phase 2 (v0.2.0) - Foundation
- Plugin system
- Theme inheritance
- Source maps
- Visual regression testing

### Phase 1 (v0.1.0) - Initial
- Core schema system
- Basic components (Stack, Button, Surface)
- CSS generation

[1.0.0]: https://github.com/mixedmetals/intent-framework/releases/tag/v1.0.0
