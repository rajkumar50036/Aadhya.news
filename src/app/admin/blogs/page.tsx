'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, CheckCircle } from 'lucide-react';
import { FALLBACK_BLOGS, BlogPostItem } from '@/lib/data-service';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPostItem[]>(FALLBACK_BLOGS);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology & AI',
    authorName: 'Official Newsroom Editor',
    authorRole: 'Senior Editorial Writer',
    excerpt: '',
    content: '',
  });

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: BlogPostItem = {
      id: `blog-${Date.now()}`,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'),
      excerpt: formData.excerpt,
      content: formData.content,
      authorName: formData.authorName,
      authorRole: formData.authorRole,
      category: formData.category,
      tags: [formData.category.toLowerCase()],
      readTimeMinutes: 4,
      publishedAt: new Date(),
    };

    setBlogs([newBlog, ...blogs]);
    setShowAddForm(false);
    setFormData({
      title: '',
      category: 'Technology & AI',
      authorName: 'Official Newsroom Editor',
      authorRole: 'Senior Editorial Writer',
      excerpt: '',
      content: '',
    });
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Editorial Blog Management</h2>
          <p className="text-xs text-slate-500">Publish deep-dive editorial articles, opinion pieces, and educational blogs</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Blog Post</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateBlog} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Publish Editorial Blog
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-500 mb-1">Article Title</label>
              <input
                type="text"
                required
                placeholder="Enter blog article title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-500 mb-1">Author Name</label>
              <input
                type="text"
                required
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
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
                <option value="Technology & AI">Technology & AI</option>
                <option value="Education & Careers">Education & Careers</option>
                <option value="Global Economy">Global Economy</option>
                <option value="Policy & Governance">Policy & Governance</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-500 mb-1">Short Excerpt</label>
              <input
                type="text"
                required
                placeholder="Brief 1-2 sentence summary"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-500 mb-1">Full Article Body</label>
              <textarea
                rows={6}
                required
                placeholder="Write full article body text..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
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
              className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500"
            >
              Publish Article
            </button>
          </div>
        </form>
      )}

      {/* Blogs List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">Category</th>
              <th className="p-4">Read Time</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{b.title}</p>
                </td>
                <td className="p-4">{b.authorName}</td>
                <td className="p-4 uppercase font-bold text-[10px] text-indigo-600">{b.category}</td>
                <td className="p-4">{b.readTimeMinutes} mins</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDeleteBlog(b.id)}
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
