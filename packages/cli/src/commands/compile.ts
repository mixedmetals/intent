/**
 * Compile Command
 * 
 * Compiles the design system to CSS and TypeScript definitions.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { compile, type CompilerOptions } from 'intent-core/compiler';
import { loadConfig } from '../utils/config.js';
import { formatDiagnostics } from '../utils/diagnostics.js';

interface CompileOptions {
  config: string;
  output: string;
  minify: boolean;
  watch: boolean;
}

export async function compileCommand(options: CompileOptions): Promise<void> {
  console.log(chalk.blue('Intent'), chalk.gray('compiling design system...\n'));
  
  const startTime = Date.now();
  
  try {
    // Load configuration
    const config = await loadConfig(options.config);
    
    // Compile
    const compilerOptions: CompilerOptions = {
      minify: options.minify,
      outDir: options.output,
    };
    
    const result = await compile(config, compilerOptions);
    
    // Ensure output directory exists
    await fs.mkdir(options.output, { recursive: true });
    
    // Write outputs
    await Promise.all([
      fs.writeFile(path.join(options.output, 'intent.css'), result.css),
      fs.writeFile(path.join(options.output, 'types.d.ts'), result.types),
      fs.writeFile(path.join(options.output, 'schema.ts'), result.runtime),
      fs.writeFile(
        path.join(options.output, 'ai-manifest.json'),
        JSON.stringify(result.manifest, null, 2)
      ),
    ]);
    
    // Print results
    const duration = Date.now() - startTime;
    
    if (result.success) {
      console.log(chalk.green('✓'), 'Compiled successfully in', chalk.cyan(`${duration}ms`));
      console.log();
      console.log('Output files:');
      console.log('  ', chalk.gray('→'), path.join(options.output, 'intent.css'));
      console.log('  ', chalk.gray('→'), path.join(options.output, 'types.d.ts'));
      console.log('  ', chalk.gray('→'), path.join(options.output, 'schema.ts'));
      console.log('  ', chalk.gray('→'), path.join(options.output, 'ai-manifest.json'));
      
      if (result.warnings.length > 0) {
        console.log();
        console.log(chalk.yellow('Warnings:'));
        console.log(formatDiagnostics(result.warnings));
      }
    } else {
      console.log(chalk.red('✗'), 'Compilation failed');
      console.log();
      console.log(chalk.red('Errors:'));
      console.log(formatDiagnostics(result.errors));
      
      if (result.warnings.length > 0) {
        console.log();
        console.log(chalk.yellow('Warnings:'));
        console.log(formatDiagnostics(result.warnings));
      }
      
      process.exit(1);
    }
    
    // Watch mode
    if (options.watch) {
      const { watch } = await import('chokidar');
      
      console.log();
      console.log(chalk.gray('Watching for changes...'));
      
      const watcher = watch(options.config, { ignoreInitial: true });
      
      watcher.on('change', async () => {
        console.log();
        console.log(chalk.gray('Config changed, recompiling...'));
        
        try {
          const newConfig = await loadConfig(options.config);
          const newResult = await compile(newConfig, compilerOptions);
          
          await Promise.all([
            fs.writeFile(path.join(options.output, 'intent.css'), newResult.css),
            fs.writeFile(path.join(options.output, 'types.d.ts'), newResult.types),
            fs.writeFile(path.join(options.output, 'schema.ts'), newResult.runtime),
            fs.writeFile(
              path.join(options.output, 'ai-manifest.json'),
              JSON.stringify(newResult.manifest, null, 2)
            ),
          ]);
          
          if (newResult.success) {
            console.log(chalk.green('✓'), 'Recompiled successfully');
          } else {
            console.log(chalk.red('✗'), 'Recompilation failed');
            console.log(formatDiagnostics(newResult.errors));
          }
        } catch (error) {
          console.error(chalk.red('Error:'), error);
        }
      });
      
      // Keep process alive
      process.on('SIGINT', () => {
        watcher.close();
        process.exit(0);
      });
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
