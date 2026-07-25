/**
 * Calculates estimated reading time and word count for news articles.
 * Standard average reading speed: 200 words per minute.
 */
export function calculateArticleStats(content: string) {
  if (!content) {
    return {
      wordCount: 0,
      readingTimeMinutes: 1,
      readingTimeLabel: '1 min de leitura'
    };
  }

  // Count words by splitting on whitespaces
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  
  // Calculate minutes (minimum 1 minute)
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    wordCount: words,
    readingTimeMinutes: minutes,
    readingTimeLabel: `${minutes} min de leitura (${words} palavras)`
  };
}
