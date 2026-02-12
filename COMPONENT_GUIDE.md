# Component Guide - Tactility v2

> Practical guide for implementing Intent components with Subtle Tactility design.

## Quick Start

Every component follows one of three archetypes. Determine which before styling:

| Archetype | Use For | Key Visuals |
|-----------|---------|-------------|
| **Milled** | Buttons, inputs, switches, checkboxes, radios | Radial gradient, 0.5px hairline border, inset shadows |
| **Elevated** | Cards, modals, tooltips, popovers | Backdrop blur, layered shadows, hairline border |
| **Flat** | Badges, tags, pills, status indicators | Transparent tint, minimal border, no shadow |

## Archetype Implementation

### 1. Milled Archetype

**Example: Button**

```css
.intent-button {
  /* Base positioning for hairline */
  position: relative;
  
  /* Milled surface background */
  background: var(--intent-surface-milled-bg);
  /* or custom: */
  background: 
    linear-gradient(var(--intent-light-angle), oklch(100% 0 0 / 0.08) 0%, transparent 50%),
    radial-gradient(120% 80% at 30% 0%, oklch(100% 0 0 / 0.10) 0%, transparent 60%),
    oklch(25% 0.008 275);
  
  /* Remove default border */
  border: none;
  
  /* Directional shadow from 145° light */
  box-shadow:
    inset 0 0.5px 0 0 oklch(100% 0 0 / 0.12),  /* Top highlight */
    1px 2px 3px -1px oklch(0% 0 0 / 0.25),      /* Cast shadow down-right */
    0 1px 1px 0 oklch(0% 0 0 / 0.15);           /* Ambient */
  
  border-radius: var(--intent-radius-md);
  cursor: pointer;
}

/* REQUIRED: Hairline border */
.intent-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 0.5px;
  background: linear-gradient(
    var(--intent-light-angle, 145deg),
    oklch(100% 0 0 / 0.20) 0%,   /* Light edge - top-left */
    oklch(100% 0 0 / 0.08) 50%,  /* Middle */
    oklch(0% 0 0 / 0.20) 100%    /* Dark edge - bottom-right */
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Hover: Brighter border */
.intent-button:hover::before {
  background: linear-gradient(
    var(--intent-light-angle, 145deg),
    oklch(100% 0 0 / 0.25) 0%,
    oklch(100% 0 0 / 0.10) 50%,
    oklch(0% 0 0 / 0.25) 100%
  );
}

/* Active: Inset shadow from top-left */
.intent-button:active {
  box-shadow: 
    inset 1px 2px 4px oklch(0% 0 0 / 0.30),
    inset 0 1px 1px oklch(0% 0 0 / 0.15);
}
```

### 2. Elevated Archetype

**Example: Card**

```css
.intent-card {
  position: relative;
  background: var(--intent-surface-elevated-bg);
  /* or custom: */
  background: 
    linear-gradient(var(--intent-light-angle), oklch(24% 0.008 275 / 0.5) 0%, transparent 60%),
    linear-gradient(180deg, oklch(22% 0.006 275) 0%, oklch(18% 0.004 275) 100%);
  
  /* Backdrop blur for glass effect */
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  
  border: none;
  
  /* Multi-layered shadow */
  box-shadow:
    0 0 0 0.5px oklch(0% 0 0 / 0.25),
    2px 4px 8px -1px oklch(0% 0 0 / 0.15),
    4px 8px 24px -4px oklch(0% 0 0 / 0.20);
  
  border-radius: var(--intent-radius-lg);
}

/* Hairline border (same pattern) */
.intent-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 0.5px;
  background: linear-gradient(
    var(--intent-light-angle, 145deg),
    oklch(100% 0 0 / 0.15) 0%,
    oklch(100% 0 0 / 0.06) 50%,
    oklch(0% 0 0 / 0.25) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Hover: Lift effect */
.intent-card:hover {
  box-shadow:
    0 0 0 0.5px oklch(100% 0 0 / 0.12),
    3px 6px 12px -2px oklch(0% 0 0 / 0.20),
    6px 16px 32px -8px oklch(0% 0 0 / 0.25);
  transform: translateY(-2px);
}
```

### 3. Flat Archetype

**Example: Badge**

```css
.intent-badge {
  /* High transparency tint */
  background: oklch(100% 0 0 / 0.06);
  
  /* Subtle border */
  border: 0.5px solid oklch(100% 0 0 / 0.12);
  
  /* No shadow */
  box-shadow: none;
  
  border-radius: var(--intent-radius-md);
}

/* Variants use color with low alpha */
.intent-badge--primary {
  background: oklch(65% 0.12 275 / 0.10);  /* 0.12 chroma */
  border-color: oklch(65% 0.12 275 / 0.20);
  color: var(--intent-color-primary);
}
```

## Color System

### Primary Color (Matte/Metallic)

```css
/* NEVER use high chroma (0.22) - looks plastic */
/* Use reduced chroma (0.12) for matte look */

--intent-color-primary: oklch(65% 0.12 275);
--intent-color-primary-hover: oklch(70% 0.13 275);
--intent-color-primary-active: oklch(60% 0.11 275);

/* Alpha variants for surfaces */
--intent-color-primary-alpha: oklch(65% 0.12 275 / 0.15);
```

### Neutral Surfaces (Cool Gray)

```css
/* Use 275° hue (cool gray) not 0° (neutral) for cohesion */
--intent-surface-bg: oklch(25% 0.008 275);
--intent-surface-elevated: oklch(22% 0.006 275);
--intent-surface-flat: oklch(100% 0 0 / 0.06);
```

### Semantic Colors (Reduced Chroma)

```css
/* Success - not too green */
--intent-color-success: oklch(65% 0.10 145);

/* Warning - not too orange */
--intent-color-warning: oklch(75% 0.10 85);

/* Danger - not too red */
--intent-color-danger: oklch(55% 0.12 25);
```

## Shadow Direction

From 145° light source (top-left):

```css
/* Milled: Cast down-right */
box-shadow: 1px 2px 3px -1px oklch(0% 0 0 / 0.25);

/* Elevated: Layered */
box-shadow:
  0 0 0 0.5px oklch(0% 0 0 / 0.25),        /* Border shadow */
  2px 4px 8px -1px oklch(0% 0 0 / 0.15),   /* Mid shadow */
  4px 8px 24px -4px oklch(0% 0 0 / 0.20);  /* Ambient */

/* Active/Pressed: Inset from top-left */
box-shadow: inset 1px 2px 4px oklch(0% 0 0 / 0.30);
```

## Motion

```css
/* Micro-interactions */
--intent-duration-micro: 75ms;   /* Checkbox check */
--intent-duration-fast: 100ms;   /* Button hover */
--intent-duration-normal: 150ms; /* Card lift */
--intent-duration-slow: 250ms;   /* Modal open */

/* Easing */
--intent-easing-mechanical: cubic-bezier(0.2, 0, 0, 1);  /* Buttons, inputs */
--intent-easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Switches, toggles */
--intent-easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);  /* Cards, modals */
```

## Common Patterns

### Focus Ring

```css
.component:focus-visible {
  outline: 2px solid var(--intent-color-primary);
  outline-offset: 2px;
}
```

### Disabled State

```css
.component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: saturate(0.5);
}
```

### Size Variants

```css
/* Use density token */
--intent-density: 1;

/* Scale padding, font, gaps */
padding: calc(var(--intent-space-2) * var(--intent-density));
font-size: calc(var(--intent-text-sm) * (0.9 + 0.1 * var(--intent-density)));
```

## Checklist

Before submitting a component:

- [ ] **Archetype correct?** (Milled/Elevated/Flat)
- [ ] **Position: relative?** (Required for ::before hairline)
- [ ] **Hairline gradient uses 145°?**
- [ ] **Shadows cast down-right?**
- [ ] **OKLCH chroma ≤ 0.12?**
- [ ] **Hue = 275° for neutrals?**
- [ ] **Focus ring present?**
- [ ] **Disabled state styled?**
- [ ] **Transitions smooth?** (100-150ms)
- [ ] **No hard-coded hex values?**

## Anti-Patterns

### ❌ Don't: High chroma colors
```css
/* Looks plastic/cheap */
background: oklch(55% 0.22 255);  /* 0.22 chroma = too saturated */
```

### ❌ Don't: Wrong light angle
```css
/* Light from top, not 145° */
linear-gradient(180deg, ...);  /* Flat, no depth */
```

### ❌ Don't: 1px borders
```css
/* Chunky, not hairline */
border: 1px solid oklch(100% 0 0 / 0.20);
```

### ❌ Don't: Centered shadows
```css
/* No directional light */
box-shadow: 0 2px 4px oklch(0% 0 0 / 0.25);  /* Ambiguous light source */
```

### ✅ Do: Matte colors
```css
background: oklch(65% 0.12 275);  /* 0.12 chroma = matte */
```

### ✅ Do: 145° light angle
```css
linear-gradient(145deg, oklch(100% 0 0 / 0.08) 0%, transparent 50%);
```

### ✅ Do: 0.5px hairline
```css
/* Using mask-image technique */
padding: 0.5px;
background: linear-gradient(145deg, ...);
mask-composite: exclude;
```

### ✅ Do: Directional shadows
```css
box-shadow: 1px 2px 3px -1px oklch(0% 0 0 / 0.25);  /* From 145° light */
```

## Reference Implementations

See these files for complete examples:

- `website/src/css/intent-theme.css` - All component styles
- `.intent-button` (line ~210) - Milled archetype
- `.intent-switch` (line ~386) - Complex milled with track/thumb
- `.intent-card` (line ~295) - Elevated archetype
- `.intent-badge` (line ~unknown) - Flat archetype
