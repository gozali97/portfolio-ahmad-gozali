'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation({ resumeUrl }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#banner', label: 'Home' },
    { href: '#profile', label: 'About' },
    { href: '#portfolio', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        isScrolled
          ? 'dark:bg-[#050505]/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/5 border-black/5 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
          <a href="#banner" className="text-xl font-bold tracking-tight">
            Ahmad<span className="text-gradient-cyan">.dev</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer"
                className="px-5 py-2 rounded-full text-sm font-semibold border border-white/10 text-white/80 hover:border-cyan-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
                Resume
              </a>
            )}
          </div>

          {/* Mobile */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 z-40 dark:bg-[#050505]/98 bg-white/98 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-bold text-white/70 hover:text-white transition-colors">
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
