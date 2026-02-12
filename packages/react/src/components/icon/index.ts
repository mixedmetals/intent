/**
 * ============================================================================
 * Intent Icon Components - Index
 * ============================================================================
 * 
 * Exports for the Icon component system.
 */

export { Icon, IconText } from './Icon.js';
export type { IconProps, IconTextProps } from './Icon.js';

export {
  iconRegistry,
  getIcon,
  hasIcon,
  getIconNames,
  registerIcon,
  registerIcons,
  IconSizeScale,
} from './registry.js';
export type { IconDefinition, IconSize } from './registry.js';
