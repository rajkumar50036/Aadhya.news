import React from 'react';
import { fetchStoriesSafe } from '@/lib/data-service';
import { StoryCard, StoryData } from '@/components/StoryCard';
import { GraduationCap } from 'lucide-react';

export const revalidate = 0;

export default async function StudentPage() {
  const stories = await fetchStoriesSafe({ category: 'student', take: 20 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          Student & Higher Education Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Student Desk</h1>
        <p className="text-sm text-indigo-200 max-w-3xl">
          University notifications, scholarship alerts, academic policies, campus news, study abroad programs, and higher education breakthroughs.
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
