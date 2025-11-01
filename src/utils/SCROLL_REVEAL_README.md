# Scroll Reveal Animation System

A comprehensive scroll-triggered animation system using the Intersection Observer API. This system provides smooth, performant animations that respect user preferences for reduced motion.

## Features

- ✅ **Intersection Observer API** - Modern, performant scroll detection (no scroll event listeners)
- ✅ **Three Animation Variants** - fadeInUp, fadeInLeft, fadeInRight
- ✅ **Stagger Support** - Animate child elements with 100ms delay between each
- ✅ **Accessibility** - Respects `prefers-reduced-motion` media query
- ✅ **Configurable** - 20% threshold, 600ms duration, ease-out cubic-bezier timing
- ✅ **Framework Agnostic** - Works with both Astro components and React components

## Quick Start

### For Astro Components (Vanilla JS)

Add the `data-animate` attribute to any element:

```astro
<div data-animate="fadeInUp">
  This will fade in from bottom
</div>

<!-- With custom delay -->
<div data-animate="fadeInUp" data-delay="200">
  This will fade in after 200ms
</div>

<!-- With stagger effect for children -->
<div data-stagger="true">
  <div data-animate="fadeInUp">Item 1</div>
  <div data-animate="fadeInUp">Item 2</div>
  <div data-animate="fadeInUp">Item 3</div>
</div>
```

Then initialize the scroll reveal in your component:

```astro
<script>
  import { initScrollReveal } from "../utils/scrollReveal";

  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
  });

  // For Astro view transitions
  document.addEventListener("astro:page-load", () => {
    initScrollReveal();
  });
</script>
```

### For React Components

Use the `ScrollReveal` component wrapper:

```tsx
import { ScrollReveal } from "../components/ScrollReveal";

function MyComponent() {
  return (
    <ScrollReveal variant="fadeInUp" delay={100}>
      <h1>This will animate</h1>
    </ScrollReveal>
  );
}
```

Or use the `useScrollReveal` hook directly:

```tsx
import { useScrollReveal } from "../hooks/useScrollReveal";
import { getAnimationStyles } from "../utils/animationVariants";

function MyComponent() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div ref={ref} style={getAnimationStyles("fadeInUp", isVisible)}>
      Content
    </div>
  );
}
```

## Animation Variants

### fadeInUp
Fades in while moving up from 30px below

```html
<div data-animate="fadeInUp">Content</div>
```

### fadeInLeft
Fades in while moving from 30px left

```html
<div data-animate="fadeInLeft">Content</div>
```

### fadeInRight
Fades in while moving from 30px right

```html
<div data-animate="fadeInRight">Content</div>
```

## Configuration

### Global Settings

Modify the configuration in `initScrollReveal()`:

```typescript
initScrollReveal({
  threshold: 0.2,        // 20% of element visible before trigger
  rootMargin: "0px",     // Margin around viewport
  staggerDelay: 100,     // Delay between staggered children (ms)
});
```

### Per-Element Settings

Use data attributes for element-specific configuration:

```html
<!-- Custom delay -->
<div data-animate="fadeInUp" data-delay="300">Content</div>

<!-- Enable stagger for children -->
<div data-stagger="true">
  <div data-animate="fadeInUp">Child 1</div>
  <div data-animate="fadeInUp">Child 2</div>
</div>
```

## CSS Customization

The animation styles are defined in `src/styles/global.css`:

```css
[data-animate] {
  opacity: 0;
  transition:
    opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

[data-animate="fadeInUp"] {
  transform: translateY(30px);
}

[data-animate].animate-visible {
  opacity: 1;
  transform: translate(0, 0);
}
```

To customize:
- **Duration**: Change `600ms` to your preferred duration
- **Timing**: Modify the `cubic-bezier()` values
- **Distance**: Adjust `translateY(30px)` or `translateX(30px)`

## Accessibility

The system automatically respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

Users who prefer reduced motion will see content immediately without animations.

## Applied Components

The scroll reveal system is currently applied to:

- ✅ **GreetingCard** - Hero section with staggered text and image
- ✅ **LatestArticle** - Article lists with staggered items
- ✅ **ProjectCard** - Project cards on pet-projects page
- ✅ **ProjectCardInteractive** - Interactive project cards
- ✅ **Endorsements** - Testimonial cards with stagger effect
- ✅ **EndorseCard** - Individual testimonial cards

## API Reference

### `initScrollReveal(config?)`

Initialize scroll reveal for all elements with `data-animate` attribute.

**Parameters:**
- `config.threshold` (number, default: 0.2) - Intersection threshold (0-1)
- `config.rootMargin` (string, default: "0px") - Root margin for observer
- `config.staggerDelay` (number, default: 100) - Delay between staggered children in ms

### `useScrollReveal<T>(options?)`

React hook for scroll-triggered animations.

**Parameters:**
- `options.threshold` (number, default: 0.2) - Intersection threshold
- `options.rootMargin` (string, default: "0px") - Root margin
- `options.triggerOnce` (boolean, default: true) - Trigger animation only once

**Returns:** `[ref, isVisible]`

### `getAnimationStyles(variant, isVisible, delay?)`

Get inline styles for animation.

**Parameters:**
- `variant` - Animation variant ("fadeInUp" | "fadeInLeft" | "fadeInRight")
- `isVisible` - Whether element is visible
- `delay` - Optional delay in milliseconds

**Returns:** React.CSSProperties

## Performance Considerations

- Uses Intersection Observer API (better than scroll events)
- Animations trigger once by default (can be configured)
- `will-change` is not used to avoid performance issues
- Respects `prefers-reduced-motion` for accessibility

## Browser Support

- Modern browsers with Intersection Observer API support
- Fallback: Content shows immediately if API not available
- Polyfill not required for modern browsers (95%+ support)

## Examples

### Staggered List Animation

```astro
<div data-stagger="true">
  {items.map((item) => (
    <div data-animate="fadeInUp">
      {item.title}
    </div>
  ))}
</div>
```

### Hero Section with Multiple Elements

```astro
<div>
  <img data-animate="fadeInLeft" src="profile.jpg" />
  <h1 data-animate="fadeInUp" data-delay="100">Title</h1>
  <p data-animate="fadeInUp" data-delay="200">Description</p>
  <div data-animate="fadeInUp" data-delay="300">
    <button>CTA</button>
  </div>
</div>
```

### React Component with Stagger

```tsx
<ScrollReveal variant="fadeInUp" stagger staggerDelay={100}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</ScrollReveal>
```

## Troubleshooting

### Animations not triggering

1. Ensure `initScrollReveal()` is called after DOM is loaded
2. Check that elements have `data-animate` attribute
3. Verify threshold settings (element might not be visible enough)

### Animations too fast/slow

Adjust duration in `global.css`:

```css
[data-animate] {
  transition: opacity 800ms ..., transform 800ms ...;
}
```

### Stagger not working

Ensure parent has `data-stagger="true"` and children have `data-animate` attributes.

## Future Enhancements

Potential improvements for future versions:

- [ ] Additional animation variants (fadeInScale, slideInRotate, etc.)
- [ ] Animation replay on scroll up
- [ ] Custom easing functions per element
- [ ] Animation sequences (multiple animations on same element)
- [ ] Integration with Astro view transitions
