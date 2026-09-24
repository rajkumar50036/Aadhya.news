import React from 'react';
import { db } from '@/lib/db';
import { StoryCard, StoryData } from '@/components/StoryCard';

export const revalidate = 0;

export default async function GlobalSubCategoryPage({
  params,
}: {
  params: { subCategory: string };
}) {
  const subCategory = params.subCategory;

  const stories = await db.story.findMany({
    where: {
      category: 'global',
      ...(subCategory === 'breaking'
        ? { isBreaking: true }
        : { subCategory }),
    },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  const titleFormatted = subCategory
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
          Global: {titleFormatted}
        </h2>
        <span className="text-xs text-slate-500 font-semibold">{stories.length} Stories</span>
      </div>

      {stories.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-slate-700 dark:text-slate-300 font-semibold">
            No specific stories ingested yet for <span className="capitalize">{titleFormatted}</span>.
          </p>
          <p className="text-xs text-slate-500">
            Automated feed engine will fetch new stories matching this topic during the next RSS update cycle.
          </p>
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
