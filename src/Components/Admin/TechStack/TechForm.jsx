import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function TechForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    category: 'language',
    image_url: '',
    proficiency: 80,
    years: 1,
    desc: ''
  })

  useEffect(() => {
    if (isEditing) {
      const fetchTech = async () => {
        const { data } = await supabase.from('tech_stacks').select('*').eq('id', id).single()
        if (data) setFormData(data)
      }
      fetchTech()
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `tech-${Math.random()}.${fileExt}`
      const { data, error } = await supabase.storage.from('portfolio-images').upload(fileName, file)
      
      if (error) throw error
      
      const { data: urlData } = supabase.storage.from('portfolio-images').getPublicUrl(fileName)
      setFormData(prev => ({ ...prev, image_url: urlData.publicUrl }))
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const query = isEditing 
      ? supabase.from('tech_stacks').update(formData).eq('id', id)
      : supabase.from('tech_stacks').insert([formData])

    const { error } = await query
    setLoading(false)
    
    if (!error) navigate('/admin/tech')
    else alert(error.message)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/admin/tech')} className="mr-4"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold dark:text-white">{isEditing ? 'Edit Tech' : 'New Tech'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="language">Language</option>
            <option value="framework">Framework</option>
            <option value="tool">Tool</option>
            <option value="database">Database</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Proficiency (%)</label>
            <input type="number" name="proficiency" value={formData.proficiency} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Years Experience</label>
            <input type="number" name="years" value={formData.years} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Description</label>
          <input name="desc" value={formData.desc} onChange={handleChange} className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>

        <div>
           <label className="block text-sm font-medium dark:text-gray-300">Icon</label>
           <div className="flex gap-4 mt-2">
             {formData.image_url && <img src={formData.image_url} className="h-12 w-12" alt="Preview" />}
             <input type="file" onChange={handleImageUpload} className="dark:text-white" />
           </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
