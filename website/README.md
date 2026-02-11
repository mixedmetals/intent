# Intent Website

The official website for Intent, built with Intent CSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This website is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Setup Instructions

1. Go to your GitHub repository → Settings → Pages
2. Under "Build and deployment", select **"GitHub Actions"** as the source
3. The workflow in `.github/workflows/deploy-website.yml` will handle the rest

### Manual Deployment

You can also trigger a manual deployment:
1. Go to Actions → Deploy Website
2. Click "Run workflow"

## Structure

```
website/
├── src/           # Source files
├── dist/          # Build output (deployed to GitHub Pages)
├── public/        # Static assets
└── package.json
```

## Packages Used

- `intent-core` - Schema definition and compiler
- `intent-react` - React components
- `intentcss-cli` - CLI for compiling CSS
