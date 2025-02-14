// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  /**
   * Handle redirection for old pages from old site (GatsbyJS ver).
   * The old site support i18n, but the new site doesn't.
   * I decided to remove i18n support on the new site because it's too much work to maintain.
   * Thus, we need to redirect old i18n pages to the new ones.
   */
  redirects: {
    "/en/[...slug]": {
      status: 301,
      destination: "/blog/[...slug]",
    },
    "/id/[...slug]": {
      status: 301,
      destination: "/blog/[...slug]",
    },
  },
});
