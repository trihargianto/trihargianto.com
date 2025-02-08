import React, { useEffect, useRef } from "react";
import { graphql, Link, PageProps } from "gatsby";
import dayjs from "dayjs";
import { kebabCase } from "lodash-es";

import { useDarkMode } from "../../../hooks/useDarkMode";

import SocialShareButtons from "../../02-molecules/SocialShareButtons";
import SEO from "../../02-molecules/SEO";
import ButtonScrollTop from "../../02-molecules/ButtonScrollTop";
import Layout from "../Layout";

type BlogPostTemplateProps = {
  data: {
    article: {
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
    alternativeLangSlug: {
      fields: {
        slug: string;
      };
      frontmatter: {
        lang: string;
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

  const changingThemeAttemps = useRef(0);

  const htmlContent = data.article.html;

  const image = data.article.frontmatter.image?.childImageSharp?.resize;
  const title = data.article.frontmatter.title;
  const slug = data.article.fields.slug;
  const description = data.article.frontmatter.description;
  const twitter = data.site.siteMetadata.social.twitter;
  const url = data.site.siteMetadata.siteUrl;
  const date = dayjs(data.article.fields.date).format("MMM YYYY");
  const readingTimeText = data.article.fields.readingTime.text;

  const alternativeLangSlug = data.alternativeLangSlug?.fields?.slug;
  const alternativeLang = data.alternativeLangSlug?.frontmatter?.lang;

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

    commentsContainer.current?.appendChild(script);
  }, []);

  useEffect(() => {
    function changeCommentTheme(theme: any) {
      const iframe =
        document.querySelector<HTMLIFrameElement>(".utterances-frame");

      if (!iframe && changingThemeAttemps.current < 3) {
        setTimeout(() => {
          changeCommentTheme(theme);

          changingThemeAttemps.current++;
        }, 500);

        return;
      }

      const message = {
        type: "set-theme",
        theme: theme === "light" ? "github-light" : "github-dark",
      };

      if (!iframe) {
        return;
      }

      iframe.contentWindow?.postMessage(message, "https://utteranc.es");
    }

    changeCommentTheme(theme);
  }, [theme]);

  return (
    <>
      <ButtonScrollTop />

      <Layout>
        <SEO
          title={`${title} | Tri Hargianto`}
          description={description}
          image={image}
          pathname={pathname}
        />

        <div className="container mx-auto mt-5">
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-500">
            <span>🗓️ {date}</span>
            <span className="mx-2 text-base font-bold">·</span>
            <span>🕑 {readingTimeText}</span>
          </p>

          <h1 className="mb-0" style={{ viewTransitionName: kebabCase(title) }}>
            {title}
          </h1>

          <p className="mb-4 mt-2 text-sm text-gray-700 dark:text-gray-500 sm:text-base">
            {description}
          </p>

          {!!alternativeLangSlug && (
            <div className="mb-3 block w-full">
              <span>
                {alternativeLang === "id" ? (
                  <>
                    🇮🇩
                    <Link
                      to={alternativeLangSlug}
                      className="ml-2 underline hover:no-underline"
                    >
                      Baca versi Indonesia
                    </Link>
                  </>
                ) : (
                  <>
                    🇺🇸
                    <Link
                      to={alternativeLangSlug}
                      className="ml-2 underline hover:no-underline"
                    >
                      Read in English
                    </Link>
                  </>
                )}
              </span>
            </div>
          )}
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
            Comments
          </p>

          <div ref={commentsContainer}></div>
        </div>
      </Layout>
    </>
  );
};

export const query = graphql`
  query ($slug: String!, $articleGroup: String!, $alternativeLang: String!) {
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    alternativeLangSlug: markdownRemark(
      fields: { articleGroup: { eq: $articleGroup } }
      frontmatter: { lang: { eq: $alternativeLang } }
    ) {
      fields {
        slug
      }
      frontmatter {
        lang
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
