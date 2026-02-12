# Deployment Workflow - Intent Framework

> GitHub Actions workflow for deploying the documentation site.

## Overview

The website deploys automatically on push to `main` branch via GitHub Actions.

**Live URL:** https://mixedmetals.github.io/intent/

## Workflow File

`.github/workflows/deploy-docs.yml`

```yaml
name: Deploy Docs to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages (core)
        run: pnpm --filter intent-core run build

      - name: Build packages (react)
        run: pnpm --filter intent-react run build

      - name: Build website
        run: pnpm --filter website run build
        env:
          NODE_OPTIONS: --max-old-space-size=4096

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: website/build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Critical Requirements

### 1. Use pnpm (Not npm!)
The workflow must use pnpm for workspace package resolution. npm cannot resolve `workspace:*` dependencies.

### 2. Build Order Matters
Packages must build in dependency order:
1. `intent-core` (no deps)
2. `intent-react` (depends on core)
3. `website` (depends on both)

### 3. Workspace Protocol
Website package.json uses workspace packages:
```json
"dependencies": {
  "intent-core": "workspace:*",
  "intent-react": "workspace:*"
}
```

### 4. Cache Strategy
Uses pnpm store caching for faster installs:
- Key: `pnpm-lock.yaml` hash
- Restores from previous runs

## Troubleshooting

### Build Failures

**Error:** `Module not found: Error: "./hooks" is not exported...`
- **Cause:** Using npm instead of pnpm
- **Fix:** Ensure workflow uses `pnpm/action-setup@v2`

**Error:** `Cannot find module 'intent-react'`
- **Cause:** Packages not built before website
- **Fix:** Build core → react → website in sequence

**Error:** `ENOENT: no such file or directory 'dist/bin/intent.js'`
- **Cause:** CLI not built, bin links missing
- **Fix:** Build all packages with `pnpm run build`

### Deployment Failures

**Error:** `gh-pages branch not found`
- **Cause:** First deployment or branch deleted
- **Fix:** Workflow auto-creates branch, manual push not needed

**Error:** Large files detected (>100MB)
- **Cause:** node_modules in git history
- **Fix:** Ensure `.gitignore` includes node_modules

## Manual Deployment

If needed, deploy manually:

```bash
# Build everything
pnpm run build

# Deploy (requires GIT_USER env var)
cd website && GIT_USER=mixedmetals pnpm run deploy
```

## GitHub Pages Settings

Repository → Settings → Pages:
- **Source:** GitHub Actions
- **Branch:** gh-pages (auto-managed)
- **URL:** https://mixedmetals.github.io/intent/

## Monitoring

Check workflow status:
https://github.com/mixedmetals/intent/actions/workflows/deploy-docs.yml

## Rollback

To rollback to previous version:
```bash
# Find working commit
git log --oneline gh-pages

# Force push old commit
git push origin <commit-hash>:gh-pages --force
```
