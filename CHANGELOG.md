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
