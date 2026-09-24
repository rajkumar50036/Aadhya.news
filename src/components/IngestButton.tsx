'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const IngestButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const handleRunIngestion = async () => {
    setLoading(true);
    setDone(false);
    try {
      const res = await fetch('/api/ingestion/run', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        router.refresh();
        setTimeout(() => setDone(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRunIngestion}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs bg-sky-700 hover:bg-sky-600 text-white border border-sky-600 active:scale-95 transition-all shadow-md"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Ingesting Feeds...' : done ? 'Sync Complete!' : 'Trigger AI Ingestion'}</span>
      {done && <CheckCircle className="w-4 h-4 text-emerald-300" />}
    </button>
  );
};
