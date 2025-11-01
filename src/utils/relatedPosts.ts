import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * Get related posts based on tag overlap using Jaccard similarity.
 * Tie-break by recency if scores are equal.
 *
 * @param currentSlug - The slug of the current post
 * @param currentTags - Tags of the current post
 * @param limit - Maximum number of related posts to return (default: 4)
 * @returns Array of related posts sorted by relevance
 */
export async function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] = [],
  limit = 4,
): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getCollection("blog");

  // Score and sort posts
  const scored = allPosts
    .filter((p) => p.id !== currentSlug)
    .map((post) => {
      const postTags = post.data.tags || [];
      const currentTagsSet = new Set(currentTags);
      const postTagsSet = new Set(postTags);

      // Calculate overlap (intersection)
      const overlap = postTags.filter((tag) => currentTagsSet.has(tag)).length;

      // Calculate union
      const union = new Set([...currentTags, ...postTags]);

      // Jaccard similarity: overlap / union size
      const jaccard = union.size > 0 ? overlap / union.size : 0;

      return {
        post,
        score: jaccard,
        date: post.data.pubDate,
      };
    })
    .filter((item) => item.score > 0) // Only include posts with at least some overlap
    .sort((a, b) => {
      // Sort by score desc, then by date desc (tie-break)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.date.getTime() - a.date.getTime();
    })
    .slice(0, limit);

  return scored.map((item) => item.post);
}
