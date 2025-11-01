import { useEffect, useRef, useState } from "react";

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook that uses Intersection Observer API to detect when an element
 * enters the viewport and triggers reveal animations.
 *
 * @param options - Configuration options for the Intersection Observer
 * @returns A tuple containing [ref, isVisible] - attach ref to the element you want to observe
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const {
    threshold = 0.2, // 20% of element visible before triggering
    rootMargin = "0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // If triggerOnce is true, disconnect observer after first trigger
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Only reset visibility if triggerOnce is false
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible] as const;
}
