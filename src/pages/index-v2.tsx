import React from "react";
import { graphql, PageProps } from "gatsby";

import GreetingCard from "../components-v2/02-molecules/GreetingCard";
import LatestArticle from "../components-v2/03-organisms/LatestArticle";
import LatestProject from "../components-v2/03-organisms/LatestProject";
import Navbar from "../components-v2/03-organisms/Navbar";
import Footer from "../components-v2/03-organisms/Footer";

interface IndexPageProps {
  latestPosts: {
    nodes: {
      fields: {
        slug: string;
        date: string;
      };
      frontmatter: {
        title: string;
        description: string;
        category: string;
      };
    }[];
  };
  latestProjects: {
    nodes: {
      fields: {
        slug: string;
        date: string;
      };
      frontmatter: {
        title: string;
        description: string;
      };
    }[];
  };
}

const IndexV2 = ({ data }: PageProps<IndexPageProps>) => {
  const articles = data.latestPosts.nodes.map((node) => ({
    title: node.frontmatter.title,
    date: node.fields.date,
    slug: node.fields.slug,
  }));

  const projects = data.latestProjects.nodes.map((node) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug,
    description: node.frontmatter.description,
  }));

  return (
    <div className="mb-10">
      <Navbar />

      <div className="container mx-auto mt-5">
        <GreetingCard />

        <LatestArticle articles={articles} className="mt-14" />

        <LatestProject projects={projects} className="mt-14" />

        <Footer />
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query {
    latestPosts: allMarkdownRemark(
      sort: { fields: { date: DESC } }
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
    latestProjects: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "project" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
        }
      }
    }
  }
`;

export default IndexV2;
