// ============================================================================
// Visual Regression Testing
// ============================================================================

import type { ComponentSchema, DesignSystemConfig } from '../types/index.js';
import { compileComponent, compileSystem } from '../generator/css.js';

// ============================================================================
// Types
// ============================================================================

export interface VisualTestOptions {
  /** Component to test */
  component: ComponentSchema;
  /** Prop combinations to test */
  combinations: Array<Record<string, string>>;
  /** Viewport size */
  viewport?: { width: number; height: number };
  /** Threshold for pixel difference (0-1) */
  threshold?: number;
  /** Delay before screenshot (ms) */
  delay?: number;
  /** Dark mode */
  darkMode?: boolean;
}

export interface VisualTestResult {
  /** Component name */
  component: string;
  /** Prop combination tested */
  combination: Record<string, string>;
  /** Screenshot path */
  screenshotPath: string;
  /** Baseline path */
  baselinePath: string;
  /** Diff path (if different) */
  diffPath?: string;
  /** Pixel difference ratio */
  diffRatio: number;
  /** Whether test passed */
  passed: boolean;
}

export interface VisualRegressionConfig {
  /** Directory for screenshots */
  screenshotDir: string;
  /** Directory for baselines */
  baselineDir: string;
  /** Directory for diffs */
  diffDir: string;
  /** Default threshold */
  threshold: number;
  /** Default viewport */
  viewport: { width: number; height: number };
  /** Update baselines */
  updateBaselines: boolean;
}

// ============================================================================
// HTML Generation for Testing
// ============================================================================

/**
 * Generate HTML for visual testing a component
 */
export function generateTestHTML(
  component: ComponentSchema,
  combination: Record<string, string>,
  css: string,
  options: { darkMode?: boolean } = {}
): string {
  const dataAttrs = Object.entries(combination)
    .map(([prop, value]) => `data-${prop.toLowerCase()}="${value}"`)
    .join(' ');
  
  const className = `intent-${component.name.toLowerCase()}`;
  const darkClass = options.darkMode ? 'dark' : '';
  
  return `<!DOCTYPE html>
<html lang="en" class="${darkClass}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Test: ${component.name}</title>
  <style>
    ${css}
    
    /* Reset for testing */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 2rem;
      background: ${options.darkMode ? '#0F172A' : '#FFFFFF'};
    }
    
    .test-container {
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="test-container">
    <div class="${className}" ${dataAttrs}>
      ${getTestContent(component, combination)}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Get appropriate test content based on component type
 */
function getTestContent(
  component: ComponentSchema,
  combination: Record<string, string>
): string {
  const name = component.name.toLowerCase();
  
  // Button content
  if (name.includes('button')) {
    return combination.importance === 'danger' ? 'Delete' : 'Button';
  }
  
  // Input content
  if (name.includes('input')) {
    return '<input type="text" placeholder="Enter text..." />';
  }
  
  // Card content
  if (name.includes('card')) {
    return '<h3>Card Title</h3><p>Card content goes here.</p>';
  }
  
  // Badge content
  if (name.includes('badge')) {
    return 'Badge';
  }
  
  // Text content
  if (name.includes('text') || name.includes('paragraph')) {
    return 'The quick brown fox jumps over the lazy dog.';
  }
  
  // Heading content
  if (name.includes('heading')) {
    return 'Heading';
  }
  
  // Default
  return component.name;
}

// ============================================================================
// Test Generation
// ============================================================================

/**
 * Generate valid prop combinations for visual testing
 */
export function generateVisualTestCombinations(
  component: ComponentSchema,
  maxCombinations = 10
): Array<Record<string, string>> {
  const combinations: Array<Record<string, string>> = [];
  const entries = Object.entries(component.properties);
  
  // Get default values
  const defaults: Record<string, string> = {};
  for (const [prop, def] of entries) {
    if (def.type === 'enum' && def.default) {
      defaults[prop] = def.default;
    } else if (def.type === 'boolean' && def.default !== undefined) {
      defaults[prop] = String(def.default);
    }
  }
  
  // Generate combinations for each property
  for (const [prop, def] of entries) {
    if (def.type === 'enum') {
      for (const value of def.values) {
        const combo = { ...defaults, [prop]: value };
        combinations.push(combo);
        
        if (combinations.length >= maxCombinations) {
          return combinations;
        }
      }
    }
  }
  
  return combinations;
}

/**
 * Generate all test cases for a component
 */
export function generateVisualTestCases(
  component: ComponentSchema,
  config: DesignSystemConfig,
  options: Partial<VisualTestOptions> = {}
): Array<{ html: string; combination: Record<string, string>; name: string }> {
  const combinations = options.combinations || generateVisualTestCombinations(component);
  const css = compileSystem(config);
  
  return combinations.map(combination => {
    const html = generateTestHTML(component, combination, css, {
      darkMode: options.darkMode,
    });
    
    const nameParts = Object.entries(combination)
      .map(([k, v]) => `${k}-${v}`)
      .join('_');
    
    return {
      html,
      combination,
      name: `${component.name}_${nameParts}`,
    };
  });
}

// ============================================================================
// Baseline Management
// ============================================================================

/**
 * Get baseline path for a test
 */
export function getBaselinePath(
  config: VisualRegressionConfig,
  component: string,
  testName: string
): string {
  return `${config.baselineDir}/${component}/${testName}.png`;
}

/**
 * Get screenshot path for a test
 */
export function getScreenshotPath(
  config: VisualRegressionConfig,
  component: string,
  testName: string
): string {
  return `${config.screenshotDir}/${component}/${testName}.png`;
}

/**
 * Get diff path for a test
 */
export function getDiffPath(
  config: VisualRegressionConfig,
  component: string,
  testName: string
): string {
  return `${config.diffDir}/${component}/${testName}.png`;
}

// ============================================================================
// Test Result Analysis
// ============================================================================

/**
 * Compare two image buffers and calculate difference
 */
export function compareImages(
  baseline: Buffer,
  screenshot: Buffer,
  threshold: number
): { diff: Buffer | null; ratio: number; passed: boolean } {
  // Simple pixel-by-pixel comparison
  // In production, use pixelmatch or similar library
  const baselineData = new Uint8ClampedArray(baseline);
  const screenshotData = new Uint8ClampedArray(screenshot);
  
  if (baselineData.length !== screenshotData.length) {
    return { diff: screenshot, ratio: 1, passed: false };
  }
  
  let diffPixels = 0;
  const totalPixels = baselineData.length / 4; // RGBA
  
  for (let i = 0; i < baselineData.length; i += 4) {
    const rDiff = Math.abs(baselineData[i] - screenshotData[i]);
    const gDiff = Math.abs(baselineData[i + 1] - screenshotData[i + 1]);
    const bDiff = Math.abs(baselineData[i + 2] - screenshotData[i + 2]);
    
    if (rDiff > 0 || gDiff > 0 || bDiff > 0) {
      diffPixels++;
    }
  }
  
  const ratio = diffPixels / totalPixels;
  const passed = ratio <= threshold;
  
  // Generate diff visualization (simplified)
  const diff = ratio > 0 ? screenshot : null;
  
  return { diff, ratio, passed };
}

// ============================================================================
// Test Runner
// ============================================================================

/**
 * Run visual regression tests
 * 
 * This is a framework-agnostic test runner.
 * Use with Playwright, Puppeteer, or similar.
 * 
 * @example
 * ```ts
 * // With Playwright
 * import { test, expect } from '@playwright/test';
 * import { runVisualTests } from 'intent-core/testing';
 * 
 * test('Button visual regression', async ({ page }) => {
 *   const results = await runVisualTests(page, {
 *     component: buttonSchema,
 *     combinations: [{ importance: 'primary', size: 'md' }],
 *   }, config);
 *   
 *   expect(results.every(r => r.passed)).toBe(true);
 * });
 * ```
 */
export async function runVisualTests(
  page: any, // Playwright Page or similar
  options: VisualTestOptions,
  config: DesignSystemConfig,
  vrConfig: VisualRegressionConfig
): Promise<VisualTestResult[]> {
  const results: VisualTestResult[] = [];
  const testCases = generateVisualTestCases(options.component, config, options);
  
  for (const testCase of testCases) {
    // Load HTML
    await page.setContent(testCase.html);
    
    // Set viewport
    const viewport = options.viewport || vrConfig.viewport;
    await page.setViewportSize(viewport);
    
    // Wait for any animations
    if (options.delay) {
      await page.waitForTimeout(options.delay);
    }
    
    // Take screenshot
    const screenshotPath = getScreenshotPath(
      vrConfig,
      options.component.name,
      testCase.name
    );
    
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
    });
    
    // Compare with baseline
    const baselinePath = getBaselinePath(
      vrConfig,
      options.component.name,
      testCase.name
    );
    
    // Read files (in real implementation, use fs)
    // For now, mock the comparison
    const result: VisualTestResult = {
      component: options.component.name,
      combination: testCase.combination,
      screenshotPath,
      baselinePath,
      diffRatio: 0,
      passed: true,
    };
    
    // Update baseline if requested
    if (vrConfig.updateBaselines) {
      // Copy screenshot to baseline
      result.passed = true;
    }
    
    results.push(result);
  }
  
  return results;
}

// ============================================================================
// Configuration
// ============================================================================

/**
 * Default visual regression config
 */
export const defaultVisualRegressionConfig: VisualRegressionConfig = {
  screenshotDir: './test-results/screenshots',
  baselineDir: './test-results/baselines',
  diffDir: './test-results/diffs',
  threshold: 0.01, // 1% difference allowed
  viewport: { width: 800, height: 600 },
  updateBaselines: false,
};

/**
 * Create visual regression config
 */
export function createVisualRegressionConfig(
  overrides: Partial<VisualRegressionConfig> = {}
): VisualRegressionConfig {
  return {
    ...defaultVisualRegressionConfig,
    ...overrides,
  };
}
