# Intent Framework Website Roadmap

## 🎯 Vision
A modern, fast documentation site that converts visitors into users. Homepage = marketing + quick start. Clean header with Docs + GitHub links.

---

## Phase 1: Foundation (Week 1)

### 1.1 Choose Tech Stack
**Decision:** Use **VitePress**
- Fast (Vite-powered)
- Clean, modern design
- Easy GitHub Pages deploy
- Great for component libraries
- Markdown + Vue (can embed React components)

### 1.2 Initialize Project
```bash
cd intent-framework/website
rm -rf *  # Clear old Vite site
npx vitepress init
# Choose: Default theme + TypeScript
```

### 1.3 Basic Structure
```
website/
├── .vitepress/
│   ├── config.ts          # Site config
│   ├── theme/
│   │   ├── index.ts       # Custom theme
│   │   └── style.css      # Intent branding
│   └── cache/             # Build cache
├── index.md               # Homepage (marketing)
├── docs/
│   ├── getting-started.md
│   ├── components/
│   │   ├── button.md
│   │   ├── input.md
│   │   └── ...
│   └── api/
│       └── schema.md
├── public/
│   ├── logo.svg
│   └── og-image.png
└── package.json
```

---

## Phase 2: Homepage Design (Week 1-2)

### 2.1 Hero Section
**Goal:** Convert in 5 seconds

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Intent Framework        [Docs] [GitHub]             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   The Schema-First, AI-Native CSS Framework                 │
│                                                             │
│   74× smaller CSS than Tailwind. Type-safe.                 │
│   Built for the AI era.                                     │
│                                                             │
│   [ npm install intent-core ]  [Get Started →]              │
│                                                             │
│   72 Components  •  8KB CSS  •  TypeScript                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Content:**
- Headline: Clear value prop
- Subhead: Size comparison + type safety
- CTA buttons: Install command + Docs link
- Trust badges: Component count, bundle size, TS badge

### 2.2 Code Comparison Section
Show the difference:

```
Tailwind CSS          vs.          Intent CSS
─────────────────────────────────────────────
<button class="bg-blue-500    <Button 
  hover:bg-blue-600            importance="primary"
  text-white                   size="lg">
  px-4 py-2                    Click me
  rounded-lg                   </Button>
  transition-all
  duration-200">
  Click me
</button>
```

**Stats callout:**
- Tailwind: 588KB CSS → Intent: 8KB CSS
- 50,000+ classes → Per-component selectors

### 2.3 Feature Grid
```
┌──────────────┬──────────────┬──────────────┐
│   🎯         │   🤖         │   🔒         │
│  Schema-     │  AI-Native   │  Type-Safe   │
│  First       │  Design      │  Components  │
│              │              │              │
│  Define once,│  AI generates│  Full TS     │
│  use everywhere valid code  │  validation  │
└──────────────┴──────────────┴──────────────┘
┌──────────────┬──────────────┬──────────────┐
│   🎨         │   🌙         │   ⚡         │
│  Complete    │  Dark Mode   │  74× Smaller │
│  Theme       │  Built-in    │  CSS         │
│              │              │              │
│  9 color     │  Automatic   │  ~50ms build │
│  palettes    │  switching   │  times       │
└──────────────┴──────────────┴──────────────┘
```

### 2.4 Component Preview
Live component gallery with:
- Button variants
- Alert states
- Input types
- Card examples

### 2.5 Quick Start Section
```bash
# 1. Install
npm install intent-core intent-react

# 2. Use
import { Button } from 'intent-react';

function App() {
  return <Button importance="primary">Hello</Button>;
}

# 3. Done! ✨
```

### 2.6 Footer
- Links: Docs, GitHub, NPM, Twitter
- License: MIT
- Copyright

---

## Phase 3: Documentation (Week 2-3)

### 3.1 Getting Started Guide
```
docs/
├── getting-started.md
├── installation.md
├── quick-start.md
├── theming.md
└── custom-components.md
```

### 3.2 Component Documentation
**Template for each component:**
```markdown
# Button

Action element that triggers an event.

## Import
\`\`\`ts
import { Button } from 'intent-react';
\`\`\`

## Usage
\`\`\`tsx
<Button importance="primary">Click me</Button>
\`\`\`

## Examples
[Live component examples]

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| importance | 'primary' \| 'secondary' \| 'ghost' | 'secondary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| ... | ... | ... | ... |

## Schema
\`\`\`typescript
// Intent schema definition
const ButtonSchema = defineComponent({
  name: 'Button',
  properties: {
    importance: { type: 'enum', values: ['primary', 'secondary', 'ghost'] },
    size: { type: 'enum', values: ['sm', 'md', 'lg'] }
  }
});
\`\`\`
```

### 3.3 API Reference
- Schema definition API
- Theme configuration
- CLI commands
- Type generation

---

## Phase 4: Custom Theme (Week 3)

### 4.1 Intent Branding
```css
/* .vitepress/theme/style.css */
:root {
  --vp-c-brand: #3b82f6;        /* Intent primary blue */
  --vp-c-brand-light: #60a5fa;
  --vp-c-brand-dark: #2563eb;
  
  /* Intent color palette integration */
  --intent-primary-50: #eff6ff;
  --intent-primary-500: #3b82f6;
  --intent-primary-600: #2563eb;
}

.dark {
  --vp-c-bg: #0f172a;
  --vp-c-bg-soft: #1e293b;
}
```

### 4.2 Custom Components
- `<ComponentShowcase />` - Live component demos
- `<Comparison />` - Before/after code
- `<InstallCommand />` - Copyable npm install
- `<StatsBadge />` - 74x smaller, etc.

### 4.3 Logo & Assets
- Intent logo (SVG)
- OG image for social sharing
- Favicon

---

## Phase 5: Deploy (Week 3)

### 5.1 GitHub Actions Workflow
```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths: ['website/**', 'packages/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - name: Build
        run: |
          cd website
          pnpm install
          pnpm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/.vitepress/dist
```

### 5.2 Configure GitHub Pages
1. Settings → Pages
2. Source: GitHub Actions
3. Custom domain (optional): intentcss.dev

---

## Phase 6: Polish (Week 4)

### 6.1 SEO
- Meta tags for each page
- Open Graph images
- Structured data (JSON-LD)
- Sitemap generation

### 6.2 Analytics
- Google Analytics or Plausible
- Track popular components
- Monitor bounce rate

### 6.3 Search
- Enable Algolia DocSearch (free for OSS)
- Or use local search plugin

### 6.4 Mobile Optimization
- Responsive design check
- Touch-friendly examples
- Performance audit

---

## Implementation Timeline

| Week | Focus | Deliverables |
|------|-------|--------------|
| **Week 1** | Foundation | VitePress setup, basic homepage layout |
| **Week 2** | Homepage | Hero, features, comparison, CTA sections |
| **Week 3** | Docs + Theme | Component docs, custom styling, deploy |
| **Week 4** | Polish | SEO, analytics, search, mobile |

---

## File Structure (Final)

```
intent-framework/
├── packages/                    # Published packages
│   ├── core/
│   ├── react/
│   ├── cli/
│   └── mcp/
├── website/                     # Documentation site
│   ├── .vitepress/
│   │   ├── config.ts
│   │   ├── theme/
│   │   │   ├── index.ts
│   │   │   ├── style.css
│   │   │   └── components/
│   │   │       ├── ComponentShowcase.vue
│   │   │       ├── Comparison.vue
│   │   │       └── InstallCommand.vue
│   │   └── cache/
│   ├── index.md                 # Homepage
│   ├── docs/
│   │   ├── getting-started/
│   │   │   ├── installation.md
│   │   │   └── quick-start.md
│   │   ├── components/
│   │   │   ├── button.md
│   │   │   ├── alert.md
│   │   │   └── [all 72 components].md
│   │   └── api/
│   │       ├── schema.md
│   │       ├── theme.md
│   │       └── cli.md
│   ├── public/
│   │   ├── logo.svg
│   │   └── og-image.png
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy-docs.yml
└── README.md
```

---

## Success Metrics

- [ ] Homepage loads in < 2s
- [ ] Lighthouse score 90+
- [ ] All 72 components documented
- [ ] Dark mode works perfectly
- [ ] Mobile-responsive
- [ ] Searchable docs
- [ ] Deployed to GitHub Pages

---

## Next Steps

1. **Start now:** Run `npx vitepress init` in `website/`
2. **Copy content:** Use README.md as homepage starting point
3. **Build incrementally:** One section at a time
4. **Deploy early:** Get feedback on the live site

Ready to start building? 🚀
