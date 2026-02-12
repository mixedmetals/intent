// ============================================================================
// Playwright Integration for Visual Regression
// ============================================================================

import type { Page, TestInfo } from '@playwright/test';
import type { ComponentSchema, DesignSystemConfig } from '../types/index.js';
import type { VisualRegressionConfig, VisualTestResult } from './visual-regression.js';
import {
  generateVisualTestCases,
  getBaselinePath,
  getScreenshotPath,
  getDiffPath,
  defaultVisualRegressionConfig,
  createVisualRegressionConfig,
} from './visual-regression.js';
import { compileSystem } from '../generator/css.js';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// ============================================================================
// Playwright Test Helper
// ============================================================================

export interface PlaywrightVisualTestOptions {
  /** Component to test */
  component: ComponentSchema;
  /** Design system config */
  config: DesignSystemConfig;
  /** Prop combinations to test (auto-generated if not provided) */
  combinations?: Array<Record<string, string>>;
  /** Test variations: light, dark, or both */
  modes?: Array<'light' | 'dark'>;
  /** Custom viewport */
  viewport?: { width: number; height: number };
  /** Delay before screenshot */
  delay?: number;
}

/**
 * Run visual regression tests with Playwright
 * 
 * @example
 * ```ts
 * import { test } from '@playwright/test';
 * import { intentVisualTest } from 'intent-core/testing/playwright';
 * import { buttonSchema, myDesignSystem } from './design-system';
 *
 * test('Button visual regression', async ({ page }, testInfo) => {
 *   await intentVisualTest(page, testInfo, {
 *     component: buttonSchema,
 *     config: myDesignSystem,
 *   });
 * });
 * ```
 */
export async function intentVisualTest(
  page: Page,
  testInfo: TestInfo,
  options: PlaywrightVisualTestOptions
): Promise<VisualTestResult[]> {
  const vrConfig = createVisualRegressionConfig({
    screenshotDir: `${testInfo.project.outputDir}/screenshots`,
    baselineDir: './test/baselines',
    diffDir: `${testInfo.project.outputDir}/diffs`,
  });
  
  const modes = options.modes || ['light'];
  const results: VisualTestResult[] = [];
  
  for (const mode of modes) {
    const testCases = generateVisualTestCases(
      options.component,
      options.config,
      {
        combinations: options.combinations,
        darkMode: mode === 'dark',
      }
    );
    
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
      
      // Generate paths
      const modeSuffix = mode === 'dark' ? '-dark' : '';
      const screenshotName = `${testCase.name}${modeSuffix}.png`;
      
      const screenshotPath = getScreenshotPath(
        vrConfig,
        options.component.name,
        screenshotName
      );
      
      const baselinePath = getBaselinePath(
        vrConfig,
        options.component.name,
        screenshotName
      );
      
      // Ensure directories exist
      ensureDir(dirname(screenshotPath));
      ensureDir(dirname(baselinePath));
      
      // Take screenshot
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
      });
      
      // Compare or create baseline
      let result: VisualTestResult;
      
      if (!existsSync(baselinePath)) {
        // No baseline exists, create one
        copyFile(screenshotPath, baselinePath);
        
        result = {
          component: options.component.name,
          combination: testCase.combination,
          screenshotPath,
          baselinePath,
          diffRatio: 0,
          passed: true,
        };
        
        console.log(`[Visual] Created baseline: ${baselinePath}`);
      } else {
        // Compare with baseline
        const baselineBuffer = readFileSync(baselinePath);
        const screenshotBuffer = readFileSync(screenshotPath);
        
        // Use Playwright's built-in comparison
        try {
          await expect(page.locator('body')).toHaveScreenshot(
            `${options.component.name}/${screenshotName}`,
            {
              threshold: vrConfig.threshold,
              maxDiffPixels: Math.round(
                viewport.width * viewport.height * vrConfig.threshold
              ),
            }
          );
          
          result = {
            component: options.component.name,
            combination: testCase.combination,
            screenshotPath,
            baselinePath,
            diffRatio: 0,
            passed: true,
          };
        } catch (error) {
          // Comparison failed
          const diffPath = getDiffPath(
            vrConfig,
            options.component.name,
            screenshotName
          );
          
          ensureDir(dirname(diffPath));
          
          result = {
            component: options.component.name,
            combination: testCase.combination,
            screenshotPath,
            baselinePath,
            diffPath,
            diffRatio: 1, // Playwright doesn't expose exact ratio
            passed: false,
          };
          
          console.log(`[Visual] Difference detected: ${screenshotName}`);
        }
      }
      
      results.push(result);
    }
  }
  
  return results;
}

// ============================================================================
// Snapshot Testing
// ============================================================================

/**
 * Test component CSS output matches snapshot
 */
export function testCSSSnapshot(
  component: ComponentSchema,
  config: DesignSystemConfig
): string {
  return compileSystem(config);
}

/**
 * Test component structure matches snapshot
 */
export function testComponentSnapshot(component: ComponentSchema): object {
  return {
    name: component.name,
    properties: component.properties,
    constraints: component.constraints,
    mappings: component.mappings,
  };
}

// ============================================================================
// A11y Testing
// ============================================================================

export interface A11yViolation {
  rule: string;
  target: string;
  message: string;
  severity: 'error' | 'warning';
}

/**
 * Run accessibility checks on a component
 * 
 * Basic checks without external dependencies.
 * For full axe-core integration, install @axe-core/playwright.
 */
export async function checkAccessibility(
  page: Page,
  component: ComponentSchema
): Promise<A11yViolation[]> {
  const violations: A11yViolation[] = [];
  
  // Check for required ARIA attributes
  const requiredAria: Record<string, string[]> = {
    Button: ['role'],
    Input: ['aria-label', 'aria-labelledby'],
    Alert: ['role'],
  };
  
  const required = requiredAria[component.name] || [];
  
  for (const attr of required) {
    const hasAttr = await page.locator(`[data-intent="${component.name.toLowerCase()}"]`)
      .getAttribute(attr)
      .then((v: string | null) => v !== null)
      .catch(() => false);
    
    if (!hasAttr) {
      violations.push({
        rule: 'aria-required',
        target: component.name,
        message: `Missing required ARIA attribute: ${attr}`,
        severity: 'error',
      });
    }
  }
  
  // Check color contrast (simplified)
  const bgColor = await page.evaluate(() => {
    const el = document.querySelector('[data-intent]');
    return el ? getComputedStyle(el).backgroundColor : null;
  });
  
  if (bgColor && !hasSufficientContrast(bgColor)) {
    violations.push({
      rule: 'color-contrast',
      target: component.name,
      message: 'Insufficient color contrast',
      severity: 'warning',
    });
  }
  
  return violations;
}

/**
 * Check if color has sufficient contrast (simplified)
 */
function hasSufficientContrast(color: string): boolean {
  // Parse RGB values
  const rgb = color.match(/\d+/g)?.map(Number);
  if (!rgb || rgb.length < 3) return true;
  
  // Calculate relative luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
  // Check contrast against white (simplified)
  const contrastWithWhite = (1 + 0.05) / (luminance + 0.05);
  
  return contrastWithWhite >= 4.5; // WCAG AA standard
}

// ============================================================================
// Utilities
// ============================================================================

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src: string, dest: string): void {
  ensureDir(dirname(dest));
  writeFileSync(dest, readFileSync(src));
}

// Playwright expect (will be available when used in Playwright tests)
declare const expect: any;
