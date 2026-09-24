'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, ArrowLeft, Trash2 } from 'lucide-react';

interface BookmarkItem {
  id: string;
  createdAt: string;
  article?: {
    id: string;
    title: string;
    slug: string;
    summary?: string;
    category?: string;
  } | null;
  story?: {
    id: string;
    title: string;
    slug: string;
    summary?: string;
    category?: string;
  } | null;
  blog?: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
  } | null;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookmarks')
      .then((res) => res.json())
      .then((data) => setBookmarks(data.bookmarks || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const removeBookmark = async (articleId?: string, blogId?: string) => {
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, blogId }),
      });
      setBookmarks((prev) =>
        prev.filter((b) => (articleId ? (b.article?.id || b.story?.id) !== articleId : b.blog?.id !== blogId))
      );
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-sky-500 fill-sky-500/20" />
              <span>Saved Bookmarks</span>
            </h1>
            <p className="text-xs text-slate-500">Your saved articles and editorial blogs.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any news story or blog post to save it for quick offline reading.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Explore News Headlines
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((item) => {
            const articleObj = item.article || item.story;
            const isArticle = !!articleObj;
            const content = articleObj || item.blog;
            const href = isArticle ? `/stories/${articleObj?.slug}` : `/blogs/${item.blog?.slug}`;

            if (!content) return null;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-extrabold uppercase tracking-wider">
                      {isArticle ? articleObj?.category || 'News' : 'Editorial Blog'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={href} className="block group">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {content.title}
                    </h2>
                    {(articleObj?.summary || item.blog?.excerpt) && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {articleObj?.summary || item.blog?.excerpt}
                      </p>
                    )}
                  </Link>
                </div>
                <button
                  onClick={() => removeBookmark(articleObj?.id, item.blog?.id)}
                  title="Remove Bookmark"
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
