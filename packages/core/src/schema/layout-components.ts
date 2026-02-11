// ============================================================================
// Layout Component Schemas
// ============================================================================

import { defineComponent } from './define.js';
import {
  containerSizeProp,
  displayProp,
  positionProp,
  widthProp,
  heightProp,
  minWidthProp,
  maxWidthProp,
  minHeightProp,
  maxHeightProp,
  insetProp,
  zIndexProp,
  overflowProp,
  gridColumnsProp,
  gridRowsProp,
  gridFlowProp,
  gapProp,
  colSpanProp,
  rowSpanProp,
  flexDirectionProp,
  flexWrapProp,
  flexGrowProp,
  flexShrinkProp,
  justifyContentProp,
  justifyItemsProp,
  justifySelfProp,
  alignContentProp,
  alignItemsProp,
  alignSelfProp,
  placeContentProp,
  placeItemsProp,
  placeSelfProp,
  aspectRatioProp,
  objectFitProp,
  objectPositionProp,
  visibilityProp,
} from './layout-props.js';

// ============================================================================
// Container
// ============================================================================

/**
 * Container - Max-width wrapper with responsive breakpoints
 * 
 * Centers content and provides consistent max-width constraints
 */
export const ContainerSchema = defineComponent({
  name: 'Container',
  description: 'Max-width wrapper with responsive breakpoints',
  properties: {
    size: containerSizeProp,
    center: { type: 'boolean', default: true },
    fluid: { type: 'boolean', default: false },
  },
  constraints: [
    {
      when: { fluid: true },
      forbid: ['size'],
      message: 'Fluid containers cannot have a max-width',
    },
  ],
  mappings: {
    'size=xs': { maxWidth: '20rem' },      // 320px
    'size=sm': { maxWidth: '24rem' },      // 384px
    'size=md': { maxWidth: '28rem' },      // 448px
    'size=lg': { maxWidth: '32rem' },      // 512px
    'size=xl': { maxWidth: '36rem' },      // 576px
    'size=2xl': { maxWidth: '42rem' },     // 672px
    'size=full': { maxWidth: '100%' },
    'center=true': { marginLeft: 'auto', marginRight: 'auto' },
    'fluid=true': { maxWidth: 'none', width: '100%' },
  },
  baseStyles: {
    width: '100%',
  },
});

// ============================================================================
// Grid
// ============================================================================

/**
 * Grid - CSS Grid layout component
 * 
 * Provides a 12-column grid system with gap support
 */
export const GridSchema = defineComponent({
  name: 'Grid',
  description: 'CSS Grid layout with configurable columns, rows, and gaps',
  properties: {
    columns: gridColumnsProp,
    rows: gridRowsProp,
    flow: gridFlowProp,
    gap: gapProp,
    gapX: gapProp,
    gapY: gapProp,
    justifyContent: justifyContentProp,
    justifyItems: justifyItemsProp,
    alignContent: alignContentProp,
    alignItems: alignItemsProp,
    placeContent: placeContentProp,
    placeItems: placeItemsProp,
  },
  constraints: [
    {
      when: { columns: 'none' },
      require: { rows: { ne: 'none' } },
      message: 'Grid must have either columns or rows defined',
    },
  ],
  mappings: {
    // Columns
    'columns=1': { gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' },
    'columns=2': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
    'columns=3': { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
    'columns=4': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
    'columns=5': { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
    'columns=6': { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
    'columns=7': { gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' },
    'columns=8': { gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' },
    'columns=9': { gridTemplateColumns: 'repeat(9, minmax(0, 1fr))' },
    'columns=10': { gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' },
    'columns=11': { gridTemplateColumns: 'repeat(11, minmax(0, 1fr))' },
    'columns=12': { gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' },
    
    // Rows
    'rows=1': { gridTemplateRows: 'repeat(1, minmax(0, 1fr))' },
    'rows=2': { gridTemplateRows: 'repeat(2, minmax(0, 1fr))' },
    'rows=3': { gridTemplateRows: 'repeat(3, minmax(0, 1fr))' },
    'rows=4': { gridTemplateRows: 'repeat(4, minmax(0, 1fr))' },
    'rows=5': { gridTemplateRows: 'repeat(5, minmax(0, 1fr))' },
    'rows=6': { gridTemplateRows: 'repeat(6, minmax(0, 1fr))' },
    
    // Flow
    'flow=row': { gridAutoFlow: 'row' },
    'flow=column': { gridAutoFlow: 'column' },
    'flow=dense': { gridAutoFlow: 'row dense' },
    'flow=row-dense': { gridAutoFlow: 'row dense' },
    'flow=column-dense': { gridAutoFlow: 'column dense' },
    
    // Gap
    'gap=0': { gap: '0px' },
    'gap=px': { gap: '1px' },
    'gap=0.5': { gap: '0.125rem' },
    'gap=1': { gap: '0.25rem' },
    'gap=2': { gap: '0.5rem' },
    'gap=3': { gap: '0.75rem' },
    'gap=4': { gap: '1rem' },
    'gap=5': { gap: '1.25rem' },
    'gap=6': { gap: '1.5rem' },
    'gap=8': { gap: '2rem' },
    'gap=10': { gap: '2.5rem' },
    'gap=12': { gap: '3rem' },
    
    // Justify content
    'justifyContent=start': { justifyContent: 'flex-start' },
    'justifyContent=end': { justifyContent: 'flex-end' },
    'justifyContent=center': { justifyContent: 'center' },
    'justifyContent=between': { justifyContent: 'space-between' },
    'justifyContent=around': { justifyContent: 'space-around' },
    'justifyContent=evenly': { justifyContent: 'space-evenly' },
    'justifyContent=stretch': { justifyContent: 'stretch' },
    
    // Align content
    'alignContent=start': { alignContent: 'flex-start' },
    'alignContent=end': { alignContent: 'flex-end' },
    'alignContent=center': { alignContent: 'center' },
    'alignContent=between': { alignContent: 'space-between' },
    'alignContent=around': { alignContent: 'space-around' },
    'alignContent=evenly': { alignContent: 'space-evenly' },
    'alignContent=stretch': { alignContent: 'stretch' },
    
    // Align items
    'alignItems=start': { alignItems: 'flex-start' },
    'alignItems=end': { alignItems: 'flex-end' },
    'alignItems=center': { alignItems: 'center' },
    'alignItems=baseline': { alignItems: 'baseline' },
    'alignItems=stretch': { alignItems: 'stretch' },
  },
  baseStyles: {
    display: 'grid',
  },
});

// ============================================================================
// Grid Item (for Grid children)
// ============================================================================

export const GridItemSchema = defineComponent({
  name: 'GridItem',
  description: 'Grid child with span and positioning controls',
  properties: {
    colSpan: colSpanProp,
    colStart: { type: 'enum', values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'auto'], default: 'auto' },
    colEnd: { type: 'enum', values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'auto'], default: 'auto' },
    rowSpan: rowSpanProp,
    rowStart: { type: 'enum', values: ['1', '2', '3', '4', '5', '6', '7', 'auto'], default: 'auto' },
    rowEnd: { type: 'enum', values: ['1', '2', '3', '4', '5', '6', '7', 'auto'], default: 'auto' },
    justifySelf: justifySelfProp,
    alignSelf: alignSelfProp,
    placeSelf: placeSelfProp,
  },
  constraints: [],
  mappings: {
    'colSpan=1': { gridColumn: 'span 1 / span 1' },
    'colSpan=2': { gridColumn: 'span 2 / span 2' },
    'colSpan=3': { gridColumn: 'span 3 / span 3' },
    'colSpan=4': { gridColumn: 'span 4 / span 4' },
    'colSpan=5': { gridColumn: 'span 5 / span 5' },
    'colSpan=6': { gridColumn: 'span 6 / span 6' },
    'colSpan=7': { gridColumn: 'span 7 / span 7' },
    'colSpan=8': { gridColumn: 'span 8 / span 8' },
    'colSpan=9': { gridColumn: 'span 9 / span 9' },
    'colSpan=10': { gridColumn: 'span 10 / span 10' },
    'colSpan=11': { gridColumn: 'span 11 / span 11' },
    'colSpan=12': { gridColumn: 'span 12 / span 12' },
    'colSpan=full': { gridColumn: '1 / -1' },
    
    'rowSpan=1': { gridRow: 'span 1 / span 1' },
    'rowSpan=2': { gridRow: 'span 2 / span 2' },
    'rowSpan=3': { gridRow: 'span 3 / span 3' },
    'rowSpan=4': { gridRow: 'span 4 / span 4' },
    'rowSpan=5': { gridRow: 'span 5 / span 5' },
    'rowSpan=6': { gridRow: 'span 6 / span 6' },
    'rowSpan=full': { gridRow: '1 / -1' },
    
    'justifySelf=start': { justifySelf: 'start' },
    'justifySelf=end': { justifySelf: 'end' },
    'justifySelf=center': { justifySelf: 'center' },
    'justifySelf=stretch': { justifySelf: 'stretch' },
    
    'alignSelf=start': { alignSelf: 'start' },
    'alignSelf=end': { alignSelf: 'end' },
    'alignSelf=center': { alignSelf: 'center' },
    'alignSelf=baseline': { alignSelf: 'baseline' },
    'alignSelf=stretch': { alignSelf: 'stretch' },
  },
});

// ============================================================================
// Box - Generic layout primitive
// ============================================================================

export const BoxSchema = defineComponent({
  name: 'Box',
  description: 'Generic layout primitive with display, position, and sizing',
  properties: {
    display: displayProp,
    position: positionProp,
    width: widthProp,
    height: heightProp,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    inset,
    zIndex: zIndexProp,
    overflow: overflowProp,
  },
  constraints: [
    {
      when: { position: 'static' },
      forbid: ['inset', 'zIndex'],
      message: 'Static positioning does not support inset or z-index',
    },
  ],
  mappings: {
    // Display
    'display=block': { display: 'block' },
    'display=inline': { display: 'inline' },
    'display=inline-block': { display: 'inline-block' },
    'display=flex': { display: 'flex' },
    'display=inline-flex': { display: 'inline-flex' },
    'display=grid': { display: 'grid' },
    'display=inline-grid': { display: 'inline-grid' },
    'display=none': { display: 'none' },
    
    // Position
    'position=static': { position: 'static' },
    'position=relative': { position: 'relative' },
    'position=absolute': { position: 'absolute' },
    'position=fixed': { position: 'fixed' },
    'position=sticky': { position: 'sticky' },
    
    // Width
    'width=auto': { width: 'auto' },
    'width=full': { width: '100%' },
    'width=screen': { width: '100vw' },
    'width=min': { width: 'min-content' },
    'width=max': { width: 'max-content' },
    'width=fit': { width: 'fit-content' },
    'width=1/2': { width: '50%' },
    'width=1/3': { width: '33.333333%' },
    'width=2/3': { width: '66.666667%' },
    'width=1/4': { width: '25%' },
    'width=2/4': { width: '50%' },
    'width=3/4': { width: '75%' },
    
    // Height
    'height=auto': { height: 'auto' },
    'height=full': { height: '100%' },
    'height=screen': { height: '100vh' },
    'height=min': { height: 'min-content' },
    'height=max': { height: 'max-content' },
    'height=fit': { height: 'fit-content' },
    'height=1/2': { height: '50%' },
    'height=1/3': { height: '33.333333%' },
    'height=2/3': { height: '66.666667%' },
    
    // Overflow
    'overflow=visible': { overflow: 'visible' },
    'overflow=hidden': { overflow: 'hidden' },
    'overflow=scroll': { overflow: 'scroll' },
    'overflow=auto': { overflow: 'auto' },
  },
});

// ============================================================================
// Aspect Ratio
// ============================================================================

export const AspectRatioSchema = defineComponent({
  name: 'AspectRatio',
  description: 'Maintains consistent aspect ratio for media content',
  properties: {
    ratio: aspectRatioProp,
    fit: objectFitProp,
    position: objectPositionProp,
  },
  constraints: [],
  mappings: {
    'ratio=auto': { aspectRatio: 'auto' },
    'ratio=square': { aspectRatio: '1 / 1' },
    'ratio=video': { aspectRatio: '16 / 9' },
    'ratio=portrait': { aspectRatio: '3 / 4' },
    'ratio=landscape': { aspectRatio: '4 / 3' },
    'ratio=widescreen': { aspectRatio: '21 / 9' },
    'ratio=ultrawide': { aspectRatio: '32 / 9' },
    
    'fit=contain': { objectFit: 'contain' },
    'fit=cover': { objectFit: 'cover' },
    'fit=fill': { objectFit: 'fill' },
    'fit=none': { objectFit: 'none' },
    'fit=scale-down': { objectFit: 'scale-down' },
  },
  baseStyles: {
    position: 'relative',
    overflow: 'hidden',
  },
});

// ============================================================================
// Center - Flexbox centering helper
// ============================================================================

export const CenterSchema = defineComponent({
  name: 'Center',
  description: 'Centers content horizontally and vertically using flexbox',
  properties: {
    inline: { type: 'boolean', default: false },
    direction: flexDirectionProp,
  },
  constraints: [],
  mappings: {
    'inline=false': { display: 'flex' },
    'inline=true': { display: 'inline-flex' },
    'direction=row': { flexDirection: 'row' },
    'direction=column': { flexDirection: 'column' },
  },
  baseStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// ============================================================================
// Spacer
// ============================================================================

export const SpacerSchema = defineComponent({
  name: 'Spacer',
  description: 'Flexible spacing element for layouts',
  properties: {
    size: { type: 'enum', values: ['0', 'px', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '64', '80', '96'], default: '4' },
    horizontal: { type: 'boolean', default: false },
    grow: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'size=0': { width: '0px', height: '0px' },
    'size=1': { width: '0.25rem', height: '0.25rem' },
    'size=2': { width: '0.5rem', height: '0.5rem' },
    'size=3': { width: '0.75rem', height: '0.75rem' },
    'size=4': { width: '1rem', height: '1rem' },
    'size=6': { width: '1.5rem', height: '1.5rem' },
    'size=8': { width: '2rem', height: '2rem' },
    'size=10': { width: '2.5rem', height: '2.5rem' },
    'size=12': { width: '3rem', height: '3rem' },
    'size=16': { width: '4rem', height: '4rem' },
    'horizontal=true': { display: 'inline-block', width: 'var(--spacer-width)', height: '0px' },
    'grow=true': { flex: '1 1 0%' },
  },
  baseStyles: {
    display: 'block',
  },
});

// ============================================================================
// Hide/Show - Responsive visibility
// ============================================================================

export const ShowSchema = defineComponent({
  name: 'Show',
  description: 'Shows content at specified breakpoint and up',
  properties: {
    above: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], required: true },
  },
  constraints: [],
  mappings: {},
  baseStyles: {
    display: 'none',
  },
});

export const HideSchema = defineComponent({
  name: 'Hide',
  description: 'Hides content at specified breakpoint and up',
  properties: {
    above: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], required: true },
  },
  constraints: [],
  mappings: {},
  baseStyles: {
    display: 'block',
  },
});

// ============================================================================
// Export all layout schemas
// ============================================================================

export const LayoutSchemas = {
  Container: ContainerSchema,
  Grid: GridSchema,
  GridItem: GridItemSchema,
  Box: BoxSchema,
  AspectRatio: AspectRatioSchema,
  Center: CenterSchema,
  Spacer: SpacerSchema,
  Show: ShowSchema,
  Hide: HideSchema,
};
