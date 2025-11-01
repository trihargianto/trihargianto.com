import "./ArticleCard.css";

interface ArticleCardProps {
  title: string;
  date: string;
  slug?: string;
  link?: string;
  platform?: string;
  tags?: string[];
  featuredImage?: string;
  description?: string;
}

export default function ArticleCard({
  title,
  date,
  slug,
  link,
  platform,
  tags,
  featuredImage,
  description,
}: ArticleCardProps) {
  const href = slug ? `/blog/${slug}` : link;
  const isExternal = !slug;

  // Generate a deterministic seed from title for consistent placeholder images
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const imageUrl =
    featuredImage || `https://picsum.photos/seed/${hashCode(title)}/800/600`;

  return (
    <article className="article-card group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-sky-200 dark:hover:border-sky-800">
      {/* Featured Image */}
      <a
        href={href}
        className="block relative overflow-hidden aspect-video"
        aria-label={`${isExternal ? "View" : "Read"} article: ${title}`}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Platform Badge Overlay */}
        {platform && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white border-0 font-semibold text-xs px-3 py-1 rounded-full">
              {platform}
            </span>
          </div>
        )}

        {/* Hover Overlay with Description */}
        {description && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </a>

      {/* Card Content */}
      <div className="p-5">
        {/* Meta Information */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          {/* Date */}
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
            <time>{date}</time>
          </div>

          {/* External Link Icon */}
          {isExternal && (
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3">
          <a
            href={href}
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 line-clamp-2"
            {...(isExternal && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
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
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:gap-2 transition-all duration-200"
          aria-label={`Read more about ${title}`}
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          <span>{isExternal ? "View" : "Read more"}</span>
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
