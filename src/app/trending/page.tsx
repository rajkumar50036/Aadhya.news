import React from 'react';
import { db } from '@/lib/db';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { Flame } from 'lucide-react';

export const revalidate = 0;

export default async function TrendingPage() {
  const stories = await db.story.findMany({
    orderBy: [{ readCount: 'desc' }, { publishedAt: 'desc' }],
    take: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-md">
          <Flame className="w-4 h-4 text-amber-300" />
          High Velocity Trends
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Trending Stories</h1>
        <p className="text-sm text-amber-100 max-w-3xl">
          Stories ranked by reader engagement, social velocity, cross-source references, and real-time interest spikes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story as StoryData} />
        ))}
      </div>
    </div>
  );
}
