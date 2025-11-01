import { useEffect, useMemo, useRef, useState } from "react";
import type { MarkdownHeading } from "astro";
import clsx from "clsx";

import { NAVBAR_HEIGHT_ESTIMATION_IN_PX } from "../constants/config";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useActiveSection } from "../hooks/useActiveSection";

type TableOfContentsProps = {
  headings: MarkdownHeading[];
  onClickTocItem?: () => void;
};

type StructuredHeading = {
  slug: string;
  text: string;
  depth: number;
  children: StructuredHeading[];
};

type SectionMeasurement = {
  slug: string;
  start: number;
  end: number;
};

const WORDS_PER_MINUTE = 200;

const buildStructure = (headings: MarkdownHeading[]): StructuredHeading[] => {
  const tree: StructuredHeading[] = [];
  let currentLevel2: StructuredHeading | null = null;
  let currentLevel3: StructuredHeading | null = null;

  headings.forEach((heading) => {
    if (heading.depth <= 2) {
      const node: StructuredHeading = {
        slug: heading.slug,
        text: heading.text,
        depth: 2,
        children: [],
      };
      tree.push(node);
      currentLevel2 = node;
      currentLevel3 = null;
    } else if (heading.depth === 3 && currentLevel2) {
      const node: StructuredHeading = {
        slug: heading.slug,
        text: heading.text,
        depth: 3,
        children: [],
      };
      currentLevel2.children.push(node);
      currentLevel3 = node;
    } else if (heading.depth >= 4 && currentLevel3) {
      currentLevel3.children.push({
        slug: heading.slug,
        text: heading.text,
        depth: 4,
        children: [],
      });
    }
  });

  return tree;
};

const formatMinutes = (minutes?: number) => {
  if (typeof minutes !== "number") return null;
  if (minutes < 1) return "<1 min";
  if (minutes === 1) return "1 min";
  return `${minutes} min`;
};

const TableOfContents = ({
  headings,
  onClickTocItem = () => null,
}: TableOfContentsProps) => {
  const { isTriggerVisible, scrollTop } = useScrollToTop();
  const sectionIds = useMemo(() => headings.map(({ slug }) => slug), [headings]);
  const activeSection = useActiveSection(sectionIds, NAVBAR_HEIGHT_ESTIMATION_IN_PX + 20);

  const structuredHeadings = useMemo(() => buildStructure(headings), [headings]);

  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [timeMap, setTimeMap] = useState<Record<string, number>>({});
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const sectionsRef = useRef<SectionMeasurement[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const article = document.querySelector(".article-prose");
    if (!article) return;

    const headingElements = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((element): element is HTMLElement => Boolean(element));

    const calculateSectionMeasurements = () => {
      sectionsRef.current = headingElements.map((element, index) => {
        const start = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_ESTIMATION_IN_PX;
        const next = headingElements[index + 1];
        const end = next
          ? next.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_ESTIMATION_IN_PX
          : article.getBoundingClientRect().bottom + window.scrollY;
        return {
          slug: element.id,
          start,
          end,
        };
      });
    };

    const calculateSectionTimes = () => {
      const timings: Record<string, number> = {};

      headingElements.forEach((element, index) => {
        const range = document.createRange();
        range.setStartAfter(element);

        const next = headingElements[index + 1];
        if (next) {
          range.setEndBefore(next);
        } else if (article.lastChild) {
          range.setEndAfter(article.lastChild);
        }

        const text = range.toString().trim();
        const words = text.length > 0 ? text.split(/\s+/).length : 0;
        const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
        timings[element.id] = minutes;
      });

      setTimeMap(timings);
    };

    const updateProgress = () => {
      const scrollPosition = window.scrollY + NAVBAR_HEIGHT_ESTIMATION_IN_PX + 8;
      const nextProgress: Record<string, number> = {};

      sectionsRef.current.forEach((section) => {
        const total = section.end - section.start;
        if (total <= 0) {
          nextProgress[section.slug] = 0;
          return;
        }
        const rawProgress = ((scrollPosition - section.start) / total) * 100;
        nextProgress[section.slug] = Math.min(100, Math.max(0, rawProgress));
      });

      setProgressMap(nextProgress);
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    calculateSectionMeasurements();
    calculateSectionTimes();
    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateSectionMeasurements);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateSectionMeasurements);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [headings]);

  const scrollToHeading = (slug: string) => {
    const element = document.getElementById(slug);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = NAVBAR_HEIGHT_ESTIMATION_IN_PX + 16;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleClickItem = (slug: string) => {
    scrollToHeading(slug);
    onClickTocItem();
  };

  const toggleSection = (slug: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <nav aria-label="Table of contents" className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Guide Navigation
          </p>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">On this page</h2>
        </div>
        {isTriggerVisible && (
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700/70 dark:text-slate-300"
          >
            <span aria-hidden>↑</span> Top
          </button>
        )}
      </header>

      <ul className="space-y-2">
        {structuredHeadings.map((section) => {
          const isActive = activeSection === section.slug;
          const sectionProgress = progressMap[section.slug] ?? 0;
          const sectionTime = timeMap[section.slug];
          const hasChildren = section.children.length > 0;
          const collapsed = collapsedSections[section.slug];

          return (
            <li key={section.slug} className="group rounded-2xl border border-transparent p-2 transition hover:border-slate-200 dark:hover:border-slate-700">
              <div className="flex flex-col gap-2 rounded-xl bg-white/40 px-3 py-2 dark:bg-slate-900/40">
                <div className="flex items-start gap-3">
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-label={collapsed ? "Expand section" : "Collapse section"}
                      onClick={() => toggleSection(section.slug)}
                      className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300/70 text-slate-400 transition hover:border-sky-300 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700/70 dark:text-slate-500"
                    >
                      <span
                        className={clsx("transition-transform duration-200", collapsed ? "rotate-0" : "rotate-90")}
                        aria-hidden
                      >
                        ▶
                      </span>
                    </button>
                  ) : (
                    <span className="mt-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden />
                  )}

                  <button
                    type="button"
                    onClick={() => handleClickItem(section.slug)}
                    className={clsx(
                      "flex-1 text-left text-sm font-semibold leading-snug transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      isActive
                        ? "text-sky-600 dark:text-sky-300"
                        : "text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {section.text}
                  </button>
                </div>

                <div className="flex items-center gap-3 pl-9">
                  <div className="relative h-1 flex-1 rounded-full bg-slate-200/70 dark:bg-slate-800/70">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 transition-all duration-200 ease-out"
                      style={{ width: `${sectionProgress}%` }}
                      aria-hidden
                    />
                  </div>
                  {formatMinutes(sectionTime) && (
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {formatMinutes(sectionTime)}
                    </span>
                  )}
                </div>
              </div>

              {hasChildren && !collapsed && (
                <ul className="mt-2 space-y-1 border-l border-slate-200/70 pl-6 dark:border-slate-800">
                  {section.children.map((child) => {
                    const childActive = activeSection === child.slug;
                    const childProgress = progressMap[child.slug] ?? 0;
                    const childTime = timeMap[child.slug];

                    return (
                      <li key={child.slug}>
                        <button
                          type="button"
                          onClick={() => handleClickItem(child.slug)}
                          className={clsx(
                            "flex w-full items-center justify-between gap-4 rounded-lg px-2 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                            childActive
                              ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300"
                              : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60",
                          )}
                          aria-current={childActive ? "true" : undefined}
                        >
                          <span className="flex-1 text-left">{child.text}</span>
                          <span className="flex items-center gap-3 text-xs">
                            {formatMinutes(childTime) && (
                              <span className="text-slate-400 dark:text-slate-500">
                                {formatMinutes(childTime)}
                              </span>
                            )}
                            <span className="relative h-1.5 w-20 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/70">
                              <span
                                className="absolute inset-0 rounded-full bg-sky-400/80 transition-all duration-200 ease-out"
                                style={{ width: `${childProgress}%` }}
                                aria-hidden
                              />
                            </span>
                          </span>
                        </button>

                        {child.children.length > 0 && (
                          <ul className="mt-1 space-y-1 border-l border-dashed border-slate-200/70 pl-4 dark:border-slate-700">
                            {child.children.map((grandChild) => {
                              const grandActive = activeSection === grandChild.slug;
                              const grandProgress = progressMap[grandChild.slug] ?? 0;

                              return (
                                <li key={grandChild.slug}>
                                  <button
                                    type="button"
                                    onClick={() => handleClickItem(grandChild.slug)}
                                    className={clsx(
                                      "flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                                      grandActive
                                        ? "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300"
                                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60",
                                    )}
                                    aria-current={grandActive ? "true" : undefined}
                                  >
                                    <span className="flex-1 text-left">{grandChild.text}</span>
                                    <span className="relative h-1 w-12 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800/70">
                                      <span
                                        className="absolute inset-0 rounded-full bg-sky-400/80 transition-all duration-200 ease-out"
                                        style={{ width: `${grandProgress}%` }}
                                        aria-hidden
                                      />
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
