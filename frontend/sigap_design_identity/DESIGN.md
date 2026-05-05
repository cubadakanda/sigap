---
name: SIGAP Design Identity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
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
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
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
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is anchored in the principles of transparency, accessibility, and modern governance. It aims to evoke a sense of digital trust and clarity, moving away from the heavy, opaque interfaces often associated with public service. 

By leveraging **Glassmorphism**, the system creates a visual metaphor for "transparent authority"—where information is layered clearly over a vibrant, dynamic background. The aesthetic is professional yet forward-thinking, utilizing frosted surfaces and light-refracting borders to guide the user's focus. The emotional response is one of reliability and ease, ensuring that citizens feel empowered rather than overwhelmed.

## Colors

The palette is led by **sigap-blue (#1e3a8a)**, a deep, authoritative navy that establishes institutional credibility. This is balanced by **Emerald Green (#10b981)** for success states and positive reinforcement. 

To support the glassmorphic style, the neutral palette consists of cool grays that don't muddy the transparency effects. Backgrounds should utilize very light tints to ensure that semi-transparent white containers maintain high contrast and readability. Gradients for interactive elements should transition from the primary blue to a slightly lighter, more vibrant indigo to create depth without sacrificing the professional tone.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic structure. The type scale is designed for high-density information environments common in public services. 

Headlines use tight tracking and heavy weights to command attention, while body copy is set with generous line heights to ensure long-form documents remain readable. Labels use a slightly medium weight to differentiate themselves from standard prose, providing clear signposting within complex glassmorphic forms.

## Layout & Spacing

The system follows a **12-column fluid grid** for web layouts and a flexible 4-column grid for mobile. Spacing is based on a 4px baseline, ensuring all components align perfectly regardless of their container's transparency.

Information density should be moderate. Large margins (32px+) are encouraged for top-level glass containers to allow the background blur to be visible around the edges, reinforcing the sense of depth. Inner paddings for cards and modals should be consistent at the `md` (24px) or `lg` (40px) level to maintain a professional, airy feel.

## Elevation & Depth

Elevation is achieved through **optical layering** rather than traditional heavy shadows.
- **Surface Level 0:** The vibrant background (gradients or high-res photography).
- **Surface Level 1 (Glass):** Semi-transparent white (`rgba(255, 255, 255, 0.7)`) with a `backdrop-blur-md` (12px-16px) and a subtle 1px border (`rgba(255, 255, 255, 0.2)`).
- **Surface Level 2 (Floating):** Increased blur and a soft, diffused shadow (`0 10px 30px rgba(0, 0, 0, 0.05)`) for modals and dropdowns.

Contrast is maintained by ensuring all text sitting on glass surfaces uses the primary blue or dark neutral shades, never white-on-white.

## Shapes

The shape language is consistently **Rounded**. A standard radius of `0.5rem` (8px) is used for buttons and input fields, while larger containers like cards and modals use `1rem` (16px) to emphasize the soft, "frosted" nature of the glass. This approach balances the rigid requirements of a government entity with the modern, approachable expectations of a digital-first citizen experience.

## Components

### Buttons
- **Primary:** Linear gradient (`sigap-blue` to a slightly brighter variant), white text, soft shadow.
- **Secondary:** Transparent background, `sigap-blue` border, `sigap-blue` text.
- **Glass Action:** Semi-transparent white button with backdrop-blur for use on dark backgrounds.

### Glass Cards
All containers must feature `bg-white/70`, `backdrop-blur-md`, and a `border-white/20`. Corners are set to `rounded-xl`.

### Input Fields
Inputs use a slightly more opaque background (`bg-white/90`) to ensure text entry is clear. Borders should be subtle until focused, where they transition to a solid `sigap-blue` with a soft glow.

### Status Badges
Status badges should be "vibrant transparent"—utilizing a high-saturation background color at 15-20% opacity (e.g., `Emerald Green/20`) with a solid-color label for maximum legibility.

### Lists & Navigation
Navigation items should use a glass-hover effect (a subtle increase in background opacity and blur) rather than a color change, maintaining the system's depth-based interaction model.