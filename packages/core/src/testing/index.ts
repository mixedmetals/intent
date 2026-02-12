// ============================================================================
// Testing Utilities
// ============================================================================

/**
 * Intent Testing Utilities
 * 
 * Visual regression testing, accessibility checks, and snapshot testing.
 * 
 * @example
 * ```ts
 * // Visual regression with Playwright
 * import { intentVisualTest } from 'intent-core/testing/playwright';
 * 
 * test('Button', async ({ page }, testInfo) => {
 *   await intentVisualTest(page, testInfo, {
 *     component: buttonSchema,
 *     config: designSystem,
 *   });
 * });
 * ```
 */

// Visual Regression
export {
  generateTestHTML,
  generateVisualTestCombinations,
  generateVisualTestCases,
  getBaselinePath,
  getScreenshotPath,
  getDiffPath,
  createVisualRegressionConfig,
  defaultVisualRegressionConfig,
  runVisualTests,
} from './visual-regression.js';

export type {
  VisualTestOptions,
  VisualTestResult,
  VisualRegressionConfig,
} from './visual-regression.js';

// Playwright Integration (conditional export)
export type {
  PlaywrightVisualTestOptions,
} from './playwright.js';

// Playwright functions are available via direct import from './playwright.js'
// This avoids conditional exports which are not supported in ES modules
