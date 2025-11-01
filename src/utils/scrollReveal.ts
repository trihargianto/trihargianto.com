/**
 * Vanilla JavaScript scroll reveal utility for Astro components.
 * Uses Intersection Observer API to trigger animations when elements enter viewport.
 */

export interface ScrollRevealConfig {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
}

/**
 * Initialize scroll reveal animations for elements with data-animate attribute.
 * Call this function after DOM content is loaded.
 *
 * @example
 * <div data-animate="fadeInUp">Content</div>
 * <script>
 *   import { initScrollReveal } from '../utils/scrollReveal';
 *   initScrollReveal();
 * </script>
 */
export function initScrollReveal(config: ScrollRevealConfig = {}) {
  const {
    threshold = 0.2,
    rootMargin = "0px",
    staggerDelay = 100,
  } = config;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // If user prefers reduced motion, show all elements immediately
  if (prefersReducedMotion) {
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => {
      el.classList.add("animate-visible");
    });
    return;
  }

  // Get all elements with data-animate attribute
  const elements = document.querySelectorAll("[data-animate]");

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Check if element has stagger children
          const staggerChildren = element.getAttribute("data-stagger");

          if (staggerChildren === "true") {
            // Apply staggered animation to children
            const children = Array.from(element.children);
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-visible");
              }, index * staggerDelay);
            });
          }

          // Get custom delay if specified
          const customDelay = element.getAttribute("data-delay");
          const delay = customDelay ? parseInt(customDelay, 10) : 0;

          // Apply animation after delay
          setTimeout(() => {
            element.classList.add("animate-visible");
          }, delay);

          // Stop observing this element (trigger once)
          observer.unobserve(element);
        }
      });
    },
    {
      threshold,
      rootMargin,
    },
  );

  // Observe all elements
  elements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Manually trigger animation for a specific element.
 * Useful for dynamically added content.
 */
export function revealElement(element: HTMLElement, delay: number = 0) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    element.classList.add("animate-visible");
    return;
  }

  setTimeout(() => {
    element.classList.add("animate-visible");
  }, delay);
}
