# Theming

Intent provides a comprehensive theme system with dark mode support.

## Default Theme

Intent includes a complete default theme out of the box:

```typescript
import { defaultTheme, generateThemeCSS } from 'intent-core'

// Generate CSS variables
const css = generateThemeCSS(defaultTheme)
```

## Theme Structure

```typescript
interface Theme {
  name: string
  tokens: {
    color: ColorPalette
    spacing: SpacingScale
    shadows: ShadowScale
    radius: RadiusScale
    typography: TypographyScale
    // ... more
  }
  darkTokens?: Partial<TokenRegistry>
  settings?: {
    prefix?: string
    darkMode?: 'class' | 'media' | false
  }
}
```

## Using the Default Theme

### CSS Import

```css
/* In your main CSS file */
@import 'intent-core/theme.css';
```

### JavaScript Import

```typescript
import 'intent-core/theme.css'
```

### Custom Build

```typescript
import { defaultTheme, generateThemeCSS } from 'intent-core'
import fs from 'fs'

const css = generateThemeCSS(defaultTheme)
fs.writeFileSync('intent-theme.css', css)
```

## Customizing Themes

### extendTheme

Create a theme based on the default:

```typescript
import { extendTheme, registerTheme } from 'intent-core'

const myTheme = extendTheme('default', {
  tokens: {
    color: {
      primary: {
        500: '#FF6B6B',  // Your brand color
        600: '#EE5A5A'
      }
    }
  }
})

registerTheme(myTheme)
```

### Custom Theme

Create a theme from scratch:

```typescript
import { createTheme, registerTheme } from 'intent-core'

const customTheme = createTheme('my-theme', {
  tokens: {
    color: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        // ... all shades
        900: '#1e3a8a'
      }
    },
    spacing: {
      '1': '0.25rem',
      '2': '0.5rem',
      '4': '1rem'
    }
  },
  darkTokens: {
    color: {
      primary: {
        500: '#60a5fa'  // Lighter in dark mode
      }
    }
  }
})

registerTheme(customTheme)
```

## Color Palette

The default theme includes 9 color palettes:

| Palette | Usage |
|---------|-------|
| `primary` | Brand color, actions |
| `neutral` | Grays, text, borders |
| `success` | Success states |
| `warning` | Warning states |
| `error` | Error states |
| `info` | Info states |
| `purple` | Accents |
| `pink` | Accents |
| `orange` | Accents |

Each palette has 11 shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

### Using Colors

```css
.my-component {
  background-color: var(--intent-color-primary-500);
  color: var(--intent-color-neutral-900);
  border-color: var(--intent-color-neutral-200);
}
```

```tsx
// In component mappings
mappings: {
  'variant=primary': {
    backgroundColor: 'var(--intent-color-primary-600)',
    color: 'white'
  }
}
```

## Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `0` | 0 | 0px |
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `4` | 1rem | 16px |
| `8` | 2rem | 32px |
| `16` | 4rem | 64px |

Full scale: 0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

## Shadows

| Token | Value |
|-------|-------|
| `none` | none |
| `sm` | 0 1px 2px 0 rgb(0 0 0 / 0.05) |
| `md` | 0 4px 6px -1px rgb(0 0 0 / 0.1) |
| `lg` | 0 10px 15px -3px rgb(0 0 0 / 0.1) |
| `xl` | 0 20px 25px -5px rgb(0 0 0 / 0.1) |

## Border Radius

| Token | Value |
|-------|-------|
| `none` | 0 |
| `sm` | 0.125rem |
| `md` | 0.375rem |
| `lg` | 0.5rem |
| `xl` | 0.75rem |
| `full` | 9999px |

## Typography

### Font Sizes

| Token | Value |
|-------|-------|
| `xs` | 0.75rem |
| `sm` | 0.875rem |
| `base` | 1rem |
| `lg` | 1.125rem |
| `xl` | 1.25rem |
| `2xl` | 1.5rem |
| `3xl` | 1.875rem |
| `4xl` | 2.25rem |

### Font Weights

| Token | Value |
|-------|-------|
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |

## Dark Mode

Intent supports automatic dark mode:

### Class-based (default)

```html
<html class="dark">
  <!-- Dark mode styles applied -->
</html>
```

```typescript
const theme = {
  settings: {
    darkMode: 'class'
  }
}
```

### Media Query

```typescript
const theme = {
  settings: {
    darkMode: 'media'  // Uses prefers-color-scheme
  }
}
```

### Manual Dark Tokens

```typescript
const theme = {
  tokens: {
    color: {
      neutral: {
        900: '#0a0a0a'  // Light: very dark
      }
    }
  },
  darkTokens: {
    color: {
      neutral: {
        900: '#fafafa'  // Dark: very light
      }
    }
  }
}
```

## Component Tokens

Define component-specific tokens:

```typescript
const theme = {
  tokens: {
    component: {
      button: {
        'primary-bg': '#3b82f6',
        'primary-bg-hover': '#2563eb',
        'primary-text': '#ffffff'
      }
    }
  }
}
```

Usage:
```css
.intent-button[data-importance="primary"] {
  background-color: var(--intent-component-button-primary-bg);
}
```

## Switching Themes

```typescript
import { useTheme } from 'intent-react'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  )
}
```

## Best Practices

1. **Extend the default theme** - Don't start from scratch
2. **Use semantic tokens** - `primary` not `blue`
3. **Test in both modes** - Light and dark
4. **Maintain contrast ratios** - WCAG AA minimum
5. **Document custom tokens** - For your team
