import React from "react";
import ProjectCard from "../../02-molecules/ProjectCard";

type LatestProjectTypes = {
  className: string;
};

const articles = [
  "Lorem ipsum dolor sit amet. Lorem ipsum dolor",
  "Lorem ipsum dolor sit amet. Lorem ipsum dolor",
  "Lorem ipsum dolor sit amet. Lorem ipsum dolor",
];

const LatestProject = (props: LatestProjectTypes) => (
  <div className={props.className}>
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-3xl font-semibold">Projects</h2>
      <button className="rounded-sm bg-blue-500 px-4 py-3 text-white hover:bg-blue-400">
        Lihat Semua
      </button>
    </div>

    <div className="flex gap-5">
      {articles.map((item, index) => (
        <ProjectCard key={`latest-project-${index}`} name="Nama proyek">
          Deskripsi projet
        </ProjectCard>
      ))}
    </div>
  </div>
);

export default LatestProject;
