import React from "react";
import { graphql, PageProps } from "gatsby";

import SectionTitle from "../components-v2/01-atoms/SectionTitle";
import Navbar from "../components-v2/03-organisms/Navbar";
import Footer from "../components-v2/03-organisms/Footer";
import ProjectCard from "../components-v2/02-molecules/ProjectCard";

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
      <Navbar />

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
