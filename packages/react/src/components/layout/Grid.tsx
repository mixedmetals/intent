import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface GridProps {
  /** Number of columns */
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none';
  /** Number of rows */
  rows?: '1' | '2' | '3' | '4' | '5' | '6' | 'none';
  /** Grid auto-flow direction */
  flow?: 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
  /** Gap between grid items (shorthand for column and row gap) */
  gap?: '0' | 'px' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16';
  /** Horizontal gap between items */
  gapX?: '0' | 'px' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16';
  /** Vertical gap between items */
  gapY?: '0' | 'px' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16';
  /** Justify content along inline axis */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** Justify items along inline axis */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  /** Align content along block axis */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** Align items along block axis */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /** Place content shorthand */
  placeContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** Place items shorthand */
  placeItems?: 'start' | 'end' | 'center' | 'stretch';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export interface GridItemProps {
  /** Column span */
  colSpan?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';
  /** Column start position */
  colStart?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | 'auto';
  /** Column end position */
  colEnd?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | 'auto';
  /** Row span */
  rowSpan?: '1' | '2' | '3' | '4' | '5' | '6' | 'full';
  /** Row start position */
  rowStart?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'auto';
  /** Row end position */
  rowEnd?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'auto';
  /** Justify self along inline axis */
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  /** Align self along block axis */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /** Place self shorthand */
  placeSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Grid - CSS Grid layout component
 * 
 * Provides a 12-column grid system with gap support.
 * 
 * @example
 * ```tsx
 * <Grid columns="3" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * <Grid columns="4" gapX="4" gapY="6">
 *   <GridItem colSpan="2">Spans 2 columns</GridItem>
 *   <GridItem colSpan="2">Spans 2 columns</GridItem>
 * </Grid>
 * ```
 */
export const Grid = createComponent<GridProps>('Grid', {
  columns: 'none',
  rows: 'none',
  flow: 'row',
  gap: '0',
  justifyContent: 'start',
  justifyItems: 'stretch',
  alignContent: 'stretch',
  alignItems: 'stretch',
});

/**
 * GridItem - Grid child with span and positioning controls
 * 
 * @example
 * ```tsx
 * <Grid columns="3">
 *   <GridItem colSpan="2">Takes 2/3 width</GridItem>
 *   <GridItem>Takes 1/3 width</GridItem>
 * </Grid>
 * ```
 */
export const GridItem = createComponent<GridItemProps>('GridItem', {
  colSpan: '1',
  colStart: 'auto',
  colEnd: 'auto',
  rowSpan: '1',
  rowStart: 'auto',
  rowEnd: 'auto',
  justifySelf: 'auto',
  alignSelf: 'auto',
  placeSelf: 'auto',
});

// Convenience exports
export default Grid;
