/**
 * CSS Generator
 * 
 * Compiles component schemas into optimized CSS with semantic class names.
 * Uses per-prop attribute selectors to avoid combinatorial explosion.
 */

import type {
  DesignSystemConfig,
  ComponentSchema,
  VisualMapping,
  ConditionalMapping,
  TokenRegistry,
  CompiledStyles,
} from '../types/index.js';

// ============================================================================
// CSS Variable Generation
// ============================================================================

export function generateCSSVariables(tokens: TokenRegistry, prefix = 'intent'): string {
  const lines: string[] = [':root {'];
  
  for (const [category, values] of Object.entries(tokens)) {
    if (!values) continue;
    
    for (const [name, value] of Object.entries(values)) {
      const varName = `--${prefix}-${category}-${name}`;
      lines.push(`  ${varName}: ${value};`);
    }
  }
  
  lines.push('}');
  return lines.join('\n');
}

export function generateDarkModeVariables(
  tokens: TokenRegistry,
  darkTokens: Partial<TokenRegistry>,
  prefix = 'intent'
): string {
  const declarations: string[] = [];
  
  for (const [category, values] of Object.entries(darkTokens)) {
    if (!values) continue;
    for (const [name, value] of Object.entries(values)) {
      const varName = `--${prefix}-${category}-${name}`;
      declarations.push(`  ${varName}: ${value};`);
    }
  }
  
  const lines: string[] = [];
  
  // System preference
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root {');
  lines.push(...declarations.map(d => '  ' + d));
  lines.push('  }');
  lines.push('}');
  lines.push('');
  
  // Manual toggle class
  lines.push(':root.dark {');
  lines.push(...declarations);
  lines.push('}');
  
  return lines.join('\n');
}

// ============================================================================
// Class Name Generation
// ============================================================================

function generateClassName(
  component: string,
  prop: string,
  value: string,
  prefix = 'intent'
): string {
  // Convert camelCase to kebab-case
  const kebabProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const kebabComponent = component.toLowerCase();
  return `.${prefix}-${kebabComponent}[data-${kebabProp}="${value}"]`;
}

// ============================================================================
// Value Resolution
// ============================================================================

function resolveValue(
  value: string,
  tokens: TokenRegistry,
  prefix = 'intent'
): string {
  // Special literal values that should never be resolved as tokens
  const LITERAL_VALUES = ['none', 'transparent', 'inherit', 'initial', 'unset', 'auto'];
  
  // Try exact match first (single-word token key)
  if (/^[a-zA-Z][\w-]*$/.test(value)) {
    // Check if it's a literal CSS value
    if (LITERAL_VALUES.includes(value)) {
      return value;
    }
    
    // Try direct lookup: value is the key in some category
    // e.g., 'brand-primary' in color category
    for (const [category, tokenSet] of Object.entries(tokens)) {
      if (tokenSet && value in tokenSet) {
        return `var(--${prefix}-${category}-${value})`;
      }
    }
    
    // Try category-prefixed lookup: "radius-md" → category "radius", key "md"
    // Also handles "elevation-low" → category "elevation", key "low"
    for (const [category, tokenSet] of Object.entries(tokens)) {
      if (!tokenSet) continue;
      if (value.startsWith(category + '-')) {
        const key = value.slice(category.length + 1);
        if (key in tokenSet) {
          return `var(--${prefix}-${category}-${key})`;
        }
      }
    }
    
    // Not a token reference, return as-is
    return value;
  }
  
  // Multi-word value: resolve each word independently
  // Handles "tight compact" → "var(--intent-space-tight) var(--intent-space-compact)"
  // Handles "1px solid border-default" → "1px solid var(--intent-color-border-default)"
  const words = value.split(/\s+/);
  if (words.length > 1) {
    return words.map(word => resolveValue(word, tokens, prefix)).join(' ');
  }
  
  return value;
}

function resolveStyleValue(
  value: import('../types/index.js').StyleValue,
  tokens: TokenRegistry,
  propValues: Record<string, string>,
  prefix = 'intent'
): string {
  if (typeof value === 'string') {
    return resolveValue(value, tokens, prefix);
  }
  
  // Handle responsive/size-based objects
  if (typeof value === 'object' && value !== null) {
    // Check if it has a key that matches current prop values
    for (const [key, val] of Object.entries(value)) {
      // Check if this key matches any of the current prop values
      if (propValues[key] !== undefined) {
        return resolveValue(val as string, tokens, prefix);
      }
    }
    // Return first value as fallback
    const firstValue = Object.values(value)[0];
    return resolveValue(firstValue as string, tokens, prefix);
  }
  
  return String(value);
}

// ============================================================================
// Style Generation
// ============================================================================

function generateCSSRule(
  selector: string,
  styles: VisualMapping,
  tokens: TokenRegistry,
  propValues: Record<string, string>,
  prefix = 'intent'
): string {
  const declarations: string[] = [];
  
  for (const [property, value] of Object.entries(styles)) {
    // Convert camelCase to kebab-case for CSS properties
    const cssProperty = property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const resolvedValue = resolveStyleValue(value, tokens, propValues, prefix);
    declarations.push(`  ${cssProperty}: ${resolvedValue};`);
  }
  
  if (declarations.length === 0) {
    return '';
  }
  
  return `${selector} {\n${declarations.join('\n')}\n}`;
}

// ============================================================================
// Component CSS Generation
// ============================================================================

function isConditionalMappingArray(value: unknown): value is ConditionalMapping[] {
  return Array.isArray(value) && value.length > 0 && 
    typeof value[0] === 'object' && value[0] !== null &&
    'condition' in value[0] && 'styles' in value[0];
}

export function compileComponent(
  schema: ComponentSchema,
  config: DesignSystemConfig
): CompiledStyles {
  const lines: string[] = [];
  const classes: string[] = [];
  const prefix = config.settings?.cssPrefix || 'intent';
  const tokens = config.tokens;
  const baseClass = `${prefix}-${schema.name.toLowerCase()}`;
  
  // Generate base styles
  if (schema.baseStyles) {
    const baseSelector = `.${baseClass}`;
    const baseRule = generateCSSRule(baseSelector, schema.baseStyles, tokens, {}, prefix);
    if (baseRule) {
      lines.push(baseRule);
      classes.push(baseClass);
    }
  }
  
  // Generate per-prop selectors (not cartesian product)
  // Each mapping key like 'importance=primary' becomes .intent-button[data-importance="primary"]
  for (const [mappingKey, mappingValue] of Object.entries(schema.mappings)) {
    // Parse mapping key like "importance=primary"
    const [mapProp, mapValue] = mappingKey.split('=');
    
    // Generate simple selector for this prop=value
    const selector = generateClassName(schema.name, mapProp, mapValue, prefix);
    classes.push(`${baseClass}[data-${mapProp.toLowerCase()}="${mapValue}"]`);
    
    if (isConditionalMappingArray(mappingValue)) {
      // Conditional mapping array - generate compound selectors only for explicit conditions
      for (const conditional of mappingValue) {
        const conditions = Object.entries(conditional.condition);
        if (conditions.length === 0) continue;
        
        // Build compound selector for additional conditions
        const additionalSelectors = conditions.map(([condProp, condValue]) => 
          `[data-${condProp.toLowerCase()}="${condValue}"]`
        );
        
        const compoundSelector = selector + additionalSelectors.join('');
        const rule = generateCSSRule(
          compoundSelector,
          conditional.styles,
          tokens,
          { [mapProp]: mapValue, ...conditional.condition },
          prefix
        );
        if (rule) {
          lines.push(rule);
        }
      }
    } else {
      // Simple mapping or responsive object - one rule per prop=value
      const rule = generateCSSRule(
        selector,
        mappingValue as VisualMapping,
        tokens,
        { [mapProp]: mapValue },
        prefix
      );
      if (rule) {
        lines.push(rule);
      }
    }
  }
  
  return {
    css: lines.join('\n\n'),
    classes,
  };
}

// ============================================================================
// Full System Compilation
// ============================================================================

export interface CompilationOptions {
  minify?: boolean;
  includeSourceMap?: boolean;
}

export function compileSystem(
  config: DesignSystemConfig,
  options: CompilationOptions = {}
): string {
  const lines: string[] = [];
  const prefix = config.settings?.cssPrefix || 'intent';
  
  // Add CSS reset for Intent components
  lines.push(`/* Intent Design System: ${config.name} v${config.version || '0.1.0'} */`);
  lines.push('');
  
  // Generate CSS variables
  if (config.settings?.generateCSSVariables !== false) {
    lines.push(generateCSSVariables(config.tokens, prefix));
    lines.push('');
    
    // Generate dark mode overrides
    if (config.darkTokens) {
      lines.push(generateDarkModeVariables(config.tokens, config.darkTokens, prefix));
      lines.push('');
    }
  }
  
  // Generate component styles
  for (const [name, schema] of Object.entries(config.components)) {
    lines.push(`/* Component: ${name} */`);
    const compiled = compileComponent(schema, config);
    lines.push(compiled.css);
    lines.push('');
  }
  
  let css = lines.join('\n');
  
  if (options.minify) {
    css = minifyCSS(css);
  }
  
  return css;
}

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')              // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove space around punctuation
    .replace(/;}/g, '}')               // Remove last semicolon in block
    .trim();
}
