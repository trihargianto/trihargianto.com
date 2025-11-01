import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  target?: string; // CSS selector for the content to track
  totalMinutes?: number;
}

export default function ReadingProgressBar({
  target = "article",
  totalMinutes,
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(totalMinutes ?? 0);
  const [isActive, setIsActive] = useState(false);
  const tooltipPosition = Math.min(Math.max(progress, 3), 97);

  useEffect(() => {
    const calculateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const windowHeight = window.innerHeight;
      const documentHeight = targetElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Get the target element's position
      const targetTop = targetElement.getBoundingClientRect().top + scrollTop;
      const targetHeight = documentHeight;

      // Calculate how far we've scrolled into the target element
      const scrolledIntoTarget = Math.max(0, scrollTop - (targetTop - 40));
      const maxScroll = targetHeight - windowHeight;

      // Calculate percentage (0-100)
      const percentage = maxScroll > 0 ? (scrolledIntoTarget / maxScroll) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, percentage));
      setProgress(clamped);

      if (typeof totalMinutes === "number" && totalMinutes > 0) {
        const remaining = totalMinutes * (1 - clamped / 100);
        setTimeRemaining(Math.max(remaining, 0));
      }
    };

    // Calculate on mount
    calculateProgress();

    // Update on scroll
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [target, totalMinutes]);

  const formattedTime =
    typeof totalMinutes === "number"
      ? timeRemaining <= 0.75
        ? "<1 min left"
        : `${Math.max(Math.round(timeRemaining), 1)} min left`
      : null;

  return (
    <div
      className="reading-progress pointer-events-auto fixed top-0 left-0 right-0 z-[55] flex h-1.5 items-center bg-transparent px-0"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      title={
        formattedTime
          ? `${Math.round(progress)}% • ${formattedTime}`
          : `${Math.round(progress)}%`
      }
    >
      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-900/70">
        <div
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(14,165,233,0.35)] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress / 100 || 0})` }}
        />
        <span
          className={`pointer-events-none absolute -top-9 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white shadow-lg transition-opacity duration-150 ease-out dark:bg-slate-700/90 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${tooltipPosition}%` }}
        >
          <span>{Math.round(progress)}%</span>
          {formattedTime && <span className="text-slate-300">{formattedTime}</span>}
        </span>
      </div>
    </div>
  );
}
