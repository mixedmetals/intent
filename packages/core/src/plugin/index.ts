// ============================================================================
// Plugin System
// ============================================================================

/**
 * Intent Plugin System
 * 
 * Allows third-party libraries to extend Intent with:
 * - Custom components
 * - Theme tokens
 * - Build pipeline hooks
 * - Custom validators
 * - Custom generators
 * 
 * @example
 * ```ts
 * import { usePlugin, definePlugin } from 'intent-core/plugin';
 * 
 * // Define a plugin
 * const myPlugin = definePlugin({
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   components: {
 *     Carousel: defineComponent({...}),
 *   },
 *   tokens: {
 *     color: { 'brand-accent': '#FF6B6B' },
 *   },
 * });
 * 
 * // Register the plugin
 * usePlugin(myPlugin);
 * ```
 */

// Types
export type {
  IntentPlugin,
  PluginContext,
  PluginRegistration,
  PluginRegistry,
  Theme,
  ResolvedTheme,
  CustomValidator,
  CustomGenerator,
  TokensHook,
  ComponentHook,
  BeforeValidateHook,
  AfterValidateHook,
  BeforeGenerateHook,
  GenerateComponentHook,
  AfterGenerateHook,
} from './types.js';

// Plugin Registry
export {
  PluginManager,
  getPluginManager,
  resetPluginManager,
  usePlugin,
  hasPlugin,
} from './registry.js';

// Theme System
export {
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

// ============================================================================
// Helper Functions
// ============================================================================

import type { IntentPlugin } from './types.js';

/**
 * Define a plugin with type checking
 * 
 * @example
 * ```ts
 * const plugin = definePlugin({
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   components: { ... },
 *   hooks: {
 *     beforeGenerate: (components, context) => {
 *       // Custom logic
 *       return components;
 *     },
 *   },
 * });
 * ```
 */
export function definePlugin(plugin: IntentPlugin): IntentPlugin {
  // Validate required fields
  if (!plugin.name) {
    throw new Error('Plugin must have a name');
  }
  
  if (!plugin.version) {
    throw new Error('Plugin must have a version');
  }
  
  // Validate version format (semver)
  const semverRegex = /^\d+\.\d+\.\d+(-[\w.-]+)?(\+[\w.-]+)?$/;
  if (!semverRegex.test(plugin.version)) {
    throw new Error(`Invalid version format: ${plugin.version}. Expected semver (e.g., 1.0.0)`);
  }
  
  return plugin;
}

/**
 * Define a preset - a pre-configured plugin with common settings
 * 
 * @example
 * ```ts
 * const preset = definePreset({
 *   name: 'modern',
 *   tokens: { ... },
 *   components: { ... },
 * });
 * ```
 */
export function definePreset(config: {
  name: string;
  tokens?: IntentPlugin['tokens'];
  darkTokens?: IntentPlugin['darkTokens'];
  components?: IntentPlugin['components'];
  settings?: { cssPrefix?: string };
}): IntentPlugin {
  return definePlugin({
    name: `preset-${config.name}`,
    version: '1.0.0',
    description: `Preset: ${config.name}`,
    tokens: config.tokens,
    darkTokens: config.darkTokens,
    components: config.components,
  });
}
