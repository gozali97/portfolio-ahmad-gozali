import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    category: 'fullstack',
    technologies: '',
    demo_url: '',
    repo_url: '',
    image_url: '',
    is_live: true,
    highlights: '' // Will split by newline
  })

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single()
        
        if (data && !error) {
          setFormData({
            ...data,
            title: data.title || data.name, // Handle legacy name field
            technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : data.technologies,
            highlights: Array.isArray(data.highlights) ? data.highlights.join('\n') : data.highlights
          })
        }
      }
      fetchProject()
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath)
      
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }))
    } catch (error) {
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      title: formData.title,
      // name: formData.title, // REMOVED: Schema only has 'title', sending 'name' causes error
      short_description: formData.short_description,
      full_description: formData.full_description,
      category: formData.category,
      demo_url: formData.demo_url,
      repo_url: formData.repo_url,
      image_url: formData.image_url,
      is_live: formData.is_live,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      highlights: formData.highlights.split('\n').map(h => h.trim()).filter(Boolean)
    }

    let error
    if (isEditing) {
      const { error: err } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
      error = err
    } else {
      const { error: err } = await supabase
        .from('projects')
        .insert([payload])
      error = err
    }

    setLoading(false)
    if (!error) {
      navigate('/admin/projects')
    } else {
      alert('Error saving project: ' + error.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/admin/projects')} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isEditing ? 'Edit Project' : 'New Project'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies (comma separated)</label>
              <input
                type="text"
                name="technologies"
                placeholder="React, Node.js, Supabase"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
              <input
                type="url"
                name="demo_url"
                value={formData.demo_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Repo URL</label>
              <input
                type="url"
                name="repo_url"
                value={formData.repo_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
              <textarea
                name="short_description"
                rows="3"
                value={formData.short_description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Highlights (one per line)</label>
              <textarea
                name="highlights"
                rows="5"
                placeholder="- Built with React&#10;- Optimized performance"
                value={formData.highlights}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Image</label>
           <div className="flex items-center space-x-6">
             {formData.image_url && (
               <img src={formData.image_url} alt="Preview" className="h-24 w-40 object-cover rounded-lg border border-gray-300" />
             )}
             <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
               <Upload size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{uploading ? 'Uploading...' : 'Upload Image'}</span>
               <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
             </label>
             <input
                type="text"
                name="image_url"
                placeholder="Or enter image URL"
                value={formData.image_url}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
           </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_live"
              checked={formData.is_live}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Live Project</span>
          </label>

          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  )
}
