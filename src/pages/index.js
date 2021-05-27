import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gretting from "../components/gretting"

const SectionTitle = styled.h3`
  font-size: 28px;
  margin: 10px 0px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
`

const BlogPosts = ({ posts }) => {
  if (posts.length === 0) {
    return <p>No blog posts found.</p>
  }

  return posts.map(post => {
    const title = post.frontmatter.title || post.fields.slug
    return (
      <article
        key={post.fields.slug}
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{post.fields.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </article>
    )
  })
}

const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Gretting />

      <SectionTitle>Artikel</SectionTitle>
      <BlogPosts posts={posts} />
    </Layout>
  )
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
          date(formatString: "DD MMMM YYYY")
        }
        frontmatter {
          title
          description
          category
        }
      }
    }
  }
`
