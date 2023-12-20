import React from "react";
import { Link } from "gatsby";

import Button from "../../01-atoms/Button";
import SectionTitle from "../../01-atoms/SectionTitle";

interface LatestArticleTypes {
  sectionTitle: string;
  articles: {
    title: string;
    date: string;
    slug?: string;
    link?: string;
  }[];
  className: string;
}

const LatestArticle = ({
  sectionTitle,
  articles,
  className,
}: LatestArticleTypes) => (
  <div className={className}>
    <div className="mb-8 flex items-center justify-between">
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Button>Lihat Semua</Button>
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
