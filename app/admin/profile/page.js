'use client'

import { useState, useEffect } from 'react'
import { Save, User, FileText, Link as LinkIcon } from 'lucide-react'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    full_name: '', headline: '', titles: '', about_short: '', about_long: '',
    avatar_url: '', resume_url: '', email: '', github_url: '', linkedin_url: '', instagram_url: '',
  })

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(data => {
      setForm({ ...data, titles: Array.isArray(data.titles) ? data.titles.join(', ') : data.titles || '' })
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, titles: form.titles.split(',').map(t => t.trim()).filter(Boolean) }
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-8">
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2"><User size={20} /> Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
              <input name="headline" value={form.headline} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titles (comma separated — for typewriter)</label>
              <input name="titles" value={form.titles} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="Full Stack Dev, React Specialist" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2"><FileText size={20} /> Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
              <input name="avatar_url" value={form.avatar_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
              {form.avatar_url && <img src={form.avatar_url} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border" />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume URL</label>
              <input name="resume_url" value={form.resume_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4">Biography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Bio (Banner)</label>
              <textarea name="about_short" rows={3} value={form.about_short} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Long Bio (About Section)</label>
              <textarea name="about_long" rows={5} value={form.about_long} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2"><LinkIcon size={20} /> Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub</label>
              <input name="github_url" value={form.github_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn</label>
              <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram</label>
              <input name="instagram_url" value={form.instagram_url} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          {saved && <span className="text-green-600 dark:text-green-400 font-medium text-sm">✓ Profile saved successfully!</span>}
          {!saved && <span></span>}
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 shadow-lg shadow-cyan-500/20 disabled:opacity-50">
            <Save size={18} /> {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
