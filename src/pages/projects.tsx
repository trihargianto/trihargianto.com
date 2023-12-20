import React from "react";
import { graphql, PageProps } from "gatsby";

import SectionTitle from "../components/01-atoms/SectionTitle";
import NavigationBar from "../components/03-organisms/NavigationBar";
import Footer from "../components/03-organisms/Footer";
import ProjectCard from "../components/02-molecules/ProjectCard";

interface ProjectPageProps {
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
      };
    }[];
  };
}

const ProjectPage = ({ data }: PageProps<ProjectPageProps>) => {
  const projects = data.projects.nodes.map((node) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug,
    description: node.frontmatter.description,
    demoLink: node.frontmatter.demoLink,
  }));

  return (
    <div className="mb-10">
      <NavigationBar />

      <div className="container mx-auto mt-5">
        <SectionTitle>Projects</SectionTitle>

        <div className="-m-1 flex flex-wrap sm:flex-row">
          {projects.map((item, index) => (
            <div
              className="w-full p-1 md:w-1/2 lg:w-1/3"
              key={`latest-project-${index}`}
            >
              <ProjectCard name={item.title} demoLink={item.demoLink}>
                {item.description}
              </ProjectCard>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
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
        }
      }
    }
  }
`;

export default ProjectPage;
