import React from "react";
import { graphql, Link, PageProps } from "gatsby";

import SectionTitle from "../components/01-atoms/SectionTitle";
import NavigationBar from "../components/03-organisms/NavigationBar";
import Footer from "../components/03-organisms/Footer";

interface BlogPageProps {
  articles: {
    nodes: {
      fields: {
        slug: string;
        date: string;
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
  }));

  return (
    <div className="mb-10">
      <NavigationBar />

      <div className="container mx-auto mt-5">
        <SectionTitle>Articles</SectionTitle>

        {articles.map((item, index) => (
          <div
            key={`latest-article-${index}`}
            className="flex flex-row justify-between border-b border-b-gray-200 py-3 dark:border-b-gray-800"
          >
            <Link to={item.slug} className="font-medium hover:underline">
              {item.title}
            </Link>

            <span className="hidden text-slate-400 md:block">{item.date}</span>
          </div>
        ))}

        <Footer />
      </div>
    </div>
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
