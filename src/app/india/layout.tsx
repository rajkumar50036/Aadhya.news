import React from 'react';
import Link from 'next/link';
import { Flag } from 'lucide-react';

export default function IndiaLayout({ children }: { children: React.ReactNode }) {
  const indiaSubRoutes = [
    { name: 'All India Desk', href: '/india' },
    { name: 'India Breaking', href: '/india/breaking' },
    { name: 'Politics & Govt', href: '/india/politics' },
    { name: 'Economy & Business', href: '/india/economy' },
    { name: 'Education', href: '/india/education' },
    { name: 'Technology', href: '/india/technology' },
    { name: 'Jobs & Careers', href: '/india/jobs-careers' },
    { name: 'State News', href: '/india/state' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* India Desk Header */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-700 to-emerald-800 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-md">
          <Flag className="w-4 h-4 text-orange-200" />
          National India Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">India News Portal</h1>
        <p className="text-sm text-amber-100 max-w-3xl">
          Verified national news, Union & State government releases, policy updates, economic statistics, and recruitment announcements.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {indiaSubRoutes.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/60 hover:text-orange-600 transition-colors"
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
