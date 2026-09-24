import React from 'react';
import { ShieldCheck, CheckCircle2, Layers, AlertCircle } from 'lucide-react';

interface Props {
  status: string;
  score?: number;
}

export const VerificationBadge: React.FC<Props> = ({ status, score }) => {
  switch (status) {
    case 'VERIFIED_OFFICIAL':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Official Source</span>
          {score && <span className="opacity-75">({Math.round(score * 100)}%)</span>}
        </span>
      );
    case 'MULTIPLE_SOURCES':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Multi-Source Cluster</span>
        </span>
      );
    case 'HIGH_CONFIDENCE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>High Confidence</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Single Source</span>
        </span>
      );
  }
};
