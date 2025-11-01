# trihargianto.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a432faa-99a0-46f8-b8bd-f0159900ba0c/deploy-status)](https://app.netlify.com/sites/trihargianto/deploys)

Tri Hargianto personal website - Frontend Tech Lead specializing in performance optimization, developer experience, and team leadership.

## Tech Stacks

- Framework: [Astro 5](https://astro.build/) + [React 19](https://react.dev/)
- Styling: [Tailwind CSS 4](https://tailwindcss.com/)
- Hosted by: [Netlify](https://www.netlify.com/)
- Error monitoring: [Sentry](https://sentry.io/)
- Field Data Performance Monitor: [Sentry](https://sentry.io/)
- Lab Data Performance Monitor: [Unlighthouse](https://inspect.trihargianto.com)

## Recent Updates (Site Revamp)

### Brand Identity
- Updated site description to reflect Frontend Tech Lead positioning
- New hero section emphasizing performance wins and scalable systems
- Reordered navigation: Home → Blog → Performance Wins → Speaking → About → Cheatsheets

### New Pages
- **[/performance-wins](/performance-wins)** - Real optimization metrics from production systems
- **[/colophon](/colophon)** - Technical stack and architectural decisions

### Content Features
- **Blog categories** - Posts can be tagged with: Frontend Engineering, Performance, Developer Experience, Leadership, Slow Productivity, Web Fundamentals
- **Related posts** - Jaccard similarity algorithm based on tag overlap, displayed at end of each post
- **Category badges** - Visual category indicators on blog posts

### Visual System
- Accent color: `#0ea5e9` (sky-500)
- Updated type scale following plan specifications
- Reduced motion support for accessibility
- Subtle, purposeful animations (150ms ease-out)

### SEO & Analytics
- Improved meta tags with proper OG image dimensions
- Title format: `{Page Title} · Tri Hargianto`
- Flexible analytics system supporting Google Analytics, Plausible, and Umami
- Enhanced Twitter Card metadata

### Performance
- Target metrics (Lighthouse Mobile):
  - LCP < 1.8s
  - CLS < 0.1
  - INP < 200ms
- Images use `loading="lazy"` and `decoding="async"` where appropriate
- Above-the-fold images use `loading="eager"`
- Dark mode persists via localStorage (already implemented)

## Analytics Configuration

The site supports multiple analytics providers. Configure via environment variables:

### Google Analytics (Default)
```env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Plausible Analytics
```env
PLAUSIBLE_DOMAIN=trihargianto.com
```

### Umami Analytics
```env
UMAMI_WEBSITE_ID=your-website-id
UMAMI_SRC=https://analytics.umami.is/script.js  # Optional, defaults to Umami cloud
```

Analytics scripts only load in production (`import.meta.env.PROD`).

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Performance Best Practices

### Images
- Use `loading="eager"` for above-the-fold images (hero, profile pictures)
- Use `loading="lazy"` for below-the-fold images
- Always include `decoding="async"` for better parallelization
- Prefer modern formats (AVIF → WebP → PNG/JPG) with `<picture>` element
- Include explicit `width` and `height` to prevent CLS

### Scripts
- Defer non-critical scripts with `defer` or `async`
- Analytics scripts are automatically deferred
- Use `is:inline` sparingly (inline only critical scripts)

### CSS
- Tailwind 4's JIT compiler keeps CSS minimal
- Avoid render-blocking stylesheets
- Use `@apply` for repeated patterns to reduce bundle size
