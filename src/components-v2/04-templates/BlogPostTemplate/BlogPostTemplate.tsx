import React, { useRef, useEffect } from "react";
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
      <Navbar />

      <section
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="rendered-markdown container mx-auto"
      />

      <div className="container mx-auto">
        <hr className="my-8" />

        <p className="mb-6 text-center text-2xl font-semibold">Komentar</p>

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
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPostTemplate;
