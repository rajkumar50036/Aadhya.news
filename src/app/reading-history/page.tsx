'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Clock, ArrowLeft } from 'lucide-react';

interface HistoryItem {
  id: string;
  viewedAt?: string;
  readAt?: string;
  article?: {
    id: string;
    title: string;
    slug: string;
    category?: string;
  } | null;
  story?: {
    id: string;
    title: string;
    slug: string;
    category?: string;
  } | null;
  blog?: {
    id: string;
    title: string;
    slug: string;
    category?: string;
  } | null;
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
              <History className="w-6 h-6 text-indigo-500" />
              <span>Reading History</span>
            </h1>
            <p className="text-xs text-slate-500">Articles and blogs you recently read.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <History className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Reading History</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Your reading activity will appear here automatically when you read articles.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            Start Reading
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const articleObj = item.article || item.story;
            const isArticle = !!articleObj;
            const content = articleObj || item.blog;
            const href = isArticle ? `/stories/${articleObj?.slug}` : `/blogs/${item.blog?.slug}`;
            const timeStr = item.viewedAt || item.readAt || new Date().toISOString();

            if (!content) return null;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase">
                      {isArticle ? articleObj?.category || 'News' : 'Editorial Blog'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(timeStr).toLocaleString()}
                    </span>
                  </div>
                  <Link href={href} className="block group">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {content.title}
                    </h2>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
