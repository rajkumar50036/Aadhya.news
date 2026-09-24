'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Edit3, ShieldCheck, Zap, Radio, Flame } from 'lucide-react';

interface StoryItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  subCategory?: string | null;
  sourceName: string;
  verificationStatus: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isLive: boolean;
  isTrending: boolean;
  publishedAt: string;
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'global',
    subCategory: 'world',
    sourceName: 'Official Admin Publisher',
    verificationStatus: 'VERIFIED_OFFICIAL',
    isBreaking: false,
    isFeatured: false,
    isLive: false,
    isTrending: false,
  });

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stories?limit=50');
      const data = await res.json();
      if (data.stories) setStories(data.stories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handlePublishStory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({
          title: '',
          summary: '',
          content: '',
          category: 'global',
          subCategory: 'world',
          sourceName: 'Official Admin Publisher',
          verificationStatus: 'VERIFIED_OFFICIAL',
          isBreaking: false,
          isFeatured: false,
          isLive: false,
          isTrending: false,
        });
        fetchStories();
      } else {
        alert(data.error || 'Failed to publish story');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    try {
      await fetch(`/api/admin/stories?id=${id}`, { method: 'DELETE' });
      fetchStories();
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleToggleFlag = async (id: string, field: string, currentValue: boolean) => {
    try {
      await fetch('/api/admin/stories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, [field]: !currentValue }),
      });
      fetchStories();
    } catch (e) {
      alert('Update failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Story Publishing & Verification</h2>
          <p className="text-xs text-slate-500">Publish manual stories, edit AI summaries, and set verification badges</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Manual Story</span>
        </button>
      </div>

      {/* Manual Publish Form */}
      {showAddForm && (
        <form onSubmit={handlePublishStory} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Publish New News Story
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-500 mb-1">Headline</label>
              <input
                type="text"
                required
                placeholder="Enter objective factual headline"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <option value="live">Live Updates</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Verification Status Override</label>
              <select
                value={formData.verificationStatus}
                onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="VERIFIED_OFFICIAL">Verified Official Source</option>
                <option value="HIGH_CONFIDENCE">High Confidence</option>
                <option value="MULTIPLE_SOURCES">Multi-Source Cluster</option>
                <option value="UNVERIFIED_SINGLE_SOURCE">Single Unverified Source</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-500 mb-1">Bullet Executive Summary</label>
              <textarea
                rows={3}
                required
                placeholder="• Bullet 1&#10;• Bullet 2"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={formData.isBreaking}
                  onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                  className="rounded text-red-600"
                />
                <span className="text-red-500 flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Breaking News</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-sky-600"
                />
                <span>Hero Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="checkbox"
                  checked={formData.isLive}
                  onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                  className="rounded text-emerald-600"
                />
                <span className="text-emerald-500 flex items-center gap-1"><Radio className="w-3.5 h-3.5" /> Live Stream</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Publish Immediately
            </button>
          </div>
        </form>
      )}

      {/* Stories List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Headline</th>
              <th className="p-4">Category</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Flags</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{story.title}</p>
                  <p className="text-[11px] text-slate-400">{story.sourceName}</p>
                </td>
                <td className="p-4 uppercase font-bold text-[10px] text-sky-600">{story.category}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {story.verificationStatus}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFlag(story.id, 'isBreaking', story.isBreaking)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        story.isBreaking ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      BREAKING
                    </button>
                    <button
                      onClick={() => handleToggleFlag(story.id, 'isLive', story.isLive)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        story.isLive ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      LIVE
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDeleteStory(story.id)}
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
