/**
 * Validate Command
 * 
 * Validates component usage against the design system schema.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { globby } from 'globby';
import { parseFiles, validateAllUsages, type ComponentUsage } from 'intent-core';
import { loadConfig } from '../utils/config.js';

interface ValidateOptions {
  config: string;
  fix: boolean;
  strict: boolean;
}

export async function validateCommand(
  files: string[],
  options: ValidateOptions
): Promise<void> {
  console.log(chalk.blue('Intent'), chalk.gray('validating...\n'));
  
  const startTime = Date.now();
  
  try {
    // Load configuration
    const config = await loadConfig(options.config);
    
    // Find files to validate
    const patterns = files.length > 0 
      ? files 
      : ['src/**/*.{tsx,jsx,vue,svelte}'];
    
    const filePaths = await globby(patterns, { absolute: true });
    
    if (filePaths.length === 0) {
      console.log(chalk.yellow('No files found to validate'));
      return;
    }
    
    console.log(`Found ${chalk.cyan(filePaths.length)} files to validate\n`);
    
    // Read and parse files
    const parsedFiles: Array<{ path: string; content: string }> = [];
    
    for (const filePath of filePaths) {
      const content = await fs.readFile(filePath, 'utf-8');
      parsedFiles.push({ path: filePath, content });
    }
    
    // Parse for Intent component usage
    const parseOptions = {
      intentImports: ['intent-react', 'intent'],
      componentNames: Object.keys(config.components),
    };
    
    const parsedResults = parseFiles(
      parsedFiles.map(f => ({ path: f.path, content: f.content })),
      parseOptions
    );
    
    // Collect all usages
    const batchUsages: Array<{ file: string; usages: ComponentUsage[] }> = [];
    
    for (const [filePath, result] of Object.entries(parsedResults)) {
      if (result.usages.length > 0) {
        batchUsages.push({ file: filePath, usages: result.usages });
      }
    }
    
    console.log(`Found ${chalk.cyan(batchUsages.reduce((sum, b) => sum + b.usages.length, 0))} Intent component usages\n`);
    
    // Validate
    const validationResult = validateAllUsages(config, batchUsages, { strict: options.strict });
    
    // Report results
    const duration = Date.now() - startTime;
    
    if (validationResult.valid && validationResult.issues.length === 0) {
      console.log(chalk.green('✓'), 'All validations passed');
      console.log(chalk.gray(`  ${duration}ms`));
    } else {
      // Group issues by file
      const issuesByFile = new Map<string, typeof validationResult.issues>();
      
      for (const issue of validationResult.issues) {
        const file = issue.path.split(':')[0];
        if (!issuesByFile.has(file)) {
          issuesByFile.set(file, []);
        }
        issuesByFile.get(file)!.push(issue);
      }
      
      // Print issues
      for (const [file, issues] of issuesByFile) {
        console.log(chalk.underline(file));
        
        for (const issue of issues) {
          const icon = issue.severity === 'error' ? chalk.red('✗') : chalk.yellow('⚠');
          const code = chalk.gray(`[${issue.code}]`);
          const location = issue.path.includes(':') 
            ? chalk.gray(issue.path.split(':').slice(1).join(':')) 
            : '';
          
          console.log(`  ${icon} ${issue.message} ${code}`);
          if (location) {
            console.log(`    ${chalk.gray('at')} ${location}`);
          }
          if (issue.suggestion) {
            console.log(`    ${chalk.cyan('→')} ${issue.suggestion}`);
          }
        }
        console.log();
      }
      
      // Summary
      const errors = validationResult.issues.filter(i => i.severity === 'error').length;
      const warnings = validationResult.issues.filter(i => i.severity === 'warning').length;
      
      console.log(chalk.gray('─'.repeat(50)));
      
      if (errors > 0) {
        console.log(chalk.red(`${errors} error${errors === 1 ? '' : 's'}`));
      }
      if (warnings > 0) {
        console.log(chalk.yellow(`${warnings} warning${warnings === 1 ? '' : 's'}`));
      }
      
      console.log(chalk.gray(`${duration}ms`));
      
      if (!validationResult.valid) {
        process.exit(1);
      }
    }
    
    // Auto-fix if requested
    if (options.fix) {
      console.log(chalk.gray('\nAuto-fix not yet implemented'));
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
