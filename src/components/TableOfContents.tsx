import type { MarkdownHeading } from "astro";
import clsx from "clsx";

type TableOfContentsProps = {
  headings: MarkdownHeading[];
  onClickTocItem?: () => void;
};

const TableOfContents = ({
  headings,
  onClickTocItem = () => null,
}: TableOfContentsProps) => {
  return (
    <>
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
