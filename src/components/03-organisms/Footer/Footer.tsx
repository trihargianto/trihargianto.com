import React from "react";

import GithubIcon from "../../../img/icons/github-icon.svg";
import LinkedinIcon from "../../../img/icons/linkedin-icon.svg";

const Footer = () => {
  return (
    <footer className="mb-8 mt-16 flex flex-col items-center justify-center md:mt-20">
      <div className="mb-8 flex gap-4">
        <a
          href="https://github.com/trihargianto"
          target="__blank"
          rel="noreferer noopener"
          className="hover:opacity-70"
        >
          <img src={GithubIcon} width={32} />
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
