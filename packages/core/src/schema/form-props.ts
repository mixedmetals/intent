// ============================================================================
// Form Property Definitions
// ============================================================================

import { prop } from './define.js';

/**
 * Form control size
 */
export const formSizeProp = prop.enum(
  ['xs', 'sm', 'md', 'lg', 'xl'],
  { default: 'md' }
);

/**
 * Form control variant
 */
export const formVariantProp = prop.enum(
  ['outline', 'filled', 'flushed', 'unstyled'],
  { default: 'outline' }
);

/**
 * Validation state
 */
export const validationStateProp = prop.enum(
  ['none', 'valid', 'invalid', 'warning'],
  { default: 'none' }
);

/**
 * Input type for text inputs
 */
export const inputTypeProp = prop.enum(
  [
    'text',
    'password',
    'email',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
  ],
  { default: 'text' }
);

/**
 * HTML5 input autocomplete values
 */
export const autocompleteProp = prop.enum(
  [
    'off',
    'on',
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'one-time-code',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo',
  ],
  { default: 'off' }
);

/**
 * Resize behavior for textarea
 */
export const resizeProp = prop.enum(
  ['none', 'both', 'horizontal', 'vertical'],
  { default: 'vertical' }
);

/**
 * Checkbox/Radio size
 */
export const checkSizeProp = prop.enum(
  ['sm', 'md', 'lg'],
  { default: 'md' }
);

/**
 * Checkbox/Radio variant
 */
export const checkVariantProp = prop.enum(
  ['default', 'filled', 'outline'],
  { default: 'default' }
);

/**
 * Switch size
 */
export const switchSizeProp = prop.enum(
  ['sm', 'md', 'lg'],
  { default: 'md' }
);

/**
 * Label position
 */
export const labelPositionProp = prop.enum(
  ['top', 'left', 'right', 'bottom', 'floating'],
  { default: 'top' }
);

/**
 * Field layout
 */
export const fieldLayoutProp = prop.enum(
  ['vertical', 'horizontal', 'inline'],
  { default: 'vertical' }
);

/**
 * Select mode
 */
export const selectModeProp = prop.enum(
  ['single', 'multiple'],
  { default: 'single' }
);

/**
 * Form spacing
 */
export const formSpacingProp = prop.enum(
  ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
  { default: 'md' }
);
