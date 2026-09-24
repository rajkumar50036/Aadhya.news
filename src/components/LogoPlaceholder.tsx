import React from 'react';
import { CONFIG } from '@/lib/config';

export const LogoPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 font-black text-2xl tracking-tighter text-slate-900 dark:text-white ${className}`}>
      {/* SVG Replaceable Logo Mark */}
      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
        N
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:to-slate-300">
        {CONFIG.appName}
      </span>
      <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
        LIVE
      </span>
    </div>
  );
};
