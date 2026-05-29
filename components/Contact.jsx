'use client'

import { Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Contact({ profile }) {
  const ref = useScrollAnimation()

  const socials = [
    { url: profile.github_url, label: 'GitHub', Icon: Github },
    { url: profile.linkedin_url, label: 'LinkedIn', Icon: Linkedin },
    { url: profile.instagram_url, label: 'Instagram', Icon: Instagram },
  ].filter((s) => s.url)

  return (
    <section id="contact" ref={ref} className="py-24 md:py-36">
      <div className="mx-auto max-w-editorial px-6">

        {/* Header */}
        <div className="reveal flex items-baseline justify-between rule-b pb-4 mb-16">
          <span className="mono-label text-accent">(04) — Contact</span>
          <span className="mono-label text-ink/40">Let&apos;s talk</span>
        </div>

        {/* Big statement */}
        <div className="reveal mb-12">
          <p className="mono-label text-ink/40 mb-6">Have something in mind?</p>
          <h2 className="display text-5xl md:text-8xl lg:text-9xl leading-[0.85]">
            Let&apos;s build<br />
            something <span className="text-accent italic" style={{ fontStyle: 'italic' }}>good.</span>
          </h2>
        </div>

        {/* Email — giant link */}
        <a
          href={`mailto:${profile.email}`}
          className="reveal group inline-flex items-center gap-4 rule-t rule-b py-8 w-full justify-between"
          data-delay="1"
        >
          <span className="display text-2xl md:text-5xl break-all group-hover:text-accent transition-colors">
            {profile.email}
          </span>
          <ArrowUpRight
            size={40}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-accent"
          />
        </a>

        {/* Footer details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16">
          <div className="reveal" data-delay="2">
            <span className="mono-label text-ink/40 block mb-3">Based in</span>
            <p className="text-lg">Yogyakarta, Indonesia</p>
            <p className="text-ink/50 text-sm">Working worldwide · UTC+7</p>
          </div>

          <div className="reveal" data-delay="3">
            <span className="mono-label text-ink/40 block mb-3">Availability</span>
            <p className="text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Open to freelance & full-time
            </p>
          </div>

          <div className="reveal" data-delay="4">
            <span className="mono-label text-ink/40 block mb-3">Elsewhere</span>
            <ul className="space-y-2">
              {socials.map(({ url, label, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-lg hover:text-accent transition-colors"
                  >
                    <Icon size={18} />
                    <span className="link-sweep">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
