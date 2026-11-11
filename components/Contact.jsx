'use client'

import { Github, Linkedin, Instagram, ArrowUpRight, Mail } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Contact({ profile }) {
  const ref = useScrollAnimation()

  const socials = [
    { url: profile?.github_url, label: 'GitHub', Icon: Github },
    { url: profile?.linkedin_url, label: 'LinkedIn', Icon: Linkedin },
    { url: profile?.instagram_url, label: 'Instagram', Icon: Instagram },
  ].filter((s) => s.url)

  return (
    <section id="contact" ref={ref} className="rounded-t-3xl bg-night text-on-night">
      <div className="mx-auto max-w-site px-6 pb-20 pt-24 md:px-8 md:pb-28 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="reveal eyebrow mb-5 !text-accent">Contact</p>
            <h2 className="reveal heading text-[40px] sm:text-6xl lg:text-[68px]" style={{ letterSpacing: '-0.055em' }} data-delay="1">
              Have a project in mind?
              <span className="block text-accent">Let&apos;s talk.</span>
            </h2>
            <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-on-night/65" data-delay="2">
              I&apos;m available for freelance work and full-time roles. Send a short note about what you&apos;re
              building and I&apos;ll get back to you within a day or two.
            </p>
            {profile?.email && (
              <div className="reveal mt-10 flex flex-wrap items-center gap-3" data-delay="3">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary !bg-on-night !text-night !shadow-none hover:!bg-accent"
                >
                  <Mail size={17} /> {profile.email}
                </a>
              </div>
            )}
          </div>

          <dl className="reveal space-y-8 self-end lg:pb-3" data-delay="2">
            <div className="border-t border-on-night/15 pt-6">
              <dt className="text-sm text-on-night/50">Based in</dt>
              <dd className="mt-1 text-lg font-semibold">Yogyakarta, Indonesia · UTC+7</dd>
            </div>
            <div className="border-t border-on-night/15 pt-6">
              <dt className="text-sm text-on-night/50">Availability</dt>
              <dd className="mt-1 flex items-center gap-2.5 text-lg font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Open to new projects
              </dd>
            </div>
            {socials.length > 0 && (
              <div className="border-t border-on-night/15 pt-6">
                <dt className="text-sm text-on-night/50">Elsewhere</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {socials.map(({ url, label, Icon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-on-night/20 px-4 text-sm font-semibold transition-colors hover:border-on-night/60"
                    >
                      <Icon size={16} /> {label}
                      <ArrowUpRight size={14} className="text-on-night/50" />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  )
}
