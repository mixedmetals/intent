// ============================================================================
// Plugin Registry
// ============================================================================

import type {
  IntentPlugin,
  PluginRegistration,
  PluginRegistry,
  PluginContext,
  Theme,
  ResolvedTheme,
  CustomValidator,
  CustomGenerator,
} from './types.js';
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
// Plugin Registry Implementation
// ============================================================================

export class PluginManager {
  private registry: PluginRegistry;
  private validators: Map<string, CustomValidator>;
  private generators: Map<string, CustomGenerator>;
  private issues: ValidationIssue[];
  
  constructor() {
    this.registry = {
      plugins: new Map(),
      tokens: {},
      components: new Map(),
      order: [],
    };
    this.validators = new Map();
    this.generators = new Map();
    this.issues = [];
  }
  
  /**
   * Register a plugin
   */
  register(plugin: IntentPlugin, options: Record<string, unknown> = {}): void {
    if (this.registry.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }
    
    // Merge options with defaults
    const mergedOptions = {
      ...plugin.defaultOptions,
      ...options,
    };
    
    // Register the plugin
    this.registry.plugins.set(plugin.name, {
      plugin,
      options: mergedOptions,
      enabled: true,
    });
    
    this.registry.order.push(plugin.name);
    
    // Register components
    if (plugin.components) {
      for (const [name, component] of Object.entries(plugin.components)) {
        this.registry.components.set(name, component);
      }
    }
    
    // Merge tokens
    if (plugin.tokens) {
      this.mergeTokens(plugin.tokens);
    }
    
    // Call setup hook
    if (plugin.setup) {
      const context = this.createContext(mergedOptions);
      plugin.setup(context);
    }
  }
  
  /**
   * Unregister a plugin
   */
  unregister(pluginName: string): void {
    const registration = this.registry.plugins.get(pluginName);
    if (!registration) {
      throw new Error(`Plugin "${pluginName}" is not registered`);
    }
    
    // Call teardown hook
    if (registration.plugin.teardown) {
      const context = this.createContext(registration.options ?? {});
      registration.plugin.teardown(context);
    }
    
    // Remove components added by this plugin
    if (registration.plugin.components) {
      for (const name of Object.keys(registration.plugin.components)) {
        this.registry.components.delete(name);
      }
    }
    
    // Remove from order
    this.registry.order = this.registry.order.filter(n => n !== pluginName);
    
    // Remove from registry
    this.registry.plugins.delete(pluginName);
    
    // Rebuild tokens
    this.rebuildTokens();
  }
  
  /**
   * Enable a plugin
   */
  enable(pluginName: string): void {
    const registration = this.registry.plugins.get(pluginName);
    if (registration) {
      registration.enabled = true;
    }
  }
  
  /**
   * Disable a plugin
   */
  disable(pluginName: string): void {
    const registration = this.registry.plugins.get(pluginName);
    if (registration) {
      registration.enabled = false;
    }
  }
  
  /**
   * Check if a plugin is registered
   */
  has(pluginName: string): boolean {
    return this.registry.plugins.has(pluginName);
  }
  
  /**
   * Get a registered plugin
   */
  get(pluginName: string): IntentPlugin | undefined {
    return this.registry.plugins.get(pluginName)?.plugin;
  }
  
  /**
   * Get all registered plugins
   */
  getAll(): IntentPlugin[] {
    return Array.from(this.registry.plugins.values())
      .filter(r => r.enabled)
      .map(r => r.plugin);
  }
  
  /**
   * Get all plugin components
   */
  getComponents(): Map<string, ComponentSchema> {
    return new Map(this.registry.components);
  }
  
  /**
   * Get all plugin tokens
   */
  getTokens(): TokenRegistry {
    return { ...this.registry.tokens };
  }
  
  /**
   * Execute a hook on all enabled plugins
   */
  async executeHook<H extends keyof NonNullable<IntentPlugin['hooks']>>(
    hookName: H,
    data: Parameters<NonNullable<NonNullable<IntentPlugin['hooks']>[H]>>[0],
    config?: DesignSystemConfig
  ): Promise<typeof data> {
    let result = data;
    
    for (const pluginName of this.registry.order) {
      const registration = this.registry.plugins.get(pluginName);
      if (!registration || !registration.enabled) continue;
      
      const hook = registration.plugin.hooks?.[hookName] as (
        data: typeof result,
        context: PluginContext
      ) => typeof result | void | Promise<typeof result | void>;
      
      if (hook) {
        const context = this.createContext(registration.options ?? {}, config);
        const hookResult = await hook(result, context);
        if (hookResult !== undefined) {
          result = hookResult;
        }
      }
    }
    
    return result;
  }
  
  /**
   * Register a custom validator
   */
  registerValidator(name: string, validator: CustomValidator): void {
    this.validators.set(name, validator);
  }
  
  /**
   * Unregister a custom validator
   */
  unregisterValidator(name: string): void {
    this.validators.delete(name);
  }
  
  /**
   * Execute all custom validators
   */
  async executeValidators(
    usages: ComponentUsage[],
    config?: DesignSystemConfig
  ): Promise<ValidationIssue[]> {
    const context = this.createContext({}, config);
    const issues: ValidationIssue[] = [];
    
    for (const usage of usages) {
      for (const [name, validator] of this.validators) {
        try {
          const result = await validator(usage, context);
          if (result) {
            if (Array.isArray(result)) {
              issues.push(...result);
            } else {
              issues.push(result);
            }
          }
        } catch (error) {
          issues.push({
            severity: 'error',
            code: 'VALIDATOR_ERROR',
            message: `Validator "${name}" failed: ${error instanceof Error ? error.message : String(error)}`,
            path: `${usage.component}`,
          });
        }
      }
    }
    
    return issues;
  }
  
  /**
   * Register a custom generator
   */
  registerGenerator(name: string, generator: CustomGenerator): void {
    this.generators.set(name, generator);
  }
  
  /**
   * Unregister a custom generator
   */
  unregisterGenerator(name: string): void {
    this.generators.delete(name);
  }
  
  /**
   * Execute a custom generator
   */
  async executeGenerator(
    name: string,
    component: ComponentSchema,
    config?: DesignSystemConfig
  ): Promise<string | CompiledStyles | undefined> {
    const generator = this.generators.get(name);
    if (!generator) return undefined;
    
    const context = this.createContext({}, config);
    return await generator(component, context);
  }
  
  /**
   * Clear all plugins and state
   */
  clear(): void {
    this.registry = {
      plugins: new Map(),
      tokens: {},
      components: new Map(),
      order: [],
    };
    this.validators.clear();
    this.generators.clear();
    this.issues = [];
  }
  
  // ============================================================================
  // Private Methods
  // ============================================================================
  
  private mergeTokens(tokens: Partial<TokenRegistry>): void {
    for (const [category, values] of Object.entries(tokens)) {
      if (!this.registry.tokens[category as keyof TokenRegistry]) {
        this.registry.tokens[category as keyof TokenRegistry] = {};
      }
      Object.assign(
        this.registry.tokens[category as keyof TokenRegistry]!,
        values
      );
    }
  }
  
  private rebuildTokens(): void {
    this.registry.tokens = {};
    for (const registration of this.registry.plugins.values()) {
      if (registration.enabled && registration.plugin.tokens) {
        this.mergeTokens(registration.plugin.tokens);
      }
    }
  }
  
  private createContext(
    options: Record<string, unknown>,
    config?: DesignSystemConfig
  ): PluginContext {
    return {
      config: config ?? ({} as DesignSystemConfig),
      tokens: this.registry.tokens,
      components: this.registry.components,
      options,
      utils: {
        resolveToken: (category, name) => {
          const cat = this.registry.tokens[category as keyof TokenRegistry];
          return cat?.[name];
        },
        addIssue: (issue) => {
          this.issues.push(issue);
        },
        log: (message, ...args) => {
          console.log(`[Intent Plugin] ${message}`, ...args);
        },
      },
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let globalPluginManager: PluginManager | undefined;

/**
 * Get the global plugin manager instance
 */
export function getPluginManager(): PluginManager {
  if (!globalPluginManager) {
    globalPluginManager = new PluginManager();
  }
  return globalPluginManager;
}

/**
 * Reset the global plugin manager (useful for testing)
 */
export function resetPluginManager(): void {
  globalPluginManager = undefined;
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Register a plugin globally
 */
export function usePlugin(plugin: IntentPlugin, options?: Record<string, unknown>): void {
  getPluginManager().register(plugin, options);
}

/**
 * Check if a plugin is registered
 */
export function hasPlugin(pluginName: string): boolean {
  return getPluginManager().has(pluginName);
}
