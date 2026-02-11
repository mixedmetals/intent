// ============================================================================
// Source Map System
// ============================================================================

/**
 * Intent Source Map System
 * 
 * Maps generated CSS back to schema definitions for debugging.
 * 
 * @example
 * ```ts
 * import { compileComponent } from 'intent-core';
 * 
 * const result = compileComponent(schema, config, { sourceMap: true });
 * 
 * // Access source map
 * console.log(result.sourceMap);
 * 
 * // Access debug trace
 * console.log(result.trace);
 * ```
 */

// Types
export type {
  SourceMapping,
  ComponentSourceMap,
  CSSRuleDebugInfo,
  CompilationTrace,
  SourceMapOptions,
  CompilationSourceMap,
} from './types.js';

// Generator
export {
  SourceMapBuilder,
  createComponentSourceMap,
  createInlineSourceMapComment,
  generateDebugReport,
} from './generator.js';
