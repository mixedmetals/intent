# Agent Context - Intent Framework

> Critical context for AI agents working on this project.
> Last updated: 2026-02-12

## Build Process (CRITICAL - Use pnpm!)

Always use pnpm, never npm. The project uses workspace linking.

```bash
# Install dependencies
pnpm install

# Build packages (dependency order matters)
pnpm --filter intent-core run build
pnpm --filter intent-react run build

# Build website
pnpm --filter website run build

# Or build everything
pnpm run build
```

## Project Architecture

### Package Structure
```
packages/
  core/          - Schema, compiler, theme tokens
  react/         - React components (92 total)
  cli/           - CLI tooling
  mcp/           - MCP server

website/         - Docusaurus documentation site
```

### Workspace Configuration
- Uses `workspace:*` protocol for internal packages
- Website imports: `intent-core`, `intent-react` from workspace
- Never use npm versions for internal packages

## Design System - "Subtle Tactility"

### Three Archetypes

| Archetype | Use Case | Visual Treatment |
|-----------|----------|------------------|
| **Milled** | Interactive items (buttons, inputs, switches) | Radial gradient bg, 0.5px hairline borders, inset shadows |
| **Elevated** | Containers (cards, modals, popovers) | Backdrop blur, layered shadows, hairline borders |
| **Flat** | Badges, indicators, secondary items | High-transparency tints, minimal borders |

### Light Source System
```css
--intent-light-angle: 145deg;  /* Top-left origin */
```
- All gradients use this angle
- Shadows cast down-right (1px 2px offsets)
- Creates consistent 3D lighting across components

### Border Technique - Hairline (0.5px)
```css
/* Standard pattern for all components */
.component::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 0.5px;
  background: linear-gradient(
    var(--intent-light-angle, 145deg),
    oklch(100% 0 0 / 0.20) 0%,   /* Light edge (top-left) */
    oklch(100% 0 0 / 0.08) 50%,  /* Middle */
    oklch(0% 0 0 / 0.20) 100%    /* Dark edge (bottom-right) */
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### OKLCH Color System
```css
/* Primary - Matte/Metallic (reduced chroma) */
--intent-color-primary-l: 65%;
--intent-color-primary-c: 0.12;   /* Was 0.22 - too saturated */
--intent-color-primary-h: 275;    /* Cool gray, not blue */

/* Surfaces - Neutral with subtle warmth */
--intent-color-base: oklch(18% 0.008 275);
--intent-color-base-elevated: oklch(22% 0.006 275);
```

### Motion Tokens
```css
--intent-duration-micro: 75ms;
--intent-duration-fast: 100ms;
--intent-duration-normal: 150ms;
--intent-easing-mechanical: cubic-bezier(0.2, 0, 0, 1);
--intent-easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## File Locations

### CSS
- `website/src/css/intent-theme.css` - Master token system + component styles
- `website/src/css/custom.css` - Docusaurus overrides + demo styles

### Components
- `packages/react/src/components/` - React component source
- `packages/react/src/components/form/` - Form components (Input, Checkbox, etc.)
- `packages/react/src/components/flat/` - Flat archetype components

### Documentation
- `website/docs/components/*.mdx` - Component documentation
- Use real imports: `import { Button } from 'intent-react'`
- Include working React state demos with `useState`

## Design Principles

1. **Zero hard-coded values** - All values reference tokens
2. **Mathematical consistency** - 145° light angle everywhere
3. **Subtlety over flash** - Low chroma (0.12), not saturated
4. **Tactility** - Inset shadows, hairline borders, depth
5. **Accessibility** - Focus rings, proper contrast, keyboard nav

## Component Implementation Checklist

When styling a new component:

- [ ] Position relative (for ::before hairline)
- [ ] Add `::before` pseudo-element with hairline gradient
- [ ] Use `var(--intent-light-angle)` in gradients
- [ ] Add `-webkit-mask-composite: xor` technique
- [ ] Set `pointer-events: none` on border
- [ ] Hover state updates border brightness
- [ ] Shadows follow 145° direction (down-right)
- [ ] Use OKLCH with 0.12 max chroma for colors

## Known System Behaviors

### CSP eval Warning
Prism.js syntax highlighter uses dynamic regex compilation. This triggers CSP warnings but is expected and harmless. The CSP meta tag allows `'unsafe-eval'` for this purpose.

### GitHub Pages Deployment
- Branch: `gh-pages` (auto-created by deploy-pages action)
- URL: `https://mixedmetals.github.io/intent/`
- Dark mode default (required for Intent styling)

## Testing Changes

```bash
# Local build test
cd website && pnpm run build

# Serve locally
cd website && pnpm run serve

# Check for eval in build
grep -r "eval" build/assets/js/
```

## Questions?

Check git history for similar changes:
```bash
git log --oneline --all --grep="hairline\|tactility\|milled" 
```
