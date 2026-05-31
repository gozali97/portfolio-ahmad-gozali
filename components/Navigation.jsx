'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navigation({ resumeUrl }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#banner', label: 'Index', no: '01' },
    { href: '#profile', label: 'About', no: '02' },
    { href: '#portfolio', label: 'Work', no: '03' },
    { href: '#activity', label: 'Activity', no: '04' },
    { href: '#contact', label: 'Contact', no: '05' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
          isScrolled ? 'bg-paper/85 backdrop-blur-md rule-b' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-editorial px-6 flex justify-between items-center h-16">
          <a href="#banner" className="flex items-center gap-2 group">
            <span className="display text-xl tracking-tight">Ahmad Gozali</span>
            <span className="mono-label text-accent">©25</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-1.5 text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                <span className="mono-label text-ink/30 group-hover:text-accent transition-colors">{item.no}</span>
                <span className="link-sweep">{item.label}</span>
              </a>
            ))}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-ink !py-2 !px-4 text-sm">
                Resume <ArrowUpRight size={15} />
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-paper flex flex-col justify-center px-8 gap-2 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-baseline gap-4 py-3 rule-b"
          >
            <span className="mono-label text-accent">{item.no}</span>
            <span className="display text-5xl">{item.label}</span>
          </a>
        ))}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mono-label mt-8 flex items-center gap-2 text-ink/60"
          >
            Download Resume <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </>
  )
}
