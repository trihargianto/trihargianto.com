import { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "./Button";

const ButtonScrollTop = () => {
  const [isButtonVisible, setButtonVisibility] = useState(false);

  function checkScrollTop() {
    if (!isButtonVisible && window.scrollY > 400) {
      setButtonVisibility(true);
    } else if (isButtonVisible && window.scrollY <= 400) {
      setButtonVisibility(false);
    }
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  return (
    <Button
      type="button"
      onClick={scrollTop}
      variant="secondary"
      size="md"
      isRounded
      className={clsx(
        "md:h-15 h-16 w-16",
        "fixed bottom-5 right-5 z-30 inline-flex items-center justify-center shadow-md",
        isButtonVisible ? "flex" : "hidden",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 18.75 7.5-7.5 7.5 7.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </Button>
  );
};

export default ButtonScrollTop;
