import type { MarkdownHeading } from "astro";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { NAVBAR_HEIGHT_ESTIMATION_IN_PX } from "../constants/config";
import { useNavbarScrollVisibility } from "../hooks/useNavbarScrollVisibility";

type TableOfContentsProps = {
  headings: MarkdownHeading[];
};

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const { isNavbarVisible } = useNavbarScrollVisibility();

  return (
    <nav
      className={clsx(["sticky right-8 w-full overflow-auto duration-300"])}
      style={{
        top: isNavbarVisible ? NAVBAR_HEIGHT_ESTIMATION_IN_PX + 10 : 10,
      }}
    >
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        On this page
      </span>

      <ul className="px-5 mt-4">
        {headings.map(({ depth, slug, text }) => (
          <li
            key={slug}
            className={clsx([
              "my-0!",
              depth === 2 ? "ml-0" : depth === 3 ? "ml-4" : "ml-8",
            ])}
          >
            <a
              href={`#${slug}`}
              className={clsx([
                "text-gray-500 block py-1.5 px-0 text-sm transition-colors no-underline hover:text-blue-500 dark:hover:text-blue-300",
              ])}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
