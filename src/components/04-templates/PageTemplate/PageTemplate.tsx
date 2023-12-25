import React from "react";
import { graphql, PageProps } from "gatsby";

import SEO from "../../02-molecules/SEO";
import Layout from "../Layout";

import Endorsements from "../../03-organisms/Endorsements";

type PageTemplateProps = {
  data: {
    markdownRemark: {
      html: string;
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
  };
} & PageProps;

const PageTemplate = ({ data, location }: PageTemplateProps) => {
  const htmlContent = data.markdownRemark.html;

  const image = data.markdownRemark.frontmatter.image?.childImageSharp?.resize;
  const title = data.markdownRemark.frontmatter.title;
  const description = data.markdownRemark.frontmatter.description;
  const pathname = location.pathname;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={image}
        pathname={pathname}
      />

      <section
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="rendered-markdown container mx-auto"
      />

      <div className="container relative mx-auto mt-14">
        <Endorsements />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
`;

export default PageTemplate;
