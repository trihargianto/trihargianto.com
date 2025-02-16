import type { ReactNode } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

import Button from "./Button";

type ProjectCardTypes = {
  name: string;
  demoLink?: string;
  githubLink?: string;
  children: ReactNode;
};

const ProjectCard = ({
  name,
  children,
  demoLink,
  githubLink,
}: ProjectCardTypes) => (
  <div className="flex h-full w-full flex-col border-2 border-slate-200 bg-white px-6 py-5 dark:border-transparent dark:bg-slate-800">
    <p className="mb-2 font-semibold">{name}</p>
    <p className="flex-1 text-slate-400">{children}</p>

    <div className="mt-5 flex gap-2">
      {githubLink && (
        <Button
          size="xs"
          variant="secondary"
          as="a"
          href={githubLink}
          target="__blank"
          rel="noopener noreferrer"
        >
          Source <ArrowTopRightOnSquareIcon className="inline w-4" />
        </Button>
      )}
      {demoLink && (
        <Button
          size="xs"
          variant="secondary"
          as="a"
          href={demoLink}
          target="__blank"
          rel="noopener noreferrer"
        >
          Demo <ArrowTopRightOnSquareIcon className="inline w-4" />
        </Button>
      )}
    </div>
  </div>
);

export default ProjectCard;
