/**
 * TypeScript Type Generator
 * 
 * Generates strict TypeScript types from component schemas.
 */

import type { DesignSystemConfig, ComponentSchema, PropertyDefinition } from '../types/index.js';
import { generateValidCombinations } from '../validator/constraints.js';

// ============================================================================
// Type Generation Helpers
// ============================================================================

function propertyToTypeScript(propName: string, prop: PropertyDefinition): string {
  const type = getTypeString(prop);
  const optional = isOptional(prop) ? '?' : '';
  return `  ${propName}${optional}: ${type};`;
}

function getTypeString(prop: PropertyDefinition): string {
  switch (prop.type) {
    case 'enum':
      return prop.values.map(v => `'${v}'`).join(' | ');
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    default:
      return 'unknown';
  }
}

function isOptional(prop: PropertyDefinition): boolean {
  return !prop.required;
}

function generateJSDoc(schema: ComponentSchema): string {
  const lines: string[] = ['/**'];
  
  if (schema.description) {
    lines.push(` * ${schema.description}`);
    lines.push(' *');
  }
  
  // Add prop documentation
  for (const [name, prop] of Object.entries(schema.properties)) {
    const type = getTypeString(prop);
    const def = 'default' in prop ? ` (default: ${JSON.stringify(prop.default)})` : '';
    lines.push(` * @property {${type}} ${name}${def}`);
  }
  
  // Add constraint documentation
  if (schema.constraints.length > 0) {
    lines.push(' *');
    lines.push(' * Constraints:');
    for (const constraint of schema.constraints) {
      const when = Object.entries(constraint.when)
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join(', ');
      
      if (constraint.forbid) {
        lines.push(` * - When ${when}: cannot use ${constraint.forbid.join(', ')}`);
      }
      if (constraint.require) {
        const reqs = Object.entries(constraint.require)
          .map(([k, v]) => `${k} in [${(v as string[]).join(', ')}]`)
          .join(', ');
        lines.push(` * - When ${when}: requires ${reqs}`);
      }
    }
  }
  
  lines.push(' */');
  return lines.join('\n');
}

// ============================================================================
// Component Type Generation
// ============================================================================

export function generateComponentTypes(schema: ComponentSchema): string {
  const lines: string[] = [];
  const componentName = schema.name;
  const propsName = `${componentName}Props`;
  
  // JSDoc
  lines.push(generateJSDoc(schema));
  
  // Props interface
  lines.push(`export interface ${propsName} {`);
  
  for (const [propName, prop] of Object.entries(schema.properties)) {
    lines.push(propertyToTypeScript(propName, prop));
  }
  
  // Add HTML props extension point
  lines.push(`  // HTML attributes are filtered - only Intent props allowed`);
  lines.push(`  [key: string]: unknown;`);
  lines.push('}');
  lines.push('');
  
  // Valid combinations type (for advanced use)
  const combinations = generateValidCombinations(schema);
  if (combinations.length > 0 && combinations.length <= 20) {
    lines.push(`/** Valid prop combinations for ${componentName} */`);
    lines.push(`export type ${componentName}ValidCombinations =`);
    
    const comboStrings = combinations.map(combo => {
      const props = Object.entries(combo)
        .map(([k, v]) => `${k}: '${v}'`)
        .join('; ');
      return `  | { ${props} }`;
    });
    
    lines.push(comboStrings.join('\n'));
    lines.push(';');
    lines.push('');
  }
  
  return lines.join('\n');
}

// ============================================================================
// Token Type Generation
// ============================================================================

export function generateTokenTypes(tokens: DesignSystemConfig['tokens']): string {
  const lines: string[] = [];
  
  lines.push('/** Design Tokens */');
  lines.push('');
  
  for (const [category, values] of Object.entries(tokens)) {
    if (!values || Object.keys(values).length === 0) continue;
    
    const typeName = `${capitalize(category)}Token`;
    const keys = Object.keys(values);
    
    lines.push(`/** Valid ${category} tokens */`);
    lines.push(`export type ${typeName} =`);
    keys.forEach((key, i) => {
      const sep = i < keys.length - 1 ? ' |' : ';';
      lines.push(`  | '${key}'${sep}`);
    });
    lines.push('');
  }
  
  // Token registry type
  lines.push('/** Complete token registry */');
  lines.push('export interface TokenRegistry {');
  for (const category of Object.keys(tokens)) {
    if (tokens[category as keyof typeof tokens]) {
      lines.push(`  ${category}: ${capitalize(category)}Token;`);
    }
  }
  lines.push('}');
  lines.push('');
  
  return lines.join('\n');
}

// ============================================================================
// Full System Type Generation
// ============================================================================

export function generateSystemTypes(config: DesignSystemConfig): string {
  const lines: string[] = [];
  
  // Header
  lines.push(`// Generated by Intent v${config.version || '0.1.0'}`);
  lines.push(`// Design System: ${config.name}`);
  lines.push('');
  lines.push('/* eslint-disable */');
  lines.push('// @ts-nocheck');
  lines.push('');
  
  // Token types
  lines.push('// ============================================================================');
  lines.push('// TOKENS');
  lines.push('// ============================================================================');
  lines.push('');
  lines.push(generateTokenTypes(config.tokens));
  
  // Component types
  lines.push('// ============================================================================');
  lines.push('// COMPONENTS');
  lines.push('// ============================================================================');
  lines.push('');
  
  const componentImports: string[] = [];
  const componentExports: string[] = [];
  
  for (const [name, schema] of Object.entries(config.components)) {
    lines.push(generateComponentTypes(schema));
    componentImports.push(`${name}Props`);
    componentExports.push(name);
  }
  
  // Component registry
  lines.push('// ============================================================================');
  lines.push('// COMPONENT REGISTRY');
  lines.push('// ============================================================================');
  lines.push('');
  lines.push('/** All available Intent components */');
  lines.push(`export type IntentComponent =`);
  componentExports.forEach((name, i) => {
    const sep = i < componentExports.length - 1 ? ' |' : ';';
    lines.push(`  | '${name}'${sep}`);
  });
  lines.push('');
  
  lines.push('/** Props for each component */');
  lines.push('export interface IntentProps {');
  for (const name of componentExports) {
    lines.push(`  ${name}: ${name}Props;`);
  }
  lines.push('}');
  lines.push('');
  
  // Re-exports
  lines.push('// ============================================================================');
  lines.push('// RE-EXPORTS');
  lines.push('// ============================================================================');
  lines.push('');
  lines.push(`export type { ${componentImports.join(', ')} };`);
  lines.push('');
  
  return lines.join('\n');
}

// ============================================================================
// Runtime Validation Types
// ============================================================================

export function generateRuntimeTypes(config: DesignSystemConfig): string {
  const lines: string[] = [];
  
  lines.push('/** Runtime schema definitions for validation */');
  lines.push('');
  lines.push('export const INTENT_SCHEMA = {');
  lines.push(`  name: '${config.name}',`);
  lines.push(`  version: '${config.version || '0.1.0'}',`);
  lines.push('  tokens: ' + JSON.stringify(config.tokens, null, 2).replace(/\n/g, '\n  ') + ',');
  lines.push('  components: {');
  
  for (const [name, schema] of Object.entries(config.components)) {
    lines.push(`    ${name}: {`);
    lines.push(`      name: '${schema.name}',`);
    lines.push(`      description: '${schema.description || ''}',`);
    lines.push('      properties: {');
    
    for (const [propName, prop] of Object.entries(schema.properties)) {
      lines.push(`        ${propName}: ${JSON.stringify(prop)},`);
    }
    
    lines.push('      },');
    lines.push(`      constraints: ${JSON.stringify(schema.constraints)},`);
    lines.push('    },');
  }
  
  lines.push('  },');
  lines.push('} as const;');
  lines.push('');
  lines.push('export type IntentSchema = typeof INTENT_SCHEMA;');
  lines.push('');
  
  return lines.join('\n');
}

// ============================================================================
// Utility
// ============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
