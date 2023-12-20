import React, { useRef, useEffect } from "react";
import { graphql, PageProps } from "gatsby";

import SocialShareButtons from "../../02-molecules/SocialShareButtons";
import SEO from "../../02-molecules/SEO";
import NavigationBar from "../../03-organisms/NavigationBar";
import Footer from "../../03-organisms/Footer";

type BlogPostTemplateProps = {
  data: {
    markdownRemark: {
      html: string;
      fields: {
        slug: string;
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
  const htmlContent = data.markdownRemark.html;

  const image = data.markdownRemark.frontmatter.image?.childImageSharp?.resize;
  const title = data.markdownRemark.frontmatter.title;
  const slug = data.markdownRemark.fields.slug;
  const description = data.markdownRemark.frontmatter.description;
  const twitter = data.site.siteMetadata.social.twitter;
  const url = data.site.siteMetadata.siteUrl;
  const pathname = location.pathname;

  const commentsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("repo", "trihargianto/comments");
    script.setAttribute("theme", "github-light");
    script.setAttribute("crossorigin", "anonymous");

    commentsContainer.current?.appendChild(script);
  }, []);

  return (
    <>
      <SEO
        title={title}
        description={description}
        image={image}
        pathname={pathname}
      />

      <NavigationBar />

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

      <Footer />
    </>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
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
