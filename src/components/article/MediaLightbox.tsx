import { useEffect } from "react";

type MediaLightboxProps = {
  selector?: string;
};

const MediaLightbox = ({ selector = ".article-prose img" }: MediaLightboxProps) => {
  useEffect(() => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(selector));
    if (!images.length) return;

    const overlay = document.createElement("div");
    overlay.className = "article-lightbox-overlay hidden fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Expanded image viewer");

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "absolute top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500";
    closeBtn.innerHTML = "<span aria-hidden>✕</span>";
    closeBtn.setAttribute("aria-label", "Close image preview");

    const content = document.createElement("div");
    content.className = "max-h-[90vh] max-w-[90vw]";

    const caption = document.createElement("p");
    caption.className = "mt-4 text-center text-sm font-medium text-slate-200";

    overlay.appendChild(content);
    overlay.appendChild(closeBtn);
    overlay.appendChild(caption);
    document.body.appendChild(overlay);

    const close = () => {
      overlay.classList.add("hidden");
      document.body.style.removeProperty("overflow");
      content.innerHTML = "";
      caption.textContent = "";
      closeBtn.blur();
    };

    const open = (img: HTMLImageElement) => {
      const clone = img.cloneNode(true) as HTMLImageElement;
      clone.className = "max-h-[90vh] max-w-full rounded-3xl object-contain shadow-2xl";
      content.innerHTML = "";
      content.appendChild(clone);
      caption.textContent = img.getAttribute("alt") || "";
      overlay.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });
    closeBtn.addEventListener("click", close);
    window.addEventListener("keydown", onKeydown);

    const handlers = images.map((img) => {
      const clickHandler = () => open(img);
      const keyHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open(img);
        }
      };
      img.classList.add("article-image-interactive");
      img.addEventListener("click", clickHandler);
      img.addEventListener("keydown", keyHandler);
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `${img.alt || "Image"} (click to enlarge)`);
      return { img, clickHandler, keyHandler };
    });

    return () => {
      handlers.forEach(({ img, clickHandler, keyHandler }) => {
        img.removeEventListener("click", clickHandler);
        img.removeEventListener("keydown", keyHandler);
        img.classList.remove("article-image-interactive");
        img.removeAttribute("tabindex");
        img.removeAttribute("role");
        img.removeAttribute("aria-label");
      });
      window.removeEventListener("keydown", onKeydown);
      overlay.remove();
    };
  }, [selector]);

  return null;
};

export default MediaLightbox;
