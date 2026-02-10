/**
 * Intent MCP Server
 * 
 * Model Context Protocol server for AI integration with Intent.
 * Provides tools for schema introspection, validation, and code generation.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';

import {
  generateAIManifest,
  validateUsage,
  suggestValidAlternatives,
  parseFile,
  type DesignSystemConfig,
} from 'intent-core';

import { loadConfig } from 'intentcss-cli';

// ============================================================================
// Tool Definitions
// ============================================================================

const TOOLS: Tool[] = [
  {
    name: 'get_component_schema',
    description: 'Get the schema definition for an Intent component',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Name of the component (e.g., Button, Stack, Surface)',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'validate_component_usage',
    description: 'Validate a component usage against the design system schema',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name',
        },
        props: {
          type: 'object',
          description: 'Props being passed to the component',
        },
      },
      required: ['component', 'props'],
    },
  },
  {
    name: 'suggest_component_props',
    description: 'Suggest valid props for a component based on a description',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Description of what you want to achieve (e.g., "a prominent call-to-action button")',
        },
        component: {
          type: 'string',
          description: 'Component name (default: Button)',
        },
      },
      required: ['description'],
    },
  },
  {
    name: 'get_valid_prop_combinations',
    description: 'Get all valid prop combinations for a component',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component name',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'get_design_tokens',
    description: 'Get available design tokens (colors, spacing, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Token category (color, space, elevation, etc.)',
        },
      },
    },
  },
  {
    name: 'generate_ai_prompt',
    description: 'Generate the full AI prompt for Intent framework',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Specific component to focus on (optional)',
        },
      },
    },
  },
];

// ============================================================================
// Server Setup
// ============================================================================

export async function startServer(configPath: string = 'intent.config.ts') {
  let config: DesignSystemConfig;
  
  try {
    config = await loadConfig(configPath);
  } catch (error) {
    console.error('Failed to load Intent config:', error);
    process.exit(1);
  }
  
  const server = new Server({
    name: 'intent-mcp-server',
    version: '0.1.0',
  });
  
  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
  });
  
  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    switch (name) {
      case 'get_component_schema':
        return handleGetComponentSchema(config, args as { component: string });
        
      case 'validate_component_usage':
        return handleValidateComponentUsage(config, args as { component: string; props: Record<string, unknown> });
        
      case 'suggest_component_props':
        return handleSuggestComponentProps(config, args as { description: string; component?: string });
        
      case 'get_valid_prop_combinations':
        return handleGetValidCombinations(config, args as { component: string });
        
      case 'get_design_tokens':
        return handleGetDesignTokens(config, args as { category?: string });
        
      case 'generate_ai_prompt':
        return handleGenerateAIPrompt(config, args as { component?: string });
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });
  
  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('Intent MCP server running on stdio');
}

// ============================================================================
// Tool Handlers
// ============================================================================

function handleGetComponentSchema(
  config: DesignSystemConfig,
  args: { component: string }
) {
  const schema = config.components[args.component];
  
  if (!schema) {
    return {
      content: [
        {
          type: 'text',
          text: `Component "${args.component}" not found. Available components: ${Object.keys(config.components).join(', ')}`,
        },
      ],
      isError: true,
    };
  }
  
  const formatted = {
    name: schema.name,
    description: schema.description,
    properties: Object.entries(schema.properties).map(([name, def]) => ({
      name,
      type: def.type,
      values: def.type === 'enum' ? def.values : undefined,
      required: def.required || false,
      default: def.default,
    })),
    constraints: schema.constraints.map(c => ({
      when: c.when,
      forbid: c.forbid,
      require: c.require,
      message: c.message,
    })),
  };
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(formatted, null, 2),
      },
    ],
  };
}

function handleValidateComponentUsage(
  config: DesignSystemConfig,
  args: { component: string; props: Record<string, unknown> }
) {
  const schema = config.components[args.component];
  
  if (!schema) {
    return {
      content: [
        {
          type: 'text',
          text: `Unknown component: ${args.component}`,
        },
      ],
      isError: true,
    };
  }
  
  const result = validateUsage(schema, {
    component: args.component,
    props: args.props,
  });
  
  if (result.valid) {
    return {
      content: [
        {
          type: 'text',
          text: `✓ Valid usage of ${args.component} with props: ${JSON.stringify(args.props)}`,
        },
      ],
    };
  }
  
  const issues = result.issues.map(i => 
    `- ${i.severity.toUpperCase()}: ${i.message}${i.suggestion ? ` (suggestion: ${i.suggestion})` : ''}`
  ).join('\n');
  
  return {
    content: [
      {
        type: 'text',
        text: `✗ Invalid usage of ${args.component}:\n${issues}`,
      },
    ],
    isError: true,
  };
}

function handleSuggestComponentProps(
  config: DesignSystemConfig,
  args: { description: string; component?: string }
) {
  const componentName = args.component || 'Button';
  const schema = config.components[componentName];
  
  if (!schema) {
    return {
      content: [
        {
          type: 'text',
          text: `Unknown component: ${componentName}`,
        },
      ],
      isError: true,
    };
  }
  
  // Simple keyword-based suggestion logic
  const desc = args.description.toLowerCase();
  const suggestions: Record<string, string> = {};
  
  // Check for importance hints
  if (desc.includes('primary') || desc.includes('main') || desc.includes('cta')) {
    suggestions.importance = 'primary';
  } else if (desc.includes('secondary') || desc.includes('alternative')) {
    suggestions.importance = 'secondary';
  } else if (desc.includes('ghost') || desc.includes('subtle') || desc.includes('low')) {
    suggestions.importance = 'ghost';
  } else if (desc.includes('danger') || desc.includes('delete') || desc.includes('remove')) {
    suggestions.importance = 'danger';
  }
  
  // Check for size hints
  if (desc.includes('small') || desc.includes('compact')) {
    suggestions.size = 'sm';
  } else if (desc.includes('large') || desc.includes('big') || desc.includes('prominent')) {
    suggestions.size = 'lg';
  } else {
    suggestions.size = 'md';
  }
  
  const formatted = {
    component: componentName,
    props: suggestions,
    code: `<${componentName} ${Object.entries(suggestions).map(([k, v]) => `${k}="${v}"`).join(' ')} />`,
  };
  
  return {
    content: [
      {
        type: 'text',
        text: `Suggested props for "${args.description}":\n\n${JSON.stringify(formatted, null, 2)}`,
      },
    ],
  };
}

async function handleGetValidCombinations(
  config: DesignSystemConfig,
  args: { component: string }
) {
  const schema = config.components[args.component];
  
  if (!schema) {
    return {
      content: [
        {
          type: 'text',
          text: `Unknown component: ${args.component}`,
        },
      ],
      isError: true,
    };
  }
  
  const { generateValidCombinations } = await import('intent-core');
  const combinations = generateValidCombinations(schema);
  
  const formatted = combinations.slice(0, 10).map((combo: Record<string, string>) => 
    `<${args.component} ${Object.entries(combo).map(([k, v]) => `${k}="${v}"`).join(' ')} />`
  );
  
  const more = combinations.length > 10 ? `\n... and ${combinations.length - 10} more combinations` : '';
  
  return {
    content: [
      {
        type: 'text',
        text: `Valid prop combinations for ${args.component}:\n\n${formatted.join('\n')}${more}`,
      },
    ],
  };
}

function handleGetDesignTokens(
  config: DesignSystemConfig,
  args: { category?: string }
) {
  const tokens = config.tokens;
  
  if (args.category) {
    const category = tokens[args.category as keyof typeof tokens];
    if (!category) {
      return {
        content: [
          {
            type: 'text',
            text: `Unknown token category: ${args.category}. Available: ${Object.keys(tokens).join(', ')}`,
          },
        ],
        isError: true,
      };
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `${args.category} tokens:\n${Object.entries(category).map(([k, v]) => `- ${k}: ${v}`).join('\n')}`,
        },
      ],
    };
  }
  
  // Return all tokens
  const formatted: Record<string, string[]> = {};
  for (const [category, values] of Object.entries(tokens)) {
    if (values) {
      formatted[category] = Object.keys(values);
    }
  }
  
  return {
    content: [
      {
        type: 'text',
        text: `Available design tokens:\n\n${JSON.stringify(formatted, null, 2)}`,
      },
    ],
  };
}

async function handleGenerateAIPrompt(
  config: DesignSystemConfig,
  args: { component?: string }
) {
  const manifest = generateAIManifest(config);
  const { generateAIPrompt } = await import('intent-core');
  
  const prompt = generateAIPrompt(manifest, {
    component: args.component,
  });
  
  return {
    content: [
      {
        type: 'text',
        text: prompt,
      },
    ],
  };
}
