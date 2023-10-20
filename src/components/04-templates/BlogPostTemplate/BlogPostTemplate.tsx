import React, { useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import styledComponent from "styled-components"

import ArticleCredit from "../../02-molecules/ArticleCredit"
import NavBar from "../../03-organisms/NavBar"
import Footer from "../../03-organisms/Footer"
import * as styled from "./styled"

/**
 * TODO: LEGACY
 */
import SEO from "../../seo"
import Share from "../../share"
import ScrollToTop from "../../button-scroll-top"

const CommentTitle = styledComponent.div`
  font-size: var(--fontSize-3);
  font-weight: bold;
  margin-bottom: var(--spacing-4);
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const commentsContainer = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("repo", "trihargianto/comments")
    script.setAttribute("theme", "github-light")
    script.setAttribute("crossorigin", "anonymous")

    commentsContainer.current?.appendChild(script);
  }, [])

  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null
  const twitter = data.site.siteMetadata.social.twitter
  const url = data.site.siteMetadata.siteUrl
  const { previous, next } = pageContext

  return (
    <>
      <NavBar location={location} />

      <styled.Wrapper>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={image}
          pathname={location.pathname}
        />

        <ScrollToTop />

        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>{post.fields.date}</p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            className="rendered-markdown"
          />
          <hr />
          <Share
            socialConfig={{
              twitter,
              config: {
                url: `${url}${post.fields.slug}`,
                title: post.frontmatter.title,
                description: post.frontmatter.description || post.excerpt,
              },
            }}
          />
          <footer>
            <ArticleCredit />
          </footer>
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div>
          <CommentTitle>Komentar</CommentTitle>
          <div ref={commentsContainer}></div>
        </div>

        <Footer />
      </styled.Wrapper>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        date(formatString: "DD MMM YYYY")
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
  }
`

export default BlogPostTemplate
