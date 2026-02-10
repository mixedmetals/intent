import { describe, it, expect } from 'vitest';
import { defineSystem, defineComponent, prop, when } from './define.js';

describe('defineComponent', () => {
  it('should create a valid component schema', () => {
    const button = defineComponent({
      name: 'Button',
      properties: {
        importance: prop.enum(['primary', 'secondary'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
      },
      constraints: [],
      mappings: {},
    });

    expect(button.name).toBe('Button');
    expect(button.properties.importance.type).toBe('enum');
    expect(button.properties.size.default).toBe('md');
  });

  it('should require a name', () => {
    expect(() =>
      defineComponent({
        properties: {},
        constraints: [],
        mappings: {},
      } as any)
    ).toThrow('Component must have a name');
  });

  it('should require properties', () => {
    expect(() =>
      defineComponent({
        name: 'Button',
        constraints: [],
        mappings: {},
      } as any)
    ).toThrow('must define properties');
  });
});

describe('defineSystem', () => {
  it('should create a valid design system', () => {
    const system = defineSystem({
      name: 'TestSystem',
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

    expect(system.name).toBe('TestSystem');
    expect(system.tokens.color.primary).toBe('#000');
    expect(system.components.Button.name).toBe('Button');
  });

  it('should require a name', () => {
    expect(() =>
      defineSystem((builder: any) => builder)
    ).toThrow('Design system must have a name');
  });
});

describe('prop helpers', () => {
  it('should create enum property', () => {
    const p = prop.enum(['a', 'b'], { required: true, default: 'a' });
    expect(p.type).toBe('enum');
    expect(p.values).toEqual(['a', 'b']);
    expect(p.required).toBe(true);
    expect(p.default).toBe('a');
  });

  it('should create boolean property', () => {
    const p = prop.boolean({ default: false });
    expect(p.type).toBe('boolean');
    expect(p.default).toBe(false);
  });

  it('should create string property', () => {
    const p = prop.string({ required: true });
    expect(p.type).toBe('string');
    expect(p.required).toBe(true);
  });

  it('should create number property with range', () => {
    const p = prop.number({ min: 0, max: 100, default: 50 });
    expect(p.type).toBe('number');
    expect(p.min).toBe(0);
    expect(p.max).toBe(100);
    expect(p.default).toBe(50);
  });
});

describe('when helper', () => {
  it('should create forbid constraint', () => {
    const constraint = when({ importance: 'ghost' }).forbid(['disabled']);
    expect(constraint.when).toEqual({ importance: 'ghost' });
    expect(constraint.forbid).toEqual(['disabled']);
  });

  it('should create require constraint', () => {
    const constraint = when({ importance: 'danger' }).require({ size: ['md', 'lg'] });
    expect(constraint.when).toEqual({ importance: 'danger' });
    expect(constraint.require).toEqual({ size: ['md', 'lg'] });
  });
});
