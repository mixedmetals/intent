// ============================================================================
// Overlay Component Schemas
// ============================================================================

import { defineComponent } from './define.js';

// ============================================================================
// Modal / Dialog
// ============================================================================

export const ModalSchema = defineComponent({
  name: 'Modal',
  description: 'Focus-trapped overlay dialog',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    placement: { type: 'enum', values: ['center', 'top'], default: 'center' },
    scrollBehavior: { type: 'enum', values: ['inside', 'outside'], default: 'inside' },
  },
  constraints: [],
  mappings: {
    // Sizes
    'size=xs': { maxWidth: '20rem' },
    'size=sm': { maxWidth: '24rem' },
    'size=md': { maxWidth: '28rem' },
    'size=lg': { maxWidth: '32rem' },
    'size=xl': { maxWidth: '36rem' },
    'size=full': { maxWidth: '100vw', minHeight: '100vh', margin: '0', borderRadius: '0' },
    
    // Placements
    'placement=center': { 
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    'placement=top': {
      position: 'fixed',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  baseStyles: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxHeight: 'calc(100vh - 2rem)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '50',
  },
});

// ============================================================================
// Drawer
// ============================================================================

export const DrawerSchema = defineComponent({
  name: 'Drawer',
  description: 'Side panel overlay that slides in',
  properties: {
    placement: { type: 'enum', values: ['left', 'right', 'top', 'bottom'], default: 'right' },
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
  },
  constraints: [],
  mappings: {
    // Placements
    'placement=left': {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '100vh',
      transform: 'translateX(-100%)',
    },
    'placement=right': {
      position: 'fixed',
      top: '0',
      right: '0',
      height: '100vh',
      transform: 'translateX(100%)',
    },
    'placement=top': {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      transform: 'translateY(-100%)',
    },
    'placement=bottom': {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100vw',
      transform: 'translateY(100%)',
    },
    
    // Sizes (for left/right)
    'placement=left,size=xs': { width: '16rem' },
    'placement=left,size=sm': { width: '20rem' },
    'placement=left,size=md': { width: '24rem' },
    'placement=left,size=lg': { width: '28rem' },
    'placement=left,size=xl': { width: '32rem' },
    'placement=left,size=full': { width: '100vw' },
    
    'placement=right,size=xs': { width: '16rem' },
    'placement=right,size=sm': { width: '20rem' },
    'placement=right,size=md': { width: '24rem' },
    'placement=right,size=lg': { width: '28rem' },
    'placement=right,size=xl': { width: '32rem' },
    'placement=right,size=full': { width: '100vw' },
    
    // Sizes (for top/bottom)
    'placement=top,size=xs': { height: '16rem' },
    'placement=top,size=sm': { height: '20rem' },
    'placement=top,size=md': { height: '24rem' },
    'placement=top,size=lg': { height: '28rem' },
    'placement=top,size=xl': { height: '32rem' },
    'placement=top,size=full': { height: '100vh' },
    
    'placement=bottom,size=xs': { height: '16rem' },
    'placement=bottom,size=sm': { height: '20rem' },
    'placement=bottom,size=md': { height: '24rem' },
    'placement=bottom,size=lg': { height: '28rem' },
    'placement=bottom,size=xl': { height: '32rem' },
    'placement=bottom,size=full': { height: '100vh' },
  },
  baseStyles: {
    backgroundColor: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '50',
    transition: 'transform 300ms ease-in-out',
  },
});

// ============================================================================
// Tooltip
// ============================================================================

export const TooltipSchema = defineComponent({
  name: 'Tooltip',
  description: 'Hover information popup',
  properties: {
    placement: { type: 'enum', values: ['top', 'right', 'bottom', 'left'], default: 'top' },
    size: { type: 'enum', values: ['sm', 'md'], default: 'md' },
  },
  constraints: [],
  mappings: {
    // Placements (arrow positioning)
    'placement=top': {
      marginBottom: '0.5rem',
    },
    'placement=right': {
      marginLeft: '0.5rem',
    },
    'placement=bottom': {
      marginTop: '0.5rem',
    },
    'placement=left': {
      marginRight: '0.5rem',
    },
    
    // Sizes
    'size=sm': { padding: '0.375rem 0.5rem', fontSize: '0.75rem' },
    'size=md': { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
  },
  baseStyles: {
    backgroundColor: 'var(--intent-color-neutral-900)',
    color: 'white',
    borderRadius: '0.375rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    zIndex: '50',
    pointerEvents: 'none',
  },
});

// ============================================================================
// Popover
// ============================================================================

export const PopoverSchema = defineComponent({
  name: 'Popover',
  description: 'Click-triggered content popup',
  properties: {
    placement: { type: 'enum', values: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end'], default: 'bottom' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    // Sizes
    'size=sm': { width: '12rem' },
    'size=md': { width: '16rem' },
    'size=lg': { width: '20rem' },
  },
  baseStyles: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--intent-color-neutral-200)',
    zIndex: '50',
  },
});

// ============================================================================
// Menu
// ============================================================================

export const MenuSchema = defineComponent({
  name: 'Menu',
  description: 'Dropdown menu system',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    variant: { type: 'enum', values: ['default', 'compact'], default: 'default' },
  },
  constraints: [],
  mappings: {
    'size=sm': { minWidth: '8rem', padding: '0.25rem 0' },
    'size=md': { minWidth: '12rem', padding: '0.375rem 0' },
    'size=lg': { minWidth: '16rem', padding: '0.5rem 0' },
    
    'variant=compact': { padding: '0.125rem 0' },
  },
  baseStyles: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--intent-color-neutral-200)',
    listStyle: 'none',
    margin: '0',
    zIndex: '50',
  },
});

/**
 * MenuItem - Individual menu item
 */
export const MenuItemSchema = defineComponent({
  name: 'MenuItem',
  description: 'Menu item with hover and active states',
  properties: {
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    color: 'var(--intent-color-neutral-700)',
    fontSize: '0.875rem',
    transition: 'background-color 150ms',
  },
});

// ============================================================================
// Backdrop
// ============================================================================

export const BackdropSchema = defineComponent({
  name: 'Backdrop',
  description: 'Dimmed background overlay for modals/drawers',
  properties: {
    blur: { type: 'enum', values: ['none', 'sm', 'md'], default: 'none' },
  },
  constraints: [],
  mappings: {
    'blur=none': { backdropFilter: 'none' },
    'blur=sm': { backdropFilter: 'blur(4px)' },
    'blur=md': { backdropFilter: 'blur(8px)' },
  },
  baseStyles: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '40',
  },
});

// ============================================================================
// Sheet (Bottom/Top panel for mobile)
// ============================================================================

export const SheetSchema = defineComponent({
  name: 'Sheet',
  description: 'Bottom sheet for mobile interfaces',
  properties: {
    placement: { type: 'enum', values: ['top', 'bottom'], default: 'bottom' },
    size: { type: 'enum', values: ['content', 'sm', 'md', 'lg', 'full'], default: 'content' },
  },
  constraints: [],
  mappings: {
    'placement=top': {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      borderRadius: '0 0 1rem 1rem',
    },
    'placement=bottom': {
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      borderRadius: '1rem 1rem 0 0',
    },
    
    'size=sm': { maxHeight: '30vh' },
    'size=md': { maxHeight: '50vh' },
    'size=lg': { maxHeight: '75vh' },
    'size=full': { maxHeight: '90vh' },
  },
  baseStyles: {
    backgroundColor: 'white',
    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.1)',
    zIndex: '50',
    overflow: 'auto',
  },
});

// ============================================================================
// Export all overlay schemas
// ============================================================================

export const OverlaySchemas = {
  Modal: ModalSchema,
  Drawer: DrawerSchema,
  Tooltip: TooltipSchema,
  Popover: PopoverSchema,
  Menu: MenuSchema,
  MenuItem: MenuItemSchema,
  Backdrop: BackdropSchema,
  Sheet: SheetSchema,
};
