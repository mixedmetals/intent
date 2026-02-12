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
    tokens: partial.tokens ?? {},
    ...partial,
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

// Note: The comprehensive default theme is defined in theme/default-theme.ts
// This is registered there to avoid circular dependencies

// Placeholder for the default theme - will be populated when theme/default-theme.ts is loaded
export let defaultTheme: Theme | undefined = undefined;

/**
 * Set the default theme (called by theme/default-theme.ts)
 * @internal
 */
export function setDefaultTheme(theme: Theme): void {
  defaultTheme = theme;
}

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
