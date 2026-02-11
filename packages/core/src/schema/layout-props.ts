// ============================================================================
// Layout Property Definitions
// ============================================================================

import { prop } from './define.js';

/**
 * Position property - controls element positioning
 */
export const positionProp = prop.enum(
  ['static', 'relative', 'absolute', 'fixed', 'sticky'],
  { default: 'static' }
);

/**
 * Inset property - top/right/bottom/left shorthand
 */
export const insetProp = prop.enum(
  ['0', 'auto', '1/2', 'full', 'px'],
  { default: 'auto' }
);

/**
 * Z-index property - stacking order
 */
export const zIndexProp = prop.enum(
  ['auto', '0', '10', '20', '30', '40', '50'],
  { default: 'auto' }
);

/**
 * Overflow property - content clipping
 */
export const overflowProp = prop.enum(
  ['visible', 'hidden', 'scroll', 'auto', 'clip'],
  { default: 'visible' }
);

/**
 * Display property - layout behavior
 */
export const displayProp = prop.enum(
  ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
  { default: 'block' }
);

/**
 * Width property - element width
 */
export const widthProp = prop.enum(
  [
    'auto', 'full', 'screen', 'min', 'max', 'fit',
    '1/2', '1/3', '2/3', '1/4', '2/4', '3/4',
    '1/5', '2/5', '3/5', '4/5',
    '1/6', '2/6', '3/6', '4/6', '5/6',
    '1/12', '2/12', '3/12', '4/12', '5/12', '6/12',
    '7/12', '8/12', '9/12', '10/12', '11/12',
  ],
  { default: 'auto' }
);

/**
 * Height property - element height
 */
export const heightProp = prop.enum(
  [
    'auto', 'full', 'screen', 'min', 'max', 'fit',
    '1/2', '1/3', '2/3', '1/4', '2/4', '3/4',
    '1/5', '2/5', '3/5', '4/5',
    '1/6', '2/6', '3/6', '4/6', '5/6',
  ],
  { default: 'auto' }
);

/**
 * Min/Max width/height properties
 */
export const minWidthProp = prop.enum(
  ['0', 'full', 'min', 'max', 'fit'],
  { default: '0' }
);

export const maxWidthProp = prop.enum(
  ['none', 'full', 'screen', 'min', 'max', 'fit', 'prose'],
  { default: 'none' }
);

export const minHeightProp = prop.enum(
  ['0', 'full', 'screen', 'min', 'max', 'fit'],
  { default: '0' }
);

export const maxHeightProp = prop.enum(
  ['none', 'full', 'screen', 'min', 'max', 'fit'],
  { default: 'none' }
);

/**
 * Container breakpoint sizes
 */
export const containerSizeProp = prop.enum(
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
  { default: 'full' }
);

/**
 * Grid column count
 */
export const gridColumnsProp = prop.enum(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
  { default: 'none' }
);

/**
 * Grid row count
 */
export const gridRowsProp = prop.enum(
  ['1', '2', '3', '4', '5', '6', 'none'],
  { default: 'none' }
);

/**
 * Grid auto flow
 */
export const gridFlowProp = prop.enum(
  ['row', 'column', 'dense', 'row-dense', 'column-dense'],
  { default: 'row' }
);

/**
 * Gap property for grid/flex spacing
 */
export const gapProp = prop.enum(
  ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16'],
  { default: '0' }
);

/**
 * Grid column/row span
 */
export const colSpanProp = prop.enum(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'full'],
  { default: '1' }
);

export const rowSpanProp = prop.enum(
  ['1', '2', '3', '4', '5', '6', 'full'],
  { default: '1' }
);

/**
 * Flex direction
 */
export const flexDirectionProp = prop.enum(
  ['row', 'row-reverse', 'column', 'column-reverse'],
  { default: 'row' }
);

/**
 * Flex wrap
 */
export const flexWrapProp = prop.enum(
  ['nowrap', 'wrap', 'wrap-reverse'],
  { default: 'nowrap' }
);

/**
 * Flex grow/shrink
 */
export const flexGrowProp = prop.enum(
  ['0', '1'],
  { default: '0' }
);

export const flexShrinkProp = prop.enum(
  ['0', '1'],
  { default: '1' }
);

/**
 * Justify content (flex/grid)
 */
export const justifyContentProp = prop.enum(
  ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
  { default: 'start' }
);

/**
 * Justify items (grid)
 */
export const justifyItemsProp = prop.enum(
  ['start', 'end', 'center', 'stretch'],
  { default: 'stretch' }
);

/**
 * Justify self (grid)
 */
export const justifySelfProp = prop.enum(
  ['auto', 'start', 'end', 'center', 'stretch'],
  { default: 'auto' }
);

/**
 * Align content (flex/grid)
 */
export const alignContentProp = prop.enum(
  ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
  { default: 'stretch' }
);

/**
 * Align items (flex/grid)
 */
export const alignItemsProp = prop.enum(
  ['start', 'end', 'center', 'baseline', 'stretch'],
  { default: 'stretch' }
);

/**
 * Align self (flex/grid)
 */
export const alignSelfProp = prop.enum(
  ['auto', 'start', 'end', 'center', 'baseline', 'stretch'],
  { default: 'auto' }
);

/**
 * Place content (grid shorthand)
 */
export const placeContentProp = prop.enum(
  ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
  { default: 'stretch' }
);

/**
 * Place items (grid shorthand)
 */
export const placeItemsProp = prop.enum(
  ['start', 'end', 'center', 'stretch'],
  { default: 'stretch' }
);

/**
 * Place self (grid shorthand)
 */
export const placeSelfProp = prop.enum(
  ['auto', 'start', 'end', 'center', 'stretch'],
  { default: 'auto' }
);

/**
 * Aspect ratio for media
 */
export const aspectRatioProp = prop.enum(
  ['auto', 'square', 'video', 'portrait', 'landscape', 'widescreen', 'ultrawide'],
  { default: 'auto' }
);

/**
 * Object fit for images/media
 */
export const objectFitProp = prop.enum(
  ['contain', 'cover', 'fill', 'none', 'scale-down'],
  { default: 'cover' }
);

/**
 * Object position
 */
export const objectPositionProp = prop.enum(
  ['top', 'bottom', 'center', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom'],
  { default: 'center' }
);

/**
 * Visibility
 */
export const visibilityProp = prop.enum(
  ['visible', 'hidden', 'collapse'],
  { default: 'visible' }
);

/**
 * Responsive breakpoint visibility
 */
export const responsiveVisibilityProp = prop.enum(
  ['hidden', 'sm', 'md', 'lg', 'xl', '2xl'],
  { default: 'hidden' }
);
