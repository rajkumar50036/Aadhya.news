'use client';

import React, { useEffect, useState } from 'react';
import { Radio, X, Zap } from 'lucide-react';
import Link from 'next/link';

interface ToastAlert {
  id: string;
  title: string;
  slug: string;
  category: string;
}

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastAlert | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    try {
      eventSource = new EventSource('/api/realtime/stream');

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'story:published') {
            setToast({
              id: payload.data.id,
              title: payload.data.title,
              slug: payload.data.slug,
              category: payload.data.category,
            });

            // Auto dismiss after 7 seconds
            setTimeout(() => {
              setToast(null);
            }, 7000);
          }
        } catch (e) {
          // parse error ignorable
        }
      };
    } catch (e) {
      console.warn('Realtime SSE connection fallback enabled');
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  return (
    <>
      {children}

      {/* Realtime Toast Alert Popup */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-sky-500/30 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-red-400 font-extrabold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4 text-red-500 animate-bounce" />
              <span>Real-Time Story Update</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-2 text-sm font-semibold leading-snug line-clamp-2">{toast.title}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-sky-400 font-bold uppercase">{toast.category}</span>
            <Link
              href={`/story/${toast.slug}`}
              onClick={() => setToast(null)}
              className="text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded-md transition-colors"
            >
              View Now →
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
