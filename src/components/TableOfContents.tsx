import type { MarkdownHeading } from "astro";
import clsx from "clsx";

import { useScrollToTop } from "../hooks/useScrollToTop";

type TableOfContentsProps = {
  headings: MarkdownHeading[];
  onClickTocItem?: () => void;
};

const TableOfContents = ({
  headings,
  onClickTocItem = () => null,
}: TableOfContentsProps) => {
  const { isTriggerVisible, scrollTop } = useScrollToTop();

  return (
    <>
      <span className="text-gray-900 dark:text-gray-100 flex justify-between">
        <span className="text-lg font-semibold">On this page</span>

        {isTriggerVisible && (
          <button
            className="text-sm font-semibold justify-center items-center lg:inline-flex hidden cursor-pointer"
            onClick={scrollTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Top
          </button>
        )}
      </span>

      <ul className="px-5 mt-4">
        {headings.map(({ depth, slug, text }) => (
          <li
            key={slug}
            className={clsx([
              "my-0! list-disc",
              depth === 2 ? "ml-0" : depth === 3 ? "ml-4" : "ml-8",
            ])}
          >
            <a
              href={`#${slug}`}
              className={clsx([
                "text-gray-500 dark:text-gray-400 block py-1.5 px-0 text-sm transition-colors no-underline hover:text-blue-500 dark:hover:text-blue-300",
              ])}
              onClick={onClickTocItem}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
