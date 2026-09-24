import React from 'react';

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Cookie Policy</h1>
      <p className="text-sm leading-relaxed">
        We use essential session tokens and local storage cookies strictly required to maintain active real-time SSE streams and user interface theme preferences.
      </p>
    </div>
  );
}
