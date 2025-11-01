/**
 * Calculate estimated reading time for blog posts
 * Based on average reading speed of 238 words per minute
 */

const WORDS_PER_MINUTE = 238;

/**
 * Strip markdown formatting and code blocks to get plain text word count
 */
function stripMarkdown(content: string): string {
  let text = content;

  // Remove frontmatter
  text = text.replace(/^---[\s\S]*?---/, '');

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`[^`]*`/g, '');

  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Remove markdown links but keep the text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove markdown images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // Remove markdown headers
  text = text.replace(/#{1,6}\s/g, '');

  // Remove markdown emphasis
  text = text.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1');

  // Remove blockquotes
  text = text.replace(/^>\s/gm, '');

  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}$/gm, '');

  return text;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length;
}

/**
 * Calculate reading time from markdown content
 * @param content - The markdown/MDX content
 * @returns Object with minutes and text representation
 */
export function calculateReadingTime(content: string): {
  minutes: number;
  text: string;
  words: number;
} {
  const plainText = stripMarkdown(content);
  const wordCount = countWords(plainText);
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return {
    minutes,
    text: `${minutes} min read`,
    words: wordCount,
  };
}

/**
 * Format reading time with custom options
 */
export function formatReadingTime(
  minutes: number,
  options?: {
    short?: boolean;
    includeApprox?: boolean;
  }
): string {
  const { short = false, includeApprox = false } = options || {};

  if (short) {
    return `${minutes} min`;
  }

  const approx = includeApprox && minutes > 1 ? '~' : '';
  const minText = minutes === 1 ? 'minute' : 'minutes';

  return `${approx}${minutes} ${minText} read`;
}
