import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import profilePic from "../../../img/profile-pic-v2.jpg";

const GreetingCard = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

  return (
    <div className="w-5/62 flex items-center gap-9">
      <div>
        <img
          src={profilePic}
          alt="Tri Hargianto"
          className="aspect-square rounded-xl"
          width={350}
        />
      </div>

      <div>
        <p className="mb-7 text-4xl font-semibold">
          Halo, salam kenal!{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </p>
        <p className="mb-5">
          Saya seorang Software Engineer yang berasal dari{" "}
          <span className="font-semibold">Yogyakarta, Indonesia 🇮🇩</span>
        </p>
        <p>{data.site.siteMetadata.description}</p>
      </div>
    </div>
  );
};

export default GreetingCard;
