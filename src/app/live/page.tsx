import React from 'react';
import { fetchStoriesSafe } from '@/lib/data-service';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { Radio } from 'lucide-react';

export const revalidate = 0;

export default async function LivePage() {
  const stories = await fetchStoriesSafe({ isLive: true, take: 15 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3 border border-red-900/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 font-bold text-xs border border-red-500/40">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          Continuous Real-Time Stream
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Live Coverage Stream</h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Minute-by-minute live blogs, real-time telemetry, continuous breaking developments, and verified instant dispatches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <StoryCard story={story as StoryData} />
          </div>
        ))}
      </div>
    </div>
  );
}
