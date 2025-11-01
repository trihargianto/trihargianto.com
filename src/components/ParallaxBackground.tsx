import { useEffect, useRef, useState } from "react";

interface Shape {
  id: number;
  type: "circle" | "triangle" | "square" | "hexagon";
  x: number; // percentage
  y: number; // percentage
  size: number;
  speed: number; // parallax speed multiplier (0.2 to 0.8)
  rotation: number;
  opacity: number;
  color: string;
}

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollY = useRef(0);
  const rafId = useRef<number>();

  // Initialize shapes
  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();
    window.addEventListener("resize", checkMobile);

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Generate random shapes
    const generatedShapes: Shape[] = [
      {
        id: 1,
        type: "circle",
        x: 15,
        y: 20,
        size: 120,
        speed: 0.3,
        rotation: 0,
        opacity: 0.15,
        color: "var(--parallax-shape-1)",
      },
      {
        id: 2,
        type: "triangle",
        x: 75,
        y: 15,
        size: 100,
        speed: 0.5,
        rotation: 45,
        opacity: 0.12,
        color: "var(--parallax-shape-2)",
      },
      {
        id: 3,
        type: "square",
        x: 85,
        y: 50,
        size: 80,
        speed: 0.7,
        rotation: 30,
        opacity: 0.1,
        color: "var(--parallax-shape-3)",
      },
      {
        id: 4,
        type: "hexagon",
        x: 10,
        y: 70,
        size: 90,
        speed: 0.4,
        rotation: 60,
        opacity: 0.13,
        color: "var(--parallax-shape-4)",
      },
      {
        id: 5,
        type: "circle",
        x: 60,
        y: 80,
        size: 110,
        speed: 0.6,
        rotation: 0,
        opacity: 0.11,
        color: "var(--parallax-shape-5)",
      },
    ];

    setShapes(generatedShapes);

    return () => {
      window.removeEventListener("resize", checkMobile);
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Handle scroll with RAF for better performance
  useEffect(() => {
    if (isMobile || prefersReducedMotion || shapes.length === 0) return;

    const handleScroll = () => {
      scrollY.current = window.scrollY;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateShapes);
      }
    };

    const updateShapes = () => {
      if (!containerRef.current) {
        rafId.current = undefined;
        return;
      }

      const container = containerRef.current;
      const shapeElements = container.querySelectorAll<HTMLDivElement>(
        "[data-shape-id]"
      );

      shapeElements.forEach((element) => {
        const shapeId = parseInt(element.getAttribute("data-shape-id") || "0");
        const shape = shapes.find((s) => s.id === shapeId);

        if (!shape) return;

        // Calculate parallax offset
        const offset = scrollY.current * shape.speed;

        // Calculate viewport position for fade-out effect
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Fade out when exiting viewport
        let fadeOpacity = shape.opacity;
        if (rect.top < -rect.height) {
          // Exiting top
          fadeOpacity = 0;
        } else if (rect.top < 0) {
          // Partially visible at top
          fadeOpacity = shape.opacity * (1 + rect.top / rect.height);
        } else if (rect.bottom > viewportHeight + rect.height) {
          // Below viewport
          fadeOpacity = 0;
        } else if (rect.bottom > viewportHeight) {
          // Partially visible at bottom
          fadeOpacity =
            shape.opacity *
            ((viewportHeight + rect.height - rect.bottom) / rect.height);
        }

        // Apply transform with translateZ for GPU acceleration
        element.style.transform = `translate3d(0, ${offset}px, 0) rotate(${shape.rotation}deg)`;
        element.style.opacity = fadeOpacity.toString();
      });

      rafId.current = undefined;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial update

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isMobile, prefersReducedMotion, shapes]);

  // Don't render on mobile or if user prefers reduced motion
  if (isMobile || prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          data-shape-id={shape.id}
          className="absolute will-change-transform transition-opacity duration-300"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
            filter: "blur(2px)",
            transform: `translate3d(0, 0, 0) rotate(${shape.rotation}deg)`,
          }}
        >
          <ShapeSVG type={shape.type} color={shape.color} />
        </div>
      ))}
    </div>
  );
};

// SVG Shape Component
const ShapeSVG = ({
  type,
  color,
}: {
  type: Shape["type"];
  color: string;
}) => {
  const shapes = {
    circle: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill={color} />
      </svg>
    ),
    triangle: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 90,90 10,90" fill={color} />
      </svg>
    ),
    square: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" fill={color} />
      </svg>
    ),
    hexagon: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill={color} />
      </svg>
    ),
  };

  return shapes[type];
};

export default ParallaxBackground;
