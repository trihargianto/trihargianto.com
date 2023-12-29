import React from "react";

import type { PetProjectsQueryTypes } from "../../../hooks/useQuery";
import ProjectCards from "../../03-organisms/ProjectCards";
import Layout from "../../04-templates/Layout";

interface PetProjectsTemplateProps {
  title: string;
  subtitle: string;
  projects: PetProjectsQueryTypes;
}

const PetProjectsTemplate = ({
  title,
  subtitle,
  projects,
}: PetProjectsTemplateProps) => {
  return (
    <Layout>
      <div className="mb-10">
        <div className="container mx-auto mt-5">
          <div className="mb-8">
            <h1 className="mb-0">{title}</h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {subtitle}
            </p>
          </div>

          <ProjectCards projects={projects} />
        </div>
      </div>
    </Layout>
  );
};

export default PetProjectsTemplate;
