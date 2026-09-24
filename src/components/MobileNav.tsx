'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Globe, Flag, GraduationCap, BookOpen, Radio, Search } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const items = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Global', href: '/global', icon: Globe },
    { name: 'India', href: '/india', icon: Flag },
    { name: 'Student', href: '/student', icon: GraduationCap },
    { name: 'Exams', href: '/exams', icon: BookOpen },
    { name: 'Live', href: '/live', icon: Radio, isLive: true },
    { name: 'Search', href: '/search', icon: Search },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
              isActive
                ? 'text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Icon className={`w-5 h-5 ${item.isLive ? 'text-red-500 animate-pulse' : ''}`} />
            <span className="text-[10px] mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
