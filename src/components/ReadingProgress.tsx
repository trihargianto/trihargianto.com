import { useEffect, useState } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      // Get total scrollable height
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // Calculate progress percentage (0-100)
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(scrollPercent);
    };

    // Update on scroll
    window.addEventListener("scroll", updateProgress);
    // Update on resize (in case content height changes)
    window.addEventListener("resize", updateProgress);
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 transition-all duration-150 ease-out dark:from-sky-400 dark:via-sky-300 dark:to-cyan-300"
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0
            ? "0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)"
            : "none",
        }}
      />
    </div>
  );
};

export default ReadingProgress;
