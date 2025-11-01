# Parallax Background Component

## Overview

The `ParallaxBackground` component creates subtle floating geometric shapes in the background that move at different speeds based on scroll position, creating a parallax depth effect.

## Features

✅ **5 Geometric Shapes**: Circle, triangle, square, hexagon variations
✅ **Variable Parallax Speed**: Each shape moves at 0.2x to 0.8x scroll speed
✅ **Blur Effect**: 2px blur for depth perception
✅ **GPU Acceleration**: Uses `transform: translate3d()` for better performance
✅ **Fade-out Effect**: Shapes fade as they exit viewport
✅ **SVG-based**: Lightweight and scalable
✅ **Mobile Disabled**: Automatically disabled on mobile devices to save battery
✅ **Reduced Motion Support**: Respects `prefers-reduced-motion` accessibility preference
✅ **RequestAnimationFrame**: Optimized scroll handling with RAF

## Implementation Details

### Shape Configuration

Each shape has the following properties:

```typescript
interface Shape {
  id: number;
  type: "circle" | "triangle" | "square" | "hexagon";
  x: number; // percentage position (0-100)
  y: number; // percentage position (0-100)
  size: number; // size in pixels
  speed: number; // parallax speed multiplier (0.2 to 0.8)
  rotation: number; // rotation angle in degrees
  opacity: number; // base opacity (0.1 to 0.15)
  color: string; // CSS custom property
}
```

### Color Theme Support

Colors are defined as CSS custom properties in `src/styles/global.css`:

**Light Theme:**
- `--parallax-shape-1`: Sky blue (rgba 0.4 opacity)
- `--parallax-shape-2`: Indigo (rgba 0.4 opacity)
- `--parallax-shape-3`: Purple (rgba 0.4 opacity)
- `--parallax-shape-4`: Pink (rgba 0.4 opacity)
- `--parallax-shape-5`: Blue (rgba 0.4 opacity)

**Dark Theme:**
- Same colors with 0.25 opacity for subtlety

### Performance Optimizations

1. **RequestAnimationFrame**: Scroll events trigger RAF for smooth 60fps updates
2. **GPU Acceleration**: `translate3d()` and `will-change: transform`
3. **Passive Event Listeners**: Scroll listener marked as passive
4. **Conditional Rendering**: Component doesn't render on mobile or with reduced motion
5. **Efficient DOM Updates**: Direct style manipulation instead of React state updates

### Accessibility

- **Reduced Motion**: Component respects `prefers-reduced-motion: reduce`
- **ARIA Hidden**: Background is marked `aria-hidden="true"`
- **Pointer Events**: Set to `none` so shapes don't interfere with interactions

### Mobile Detection

The component detects mobile devices using:
1. User agent string matching
2. Window width < 768px

### Fade-out Logic

Shapes fade out smoothly when:
- Exiting the top of the viewport
- Below the bottom of the viewport
- Opacity transitions smoothly based on visibility percentage

## Integration

The component is integrated in `BaseLayout.astro`:

```astro
<ParallaxBackground client:load />
```

It's positioned with `fixed` positioning and `z-index: 0`, ensuring it stays behind all content.

## Customization

To modify the shapes, edit the `generatedShapes` array in `ParallaxBackground.tsx`:

```typescript
const generatedShapes: Shape[] = [
  {
    id: 1,
    type: "circle",
    x: 15,      // Adjust horizontal position
    y: 20,      // Adjust vertical position
    size: 120,  // Adjust size
    speed: 0.3, // Adjust parallax speed
    rotation: 0,
    opacity: 0.15,
    color: "var(--parallax-shape-1)",
  },
  // Add more shapes...
];
```

## Browser Support

- Modern browsers with CSS `filter: blur()` support
- Requires JavaScript enabled
- Gracefully degrades on older browsers

## Performance Impact

- **Desktop**: Minimal impact (~1-2ms per frame)
- **Mobile**: Disabled by default (0ms impact)
- **Reduced Motion**: Disabled (0ms impact)

## Future Enhancements

Potential improvements:
- [ ] Add more shape variations
- [ ] Randomize positions on each page load
- [ ] Add subtle rotation animation
- [ ] Intersection Observer for better performance
- [ ] WebGL version for more complex effects
