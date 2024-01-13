import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  // Get all markdown blog posts sorted by date
  const blogs = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
        filter: { frontmatter: { category: { eq: "blog" } } }
      ) {
        nodes {
          fields {
            slug
            articleGroup
          }
          frontmatter {
            title
            lang
          }
        }
      }
    }
  `);

  // Get all markdown blog pages
  const pages = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { category: { eq: "page" } } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  if (blogs.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogs.errors,
    );
    return;
  } else if (pages.errors) {
    reporter.panicOnBuild(
      `There was an error loading your page posts`,
      blogs.errors,
    );
    return;
  } 
  
  const blogPosts = blogs.data.allMarkdownRemark.nodes;
  const pagePosts = pages.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (blogPosts.length > 0) {
    blogPosts.forEach((post, index) => {
      const previous =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1];
      const next = index === 0 ? null : blogPosts[index - 1];

      createPage({
        path: post.fields.slug,
        component: path.resolve(
          `./src/components/04-templates/BlogPostTemplate/BlogPostTemplate.tsx`,
        ),
        context: {
          slug: post.fields.slug,
          previous,
          next,

          articleGroup: post.fields.articleGroup,

          // This field assume this site only supports `id` and `en` language
          alternativeLang: post.frontmatter.lang === "en" ? "id" : "en",
        },
      });

      // Create fallback redirection for old blog URLs
      if (post.frontmatter.lang === "id") {
        createRedirect({
          fromPath: `/${post.fields.articleGroup}`,
          toPath: post.fields.slug,
        });
      }
    });
  }

  if (pagePosts.length > 0) {
    pagePosts.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: path.resolve(
          `./src/components/04-templates/PageTemplate/PageTemplate.tsx`,
        ),
        context: {
          slug: post.fields.slug,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });

    const BLOG_POST_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)$/;
    const PAGE_REGEX = /(page\/)(.+)$/;

    const blogMatch = BLOG_POST_REGEX.exec(slug);
    const pageMatch = PAGE_REGEX.exec(slug);

    if (blogMatch !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, year, month, day, filename] = blogMatch;

      const { lang, slug } = node.frontmatter;
      const [contentDirectoryName] = filename.split("/");
      const date = new Date(Number(year), Number(month) - 1, Number(day));

      createNodeField({
        name: `slug`,
        node,
        value: `/${lang}/${slug}`,
      });

      createNodeField({
        name: `date`,
        node,
        value: date,
      });

      createNodeField({
        name: "articleGroup",
        node,
        value: contentDirectoryName,
      });
    } else if (pageMatch) {
      const filename = pageMatch[2];

      createNodeField({
        name: `slug`,
        node,
        value: `/${filename}`,
      });
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: slug,
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
