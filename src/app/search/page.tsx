import React from 'react';
import { db } from '@/lib/db';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { Search } from 'lucide-react';

export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const query = searchParams.q || '';
  const category = searchParams.category;

  const where: any = {};
  if (category) where.category = category;
  if (query.trim()) {
    where.OR = [
      { title: { contains: query } },
      { summary: { contains: query } },
      { content: { contains: query } },
      { sourceName: { contains: query } },
    ];
  }

  const stories = query.trim() || category
    ? await db.story.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: 30,
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-sky-600" />
          Real-Time News Search Engine
        </h1>

        <form method="GET" action="/search" className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by keywords, exam name, location, or source..."
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-500 text-white transition-colors"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-xs text-slate-500 font-semibold">
            Showing results for: <span className="text-sky-600 font-bold">"{query}"</span> ({stories.length} matches found)
          </p>
        )}
      </div>

      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story as StoryData} />
          ))}
        </div>
      ) : query ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-slate-700 dark:text-slate-300 font-semibold">
            No articles found matching "{query}".
          </p>
          <p className="text-xs text-slate-500">
            Try searching for broader terms like "India", "NASA", "JEE", "Climate", or "Tech".
          </p>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
          Enter a search term above to scan all processed news stories.
        </div>
      )}
    </div>
  );
}
