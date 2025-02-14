# tri-hargianto-official-website

## 3.0.0

### Major Changes

- 1b4fdaf: Migrate the underlying from [GatsbyJS](https://www.gatsbyjs.com/) to [Astro](https://astro.build/).

  GatsbyJS has been abandoned and therefore can be considered dead. Fortunately, migrating the site to Astro is quite easy, most of the steps are just coming from [Astro official documentation](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/). Thanks to Astro team 👏

  Some of the features are intended to be removed to fasten the development process. Those features might be revived in the future.

  **Removed features**

  - Reading time on blog detail page
  - i18n support
  - LinkedIn and Github links on footer
  - Sentry error monitoring

## 1.0.0

### Major Changes

- 0eedb88: Migrate from GatsbyJS to Astro.

  GatsbyJS has been abandoned and therefore can be considered dead. Fortunately, migrating the site to Astro is quite easy, most of the steps are just coming from [Astro official documentation](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/). Thanks to Astro team 👏

  Some of the features are intended to be removed to fasten the development process. Those features might be revived in the future.

  **Removed features**

  - Reading time on blog detail page
  - i18n support
  - LinkedIn and Github links on footer

## 2.10.0

### Minor Changes

- 816e341: Add view-transitions-api support!
- 0819498: update font from "Inter" to "Plus Jakarta Sans"
- 52bcde7: update line-height to 2rem on detail article
- 2b5dab5: Remove date from articles and publications so only month and year left
- b2c0ba5: Update profile picture on homepage greeting
- f0926ac: update greeting message to use typing effect on homepage
- 080560d: Update favicon and brand logo appearance

### Patch Changes

- bd5d2fa: Fix layout shift on greeting's image
- 1ca8563: Fix comment's title typo

## 2.9.0

### Minor Changes

- 1e787fd: remove motion on page to improve load time
- aeb67f0: update Netlify Status badge link

## 2.8.0

### Minor Changes

- 8805e4b: Add page transition using framer-motion
- f07742c: Revamp navbar so it'll be mobile friendly 📱
- 0e95c62: Add Scroll to Top button on detail article page
- e85bd5f: Add copy cody button on articles that contains code snippet
- 4309370: Add multilanguage support for articles
- 05225eb: Update About Me page
- 6f92a0c: Hide navbar when scrolling down and show again when scrolling up
- 5609c7d: Add active page indicator on navbar items
- 0e95c62: add scroll to top button for article

### Patch Changes

- 259c295: Fix Comment Box doubled on post page
- c01c31b: Fix navbar dissappear on scrolled to top on Safari
- 8fec5a0: fix year grouping on blog page

## 2.7.0

### Minor Changes

- 9ac67bd: Change /projects path to /pet-projects

### Patch Changes

- af66516: Fix floating weird footer on About page
- eb5314f: Fix scrolling code snippet issue
- 3c2df56: Fix showed date is not correct for posts
- 3fbff35: Fix unhandled runtime error on article page

## 2.6.0

### Minor Changes

- 6081302: Make footer stick to the bottom
- c9275b4: Add progress indicator when opening pages
- 5c06936: Add code title to the code snippet
- 5c0477e: Add Reading Time to article detail page
- 260e3aa: Detecting Dark Mode based on System Settings

## 2.5.0

### Minor Changes

- 4ba98e7: Make section title use english on homepage
- 24a7ff7: Group articles by year on article page
- 626cbbb: Add Endorsements section in About page
- ead82b1: Redesign Publication list
- 4c11152: Make endorsments component support dark mode

## 2.4.0

### Minor Changes

- 5f90a1a: Add Pokedex to the project page

## 2.3.0

### Minor Changes

- 7873b21: Avoid reloading when click "Lihat Semua" button
- a23a1a0: Add transition when switching theme
- d1c7e68: Add SEO title tag for all pages
- d133848: Sync comment feature theme with the dark mode theme switcher

### Patch Changes

- cfa5ec6: Fix border bottom on publication page is not match with dark mode theme

## 2.2.0

### Minor Changes

- 38ee318: Improve code snippets readibility
- cc6d4b4: Add dark mode feature

## 2.1.0

### Minor Changes

- a84f0c9: Show logo on navbar when the user using mobile device
- bcf0034: Add syntax highlighting with Material Dark theme
- 7e90b8e: Add Inter font
- d35c6c7: Add changesets library to manage CHANGELOG
- 33cfb84: Add LinkedIn & Github icon link to the Footer component
- db53c55: Add project's github link to Project Card
- c6b6b19: Use different template for `/about` page
