import { motion } from "framer-motion";
import type { ImpactMetric } from "../../constants/about";

type Props = {
  metrics: ImpactMetric[];
};

const ImpactMetrics: React.FC<Props> = ({ metrics }) => {
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return Math.round(value).toLocaleString();
    }

    if (!Number.isInteger(value)) {
      return value.toFixed(1);
    }

    return value.toString();
  };

  return (
    <section className="mt-24 space-y-10 rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900/85 sm:p-12">
      <div className="space-y-4 text-balance">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
          Impact Metrics
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100 sm:text-4xl">
          Proof that performance and developer experience change the scoreboard.
        </h2>
        <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">
          Every engagement ends with tangible wins: faster builds, happier teams,
          smoother user journeys. Numbers aren’t everything, but they help make
          the smile on a PM’s face stick.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric, index) => {
          const maxValue = Math.max(metric.before, metric.after, 1);
          const beforePercent =
            metric.before === 0 ? 4 : (metric.before / maxValue) * 100;
          const afterPercent =
            metric.after === 0 ? 4 : (metric.after / maxValue) * 100;

          return (
            <motion.article
              key={metric.id}
              initial={{ opacity: 0, translateY: 24 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col gap-5 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white/80 via-white to-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:from-slate-900/60 dark:via-slate-900/70 dark:to-slate-900/60"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {metric.metric}
                </p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {metric.description}
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Before</span>
                    <span>
                      {formatValue(metric.before)} {metric.unit}
                    </span>
                  </div>
                  <div className="mt-1 h-3 rounded-full bg-slate-200/70 dark:bg-slate-800">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${beforePercent}%` }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="block h-full rounded-full bg-slate-500/80 dark:bg-slate-600"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>After</span>
                    <span>
                      {formatValue(metric.after)} {metric.unit}
                    </span>
                  </div>
                  <div className="mt-1 h-3 rounded-full bg-slate-200/70 dark:bg-slate-800">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${afterPercent}%` }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="block h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default ImpactMetrics;
