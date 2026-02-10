#!/usr/bin/env node

/**
 * Intent MCP Server Entry Point
 */

import { startServer } from '../server.js';

const configPath = process.argv[2] || 'intent.config.ts';

startServer(configPath).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
