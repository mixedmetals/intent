---
sidebar_position: 2
---

# Theming

Customize Intent's design tokens to match your brand.

## Overview

Intent uses a theme system based on design tokens. These tokens control:
- Colors (primary, secondary, success, danger, etc.)
- Typography (font families, sizes, weights)
- Spacing (margins, padding, gaps)
- Shadows (elevation levels)
- Border radius

## Default Theme

```tsx
import { defaultTheme, generateThemeCSS } from 'intent-core/theme'

// Use the default theme
const css = generateThemeCSS(defaultTheme)
```

## Theme Structure

```tsx
type Theme = {
  colors: {
    // Brand colors
    primary: string
    primaryHover: string
    primaryActive: string
    
    // Semantic colors
    success: string
    warning: string
    danger: string
    info: string
    
    // Neutral scale
    background: string
    surface: string
    surfaceElevated: string
    border: string
    text: string
    textMuted: string
  }
  
  spacing: {
    // Based on 4px grid
    0: string
    1: string  // 4px
    2: string  // 8px
    3: string  // 12px
    4: string  // 16px
    5: string  // 20px
    6: string  // 24px
    8: string  // 32px
    10: string // 40px
    12: string // 48px
    16: string // 64px
  }
  
  fontFamily: {
    sans: string
    mono: string
  }
  
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  
  radius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  
  shadow: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}
```

## Custom Theme

### Method 1: Extend Default

```tsx
import { defaultTheme, generateThemeCSS } from 'intent-core/theme'

const myTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#e11d48',     // Your brand color
    primaryHover: '#be123c',
  }
}

const css = generateThemeCSS(myTheme)
```

### Method 2: From Scratch

```tsx
import { defineTheme } from 'intent-core/theme'

const myTheme = defineTheme({
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: '#0f172a',
    textMuted: '#64748b',
  },
  spacing: {
    1: '4px',
    2: '8px',
    4: '16px',
    8: '32px',
  },
  // ... other tokens
})
```

### Method 3: CLI Configuration

```js
// intent.config.js
module.exports = {
  theme: {
    colors: {
      primary: '#3b82f6',
    },
    spacing: {
      scale: 4, // 4px base grid
    }
  }
}
```

## Dark Mode

Intent supports automatic dark mode:

```tsx
const theme = {
  ...defaultTheme,
  darkMode: {
    selector: '[data-theme="dark"]',
    colors: {
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
    }
  }
}
```

Generated CSS:

```css
:root {
  --intent-color-background: #ffffff;
  --intent-color-text: #0f172a;
}

[data-theme="dark"] {
  --intent-color-background: #0f172a;
  --intent-color-text: #f1f5f9;
}
```

## CSS Variables

Intent generates CSS custom properties:

```css
:root {
  /* Colors */
  --intent-color-primary: #3b82f6;
  --intent-color-primary-hover: #2563eb;
  --intent-color-success: #10b981;
  --intent-color-danger: #ef4444;
  
  /* Spacing */
  --intent-spacing-1: 4px;
  --intent-spacing-2: 8px;
  --intent-spacing-4: 16px;
  
  /* Typography */
  --intent-font-sans: system-ui, sans-serif;
  --intent-font-mono: monospace;
  --intent-font-size-base: 1rem;
  
  /* Radius */
  --intent-radius-md: 0.5rem;
  --intent-radius-lg: 0.75rem;
  
  /* Shadows */
  --intent-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --intent-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

## Best Practices

1. **Use semantic tokens** - `primary` not `blue`
2. **Maintain contrast ratios** - All text should be WCAG compliant
3. **Test in both modes** - If supporting dark mode, test thoroughly
4. **Document custom tokens** - Add your brand colors to the theme
5. **Use the scale** - Don't add one-off values, extend the scale

## Related

- [Schema Definition](./schema) - Using theme tokens in components
- Design tokens documentation
