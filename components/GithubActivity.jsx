'use client'

import { useMemo } from 'react'
import { Github, ArrowUpRight, Flame } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Vermilion accent opacity per contribution level (0 = empty).
const LEVEL_OPACITY = [0, 0.25, 0.5, 0.75, 1]

function buildWeeks(contributions) {
  if (!contributions?.length) return { weeks: [], months: [] }

  // Pad the front so the first column starts on Sunday (getDay() === 0).
  const firstDay = new Date(contributions[0].date).getDay()
  const cells = [...Array(firstDay).fill(null), ...contributions]

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  // Month labels: mark the week index where a new month first appears.
  const months = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstReal = week.find(Boolean)
    if (!firstReal) return
    const m = new Date(firstReal.date).getMonth()
    if (m !== lastMonth) {
      months.push({ label: MONTH_LABELS[m], index: wi })
      lastMonth = m
    }
  })

  return { weeks, months }
}

function computeStreaks(contributions) {
  let current = 0
  let longest = 0
  let activeDays = 0
  for (const day of contributions) {
    if (day.count > 0) {
      activeDays++
      current++
      if (current > longest) longest = current
    } else {
      current = 0
    }
  }
  // Current streak counts back from the most recent day.
  let trailing = 0
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) trailing++
    else break
  }
  return { longest, current: trailing, activeDays }
}

export default function GithubActivity({ data, username, profileUrl }) {
  const ref = useScrollAnimation()

  const { weeks, months } = useMemo(
    () => buildWeeks(data?.contributions),
    [data]
  )
  const streaks = useMemo(
    () => computeStreaks(data?.contributions || []),
    [data]
  )

  // Graceful fallback if the API was unavailable at build time.
  if (!data || !weeks.length) {
    return (
      <section id="activity" ref={ref} className="py-24 md:py-32">
        <div className="mx-auto max-w-editorial px-6">
          <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-10">
            <span className="mono-label text-accent">(04) — Activity</span>
            <span className="mono-label text-ink/40">GitHub</span>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="reveal group inline-flex items-center gap-3 text-lg hover:text-accent transition-colors"
          >
            <Github size={22} />
            <span className="link-sweep">View my GitHub profile</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </section>
    )
  }

  const stats = [
    { value: data.total.toLocaleString(), label: 'Contributions / year' },
    { value: streaks.activeDays, label: 'Active days' },
    { value: streaks.longest, label: 'Longest streak' },
    { value: streaks.current, label: 'Current streak' },
  ]

  return (
    <section id="activity" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6">

        {/* Header */}
        <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-10">
          <span className="mono-label text-accent">(04) — Activity</span>
          <span className="mono-label text-ink/40">Last 12 months</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <h2 className="reveal display text-4xl md:text-6xl">
            Code, <span className="text-accent italic" style={{ fontStyle: 'italic' }}>every</span> week.
          </h2>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="reveal group inline-flex items-center gap-2 mono-label text-ink/50 hover:text-accent transition-colors"
            data-delay="1"
          >
            <Github size={16} /> @{username}
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px rule mb-12 overflow-hidden" data-delay="1"
          style={{ border: '1px solid rgb(var(--line) / 0.14)' }}>
          {stats.map((s, i) => (
            <div key={s.label} className="p-5 bg-paper"
              style={{ borderLeft: i > 0 ? '1px solid rgb(var(--line) / 0.1)' : 'none' }}>
              <div className="display text-3xl md:text-4xl flex items-center gap-2">
                {s.label.includes('streak') && Number(s.value) > 0 && (
                  <Flame size={20} className="text-accent" />
                )}
                {s.value}
              </div>
              <div className="mono-label text-ink/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div className="reveal overflow-x-auto pb-2" data-delay="2">
          <div className="inline-flex flex-col gap-2 min-w-max">
            {/* Month labels */}
            <div className="flex pl-9">
              <div className="relative flex-1" style={{ height: '1rem' }}>
                {months.map((m) => (
                  <span
                    key={`${m.label}-${m.index}`}
                    className="mono-label text-ink/40 absolute"
                    style={{ left: `${m.index * 16}px` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid: day labels + week columns */}
            <div className="flex gap-2">
              {/* Day-of-week labels */}
              <div className="grid grid-rows-7 gap-[3px] pr-1">
                {DAY_LABELS.map((d, i) => (
                  <span key={i} className="mono-label text-ink/40 h-[13px] leading-[13px] text-[0.55rem]">
                    {d}
                  </span>
                ))}
              </div>

              {/* Weeks */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="grid grid-rows-7 gap-[3px]">
                    {week.map((day, di) => {
                      if (!day) return <div key={di} className="w-[13px] h-[13px]" />
                      const op = LEVEL_OPACITY[day.level] ?? 0
                      const isEmpty = day.level === 0
                      return (
                        <div
                          key={di}
                          title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                          className="w-[13px] h-[13px] rounded-[2px] transition-transform hover:scale-125"
                          style={{
                            background: isEmpty
                              ? 'rgb(var(--ink) / 0.07)'
                              : `rgb(var(--accent) / ${op})`,
                            outline: isEmpty ? 'none' : '1px solid rgb(var(--accent) / 0.15)',
                            outlineOffset: '-1px',
                          }}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pl-9 mt-2">
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="mono-label text-ink/40 hover:text-accent transition-colors"
              >
                Learn how contributions count →
              </a>
              <div className="flex items-center gap-1.5">
                <span className="mono-label text-ink/40">Less</span>
                {LEVEL_OPACITY.map((op, i) => (
                  <span
                    key={i}
                    className="w-[11px] h-[11px] rounded-[2px]"
                    style={{
                      background: op === 0 ? 'rgb(var(--ink) / 0.07)' : `rgb(var(--accent) / ${op})`,
                    }}
                  />
                ))}
                <span className="mono-label text-ink/40">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
