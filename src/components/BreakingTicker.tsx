'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, AlertTriangle } from 'lucide-react';
import { StoryData } from './StoryCard';

export const BreakingTicker: React.FC<{ breakingStories: StoryData[] }> = ({ breakingStories }) => {
  if (!breakingStories || breakingStories.length === 0) return null;

  return (
    <div className="bg-red-600 text-white text-xs sm:text-sm font-medium py-1.5 px-4 overflow-hidden shadow-inner flex items-center gap-3 border-b border-red-700">
      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider shrink-0 animate-pulse">
        <Zap className="w-3.5 h-3.5" />
        <span>BREAKING</span>
      </div>

      <div className="overflow-hidden relative w-full">
        <div className="whitespace-nowrap inline-flex gap-8 animate-ticker hover:[animation-play-state:paused]">
          {breakingStories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="hover:underline font-semibold flex items-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{story.title}</span>
              <span className="opacity-75 text-[11px]">({story.sourceName})</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
