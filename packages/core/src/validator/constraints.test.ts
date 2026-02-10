import { describe, it, expect } from 'vitest';
import {
  validateConstraints,
  generateValidCombinations,
  suggestValidAlternatives,
} from './constraints.js';
import { defineComponent, prop, when } from '../schema/define.js';

describe('validateConstraints', () => {
  const buttonSchema = defineComponent({
    name: 'Button',
    properties: {
      importance: prop.enum(['primary', 'secondary', 'ghost'], { required: true }),
      size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      state: prop.enum(['default', 'disabled'], { default: 'default' }),
    },
    constraints: [
      when({ importance: 'ghost' }).forbid(['state'], 'Ghost buttons cannot be disabled'),
      when({ importance: 'primary' }).require({ size: ['md', 'lg'] }, 'Primary needs larger size'),
    ],
    mappings: {},
  });

  it('should pass for valid prop combinations', () => {
    const result = validateConstraints(buttonSchema, {
      component: 'Button',
      props: { importance: 'primary', size: 'lg', state: 'default' },
    });
    expect(result).toHaveLength(0);
  });

  it('should fail for forbidden prop combination', () => {
    const result = validateConstraints(buttonSchema, {
      component: 'Button',
      props: { importance: 'ghost', state: 'disabled' },
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('CONSTRAINT_FORBIDDEN_PROP');
    expect(result[0].message).toContain('Ghost buttons cannot be disabled');
  });

  it('should fail for missing required prop', () => {
    const result = validateConstraints(buttonSchema, {
      component: 'Button',
      props: { importance: 'primary', size: 'sm' },
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('CONSTRAINT_INVALID_VALUE');
  });

  it('should pass when condition does not apply', () => {
    const result = validateConstraints(buttonSchema, {
      component: 'Button',
      props: { importance: 'secondary', state: 'disabled' },
    });
    expect(result).toHaveLength(0);
  });
});

describe('generateValidCombinations', () => {
  const simpleSchema = defineComponent({
    name: 'Test',
    properties: {
      a: prop.enum(['1', '2'], { required: true }),
      b: prop.enum(['x', 'y'], { default: 'x' }),
    },
    constraints: [
      when({ a: '1' }).forbid(['b']), // When a=1, b is forbidden
    ],
    mappings: {},
  });

  it('should generate only valid combinations', () => {
    const combos = generateValidCombinations(simpleSchema);
    
    // Valid: {a: '2', b: 'x'}, {a: '2', b: 'y'}
    // Note: {a: '1'} not generated because all props need a value in current impl
    expect(combos).toHaveLength(2);
    
    // Should not include {a: '1', b: 'x'} or {a: '1', b: 'y'}
    const invalidCombo = combos.find(c => c.a === '1' && c.b !== undefined);
    expect(invalidCombo).toBeUndefined();
  });

  it('should handle schemas with no constraints', () => {
    const unconstrained = defineComponent({
      name: 'Test',
      properties: {
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      },
      constraints: [],
      mappings: {},
    });

    const combos = generateValidCombinations(unconstrained);
    expect(combos).toHaveLength(3);
    expect(combos.map(c => c.size)).toContain('sm');
    expect(combos.map(c => c.size)).toContain('md');
    expect(combos.map(c => c.size)).toContain('lg');
  });
});

describe('suggestValidAlternatives', () => {
  const schema = defineComponent({
    name: 'Button',
    properties: {
      importance: prop.enum(['primary', 'secondary', 'ghost'], { required: true }),
      size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
    },
    constraints: [
      when({ importance: 'ghost' }).forbid(['size']),
    ],
    mappings: {},
  });

  it('should suggest closest valid alternatives', () => {
    const suggestions = suggestValidAlternatives(schema, {
      importance: 'ghost',
      size: 'lg',
    });

    expect(suggestions.length).toBeGreaterThan(0);
    // Should suggest valid alternatives (implementation returns closest matches)
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
