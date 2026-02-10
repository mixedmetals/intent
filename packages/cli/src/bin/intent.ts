#!/usr/bin/env node

/**
 * Intent CLI
 * 
 * Command-line interface for the Intent styling framework.
 */

import { program } from 'commander';
import { compileCommand } from '../commands/compile.js';
import { validateCommand } from '../commands/validate.js';
import { initCommand } from '../commands/init.js';
import { migrateCommand } from '../commands/migrate.js';
import { generateCommand } from '../commands/generate.js';

program
  .name('intent')
  .description('Intent - Schema-first, AI-native styling framework')
  .version('0.1.0');

program
  .command('compile')
  .description('Compile design system to CSS and TypeScript')
  .option('-c, --config <path>', 'Path to config file', 'intent.config.ts')
  .option('-o, --output <dir>', 'Output directory', '.intent')
  .option('-m, --minify', 'Minify CSS output', false)
  .option('-w, --watch', 'Watch for changes', false)
  .action(compileCommand);

program
  .command('validate')
  .description('Validate component usage against schema')
  .option('-c, --config <path>', 'Path to config file', 'intent.config.ts')
  .option('-f, --fix', 'Automatically fix issues where possible', false)
  .option('--strict', 'Fail on warnings too', false)
  .argument('[files...]', 'Files to validate (defaults to src/**/*.{tsx,jsx})')
  .action(validateCommand);

program
  .command('init')
  .description('Initialize Intent in your project')
  .option('-t, --template <name>', 'Template to use', 'default')
  .option('-f, --force', 'Overwrite existing files', false)
  .action(initCommand);

program
  .command('migrate')
  .description('Migrate from existing styling solution')
  .requiredOption('--from <source>', 'Source framework (tailwind, css-modules)')
  .option('-s, --src <dir>', 'Source directory', './src')
  .option('-d, --dry-run', 'Show what would change without modifying files', false)
  .action(migrateCommand);

program
  .command('generate')
  .description('Generate AI-friendly documentation')
  .option('-c, --config <path>', 'Path to config file', 'intent.config.ts')
  .option('-o, --output <dir>', 'Output directory', '.intent')
  .option('--component <name>', 'Generate docs for specific component')
  .option('--prompt', 'Generate AI prompt for Cursor/Claude', false)
  .action(generateCommand);

program.parse();
