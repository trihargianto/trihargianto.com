import { useState } from "react";
import type { MarkdownHeading } from "astro";
import { Drawer } from "vaul";
import clsx from "clsx";

import TableOfContents from "./TableOfContents";

type TocDrawerButtonProps = {
  headings: MarkdownHeading[];
};

export default function TocDrawerButton({ headings }: TocDrawerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Drawer.Trigger
        className={clsx([
          "fixed z-10 bottom-6 right-6",
          "flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-4",
          "text-sm font-medium shadow-sm transition-all",
          "text-slate-600 bg-slate-200 border-slate-300 border hover:bg-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900 dark:text-slate-200",
        ])}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Table of Contents
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black" />
        <Drawer.Content className="shadow-md z-10 bg-white dark:bg-slate-800 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
          <div
            aria-hidden
            className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-4"
          />

          <div className="px-6 pb-4 rounded-t-[10px] flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              <Drawer.Title></Drawer.Title>
              <TableOfContents
                headings={headings}
                onClickTocItem={() => setIsOpen(false)}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
