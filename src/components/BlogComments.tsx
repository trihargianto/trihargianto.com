import { useRef, useEffect } from "react";

const BlogComments = () => {
  const commentsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("repo", "trihargianto/comments");

    script.setAttribute(
      "theme",
      // @ts-ignore
      window?.theme === "light" ? "github-light" : "github-dark",
    );

    script.setAttribute("crossorigin", "anonymous");

    commentsContainer.current?.appendChild(script);
  }, []);

  return <div ref={commentsContainer}></div>;
};

export default BlogComments;
