import React from 'react';
import { PhoneCall, Mail, MapPin, Clock, Send } from 'lucide-react';
import { CONFIG, getDialerUri } from '@/lib/config';
import { ContactDialerButton } from '@/components/ContactDialerButton';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Contact Our Newsroom
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Have a news tip, press release, verification request, or general inquiry? Connect with our editors anytime.
        </p>
      </div>

      {/* Main Call Highlight Card */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-8 shadow-2xl space-y-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" /> Direct Phone Line
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">{CONFIG.contactPhone}</h2>
          <p className="text-xs text-red-100">Tap below to open your device phone dialer immediately.</p>
        </div>

        <a
          href={getDialerUri()}
          className="px-8 py-4 rounded-2xl bg-white text-red-600 font-extrabold text-lg hover:bg-slate-100 active:scale-95 transition-all shadow-xl flex items-center gap-2 shrink-0"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span>CALL US</span>
        </a>
      </div>

      {/* Grid info & form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Contact Information
          </h3>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <PhoneCall className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-slate-400">Phone</p>
                <p className="font-semibold text-base text-slate-900 dark:text-white">{CONFIG.contactPhone}</p>
                <p className="text-xs text-slate-500">Available 24/7 for urgent breaking tips</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-slate-400">Email</p>
                <p className="font-semibold text-slate-900 dark:text-white">{CONFIG.contactEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-slate-400">Address</p>
                <p className="font-semibold text-slate-900 dark:text-white">{CONFIG.contactAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-xs uppercase text-slate-400">Operating Hours</p>
                <p className="font-semibold text-slate-900 dark:text-white">Automated Pipeline: 24/7/365</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Send a Message
          </h3>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Message / News Tip</label>
              <textarea
                rows={4}
                placeholder="Provide details about news tips or feedback..."
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
