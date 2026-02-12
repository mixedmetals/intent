# Intent Framework Technical Roadmap
## Pre-Visual Overhaul: Bridging Production Gaps

**Goal:** Establish foundational technical infrastructure before implementing the "Subtle Tactility" (Linear-esque) visual overhaul. All implementations must adhere to the Schema-First philosophy.

---

## Phase 1: The 'Deterministic' Foundation

### 1.1 Hooks System (`packages/react/src/hooks/`)

#### Priority 1: Layout-Aware Hooks
- [ ] **`useMediaQuery(query: string): boolean`**
  - **Schema Integration:** Enable responsive prop variants in component schemas (e.g., `size={{ sm: 'compact', lg: 'relaxed' }}`). The hook reads from a standardized breakpoint token registry.
  - **Tactility Purpose:** Allows components to "breathe" differently at different viewports—critical for the dense-yet-readable Linear aesthetic.

- [ ] **`useResizeObserver(ref: RefObject, callback: (entry: ResizeObserverEntry) => void)`**
  - **Schema Integration:** Powers container-query-like behavior for components that need to adapt to their parent, not just the viewport.
  - **Tactility Purpose:** Enables "smart" density adjustments within dashboard cards and bento grids.

#### Priority 2: Interaction Hooks
- [ ] **`useOnClickOutside(refs: RefObject[], handler: () => void): void`**
  - **Schema Integration:** Automatically applied to overlay components (Modal, Drawer, Popover, Menu) via their schemas. The LLM shouldn't need to remember to add this.
  - **Tactility Purpose:** Ensures tactile overlays dismiss properly with expected physical feedback.

- [ ] **`useDebounce<T>(value: T, delay: number): T`**
  - **Schema Integration:** Used internally by input components with `onSearch` or `onFilter` props.
  - **Tactility Purpose:** Prevents UI "jitter" during rapid interactions.

- [ ] **`useThrottle<T>(value: T, limit: number): T`**
  - **Schema Integration:** For scroll-linked animations and resize handlers.
  - **Tactility Purpose:** Maintains 60fps performance during scroll for that "heavy mechanical" feel.

#### Priority 3: State Hooks
- [ ] **`useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]`**
  - **Schema Integration:** Enable `persist` prop on Form, Switch, Select components.
  - **Tactility Purpose:** User preferences (like dark mode) feel "sticky" and physical.

- [ ] **`useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void]`**
  - **Schema Integration:** Temporary state persistence for multi-step flows.

- [ ] **`useNetworkStatus(): { online: boolean; type?: string }`**
  - **Schema Integration:** Automatic offline states for form submissions and data fetching.

#### Priority 4: Advanced Hooks
- [ ] **`useAnimationFrame(callback: (time: number) => void): void`**
  - **Schema Integration:** Power smooth number counters and progress animations.
  
- [ ] **`useClipboard(): { copy: (text: string) => Promise<void>; copied: boolean }`**
  - **Schema Integration:** Built into Code, Input (with copy button), and Toast confirmation.

- [ ] **`useHotkeys(shortcuts: Record<string, () => void>): void`**
  - **Schema Integration:** Automatically bound via `keyboardShortcuts` prop on components.

### 1.2 Accessibility (A11y) Primitives

#### Screen Reader Utilities
- [ ] **`.sr-only` / `.visually-hidden` CSS utility**
  - **Schema Integration:** Auto-generated for decorative icons, required field indicators. The schema decides what's visible vs. announced.
  - **Tactility Purpose:** Dense UIs need invisible labels for context without visual clutter.

- [ ] **`aria-live` region management hook (`useAnnouncer`)**
  - **Schema Integration:** Toast, Alert, and validation errors automatically route to polite/assertive live regions.

#### Focus Management
- [ ] **`FocusRing` token system**
  - **Schema Integration:** `focusVisible` prop on all interactive components with presets: `none`, `ring`, `ring-offset`, `inner`, `outer`.
  - **Tactility Purpose:** That "mechanical" feel requires a visible "click" point. The focus ring is the cursor's physical presence.

- [ ] **`useFocusTrap(active: boolean): RefObject<HTMLElement>`**
  - **Schema Integration:** Automatically enabled on Modal, Drawer, Dialog schemas.

- [ ] **`SkipLink` component**
  - **Schema Integration:** Auto-injected by Layout/Container components.

- [ ] **`prefers-reduced-motion` detection hook**
  - **Schema Integration:** Foundation for Phase 2 motion system.

### 1.3 Utility Infrastructure

- [ ] **`cx(...inputs: ClassValue[]): string` - className merger**
  - **Schema Integration:** The glue for all conditional tactile styling. Handles:
    - Layered shadows (base + hover + active)
    - Border vs. borderless states
    - Density modifiers
  - **Implementation:** Custom wrapper around `clsx` + `tailwind-merge` logic, but schema-aware.

- [ ] **`intent(...args: IntentClassValue[]): string`**
  - **Schema Integration:** Intent-specific variant of `cx` that understands token names and validates against the theme.

---

## Phase 2: Motion & Spatial Intent

### 2.1 Motion Token System

- [ ] **Cubic Bezier Preset Tokens**
  ```
  --intent-easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --intent-easing-mechanical: cubic-bezier(0.4, 0, 0.2, 1);
  --intent-easing-heavy: cubic-bezier(0.7, 0, 0.3, 1);
  --intent-easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --intent-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  ```
  - **Schema Integration:** Components reference these by name: `transition="heavy"` or `animate={{ enter: 'spring', exit: 'smooth' }}`.
  - **Tactility Purpose:** The "mechanical" preset (0.4, 0, 0.2, 1) gives that Linear "heavy click" feel.

### 2.2 Animation Components

- [ ] **`Fade` component**
  - Props: `in`, `duration`, `easing`, `unmountOnExit`
  - Schema: Used internally by Modal, Toast, Tooltip.

- [ ] **`Slide` component**
  - Props: `direction: 'up' | 'down' | 'left' | 'right'`, `distance`
  - Schema: Drawer, Sidebar, Sheet animations.

- [ ] **`Collapse` component**
  - Props: `in`, `axis: 'vertical' | 'horizontal'`
  - Schema: Accordion, expandable table rows.

- [ ] **`Scale` component**
  - Props: `in`, `from`, `to`
  - Schema: Popover, Menu, badge notifications.

### 2.3 Reduced Motion System

- [ ] **`useReducedMotion(): boolean`**
  - **Schema Integration:** All animation components check this automatically. If true, instant transitions or opacity-only fades.
  
- [ ] **`@media (prefers-reduced-motion)` token overrides**
  - All transitions become `0ms` or simple opacity changes.
  - **Tactility Compromise:** Remove spatial movement but keep instant visual feedback (color changes, borders).

### 2.4 Stagger & Orchestration

- [ ] **`useStagger(children: ReactNode[], delay: number): ReactNode[]`**
  - **Schema Integration:** List, Table, Grid components get `staggerChildren` prop.
  - **Tactility Purpose:** Bento grids loading in sequence feel "assembled" rather than appearing.

---

## Phase 3: The Icon & Typography Schema

### 3.1 Icon System

- [ ] **`Icon` component**
  - Props:
    - `name: string` (references icon registry)
    - `size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` (matches text sizing)
    - `color?: string` (inherits from parent Text color)
    - `strokeWidth?: number` (for outlined icons)
  - **Schema Integration:** 
    ```
    <Icon name="plus" size="inherit" /> // Matches parent text size exactly
    <Icon name="arrow" size="md" /> // Uses spacing token
    ```
  - **Tactility Purpose:** Icons must feel "stamped" into the UI—perfect alignment prevents visual "rattle."

- [ ] **Icon-text alignment utilities**
  - Automatic vertical alignment using `cap-height` and `x-height` metrics.
  - **Schema Integration:** Button, Badge, Alert automatically align icon + text.

- [ ] **Icon sizing token scale**
  ```
  --intent-icon-xs: 12px; // 1:1 with size-xs
  --intent-icon-sm: 16px; // 1:1 with size-sm
  --intent-icon-md: 20px;
  --intent-icon-lg: 24px;
  --intent-icon-xl: 32px;
  ```

### 3.2 Typography Utilities

- [ ] **`text-wrap: balance` utility**
  - **Schema Integration:** `balance` boolean prop on Text, Heading components.
  - **Tactility Purpose:** Prevents "orphan" words in Bento card headers—keeps the grid visually tight.

- [ ] **`line-clamp` utility**
  - **Schema Integration:** `clamp?: number` prop on Text.
  - **Schema Integration:** Auto-expands with "Read more" pattern via `truncated` state.

- [ ] **Text truncation utilities**
  - `truncate` (single line)
  - `truncate-multiline` (with fade)

- [ ] **Tabular nums utility**
  - **Schema Integration:** Auto-applied to Stat, Table numbers.
  - **Tactility Purpose:** Numbers that don't "dance" when changing feel more solid.

### 3.3 Typography Component Enhancements

- [ ] **`Prose` component** (rich text wrapper)
  - Auto-spacing for headings, paragraphs, lists within rich content.
  - **Schema Integration:** Content from CMS/markdown.

---

## Phase 4: Production Polish

### 4.1 Print System

- [ ] **`@media print` utilities**
  - `.print:hidden` - Hide in print
  - `.print:block` - Force block in print
  - `.print:break-before` - Page breaks
  - `.print:break-inside-avoid` - Keep together

- [ ] **Print-optimized tokens**
  - Shadows become borders (printers can't do shadows)
  - Colors become high-contrast black/white
  - Background colors become subtle borders

### 4.2 Layout Utilities

- [ ] **Scroll-snap utilities**
  - `.snap-x`, `.snap-y`, `.snap-mandatory`, `.snap-proximity`
  - **Schema Integration:** Carousel, horizontal lists.

- [ ] **Sticky positioning utilities**
  - `.sticky-top`, `.sticky-bottom` with z-index tokens
  - **Schema Integration:** Sticky headers in Table, Sidebar.

- [ ] **Container query support**
  - `@container` and `cq-*` utilities
  - **Schema Integration:** Card components that adapt to their grid cell size.

### 4.3 Form Validation System

- [ ] **`useForm()` hook**
  - Schema-driven validation (Zod integration)
  - Field-level and form-level error handling
  - **Schema Integration:** The component schema defines constraints; the hook enforces them.

- [ ] **`Form.Step` / `Form.Wizard` components**
  - Multi-step form orchestration
  - Progress persistence via `useSessionStorage`

- [ ] **Validation visual states**
  - Shake animation on error
  - Success checkmark transitions
  - **Tactility Purpose:** Errors should feel like a "bump"—physical feedback that something is wrong.

### 4.4 Color Utilities

- [ ] **`alpha(color: string, amount: number): string`**
  - Programmatically adjust token opacity.
  - **Schema Integration:** Hover states, overlays.

- [ ] **`darken/lighten(color: string, amount: number): string`**
  - Programmatic color manipulation.

---

## Integration Checklist (Schema-First Philosophy)

Every item above must satisfy:

- [ ] **Declarative:** LLM can describe it in natural language
- [ ] **Constrained:** Props have explicit allowed values
- [ ] **Token-Aware:** References design tokens, never raw values
- [ ] **Contextual:** Respects system preferences (reduced motion, dark mode)
- [ ] **Compositional:** Works in combination with other primitives

---

## Success Criteria

Before beginning the "Subtle Tactility" visual overhaul:

1. ✅ All 11 hooks implemented and documented
2. ✅ A11y primitives auto-applied by component schemas
3. ✅ Motion system with 5+ easing presets + reduced-motion support
4. ✅ Icon component with automatic sizing alignment
5. ✅ Typography utilities (balance, clamp, truncation)
6. ✅ Print styles covering all component categories
7. ✅ Form validation hook with schema integration
8. ✅ `cx` utility exposed and used throughout React package

---

## Estimated Effort

- Phase 1: 3-4 days
- Phase 2: 2-3 days  
- Phase 3: 2 days
- Phase 4: 2-3 days

**Total: ~10-12 days before visual overhaul begins**

---

**Ready for your review and approval.**
