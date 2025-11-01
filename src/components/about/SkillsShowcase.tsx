import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as OutlineIcons from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { SkillCategory } from "../../constants/about";

type Props = {
  categories: SkillCategory[];
};

type IconKey = keyof typeof OutlineIcons;

const SkillsShowcase: React.FC<Props> = ({ categories }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? "",
  );

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId),
    [categories, activeCategoryId],
  );

  return (
    <section className="mt-24 space-y-10 rounded-3xl border border-slate-200 bg-slate-50/90 p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-12">
      <div className="space-y-4 text-balance">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
          Skills & Expertise
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100 sm:text-4xl">
          What I bring to teams that care about velocity and craft.
        </h2>
        <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
          These aren’t bullet points on a resume. They’re battle-tested
          strengths forged in production incidents, ambitious roadmaps, and
          plenty of demos where the Wi-Fi dropped.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={clsx(
              "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
              activeCategoryId === category.id
                ? "border-sky-500/70 bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                : "border-transparent bg-slate-200/70 text-slate-600 hover:border-sky-400/50 hover:text-slate-900 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-white",
            )}
            onClick={() => setActiveCategoryId(category.id)}
            aria-pressed={activeCategoryId === category.id}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-500">
              {category.skills.length}
            </span>
            {category.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeCategory ? (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -16 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {activeCategory.skills.map((skill) => {
              const Icon =
                OutlineIcons[(skill.icon as IconKey) ?? "SparklesIcon"] ??
                OutlineIcons.SparklesIcon;

              return (
                <motion.article
                  key={skill.id}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm transition hover:border-sky-400/60 hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:bg-slate-900/90"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-sky-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-500 group-hover:border-sky-500">
                      {skill.experience}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.tagline}
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {skill.highlight}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default SkillsShowcase;
