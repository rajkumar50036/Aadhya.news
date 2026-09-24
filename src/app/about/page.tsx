import React from 'react';
import { ShieldCheck, Cpu, Layers, Radio, Globe } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          Architecture & Methodology
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About {CONFIG.appName} Platform
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          An automated, real-time news intelligence system engineered to fetch, normalize, deduplicate, cluster, and verify news stories using AI pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Cpu className="w-8 h-8 text-sky-500" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Gemini AI Processing</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every incoming article is processed using AI algorithms to extract neutral non-clickbait headlines, bulleted executive summaries, and strict categorization.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Layers className="w-8 h-8 text-indigo-500" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Deduplication & Clustering</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Incoming RSS, Atom, and API feeds are automatically cross-checked against existing stories to detect duplicates and cluster related stories under unified topic nodes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Verification Scoring</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Sources are evaluated against trust matrices. Official government portals (e.g. PIB, NTA) receive verified status badges automatically.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Radio className="w-8 h-8 text-red-500" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Real-Time Event Broadcasting</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Client applications across desktop, tablet, and mobile browsers receive instant Server-Sent Events (SSE) updates without needing manual page refreshes.
          </p>
        </div>
      </div>
    </div>
  );
}
