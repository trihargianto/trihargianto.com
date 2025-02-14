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
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger
        className={clsx([
          "fixed bottom-6 right-6",
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
        <Drawer.Title></Drawer.Title>
        <Drawer.Overlay className="z-40 fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 dark:bg-[#2a2a2a] flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none z-50">
          <div className="py-6 px-4">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-gray-300 mb-3" />

            <TableOfContents
              headings={headings}
              onClickTocItem={() => setIsOpen(false)}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
