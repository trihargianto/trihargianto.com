import React from "react";

import profilePicPng from "../../../img/profile-pic-v3.png";
import profilePicWebp from "../../../img/profile-pic-v3.webp";
import { useTypingTextEffect } from "../../../hooks/useTypingTextEffect";

const greetings = [
  "Welcome to my little corner of internet.",
  "Hello! You’ve entered my digital HQ.",
  "You’ve reached the right coordinates.",
];

const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

const GreetingCard = () => {
  const typingText = useTypingTextEffect(randomGreeting, 80);

  return (
    <div className="flex flex-row items-center gap-8 sm:flex-row md:w-full lg:w-5/6">
      <picture className="w-1/3">
        <source srcSet={profilePicWebp} type="image/webp" />
        <img
          src={profilePicPng}
          alt="Tri Hargianto"
          className="aspect-[2/3] sm:w-72 md:w-56"
        />
      </picture>

      <div className="w-2/3">
        <h1 className="h-12 text-xl sm:h-auto sm:text-2xl">{typingText}</h1>

        <p className="mb-5">
          I&apos;m{" "}
          <span className="font-bold text-blue-700 dark:text-blue-400">
            Tri Hargianto
          </span>
          , a Software Engineer&nbsp;
          <a href="https://maps.app.goo.gl/p1eF4Amvin6GGofB6" target="__blank">
            <span className="mt-1 inline-block sm:mt-0 sm:inline">
              from Indonesia&nbsp;
            </span>{" "}
          </a>
          🇮🇩
        </p>
        <p className="hidden sm:block">
          This site is a place where I share{" "}
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
