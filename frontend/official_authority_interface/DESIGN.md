---
name: Official Authority Interface
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  h1:
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-sm:
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered to project authority, reliability, and civic duty. As a government-oriented platform for monitoring road infrastructure and disturbances, the visual language prioritizes clarity of information and a sense of institutional stability. 

The chosen style is **Corporate / Modern**. It balances a professional, systematic structure with modern UI affordances. The interface utilizes generous whitespace to reduce cognitive load during high-stress monitoring tasks. Every element is designed to feel intentional and "locked-in," evoking the precision of a command center while remaining accessible to the general public. 

Subtle motion paths and micro-interactions provide feedback without distracting from the data. The objective is to move away from legacy bureaucratic software toward a high-performance digital tool that citizens and officials can trust.

## Colors

The palette is anchored by **Deep Blue (#1e3a8a)**, a color that commands respect and signifies official state presence. This is contrasted with a sophisticated range of **Slate Grays** used for typography and structural elements to ensure the interface feels grounded.

- **Primary:** Reserved for branding, primary actions, and active navigation states.
- **Success:** Emerald Green is used exclusively for "Selesai" status and positive confirmation actions.
- **Functional Colors:** We utilize Amber for "Pending" and Sky Blue for "Diproses" to provide immediate visual categorization of road disturbances.
- **Neutrals:** A light Slate foundation (#f8fafc) keeps the interface airy, while high-contrast Slate-900 is used for body text to ensure maximum readability and ADA compliance.

## Typography

This design system utilizes **Public Sans**, a typeface specifically designed for government interfaces. It offers a neutral, yet authoritative tone that performs exceptionally well across both dense data tables and public-facing landing pages.

Headlines use a bold weight with slightly tightened letter spacing to create a strong visual anchor. Body text maintains a standard 1.5x line height to ensure long-form reports are legible. Label styles are frequently used for metadata and status badges, often employing a medium or semibold weight to differentiate them from interactive text.

## Layout & Spacing

The system follows a **12-column fluid grid** for dashboard views, transitioning to a centralized fixed width for informational pages. All spacing is derived from a **4px base unit**, ensuring mathematical harmony across the UI.

- **Margins:** Desktop views should maintain a 32px minimum outer margin.
- **Gutters:** Standardized at 24px to provide clear separation between data cards.
- **Density:** Dashboard environments should utilize "Compact" spacing (8px-12px between elements), while public reporting forms should use "Spacious" padding (24px+) to prevent user fatigue and accidental clicks.

## Elevation & Depth

Visual hierarchy in the design system is achieved through **Tonal Layering** and **Ambient Shadows**. Instead of heavy gradients, we use subtle depth cues to indicate interactivity.

1.  **Level 0 (Background):** Slate-50 (#f8fafc) – the canvas.
2.  **Level 1 (Cards/Surface):** White (#ffffff) – used for the primary content containers. These feature a 1px border (#e2e8f0) and a very soft, diffused shadow (0 4px 6px -1px rgb(0 0 0 / 0.05)).
3.  **Level 2 (Dropdowns/Modals):** Floating elements use a more pronounced shadow to indicate they sit above the primary interface (0 10px 15px -3px rgb(0 0 0 / 0.1)).

Interactions such as hovering over a card should result in a subtle "lift" effect—achieved by increasing the shadow spread and reducing the Y-offset slightly using a Framer Motion spring transition.

## Shapes

The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This softening of corners makes the professional "Deep Blue" palette feel more modern and less aggressive.

- **Buttons & Inputs:** 8px (rounded-md) for a consistent, structured feel.
- **Status Badges:** Fully rounded (pill-shaped) to distinguish them clearly from interactive buttons.
- **Cards:** 1rem (16px) for larger surface areas, creating a clear container for grouped information.
- **Selection Indicators:** 4px (rounded-sm) for small checkboxes or radio focus states.

## Components

### Buttons
- **Primary:** Solid Deep Blue with white text. On hover, darken the blue by 10%.
- **Secondary:** Slate-100 background with Slate-900 text.
- **Animation:** Use a subtle scale-down effect (scale: 0.98) on tap/click via Framer Motion.

### Status Badges
- **Pending:** Soft Amber background with Dark Amber text. Left-aligned Lucide `Clock` icon.
- **Diproses:** Soft Blue background with Dark Blue text. Left-aligned Lucide `RefreshCw` icon (with a slow infinite rotation).
- **Selesai:** Soft Emerald background with Dark Emerald text. Left-aligned Lucide `CheckCircle2` icon.

### Cards
- White background, 1px Slate-200 border. 
- Header section includes a Lucide icon related to the disturbance category (e.g., `Construction`, `AlertTriangle`).
- Footers should be used for timestamps and "View Details" actions.

### Forms
- **Input Fields:** 1px Slate-300 border that transitions to 2px Deep Blue on focus.
- **Validation:** Use Lucide `AlertCircle` for error states with red text.
- **Labels:** Always positioned above the input, using the `label-md` typographic style.

### Icons
- Use **Lucide React** icons. Stroke width should be set to 2px for clarity. 
- Icons in buttons should be sized to 18px; icons in status badges to 14px.