import "dotenv/config";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Tri Hargianto",
    author: {
      name: "Tri Hargianto",
      summary:
        "A Software Engineer who loves to learn new things and share knowledge",
    },
    description:
      "This site is my digital garden where I put my projects, tutorials, thoughts, and anything else I want to show to the world. ",
    siteUrl: "https://www.trihargianto.com/",
    social: {
      twitter: "trihargianto",
      github: "trihargianto",
    },
  },

  // https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,

  plugins: [
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-postcss/
    "gatsby-plugin-postcss",

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-0YX3YD7TKV"],
      },
    },

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-image/
    "gatsby-plugin-image",

    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1024,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          {
            resolve: "gatsby-remark-table-of-contents",
            options: {
              exclude: "Table of Contents",
              className: "table-of-contents",
            },
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              className: "heading-markdown",
            },
          },

          // https://github.com/otanu/gatsby-remark-prismjs-title
          "gatsby-remark-prismjs-title",

          // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs-copy-button/
          "gatsby-remark-prismjs-copy-button",

          // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: false,
              prompt: {
                global: true,
              },
            },
          },

          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",

          // https://www.gatsbyjs.com/plugins/gatsby-remark-reading-time/
          "gatsby-remark-reading-time",
        ],
      },
    },

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/
    "gatsby-plugin-sass",

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/img/icon.png",
      },
    },

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/
    "gatsby-plugin-mdx",

    // https://www.npmjs.com/package/gatsby-plugin-image
    "gatsby-plugin-image",

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/
    "gatsby-plugin-sharp",

    // https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/
    "gatsby-transformer-sharp",

    // https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/img/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./content/assets",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/",
      },
      __key: "content",
    },

    // https://github.com/codeAdrian/gatsby-omni-font-loader
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Plus Jakarta Sans`,
            file: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-nprogress/
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#2463EB",
        showSpinner: true,
      },
    },

    // https://docs.sentry.io/platforms/javascript/guides/gatsby/
    {
      resolve: "@sentry/gatsby",
    },
  ],
};

export default config;
