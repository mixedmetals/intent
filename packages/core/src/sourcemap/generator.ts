// ============================================================================
// Source Map Generator
// ============================================================================

import type {
  SourceMapping,
  ComponentSourceMap,
  CSSRuleDebugInfo,
  CompilationTrace,
  SourceMapOptions,
  CompilationSourceMap,
} from './types.js';
import type { ComponentSchema, VisualMapping } from '../types/index.js';

// ============================================================================
// VLQ Encoding
// ============================================================================

const VLQ_BASE_SHIFT = 5;
const VLQ_BASE = 1 << VLQ_BASE_SHIFT;
const VLQ_BASE_MASK = VLQ_BASE - 1;
const VLQ_CONTINUATION_BIT = VLQ_BASE;

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function toVLQ(value: number): string {
  let vlq = value < 0 ? ((-value) << 1) + 1 : value << 1;
  let result = '';
  
  do {
    let digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      digit |= VLQ_CONTINUATION_BIT;
    }
    result += BASE64_CHARS[digit];
  } while (vlq > 0);
  
  return result;
}

// ============================================================================
// Source Map Builder
// ============================================================================

export class SourceMapBuilder {
  private mappings: SourceMapping[] = [];
  private sources: string[] = [];
  private sourcesContent: (string | null)[] = [];
  private names: string[] = [];
  private trace: CompilationTrace[] = [];
  private debugInfo: CSSRuleDebugInfo[] = [];
  private generatedLine = 1;
  private generatedColumn = 0;
  private componentName = '';
  private options: SourceMapOptions;
  
  constructor(options: SourceMapOptions = {}) {
    this.options = {
      includeSources: false,
      sourceRoot: '',
      inline: false,
      ...options,
    };
  }
  
  /**
   * Start tracking a component
   */
  startComponent(name: string, sourceFile?: string): void {
    this.componentName = name;
    
    if (sourceFile && !this.sources.includes(sourceFile)) {
      this.sources.push(sourceFile);
    }
  }
  
  /**
   * Add a source mapping
   */
  addMapping(
    generatedLine: number,
    generatedColumn: number,
    source: string,
    sourceLine: number,
    sourceColumn: number,
    name?: string
  ): void {
    if (!this.sources.includes(source)) {
      this.sources.push(source);
    }
    
    if (name && !this.names.includes(name)) {
      this.names.push(name);
    }
    
    this.mappings.push({
      generatedLine,
      generatedColumn,
      source,
      sourceLine,
      sourceColumn,
      name,
    });
  }
  
  /**
   * Track CSS generation from schema mapping
   */
  trackCSSGeneration(
    selector: string,
    declarations: Array<{ property: string; value: string }>,
    source: {
      component: string;
      property: string;
      value: string;
      condition?: string;
    }
  ): void {
    const line = this.generatedLine;
    const column = this.generatedColumn;
    
    // Track debug info for each declaration
    for (const decl of declarations) {
      this.debugInfo.push({
        selector,
        property: decl.property,
        value: decl.value,
        source: {
          component: source.component,
          property: source.property,
          value: source.value,
          condition: source.condition,
        },
        line,
        column,
      });
    }
    
    // Add trace entry
    this.trace.push({
      timestamp: Date.now(),
      component: source.component,
      property: source.property,
      value: source.value,
      generatedSelector: selector,
      generatedDeclarations: declarations,
    });
    
    // Update position tracking
    this.generatedLine += 1; // Each rule is roughly one line
    this.generatedColumn = 0;
  }
  
  /**
   * Track property-to-CSS mapping
   */
  trackPropertyMapping(
    component: string,
    property: string,
    value: string,
    generatedSelector: string,
    generatedCSS: string
  ): void {
    this.trace.push({
      timestamp: Date.now(),
      component,
      property,
      value,
      generatedSelector,
      generatedDeclarations: this.parseDeclarations(generatedCSS),
    });
  }
  
  /**
   * Build the source map
   */
  build(): ComponentSourceMap {
    return {
      component: this.componentName,
      version: 3,
      sources: this.sources,
      sourcesContent: this.options.includeSources ? this.sourcesContent : undefined,
      names: this.names,
      mappings: this.encodeMappings(),
      sourceRoot: this.options.sourceRoot || undefined,
    };
  }
  
  /**
   * Build full compilation source map
   */
  buildFull(): CompilationSourceMap {
    return {
      version: '3',
      timestamp: Date.now(),
      components: new Map([[this.componentName, this.build()]]),
      debugInfo: this.debugInfo,
      trace: this.trace,
    };
  }
  
  /**
   * Generate inline source map as data URL
   */
  toDataUrl(): string {
    const map = this.build();
    const json = JSON.stringify(map);
    const base64 = Buffer.from(json).toString('base64');
    return `data:application/json;base64,${base64}`;
  }
  
  /**
   * Get debug information for a CSS line
   */
  getDebugInfo(line: number, column?: number): CSSRuleDebugInfo | undefined {
    return this.debugInfo.find(
      info => info.line === line && (column === undefined || info.column === column)
    );
  }
  
  /**
   * Get all debug info for a component
   */
  getComponentDebugInfo(component: string): CSSRuleDebugInfo[] {
    return this.debugInfo.filter(info => info.source.component === component);
  }
  
  /**
   * Get compilation trace
   */
  getTrace(): CompilationTrace[] {
    return [...this.trace];
  }
  
  // ============================================================================
  // Private Methods
  // ============================================================================
  
  private encodeMappings(): string {
    if (this.mappings.length === 0) {
      return '';
    }
    
    // Sort mappings by generated position
    const sorted = [...this.mappings].sort((a, b) => {
      if (a.generatedLine !== b.generatedLine) {
        return a.generatedLine - b.generatedLine;
      }
      return a.generatedColumn - b.generatedColumn;
    });
    
    const result: string[] = [];
    let previousGeneratedLine = 1;
    let previousGeneratedColumn = 0;
    let previousSource = 0;
    let previousSourceLine = 0;
    let previousSourceColumn = 0;
    let previousName = 0;
    
    for (const mapping of sorted) {
      // Start new line if needed
      while (previousGeneratedLine < mapping.generatedLine) {
        result.push(';');
        previousGeneratedLine++;
        previousGeneratedColumn = 0;
      }
      
      if (result.length > 0 && result[result.length - 1] !== ';') {
        result.push(',');
      }
      
      // Encode generated column
      result.push(toVLQ(mapping.generatedColumn - previousGeneratedColumn));
      previousGeneratedColumn = mapping.generatedColumn;
      
      // Encode source
      const sourceIndex = this.sources.indexOf(mapping.source);
      result.push(toVLQ(sourceIndex - previousSource));
      previousSource = sourceIndex;
      
      // Encode source line
      result.push(toVLQ(mapping.sourceLine - previousSourceLine));
      previousSourceLine = mapping.sourceLine;
      
      // Encode source column
      result.push(toVLQ(mapping.sourceColumn - previousSourceColumn));
      previousSourceColumn = mapping.sourceColumn;
      
      // Encode name if present
      if (mapping.name !== undefined) {
        const nameIndex = this.names.indexOf(mapping.name);
        result.push(toVLQ(nameIndex - previousName));
        previousName = nameIndex;
      }
    }
    
    return result.join('');
  }
  
  private parseDeclarations(css: string): Array<{ property: string; value: string }> {
    const declarations: Array<{ property: string; value: string }> = [];
    const matches = css.matchAll(/([\w-]+)\s*:\s*([^;]+)/g);
    
    for (const match of matches) {
      declarations.push({
        property: match[1].trim(),
        value: match[2].trim(),
      });
    }
    
    return declarations;
  }
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Create a source map for a component compilation
 */
export function createComponentSourceMap(
  component: ComponentSchema,
  options?: SourceMapOptions
): SourceMapBuilder {
  const builder = new SourceMapBuilder(options);
  builder.startComponent(component.name);
  return builder;
}

/**
 * Create an inline source map comment for CSS
 */
export function createInlineSourceMapComment(sourceMap: ComponentSourceMap): string {
  const json = JSON.stringify(sourceMap);
  const base64 = Buffer.from(json).toString('base64');
  return `/*# sourceMappingURL=data:application/json;base64,${base64} */`;
}

/**
 * Generate a debug report from compilation trace
 */
export function generateDebugReport(trace: CompilationTrace[]): string {
  const lines: string[] = ['# Intent Compilation Debug Report\n'];
  
  const grouped = groupBy(trace, t => t.component);
  
  for (const [component, entries] of grouped) {
    lines.push(`## Component: ${component}\n`);
    
    for (const entry of entries) {
      lines.push(`### ${entry.property} = "${entry.value}"`);
      lines.push(`- Selector: \`${entry.generatedSelector}\``);
      lines.push(`- Generated CSS:`);
      
      for (const decl of entry.generatedDeclarations) {
        lines.push(`  - ${decl.property}: ${decl.value}`);
      }
      
      lines.push('');
    }
  }
  
  return lines.join('\n');
}

// ============================================================================
// Utilities
// ============================================================================

function groupBy<T, K>(array: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const result = new Map<K, T[]>();
  
  for (const item of array) {
    const key = keyFn(item);
    const group = result.get(key) || [];
    group.push(item);
    result.set(key, group);
  }
  
  return result;
}
