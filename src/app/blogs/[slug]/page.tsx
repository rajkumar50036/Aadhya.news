import React from 'react';
import Link from 'next/link';
import { fetchBlogBySlugSafe } from '@/lib/data-service';
import { Clock, ArrowLeft, Share2, User } from 'lucide-react';
import { ContactDialerButton } from '@/components/ContactDialerButton';

export const revalidate = 0;

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await fetchBlogBySlugSafe(params.slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center text-slate-500">
        Blog post not found. <Link href="/blogs" className="text-sky-600 font-bold">Return to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Editorial Blogs
      </Link>

      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-6">
        {blog.imageUrl && (
          <div className="relative w-full h-72 sm:h-96 bg-slate-800">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {blog.category}
            </span>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTimeMinutes} min read
              </span>
              <span>•</span>
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            {blog.authorAvatar ? (
              <img src={blog.authorAvatar} alt={blog.authorName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            )}
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{blog.authorName}</p>
              <p className="text-xs text-slate-500">{blog.authorRole}</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-4 pt-2">
            {blog.content.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {blog.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  #{t}
                </span>
              ))}
            </div>

            <ContactDialerButton showText={true} />
          </div>
        </div>
      </article>
    </div>
  );
}
