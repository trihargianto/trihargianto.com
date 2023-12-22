import React from "react";

import ProjectCard from "../../02-molecules/ProjectCard";
import Button from "../../01-atoms/Button";

type LatestProjectTypes = {
  projects: {
    title: string;
    description: string;
    demoLink?: string;
    githubLink?: string;
  }[];
  className: string;

  // A path link to see the articles when the button is clicked
  seeAllLink: string;
};

const LatestProject = ({
  projects,
  className,
  seeAllLink,
}: LatestProjectTypes) => (
  <div className={className}>
    <div className="mb-4 flex items-center justify-between">
      <h2>Pet Projects</h2>

      <Button as="a" href={seeAllLink}>
        Lihat Semua
      </Button>
    </div>

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
  </div>
);

export default LatestProject;
