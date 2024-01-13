import React from "react";
import { graphql, useStaticQuery } from "gatsby";

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
          Hello there{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>

        <p className="mb-5">
          I'm a Software Engineer working in Indonesia 🇮🇩.
        </p>
        <p>
          Welcome to my digital garden where I put my projects, tutorials,
          thoughts, and anything else I want to show to the world.
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
