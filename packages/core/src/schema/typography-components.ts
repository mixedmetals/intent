// ============================================================================
// Typography Component Schemas
// ============================================================================

import { defineComponent } from './define.js';
import {
  fontSizeProp,
  fontWeightProp,
  lineHeightProp,
  letterSpacingProp,
  textAlignProp,
  textTransformProp,
  textDecorationProp,
  textOverflowProp,
  whiteSpaceProp,
  wordBreakProp,
  hyphensProp,
  fontStyleProp,
  listStyleTypeProp,
  listStylePositionProp,
} from './typography-props.js';

// ============================================================================
// Heading
// ============================================================================

/**
 * Heading - H1-H6 with consistent scale
 */
export const HeadingSchema = defineComponent({
  name: 'Heading',
  description: 'Semantic heading with consistent typography scale',
  properties: {
    level: { type: 'enum', values: ['1', '2', '3', '4', '5', '6'], required: true },
    size: fontSizeProp,
    weight: fontWeightProp,
    lineHeight: lineHeightProp,
    letterSpacing: letterSpacingProp,
    align: textAlignProp,
    transform: textTransformProp,
    color: { type: 'enum', values: ['default', 'muted', 'primary', 'success', 'warning', 'error'], default: 'default' },
    truncate: { type: 'boolean', default: false },
  },
  constraints: [
    {
      when: { level: '1' },
      suggest: { size: '4xl', weight: 'bold', lineHeight: 'tight' },
    },
    {
      when: { level: '2' },
      suggest: { size: '3xl', weight: 'bold', lineHeight: 'tight' },
    },
    {
      when: { level: '3' },
      suggest: { size: '2xl', weight: 'semibold', lineHeight: 'snug' },
    },
    {
      when: { level: '4' },
      suggest: { size: 'xl', weight: 'semibold', lineHeight: 'snug' },
    },
    {
      when: { level: '5' },
      suggest: { size: 'lg', weight: 'medium', lineHeight: 'normal' },
    },
    {
      when: { level: '6' },
      suggest: { size: 'base', weight: 'medium', lineHeight: 'normal' },
    },
  ],
  mappings: {
    // Font sizes
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
    'size=base': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    'size=xl': { fontSize: '1.25rem' },
    'size=2xl': { fontSize: '1.5rem' },
    'size=3xl': { fontSize: '1.875rem' },
    'size=4xl': { fontSize: '2.25rem' },
    'size=5xl': { fontSize: '3rem' },
    'size=6xl': { fontSize: '3.75rem' },
    'size=7xl': { fontSize: '4.5rem' },
    'size=8xl': { fontSize: '6rem' },
    'size=9xl': { fontSize: '8rem' },
    
    // Font weights
    'weight=thin': { fontWeight: '100' },
    'weight=extralight': { fontWeight: '200' },
    'weight=light': { fontWeight: '300' },
    'weight=normal': { fontWeight: '400' },
    'weight=medium': { fontWeight: '500' },
    'weight=semibold': { fontWeight: '600' },
    'weight=bold': { fontWeight: '700' },
    'weight=extrabold': { fontWeight: '800' },
    'weight=black': { fontWeight: '900' },
    
    // Line heights
    'lineHeight=none': { lineHeight: '1' },
    'lineHeight=tight': { lineHeight: '1.25' },
    'lineHeight=snug': { lineHeight: '1.375' },
    'lineHeight=normal': { lineHeight: '1.5' },
    'lineHeight=relaxed': { lineHeight: '1.625' },
    'lineHeight=loose': { lineHeight: '2' },
    
    // Letter spacing
    'letterSpacing=tighter': { letterSpacing: '-0.05em' },
    'letterSpacing=tight': { letterSpacing: '-0.025em' },
    'letterSpacing=normal': { letterSpacing: '0' },
    'letterSpacing=wide': { letterSpacing: '0.025em' },
    'letterSpacing=wider': { letterSpacing: '0.05em' },
    'letterSpacing=widest': { letterSpacing: '0.1em' },
    
    // Text alignment
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
    'align=justify': { textAlign: 'justify' },
    'align=start': { textAlign: 'start' },
    'align=end': { textAlign: 'end' },
    
    // Text transform
    'transform=none': { textTransform: 'none' },
    'transform=uppercase': { textTransform: 'uppercase' },
    'transform=lowercase': { textTransform: 'lowercase' },
    'transform=capitalize': { textTransform: 'capitalize' },
    
    // Truncate
    'truncate=true': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  },
  baseStyles: {
    margin: '0',
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
  },
});

// ============================================================================
// Paragraph
// ============================================================================

/**
 * Paragraph - Body text with lead/caption variants
 */
export const ParagraphSchema = defineComponent({
  name: 'Paragraph',
  description: 'Body text with size variants for lead and caption',
  properties: {
    size: { type: 'enum', values: ['xs', 'sm', 'base', 'lg', 'xl'], default: 'base' },
    variant: { type: 'enum', values: ['default', 'lead', 'caption', 'small'], default: 'default' },
    weight: fontWeightProp,
    lineHeight: lineHeightProp,
    align: textAlignProp,
    color: { type: 'enum', values: ['default', 'muted', 'primary', 'success', 'warning', 'error'], default: 'default' },
    truncate: { type: 'boolean', default: false },
  },
  constraints: [
    {
      when: { variant: 'lead' },
      suggest: { size: 'lg', lineHeight: 'relaxed' },
    },
    {
      when: { variant: 'caption' },
      suggest: { size: 'sm', color: 'muted' },
    },
    {
      when: { variant: 'small' },
      suggest: { size: 'xs', color: 'muted' },
    },
  ],
  mappings: {
    // Size mappings
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
    'size=base': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    'size=xl': { fontSize: '1.25rem' },
    
    // Line height
    'lineHeight=none': { lineHeight: '1' },
    'lineHeight=tight': { lineHeight: '1.25' },
    'lineHeight=snug': { lineHeight: '1.375' },
    'lineHeight=normal': { lineHeight: '1.5' },
    'lineHeight=relaxed': { lineHeight: '1.625' },
    'lineHeight=loose': { lineHeight: '2' },
    
    // Text alignment
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
    'align=justify': { textAlign: 'justify' },
    
    // Color
    'color=default': { color: 'var(--intent-color-neutral-900)' },
    'color=muted': { color: 'var(--intent-color-neutral-500)' },
    'color=primary': { color: 'var(--intent-color-brand-primary)' },
    
    // Truncate
    'truncate=true': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  },
  baseStyles: {
    margin: '0 0 1rem 0',
    fontFamily: 'var(--intent-typography-font-sans)',
  },
});

// ============================================================================
// Text (Enhanced)
// ============================================================================

/**
 * Text - Extended text component with full typography control
 */
export const TextSchema = defineComponent({
  name: 'Text',
  description: 'Extended text with alignment, transform, decoration, and overflow controls',
  properties: {
    size: fontSizeProp,
    weight: fontWeightProp,
    lineHeight: lineHeightProp,
    letterSpacing: letterSpacingProp,
    align: textAlignProp,
    transform: textTransformProp,
    decoration: textDecorationProp,
    decorationStyle: { type: 'enum', values: ['solid', 'double', 'dotted', 'dashed', 'wavy'], default: 'solid' },
    color: { type: 'enum', values: ['default', 'muted', 'primary', 'success', 'warning', 'error', 'inherit'], default: 'default' },
    truncate: { type: 'boolean', default: false },
    wrap: { type: 'enum', values: ['wrap', 'nowrap', 'balance', 'pretty'], default: 'wrap' },
    break: wordBreakProp,
    hyphens: hyphensProp,
    italic: { type: 'boolean', default: false },
    srOnly: { type: 'boolean', default: false },
  },
  constraints: [],
  mappings: {
    // Font sizes
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
    'size=base': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    'size=xl': { fontSize: '1.25rem' },
    'size=2xl': { fontSize: '1.5rem' },
    'size=3xl': { fontSize: '1.875rem' },
    'size=4xl': { fontSize: '2.25rem' },
    
    // Font weights
    'weight=thin': { fontWeight: '100' },
    'weight=extralight': { fontWeight: '200' },
    'weight=light': { fontWeight: '300' },
    'weight=normal': { fontWeight: '400' },
    'weight=medium': { fontWeight: '500' },
    'weight=semibold': { fontWeight: '600' },
    'weight=bold': { fontWeight: '700' },
    'weight=extrabold': { fontWeight: '800' },
    'weight=black': { fontWeight: '900' },
    
    // Line heights
    'lineHeight=none': { lineHeight: '1' },
    'lineHeight=tight': { lineHeight: '1.25' },
    'lineHeight=snug': { lineHeight: '1.375' },
    'lineHeight=normal': { lineHeight: '1.5' },
    'lineHeight=relaxed': { lineHeight: '1.625' },
    'lineHeight=loose': { lineHeight: '2' },
    
    // Text alignment
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
    'align=justify': { textAlign: 'justify' },
    
    // Text transform
    'transform=none': { textTransform: 'none' },
    'transform=uppercase': { textTransform: 'uppercase' },
    'transform=lowercase': { textTransform: 'lowercase' },
    'transform=capitalize': { textTransform: 'capitalize' },
    
    // Text decoration
    'decoration=none': { textDecoration: 'none' },
    'decoration=underline': { textDecoration: 'underline' },
    'decoration=line-through': { textDecoration: 'line-through' },
    'decoration=overline': { textDecoration: 'overline' },
    
    // Decoration styles
    'decorationStyle=solid': { textDecorationStyle: 'solid' },
    'decorationStyle=double': { textDecorationStyle: 'double' },
    'decorationStyle=dotted': { textDecorationStyle: 'dotted' },
    'decorationStyle=dashed': { textDecorationStyle: 'dashed' },
    'decorationStyle=wavy': { textDecorationStyle: 'wavy' },
    
    // Text wrap
    'wrap=wrap': { textWrap: 'wrap' },
    'wrap=nowrap': { whiteSpace: 'nowrap' },
    'wrap=balance': { textWrap: 'balance' },
    'wrap=pretty': { textWrap: 'pretty' },
    
    // Word break
    'break=normal': { wordBreak: 'normal' },
    'break=words': { wordBreak: 'break-word', overflowWrap: 'break-word' },
    'break=all': { wordBreak: 'break-all' },
    'break=keep': { wordBreak: 'keep-all' },
    
    // Hyphens
    'hyphens=none': { hyphens: 'none' },
    'hyphens=manual': { hyphens: 'manual' },
    'hyphens=auto': { hyphens: 'auto' },
    
    // Italic
    'italic=true': { fontStyle: 'italic' },
    
    // Truncate
    'truncate=true': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    
    // Screen reader only
    'srOnly=true': { 
      position: 'absolute', 
      width: '1px', 
      height: '1px', 
      padding: '0', 
      margin: '-1px', 
      overflow: 'hidden', 
      clip: 'rect(0, 0, 0, 0)', 
      whiteSpace: 'nowrap', 
      borderWidth: '0' 
    },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
  },
});

// ============================================================================
// List / ListItem
// ============================================================================

/**
 * List - Ordered and unordered lists
 */
export const ListSchema = defineComponent({
  name: 'List',
  description: 'Ordered, unordered, and description lists',
  properties: {
    type: { type: 'enum', values: ['unordered', 'ordered', 'none'], default: 'unordered' },
    marker: listStyleTypeProp,
    position: listStylePositionProp,
    spacing: { type: 'enum', values: ['none', 'tight', 'normal', 'relaxed'], default: 'normal' },
  },
  constraints: [],
  mappings: {
    // List type
    'type=unordered': { listStyleType: 'disc' },
    'type=ordered': { listStyleType: 'decimal' },
    'type=none': { listStyleType: 'none', paddingLeft: '0' },
    
    // Marker styles
    'marker=none': { listStyleType: 'none', paddingLeft: '0' },
    'marker=disc': { listStyleType: 'disc' },
    'marker=circle': { listStyleType: 'circle' },
    'marker=square': { listStyleType: 'square' },
    'marker=decimal': { listStyleType: 'decimal' },
    'marker=decimal-leading-zero': { listStyleType: 'decimal-leading-zero' },
    'marker=lower-roman': { listStyleType: 'lower-roman' },
    'marker=upper-roman': { listStyleType: 'upper-roman' },
    'marker=lower-alpha': { listStyleType: 'lower-alpha' },
    'marker=upper-alpha': { listStyleType: 'upper-alpha' },
    
    // Position
    'position=inside': { listStylePosition: 'inside' },
    'position=outside': { listStylePosition: 'outside' },
    
    // Spacing
    'spacing=none': { margin: '0', padding: '0' },
    'spacing=tight': { margin: '0.5rem 0', paddingLeft: '1.25rem' },
    'spacing=normal': { margin: '1rem 0', paddingLeft: '1.5rem' },
    'spacing=relaxed': { margin: '1.5rem 0', paddingLeft: '2rem' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
  },
});

/**
 * ListItem - Individual list item
 */
export const ListItemSchema = defineComponent({
  name: 'ListItem',
  description: 'Individual list item with optional marker override',
  properties: {
    marker: listStyleTypeProp,
  },
  constraints: [],
  mappings: {
    'marker=none': { listStyleType: 'none' },
    'marker=disc': { listStyleType: 'disc' },
    'marker=circle': { listStyleType: 'circle' },
    'marker=square': { listStyleType: 'square' },
  },
  baseStyles: {
    margin: '0.25rem 0',
  },
});

// ============================================================================
// Code
// ============================================================================

/**
 * Code - Inline and block code with syntax highlighting hooks
 */
export const CodeSchema = defineComponent({
  name: 'Code',
  description: 'Inline and block code with syntax highlighting support',
  properties: {
    variant: { type: 'enum', values: ['inline', 'block'], default: 'inline' },
    language: { type: 'string', default: '' },
    size: { type: 'enum', values: ['xs', 'sm', 'base', 'lg'], default: 'sm' },
  },
  constraints: [],
  mappings: {
    'variant=inline': {
      display: 'inline',
      padding: '0.125rem 0.25rem',
      borderRadius: '0.25rem',
      backgroundColor: 'var(--intent-color-neutral-100)',
      color: 'var(--intent-color-neutral-800)',
      fontFamily: 'var(--intent-typography-font-mono)',
    },
    'variant=block': {
      display: 'block',
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'var(--intent-color-neutral-900)',
      color: 'var(--intent-color-neutral-100)',
      fontFamily: 'var(--intent-typography-font-mono)',
      overflow: 'auto',
    },
    'size=xs': { fontSize: '0.75rem' },
    'size=sm': { fontSize: '0.875rem' },
    'size=base': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-mono)',
  },
});

// ============================================================================
// Quote
// ============================================================================

/**
 * Quote - Blockquote with citation
 */
export const QuoteSchema = defineComponent({
  name: 'Quote',
  description: 'Blockquote with optional citation',
  properties: {
    variant: { type: 'enum', values: ['default', 'bordered', 'pull'], default: 'default' },
    size: { type: 'enum', values: ['sm', 'base', 'lg', 'xl'], default: 'base' },
    align: textAlignProp,
  },
  constraints: [],
  mappings: {
    'variant=default': {
      paddingLeft: '1rem',
      borderLeft: '4px solid var(--intent-color-neutral-300)',
      fontStyle: 'italic',
    },
    'variant=bordered': {
      padding: '1rem',
      borderLeft: '4px solid var(--intent-color-brand-primary)',
      backgroundColor: 'var(--intent-color-neutral-50)',
      borderRadius: '0 0.5rem 0.5rem 0',
    },
    'variant=pull': {
      float: 'left',
      width: '40%',
      margin: '0 1.5rem 1rem 0',
      padding: '1rem',
      fontSize: '1.25rem',
      fontStyle: 'italic',
      borderLeft: '4px solid var(--intent-color-brand-primary)',
    },
    'size=sm': { fontSize: '0.875rem' },
    'size=base': { fontSize: '1rem' },
    'size=lg': { fontSize: '1.125rem' },
    'size=xl': { fontSize: '1.25rem' },
    'align=left': { textAlign: 'left' },
    'align=center': { textAlign: 'center' },
    'align=right': { textAlign: 'right' },
  },
  baseStyles: {
    margin: '1rem 0',
    color: 'var(--intent-color-neutral-700)',
  },
});

// ============================================================================
// Prose
// ============================================================================

/**
 * Prose - Markdown content wrapper (like Tailwind Typography)
 */
export const ProseSchema = defineComponent({
  name: 'Prose',
  description: 'Wrapper for markdown/rich text content with sensible defaults',
  properties: {
    size: { type: 'enum', values: ['sm', 'base', 'lg'], default: 'base' },
    color: { type: 'enum', values: ['default', 'invert'], default: 'default' },
  },
  constraints: [],
  mappings: {
    'size=sm': { fontSize: '0.875rem', lineHeight: '1.7142857' },
    'size=base': { fontSize: '1rem', lineHeight: '1.75' },
    'size=lg': { fontSize: '1.125rem', lineHeight: '1.7777778' },
    'color=invert': { color: 'var(--intent-color-neutral-200)' },
  },
  baseStyles: {
    fontFamily: 'var(--intent-typography-font-sans)',
    color: 'var(--intent-color-neutral-900)',
    maxWidth: '65ch', // Optimal reading width
  },
});

// ============================================================================
// Kbd
// ============================================================================

/**
 * Kbd - Keyboard input styling
 */
export const KbdSchema = defineComponent({
  name: 'Kbd',
  description: 'Keyboard key styling',
  properties: {
    size: { type: 'enum', values: ['sm', 'base'], default: 'base' },
  },
  constraints: [],
  mappings: {
    'size=sm': { fontSize: '0.75rem', padding: '0.125rem 0.375rem' },
    'size=base': { fontSize: '0.875rem', padding: '0.125rem 0.5rem' },
  },
  baseStyles: {
    display: 'inline-block',
    fontFamily: 'var(--intent-typography-font-mono)',
    fontWeight: '500',
    lineHeight: '1',
    color: 'var(--intent-color-neutral-700)',
    backgroundColor: 'var(--intent-color-neutral-100)',
    border: '1px solid var(--intent-color-neutral-300)',
    borderBottomWidth: '2px',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05)',
  },
});

// ============================================================================
// Mark
// ============================================================================

/**
 * Mark - Highlight/mark text
 */
export const MarkSchema = defineComponent({
  name: 'Mark',
  description: 'Highlighted/marked text',
  properties: {
    variant: { type: 'enum', values: ['default', 'primary', 'success', 'warning', 'error'], default: 'default' },
  },
  constraints: [],
  mappings: {
    'variant=default': { backgroundColor: 'var(--intent-color-yellow-200)' },
    'variant=primary': { backgroundColor: 'var(--intent-color-blue-200)' },
    'variant=success': { backgroundColor: 'var(--intent-color-green-200)' },
    'variant=warning': { backgroundColor: 'var(--intent-color-amber-200)' },
    'variant=error': { backgroundColor: 'var(--intent-color-red-200)' },
  },
  baseStyles: {
    padding: '0.125rem 0.25rem',
    borderRadius: '0.125rem',
  },
});

// ============================================================================
// Export all typography schemas
// ============================================================================

export const TypographySchemas = {
  Heading: HeadingSchema,
  Paragraph: ParagraphSchema,
  Text: TextSchema,
  List: ListSchema,
  ListItem: ListItemSchema,
  Code: CodeSchema,
  Quote: QuoteSchema,
  Prose: ProseSchema,
  Kbd: KbdSchema,
  Mark: MarkSchema,
};
