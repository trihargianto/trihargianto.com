import React from "react";

import { publications } from "../../../../content/publications";

const PublicationList = () => (
  <div>
    {publications.map((item, index) => (
      <div
        key={`latest-article-${index}`}
        className="flex flex-row justify-between border-b-2 py-3 dark:border-b-gray-800"
      >
        <div>
          <a
            href={item.link}
            className="font-medium hover:underline"
            target="__blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>

          <p className="mt-1 text-sm text-slate-500">- {item.platform}</p>
        </div>

        <span className="hidden text-right text-slate-400 md:block md:w-40">
          {item.date}
        </span>
      </div>
    ))}
  </div>
);

export default PublicationList;
