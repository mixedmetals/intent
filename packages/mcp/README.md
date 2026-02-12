# intent-mcp

[![npm version](https://img.shields.io/npm/v/intent-mcp.svg)](https://www.npmjs.com/package/intent-mcp)
[![License](https://img.shields.io/npm/l/intent-mcp.svg)](https://github.com/mixedmetals/intent-framework/blob/main/LICENSE)

> MCP (Model Context Protocol) server for AI integration with Intent styling framework.

## Installation

```bash
npm install -g intent-mcp
# or
pnpm add -g intent-mcp
```

## Quick Start

```bash
# Start the MCP server
intent-mcp

# Or with custom port
intent-mcp --port 3000
```

## What is MCP?

The Model Context Protocol (MCP) is a protocol for AI assistants to interact with external tools and services. The Intent MCP server allows AI assistants like Claude, GPT, and others to:

- Generate Intent component code
- Validate component schemas
- Query design system tokens
- Generate CSS from schemas
- Validate component usage

## Features

- **Schema Queries** - Access all component schemas
- **Code Generation** - Generate React component code
- **Validation** - Validate schemas and component usage
- **Token Access** - Query design tokens
- **CSS Generation** - Compile schemas to CSS on demand

## Configuration

### Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "intent": {
      "command": "intent-mcp",
      "args": [],
      "env": {
        "INTENT_SCHEMAS_PATH": "./src/schemas"
      }
    }
  }
}
```

### Environment Variables

- `INTENT_SCHEMAS_PATH` - Path to your schema files
- `INTENT_THEME_PATH` - Path to your theme configuration
- `INTENT_PORT` - Server port (default: 3000)

## Usage with AI Assistants

Once configured, you can ask Claude (or other MCP-enabled AIs):

> "Generate a Card component with elevation and padding props using Intent"

The AI will:
1. Query available schemas via MCP
2. Generate valid Intent component code
3. Ensure type safety and constraint compliance

## API Endpoints

### `GET /schemas`
List all available component schemas.

### `GET /schemas/:name`
Get a specific component schema.

### `POST /validate`
Validate a component schema or usage.

```json
{
  "type": "schema",
  "data": { /* schema object */ }
}
```

### `POST /generate`
Generate code from a schema.

```json
{
  "component": "Button",
  "props": {
    "importance": "primary",
    "size": "lg"
  }
}
```

### `POST /compile`
Compile schemas to CSS.

```json
{
  "schemas": [ /* array of schemas */ ],
  "options": {
    "minify": true
  }
}
```

## Example: AI-Generated Component

With MCP enabled, you can ask:

> "Create a Badge component with variant prop for success, warning, and error states"

And receive:

```typescript
import { defineComponent } from 'intent-core';

export const BadgeSchema = defineComponent({
  name: 'Badge',
  properties: {
    variant: {
      type: 'enum',
      values: ['success', 'warning', 'error', 'info'],
      default: 'info'
    },
    size: {
      type: 'enum',
      values: ['sm', 'md'],
      default: 'md'
    }
  },
  mappings: {
    'variant=success': {
      backgroundColor: '#22C55E',
      color: 'white'
    },
    'variant=warning': {
      backgroundColor: '#F59E0B',
      color: 'white'
    },
    'variant=error': {
      backgroundColor: '#EF4444',
      color: 'white'
    }
  }
});
```

## License

MIT © Intent Framework Contributors
