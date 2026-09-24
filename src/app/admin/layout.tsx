import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Rss, FileText, Settings, Shield, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-full mb-1">
            <Shield className="w-3.5 h-3.5" />
            Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Site
        </Link>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <Link
          href="/admin"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 flex items-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4 text-sky-600" />
          <span>Overview</span>
        </Link>
        <Link
          href="/admin/feeds"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 flex items-center gap-2"
        >
          <Rss className="w-4 h-4 text-orange-500" />
          <span>Feed Ingestion Manager</span>
        </Link>
        <Link
          href="/admin/stories"
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-emerald-500" />
          <span>Publish & Edit Stories</span>
        </Link>
      </div>

      {children}
    </div>
  );
}
