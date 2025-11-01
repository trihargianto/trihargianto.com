import type { StaticImageMetadata } from "astro";

import { AUTHOR_NAME, AUTHOR_SUMMARY, SOCIAL_GITHUB_LINK, SOCIAL_LINKEDIN_LINK, SOCIAL_TWITTER_LINK } from "./config";
import avatarImage from "../img/profile-pic-v3.webp";

export type AuthorSocial = {
  label: "Twitter" | "LinkedIn" | "GitHub" | "Website";
  url: string;
  icon: "twitter" | "linkedin" | "github" | "globe";
};

export type AuthorProfile = {
  name: string;
  role: string;
  bio: string;
  avatar: StaticImageMetadata;
  socials: AuthorSocial[];
  website?: string;
  location?: string;
};

export const primaryAuthor: AuthorProfile = {
  name: AUTHOR_NAME,
  role: "Frontend Tech Lead & Performance Strategist",
  bio: AUTHOR_SUMMARY,
  avatar: avatarImage,
  socials: [
    {
      label: "Twitter",
      url: SOCIAL_TWITTER_LINK,
      icon: "twitter",
    },
    {
      label: "LinkedIn",
      url: SOCIAL_LINKEDIN_LINK,
      icon: "linkedin",
    },
    {
      label: "GitHub",
      url: SOCIAL_GITHUB_LINK,
      icon: "github",
    },
  ],
  website: "https://trihargianto.com",
  location: "Jakarta, Indonesia",
};
