// ============================================================================
// Navigation Component Schemas
// ============================================================================

import { defineComponent } from './define.js';

// ============================================================================
// Tabs
// ============================================================================

export const TabsSchema = defineComponent({
  name: 'Tabs',
  description: 'Horizontal or vertical tab navigation',
  properties: {
    orientation: { type: 'enum', values: ['horizontal', 'vertical'], default: 'horizontal' },
    variant: { type: 'enum', values: ['line', 'enclosed', 'enclosed-colored', 'soft-rounded', 'solid-rounded'], default: 'line' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    align: { type: 'enum', values: ['start', 'center', 'end'], default: 'start' },
    fullWidth: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Orientations
    'orientation=horizontal': { display: 'flex', flexDirection: 'row' },
    'orientation=vertical': { display: 'flex', flexDirection: 'column' },
    
    // Sizes
    'size=sm': { '--tab-padding': '0.5rem 0.75rem', '--tab-font-size': '0.875rem' },
    'size=md': { '--tab-padding': '0.75rem 1rem', '--tab-font-size': '1rem' },
    'size=lg': { '--tab-padding': '1rem 1.25rem', '--tab-font-size': '1.125rem' },
    
    // Align
    'align=start': { justifyContent: 'flex-start' },
    'align=center': { justifyContent: 'center' },
    'align=end': { justifyContent: 'flex-end' },
    
    // Full width
    'fullWidth=true': { width: '100%' },
  },
  baseStyles: {
    borderBottom: 'none',
    gap: '0',
  },
});

/**
 * Tab - Individual tab button
 */
export const TabSchema = defineComponent({
  name: 'Tab',
  description: 'Individual tab button',
  properties: {
    selected: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Line variant states
    'selected=true,variant=line': {
      color: 'var(--intent-color-brand-primary)',
      borderBottom: '2px solid var(--intent-color-brand-primary)',
    },
    'selected=false,variant=line': {
      color: 'var(--intent-color-neutral-500)',
      borderBottom: '2px solid transparent',
    },
    
    // Enclosed variant
    'selected=true,variant=enclosed': {
      backgroundColor: 'white',
      borderColor: 'var(--intent-color-neutral-200)',
      borderBottomColor: 'white',
      color: 'var(--intent-color-neutral-900)',
    },
    'selected=false,variant=enclosed': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'var(--intent-color-neutral-500)',
    },
    
    // Soft rounded
    'selected=true,variant=soft-rounded': {
      backgroundColor: 'var(--intent-color-neutral-100)',
      color: 'var(--intent-color-neutral-900)',
      borderRadius: '0.375rem',
    },
    'selected=false,variant=soft-rounded': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-neutral-500)',
    },
    
    // Solid rounded
    'selected=true,variant=solid-rounded': {
      backgroundColor: 'var(--intent-color-brand-primary)',
      color: 'white',
      borderRadius: '0.375rem',
    },
    'selected=false,variant=solid-rounded': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-neutral-500)',
    },
    
    // Disabled
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  baseStyles: {
    padding: 'var(--tab-padding, 0.75rem 1rem)',
    fontSize: 'var(--tab-font-size, 1rem)',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms',
    border: '1px solid transparent',
    background: 'none',
    whiteSpace: 'nowrap',
  },
});

// ============================================================================
// Breadcrumbs
// ============================================================================

export const BreadcrumbsSchema = defineComponent({
  name: 'Breadcrumbs',
  description: 'Hierarchical navigation path',
  properties: {
    separator: { type: 'enum', values: ['chevron', 'slash', 'arrow', 'dot'], default: 'chevron' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'size=sm': { fontSize: '0.875rem' },
    'size=md': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
});

/**
 * BreadcrumbItem - Individual breadcrumb item
 */
export const BreadcrumbItemSchema = defineComponent({
  name: 'BreadcrumbItem',
  description: 'Individual breadcrumb link or text',
  properties: {
    current: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'current=true': {
      color: 'var(--intent-color-neutral-900)',
      fontWeight: '500',
    },
    'current=false': {
      color: 'var(--intent-color-neutral-500)',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
});

// ============================================================================
// Pagination
// ============================================================================

export const PaginationSchema = defineComponent({
  name: 'Pagination',
  description: 'Page number navigation',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    variant: { type: 'enum', values: ['default', 'simple', 'minimal'], default: 'default' },
  },
  constraints: [],
  mappings: {
    'size=sm': { '--pagination-item-size': '2rem', '--pagination-font-size': '0.875rem' },
    'size=md': { '--pagination-item-size': '2.5rem', '--pagination-font-size': '1rem' },
    'size=lg': { '--pagination-item-size': '3rem', '--pagination-font-size': '1.125rem' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
});

/**
 * PaginationItem - Individual page number
 */
export const PaginationItemSchema = defineComponent({
  name: 'PaginationItem',
  description: 'Individual pagination button',
  properties: {
    selected: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'selected=true': {
      backgroundColor: 'var(--intent-color-brand-primary)',
      color: 'white',
      borderColor: 'var(--intent-color-brand-primary)',
    },
    'selected=false': {
      backgroundColor: 'white',
      color: 'var(--intent-color-neutral-700)',
      borderColor: 'var(--intent-color-neutral-300)',
    },
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--pagination-item-size, 2.5rem)',
    height: 'var(--pagination-item-size, 2.5rem)',
    fontSize: 'var(--pagination-font-size, 1rem)',
    border: '1px solid',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
});

// ============================================================================
// Link
// ============================================================================

export const LinkSchema = defineComponent({
  name: 'Link',
  description: 'Styled anchor component',
  properties: {
    variant: { type: 'enum', values: ['default', 'subtle', 'underline', 'button'], default: 'default' },
    color: { type: 'enum', values: ['default', 'primary', 'neutral', 'danger'], default: 'default' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    external: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Variants
    'variant=default': { textDecoration: 'none' },
    'variant=subtle': { textDecoration: 'none', opacity: '0.8' },
    'variant=underline': { textDecoration: 'underline' },
    'variant=button': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      textDecoration: 'none',
    },
    
    // Colors
    'color=default,variant=default': { color: 'var(--intent-color-brand-primary)' },
    'color=primary': { color: 'var(--intent-color-brand-primary)' },
    'color=neutral': { color: 'var(--intent-color-neutral-600)' },
    'color=danger': { color: 'var(--intent-color-error-500)' },
    
    // Sizes
    'size=sm': { fontSize: '0.875rem' },
    'size=md': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    
    // States
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  baseStyles: {
    cursor: 'pointer',
    transition: 'color 150ms, opacity 150ms',
  },
});

// ============================================================================
// Nav / NavItem
// ============================================================================

export const NavSchema = defineComponent({
  name: 'Nav',
  description: 'Navigation list container',
  properties: {
    orientation: { type: 'enum', values: ['horizontal', 'vertical'], default: 'vertical' },
    spacing: { type: 'enum', values: ['none', 'xs', 'sm', 'md', 'lg'], default: 'sm' },
  },
  constraints: [],
  mappings: {
    'orientation=horizontal': { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
    'orientation=vertical': { display: 'flex', flexDirection: 'column' },
    
    'spacing=none': { gap: '0' },
    'spacing=xs': { gap: '0.25rem' },
    'spacing=sm': { gap: '0.5rem' },
    'spacing=md': { gap: '0.75rem' },
    'spacing=lg': { gap: '1rem' },
  },
  baseStyles: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
});

export const NavItemSchema = defineComponent({
  name: 'NavItem',
  description: 'Navigation list item',
  properties: {
    active: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'active=true': {
      backgroundColor: 'var(--intent-color-brand-50)',
      color: 'var(--intent-color-brand-primary)',
      fontWeight: '500',
    },
    'active=false': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-neutral-600)',
    },
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
});

// ============================================================================
// Steps
// ============================================================================

export const StepsSchema = defineComponent({
  name: 'Steps',
  description: 'Wizard or multi-step progress indicator',
  properties: {
    orientation: { type: 'enum', values: ['horizontal', 'vertical'], default: 'horizontal' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'orientation=horizontal': { display: 'flex', flexDirection: 'row' },
    'orientation=vertical': { display: 'flex', flexDirection: 'column' },
    
    'size=sm': { '--step-icon-size': '1.5rem', '--step-font-size': '0.875rem' },
    'size=md': { '--step-icon-size': '2rem', '--step-font-size': '1rem' },
    'size=lg': { '--step-icon-size': '2.5rem', '--step-font-size': '1.125rem' },
  },
});

export const StepSchema = defineComponent({
  name: 'Step',
  description: 'Individual step in a stepper',
  properties: {
    status: { type: 'enum', values: ['complete', 'current', 'upcoming'], default: 'upcoming' },
  },
  constraints: [],
  mappings: {
    'status=complete': {
      '--step-color': 'var(--intent-color-success-500)',
      '--step-bg': 'var(--intent-color-success-50)',
    },
    'status=current': {
      '--step-color': 'var(--intent-color-brand-primary)',
      '--step-bg': 'var(--intent-color-brand-50)',
    },
    'status=upcoming': {
      '--step-color': 'var(--intent-color-neutral-400)',
      '--step-bg': 'var(--intent-color-neutral-100)',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: '1',
  },
});

// ============================================================================
// Sidebar
// ============================================================================

export const SidebarSchema = defineComponent({
  name: 'Sidebar',
  description: 'Collapsible side navigation',
  properties: {
    collapsed: { type: 'boolean', default: false },
    width: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'collapsed=true': { width: '4rem' },
    'collapsed=false,width=sm': { width: '12rem' },
    'collapsed=false,width=md': { width: '16rem' },
    'collapsed=false,width=lg': { width: '20rem' },
  },
  baseStyles: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--intent-color-neutral-50)',
    borderRight: '1px solid var(--intent-color-neutral-200)',
    transition: 'width 300ms',
    overflow: 'hidden',
  },
});

// ============================================================================
// Navbar
// ============================================================================

export const NavbarSchema = defineComponent({
  name: 'Navbar',
  description: 'Top navigation bar',
  properties: {
    position: { type: 'enum', values: ['static', 'sticky', 'fixed'], default: 'static' },
    height: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'position=static': { position: 'static' },
    'position=sticky': { position: 'sticky', top: '0', zIndex: '40' },
    'position=fixed': { position: 'fixed', top: '0', left: '0', right: '0', zIndex: '40' },
    
    'height=sm': { height: '3rem' },
    'height=md': { height: '4rem' },
    'height=lg': { height: '5rem' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    backgroundColor: 'white',
    borderBottom: '1px solid var(--intent-color-neutral-200)',
  },
});

// ============================================================================
// Export all navigation schemas
// ============================================================================

export const NavigationSchemas = {
  Tabs: TabsSchema,
  Tab: TabSchema,
  Breadcrumbs: BreadcrumbsSchema,
  BreadcrumbItem: BreadcrumbItemSchema,
  Pagination: PaginationSchema,
  PaginationItem: PaginationItemSchema,
  Link: LinkSchema,
  Nav: NavSchema,
  NavItem: NavItemSchema,
  Steps: StepsSchema,
  Step: StepSchema,
  Sidebar: SidebarSchema,
  Navbar: NavbarSchema,
};
