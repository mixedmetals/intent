/**
 * ============================================================================
 * Typography Schema
 * ============================================================================
 * 
 * Type-safe typography system with Intent design tokens.
 * 
 * Schema Example:
 * ```
 * // LLM-friendly API - "Just Works" approach
 * <Text balance>Headline text that looks great</Text>
 * <Text tabular>0123.45</Text>
 * <Text clamp={3}>Long text that truncates after 3 lines</Text>
 * ```
 */

import { defineComponent } from './define.js';

// ============================================================================
// Type Scale
// ============================================================================

export const TypeScale = {
  /** 12px - Fine print, captions */
  xs: { size: '0.75rem', lineHeight: 1.4, letterSpacing: '0.01em' },
  
  /** 14px - Body small, secondary text */
  sm: { size: '0.875rem', lineHeight: 1.5, letterSpacing: '0' },
  
  /** 16px - Body text (default) */
  base: { size: '1rem', lineHeight: 1.6, letterSpacing: '0' },
  
  /** 18px - Lead paragraph */
  lg: { size: '1.125rem', lineHeight: 1.5, letterSpacing: '-0.01em' },
  
  /** 20px - Small headings */
  xl: { size: '1.25rem', lineHeight: 1.4, letterSpacing: '-0.02em' },
  
  /** 24px - Section headings */
  '2xl': { size: '1.5rem', lineHeight: 1.3, letterSpacing: '-0.02em' },
  
  /** 30px - Large headings */
  '3xl': { size: '1.875rem', lineHeight: 1.2, letterSpacing: '-0.03em' },
  
  /** 36px - Display text */
  '4xl': { size: '2.25rem', lineHeight: 1.15, letterSpacing: '-0.03em' },
  
  /** 48px - Hero text */
  '5xl': { size: '3rem', lineHeight: 1.1, letterSpacing: '-0.04em' },
  
  /** 60px - Large display */
  '6xl': { size: '3.75rem', lineHeight: 1.05, letterSpacing: '-0.04em' },
} as const;

export type TypeScaleKey = keyof typeof TypeScale;

// ============================================================================
// Font Weights
// ============================================================================

export const FontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontWeightKey = keyof typeof FontWeight;

// ============================================================================
// Font Families
// ============================================================================

export const FontFamily = {
  sans: 'var(--intent-font-sans, system-ui, -apple-system, sans-serif)',
  serif: 'var(--intent-font-serif, Georgia, serif)',
  mono: 'var(--intent-font-mono, ui-monospace, monospace)',
} as const;

export type FontFamilyKey = keyof typeof FontFamily;

// ============================================================================
// Typography Component Schema
// ============================================================================

export const TypographySchema = defineComponent({
  name: 'Typography',
  
  properties: {
    // ------------------------------------------------------------------------
    // Visual Hierarchy
    // ------------------------------------------------------------------------
    
    scale: {
      type: 'enum',
      values: Object.keys(TypeScale) as TypeScaleKey[],
      default: 'base',
      description: 'Type scale preset (xs through 6xl)',
    },
    
    weight: {
      type: 'enum',
      values: Object.keys(FontWeight) as FontWeightKey[],
      default: 'normal',
      description: 'Font weight',
    },
    
    family: {
      type: 'enum',
      values: Object.keys(FontFamily) as FontFamilyKey[],
      default: 'sans',
      description: 'Font family',
    },
    
    // ------------------------------------------------------------------------
    // Text Rendering Enhancements
    // ------------------------------------------------------------------------
    
    /**
     * Text wrap balance - prevents "orphan" words on short lines.
     * Uses CSS `text-wrap: balance` for more even line lengths.
     * 
     * Best for:
     * - Headlines
     * - Card titles
     * - Any text where line breaks matter
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
     */
    balance: {
      type: 'boolean',
      default: false,
      description: 'Enable balanced text wrapping for headlines',
    },
    
    /**
     * Tabular figures - monospace numerals for alignment.
     * Uses `font-variant-numeric: tabular-nums`.
     * 
     * Best for:
     * - Data tables
     * - Timestamps
     * - Currency amounts
     * - Any numbers that need to align vertically
     */
    tabular: {
      type: 'boolean',
      default: false,
      description: 'Use tabular figures for numeric alignment',
    },
    
    /**
     * Line clamp - truncate text after N lines.
     * Uses CSS `-webkit-line-clamp` with fallback.
     * 
     * Value: Number of lines (1-10)
     */
    clamp: {
      type: 'number',
      min: 1,
      max: 10,
      description: 'Truncate text after N lines (1-10)',
    },
    
    /**
     * Text transform for stylistic consistency.
     */
    transform: {
      type: 'enum',
      values: ['none', 'uppercase', 'lowercase', 'capitalize'],
      default: 'none',
      description: 'Text transformation',
    },
    
    /**
     * Text alignment.
     */
    align: {
      type: 'enum',
      values: ['left', 'center', 'right', 'justify'],
      default: 'left',
      description: 'Text alignment',
    },
    
    // ------------------------------------------------------------------------
    // Color & Contrast
    // ------------------------------------------------------------------------
    
    intent: {
      type: 'enum',
      values: ['default', 'muted', 'primary', 'success', 'warning', 'danger'],
      default: 'default',
      description: 'Color intent for text',
    },
    
    /**
     * High contrast mode adjustment.
     */
    highContrast: {
      type: 'boolean',
      default: false,
      description: 'Force high contrast rendering',
    },
  },
  
  // ==========================================================================
  // Constraints
  // ==========================================================================
  
  constraints: [
    // balance + clamp can conflict - balance is ignored when clamped
    {
      when: { clamp: 'any' },
      message: 'text-wrap: balance is disabled when clamp is active',
    },
    
    // tabular only makes sense with mono or sans families
    {
      when: { tabular: 'true' },
      message: 'tabular-nums works best with sans or mono families',
    },
  ],
  
  // ==========================================================================
  // Base Styles (CSS Custom Properties)
  // ==========================================================================
  
  baseStyles: {
    // Type scale tokens
    '--intent-text-xs': TypeScale.xs.size,
    '--intent-text-sm': TypeScale.sm.size,
    '--intent-text-base': TypeScale.base.size,
    '--intent-text-lg': TypeScale.lg.size,
    '--intent-text-xl': TypeScale.xl.size,
    '--intent-text-2xl': TypeScale['2xl'].size,
    '--intent-text-3xl': TypeScale['3xl'].size,
    '--intent-text-4xl': TypeScale['4xl'].size,
    '--intent-text-5xl': TypeScale['5xl'].size,
    '--intent-text-6xl': TypeScale['6xl'].size,
    
    // Line height tokens
    '--intent-leading-xs': String(TypeScale.xs.lineHeight),
    '--intent-leading-sm': String(TypeScale.sm.lineHeight),
    '--intent-leading-base': String(TypeScale.base.lineHeight),
    '--intent-leading-lg': String(TypeScale.lg.lineHeight),
    '--intent-leading-xl': String(TypeScale.xl.lineHeight),
    '--intent-leading-2xl': String(TypeScale['2xl'].lineHeight),
    '--intent-leading-3xl': String(TypeScale['3xl'].lineHeight),
    '--intent-leading-4xl': String(TypeScale['4xl'].lineHeight),
    '--intent-leading-5xl': String(TypeScale['5xl'].lineHeight),
    '--intent-leading-6xl': String(TypeScale['6xl'].lineHeight),
    
    // Letter spacing tokens
    '--intent-tracking-xs': TypeScale.xs.letterSpacing,
    '--intent-tracking-sm': TypeScale.sm.letterSpacing,
    '--intent-tracking-base': TypeScale.base.letterSpacing,
    '--intent-tracking-lg': TypeScale.lg.letterSpacing,
    '--intent-tracking-xl': TypeScale.xl.letterSpacing,
    '--intent-tracking-2xl': TypeScale['2xl'].letterSpacing,
    '--intent-tracking-3xl': TypeScale['3xl'].letterSpacing,
    '--intent-tracking-4xl': TypeScale['4xl'].letterSpacing,
    '--intent-tracking-5xl': TypeScale['5xl'].letterSpacing,
    '--intent-tracking-6xl': TypeScale['6xl'].letterSpacing,
    
    // Font family tokens
    '--intent-font-sans': FontFamily.sans,
    '--intent-font-serif': FontFamily.serif,
    '--intent-font-mono': FontFamily.mono,
    
    // Color intent tokens
    '--intent-text-default': 'var(--intent-color-text)',
    '--intent-text-muted': 'var(--intent-color-text-secondary)',
    '--intent-text-primary': 'var(--intent-color-primary)',
    '--intent-text-success': 'var(--intent-color-success)',
    '--intent-text-warning': 'var(--intent-color-warning)',
    '--intent-text-danger': 'var(--intent-color-danger)',
  },
});

// ============================================================================
// Heading Component Schema
// ============================================================================

export const HeadingSchema = defineComponent({
  name: 'Heading',
  
  properties: {
    level: {
      type: 'enum',
      values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'display'],
      default: 'h2',
      description: 'Semantic heading level',
    },
    
    scale: {
      type: 'enum',
      values: Object.keys(TypeScale) as TypeScaleKey[],
      default: '4xl',
      description: 'Visual size (defaults to level mapping)',
    },
    
    weight: {
      type: 'enum',
      values: Object.keys(FontWeight) as FontWeightKey[],
      default: 'bold',
      description: 'Font weight',
    },
    
    family: {
      type: 'enum',
      values: Object.keys(FontFamily) as FontFamilyKey[],
      default: 'sans',
      description: 'Font family',
    },
    
    /**
     * Headlines should almost always use balance.
     */
    balance: {
      type: 'boolean',
      default: true,
      description: 'Enable balanced text wrapping (default: true for headings)',
    },
    
    align: {
      type: 'enum',
      values: ['left', 'center', 'right', 'justify'],
      default: 'left',
      description: 'Text alignment',
    },
    
    intent: {
      type: 'enum',
      values: ['default', 'muted', 'primary', 'success', 'warning', 'danger'],
      default: 'default',
      description: 'Color intent for text',
    },
  },
  
  constraints: [],
});

// ============================================================================
// Text Component Schema
// ============================================================================

export const TextSchema = defineComponent({
  name: 'Text',
  
  properties: {
    scale: {
      type: 'enum',
      values: Object.keys(TypeScale) as TypeScaleKey[],
      default: 'base',
      description: 'Type scale preset',
    },
    
    weight: {
      type: 'enum',
      values: Object.keys(FontWeight) as FontWeightKey[],
      default: 'normal',
      description: 'Font weight',
    },
    
    family: {
      type: 'enum',
      values: Object.keys(FontFamily) as FontFamilyKey[],
      default: 'sans',
      description: 'Font family',
    },
    
    balance: {
      type: 'boolean',
      default: false,
      description: 'Enable balanced text wrapping',
    },
    
    tabular: {
      type: 'boolean',
      default: false,
      description: 'Use tabular figures for numeric alignment',
    },
    
    clamp: {
      type: 'number',
      min: 1,
      max: 10,
      description: 'Truncate text after N lines (1-10)',
    },
    
    transform: {
      type: 'enum',
      values: ['none', 'uppercase', 'lowercase', 'capitalize'],
      default: 'none',
      description: 'Text transformation',
    },
    
    align: {
      type: 'enum',
      values: ['left', 'center', 'right', 'justify'],
      default: 'left',
      description: 'Text alignment',
    },
    
    intent: {
      type: 'enum',
      values: ['default', 'muted', 'primary', 'success', 'warning', 'danger'],
      default: 'default',
      description: 'Color intent for text',
    },
    
    /**
     * Truncate with ellipsis instead of line clamp.
     */
    truncate: {
      type: 'boolean',
      default: false,
      description: 'Truncate with ellipsis (single line)',
    },
  },
  
  constraints: [
    {
      when: { truncate: 'true' },
      forbid: ['clamp'],
      message: 'Cannot use both truncate and clamp',
    },
  ],
});

// ============================================================================
// Code Component Schema
// ============================================================================

export const CodeSchema = defineComponent({
  name: 'Code',
  
  properties: {
    scale: {
      type: 'enum',
      values: Object.keys(TypeScale) as TypeScaleKey[],
      default: 'sm',
      description: 'Type scale preset',
    },
    
    weight: {
      type: 'enum',
      values: Object.keys(FontWeight) as FontWeightKey[],
      default: 'normal',
      description: 'Font weight',
    },
    
    /**
     * Code is always mono family.
     */
    family: {
      type: 'enum',
      values: ['mono'],
      default: 'mono',
      description: 'Font family (always mono for code)',
    },
    
    /**
     * Code should use tabular figures for alignment.
     */
    tabular: {
      type: 'boolean',
      default: true,
      description: 'Use tabular figures (default: true for code)',
    },
    
    /**
     * Block vs inline code.
     */
    block: {
      type: 'boolean',
      default: false,
      description: 'Render as block (pre) vs inline (code)',
    },
  },
  
  constraints: [],
});

// ============================================================================
// Exports
// ============================================================================

export default {
  Typography: TypographySchema,
  Heading: HeadingSchema,
  Text: TextSchema,
  Code: CodeSchema,
};
