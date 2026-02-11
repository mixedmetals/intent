// ============================================================================
// Performance Benchmarks
// ============================================================================

/**
 * Intent Performance Benchmarks
 * 
 * Compare Intent compilation performance against Tailwind CSS
 * and track bundle size metrics.
 * 
 * @example
 * ```ts
 * import { runBenchmarks } from 'intent-core/benchmarks';
 * 
 * const results = await runBenchmarks({
 *   iterations: 100,
 *   warmups: 10,
 * });
 * 
 * console.log(results.summary);
 * ```
 */

import { compileSystem, compileComponent } from '../generator/css.js';
import type { DesignSystemConfig, ComponentSchema } from '../types/index.js';

// ============================================================================
// Types
// ============================================================================

export interface BenchmarkOptions {
  /** Number of iterations to run */
  iterations?: number;
  /** Number of warmup iterations */
  warmups?: number;
  /** Whether to include Tailwind comparison */
  compareWithTailwind?: boolean;
  /** Verbose output */
  verbose?: boolean;
}

export interface BenchmarkResult {
  /** Test name */
  name: string;
  /** Average time in milliseconds */
  avgTime: number;
  /** Minimum time */
  minTime: number;
  /** Maximum time */
  maxTime: number;
  /** Standard deviation */
  stdDev: number;
  /** Number of iterations */
  iterations: number;
  /** Output size in bytes */
  outputSize: number;
  /** Throughput (ops/sec) */
  throughput: number;
}

export interface BenchmarkSuite {
  /** Suite name */
  name: string;
  /** Individual benchmark results */
  results: BenchmarkResult[];
  /** Comparison with Tailwind (if available) */
  tailwindComparison?: {
    intent: number;
    tailwind: number;
    ratio: number;
  };
  /** Timestamp */
  timestamp: number;
  /** Environment info */
  environment: {
    nodeVersion: string;
    platform: string;
    cpuCount: number;
  };
}

export interface BundleAnalysis {
  /** Raw CSS size */
  rawSize: number;
  /** Minified CSS size */
  minifiedSize: number;
  /** Gzipped size */
  gzippedSize: number;
  /** Number of CSS rules */
  ruleCount: number;
  /** Number of CSS selectors */
  selectorCount: number;
  /** Number of CSS variables */
  variableCount: number;
}

// ============================================================================
// Timing Utilities
// ============================================================================

/**
 * High-resolution timer
 */
function now(): number {
  return performance.now();
}

/**
 * Measure function execution time
 */
async function measure<T>(
  fn: () => T | Promise<T>,
  iterations: number,
  warmups: number
): Promise<{ times: number[]; result: T }> {
  // Warmup
  for (let i = 0; i < warmups; i++) {
    await fn();
  }
  
  // Actual measurements
  const times: number[] = [];
  let lastResult: T;
  
  for (let i = 0; i < iterations; i++) {
    const start = now();
    lastResult = await fn();
    const end = now();
    times.push(end - start);
  }
  
  return { times, result: lastResult! };
}

/**
 * Calculate statistics from timing data
 * @internal Exported for testing
 */
export function calculateStats(times: number[]): { avg: number; min: number; max: number; stdDev: number } {
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);
  
  // Standard deviation
  const variance = times.reduce((sum, time) => sum + Math.pow(time - avg, 2), 0) / times.length;
  const stdDev = Math.sqrt(variance);
  
  return { avg, min, max, stdDev };
}

// ============================================================================
// Benchmarks
// ============================================================================

/**
 * Benchmark Intent system compilation
 */
export async function benchmarkIntentSystem(
  config: DesignSystemConfig,
  options: BenchmarkOptions = {}
): Promise<BenchmarkResult> {
  const { iterations = 100, warmups = 10 } = options;
  
  const { times, result } = await measure(
    () => compileSystem(config),
    iterations,
    warmups
  );
  
  const stats = calculateStats(times);
  
  return {
    name: 'Intent System Compilation',
    avgTime: stats.avg,
    minTime: stats.min,
    maxTime: stats.max,
    stdDev: stats.stdDev,
    iterations,
    outputSize: Buffer.byteLength(result, 'utf8'),
    throughput: 1000 / stats.avg,
  };
}

/**
 * Benchmark Intent component compilation
 */
export async function benchmarkIntentComponent(
  component: ComponentSchema,
  config: DesignSystemConfig,
  options: BenchmarkOptions = {}
): Promise<BenchmarkResult> {
  const { iterations = 1000, warmups = 100 } = options;
  
  const { times, result } = await measure(
    () => compileComponent(component, config),
    iterations,
    warmups
  );
  
  const stats = calculateStats(times);
  
  return {
    name: `Intent Component: ${component.name}`,
    avgTime: stats.avg,
    minTime: stats.min,
    maxTime: stats.max,
    stdDev: stats.stdDev,
    iterations,
    outputSize: Buffer.byteLength(result.css, 'utf8'),
    throughput: 1000 / stats.avg,
  };
}

/**
 * Benchmark Tailwind compilation (simulated)
 * 
 * Note: This is a simulated benchmark. For actual comparison,
 * install Tailwind and use its CLI directly.
 */
export async function benchmarkTailwind(
  cssInput: string,
  options: BenchmarkOptions = {}
): Promise<BenchmarkResult> {
  const { iterations = 100, warmups = 10 } = options;
  
  // Simulated Tailwind compilation
  // In production, call Tailwind's PostCSS plugin
  const simulateTailwind = () => {
    // Parse CSS
    const rules = cssInput.match(/[^{}]+\{[^}]*\}/g) || [];
    
    // Simulate PurgeCSS analysis
    const content = ['button', 'div', 'span', 'input'];
    const usedRules = rules.filter(rule => {
      return content.some(cls => rule.includes(cls));
    });
    
    // Generate output
    return usedRules.join('\n');
  };
  
  const { times, result } = await measure(
    simulateTailwind,
    iterations,
    warmups
  );
  
  const stats = calculateStats(times);
  
  return {
    name: 'Tailwind Compilation (simulated)',
    avgTime: stats.avg,
    minTime: stats.min,
    maxTime: stats.max,
    stdDev: stats.stdDev,
    iterations,
    outputSize: Buffer.byteLength(result, 'utf8'),
    throughput: 1000 / stats.avg,
  };
}

// ============================================================================
// Bundle Analysis
// ============================================================================

/**
 * Analyze CSS bundle
 */
export function analyzeBundle(css: string): BundleAnalysis {
  // Count rules - match selector groups and declarations
  const rules = css.match(/[^{}]+\{[^}]*\}/g) || [];
  
  // Count selectors - extract only the selector part before {
  const selectorCount = rules.reduce((count, rule) => {
    const selectorPart = rule.split('{')[0].trim();
    return count + selectorPart.split(',').length;
  }, 0);
  
  // Count CSS variables
  const variables = css.match(/--[\w-]+:/g) || [];
  
  // Minified size (simple minification)
  const minified = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim();
  
  // Simulated gzip (actual gzip requires zlib)
  const gzipped = Math.round(minified.length * 0.3); // Rough estimate
  
  return {
    rawSize: Buffer.byteLength(css, 'utf8'),
    minifiedSize: Buffer.byteLength(minified, 'utf8'),
    gzippedSize: gzipped,
    ruleCount: rules.length,
    selectorCount,
    variableCount: variables.length,
  };
}

/**
 * Compare Intent vs Tailwind bundle sizes
 */
export function compareBundleSizes(
  intentCSS: string,
  tailwindCSS: string
): {
  intent: BundleAnalysis;
  tailwind: BundleAnalysis;
  savings: {
    raw: number;
    minified: number;
    gzipped: number;
    percentage: number;
  };
} {
  const intent = analyzeBundle(intentCSS);
  const tailwind = analyzeBundle(tailwindCSS);
  
  const savings = {
    raw: tailwind.rawSize - intent.rawSize,
    minified: tailwind.minifiedSize - intent.minifiedSize,
    gzipped: tailwind.gzippedSize - intent.gzippedSize,
    percentage: ((tailwind.gzippedSize - intent.gzippedSize) / tailwind.gzippedSize) * 100,
  };
  
  return { intent, tailwind, savings };
}

// ============================================================================
// Full Suite
// ============================================================================

/**
 * Run full benchmark suite
 */
export async function runBenchmarks(
  config: DesignSystemConfig,
  options: BenchmarkOptions = {}
): Promise<BenchmarkSuite> {
  const results: BenchmarkResult[] = [];
  
  // System compilation benchmark
  const systemResult = await benchmarkIntentSystem(config, options);
  results.push(systemResult);
  
  // Component benchmarks
  for (const [name, component] of Object.entries(config.components)) {
    const result = await benchmarkIntentComponent(component, config, options);
    results.push(result);
  }
  
  // Tailwind comparison (if requested)
  let tailwindComparison: BenchmarkSuite['tailwindComparison'];
  
  if (options.compareWithTailwind) {
    const intentCSS = compileSystem(config);
    const tailwindResult = await benchmarkTailwind(intentCSS, options);
    
    tailwindComparison = {
      intent: systemResult.avgTime,
      tailwind: tailwindResult.avgTime,
      ratio: systemResult.avgTime / tailwindResult.avgTime,
    };
    
    results.push(tailwindResult);
  }
  
  return {
    name: 'Intent Framework Benchmarks',
    results,
    tailwindComparison,
    timestamp: Date.now(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      cpuCount: navigator?.hardwareConcurrency || require('os').cpus().length,
    },
  };
}

// ============================================================================
// Reporting
// ============================================================================

/**
 * Format benchmark results as markdown
 */
export function formatBenchmarkReport(suite: BenchmarkSuite): string {
  const lines: string[] = [];
  
  lines.push('# Intent Framework Benchmark Report\n');
  lines.push(`**Date:** ${new Date(suite.timestamp).toISOString()}`);
  lines.push(`**Node:** ${suite.environment.nodeVersion}`);
  lines.push(`**Platform:** ${suite.environment.platform}`);
  lines.push(`**CPUs:** ${suite.environment.cpuCount}\n`);
  
  // Summary table
  lines.push('## Results\n');
  lines.push('| Test | Avg Time | Min Time | Max Time | Throughput | Output Size |');
  lines.push('|------|----------|----------|----------|------------|-------------|');
  
  for (const result of suite.results) {
    lines.push(
      `| ${result.name} | ${result.avgTime.toFixed(2)}ms | ` +
      `${result.minTime.toFixed(2)}ms | ${result.maxTime.toFixed(2)}ms | ` +
      `${result.throughput.toFixed(0)} ops/s | ${formatBytes(result.outputSize)} |`
    );
  }
  
  // Tailwind comparison
  if (suite.tailwindComparison) {
    lines.push('\n## Tailwind Comparison\n');
    lines.push(`- Intent: ${suite.tailwindComparison.intent.toFixed(2)}ms`);
    lines.push(`- Tailwind: ${suite.tailwindComparison.tailwind.toFixed(2)}ms`);
    lines.push(`- Ratio: ${suite.tailwindComparison.ratio.toFixed(2)}x`);
    
    if (suite.tailwindComparison.ratio < 1) {
      lines.push('\n✅ Intent is faster');
    } else {
      lines.push('\n⚠️ Tailwind is faster');
    }
  }
  
  return lines.join('\n');
}

/**
 * Format bytes as human-readable string
 * @internal Exported for testing
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Print benchmark results to console
 */
export function printBenchmarkResults(suite: BenchmarkSuite): void {
  console.log(formatBenchmarkReport(suite));
}
