import React from 'react';
import { createComponent } from '../../utils/factory.js';

export interface KbdProps {
  /** Keyboard key size */
  size?: 'sm' | 'base';
  /** Child elements (key text) */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Kbd - Keyboard input styling
 * 
 * Styled keyboard keys for documentation and shortcuts.
 * 
 * @example
 * ```tsx
 * // Single key
 * <p>Press <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> to search.</p>
 * 
 * // Keyboard shortcut
 * <p>
 *   Use <Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> for command palette.
 * </p>
 * 
 * // Small keys
 * <p>Press <Kbd size="sm">Esc</Kbd> to close.</p>
 * ```
 */
export const Kbd = createComponent<KbdProps>('Kbd', {
  size: 'base',
});

export default Kbd;
