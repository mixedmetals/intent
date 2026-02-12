import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface ListProps {
  /** List type */
  type?: 'unordered' | 'ordered' | 'none';
  /** List marker style */
  marker?: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha';
  /** Marker position */
  position?: 'inside' | 'outside';
  /** List item spacing */
  spacing?: 'none' | 'tight' | 'normal' | 'relaxed';
  /** Child elements (ListItems) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export interface ListItemProps {
  /** Override marker style for this item */
  marker?: 'none' | 'disc' | 'circle' | 'square';
  /** Child elements */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * List - Ordered and unordered lists
 * 
 * @example
 * ```tsx
 * // Unordered list (default)
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 * 
 * // Ordered list
 * <List type="ordered">
 *   <ListItem>Step one</ListItem>
 *   <ListItem>Step two</ListItem>
 * </List>
 * 
 * // Custom marker
 * <List marker="square" spacing="relaxed">
 *   <ListItem>Spacious item</ListItem>
 * </List>
 * 
 * // No bullets
 * <List type="none">
 *   <ListItem>Clean list item</ListItem>
 * </List>
 * ```
 */
export const List = createComponent<ListProps>('List', {
  type: 'unordered',
  marker: 'disc',
  position: 'outside',
  spacing: 'normal',
});

/**
 * ListItem - Individual list item
 * 
 * @example
 * ```tsx
 * <List>
 *   <ListItem>Default item</ListItem>
 *   <ListItem marker="circle">Custom marker</ListItem>
 * </List>
 * ```
 */
export const ListItem = createComponent<ListItemProps>('ListItem', {});

// Convenience aliases
export const Ul = (props: Omit<ListProps, 'type'>) => <List type="unordered" {...props} />;
export const Ol = (props: Omit<ListProps, 'type'>) => <List type="ordered" {...props} />;
export const Li = ListItem;

export default List;
