/**
 * Intent Compiler
 * 
 * Main compilation orchestrator that transforms design system schemas
 * into production-ready CSS and TypeScript definitions.
 */

import type {
  DesignSystemConfig,
  CompilationOutput,
  ComponentCompilation,
  AIManifest,
} from '../types/index.js';
import { validateSchema, validateAllUsages, type BatchUsage } from '../validator/index.js';
import { compileSystem, generateCSSVariables } from '../generator/css.js';
import { generateSystemTypes, generateRuntimeTypes } from '../generator/types.js';
import { generateAIManifest, generateAIPrompt } from '../generator/ai-manifest.js';

// ============================================================================
// Compiler Options
// ============================================================================

export interface CompilerOptions {
  /** Output minified CSS */
  minify?: boolean;
  /** Generate source maps */
  sourceMap?: boolean;
  /** CSS variable prefix */
  cssPrefix?: string;
  /** Generate dark mode variables */
  darkMode?: boolean;
  /** Dark mode tokens */
  darkTokens?: Partial<DesignSystemConfig['tokens']>;
  /** Strict validation (fail on warnings) */
  strict?: boolean;
  /** Output directory for compiled files */
  outDir?: string;
}

export interface CompileResult {
  success: boolean;
  css: string;
  types: string;
  runtime: string;
  manifest: AIManifest;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// Main Compiler
// ============================================================================

export async function compile(
  config: DesignSystemConfig,
  options: CompilerOptions = {}
): Promise<CompileResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Step 1: Validate schema
  const schemaValidation = validateSchema(config);
  
  for (const issue of schemaValidation.issues) {
    const message = `[${issue.code}] ${issue.message} (${issue.path})`;
    if (issue.severity === 'error') {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }
  
  if (!schemaValidation.valid && options.strict) {
    return {
      success: false,
      css: '',
      types: '',
      runtime: '',
      manifest: generateAIManifest(config),
      errors,
      warnings,
    };
  }
  
  // Step 2: Update config with options
  const compiledConfig: DesignSystemConfig = {
    ...config,
    settings: {
      ...config.settings,
      cssPrefix: options.cssPrefix || config.settings?.cssPrefix || 'intent',
    },
  };
  
  // Step 3: Generate CSS
  const css = compileSystem(compiledConfig, {
    minify: options.minify,
    includeSourceMap: options.sourceMap,
  });
  
  // Add dark mode if specified
  let finalCSS = css;
  if (options.darkMode && options.darkTokens) {
    const { generateDarkModeVariables } = await import('../generator/css.js');
    const darkCSS = generateDarkModeVariables(config.tokens, options.darkTokens, options.cssPrefix);
    finalCSS += '\n\n' + darkCSS;
  }
  
  // Step 4: Generate TypeScript types
  const types = generateSystemTypes(compiledConfig);
  
  // Step 5: Generate runtime types
  const runtime = generateRuntimeTypes(compiledConfig);
  
  // Step 6: Generate AI manifest
  const manifest = generateAIManifest(compiledConfig);
  
  return {
    success: errors.length === 0,
    css: finalCSS,
    types,
    runtime,
    manifest,
    errors,
    warnings,
  };
}

// ============================================================================
// Watch Mode
// ============================================================================

export interface WatchOptions extends CompilerOptions {
  onChange?: (result: CompileResult) => void;
  onError?: (error: Error) => void;
}

export function watch(
  configPath: string,
  options: WatchOptions = {}
): { stop: () => void } {
  // This would use fs.watch in a real implementation
  // For now, just return a no-op stop function
  return {
    stop: () => {},
  };
}

// ============================================================================
// Component Compilation
// ============================================================================

export async function compileComponent(
  config: DesignSystemConfig,
  componentName: string,
  options: CompilerOptions = {}
): Promise<ComponentCompilation | null> {
  const schema = config.components[componentName];
  if (!schema) {
    return null;
  }
  
  const compiledConfig = {
    ...config,
    settings: {
      ...config.settings,
      cssPrefix: options.cssPrefix || config.settings?.cssPrefix || 'intent',
    },
  };
  
  const { compileComponent: compileComp } = await import('../generator/css.js');
  const { generateComponentTypes } = await import('../generator/types.js');
  const { generateValidCombinations } = await import('../validator/constraints.js');
  
  const styles = compileComp(schema, compiledConfig);
  const typeDefinition = generateComponentTypes(schema);
  const propCombinations = generateValidCombinations(schema).map(c => 
    Object.entries(c).map(([k, v]) => `${k}=${v}`)
  );
  
  return {
    component: componentName,
    styles,
    typeDefinition,
    propCombinations,
  };
}

// ============================================================================
// Validation with Usage
// ============================================================================

export interface ValidationWithUsageResult {
  valid: boolean;
  schemaValid: boolean;
  usageValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateWithUsage(
  config: DesignSystemConfig,
  usages: BatchUsage[],
  options: CompilerOptions = {}
): ValidationWithUsageResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate schema first
  const schemaValidation = validateSchema(config);
  
  for (const issue of schemaValidation.issues) {
    const message = `[${issue.code}] ${issue.message} (${issue.path})`;
    if (issue.severity === 'error') {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }
  
  // Validate usage
  const usageValidation = validateAllUsages(config, usages, { strict: options.strict });
  
  for (const issue of usageValidation.issues) {
    const message = `[${issue.code}] ${issue.message} (${issue.path})`;
    if (issue.severity === 'error') {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }
  
  return {
    valid: errors.length === 0 && (!options.strict || warnings.length === 0),
    schemaValid: schemaValidation.valid,
    usageValid: usageValidation.valid,
    errors,
    warnings,
  };
}

// ============================================================================
// AI Helpers
// ============================================================================

export {
  generateAIManifest,
  generateAIPrompt,
} from '../generator/ai-manifest.js';

export type { PromptContext } from '../generator/ai-manifest.js';
