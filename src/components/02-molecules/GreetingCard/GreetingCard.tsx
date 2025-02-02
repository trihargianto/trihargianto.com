import React from "react";

import profilePic from "../../../img/profile-pic-v2.jpg";

const GreetingCard = () => {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row md:w-full lg:w-5/6">
      <img
        src={profilePic}
        alt="Tri Hargianto"
        className="aspect-square w-40 rounded-xl sm:w-48 md:w-40"
      />

      <div>
        <h1>
          Hello there{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>

        <p className="mb-5">I&apos;m a Software Engineer from Indonesia 🇮🇩</p>
        <p>
          Welcome to my digital garden where I put my projects, tutorials,
          thoughts, and anything else I want to show to the world.
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
