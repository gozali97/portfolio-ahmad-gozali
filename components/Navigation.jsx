'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#profile', label: 'About' },
  { href: '#portfolio', label: 'Work' },
  { href: '#activity', label: 'Activity' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation({ resumeUrl }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? 'bg-paper/85 backdrop-blur-md shadow-[0_1px_0_rgb(var(--line)/0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-site items-center justify-between px-6 md:px-8">
        <a href="#banner" className="text-[15px] font-bold uppercase tracking-[0.2em] text-ink">
          Ahmad Gozali
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-ink/60 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
              Resume
            </a>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="h-[calc(100dvh-72px)] bg-paper px-6 pb-10 pt-6 md:hidden">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="heading block py-3 text-4xl text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10 w-full">
              Download resume
            </a>
          )}
        </div>
      )}
    </header>
  )
}
