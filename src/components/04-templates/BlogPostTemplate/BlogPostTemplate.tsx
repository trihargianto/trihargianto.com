import React, { useEffect, useRef } from "react";
import { graphql, PageProps } from "gatsby";
import dayjs from "dayjs";

import SocialShareButtons from "../../02-molecules/SocialShareButtons";
import SEO from "../../02-molecules/SEO";
import Layout from "../Layout";
import { useDarkMode } from "../../../hooks/useDarkMode";

type BlogPostTemplateProps = {
  data: {
    markdownRemark: {
      html: string;
      fields: {
        slug: string;
        date: string;
        readingTime: {
          text: string;
        };
      };
      frontmatter: {
        title: string;
        description: string;
        image?: {
          childImageSharp?: {
            resize?: {
              src: string;
              height: string;
              width: string;
            };
          };
        };
      };
    };
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
        social: {
          twitter: string;
        };
      };
    };
  };
} & PageProps;

const BlogPostTemplate = ({ data, location }: BlogPostTemplateProps) => {
  const { theme } = useDarkMode();

  const htmlContent = data.markdownRemark.html;

  const image = data.markdownRemark.frontmatter.image?.childImageSharp?.resize;
  const title = data.markdownRemark.frontmatter.title;
  const slug = data.markdownRemark.fields.slug;
  const description = data.markdownRemark.frontmatter.description;
  const twitter = data.site.siteMetadata.social.twitter;
  const url = data.site.siteMetadata.siteUrl;
  const date = dayjs(data.markdownRemark.fields.date).format("DD MMM YYYY");
  const readingTimeText = data.markdownRemark.fields.readingTime.text;
  const pathname = location.pathname;

  const commentsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("repo", "trihargianto/comments");

    script.setAttribute(
      "theme",
      theme === "light" ? "github-light" : "github-dark",
    );

    script.setAttribute("crossorigin", "anonymous");

    setTimeout(() => {
      commentsContainer.current?.appendChild(script);
    }, 300);

    return () => {
      if (commentsContainer.current) {
        commentsContainer.current.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={image}
        pathname={pathname}
      />

      <div className="container mx-auto">
        <h1 className="mb-0">{title}</h1>

        <p className="mb-6 mt-1 text-sm text-gray-700 dark:text-gray-500 sm:text-base">
          {description}
        </p>

        <p className="mb-3 mt-1 text-sm text-gray-500">
          <span>🗓️ {date}</span>
          <span className="mx-2 text-base font-bold">·</span>
          <span>⏳ {readingTimeText}</span>
        </p>
      </div>

      <section
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="rendered-markdown container mx-auto"
      />

      <div className="container mx-auto">
        <hr className="my-8" />

        <SocialShareButtons
          socialConfig={{
            twitter,
            config: {
              url: `${url}${slug}`,
              title,
              description,
            },
          }}
        />

        <p className="mb-6 text-left text-2xl font-semibold md:text-center">
          Komentar
        </p>

        <div ref={commentsContainer}></div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
        date
        readingTime {
          text
        }
      }
      frontmatter {
        title
        description
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`;

export default BlogPostTemplate;
