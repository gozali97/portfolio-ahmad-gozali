import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import { Save, Upload, User, FileText, Link as IconLink } from 'lucide-react'

export default function ProfileManager() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [id, setId] = useState(null)

  const [formData, setFormData] = useState({
    full_name: '',
    headline: '',
    titles: '', // akan di-convert ke array
    about_short: '',
    about_long: '',
    avatar_url: '',
    resume_url: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    instagram_url: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    // Ambil row pertama saja
    const { data, error } = await supabase.from('profile').select('*').limit(1).single()
    
    if (data) {
      setId(data.id)
      setFormData({
        ...data,
        titles: data.titles ? data.titles.join(', ') : ''
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (e, field) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${field}-${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName)
      
      setFormData(prev => ({ ...prev, [field]: data.publicUrl }))
    } catch (error) {
      alert('Error uploading: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      titles: formData.titles.split(',').map(t => t.trim()).filter(Boolean)
    }

    let error
    if (id) {
      const { error: err } = await supabase.from('profile').update(payload).eq('id', id)
      error = err
    } else {
      const { error: err } = await supabase.from('profile').insert([payload])
      error = err
    }

    setLoading(false)
    if (error) alert('Error: ' + error.message)
    else alert('Profile updated successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
            <User size={20} className="mr-2" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Public)</label>
              <input name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline (Hero Text)</label>
              <input name="headline" value={formData.headline} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g. Building Digital Experiences" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titles / Roles (Comma separated for Typewriter)</label>
              <input name="titles" value={formData.titles} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Full Stack Dev, Creator, UI Designer" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
            <FileText size={20} className="mr-2" /> Media & Assets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Photo</label>
              <div className="flex items-center space-x-4">
                {formData.avatar_url && <img src={formData.avatar_url} className="h-16 w-16 rounded-full object-cover border" alt="Profile" />}
                <label className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  <span className="text-sm">Change Photo</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar_url')} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume / CV (PDF)</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200">
                  <span className="text-sm">Upload PDF</span>
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume_url')} />
                </label>
                {formData.resume_url && <span className="text-xs text-green-600">File Uploaded</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bios */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">Biography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Bio (Banner)</label>
              <textarea name="about_short" rows="3" value={formData.about_short} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Long Bio (About Section)</label>
              <textarea name="about_long" rows="6" value={formData.about_long} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="border-t dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
            <IconLink size={20} className="mr-2" /> Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
              <input name="github_url" value={formData.github_url} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
              <input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram URL</label>
              <input name="instagram_url" value={formData.instagram_url} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all font-medium"
          >
            <Save size={18} className="mr-2" />
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </form>
    </div>
  )
}
