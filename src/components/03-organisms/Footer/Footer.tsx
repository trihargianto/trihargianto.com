import React from "react";

import { useDarkMode } from "../../../hooks/useDarkMode";

import GithubIcon from "../../../img/icons/github-icon.svg";
import GithubWhiteIcon from "../../../img/icons/github-white-icon.svg";
import LinkedinIcon from "../../../img/icons/linkedin-icon.svg";

const Footer = () => {
  const { theme } = useDarkMode();

  return (
    <footer className="absolute bottom-[0] flex h-48 w-full flex-col items-center justify-end pb-8">
      <div className="mb-8 flex gap-4">
        <a
          href="https://github.com/trihargianto"
          target="__blank"
          rel="noreferer noopener"
          className="hover:opacity-70"
        >
          <img
            src={theme === "light" ? GithubIcon : GithubWhiteIcon}
            width={32}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/trihargianto/"
          target="__blank"
          rel="noreferer noopener"
          className="hover:opacity-70"
        >
          <img src={LinkedinIcon} width={32} />
        </a>
      </div>
      Copyright &copy; {new Date().getFullYear()} Tri Hargianto
    </footer>
  );
};

export default Footer;
