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
    <div className="flex flex-col gap-8 sm:flex-row md:w-full lg:w-5/6">
      <div>
        <img
          src={profilePic}
          alt="Tri Hargianto"
          className="xs:w-52 aspect-square w-40 rounded-xl sm:w-full"
        />
      </div>

      <div>
        <h1>
          Halo, salam kenal!{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>

        <p className="mb-5">
          Saya seorang Software Engineer dari{" "}
          <span className="font-semibold">Yogyakarta, Indonesia 🇮🇩</span>
        </p>
        <p>{data.site.siteMetadata.description}</p>
      </div>
    </div>
  );
};

export default GreetingCard;
