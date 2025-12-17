import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function TechList() {
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTechs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tech_stacks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setTechs(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchTechs()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tech?')) {
      await supabase.from('tech_stacks').delete().eq('id', id)
      fetchTechs()
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tech Stack</h2>
        <Link
          to="/admin/tech/new"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Tech
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Proficiency</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {techs.map((tech) => (
              <tr key={tech.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {tech.image_url && (
                      <img className="h-8 w-8 rounded object-contain mr-3" src={tech.image_url} alt="" />
                    )}
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{tech.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {tech.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {tech.proficiency}% ({tech.years} yrs)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link to={`/admin/tech/edit/${tech.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(tech.id)} className="text-red-600 dark:text-red-400 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
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
