import Parser from 'rss-parser';
import { db } from './db';
import { processStoryWithGemini } from './ai-engine';
import { findDuplicateOrCluster } from './cluster-engine';
import { broadcastEvent, EVENT_TYPES } from './events';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'media:thumbnail', 'enclosure', 'content:encoded'],
  },
});

export interface IngestionReport {
  feedId: string;
  feedName: string;
  itemsProcessed: number;
  newStoriesCreated: number;
  clusteredCount: number;
  errors: string[];
}

export async function ingestSingleFeed(feedId: string): Promise<IngestionReport> {
  const feed = await db.feed.findUnique({ where: { id: feedId } });

  const report: IngestionReport = {
    feedId,
    feedName: feed?.name || 'Unknown Feed',
    itemsProcessed: 0,
    newStoriesCreated: 0,
    clusteredCount: 0,
    errors: [],
  };

  if (!feed || !feed.isActive) {
    report.errors.push('Feed not found or inactive');
    return report;
  }

  try {
    const parsed = await parser.parseURL(feed.url);
    report.itemsProcessed = parsed.items.length;

    for (const item of parsed.items) {
      if (!item.title || !item.link) continue;

      const rawTitle = item.title.trim();
      const rawContent = (item['content:encoded'] || item.contentSnippet || item.summary || item.title).trim();

      // Check for duplicate or cluster match
      const { existingStoryId, clusterId } = await findDuplicateOrCluster(rawTitle);

      if (existingStoryId) {
        // Link as reference source to existing story
        const alreadyLinked = await db.storySource.findFirst({
          where: { storyId: existingStoryId, url: item.link },
        });

        if (!alreadyLinked) {
          await db.storySource.create({
            data: {
              storyId: existingStoryId,
              feedId: feed.id,
              sourceName: feed.name,
              url: item.link,
              publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            },
          });
          // Update verification status on cluster if multiple sources match
          await db.story.update({
            where: { id: existingStoryId },
            data: {
              verificationStatus: 'MULTIPLE_SOURCES',
              verificationScore: 0.95,
            },
          });
          report.clusteredCount++;
        }
        continue;
      }

      // Process with Gemini AI
      const aiResult = await processStoryWithGemini(
        rawTitle,
        rawContent,
        feed.name,
        feed.sourceType
      );

      // Extract image URL
      let imageUrl = null;
      if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
        imageUrl = item['media:content'].$.url;
      } else if (item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
        imageUrl = item['media:thumbnail'].$.url;
      } else if (item.enclosure && item.enclosure.url) {
        imageUrl = item.enclosure.url;
      }

      // Generate slug
      const slugBase = aiResult.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      const uniqueSuffix = Math.random().toString(36).substring(2, 7);
      const slug = `${slugBase}-${uniqueSuffix}`;

      // Use feed category/subCategory override if set, else use AI result
      const category = feed.category !== 'global' ? feed.category : aiResult.category;
      const subCategory = feed.subCategory || aiResult.subCategory;

      const newStory = await db.story.create({
        data: {
          title: aiResult.title,
          slug,
          rawTitle,
          summary: aiResult.summary,
          content: rawContent,
          sourceName: feed.name,
          sourceUrl: item.link,
          imageUrl,
          category,
          subCategory,
          isBreaking: aiResult.isBreaking,
          isTrending: aiResult.isTrending,
          isLive: aiResult.isLive,
          verificationStatus: aiResult.verificationStatus,
          verificationScore: aiResult.verificationScore,
          clusterId: clusterId || undefined,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          sources: {
            create: {
              feedId: feed.id,
              sourceName: feed.name,
              url: item.link,
              publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            },
          },
        },
      });

      report.newStoriesCreated++;

      // Broadcast real-time event to SSE subscribers
      broadcastEvent(EVENT_TYPES.STORY_PUBLISHED, {
        id: newStory.id,
        title: newStory.title,
        slug: newStory.slug,
        category: newStory.category,
        subCategory: newStory.subCategory,
        isBreaking: newStory.isBreaking,
        publishedAt: newStory.publishedAt,
      });
    }

    // Update feed last fetched timestamp
    await db.feed.update({
      where: { id: feed.id },
      data: { lastFetchedAt: new Date() },
    });
  } catch (error: any) {
    report.errors.push(error.message || 'Feed parse error');
    await db.systemLog.create({
      data: {
        type: 'INGESTION_ERROR',
        message: `Failed to fetch feed ${feed.name}`,
        details: error.stack || error.message,
      },
    });
  }

  return report;
}

export async function ingestAllActiveFeeds(): Promise<IngestionReport[]> {
  const activeFeeds = await db.feed.findMany({ where: { isActive: true } });
  const reports: IngestionReport[] = [];

  for (const feed of activeFeeds) {
    const r = await ingestSingleFeed(feed.id);
    reports.push(r);
  }

  return reports;
}
