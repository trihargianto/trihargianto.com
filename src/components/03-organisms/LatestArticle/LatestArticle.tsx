import React from "react";
import { Link } from "gatsby";

import Button from "../../01-atoms/Button";

interface LatestArticleTypes {
  // Section title
  sectionTitle: string;

  // Articles
  articles: {
    title: string;
    date: string;
    slug?: string;
    link?: string;
  }[];

  // CSS Classes
  className: string;

  // A path link to see the articles when the button is clicked
  seeAllLink: string;
}

const LatestArticle = ({
  sectionTitle,
  articles,
  className,
  seeAllLink,
}: LatestArticleTypes) => (
  <div className={className}>
    <div className="mb-4 flex items-center justify-between">
      <h2>{sectionTitle}</h2>

      <Button as="a" href={seeAllLink}>
        See More
      </Button>
    </div>

    {articles.map((item, index) => (
      <div
        key={`latest-article-${index}`}
        className="flex flex-row justify-between border-b-2 border-b-gray-200 py-3 dark:border-b-gray-800"
      >
        {item.slug ? (
          <Link to={item.slug} className="font-medium hover:underline">
            {item.title}
          </Link>
        ) : (
          <a
            href={item.link}
            className="font-medium hover:underline"
            target="__blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        )}

        <span className="hidden text-slate-400 md:block">{item.date}</span>
      </div>
    ))}
  </div>
);

export default LatestArticle;
