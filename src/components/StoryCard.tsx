'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ExternalLink, Flame, Radio } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';
import { useLanguage } from '@/context/LanguageContext';

export interface StoryData {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl?: string | null;
  category: string;
  subCategory?: string | null;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isLive?: boolean;
  isTrending?: boolean;
  verificationStatus: string;
  verificationScore?: number;
  publishedAt: string | Date;
}

export const StoryCard: React.FC<{ story: StoryData; compact?: boolean }> = ({ story, compact = false }) => {
  const { t } = useLanguage();
  const timeAgo = formatTimeAgo(new Date(story.publishedAt));

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative w-full h-48 sm:h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 font-bold text-lg">
            NEWS
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {story.isBreaking && (
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm flex items-center gap-1 animate-pulse">
                {t('breakingNews')}
              </span>
            )}
            {story.isLive && (
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <Radio className="w-3 h-3 animate-spin" /> LIVE
              </span>
            )}
            {story.isTrending && !story.isBreaking && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-sm flex items-center gap-1">
                <Flame className="w-3 h-3" /> {t('trending')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Category & Verification */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {story.category} {story.subCategory ? `• ${story.subCategory}` : ''}
            </span>
            <VerificationBadge status={story.verificationStatus} score={story.verificationScore} />
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-2.5">
            <Link href={`/story/${story.slug}`}>{story.title}</Link>
          </h3>

          {/* AI Summary Bullets */}
          {!compact && story.summary && (
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1 mb-4 line-clamp-3 bg-slate-50 dark:bg-slate-850/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              {story.summary.split('\n').map((bullet, idx) => (
                <p key={idx} className="leading-relaxed">
                  {bullet}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{story.sourceName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </span>
          </div>

          <Link
            href={`/story/${story.slug}`}
            className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold hover:underline"
          >
            {t('readStory')} <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
