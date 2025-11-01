import { useEffect } from "react";

type HeadingEnhancerProps = {
  selector?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const HeadingEnhancer = ({ selector = ".article-prose" }: HeadingEnhancerProps) => {
  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h2, h3, h4"),
    );

    const cleanup: Array<() => void> = [];

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent ?? "section");
      }

      heading.classList.add("heading-anchor-wrapper");

      if (heading.querySelector("button.heading-anchor")) {
        return;
      }

      const anchorButton = document.createElement("button");
      anchorButton.type = "button";
      anchorButton.className = "heading-anchor";
      anchorButton.setAttribute("aria-label", `Copy link to ${heading.textContent}`);
      anchorButton.innerHTML = "#";

      const handleClick = async () => {
        const url = `${window.location.origin}${window.location.pathname}#${heading.id}`;
        try {
          await navigator.clipboard.writeText(url);
          anchorButton.dataset.copied = "true";
          window.setTimeout(() => {
            delete anchorButton.dataset.copied;
          }, 2000);
        } catch {
          anchorButton.dataset.copied = "error";
          window.setTimeout(() => {
            delete anchorButton.dataset.copied;
          }, 2000);
        }
      };

      anchorButton.addEventListener("click", handleClick);
      heading.appendChild(anchorButton);
      cleanup.push(() => anchorButton.removeEventListener("click", handleClick));
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
    };
  }, [selector]);

  return null;
};

export default HeadingEnhancer;
