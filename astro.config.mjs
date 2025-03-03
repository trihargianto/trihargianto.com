// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import expressiveCode from "astro-expressive-code";
import sentry from "@sentry/astro";

const { SENTRY_DSN, SENTRY_AUTH_TOKEN } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

const sentryDsn = SENTRY_DSN;
const sentryAuthToken = SENTRY_AUTH_TOKEN;

const integrations = [
  expressiveCode({
    themes: ["catppuccin-frappe", "one-light"],
  }),
  mdx(),
  sitemap(),
  react(),
];

if (sentryDsn && sentryAuthToken) {
  integrations.push(
    sentry({
      dsn: sentryDsn,
      sourceMapsUploadOptions: {
        project: "trihargiantocom",
        authToken: sentryAuthToken,
      },
    }),
  );
}

// https://astro.build/config
export default defineConfig({
  site: "https://trihargianto.com",
  integrations,

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});

