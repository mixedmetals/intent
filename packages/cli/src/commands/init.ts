/**
 * Init Command
 * 
 * Initializes Intent in a new or existing project.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

interface InitOptions {
  template: string;
  force: boolean;
}

const DEFAULT_CONFIG = `import { defineSystem, defineComponent, prop, when } from 'intent-core';

/**
 * Intent Design System
 * 
 * This configuration defines a complete design system
 * with semantic tokens and constrained component definitions.
 */

export default defineSystem({
  name: 'MyDesignSystem',
  
  tokens: {
    // Semantic colors - AI never uses hex codes directly
    color: {
      // Brand
      'brand-primary': '#6366F1',
      'brand-primary-hover': '#4F46E5',
      'brand-secondary': '#8B5CF6',
      
      // Feedback
      'feedback-success': '#10B981',
      'feedback-warning': '#F59E0B',
      'feedback-error': '#EF4444',
      'feedback-info': '#3B82F6',
      
      // Surfaces
      'surface-default': '#FFFFFF',
      'surface-elevated': '#FFFFFF',
      'surface-subtle': '#F8FAFC',
      'surface-inverse': '#1E293B',
      
      // Text
      'text-default': '#0F172A',
      'text-subtle': '#64748B',
      'text-inverse': '#FFFFFF',
      'text-muted': '#94A3B8',
      
      // Borders
      'border-default': '#E2E8F0',
      'border-subtle': '#F1F5F9',
    },
    
    // Spacing scale - named for semantic meaning
    space: {
      'none': '0',
      'tight': '4px',
      'compact': '8px',
      'normal': '12px',
      'relaxed': '16px',
      'loose': '24px',
      'xl': '32px',
      'xxl': '48px',
      'xxxl': '64px',
    },
    
    // Elevation system
    elevation: {
      'none': '0',
      'low': '0 1px 3px rgba(0,0,0,0.08)',
      'medium': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
      'high': '0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02)',
      'highest': '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
    },
    
    // Border radius
    radius: {
      'none': '0',
      'sm': '4px',
      'md': '8px',
      'lg': '12px',
      'xl': '16px',
      'full': '9999px',
    },
    
    // Typography scale
    typography: {
      'font-sans': 'system-ui, -apple-system, sans-serif',
      'font-mono': 'ui-monospace, monospace',
      
      'size-xs': '12px',
      'size-sm': '14px',
      'size-md': '16px',
      'size-lg': '18px',
      'size-xl': '20px',
      'size-2xl': '24px',
      'size-3xl': '30px',
      'size-4xl': '36px',
      
      'weight-normal': '400',
      'weight-medium': '500',
      'weight-semibold': '600',
      'weight-bold': '700',
      
      'leading-tight': '1.25',
      'leading-normal': '1.5',
      'leading-relaxed': '1.75',
    },
  },

  components: {
    Button: defineComponent({
      name: 'Button',
      description: 'Interactive element that triggers an action when clicked',
      properties: {
        importance: prop.enum(['primary', 'secondary', 'ghost', 'danger'], { required: true }),
        size: prop.enum(['sm', 'md', 'lg'], { default: 'md' }),
        state: prop.enum(['default', 'hover', 'active', 'disabled'], { default: 'default' }),
      },
      constraints: [
        // Ghost buttons cannot be disabled - no visual distinction possible
        when({ importance: 'ghost' }).forbid(['state'], 
          'Ghost buttons cannot have a disabled state'),
        // Danger buttons require larger sizes for accessibility
        when({ importance: 'danger' }).require({ size: ['md', 'lg'] },
          'Danger actions require larger touch targets'),
      ],
      mappings: {
        // Visual mapping by importance
        'importance=primary': {
          background: 'brand-primary',
          color: 'text-inverse',
          border: 'none',
        },
        'importance=secondary': {
          background: 'transparent',
          color: 'brand-primary',
          border: '1px solid border-default',
        },
        'importance=ghost': {
          background: 'transparent',
          color: 'brand-primary',
          border: 'none',
        },
        'importance=danger': {
          background: 'feedback-error',
          color: 'text-inverse',
          border: 'none',
        },
        // Size mappings
        'size=sm': {
          padding: { sm: 'tight compact', md: 'compact normal', lg: 'normal relaxed' },
          fontSize: 'size-sm',
        },
        'size=md': {
          padding: { sm: 'compact normal', md: 'normal relaxed', lg: 'relaxed loose' },
          fontSize: 'size-md',
        },
        'size=lg': {
          padding: { sm: 'normal relaxed', md: 'relaxed loose', lg: 'loose xl' },
          fontSize: 'size-lg',
        },
      },
      baseStyles: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'weight-medium',
        borderRadius: 'radius-md',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      },
    }),

    Stack: defineComponent({
      name: 'Stack',
      description: 'Layout component for distributing children along an axis',
      properties: {
        direction: prop.enum(['row', 'column'], { default: 'column' }),
        gap: prop.enum(['none', 'tight', 'compact', 'normal', 'relaxed', 'loose'], { default: 'normal' }),
        align: prop.enum(['start', 'center', 'end', 'stretch'], { default: 'stretch' }),
        justify: prop.enum(['start', 'center', 'end', 'between', 'around'], { default: 'start' }),
      },
      constraints: [],
      mappings: {
        'direction=row': { flexDirection: 'row' },
        'direction=column': { flexDirection: 'column' },
        'gap=none': { gap: 'none' },
        'gap=tight': { gap: 'tight' },
        'gap=compact': { gap: 'compact' },
        'gap=normal': { gap: 'normal' },
        'gap=relaxed': { gap: 'relaxed' },
        'gap=loose': { gap: 'loose' },
        'align=start': { alignItems: 'flex-start' },
        'align=center': { alignItems: 'center' },
        'align=end': { alignItems: 'flex-end' },
        'align=stretch': { alignItems: 'stretch' },
        'justify=start': { justifyContent: 'flex-start' },
        'justify=center': { justifyContent: 'center' },
        'justify=end': { justifyContent: 'flex-end' },
        'justify=between': { justifyContent: 'space-between' },
        'justify=around': { justifyContent: 'space-around' },
      },
      baseStyles: {
        display: 'flex',
      },
    }),

    Surface: defineComponent({
      name: 'Surface',
      description: 'Container providing visual elevation and background treatment',
      properties: {
        elevation: prop.enum(['none', 'low', 'medium', 'high'], { default: 'none' }),
        padding: prop.enum(['none', 'tight', 'compact', 'normal', 'relaxed', 'loose'], { default: 'none' }),
        background: prop.enum(['default', 'subtle', 'elevated', 'inverse'], { default: 'default' }),
        radius: prop.enum(['none', 'sm', 'md', 'lg'], { default: 'none' }),
      },
      constraints: [
        // Inverse background requires high elevation for contrast
        when({ background: 'inverse' }).require({ elevation: ['medium', 'high'] },
          'Inverse backgrounds need elevation for proper contrast'),
      ],
      mappings: {
        'elevation=none': { boxShadow: 'elevation-none' },
        'elevation=low': { boxShadow: 'elevation-low' },
        'elevation=medium': { boxShadow: 'elevation-medium' },
        'elevation=high': { boxShadow: 'elevation-high' },
        'padding=none': { padding: 'none' },
        'padding=tight': { padding: 'tight' },
        'padding=compact': { padding: 'compact' },
        'padding=normal': { padding: 'normal' },
        'padding=relaxed': { padding: 'relaxed' },
        'padding=loose': { padding: 'loose' },
        'background=default': { background: 'surface-default' },
        'background=subtle': { background: 'surface-subtle' },
        'background=elevated': { background: 'surface-elevated' },
        'background=inverse': { background: 'surface-inverse' },
        'radius=none': { borderRadius: 'radius-none' },
        'radius=sm': { borderRadius: 'radius-sm' },
        'radius=md': { borderRadius: 'radius-md' },
        'radius=lg': { borderRadius: 'radius-lg' },
      },
      baseStyles: {
        border: '1px solid border-default',
      },
    }),

    Text: defineComponent({
      name: 'Text',
      description: 'Typography component for displaying text',
      properties: {
        size: prop.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl'], { default: 'md' }),
        weight: prop.enum(['normal', 'medium', 'semibold', 'bold'], { default: 'normal' }),
        color: prop.enum(['default', 'subtle', 'muted', 'inverse', 'brand'], { default: 'default' }),
        align: prop.enum(['left', 'center', 'right'], { default: 'left' }),
      },
      constraints: [],
      mappings: {
        'size=xs': { fontSize: 'size-xs', lineHeight: 'leading-normal' },
        'size=sm': { fontSize: 'size-sm', lineHeight: 'leading-normal' },
        'size=md': { fontSize: 'size-md', lineHeight: 'leading-normal' },
        'size=lg': { fontSize: 'size-lg', lineHeight: 'leading-relaxed' },
        'size=xl': { fontSize: 'size-xl', lineHeight: 'leading-relaxed' },
        'size=xxl': { fontSize: 'size-2xl', lineHeight: 'leading-tight' },
        'weight=normal': { fontWeight: 'weight-normal' },
        'weight=medium': { fontWeight: 'weight-medium' },
        'weight=semibold': { fontWeight: 'weight-semibold' },
        'weight=bold': { fontWeight: 'weight-bold' },
        'color=default': { color: 'text-default' },
        'color=subtle': { color: 'text-subtle' },
        'color=muted': { color: 'text-muted' },
        'color=inverse': { color: 'text-inverse' },
        'color=brand': { color: 'brand-primary' },
      },
      baseStyles: {
        fontFamily: 'font-sans',
        margin: '0',
      },
    }),

    Badge: defineComponent({
      name: 'Badge',
      description: 'Small label for displaying status, count, or category',
      properties: {
        importance: prop.enum(['default', 'primary', 'success', 'warning', 'error'], { default: 'default' }),
        size: prop.enum(['sm', 'md'], { default: 'sm' }),
      },
      constraints: [],
      mappings: {
        'importance=default': { background: 'surface-subtle', color: 'text-subtle' },
        'importance=primary': { background: 'brand-primary', color: 'text-inverse' },
        'importance=success': { background: 'feedback-success', color: 'text-inverse' },
        'importance=warning': { background: 'feedback-warning', color: 'text-inverse' },
        'importance=error': { background: 'feedback-error', color: 'text-inverse' },
        'size=sm': { padding: 'tight compact', fontSize: 'size-xs' },
        'size=md': { padding: 'compact normal', fontSize: 'size-sm' },
      },
      baseStyles: {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'radius-full',
        fontWeight: 'weight-medium',
      },
    }),
  },

  settings: {
    cssPrefix: 'intent',
    generateCSSVariables: true,
    strictMode: true,
  },
});
`;

const CSS_IMPORT_SNIPPET = `
/* Add to your main CSS file or _app.tsx/_layout.tsx */
@import '.intent/intent.css';
`;

export async function initCommand(options: InitOptions): Promise<void> {
  console.log(chalk.blue('Intent'), chalk.gray('initializing...\n'));
  
  const configPath = 'intent.config.ts';
  
  // Check if config already exists
  try {
    await fs.access(configPath);
    if (!options.force) {
      console.log(chalk.yellow('⚠'), 'Config file already exists:', configPath);
      console.log(chalk.gray('  Use --force to overwrite'));
      return;
    }
  } catch {
    // File doesn't exist, proceed
  }
  
  // Write config file
  await fs.writeFile(configPath, DEFAULT_CONFIG);
  console.log(chalk.green('✓'), 'Created', chalk.cyan(configPath));
  
  // Create .gitignore entry
  try {
    let gitignore = '';
    try {
      gitignore = await fs.readFile('.gitignore', 'utf-8');
    } catch {
      // .gitignore doesn't exist
    }
    
    if (!gitignore.includes('.intent/')) {
      await fs.appendFile('.gitignore', '\n# Intent compiled output\n.intent/\n');
      console.log(chalk.green('✓'), 'Updated', chalk.cyan('.gitignore'));
    }
  } catch {
    // Ignore errors
  }
  
  // Create example component
  const exampleDir = 'components';
  try {
    await fs.mkdir(exampleDir, { recursive: true });
    
    const exampleComponent = `import { Stack, Button } from 'intent-react';

export function Example() {
  return (
    <Stack direction="column" gap="relaxed">
      <Stack direction="row" gap="normal">
        <Button importance="primary" size="md">
          Primary Action
        </Button>
        <Button importance="secondary" size="md">
          Secondary
        </Button>
      </Stack>
      
      <Stack direction="row" gap="normal">
        <Button importance="ghost" size="sm">
          Ghost Button
        </Button>
        <Button importance="danger" size="md">
          Danger Action
        </Button>
      </Stack>
    </Stack>
  );
}
`;
    
    await fs.writeFile(path.join(exampleDir, 'Example.tsx'), exampleComponent);
    console.log(chalk.green('✓'), 'Created example component:', chalk.cyan('components/Example.tsx'));
  } catch {
    // Ignore errors
  }
  
  console.log();
  console.log(chalk.green('Intent initialized successfully!'));
  console.log();
  console.log('Next steps:');
  console.log('  1.', chalk.cyan('npm install intent-react'));
  console.log('  2.', chalk.cyan('intent compile'), 'to generate CSS');
  console.log('  3.', chalk.cyan('intent validate'), 'to check your components');
  console.log();
  console.log(chalk.gray(CSS_IMPORT_SNIPPET));
}
