# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Tri Hargianto's personal website (trihargianto.com), a digital garden featuring blog posts, projects, cheatsheets, and professional information. The site is built with Astro 5, React, and Tailwind CSS 4, deployed on Netlify.

## Development Commands

**Package manager:** pnpm (required version: 9.1.1+)

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (builds Astro site and copies `_redirects` to dist)
- **Preview:** `pnpm preview`

**Note:** The build process includes a custom step to copy `_redirects` to the dist folder for Netlify redirects.

## Content Architecture

### Content Collections

The site uses Astro's Content Collections with glob loaders defined in `src/content.config.ts`:

- **blog** - Blog posts (Markdown/MDX) located in `src/content/blog/`

  - Schema includes: title, slug, description, pubDate, updatedDate, tags, featured image
  - Posts can be in multiple languages (though i18n was removed from current version)

- **cheatsheets** - Cheatsheet documents in `src/content/cheatsheets/`

  - Schema includes: title, slug, description, category, featured image

- **project** - Project showcases in `src/content/project/`

  - Schema includes: title, description, category, demoLink, githubLink

- **singlePage** - Single page content in `src/content/single-page/`
  - Schema includes: title, description

### Dynamic OG Images

The site generates dynamic Open Graph images for blog posts using `astro-og-canvas`. Implementation is in `src/pages/open-graph/[...route].ts`. When adding new content types that need OG images, reference this pattern.

## Page Routing

Key pages in `src/pages/`:

- `/` - Homepage
- `/blog` - Blog listing
- `/blog/[...slug]` - Individual blog posts
- `/blog/topic/[topic]` - Blog posts filtered by topic
- `/cheatsheets` - Cheatsheet listing
- `/cheatsheets/[...slug]` - Individual cheatsheet posts
- `/about`, `/speaking`, `/publications`, `/pet-projects`, `/media-kit`, `/guest-book` - Various static pages

## Layouts

The site uses shared layouts in `src/layouts/`:

- `BaseLayout.astro` - Main layout wrapper
- `BlogPostLayout.astro` - Blog post template
- `BlogListLayout.astro` - Blog listing template
- `CheatsheetPostLayout.astro` - Cheatsheet post template
- `CheatsheetListLayout.astro` - Cheatsheet listing template

## Configuration

- **Site URL:** Defined in `astro.config.mjs` as `https://trihargianto.com`
- **Site constants:** Located in `src/constants/config.ts` (site title, description, social links, etc.)
- **Navigation:** Menu items in `src/constants/navbar-menu.ts`
- **Redirects:** Netlify redirects configured in `_redirects` file (handles old i18n routes, external links)

## Styling

- Uses Tailwind CSS 4 via Vite plugin
- Typography plugin enabled for blog content styling
- Supports dark mode (see `DarkModeSwitcher.astro`)
- Custom styles in `src/styles/`

## Code Highlighting

Uses `astro-expressive-code` with themes:

- Dark: `catppuccin-frappe`
- Light: `one-light`

## Monitoring & Performance

- **Error monitoring:** Sentry (conditionally enabled via env vars: SENTRY_DSN, SENTRY_AUTH_TOKEN)
- **Performance monitoring:** Unlighthouse at https://inspect.trihargianto.com
- **Deployment:** Netlify adapter configured

## React Components

Interactive components use React 19 with TypeScript:

- `TableOfContents.tsx` - Blog post table of contents
- `TocDrawerButton.tsx` - Mobile drawer for TOC
- Custom hooks in `src/hooks/` (e.g., `useScrollToTop.ts`)

## Code Formatting

Prettier configuration in `prettier.config.mjs`:

- 2 spaces, semicolons, double quotes
- Arrow parens always
- Trailing commas all
- Print width 80
- Astro plugin enabled

## TypeScript

- Uses strict Astro TypeScript config
- JSX runtime: React
- Strict null checks enabled

## Writing Guidelines

When creating or editing blog posts and content, maintain the author's established writing style (Upper-Intermediate to Advanced English).

### Voice & Tone

**Maintain conversational-professional balance:**

- Use friendly, approachable language while discussing technical topics
- Include personal anecdotes and real experiences to illustrate concepts
- Humble teaching approach - acknowledge limitations and different viewpoints
- Direct address to readers: "you," rhetorical questions, engaging hooks
- Avoid arrogance; focus on sharing knowledge, not showing off

**Examples of the author's voice:**

- "Let's be honest—remote team building can feel forced"
- "Back then, in the hometown where I lived..."
- "I hope my writing here is useful. Thank you for reading 👋"

### Structure Standards

**Every blog post should follow this pattern:**

1. **Introduction:**

   - Engaging hook (question, scenario, or personal story)
   - Context setting
   - Clear statement of what the post covers

2. **Body:**

   - Clear organization with `##` and `###` headings
   - Logical flow: Problem → Context → Solution → Implementation
   - Use numbered lists for steps, bulleted lists for options/features
   - Include practical examples, code snippets, screenshots where relevant
   - Break complex topics into digestible sections

3. **Conclusion:**
   - Summarize key takeaways
   - Provide actionable next steps
   - Consistent closing: "Thank you for reading 👋" or similar

### Content Quality Standards

**Every post must include:**

1. **Actionable takeaways** - Readers should leave with something they can implement
2. **Technical accuracy** - Verify technical details and terminology
3. **Practical examples** - Real-world scenarios, not just theory
4. **External resources** - Cite research, link to tools/documentation appropriately
5. **Visual aids** - Screenshots, code blocks, diagrams where helpful

**Balance technical depth with accessibility:**

- Explain jargon on first use or link to definitions
- Assume intelligent readers who may not know specific tools
- Use analogies and metaphors to clarify complex concepts

### Formatting Conventions

Maintain consistency:

- **Bold** - For emphasis, key concepts, important terms

  - Example: "**Bus Factor**", "**One thing to note**"

- _Italics_ - For titles of books, movies, publications

  - Example: _Steal Like an Artist_, _Her_ (2013)

- `Backticks` - For code, technical terms, commands, file names

  - Example: `defaults`, `git status`, `symlinks`

- **Emojis** - Use sparingly and purposefully
  - Appropriate: Section headers (🎨, 🧠, 💡), closings (👋)
  - Avoid: Excessive emoji that distracts from content

### Pre-Publishing Checklist

Before finalizing any blog post:

1. ✓ Read aloud to catch awkward phrasing
2. ✓ Run through grammar checker (Grammarly/LanguageTool)
3. ✓ Verify all article usage (a/an/the)
4. ✓ Check that sentences aren't too long
5. ✓ Ensure transitions between sections are smooth
6. ✓ Confirm all code examples are tested and accurate
7. ✓ Review that personal anecdotes enhance (not distract from) technical content
8. ✓ Verify closing includes "Thank you for reading 👋" or similar

### Blog Post Frontmatter Template

```yaml
---
title: Clear, Descriptive Title
slug: kebab-case-url-slug
description: Concise 1-2 sentence description for SEO and previews
pubDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD # optional
tags: ["tag1", "tag2", "tag3"] # optional
featured: cover.jpg # optional
featuredSource: "Photographer Name" # optional
featuredSourceUrl: "https://source-url.com" # optional
---
```

### Writing Philosophy

The author's strengths lie in:

- **Authentic storytelling** that hooks readers emotionally
- **Technical clarity** that makes complex topics accessible
- **Practical applicability** that provides immediate value
- **Balanced perspective** that acknowledges different viewpoints
- **Progressive improvement** over time
