import { useRef, useState, useEffect } from "react";

interface ProjectCardInteractiveProps {
  name: string;
  description: string;
  category?: string;
  demoLink?: string;
  githubLink?: string;
  tags?: string[];
}

const ProjectCardInteractive = ({
  name,
  description,
  category,
  demoLink,
  githubLink,
  tags = [],
}: ProjectCardInteractiveProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [shadowPosition, setShadowPosition] = useState({ x: 0, y: 0 });

  // Derive tags from category and links if not provided
  const displayTags = tags.length > 0 ? tags : [
    category && category !== "project" ? category : null,
    demoLink ? "Live Demo" : null,
    githubLink ? "Open Source" : null,
  ].filter(Boolean) as string[];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (max 10 degrees)
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;

      // Calculate cursor position relative to card (0-1 range)
      const cursorX = x / rect.width;
      const cursorY = y / rect.height;

      // Calculate shadow offset
      const shadowX = ((x - centerX) / centerX) * 20;
      const shadowY = ((y - centerY) / centerY) * 20;

      setTransform({
        rotateX,
        rotateY,
        translateZ: 20,
      });

      setCursorPosition({ x: cursorX, y: cursorY });
      setShadowPosition({ x: shadowX, y: shadowY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsTapped(false);
      setTransform({ rotateX: 0, rotateY: 0, translateZ: 0 });
      setCursorPosition({ x: 0.5, y: 0.5 });
      setShadowPosition({ x: 0, y: 0 });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  const handleTap = () => {
    setIsTapped(!isTapped);
  };

  const isActive = isHovered || isTapped;

  return (
    <div
      ref={cardRef}
      className="project-card-interactive group relative h-full w-full cursor-pointer"
      onClick={handleTap}
      data-cursor-view="true"
      data-animate="fadeInUp"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative h-full w-full border-2 border-slate-200 bg-white px-6 py-5 transition-all duration-300 ease-out dark:border-slate-700 dark:bg-slate-800"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateZ(${transform.translateZ}px)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: isActive
            ? `${shadowPosition.x}px ${shadowPosition.y}px 40px rgba(14, 165, 233, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)`
            : "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Shine/Glare Effect */}
        {isActive && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${cursorPosition.x * 100}% ${cursorPosition.y * 100}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
              willChange: "background",
            }}
          />
        )}

        {/* Content Layer - with parallax */}
        <div
          className="relative z-10"
          style={{
            transform: `translateZ(30px) translate(${-transform.rotateY * 0.5}px, ${-transform.rotateX * 0.5}px)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <p className="mb-2 font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </p>
          <p className="flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        {/* Overlay with Tags - Fades in on hover */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 p-6 backdrop-blur-sm transition-opacity duration-200 dark:bg-slate-950/90 ${
            isActive ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {displayTags.length > 0 && (
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium text-sky-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* View Project Button - Slides up */}
          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${
              isActive
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition-all hover:bg-sky-600 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Project</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-slate-500 px-6 py-2 font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Source Code</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardInteractive;
