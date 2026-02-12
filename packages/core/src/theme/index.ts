// ============================================================================
// Intent Theme System
// ============================================================================

/**
 * Intent Theme System
 * 
 * Complete theming solution with CSS variable generation,
 * dark mode support, and component-specific tokens.
 * 
 * @example
 * ```ts
 * import { defaultTheme, generateCSSVariables } from 'intent-core/theme';
 * 
 * // Generate CSS
 * const css = generateCSSVariables(defaultTheme);
 * ```
 */

import { registerTheme, setDefaultTheme } from '../plugin/theme.js';
import { defaultTheme as theme } from './default-theme.js';

// Register the default theme
registerTheme(theme);
setDefaultTheme(theme);

export {
  defaultTheme,
  generateThemeCSS,
} from './default-theme.js';

// Re-export theme types
export type { Theme, ResolvedTheme } from '../plugin/types.js';

// Re-export theme utilities from plugin
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
} from '../plugin/theme.js';
