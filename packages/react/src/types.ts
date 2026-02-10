/**
 * React-specific types for Intent
 */

import type { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react';

// Intent component props base
export interface IntentComponentProps {
  children?: ReactNode;
  className?: string;  // Allowed but discouraged
  style?: React.CSSProperties;  // Allowed but discouraged
}

// Props for the factory-generated component
export interface GeneratedComponentProps<T extends Record<string, unknown>> {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Stack component specific props
export interface StackProps extends IntentComponentProps {
  direction?: 'row' | 'column';
  gap?: 'none' | 'tight' | 'compact' | 'normal' | 'relaxed' | 'loose';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

// Button component specific props
export interface ButtonProps extends IntentComponentProps {
  importance?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'hover' | 'active' | 'disabled';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

// Surface component specific props
export interface SurfaceProps extends IntentComponentProps {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'tight' | 'compact' | 'normal' | 'relaxed' | 'loose';
  background?: 'default' | 'subtle' | 'elevated' | 'inverse';
  radius?: 'none' | 'sm' | 'md' | 'lg';
}

// Text component specific props
export interface TextProps extends IntentComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'subtle' | 'muted' | 'inverse' | 'brand';
  align?: 'left' | 'center' | 'right';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
}

// Input component specific props
export interface InputProps extends IntentComponentProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success';
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

// Card component specific props
export interface CardProps extends SurfaceProps {
  interactive?: boolean;
}

// Badge component specific props
export interface BadgeProps extends IntentComponentProps {
  importance?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

// Divider component specific props
export interface DividerProps extends IntentComponentProps {
  orientation?: 'horizontal' | 'vertical';
  weight?: 'thin' | 'normal' | 'thick';
}
