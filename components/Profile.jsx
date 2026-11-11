'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const CATEGORIES = [
  { key: 'language', label: 'Languages' },
  { key: 'framework', label: 'Frameworks' },
  { key: 'database', label: 'Databases' },
  { key: 'tool', label: 'Tools' },
]

export default function Profile({ profile, techStacksByCategory = {} }) {
  const ref = useScrollAnimation()
  const groups = CATEGORIES.map((c) => ({ ...c, items: techStacksByCategory[c.key] || [] })).filter(
    (g) => g.items.length
  )

  return (
    <section id="profile" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <p className="reveal eyebrow mb-5">About</p>
            <h2 className="reveal heading text-4xl/[1.08] md:text-[52px]/[1.04]" data-delay="1">
              Designing and building software, end to end.
            </h2>
          </div>
          <div className="reveal space-y-5 text-lg leading-relaxed text-ink/65 lg:pt-11" data-delay="2">
            {(profile?.about_long || '').split(/\n\s*\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {groups.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="reveal mb-8 flex items-end justify-between gap-6">
              <h3 className="heading text-2xl">Toolkit</h3>
              <p className="text-sm text-ink/50">Tools I reach for on most projects</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {groups.map((g, gi) => (
                <div
                  key={g.key}
                  className="reveal rounded-3xl bg-surface p-6 md:p-8"
                  data-delay={String((gi % 2) + 1)}
                >
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">{g.label}</p>
                  <ul className="divide-y divide-line/[0.08]">
                    {g.items.map((t) => (
                      <li key={t.id ?? t.name} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper">
                          {t.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={t.image_url} alt="" className="h-6 w-6 object-contain" loading="lazy" />
                          )}
                        </span>
                        <span className="flex-1 font-semibold tracking-tight text-ink">{t.name}</span>
                        {Number(t.years) > 0 && (
                          <span className="text-sm tabular-nums text-ink/50">
                            {t.years} {Number(t.years) === 1 ? 'year' : 'years'}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
