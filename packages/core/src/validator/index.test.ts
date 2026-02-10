import { describe, it, expect } from 'vitest';
import { validateSchema, validateUsage } from './index.js';
import { defineSystem, defineComponent, prop } from '../schema/define.js';

describe('validateSchema', () => {
  it('should pass for valid schema', () => {
    const config = defineSystem({
      name: 'ValidSystem',
      tokens: {
        color: {
          primary: '#000',
        },
      },
      components: {
        Button: defineComponent({
          name: 'Button',
          properties: {
            importance: prop.enum(['primary'], { required: true }),
          },
          constraints: [],
          mappings: {},
        }),
      },
    });

    const result = validateSchema(config);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('should fail for empty enum values', () => {
    const config = defineSystem({
      name: 'BadSystem',
      tokens: {},
      components: {
        Button: defineComponent({
          name: 'Button',
          properties: {
            importance: { type: 'enum', values: [], required: true },
          },
          constraints: [],
          mappings: {},
        }),
      },
    });

    const result = validateSchema(config);
    expect(result.valid).toBe(false);
    expect(result.issues.some(i => i.code === 'EMPTY_ENUM')).toBe(true);
  });

  it('should fail for constraint referencing unknown property', () => {
    const config = defineSystem({
      name: 'BadSystem',
      tokens: {},
      components: {
        Button: defineComponent({
          name: 'Button',
          properties: {
            importance: prop.enum(['primary'], { required: true }),
          },
          constraints: [
            { when: { unknownProp: 'value' }, forbid: ['importance'] },
          ],
          mappings: {},
        }),
      },
    });

    const result = validateSchema(config);
    expect(result.valid).toBe(false);
    expect(result.issues.some(i => i.code === 'UNKNOWN_CONSTRAINT_PROPERTY')).toBe(true);
  });

  it('should warn about non-kebab-case token names', () => {
    const config = defineSystem({
      name: 'System',
      tokens: {
        color: {
          'PrimaryColor': '#000', // Not kebab-case
        },
      },
      components: {},
    });

    const result = validateSchema(config);
    expect(result.issues.some(i => i.code === 'INVALID_TOKEN_NAME')).toBe(true);
  });
});

describe('validateUsage', () => {
  const buttonSchema = defineComponent({
    name: 'Button',
    properties: {
      importance: prop.enum(['primary', 'secondary'], { required: true }),
      size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
    },
    constraints: [],
    mappings: {},
  });

  it('should pass for valid usage', () => {
    const result = validateUsage(buttonSchema, {
      component: 'Button',
      props: { importance: 'primary', size: 'lg' },
    });

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('should fail for missing required prop', () => {
    const result = validateUsage(buttonSchema, {
      component: 'Button',
      props: { size: 'lg' },
    });

    expect(result.valid).toBe(false);
    expect(result.issues[0].code).toBe('MISSING_REQUIRED_PROP');
  });

  it('should fail for invalid enum value', () => {
    const result = validateUsage(buttonSchema, {
      component: 'Button',
      props: { importance: 'invalid', size: 'lg' },
    });

    expect(result.valid).toBe(false);
    expect(result.issues[0].code).toBe('INVALID_ENUM_VALUE');
  });

  it('should fail for unknown prop', () => {
    const result = validateUsage(buttonSchema, {
      component: 'Button',
      props: { importance: 'primary', unknownProp: 'value' },
    });

    expect(result.valid).toBe(false);
    expect(result.issues[0].code).toBe('UNKNOWN_PROPERTY');
  });

  it('should apply default values', () => {
    const result = validateUsage(buttonSchema, {
      component: 'Button',
      props: { importance: 'primary' }, // size defaults to 'md'
    });

    expect(result.valid).toBe(true);
  });
});
