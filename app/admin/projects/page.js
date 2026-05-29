'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, ExternalLink, X, Save } from 'lucide-react'

const emptyProject = {
  title: '', short_description: '', full_description: '', image_url: '',
  technologies: [], category: 'fullstack', demo_url: '', repo_url: '',
  is_live: true, highlights: [],
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = list view, object = form view
  const [techInput, setTechInput] = useState('')
  const [highlightInput, setHighlightInput] = useState('')

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSave = async () => {
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/projects/${editing.id}` : '/api/projects'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null)
    fetchProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  const addTech = () => {
    if (!techInput.trim()) return
    setEditing({ ...editing, technologies: [...(editing.technologies || []), techInput.trim()] })
    setTechInput('')
  }

  const removeTech = (idx) => {
    setEditing({ ...editing, technologies: editing.technologies.filter((_, i) => i !== idx) })
  }

  const addHighlight = () => {
    if (!highlightInput.trim()) return
    setEditing({ ...editing, highlights: [...(editing.highlights || []), highlightInput.trim()] })
    setHighlightInput('')
  }

  const removeHighlight = (idx) => {
    setEditing({ ...editing, highlights: editing.highlights.filter((_, i) => i !== idx) })
  }

  // ── FORM VIEW ──
  if (editing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{editing.id ? 'Edit Project' : 'New Project'}</h1>
          <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-gray-700 dark:hover:text-white"><X size={24} /></button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white">
                <option value="fullstack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
            <textarea value={editing.short_description} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" placeholder="/images/project.png" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
              <input value={editing.demo_url} onChange={(e) => setEditing({ ...editing, demo_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Repo URL</label>
              <input value={editing.repo_url} onChange={(e) => setEditing({ ...editing, repo_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {(editing.technologies || []).map((t, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-full text-sm font-medium">
                  {t} <button onClick={() => removeTech(i)}><X size={14} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} placeholder="Add technology..." className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm" />
              <button onClick={addTech} className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm hover:bg-cyan-700"><Plus size={16} /></button>
            </div>
          </div>
          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Highlights</label>
            <ul className="space-y-2 mb-2">
              {(editing.highlights || []).map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="flex-1">• {h}</span>
                  <button onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())} placeholder="Add highlight..." className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white text-sm" />
              <button onClick={addHighlight} className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm hover:bg-cyan-700"><Plus size={16} /></button>
            </div>
          </div>
          {/* Live toggle + Save */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={editing.is_live} onChange={(e) => setEditing({ ...editing, is_live: e.target.checked })} className="w-5 h-5 rounded accent-cyan-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Project is Live</span>
            </label>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 shadow-lg shadow-cyan-500/20 transition-all">
              <Save size={18} /> Save Project
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── LIST VIEW ──
  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading projects...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <button onClick={() => setEditing({ ...emptyProject })} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-colors">
          <Plus size={18} /> Add Project
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Project</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {p.image_url && <img src={p.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{p.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{p.short_description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 capitalize">{p.category}</span></td>
                <td className="px-6 py-4">
                  {p.is_live
                    ? <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">Live</span>
                    : <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500">Draft</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button onClick={() => setEditing({ ...p })} className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                    {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink size={18} /></a>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
