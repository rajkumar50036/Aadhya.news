import React from 'react';
import { db } from '@/lib/db';
import { IngestButton } from '@/components/IngestButton';
import { Rss, FileText, Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [feedCount, storyCount, breakingCount, liveCount, recentLogs] = await Promise.all([
    db.feed.count(),
    db.story.count(),
    db.story.count({ where: { isBreaking: true } }),
    db.story.count({ where: { isLive: true } }),
    db.systemLog.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Configured Feeds</span>
            <Rss className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{feedCount}</p>
          <p className="text-[11px] text-slate-500">RSS, Atom, Govt & University APIs</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Processed Stories</span>
            <FileText className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{storyCount}</p>
          <p className="text-[11px] text-slate-500">Stored in SQLite with Prisma</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Active Breaking Alerts</span>
            <Zap className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{breakingCount}</p>
          <p className="text-[11px] text-slate-500">Broadcasting on top ticker</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Live Coverage Streams</span>
            <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{liveCount}</p>
          <p className="text-[11px] text-slate-500">Real-time SSE active</p>
        </div>
      </div>

      {/* Manual Action & Pipeline Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-indigo-900/50 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-400" />
              Ingestion & Gemini AI Engine Control
            </h3>
            <p className="text-xs text-slate-300">
              Run manual feed fetch and AI enrichment cycle across all active sources.
            </p>
          </div>
          <IngestButton />
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Recent System Logs & Audit Trail
        </h3>

        {recentLogs.length === 0 ? (
          <p className="text-xs text-slate-500">No system errors logged. All engines operating normally.</p>
        ) : (
          <div className="space-y-2">
            {recentLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-sky-600">{log.type}</span>
                  <span>{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{log.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
