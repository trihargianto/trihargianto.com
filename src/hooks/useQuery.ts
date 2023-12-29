import { graphql, useStaticQuery } from "gatsby";

export type PetProjectsQueryTypes = {
  title: string;
  slug: string;
  description: string;
  demoLink: string;
  githubLink: string;
}[];

export function usePetProjectsQuery(): PetProjectsQueryTypes {
  const { projects } = useStaticQuery<{
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
  }>(graphql`
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

  return projects.nodes.map(({ frontmatter, fields }) => ({
    title: frontmatter.title,
    slug: fields.slug,
    description: frontmatter.description,
    demoLink: frontmatter.demoLink,
    githubLink: frontmatter.githubLink,
  }));
}
