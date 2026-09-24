import React from 'react';
import Link from 'next/link';
import { LogoPlaceholder } from './LogoPlaceholder';
import { ContactDialerButton } from './ContactDialerButton';
import { CONFIG } from '@/lib/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Brand & Contact Phone */}
          <div className="space-y-4">
            <LogoPlaceholder className="text-white" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated real-time news intelligence platform delivering verified headlines, multi-language executive summaries, and editorial blogs.
            </p>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">24/7 Helpline</p>
              <ContactDialerButton />
            </div>
          </div>

          {/* Col 2: News Sections */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">News & Content</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/global" className="hover:text-sky-400 transition-colors">Global News & World</Link>
              </li>
              <li>
                <Link href="/india" className="hover:text-sky-400 transition-colors">India News & States</Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-sky-400 transition-colors">Student & Higher Education</Link>
              </li>
              <li>
                <Link href="/exams" className="hover:text-sky-400 transition-colors">Competitive Exams Desk</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-sky-400 font-bold text-indigo-400 transition-colors">Editorial Blogs & Articles</Link>
              </li>
              <li>
                <Link href="/live" className="hover:text-sky-400 transition-colors">Live News Ticker</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: User Account & Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">User & Access</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/profile" className="hover:text-sky-400 font-bold transition-colors">My Profile & Settings</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-sky-400 transition-colors">Sign In to Account</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-sky-400 transition-colors">Create Free Account</Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-sky-400 transition-colors">Saved Bookmarks</Link>
              </li>
              <li>
                <Link href="/reading-history" className="hover:text-sky-400 transition-colors">Reading History</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Information & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">About Platform</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">Contact Us ({CONFIG.contactPhone})</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-sky-400 transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-sky-400 transition-colors">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {CONFIG.appName} Platform. All rights reserved. Automated Real-Time System.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
