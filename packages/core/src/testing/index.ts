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

// Re-export Playwright functions if Playwright is available
try {
  // This will be tree-shaken if Playwright is not installed
  const playwrightModule = require('./playwright.js');
  export const intentVisualTest = playwrightModule.intentVisualTest;
  export const checkAccessibility = playwrightModule.checkAccessibility;
  export type { A11yViolation } from './playwright.js';
} catch {
  // Playwright not installed, exports will be undefined
}
