---
name: Sonic Pulse
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#8e9378'
  outline-variant: '#444933'
  surface-tint: '#aed500'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#c7f300'
  on-primary-container: '#576c00'
  inverse-primary: '#526600'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#ffffff'
  on-tertiary: '#66002c'
  tertiary-container: '#ffd9e0'
  on-tertiary-container: '#c6005d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c7f300'
  primary-fixed-dim: '#aed500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ffb1c3'
  on-tertiary-fixed: '#3f0019'
  on-tertiary-fixed-variant: '#8f0041'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system is engineered for a high-fidelity music and festival portal that balances the raw energy of live performances with the rigorous clarity of premium journalism. The brand personality is "Electric Authority"—it is the loud, vibrant voice in the room that people trust for its depth and precision.

The aesthetic blends **Glassmorphism** and **High-Contrast/Bold** styles. It utilizes deep, immersive dark surfaces as a canvas for high-energy neon accents. The visual narrative is driven by large-scale, high-action photography, treated with subtle glass overlays to maintain legibility without sacrificing the "festival" atmosphere. The target audience includes music enthusiasts, industry professionals, and festival-goers who demand both aesthetic excitement and functional efficiency.

## Colors
The palette is rooted in a deep, nocturnal neutral to provide maximum contrast for the neon accents. 

- **Primary (Electric Lime):** Used for primary calls-to-action, active states, and critical highlights. It represents the "high-fidelity" aspect of the brand.
- **Secondary (Vivid Violet):** Used for categorization, interactive gradients, and secondary visual interest.
- **Tertiary (Shock Pink):** Used sparingly for urgent updates, live status indicators, and festival-specific branding.
- **Surface Strategy:** Backgrounds utilize the neutral base (`#0F0F12`), while overlays and cards use translucent variants to create depth and the signature glass effect.

## Typography
The typographic hierarchy is designed to command attention while ensuring long-form readability. 

**Bricolage Grotesque** serves as the display face, providing a modern, "wonky-yet-precise" Neo-Grotesque look that mirrors the eclectic nature of festivals. It should be used for headlines and major impact statements.

**Hanken Grotesk** is the workhorse for body text, offering high legibility and a contemporary feel that balances the boldness of the headlines. 

**JetBrains Mono** is introduced for metadata, labels, and technical festival details (dates, lineups, stages), adding a "backstage/technical" aesthetic that reinforces the high-fidelity theme.

## Layout & Spacing
The layout follows a **Fluid Grid** system based on an 8px base unit. 

- **Desktop:** 12-column grid with 24px gutters. Content is centered within a 1280px max-width container. Large sections of white (or dark) space are used to allow high-energy photography to "breathe."
- **Tablet:** 8-column grid with 20px gutters. 
- **Mobile:** 4-column grid with 16px gutters and 20px side margins.

Vertical rhythm is strictly maintained using multiples of 8px. Large-scale imagery should often break the grid (full-bleed) to create a sense of scale and immersion typical of festival environments.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and tonal layering rather than traditional shadows. 

1.  **Background:** The deepest layer is the neutral base (`#0F0F12`).
2.  **Middleground (Glass Layers):** UI containers like cards and navigation bars use a semi-transparent surface (e.g., `rgba(255, 255, 255, 0.05)`) with a `20px` to `40px` backdrop-blur. 
3.  **Foreground (Interactive):** Active elements use subtle glowing borders—1px solid strokes using the primary or secondary neon colors at 30% opacity.
4.  **Floating Elements:** Elements that sit high in the hierarchy (modals, tooltips) use a stronger backdrop blur and a thin, high-contrast stroke to separate from the background noise of photos.

## Shapes
The shape language is "Smooth-Modern." 

A `0.5rem` (8px) base radius is applied to standard components like input fields and small cards. Larger containers, such as featured news cards and hero image containers, use `1rem` (16px) or `1.5rem` (24px) to soften the aggressive neon colors and large typography. 

Interactive elements like "Live" badges or "Buy Tickets" buttons may use pill-shapes (rounded-full) to signify high interactability and distinguish them from informational containers.

## Components
- **Cards:** The core of the portal. Featuring full-height imagery with a glassmorphic footer containing the headline. On hover, the glass intensity increases and the neon border glows.
- **Buttons:**
    - *Primary:* Solid Electric Lime with black text.
    - *Secondary:* Ghost style with a 1px Violet border and blurred background.
- **Chips/Badges:** Used for genres and festival tags. Small, pill-shaped, with JetBrains Mono text. Live festivals use a Tertiary (Pink) pulsating dot indicator.
- **Lists:** News feeds use thin `1px` dividers in `rgba(255, 255, 255, 0.1)` with large, bold headlines and minimal metadata.
- **Input Fields:** Dark background, 1px subtle stroke, transitions to a Primary Lime stroke on focus.
- **Lineup Grid:** A specialized component using condensed typography and high-contrast color blocks to display artist names, mimicking traditional festival posters.
- **Audio Player:** A persistent glassmorphic bar at the bottom of the viewport with a neon progress track.