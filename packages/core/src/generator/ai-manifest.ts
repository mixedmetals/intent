/**
 * AI Manifest Generator
 * 
 * Generates AI-friendly metadata for LLM consumption.
 */

import type { 
  DesignSystemConfig, 
  ComponentSchema, 
  AIManifest, 
  ComponentSchemaForAI 
} from '../types/index.js';
import { generateValidCombinations } from '../validator/constraints.js';

// ============================================================================
// Component Description Generator
// ============================================================================

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  Button: 'An interactive element that triggers an action when clicked or pressed.',
  Stack: 'A layout component that distributes children along a vertical or horizontal axis with consistent spacing.',
  Surface: 'A container that provides visual elevation and background treatment.',
  Text: 'A typography component for displaying text with consistent styling.',
  Input: 'A form control for accepting user text input.',
  Card: 'A container for grouping related content and actions.',
  Dialog: 'A modal window that interrupts the user flow to display important content.',
  Avatar: 'A visual representation of a user or entity, typically as an image or initials.',
  Badge: 'A small label for displaying status, count, or category.',
  Divider: 'A visual separator between content sections.',
  Icon: 'A symbolic visual element representing an action, object, or concept.',
  List: 'A vertical grouping of related items.',
  Grid: 'A two-dimensional layout system for arranging content in rows and columns.',
};

const PROPERTY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  Button: {
    importance: 'Visual prominence level indicating the action significance',
    size: 'Physical dimensions of the button',
    state: 'Interactive state affecting appearance and behavior',
  },
  Stack: {
    direction: 'Axis along which children are arranged',
    gap: 'Space between child elements',
    align: 'Cross-axis alignment of children',
    justify: 'Main-axis distribution of children',
  },
  Surface: {
    elevation: 'Visual depth indicating hierarchy level',
    padding: 'Internal spacing from content to edges',
    background: 'Background color treatment',
  },
  Text: {
    size: 'Typography scale level',
    weight: 'Font thickness',
    color: 'Text color variant',
    align: 'Horizontal text alignment',
  },
};

const VALUE_DESCRIPTIONS: Record<string, Record<string, Record<string, string>>> = {
  Button: {
    importance: {
      primary: 'The main call-to-action, highest prominence',
      secondary: 'Alternative action, medium prominence',
      ghost: 'Low emphasis, blends with background',
      danger: 'Destructive action requiring caution',
    },
    size: {
      sm: 'Compact size for dense UIs',
      md: 'Standard size for most use cases',
      lg: 'Large size for emphasis or touch targets',
    },
  },
  Stack: {
    direction: {
      row: 'Horizontal layout, left to right',
      column: 'Vertical layout, top to bottom',
    },
    gap: {
      tight: 'Minimal spacing, 4px',
      normal: 'Standard spacing, 8px',
      relaxed: 'Comfortable spacing, 16px',
      loose: 'Generous spacing, 32px',
    },
    align: {
      start: 'Align to start of cross axis',
      center: 'Center along cross axis',
      end: 'Align to end of cross axis',
      stretch: 'Fill available cross-axis space',
    },
  },
};

// ============================================================================
// Manifest Generation
// ============================================================================

export function generateAIManifest(config: DesignSystemConfig): AIManifest {
  return {
    version: config.version || '0.1.0',
    designSystem: config.name,
    tokens: config.tokens,
    components: Object.entries(config.components).map(([name, schema]) => 
      generateComponentForAI(name, schema)
    ),
    semanticDescriptions: generateSemanticDescriptions(config),
  };
}

function generateComponentForAI(name: string, schema: ComponentSchema): ComponentSchemaForAI {
  const descriptions = PROPERTY_DESCRIPTIONS[name] || {};
  const valueDescriptions = VALUE_DESCRIPTIONS[name] || {};
  
  return {
    name,
    description: schema.description || COMPONENT_DESCRIPTIONS[name] || `${name} component`,
    properties: Object.entries(schema.properties).map(([propName, prop]) => ({
      name: propName,
      type: prop.type,
      values: prop.type === 'enum' ? prop.values : undefined,
      required: prop.required || false,
      default: prop.default,
      description: descriptions[propName],
      valueDescriptions: valueDescriptions[propName],
    })),
    constraints: schema.constraints.map(c => {
      const when = Object.entries(c.when).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ');
      if (c.forbid) {
        return `When ${when}: cannot use ${c.forbid.join(', ')}`;
      }
      if (c.require) {
        const reqs = Object.entries(c.require).map(([k, v]) => `${k} in [${(v as string[]).join(', ')}]`).join(', ');
        return `When ${when}: requires ${reqs}`;
      }
      return `When ${when}: constraint applies`;
    }),
    examples: generateExamples(name, schema),
  };
}

function generateExamples(name: string, schema: ComponentSchema): { valid: string[]; invalid: string[] } {
  const valid: string[] = [];
  const invalid: string[] = [];
  
  // Generate valid examples from actual valid combinations
  const combinations = generateValidCombinations(schema).slice(0, 3);
  
  for (const combo of combinations) {
    const props = Object.entries(combo)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    valid.push(`<${name} ${props}>Content</${name}>`);
  }
  
  // Add size-responsive example if applicable
  const hasSize = 'size' in schema.properties;
  if (hasSize && combinations.length > 0) {
    const base = combinations[0];
    const props = Object.entries(base)
      .map(([k, v]) => k === 'size' ? `${k}="lg"` : `${k}="${v}"`)
      .join(' ');
    valid.push(`<${name} ${props}>Larger variant</${name}>`);
  }
  
  // Generate invalid examples from constraints
  for (const constraint of schema.constraints.slice(0, 2)) {
    const whenProps = Object.entries(constraint.when);
    const baseProps = whenProps.map(([k, v]) => `${k}="${Array.isArray(v) ? v[0] : v}"`);
    
    if (constraint.forbid && constraint.forbid.length > 0) {
      const forbiddenProp = constraint.forbid[0];
      // Try to find a value for the forbidden prop
      const propDef = schema.properties[forbiddenProp];
      if (propDef?.type === 'enum') {
        const forbiddenValue = propDef.values[0];
        invalid.push(`<${name} ${baseProps.join(' ')} ${forbiddenProp}="${forbiddenValue}">Invalid</${name}>  <!-- Error: ${constraint.message || 'Constraint violation'} -->`);
      }
    }
  }
  
  // Add generic anti-patterns
  invalid.push(`<${name} className="flex items-center">Bad</${name}>  <!-- Error: Use Intent props, not Tailwind utilities -->`);
  
  return { valid, invalid };
}

function generateSemanticDescriptions(config: DesignSystemConfig): Record<string, string> {
  const descriptions: Record<string, string> = {};
  
  // Token descriptions
  for (const [category, tokens] of Object.entries(config.tokens)) {
    if (!tokens) continue;
    
    for (const [name, value] of Object.entries(tokens)) {
      descriptions[`token:${category}:${name}`] = `${category} token with value ${value}`;
    }
  }
  
  // Component descriptions
  for (const [name, schema] of Object.entries(config.components)) {
    descriptions[`component:${name}`] = schema.description || COMPONENT_DESCRIPTIONS[name] || `${name} component`;
    
    // Property descriptions
    for (const [propName, prop] of Object.entries(schema.properties)) {
      const desc = PROPERTY_DESCRIPTIONS[name]?.[propName] || `${propName} property`;
      descriptions[`prop:${name}:${propName}`] = desc;
      
      // Value descriptions
      if (prop.type === 'enum') {
        for (const value of prop.values) {
          const valueDesc = VALUE_DESCRIPTIONS[name]?.[propName]?.[value] || `${value} option`;
          descriptions[`value:${name}:${propName}:${value}`] = valueDesc;
        }
      }
    }
  }
  
  return descriptions;
}

// ============================================================================
// Context-Aware Prompts
// ============================================================================

export interface PromptContext {
  component?: string;
  task?: string;
  existingCode?: string;
}

export function generateAIPrompt(manifest: AIManifest, context?: PromptContext): string {
  const lines: string[] = [];
  
  lines.push('# Intent Framework Rules');
  lines.push('');
  lines.push('You are coding with Intent, a schema-first styling system.');
  lines.push('');
  lines.push('## Critical Constraints');
  lines.push('');
  lines.push('1. **NEVER use arbitrary values** (e.g., `pt-[7px]`). Use only schema tokens.');
  lines.push('2. **NEVER use Tailwind utility classes directly**. Use Intent components: `<Stack>`, `<Button>`, `<Surface>`');
  lines.push('3. **Check valid prop combinations** in the schema before using');
  lines.push('4. **Prefer semantic props** over visual descriptions: `importance="primary"` not `color="blue"`');
  lines.push('');
  
  if (context?.component) {
    const component = manifest.components.find(c => c.name === context.component);
    if (component) {
      lines.push(`## Component: ${component.name}`);
      lines.push('');
      lines.push(component.description);
      lines.push('');
      
      lines.push('### Properties');
      lines.push('');
      for (const prop of component.properties) {
        const required = prop.required ? ' (required)' : '';
        const def = prop.default !== undefined ? ` [default: ${prop.default}]` : '';
        const values = prop.values ? ` = ${prop.values.join(' | ')}` : '';
        lines.push(`- **${prop.name}**${required}${def}${values}`);
        if (prop.description) {
          lines.push(`  - ${prop.description}`);
        }
      }
      lines.push('');
      
      if (component.constraints.length > 0) {
        lines.push('### Constraints');
        lines.push('');
        for (const constraint of component.constraints) {
          lines.push(`- ${constraint}`);
        }
        lines.push('');
      }
      
      lines.push('### Examples');
      lines.push('');
      lines.push('**Valid:**');
      for (const example of component.examples.valid) {
        lines.push('```tsx');
        lines.push(example);
        lines.push('```');
      }
      lines.push('');
      
      if (component.examples.invalid.length > 0) {
        lines.push('**Invalid:**');
        for (const example of component.examples.invalid) {
          lines.push('```tsx');
          lines.push(example);
          lines.push('```');
        }
        lines.push('');
      }
    }
  } else {
    // Full system overview
    lines.push('## Available Components');
    lines.push('');
    for (const component of manifest.components) {
      lines.push(`- **${component.name}**: ${component.description}`);
    }
    lines.push('');
    
    lines.push('## Design Tokens');
    lines.push('');
    for (const [category, tokens] of Object.entries(manifest.tokens)) {
      if (!tokens) continue;
      lines.push(`### ${category}`);
      lines.push(Object.keys(tokens).map(t => `- ${t}`).join('\n'));
      lines.push('');
    }
  }
  
  lines.push('## When Generating UI');
  lines.push('');
  lines.push('1. Import components from \'intent-react\'');
  lines.push('2. Check the schema for valid enum values');
  lines.push('3. If design calls for custom styling, ask to add token to schema first');
  lines.push('4. Run `intent validate` before finishing');
  lines.push('');
  
  return lines.join('\n');
}
