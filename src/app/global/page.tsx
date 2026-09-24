import React from 'react';
import { db } from '@/lib/db';
import { StoryCard, StoryData } from '@/components/StoryCard';

export const revalidate = 0;

export default async function GlobalPage() {
  const stories = await db.story.findMany({
    where: { category: 'global' },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">All Global Articles</h2>
        <span className="text-xs text-slate-500 font-semibold">{stories.length} Stories Available</span>
      </div>

      {stories.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500">No global stories currently ingested. Click "Trigger AI Ingestion" on Home.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story as StoryData} />
          ))}
        </div>
      )}
    </div>
  );
}
