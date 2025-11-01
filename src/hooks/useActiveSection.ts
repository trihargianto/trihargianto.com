import { useEffect, useState } from "react";

/**
 * Hook to detect which section is currently active based on scroll position.
 * Useful for highlighting active navigation links.
 *
 * @param sectionIds - Array of section IDs to track
 * @param offset - Offset from top in pixels (default: 100)
 * @returns The ID of the currently active section
 */
export function useActiveSection(
  sectionIds: string[],
  offset: number = 100,
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      // Get all sections
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          return {
            id,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
          };
        })
        .filter(Boolean) as Array<{
        id: string;
        top: number;
        bottom: number;
        height: number;
      }>;

      // Find the section that is currently in view
      // A section is considered active if its top is within the offset from the viewport top
      const active = sections.find((section) => {
        return section.top <= offset && section.bottom > offset;
      });

      if (active) {
        setActiveSection(active.id);
      } else {
        // If no section is in the offset range, check if we're at the top or bottom
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop === 0 && sections.length > 0) {
          // At the top of the page
          setActiveSection(sections[0].id);
        } else if (scrollTop + clientHeight >= scrollHeight - 10) {
          // At the bottom of the page
          setActiveSection(sections[sections.length - 1].id);
        }
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
