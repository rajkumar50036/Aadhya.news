import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const globalSubRoutes = [
    { name: 'All Global', href: '/global' },
    { name: 'World', href: '/global/world' },
    { name: 'USA', href: '/global/usa' },
    { name: 'UK', href: '/global/uk' },
    { name: 'Europe', href: '/global/europe' },
    { name: 'Asia', href: '/global/asia' },
    { name: 'Middle East', href: '/global/middle-east' },
    { name: 'Africa', href: '/global/africa' },
    { name: 'Australia', href: '/global/australia' },
    { name: 'Politics', href: '/global/politics' },
    { name: 'Business', href: '/global/business' },
    { name: 'Technology', href: '/global/technology' },
    { name: 'Science & Space', href: '/global/science-space' },
    { name: 'Sports', href: '/global/sports' },
    { name: 'Breaking', href: '/global/breaking' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Global Header */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs border border-sky-500/30">
          <Globe className="w-4 h-4 text-sky-400" />
          Global International Coverage
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Global News Desk</h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Automated real-time international coverage monitoring geopolitics, global economy, science, space, technology, and breaking developments across 6 continents.
        </p>
      </div>

      {/* Sub-Category Filter Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {globalSubRoutes.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 hover:text-sky-600 transition-colors"
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
