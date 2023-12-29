import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

import SEO from "../components/02-molecules/SEO";
import PetProjectsTemplate from "../components/04-templates/PetProjectsTemplate";

interface PetProjectsPageTypes {
  projects: {
    nodes: {
      fields: {
        slug: string;
        date: string;
      };
      frontmatter: {
        title: string;
        description: string;
        demoLink: string;
        githubLink: string;
      };
    }[];
  };
}

const PetProjectsPage = ({ data }: PageProps<PetProjectsPageTypes>) => {
  const projects = data.projects.nodes.map(({ frontmatter, fields }) => ({
    title: frontmatter.title,
    slug: fields.slug,
    description: frontmatter.description,
    demoLink: frontmatter.demoLink,
    githubLink: frontmatter.githubLink,
  }));

  return (
    <>
      <SEO title="Pet Projects" />

      <PetProjectsTemplate
        title="Pet Projects 🐈"
        subtitle="Some of my work that I worked on my spare time for fun"
        projects={projects}
      />
    </>
  );
};

export const pageQuery = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "project" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          demoLink
          githubLink
        }
      }
    }
  }
`;

export default PetProjectsPage;
