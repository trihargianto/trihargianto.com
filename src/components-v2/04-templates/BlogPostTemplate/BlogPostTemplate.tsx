import React from "react";
import { graphql } from "gatsby";

import Navbar from "../../03-organisms/Navbar";
import Footer from "../../03-organisms/Footer";

interface BlogPostTemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const BlogPostTemplate = ({ data }: BlogPostTemplateProps) => {
  const htmlContent = data.markdownRemark.html;

  return (
    <>
      <Navbar />

      <section
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="rendered-markdown container mx-auto"
      />

      <Footer />
    </>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPostTemplate;
