import React from "react";

import type { PetProjectsQueryTypes } from "../../../hooks/useQuery";
import ProjectCard from "../../02-molecules/ProjectCard";

interface ProjectCardsTypes {
  projects: PetProjectsQueryTypes;
}

const ProjectCards = ({ projects }: ProjectCardsTypes) => {
  return (
    <div className="-m-2 flex flex-wrap sm:flex-row">
      {projects.map((item, index) => (
        <div
          className="w-full p-2 md:w-1/2 lg:w-1/3"
          key={`latest-project-${index}`}
        >
          <ProjectCard
            name={item.title}
            demoLink={item.demoLink}
            githubLink={item.githubLink}
          >
            {item.description}
          </ProjectCard>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
