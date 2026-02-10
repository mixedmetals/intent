/**
 * Config Loader
 * 
 * Loads and parses intent.config.ts files using jiti for runtime TS support.
 */

import path from 'node:path';
import { createRequire } from 'node:module';
import type { DesignSystemConfig } from 'intent-core';

const require = createRequire(import.meta.url);

export function loadConfigSync(configPath: string): DesignSystemConfig {
  const absolutePath = path.resolve(configPath);
  
  // Try jiti first (fast, handles TS well)
  try {
    const jiti = require('jiti')(import.meta.url, { interopDefault: true });
    const imported = jiti(absolutePath);
    const config = imported?.default || imported;
    if (isValidConfig(config)) return config;
  } catch (error) {
    const errMsg = (error as Error).message;
    
    // Check if jiti is not installed
    if (errMsg.includes('Cannot find module') && errMsg.includes('jiti')) {
      throw new Error(
        `jiti is required to load TypeScript config files.\n\n` +
        `Please install it:\n` +
        `  npm install -D jiti\n\n` +
        `Or use a JavaScript config file:\n` +
        `  intent.config.js`
      );
    }
    
    // Other error - rethrow with context
    throw new Error(`Failed to load config: ${errMsg}`);
  }
  
  throw new Error('Config loader failed');
}

export async function loadConfig(configPath: string): Promise<DesignSystemConfig> {
  // For now, use sync version since jiti is synchronous
  return loadConfigSync(configPath);
}

function isValidConfig(config: unknown): config is DesignSystemConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    'name' in config &&
    typeof (config as Record<string, unknown>).name === 'string' &&
    'tokens' in config &&
    'components' in config
  );
}
