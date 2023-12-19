import React from "react";

import ProjectCard from "../../02-molecules/ProjectCard";

type LatestProjectTypes = {
  projects: {
    title: string;
    description: string;
  }[];
  className: string;
};

const LatestProject = ({ projects, className }: LatestProjectTypes) => (
  <div className={className}>
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-semibold sm:text-3xl">Projects</h2>
      <button className="rounded-sm bg-blue-500 px-4 py-3 text-white hover:bg-blue-400">
        Lihat Semua
      </button>
    </div>

    <div className="-m-1 flex flex-wrap sm:flex-row">
      {projects.map((item, index) => (
        <div
          className="w-full p-1 md:w-1/2 lg:w-1/3"
          key={`latest-project-${index}`}
        >
          <ProjectCard name={item.title}>{item.description}</ProjectCard>
        </div>
      ))}
    </div>
  </div>
);

export default LatestProject;
