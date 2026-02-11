// ============================================================================
// Source Map Types
// ============================================================================

/**
 * A mapping from generated CSS to source schema definition
 */
export interface SourceMapping {
  /** Generated CSS line number (1-based) */
  generatedLine: number;
  /** Generated CSS column number (1-based) */
  generatedColumn: number;
  /** Source file path */
  source: string;
  /** Source line number (1-based) */
  sourceLine: number;
  /** Source column number (1-based) */
  sourceColumn: number;
  /** Name of the symbol (e.g., property name) */
  name?: string;
}

/**
 * Source map for a compiled component
 */
export interface ComponentSourceMap {
  /** Component name */
  component: string;
  /** Version of the source map */
  version: 3;
  /** Source file path */
  sources: string[];
  /** Source content (optional, for inline source maps) */
  sourcesContent?: (string | null)[];
  /** Names referenced in the source */
  names: string[];
  /** Mappings in VLQ format */
  mappings: string;
  /** Source root URL */
  sourceRoot?: string;
  /** File this source map is for */
  file?: string;
}

/**
 * Debug info for a CSS rule
 */
export interface CSSRuleDebugInfo {
  /** CSS selector */
  selector: string;
  /** CSS property */
  property: string;
  /** CSS value */
  value: string;
  /** Source mapping */
  source: {
    /** Component name */
    component: string;
    /** Property that generated this rule */
    property: string;
    /** Value that generated this rule */
    value: string;
    /** Mapping condition (e.g., "importance=primary") */
    condition?: string;
  };
  /** Line in generated CSS */
  line: number;
  /** Column in generated CSS */
  column: number;
}

/**
 * Source map options
 */
export interface SourceMapOptions {
  /** Include source content in the map */
  includeSources?: boolean;
  /** Source root URL */
  sourceRoot?: string;
  /** Generate inline source map (data URL) */
  inline?: boolean;
}

/**
 * Compilation trace entry
 */
export interface CompilationTrace {
  /** Timestamp */
  timestamp: number;
  /** Component being compiled */
  component: string;
  /** Property being processed */
  property: string;
  /** Value being processed */
  value: string;
  /** Generated CSS selector */
  generatedSelector: string;
  /** Generated CSS declarations */
  generatedDeclarations: Array<{ property: string; value: string }>;
}

/**
 * Full source map data for a compilation
 */
export interface CompilationSourceMap {
  /** Version */
  version: string;
  /** Compilation timestamp */
  timestamp: number;
  /** Component source maps */
  components: Map<string, ComponentSourceMap>;
  /** Debug info for each CSS rule */
  debugInfo: CSSRuleDebugInfo[];
  /** Compilation trace */
  trace: CompilationTrace[];
}
