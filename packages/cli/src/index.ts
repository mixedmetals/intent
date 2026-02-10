/**
 * Intent CLI
 * 
 * Programmatic API for the Intent CLI.
 */

export { compileCommand } from './commands/compile.js';
export { validateCommand } from './commands/validate.js';
export { initCommand } from './commands/init.js';
export { migrateCommand } from './commands/migrate.js';
export { generateCommand } from './commands/generate.js';

export { loadConfig } from './utils/config.js';
export { formatDiagnostics } from './utils/diagnostics.js';

export const VERSION = '0.1.0';
