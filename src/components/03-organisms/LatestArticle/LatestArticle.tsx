import React from "react";
import { Link } from "gatsby";

import Button from "../../01-atoms/Button";
import SectionTitle from "../../01-atoms/SectionTitle";

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
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Button as="a" href={seeAllLink}>
        Lihat Semua
      </Button>
    </div>

    {articles.map((item, index) => (
      <div
        key={`latest-article-${index}`}
        className="flex flex-row justify-between border-b-2 py-3"
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