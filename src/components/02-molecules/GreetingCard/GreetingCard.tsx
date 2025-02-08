import React from "react";

import profilePicPng from "../../../img/profile-pic-v3.png";
import profilePicWebp from "../../../img/profile-pic-v3.webp";

const GreetingCard = () => {
  return (
    <div className="flex flex-row items-center gap-8 sm:flex-row md:w-full lg:w-5/6">
      <picture className="aspect-[2/3] w-80 sm:w-72 md:w-56">
        <source srcSet={profilePicWebp} type="image/webp" />
        <img src={profilePicPng} alt="Tri Hargianto" />
      </picture>

      <div>
        <h1>
          Hello there{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>

        <p className="mb-5">I&apos;m a Software Engineer from Indonesia 🇮🇩</p>
        <p>
          Welcome to my digital garden where I share{" "}
          <span className="hidden sm:inline">
            my projects, tutorials, thoughts, and
          </span>{" "}
          everything <span className="hidden sm:inline">else I want to </span>
          the world.
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
