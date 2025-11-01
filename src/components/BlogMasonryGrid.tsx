import { useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import type { CollectionEntry } from "astro:content";
import "./BlogMasonryGrid.css";

interface BlogMasonryGridProps {
  posts: Array<{
    post: CollectionEntry<"blog">;
    content: string;
  }>;
}

const breakpointColumns = {
  default: 3,
  1280: 3,
  1024: 2,
  768: 1,
};

export default function BlogMasonryGrid({ posts }: BlogMasonryGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Determine card size based on position and recency
  const getCardSize = (index: number, isRecent: boolean) => {
    // First few cards can be larger if they're recent
    if (index === 0 && isRecent) return "large";
    if (index % 7 === 0 && index !== 0) return "medium";
    return "small";
  };

  const postsWithSize = useMemo(() => {
    return posts.map((item, index) => {
      const daysSincePublished = Math.floor(
        (Date.now() - item.post.data.pubDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const isRecent = daysSincePublished <= 30;

      return {
        ...item,
        size: getCardSize(index, isRecent),
      };
    });
  }, [posts]);

  if (isLoading) {
    return <BlogMasonryGridSkeleton />;
  }

  return (
    <div className="blog-masonry-container">
      <Masonry
        breakpointCols={breakpointColumns}
        className="blog-masonry-grid"
        columnClassName="blog-masonry-grid-column"
      >
        {postsWithSize.map((item) => (
          <div key={item.post.id} data-size={item.size}>
            {/* We'll hydrate this on the client with the Astro component */}
            <div
              className="blog-card-wrapper"
              data-post-slug={item.post.data.slug}
              data-post-title={item.post.data.title}
              data-post-description={item.post.data.description}
              data-post-date={item.post.data.pubDate.toISOString()}
              data-post-category={item.post.data.category || ""}
              data-post-tags={JSON.stringify(item.post.data.tags || [])}
              data-card-size={item.size}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

// Skeleton loading component
function BlogMasonryGridSkeleton() {
  return (
    <div className="blog-masonry-container">
      <div className="blog-masonry-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="blog-masonry-grid-column">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl h-96 mb-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
