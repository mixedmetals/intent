// ============================================================================
// Data Display Component Schemas
// ============================================================================

import { defineComponent } from './define.js';

// ============================================================================
// Button (Primary Action Component)
// ============================================================================

export const ButtonSchema = defineComponent({
  name: 'Button',
  description: 'Interactive button with schema-driven focus management and accessibility',
  properties: {
    /**
     * Visual importance level
     */
    importance: { 
      type: 'enum', 
      values: ['primary', 'secondary', 'ghost', 'danger'], 
      default: 'secondary',
      description: 'Primary for main actions, secondary for alternatives, ghost for subtle, danger for destructive'
    },
    
    /**
     * Size affects touch target and visual weight
     */
    size: { 
      type: 'enum', 
      values: ['sm', 'md', 'lg'], 
      default: 'md',
      description: 'Small for dense UIs, medium default, large for emphasis'
    },
    
    /**
     * Loading state
     */
    loading: { 
      type: 'boolean', 
      default: false,
      description: 'Shows spinner and disables interaction'
    },
    
    /**
     * Disabled state
     */
    disabled: { 
      type: 'boolean', 
      default: false,
      description: 'Non-interactive state'
    },
    
    /**
     * Full width (block level)
     */
    fullWidth: { 
      type: 'boolean', 
      default: false,
      description: 'Expands to fill container width'
    },
    
    /**
     * Focus ring variant - schema-driven accessibility
     * LLM doesn't need to "remember" to add focus styles
     */
    focusVariant: { 
      type: 'enum', 
      values: ['default', 'inner', 'outer', 'none'], 
      default: 'default',
      description: 'Default uses outline offset, inner for inset shadow, outer for double shadow, none for no ring'
    },
    
    /**
     * Icon support
     */
    hasIcon: { 
      type: 'boolean', 
      default: false,
      description: 'Whether button contains an icon (affects spacing)'
    },
    
    /**
     * Icon position
     */
    iconPosition: { 
      type: 'enum', 
      values: ['left', 'right'], 
      default: 'left',
      description: 'Icon placement relative to text'
    },
  },
  
  constraints: [
    {
      when: { disabled: true },
      forbid: ['loading'],
      message: 'Disabled button cannot also be loading (redundant)',
    },
    {
      when: { importance: 'ghost' },
      forbid: ['focusVariant=none'],
      message: 'Ghost buttons require visible focus rings for accessibility',
    },
    {
      when: { importance: 'danger' },
      require: { size: ['md', 'lg'] },
      message: 'Danger actions require larger touch targets for safety',
    },
  ],
  
  mappings: {
    // Importance (visual weight)
    'importance=primary': {
      backgroundColor: 'var(--intent-color-primary-600)',
      color: '#ffffff',
      borderColor: 'transparent',
    },
    'importance=secondary': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-primary-600)',
      borderColor: 'var(--intent-color-neutral-300)',
    },
    'importance=ghost': {
      backgroundColor: 'transparent',
      color: 'var(--intent-color-primary-600)',
      borderColor: 'transparent',
    },
    'importance=danger': {
      backgroundColor: 'var(--intent-color-error-600)',
      color: '#ffffff',
      borderColor: 'transparent',
    },
    
    // Size (affects padding and touch target)
    'size=sm': {
      height: '2rem',
      padding: '0 0.75rem',
      fontSize: '0.875rem',
      gap: '0.375rem',
    },
    'size=md': {
      height: '2.5rem',
      padding: '0 1rem',
      fontSize: '1rem',
      gap: '0.5rem',
    },
    'size=lg': {
      height: '3rem',
      padding: '0 1.25rem',
      fontSize: '1.125rem',
      gap: '0.625rem',
    },
    
    // Loading state
    'loading=true': {
      cursor: 'wait',
      opacity: '0.8',
    },
    
    // Disabled state
    'disabled=true': {
      cursor: 'not-allowed',
      opacity: '0.5',
    },
    
    // Full width
    'fullWidth=true': {
      width: '100%',
    },
    
    // Focus ring variants (schema-driven accessibility)
    'focusVariant=default': {
      focusClass: 'intent-button--focus-default',
    },
    'focusVariant=inner': {
      focusClass: 'intent-button--focus-inner',
    },
    'focusVariant=outer': {
      focusClass: 'intent-button--focus-outer',
    },
    'focusVariant=none': {
      focusClass: 'intent-button--focus-none',
    },
    
    // Icon adjustments
    'hasIcon=true,iconPosition=left': {
      paddingLeft: 'calc(var(--intent-button-padding-left, 1rem) - 0.125rem)',
    },
    'hasIcon=true,iconPosition=right': {
      paddingRight: 'calc(var(--intent-button-padding-right, 1rem) - 0.125rem)',
    },
  },
  
  baseStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--intent-font-sans)',
    fontWeight: '500',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textDecoration: 'none',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    // Default focus ring tokens (can be overridden by theme)
    '--intent-focus-ring-width': '2px',
    '--intent-focus-ring-offset': '2px',
    '--intent-focus-ring-color': 'var(--intent-color-primary-500)',
  },
});

// ============================================================================
// Table
// ============================================================================

export const TableSchema = defineComponent({
  name: 'Table',
  description: 'Data table with sorting and filtering capabilities',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    variant: { type: 'enum', values: ['default', 'striped', 'bordered', 'ghost'], default: 'default' },
    density: { type: 'enum', values: ['compact', 'normal', 'relaxed'], default: 'normal' },
    stickyHeader: { type: 'boolean', default: false },
    stickyFooter: { type: 'boolean', default: false },
    fullWidth: { type: 'boolean', default: true },
  },
  constraints: [],
  mappings: {
    // Sizes
    'size=sm': { '--table-cell-padding': '0.375rem 0.75rem', '--table-font-size': '0.875rem' },
    'size=md': { '--table-cell-padding': '0.75rem 1rem', '--table-font-size': '1rem' },
    'size=lg': { '--table-cell-padding': '1rem 1.25rem', '--table-font-size': '1.125rem' },
    
    // Density
    'density=compact': { '--table-cell-padding': '0.25rem 0.5rem' },
    'density=normal': { '--table-cell-padding': '0.75rem 1rem' },
    'density=relaxed': { '--table-cell-padding': '1rem 1.5rem' },
    
    // Variants
    'variant=striped': {},
    'variant=bordered': { border: '1px solid var(--intent-color-neutral-200)' },
    'variant=ghost': { backgroundColor: 'transparent' },
    
    // Sticky
    'stickyHeader=true': {},
    'stickyFooter=true': {},
    
    'fullWidth=true': { width: '100%' },
  },
  baseStyles: {
    borderCollapse: 'collapse',
    fontSize: 'var(--table-font-size, 1rem)',
  },
});

export const TableHeaderSchema = defineComponent({
  name: 'TableHeader',
  description: 'Table header section',
  properties: {
    sticky: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'sticky=true': {
      position: 'sticky',
      top: '0',
      zIndex: '10',
    },
  },
  baseStyles: {
    backgroundColor: 'var(--intent-color-neutral-50)',
    fontWeight: '600',
  },
});

export const TableRowSchema = defineComponent({
  name: 'TableRow',
  description: 'Table row with state variants',
  properties: {
    selected: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    hoverable: { type: 'boolean', default: true },
  },
  constraints: [],
  mappings: {
    'selected=true': {
      backgroundColor: 'var(--intent-color-brand-50)',
    },
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    'hoverable=true,selected=false,disabled=false': {
      ':hover': {
        backgroundColor: 'var(--intent-color-neutral-50)',
      },
    },
  },
  baseStyles: {
    borderBottom: '1px solid var(--intent-color-neutral-200)',
    transition: 'background-color 150ms',
  },
});

export const TableCellSchema = defineComponent({
  name: 'TableCell',
  description: 'Table cell (th or td)',
  properties: {
    align: { type: 'enum', values: ['left', 'center', 'right'], default: 'left' },
    padding: { type: 'enum', values: ['normal', 'checkbox', 'none'], default: 'normal' },
    width: { type: 'string', default: '' },
  },
  constraints: [],
  mappings: {
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
    
    'padding=normal': { padding: 'var(--table-cell-padding, 0.75rem 1rem)' },
    'padding=checkbox': { padding: '0 0 0 0.5rem', width: '2.5rem' },
    'padding=none': { padding: '0' },
  },
  baseStyles: {},
});

// ============================================================================
// Stat / Statistics Display
// ============================================================================

export const StatSchema = defineComponent({
  name: 'Stat',
  description: 'Statistics display component',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    orientation: { type: 'enum', values: ['vertical', 'horizontal'], default: 'vertical' },
    bordered: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'size=sm': { '--stat-label-size': '0.75rem', '--stat-value-size': '1.25rem' },
    'size=md': { '--stat-label-size': '0.875rem', '--stat-value-size': '1.5rem' },
    'size=lg': { '--stat-label-size': '1rem', '--stat-value-size': '2rem' },
    
    'orientation=vertical': { display: 'flex', flexDirection: 'column' },
    'orientation=horizontal': { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' },
    
    'bordered=true': {
      border: '1px solid var(--intent-color-neutral-200)',
      borderRadius: '0.5rem',
      padding: '1rem',
    },
  },
  baseStyles: {},
});

export const StatLabelSchema = defineComponent({
  name: 'StatLabel',
  description: 'Stat label text',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    fontSize: 'var(--stat-label-size, 0.875rem)',
    color: 'var(--intent-color-neutral-500)',
    fontWeight: '500',
  },
});

export const StatValueSchema = defineComponent({
  name: 'StatValue',
  description: 'Stat value display',
  properties: {
    trend: { type: 'enum', values: ['neutral', 'up', 'down'], default: 'neutral' },
  },
  constraints: [],
  mappings: {
    'trend=neutral': { color: 'var(--intent-color-neutral-900)' },
    'trend=up': { color: 'var(--intent-color-success-500)' },
    'trend=down': { color: 'var(--intent-color-error-500)' },
  },
  baseStyles: {
    fontSize: 'var(--stat-value-size, 1.5rem)',
    fontWeight: '700',
    lineHeight: '1.2',
  },
});

export const StatHelpTextSchema = defineComponent({
  name: 'StatHelpText',
  description: 'Stat help/description text',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    fontSize: '0.75rem',
    color: 'var(--intent-color-neutral-400)',
    marginTop: '0.25rem',
  },
});

// ============================================================================
// Timeline
// ============================================================================

export const TimelineSchema = defineComponent({
  name: 'Timeline',
  description: 'Chronological timeline display',
  properties: {
    orientation: { type: 'enum', values: ['vertical', 'horizontal'], default: 'vertical' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'orientation=vertical': { display: 'flex', flexDirection: 'column' },
    'orientation=horizontal': { display: 'flex', flexDirection: 'row' },
    
    'size=sm': { '--timeline-dot-size': '0.75rem', '--timeline-line-width': '1px' },
    'size=md': { '--timeline-dot-size': '1rem', '--timeline-line-width': '2px' },
    'size=lg': { '--timeline-dot-size': '1.5rem', '--timeline-line-width': '2px' },
  },
  baseStyles: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
});

export const TimelineItemSchema = defineComponent({
  name: 'TimelineItem',
  description: 'Individual timeline item',
  properties: {
    status: { type: 'enum', values: ['completed', 'current', 'pending'], default: 'pending' },
  },
  constraints: [],
  mappings: {
    'status=completed': { '--timeline-color': 'var(--intent-color-success-500)' },
    'status=current': { '--timeline-color': 'var(--intent-color-brand-primary)' },
    'status=pending': { '--timeline-color': 'var(--intent-color-neutral-300)' },
  },
  baseStyles: {
    display: 'flex',
    gap: '1rem',
    position: 'relative',
    paddingBottom: '1.5rem',
  },
});

// ============================================================================
// Description List
// ============================================================================

export const DescriptionListSchema = defineComponent({
  name: 'DescriptionList',
  description: 'Key-value pair display',
  properties: {
    orientation: { type: 'enum', values: ['vertical', 'horizontal'], default: 'vertical' },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
  },
  constraints: [],
  mappings: {
    'orientation=vertical': {},
    'orientation=horizontal': {},
    
    'size=sm': { '--dl-term-size': '0.75rem', '--dl-desc-size': '0.875rem', gap: '0.25rem' },
    'size=md': { '--dl-term-size': '0.875rem', '--dl-desc-size': '1rem', gap: '0.5rem' },
    'size=lg': { '--dl-term-size': '1rem', '--dl-desc-size': '1.125rem', gap: '0.75rem' },
  },
  baseStyles: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
  },
});

export const DescriptionTermSchema = defineComponent({
  name: 'DescriptionTerm',
  description: 'Description list term (key)',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    fontSize: 'var(--dl-term-size, 0.875rem)',
    fontWeight: '600',
    color: 'var(--intent-color-neutral-900)',
  },
});

export const DescriptionDetailSchema = defineComponent({
  name: 'DescriptionDetail',
  description: 'Description list detail (value)',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    fontSize: 'var(--dl-desc-size, 1rem)',
    color: 'var(--intent-color-neutral-600)',
    marginLeft: '0',
  },
});

// ============================================================================
// Tree
// ============================================================================

export const TreeSchema = defineComponent({
  name: 'Tree',
  description: 'Hierarchical tree view',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    selectable: { type: 'boolean', default: false },
    multiSelect: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'size=sm': { '--tree-item-height': '1.75rem', '--tree-icon-size': '0.875rem' },
    'size=md': { '--tree-item-height': '2.25rem', '--tree-icon-size': '1rem' },
    'size=lg': { '--tree-item-height': '2.75rem', '--tree-icon-size': '1.25rem' },
  },
  baseStyles: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
});

export const TreeItemSchema = defineComponent({
  name: 'TreeItem',
  description: 'Tree node item',
  properties: {
    expanded: { type: 'boolean', default: false },
    selected: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    hasChildren: { type: 'boolean', default: false },
    depth: { type: 'number', default: 0 },
  },
  constraints: [],
  mappings: {
    'selected=true': {
      backgroundColor: 'var(--intent-color-brand-50)',
      color: 'var(--intent-color-brand-primary)',
    },
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    height: 'var(--tree-item-height, 2.25rem)',
    paddingLeft: 'calc(var(--tree-indent, 1.5rem) * var(--depth, 0))',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    transition: 'background-color 150ms',
  },
});

// ============================================================================
// Calendar
// ============================================================================

export const CalendarSchema = defineComponent({
  name: 'Calendar',
  description: 'Calendar date display/picker',
  properties: {
    size: { type: 'enum', values: ['sm', 'md', 'lg'], default: 'md' },
    view: { type: 'enum', values: ['month', 'year', 'decade'], default: 'month' },
  },
  constraints: [],
  mappings: {
    'size=sm': { '--calendar-day-size': '2rem', '--calendar-font-size': '0.875rem' },
    'size=md': { '--calendar-day-size': '2.5rem', '--calendar-font-size': '1rem' },
    'size=lg': { '--calendar-day-size': '3rem', '--calendar-font-size': '1.125rem' },
  },
  baseStyles: {
    display: 'inline-block',
    border: '1px solid var(--intent-color-neutral-200)',
    borderRadius: '0.5rem',
    padding: '1rem',
    backgroundColor: 'white',
  },
});

export const CalendarDaySchema = defineComponent({
  name: 'CalendarDay',
  description: 'Individual calendar day cell',
  properties: {
    selected: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
    today: { type: 'boolean', default: false },
    inRange: { type: 'boolean', default: false },
    outside: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'selected=true': {
      backgroundColor: 'var(--intent-color-brand-primary)',
      color: 'white',
    },
    'disabled=true': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    'today=true,selected=false': {
      border: '2px solid var(--intent-color-brand-primary)',
      fontWeight: '600',
    },
    'inRange=true,selected=false': {
      backgroundColor: 'var(--intent-color-brand-50)',
    },
    'outside=true': {
      color: 'var(--intent-color-neutral-400)',
    },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--calendar-day-size, 2.5rem)',
    height: 'var(--calendar-day-size, 2.5rem)',
    fontSize: 'var(--calendar-font-size, 1rem)',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
});

// ============================================================================
// Card Variations (already have Card, adding specific types)
// ============================================================================

export const CardMediaSchema = defineComponent({
  name: 'CardMedia',
  description: 'Card media section for images/video',
  properties: {
    position: { type: 'enum', values: ['top', 'bottom', 'background'], default: 'top' },
    ratio: { type: 'enum', values: ['auto', '16:9', '4:3', '1:1', '21:9'], default: 'auto' },
  },
  constraints: [],
  mappings: {
    'position=top': { borderRadius: '0.5rem 0.5rem 0 0' },
    'position=bottom': { borderRadius: '0 0 0.5rem 0.5rem', order: '1' },
    'position=background': { position: 'absolute', inset: '0', zIndex: '0' },
    
    'ratio=16:9': { aspectRatio: '16/9' },
    'ratio=4:3': { aspectRatio: '4/3' },
    'ratio=1:1': { aspectRatio: '1/1' },
    'ratio=21:9': { aspectRatio: '21/9' },
  },
  baseStyles: {
    overflow: 'hidden',
    width: '100%',
  },
});

export const CardHeaderSchema = defineComponent({
  name: 'CardHeader',
  description: 'Card header section',
  properties: {
    align: { type: 'enum', values: ['left', 'center', 'right'], default: 'left' },
  },
  constraints: [],
  mappings: {
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
  },
  baseStyles: {
    padding: '1rem 1.25rem',
    borderBottom: '1px solid var(--intent-color-neutral-100)',
  },
});

export const CardFooterSchema = defineComponent({
  name: 'CardFooter',
  description: 'Card footer section',
  properties: {
    align: { type: 'enum', values: ['left', 'center', 'right'], default: 'left' },
    divider: { type: 'boolean', default: true },
  },
  constraints: [],
  mappings: {
    'align=left': { justifyContent: 'flex-start' },
    'align=center': { justifyContent: 'center' },
    'align=right': { justifyContent: 'flex-end' },
    
    'divider=true': { borderTop: '1px solid var(--intent-color-neutral-100)' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
  },
});

// ============================================================================
// Accordion
// ============================================================================

export const AccordionSchema = defineComponent({
  name: 'Accordion',
  description: 'Collapsible content sections',
  properties: {
    variant: { type: 'enum', values: ['default', 'contained', 'separated'], default: 'default' },
    allowMultiple: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'variant=default': {},
    'variant=contained': { border: '1px solid var(--intent-color-neutral-200)', borderRadius: '0.5rem' },
    'variant=separated': { gap: '0.5rem' },
  },
  baseStyles: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

export const AccordionItemSchema = defineComponent({
  name: 'AccordionItem',
  description: 'Individual accordion section',
  properties: {
    expanded: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    'expanded=true': {},
    'disabled=true': { opacity: '0.5' },
  },
  baseStyles: {
    borderBottom: '1px solid var(--intent-color-neutral-200)',
  },
});

export const AccordionTriggerSchema = defineComponent({
  name: 'AccordionTrigger',
  description: 'Accordion header button',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 150ms',
  },
});

export const AccordionContentSchema = defineComponent({
  name: 'AccordionContent',
  description: 'Accordion collapsible content',
  properties: {},
  constraints: [],
  mappings: {},
  baseStyles: {
    padding: '0 1rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--intent-color-neutral-600)',
  },
});

// ============================================================================
// Avatar
// ============================================================================

export const AvatarSchema = defineComponent({
  name: 'Avatar',
  description: 'User avatar with image fallback to initials',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], default: 'md' },
    variant: { type: 'enum', values: ['circle', 'square', 'rounded'], default: 'circle' },
    color: { type: 'enum', values: ['neutral', 'primary', 'success', 'warning', 'error'], default: 'neutral' },
  },
  constraints: [],
  mappings: {
    'size=xs': { width: '1.5rem', height: '1.5rem', fontSize: '0.5rem' },
    'size=sm': { width: '2rem', height: '2rem', fontSize: '0.75rem' },
    'size=md': { width: '2.5rem', height: '2.5rem', fontSize: '0.875rem' },
    'size=lg': { width: '3rem', height: '3rem', fontSize: '1rem' },
    'size=xl': { width: '4rem', height: '4rem', fontSize: '1.25rem' },
    'size=2xl': { width: '5rem', height: '5rem', fontSize: '1.5rem' },
    
    'variant=circle': { borderRadius: '50%' },
    'variant=square': { borderRadius: '0' },
    'variant=rounded': { borderRadius: '0.375rem' },
    
    'color=neutral': { backgroundColor: 'var(--intent-color-neutral-200)', color: 'var(--intent-color-neutral-700)' },
    'color=primary': { backgroundColor: 'var(--intent-color-primary-100)', color: 'var(--intent-color-primary-700)' },
    'color=success': { backgroundColor: 'var(--intent-color-success-100)', color: 'var(--intent-color-success-700)' },
    'color=warning': { backgroundColor: 'var(--intent-color-warning-100)', color: 'var(--intent-color-warning-700)' },
    'color=error': { backgroundColor: 'var(--intent-color-error-100)', color: 'var(--intent-color-error-700)' },
  },
  baseStyles: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    overflow: 'hidden',
    flexShrink: '0',
  },
});

export const AvatarGroupSchema = defineComponent({
  name: 'AvatarGroup',
  description: 'Stacked avatar collection with overlap',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], default: 'md' },
    max: { type: 'number', default: 0 },
    spacing: { type: 'enum', values: ['tight', 'normal', 'loose'], default: 'tight' },
  },
  constraints: [],
  mappings: {
    'spacing=tight': { '--avatar-overlap': '-0.5rem' },
    'spacing=normal': { '--avatar-overlap': '-0.25rem' },
    'spacing=loose': { '--avatar-overlap': '0.25rem' },
  },
  baseStyles: {
    display: 'flex',
    alignItems: 'center',
  },
});

// ============================================================================
// Export all data display schemas
// ============================================================================

export const DataDisplaySchemas = {
  Table: TableSchema,
  TableHeader: TableHeaderSchema,
  TableRow: TableRowSchema,
  TableCell: TableCellSchema,
  Stat: StatSchema,
  StatLabel: StatLabelSchema,
  StatValue: StatValueSchema,
  StatHelpText: StatHelpTextSchema,
  Timeline: TimelineSchema,
  TimelineItem: TimelineItemSchema,
  DescriptionList: DescriptionListSchema,
  DescriptionTerm: DescriptionTermSchema,
  DescriptionDetail: DescriptionDetailSchema,
  Tree: TreeSchema,
  TreeItem: TreeItemSchema,
  Calendar: CalendarSchema,
  CalendarDay: CalendarDaySchema,
  CardMedia: CardMediaSchema,
  CardHeader: CardHeaderSchema,
  CardFooter: CardFooterSchema,
  Accordion: AccordionSchema,
  AccordionItem: AccordionItemSchema,
  AccordionTrigger: AccordionTriggerSchema,
  AccordionContent: AccordionContentSchema,
  Avatar: AvatarSchema,
  AvatarGroup: AvatarGroupSchema,
};
