'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'

const emptyTech = { name: '', image_url: '', category: 'language', proficiency: 80, years: 1, desc: '' }

export default function TechStackPage() {
  const [stacks, setStacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  const fetchStacks = async () => {
    setLoading(true)
    const res = await fetch('/api/tech')
    setStacks(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchStacks() }, [])

  const handleSave = async () => {
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/tech/${editing.id}` : '/api/tech'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null)
    fetchStacks()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this tech stack?')) return
    await fetch(`/api/tech/${id}`, { method: 'DELETE' })
    fetchStacks()
  }

  if (editing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{editing.id ? 'Edit Tech' : 'New Tech'}</h1>
          <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-white"><X size={24} /></button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white">
                <option value="language">Language</option>
                <option value="framework">Framework</option>
                <option value="database">Database</option>
                <option value="tool">Tool</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
            <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="/images/tech.png" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proficiency ({editing.proficiency}%)</label>
              <input type="range" min="0" max="100" value={editing.proficiency} onChange={(e) => setEditing({ ...editing, proficiency: Number(e.target.value) })} className="w-full accent-cyan-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience</label>
              <input type="number" min="0" value={editing.years} onChange={(e) => setEditing({ ...editing, years: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none" />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 shadow-lg shadow-cyan-500/20">
              <Save size={18} /> Save Tech Stack
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack</h1>
        <button onClick={() => setEditing({ ...emptyTech })} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700">
          <Plus size={18} /> Add Tech
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stacks.map((t) => (
          <div key={t.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4 group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
              {t.image_url ? <img src={t.image_url} alt={t.name} className="w-8 h-8 object-contain" /> : <span className="text-lg font-bold text-gray-400">{t.name[0]}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 dark:text-white">{t.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${t.proficiency}%` }}></div>
                </div>
                <span className="text-xs text-gray-400">{t.proficiency}%</span>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditing({ ...t })} className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400"><Edit size={16} /></button>
              <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
