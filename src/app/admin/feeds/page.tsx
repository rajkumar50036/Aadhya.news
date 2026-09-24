'use client';

import React, { useEffect, useState } from 'react';
import { Rss, Plus, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface FeedItem {
  id: string;
  name: string;
  url: string;
  category: string;
  subCategory?: string | null;
  sourceType: string;
  trustScore: number;
  isActive: boolean;
  lastFetchedAt?: string | null;
}

export default function AdminFeedsPage() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'global',
    subCategory: 'world',
    sourceType: 'RSS',
    trustScore: '0.9',
  });

  const fetchFeeds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/feeds');
      const data = await res.json();
      if (data.feeds) setFeeds(data.feeds);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleCreateFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/feeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({ name: '', url: '', category: 'global', subCategory: 'world', sourceType: 'RSS', trustScore: '0.9' });
        fetchFeeds();
      } else {
        alert(data.error || 'Failed to add feed');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleDeleteFeed = async (id: string) => {
    if (!confirm('Are you sure you want to remove this feed?')) return;
    try {
      await fetch(`/api/admin/feeds?id=${id}`, { method: 'DELETE' });
      fetchFeeds();
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Feed Ingestion Manager</h2>
          <p className="text-xs text-slate-500">Configure RSS, Atom, Government, and University endpoints</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Source Feed</span>
        </button>
      </div>

      {/* Add Feed Form Modal / Box */}
      {showAddForm && (
        <form onSubmit={handleCreateFeed} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Configure New Feed Source
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-1">Source Name</label>
              <input
                type="text"
                required
                placeholder="e.g. PIB India Official"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Feed RSS / Atom URL</label>
              <input
                type="url"
                required
                placeholder="https://example.com/rss.xml"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="global">Global News</option>
                <option value="india">India News</option>
                <option value="student">Student Desk</option>
                <option value="exams">Competitive Exams</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Source Type</label>
              <select
                value={formData.sourceType}
                onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="GOVERNMENT_PORTAL">Government Portal (Highest Trust)</option>
                <option value="UNIVERSITY">University / Education Board</option>
                <option value="RSS">RSS Feed</option>
                <option value="ATOM">Atom Feed</option>
                <option value="API">Authorized REST API</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-500"
            >
              Save Feed Source
            </button>
          </div>
        </form>
      )}

      {/* Feed List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Source Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Category</th>
              <th className="p-4">Trust Score</th>
              <th className="p-4">Last Synced</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {feeds.map((feed) => (
              <tr key={feed.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{feed.name}</p>
                  <p className="text-[11px] text-slate-400 max-w-xs truncate">{feed.url}</p>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold">
                    {feed.sourceType}
                  </span>
                </td>
                <td className="p-4 uppercase font-bold text-[10px] text-sky-600">{feed.category}</td>
                <td className="p-4 font-bold text-emerald-600">{Math.round(feed.trustScore * 100)}%</td>
                <td className="p-4 text-slate-400">
                  {feed.lastFetchedAt ? new Date(feed.lastFetchedAt).toLocaleTimeString() : 'Never'}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDeleteFeed(feed.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
