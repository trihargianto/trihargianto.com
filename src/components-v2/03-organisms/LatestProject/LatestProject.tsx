import React from "react";

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
      <h2 className="text-3xl font-semibold">Project</h2>
      <button className="rounded-sm bg-blue-500 px-4 py-3 text-white hover:bg-blue-400">
        Lihat Semua
      </button>
    </div>

    <div className="flex">
      {articles.map((item, index) => (
        <div key={`latest-project-${index}`} className="mr-5 w-1/3 last:mr-0">
          <div className="border-2 px-6 py-4">
            <p>Nama Project</p>
            <p className="text-slate-400">Deskripsi Project</p>

            <div>Buttons</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LatestProject;
