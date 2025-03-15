import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const collectionEntries = await getCollection("blog");

const pages = Object.fromEntries(
  collectionEntries.map(({ id, data }) => [id, data]),
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages,

  getImageOptions: (_path, page) => {
    return {
      title: page.title,
      description: page.description,
      logo: { path: "./src/img/logo.png", size: [350] },
      bgGradient: [[17, 25, 38]],
      padding: 50,
      font: {
        title: {
          size: 60,
          lineHeight: 1.2,
        },
        description: {
          size: 40,
          color: [125, 125, 125],
        },
      },
    };
  },
});
