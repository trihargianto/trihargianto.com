import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./BlogPostCardReact.css";

dayjs.extend(relativeTime);

interface BlogPostCardProps {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  readingTime: number;
}

export default function BlogPostCardReact({
  title,
  slug,
  description,
  pubDate,
  category,
  tags,
  featuredImage,
  readingTime,
}: BlogPostCardProps) {
  const formattedDate = dayjs(pubDate).fromNow();

  // Generate a deterministic seed from slug for consistent random images
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Use Lorem Picsum for random placeholder images (Unsplash Source API is deprecated)
  // Generate consistent image ID based on slug
  const imageId = (hashCode(slug) % 1000) + 1; // IDs range from 1-1000
  const imageUrl =
    featuredImage || `https://picsum.photos/seed/${slug}/800/600`;

  return (
    <article className="blog-post-card group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-800">
      {/* Featured Image */}
      <a
        href={`/blog/${slug}`}
        className="block relative overflow-hidden aspect-video"
        aria-label={`Read article: ${title}`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Category Badge Overlay */}
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white border-0 font-semibold text-xs px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Hover Overlay with Excerpt */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      </a>

      {/* Card Content */}
      <div className="p-5">
        {/* Meta Information */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          {/* Publication Date */}
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <time dateTime={pubDate.toISOString()}>{formattedDate}</time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3">
          <a
            href={`/blog/${slug}`}
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 line-clamp-2"
          >
            {title}
          </a>
        </h3>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 3).map((tag) => (
              <a
                key={tag}
                href={`/blog/topic/${tag}`}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Read More Link (appears on hover) */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:gap-2 transition-all duration-200"
          aria-label={`Read more about ${title}`}
        >
          <span>Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
