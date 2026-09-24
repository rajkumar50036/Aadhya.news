import { db } from './db';

export function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(
    text1
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );
  const words2 = new Set(
    text2
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );

  if (words1.size === 0 || words2.size === 0) return 0;

  const intersection = new Set([...words1].filter((w) => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

export async function findDuplicateOrCluster(rawTitle: string): Promise<{
  existingStoryId: string | null;
  clusterId: string | null;
}> {
  try {
    // Fetch stories from last 24 hours
    const recentStories = await db.story.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
        title: true,
        rawTitle: true,
        clusterId: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    for (const story of recentStories) {
      const similarityWithTitle = calculateTextSimilarity(rawTitle, story.title);
      const similarityWithRaw = story.rawTitle
        ? calculateTextSimilarity(rawTitle, story.rawTitle)
        : 0;

      const highestScore = Math.max(similarityWithTitle, similarityWithRaw);

      if (highestScore >= 0.55) {
        // High similarity match found
        return {
          existingStoryId: story.id,
          clusterId: story.clusterId || story.id,
        };
      }
    }
  } catch (error) {
    console.error('Error during cluster search:', error);
  }

  return { existingStoryId: null, clusterId: null };
}
