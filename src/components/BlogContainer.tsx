import { useState, useCallback, useMemo } from "react";
import type { CollectionEntry } from "astro:content";
import BlogSearchFilter from "./BlogSearchFilter";
import BlogLayoutToggle from "./BlogLayoutToggle";
import BlogPostCardReact from "./BlogPostCardReact";
import { calculateReadingTime } from "../utils/readingTime";

interface BlogContainerProps {
  posts: CollectionEntry<"blog">[];
  postContents: Map<string, string>;
  featuredImages: Map<string, string>; // Map of post.id to image src
  defaultLayout?: "masonry" | "list";
}

type LayoutView = "masonry" | "list";

export default function BlogContainer({
  posts,
  postContents,
  featuredImages,
  defaultLayout = "masonry",
}: BlogContainerProps) {
  const [activeLayout, setActiveLayout] = useState<LayoutView>(defaultLayout);

  // Prepare posts with reading time
  const postsWithReadingTime = useMemo(() => {
    return posts.map((post) => {
      const content = postContents.get(post.id) || "";
      const { minutes } = calculateReadingTime(content);
      return {
        post,
        content,
        readingTime: minutes,
      };
    });
  }, [posts, postContents]);

  // Filtered posts from search/filter
  const [filteredPosts, setFilteredPosts] = useState(postsWithReadingTime);

  // Get all unique categories and tags
  const categories = useMemo(() => {
    return [
      ...new Set(
        posts
          .map((p) => p.data.category)
          .filter((c): c is string => c !== undefined)
      ),
    ].sort();
  }, [posts]);

  const tags = useMemo(() => {
    return [
      ...new Set(posts.flatMap((p) => p.data.tags || []))
    ].sort();
  }, [posts]);

  const handleFilterChange = useCallback(
    (filtered: typeof postsWithReadingTime) => {
      setFilteredPosts(filtered);
    },
    []
  );

  const handleLayoutChange = useCallback((layout: LayoutView) => {
    setActiveLayout(layout);
  }, []);

  // Group posts by year for list view
  const postsByYear = useMemo(() => {
    const grouped = filteredPosts.reduce(
      (acc, item) => {
        const year = item.post.data.pubDate.getFullYear().toString();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(item);
        return acc;
      },
      {} as Record<string, typeof filteredPosts>
    );

    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((year) => ({
        year,
        posts: grouped[year].sort(
          (a, b) =>
            b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime()
        ),
      }));
  }, [filteredPosts]);

  return (
    <div className="blog-container">
      {/* Search, Filter, and Layout Toggle */}
      <div className="mb-6">
        {/* Top bar with layout toggle */}
        <div className="flex items-center justify-end mb-3">
          <BlogLayoutToggle
            onLayoutChange={handleLayoutChange}
            defaultLayout={defaultLayout}
          />
        </div>

        {/* Search & Filter (full width, collapsible) */}
        <BlogSearchFilter
          posts={postsWithReadingTime}
          categories={categories}
          tags={tags}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Content Area */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : activeLayout === "masonry" ? (
        // Masonry Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(({ post, readingTime }) => (
            <BlogPostCardReact
              key={post.id}
              title={post.data.title}
              slug={post.data.slug}
              description={post.data.description}
              pubDate={post.data.pubDate}
              category={post.data.category}
              tags={post.data.tags}
              featuredImage={featuredImages.get(post.id)}
              readingTime={readingTime}
            />
          ))}
        </div>
      ) : (
        // List View (Grouped by Year)
        <div className="space-y-10">
          {postsByYear.map(({ year, posts: yearPosts }) => (
            <div key={year}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {year}
              </h2>
              <div className="space-y-4">
                {yearPosts.map(({ post, readingTime }) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <a
                        href={`/blog/${post.data.slug}`}
                        className="block group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:underline">
                          {post.data.title}
                        </h3>
                        {post.data.category && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {post.data.category}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
                          {post.data.description}
                        </p>
                      </a>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      <span className="whitespace-nowrap">
                        {new Date(post.data.pubDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="whitespace-nowrap">
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
