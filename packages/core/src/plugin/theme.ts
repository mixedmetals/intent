// ============================================================================
// Theme Resolution System
// ============================================================================

import type { Theme, ResolvedTheme } from './types.js';
import type { TokenRegistry, ComponentSchema } from '../types/index.js';

// ============================================================================
// Theme Registry
// ============================================================================

const themeRegistry = new Map<string, Theme>();

/**
 * Register a theme
 */
export function registerTheme(theme: Theme): void {
  themeRegistry.set(theme.name, theme);
}

/**
 * Get a registered theme
 */
export function getTheme(name: string): Theme | undefined {
  return themeRegistry.get(name);
}

/**
 * Check if a theme is registered
 */
export function hasTheme(name: string): boolean {
  return themeRegistry.has(name);
}

/**
 * Unregister a theme
 */
export function unregisterTheme(name: string): boolean {
  return themeRegistry.delete(name);
}

/**
 * Get all registered themes
 */
export function getAllThemes(): Theme[] {
  return Array.from(themeRegistry.values());
}

/**
 * Clear all themes
 */
export function clearThemes(): void {
  themeRegistry.clear();
}

// ============================================================================
// Theme Resolution
// ============================================================================

/**
 * Resolve a theme with all its parent themes
 * 
 * This implements theme inheritance where child themes can:
 * - Override tokens from parent themes
 * - Add new tokens
 * - Override component definitions
 * 
 * @example
 * ```ts
 * // Base theme
 * registerTheme({
 *   name: 'base',
 *   tokens: { color: { primary: '#3B82F6', secondary: '#64748B' } },
 * });
 * 
 * // Child theme
 * registerTheme({
 *   name: 'brand',
 *   extends: 'base',
 *   tokens: { color: { primary: '#FF6B6B' } }, // Override primary
 * });
 * 
 * const resolved = resolveTheme('brand');
 * // resolved.tokens.color.primary = '#FF6B6B' (from brand)
 * // resolved.tokens.color.secondary = '#64748B' (from base)
 * ```
 */
export function resolveTheme(themeName: string, visited: Set<string> = new Set()): ResolvedTheme {
  // Detect circular dependencies
  if (visited.has(themeName)) {
    throw new Error(`Circular theme dependency detected: ${Array.from(visited).join(' -> ')} -> ${themeName}`);
  }
  
  const theme = themeRegistry.get(themeName);
  if (!theme) {
    throw new Error(`Theme "${themeName}" not found`);
  }
  
  visited.add(themeName);
  
  // Start with empty theme
  const result: ResolvedTheme = {
    name: themeName,
    tokens: {},
    darkTokens: {},
    componentOverrides: {},
    settings: {
      cssPrefix: theme.settings?.cssPrefix || 'intent',
    },
  };
  
  // Resolve parent themes first
  if (theme.extends) {
    const parents = Array.isArray(theme.extends) ? theme.extends : [theme.extends];
    
    for (const parentName of parents) {
      const parent = resolveTheme(parentName, new Set(visited));
      
      // Merge parent tokens (earlier parents take precedence over later)
      result.tokens = deepMerge(parent.tokens, result.tokens);
      result.darkTokens = deepMerge(parent.darkTokens, result.darkTokens);
      result.componentOverrides = deepMerge(
        result.componentOverrides as Record<string, unknown>,
        parent.componentOverrides as Record<string, unknown>
      ) as ResolvedTheme['componentOverrides'];
    }
  }
  
  // Apply current theme overrides
  result.tokens = deepMerge(result.tokens, theme.tokens);
  
  if (theme.darkTokens) {
    result.darkTokens = deepMerge(result.darkTokens, theme.darkTokens);
  }
  
  if (theme.components) {
    result.componentOverrides = deepMerge(
      result.componentOverrides as Record<string, unknown>,
      theme.components as Record<string, unknown>
    ) as ResolvedTheme['componentOverrides'];
  }
  
  if (theme.settings?.cssPrefix) {
    result.settings.cssPrefix = theme.settings.cssPrefix;
  }
  
  return result;
}

/**
 * Compose multiple themes together
 * 
 * Similar to resolveTheme but doesn't use extends - 
 * themes are merged left to right with later themes taking precedence.
 * 
 * @example
 * ```ts
 * const composed = composeThemes('base', 'brand', 'custom');
 * ```
 */
export function composeThemes(...themeNames: string[]): ResolvedTheme {
  if (themeNames.length === 0) {
    throw new Error('At least one theme name is required');
  }
  
  const result: ResolvedTheme = {
    name: themeNames.join('+'),
    tokens: {},
    darkTokens: {},
    componentOverrides: {},
    settings: { cssPrefix: 'intent' },
  };
  
  for (const themeName of themeNames) {
    const theme = resolveTheme(themeName);
    
    result.tokens = deepMerge(result.tokens, theme.tokens);
    result.darkTokens = deepMerge(result.darkTokens, theme.darkTokens);
    result.componentOverrides = { ...result.componentOverrides, ...theme.componentOverrides };
    result.settings.cssPrefix = theme.settings.cssPrefix;
  }
  
  return result;
}

/**
 * Create a theme from a partial definition
 * 
 * Useful for creating ad-hoc themes without registering them.
 */
export function createTheme(
  name: string,
  partial: Partial<Omit<Theme, 'name'>>
): Theme {
  return {
    name,
    tokens: {},
    ...partial,
    tokens: {
      ...partial.tokens,
    },
  };
}

/**
 * Extend an existing theme with overrides
 * 
 * @example
 * ```ts
 * const customTheme = extendTheme('base', {
 *   tokens: { color: { primary: '#FF6B6B' } },
 * });
 * ```
 */
export function extendTheme(
  baseThemeName: string,
  overrides: Partial<Omit<Theme, 'name' | 'extends'>>
): Theme {
  const baseTheme = themeRegistry.get(baseThemeName);
  if (!baseTheme) {
    throw new Error(`Base theme "${baseThemeName}" not found`);
  }
  
  return {
    name: `${baseThemeName}-extended`,
    extends: baseThemeName,
    tokens: overrides.tokens || {},
    darkTokens: overrides.darkTokens,
    components: overrides.components,
    settings: overrides.settings,
  };
}

// ============================================================================
// Built-in Themes
// ============================================================================

/**
 * Default Intent theme with essential tokens
 */
export const defaultTheme: Theme = {
  name: 'intent-default',
  tokens: {
    color: {
      'brand-primary': '#3B82F6',
      'brand-secondary': '#64748B',
      'brand-accent': '#8B5CF6',
      
      'neutral-0': '#FFFFFF',
      'neutral-50': '#F8FAFC',
      'neutral-100': '#F1F5F9',
      'neutral-200': '#E2E8F0',
      'neutral-300': '#CBD5E1',
      'neutral-400': '#94A3B8',
      'neutral-500': '#64748B',
      'neutral-600': '#475569',
      'neutral-700': '#334155',
      'neutral-800': '#1E293B',
      'neutral-900': '#0F172A',
      'neutral-950': '#020617',
      
      'success-500': '#22C55E',
      'warning-500': '#F59E0B',
      'error-500': '#EF4444',
      'info-500': '#3B82F6',
    },
    space: {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
    },
    elevation: {
      'none': '0 0 #0000',
      'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    radius: {
      'none': '0px',
      'sm': '0.125rem',
      'DEFAULT': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      'full': '9999px',
    },
    typography: {
      'font-sans': 'ui-sans-serif, system-ui, sans-serif',
      'font-mono': 'ui-monospace, monospace',
      
      'text-xs': '0.75rem',
      'text-sm': '0.875rem',
      'text-base': '1rem',
      'text-lg': '1.125rem',
      'text-xl': '1.25rem',
      'text-2xl': '1.5rem',
      'text-3xl': '1.875rem',
    },
  },
  darkTokens: {
    color: {
      'brand-primary': '#60A5FA',
      'neutral-0': '#0F172A',
      'neutral-50': '#1E293B',
      'neutral-100': '#334155',
      'neutral-200': '#475569',
      'neutral-800': '#F1F5F9',
      'neutral-900': '#F8FAFC',
      'neutral-950': '#FFFFFF',
    },
  },
  settings: {
    cssPrefix: 'intent',
  },
};

// Register the default theme
registerTheme(defaultTheme);

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      ) as T[Extract<keyof T, string>];
    } else if (source[key] !== undefined) {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  
  return result;
}

/**
 * Get CSS variable name for a token
 */
export function getTokenVariableName(
  category: string,
  name: string,
  prefix: string = 'intent'
): string {
  return `--${prefix}-${category}-${name}`;
}

/**
 * Generate CSS variables from resolved theme
 */
export function generateThemeCSSVariables(theme: ResolvedTheme): string {
  const lines: string[] = [':root {'];
  
  for (const [category, tokens] of Object.entries(theme.tokens)) {
    if (!tokens) continue;
    
    for (const [name, value] of Object.entries(tokens)) {
      const varName = getTokenVariableName(category, name, theme.settings.cssPrefix);
      lines.push(`  ${varName}: ${value};`);
    }
  }
  
  lines.push('}');
  
  // Dark mode variables
  if (Object.keys(theme.darkTokens).length > 0) {
    lines.push('');
    lines.push('@media (prefers-color-scheme: dark) {');
    lines.push('  :root {');
    
    for (const [category, tokens] of Object.entries(theme.darkTokens)) {
      if (!tokens) continue;
      
      for (const [name, value] of Object.entries(tokens)) {
        const varName = getTokenVariableName(category, name, theme.settings.cssPrefix);
        lines.push(`    ${varName}: ${value};`);
      }
    }
    
    lines.push('  }');
    lines.push('}');
    
    // Also support .dark class
    lines.push('');
    lines.push(':root.dark,');
    lines.push('.dark {');
    
    for (const [category, tokens] of Object.entries(theme.darkTokens)) {
      if (!tokens) continue;
      
      for (const [name, value] of Object.entries(tokens)) {
        const varName = getTokenVariableName(category, name, theme.settings.cssPrefix);
        lines.push(`  ${varName}: ${value};`);
      }
    }
    
    lines.push('}');
  }
  
  return lines.join('\n');
}
