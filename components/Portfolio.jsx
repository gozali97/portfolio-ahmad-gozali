'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Portfolio({ projects }) {
  const [filter, setFilter] = useState('all')
  const ref = useScrollAnimation()

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))]
    return ['all', ...cats]
  }, [projects])

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="py-24" ref={ref}>
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 scroll-hidden">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Selected Works</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => {
              const count = cat === 'all' ? projects.length : projects.filter(p => p.category === cat).length
              return (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 capitalize whitespace-nowrap ${
                    filter === cat
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                      : 'text-white/40 hover:text-white/70 border border-white/5 hover:border-white/10'
                  }`}>
                  {cat} ({count})
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0
            return (
              <div key={project.id}
                className={`group glass glass-hover rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${isFeatured ? 'md:col-span-2 md:flex-row' : ''}`}>
                <div className={`relative overflow-hidden ${isFeatured ? 'md:w-3/5 h-64 md:h-auto' : 'h-52'}`}>
                  <img src={project.image_url || '/images/placeholder.png'} alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-60" />
                  {project.is_live && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                    </div>
                  )}
                </div>
                <div className={`p-6 flex flex-col flex-1 ${isFeatured ? 'md:w-2/5 justify-center' : ''}`}>
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase mb-2">{project.category}</span>
                  <h3 className={`font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 ${isFeatured ? 'text-2xl' : 'text-lg'}`}>{project.title}</h3>
                  <p className="text-white/30 text-sm mb-5 line-clamp-2">{project.short_description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(project.technologies || []).slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 text-white/40 text-[11px] font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-cyan-400 transition-colors">
                        <ExternalLink size={16} /> Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white transition-colors">
                        <Github size={16} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
