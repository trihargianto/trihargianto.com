export const navbarMenu: {
  // The path of the link
  path: string;
  // The label of the link
  label: string;
  // Whether the link is an external link
  isExternalLink?: boolean;
}[] = [
    {
      path: "/about/",
      label: "About",
    },
    {
      path: "/blog/",
      label: "Blog",
    },
    {
      path: "/publications/",
      label: "Publications",
    },
    {
      path: "/pet-projects/",
      label: "Pet Projects",
    },
    {
      path: "https://trihargianto.notion.site/trihargianto/Resume-e7af731cfb5a473e8ef128b18a5c35ce",
      label: "Resume",
      isExternalLink: true,
    },
  ];
