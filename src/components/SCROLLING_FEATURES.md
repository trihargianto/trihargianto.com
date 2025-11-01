# Smooth Scrolling Navigation Features

This document describes the smooth scrolling and navigation features implemented in the project.

## Features

### 1. Reading Progress Bar
**Component:** `ReadingProgress.tsx`

A 4px progress bar at the top of the page that fills based on scroll depth (0-100%).

**Features:**
- Uses brand color (sky-500) with gradient effect
- Smooth transitions with subtle glow effect
- Automatically calculates progress based on scrollable height
- Updates on scroll and window resize
- Accessible with ARIA attributes

**Usage:**
Already integrated in `BaseLayout.astro`. No additional setup required.

### 2. Back to Top Button
**Component:** `BackToTop.tsx`

A circular button that appears after scrolling 50vh (50% of viewport height).

**Features:**
- Smooth fade-in/fade-out transitions
- Positioned at bottom-right corner
- Brand-colored with hover effects
- Smooth scroll to top animation
- Accessible with proper ARIA labels

**Usage:**
Already integrated in `BaseLayout.astro`. No additional setup required.

### 3. Active Section Detection
**Hook:** `useActiveSection.ts`

A React hook that detects which section is currently active based on scroll position.

**Usage:**
```tsx
import { useActiveSection } from "../hooks/useActiveSection";

const sectionIds = ["intro", "features", "conclusion"];
const activeSection = useActiveSection(sectionIds, 100); // 100px offset

// Use activeSection to highlight navigation links
```

**Parameters:**
- `sectionIds`: Array of section IDs to track
- `offset`: Offset from top in pixels (default: 100)

### 4. Enhanced Table of Contents
**Component:** `TableOfContents.tsx`

The Table of Contents component now includes active section highlighting.

**Features:**
- Automatically highlights the current section
- Smooth color transitions
- Active links use brand color (sky-500)
- Visual feedback with font weight and scale

### 5. Smooth Scroll Behavior
**Global CSS:** `global.css`

Smooth scrolling is enabled globally with proper scroll padding for fixed navigation.

**Features:**
- `scroll-behavior: smooth` for all anchor links
- `scroll-padding-top: 80px` to offset fixed navbar
- Works seamlessly with Astro's view transitions

## Astro Integration

All components use Astro's `client:load` directive for hydration:

```astro
<ReadingProgress client:load />
<BackToTop client:load />
```

This ensures components are interactive on page load and work with Astro's routing system.

## Accessibility

All features respect user preferences:
- Smooth scrolling disabled for users with `prefers-reduced-motion`
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Focus management

## Browser Support

Features use modern web APIs:
- Intersection Observer API (active section detection)
- CSS `scroll-behavior` (smooth scrolling)
- CSS custom properties (brand colors)
- ES6+ JavaScript

All features gracefully degrade in older browsers.

## Performance

Components are optimized for performance:
- Efficient scroll event listeners with proper cleanup
- `will-change` CSS hints for smooth animations
- Minimal DOM queries
- Debounced calculations where appropriate

## Customization

### Colors
Brand colors are defined in `global.css`:
```css
:root {
  --color-accent: #0ea5e9; /* sky-500 */
}
```

### Thresholds
Adjust visibility thresholds in components:
- Back to Top: 50vh (change in `BackToTop.tsx`)
- Active Section: 100px offset (change in `useActiveSection` hook)

### Animations
All transitions use consistent durations:
- Progress bar: 150ms
- Back to Top: 300ms
- Active links: 200ms
