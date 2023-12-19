import React from "react";
import { Link } from "gatsby";

import Button from "../../01-atoms/Button";

interface LatestArticleTypes {
  articles: {
    title: string;
    date: string;
    slug: string;
  }[];
  className: string;
}

const LatestArticle = ({ articles, className }: LatestArticleTypes) => (
  <div className={className}>
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-semibold sm:text-3xl">Artikel Terbaru</h2>
      <Button>Lihat Semua</Button>
    </div>

    {articles.map((item, index) => (
      <div
        key={`latest-article-${index}`}
        className="flex flex-row justify-between border-b-2 py-3"
      >
        <Link to={item.slug} className="font-medium hover:underline">
          {item.title}
        </Link>

        <span className="hidden text-slate-400 md:block">{item.date}</span>
      </div>
    ))}
  </div>
);

export default LatestArticle;
