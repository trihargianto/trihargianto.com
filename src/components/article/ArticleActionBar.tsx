import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NAVBAR_HEIGHT_ESTIMATION_IN_PX } from "../../constants/config";

type ArticleActionBarProps = {
  slug: string;
  title: string;
  shareUrl: string;
  readingMinutes: number;
};

const STORAGE_KEYS = {
  bookmarks: "trihargianto:bookmarks",
  fontScale: "trihargianto:article-font-scale",
  readingMode: "trihargianto:article-reading-mode",
};

const MIN_FONT_SCALE = 0.9;
const MAX_FONT_SCALE = 1.3;
const FONT_STEP = 0.05;

const getStoredBookmarks = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.bookmarks);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const persistBookmarks = (bookmarks: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const formatMinutesRemaining = (minutes: number) => {
  if (minutes <= 0.75) {
    return "< 1 min left";
  }
  if (minutes < 1.5) {
    return "1 min left";
  }
  return `${Math.max(Math.round(minutes), 1)} min left`;
};

const ActionIcon = ({ symbol, label }: { symbol: string; label: string }) => (
  <span aria-hidden className="text-xl leading-none">
    {symbol}
    <span className="sr-only">{label}</span>
  </span>
);

const ActionButton = ({
  onClick,
  label,
  symbol,
  active = false,
}: {
  onClick: () => void;
  label: string;
  symbol: string;
  active?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/80 p-3 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-sky-500/60 dark:hover:text-sky-300 ${active ? "border-sky-400 text-sky-600 dark:border-sky-500 dark:text-sky-300" : ""}`}
    title={label}
  >
    <ActionIcon symbol={symbol} label={label} />
    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-700">
      {label}
    </span>
  </button>
);

const MobileActionButton = ({
  onClick,
  label,
  symbol,
  active = false,
}: {
  onClick: () => void;
  label: string;
  symbol: string;
  active?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-200 dark:hover:text-sky-300 ${active ? "text-sky-600 dark:text-sky-300" : ""}`}
    aria-label={label}
  >
    <span className="text-xl">{symbol}</span>
    <span>{label}</span>
  </button>
);

const SharePopover = ({
  open,
  onClose,
  shareUrl,
  title,
  variant = "desktop",
}: {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
  variant?: "desktop" | "mobile";
}) => {
  const shareLinks = useMemo(
    () => [
      {
        label: "Copy link",
        action: async () => {
          await navigator.clipboard.writeText(shareUrl);
        },
        icon: "🔗",
      },
      {
        label: "Share on X",
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
        icon: "𝕏",
      },
      {
        label: "Share on LinkedIn",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
        icon: "in",
      },
      {
        label: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        icon: "f",
      },
      {
        label: "Share on Reddit",
        href: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
        icon: "👽",
      },
    ],
    [shareUrl, title],
  );

  if (!open) return null;

  const handleClick = async (item: (typeof shareLinks)[number]) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener");
    } else if (item.action) {
      await item.action();
    }
    onClose();
  };

  if (variant === "mobile") {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[45] flex items-end justify-center bg-slate-900/50 px-4 pb-6 pt-20 backdrop-blur-sm xl:hidden"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/95 p-4 shadow-2xl ring-1 ring-slate-200/70 dark:border-slate-700/70 dark:bg-slate-900/95 dark:ring-slate-800/70">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Share this article
            </h4>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800"
            >
              <span aria-hidden>✕</span>
              <span className="sr-only">Close share options</span>
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {shareLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => void handleClick(item)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/70 px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-300"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      className="hidden xl:block absolute left-full top-1/2 ml-4 w-56 -translate-y-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-xl ring-1 ring-slate-200/60 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/95 dark:ring-slate-800/60"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Share
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800"
        >
          <span aria-hidden>✕</span>
          <span className="sr-only">Close share options</span>
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {shareLinks.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => void handleClick(item)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-300"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export function ArticleActionBar({
  slug,
  title,
  shareUrl,
  readingMinutes,
}: ArticleActionBarProps) {
  const [visible, setVisible] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(readingMinutes);
  const shareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedScale = Number(localStorage.getItem(STORAGE_KEYS.fontScale));
    if (storedScale && !Number.isNaN(storedScale)) {
      setFontScale(clamp(storedScale, MIN_FONT_SCALE, MAX_FONT_SCALE));
    }
    const savedBookmarks = getStoredBookmarks();
    setBookmarked(savedBookmarks.includes(slug));
    const storedReadingMode = localStorage.getItem(STORAGE_KEYS.readingMode);
    if (storedReadingMode === "true") {
      setReadingMode(true);
    }
  }, [slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.style.setProperty(
      "--article-font-scale",
      fontScale.toString(),
    );
    localStorage.setItem(STORAGE_KEYS.fontScale, fontScale.toString());
  }, [fontScale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (readingMode) {
      document.body.dataset.readingMode = "true";
    } else {
      delete document.body.dataset.readingMode;
    }
    localStorage.setItem(STORAGE_KEYS.readingMode, readingMode ? "true" : "false");
  }, [readingMode]);

  useEffect(() => {
    if (!shareOpen || typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1280px)");
    if (!mq.matches) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (!shareRef.current) return;
      if (
        event.target instanceof Node &&
        !shareRef.current.contains(event.target)
      ) {
        setShareOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [shareOpen]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.key === "r" || event.key === "R") {
        setReadingMode((prev) => !prev);
      }
      if (event.key === "+") {
        setFontScale((prev) => clamp(prev + FONT_STEP, MIN_FONT_SCALE, MAX_FONT_SCALE));
      }
      if (event.key === "-") {
        setFontScale((prev) => clamp(prev - FONT_STEP, MIN_FONT_SCALE, MAX_FONT_SCALE));
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const article = document.querySelector(".article-prose");
    if (!article) return;

    const computeRemaining = () => {
      const rect = article.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable <= 0) {
        setMinutesLeft(0);
        return;
      }
      const documentOffset = window.scrollY + rect.top;
      const scrolled = Math.min(
        Math.max(
          window.scrollY - (documentOffset - NAVBAR_HEIGHT_ESTIMATION_IN_PX),
          0,
        ),
        totalScrollable,
      );
      const progress = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      const remaining = readingMinutes * (1 - progress);
      setMinutesLeft(Math.max(remaining, 0));
    };

    computeRemaining();
    window.addEventListener("scroll", computeRemaining, { passive: true });
    window.addEventListener("resize", computeRemaining);

    return () => {
      window.removeEventListener("scroll", computeRemaining);
      window.removeEventListener("resize", computeRemaining);
    };
  }, [readingMinutes]);

  const toggleBookmark = useCallback(() => {
    const bookmarks = getStoredBookmarks();
    if (bookmarks.includes(slug)) {
      const next = bookmarks.filter((item) => item !== slug);
      persistBookmarks(next);
      setBookmarked(false);
    } else {
      const next = [...new Set([...bookmarks, slug])];
      persistBookmarks(next);
      setBookmarked(true);
    }
  }, [slug, bookmarked]);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // Fallback to popover below.
      }
    }
    setShareOpen((prev) => !prev);
  }, [shareUrl, title]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const decreaseFont = useCallback(() => {
    setFontScale((prev) => clamp(prev - FONT_STEP, MIN_FONT_SCALE, MAX_FONT_SCALE));
  }, []);

  const increaseFont = useCallback(() => {
    setFontScale((prev) => clamp(prev + FONT_STEP, MIN_FONT_SCALE, MAX_FONT_SCALE));
  }, []);

  const toggleReadingMode = useCallback(() => {
    setReadingMode((prev) => !prev);
  }, []);

  return (
    <>
      <div
        className={`article-action-bar article-action-bar--desktop fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 ease-out xl:flex ${
          visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0 pointer-events-none"
        }`}
      >
        <div className="rounded-full bg-white/90 p-2 shadow-2xl ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/80 dark:ring-slate-800/80">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
              <span>Reading</span>
              <span>{formatMinutesRemaining(minutesLeft)}</span>
            </div>
            <ActionButton onClick={toggleBookmark} label={bookmarked ? "Remove bookmark" : "Save for later"} symbol={bookmarked ? "💾" : "📌"} active={bookmarked} />
            <div className="relative" ref={shareRef}>
              <ActionButton onClick={handleShare} label="Share" symbol="📤" active={shareOpen} />
              <SharePopover open={shareOpen} onClose={() => setShareOpen(false)} shareUrl={shareUrl} title={title} />
            </div>
            <ActionButton onClick={toggleReadingMode} label="Toggle reading mode (R)" symbol="📖" active={readingMode} />
            <ActionButton onClick={handlePrint} label="Print article" symbol="🖨️" />
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200/70 bg-white/80 px-2 py-2 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200">
              <span className="uppercase tracking-wide">Text</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseFont}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:text-sky-300"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={increaseFont}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:text-sky-300"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`article-action-bar article-action-bar--mobile fixed inset-x-4 bottom-5 z-40 flex rounded-3xl bg-white/95 px-4 py-2 shadow-2xl ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-800/80 xl:hidden ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex w-full items-center justify-around gap-1">
          <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
            <span>Reading</span>
            <span>{formatMinutesRemaining(minutesLeft)}</span>
          </div>
          <MobileActionButton onClick={toggleBookmark} label={bookmarked ? "Saved" : "Save"} symbol={bookmarked ? "💾" : "📌"} active={bookmarked} />
          <MobileActionButton onClick={handleShare} label="Share" symbol="📤" />
          <MobileActionButton onClick={toggleReadingMode} label="Focus" symbol="📖" active={readingMode} />
          <MobileActionButton onClick={handlePrint} label="Print" symbol="🖨️" />
          <div className="flex flex-col items-center gap-1 rounded-2xl px-2 text-xs font-semibold text-slate-500 dark:text-slate-300">
            <span className="uppercase">Text</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={decreaseFont}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                A-
              </button>
              <button
                type="button"
                onClick={increaseFont}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>
      <SharePopover
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        title={title}
        variant="mobile"
      />
    </>
  );
}

export default ArticleActionBar;
