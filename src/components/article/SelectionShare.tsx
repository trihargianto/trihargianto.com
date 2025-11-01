import { useEffect, useRef, useState } from "react";

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  text: string;
  selectedId?: string;
  copied?: boolean;
};

type StoredHighlight = {
  id: string;
  text: string;
};

const STORAGE_KEY = "trihargianto:article-highlights";

const loadHighlights = (): StoredHighlight[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item.id === "string" && typeof item.text === "string");
  } catch {
    return [];
  }
};

const persistHighlights = (highlights: StoredHighlight[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
};

const wrapSelection = (range: Range, id: string) => {
  const mark = document.createElement("mark");
  mark.className = "article-highlight";
  mark.dataset.highlightId = id;
  try {
    range.surroundContents(mark);
  } catch {
    return null;
  }
  return mark;
};

const applyPersistedHighlight = (container: Element, highlight: StoredHighlight) => {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const needle = highlight.text;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const index = node.data.indexOf(needle);
    if (index !== -1) {
      const range = document.createRange();
      range.setStart(node, index);
      range.setEnd(node, index + needle.length);
      const mark = wrapSelection(range, highlight.id);
      if (mark) {
        mark.dataset.persisted = "true";
        return true;
      }
    }
  }
  return false;
};

const removeHighlightById = (container: Element, id: string) => {
  const mark = container.querySelector(`mark[data-highlight-id="${id}"]`);
  if (!mark || !mark.parentNode) return;
  const parent = mark.parentNode;
  while (mark.firstChild) {
    parent.insertBefore(mark.firstChild, mark);
  }
  parent.removeChild(mark);
};

const SelectionShare = ({ selector = ".article-prose", shareUrl }: { selector?: string; shareUrl: string }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, text: "" });
  const [highlights, setHighlights] = useState<StoredHighlight[]>([]);
  const containerRef = useRef<Element | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return;
    containerRef.current = container;

    const stored = loadHighlights();
    const applied: StoredHighlight[] = [];
    stored.forEach((highlight) => {
      if (applyPersistedHighlight(container, highlight)) {
        applied.push(highlight);
      }
    });
    if (applied.length) {
      setHighlights(applied);
    }
  }, [selector]);

  useEffect(() => {
    persistHighlights(highlights);
  }, [highlights]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setTooltip({ visible: false, x: 0, y: 0, text: "" });
        return;
      }

      const range = selection.getRangeAt(0).cloneRange();
      const container = containerRef.current;
      if (!container || !container.contains(range.commonAncestorContainer)) {
        setTooltip({ visible: false, x: 0, y: 0, text: "" });
        return;
      }

      const selectedText = selection.toString().trim();
      if (!selectedText) {
        setTooltip({ visible: false, x: 0, y: 0, text: "" });
        return;
      }

      const rect = range.getBoundingClientRect();
      const scrollY = window.scrollY;
      const top = rect.top + scrollY;
      const centerX = rect.left + rect.width / 2;
      const mark = range.commonAncestorContainer instanceof Element
        ? range.commonAncestorContainer.closest("mark[data-highlight-id]")
        : range.startContainer.parentElement?.closest("mark[data-highlight-id]");

      setTooltip({
        visible: true,
        x: centerX,
        y: top,
        text: selectedText,
        selectedId: mark?.getAttribute("data-highlight-id") ?? undefined,
      });
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("scroll", handleSelectionChange, { passive: true });

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("scroll", handleSelectionChange);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!tooltip.visible) return;
      if (tooltipRef.current?.contains(event.target as Node)) return;
      setTooltip({ visible: false, x: 0, y: 0, text: "" });
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("touchstart", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("touchstart", handlePointerDown);
    };
  }, [tooltip.visible]);

  const copySelection = async () => {
    if (!tooltip.text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tooltip.text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = tooltip.text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setTooltip((prev) => ({ ...prev, copied: true }));
      window.setTimeout(() => {
        setTooltip((prev) => ({ ...prev, copied: false }));
      }, 1800);
    } catch {
      // Ignore
    }
  };

  const shareToTwitter = () => {
    if (!tooltip.text) return;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${tooltip.text}`)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, "_blank", "noopener");
  };

  const highlightSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    if (!containerRef.current?.contains(range.commonAncestorContainer)) return;

    const id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `highlight-${Date.now()}`;
    const mark = wrapSelection(range, id);
    if (!mark) {
      selection.removeAllRanges();
      setTooltip({ visible: false, x: 0, y: 0, text: "" });
      return;
    }
    selection.removeAllRanges();
    const newHighlight = { id, text: tooltip.text };
    setHighlights((prev) => [...prev, newHighlight]);
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  const removeHighlight = () => {
    if (!tooltip.selectedId || !containerRef.current) return;
    removeHighlightById(containerRef.current, tooltip.selectedId);
    setHighlights((prev) => prev.filter((item) => item.id !== tooltip.selectedId));
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  if (!tooltip.visible || !tooltip.text) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className="selection-tooltip fixed z-50 flex -translate-x-1/2 -translate-y-full flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/95 px-3 py-2 text-xs font-medium text-slate-600 shadow-2xl ring-1 ring-slate-200/50 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95 dark:text-slate-200"
      style={{ top: tooltip.y - 12, left: tooltip.x }}
    >
      {tooltip.copied && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
          Copied
        </span>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={shareToTwitter}
          className="flex items-center gap-1 rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800/60"
        >
          <span aria-hidden>𝕏</span>
          Share
        </button>
        <button
          type="button"
          onClick={copySelection}
          className="flex items-center gap-1 rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800/60"
        >
          <span aria-hidden>📋</span>
          Copy
        </button>
        {tooltip.selectedId ? (
          <button
            type="button"
            onClick={removeHighlight}
            className="flex items-center gap-1 rounded-full px-3 py-1 transition hover:bg-rose-100 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
          >
            <span aria-hidden>✕</span>
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={highlightSelection}
            className="flex items-center gap-1 rounded-full px-3 py-1 transition hover:bg-amber-100 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:hover:bg-amber-500/20 dark:hover:text-amber-200"
          >
            <span aria-hidden>✨</span>
            Highlight
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectionShare;
