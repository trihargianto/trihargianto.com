import { useState, useEffect } from "react";

export function useScrollToTop() {
  const [isTriggerVisible, setTriggerVisibility] = useState(false);

  function checkScrollTop() {
    if (!isTriggerVisible && window.scrollY > 400) {
      setTriggerVisibility(true);
    } else if (isTriggerVisible && window.scrollY <= 400) {
      setTriggerVisibility(false);
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

  return {
    isTriggerVisible,
    scrollTop,
  };
}
