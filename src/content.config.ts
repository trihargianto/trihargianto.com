import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      featured: image(),
      featuredSource: z.string().optional(),
      featuredSourceUrl: z.string().optional(),
    }),
});

const project = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/project", pattern: "**/*.{md,mdx}" }),

  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      demoLink: z.string(),
      githubLink: z.string(),
    }),
});

const singlePage = defineCollection({
  loader: glob({ base: "./src/content/single-page", pattern: "**/*.{md,mdx}" }),

  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
    }),
});

export const collections = { blog, project, singlePage };
