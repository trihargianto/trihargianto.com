import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showViewText, setShowViewText] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - msMaxTouchPoints is not in TS types
      navigator.msMaxTouchPoints > 0;

    setIsTouchDevice(checkTouchDevice);

    // Don't run cursor on touch devices
    if (checkTouchDevice) {
      return;
    }

    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-enabled");

    const updateCursorPosition = () => {
      // Smooth follow animation using lerp (linear interpolation)
      const ease = 0.15;
      cursorPosition.current.x +=
        (mousePosition.current.x - cursorPosition.current.x) * ease;
      cursorPosition.current.y +=
        (mousePosition.current.y - cursorPosition.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
      }

      animationFrameId.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering over interactive elements
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-interactive");

      // Check if hovering over project cards
      const isProjectCard =
        target.closest('[data-cursor-view="true"]') ||
        target.closest(".project-card");

      if (isProjectCard) {
        setIsExpanded(true);
        setShowViewText(true);
      } else if (isInteractive) {
        setIsExpanded(true);
        setShowViewText(false);
      } else {
        setIsExpanded(false);
        setShowViewText(false);
      }
    };

    // Initialize cursor position
    cursorPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mousePosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(updateCursorPosition);

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-enabled");

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] transition-all duration-150 ease-out"
      style={{
        width: isExpanded ? "40px" : "20px",
        height: isExpanded ? "40px" : "20px",
        marginLeft: isExpanded ? "-20px" : "-10px",
        marginTop: isExpanded ? "-20px" : "-10px",
      }}
    >
      <div
        ref={cursorInnerRef}
        className="custom-cursor-inner relative h-full w-full rounded-full border-2 border-sky-500 bg-sky-500/20 backdrop-blur-sm transition-all duration-150 ease-out dark:border-sky-400 dark:bg-sky-400/20"
        style={{
          boxShadow: isExpanded
            ? "0 0 20px rgba(14, 165, 233, 0.6), 0 0 40px rgba(14, 165, 233, 0.3)"
            : "0 0 10px rgba(14, 165, 233, 0.4), 0 0 20px rgba(14, 165, 233, 0.2)",
        }}
      >
        {showViewText && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold text-sky-500 dark:text-sky-400">
            View
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
