import React from 'react';
import Link from 'next/link';
import { fetchStoriesSafe } from '@/lib/data-service';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { BreakingTicker } from '@/components/BreakingTicker';
import { ContactDialerButton } from '@/components/ContactDialerButton';
import { Flame, Radio, Zap, Globe, Flag, GraduationCap, ArrowRight, UserCheck, Shield } from 'lucide-react';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* User Welcome & Gmail Quick Action Banner on Landing Page */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-800/60 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs border border-sky-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Automated AI Pipeline & Multi-Language Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Personalized Real-Time News Stream
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Get instant verified news, multi-language translation (हिंदी, తెలుగు, தமிழ், English), and AI executive summaries customized for your preferences.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Quick Gmail Login Shortcut */}
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign In with Gmail</span>
            </Link>

            <Link
              href="/register"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white transition-colors"
            >
              Register Free
            </Link>

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
