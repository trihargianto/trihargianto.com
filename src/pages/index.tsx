import React from "react";
import { graphql, PageProps } from "gatsby";
import dayjs from "dayjs";

import GreetingCard from "../components/02-molecules/GreetingCard";
import LatestArticle from "../components/03-organisms/LatestArticle";
import LatestProject from "../components/03-organisms/LatestProject";
import Layout from "../components/04-templates/Layout";

import { publications } from "../../content/publications";
import SEO from "../components/02-molecules/SEO";

const LIMIT_LATEST_ARTICLES = 5;

interface LatestPost {
  fields: {
    slug: string;
    date: string;
    articleGroup: string;
  };
  frontmatter: {
    title: string;
    description: string;
    category: string;
    lang: string;
  };
}

interface LatestPosts {
  nodes: LatestPost[];
}

interface IndexPageProps {
  latestPosts: LatestPosts;
  latestProjects: {
    nodes: {
      fields: {
        slug: string;
        date: string;
      };
      frontmatter: {
        title: string;
        description: string;
        demoLink: string;
        githubLink: string;
      };
    }[];
  };
}

const IndexPage = ({ data }: PageProps<IndexPageProps>) => {
  const latestArticles = getEnArticlesWhenAvailable(data.latestPosts).map(
    (node) => ({
      title: node.frontmatter.title,
      date: dayjs(node.fields.date).format("MMM YYYY"),
      slug: node.fields.slug,
    }),
  );

  const latestProjects = data.latestProjects.nodes.map((node) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug,
    description: node.frontmatter.description,
    demoLink: node.frontmatter.demoLink,
    githubLink: node.frontmatter.githubLink,
  }));

  const latestPublications = publications.slice(0, LIMIT_LATEST_ARTICLES);

  return (
    <Layout>
      <SEO title="trihargianto.com - A personal digital garden by Tri Hargianto" />

      <div className="mb-10">
        <div className="container mx-auto mt-5">
          <GreetingCard />

          <LatestArticle
            sectionTitle="Latest Articles"
            articles={latestArticles}
            className="mt-14"
            seeAllLink="/blog"
          />

          <LatestArticle
            sectionTitle="Publications"
            articles={latestPublications}
            className="mt-14"
            seeAllLink="/publications"
          />

          <LatestProject
            projects={latestProjects}
            className="mt-14"
            seeAllLink="/pet-projects"
          />
        </div>
      </div>
    </Layout>
  );
};

function getEnArticlesWhenAvailable(data: LatestPosts) {
  const filteredData: { [key: string]: LatestPost } = {};

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
    latestPosts: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { frontmatter: { category: { eq: "blog" } } }
      limit: 8
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
    latestProjects: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "project" } } }
      limit: 5
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          demoLink
          githubLink
        }
      }
    }
  }
`;

export default IndexPage;
