import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-sm leading-relaxed">
        This Privacy Policy describes how information is collected, processed, and protected when using the real-time news platform.
      </p>
      <div className="space-y-4 text-xs leading-relaxed">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">1. Data Ingestion & Public Feeds</h3>
        <p>The platform ingests news from publicly permitted RSS, Atom, and government endpoints without collecting personally identifiable information from readers.</p>
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">2. Local Preferences & Cookies</h3>
        <p>Theme preferences and reading bookmarks are saved locally in your client device browser storage.</p>
      </div>
    </div>
  );
}
