/**
 * ============================================================================
 * Intent Icon Registry
 * ============================================================================
 * 
 * Central registry for SVG icons. Maps icon names to their SVG paths.
 * 
 * Schema Example:
 * ```
 * // Icon used in Button with automatic sizing
 * properties: {
 *   icon: { type: 'enum', values: Object.keys(iconRegistry) },
 *   iconPosition: { type: 'enum', values: ['left', 'right'] }
 * }
 * 
 * // Usage:
 * <Button icon="plus" size="md">Add Item</Button>
 * // Icon automatically sizes to match button text (1em)
 * ```
 */

// ============================================================================
// Icon Type Definition
// ============================================================================

export interface IconDefinition {
  /** Icon name (kebab-case) */
  name: string;
  
  /** SVG viewBox */
  viewBox: string;
  
  /** SVG path data */
  path: string;
  
  /** Optional: Multiple paths for complex icons */
  paths?: string[];
  
  /** Optional: Stroke-based icon (default: fill) */
  stroke?: boolean;
  
  /** Optional: Stroke width for stroke-based icons */
  strokeWidth?: number;
  
  /** Optional: Cap height offset for precise alignment (0-1, default: 0.5) */
  capHeightOffset?: number;
}

// ============================================================================
// Icon Registry
// ============================================================================

export const iconRegistry: Record<string, IconDefinition> = {
  // ==========================================================================
  // Navigation Icons
  // ==========================================================================
  
  arrowLeft: {
    name: 'arrow-left',
    viewBox: '0 0 24 24',
    path: 'M19 12H5M12 19l-7-7 7-7',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  arrowRight: {
    name: 'arrow-right',
    viewBox: '0 0 24 24',
    path: 'M5 12h14M12 5l7 7-7 7',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  arrowUp: {
    name: 'arrow-up',
    viewBox: '0 0 24 24',
    path: 'M12 19V5M5 12l7-7 7 7',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.6,
  },
  
  arrowDown: {
    name: 'arrow-down',
    viewBox: '0 0 24 24',
    path: 'M12 5v14M19 12l-7 7-7-7',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  chevronLeft: {
    name: 'chevron-left',
    viewBox: '0 0 24 24',
    path: 'M15 18l-6-6 6-6',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  chevronRight: {
    name: 'chevron-right',
    viewBox: '0 0 24 24',
    path: 'M9 18l6-6-6-6',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  chevronUp: {
    name: 'chevron-up',
    viewBox: '0 0 24 24',
    path: 'M18 15l-6-6-6 6',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  chevronDown: {
    name: 'chevron-down',
    viewBox: '0 0 24 24',
    path: 'M6 9l6 6 6-6',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  menu: {
    name: 'menu',
    viewBox: '0 0 24 24',
    path: 'M3 12h18M3 6h18M3 18h18',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  close: {
    name: 'close',
    viewBox: '0 0 24 24',
    path: 'M18 6L6 18M6 6l12 12',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  // ==========================================================================
  // Action Icons
  // ==========================================================================
  
  plus: {
    name: 'plus',
    viewBox: '0 0 24 24',
    path: 'M12 5v14M5 12h14',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  minus: {
    name: 'minus',
    viewBox: '0 0 24 24',
    path: 'M5 12h14',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  check: {
    name: 'check',
    viewBox: '0 0 24 24',
    path: 'M20 6L9 17l-5-5',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.6,
  },
  
  edit: {
    name: 'edit',
    viewBox: '0 0 24 24',
    path: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  trash: {
    name: 'trash',
    viewBox: '0 0 24 24',
    path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  copy: {
    name: 'copy',
    viewBox: '0 0 24 24',
    path: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  download: {
    name: 'download',
    viewBox: '0 0 24 24',
    path: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  upload: {
    name: 'upload',
    viewBox: '0 0 24 24',
    path: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.6,
  },
  
  search: {
    name: 'search',
    viewBox: '0 0 24 24',
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  filter: {
    name: 'filter',
    viewBox: '0 0 24 24',
    path: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  // ==========================================================================
  // Status Icons
  // ==========================================================================
  
  info: {
    name: 'info',
    viewBox: '0 0 24 24',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  infoSolid: {
    name: 'info-solid',
    viewBox: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    capHeightOffset: 0.55,
  },
  
  warning: {
    name: 'warning',
    viewBox: '0 0 24 24',
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  error: {
    name: 'error',
    viewBox: '0 0 24 24',
    path: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  success: {
    name: 'success',
    viewBox: '0 0 24 24',
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  // ==========================================================================
  // Data Icons
  // ==========================================================================
  
  chart: {
    name: 'chart',
    viewBox: '0 0 24 24',
    path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  database: {
    name: 'database',
    viewBox: '0 0 24 24',
    path: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  calendar: {
    name: 'calendar',
    viewBox: '0 0 24 24',
    path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  clock: {
    name: 'clock',
    viewBox: '0 0 24 24',
    path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  // ==========================================================================
  // Social/Communication Icons
  // ==========================================================================
  
  user: {
    name: 'user',
    viewBox: '0 0 24 24',
    path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  users: {
    name: 'users',
    viewBox: '0 0 24 24',
    path: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  mail: {
    name: 'mail',
    viewBox: '0 0 24 24',
    path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  bell: {
    name: 'bell',
    viewBox: '0 0 24 24',
    path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  heart: {
    name: 'heart',
    viewBox: '0 0 24 24',
    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  star: {
    name: 'star',
    viewBox: '0 0 24 24',
    path: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.6,
  },
  
  // ==========================================================================
  // Settings/System Icons
  // ==========================================================================
  
  settings: {
    name: 'settings',
    viewBox: '0 0 24 24',
    path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  moreHorizontal: {
    name: 'more-horizontal',
    viewBox: '0 0 24 24',
    path: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  moreVertical: {
    name: 'more-vertical',
    viewBox: '0 0 24 24',
    path: 'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  // ==========================================================================
  // File Icons
  // ==========================================================================
  
  file: {
    name: 'file',
    viewBox: '0 0 24 24',
    path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  folder: {
    name: 'folder',
    viewBox: '0 0 24 24',
    path: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.5,
  },
  
  // ==========================================================================
  // External Link Icons
  // ==========================================================================
  
  externalLink: {
    name: 'external-link',
    viewBox: '0 0 24 24',
    path: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
  
  link: {
    name: 'link',
    viewBox: '0 0 24 24',
    path: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    stroke: true,
    strokeWidth: 2,
    capHeightOffset: 0.55,
  },
};

// ============================================================================
// Icon Registry Utilities
// ============================================================================

/**
 * Get an icon definition by name.
 */
export function getIcon(name: string): IconDefinition | undefined {
  return iconRegistry[name];
}

/**
 * Check if an icon exists in the registry.
 */
export function hasIcon(name: string): boolean {
  return name in iconRegistry;
}

/**
 * Get all available icon names.
 */
export function getIconNames(): string[] {
  return Object.keys(iconRegistry);
}

/**
 * Register a custom icon.
 */
export function registerIcon(name: string, definition: IconDefinition): void {
  iconRegistry[name] = definition;
}

/**
 * Register multiple custom icons.
 */
export function registerIcons(icons: Record<string, IconDefinition>): void {
  Object.assign(iconRegistry, icons);
}

// ============================================================================
// Size Scale Mapping
// ============================================================================

/**
 * Icon size scale that maps to typography sizes.
 * Ensures visual harmony between icons and text.
 */
export const IconSizeScale = {
  /** 12px - For inline with xs text */
  xs: '0.75rem',
  
  /** 16px - For inline with sm/base text */
  sm: '1rem',
  
  /** 20px - For inline with lg text */
  md: '1.25rem',
  
  /** 24px - For standalone icons */
  lg: '1.5rem',
  
  /** 32px - For feature icons */
  xl: '2rem',
  
  /** Inherits from parent font-size */
  inherit: '1em',
} as const;

export type IconSize = keyof typeof IconSizeScale;

// ============================================================================
// Export
// ============================================================================

export default iconRegistry;
