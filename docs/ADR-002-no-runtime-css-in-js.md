# ADR-002: No Runtime CSS-in-JS

## Status
Accepted

## Context

CSS-in-JS libraries (styled-components, emotion) provide excellent developer experience with:
- Dynamic styles based on props
- Scoped styles preventing conflicts
- TypeScript integration

However, they introduce:
- **Runtime overhead**: Styles computed on every render
- **Bundle bloat**: Library code + runtime parser
- **SSR complexity**: Hydration mismatches, critical CSS extraction
- **Build complexity**: Babel plugins, webpack config

## Decision

Intent will be **compile-time only** with zero runtime CSS-in-JS.

### Implementation

1. **Schema Compilation**: Design system compiled to static CSS files
2. **Data Attributes**: React components output `data-importance="primary"` etc.
3. **CSS Selectors**: Compiled CSS matches data attributes
   ```css
   .intent-button[data-importance="primary"] {
     background: var(--intent-color-brand-primary);
   }
   ```
4. **Zero Runtime**: No style calculation, no parser, no dynamic injection

### Trade-offs

| Pros | Cons |
|------|------|
| Zero runtime overhead | Cannot do truly dynamic styles |
| Smaller bundle size | All variations must be pre-defined |
| No SSR hydration issues | Schema changes require recompile |
| Works with any build tool | Less flexible than CSS-in-JS |

### Dynamic Styles Workaround

For truly dynamic values (user-selected colors, runtime theming):

```tsx
// Use CSS variables at runtime
<Surface style={{ '--custom-bg': userColor } as React.CSSProperties}>

// Define in schema
tokens: {
  color: {
    'dynamic': 'var(--custom-bg, fallback)',
  },
}
```

## Related

- [ADR-001: Constraints Over Utilities](./ADR-001-constraints-over-utilities.md)
