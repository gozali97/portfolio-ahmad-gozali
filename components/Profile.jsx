'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Profile({ profile, techStacksByCategory }) {
  const ref = useScrollAnimation()

  const stats = [
    { value: '5+', label: 'Years building for the web' },
    { value: '20+', label: 'Projects shipped to production' },
    { value: '8', label: 'Live products maintained' },
    { value: '∞', label: 'Cups of coffee' },
  ]

  const categoryOrder = [
    { key: 'language', label: 'Languages' },
    { key: 'framework', label: 'Frameworks' },
    { key: 'database', label: 'Databases' },
    { key: 'tool', label: 'Tools' },
  ]

  return (
    <section id="profile" ref={ref} className="py-24 md:py-36">
      <div className="mx-auto max-w-editorial px-6">

        {/* Section header */}
        <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-16">
          <span className="mono-label text-accent">(02) — About</span>
          <span className="mono-label text-ink/40">Profile</span>
        </div>

        {/* Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-8">
            <h2 className="reveal display text-4xl md:text-6xl lg:text-7xl mb-10" data-delay="1">
              I design and build <span className="text-accent italic" style={{ fontStyle: 'italic' }}>reliable</span> software, end to end.
            </h2>
            <p className="reveal text-lg md:text-xl leading-relaxed text-ink/70 max-w-2xl whitespace-pre-line" data-delay="2">
              {profile.about_long}
            </p>
          </div>

          {/* Stats — numbered list */}
          <div className="lg:col-span-4">
            <ul>
              {stats.map((stat, idx) => (
                <li
                  key={stat.label}
                  className="reveal flex items-baseline gap-4 py-5 rule-b first:rule-t"
                  data-delay={idx + 1}
                >
                  <span className="mono-label text-ink/30 w-8">0{idx + 1}</span>
                  <div className="flex-1">
                    <div className="display text-4xl md:text-5xl">{stat.value}</div>
                    <div className="text-sm text-ink/50 mt-1">{stat.label}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech stack — by category */}
        <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-12">
          <h3 className="display text-2xl md:text-3xl">Toolkit</h3>
          <span className="mono-label text-ink/40">What I work with</span>
        </div>

        <div className="space-y-12">
          {categoryOrder.map(({ key, label }) => {
            const items = techStacksByCategory[key] || []
            if (!items.length) return null
            return (
              <div key={key} className="reveal grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <span className="mono-label text-ink/40">{label}</span>
                </div>
                <ul className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
                  {items.map((tech) => (
                    <li key={tech.id} className="group flex items-center gap-3">
                      <span className="w-9 h-9 grid place-items-center shrink-0">
                        {tech.image_url
                          ? <img src={tech.image_url} alt={tech.name} className="w-7 h-7 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                          : <span className="mono-label text-ink/40">{tech.name.slice(0, 2)}</span>}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate group-hover:text-accent transition-colors">{tech.name}</div>
                        <div className="mono-label text-ink/30">{tech.proficiency}% · {tech.years}y</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
