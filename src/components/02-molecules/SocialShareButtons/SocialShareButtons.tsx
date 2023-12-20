import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

interface SocialShareButtonsProps {
  socialConfig: {
    config: {
      url: string;
      title: string;
      description: string;
    };
    twitter: string;
  };
}

const SocialShareButtons = ({ socialConfig }: SocialShareButtonsProps) => (
  <div className="mb-10 flex h-12 items-center md:mb-5">
    <span>Bagikan: &nbsp;</span> <br />
    <FacebookShareButton url={socialConfig.config.url} hashtag={""}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>{" "}
    &nbsp;
    <TwitterShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
      via={socialConfig.twitter}
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>{" "}
    &nbsp;
    <LinkedinShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
      summary={socialConfig.config.description}
      source={socialConfig.config.url}
    >
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  </div>
);

export default SocialShareButtons;
