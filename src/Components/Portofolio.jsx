import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

export default function Portofolio() {
  const [filter, setFilter] = useState("all")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setProjects(data)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div id="portofolio" className="py-24 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div data-aos="fade-right" className="text-left w-full md:w-auto">
            <h4 className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-2">Portfolio</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Selected Works
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide" data-aos="fade-left">
            {['all', 'fullstack', 'frontend', 'backend'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 md:px-6 rounded-full text-xs md:text-sm font-medium transition-all duration-300 capitalize whitespace-nowrap flex-shrink-0 ${
                  filter === cat 
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg" 
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
           <div className="text-center py-20 text-gray-500">Loading amazing projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                  <img 
                    src={project.image_url || "/images/placeholder.png"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {project.is_live && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      LIVE
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                     <span className="text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
                       {project.category}
                     </span>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                       {project.title}
                     </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                    {project.short_description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.technologies || []).slice(0, 3).map(tech => (
                        <span key={tech} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                      {(project.technologies?.length > 3) && (
                         <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    <div className="flex gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                      {project.demo_url && (
                        <a 
                          href={project.demo_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <IconExternalLink size={18} /> Live Demo
                        </a>
                      )}
                      {project.repo_url && (
                        <a 
                          href={project.repo_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <IconBrandGithub size={18} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

