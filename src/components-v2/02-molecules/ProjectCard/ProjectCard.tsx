import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Button from "../../01-atoms/Button";

type ProjectCardTypes = {
  name: string;
  children: React.ReactNode;
};

const ProjectCard = ({ name, children }: ProjectCardTypes) => (
  <div className="w-1/3">
    <div className="border-2 px-6 py-5">
      <p className="mb-2">{name}</p>
      <p className="text-slate-400">{children}</p>

      <div className="mt-5">
        <Button size="xs" variant="secondary">
          Artikel
        </Button>
        <Button size="xs" className="mx-2" variant="secondary">
          Demo <ArrowTopRightOnSquareIcon className="inline w-4" />
        </Button>
        <Button size="xs" variant="secondary">
          Source <ArrowTopRightOnSquareIcon className="inline w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default ProjectCard;
