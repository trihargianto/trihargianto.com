import React from "react";

import type { PetProjectsQueryTypes } from "../../../hooks/useQuery";

import Button from "../../01-atoms/Button";
import ProjectCards from "../ProjectCards";

type LatestProjectTypes = {
  projects: PetProjectsQueryTypes;

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

    <ProjectCards projects={projects} />
  </div>
);

export default LatestProject;
