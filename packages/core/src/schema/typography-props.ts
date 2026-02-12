// ============================================================================
// Typography Property Definitions
// ============================================================================

import { prop } from './define.js';

/**
 * Font size property - text size scale
 */
export const fontSizeProp = prop.enum(
  [
    'xs',    // 0.75rem / 12px
    'sm',    // 0.875rem / 14px
    'base',  // 1rem / 16px
    'lg',    // 1.125rem / 18px
    'xl',    // 1.25rem / 20px
    '2xl',   // 1.5rem / 24px
    '3xl',   // 1.875rem / 30px
    '4xl',   // 2.25rem / 36px
    '5xl',   // 3rem / 48px
    '6xl',   // 3.75rem / 60px
    '7xl',   // 4.5rem / 72px
    '8xl',   // 6rem / 96px
    '9xl',   // 8rem / 128px
  ],
  { default: 'base' }
);

/**
 * Font weight property
 */
export const fontWeightProp = prop.enum(
  [
    'thin',       // 100
    'extralight', // 200
    'light',      // 300
    'normal',     // 400
    'medium',     // 500
    'semibold',   // 600
    'bold',       // 700
    'extrabold',  // 800
    'black',      // 900
  ],
  { default: 'normal' }
);

/**
 * Line height property
 */
export const lineHeightProp = prop.enum(
  [
    'none',    // 1
    'tight',   // 1.25
    'snug',    // 1.375
    'normal',  // 1.5
    'relaxed', // 1.625
    'loose',   // 2
  ],
  { default: 'normal' }
);

/**
 * Letter spacing property
 */
export const letterSpacingProp = prop.enum(
  [
    'tighter', // -0.05em
    'tight',   // -0.025em
    'normal',  // 0
    'wide',    // 0.025em
    'wider',   // 0.05em
    'widest',  // 0.1em
  ],
  { default: 'normal' }
);

/**
 * Text alignment property
 */
export const textAlignProp = prop.enum(
  ['left', 'center', 'right', 'justify', 'start', 'end'],
  { default: 'left' }
);

/**
 * Text transform property
 */
export const textTransformProp = prop.enum(
  ['none', 'uppercase', 'lowercase', 'capitalize'],
  { default: 'none' }
);

/**
 * Text decoration property
 */
export const textDecorationProp = prop.enum(
  ['none', 'underline', 'line-through', 'overline'],
  { default: 'none' }
);

/**
 * Text decoration style
 */
export const textDecorationStyleProp = prop.enum(
  ['solid', 'double', 'dotted', 'dashed', 'wavy'],
  { default: 'solid' }
);

/**
 * Text overflow property
 */
export const textOverflowProp = prop.enum(
  ['clip', 'ellipsis'],
  { default: 'clip' }
);

/**
 * White space property
 */
export const whiteSpaceProp = prop.enum(
  ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'],
  { default: 'normal' }
);

/**
 * Word break property
 */
export const wordBreakProp = prop.enum(
  ['normal', 'words', 'all', 'keep'],
  { default: 'normal' }
);

/**
 * Hyphens property
 */
export const hyphensProp = prop.enum(
  ['none', 'manual', 'auto'],
  { default: 'manual' }
);

/**
 * Font style property
 */
export const fontStyleProp = prop.enum(
  ['normal', 'italic'],
  { default: 'normal' }
);

/**
 * Font variant numeric
 */
export const fontVariantNumericProp = prop.enum(
  ['normal', 'ordinal', 'slashed-zero', 'lining-nums', 'oldstyle-nums', 'proportional-nums', 'tabular-nums', 'diagonal-fractions', 'stacked-fractions'],
  { default: 'normal' }
);

/**
 * List style type
 */
export const listStyleTypeProp = prop.enum(
  ['none', 'disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-alpha', 'upper-alpha'],
  { default: 'disc' }
);

/**
 * List style position
 */
export const listStylePositionProp = prop.enum(
  ['inside', 'outside'],
  { default: 'outside' }
);

/**
 * Text wrap property (modern browsers)
 */
export const textWrapProp = prop.enum(
  ['wrap', 'nowrap', 'balance', 'pretty'],
  { default: 'wrap' }
);
