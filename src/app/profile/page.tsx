'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Globe, Bookmark, History, LogOut, Shield, CheckCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
  preferredLanguage: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          if (data.user.preferredLanguage) {
            setSelectedLang(data.user.preferredLanguage as LanguageCode);
          }
        }
      })
      .catch((err) => console.error('Failed to load profile:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleLanguageChange = (code: LanguageCode) => {
    setSelectedLang(code);
    setLanguage(code);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {user?.name || 'News Reader'}
              </h1>
              {user?.role === 'ADMIN' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase">
                  Admin Access
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email || 'Guest User'}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-100 transition-colors shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Language Preference Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-sky-500" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Preferred News Language
            </h2>
          </div>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Preference Saved
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select your default reading language for headlines, stories, and blogs across the news platform.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                selectedLang === lang.code
                  ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-600 dark:text-sky-300 ring-2 ring-sky-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div>
                <div className="text-xs font-bold">{lang.nativeName}</div>
                <div className="text-[10px] text-slate-400">{lang.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links / Bookmarks / History */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => router.push('/bookmarks')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 rounded-3xl p-6 text-left transition-all group shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-600">
                Saved Bookmarks
              </h3>
              <p className="text-xs text-slate-500">Access saved articles and blogs</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => router.push('/reading-history')}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 rounded-3xl p-6 text-left transition-all group shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600">
                Reading History
              </h3>
              <p className="text-xs text-slate-500">View recently read articles</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
