'use client'

import { Github, Linkedin, Instagram, ArrowDown } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Banner({ profile, topTech }) {
  const ref = useScrollAnimation()
  const titles = profile.titles?.length ? profile.titles : ['Developer']

  return (
    <section id="banner" ref={ref} className="relative pt-28 md:pt-32">
      <div className="mx-auto max-w-editorial px-6">

        {/* Top meta row */}
        <div className="reveal flex flex-wrap items-center justify-between gap-3 rule-b pb-4">
          <span className="mono-label flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Available for work — 2025
          </span>
          <span className="mono-label text-ink/40">Yogyakarta, ID · UTC+7</span>
        </div>

        {/* Giant display headline */}
        <div className="pt-10 md:pt-16">
          <span className="reveal mono-label text-ink/40 block mb-6" data-delay="1">
            (01) — Full Stack Developer
          </span>

          <h1
            className="display text-[15vw] leading-[0.82] md:text-[11rem] lg:text-[13rem]"
            aria-label={`${profile.full_name} — Full Stack Developer`}
          >
            <span className="reveal block" data-delay="1">Ahmad</span>
            <span className="reveal block text-accent italic" data-delay="2" style={{ fontStyle: 'italic' }}>
              Gozali
            </span>
            <span className="sr-only"> — Full Stack Developer & Laravel Engineer based in Yogyakarta, Indonesia</span>
          </h1>
        </div>

        {/* Intro + photo split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 md:pt-16 items-end">
          <div className="lg:col-span-7 reveal" data-delay="3">
            <p className="text-xl md:text-2xl leading-relaxed text-ink/80 max-w-2xl">
              {profile.about_short}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a href="#contact" className="btn-ink">
                Start a project
              </a>
              <a href="#portfolio" className="btn-outline">
                View work
              </a>
              <div className="flex items-center gap-1 ml-2">
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer"
                    className="w-10 h-10 grid place-items-center rounded-full hover:text-accent transition-colors" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer"
                    className="w-10 h-10 grid place-items-center rounded-full hover:text-accent transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                )}
                {profile.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" rel="noreferrer"
                    className="w-10 h-10 grid place-items-center rounded-full hover:text-accent transition-colors" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Magazine cover portrait */}
          <div className="lg:col-span-5 reveal" data-delay="4">
            <figure className="relative group select-none">
              {/* Cover frame */}
              <div
                className="relative overflow-hidden aspect-[3/4] bg-surface"
                style={{ border: '1px solid rgb(var(--line) / 0.25)' }}
              >
                {/* Photo */}
                <img
                  src={profile.avatar_url || '/images/ahmad.jpg'}
                  alt={profile.full_name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Legibility gradients */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

                {/* ── Masthead ── */}
                <div className="absolute top-0 inset-x-0 p-5">
                  <div className="flex items-start justify-between text-white">
                    <span className="mono-label !text-[0.6rem] text-white/80">No. 01</span>
                    <span className="mono-label !text-[0.6rem] text-white/80">EST. 2019</span>
                  </div>
                  <p
                    className="display text-white text-center leading-[0.8] mt-1"
                    style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)' }}
                    aria-hidden="true"
                  >
                    GOZALI
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="h-px flex-1 bg-white/40" />
                    <span className="mono-label !text-[0.55rem] text-white/70">The Developer Issue</span>
                    <span className="h-px flex-1 bg-white/40" />
                  </div>
                </div>

                {/* ── Cover lines ── */}
                <div className="absolute left-5 bottom-16 max-w-[80%] space-y-2">
                  <span className="inline-block bg-accent text-paper mono-label !text-[0.6rem] px-2 py-1">
                    Cover Story
                  </span>
                  <p className="display text-white text-2xl leading-[0.95] drop-shadow">
                    Full Stack Developer
                    <span className="text-accent">.</span>
                  </p>
                  <p className="mono-label !text-[0.6rem] text-white/80 leading-relaxed">
                    Laravel · React · Vue · Building products that ship
                  </p>
                </div>

                {/* ── Barcode footer ── */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-end gap-[2px] h-7" aria-hidden="true">
                      {[3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2].map((w, i) => (
                        <span
                          key={i}
                          className="bg-white block h-full"
                          style={{ width: `${w}px`, opacity: i % 3 === 0 ? 0.95 : 0.7 }}
                        />
                      ))}
                    </span>
                    <span className="mono-label !text-[0.5rem] text-white/70">5&nbsp;901234</span>
                  </div>
                  <span className="mono-label !text-[0.6rem] text-white/80">IDR · YGY</span>
                </div>
              </div>

              {/* Caption strip below the cover */}
              <figcaption className="mono-label text-ink/40 flex justify-between mt-3">
                <span>Portrait — Vol. {new Date().getFullYear()}</span>
                <span className="text-accent">★ Available</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="reveal flex items-center gap-2 mt-16 text-ink/40" data-delay="5">
          <ArrowDown size={16} className="animate-bounce" />
          <span className="mono-label">Scroll to explore</span>
        </div>
      </div>

      {/* Roles marquee strip */}
      <div className="mt-20 rule-t rule-b py-5 overflow-hidden marquee-paused">
        <div className="marquee-track">
          {[...titles, ...titles, ...titles, ...titles].map((t, i) => (
            <span key={i} className="display text-3xl md:text-5xl px-8 flex items-center gap-8 text-ink/70">
              {t}
              <span className="text-accent text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
