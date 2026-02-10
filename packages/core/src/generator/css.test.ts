import { describe, it, expect } from 'vitest';
import {
  generateCSSVariables,
  compileComponent,
  compileSystem,
} from './css.js';
import { defineSystem, defineComponent, prop } from '../schema/define.js';

describe('generateCSSVariables', () => {
  it('should generate CSS variables for tokens', () => {
    const tokens = {
      color: {
        primary: '#000',
        secondary: '#fff',
      },
      space: {
        sm: '4px',
        md: '8px',
      },
    };

    const css = generateCSSVariables(tokens, 'intent');
    
    expect(css).toContain('--intent-color-primary: #000');
    expect(css).toContain('--intent-color-secondary: #fff');
    expect(css).toContain('--intent-space-sm: 4px');
    expect(css).toContain('--intent-space-md: 8px');
  });

  it('should handle empty tokens', () => {
    const css = generateCSSVariables({});
    expect(css).toBe(':root {\n}');
  });
});

describe('compileComponent', () => {
  const config = defineSystem({
    name: 'Test',
    tokens: {
      color: {
        primary: '#3B82F6',
        white: '#FFFFFF',
        secondary: '#64748B',
      },
      space: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
    components: {},
  });

  it('should generate base styles', () => {
    const buttonSchema = defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary'], { required: true }),
      },
      constraints: [],
      mappings: {},
      baseStyles: {
        display: 'inline-flex',
        borderRadius: '4px',
      },
    });

    const result = compileComponent(buttonSchema, config);
    expect(result.css).toContain('.intent-button');
    expect(result.css).toContain('display: inline-flex');
    expect(result.css).toContain('border-radius: 4px');
  });

  it('should generate per-prop selectors, not compound selectors', () => {
    const buttonSchema = defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      },
      constraints: [],
      mappings: {
        'importance=primary': {
          background: 'primary',
          color: 'white',
        },
        'importance=secondary': {
          background: 'transparent',
          border: '1px solid secondary',
        },
        'size=sm': {
          padding: 'sm',
        },
        'size=md': {
          padding: 'md',
        },
        'size=lg': {
          padding: 'lg',
        },
      },
    });

    const result = compileComponent(buttonSchema, config);
    
    // Should have N+M rules (2 importance + 3 size = 5) not N*M (6)
    const rules = result.css.split('}\n\n').filter(r => r.trim());
    expect(rules).toHaveLength(5); // 5 rules, not 6
    
    // Should have simple attribute selectors, not compound
    expect(result.css).toContain('.intent-button[data-importance="primary"]');
    expect(result.css).toContain('.intent-button[data-importance="secondary"]');
    expect(result.css).toContain('.intent-button[data-size="sm"]');
    expect(result.css).toContain('.intent-button[data-size="md"]');
    expect(result.css).toContain('.intent-button[data-size="lg"]');
    
    // Should NOT have compound selectors like [data-importance][data-size]
    expect(result.css).not.toMatch(/data-importance[^}]+data-size/);
  });

  it('should generate CSS with token variables', () => {
    const buttonSchema = defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary'], { required: true }),
      },
      constraints: [],
      mappings: {
        'importance=primary': {
          background: 'primary',
          color: 'white',
        },
      },
    });

    const result = compileComponent(buttonSchema, config);
    expect(result.css).toContain('var(--intent-color-primary)');
    expect(result.css).toContain('var(--intent-color-white)');
  });

  it('should include all generated classes', () => {
    const buttonSchema = defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary'], { required: true }),
      },
      constraints: [],
      mappings: {
        'importance=primary': { background: 'primary' },
        'importance=secondary': { background: 'secondary' },
      },
    });

    const result = compileComponent(buttonSchema, config);
    expect(result.classes).toContain('intent-button[data-importance="primary"]');
    expect(result.classes).toContain('intent-button[data-importance="secondary"]');
    expect(result.classes.length).toBe(2);
  });

  it('should produce N+M rules not N*M for components with multiple props', () => {
    // Component with 3 importance × 3 size × 2 state = 18 theoretical combinations
    // Should produce 3 + 3 + 2 = 8 rules
    const complexSchema = defineComponent({
      name: 'Complex',
      properties: {
        importance: prop.enum(['primary', 'secondary', 'ghost'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
        state: prop.enum(['default', 'disabled'], { default: 'default' }),
      },
      constraints: [],
      mappings: {
        'importance=primary': { background: 'primary' },
        'importance=secondary': { background: 'secondary' },
        'importance=ghost': { background: 'transparent' },
        'size=sm': { padding: 'sm' },
        'size=md': { padding: 'md' },
        'size=lg': { padding: 'lg' },
        'state=default': { opacity: '1' },
        'state=disabled': { opacity: '0.5' },
      },
    });

    const result = compileComponent(complexSchema, config);
    const rules = result.css.split('}\n\n').filter(r => r.trim());
    
    // Should be 8 rules (3 + 3 + 2), not 18
    expect(rules).toHaveLength(8);
  });
});

describe('compileSystem', () => {
  const config = defineSystem({
    name: 'TestSystem',
    tokens: {
      color: {
        brand: '#3B82F6',
      },
    },
    components: {
      Button: defineComponent({
        name: 'Button',
        properties: {
          importance: prop.enum(['primary'], { required: true }),
        },
        constraints: [],
        mappings: {
          'importance=primary': { background: 'brand' },
        },
      }),
    },
  });

  it('should compile full system', () => {
    const css = compileSystem(config);
    
    expect(css).toContain('/* Intent Design System: TestSystem');
    expect(css).toContain('--intent-color-brand: #3B82F6');
    expect(css).toContain('.intent-button');
  });

  it('should minify when requested', () => {
    const css = compileSystem(config, { minify: true });
    
    // Minified CSS should not have newlines between rules
    expect(css).not.toContain('\n\n');
    // Should not have comments
    expect(css).not.toContain('/*');
  });
});

describe('resolveValue edge cases', () => {
  it('should resolve category-prefixed tokens', async () => {
    // Create a component with radius-md in baseStyles
    const schema = defineComponent({
      name: 'Test',
      properties: { size: prop.enum(['md'], { default: 'md' }) },
      constraints: [],
      mappings: {},
      baseStyles: { borderRadius: 'radius-md' },
    });
    const config = defineSystem({
      name: 'Test',
      tokens: { radius: { md: '8px' } },
      components: {},
    });
    const result = await compileComponent(schema, config);
    expect(result.css).toContain('var(--intent-radius-md)');
    expect(result.css).not.toContain('border-radius: radius-md;'); // Should not be literal
  });

  it('should resolve tokens in compound values', async () => {
    const schema = defineComponent({
      name: 'Test',
      properties: { bg: prop.enum(['default'], { default: 'default' }) },
      constraints: [],
      mappings: {},
      baseStyles: { border: '1px solid border-default' },
    });
    const config = defineSystem({
      name: 'Test',
      tokens: { color: { 'border-default': '#E2E8F0' } },
      components: {},
    });
    const result = await compileComponent(schema, config);
    expect(result.css).toContain('1px solid var(--intent-color-border-default)');
  });

  it('should resolve multi-word shorthand tokens', async () => {
    const schema = defineComponent({
      name: 'Test',
      properties: { size: prop.enum(['sm'], { default: 'sm' }) },
      constraints: [],
      mappings: { 'size=sm': { padding: 'tight compact' } },
    });
    const config = defineSystem({
      name: 'Test',
      tokens: { space: { tight: '4px', compact: '8px' } },
      components: {},
    });
    const result = await compileComponent(schema, config);
    expect(result.css).toContain('var(--intent-space-tight) var(--intent-space-compact)');
  });

  it('should not resolve literal CSS values', async () => {
    const schema = defineComponent({
      name: 'Test',
      properties: { imp: prop.enum(['primary'], { default: 'primary' }) },
      constraints: [],
      mappings: { 'imp=primary': { border: 'none', background: 'transparent' } },
    });
    const config = defineSystem({
      name: 'Test',
      tokens: { space: { none: '0' } },
      components: {},
    });
    const result = await compileComponent(schema, config);
    expect(result.css).toContain('border: none');
    expect(result.css).toContain('background: transparent');
    expect(result.css).not.toContain('var(--intent-space-none)');
  });

  it('should resolve elevation tokens with category prefix', async () => {
    const schema = defineComponent({
      name: 'Test',
      properties: { elev: prop.enum(['low'], { default: 'low' }) },
      constraints: [],
      mappings: { 'elev=low': { boxShadow: 'elevation-low' } },
    });
    const config = defineSystem({
      name: 'Test',
      tokens: { elevation: { low: '0 1px 3px rgba(0,0,0,0.1)' } },
      components: {},
    });
    const result = await compileComponent(schema, config);
    expect(result.css).toContain('var(--intent-elevation-low)');
    expect(result.css).not.toContain('box-shadow: elevation-low;');
  });
});
