// ============================================================================
// Plugin System Types
// ============================================================================

import type {
  ComponentSchema,
  DesignSystemConfig,
  TokenRegistry,
  ValidationIssue,
  ComponentUsage,
  CompiledStyles,
  CompilationOutput,
} from '../types/index.js';

// ============================================================================
// Plugin Context
// ============================================================================

/**
 * Context passed to plugin hooks during compilation
 */
export interface PluginContext {
  /** Current design system configuration */
  config: DesignSystemConfig;
  /** Resolved tokens including inherited themes */
  tokens: TokenRegistry;
  /** All registered components */
  components: Map<string, ComponentSchema>;
  /** Plugin options */
  options: Record<string, unknown>;
  /** Utility functions */
  utils: {
    /** Resolve a token value */
    resolveToken: (category: string, name: string) => string | number | undefined;
    /** Add a validation issue */
    addIssue: (issue: ValidationIssue) => void;
    /** Log debug info */
    log: (message: string, ...args: unknown[]) => void;
  };
}

// ============================================================================
// Plugin Hooks
// ============================================================================

/**
 * Hook called when tokens are being resolved
 */
export type TokensHook = (
  tokens: TokenRegistry,
  context: PluginContext
) => TokenRegistry | void;

/**
 * Hook called when a component is being registered
 */
export type ComponentHook = (
  component: ComponentSchema,
  context: PluginContext
) => ComponentSchema | void;

/**
 * Hook called before validation runs
 */
export type BeforeValidateHook = (
  usages: ComponentUsage[],
  context: PluginContext
) => ComponentUsage[] | void;

/**
 * Hook called after validation runs
 */
export type AfterValidateHook = (
  issues: ValidationIssue[],
  context: PluginContext
) => ValidationIssue[] | void;

/**
 * Hook called before CSS generation
 */
export type BeforeGenerateHook = (
  components: ComponentSchema[],
  context: PluginContext
) => ComponentSchema[] | void;

/**
 * Hook called after CSS generation for each component
 */
export type GenerateComponentHook = (
  component: string,
  styles: CompiledStyles,
  context: PluginContext
) => CompiledStyles | void;

/**
 * Hook called after all CSS is generated
 */
export type AfterGenerateHook = (
  output: CompilationOutput,
  context: PluginContext
) => CompilationOutput | void;

// ============================================================================
// Plugin Definition
// ============================================================================

/**
 * Intent Plugin interface
 * 
 * Plugins can extend Intent with:
 * - New components
 * - Theme tokens
 * - Custom validators
 * - Custom generators
 * - Build pipeline hooks
 * 
 * @example
 * ```ts
 * const myPlugin: IntentPlugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   
 *   // Add components
 *   components: {
 *     Carousel: defineComponent({...}),
 *   },
 *   
 *   // Add tokens
 *   tokens: {
 *     color: {
 *       'brand-accent': '#FF6B6B',
 *     },
 *   },
 *   
 *   // Register hooks
 *   hooks: {
 *     beforeGenerate: (components, context) => {
 *       // Modify components before CSS generation
 *       return components;
 *     },
 *   },
 * };
 * ```
 */
export interface IntentPlugin {
  /** Plugin name (must be unique) */
  name: string;
  /** Plugin version */
  version: string;
  /** Plugin description */
  description?: string;
  
  /** Components to register */
  components?: Record<string, ComponentSchema>;
  
  /** Tokens to merge */
  tokens?: Partial<TokenRegistry>;
  
  /** Dark mode tokens */
  darkTokens?: Partial<TokenRegistry>;
  
  /** Default options for this plugin */
  defaultOptions?: Record<string, unknown>;
  
  /** Lifecycle hooks */
  hooks?: {
    /** Called when tokens are resolved */
    tokens?: TokensHook;
    /** Called when a component is registered */
    component?: ComponentHook;
    /** Called before validation */
    beforeValidate?: BeforeValidateHook;
    /** Called after validation */
    afterValidate?: AfterValidateHook;
    /** Called before CSS generation */
    beforeGenerate?: BeforeGenerateHook;
    /** Called for each component during generation */
    generateComponent?: GenerateComponentHook;
    /** Called after all CSS generation */
    afterGenerate?: AfterGenerateHook;
  };
  
  /** 
   * Plugin initialization
   * Called when the plugin is registered
   */
  setup?: (context: PluginContext) => void;
  
  /**
   * Plugin cleanup
   * Called when the plugin is unregistered
   */
  teardown?: (context: PluginContext) => void;
}

// ============================================================================
// Plugin Registration
// ============================================================================

/**
 * Options for registering a plugin
 */
export interface PluginRegistration {
  /** The plugin to register */
  plugin: IntentPlugin;
  /** Options to pass to the plugin */
  options?: Record<string, unknown>;
  /** Whether the plugin is enabled */
  enabled?: boolean;
}

/**
 * Plugin registry state
 */
export interface PluginRegistry {
  /** Registered plugins */
  plugins: Map<string, PluginRegistration>;
  /** Combined tokens from all plugins */
  tokens: TokenRegistry;
  /** Combined components from all plugins */
  components: Map<string, ComponentSchema>;
  /** Execution order (for hooks) */
  order: string[];
}

// ============================================================================
// Theme Extension
// ============================================================================

/**
 * Theme that can be extended or composed
 */
export interface Theme {
  name: string;
  version?: string;
  extends?: string | string[];
  tokens: TokenRegistry;
  darkTokens?: Partial<TokenRegistry>;
  components?: Record<string, Partial<ComponentSchema>>;
  settings?: {
    cssPrefix?: string;
    prefix?: string;
    darkMode?: 'class' | 'media' | 'data' | false;
  };
}

/**
 * Theme resolution result
 */
export interface ResolvedTheme {
  name: string;
  tokens: TokenRegistry;
  darkTokens: Partial<TokenRegistry>;
  componentOverrides: Record<string, Partial<ComponentSchema>>;
  settings: {
    cssPrefix: string;
  };
}

// ============================================================================
// Custom Validators
// ============================================================================

/**
 * Custom validator function
 */
export type CustomValidator = (
  usage: ComponentUsage,
  context: PluginContext
) => ValidationIssue | ValidationIssue[] | undefined;

/**
 * Custom validator registration
 */
export interface ValidatorRegistration {
  name: string;
  validator: CustomValidator;
  /** Which components this validator applies to */
  components?: string[];
  /** Which props this validator applies to */
  props?: string[];
}

// ============================================================================
// Custom Generators
// ============================================================================

/**
 * Custom CSS generator
 */
export type CustomGenerator = (
  component: ComponentSchema,
  context: PluginContext
) => string | CompiledStyles;

/**
 * Generator registration
 */
export interface GeneratorRegistration {
  name: string;
  /** Which components this generator handles */
  components: string[];
  generator: CustomGenerator;
  /** Priority (higher = runs first) */
  priority?: number;
}
