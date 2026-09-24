'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { LogoPlaceholder } from '@/components/LogoPlaceholder';
import { SUPPORTED_LANGUAGES, LanguageCode } from '@/lib/i18n';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('en');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLanguage(selectedLang);

    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <LogoPlaceholder />
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white pt-2">
            Create Account
          </h1>
          <p className="text-xs text-slate-500">
            Set up your reader profile and choose your preferred primary news language.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Preferred Language</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  type="button"
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between font-semibold transition-all ${
                    selectedLang === lang.code
                      ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-600 dark:text-sky-300'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {selectedLang === lang.code && <CheckCircle className="w-3.5 h-3.5 text-sky-500" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
