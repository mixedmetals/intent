import { describe, it, expect, beforeEach } from 'vitest';
import {
  registerTheme,
  getTheme,
  hasTheme,
  unregisterTheme,
  getAllThemes,
  clearThemes,
  resolveTheme,
  composeThemes,
  createTheme,
  extendTheme,
  generateThemeCSSVariables,
  getTokenVariableName,
  defaultTheme,
} from './theme.js';
import type { Theme } from './types.js';

describe('Theme Registry', () => {
  beforeEach(() => {
    clearThemes();
  });
  
  describe('registerTheme', () => {
    it('should register a theme', () => {
      const theme: Theme = {
        name: 'my-theme',
        tokens: { color: { primary: '#000' } },
      };
      
      registerTheme(theme);
      
      expect(hasTheme('my-theme')).toBe(true);
    });
  });
  
  describe('getTheme', () => {
    it('should return registered theme', () => {
      const theme: Theme = {
        name: 'my-theme',
        tokens: { color: { primary: '#000' } },
      };
      
      registerTheme(theme);
      
      expect(getTheme('my-theme')).toEqual(theme);
    });
    
    it('should return undefined for unregistered theme', () => {
      expect(getTheme('non-existent')).toBeUndefined();
    });
  });
  
  describe('unregisterTheme', () => {
    it('should unregister a theme', () => {
      const theme: Theme = {
        name: 'my-theme',
        tokens: { color: { primary: '#000' } },
      };
      
      registerTheme(theme);
      unregisterTheme('my-theme');
      
      expect(hasTheme('my-theme')).toBe(false);
    });
  });
  
  describe('getAllThemes', () => {
    it('should return all registered themes', () => {
      registerTheme({ name: 'theme-1', tokens: {} });
      registerTheme({ name: 'theme-2', tokens: {} });
      
      const themes = getAllThemes();
      
      expect(themes).toHaveLength(2);
      expect(themes.map(t => t.name)).toContain('theme-1');
      expect(themes.map(t => t.name)).toContain('theme-2');
    });
  });
});

describe('resolveTheme', () => {
  beforeEach(() => {
    clearThemes();
  });
  
  it('should resolve a simple theme', () => {
    const theme: Theme = {
      name: 'simple',
      tokens: {
        color: { primary: '#3B82F6' },
      },
    };
    
    registerTheme(theme);
    const resolved = resolveTheme('simple');
    
    expect(resolved.tokens.color?.primary).toBe('#3B82F6');
    expect(resolved.settings.cssPrefix).toBe('intent');
  });
  
  it('should resolve theme with single parent', () => {
    registerTheme({
      name: 'base',
      tokens: {
        color: { primary: '#000', secondary: '#FFF' },
      },
    });
    
    registerTheme({
      name: 'child',
      extends: 'base',
      tokens: {
        color: { primary: '#F00' },
      },
    });
    
    const resolved = resolveTheme('child');
    
    // Child overrides primary
    expect(resolved.tokens.color?.primary).toBe('#F00');
    // Secondary inherited from base
    expect(resolved.tokens.color?.secondary).toBe('#FFF');
  });
  
  it('should resolve theme with multiple parents', () => {
    registerTheme({
      name: 'base',
      tokens: { color: { a: '1', b: '2' } },
    });
    
    registerTheme({
      name: 'colors',
      tokens: { color: { c: '3' } },
    });
    
    registerTheme({
      name: 'child',
      extends: ['base', 'colors'],
      tokens: { color: { a: '10' } },
    });
    
    const resolved = resolveTheme('child');
    
    expect(resolved.tokens.color?.a).toBe('10');
    expect(resolved.tokens.color?.b).toBe('2');
    expect(resolved.tokens.color?.c).toBe('3');
  });
  
  it('should throw for circular dependency', () => {
    registerTheme({
      name: 'a',
      extends: 'b',
      tokens: {},
    });
    
    registerTheme({
      name: 'b',
      extends: 'a',
      tokens: {},
    });
    
    expect(() => resolveTheme('a')).toThrow('Circular theme dependency');
  });
  
  it('should throw for missing parent theme', () => {
    registerTheme({
      name: 'child',
      extends: 'non-existent',
      tokens: {},
    });
    
    expect(() => resolveTheme('child')).toThrow('Theme "non-existent" not found');
  });
  
  it('should merge dark tokens', () => {
    registerTheme({
      name: 'base',
      tokens: { color: { primary: '#000' } },
      darkTokens: { color: { primary: '#FFF' } },
    });
    
    registerTheme({
      name: 'child',
      extends: 'base',
      darkTokens: { color: { secondary: '#AAA' } },
    });
    
    const resolved = resolveTheme('child');
    
    expect(resolved.darkTokens.color?.primary).toBe('#FFF');
    expect(resolved.darkTokens.color?.secondary).toBe('#AAA');
  });
  
  it('should merge component overrides', () => {
    registerTheme({
      name: 'base',
      tokens: {},
      components: {
        Button: { baseStyles: { padding: '8px' } },
      },
    });
    
    registerTheme({
      name: 'child',
      extends: 'base',
      components: {
        Button: { baseStyles: { borderRadius: '4px' } },
      },
    });
    
    const resolved = resolveTheme('child');
    
    expect(resolved.componentOverrides.Button?.baseStyles).toEqual({
      padding: '8px',
      borderRadius: '4px',
    });
  });
});

describe('composeThemes', () => {
  beforeEach(() => {
    clearThemes();
  });
  
  it('should compose multiple themes', () => {
    registerTheme({
      name: 'base',
      tokens: { color: { primary: '#000' } },
    });
    
    registerTheme({
      name: 'brand',
      tokens: { color: { primary: '#F00' } },
    });
    
    const composed = composeThemes('base', 'brand');
    
    // Later theme takes precedence
    expect(composed.tokens.color?.primary).toBe('#F00');
  });
  
  it('should throw for empty arguments', () => {
    expect(() => composeThemes()).toThrow('At least one theme name is required');
  });
});

describe('createTheme', () => {
  it('should create a theme with defaults', () => {
    const theme = createTheme('my-theme', {
      tokens: { color: { primary: '#000' } },
    });
    
    expect(theme.name).toBe('my-theme');
    expect(theme.tokens.color?.primary).toBe('#000');
  });
});

describe('extendTheme', () => {
  beforeEach(() => {
    clearThemes();
  });
  
  it('should create extended theme', () => {
    registerTheme({
      name: 'base',
      tokens: { color: { primary: '#000' } },
    });
    
    const extended = extendTheme('base', {
      tokens: { color: { secondary: '#FFF' } },
    });
    
    expect(extended.extends).toBe('base');
    expect(extended.tokens.color?.secondary).toBe('#FFF');
  });
  
  it('should throw for missing base theme', () => {
    expect(() => extendTheme('non-existent', {})).toThrow('Base theme "non-existent" not found');
  });
});

describe('generateThemeCSSVariables', () => {
  it('should generate CSS variables', () => {
    const theme = {
      name: 'test',
      tokens: {
        color: { primary: '#3B82F6' },
        space: { sm: '0.5rem' },
      },
      darkTokens: {},
      componentOverrides: {},
      settings: { cssPrefix: 'intent' },
    };
    
    const css = generateThemeCSSVariables(theme);
    
    expect(css).toContain('--intent-color-primary: #3B82F6;');
    expect(css).toContain('--intent-space-sm: 0.5rem;');
    expect(css).toContain(':root {');
  });
  
  it('should include dark mode media query', () => {
    const theme = {
      name: 'test',
      tokens: {
        color: { primary: '#3B82F6' },
      },
      darkTokens: {
        color: { primary: '#60A5FA' },
      },
      componentOverrides: {},
      settings: { cssPrefix: 'intent' },
    };
    
    const css = generateThemeCSSVariables(theme);
    
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain(':root.dark');
    expect(css).toContain('.dark {');
  });
});

describe('getTokenVariableName', () => {
  it('should generate variable name with default prefix', () => {
    expect(getTokenVariableName('color', 'primary')).toBe('--intent-color-primary');
  });
  
  it('should generate variable name with custom prefix', () => {
    expect(getTokenVariableName('color', 'primary', 'myapp')).toBe('--myapp-color-primary');
  });
});

describe('defaultTheme', () => {
  beforeEach(() => {
    clearThemes();
    registerTheme(defaultTheme);
  });
  
  it('should have required token categories', () => {
    expect(defaultTheme.tokens.color).toBeDefined();
    expect(defaultTheme.tokens.space).toBeDefined();
    expect(defaultTheme.tokens.elevation).toBeDefined();
    expect(defaultTheme.tokens.radius).toBeDefined();
    expect(defaultTheme.tokens.typography).toBeDefined();
  });
  
  it('should have dark tokens', () => {
    expect(defaultTheme.darkTokens?.color).toBeDefined();
  });
  
  it('should be resolvable', () => {
    const resolved = resolveTheme('intent-default');
    expect(resolved.tokens.color?.['brand-primary']).toBe('#3B82F6');
  });
});
