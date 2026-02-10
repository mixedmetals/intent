/**
 * Migrate Command
 * 
 * Migrates from existing styling solutions to Intent.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { globby } from 'globby';

interface MigrateOptions {
  from: string;
  src: string;
  dryRun: boolean;
}

// Common Tailwind to Intent mappings
const TAILWIND_MAPPINGS: Record<string, { component: string; props: Record<string, string> }> = {
  // Layout
  'flex': { component: 'Stack', props: { direction: 'row' } },
  'flex-col': { component: 'Stack', props: { direction: 'column' } },
  'items-center': { component: 'Stack', props: { align: 'center' } },
  'items-start': { component: 'Stack', props: { align: 'start' } },
  'items-end': { component: 'Stack', props: { align: 'end' } },
  'justify-center': { component: 'Stack', props: { justify: 'center' } },
  'justify-between': { component: 'Stack', props: { justify: 'between' } },
  'gap-1': { component: 'Stack', props: { gap: 'tight' } },
  'gap-2': { component: 'Stack', props: { gap: 'normal' } },
  'gap-4': { component: 'Stack', props: { gap: 'relaxed' } },
  'gap-8': { component: 'Stack', props: { gap: 'loose' } },
  
  // Buttons (heuristic)
  'bg-blue-500': { component: 'Button', props: { importance: 'primary' } },
  'bg-red-500': { component: 'Button', props: { importance: 'danger' } },
  'bg-transparent': { component: 'Button', props: { importance: 'ghost' } },
};

// Patterns to detect
const UTILITY_PATTERNS = [
  { pattern: /\bp-[0-9]+\b/, type: 'padding', message: 'Use Surface padding prop' },
  { pattern: /\bpx-[0-9]+\b/, type: 'padding-x', message: 'Use Surface padding prop' },
  { pattern: /\bpy-[0-9]+\b/, type: 'padding-y', message: 'Use Surface padding prop' },
  { pattern: /\bm-[0-9]+\b/, type: 'margin', message: 'Use Stack gap prop' },
  { pattern: /\bmy-[0-9]+\b/, type: 'margin-y', message: 'Use Stack gap prop' },
  { pattern: /\bmx-[0-9]+\b/, type: 'margin-x', message: 'Use Stack gap prop' },
  { pattern: /\bbg-[\w-]+\b/, type: 'background', message: 'Use Surface background prop' },
  { pattern: /\btext-[\w-]+\b/, type: 'text', message: 'Use Text color/size prop' },
  { pattern: /\brounded-[\w-]+\b/, type: 'radius', message: 'Use Surface radius prop' },
  { pattern: /\bshadow-[\w-]+\b/, type: 'shadow', message: 'Use Surface elevation prop' },
  { pattern: /\bfont-[\w-]+\b/, type: 'font', message: 'Use Text weight prop' },
  { pattern: /\[.*?\]/, type: 'arbitrary', message: 'Arbitrary values not allowed in Intent' },
];

interface MigrationIssue {
  file: string;
  line: number;
  column: number;
  original: string;
  suggestion: string;
  type: string;
}

export async function migrateCommand(options: MigrateOptions): Promise<void> {
  console.log(chalk.blue('Intent'), chalk.gray(`migrating from ${options.from}...\n`));
  
  if (options.from !== 'tailwind') {
    console.log(chalk.red('Error:'), 'Only Tailwind migration is currently supported');
    process.exit(1);
  }
  
  const files = await globby([path.join(options.src, '**/*.{tsx,jsx,vue,svelte}')], { absolute: true });
  
  console.log(`Found ${chalk.cyan(files.length)} files to analyze\n`);
  
  const issues: MigrationIssue[] = [];
  
  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      // Find className attributes
      const classNameMatches = line.matchAll(/className=["']([^"']+)["']/g);
      
      for (const match of classNameMatches) {
        const classValue = match[1];
        const column = (match.index || 0) + 1;
        
        // Check for utility patterns
        for (const { pattern, type, message } of UTILITY_PATTERNS) {
          if (pattern.test(classValue)) {
            // Find matching classes
            const matches = classValue.match(pattern);
            if (matches) {
              issues.push({
                file: filePath,
                line: lineNum,
                column,
                original: matches[0],
                suggestion: message,
                type,
              });
            }
          }
        }
        
        // Check for flex patterns that suggest Stack
        if (/\bflex\b/.test(classValue) && /\bgap-/.test(classValue)) {
          issues.push({
            file: filePath,
            line: lineNum,
            column,
            original: 'flex + gap-*',
            suggestion: 'Replace with <Stack direction="row" gap="...">',
            type: 'layout',
          });
        }
      }
    }
  }
  
  // Report findings
  console.log(chalk.cyan('Migration Report'));
  console.log(chalk.gray('─'.repeat(50)));
  
  // Group by type
  const byType = new Map<string, MigrationIssue[]>();
  for (const issue of issues) {
    if (!byType.has(issue.type)) {
      byType.set(issue.type, []);
    }
    byType.get(issue.type)!.push(issue);
  }
  
  for (const [type, typeIssues] of byType) {
    console.log();
    console.log(chalk.yellow(`${type} (${typeIssues.length} occurrences)`));
    
    for (const issue of typeIssues.slice(0, 5)) {
      const relativePath = path.relative(process.cwd(), issue.file);
      console.log(`  ${chalk.gray('→')} ${relativePath}:${issue.line}`);
      console.log(`    ${chalk.cyan(issue.original)} → ${issue.suggestion}`);
    }
    
    if (typeIssues.length > 5) {
      console.log(`    ${chalk.gray(`... and ${typeIssues.length - 5} more`)}`);
    }
  }
  
  console.log();
  console.log(chalk.gray('─'.repeat(50)));
  console.log(`Total issues found: ${chalk.cyan(issues.length)}`);
  
  if (options.dryRun) {
    console.log();
    console.log(chalk.gray('(Dry run - no files were modified)'));
  } else {
    console.log();
    console.log(chalk.yellow('Auto-migration is not yet implemented.'));
    console.log('Please review the suggestions above and update your code manually.');
    console.log();
    console.log('For help with specific components, run:');
    console.log(`  ${chalk.cyan('intent generate --component Button')}`);
  }
  
  // Generate initial config suggestion
  console.log();
  console.log(chalk.cyan('Suggested intent.config.ts'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log();
  
  // Analyze discovered tokens
  const discoveredColors = new Set<string>();
  const discoveredSpacing = new Set<string>();
  
  for (const issue of issues) {
    if (issue.type === 'background' && issue.original.startsWith('bg-')) {
      discoveredColors.add(issue.original.replace('bg-', ''));
    }
    if (issue.type === 'padding' || issue.type === 'margin') {
      const num = issue.original.match(/\d+/)?.[0];
      if (num) discoveredSpacing.add(num);
    }
  }
  
  console.log(chalk.gray('// Based on your existing Tailwind usage:'));
  console.log(chalk.gray('// Colors found:'), [...discoveredColors].slice(0, 5).join(', ') || 'none');
  console.log(chalk.gray('// Spacing found:'), [...discoveredSpacing].slice(0, 5).join(', ') || 'none');
}
