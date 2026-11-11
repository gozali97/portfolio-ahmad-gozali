'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const LABELS = { all: 'All', fullstack: 'Full stack', frontend: 'Frontend', backend: 'Backend' }

export default function Portfolio({ projects = [] }) {
  const [filter, setFilter] = useState('all')
  const ref = useScrollAnimation()

  const categories = useMemo(() => ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))], [projects])
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" ref={ref} className="rounded-t-3xl bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="reveal eyebrow mb-5">Selected work</p>
            <h2 className="reveal heading text-4xl/[1.08] md:text-[52px]/[1.04]" data-delay="1">
              Products I&apos;ve built and shipped.
            </h2>
          </div>

          {categories.length > 2 && (
            <div className="reveal flex flex-wrap gap-2" data-delay="2" role="tablist" aria-label="Filter projects">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`h-10 rounded-full px-5 text-sm font-semibold transition-colors ${
                    filter === c ? 'bg-ink text-paper' : 'bg-paper text-ink/60 hover:text-ink'
                  }`}
                >
                  {LABELS[c] || c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {visible.map((p) => (
            <ProjectCard key={p.id ?? p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p }) {
  const href = p.demo_url || p.repo_url
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-paper transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgb(22_22_22/0.3)]">
      <a
        href={href || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-surface"
        tabIndex={-1}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image_url || '/images/placeholder.png'}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {p.is_live && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="heading text-2xl" style={{ letterSpacing: '-0.03em' }}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline">
                {p.title}
              </a>
            ) : (
              p.title
            )}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            {p.repo_url && (
              <a
                href={p.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} source code`}
                className="grid h-9 w-9 place-items-center rounded-full text-ink/50 transition-colors hover:bg-surface hover:text-ink"
              >
                <Github size={18} />
              </a>
            )}
            {p.demo_url && (
              <a
                href={p.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title}`}
                className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper transition-transform group-hover:rotate-45"
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="mt-3 leading-relaxed text-ink/60">{p.short_description}</p>

        {p.technologies?.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.technologies.slice(0, 5).map((t) => (
              <li key={t} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink/65">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
