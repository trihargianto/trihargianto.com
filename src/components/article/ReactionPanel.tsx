import { useEffect, useMemo, useState } from "react";

type ReactionType = "applause" | "love" | "fire" | "idea" | "think" | "party";

type ReactionConfig = {
  id: ReactionType;
  emoji: string;
  label: string;
  color: string;
};

const REACTIONS: ReactionConfig[] = [
  { id: "applause", emoji: "👍", label: "Helpful", color: "text-sky-500" },
  { id: "love", emoji: "❤️", label: "Loved", color: "text-rose-500" },
  { id: "fire", emoji: "🔥", label: "Spicy", color: "text-orange-500" },
  { id: "idea", emoji: "💡", label: "Insightful", color: "text-amber-500" },
  { id: "think", emoji: "🤔", label: "Thoughtful", color: "text-indigo-500" },
  { id: "party", emoji: "🎉", label: "Worth sharing", color: "text-emerald-500" },
];

type ReactionState = Record<ReactionType, number>;

const defaultCounts: ReactionState = {
  applause: 0,
  love: 0,
  fire: 0,
  idea: 0,
  think: 0,
  party: 0,
};

const getCountsKey = (slug: string) => `trihargianto:reactions:${slug}`;
const getUserKey = (slug: string) => `trihargianto:reactions:${slug}:user`;

const loadCounts = (slug: string): ReactionState => {
  if (typeof window === "undefined") return defaultCounts;
  try {
    const raw = window.localStorage.getItem(getCountsKey(slug));
    if (!raw) return defaultCounts;
    const parsed = JSON.parse(raw) as Partial<ReactionState>;
    return { ...defaultCounts, ...parsed };
  } catch {
    return defaultCounts;
  }
};

const loadUserReactions = (slug: string): ReactionType[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(getUserKey(slug));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const ReactionPanel = ({ slug }: { slug: string }) => {
  const [counts, setCounts] = useState<ReactionState>(() => loadCounts(slug));
  const [userReactions, setUserReactions] = useState<ReactionType[]>(() => loadUserReactions(slug));

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(getCountsKey(slug), JSON.stringify(counts));
  }, [counts, slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(getUserKey(slug), JSON.stringify(userReactions));
  }, [userReactions, slug]);

  const total = useMemo(() => Object.values(counts).reduce((sum, value) => sum + value, 0), [counts]);

  const toggleReaction = (reaction: ReactionType) => {
    setCounts((prev) => {
      const next = { ...prev };
      if (userReactions.includes(reaction)) {
        next[reaction] = Math.max(0, next[reaction] - 1);
      } else {
        next[reaction] = next[reaction] + 1;
      }
      return next;
    });
    setUserReactions((prev) => {
      if (prev.includes(reaction)) {
        return prev.filter((item) => item !== reaction);
      }
      const next = [...prev, reaction];
      if (window.navigator?.vibrate) {
        window.navigator.vibrate(20);
      }
      return next;
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-7 shadow-xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Reactions
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            How did this article land?
          </h3>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {total} {total === 1 ? "reaction" : "reactions"}
        </span>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {REACTIONS.map((reaction) => {
          const active = userReactions.includes(reaction.id);
          const count = counts[reaction.id];
          return (
            <button
              key={reaction.id}
              type="button"
              onClick={() => toggleReaction(reaction.id)}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                active
                  ? "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-500/60 dark:bg-sky-500/10 dark:text-sky-200"
                  : "border-slate-200/70 bg-white hover:border-sky-200 hover:bg-sky-50/60 dark:border-slate-800/70 dark:bg-slate-900/70 dark:hover:border-sky-500/40"
              }`}
            >
              <span className={`text-2xl transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-110"}`} aria-hidden>
                {reaction.emoji}
              </span>
              <div className="flex flex-1 items-baseline justify-between gap-4">
                <span className={`text-sm font-semibold ${active ? "text-sky-700 dark:text-sky-200" : "text-slate-600 dark:text-slate-300"}`}>
                  {reaction.label}
                </span>
                <span className={`text-xs font-semibold ${reaction.color}`}>
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ReactionPanel;
