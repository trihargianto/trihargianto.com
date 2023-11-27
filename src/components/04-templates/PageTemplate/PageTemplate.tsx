import React from "react";
import { graphql } from "gatsby";

import NavBar from "../../03-organisms/NavBar";
import Footer from "../../03-organisms/Footer";
import SEO from "../../seo";
import * as styled from "./styled";

const PageTemplate = ({ data, location }) => {
  const post = data.markdownRemark;

  return (
    <>
      <NavBar location={location} />

      <styled.Wrapper>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section
            className="rendered-markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <Footer />
      </styled.Wrapper>
    </>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PagePostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
