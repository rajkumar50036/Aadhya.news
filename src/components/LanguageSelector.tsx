'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/lib/i18n';

export const LanguageSelector: React.FC<{
  currentLang: LanguageCode;
  onLanguageChange: (code: LanguageCode) => void;
}> = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selected = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
      >
        <span className="text-sm">{selected.flag}</span>
        <span>{selected.nativeName}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 space-y-0.5 animate-in fade-in duration-150">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentLang === lang.code
                  ? 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
