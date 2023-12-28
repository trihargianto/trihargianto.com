import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import profilePic from "../../../img/profile-pic-v2.jpg";
import { useLang } from "../../../hooks/useLang";

const GreetingCard = () => {
  const { translate } = useLang();

  const res = translate("greetings.whoami");

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
          {translate('greetings.hello')}{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>

        <p className="mb-5">
          {translate('greetings.whoami')}{" "} 🇮🇩
        </p>
        <p>{data.site.siteMetadata.description}</p>
      </div>
    </div>
  );
};

export default GreetingCard;
