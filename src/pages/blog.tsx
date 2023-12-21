import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { groupBy } from "lodash-es";

import NavigationBar from "../components/03-organisms/NavigationBar";
import Footer from "../components/03-organisms/Footer";
import SEO from "../components/02-molecules/SEO";

interface BlogPageProps {
  articles: {
    nodes: {
      fields: {
        slug: string;
        date: string;
        year: string;
      };
      frontmatter: {
        title: string;
        description: string;
        category: string;
      };
    }[];
  };
}

const BlogPage = ({ data }: PageProps<BlogPageProps>) => {
  const articles = data.articles.nodes.map((item) => ({
    slug: item.fields.slug,
    title: item.frontmatter.title,
    date: item.fields.date,
    year: item.fields.year,
  }));

  const articlesByYear = groupBy(articles, "year");
  const years = Object.keys(articlesByYear).sort().reverse();

  return (
    <>
      <SEO title="Blog" />

      <div className="mb-10">
        <NavigationBar />

        <div className="container mx-auto mt-5">
          <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">Blog</h1>

          {years.map((year) => (
            <div key={year} className="mb-10">
              <h3 className="mb-2 text-2xl font-semibold sm:text-3xl">
                {year}
              </h3>

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

          <Footer />
        </div>
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query {
    articles: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { frontmatter: { category: { eq: "blog" } } }
    ) {
      nodes {
        fields {
          slug
          date(formatString: "DD MMMM YYYY")
          year: date(formatString: "YYYY")
        }
        frontmatter {
          title
          description
          category
        }
      }
    }
  }
`;

export default BlogPage;
