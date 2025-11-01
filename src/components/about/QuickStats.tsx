import { useEffect, useMemo, useState } from "react";
import * as OutlineIcons from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { QuickStat } from "../../constants/about";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

type Props = {
  stats: QuickStat[];
};

type IconKey = keyof typeof OutlineIcons;

const StatIcon = ({ name }: { name: string }) => {
  const Icon =
    OutlineIcons[(name as IconKey) ?? "SparklesIcon"] ??
    OutlineIcons.SparklesIcon;
  return <Icon className="h-6 w-6 text-sky-400" aria-hidden="true" />;
};

const QuickStats: React.FC<Props> = ({ stats }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(
    () => stats.map(() => 0),
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (prefersReducedMotion) {
      setAnimatedValues(stats.map((stat) => stat.value));
      return;
    }

    let animationFrame = 0;
    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setAnimatedValues(
        stats.map((stat) => Math.round(stat.value * progress)),
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [inView, prefersReducedMotion, stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    const element = document.getElementById("quick-stats");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const formattedValues = useMemo(() => {
    return animatedValues.map((value, index) => {
      const stat = stats[index];

      if (!stat) {
        return value;
      }

      const baseValue =
        stat.suffix === "K" ? (value >= stat.value ? stat.value : value) : value;

      if (stat.suffix === "K") {
        return `${baseValue}${stat.suffix}`;
      }

      if (stat.suffix === "%") {
        return `${baseValue}${stat.suffix}`;
      }

      return `${baseValue}${stat.suffix ?? ""}`;
    });
  }, [animatedValues, stats]);

  return (
    <section
      id="quick-stats"
      className="relative isolate -mt-16 flex flex-col gap-6 rounded-3xl border border-slate-200/40 bg-white/80 p-6 shadow-xl backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/80 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-between sm:p-8"
    >
      <div className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-600" />
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className={clsx(
            "relative flex flex-1 min-w-[200px] flex-col gap-2 rounded-2xl border border-slate-200/40 bg-slate-50/80 p-5 shadow-sm transition hover:border-sky-400/60 hover:bg-white/100 dark:border-slate-700/50 dark:bg-slate-900/70 dark:hover:bg-slate-900/90",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10">
              <StatIcon name={stat.icon} />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>

          <p className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
            {stat.prefix ?? ""}
            {formattedValues[index]}
          </p>
          {stat.playfulCaption ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.playfulCaption}
            </p>
          ) : null}
        </div>
      ))}
    </section>
  );
};

export default QuickStats;
