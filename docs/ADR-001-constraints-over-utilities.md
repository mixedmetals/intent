# ADR-001: Constraints Over Utilities

## Status
Accepted

## Context

Current CSS frameworks (Tailwind, Bootstrap) were designed for human developers manually writing code. They provide:

- Thousands of utility classes
- No compile-time validation
- Complete freedom to combine classes arbitrarily
- Semantic meaning only in the developer's head

With the rise of AI-generated code ("vibe coding"), these frameworks produce:

1. **Verbose output**: AI generates 60+ tokens for a simple button
2. **Pathological combinations**: AI can generate `bg-blue-500 bg-red-500` (both apply, order-dependent)
3. **Maintenance nightmares**: Changing a brand color requires updating hundreds of class strings
4. **Context window exhaustion**: Long class lists consume precious LLM tokens

## Decision

We will build a **schema-first, constraint-based styling framework** where:

1. **Components have semantic props**, not utility classes
2. **Constraints prevent invalid combinations** at compile time
3. **Design tokens are the only source of truth** for values
4. **Validation happens before runtime**, not in the browser

### Key Design Decisions

#### 1. Semantic Props Over Utility Classes

```tsx
// ❌ Bad: Implementation detail exposed
<button className="bg-blue-500 text-white px-4 py-2 rounded">

// ✅ Good: Semantic intent expressed
<Button importance="primary" size="md">
```

**Rationale**: Semantic props are:
- Shorter (fewer tokens for AI)
- Self-documenting
- Refactorable (change `primary` mapping once)
- Validatable (we know what props are valid)

#### 2. Compile-Time Validation

```tsx
// intent.config.ts
const Button = defineComponent({
  constraints: [
    when({ importance: 'ghost' }).forbid(['disabled']),
  ],
});

// Component usage
<Button importance="ghost" disabled /> // ❌ Compile error!
```

**Rationale**: Catching errors at compile time:
- Prevents broken UIs from reaching production
- Provides immediate feedback to AI during generation
- Eliminates runtime validation overhead

#### 3. Design Tokens as Type System

```tsx
const tokens = {
  color: {
    'brand-primary': '#3B82F6',  // AI can only use 'brand-primary'
    'feedback-error': '#EF4444', // Never '#FF0000' or 'red-500'
  },
};
```

**Rationale**: Tokens provide:
- Guaranteed consistency
- Single source of truth for design decisions
- Type safety (TypeScript knows valid token names)
- Theme-ability (swap token values, keep semantics)

#### 4. No Escape Hatches

Intent **does not** allow:
- Arbitrary CSS values (`className="pt-[7px]"`)
- Raw utility class injection (`className="flex items-center"`)
- Inline styles for visual properties

**Rationale**: Escape hatches:
- Break the constraint system
- Allow AI to generate invalid output
- Create inconsistencies that are hard to refactor

If a design needs a new value, add it to the schema:

```tsx
// Instead of: className="pt-[7px]"
// Add to schema:
tokens: {
  space: {
    'custom': '7px', // Now it's part of the system
  },
}
```

## Consequences

### Positive

1. **AI-Optimized**: 80% fewer tokens vs Tailwind for equivalent UI
2. **Compile-Time Safety**: Impossible to generate visually broken UI through prop combinations
3. **Refactorability**: Change one token, update entire design system
4. **Semantic Clarity**: Code expresses intent, not implementation
5. **Maintainability**: Centralized schema documents the design system

### Negative

1. **Learning Curve**: Developers must learn schema syntax
2. **Upfront Schema Work**: Requires defining design system before usage
3. **Less Flexibility**: No escape hatches for one-off designs
4. **Migration Cost**: Existing Tailwind code must be migrated

### Mitigations

- **Migration tool**: `intent migrate --from tailwind` analyzes and suggests Intent equivalents
- **IDE integration**: Autocomplete and inline validation
- **Pre-built schemas**: Common design systems available as packages

## Alternatives Considered

### 1. Enhanced Tailwind with AI Rules

Add `.cursorrules` files telling AI how to use Tailwind classes.

**Rejected**: Still allows invalid combinations; doesn't solve token efficiency.

### 2. CSS-in-JS with Constraints

Use styled-components or emotion with runtime validation.

**Rejected**: Runtime overhead; no compile-time feedback for AI.

### 3. Design System as Figma Plugin

Export design tokens from Figma to CSS variables.

**Rejected**: Doesn't provide component-level constraints or validation.

## Related Decisions

- [ADR-002: No Runtime CSS-in-JS](./ADR-002-no-runtime-css-in-js.md)
- [ADR-003: MCP Server for AI Integration](./ADR-003-mcp-server.md)

## References

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Design Tokens W3C Community Group](https://www.w3.org/community/designtokens/)
- "Refactoring UI" by Adam Wathan & Steve Schoger
