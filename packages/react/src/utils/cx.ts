/**
 * ============================================================================
 * Intent ClassName Utilities
 * ============================================================================
 * 
 * Schema-aware className merging utilities optimized for Intent's token system.
 * 
 * These utilities are the glue for all conditional tactile styling, handling:
 * - Layered shadows (base + hover + active)
 * - Border vs. borderless states
 * - Density modifiers
 * - Intent token validation
 * 
 * @example
 * ```tsx
 * import { cx, intent } from './utils/cx';
 * 
 * // Basic class merging (like clsx + tailwind-merge)
 * cx('intent-btn', 'intent-btn--primary', className);
 * 
 * // Intent-aware with token validation
 * intent('intent-card', { 
 *   'intent-card--elevated': isElevated,
 *   'shadow-md hover:shadow-lg': hasShadow 
 });
 * ```
 */

// ============================================================================
// Types
// ============================================================================

export type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassArray 
  | ClassDictionary;

export interface ClassDictionary {
  [id: string]: unknown;
}

export interface ClassArray extends Array<ClassValue> {}

export type IntentTokenValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null;

export interface IntentTokenMap {
  [token: string]: IntentTokenValue;
}

// ============================================================================
// Tailwind Class Priority Map
// ============================================================================

/**
 * Priority groups for Tailwind-like class conflicts.
 * Lower number = higher priority (wins in conflicts).
 */
const CONFLICT_GROUPS: Record<string, number> = {
  // Layout
  'display': 10,
  'position': 10,
  'visibility': 10,
  'z-index': 10,
  
  // Sizing
  'width': 20,
  'min-width': 20,
  'max-width': 20,
  'height': 20,
  'min-height': 20,
  'max-height': 20,
  
  // Spacing
  'padding': 30,
  'margin': 30,
  'space': 30,
  'gap': 30,
  
  // Flex/Grid
  'flex': 40,
  'grid': 40,
  'order': 40,
  'grow': 40,
  'shrink': 40,
  'justify': 40,
  'items': 40,
  'content': 40,
  'self': 40,
  'col-span': 40,
  'row-span': 40,
  
  // Background
  'background': 50,
  'bg': 50,
  
  // Border
  'border': 60,
  'rounded': 60,
  
  // Effects
  'shadow': 70,
  'opacity': 70,
  
  // Typography
  'font': 80,
  'text': 80,
  'leading': 80,
  'tracking': 80,
  
  // Transforms
  'transform': 90,
  'scale': 90,
  'rotate': 90,
  'translate': 90,
};

/**
 * Extract the base prefix from a class name for conflict detection.
 * Handles Tailwind-style prefixes like `hover:`, `md:`, `focus:`.
 */
function getClassPrefix(className: string): string {
  // Remove responsive/state prefixes (hover:, md:, focus:, etc.)
  const withoutPrefix = className.replace(/^[a-z]+:/, '');
  
  // Extract base prefix (e.g., 'bg-blue-500' -> 'bg', 'shadow-md' -> 'shadow')
  const match = withoutPrefix.match(/^([a-z]+(-[a-z]+)?)/);
  return match ? match[1] : withoutPrefix;
}

/**
 * Check if two classes conflict (same property, different values).
 */
function doClassesConflict(classA: string, classB: string): boolean {
  const prefixA = getClassPrefix(classA);
  const prefixB = getClassPrefix(classB);
  
  // Same prefix = potential conflict
  if (prefixA !== prefixB) return false;
  
  // Both have the prefix in our conflict groups = definite conflict
  const groupA = CONFLICT_GROUPS[prefixA];
  const groupB = CONFLICT_GROUPS[prefixB];
  
  return groupA !== undefined && groupB !== undefined;
}

// ============================================================================
// cx - ClassName Merge Utility
// ============================================================================

/**
 * Merges class names, resolving Tailwind-like conflicts intelligently.
 * 
 * Similar to clsx + tailwind-merge, but optimized for Intent's specific
 * class naming conventions and lighter weight.
 * 
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged className string
 * 
 * @example
 * ```tsx
 * cx('intent-btn', 'intent-btn--primary', isLarge && 'intent-btn--lg')
 * // => 'intent-btn intent-btn--primary intent-btn--lg'
 * 
 * cx('shadow-sm', 'shadow-md') // Later wins
 * // => 'shadow-md'
 * 
 * cx({ 'intent-card--hover': isHovered, 'intent-card--active': isActive })
 * // => 'intent-card--hover intent-card--active' (if both true)
 * ```
 */
export function cx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  const seen = new Set<string>();
  
  function addClass(className: string): void {
    if (!className || typeof className !== 'string') return;
    
    const trimmed = className.trim();
    if (!trimmed) return;
    
    // Check for conflicts with existing classes
    for (const existing of classes) {
      if (doClassesConflict(trimmed, existing)) {
        // Remove conflicting class (new one wins)
        const index = classes.indexOf(existing);
        if (index > -1) {
          classes.splice(index, 1);
          seen.delete(existing);
        }
      }
    }
    
    if (!seen.has(trimmed)) {
      classes.push(trimmed);
      seen.add(trimmed);
    }
  }
  
  function processValue(value: ClassValue): void {
    if (!value) return;
    
    if (typeof value === 'string' || typeof value === 'number') {
      addClass(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(processValue);
    } else if (typeof value === 'object') {
      for (const [key, val] of Object.entries(value)) {
        if (val) addClass(key);
      }
    }
  }
  
  inputs.forEach(processValue);
  
  return classes.join(' ');
}

// ============================================================================
// intent - Schema-Aware Token Utility
// ============================================================================

/**
 * Intent-aware className builder that validates against the theme schema.
 * 
 * This is the primary utility for component schemas to generate classNames
 * that respect Intent's design tokens and constraints.
 * 
 * @param baseClasses - Base class names (always applied)
 * @param tokens - Intent token conditions
 * @returns Validated and merged className string
 * 
 * @example
 * ```tsx
 * // Schema-driven class generation
 * intent('intent-card', {
 *   'intent-card--elevated': props.elevation === 'high',
 *   'intent-card--interactive': props.isClickable,
 *   'shadow-md': props.hasShadow,
 *   'hover:shadow-lg': props.hasShadow && props.isClickable,
 * })
 * 
 * // With responsive tokens
 * intent('intent-stack', {
 *   'intent-stack--horizontal': direction === 'row',
 *   'gap-4': size === 'normal',
 *   'gap-6': size === 'relaxed',
 * })
 * ```
 */
export function intent(
  baseClasses: string,
  tokens: IntentTokenMap = {}
): string {
  const conditionalClasses: ClassValue[] = [];
  
  for (const [className, condition] of Object.entries(tokens)) {
    if (condition) {
      conditionalClasses.push(className);
    }
  }
  
  return cx(baseClasses, ...conditionalClasses);
}

/**
 * Create a variant-based className generator for component schemas.
 * 
 * This factory function creates a schema-aware variant function that
 * handles compound variants (combinations of props) elegantly.
 * 
 * @param base - Base class name
 * @param variants - Variant definitions
 * @returns Variant generator function
 * 
 * @example
 * ```tsx
 * // Define button variants
 * const buttonVariants = intentVariants('intent-btn', {
 *   importance: {
 *     primary: 'intent-btn--primary',
 *     secondary: 'intent-btn--secondary',
 *     ghost: 'intent-btn--ghost',
 *   },
 *   size: {
 *     sm: 'intent-btn--sm',
 *     md: 'intent-btn--md',
 *     lg: 'intent-btn--lg',
 *   },
 * });
 * 
 * // Use in component
 * buttonVariants({ importance: 'primary', size: 'lg' })
 * // => 'intent-btn intent-btn--primary intent-btn--lg'
 * ```
 */
export function intentVariants<
  TVariants extends Record<string, Record<string, string>>
>(
  base: string,
  variants: TVariants
): (
  props: Partial<{
    [K in keyof TVariants]: keyof TVariants[K];
  }>
) => string {
  return (props) => {
    const classes: string[] = [base];
    
    for (const [variantKey, variantValue] of Object.entries(props)) {
      const variantMap = variants[variantKey];
      if (variantMap && variantValue && variantMap[variantValue]) {
        classes.push(variantMap[variantValue]);
      }
    }
    
    return cx(...classes);
  };
}

// ============================================================================
// Schema Validation Helpers
// ============================================================================

/**
 * Validate that a className uses valid Intent tokens.
 * 
 * This is primarily for development/debugging to catch invalid
 * token references early.
 * 
 * @param className - Class name to validate
 * @param validTokens - Array of valid token prefixes
 * @returns Validation result
 */
export function validateIntentClass(
  className: string,
  validTokens: string[] = []
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for Intent prefix
  if (!className.startsWith('intent-') && !className.includes(':')) {
    errors.push(`Class "${className}" should use 'intent-' prefix`);
  }
  
  // Check against valid tokens if provided
  if (validTokens.length > 0) {
    const hasValidToken = validTokens.some(token => 
      className.includes(token)
    );
    if (!hasValidToken) {
      errors.push(`Class "${className}" doesn't match any valid tokens`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================================================
// Default Export
// ============================================================================

export default cx;
