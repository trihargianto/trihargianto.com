import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { groupBy } from "lodash-es";
import dayjs from "dayjs";

import Layout from "../components/04-templates/Layout";
import SEO from "../components/02-molecules/SEO";

interface ArticleNode {
  fields: {
    slug: string;
    date: string;
    year: string;
    articleGroup: string;
  };
  frontmatter: {
    title: string;
    description: string;
    category: string;
    lang: string;
  };
}

interface ArticleNodes {
  nodes: ArticleNode[];
}

interface BlogPageProps {
  articles: ArticleNodes;
}

const BlogPage = ({ data }: PageProps<BlogPageProps>) => {
  const articles = getEnArticlesWhenAvailable(data.articles).map((item) => ({
    slug: item.fields.slug,
    title: item.frontmatter.title,
    date: dayjs(item.fields.date).format("DD MMM YYYY"),
    year: dayjs(item.fields.date).format("YYYY"),
  }));

  const articlesByYear = groupBy(articles, "year");
  const years = Object.keys(articlesByYear).sort().reverse();

  return (
    <Layout>
      <SEO title="Blog | Tri Hargianto" />

      <div className="mb-10">
        <div className="container mx-auto mt-5">
          <h1>Blog</h1>

          {years.map((year) => (
            <div key={year} className="mb-10">
              <h2 className="mb-2">{year}</h2>

              {articlesByYear[year].map((item, index) => (
                <div
                  key={`latest-article-${index}`}
                  className="flex flex-row justify-between border-b border-b-gray-200 py-3 dark:border-b-gray-800"
                >
                  <Link to={item.slug} className="font-medium hover:underline">
                    {item.title}
                  </Link>

                  <span className="hidden text-slate-400 md:block">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

function getEnArticlesWhenAvailable(data: ArticleNodes) {
  const filteredData: { [key: string]: ArticleNode } = {};

  // Filter data by unique names
  data.nodes.forEach((item) => {
    const { articleGroup } = item.fields;

    if (
      !filteredData[articleGroup] ||
      filteredData[articleGroup].frontmatter.lang !== "en"
    ) {
      filteredData[articleGroup] = item;
    }
  });

  return Object.values(filteredData);
}

export const pageQuery = graphql`
  query {
    articles: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      nodes {
        fields {
          slug
          date
          articleGroup
        }
        frontmatter {
          title
          description
          category
          lang
        }
      }
    }
  }
`;

export default BlogPage;
