import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { VerificationBadge } from '@/components/VerificationBadge';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { ContactDialerButton } from '@/components/ContactDialerButton';
import { Clock, ExternalLink, ShieldCheck, ArrowLeft, Radio } from 'lucide-react';

export const revalidate = 0;

export default async function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = await db.story.findUnique({
    where: { slug: params.slug },
    include: {
      sources: true,
      liveUpdates: { orderBy: { publishedAt: 'desc' } },
    },
  });

  if (!story) {
    notFound();
  }

  // Fetch related stories
  const relatedStories = await db.story.findMany({
    where: {
      category: story.category,
      id: { not: story.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to News Feed
      </Link>

      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-6">
        {/* Article Image Banner */}
        {story.imageUrl && (
          <div className="relative w-full h-64 sm:h-96 bg-slate-800">
            <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-6">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {story.category} {story.subCategory ? `• ${story.subCategory}` : ''}
              </span>
              <VerificationBadge status={story.verificationStatus} score={story.verificationScore} />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(story.publishedAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>{story.readCount} Reads</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {story.title}
          </h1>

          {/* AI Key Executive Summary */}
          {story.summary && (
            <div className="bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 p-5 rounded-2xl space-y-2">
              <h3 className="text-xs font-black text-sky-800 dark:text-sky-300 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                AI Executive Summary & Key Points
              </h3>
              <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 space-y-1.5 leading-relaxed font-medium">
                {story.summary.split('\n').map((bullet, idx) => (
                  <p key={idx}>{bullet}</p>
                ))}
              </div>
            </div>
          )}

          {/* Article Full Body */}
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
            {story.content.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Live Updates section if applicable */}
          {story.isLive && story.liveUpdates.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-extrabold text-lg text-red-500 flex items-center gap-2">
                <Radio className="w-5 h-5 animate-pulse" />
                Live Blog Updates
              </h3>
              <div className="space-y-3">
                {story.liveUpdates.map((update) => (
                  <div key={update.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-mono text-slate-400">
                      {new Date(update.publishedAt).toLocaleTimeString()}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white">{update.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{update.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference Sources & Verification Provenance */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Verified Source Provenance & References
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-sky-600 dark:text-sky-400 hover:underline"
              >
                <span>{story.sourceName}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {story.sources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:underline"
                >
                  <span>{src.sourceName}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Call Us helpline box */}
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-bold text-xs text-red-700 dark:text-red-300">Questions or tips regarding this report?</p>
              <p className="text-xs text-red-600 dark:text-red-400">Reach out to our newsroom helpline directly.</p>
            </div>
            <ContactDialerButton showText={true} />
          </div>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((item) => (
              <StoryCard key={item.id} story={item as StoryData} compact={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
