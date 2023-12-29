import { graphql, useStaticQuery } from "gatsby";

interface PetProjectsQueryTypes {
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

export function usePetProjectsQuery() {
  const { projects } = useStaticQuery<PetProjectsQueryTypes>(graphql`
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
  `);

  return projects.nodes;
}

