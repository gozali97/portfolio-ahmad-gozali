'use client'

import { useState, useMemo, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Portfolio({ projects }) {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const ref = useScrollAnimation()
  const previewRef = useRef(null)

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))]
    return ['all', ...cats]
  }, [projects])

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const handleMouseMove = (e) => {
    if (!previewRef.current) return
    previewRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  }

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-36" onMouseMove={handleMouseMove}>
      <div className="mx-auto max-w-editorial px-6">

        {/* Header */}
        <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-10">
          <span className="mono-label text-accent">(03) — Work</span>
          <span className="mono-label text-ink/40">{filteredProjects.length} projects</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="reveal display text-5xl md:text-7xl">Selected Works</h2>
          <div className="reveal flex flex-wrap gap-x-5 gap-y-2" data-delay="1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`mono-label transition-colors ${
                  filter === cat ? 'text-accent' : 'text-ink/40 hover:text-ink'
                }`}
              >
                {filter === cat ? '— ' : ''}{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Index list */}
        <ul className="rule-t">
          {filteredProjects.map((project, idx) => (
            <li
              key={project.id}
              onMouseEnter={() => setActive(project)}
              onMouseLeave={() => setActive(null)}
              className="reveal group rule-b"
            >
              <a
                href={project.demo_url || project.repo_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-12 items-center gap-4 py-7 md:py-9 transition-colors duration-300 group-hover:text-accent"
              >
                <span className="col-span-2 md:col-span-1 mono-label text-ink/40 group-hover:text-accent transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="col-span-10 md:col-span-6">
                  <h3 className="display text-3xl md:text-5xl leading-none">{project.title}</h3>
                </div>

                <div className="hidden md:flex md:col-span-3 flex-wrap gap-x-3 gap-y-1">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <span key={tech} className="mono-label text-ink/40 group-hover:text-accent/70 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                  <span className="mono-label text-ink/40 group-hover:text-accent transition-colors capitalize">
                    {project.category}
                  </span>
                  <ArrowUpRight
                    size={26}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </a>

              {/* Mobile thumbnail (cursor preview is desktop-only) */}
              <div className="md:hidden pb-7 -mt-2">
                <img
                  src={project.image_url || '/images/placeholder.png'}
                  alt={project.title}
                  className="w-full aspect-video object-cover rule"
                  style={{ border: '1px solid rgb(var(--line) / 0.15)' }}
                  loading="lazy"
                />
                <p className="text-sm text-ink/60 mt-3">{project.short_description}</p>
              </div>
            </li>
          ))}
        </ul>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 mono-label text-ink/30">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block will-change-transform"
        style={{ transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 w-[22rem] aspect-[16/11] overflow-hidden transition-all duration-300 ${
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ border: '1px solid rgb(var(--line) / 0.25)', boxShadow: '0 30px 60px -20px rgb(0 0 0 / 0.35)' }}
        >
          {active && (
            <img
              src={active.image_url || '/images/placeholder.png'}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          {active?.is_live && (
            <span className="absolute top-3 left-3 mono-label bg-accent text-paper px-2 py-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-paper animate-pulse" /> Live
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
