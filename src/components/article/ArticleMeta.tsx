import { useEffect, useMemo, useState } from "react";
import type { AuthorProfile } from "../../constants/author";

type ArticleMetaProps = {
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
  formattedPublishedDate: string;
  relativePublishedDate: string;
  publishedISO: string;
  formattedUpdatedDate?: string | null;
  updatedISO?: string;
  readingTimeLabel: string;
  readingMinutes: number;
  wordCount: number;
  author: AuthorProfile;
};

const VIEW_KEY_PREFIX = "trihargianto:view-count::";

const CATEGORY_STYLE_MAP: Record<
  string,
  { bg: string; text: string; ring: string; icon: string }
> = {
  "Frontend Engineering": {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-600 dark:text-sky-300",
    ring: "ring-sky-200/60 dark:ring-sky-800/50",
    icon: "code",
  },
  Performance: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-300",
    ring: "ring-emerald-200/60 dark:ring-emerald-800/50",
    icon: "speed",
  },
  "Developer Experience": {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-300",
    ring: "ring-purple-200/60 dark:ring-purple-800/50",
    icon: "sparkles",
  },
  Leadership: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-200/60 dark:ring-amber-800/60",
    icon: "compass",
  },
  "Slow Productivity": {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-600 dark:text-rose-300",
    ring: "ring-rose-200/60 dark:ring-rose-800/60",
    icon: "heartbeat",
  },
  "Web Fundamentals": {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-600 dark:text-indigo-300",
    ring: "ring-indigo-200/60 dark:ring-indigo-800/60",
    icon: "layers",
  },
};

const ICONS: Record<string, JSX.Element> = {
  code: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18 3 12 9 6M15 6l6 6-6 6" />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 18.75 1.5-3.75 4.5-4.5 3.75 1.5M6 18.75h12A1.5 1.5 0 0 0 19.5 17.25V6.75A1.5 1.5 0 0 0 18 5.25H6A1.5 1.5 0 0 0 4.5 6.75v10.5A1.5 1.5 0 0 0 6 18.75Z"
      />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 1.5-3.5L12 12l1.5-3.5L15 12m-9 5.25-.75 1.5-.75-1.5-1.5-.75 1.5-.75.75-1.5.75 1.5 1.5.75-1.5.75ZM21 7.5l-.75 1.5-.75-1.5-1.5-.75 1.5-.75.75-1.5.75 1.5 1.5.75-1.5.75Z" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.5 6.75 7.88-2.256a.75.75 0 0 1 .926.926L17.05 13.5m-6.55-6.75-2.51 7.53m2.51-7.53 6.55 6.75m-9.06.78-2.256 7.88a.75.75 0 0 0 .926.926l7.88-2.256m-6.55-6.55 6.55 6.55"
      />
    </svg>
  ),
  heartbeat: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c-1.5-3-6-3-7.5 0L12 12l-1.5-3.75c-1.5-3-6-3-7.5 0S3 15.75 12 21c9-5.25 9-9.75 9-12.75Z"
      />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 9.75 5.25L21.75 12m-9.75 5.25V21M4.5 9.75l7.5 4.05 7.5-4.05M4.5 7.5l7.5 4.05 7.5-4.05L12 3.75 4.5 7.5Z"
      />
    </svg>
  ),
};

const socialIcon = (icon: AuthorProfile["socials"][number]["icon"]) => {
  switch (icon) {
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M19.633 3.998H23l-9.927 14.34L8.2 10.428 3 18.325h18l-1.367-4.723L23 3.998h-3.367z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.22 8h4.56v14H.22V8Zm7.5 0h4.37v1.91h.06c.61-1.15 2.1-2.37 4.33-2.37 4.63 0 5.48 3.04 5.48 6.99V22H17.6v-6.72c0-1.6-.03-3.66-2.36-3.66-2.36 0-2.72 1.74-2.72 3.54V22H7.72V8Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12 .5C5.65.5.5 5.56.5 11.82c0 5.01 3.29 9.25 7.86 10.76.58.11.79-.24.79-.55 0-.27-.01-1.16-.02-2.1-3.2.68-3.87-1.33-3.87-1.33-.53-1.32-1.3-1.67-1.3-1.67-1.06-.7.08-.68.08-.68 1.17.08 1.78 1.17 1.78 1.17 1.04 1.74 2.73 1.24 3.4.95.1-.74.4-1.24.72-1.53-2.56-.28-5.26-1.26-5.26-5.62 0-1.24.45-2.25 1.17-3.05-.12-.28-.51-1.41.11-2.94 0 0 .96-.3 3.15 1.16a10.86 10.86 0 0 1 5.74 0c2.18-1.46 3.13-1.16 3.13-1.16.62 1.53.23 2.66.11 2.94.73.8 1.17 1.81 1.17 3.05 0 4.38-2.71 5.33-5.29 5.61.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.66.79.55 4.57-1.52 7.86-5.76 7.86-10.76C23.5 5.56 18.35.5 12 .5Z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-9-9m0 0v9h9"
          />
        </svg>
      );
  }
};

const formatCount = (count: number) => {
  if (count < 1_000) return count.toString();
  if (count < 10_000) return `${(count / 1_000).toFixed(1)}K`;
  if (count < 1_000_000) return `${Math.round(count / 1_000)}K`;
  return `${(count / 1_000_000).toFixed(1)}M`;
};

const loadViewCount = (slug: string) => {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem(`${VIEW_KEY_PREFIX}${slug}`);
  return stored ? Number(stored) : 0;
};

const incrementViewCount = (slug: string) => {
  if (typeof window === "undefined") return 0;
  const current = loadViewCount(slug);
  const next = current + 1;
  localStorage.setItem(`${VIEW_KEY_PREFIX}${slug}`, next.toString());
  try {
    const channel = new BroadcastChannel("article-view-count");
    channel.postMessage({ slug, value: next });
    channel.close();
  } catch {
    // BroadcastChannel might not be supported; ignore.
  }
  return next;
};

const VIEW_CHANNEL =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("article-view-count")
    : null;

export function ArticleMeta({
  slug,
  title,
  category,
  tags = [],
  formattedPublishedDate,
  relativePublishedDate,
  publishedISO,
  formattedUpdatedDate,
  updatedISO,
  readingTimeLabel,
  readingMinutes,
  wordCount,
  author,
}: ArticleMetaProps) {
  const [viewCount, setViewCount] = useState(() => loadViewCount(slug));

  useEffect(() => {
    const newCount = incrementViewCount(slug);
    setViewCount(newCount);
  }, [slug]);

  useEffect(() => {
    if (!VIEW_CHANNEL) return;
    const handler = (event: MessageEvent<{ slug: string; value: number }>) => {
      if (event.data?.slug === slug) {
        setViewCount(event.data.value);
      }
    };
    VIEW_CHANNEL.addEventListener("message", handler);

    return () => {
      VIEW_CHANNEL.removeEventListener("message", handler);
    };
  }, [slug]);

  const categoryBadge = useMemo(() => {
    if (!category) return null;
    const palette = CATEGORY_STYLE_MAP[category] ?? {
      bg: "bg-slate-200/80 dark:bg-slate-800/70",
      text: "text-slate-700 dark:text-slate-300",
      ring: "ring-slate-300/70 dark:ring-slate-700/80",
      icon: "layers",
    };

    return (
      <a
        href={`/blog/category/${encodeURIComponent(category)}`}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ${palette.bg} ${palette.text} ${palette.ring} transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-2`}
      >
        <span className="inline-flex items-center justify-center rounded-full bg-white/60 dark:bg-white/10 h-6 w-6">
          {ICONS[palette.icon] ?? ICONS.layers}
        </span>
        <span>{category}</span>
      </a>
    );
  }, [category]);

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
      <div className="flex-1 space-y-6">
        <div className="flex flex-wrap items-center gap-3">{categoryBadge}</div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-600 dark:text-slate-300">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-800">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25V5.25m12 3V5.25M5.25 9.75h13.5m-14.25 9h15A1.5 1.5 0 0 0 21 17.25V6.75A1.5 1.5 0 0 0 19.5 5.25h-15A1.5 1.5 0 0 0 3 6.75v10.5A1.5 1.5 0 0 0 4.5 18.75Z" />
              </svg>
              <div className="flex flex-col">
                <time dateTime={publishedISO} className="font-semibold">
                  Published {formattedPublishedDate}
                </time>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {relativePublishedDate}
                </span>
              </div>
            </div>

            {formattedUpdatedDate && updatedISO && (
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-slate-600 shadow-sm ring-1 ring-amber-200/60 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/40">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-semibold">Updated {formattedUpdatedDate}</span>
                  <time dateTime={updatedISO} className="text-xs text-slate-500 dark:text-slate-400">
                    Keeps this guide fresh
                  </time>
                </div>
              </div>
            )}

            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-slate-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-800">
              <span className="text-lg" aria-hidden>
                ⏱️
              </span>
              <div className="flex flex-col">
                <span className="font-semibold">{readingTimeLabel}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {wordCount.toLocaleString()} words · {Math.max(readingMinutes, 1)} minute pace
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-slate-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:ring-slate-800">
              <span aria-hidden className="text-lg">
                👁️
              </span>
              <div className="flex flex-col">
                <span className="font-semibold">{formatCount(viewCount)} views</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Live counter</span>
              </div>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/70 px-3 py-1 text-sm font-medium text-slate-600 transition hover:border-sky-400 hover:text-sky-600 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-400"
                >
                  <span className="text-base transition group-hover:rotate-12">#</span>
                  <span className="capitalize">{tag.replace(/-/g, " ")}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="w-full max-w-md rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-200/70 backdrop-blur-lg dark:bg-slate-900/80 dark:ring-slate-800/60">
        <div className="flex items-center gap-4">
          <img
            src={author.avatar.src}
            width={84}
            height={84}
            className="h-20 w-20 flex-shrink-0 rounded-full border-4 border-white object-cover shadow dark:border-slate-800"
            alt={`${author.name} headshot`}
            loading="lazy"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <a
                href="/about"
                className="text-lg font-semibold text-slate-900 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
              >
                {author.name}
              </a>
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                Author
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{author.role}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {author.bio}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {author.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              className="group inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:text-sky-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-slate-400 transition group-hover:text-sky-500 dark:text-slate-400 dark:group-hover:text-sky-300">
                {socialIcon(social.icon)}
              </span>
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default ArticleMeta;
