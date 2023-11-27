import { HLocation } from "@reach/router";

import { types as blogPostsTypes } from "../../03-organisms/BlogPosts";

export type HomeTemplateTypes = {
  location: HLocation;
} & blogPostsTypes.BlogPostsPropTypes;
