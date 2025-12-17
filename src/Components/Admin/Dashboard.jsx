import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { FolderGit2, Layers } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, tech: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        
      const { count: techCount } = await supabase
        .from('tech_stacks')
        .select('*', { count: 'exact', head: true })

      setStats({
        projects: projectsCount || 0,
        tech: techCount || 0
      })
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.projects}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FolderGit2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tech Stack Items</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.tech}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
