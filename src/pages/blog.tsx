import React from "react";
import { graphql, Link, PageProps } from "gatsby";

import SectionTitle from "../components-v2/01-atoms/SectionTitle";
import Navbar from "../components-v2/03-organisms/Navbar";
import Footer from "../components-v2/03-organisms/Footer";

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
      <Navbar />

      <div className="container mx-auto mt-5">
        <SectionTitle>Articles</SectionTitle>

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
