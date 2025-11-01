import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Skill, SkillCategory } from "../constants/skills";

type SkillsSectionClientProps = {
  skills: Skill[];
};

type ConnectionLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const formatYears = (years: number) => {
  if (years < 1) {
    return "Less than a year";
  }

  return `${years}+ ${years === 1 ? "year" : "years"}`;
};

const categoryLabels: Record<SkillCategory | "All", string> = {
  All: "All",
  Frontend: "Frontend",
  Backend: "Backend",
  Tooling: "Tooling",
  Architecture: "Architecture",
  Leadership: "Leadership",
};

const skeletonArray = Array.from({ length: 6 }, (_, index) => index);

const SkillsSectionClient = ({ skills }: SkillsSectionClientProps) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [connectionLines, setConnectionLines] = useState<ConnectionLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const skillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const skillById = useMemo(() => {
    const map = new Map<string, Skill>();
    skills.forEach((skill) => {
      map.set(skill.id, skill);
    });
    return map;
  }, [skills]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<SkillCategory>();
    skills.forEach((skill) => {
      set.add(skill.category);
    });
    return ["All", ...Array.from(set.values())] as const;
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return skills.filter((skill) => {
      if (activeCategory !== "All" && skill.category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.summary.toLowerCase().includes(normalizedQuery) ||
        skill.level.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [skills, activeCategory, searchQuery]);

  useEffect(() => {
    if (
      hoveredSkillId &&
      !filteredSkills.some((skill) => skill.id === hoveredSkillId)
    ) {
      setHoveredSkillId(null);
    }
  }, [filteredSkills, hoveredSkillId]);

  const computeConnections = useCallback(() => {
    if (!hoveredSkillId) {
      setConnectionLines([]);
      return;
    }

    const container = containerRef.current;
    const originElement = skillRefs.current[hoveredSkillId];
    const hoveredSkill = skillById.get(hoveredSkillId);

    if (!container || !originElement || !hoveredSkill) {
      setConnectionLines([]);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const originRect = originElement.getBoundingClientRect();

    const visibleSkillIds = new Set(filteredSkills.map((skill) => skill.id));

    const lines =
      hoveredSkill.relatedIds
        ?.filter((relatedId) => visibleSkillIds.has(relatedId))
        .map((relatedId) => {
          const targetElement = skillRefs.current[relatedId];

          if (!targetElement) {
            return null;
          }

          const targetRect = targetElement.getBoundingClientRect();

          return {
            id: `${hoveredSkillId}-${relatedId}`,
            x1: originRect.left + originRect.width / 2 - containerRect.left,
            y1: originRect.top + originRect.height / 2 - containerRect.top,
            x2: targetRect.left + targetRect.width / 2 - containerRect.left,
            y2: targetRect.top + targetRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean) ?? [];

    setConnectionLines(lines as ConnectionLine[]);
  }, [filteredSkills, hoveredSkillId, skillById]);

  useEffect(() => {
    computeConnections();
  }, [computeConnections]);

  useEffect(() => {
    window.addEventListener("resize", computeConnections);
    return () => {
      window.removeEventListener("resize", computeConnections);
    };
  }, [computeConnections]);

  const handleCategoryChange = (category: SkillCategory | "All") => {
    setActiveCategory(category);
  };

  return (
    <section className="relative">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Core Skills & Tooling</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Explore the stack I use to ship fast, reliable experiences.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search skills…"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ⌘F
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={[
              "rounded-full border px-4 py-1 text-sm font-medium transition-colors duration-150",
              activeCategory === category
                ? "border-sky-500 bg-sky-500 text-white dark:border-sky-400 dark:bg-sky-400"
                : "border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:text-sky-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-sky-500 dark:hover:text-sky-400",
            ].join(" ")}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative"
      >
        {hoveredSkillId && connectionLines.length > 0 ? (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="skill-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            {connectionLines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#skill-line)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            ))}
          </svg>
        ) : null}

        <div
          className={[
            "relative grid gap-6 transition-[grid-template-columns] duration-[250ms] ease-in-out",
            "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
          ].join(" ")}
        >
          {isLoading
            ? skeletonArray.map((key) => (
                <div
                  key={key}
                  className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white/60 dark:border-gray-800 dark:bg-gray-900/60"
                >
                  <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
                </div>
              ))
            : filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  ref={(element) => {
                    skillRefs.current[skill.id] = element;
                  }}
                  onMouseEnter={() => {
                    setHoveredSkillId(skill.id);
                  }}
                  onFocus={() => {
                    setHoveredSkillId(skill.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredSkillId((previous) =>
                      previous === skill.id ? null : previous,
                    );
                  }}
                  onBlur={() => {
                    setHoveredSkillId((previous) =>
                      previous === skill.id ? null : previous,
                    );
                  }}
                  className={[
                    "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-[250ms] ease-in-out hover:-translate-y-1 hover:border-sky-400 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-500/80",
                    hoveredSkillId === skill.id
                      ? "ring-2 ring-sky-400/70 dark:ring-sky-500/60"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wide text-sky-500 dark:text-sky-400">
                      {skill.category}
                    </span>
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700 shadow-sm transition duration-[250ms] ease-in-out group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-900/40 dark:text-sky-300 dark:group-hover:bg-sky-500">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 transition-opacity duration-[250ms] ease-in-out group-hover:opacity-0 dark:text-gray-300">
                    {skill.summary}
                  </p>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full rounded-b-2xl bg-sky-50/95 px-6 py-4 text-sm text-sky-700 opacity-0 transition-all duration-[250ms] ease-in-out group-hover:translate-y-0 group-hover:opacity-100 dark:bg-sky-900/90 dark:text-sky-200">
                    <p className="font-medium">{formatYears(skill.experienceYears)}</p>
                    <p className="text-xs text-sky-600/80 dark:text-sky-200/80">
                      Proven track record: {skill.level} • {skill.category}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {!isLoading && filteredSkills.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
            No skills match your filters yet. Try broadening the search or
            switching categories.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SkillsSectionClient;

