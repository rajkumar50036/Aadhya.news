import React from 'react';
import Link from 'next/link';
import { fetchStoriesSafe } from '@/lib/data-service';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { ContactDialerButton } from '@/components/ContactDialerButton';
import { Flame, Radio, Zap, Globe, Flag, GraduationCap, ArrowRight } from 'lucide-react';
import { IngestButton } from '@/components/IngestButton';

export const revalidate = 0;

export default async function HomePage() {
  const [
    breakingStories,
    featuredStories,
    latestStories,
    globalStories,
    indiaStories,
    studentStories,
    liveStories,
    trendingStories,
  ] = await Promise.all([
    fetchStoriesSafe({ isBreaking: true, take: 5 }),
    fetchStoriesSafe({ isFeatured: true, take: 2 }),
    fetchStoriesSafe({ take: 6 }),
    fetchStoriesSafe({ category: 'global', take: 4 }),
    fetchStoriesSafe({ category: 'india', take: 4 }),
    fetchStoriesSafe({ category: 'exams', take: 4 }),
    fetchStoriesSafe({ isLive: true, take: 3 }),
    fetchStoriesSafe({ isTrending: true, take: 4 }),
  ]);

  const heroStory = featuredStories[0] || latestStories[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Real-time Breaking News Ticker */}
      <BreakingTicker breakingStories={breakingStories as StoryData[]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Control Bar: Contact Call & Manual Ingestion Trigger */}
        <div className="bg-sky-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-sky-800">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Automated AI Pipeline Active
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Real-Time News Stream & Helpline</h2>
            <p className="text-xs sm:text-sm text-sky-200">
              News is fetched from RSS/Atom/Official APIs, verified by AI, and broadcast in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <IngestButton />
            <ContactDialerButton />
          </div>
        </div>

        {/* HERO SECTION: Featured Story + Live Updates Column */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero Card */}
          {heroStory && (
            <div className="lg:col-span-2 group relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-end min-h-[420px] sm:min-h-[480px] border border-slate-800">
              {heroStory.imageUrl && (
                <img
                  src={heroStory.imageUrl}
                  alt={heroStory.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

              <div className="relative p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-600 text-white">
                    {heroStory.category}
                  </span>
                  <span className="text-xs text-slate-300">{heroStory.sourceName}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight group-hover:text-sky-300 transition-colors">
                  <Link href={`/story/${heroStory.slug}`}>{heroStory.title}</Link>
                </h1>

                {heroStory.summary && (
                  <div className="text-sm text-slate-200 line-clamp-3 space-y-1 bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                    {heroStory.summary.split('\n').map((bullet: string, idx: number) => (
                      <p key={idx}>{bullet}</p>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/story/${heroStory.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white text-sm transition-colors shadow-lg"
                  >
                    Read Full Coverage <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Column: Live Stream & Trending Sidebar */}
          <div className="space-y-6">
            {/* Live Updates Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base flex items-center gap-2 text-slate-900 dark:text-white">
                  <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                  Live Stream Ticker
                </h3>
                <Link href="/live" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {liveStories.map((story: any) => (
                  <div
                    key={story.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-sky-500/50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> LIVE UPDATE
                    </span>
                    <Link
                      href={`/story/${story.slug}`}
                      className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 line-clamp-2"
                    >
                      {story.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Flame className="w-5 h-5 text-amber-500" />
                  Top Trending News
                </h3>
                <Link href="/trending" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
                  See Ranking
                </Link>
              </div>

              <div className="space-y-2">
                {trendingStories.map((story: any, idx: number) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug}`}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-amber-500/10 transition-colors"
                  >
                    <span className="font-black text-lg text-amber-500 shrink-0 w-6">0{idx + 1}</span>
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-2">
                      {story.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: LATEST STORIES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Latest News Feed</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time updates normalized and processed from global sources
              </p>
            </div>
            <Link href="/global" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
              Browse Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestStories.map((story: any) => (
              <StoryCard key={story.id} story={story as StoryData} />
            ))}
          </div>
        </section>

        {/* SECTION: GLOBAL NEWS BLOCK */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-sky-600" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Global News</h2>
            </div>
            <Link href="/global" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
              Explore All Global Hubs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStories.map((story: any) => (
              <StoryCard key={story.id} story={story as StoryData} compact={true} />
            ))}
          </div>
        </section>

        {/* SECTION: INDIA NEWS BLOCK */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Flag className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">India News</h2>
            </div>
            <Link href="/india" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
              View India Desk →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indiaStories.map((story: any) => (
              <StoryCard key={story.id} story={story as StoryData} compact={true} />
            ))}
          </div>
        </section>

        {/* SECTION: STUDENT & COMPETITIVE EXAMS HUB */}
        <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-indigo-800/60">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/40">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Student & Competitive Exam Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Education Alerts & Exam Updates</h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/student"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold transition-colors"
              >
                Student Hub
              </Link>
              <Link
                href="/exams"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition-colors"
              >
                Exams Desk
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentStories.map((story: any) => (
              <div
                key={story.id}
                className="bg-slate-900/80 border border-indigo-500/20 rounded-xl p-4 space-y-3 hover:border-indigo-400 transition-colors"
              >
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                  {story.category} • {story.subCategory}
                </span>
                <h4 className="font-bold text-base text-white leading-snug line-clamp-2">
                  <Link href={`/story/${story.slug}`}>{story.title}</Link>
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">{story.summary}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{story.sourceName}</span>
                  <Link href={`/story/${story.slug}`} className="text-indigo-400 font-bold hover:underline">
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
