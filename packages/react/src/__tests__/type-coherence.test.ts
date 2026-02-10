import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Type Coherence Tests
 * 
 * These tests verify that React component types match the canonical schema exactly.
 * Uses runtime string extraction to catch both missing AND extra values.
 */

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Extract union string literals from a TypeScript interface property.
 * Reads types.ts and parses the union values for a given interface + property.
 */
function extractUnionValues(interfaceName: string, propName: string): string[] {
  // From dist/__tests__, go up two levels to find src/types.ts
  let typesPath = path.resolve(__dirname, '../../src/types.ts');
  if (!fs.existsSync(typesPath)) {
    // Fallback: try from src/__tests__ location
    typesPath = path.resolve(__dirname, '../types.ts');
  }
  const content = fs.readFileSync(typesPath, 'utf-8');
  
  // Find the interface block
  const interfaceRegex = new RegExp(
    `interface\\s+${interfaceName}[^{]*\\{([^}]+)\\}`, 's'
  );
  const interfaceMatch = content.match(interfaceRegex);
  if (!interfaceMatch) throw new Error(`Interface ${interfaceName} not found`);
  
  // Find the property line (handle optional with ?)
  const propRegex = new RegExp(
    `${propName}\\??:\\s*([^;]+);`
  );
  const propMatch = interfaceMatch[1].match(propRegex);
  if (!propMatch) throw new Error(`Property ${propName} not found in ${interfaceName}`);
  
  // Extract quoted values from union
  const values: string[] = [];
  const valueRegex = /'([^']+)'/g;
  let match;
  while ((match = valueRegex.exec(propMatch[1])) !== null) {
    values.push(match[1]);
  }
  return values;
}

// Canonical schema definitions (must match dashboard intent.config.ts exactly)
const CANONICAL_SCHEMA = {
  Button: {
    importance: ['primary', 'secondary', 'ghost', 'danger'],
    size: ['sm', 'md', 'lg'],
  },
  Stack: {
    direction: ['row', 'column'],
    gap: ['none', 'tight', 'compact', 'normal', 'relaxed', 'loose'],
    align: ['start', 'center', 'end', 'stretch'],
    justify: ['start', 'center', 'end', 'between', 'around'],
  },
  Surface: {
    elevation: ['none', 'low', 'medium', 'high'],
    padding: ['none', 'tight', 'compact', 'normal', 'relaxed', 'loose'],
    background: ['default', 'subtle', 'elevated', 'inverse'],
    radius: ['none', 'sm', 'md', 'lg'],
  },
  Text: {
    size: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    weight: ['normal', 'medium', 'semibold', 'bold'],
    color: ['default', 'subtle', 'muted', 'inverse', 'brand'],
    align: ['left', 'center', 'right'],
  },
  Badge: {
    importance: ['default', 'primary', 'success', 'warning', 'error'],
    size: ['sm', 'md'],
  },
};

describe('Button Props', () => {
  it('importance values should match schema exactly', () => {
    const reactValues = extractUnionValues('ButtonProps', 'importance');
    const schemaValues = [...CANONICAL_SCHEMA.Button.importance];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('size values should match schema exactly', () => {
    const reactValues = extractUnionValues('ButtonProps', 'size');
    const schemaValues = [...CANONICAL_SCHEMA.Button.size];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });
});

describe('Stack Props', () => {
  it('direction values should match schema exactly', () => {
    const reactValues = extractUnionValues('StackProps', 'direction');
    const schemaValues = [...CANONICAL_SCHEMA.Stack.direction];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('gap values should match schema exactly', () => {
    const reactValues = extractUnionValues('StackProps', 'gap');
    const schemaValues = [...CANONICAL_SCHEMA.Stack.gap];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('align values should match schema exactly', () => {
    const reactValues = extractUnionValues('StackProps', 'align');
    const schemaValues = [...CANONICAL_SCHEMA.Stack.align];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('justify values should match schema exactly', () => {
    const reactValues = extractUnionValues('StackProps', 'justify');
    const schemaValues = [...CANONICAL_SCHEMA.Stack.justify];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });
});

describe('Surface Props', () => {
  it('elevation values should match schema exactly', () => {
    const reactValues = extractUnionValues('SurfaceProps', 'elevation');
    const schemaValues = [...CANONICAL_SCHEMA.Surface.elevation];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('padding values should match schema exactly', () => {
    const reactValues = extractUnionValues('SurfaceProps', 'padding');
    const schemaValues = [...CANONICAL_SCHEMA.Surface.padding];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('background values should match schema exactly', () => {
    const reactValues = extractUnionValues('SurfaceProps', 'background');
    const schemaValues = [...CANONICAL_SCHEMA.Surface.background];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('radius values should match schema exactly', () => {
    const reactValues = extractUnionValues('SurfaceProps', 'radius');
    const schemaValues = [...CANONICAL_SCHEMA.Surface.radius];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });
});

describe('Text Props', () => {
  it('size values should match schema exactly', () => {
    const reactValues = extractUnionValues('TextProps', 'size');
    const schemaValues = [...CANONICAL_SCHEMA.Text.size];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('weight values should match schema exactly', () => {
    const reactValues = extractUnionValues('TextProps', 'weight');
    const schemaValues = [...CANONICAL_SCHEMA.Text.weight];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('color values should match schema exactly', () => {
    const reactValues = extractUnionValues('TextProps', 'color');
    const schemaValues = [...CANONICAL_SCHEMA.Text.color];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('align values should match schema exactly', () => {
    const reactValues = extractUnionValues('TextProps', 'align');
    const schemaValues = [...CANONICAL_SCHEMA.Text.align];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });
});

describe('Badge Props', () => {
  it('importance values should match schema exactly', () => {
    const reactValues = extractUnionValues('BadgeProps', 'importance');
    const schemaValues = [...CANONICAL_SCHEMA.Badge.importance];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });

  it('size values should match schema exactly', () => {
    const reactValues = extractUnionValues('BadgeProps', 'size');
    const schemaValues = [...CANONICAL_SCHEMA.Badge.size];
    
    expect(reactValues.sort()).toEqual(schemaValues.sort());
  });
});
