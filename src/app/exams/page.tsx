import React from 'react';
import { db } from '@/lib/db';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { BookOpen } from 'lucide-react';

export const revalidate = 0;

export default async function ExamsPage() {
  const stories = await db.story.findMany({
    where: { category: 'exams' },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Competitive Exams & Admissions Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Competitive Exams Hub</h1>
        <p className="text-sm text-emerald-200 max-w-3xl">
          Real-time updates on JEE, NEET, UPSC, GATE, CAT, SSC, State Board exams, hall ticket releases, syllabus changes, and answer keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story as StoryData} />
        ))}
      </div>
    </div>
  );
}
