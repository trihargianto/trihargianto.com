import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 50vh (50% of viewport height)
      const fiftyVh = window.innerHeight * 0.5;
      if (window.scrollY > fiftyVh) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", toggleVisibility);

    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-all duration-300 ease-out hover:bg-sky-600 hover:scale-110 hover:shadow-xl dark:bg-sky-600 dark:hover:bg-sky-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Back to top"
      title="Back to top"
      style={{
        boxShadow: isVisible
          ? "0 4px 20px rgba(14, 165, 233, 0.4), 0 0 20px rgba(14, 165, 233, 0.2)"
          : "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
