# intentcss-cli

[![npm version](https://img.shields.io/npm/v/intentcss-cli.svg)](https://www.npmjs.com/package/intentcss-cli)
[![License](https://img.shields.io/npm/l/intentcss-cli.svg)](https://github.com/mixedmetals/intent-framework/blob/main/LICENSE)

> CLI tools for the Intent styling framework.

## Installation

```bash
# Global installation
npm install -g intentcss-cli

# Or use with npx
npx intentcss-cli <command>
```

## Quick Start

```bash
# Initialize Intent in a project
intent init

# Build CSS from schemas
intent build --input ./src/schemas --output ./dist/styles.css

# Watch for changes during development
intent watch --input ./src/schemas

# Validate component usage
intent validate --src ./src
```

## Commands

### `init`
Initialize Intent in a new or existing project.

```bash
intent init [options]

Options:
  --framework <name>  Framework preset (react, vue, svelte)
  --typescript        Add TypeScript support
  --skip-install      Skip dependency installation
```

### `build`
Compile Intent schemas to CSS.

```bash
intent build [options]

Options:
  --input, -i <path>   Input directory or file (default: ./src/schemas)
  --output, -o <path>  Output CSS file (default: ./dist/intent.css)
  --minify, -m         Minify output
  --source-maps        Generate source maps
```

### `watch`
Watch files for changes and rebuild automatically.

```bash
intent watch [options]

Options:
  --input, -i <path>   Input directory to watch
  --output, -o <path>  Output CSS file
  --debounce <ms>      Debounce delay (default: 100)
```

### `validate`
Validate component usage in source files.

```bash
intent validate [options]

Options:
  --src, -s <path>     Source directory to validate (default: ./src)
  --config <path>      Path to config file
  --strict             Fail on warnings
```

### `analyze`
Analyze bundle size and generate report.

```bash
intent analyze [options]

Options:
  --input <path>       CSS file to analyze
  --compare <path>     Compare with another CSS file
  --json               Output as JSON
```

## Configuration

Create an `intent.config.js` or `intent.config.ts` file:

```javascript
export default {
  // Input schemas
  input: './src/schemas',
  
  // Output CSS
  output: './dist/intent.css',
  
  // Theme configuration
  theme: {
    name: 'default',
    // Custom tokens...
  },
  
  // Component whitelist (optional)
  components: ['Button', 'Card', 'Input'],
  
  // Minification
  minify: process.env.NODE_ENV === 'production',
  
  // Source maps
  sourceMaps: true,
  
  // CSS prefix
  prefix: 'intent',
  
  // Dark mode
  darkMode: 'class', // 'class', 'media', or false
};
```

## Example Workflow

```bash
# 1. Initialize project
intent init --framework react --typescript

# 2. Create schema file (src/schemas/button.ts)
# 3. Build CSS
intent build

# 4. Watch during development
intent watch

# 5. Validate before commit
intent validate --strict

# 6. Analyze bundle size
intent analyze --input ./dist/intent.css
```

## License

MIT © Intent Framework Contributors
