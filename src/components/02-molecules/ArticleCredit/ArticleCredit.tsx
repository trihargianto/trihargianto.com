import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import * as styled from "./styled";

const ArticleCredit = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic-v2.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  // TODO: `author` and author's summary didn't work
  const author = data?.site?.siteMetadata?.author;
  const avatar = data?.avatar?.childImageSharp?.fixed;

  return (
    <styled.Wrapper>
      {avatar && (
        <GatsbyImage
          image={avatar}
          alt={author?.name || ``}
          imgStyle={{
            borderRadius: `50%`,
          }}
          style={{
            marginRight: "1rem",
            marginBottom: 0,
            minWidth: "50px",
          }}
        />
      )}
      {author?.name && (
        <p>
          Ditulis oleh <strong>{author.name}</strong>, {author?.summary || null}
        </p>
      )}
    </styled.Wrapper>
  );
};

export default ArticleCredit;
