/**
 * Intent Core
 * 
 * Schema-first, AI-native styling framework core.
 * 
 * @example
 * ```ts
 * import { defineSystem, defineComponent, prop, when } from 'intent-core';
 * 
 * const designSystem = defineSystem({
 *   name: 'MyDesignSystem',
 *   tokens: {
 *     color: {
 *       'brand-primary': '#3B82F6',
 *       'brand-secondary': '#64748B',
 *     },
 *   },
 *   components: {
 *     Button: defineComponent({
 *       name: 'Button',
 *       properties: {
 *         importance: prop.enum(['primary', 'secondary'], { required: true }),
 *         size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
 *       },
 *       constraints: [
 *         when({ importance: 'ghost' }).forbid(['disabled']),
 *       ],
 *       mappings: {
 *         'importance=primary': { background: 'brand-primary' },
 *       },
 *     }),
 *   },
 * });
 * ```
 */

// Schema Definition
export {
  defineSystem,
  defineComponent,
  prop,
  when,
  forbid,
  require,
} from './schema/define.js';

// Validation
export {
  validateSchema,
  validateUsage,
  validateAllUsages,
} from './validator/index.js';
export {
  validateConstraints,
  generateValidCombinations,
  suggestValidAlternatives,
} from './validator/constraints.js';

// CSS Generation
export {
  compileComponent,
  compileSystem,
  generateCSSVariables,
  generateDarkModeVariables,
} from './generator/css.js';

// Type Generation
export {
  generateComponentTypes,
  generateTokenTypes,
  generateSystemTypes,
  generateRuntimeTypes,
} from './generator/types.js';

// AI Manifest
export {
  generateAIManifest,
  generateAIPrompt,
} from './generator/ai-manifest.js';

// Parser
export {
  parseFile,
  parseFiles,
  parseSourceFile,
} from './compiler/parser.js';

// Types
export type {
  // Core types
  TokenValue,
  TokenCategory,
  TokenRegistry,
  PropertyType,
  EnumProperty,
  BooleanProperty,
  StringProperty,
  NumberProperty,
  PropertyDefinition,
  PropertySet,
  
  // Constraint types
  ConstraintOperator,
  ConstraintCondition,
  ConstraintAction,
  Constraint,
  
  // Visual mapping types
  CSSProperty,
  TokenReference,
  StyleValue,
  VisualMapping,
  ConditionalMapping,
  
  // Schema types
  ComponentSchema,
  DesignSystemConfig,
  DesignSystem,
  
  // Validation types
  ValidationSeverity,
  ValidationIssue,
  ValidationResult,
  ComponentUsage,
  
  // Compilation types
  CompiledStyles,
  ComponentCompilation,
  CompilationOutput,
  
  // AI types
  ComponentSchemaForAI,
  AIManifest,
} from './types/index.js';

// Parser types
export type {
  ParseOptions,
  ParsedResult,
  BatchParseResult,
} from './compiler/parser.js';

// Validator types
export type {
  ValidatorOptions,
  UsageValidationContext,
  BatchUsage,
} from './validator/index.js';

// Plugin System
export {
  // Plugin registry
  PluginManager,
  getPluginManager,
  resetPluginManager,
  usePlugin,
  hasPlugin,
  definePlugin,
  definePreset,
  
  // Theme system
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
} from './plugin/index.js';

export type {
  IntentPlugin,
  PluginContext,
  Theme,
  ResolvedTheme,
} from './plugin/types.js';

// Source Maps
export {
  SourceMapBuilder,
  createComponentSourceMap,
  createInlineSourceMapComment,
  generateDebugReport,
} from './sourcemap/index.js';

export type {
  SourceMapping,
  ComponentSourceMap,
  CSSRuleDebugInfo,
  CompilationTrace,
  SourceMapOptions,
  CompilationSourceMap,
} from './sourcemap/types.js';

// Benchmarks
export {
  benchmarkIntentSystem,
  benchmarkIntentComponent,
  benchmarkTailwind,
  analyzeBundle,
  compareBundleSizes,
  runBenchmarks,
  formatBenchmarkReport,
  printBenchmarkResults,
  // Dashboard
  createDashboardConfig,
  loadSnapshots,
  saveSnapshots,
  addSnapshot,
  getLatestSnapshot,
  calculateTrend,
  generateRecommendations,
  generateReport,
  formatDashboardReport,
  generateHTMLDashboard,
  printDashboard,
  saveHTMLDashboard,
} from './benchmarks/index.js';

export type {
  BenchmarkOptions,
  BenchmarkResult,
  BenchmarkSuite,
  BundleAnalysis,
  // Dashboard types
  SizeSnapshot,
  DashboardConfig,
  SizeTrend,
  DashboardReport,
} from './benchmarks/index.js';

// Component Schema Collections
export {
  LayoutSchemas,
} from './schema/layout-components.js';

export {
  TypographySchemas,
} from './schema/typography-components.js';

export {
  FormSchemas,
} from './schema/form-components.js';

export {
  FeedbackSchemas,
} from './schema/feedback-components.js';

export {
  OverlaySchemas,
} from './schema/overlay-components.js';

export {
  NavigationSchemas,
} from './schema/navigation-components.js';

export {
  DataDisplaySchemas,
} from './schema/data-components.js';

// Default Theme
export {
  defaultTheme,
  generateThemeCSS,
} from './theme/default-theme.js';

// Version
export const VERSION = '1.0.0';
