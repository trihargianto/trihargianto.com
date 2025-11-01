import { useState } from "react";
import { motion } from "framer-motion";
import * as OutlineIcons from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { JourneyMilestone } from "../../constants/about";

type Props = {
  milestones: JourneyMilestone[];
};

type IconKey = keyof typeof OutlineIcons;

const JourneyTimeline: React.FC<Props> = ({ milestones }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    milestones[0]?.id ?? null,
  );

  return (
    <section
      id="journey"
      className="relative mt-24 space-y-10 rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-12"
    >
      <div className="space-y-4 text-balance">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
          Origin Story
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100 sm:text-4xl">
          The moments that shaped how I build teams and products.
        </h2>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          From glitter gifs to global-scale deployments, each chapter sharpened
          a different superpower: performance empathy, tooling obsession, and a
          love for mentoring people into their best work.
        </p>
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-0 hidden h-full w-0.5 bg-gradient-to-b from-sky-500/40 via-slate-300 to-transparent dark:via-slate-700 lg:block" />
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const Icon =
              OutlineIcons[(milestone.icon as IconKey) ?? "SparklesIcon"] ??
              OutlineIcons.SparklesIcon;
            const isExpanded = expandedId === milestone.id;
            return (
              <motion.article
                key={milestone.id}
                initial={{ opacity: 0, translateY: 32 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="relative flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-sm transition hover:border-sky-400/60 hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 lg:flex-row lg:items-start"
              >
                <div className="flex items-start gap-4 lg:w-64 lg:flex-none">
                  <div className="relative hidden items-center justify-center lg:flex">
                    <span className="absolute left-1/2 top-12 h-full w-px -translate-x-1/2 bg-gradient-to-b from-slate-300 via-slate-200 to-transparent dark:from-slate-700 dark:via-slate-800" />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10">
                      <Icon className="h-6 w-6 text-sky-500" aria-hidden />
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                      {milestone.year}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
                      {milestone.headline}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    {milestone.story}
                  </p>
                  <motion.div
                    id={`${milestone.id}-detail`}
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? "0.5rem" : "0rem",
                    }}
                    className="overflow-hidden text-sm text-slate-500 dark:text-slate-400"
                  >
                    <p>{milestone.detail}</p>
                  </motion.div>
                  <div className="pt-1">
                    <button
                      type="button"
                      className={clsx(
                        "inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-400",
                      )}
                      onClick={() =>
                        setExpandedId(isExpanded ? null : milestone.id)
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`${milestone.id}-detail`}
                    >
                      {isExpanded ? "Hide details" : "Tell me more"}
                      <OutlineIcons.ChevronDownIcon
                        className={clsx(
                          "h-4 w-4 transition",
                          isExpanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
