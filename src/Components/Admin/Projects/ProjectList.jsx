import React, { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

export default function ProjectList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      fetchProjects()
    }
  }

  if (loading) return <div className="p-8 text-center">Loading projects...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Projects</h2>
        <Link
          to="/admin/projects/new"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Project
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {project.image_url && (
                        <img className="h-10 w-10 rounded-lg object-cover mr-3" src={project.image_url} alt="" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title || project.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{project.short_description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 capitalize">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.is_live ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Live
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link to={`/admin/projects/edit/${project.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(project.id)} className="text-red-600 dark:text-red-400 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
