import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import HomeTemplate from "../components/04-templates/HomeTemplate"

const MainPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <>
      <SEO title="Home" />
      <HomeTemplate location={location} posts={posts} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      nodes {
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

export default MainPage
