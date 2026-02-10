# ADR-003: MCP Server for AI Integration

## Status
Accepted

## Context

Intent is designed for AI-generated code. For AI to use Intent effectively, it needs:
1. **Schema awareness**: Know valid props, constraints, tokens
2. **Validation feedback**: Check generated code immediately
3. **Semantic understanding**: Map descriptions to component props

The Model Context Protocol (MCP) provides a standard way for AI tools (Cursor, Claude, etc.) to interact with external systems.

## Decision

Intent provides an MCP server (`intent-mcp`) that exposes design system capabilities to AI.

### Architecture

```
AI (Cursor/Claude)
    ↓ MCP Protocol
Intent MCP Server (intent-mcp)
    ↓ Loads
intent.config.ts
    ↓ Provides
Schema, Validation, Suggestions
```

### Exposed Tools

| Tool | Purpose |
|------|---------|
| `get_component_schema` | AI queries component definitions |
| `validate_component_usage` | AI checks if props are valid |
| `suggest_component_props` | AI gets prop suggestions from description |
| `get_valid_prop_combinations` | AI sees all valid prop combos |
| `get_design_tokens` | AI queries available tokens |
| `generate_ai_prompt` | AI gets full context prompt |

### Why MCP?

**Alternative: Static Context**
- Include `ai-manifest.json` in AI context window
- Simple, but consumes tokens
- Context can get stale

**Alternative: Custom LSP**
- IDE integration
- Complex to implement per-editor
- Doesn't help non-IDE AI usage

**MCP Benefits:**
- Standard protocol (Anthropic, Cursor supporting)
- Real-time schema access
- Validation on demand
- No token consumption for schema storage

### Usage

```bash
# Start MCP server
npx intent-mcp

# Or in Cursor settings
{
  "mcpServers": {
    "intent": {
      "command": "npx",
      "args": ["intent-mcp", "./intent.config.ts"]
    }
  }
}
```

## Related

- [ADR-001: Constraints Over Utilities](./ADR-001-constraints-over-utilities.md)
- [AI Starter Prompt](./ai-starter-prompt.md)
