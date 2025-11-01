import { useState, useEffect, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import type { CollectionEntry } from "astro:content";

interface BlogSearchFilterProps {
  posts: Array<{
    post: CollectionEntry<"blog">;
    content: string;
    readingTime: number;
  }>;
  categories: string[];
  tags: string[];
  onFilterChange: (filteredPosts: typeof posts) => void;
}

type SortOption = "latest" | "oldest" | "title-asc" | "title-desc";
type DateRange = "all" | "week" | "month" | "year";
type ReadingTimeFilter = "all" | "short" | "medium" | "long";

export default function BlogSearchFilter({
  posts,
  categories,
  tags,
  onFilterChange,
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [readingTimeFilter, setReadingTimeFilter] =
    useState<ReadingTimeFilter>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: "post.data.title", weight: 2 },
        { name: "post.data.description", weight: 1.5 },
        { name: "post.data.tags", weight: 1 },
        { name: "post.data.category", weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, [posts]);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Search filter
    if (debouncedQuery.trim()) {
      const searchResults = fuse.search(debouncedQuery);
      result = searchResults.map((r) => r.item);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(
        (item) =>
          item.post.data.category &&
          selectedCategories.includes(item.post.data.category)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        item.post.data.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = Date.now();
      const ranges = {
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000,
      };

      result = result.filter((item) => {
        const postDate = item.post.data.pubDate.getTime();
        return now - postDate <= ranges[dateRange];
      });
    }

    // Reading time filter
    if (readingTimeFilter !== "all") {
      const filters = {
        short: (time: number) => time <= 5,
        medium: (time: number) => time > 5 && time <= 10,
        long: (time: number) => time > 10,
      };

      result = result.filter((item) =>
        filters[readingTimeFilter](item.readingTime)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime()
          );
        case "oldest":
          return (
            a.post.data.pubDate.getTime() - b.post.data.pubDate.getTime()
          );
        case "title-asc":
          return a.post.data.title.localeCompare(b.post.data.title);
        case "title-desc":
          return b.post.data.title.localeCompare(a.post.data.title);
        default:
          return 0;
      }
    });

    return result;
  }, [
    posts,
    debouncedQuery,
    selectedCategories,
    selectedTags,
    dateRange,
    readingTimeFilter,
    sortBy,
    fuse,
  ]);

  // Notify parent component of filtered posts
  useEffect(() => {
    onFilterChange(filteredPosts);
  }, [filteredPosts, onFilterChange]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
    setDateRange("all");
    setReadingTimeFilter("all");
    setSortBy("latest");
  }, []);

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedTags.length > 0 ||
    dateRange !== "all" ||
    readingTimeFilter !== "all" ||
    sortBy !== "latest";

  return (
    <div className="blog-search-filter mb-6">
      {/* Search Bar */}
      <div className="relative mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all text-sm"
            aria-label="Search blog posts"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="w-full flex items-center justify-between px-4 py-2 mb-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
        aria-expanded={isFilterOpen}
        aria-label="Toggle filters"
      >
        <span className="font-medium">
          {isFilterOpen ? "Hide" : "Show"} Filters & Sort
          {hasActiveFilters && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-sky-500 rounded-full">
              {[
                searchQuery && 1,
                selectedCategories.length,
                selectedTags.length,
                dateRange !== "all" && 1,
                readingTimeFilter !== "all" && 1,
                sortBy !== "latest" && 1,
              ]
                .filter(Boolean)
                .reduce((a, b) => Number(a) + Number(b), 0)}
            </span>
          )}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Filters Section */}
      <div className={`${isFilterOpen ? "block" : "hidden"} space-y-3`}>
        {/* Results and Clear */}
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort and Date Range in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Sort */}
          <div>
            <label
              htmlFor="sort-select"
              className="block text-xs font-semibold text-gray-900 dark:text-white mb-1"
            >
              Sort
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
              Published
            </label>
            <div className="flex flex-wrap gap-1">
              {(["all", "week", "month", "year"] as DateRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    dateRange === range
                      ? "bg-sky-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={dateRange === range}
                >
                  {range === "all"
                    ? "All"
                    : range === "week"
                      ? "Week"
                      : range === "month"
                        ? "Month"
                        : "Year"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reading Time */}
        <div>
          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
            Reading time
          </label>
          <div className="flex flex-wrap gap-1">
            {(
              [
                ["all", "All"],
                ["short", "<5m"],
                ["medium", "5-10m"],
                ["long", "10m+"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setReadingTimeFilter(value)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  readingTimeFilter === value
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={readingTimeFilter === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
              Categories
            </label>
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category]
                    );
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-sky-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={selectedCategories.includes(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTags((prev) =>
                      prev.includes(tag)
                        ? prev.filter((t) => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-sky-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={selectedTags.includes(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
