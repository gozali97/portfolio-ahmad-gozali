'use client'

import { useMemo } from 'react'
import { Github, ArrowUpRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Accent opacity per contribution level (0 = empty).
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

  const header = (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="reveal eyebrow mb-5">Activity</p>
        <h2 className="reveal heading text-4xl/[1.08] md:text-[52px]/[1.04]" data-delay="1">
          Writing code, week after week.
        </h2>
      </div>
      {profileUrl && (
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="reveal btn-secondary btn-sm self-start md:self-auto"
          data-delay="2"
        >
          <Github size={16} /> {username ? `@${username}` : 'GitHub'}
          <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  )

  // Graceful fallback if the API was unavailable at build time.
  if (!data || !weeks.length) {
    return (
      <section id="activity" ref={ref} className="py-24 md:py-32">
        <div className="mx-auto max-w-site px-6 md:px-8">{header}</div>
      </section>
    )
  }

  const stats = [
    { value: data.total.toLocaleString(), label: 'Contributions this year' },
    { value: streaks.activeDays, label: 'Active days' },
    { value: `${streaks.longest}d`, label: 'Longest streak' },
    { value: `${streaks.current}d`, label: 'Current streak' },
  ]

  return (
    <section id="activity" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-8">
        {header}

        <dl className="reveal mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" data-delay="1">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-surface p-6">
              <dd className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{s.value}</dd>
              <dt className="mt-1.5 text-sm text-ink/55">{s.label}</dt>
            </div>
          ))}
        </dl>

        <div className="reveal mt-4 rounded-3xl border border-line/[0.08] p-6 md:p-8" data-delay="2">
          <div className="overflow-x-auto pb-1">
            <div className="inline-flex min-w-max flex-col gap-2">
              <div className="flex pl-9">
                <div className="relative flex-1" style={{ height: '1rem' }}>
                  {months.map((m) => (
                    <span
                      key={`${m.label}-${m.index}`}
                      className="absolute text-xs text-ink/45"
                      style={{ left: `${m.index * 16}px` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="grid grid-rows-7 gap-[3px] pr-1">
                  {DAY_LABELS.map((d, i) => (
                    <span key={i} className="h-[13px] text-[10px] leading-[13px] text-ink/45">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="flex gap-[3px]">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-rows-7 gap-[3px]">
                      {week.map((day, di) => {
                        if (!day) return <div key={di} className="h-[13px] w-[13px]" />
                        const op = LEVEL_OPACITY[day.level] ?? 0
                        return (
                          <div
                            key={di}
                            title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                            className="h-[13px] w-[13px] rounded-[3px]"
                            style={{
                              background: day.level === 0 ? 'rgb(var(--ink) / 0.07)' : `rgb(var(--accent) / ${op})`,
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-ink/45">
                <span className="mr-1">Less</span>
                {LEVEL_OPACITY.map((op, i) => (
                  <span
                    key={i}
                    className="h-[11px] w-[11px] rounded-[3px]"
                    style={{ background: op === 0 ? 'rgb(var(--ink) / 0.07)' : `rgb(var(--accent) / ${op})` }}
                  />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}