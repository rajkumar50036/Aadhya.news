import React from 'react';
import Link from 'next/link';
import { fetchBlogsSafe } from '@/lib/data-service';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

export const revalidate = 0;

export default async function BlogsPage() {
  const blogs = await fetchBlogsSafe();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Editorial Insights & Analysis
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Editorial Blogs & Articles</h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
          Deep-dive editorial analysis, educational strategies, AI technology guides, and expert perspectives across multiple languages.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {blog.imageUrl && (
                <div className="relative w-full h-56 bg-slate-800 overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md">
                    {blog.category}
                  </div>
                </div>
              )}

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {blog.authorAvatar ? (
                  <img src={blog.authorAvatar} alt={blog.authorName} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-xs text-slate-900 dark:text-white">{blog.authorName}</p>
                  <p className="text-[10px] text-slate-500">{blog.authorRole}</p>
                </div>
              </div>

              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
